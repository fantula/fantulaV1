import { defineEventHandler, readBody, getQuery, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';

const ____path_ = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const schedulerBaseUrl = config.schedulerInternalUrl || "http://127.0.0.1:3001";
  const path = ((_a = event.context.params) == null ? void 0 : _a.path) || "";
  const targetUrl = `${schedulerBaseUrl}/${path}`;
  const method = event.method;
  try {
    const fetchOptions = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (method === "POST") {
      try {
        const body = await readBody(event);
        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }
      } catch {
      }
    }
    const query = getQuery(event);
    const queryString = new URLSearchParams(query).toString();
    const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;
    const response = await fetch(finalUrl, fetchOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[Scheduler Proxy] Failed to reach ${targetUrl}:`, error.message);
    throw createError({
      statusCode: 502,
      message: `\u5B9A\u65F6\u5668\u670D\u52A1\u8FDE\u63A5\u5931\u8D25: ${error.message}`
    });
  }
});

export { ____path_ as default };
//# sourceMappingURL=_...path_.mjs.map
