import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import '@supabase/supabase-js';
import 'zod';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import 'consola';
import 'node:url';
import 'fast-xml-parser';
import 'ipx';

const test = defineEventHandler(async (event) => {
  return { message: "API is working!", timestamp: (/* @__PURE__ */ new Date()).toISOString() };
});

export { test as default };
//# sourceMappingURL=test.mjs.map
