import { getAuthToken, getEdgeFunctionsUrl } from './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

async function uploadImageToStorage(file, folder = "uploads", onProgress, token) {
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
    const finalToken = token || await getAuthToken();
    if (!finalToken) {
      return {
        success: false,
        error: "\u8BF7\u5148\u767B\u5F55"
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
async function deleteImageFromStorage(url) {
  console.warn("deleteImageFromStorage is deprecated, use adminImageApi.deleteImages() instead");
  return { success: true };
}

export { deleteImageFromStorage, uploadImageToStorage };
//# sourceMappingURL=uploadImage-DZo6xiHb.mjs.map
