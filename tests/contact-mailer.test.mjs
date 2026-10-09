import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../app/lib/contact/contact-mailer.ts", import.meta.url), "utf8"),
  { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }
).outputText;

function loadMailer(sendMail) {
  const context = {
    exports: {},
    process: { env: {
      SMTP_HOST: "smtp.gmail.com", SMTP_PORT: "465",
      SMTP_USER: "owner@example.com", SMTP_PASS: "abcd efgh ijkl mnop",
      CONTACT_TO_EMAIL: "owner@example.com",
      GOOGLE_CLIENT_ID: "old-client", GOOGLE_CLIENT_SECRET: "old-secret",
      GOOGLE_REFRESH_TOKEN: "old-token",
    } },
    require: (name) => {
      assert.equal(name, "nodemailer");
      return { createTransport: (options) => {
        assert.equal(options.auth.pass, "abcdefghijklmnop");
        assert.equal(options.auth.type, undefined);
        return { sendMail };
      } };
    },
  };
  vm.runInNewContext(source, context);
  return context.exports;
}

const input = { name: "Visitor", email: "visitor@example.com", message: "Hello" };

test("SMTP authentication failure becomes a safe configuration error", async () => {
  const mailer = loadMailer(async () => {
    throw Object.assign(new Error("sensitive upstream response"), { code: "EAUTH", responseCode: 535 });
  });
  await assert.rejects(mailer.sendContactMail(input), (error) => {
    assert.ok(error instanceof mailer.ContactMailConfigError);
    assert.match(error.message, /SMTP_USER/);
    assert.match(error.message, /SMTP_PASS/);
    assert.doesNotMatch(error.message, /sensitive upstream response/);
    return true;
  });
});

test("network failures are not misreported as bad credentials", async () => {
  const failure = Object.assign(new Error("Timed out"), { code: "ETIMEDOUT" });
  const mailer = loadMailer(async () => { throw failure; });
  await assert.rejects(mailer.sendContactMail(input), (error) => error === failure);
});

test("successful SMTP delivery uses the configured sender and visitor reply-to", async () => {
  let calls = 0;
  const mailer = loadMailer(async (message) => {
    calls++;
    assert.equal(message.from, "owner@example.com");
    assert.equal(message.to, "owner@example.com");
    assert.equal(message.replyTo, input.email);
    return { accepted: ["owner@example.com"] };
  });
  await mailer.sendContactMail(input);
  assert.equal(calls, 1);
});
