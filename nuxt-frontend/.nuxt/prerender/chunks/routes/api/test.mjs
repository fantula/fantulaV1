import { defineEventHandler } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';

const test = defineEventHandler(async (event) => {
  return { message: "API is working!", timestamp: (/* @__PURE__ */ new Date()).toISOString() };
});

export { test as default };
//# sourceMappingURL=test.mjs.map
