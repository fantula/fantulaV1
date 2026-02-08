import { H as executeAsync } from '../nitro/nitro.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { K as defineNuxtRouteMiddleware, k as useCookie, n as navigateTo } from './server.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@supabase/supabase-js';
import 'vue';
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
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';

const clientAuth = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (to.path.includes("/login") || to.path.includes("/register")) return;
  if (to.query.code && to.query.state) {
    console.log("[client-auth] WeChat OAuth callback detected, skipping auth check");
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
      if (session == null ? void 0 : session.user) {
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

export { clientAuth as default };
//# sourceMappingURL=client-auth-B348P7eD.mjs.map
