import { ck as getAuthToken, cl as EDGE_FUNCTIONS_URL } from './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';

async function uploadImageToStorage(file, folder = "uploads", onProgress) {
  try {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "\u53EA\u652F\u6301 JPG\u3001PNG\u3001GIF\u3001WebP \u683C\u5F0F\u7684\u56FE\u7247"
      };
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: "\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 10MB"
      };
    }
    let token = null;
    try {
      const { getAdminAuthToken } = await import('./server.mjs').then((n) => n.cm);
      token = await getAdminAuthToken();
    } catch (e) {
      console.warn("Failed to load admin token logic", e);
    }
    if (!token) {
      token = await getAuthToken();
    }
    if (!token) {
      return {
        success: false,
        error: "\u8BF7\u5148\u767B\u5F55\u540E\u53F0\u7BA1\u7406\u5458\u8D26\u53F7"
      };
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    if (onProgress) {
      return new Promise((resolve) => {
        const xhr = new (void 0)();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round(event.loaded / event.total * 100);
            onProgress(percent);
          }
        };
        xhr.onload = () => {
          try {
            const result2 = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve({ success: true, url: result2.url });
            } else {
              resolve({ success: false, error: result2.error || `\u4E0A\u4F20\u5931\u8D25 (HTTP ${xhr.status})` });
            }
          } catch {
            resolve({ success: false, error: "\u89E3\u6790\u54CD\u5E94\u5931\u8D25" });
          }
        };
        xhr.onerror = () => {
          resolve({ success: false, error: "\u7F51\u7EDC\u9519\u8BEF" });
        };
        xhr.open("POST", `${EDGE_FUNCTIONS_URL}/upload-r2`);
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(formData);
      });
    }
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/upload-r2`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: result.error || `\u4E0A\u4F20\u5931\u8D25 (HTTP ${response.status})`
      };
    }
    return {
      success: true,
      url: result.url
    };
  } catch (e) {
    console.error("Upload exception:", e);
    return { success: false, error: e.message || "\u4E0A\u4F20\u5931\u8D25" };
  }
}

export { uploadImageToStorage };
//# sourceMappingURL=uploadImage-C-btIIZs.mjs.map
