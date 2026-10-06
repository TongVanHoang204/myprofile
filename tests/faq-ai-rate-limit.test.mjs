import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { AiRateLimitConfigError, createAiRateLimiter, FAQ_AI_LIMIT } from "../app/lib/faq/faq-ai-rate-limit.ts";

function localLimiter() {
  let time = 1_000_000;
  return {
    consume: createAiRateLimiter({ store: null, production: false, now: () => time }),
    advance: (ms) => { time += ms; },
  };
}

test("parallel requests for the same IP admit only one request", async () => {
  const { consume } = localLimiter();
  const results = await Promise.all(Array.from({ length: 20 }, () => consume("client-a")));
  assert.equal(results.filter((result) => result.allowed).length, 1);
  assert.equal(results[1].retryAfterSeconds, 10);
  assert.equal(results[1].remaining, FAQ_AI_LIMIT - 1);
});

test("cooldown expires at exactly ten seconds; denied attempts do not extend it", async () => {
  const { consume, advance } = localLimiter();
  await consume("client-a");
  advance(9_001);
  assert.deepEqual(await consume("client-a"), { allowed: false, remaining: 11, retryAfterSeconds: 1 });
  advance(999);
  assert.deepEqual(await consume("client-a"), { allowed: true, remaining: 10, retryAfterSeconds: 10 });
});

test("twelfth request exhausts the window and the quota resets at its boundary", async () => {
  const { consume, advance } = localLimiter();
  for (let i = 0; i < 12; i += 1) {
    const result = await consume("client-a");
    assert.equal(result.allowed, true);
    assert.equal(result.remaining, 11 - i);
    if (i === 11) assert.equal(result.retryAfterSeconds, 490);
    advance(10_000);
  }
  assert.deepEqual(await consume("client-a"), { allowed: false, remaining: 0, retryAfterSeconds: 480 });
  advance(480_000);
  assert.deepEqual(await consume("client-a"), { allowed: true, remaining: 11, retryAfterSeconds: 10 });
});

test("different IPs have independent quotas", async () => {
  const { consume } = localLimiter();
  await consume("client-a");
  assert.equal((await consume("client-b")).allowed, true);
});

test("production does not call through without shared storage", async () => {
  const consume = createAiRateLimiter({ store: null, production: true });
  await assert.rejects(consume("client-a"), /not configured/);
});

test("Redis failures never fall back to instance memory", async () => {
  const consume = createAiRateLimiter({
    production: false,
    store: { eval: async () => { throw new Error("Redis offline"); } },
  });
  await assert.rejects(consume("client-a"), /Redis offline/);
  await assert.rejects(consume("client-a"), /Redis offline/);
});

test("Redis receives a hashed IP and its server decision is preserved", async () => {
  const consume = createAiRateLimiter({
    production: true,
    now: () => 1_000_000,
    store: { eval: async (script, keys, args) => {
      assert.match(script, /tonumber\(ARGV\[4\]\)/);
      assert.match(keys[0], /^portfolio:faq-ai:limit:v1:[a-f0-9]{64}$/);
      assert.ok(!keys[0].includes("192.0.2.1"));
      assert.deepEqual(args, [12, 600_000, 10_000, 1_000_000]);
      return [0, 0, 42];
    } },
  });
  assert.deepEqual(await consume("192.0.2.1"), { allowed: false, remaining: 0, retryAfterSeconds: 42 });
});

test("invalid Redis responses fail closed", async () => {
  for (const result of [null, [], [1, 0, -1], [2, 0, 5], [1, NaN, 10]]) {
    const consume = createAiRateLimiter({ production: true, store: { eval: async () => result } });
    await assert.rejects(consume("client-a"), /Invalid/);
  }
});

function loadRoute(consume, protectionAllowed = true) {
  const require = createRequire(import.meta.url);
  const source = readFileSync(new URL("../app/api/faq-ai/route.ts", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
  } });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    console: { error: () => {} },
    require: (name) => {
      if (name === "next/server") return require(name);
      if (name.endsWith("faq-ai-rate-limit")) return { AiRateLimitConfigError, consumeAiRateLimit: consume, FAQ_AI_LIMIT };
      if (name.endsWith("request-security")) return {
        isSameOriginRequest: () => protectionAllowed,
        hasAllowedFetchMetadata: () => true,
        hasValidProtectionToken: () => true,
        isJsonRequest: () => true,
        getClientIp: () => "192.0.2.1",
      };
      if (name.endsWith("faq-ai-analytics")) return { logFaqQuestion: () => assert.fail("Rejected requests must not log a question") };
      if (name.endsWith("portfolio-ai")) return new Proxy({}, {
        get: () => () => assert.fail("Rejected requests must not construct an AI prompt"),
      });
      throw new Error(`Unexpected import: ${name}`);
    },
    fetch: () => assert.fail("Rejected requests must not call an AI provider"),
  });
  return exports.POST;
}

test("API rejection returns 429 and Retry-After without invoking AI", async () => {
  const post = loadRoute(async () => ({ allowed: false, remaining: 0, retryAfterSeconds: 420 }));
  const response = await post(new Request("http://localhost/api/faq-ai", { method: "POST" }));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "420");
  assert.equal(response.headers.get("X-RateLimit-Remaining"), "0");
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal((await response.json()).code, "AI_RATE_LIMITED");
});

test("API storage failure returns a retryable 503 without invoking AI", async () => {
  const post = loadRoute(async () => { throw new Error("Redis offline"); });
  const response = await post(new Request("http://localhost/api/faq-ai", { method: "POST" }));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("Retry-After"), "60");
  assert.equal((await response.json()).code, "AI_RATE_LIMIT_UNAVAILABLE");
});

test("missing production Redis returns a configuration error without a misleading retry countdown", async () => {
  const post = loadRoute(createAiRateLimiter({ store: null, production: true }));
  const response = await post(new Request("http://localhost/api/faq-ai", { method: "POST" }));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("Retry-After"), null);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  const payload = await response.json();
  assert.equal(payload.code, "AI_RATE_LIMIT_NOT_CONFIGURED");
  assert.equal(payload.retryAfterSeconds, undefined);
  assert.ok(!JSON.stringify(payload).includes("UPSTASH"));
});

test("API origin protection runs before consuming quota", async () => {
  const post = loadRoute(() => assert.fail("Forbidden requests must not consume quota"), false);
  const response = await post(new Request("http://localhost/api/faq-ai", { method: "POST" }));
  assert.equal(response.status, 403);
});
