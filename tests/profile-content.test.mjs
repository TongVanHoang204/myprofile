import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function loadData(file) {
  const source = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const context = { exports: {} };
  vm.runInNewContext(source, context);
  return context.exports;
}

test("VI and EN profiles no longer advertise mobile app development", () => {
  const { dictionaries } = loadData("../app/data/dictionaries.ts");
  for (const language of ["vi", "en"]) {
    assert.doesNotMatch(JSON.stringify(dictionaries[language]), /\bmobile\b|flutter|SKILL-MOBILE|ứng dụng di động/i);
    assert.ok(dictionaries[language].cv.tech_stack.includes("React"));
    assert.ok(dictionaries[language].cv.tech_stack.includes("Node.js"));
  }
});

test("project filters only expose the remaining web and backend projects", () => {
  const { projectCopy } = loadData("../app/data/projects.ts");
  for (const language of ["vi", "en"]) {
    const copy = projectCopy[language];
    assert.deepEqual(Object.keys(copy.filters), ["all", "website", "backend"]);
    assert.ok(copy.items.every(item => ["website", "backend"].includes(item.category)));
    assert.doesNotMatch(JSON.stringify(copy), /mobile (?:app|client)|flutter/i);
    assert.match(JSON.stringify(copy), /responsive/i);
  }
});

test("blog and AI suggestions no longer promote mobile apps", () => {
  for (const file of [
    "../app/data/blog.ts", "../app/data/three-d.ts", "../app/layout.tsx",
    "../app/lib/faq/portfolio-ai.ts", "../app/components/faq/FaqAssistantPanel.tsx",
  ]) {
    assert.doesNotMatch(readFileSync(new URL(file, import.meta.url), "utf8"), /mobile (?:app|client)|flutter|SKILL-MOBILE/i);
  }
});
