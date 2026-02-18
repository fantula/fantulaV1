import { executeAsync } from "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import getSupabaseClient from "./supabase-F2pQZHm6.js";
import { M as defineNuxtRouteMiddleware, m as useCookie, n as navigateTo } from "../server.mjs";
import { u as useUserStore } from "./user-CctDsbAN.js";
import "@supabase/supabase-js";
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
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
import "./common-Bgv_wRgd.js";
import "./cart-CDhPH3qi.js";
const clientAuth = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (to.path.includes("/login") || to.path.includes("/register")) return;
  if (to.query.code && to.query.state) {
    console.log("[client-auth] WeChat OAuth callback detected, skipping auth check");
    return;
  }
  if (to.hash && to.hash.includes("access_token")) {
    console.log("[client-auth] Magic Link callback detected, skipping auth check");
    return;
  }
  const userStore = useUserStore();
  if (!userStore.isLoggedIn) {
    [__temp, __restore] = executeAsync(() => userStore.init()), await __temp, __restore();
  }
  if (!userStore.isLoggedIn) {
    try {
      const supabase = getSupabaseClient();
      const { data: { session } } = ([__temp, __restore] = executeAsync(() => supabase.auth.getSession()), __temp = await __temp, __restore(), __temp);
      if (session?.user) {
        console.log("[client-auth] Restoring session from Supabase");
        const token = useCookie("token");
        token.value = session.access_token;
        ;
        [__temp, __restore] = executeAsync(() => userStore.init()), await __temp, __restore();
        ;
      }
    } catch (e) {
      console.warn("[client-auth] Failed to check Supabase session:", e);
    }
  }
  if (!userStore.isLoggedIn) {
    if (to.path.startsWith("/mobile/")) {
      return navigateTo("/mobile?login=1");
    }
    return navigateTo("/?login=1");
  }
});
export {
  clientAuth as default
};
//# sourceMappingURL=client-auth-BeR9u95m.js.map
