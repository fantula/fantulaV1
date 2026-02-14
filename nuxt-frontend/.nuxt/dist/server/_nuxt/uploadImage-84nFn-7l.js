import { getAuthToken, getEdgeFunctionsUrl } from "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "../server.mjs";
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "vue/server-renderer";
async function uploadImageToStorage(file, folder = "uploads", onProgress, token) {
  try {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "只支持 JPG、PNG、GIF、WebP 格式的图片"
      };
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: "图片大小不能超过 10MB"
      };
    }
    const finalToken = token || await getAuthToken();
    if (!finalToken) {
      return {
        success: false,
        error: "请先登录"
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
              resolve({ success: false, error: result2.error || `上传失败 (HTTP ${xhr.status})` });
            }
          } catch {
            resolve({ success: false, error: "解析响应失败" });
          }
        };
        xhr.onerror = () => {
          resolve({ success: false, error: "网络错误" });
        };
        const url = typeof getEdgeFunctionsUrl === "function" ? getEdgeFunctionsUrl() : "";
        xhr.open("POST", `${url}/upload-r2`);
        xhr.setRequestHeader("Authorization", `Bearer ${finalToken}`);
        xhr.send(formData);
      });
    }
    const response = await fetch(`${getEdgeFunctionsUrl()}/upload-r2`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${finalToken}`
      },
      body: formData
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: result.error || `上传失败 (HTTP ${response.status})`
      };
    }
    return {
      success: true,
      url: result.url
    };
  } catch (e) {
    console.error("Upload exception:", e);
    return { success: false, error: e.message || "上传失败" };
  }
}
async function deleteImageFromStorage(url) {
  console.warn("deleteImageFromStorage is deprecated, use adminImageApi.deleteImages() instead");
  return { success: true };
}
export {
  deleteImageFromStorage,
  uploadImageToStorage
};
//# sourceMappingURL=uploadImage-84nFn-7l.js.map
