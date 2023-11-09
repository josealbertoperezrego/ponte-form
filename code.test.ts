import add from "./code";
import test from "node:test";
import assert from "assert/strict";

test("add", (t) => {
  const addition = add(1,2);
  assert.strictEqual(addition, 3);
});

