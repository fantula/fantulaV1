import { executeAsync } from "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import { J as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "./auth-BCuS92ob.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
const clientAuth = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (to.path.includes("/login") || to.path.includes("/register")) return;
  const userStore = useUserStore();
  if (!userStore.isLoggedIn) {
    [__temp, __restore] = executeAsync(() => userStore.init()), await __temp, __restore();
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
//# sourceMappingURL=client-auth-DyaAYrHj.js.map
