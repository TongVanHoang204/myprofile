import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

function loadModule(file, globals = {}) {
  const source = ts.transpileModule(
    readFileSync(new URL(file, import.meta.url), "utf8"),
    { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }
  ).outputText;
  const context = { exports: {}, ...globals };
  vm.runInNewContext(source, context);
  return context.exports;
}

const feedback = loadModule("../app/lib/contact/contact-form-feedback.ts");

test("only a confirmed send with a cooldown is a successful contact response", async () => {
  const result = await feedback.parseContactResponse(Response.json({ success: true, cooldownSeconds: 3600 }));
  assert.equal(result.ok, true);
  assert.equal(result.cooldownSeconds, 3600);
});

for (const payload of [null, {}, [], { success: false }, { success: true }, { success: true, cooldownSeconds: "3600" }]) {
  test(`does not show a success popup for ${JSON.stringify(payload)}`, async () => {
    const result = await feedback.parseContactResponse(Response.json(payload));
    assert.equal(result.ok, false);
  });
}

test("HTML and malformed JSON do not become successful sends", async () => {
  for (const body of ["<html>Login</html>", "{invalid"]) {
    assert.equal((await feedback.parseContactResponse(new Response(body))).ok, false);
  }
});

test("cooldown rejections preserve a valid retry time", async () => {
  const result = await feedback.parseContactResponse(Response.json(
    { error: "CONTACT_COOLDOWN_ACTIVE", retryAfterSeconds: 120 }, { status: 429 }
  ));
  assert.equal(result.ok, false);
  assert.equal(result.retryAfterSeconds, 120);
});

test("HTTP errors and incorrectly typed error fields are handled safely", async () => {
  const result = await feedback.parseContactResponse(Response.json(
    { success: true, cooldownSeconds: 3600, error: {}, retryAfterSeconds: -1 }, { status: 500 }
  ));
  assert.equal(result.ok, false);
  assert.equal(result.error, undefined);
  assert.equal(result.retryAfterSeconds, undefined);
});

test("blocked browser storage never throws while reading or saving cooldowns", () => {
  const storage = loadModule("../app/lib/contact/contact-cooldown-storage.ts", {
    window: { get localStorage() { throw new Error("Storage denied"); } },
  });
  assert.equal(storage.readStoredCooldownData(), null);
  assert.doesNotThrow(() => storage.persistCooldownData({ email: "a@example.com", cooldownUntil: Date.now() + 60000 }));
  assert.doesNotThrow(() => storage.persistCooldownData(null));
});

test("corrupt cooldown data is ignored, valid cooldown data is preserved", () => {
  let value = JSON.stringify({ cooldownUntil: Date.now() + 60000, email: 123 });
  const storage = loadModule("../app/lib/contact/contact-cooldown-storage.ts", {
    window: { localStorage: {
      getItem: () => value,
      setItem: (_key, next) => { value = next; },
      removeItem: () => { value = null; },
    } },
  });
  assert.equal(storage.readStoredCooldownData(), null);
  storage.persistCooldownData({ email: "a@example.com", cooldownUntil: Date.now() + 60000 });
  assert.equal(storage.readStoredCooldownData().email, "a@example.com");
});
