import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const test = defineEventHandler(async (event) => {
  return { message: "API is working!", timestamp: (/* @__PURE__ */ new Date()).toISOString() };
});

export { test as default };
//# sourceMappingURL=test.mjs.map
