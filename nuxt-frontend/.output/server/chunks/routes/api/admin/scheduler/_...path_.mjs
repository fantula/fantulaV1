import { d as defineEventHandler, r as readBody, g as getQuery, c as createError, u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

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
