import { createClient } from "@supabase/supabase-js";
import { j as useRuntimeConfig } from "../server.mjs";
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
function getSupabaseClient() {
  const config = useRuntimeConfig();
  const SUPABASE_URL = config.public.supabaseUrl || "http://127.0.0.1:54321";
  const SUPABASE_ANON_KEY = config.public.supabaseAnonKey || "sb_publishable_default_key";
  {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  }
}
const getEdgeFunctionsUrl = () => {
  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl || "http://127.0.0.1:54321";
  return `${url}/functions/v1`;
};
const EDGE_FUNCTIONS_URL = "";
async function getAuthToken() {
  const client = getSupabaseClient();
  const { data: { session } } = await client.auth.getSession();
  if (!session) return null;
  const expiresAt = session.expires_at;
  if (expiresAt && expiresAt - Math.floor(Date.now() / 1e3) < 60) {
    const { data: { session: refreshed } } = await client.auth.refreshSession();
    return refreshed?.access_token || session.access_token;
  }
  return session.access_token;
}
async function callEdgeFunction(functionName, options = {}) {
  const { method = "POST", body, params, requireAuth = true, token: customToken } = options;
  try {
    const headers = {
      "Content-Type": "application/json"
    };
    if (requireAuth) {
      const token = customToken || await getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    let url = `${getEdgeFunctionsUrl()}/${functionName}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : void 0
    });
    const data = await response.json();
    if (!response.ok) {
      return { data: null, error: data.error || data.message || `HTTP ${response.status}` };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "网络请求失败" };
  }
}
export {
  EDGE_FUNCTIONS_URL,
  callEdgeFunction,
  getSupabaseClient as default,
  getAuthToken,
  getEdgeFunctionsUrl,
  getSupabaseClient
};
//# sourceMappingURL=supabase-F2pQZHm6.js.map
