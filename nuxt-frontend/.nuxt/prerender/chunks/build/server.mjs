import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, createElementBlock, openBlock, createElementVNode, getCurrentInstance, inject, computed, unref, ref, shallowRef, h, resolveComponent, Suspense, hasInjectionContext, provide, cloneVNode, isRef, warn, shallowReactive, Fragment, mergeProps, watch, withCtx, createTextVNode, renderSlot, normalizeClass, createVNode, Transition, withDirectives, normalizeStyle, toDisplayString, vShow, reactive, markRaw, effectScope, isReactive, toRef, toRaw, nextTick, getCurrentScope, onScopeDispose, toRefs, readonly, useSSRContext, createBlock, createCommentVNode, resolveDynamicComponent, withModifiers, createApp, isVNode, onErrorCaptured, onServerPrefetch, isReadonly, isShallow, render, defineAsyncComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { $fetch } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import { p as publicAssetsURL, b as baseURL } from '../_/renderer.mjs';
import { createHooks } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import { getContext, executeAsync } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import { createError as createError$1, sanitizeStatusCode, getRequestHeader, appendHeader, setCookie, getCookie, deleteCookie } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { RouterView, useRouter as useRouter$1, useRoute as useRoute$1, createMemoryHistory, createRouter, START_LOCATION } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { toRouteMatcher, createRouter as createRouter$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import { defu } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import { parseQuery, hasProtocol, isScriptProtocol, joinURL, withQuery, withTrailingSlash, withoutTrailingSlash } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import { createClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import { klona } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import { isClient, computedEager, useEventListener, useResizeObserver, useTimeoutFn } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { isArray as isArray$1, isObject as isObject$1, NOOP, isString as isString$1, camelize, hasOwn, isFunction as isFunction$2 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { fromPairs, isNil, get, set as set$1, isEqual } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import FormData$1 from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import crypto from 'node:crypto';
import url from 'node:url';
import proxyFromEnv from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import http from 'node:http';
import https from 'node:https';
import http2 from 'node:http2';
import util from 'node:util';
import followRedirects from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import zlib from 'node:zlib';
import stream, { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import { parse } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import destr from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import { isEqual as isEqual$1 } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import { ssrRenderTeleport, ssrRenderStyle, ssrInterpolate, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrLooseContain, ssrRenderVNode, ssrRenderSuspense } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.20.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
function toArray$2(value) {
  return Array.isArray(value) ? value : [value];
}
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url2 = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url2.pathname + url2.search + url2.hash;
  }
  if (location2.startsWith("//")) {
    return url2.toString().replace(url2.protocol, "");
  }
  return url2.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$C = { ssr: false };
const __nuxt_page_meta$B = { ssr: false };
const __nuxt_page_meta$A = null;
const __nuxt_page_meta$z = { title: "兑换码管理" };
const __nuxt_page_meta$y = {
  middleware: [
    function(to, from) {
      return navigateTo("/_mgmt_9Xfa3/cdk/virtual");
    }
  ]
};
const __nuxt_page_meta$x = { title: "虚拟充值管理" };
const __nuxt_page_meta$w = { title: "账号合租管理" };
const __nuxt_page_meta$v = null;
const __nuxt_page_meta$u = {
  title: "仪表盘"
};
const __nuxt_page_meta$t = {
  layout: false
};
const __nuxt_page_meta$s = {
  title: "轮播图管理"
};
const __nuxt_page_meta$r = null;
const __nuxt_page_meta$q = { ssr: false };
const __nuxt_page_meta$p = {
  title: "用户管理"
};
const __nuxt_page_meta$o = {
  title: "部门管理"
};
const __nuxt_page_meta$n = null;
const __nuxt_page_meta$m = { ssr: false };
const __nuxt_page_meta$l = { ssr: false };
const __nuxt_page_meta$k = { ssr: false };
const __nuxt_page_meta$j = { ssr: false };
const __nuxt_page_meta$i = { ssr: false };
const __nuxt_page_meta$h = {
  title: "退款统计"
};
const __nuxt_page_meta$g = null;
const __nuxt_page_meta$f = { title: "商品编辑" };
const __nuxt_page_meta$e = {
  title: "商品管理"
};
const __nuxt_page_meta$d = { title: "商品分类管理" };
const __nuxt_page_meta$c = { title: "共享规格管理" };
const __nuxt_page_meta$b = null;
const __nuxt_page_meta$a = {
  middleware: [
    function(to, from) {
      return navigateTo("/_mgmt_9Xfa3/recharge/tiers");
    }
  ]
};
const __nuxt_page_meta$9 = null;
const __nuxt_page_meta$8 = null;
const __nuxt_page_meta$7 = {
  title: "图片管理"
};
const __nuxt_page_meta$6 = {
  title: "轮播图管理"
};
const __nuxt_page_meta$5 = {
  title: "退款管理"
};
const __nuxt_page_meta$4 = {
  title: "消息发送管理"
};
const __nuxt_page_meta$3 = {
  middleware: [
    function(to, from) {
      return navigateTo("/_mgmt_9Xfa3/backend-settings/storage");
    }
  ]
};
const __nuxt_page_meta$2 = null;
const __nuxt_page_meta$1 = null;
const __nuxt_page_meta = { ssr: false };
const _routes = [
  {
    name: "faq",
    path: "/faq",
    component: () => import('./faq-B1d3CfEx.mjs')
  },
  {
    name: "id",
    path: "/:id()",
    component: () => import('./_id_-BQGZIfw_.mjs')
  },
  {
    name: "cart",
    path: "/cart",
    component: () => import('./cart-B3bx4XpX.mjs')
  },
  {
    name: "about",
    path: "/about",
    component: () => import('./about-Dafc6TM9.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-CdB734IG.mjs')
  },
  {
    name: "policy",
    path: "/policy",
    component: () => import('./policy-D0w2fO4v.mjs')
  },
  {
    name: "refund",
    path: "/refund",
    component: () => import('./refund-DI7b9Vv6.mjs')
  },
  {
    name: "company",
    path: "/company",
    component: () => import('./company-C5shCCox.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import('./contact-Ce8LSQLB.mjs')
  },
  {
    name: "privacy",
    path: "/privacy",
    component: () => import('./privacy-CqmYoMoT.mjs')
  },
  {
    name: __nuxt_page_meta$A?.name,
    path: "/profile",
    component: () => import('./profile-B9UKXqIB.mjs'),
    children: [
      {
        name: "profile",
        path: "",
        component: () => import('./index-Bw0sIbIb.mjs')
      },
      {
        name: "profile-wallet",
        path: "wallet",
        component: () => import('./wallet-B2ooliuK.mjs')
      },
      {
        name: "profile-tickets",
        path: "tickets",
        component: () => import('./tickets-VcvNI0l7.mjs')
      },
      {
        name: "profile-exchange",
        path: "exchange",
        component: () => import('./exchange-KPAOmvua.mjs')
      },
      {
        name: "profile-messages",
        path: "messages",
        component: () => import('./messages-H5pbhYcv.mjs')
      },
      {
        name: "profile-referral",
        path: "referral",
        component: () => import('./referral-CXlLgOio.mjs')
      },
      {
        name: "profile-favorites",
        path: "favorites",
        component: () => import('./favorites-CPIQFUaX.mjs')
      },
      {
        name: "profile-order-id",
        path: "order/:id()",
        meta: __nuxt_page_meta$C || {},
        component: () => import('./_id_-BmMX4F2y.mjs')
      },
      {
        name: "profile-order",
        path: "order",
        meta: __nuxt_page_meta$B || {},
        component: () => import('./index-BZhUBU5A.mjs')
      }
    ]
  },
  {
    name: "service",
    path: "/service",
    component: () => import('./service-CW-Bx9iI.mjs')
  },
  {
    name: "about-us",
    path: "/about-us",
    component: () => import('./about-us-CapKEiF5.mjs')
  },
  {
    name: "community",
    path: "/community",
    component: () => import('./community-CyTjc0rg.mjs')
  },
  {
    name: "disclaimer",
    path: "/disclaimer",
    component: () => import('./disclaimer-CCcKpb_T.mjs')
  },
  {
    name: "goods-id",
    path: "/goods/:id()",
    component: () => import('./_id_-DeMxHHiA.mjs')
  },
  {
    name: __nuxt_page_meta$1?.name,
    path: "/_mgmt_9Xfa3",
    component: () => import('./_mgmt_9Xfa3--kAluYQM.mjs'),
    children: [
      {
        name: __nuxt_page_meta$v?.name,
        path: "cdk",
        component: () => import('./cdk-EnZN4ieC.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-cdk-cdks",
            path: "cdks",
            component: () => import('./cdks-DYwHvdnx.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk-keys",
            path: "keys",
            meta: __nuxt_page_meta$z || {},
            component: () => import('./keys-B_fXYAmV.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk-post",
            path: "post",
            component: () => import('./post-CqqH5X0N.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk-debug",
            path: "debug",
            component: () => import('./debug-DZf9t1eR.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk",
            path: "",
            meta: __nuxt_page_meta$y || {},
            component: () => import('./index-Qnq5wXns.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk-virtual",
            path: "virtual",
            meta: __nuxt_page_meta$x || {},
            component: () => import('./virtual-B_nYnTsU.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk-accounts",
            path: "accounts",
            meta: __nuxt_page_meta$w || {},
            component: () => import('./accounts-DaZYCU5I.mjs')
          },
          {
            name: "_mgmt_9Xfa3-cdk-edit-id",
            path: "edit/:id()",
            component: () => import('./_id_-CGIXBHjC.mjs')
          }
        ]
      },
      {
        name: "_mgmt_9Xfa3",
        path: "",
        meta: __nuxt_page_meta$u || {},
        component: () => import('./index-6S3h3Htr.mjs')
      },
      {
        name: "_mgmt_9Xfa3-login",
        path: "login",
        meta: __nuxt_page_meta$t || {},
        component: () => import('./login-DHYdf6uF.mjs')
      },
      {
        name: __nuxt_page_meta$r?.name,
        path: "media",
        component: () => import('./media-DDcD1UDt.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-media",
            path: "",
            component: () => import('./index-D8dffWAm.mjs')
          },
          {
            name: "_mgmt_9Xfa3-media-images",
            path: "images",
            component: () => import('./images-DWx0AUSH.mjs')
          },
          {
            name: "_mgmt_9Xfa3-media-banners",
            path: "banners",
            meta: __nuxt_page_meta$s || {},
            component: () => import('./banners-BWnBdaKR.mjs')
          }
        ]
      },
      {
        name: __nuxt_page_meta$n?.name,
        path: "users",
        component: () => import('./users-D7dUk3Aa.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-users",
            path: "",
            meta: __nuxt_page_meta$q || {},
            component: () => import('./index-C-Ea41kP.mjs')
          },
          {
            name: "_mgmt_9Xfa3-users-accounts",
            path: "accounts",
            meta: __nuxt_page_meta$p || {},
            component: () => import('./index-BeyraRO8.mjs')
          },
          {
            name: "_mgmt_9Xfa3-users-departments",
            path: "departments",
            meta: __nuxt_page_meta$o || {},
            component: () => import('./index-UBUsDtHS.mjs')
          }
        ]
      },
      {
        name: "_mgmt_9Xfa3-orders",
        path: "orders",
        component: () => import('./orders-Dipj1ssh.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-orders-cdkey",
            path: "cdkey",
            meta: __nuxt_page_meta$m || {},
            component: () => import('./index-BBPNw4s_.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-share",
            path: "share",
            meta: __nuxt_page_meta$l || {},
            component: () => import('./index-CE_ce1UJ.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-cdkey-detail",
            path: "cdkey/detail",
            component: () => import('./detail-eWJCKUr7.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-refund",
            path: "refund",
            meta: __nuxt_page_meta$k || {},
            component: () => import('./index-BZTIVZRx.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-share-detail",
            path: "share/detail",
            component: () => import('./detail-Cw_aGZrF.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-recharge",
            path: "recharge",
            meta: __nuxt_page_meta$j || {},
            component: () => import('./index-Cbxj_iPe.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-preorders",
            path: "preorders",
            meta: __nuxt_page_meta$i || {},
            component: () => import('./index-CD7ZDQ0f.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-recharge-detail",
            path: "recharge/detail",
            component: () => import('./detail-BR1d1RBF.mjs')
          },
          {
            name: "_mgmt_9Xfa3-orders-cancelled-refunds",
            path: "cancelled-refunds",
            meta: __nuxt_page_meta$h || {},
            component: () => import('./index-DPzIHOE-.mjs')
          }
        ]
      },
      {
        name: __nuxt_page_meta$g?.name,
        path: "coupons",
        component: () => import('./coupons-1rxxPizg.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-coupons",
            path: "",
            component: () => import('./index-DkaRZdkg.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-flat-post",
            path: "flat/post",
            component: () => import('./post-IXg0RdqS.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-flat",
            path: "flat",
            component: () => import('./index-BcDD6Dtx.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-stats",
            path: "stats",
            component: () => import('./index-BOPc54D6.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-balance-post",
            path: "balance/post",
            component: () => import('./post-C86zZuxa.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-product-post",
            path: "product/post",
            component: () => import('./post-DWLyqUjF.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-balance",
            path: "balance",
            component: () => import('./index-Se-b_hRa.mjs')
          },
          {
            name: "_mgmt_9Xfa3-coupons-product",
            path: "product",
            component: () => import('./index-fzi4nC9r.mjs')
          }
        ]
      },
      {
        name: "_mgmt_9Xfa3-faq-post",
        path: "faq/post",
        component: () => import('./post-CCI39wE9.mjs')
      },
      {
        name: __nuxt_page_meta$b?.name,
        path: "products",
        component: () => import('./products-Bcl54yLS.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-products-post",
            path: "post",
            meta: __nuxt_page_meta$f || {},
            component: () => import('./post-BPTaom9z.mjs')
          },
          {
            name: "_mgmt_9Xfa3-products-skus",
            path: "skus",
            component: () => import('./skus-DXFjVCex.mjs')
          },
          {
            name: "_mgmt_9Xfa3-products",
            path: "",
            meta: __nuxt_page_meta$e || {},
            component: () => import('./index-tnRVnrFX.mjs')
          },
          {
            name: "_mgmt_9Xfa3-products-sku-id",
            path: "sku/:id()",
            component: () => import('./_id_-1CGK7MJb.mjs')
          },
          {
            name: "_mgmt_9Xfa3-products-categories",
            path: "categories",
            meta: __nuxt_page_meta$d || {},
            component: () => import('./categories-BJoiUj_8.mjs')
          },
          {
            name: "_mgmt_9Xfa3-products-shared-sku",
            path: "shared-sku",
            meta: __nuxt_page_meta$c || {},
            component: () => import('./shared-sku-DY5SD9Sr.mjs')
          }
        ]
      },
      {
        name: __nuxt_page_meta$9?.name,
        path: "recharge",
        component: () => import('./recharge-DWE4vCcH.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-recharge",
            path: "",
            meta: __nuxt_page_meta$a || {},
            component: () => import('./index-CBAYSvu3.mjs')
          },
          {
            name: "_mgmt_9Xfa3-recharge-tiers",
            path: "tiers",
            component: () => import('./tiers-DTyqpu_x.mjs')
          },
          {
            name: "_mgmt_9Xfa3-recharge-orders",
            path: "orders",
            component: () => import('./orders-6oQDuOQH.mjs')
          }
        ]
      },
      {
        name: "_mgmt_9Xfa3-faq",
        path: "faq",
        component: () => import('./index-BSQEsBJC.mjs')
      },
      {
        name: __nuxt_page_meta$8?.name,
        path: "help-center",
        component: () => import('./help-center-CFV5svYP.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-help-center-faq",
            path: "faq",
            component: () => import('./faq-BJ7RB-iQ.mjs'),
            children: [
              {
                name: "_mgmt_9Xfa3-help-center-faq-post",
                path: "post",
                component: () => import('./post-CxB1OAdi.mjs')
              }
            ]
          },
          {
            name: "_mgmt_9Xfa3-help-center",
            path: "",
            component: () => import('./index-COdo_xnW.mjs')
          },
          {
            name: "_mgmt_9Xfa3-help-center-articles",
            path: "articles",
            component: () => import('./articles-CUzQDGRf.mjs'),
            children: [
              {
                name: "_mgmt_9Xfa3-help-center-articles-post",
                path: "post",
                component: () => import('./post-BQ21BMZ_.mjs')
              }
            ]
          },
          {
            name: "_mgmt_9Xfa3-help-center-faq-categories",
            path: "faq-categories",
            component: () => import('./faq-categories-CxKTEnwZ.mjs')
          },
          {
            name: "_mgmt_9Xfa3-help-center-article-categories",
            path: "article-categories",
            component: () => import('./article-categories-2WXsiF2z.mjs')
          }
        ]
      },
      {
        name: "_mgmt_9Xfa3-article-post",
        path: "article/post",
        component: () => import('./post-DIGtBYuJ.mjs')
      },
      {
        name: "_mgmt_9Xfa3-faq-category",
        path: "faq/category",
        component: () => import('./category-DH7p9iRI.mjs')
      },
      {
        name: "_mgmt_9Xfa3-images",
        path: "images",
        meta: __nuxt_page_meta$7 || {},
        component: () => import('./index-BJ-NxF7C.mjs')
      },
      {
        name: "_mgmt_9Xfa3-article",
        path: "article",
        component: () => import('./index-BQIj21bO.mjs')
      },
      {
        name: "_mgmt_9Xfa3-banners",
        path: "banners",
        meta: __nuxt_page_meta$6 || {},
        component: () => import('./index-CjnNa-q7.mjs')
      },
      {
        name: "_mgmt_9Xfa3-refunds",
        path: "refunds",
        meta: __nuxt_page_meta$5 || {},
        component: () => import('./index-BVik5JWj.mjs')
      },
      {
        name: "_mgmt_9Xfa3-tickets",
        path: "tickets",
        component: () => import('./index-6L1kOSdi.mjs')
      },
      {
        name: "_mgmt_9Xfa3-messages",
        path: "messages",
        meta: __nuxt_page_meta$4 || {},
        component: () => import('./index-Dct6vo3M.mjs')
      },
      {
        name: __nuxt_page_meta$2?.name,
        path: "backend-settings",
        component: () => import('./backend-settings-DHK8a8YI.mjs'),
        children: [
          {
            name: "_mgmt_9Xfa3-backend-settings",
            path: "",
            meta: __nuxt_page_meta$3 || {},
            component: () => import('./index-BbbO9_Bi.mjs')
          },
          {
            name: "_mgmt_9Xfa3-backend-settings-storage",
            path: "storage",
            component: () => import('./storage-DgFfIUZf.mjs')
          },
          {
            name: "_mgmt_9Xfa3-backend-settings-scheduler",
            path: "scheduler",
            component: () => import('./scheduler-BuB-Aqri.mjs')
          }
        ]
      },
      {
        name: "_mgmt_9Xfa3-article-categories",
        path: "article/categories",
        component: () => import('./categories-DGTxmuNE.mjs')
      },
      {
        name: "_mgmt_9Xfa3-tickets-components-TicketChatModal",
        path: "tickets/components/TicketChatModal",
        component: () => import('./TicketChatModal-B0_FVH8D.mjs').then((n) => n.b)
      }
    ]
  },
  {
    name: "article-id",
    path: "/article/:id()",
    component: () => import('./_id_-iC7TssmB.mjs')
  },
  {
    name: "checkout-id",
    path: "/checkout/:id()",
    meta: __nuxt_page_meta || {},
    component: () => import('./_id_-CQyFWmRt.mjs')
  },
  {
    name: "support-refund-create",
    path: "/support/refund/create",
    component: () => import('./create-Bbz2fR_0.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  scrollBehaviorType: "smooth",
  hashMode: false
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = /* @__PURE__ */ Symbol("pinia") ;
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = /* @__PURE__ */ Symbol();
const ACTION_NAME = /* @__PURE__ */ Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = /* @__PURE__ */ Symbol("pinia:skipHydration") ;
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = { deep: true };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = /* @__PURE__ */ Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } 
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) );
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const actionFn = newStore[actionName];
        set(store, actionName, action(actionFn, actionName));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
console.log(">>> supabase-admin.ts LOADED - Using SERVICE_ROLE key <<<");
const SUPABASE_URL$1 = "http://127.0.0.1:54321";
const SUPABASE_SERVICE_ROLE_KEY = "sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz";
const ADMIN_STORAGE_KEY = "sb-admin-auth-token";
let adminSupabaseClient = null;
function getAdminSupabaseClient() {
  if (!adminSupabaseClient) {
    console.log("[Admin Client] Creating new Supabase client with service_role key");
    adminSupabaseClient = createClient(SUPABASE_URL$1, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: true,
        storageKey: ADMIN_STORAGE_KEY,
        autoRefreshToken: true,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          // 强制使用 Service Role Key 作为 Authorization Header
          // 这能防止 Supabase JS 自动使用 LocalStorage 中的用户 Token 覆盖它
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    });
  }
  return adminSupabaseClient;
}
async function getAdminAuthToken() {
  const client = getAdminSupabaseClient();
  const { data: { session } } = await client.auth.getSession();
  return session?.access_token || null;
}
async function adminSignOut() {
  const client = getAdminSupabaseClient();
  await client.auth.signOut();
}
const supabaseAdmin = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  adminSignOut,
  getAdminAuthToken,
  getAdminSupabaseClient
}, Symbol.toStringTag, { value: "Module" }));
const useAdminStore = /* @__PURE__ */ defineStore("admin", () => {
  const adminUser = ref(null);
  const adminInfo = ref(null);
  const loading = ref(true);
  const isInitialized = ref(false);
  const isLoggedIn = computed(() => !!adminUser.value);
  const permissions = computed(() => adminInfo.value?.department?.permissions || []);
  const init = async () => {
    if (isInitialized.value) return;
    loading.value = true;
    try {
      const client = getAdminSupabaseClient();
      const { data: { session } } = await client.auth.getSession();
      if (session) {
        const { data: adminData } = await client.from("admin_users").select(`
                        *,
                        department:admin_departments(id, name, permissions)
                    `).eq("auth_user_id", session.user.id).single();
        if (adminData) {
          adminUser.value = {
            id: session.user.id,
            email: session.user.email || "",
            role: adminData.role || "admin"
          };
          adminInfo.value = adminData;
        } else {
          await logout();
        }
      } else {
        adminUser.value = null;
        adminInfo.value = null;
      }
    } catch (error) {
      console.error("Admin init error:", error);
      adminUser.value = null;
      adminInfo.value = null;
    } finally {
      loading.value = false;
      isInitialized.value = true;
    }
  };
  const login = async (email, password) => {
    try {
      const client = getAdminSupabaseClient();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (!data.session) {
        return { success: false, error: "登录失败，无法获取 Session" };
      }
      const { data: adminData, error: adminError } = await client.from("admin_users").select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `).eq("auth_user_id", data.session.user.id).single();
      if (adminError || !adminData) {
        await client.auth.signOut();
        return { success: false, error: "该账号不是管理员" };
      }
      adminUser.value = {
        id: data.session.user.id,
        email: data.session.user.email || "",
        role: adminData.role || "admin"
      };
      adminInfo.value = adminData;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "登录失败" };
    }
  };
  const logout = async () => {
    try {
      await adminSignOut();
    } catch (error) {
      console.error("Admin logout error:", error);
    } finally {
      adminUser.value = null;
      adminInfo.value = null;
    }
  };
  const sendOtp = async (email) => {
    try {
      const client = getAdminSupabaseClient();
      const { data: adminData } = await client.from("admin_users").select("id, status").eq("email", email).single();
      if (!adminData) {
        return { success: false, error: "该邮箱未注册为管理员" };
      }
      if (adminData.status !== "enabled") {
        return { success: false, error: "该账号已被禁用" };
      }
      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
          // 不自动创建用户
        }
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "发送验证码失败" };
    }
  };
  const loginWithOtp = async (email, code) => {
    try {
      const client = getAdminSupabaseClient();
      const { data, error } = await client.auth.verifyOtp({
        email,
        token: code,
        type: "email"
      });
      if (error) {
        if (error.message.includes("Token has expired") || error.message.includes("invalid")) {
          return { success: false, error: "验证码已过期或无效" };
        }
        return { success: false, error: error.message };
      }
      if (!data.session) {
        return { success: false, error: "登录失败，无法获取 Session" };
      }
      const { data: adminData, error: adminError } = await client.from("admin_users").select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `).eq("auth_user_id", data.session.user.id).single();
      if (adminError || !adminData) {
        await client.auth.signOut();
        return { success: false, error: "该账号不是管理员" };
      }
      if (adminData.status !== "enabled") {
        await client.auth.signOut();
        return { success: false, error: "该账号已被禁用" };
      }
      adminUser.value = {
        id: data.session.user.id,
        email: data.session.user.email || "",
        role: adminData.role || "admin"
      };
      adminInfo.value = adminData;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "登录失败" };
    }
  };
  const hasPermission = (path) => {
    if (!adminUser.value) return false;
    const deptName = adminInfo.value?.department?.name || "";
    const perms = adminInfo.value?.department?.permissions || [];
    if (deptName.includes("超级") || perms.includes("*")) return true;
    if (path === "/_mgmt_9Xfa3") return true;
    if (permissions.value.length === 0) return true;
    if (permissions.value.includes(path)) return true;
    for (const perm of permissions.value) {
      if (path.startsWith(perm + "/")) return true;
    }
    return false;
  };
  return {
    // 状态
    user: readonly(adminUser),
    // 兼容旧代码
    adminUser: readonly(adminUser),
    adminInfo: readonly(adminInfo),
    isLoggedIn,
    isInitialized: readonly(isInitialized),
    loading: readonly(loading),
    permissions,
    // 方法
    init,
    login,
    logout,
    sendOtp,
    loginWithOtp,
    hasPermission
  };
});
const admin_45auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (!to.path.startsWith("/_mgmt_9Xfa3")) return;
  if (to.path === "/_mgmt_9Xfa3/login") return;
  const adminStore = useAdminStore();
  if (!adminStore.isInitialized) {
    [__temp, __restore] = executeAsync(() => adminStore.init()), await __temp, __restore();
  }
  if (!adminStore.isLoggedIn) {
    return navigateTo("/_mgmt_9Xfa3/login");
  }
  if (!adminStore.hasPermission(to.path)) {
    return navigateTo("/_mgmt_9Xfa3");
  }
});
const redirect_45global = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/_mgmt_9Xfa3/orders" || to.path === "/_mgmt_9Xfa3/orders/") {
    return navigateTo("/_mgmt_9Xfa3/orders/recharge");
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  admin_45auth_45global,
  redirect_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0$2 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function prerenderRoutes(path) {
  const paths = toArray$2(path);
  appendHeader(useRequestEvent(), "x-nitro-prerender", paths.map((p) => encodeURIComponent(p)).join(", "));
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies2 = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies2[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies2[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual$1(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url2 = new URL(href.value, "http://localhost");
              return {
                path: url2.pathname,
                fullPath: url2.pathname,
                get query() {
                  return parseQuery(url2.search);
                },
                hash: url2.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            return props.replace ? router.replace(href.value) : router.push(href.value);
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const element_plus_teleports_plugin_3k7A_fjEiCzFRl6aN3qftblOS_EZCmhIb_4gXrhvbuY = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:rendered", (ctx) => {
    if (ctx.ssrContext?.teleports) {
      ctx.ssrContext.teleports = renderTeleports(ctx.ssrContext.teleports);
    }
  });
});
function renderTeleports(teleports) {
  const body = Object.entries(teleports).reduce((all3, [key, value]) => {
    if (key.startsWith("#el-popper-container-") || [].includes(key)) {
      return `${all3}<div id="${key.slice(1)}">${value}</div>`;
    }
    return all3;
  }, teleports.body || "");
  return { ...teleports, body };
}
const defaultNamespace = "el";
const statePrefix = "is-";
const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};
const namespaceContextKey = /* @__PURE__ */ Symbol("namespaceContextKey");
const useGetDerivedNamespace = (namespaceOverrides) => {
  const derivedNamespace = namespaceOverrides || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace));
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};
const useNamespace = (block, namespaceOverrides) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides);
  const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
  const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
  const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
  const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
  const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
  const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  const cssVar = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarBlock = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarName = (name) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  };
};
class ElementPlusError extends Error {
  constructor(m) {
    super(m);
    this.name = "ElementPlusError";
  }
}
function throwError(scope, m) {
  throw new ElementPlusError(`[${scope}] ${m}`);
}
function debugWarn(scope, message2) {
  {
    const error = isString$1(scope) ? new ElementPlusError(`[${scope}] ${message2}`) : scope;
    console.warn(error);
  }
}
const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
};
const ID_INJECTION_KEY = /* @__PURE__ */ Symbol("elIdInjection");
const useIdInjection = () => {
  return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
};
const useId = (deterministicId) => {
  const idInjection = useIdInjection();
  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn(
      "IdInjection",
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`
    );
  }
  const namespace = useGetDerivedNamespace();
  const idRef = computedEager(
    () => unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`
  );
  return idRef;
};
const isUndefined$1 = (val) => val === void 0;
const isBoolean$1 = (val) => typeof val === "boolean";
const isNumber$1 = (val) => typeof val === "number";
const isEmpty = (val) => !val && val !== 0 || isArray$1(val) && val.length === 0 || isObject$1(val) && !Object.keys(val).length;
const isElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isPropAbsent = (prop) => isNil(prop);
const isStringNumber = (val) => {
  if (!isString$1(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
const isWindow = (val) => val === void 0;
const initial = {
  current: 0
};
const zIndex = ref(0);
const defaultInitialZIndex = 2e3;
const ZINDEX_INJECTION_KEY = /* @__PURE__ */ Symbol("elZIndexContextKey");
const zIndexContextKey = /* @__PURE__ */ Symbol("zIndexContextKey");
const useZIndex = (zIndexOverrides) => {
  const increasingInjection = getCurrentInstance() ? inject(ZINDEX_INJECTION_KEY, initial) : initial;
  const zIndexInjection = zIndexOverrides || (getCurrentInstance() ? inject(zIndexContextKey, void 0) : void 0);
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection);
    return isNumber$1(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    increasingInjection.current++;
    zIndex.value = increasingInjection.current;
    return currentZIndex.value;
  };
  if (!isClient && !inject(ZINDEX_INJECTION_KEY)) {
    debugWarn(
      "ZIndexInjection",
      `Looks like you are using server rendering, you must provide a z-index provider to ensure the hydration process to be succeed
usage: app.provide(ZINDEX_INJECTION_KEY, { current: 0 })`
    );
  }
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};
const element_plus_injection_plugin_LfLkpoHjV8s4Q4lRVuq_y_LbzJB5vFvehZzxqpiP_nk = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, { "prefix": 1024, "current": 0 }).provide(ZINDEX_INJECTION_KEY, { "current": 0 });
});
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message2, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message2;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config, request, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (FormData$1 || FormData)();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = url.URLSearchParams;
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  const randomValues = new Uint32Array(size);
  crypto.randomFillSync(randomValues);
  for (let i = 0; i < size; i++) {
    str += alphabet[randomValues[i] % length];
  }
  return str;
};
const platform$1 = {
  isNode: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: typeof Blob !== "undefined" && Blob || null
  },
  ALPHABET,
  generateString,
  protocols: ["http", "https", "file", "data"]
};
const hasBrowserEnv = false;
const _navigator = void 0;
const hasStandardBrowserEnv = hasBrowserEnv;
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = /* @__PURE__ */ Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry2 of header) {
        if (!utils$1.isArray(entry2)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry2[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry2[1]] : [dest, entry2[1]] : entry2[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed2 = new this(first);
    targets.forEach((target) => computed2.set(target));
    return computed2;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message2, config, request) {
  AxiosError$1.call(this, message2 == null ? "canceled" : message2, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}
function combineURLs(baseURL2, relativeURL) {
  return relativeURL ? baseURL2.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL2;
}
function buildFullPath(baseURL2, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL2 && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL2, requestedURL);
  }
  return requestedURL;
}
const VERSION$1 = "1.13.2";
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}
const DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function fromDataURI(uri, asBlob, options) {
  const _Blob = options && options.Blob || platform.classes.Blob;
  const protocol = parseProtocol(uri);
  if (asBlob === void 0 && _Blob) {
    asBlob = true;
  }
  if (protocol === "data") {
    uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
    const match = DATA_URL_PATTERN.exec(uri);
    if (!match) {
      throw new AxiosError$1("Invalid URL", AxiosError$1.ERR_INVALID_URL);
    }
    const mime = match[1];
    const isBase64 = match[2];
    const body = match[3];
    const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? "base64" : "utf8");
    if (asBlob) {
      if (!_Blob) {
        throw new AxiosError$1("Blob is not supported", AxiosError$1.ERR_NOT_SUPPORT);
      }
      return new _Blob([buffer], { type: mime });
    }
    return buffer;
  }
  throw new AxiosError$1("Unsupported protocol " + protocol, AxiosError$1.ERR_NOT_SUPPORT);
}
const kInternals = /* @__PURE__ */ Symbol("internals");
class AxiosTransformStream extends stream.Transform {
  constructor(options) {
    options = utils$1.toFlatObject(options, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (prop, source) => {
      return !utils$1.isUndefined(source[prop]);
    });
    super({
      readableHighWaterMark: options.chunkSize
    });
    const internals = this[kInternals] = {
      timeWindow: options.timeWindow,
      chunkSize: options.chunkSize,
      maxRate: options.maxRate,
      minChunkSize: options.minChunkSize,
      bytesSeen: 0,
      isCaptured: false,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (event) => {
      if (event === "progress") {
        if (!internals.isCaptured) {
          internals.isCaptured = true;
        }
      }
    });
  }
  _read(size) {
    const internals = this[kInternals];
    if (internals.onReadCallback) {
      internals.onReadCallback();
    }
    return super._read(size);
  }
  _transform(chunk, encoding, callback) {
    const internals = this[kInternals];
    const maxRate = internals.maxRate;
    const readableHighWaterMark = this.readableHighWaterMark;
    const timeWindow = internals.timeWindow;
    const divider = 1e3 / timeWindow;
    const bytesThreshold = maxRate / divider;
    const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;
    const pushChunk = (_chunk, _callback) => {
      const bytes = Buffer.byteLength(_chunk);
      internals.bytesSeen += bytes;
      internals.bytes += bytes;
      internals.isCaptured && this.emit("progress", internals.bytesSeen);
      if (this.push(_chunk)) {
        process.nextTick(_callback);
      } else {
        internals.onReadCallback = () => {
          internals.onReadCallback = null;
          process.nextTick(_callback);
        };
      }
    };
    const transformChunk = (_chunk, _callback) => {
      const chunkSize = Buffer.byteLength(_chunk);
      let chunkRemainder = null;
      let maxChunkSize = readableHighWaterMark;
      let bytesLeft;
      let passed = 0;
      if (maxRate) {
        const now = Date.now();
        if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
          internals.ts = now;
          bytesLeft = bytesThreshold - internals.bytes;
          internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
          passed = 0;
        }
        bytesLeft = bytesThreshold - internals.bytes;
      }
      if (maxRate) {
        if (bytesLeft <= 0) {
          return setTimeout(() => {
            _callback(null, _chunk);
          }, timeWindow - passed);
        }
        if (bytesLeft < maxChunkSize) {
          maxChunkSize = bytesLeft;
        }
      }
      if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
        chunkRemainder = _chunk.subarray(maxChunkSize);
        _chunk = _chunk.subarray(0, maxChunkSize);
      }
      pushChunk(_chunk, chunkRemainder ? () => {
        process.nextTick(_callback, null, chunkRemainder);
      } : _callback);
    };
    transformChunk(chunk, function transformNextChunk(err, _chunk) {
      if (err) {
        return callback(err);
      }
      if (_chunk) {
        transformChunk(_chunk, transformNextChunk);
      } else {
        callback(null);
      }
    });
  }
}
const { asyncIterator } = Symbol;
const readBlob = async function* (blob) {
  if (blob.stream) {
    yield* blob.stream();
  } else if (blob.arrayBuffer) {
    yield await blob.arrayBuffer();
  } else if (blob[asyncIterator]) {
    yield* blob[asyncIterator]();
  } else {
    yield blob;
  }
};
const BOUNDARY_ALPHABET = platform.ALPHABET.ALPHA_DIGIT + "-_";
const textEncoder = typeof TextEncoder === "function" ? new TextEncoder() : new util.TextEncoder();
const CRLF = "\r\n";
const CRLF_BYTES = textEncoder.encode(CRLF);
const CRLF_BYTES_COUNT = 2;
class FormDataPart {
  constructor(name, value) {
    const { escapeName } = this.constructor;
    const isStringValue = utils$1.isString(value);
    let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
    if (isStringValue) {
      value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
    } else {
      headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
    }
    this.headers = textEncoder.encode(headers + CRLF);
    this.contentLength = isStringValue ? value.byteLength : value.size;
    this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
    this.name = name;
    this.value = value;
  }
  async *encode() {
    yield this.headers;
    const { value } = this;
    if (utils$1.isTypedArray(value)) {
      yield value;
    } else {
      yield* readBlob(value);
    }
    yield CRLF_BYTES;
  }
  static escapeName(name) {
    return String(name).replace(/[\r\n"]/g, (match) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[match]);
  }
}
const formDataToStream = (form, headersHandler, options) => {
  const {
    tag = "form-data-boundary",
    size = 25,
    boundary = tag + "-" + platform.generateString(size, BOUNDARY_ALPHABET)
  } = options || {};
  if (!utils$1.isFormData(form)) {
    throw TypeError("FormData instance required");
  }
  if (boundary.length < 1 || boundary.length > 70) {
    throw Error("boundary must be 10-70 characters long");
  }
  const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
  const footerBytes = textEncoder.encode("--" + boundary + "--" + CRLF);
  let contentLength = footerBytes.byteLength;
  const parts = Array.from(form.entries()).map(([name, value]) => {
    const part = new FormDataPart(name, value);
    contentLength += part.size;
    return part;
  });
  contentLength += boundaryBytes.byteLength * parts.length;
  contentLength = utils$1.toFiniteNumber(contentLength);
  const computedHeaders = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`
  };
  if (Number.isFinite(contentLength)) {
    computedHeaders["Content-Length"] = contentLength;
  }
  headersHandler && headersHandler(computedHeaders);
  return Readable.from((async function* () {
    for (const part of parts) {
      yield boundaryBytes;
      yield* part.encode();
    }
    yield footerBytes;
  })());
};
class ZlibHeaderTransformStream extends stream.Transform {
  __transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
  _transform(chunk, encoding, callback) {
    if (chunk.length !== 0) {
      this._transform = this.__transform;
      if (chunk[0] !== 120) {
        const header = Buffer.alloc(2);
        header[0] = 120;
        header[1] = 156;
        this.push(header, encoding);
      }
    }
    this.__transform(chunk, encoding, callback);
  }
}
const callbackify = (fn, reducer) => {
  return utils$1.isAsyncFn(fn) ? function(...args) {
    const cb = args.pop();
    fn.apply(this, args).then((value) => {
      try {
        reducer ? cb(null, ...reducer(value)) : cb(null, value);
      } catch (err) {
        cb(err);
      }
    }, cb);
  } : fn;
};
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
function estimateDataURLDecodedBytes(url2) {
  if (!url2 || typeof url2 !== "string") return 0;
  if (!url2.startsWith("data:")) return 0;
  const comma = url2.indexOf(",");
  if (comma < 0) return 0;
  const meta = url2.slice(5, comma);
  const body = url2.slice(comma + 1);
  const isBase64 = /;base64/i.test(meta);
  if (isBase64) {
    let effectiveLen = body.length;
    const len = body.length;
    for (let i = 0; i < len; i++) {
      if (body.charCodeAt(i) === 37 && i + 2 < len) {
        const a = body.charCodeAt(i + 1);
        const b = body.charCodeAt(i + 2);
        const isHex = (a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102) && (b >= 48 && b <= 57 || b >= 65 && b <= 70 || b >= 97 && b <= 102);
        if (isHex) {
          effectiveLen -= 2;
          i += 2;
        }
      }
    }
    let pad = 0;
    let idx = len - 1;
    const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && // '%'
    body.charCodeAt(j - 1) === 51 && // '3'
    (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
    if (idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
        idx--;
      } else if (tailIsPct3D(idx)) {
        pad++;
        idx -= 3;
      }
    }
    if (pad === 1 && idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
      } else if (tailIsPct3D(idx)) {
        pad++;
      }
    }
    const groups = Math.floor(effectiveLen / 4);
    const bytes = groups * 3 - (pad || 0);
    return bytes > 0 ? bytes : 0;
  }
  return Buffer.byteLength(body, "utf8");
}
const zlibOptions = {
  flush: zlib.constants.Z_SYNC_FLUSH,
  finishFlush: zlib.constants.Z_SYNC_FLUSH
};
const brotliOptions = {
  flush: zlib.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
};
const isBrotliSupported = utils$1.isFunction(zlib.createBrotliDecompress);
const { http: httpFollow, https: httpsFollow } = followRedirects;
const isHttps = /https:?/;
const supportedProtocols = platform.protocols.map((protocol) => {
  return protocol + ":";
});
const flushOnFinish = (stream2, [throttled, flush]) => {
  stream2.on("end", flush).on("error", flush);
  return throttled;
};
class Http2Sessions {
  constructor() {
    this.sessions = /* @__PURE__ */ Object.create(null);
  }
  getSession(authority, options) {
    options = Object.assign({
      sessionTimeout: 1e3
    }, options);
    let authoritySessions = this.sessions[authority];
    if (authoritySessions) {
      let len = authoritySessions.length;
      for (let i = 0; i < len; i++) {
        const [sessionHandle, sessionOptions] = authoritySessions[i];
        if (!sessionHandle.destroyed && !sessionHandle.closed && util.isDeepStrictEqual(sessionOptions, options)) {
          return sessionHandle;
        }
      }
    }
    const session = http2.connect(authority, options);
    let removed;
    const removeSession = () => {
      if (removed) {
        return;
      }
      removed = true;
      let entries = authoritySessions, len = entries.length, i = len;
      while (i--) {
        if (entries[i][0] === session) {
          if (len === 1) {
            delete this.sessions[authority];
          } else {
            entries.splice(i, 1);
          }
          return;
        }
      }
    };
    const originalRequestFn = session.request;
    const { sessionTimeout } = options;
    if (sessionTimeout != null) {
      let timer;
      let streamsCount = 0;
      session.request = function() {
        const stream2 = originalRequestFn.apply(this, arguments);
        streamsCount++;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        stream2.once("close", () => {
          if (!--streamsCount) {
            timer = setTimeout(() => {
              timer = null;
              removeSession();
            }, sessionTimeout);
          }
        });
        return stream2;
      };
    }
    session.once("close", removeSession);
    let entry2 = [
      session,
      options
    ];
    authoritySessions ? authoritySessions.push(entry2) : authoritySessions = this.sessions[authority] = [entry2];
    return session;
  }
}
const http2Sessions = new Http2Sessions();
function dispatchBeforeRedirect(options, responseDetails) {
  if (options.beforeRedirects.proxy) {
    options.beforeRedirects.proxy(options);
  }
  if (options.beforeRedirects.config) {
    options.beforeRedirects.config(options, responseDetails);
  }
}
function setProxy(options, configProxy, location) {
  let proxy = configProxy;
  if (!proxy && proxy !== false) {
    const proxyUrl = proxyFromEnv.getProxyForUrl(location);
    if (proxyUrl) {
      proxy = new URL(proxyUrl);
    }
  }
  if (proxy) {
    if (proxy.username) {
      proxy.auth = (proxy.username || "") + ":" + (proxy.password || "");
    }
    if (proxy.auth) {
      if (proxy.auth.username || proxy.auth.password) {
        proxy.auth = (proxy.auth.username || "") + ":" + (proxy.auth.password || "");
      }
      const base64 = Buffer.from(proxy.auth, "utf8").toString("base64");
      options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
    const proxyHost = proxy.hostname || proxy.host;
    options.hostname = proxyHost;
    options.host = proxyHost;
    options.port = proxy.port;
    options.path = location;
    if (proxy.protocol) {
      options.protocol = proxy.protocol.includes(":") ? proxy.protocol : `${proxy.protocol}:`;
    }
  }
  options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
    setProxy(redirectOptions, configProxy, redirectOptions.href);
  };
}
const isHttpAdapterSupported = typeof process !== "undefined" && utils$1.kindOf(process) === "process";
const wrapAsync = (asyncExecutor) => {
  return new Promise((resolve, reject) => {
    let onDone;
    let isDone;
    const done = (value, isRejected) => {
      if (isDone) return;
      isDone = true;
      onDone && onDone(value, isRejected);
    };
    const _resolve = (value) => {
      done(value);
      resolve(value);
    };
    const _reject = (reason) => {
      done(reason, true);
      reject(reason);
    };
    asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
  });
};
const resolveFamily = ({ address, family }) => {
  if (!utils$1.isString(address)) {
    throw TypeError("address must be a string");
  }
  return {
    address,
    family: family || (address.indexOf(".") < 0 ? 6 : 4)
  };
};
const buildAddressEntry = (address, family) => resolveFamily(utils$1.isObject(address) ? address : { address, family });
const http2Transport = {
  request(options, cb) {
    const authority = options.protocol + "//" + options.hostname + ":" + (options.port || 80);
    const { http2Options, headers } = options;
    const session = http2Sessions.getSession(authority, http2Options);
    const {
      HTTP2_HEADER_SCHEME,
      HTTP2_HEADER_METHOD,
      HTTP2_HEADER_PATH,
      HTTP2_HEADER_STATUS
    } = http2.constants;
    const http2Headers = {
      [HTTP2_HEADER_SCHEME]: options.protocol.replace(":", ""),
      [HTTP2_HEADER_METHOD]: options.method,
      [HTTP2_HEADER_PATH]: options.path
    };
    utils$1.forEach(headers, (header, name) => {
      name.charAt(0) !== ":" && (http2Headers[name] = header);
    });
    const req = session.request(http2Headers);
    req.once("response", (responseHeaders) => {
      const response = req;
      responseHeaders = Object.assign({}, responseHeaders);
      const status = responseHeaders[HTTP2_HEADER_STATUS];
      delete responseHeaders[HTTP2_HEADER_STATUS];
      response.headers = responseHeaders;
      response.statusCode = +status;
      cb(response);
    });
    return req;
  }
};
const httpAdapter = isHttpAdapterSupported && function httpAdapter2(config) {
  return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
    let { data, lookup, family, httpVersion = 1, http2Options } = config;
    const { responseType, responseEncoding } = config;
    const method = config.method.toUpperCase();
    let isDone;
    let rejected = false;
    let req;
    httpVersion = +httpVersion;
    if (Number.isNaN(httpVersion)) {
      throw TypeError(`Invalid protocol version: '${config.httpVersion}' is not a number`);
    }
    if (httpVersion !== 1 && httpVersion !== 2) {
      throw TypeError(`Unsupported protocol version '${httpVersion}'`);
    }
    const isHttp2 = httpVersion === 2;
    if (lookup) {
      const _lookup = callbackify(lookup, (value) => utils$1.isArray(value) ? value : [value]);
      lookup = (hostname, opt, cb) => {
        _lookup(hostname, opt, (err, arg0, arg1) => {
          if (err) {
            return cb(err);
          }
          const addresses = utils$1.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
          opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
        });
      };
    }
    const abortEmitter = new EventEmitter();
    function abort(reason) {
      try {
        abortEmitter.emit("abort", !reason || reason.type ? new CanceledError$1(null, config, req) : reason);
      } catch (err) {
        console.warn("emit error", err);
      }
    }
    abortEmitter.once("abort", reject);
    const onFinished = () => {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(abort);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", abort);
      }
      abortEmitter.removeAllListeners();
    };
    if (config.cancelToken || config.signal) {
      config.cancelToken && config.cancelToken.subscribe(abort);
      if (config.signal) {
        config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
      }
    }
    onDone((response, isRejected) => {
      isDone = true;
      if (isRejected) {
        rejected = true;
        onFinished();
        return;
      }
      const { data: data2 } = response;
      if (data2 instanceof stream.Readable || data2 instanceof stream.Duplex) {
        const offListeners = stream.finished(data2, () => {
          offListeners();
          onFinished();
        });
      } else {
        onFinished();
      }
    });
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    const parsed = new URL(fullPath, platform.hasBrowserEnv ? platform.origin : void 0);
    const protocol = parsed.protocol || supportedProtocols[0];
    if (protocol === "data:") {
      if (config.maxContentLength > -1) {
        const dataUrl = String(config.url || fullPath || "");
        const estimated = estimateDataURLDecodedBytes(dataUrl);
        if (estimated > config.maxContentLength) {
          return reject(new AxiosError$1(
            "maxContentLength size of " + config.maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config
          ));
        }
      }
      let convertedData;
      if (method !== "GET") {
        return settle(resolve, reject, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config
        });
      }
      try {
        convertedData = fromDataURI(config.url, responseType === "blob", {
          Blob: config.env && config.env.Blob
        });
      } catch (err) {
        throw AxiosError$1.from(err, AxiosError$1.ERR_BAD_REQUEST, config);
      }
      if (responseType === "text") {
        convertedData = convertedData.toString(responseEncoding);
        if (!responseEncoding || responseEncoding === "utf8") {
          convertedData = utils$1.stripBOM(convertedData);
        }
      } else if (responseType === "stream") {
        convertedData = stream.Readable.from(convertedData);
      }
      return settle(resolve, reject, {
        data: convertedData,
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders$1(),
        config
      });
    }
    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(new AxiosError$1(
        "Unsupported protocol " + protocol,
        AxiosError$1.ERR_BAD_REQUEST,
        config
      ));
    }
    const headers = AxiosHeaders$1.from(config.headers).normalize();
    headers.set("User-Agent", "axios/" + VERSION$1, false);
    const { onUploadProgress, onDownloadProgress } = config;
    const maxRate = config.maxRate;
    let maxUploadRate = void 0;
    let maxDownloadRate = void 0;
    if (utils$1.isSpecCompliantForm(data)) {
      const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
      data = formDataToStream(data, (formHeaders) => {
        headers.set(formHeaders);
      }, {
        tag: `axios-${VERSION$1}-boundary`,
        boundary: userBoundary && userBoundary[1] || void 0
      });
    } else if (utils$1.isFormData(data) && utils$1.isFunction(data.getHeaders)) {
      headers.set(data.getHeaders());
      if (!headers.hasContentLength()) {
        try {
          const knownLength = await util.promisify(data.getLength).call(data);
          Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
        } catch (e) {
        }
      }
    } else if (utils$1.isBlob(data) || utils$1.isFile(data)) {
      data.size && headers.setContentType(data.type || "application/octet-stream");
      headers.setContentLength(data.size || 0);
      data = stream.Readable.from(readBlob(data));
    } else if (data && !utils$1.isStream(data)) {
      if (Buffer.isBuffer(data)) ;
      else if (utils$1.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils$1.isString(data)) {
        data = Buffer.from(data, "utf-8");
      } else {
        return reject(new AxiosError$1(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        ));
      }
      headers.setContentLength(data.length, false);
      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(new AxiosError$1(
          "Request body larger than maxBodyLength limit",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        ));
      }
    }
    const contentLength = utils$1.toFiniteNumber(headers.getContentLength());
    if (utils$1.isArray(maxRate)) {
      maxUploadRate = maxRate[0];
      maxDownloadRate = maxRate[1];
    } else {
      maxUploadRate = maxDownloadRate = maxRate;
    }
    if (data && (onUploadProgress || maxUploadRate)) {
      if (!utils$1.isStream(data)) {
        data = stream.Readable.from(data, { objectMode: false });
      }
      data = stream.pipeline([data, new AxiosTransformStream({
        maxRate: utils$1.toFiniteNumber(maxUploadRate)
      })], utils$1.noop);
      onUploadProgress && data.on("progress", flushOnFinish(
        data,
        progressEventDecorator(
          contentLength,
          progressEventReducer(asyncDecorator(onUploadProgress), false, 3)
        )
      ));
    }
    let auth = void 0;
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password || "";
      auth = username + ":" + password;
    }
    if (!auth && parsed.username) {
      const urlUsername = parsed.username;
      const urlPassword = parsed.password;
      auth = urlUsername + ":" + urlPassword;
    }
    auth && headers.delete("authorization");
    let path;
    try {
      path = buildURL(
        parsed.pathname + parsed.search,
        config.params,
        config.paramsSerializer
      ).replace(/^\?/, "");
    } catch (err) {
      const customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      return reject(customErr);
    }
    headers.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (isBrotliSupported ? ", br" : ""),
      false
    );
    const options = {
      path,
      method,
      headers: headers.toJSON(),
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth,
      protocol,
      family,
      beforeRedirect: dispatchBeforeRedirect,
      beforeRedirects: {},
      http2Options
    };
    !utils$1.isUndefined(lookup) && (options.lookup = lookup);
    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
      options.port = parsed.port;
      setProxy(options, config.proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
    }
    let transport;
    const isHttpsRequest = isHttps.test(options.protocol);
    options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    if (isHttp2) {
      transport = http2Transport;
    } else {
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsRequest ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        if (config.beforeRedirect) {
          options.beforeRedirects.config = config.beforeRedirect;
        }
        transport = isHttpsRequest ? httpsFollow : httpFollow;
      }
    }
    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } else {
      options.maxBodyLength = Infinity;
    }
    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }
    req = transport.request(options, function handleResponse(res) {
      if (req.destroyed) return;
      const streams = [res];
      const responseLength = utils$1.toFiniteNumber(res.headers["content-length"]);
      if (onDownloadProgress || maxDownloadRate) {
        const transformStream = new AxiosTransformStream({
          maxRate: utils$1.toFiniteNumber(maxDownloadRate)
        });
        onDownloadProgress && transformStream.on("progress", flushOnFinish(
          transformStream,
          progressEventDecorator(
            responseLength,
            progressEventReducer(asyncDecorator(onDownloadProgress), true, 3)
          )
        ));
        streams.push(transformStream);
      }
      let responseStream = res;
      const lastRequest = res.req || req;
      if (config.decompress !== false && res.headers["content-encoding"]) {
        if (method === "HEAD" || res.statusCode === 204) {
          delete res.headers["content-encoding"];
        }
        switch ((res.headers["content-encoding"] || "").toLowerCase()) {
          /*eslint default-case:0*/
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            streams.push(zlib.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "deflate":
            streams.push(new ZlibHeaderTransformStream());
            streams.push(zlib.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "br":
            if (isBrotliSupported) {
              streams.push(zlib.createBrotliDecompress(brotliOptions));
              delete res.headers["content-encoding"];
            }
        }
      }
      responseStream = streams.length > 1 ? stream.pipeline(streams, utils$1.noop) : streams[0];
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: new AxiosHeaders$1(res.headers),
        config,
        request: lastRequest
      };
      if (responseType === "stream") {
        response.data = responseStream;
        settle(resolve, reject, response);
      } else {
        const responseBuffer = [];
        let totalResponseBytes = 0;
        responseStream.on("data", function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            rejected = true;
            responseStream.destroy();
            abort(new AxiosError$1(
              "maxContentLength size of " + config.maxContentLength + " exceeded",
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              lastRequest
            ));
          }
        });
        responseStream.on("aborted", function handlerStreamAborted() {
          if (rejected) {
            return;
          }
          const err = new AxiosError$1(
            "stream has been aborted",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            lastRequest
          );
          responseStream.destroy(err);
          reject(err);
        });
        responseStream.on("error", function handleStreamError(err) {
          if (req.destroyed) return;
          reject(AxiosError$1.from(err, null, config, lastRequest));
        });
        responseStream.on("end", function handleStreamEnd() {
          try {
            let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (responseType !== "arraybuffer") {
              responseData = responseData.toString(responseEncoding);
              if (!responseEncoding || responseEncoding === "utf8") {
                responseData = utils$1.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            return reject(AxiosError$1.from(err, null, config, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }
      abortEmitter.once("abort", (err) => {
        if (!responseStream.destroyed) {
          responseStream.emit("error", err);
          responseStream.destroy();
        }
      });
    });
    abortEmitter.once("abort", (err) => {
      if (req.close) {
        req.close();
      } else {
        req.destroy(err);
      }
    });
    req.on("error", function handleRequestError(err) {
      reject(AxiosError$1.from(err, null, config, req));
    });
    req.on("socket", function handleRequestSocket(socket) {
      socket.setKeepAlive(true, 1e3 * 60);
    });
    if (config.timeout) {
      const timeout = parseInt(config.timeout, 10);
      if (Number.isNaN(timeout)) {
        abort(new AxiosError$1(
          "error trying to parse `config.timeout` to int",
          AxiosError$1.ERR_BAD_OPTION_VALUE,
          config,
          req
        ));
        return;
      }
      req.setTimeout(timeout, function handleRequestTimeout() {
        if (isDone) return;
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = config.transitional || transitionalDefaults;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        abort(new AxiosError$1(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          req
        ));
      });
    } else {
      req.setTimeout(0);
    }
    if (utils$1.isStream(data)) {
      let ended = false;
      let errored = false;
      data.on("end", () => {
        ended = true;
      });
      data.once("error", (err) => {
        errored = true;
        req.destroy(err);
      });
      data.on("close", () => {
        if (!ended && !errored) {
          abort(new CanceledError$1("Request stream has been aborted", config, req));
        }
      });
      data.pipe(req);
    } else {
      data && req.write(data);
      req.end();
    }
  });
};
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url2) => {
  url2 = new URL(url2, platform.origin);
  return origin2.protocol === url2.protocol && origin2.host === url2.host && (isMSIE || origin2.port === url2.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      return;
    },
    read(name) {
      return null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$2(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$2({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = false;
const xhrAdapter = isXHRAdapterSupported;
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream2) {
  if (stream2[Symbol.asyncIterator]) {
    yield* stream2;
    return;
  }
  const reader = stream2.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream2, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream2, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder: TextEncoder$1
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder$1 === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder$1()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url: url2,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url2, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url2, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url2, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i = len, seed2, target, map = seedCache;
  while (i--) {
    seed2 = seeds[i];
    target = map.get(seed2);
    target === void 0 && map.set(seed2, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
function getAdapter$1(adapters2, config) {
  adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
  const { length } = adapters2;
  let nameOrAdapter;
  let adapter;
  const rejectedReasons = {};
  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters2[i];
    let id;
    adapter = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter === void 0) {
        throw new AxiosError$1(`Unknown adapter '${id}'`);
      }
    }
    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i] = adapter;
  }
  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError$1(
      `There is no suitable adapter to dispatch the request ` + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter;
}
const adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: getAdapter$1,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message2) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message2 ? ". " + message2 : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$2(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$2(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url2, config) {
    return this.request(mergeConfig$2(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data, config) {
      return this.request(mergeConfig$2(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message2, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message2, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$2(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$2;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig: mergeConfig$1
} = axios;
const axios_nKQInGxkjkGyJUCE2J7W14opqRZSZPNVns2t0UtSgnM = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const token = useCookie("token");
  const axiosInstance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 1e4,
    headers: {
      "Content-Type": "application/json"
    }
  });
  axiosInstance.interceptors.request.use(
    (config2) => {
      if (token.value) {
        config2.headers.token = token.value;
      }
      if (config2.method === "get") {
        config2.params = {
          ...config2.params,
          _t: Date.now()
        };
      }
      return config2;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      const result = response.data;
      if (result && typeof result === "object" && "code" in result) {
        const adaptedResponse = {
          code: result.code,
          msg: result.msg,
          data: result.data,
          success: result.code === 0
          // 后端 code=0 表示成功
        };
        response.data = adaptedResponse;
      }
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 401:
            token.value = null;
            navigateTo("/login");
            break;
          case 403:
            console.error("403 Forbidden");
            break;
          case 404:
            console.error("404 Not Found");
            break;
          case 500:
            console.error("500 Server Error");
            break;
        }
        if (data && typeof data === "object" && "msg" in data) {
          return Promise.reject(new Error(data.msg));
        }
        return Promise.reject(new Error(data?.msg || `HTTP ${status} 错误`));
      } else if (error.request) {
        return Promise.reject(new Error("网络连接失败，请检查网络设置"));
      } else {
        return Promise.reject(error);
      }
    }
  );
  return {
    provide: {
      axios: axiosInstance
    }
  };
});
let routes;
const prerender_server_sqIxOBipVr4FbVMA9kqWL0wT8FPop6sKAXLVfifsJzk = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  if (routes && !routes.length) {
    return;
  }
  (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules;
  routes ||= Array.from(processRoutes(([__temp, __restore] = executeAsync(() => routerOptions.routes?.(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes));
  const batch = routes.splice(0, 10);
  prerenderRoutes(batch);
});
const OPTIONAL_PARAM_RE = /^\/?:.*(?:\?|\(\.\*\)\*)$/;
function shouldPrerender(path) {
  return true;
}
function processRoutes(routes2, currentPath = "/", routesToPrerender = /* @__PURE__ */ new Set()) {
  for (const route of routes2) {
    if (OPTIONAL_PARAM_RE.test(route.path) && !route.children?.length && shouldPrerender()) {
      routesToPrerender.add(currentPath);
    }
    if (route.path.includes(":")) {
      continue;
    }
    const fullPath = joinURL(currentPath, route.path);
    {
      routesToPrerender.add(fullPath);
    }
    if (route.children) {
      processRoutes(route.children, fullPath, routesToPrerender);
    }
  }
  return routesToPrerender;
}
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  element_plus_teleports_plugin_3k7A_fjEiCzFRl6aN3qftblOS_EZCmhIb_4gXrhvbuY,
  element_plus_injection_plugin_LfLkpoHjV8s4Q4lRVuq_y_LbzJB5vFvehZzxqpiP_nk,
  axios_nKQInGxkjkGyJUCE2J7W14opqRZSZPNVns2t0UtSgnM,
  prerender_server_sqIxOBipVr4FbVMA9kqWL0wT8FPop6sKAXLVfifsJzk
];
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_0 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => isObject$1(val) && !!val[epPropKey];
const buildProp = (prop, key) => {
  if (!isObject$1(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator: validator2 } = prop;
  const _validator = values || validator2 ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator2)
      valid || (valid = validator2(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn(
        `Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(
          val
        )}.`
      );
    }
    return valid;
  } : void 0;
  const epProp = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (hasOwn(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ])
);
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});
var _export_sfc$1 = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const keysOf = (arr) => Object.keys(arr);
const entriesOf = (arr) => Object.entries(arr);
const getProp = (obj, path, defaultValue) => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val) {
      set$1(obj, path, val);
    }
  };
};
const SCOPE$1 = "utils/dom/style";
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls)
    return false;
  if (cls.includes(" "))
    throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
  var _a;
  if (!isClient || !element || !styleName)
    return "";
  let key = camelize(styleName);
  if (key === "float")
    key = "cssFloat";
  try {
    const style = element.style[key];
    if (style)
      return style;
    const computed2 = (_a = (void 0).defaultView) == null ? void 0 : _a.getComputedStyle(element, "");
    return computed2 ? computed2[key] : "";
  } catch (e) {
    return element.style[key];
  }
};
function addUnit(value, defaultUnit = "px") {
  if (!value && value !== 0)
    return "";
  if (isNumber$1(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString$1(value)) {
    return value;
  }
  debugWarn(SCOPE$1, "binding value must be a string or number");
}
const _sfc_main$f = defineComponent({
  ...{
    name: "ElIcon",
    inheritAttrs: false
  },
  __name: "icon",
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      const fontSize = addUnit(size);
      if (!fontSize && !color)
        return {};
      return {
        fontSize,
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "i",
        mergeProps({
          class: unref(ns).b(),
          style: style.value
        }, _ctx.$attrs),
        [
          renderSlot(_ctx.$slots, "default")
        ],
        16
      );
    };
  }
});
var Icon = /* @__PURE__ */ _export_sfc$1(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
const withInstallDirective = (directive, name) => {
  directive.install = (app) => {
    app.directive(name, directive);
  };
  return directive;
};
const withNoopInstall = (component) => {
  component.install = NOOP;
  return component;
};
const ElIcon = withInstall(Icon);
const _imports_0 = publicAssetsURL("/images/shared/logo_v3.png");
const useModalStore = /* @__PURE__ */ defineStore("modal", {
  state: () => ({ showLogin: false }),
  actions: {
    openLogin() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    }
  }
});
const SUPABASE_URL = "http://127.0.0.1:54321";
const SUPABASE_ANON_KEY = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";
const EDGE_FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;
let supabaseClient = null;
function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseClient;
}
async function getAuthToken() {
  const client = getSupabaseClient();
  const { data: { session } } = await client.auth.getSession();
  return session?.access_token || null;
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
    let url2 = `${EDGE_FUNCTIONS_URL}/${functionName}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url2 += `?${searchParams.toString()}`;
    }
    const response = await fetch(url2, {
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
const supabase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EDGE_FUNCTIONS_URL,
  callEdgeFunction,
  getAuthToken,
  getSupabaseClient
}, Symbol.toStringTag, { value: "Module" }));
function localizeAuthError(originalMsg) {
  if (!originalMsg) return "未知错误";
  const msg = originalMsg.toLowerCase();
  if (msg.includes("token has expired") || msg.includes("invalid token") || msg.includes("token is invalid")) {
    return "验证码已过期或无效";
  }
  if (msg.includes("invalid login credentials")) {
    return "账号或密码错误";
  }
  if (msg.includes("user not found") || msg.includes("invalid email")) {
    return "用户不存在或邮箱错误";
  }
  if (msg.includes("already registered")) {
    return "该邮箱已被注册";
  }
  if (msg.includes("password should be")) {
    return "密码长度或格式不符合要求";
  }
  if (msg.includes("too many requests") || msg.includes("rate limit")) {
    return "操作太频繁了，请稍后再试";
  }
  return originalMsg;
}
const authApi = {
  /**
    * 用户登录 (Supabase 密码版)
    * @param params 登录参数
    */
  async login(params) {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: params.email,
      password: params.password
    });
    if (error) {
      return { code: 500, msg: localizeAuthError(error.message), success: false };
    }
    return { code: 0, msg: "登录成功", data, success: true };
  },
  /**
   * 发送邮箱 OTP 验证码 (Supabase版)
   * @param email 邮箱地址
   */
  async getEmailCode(email) {
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
        // 自动注册
      }
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "验证码已发送到您的邮箱", success: true };
  },
  /**
   * 验证邮箱 OTP 登录 (Supabase版)
   * @param email 邮箱
   * @param token 验证码
   */
  async loginWithCode(params) {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.verifyOtp({
      email: params.email,
      token: params.code,
      type: "email"
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "登录成功", data, success: true };
  },
  /**
   * 注册 (验证码 + 密码)
   * 1. 验证 OTP (自动登录)
   * 2. 设置密码
   */
  async registerWithCodeAndPassword(params) {
    const client = getSupabaseClient();
    const { data, error: verifyError } = await client.auth.verifyOtp({
      email: params.email,
      token: params.code,
      type: "email"
    });
    if (verifyError) {
      return { code: 400, msg: localizeAuthError(verifyError.message), success: false };
    }
    if (!data.user) {
      return { code: 500, msg: "注册失败，无法创建会话", success: false };
    }
    const { error: updateError } = await client.auth.updateUser({
      password: params.password
    });
    if (updateError) {
      return { code: 500, msg: "密码设置失败: " + localizeAuthError(updateError.message), success: false };
    }
    return { code: 0, msg: "注册并登录成功", data, success: true };
  },
  /**
   * 重置密码 (OTP flow)
   */
  async resetPasswordWithOtp(params) {
    const client = getSupabaseClient();
    const { error: verifyError } = await client.auth.verifyOtp({
      email: params.email,
      token: params.code,
      type: "email"
    });
    if (verifyError) {
      return { code: 400, msg: localizeAuthError(verifyError.message), success: false };
    }
    const { error: updateError } = await client.auth.updateUser({
      password: params.password
    });
    if (updateError) {
      return { code: 500, msg: "密码重置失败: " + localizeAuthError(updateError.message), success: false };
    }
    return { code: 0, msg: "密码重置成功", success: true };
  },
  // TODO: 待后端实现用户注册功能
  // /**
  //  * 用户注册
  //  * @param params 注册参数
  //  */
  // register(params: {
  //   username: string
  //   password: string
  //   email: string
  //   confirmPassword: string
  //   code?: string
  // }): Promise<ApiResponse<LoginResponse>> {
  //   return http.post('/product/auth/register', params)
  // },
  /**
   * 用户退出登录 (Supabase版)
   */
  async logout() {
    const client = getSupabaseClient();
    const { error } = await client.auth.signOut();
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  },
  /**
   * 获取当前用户信息 (Supabase版)
   */
  async getUserInfo() {
    const client = getSupabaseClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) {
      return { code: 401, msg: "未登录或登录已过期", success: false };
    }
    const { data: profile, error: profileError } = await client.from("profiles").select("*").eq("id", user.id).single();
    const adaptedUser = {
      id: user.id,
      uid: profile?.uid,
      // 新增：映射数据库中的 8 位数字 UID
      email: user.email,
      nickName: profile?.nickname || user.email?.split("@")[0],
      price: profile?.balance || 0,
      // 适配前端余额字段
      balance: profile?.balance || 0,
      // 兼容性字段，确保 checkout.vue 能读取到
      avatar: profile?.avatar || ""
    };
    return { code: 0, msg: "success", data: adaptedUser, success: true };
  },
  /**
   * 获取钱包流水明细
   */
  async getWalletTransactions() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { data, error } = await client.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) return { code: 500, msg: localizeAuthError(error.message), success: false };
    return { code: 0, msg: "success", data: data || [], success: true };
  },
  /**
   * 【优化】获取钱包数据（余额 + 流水）合并接口
   */
  async getWalletData() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const [profileRes, transRes] = await Promise.all([
      client.from("profiles").select("balance").eq("id", user.id).single(),
      client.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
    ]);
    const balance = profileRes.data?.balance || 0;
    const transactions = transRes.data || [];
    return {
      code: 0,
      msg: "success",
      data: { balance, transactions },
      success: true
    };
  },
  /**
   * 获取已启用的充值档位（供客户端使用）
   */
  async getActiveTiers() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("recharge_tiers").select("amount, bonus, sort_order").eq("status", "on").order("sort_order", { ascending: true });
    if (error) {
      return { code: 500, msg: localizeAuthError(error.message), data: [], success: false };
    }
    const adapted = (data || []).map((item) => ({
      value: Number(item.amount),
      desc: item.bonus > 0 ? `送￥${item.bonus}` : "无优惠"
    }));
    return { code: 0, msg: "success", data: adapted, success: true };
  },
  // TODO: 待后端实现token刷新功能
  // /**
  //  * 刷新token
  //  */
  // refreshToken(): Promise<ApiResponse<{ token: string }>> {
  //   return http.post('/product/auth/refresh')
  // },
  // TODO: 待后端实现密码修改功能
  // /**
  //  * 修改密码
  //  * @param params 密码参数
  //  */
  // changePassword(params: {
  //   oldPassword: string
  //   newPassword: string
  //   confirmPassword: string
  // }): Promise<ApiResponse<null>> {
  //   return http.post('/product/auth/change-password', params)
  // },
  // TODO: 待后端实现密码重置功能
  // /**
  //  * 重置密码
  //  * @param params 重置参数
  //  */
  // resetPassword(params: {
  //   email: string
  //   code: string
  //   newPassword: string
  //   confirmPassword: string
  // }): Promise<ApiResponse<null>> {
  //   return http.post('/product/auth/reset-password', params)
  // },
  // /**
  //  * 发送重置密码验证码
  //  * @param email 邮箱地址
  //  */
  // sendResetCode(email: string): Promise<ApiResponse<null>> {
  //   return http.post('/product/auth/send-reset-code', { email })
  // },
  /**
   * 删除当前用户账号 (RPC)
   */
  async deleteAccount() {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("delete_own_account");
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    const resValue = data;
    if (!resValue || !resValue.success) {
      return { code: 500, msg: resValue?.msg || "注销失败", success: false };
    }
    await client.auth.signOut();
    return { code: 0, msg: resValue.msg, success: true };
  },
  /**
   * 更新用户 Profile 信息 (如昵称、头像)
   */
  async updateProfile(updates) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("profiles").update(updates).eq("id", user.id);
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "更新成功", success: true };
  },
  /**
   * 更新密码 (需要登录状态)
   */
  async updatePassword(password) {
    const client = getSupabaseClient();
    const { error } = await client.auth.updateUser({ password });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "密码更新成功", success: true };
  },
  /**
   * 通用发送 OTP (用于敏感操作验证)
   */
  async sendOtp(email) {
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }
      // 仅限现有用户
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "验证码已发送", success: true };
  },
  /**
   * 更新用户邮箱 (安全方式)
   * 调用此方法后，Supabase 会自动向新邮箱发送确认链接
   */
  async updateEmail(newEmail) {
    const client = getSupabaseClient();
    const { error } = await client.auth.updateUser({ email: newEmail });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "确认邮件已发送到新邮箱，请查收并点击确认链接", success: true };
  },
  /**
   * 验证 OTP (用于敏感操作前的二次确认)
   */
  async verifyOtp(email, code) {
    const client = getSupabaseClient();
    const { error } = await client.auth.verifyOtp({
      email,
      token: code,
      type: "email"
    });
    if (error) {
      return { code: 400, msg: localizeAuthError(error.message), success: false };
    }
    return { code: 0, msg: "验证成功", success: true };
  },
  /**
   * 检查邮箱是否可用 (是否已被注册)
   */
  async checkEmailAvailable(email) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("check_email_available", { email_input: email });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return {
      code: 0,
      msg: data ? "邮箱可用" : "邮箱已被占用",
      data,
      success: data
    };
  }
};
const cartApi = {
  /**
   * 获取购物车列表（动态 JOIN 商品信息）
   */
  async getCartList() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", data: { list: [] }, success: false };
    const { data, error } = await client.from("cart_items").select(`
        id,
        sku_id,
        quantity,
        created_at,
        product_skus:sku_id (
          id,
          price,
          spec_combination
        )
      `).eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch cart error:", error);
      return { code: 500, msg: error.message, data: { list: [] }, success: false };
    }
    const skuIds = (data || []).map((item) => item.sku_id).filter(Boolean);
    let productMap = {};
    if (skuIds.length > 0) {
      const { data: mappings } = await client.from("product_sku_map").select("sku_id, product:products(id, product_name, image, allow_addon)").in("sku_id", skuIds);
      mappings?.forEach((m) => {
        if (m.product) productMap[m.sku_id] = m.product;
      });
    }
    const list = (data || []).map((item) => {
      const product = productMap[item.sku_id];
      return {
        id: item.id,
        skuId: item.sku_id,
        quantity: item.quantity,
        productId: product?.id,
        productName: product?.product_name || "未知商品",
        productImage: product?.image || "/images/shared/logo.png",
        allowAddon: product?.allow_addon || false,
        price: item.product_skus?.price || 0,
        specName: item.product_skus?.spec_combination ? Object.values(item.product_skus.spec_combination).join(" ") : ""
      };
    });
    return { code: 0, msg: "success", data: { list }, success: true };
  },
  /**
   * 添加到购物车（简化版：只需 skuId）
   */
  async addToCart(skuId, quantity = 1) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("cart_items").upsert({
      user_id: user.id,
      sku_id: skuId,
      quantity
    }, {
      onConflict: "user_id, sku_id"
    });
    if (error) {
      console.error("Add to cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "已加入购物车", success: true };
  },
  /**
   * 更新购物车数量
   */
  async updateQuantity(cartItemId, quantity) {
    const client = getSupabaseClient();
    const { error } = await client.from("cart_items").update({ quantity }).eq("id", cartItemId);
    if (error) {
      console.error("Update cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  },
  /**
   * 从购物车删除
   */
  async removeFromCart(cartItemId) {
    const client = getSupabaseClient();
    const { error } = await client.from("cart_items").delete().eq("id", cartItemId);
    if (error) {
      console.error("Remove from cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "已从购物车删除", success: true };
  },
  /**
   * 清空购物车
   */
  async clearCart() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("cart_items").delete().eq("user_id", user.id);
    if (error) {
      console.error("Clear cart error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "购物车已清空", success: true };
  }
};
const favoriteApi = {
  /**
   * 【优化】获取收藏数据（分类 + 收藏列表）- 合并接口
   */
  async getFavoritesData() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const [categoriesRes, favoritesRes] = await Promise.all([
      client.from("product_categories").select("id, name").eq("status", "on").order("sort_order"),
      client.from("user_favorites").select(`
        id,
        created_at,
        product_id,
        sku_id,
        products:product_id (
          id,
          product_name,
          image,
          display_price,
          category_id
        ),
        product_skus:sku_id (
          id,
          price,
          spec_combination
        )
      `).eq("user_id", user.id).order("created_at", { ascending: false })
    ]);
    const categories = [{ id: "all", name: "全部收藏" }, ...categoriesRes.data || []];
    const favorites = (favoritesRes.data || []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      skuId: item.sku_id,
      productName: item.products?.product_name || "未知商品",
      productImage: item.products?.image || "/images/shared/logo.png",
      categoryId: item.products?.category_id,
      price: item.product_skus?.price || item.products?.display_price || 0,
      specName: item.product_skus?.spec_combination ? Object.values(item.product_skus.spec_combination).join(" ") : "",
      createdAt: item.created_at
    }));
    return {
      code: 0,
      msg: "success",
      data: { categories, favorites },
      success: true
    };
  },
  /**
   * 添加收藏
   */
  async addFavorite(productId, skuId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("user_favorites").insert({
      user_id: user.id,
      product_id: productId,
      sku_id: skuId || null
    });
    if (error) {
      if (error.code === "23505") {
        return { code: 400, msg: "已经收藏过了", success: false };
      }
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "收藏成功", success: true };
  },
  /**
   * 删除收藏
   */
  async removeFavorite(favoriteId) {
    const client = getSupabaseClient();
    const { error } = await client.from("user_favorites").delete().eq("id", favoriteId);
    if (error) return { code: 500, msg: error.message, success: false };
    return { code: 0, msg: "已取消收藏", success: true };
  },
  /**
   * 检查是否已收藏
   */
  async checkFavorite(productId, skuId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", data: false, success: false };
    let query = client.from("user_favorites").select("id").eq("user_id", user.id).eq("product_id", productId);
    if (skuId) {
      query = query.eq("sku_id", skuId);
    }
    const { data, error } = await query.maybeSingle();
    if (error) return { code: 500, msg: error.message, data: false, success: false };
    return { code: 0, msg: "success", data: !!data, success: true };
  },
  // 兼容旧接口（已废弃）
  getFavorites(userId) {
    return Promise.resolve({ code: 0, data: [], success: true });
  },
  addToFavorites(userId, goodsId) {
    return Promise.resolve({ code: 0, success: true });
  },
  removeFromFavorites(userId, goodsId) {
    return Promise.resolve({ code: 0, success: true });
  }
};
const useCartStore = /* @__PURE__ */ defineStore("cart", {
  state: () => ({
    items: [],
    loading: false,
    miniCartVisible: false
  }),
  actions: {
    /**
     * 加载购物车（从后端获取）
     */
    async loadCart() {
      this.loading = true;
      try {
        const res = await cartApi.getCartList();
        if (res.success && res.data?.list) {
          this.items = res.data.list;
        } else {
          this.items = [];
        }
      } catch (e) {
        console.error("加载购物车失败:", e);
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
    /**
     * 添加到购物车（只需 skuId）
     * 规则：购物车必须保持单一 SKU。如果已存在不同 SKU，则禁止添加。
     */
    async addToCart(skuId, quantity = 1) {
      if (this.items.length > 0) {
        const existingItem = this.items[0];
        if (existingItem.skuId !== skuId) {
          return {
            success: false,
            msg: "暂时不支持同时购买不同规格商品，请先结算现有商品",
            code: "DIFFERENT_SKU"
          };
        }
      }
      try {
        const res = await cartApi.addToCart(skuId, quantity);
        if (res.success) {
          await this.loadCart();
          return { success: true };
        }
        return { success: false, msg: res.msg };
      } catch (e) {
        console.error("添加购物车失败:", e);
        return { success: false, msg: "添加失败" };
      }
    },
    /**
     * 更新数量
     */
    async updateQuantity(cartItemId, quantity) {
      try {
        const res = await cartApi.updateQuantity(cartItemId, quantity);
        if (res.success) {
          const item = this.items.find((i) => i.id === cartItemId);
          if (item) item.quantity = quantity;
        }
      } catch (e) {
        console.error("更新数量失败:", e);
      }
    },
    /**
     * 从购物车删除
     */
    async removeFromCart(cartItemId) {
      try {
        const res = await cartApi.removeFromCart(cartItemId);
        if (res.success) {
          this.items = this.items.filter((i) => i.id !== cartItemId);
        }
      } catch (e) {
        console.error("删除购物车项失败:", e);
      }
    },
    /**
     * 清空购物车
     */
    async clearCart() {
      try {
        const res = await cartApi.clearCart();
        if (res.success) {
          this.items = [];
        }
      } catch (e) {
        console.error("清空购物车失败:", e);
      }
    },
    /**
     * 初始化购物车
     */
    async initCart() {
      await this.loadCart();
    }
  },
  getters: {
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    totalCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    }
  }
});
const useUserStore = /* @__PURE__ */ defineStore("user", () => {
  const user = ref(null);
  const token = useCookie("token");
  const loading = ref(false);
  const isLoggedIn = computed(() => !!token.value && !!user.value);
  const favorites = ref([]);
  const orders = ref([]);
  const defaultOrders = [
    {
      id: "2023062012340",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥899.00",
      time: "2023-06-20 14:30",
      status: "pending",
      statusText: "待支付",
      statusClass: "pending"
    },
    {
      id: "2023061511122",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥3,599.00",
      time: "2023-06-15 10:15",
      status: "shipped",
      statusText: "已发货",
      statusClass: "shipped"
    },
    {
      id: "2023052817450",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "expired",
      statusText: "已过期",
      statusClass: "expired"
    },
    {
      id: "2023052817451",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "已完成",
      statusClass: "completed"
    },
    {
      id: "2023052817452",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "已完成",
      statusClass: "completed"
    },
    {
      id: "2023052817453",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "已完成",
      statusClass: "completed"
    }
  ];
  const loadFavorites = async () => {
    const userId = user.value?.id;
    if (!userId) return;
    try {
      const res = await favoriteApi.getFavorites(userId);
      if (res.code === 0 && res.data && Array.isArray(res.data.list)) {
        favorites.value = res.data.list.map((item) => ({
          id: item.goodsId,
          name: item.name || "",
          image: item.image || "",
          desc: item.desc || "",
          region: item.region || "",
          quality: item.quality || "",
          devices: item.devices || "",
          download: item.download || "",
          prices: item.prices || [],
          hot: item.hot,
          addTime: item.addTime || ""
        }));
      }
    } catch (e) {
      console.error("加载收藏失败", e);
    }
  };
  const addToFavorites = async (item) => {
    const userId = user.value?.id;
    if (!userId) return { success: false, message: "未登录" };
    try {
      const res = await favoriteApi.addToFavorites(userId, item.id);
      if (res.code === 0) {
        await loadFavorites();
        return { success: true, message: "添加收藏成功" };
      }
      return { success: false, message: res.msg || "添加收藏失败" };
    } catch (e) {
      return { success: false, message: "添加收藏失败" };
    }
  };
  const removeFromFavorites = async (itemId) => {
    const userId = user.value?.id;
    if (!userId) return { success: false, message: "未登录" };
    try {
      const res = await favoriteApi.removeFromFavorites(userId, itemId);
      if (res.code === 0) {
        await loadFavorites();
        return { success: true, message: "取消收藏成功" };
      }
      return { success: false, message: res.msg || "取消收藏失败" };
    } catch (e) {
      return { success: false, message: "取消收藏失败" };
    }
  };
  const checkIsFavorite = (itemId) => {
    return favorites.value.some((fav) => fav.id === itemId);
  };
  const loadOrders = () => {
  };
  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.orderId,
      title: orderData.title,
      amount: typeof orderData.amount === "number" ? `¥${orderData.amount.toFixed(2)}` : orderData.amount,
      time: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "completed",
      statusText: "已完成",
      statusClass: "completed",
      payType: orderData.payType,
      productImage: orderData.productImage
    };
    orders.value.unshift(newOrder);
    console.log("✅ 新订单已添加到列表顶部:", newOrder);
    return { success: true, order: newOrder };
  };
  const getOrders = () => {
    return orders.value;
  };
  const getOrdersByStatus = (status) => {
    if (!status || status === "全部") {
      return orders.value;
    }
    const statusMap = {
      "待支付": "pending",
      "待发货": "shipped",
      "已发货": "shipped",
      "已完成": "completed",
      "已过期": "expired"
    };
    const targetStatus = statusMap[status] || status;
    return orders.value.filter((order) => order.status === targetStatus);
  };
  const clearOrders = () => {
    orders.value = [...defaultOrders];
  };
  const getFavorites = () => {
    return favorites.value;
  };
  const clearFavorites = () => {
    favorites.value = [];
  };
  const fetchUserInfo = async () => {
    try {
      if (!token.value) return;
      loading.value = true;
      const response = await authApi.getUserInfo();
      if (response.success) {
        user.value = response.data;
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
      token.value = null;
      user.value = null;
    } finally {
      loading.value = false;
    }
  };
  const login = async (params) => {
    try {
      const response = await authApi.login(params);
      if (response.success) {
        token.value = response.data.token;
        user.value = response.data.user;
        loadFavorites();
        loadOrders();
        const cartStore = useCartStore();
        await cartStore.initCart();
        return { success: true, data: response.data };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "登录失败" };
    }
  };
  const register = async (params) => {
    try {
      const response = await authApi.loginWithCode({
        email: params.email,
        code: params.code || ""
      });
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "注册失败" };
    }
  };
  const logout = async () => {
    try {
      if (token.value) {
        await authApi.logout();
      }
    } catch (error) {
      console.error("登出失败:", error);
    } finally {
      token.value = null;
      user.value = null;
      favorites.value = [];
      orders.value = [...defaultOrders];
    }
  };
  const changePassword = async (params) => {
    try {
      console.warn("修改密码功能暂未实现，使用模拟返回");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || "修改密码失败" };
    }
  };
  const sendEmailCode = async (email) => {
    try {
      const response = await authApi.getEmailCode(email);
      return { success: response.success, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "发送验证码失败" };
    }
  };
  const resetPassword = async (params) => {
    try {
      console.warn("重置密码功能暂未实现，使用模拟返回");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || "重置密码失败" };
    }
  };
  const init = async () => {
    loadFavorites();
    const cartStore = useCartStore();
    await cartStore.initCart();
    if (token.value) {
      try {
        await fetchUserInfo();
      } catch (error) {
        console.warn("获取用户信息失败，可能需要重新登录:", error);
      }
    }
  };
  const setUser = (userInfo, tokenValue) => {
    user.value = userInfo;
    if (tokenValue) {
      token.value = tokenValue;
    }
    loadFavorites();
    const cartStore = useCartStore();
    cartStore.initCart();
  };
  const mockLogin = () => {
    const mockUser = {
      id: "145e6b60-03db-47f0-a812-41a257e04468",
      uid: "88888888",
      username: "dev_user",
      nickname: "开发用户",
      email: "admin@fantula.com",
      status: 1,
      createTime: (/* @__PURE__ */ new Date()).toISOString(),
      updateTime: (/* @__PURE__ */ new Date()).toISOString(),
      balance: 5888.5
    };
    const mockToken = "mock_token_" + Date.now();
    user.value = mockUser;
    token.value = mockToken;
    loadFavorites();
    const cartStore = useCartStore();
    cartStore.initCart();
    console.log("🚀 模拟登录成功！用户信息:", mockUser);
    return { success: true, data: { user: mockUser, token: mockToken } };
  };
  return {
    // 状态
    user: readonly(user),
    isLoggedIn,
    loading: readonly(loading),
    // 导出 loading 状态
    favorites: readonly(favorites),
    orders: readonly(orders),
    // 方法
    login,
    register,
    logout,
    changePassword,
    sendEmailCode,
    resetPassword,
    fetchUserInfo,
    init,
    setUser,
    mockLogin,
    // 收藏相关方法
    addToFavorites,
    removeFromFavorites,
    checkIsFavorite,
    getFavorites,
    clearFavorites,
    loadFavorites,
    // 订单相关方法
    addOrder,
    getOrders,
    getOrdersByStatus,
    clearOrders,
    loadOrders
  };
});
const weixinIcon1 = "/images/client/pc/kefuweixin1.png";
const weixinIcon2 = "/images/client/pc/kefuweixin2.png";
const dingdingIcon1 = "/images/client/pc/kefudingding1.png";
const dingdingIcon2 = "/images/client/pc/kefudingding2.png";
const phoneIcon = "/images/client/pc/kefudianhua.png";
const contactIcon = "/images/client/pc/kefulianxi.png";
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ServiceModal",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-modal-mask" }, _attrs))} data-v-f26396d8><div class="service-modal" data-v-f26396d8><div class="modal-gradient-top" data-v-f26396d8><div class="modal-header" data-v-f26396d8><span class="modal-title" data-v-f26396d8>联系客服</span><button class="modal-close" data-v-f26396d8>×</button></div><div class="modal-desc" data-v-f26396d8>我们提供多种便捷的客服渠道，7×24小时为您提供专业服务。扫码添加客服，获取即时帮助。</div></div><div class="modal-main-white" data-v-f26396d8><div class="modal-row" data-v-f26396d8><div class="modal-card" data-v-f26396d8><div class="card-top-row" data-v-f26396d8><div class="card-avatar wechat" data-v-f26396d8><img${ssrRenderAttr("src", weixinIcon1)} alt="微信客服图标" data-v-f26396d8></div><div class="card-title" data-v-f26396d8>微信客服</div></div><div class="card-icon-box" data-v-f26396d8><img${ssrRenderAttr("src", weixinIcon2)} class="card-icon-img" alt="微信二维码" data-v-f26396d8></div><div class="card-desc" data-v-f26396d8>使用微信扫描二维码添加客服<br data-v-f26396d8>或搜索微信号：<span class="account-code" data-v-f26396d8>kefu_wechat123</span></div></div><div class="modal-card" data-v-f26396d8><div class="card-top-row" data-v-f26396d8><div class="card-avatar dingtalk" data-v-f26396d8><img${ssrRenderAttr("src", dingdingIcon1)} alt="钉钉客服图标" data-v-f26396d8></div><div class="card-title" data-v-f26396d8>钉钉客服</div></div><div class="card-icon-box" data-v-f26396d8><img${ssrRenderAttr("src", dingdingIcon2)} class="card-icon-img" alt="钉钉二维码" data-v-f26396d8></div><div class="card-desc" data-v-f26396d8>使用钉钉扫描二维码添加客服<br data-v-f26396d8>或搜索ID：<span class="account-code" data-v-f26396d8>kefu_dingtalk456</span></div></div></div><div class="modal-row phone-row" data-v-f26396d8><div class="modal-card phone" data-v-f26396d8><div class="phone-header" data-v-f26396d8><div class="modal-card-icon phone" data-v-f26396d8><img${ssrRenderAttr("src", phoneIcon)} alt="电话客服图标" data-v-f26396d8></div><div class="modal-card-title phone" data-v-f26396d8>电话客服</div></div><div class="modal-phone-number" data-v-f26396d8>400-888-9999</div><div class="modal-phone-desc" data-v-f26396d8>服务时间：全天24小时<br data-v-f26396d8>拨打客服热线获取即时支持<br data-v-f26396d8>或发送邮件至 <span class="email-support" data-v-f26396d8>support@company.com</span></div></div></div><button class="modal-action" data-v-f26396d8><img${ssrRenderAttr("src", contactIcon)} alt="联系客服图标" class="action-icon" data-v-f26396d8> 联系在线客服 </button></div></div></div>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$c = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServiceModal.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ServiceModal = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-f26396d8"]]);
const configProviderContextKey = /* @__PURE__ */ Symbol();
var English = {
  name: "en",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
    },
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color.",
      alphaLabel: "pick alpha value",
      alphaDescription: "alpha {alpha}, current color is {color}",
      hueLabel: "pick hue value",
      hueDescription: "hue {hue}, current color is {color}",
      svLabel: "pick saturation and brightness value",
      svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
      predefineDescription: "select {value} as the color"
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    mention: {
      loading: "Loading"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
      selectAllLabel: "Select all rows",
      selectRowLabel: "Select this row",
      expandRowLabel: "Expand this row",
      collapseRowLabel: "Collapse this row",
      sortLabel: "Sort by {column}",
      filterLabel: "Filter by {column}"
    },
    tag: {
      close: "Close this tag"
    },
    tour: {
      next: "Next",
      previous: "Previous",
      finish: "Finish",
      close: "Close this dialog"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    },
    carousel: {
      leftArrow: "Carousel arrow left",
      rightArrow: "Carousel arrow right",
      indicator: "Carousel switch to index {index}"
    }
  }
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(
  /\{(\w+)\}/g,
  (_, key) => {
    var _a;
    return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
  }
);
const buildLocaleContext = (locale) => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};
const localeContextKey = /* @__PURE__ */ Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
  const locale = localeOverrides || inject(localeContextKey, ref());
  return buildLocaleContext(computed(() => locale.value || English));
};
const componentSizes = ["", "default", "small", "large"];
const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const SIZE_INJECTION_KEY = /* @__PURE__ */ Symbol("size");
const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {});
  return computed(() => {
    return unref(injectedSize.size) || "";
  });
};
const emptyValuesContextKey = /* @__PURE__ */ Symbol("emptyValuesContextKey");
const SCOPE = "use-empty-values";
const DEFAULT_EMPTY_VALUES = ["", void 0, null];
const DEFAULT_VALUE_ON_CLEAR = void 0;
const useEmptyValuesProps = buildProps({
  emptyValues: Array,
  valueOnClear: {
    type: definePropType([
      String,
      Number,
      Boolean,
      Function
    ]),
    default: void 0,
    validator: (val) => {
      val = isFunction$2(val) ? val() : val;
      if (isArray$1(val)) {
        return val.every((item) => !item);
      }
      return !val;
    }
  }
});
const useEmptyValues = (props, defaultValue) => {
  const config = getCurrentInstance() ? inject(emptyValuesContextKey, ref({})) : ref({});
  const emptyValues = computed(
    () => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES
  );
  const valueOnClear = computed(() => {
    if (isFunction$2(props.valueOnClear)) {
      return props.valueOnClear();
    } else if (props.valueOnClear !== void 0) {
      return props.valueOnClear;
    } else if (isFunction$2(config.value.valueOnClear)) {
      return config.value.valueOnClear();
    } else if (config.value.valueOnClear !== void 0) {
      return config.value.valueOnClear;
    }
    return defaultValue !== void 0 ? defaultValue : DEFAULT_VALUE_ON_CLEAR;
  });
  const isEmptyValue = (value) => {
    let result = true;
    if (isArray$1(value)) {
      result = emptyValues.value.some((emptyValue) => {
        return isEqual(value, emptyValue);
      });
    } else {
      result = emptyValues.value.includes(value);
    }
    return result;
  };
  if (!isEmptyValue(valueOnClear.value)) {
    debugWarn(SCOPE, "value-on-clear should be a value of empty-values");
  }
  return {
    emptyValues,
    valueOnClear,
    isEmptyValue
  };
};
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => {
      var _a, _b;
      return (_b = (_a = config.value) == null ? void 0 : _a[key]) != null ? _b : defaultValue;
    });
  } else {
    return config;
  }
}
function useGlobalComponentSettings(block, sizeFallback) {
  const config = useGlobalConfig();
  const ns = useNamespace(
    block,
    computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.namespace) || defaultNamespace;
    })
  );
  const locale = useLocale(computed(() => {
    var _a;
    return (_a = config.value) == null ? void 0 : _a.locale;
  }));
  const zIndex2 = useZIndex(
    computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.zIndex) || defaultInitialZIndex;
    })
  );
  const size = computed(() => {
    var _a;
    return unref(sizeFallback) || ((_a = config.value) == null ? void 0 : _a.size) || "";
  });
  provideGlobalConfig(computed(() => unref(config) || {}));
  return {
    ns,
    locale,
    zIndex: zIndex2,
    size
  };
}
const provideGlobalConfig = (config, app, global2 = false) => {
  var _a;
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : void 0;
  const provideFn = (_a = void 0) != null ? _a : inSetup ? provide : void 0;
  if (!provideFn) {
    debugWarn(
      "provideGlobalConfig",
      "provideGlobalConfig() can only be used inside setup()."
    );
    return;
  }
  const context = computed(() => {
    const cfg = unref(config);
    if (!(oldConfig == null ? void 0 : oldConfig.value))
      return cfg;
    return mergeConfig(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  provideFn(
    localeContextKey,
    computed(() => context.value.locale)
  );
  provideFn(
    namespaceContextKey,
    computed(() => context.value.namespace)
  );
  provideFn(
    zIndexContextKey,
    computed(() => context.value.zIndex)
  );
  provideFn(SIZE_INJECTION_KEY, {
    size: computed(() => context.value.size || "")
  });
  provideFn(
    emptyValuesContextKey,
    computed(() => ({
      emptyValues: context.value.emptyValues,
      valueOnClear: context.value.valueOnClear
    }))
  );
  if (global2 || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};
const mergeConfig = (a, b) => {
  const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
  const obj = {};
  for (const key of keys) {
    obj[key] = b[key] !== void 0 ? b[key] : a[key];
  }
  return obj;
};
var _sfc_main6 = /* @__PURE__ */ defineComponent({
  name: "ArrowDown",
  __name: "arrow-down",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"
      })
    ]));
  }
}), arrow_down_default = _sfc_main6;
var _sfc_main8 = /* @__PURE__ */ defineComponent({
  name: "ArrowLeft",
  __name: "arrow-left",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0"
      })
    ]));
  }
}), arrow_left_default = _sfc_main8;
var _sfc_main10 = /* @__PURE__ */ defineComponent({
  name: "ArrowRight",
  __name: "arrow-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512 340.864 831.872a30.59 30.59 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), arrow_right_default = _sfc_main10;
var _sfc_main12 = /* @__PURE__ */ defineComponent({
  name: "ArrowUp",
  __name: "arrow-up",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0"
      })
    ]));
  }
}), arrow_up_default = _sfc_main12;
var _sfc_main14 = /* @__PURE__ */ defineComponent({
  name: "Back",
  __name: "back",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
      })
    ]));
  }
}), back_default = _sfc_main14;
var _sfc_main18 = /* @__PURE__ */ defineComponent({
  name: "Bell",
  __name: "bell",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a64 64 0 0 1 64 64v64H448v-64a64 64 0 0 1 64-64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M256 768h512V448a256 256 0 1 0-512 0zm256-640a320 320 0 0 1 320 320v384H192V448a320 320 0 0 1 320-320"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M96 768h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32m352 128h128a64 64 0 0 1-128 0"
      })
    ]));
  }
}), bell_default = _sfc_main18;
var _sfc_main22 = /* @__PURE__ */ defineComponent({
  name: "Bottom",
  __name: "bottom",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z"
      })
    ]));
  }
}), bottom_default = _sfc_main22;
var _sfc_main24 = /* @__PURE__ */ defineComponent({
  name: "Box",
  __name: "box",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M317.056 128 128 344.064V896h768V344.064L706.944 128zm-14.528-64h418.944a32 32 0 0 1 24.064 10.88l206.528 236.096A32 32 0 0 1 960 332.032V928a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V332.032a32 32 0 0 1 7.936-21.12L278.4 75.008A32 32 0 0 1 302.528 64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M64 320h896v64H64z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M448 327.872V640h128V327.872L526.08 128h-28.16zM448 64h128l64 256v352a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V320z"
      })
    ]));
  }
}), box_default = _sfc_main24;
var _sfc_main29 = /* @__PURE__ */ defineComponent({
  name: "Calendar",
  __name: "calendar",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64"
      })
    ]));
  }
}), calendar_default = _sfc_main29;
var _sfc_main31 = /* @__PURE__ */ defineComponent({
  name: "Camera",
  __name: "camera",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M896 256H128v576h768zm-199.424-64-32.064-64h-304.96l-32 64zM96 192h160l46.336-92.608A64 64 0 0 1 359.552 64h304.96a64 64 0 0 1 57.216 35.328L768.192 192H928a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32m416 512a160 160 0 1 0 0-320 160 160 0 0 0 0 320m0 64a224 224 0 1 1 0-448 224 224 0 0 1 0 448"
      })
    ]));
  }
}), camera_default = _sfc_main31;
var _sfc_main34 = /* @__PURE__ */ defineComponent({
  name: "CaretRight",
  __name: "caret-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M384 192v640l384-320.064z"
      })
    ]));
  }
}), caret_right_default = _sfc_main34;
var _sfc_main37 = /* @__PURE__ */ defineComponent({
  name: "ChatDotRound",
  __name: "chat-dot-round",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.06 461.06 0 0 1-206.912-48.384l-175.616 58.56z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 563.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4"
      })
    ]));
  }
}), chat_dot_round_default = _sfc_main37;
var _sfc_main43 = /* @__PURE__ */ defineComponent({
  name: "Check",
  __name: "check",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), check_default = _sfc_main43;
var _sfc_main48 = /* @__PURE__ */ defineComponent({
  name: "CircleCheckFilled",
  __name: "circle-check-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
      })
    ]));
  }
}), circle_check_filled_default = _sfc_main48;
var _sfc_main49 = /* @__PURE__ */ defineComponent({
  name: "CircleCheck",
  __name: "circle-check",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752z"
      })
    ]));
  }
}), circle_check_default = _sfc_main49;
var _sfc_main50 = /* @__PURE__ */ defineComponent({
  name: "CircleCloseFilled",
  __name: "circle-close-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
      })
    ]));
  }
}), circle_close_filled_default = _sfc_main50;
var _sfc_main51 = /* @__PURE__ */ defineComponent({
  name: "CircleClose",
  __name: "circle-close",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), circle_close_default = _sfc_main51;
var _sfc_main54 = /* @__PURE__ */ defineComponent({
  name: "Clock",
  __name: "clock",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32"
      })
    ]));
  }
}), clock_default = _sfc_main54;
var _sfc_main56 = /* @__PURE__ */ defineComponent({
  name: "Close",
  __name: "close",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), close_default = _sfc_main56;
var _sfc_main63 = /* @__PURE__ */ defineComponent({
  name: "Collection",
  __name: "collection",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M192 736h640V128H256a64 64 0 0 0-64 64zm64-672h608a32 32 0 0 1 32 32v672a32 32 0 0 1-32 32H160l-32 57.536V192A128 128 0 0 1 256 64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M240 800a48 48 0 1 0 0 96h592v-96zm0-64h656v160a64 64 0 0 1-64 64H240a112 112 0 0 1 0-224m144-608v250.88l96-76.8 96 76.8V128zm-64-64h320v381.44a32 32 0 0 1-51.968 24.96L480 384l-108.032 86.4A32 32 0 0 1 320 445.44z"
      })
    ]));
  }
}), collection_default = _sfc_main63;
var _sfc_main66 = /* @__PURE__ */ defineComponent({
  name: "Connection",
  __name: "connection",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M640 384v64H448a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h320a128 128 0 0 0 128-128V576a128 128 0 0 0-64-110.848V394.88c74.56 26.368 128 97.472 128 181.056v128a192 192 0 0 1-192 192H448a192 192 0 0 1-192-192V576a192 192 0 0 1 192-192z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M384 640v-64h192a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128H256a128 128 0 0 0-128 128v128a128 128 0 0 0 64 110.848v70.272A192.06 192.06 0 0 1 64 448V320a192 192 0 0 1 192-192h320a192 192 0 0 1 192 192v128a192 192 0 0 1-192 192z"
      })
    ]));
  }
}), connection_default = _sfc_main66;
var _sfc_main68 = /* @__PURE__ */ defineComponent({
  name: "CopyDocument",
  __name: "copy-document",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64"
      })
    ]));
  }
}), copy_document_default = _sfc_main68;
var _sfc_main69 = /* @__PURE__ */ defineComponent({
  name: "Cpu",
  __name: "cpu",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M320 256a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320a64 64 0 0 0-64-64zm0-64h384a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H320a128 128 0 0 1-128-128V320a128 128 0 0 1 128-128"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32m160 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32m-320 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32m160 896a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32m160 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32m-320 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32M64 512a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32m0-160a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32m0 320a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32m896-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32m0-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32m0 320a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32"
      })
    ]));
  }
}), cpu_default = _sfc_main69;
var _sfc_main70 = /* @__PURE__ */ defineComponent({
  name: "CreditCard",
  __name: "credit-card",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M896 324.096c0-42.368-2.496-55.296-9.536-68.48a52.35 52.35 0 0 0-22.144-22.08c-13.12-7.04-26.048-9.536-68.416-9.536H228.096c-42.368 0-55.296 2.496-68.48 9.536a52.35 52.35 0 0 0-22.08 22.144c-7.04 13.12-9.536 26.048-9.536 68.416v375.808c0 42.368 2.496 55.296 9.536 68.48a52.35 52.35 0 0 0 22.144 22.08c13.12 7.04 26.048 9.536 68.416 9.536h567.808c42.368 0 55.296-2.496 68.48-9.536a52.35 52.35 0 0 0 22.08-22.144c7.04-13.12 9.536-26.048 9.536-68.416zm64 0v375.808c0 57.088-5.952 77.76-17.088 98.56-11.136 20.928-27.52 37.312-48.384 48.448S852.928 864 795.968 864H228.032c-57.088 0-77.76-5.952-98.56-17.088a116.3 116.3 0 0 1-48.448-48.384c-11.136-20.864-17.088-41.6-17.088-98.56V324.032c0-57.088 5.952-77.76 17.088-98.56 11.136-20.928 27.52-37.312 48.384-48.448s41.6-17.088 98.56-17.088H795.84c57.088 0 77.76 5.952 98.56 17.088 20.928 11.136 37.312 27.52 48.448 48.384s17.088 41.6 17.088 98.56z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M64 320h896v64H64zm0 128h896v64H64zm128 192h256v64H192z"
      })
    ]));
  }
}), credit_card_default = _sfc_main70;
var _sfc_main72 = /* @__PURE__ */ defineComponent({
  name: "DArrowLeft",
  __name: "d-arrow-left",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0 30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"
      })
    ]));
  }
}), d_arrow_left_default = _sfc_main72;
var _sfc_main73 = /* @__PURE__ */ defineComponent({
  name: "DArrowRight",
  __name: "d-arrow-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.59 30.59 0 0 1 0-42.752L764.736 512 452.864 192a30.59 30.59 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.59 30.59 0 0 1 0-42.752L508.736 512 196.864 192a30.59 30.59 0 0 1 0-42.688"
      })
    ]));
  }
}), d_arrow_right_default = _sfc_main73;
var _sfc_main80 = /* @__PURE__ */ defineComponent({
  name: "Delete",
  __name: "delete",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
      })
    ]));
  }
}), delete_default = _sfc_main80;
var _sfc_main85 = /* @__PURE__ */ defineComponent({
  name: "DocumentAdd",
  __name: "document-add",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m320 512V448h64v128h128v64H544v128h-64V640H352v-64z"
      })
    ]));
  }
}), document_add_default = _sfc_main85;
var _sfc_main87 = /* @__PURE__ */ defineComponent({
  name: "DocumentCopy",
  __name: "document-copy",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 320v576h576V320zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32M960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32M256 672h320v64H256zm0-192h320v64H256z"
      })
    ]));
  }
}), document_copy_default = _sfc_main87;
var _sfc_main90 = /* @__PURE__ */ defineComponent({
  name: "Document",
  __name: "document",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h160v64H320zm0 384h384v64H320z"
      })
    ]));
  }
}), document_default = _sfc_main90;
var _sfc_main93 = /* @__PURE__ */ defineComponent({
  name: "EditPen",
  __name: "edit-pen",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64z"
      })
    ]));
  }
}), edit_pen_default = _sfc_main93;
var _sfc_main94 = /* @__PURE__ */ defineComponent({
  name: "Edit",
  __name: "edit",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), edit_default = _sfc_main94;
var _sfc_main98 = /* @__PURE__ */ defineComponent({
  name: "Expand",
  __name: "expand",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 192h768v128H128zm0 256h512v128H128zm0 256h768v128H128zm576-352 192 160-192 128z"
      })
    ]));
  }
}), expand_default = _sfc_main98;
var _sfc_main101 = /* @__PURE__ */ defineComponent({
  name: "Files",
  __name: "files",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 384v448h768V384zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32m64-128h704v64H160zm96-128h512v64H256z"
      })
    ]));
  }
}), files_default = _sfc_main101;
var _sfc_main107 = /* @__PURE__ */ defineComponent({
  name: "Fold",
  __name: "fold",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M896 192H128v128h768zm0 256H384v128h512zm0 256H128v128h768zM320 384 128 512l192 128z"
      })
    ]));
  }
}), fold_default = _sfc_main107;
var _sfc_main112 = /* @__PURE__ */ defineComponent({
  name: "FolderRemove",
  __name: "folder-remove",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 192v640h768V320H485.76L357.504 192zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32m256 416h320v64H352z"
      })
    ]));
  }
}), folder_remove_default = _sfc_main112;
var _sfc_main113 = /* @__PURE__ */ defineComponent({
  name: "Folder",
  __name: "folder",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 192v640h768V320H485.76L357.504 192zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32"
      })
    ]));
  }
}), folder_default = _sfc_main113;
var _sfc_main118 = /* @__PURE__ */ defineComponent({
  name: "FullScreen",
  __name: "full-screen",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"
      })
    ]));
  }
}), full_screen_default = _sfc_main118;
var _sfc_main125 = /* @__PURE__ */ defineComponent({
  name: "Goods",
  __name: "goods",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M320 288v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4h131.072a32 32 0 0 1 31.808 28.8l57.6 576a32 32 0 0 1-31.808 35.2H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320zm64 0h256v-22.336C640 189.248 582.272 128 512 128s-128 61.248-128 137.664v22.4zm-64 64H217.92l-51.2 512h690.56l-51.264-512H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0z"
      })
    ]));
  }
}), goods_default = _sfc_main125;
var _sfc_main128 = /* @__PURE__ */ defineComponent({
  name: "Guide",
  __name: "guide",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M640 608h-64V416h64zm0 160v160a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V768h64v128h128V768zM384 608V416h64v192zm256-352h-64V128H448v128h-64V96a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "m220.8 256-71.232 80 71.168 80H768V256zm-14.4-64H800a32 32 0 0 1 32 32v224a32 32 0 0 1-32 32H206.4a32 32 0 0 1-23.936-10.752l-99.584-112a32 32 0 0 1 0-42.496l99.584-112A32 32 0 0 1 206.4 192m678.784 496-71.104 80H266.816V608h547.2zm-56.768-144H234.88a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h593.6a32 32 0 0 0 23.936-10.752l99.584-112a32 32 0 0 0 0-42.496l-99.584-112A32 32 0 0 0 828.48 544z"
      })
    ]));
  }
}), guide_default = _sfc_main128;
var _sfc_main130 = /* @__PURE__ */ defineComponent({
  name: "Headset",
  __name: "headset",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848M896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0"
      })
    ]));
  }
}), headset_default = _sfc_main130;
var _sfc_main133 = /* @__PURE__ */ defineComponent({
  name: "Hide",
  __name: "hide",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4s-12.8-9.6-22.4-9.6-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176S0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4 12.8 9.6 22.4 9.6 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4m-646.4 528Q115.2 579.2 76.8 512q43.2-72 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4m140.8-96Q352 555.2 352 512c0-44.8 16-83.2 48-112s67.2-48 112-48c28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6q-43.2 72-153.6 172.8c-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176S1024 528 1024 512s-48.001-73.6-134.401-176"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112s-67.2 48-112 48"
      })
    ]));
  }
}), hide_default = _sfc_main133;
var _sfc_main143 = /* @__PURE__ */ defineComponent({
  name: "InfoFilled",
  __name: "info-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.99 12.99 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
      })
    ]));
  }
}), info_filled_default = _sfc_main143;
var _sfc_main145 = /* @__PURE__ */ defineComponent({
  name: "Key",
  __name: "key",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M448 456.064V96a32 32 0 0 1 32-32.064L672 64a32 32 0 0 1 0 64H512v128h160a32 32 0 0 1 0 64H512v128a256 256 0 1 1-64 8.064M512 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384"
      })
    ]));
  }
}), key_default = _sfc_main145;
var _sfc_main147 = /* @__PURE__ */ defineComponent({
  name: "Lightning",
  __name: "lightning",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M288 671.36v64.128A239.81 239.81 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 736 734.016v-64.768a192 192 0 0 0 3.328-377.92l-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 91.968 70.464 167.36 160.256 175.232z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M416 736a32 32 0 0 1-27.776-47.872l128-224a32 32 0 1 1 55.552 31.744L471.168 672H608a32 32 0 0 1 27.776 47.872l-128 224a32 32 0 1 1-55.68-31.744L552.96 736z"
      })
    ]));
  }
}), lightning_default = _sfc_main147;
var _sfc_main149 = /* @__PURE__ */ defineComponent({
  name: "List",
  __name: "list",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M704 192h160v736H160V192h160v64h384zM288 512h448v-64H288zm0 256h448v-64H288zm96-576V96h256v96z"
      })
    ]));
  }
}), list_default = _sfc_main149;
var _sfc_main150 = /* @__PURE__ */ defineComponent({
  name: "Loading",
  __name: "loading",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248M828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0"
      })
    ]));
  }
}), loading_default = _sfc_main150;
var _sfc_main154 = /* @__PURE__ */ defineComponent({
  name: "Lock",
  __name: "lock",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32m192-160v-64a192 192 0 1 0-384 0v64zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64"
      })
    ]));
  }
}), lock_default = _sfc_main154;
var _sfc_main156 = /* @__PURE__ */ defineComponent({
  name: "MagicStick",
  __name: "magic-stick",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64h64v192h-64zm0 576h64v192h-64zM160 480v-64h192v64zm576 0v-64h192v64zM249.856 199.04l45.248-45.184L430.848 289.6 385.6 334.848 249.856 199.104zM657.152 606.4l45.248-45.248 135.744 135.744-45.248 45.248zM114.048 923.2 68.8 877.952l316.8-316.8 45.248 45.248zM702.4 334.848 657.152 289.6l135.744-135.744 45.248 45.248z"
      })
    ]));
  }
}), magic_stick_default = _sfc_main156;
var _sfc_main165 = /* @__PURE__ */ defineComponent({
  name: "Message",
  __name: "message",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224z"
      })
    ]));
  }
}), message_default = _sfc_main165;
var _sfc_main169 = /* @__PURE__ */ defineComponent({
  name: "Minus",
  __name: "minus",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"
      })
    ]));
  }
}), minus_default = _sfc_main169;
var _sfc_main170 = /* @__PURE__ */ defineComponent({
  name: "Money",
  __name: "money",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M768 192H128v448h640zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.06 29.06 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320m0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192"
      })
    ]));
  }
}), money_default = _sfc_main170;
var _sfc_main171 = /* @__PURE__ */ defineComponent({
  name: "Monitor",
  __name: "monitor",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M544 768v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768H192A128 128 0 0 1 64 640V256a128 128 0 0 1 128-128h640a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128zM192 192a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"
      })
    ]));
  }
}), monitor_default = _sfc_main171;
var _sfc_main173 = /* @__PURE__ */ defineComponent({
  name: "Moon",
  __name: "moon",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M240.448 240.448a384 384 0 1 0 559.424 525.696 448 448 0 0 1-542.016-542.08 391 391 0 0 0-17.408 16.384m181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696"
      })
    ]));
  }
}), moon_default = _sfc_main173;
var _sfc_main174 = /* @__PURE__ */ defineComponent({
  name: "MoreFilled",
  __name: "more-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), more_filled_default = _sfc_main174;
var _sfc_main175 = /* @__PURE__ */ defineComponent({
  name: "More",
  __name: "more",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96"
      })
    ]));
  }
}), more_default = _sfc_main175;
var _sfc_main184 = /* @__PURE__ */ defineComponent({
  name: "Odometer",
  __name: "odometer",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M192 512a320 320 0 1 1 640 0 32 32 0 1 1-64 0 256 256 0 1 0-512 0 32 32 0 0 1-64 0"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M570.432 627.84A96 96 0 1 1 509.568 608l60.992-187.776A32 32 0 1 1 631.424 440l-60.992 187.776zM502.08 734.464a32 32 0 1 0 19.84-60.928 32 32 0 0 0-19.84 60.928"
      })
    ]));
  }
}), odometer_default = _sfc_main184;
var _sfc_main187 = /* @__PURE__ */ defineComponent({
  name: "Operation",
  __name: "operation",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64z"
      })
    ]));
  }
}), operation_default = _sfc_main187;
var _sfc_main195 = /* @__PURE__ */ defineComponent({
  name: "PictureFilled",
  __name: "picture-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112M256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384"
      })
    ]));
  }
}), picture_filled_default = _sfc_main195;
var _sfc_main197 = /* @__PURE__ */ defineComponent({
  name: "Picture",
  __name: "picture",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M160 160v704h704V160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M384 288q64 0 64 64t-64 64-64-64 64-64M185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952z"
      })
    ]));
  }
}), picture_default = _sfc_main197;
var _sfc_main200 = /* @__PURE__ */ defineComponent({
  name: "Platform",
  __name: "platform",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M448 832v-64h128v64h192v64H256v-64zM128 704V128h768v576z"
      })
    ]));
  }
}), platform_default = _sfc_main200;
var _sfc_main201 = /* @__PURE__ */ defineComponent({
  name: "Plus",
  __name: "plus",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), plus_default = _sfc_main201;
var _sfc_main206 = /* @__PURE__ */ defineComponent({
  name: "Present",
  __name: "present",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 896V640H192v-64h288V320H192v576zm64 0h288V320H544v256h288v64H544zM128 256h768v672a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M96 256h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M416 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128m0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M608 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128m0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256"
      })
    ]));
  }
}), present_default = _sfc_main206;
var _sfc_main211 = /* @__PURE__ */ defineComponent({
  name: "QuestionFilled",
  __name: "question-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592q0-64.416-42.24-101.376c-28.16-25.344-65.472-37.312-111.232-37.312m-12.672 406.208a54.27 54.27 0 0 0-38.72 14.784 49.4 49.4 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.85 54.85 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.97 51.97 0 0 0-15.488-38.016 55.94 55.94 0 0 0-39.424-14.784"
      })
    ]));
  }
}), question_filled_default = _sfc_main211;
var _sfc_main212 = /* @__PURE__ */ defineComponent({
  name: "Rank",
  __name: "rank",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m186.496 544 41.408 41.344a32 32 0 1 1-45.248 45.312l-96-96a32 32 0 0 1 0-45.312l96-96a32 32 0 1 1 45.248 45.312L186.496 480h290.816V186.432l-41.472 41.472a32 32 0 1 1-45.248-45.184l96-96.128a32 32 0 0 1 45.312 0l96 96.064a32 32 0 0 1-45.248 45.184l-41.344-41.28V480H832l-41.344-41.344a32 32 0 0 1 45.248-45.312l96 96a32 32 0 0 1 0 45.312l-96 96a32 32 0 0 1-45.248-45.312L832 544H541.312v293.44l41.344-41.28a32 32 0 1 1 45.248 45.248l-96 96a32 32 0 0 1-45.312 0l-96-96a32 32 0 1 1 45.312-45.248l41.408 41.408V544z"
      })
    ]));
  }
}), rank_default = _sfc_main212;
var _sfc_main215 = /* @__PURE__ */ defineComponent({
  name: "RefreshLeft",
  __name: "refresh-left",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
      })
    ]));
  }
}), refresh_left_default = _sfc_main215;
var _sfc_main216 = /* @__PURE__ */ defineComponent({
  name: "RefreshRight",
  __name: "refresh-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88"
      })
    ]));
  }
}), refresh_right_default = _sfc_main216;
var _sfc_main217 = /* @__PURE__ */ defineComponent({
  name: "Refresh",
  __name: "refresh",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
      })
    ]));
  }
}), refresh_default = _sfc_main217;
var _sfc_main221 = /* @__PURE__ */ defineComponent({
  name: "Right",
  __name: "right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
      })
    ]));
  }
}), right_default = _sfc_main221;
var _sfc_main222 = /* @__PURE__ */ defineComponent({
  name: "ScaleToOriginal",
  __name: "scale-to-original",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.12 30.12 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.12 30.12 0 0 0-30.118-30.118m-361.412 0a30.12 30.12 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.12 30.12 0 0 0-30.118-30.118M512 361.412a30.12 30.12 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.12 30.12 0 0 0 512 361.412M512 512a30.12 30.12 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.12 30.12 0 0 0 512 512"
      })
    ]));
  }
}), scale_to_original_default = _sfc_main222;
var _sfc_main225 = /* @__PURE__ */ defineComponent({
  name: "Search",
  __name: "search",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), search_default = _sfc_main225;
var _sfc_main226 = /* @__PURE__ */ defineComponent({
  name: "Select",
  __name: "select",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496"
      })
    ]));
  }
}), select_default = _sfc_main226;
var _sfc_main229 = /* @__PURE__ */ defineComponent({
  name: "Service",
  __name: "service",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M864 409.6a192 192 0 0 1-37.888 349.44A256.064 256.064 0 0 1 576 960h-96a32 32 0 1 1 0-64h96a192.06 192.06 0 0 0 181.12-128H736a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h32c10.368 0 20.544.832 30.528 2.432a288 288 0 0 0-573.056 0A193 193 0 0 1 256 384h32a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-32a192 192 0 0 1-96-358.4 352 352 0 0 1 704 0M256 448a128 128 0 1 0 0 256zm640 128a128 128 0 0 0-128-128v256a128 128 0 0 0 128-128"
      })
    ]));
  }
}), service_default = _sfc_main229;
var _sfc_main231 = /* @__PURE__ */ defineComponent({
  name: "Setting",
  __name: "setting",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357 357 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a352 352 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357 357 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294 294 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293 293 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294 294 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288 288 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293 293 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a288 288 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256"
      })
    ]));
  }
}), setting_default = _sfc_main231;
var _sfc_main232 = /* @__PURE__ */ defineComponent({
  name: "Share",
  __name: "share",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m679.872 348.8-301.76 188.608a127.8 127.8 0 0 1 5.12 52.16l279.936 104.96a128 128 0 1 1-22.464 59.904l-279.872-104.96a128 128 0 1 1-16.64-166.272l301.696-188.608a128 128 0 1 1 33.92 54.272z"
      })
    ]));
  }
}), share_default = _sfc_main232;
var _sfc_main237 = /* @__PURE__ */ defineComponent({
  name: "ShoppingCart",
  __name: "shopping-cart",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96m320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96M96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128zm314.24 576h395.904l82.304-384H333.44z"
      })
    ]));
  }
}), shopping_cart_default = _sfc_main237;
var _sfc_main242 = /* @__PURE__ */ defineComponent({
  name: "SortDown",
  __name: "sort-down",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M576 96v709.568L333.312 562.816A32 32 0 1 0 288 608l297.408 297.344A32 32 0 0 0 640 882.688V96a32 32 0 0 0-64 0"
      })
    ]));
  }
}), sort_down_default = _sfc_main242;
var _sfc_main243 = /* @__PURE__ */ defineComponent({
  name: "SortUp",
  __name: "sort-up",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M384 141.248V928a32 32 0 1 0 64 0V218.56l242.688 242.688A32 32 0 1 0 736 416L438.592 118.656A32 32 0 0 0 384 141.248"
      })
    ]));
  }
}), sort_up_default = _sfc_main243;
var _sfc_main246 = /* @__PURE__ */ defineComponent({
  name: "StarFilled",
  __name: "star-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M313.6 924.48a70.4 70.4 0 0 1-74.152-5.365 70.4 70.4 0 0 1-27.992-68.875l37.888-220.928L88.96 472.96a70.4 70.4 0 0 1 3.788-104.225A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 100.246-28.595 70.4 70.4 0 0 1 25.962 28.595l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"
      })
    ]));
  }
}), star_filled_default = _sfc_main246;
var _sfc_main247 = /* @__PURE__ */ defineComponent({
  name: "Star",
  __name: "star",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"
      })
    ]));
  }
}), star_default = _sfc_main247;
var _sfc_main249 = /* @__PURE__ */ defineComponent({
  name: "SuccessFilled",
  __name: "success-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
      })
    ]));
  }
}), success_filled_default = _sfc_main249;
var _sfc_main253 = /* @__PURE__ */ defineComponent({
  name: "Sunny",
  __name: "sunny",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32M195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248M64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32m768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32M195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0m543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0"
      })
    ]));
  }
}), sunny_default = _sfc_main253;
var _sfc_main256 = /* @__PURE__ */ defineComponent({
  name: "SwitchButton",
  __name: "switch-button",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32"
      })
    ]));
  }
}), switch_button_default = _sfc_main256;
var _sfc_main260 = /* @__PURE__ */ defineComponent({
  name: "Ticket",
  __name: "ticket",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M640 832H64V640a128 128 0 1 0 0-256V192h576v160h64V192h256v192a128 128 0 1 0 0 256v192H704V672h-64zm0-416v192h64V416z"
      })
    ]));
  }
}), ticket_default = _sfc_main260;
var _sfc_main261 = /* @__PURE__ */ defineComponent({
  name: "Tickets",
  __name: "tickets",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h192v64H320zm0 384h384v64H320z"
      })
    ]));
  }
}), tickets_default = _sfc_main261;
var _sfc_main262 = /* @__PURE__ */ defineComponent({
  name: "Timer",
  __name: "timer",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a320 320 0 1 0 0-640 320 320 0 0 0 0 640m0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 320a32 32 0 0 1 32 32l-.512 224a32 32 0 1 1-64 0L480 352a32 32 0 0 1 32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M448 576a64 64 0 1 0 128 0 64 64 0 1 0-128 0m96-448v128h-64V128h-96a32 32 0 0 1 0-64h256a32 32 0 1 1 0 64z"
      })
    ]));
  }
}), timer_default = _sfc_main262;
var _sfc_main267 = /* @__PURE__ */ defineComponent({
  name: "Top",
  __name: "top",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"
      })
    ]));
  }
}), top_default = _sfc_main267;
var _sfc_main270 = /* @__PURE__ */ defineComponent({
  name: "Trophy",
  __name: "trophy",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 896V702.08A256.26 256.26 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.26 256.26 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64zm224-448V128H320v320a192 192 0 1 0 384 0m64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448z"
      })
    ]));
  }
}), trophy_default = _sfc_main270;
var _sfc_main275 = /* @__PURE__ */ defineComponent({
  name: "Upload",
  __name: "upload",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248z"
      })
    ]));
  }
}), upload_default = _sfc_main275;
var _sfc_main276 = /* @__PURE__ */ defineComponent({
  name: "UserFilled",
  __name: "user-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0m544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
      })
    ]));
  }
}), user_filled_default = _sfc_main276;
var _sfc_main277 = /* @__PURE__ */ defineComponent({
  name: "User",
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0"
      })
    ]));
  }
}), user_default = _sfc_main277;
var _sfc_main281 = /* @__PURE__ */ defineComponent({
  name: "VideoPause",
  __name: "video-pause",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768m-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32m192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32"
      })
    ]));
  }
}), video_pause_default = _sfc_main281;
var _sfc_main282 = /* @__PURE__ */ defineComponent({
  name: "VideoPlay",
  __name: "video-play",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768m-48-247.616L668.608 512 464 375.616zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
      })
    ]));
  }
}), video_play_default = _sfc_main282;
var _sfc_main283 = /* @__PURE__ */ defineComponent({
  name: "View",
  __name: "view",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), view_default = _sfc_main283;
var _sfc_main285 = /* @__PURE__ */ defineComponent({
  name: "Wallet",
  __name: "wallet",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M640 288h-64V128H128v704h384v32a32 32 0 0 0 32 32H96a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 320v512h768V320zm-32-64h832a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M704 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128"
      })
    ]));
  }
}), wallet_default = _sfc_main285;
var _sfc_main287 = /* @__PURE__ */ defineComponent({
  name: "WarningFilled",
  __name: "warning-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.43 58.43 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.43 58.43 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
      })
    ]));
  }
}), warning_filled_default = _sfc_main287;
var _sfc_main288 = /* @__PURE__ */ defineComponent({
  name: "Warning",
  __name: "warning",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32"
      })
    ]));
  }
}), warning_default = _sfc_main288;
var _sfc_main292 = /* @__PURE__ */ defineComponent({
  name: "ZoomIn",
  __name: "zoom-in",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), zoom_in_default = _sfc_main292;
var _sfc_main293 = /* @__PURE__ */ defineComponent({
  name: "ZoomOut",
  __name: "zoom-out",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64"
      })
    ]));
  }
}), zoom_out_default = _sfc_main293;
const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const CloseComponents = {
  Close: close_default
};
const TypeComponents = {
  Close: close_default,
  SuccessFilled: success_filled_default,
  InfoFilled: info_filled_default,
  WarningFilled: warning_filled_default,
  CircleCloseFilled: circle_close_filled_default
};
const TypeComponentsMap = {
  primary: info_filled_default,
  success: success_filled_default,
  warning: warning_filled_default,
  error: circle_close_filled_default,
  info: info_filled_default
};
const ValidateComponentsMap = {
  validating: loading_default,
  success: circle_check_default,
  error: circle_close_default
};
const isFirefox = () => isClient && /firefox/i.test((void 0).navigator.userAgent);
const isAndroid = () => isClient && /android/i.test((void 0).navigator.userAgent);
const mutable = (val) => val;
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler == null ? void 0 : oursHandler(event);
    }
  };
  return handleEvent;
};
const whenMouse = (handler) => {
  return (e) => e.pointerType === "mouse" ? handler(e) : void 0;
};
const getEventCode = (event) => {
  if (event.code && event.code !== "Unidentified")
    return event.code;
  const key = getEventKey(event);
  if (key) {
    if (Object.values(EVENT_CODE).includes(key))
      return key;
    switch (key) {
      case " ":
        return EVENT_CODE.space;
      default:
        return "";
    }
  }
  return "";
};
const getEventKey = (event) => {
  let key = event.key && event.key !== "Unidentified" ? event.key : "";
  if (!key && event.type === "keyup" && isAndroid()) {
    const target = event.target;
    key = target.value.charAt(target.selectionStart - 1);
  }
  return key;
};
const badgeProps = buildProps({
  value: {
    type: [String, Number],
    default: ""
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  },
  showZero: {
    type: Boolean,
    default: true
  },
  color: String,
  badgeStyle: {
    type: definePropType([String, Object, Array])
  },
  offset: {
    type: definePropType(Array),
    default: [0, 0]
  },
  badgeClass: {
    type: String
  }
});
const _sfc_main$d = defineComponent({
  ...{
    name: "ElBadge"
  },
  __name: "badge",
  props: badgeProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("badge");
    const content = computed(() => {
      if (props.isDot)
        return "";
      if (isNumber$1(props.value) && isNumber$1(props.max)) {
        return props.max < props.value ? `${props.max}+` : `${props.value}`;
      }
      return `${props.value}`;
    });
    const style = computed(() => {
      var _a;
      return [
        {
          backgroundColor: props.color,
          marginRight: addUnit(-props.offset[0]),
          marginTop: addUnit(props.offset[1])
        },
        (_a = props.badgeStyle) != null ? _a : {}
      ];
    });
    __expose({
      content
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(Transition, {
            name: `${unref(ns).namespace.value}-zoom-in-center`,
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode(
                "sup",
                {
                  class: normalizeClass([
                    unref(ns).e("content"),
                    unref(ns).em("content", _ctx.type),
                    unref(ns).is("fixed", !!_ctx.$slots.default),
                    unref(ns).is("dot", _ctx.isDot),
                    unref(ns).is("hide-zero", !_ctx.showZero && _ctx.value === 0),
                    _ctx.badgeClass
                  ]),
                  style: normalizeStyle(style.value)
                },
                [
                  renderSlot(_ctx.$slots, "content", { value: content.value }, () => [
                    createTextVNode(
                      toDisplayString(content.value),
                      1
                    )
                  ])
                ],
                6
              ), [
                [vShow, !_ctx.hidden && (content.value || _ctx.isDot || _ctx.$slots.content)]
              ])
            ]),
            _: 3
          }, 8, ["name"])
        ],
        2
      );
    };
  }
});
var Badge = /* @__PURE__ */ _export_sfc$1(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
const ElBadge = withInstall(Badge);
const configProviderProps = buildProps({
  a11y: {
    type: Boolean,
    default: true
  },
  locale: {
    type: definePropType(Object)
  },
  size: useSizeProp,
  button: {
    type: definePropType(Object)
  },
  card: {
    type: definePropType(Object)
  },
  dialog: {
    type: definePropType(Object)
  },
  link: {
    type: definePropType(Object)
  },
  experimentalFeatures: {
    type: definePropType(Object)
  },
  keyboardNavigation: {
    type: Boolean,
    default: true
  },
  message: {
    type: definePropType(Object)
  },
  zIndex: Number,
  namespace: {
    type: String,
    default: "el"
  },
  ...useEmptyValuesProps
});
const messageConfig = {
  placement: "top"
};
defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    watch(
      () => props.message,
      (val) => {
        var _a, _b;
        Object.assign(messageConfig, (_b = (_a = config == null ? void 0 : config.value) == null ? void 0 : _a.message) != null ? _b : {}, val != null ? val : {});
      },
      { immediate: true, deep: true }
    );
    return () => renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
  }
});
const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const MESSAGE_DEFAULT_PLACEMENT = "top";
const messageDefaults = mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? (void 0).body : void 0
});
const messageProps = buildProps({
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = {
  destroy: () => true
};
const placementInstances = shallowReactive(
  {}
);
const getOrCreatePlacementInstances = (placement) => {
  if (!placementInstances[placement]) {
    placementInstances[placement] = shallowReactive([]);
  }
  return placementInstances[placement];
};
const getInstance = (id, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};
const getLastOffset = (id, placement) => {
  const { prev } = getInstance(id, placement);
  if (!prev)
    return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 16 : offset;
};
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
const _sfc_main$c = defineComponent({
  ...{
    name: "ElMessage"
  },
  __name: "message",
  props: messageProps,
  emits: messageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const isStartTransition = ref(false);
    const { ns, zIndex: zIndex2 } = useGlobalComponentSettings("message");
    const { currentZIndex, nextZIndex } = zIndex2;
    const messageRef = ref();
    const visible = ref(false);
    const height = ref(0);
    let stopTimer = void 0;
    const badgeType = computed(
      () => props.type ? props.type === "error" ? "danger" : props.type : "info"
    );
    const typeClass = computed(() => {
      const type = props.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const iconComponent = computed(
      () => props.icon || TypeComponentsMap[props.type] || ""
    );
    const placement = computed(() => props.placement || MESSAGE_DEFAULT_PLACEMENT);
    const lastOffset = computed(() => getLastOffset(props.id, placement.value));
    const offset = computed(() => {
      return getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value;
    });
    const bottom = computed(() => height.value + offset.value);
    const horizontalClass = computed(() => {
      if (placement.value.includes("left"))
        return ns.is("left");
      if (placement.value.includes("right"))
        return ns.is("right");
      return ns.is("center");
    });
    const verticalProperty = computed(
      () => placement.value.startsWith("top") ? "top" : "bottom"
    );
    const customStyle = computed(() => ({
      [verticalProperty.value]: `${offset.value}px`,
      zIndex: currentZIndex.value
    }));
    function startTimer() {
      if (props.duration === 0)
        return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration));
    }
    function clearTimer() {
      stopTimer == null ? void 0 : stopTimer();
    }
    function close() {
      visible.value = false;
      nextTick(() => {
        var _a;
        if (!isStartTransition.value) {
          (_a = props.onClose) == null ? void 0 : _a.call(props);
          emit("destroy");
        }
      });
    }
    function keydown(event) {
      const code = getEventCode(event);
      if (code === EVENT_CODE.esc) {
        close();
      }
    }
    watch(
      () => props.repeatNum,
      () => {
        clearTimer();
        startTimer();
      }
    );
    useEventListener(void 0, "keydown", keydown);
    useResizeObserver(messageRef, () => {
      height.value = messageRef.value.getBoundingClientRect().height;
    });
    __expose({
      visible,
      bottom,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
        onBeforeLeave: _ctx.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            id: _ctx.id,
            ref_key: "messageRef",
            ref: messageRef,
            class: normalizeClass([
              unref(ns).b(),
              { [unref(ns).m(_ctx.type)]: _ctx.type },
              unref(ns).is("closable", _ctx.showClose),
              unref(ns).is("plain", _ctx.plain),
              unref(ns).is("bottom", verticalProperty.value === "bottom"),
              horizontalClass.value,
              _ctx.customClass
            ]),
            style: normalizeStyle(customStyle.value),
            role: "alert",
            onMouseenter: clearTimer,
            onMouseleave: startTimer
          }, [
            _ctx.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
              key: 0,
              value: _ctx.repeatNum,
              type: badgeType.value,
              class: normalizeClass(unref(ns).e("badge"))
            }, null, 8, ["value", "type", "class"])) : createCommentVNode("v-if", true),
            iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass([unref(ns).e("icon"), typeClass.value])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default", {}, () => [
              !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock(
                "p",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("content"))
                },
                toDisplayString(_ctx.message),
                3
              )) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                  createElementVNode("p", {
                    class: normalizeClass(unref(ns).e("content")),
                    innerHTML: _ctx.message
                  }, null, 10, _hoisted_2)
                ],
                2112
              ))
            ]),
            _ctx.showClose ? (openBlock(), createBlock(unref(ElIcon), {
              key: 2,
              class: normalizeClass(unref(ns).e("closeBtn")),
              onClick: withModifiers(close, ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(unref(Close))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true)
          ], 46, _hoisted_1), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});
var MessageConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
let seed = 1;
const normalizeAppendTo = (normalized) => {
  const appendTo = normalized.appendTo;
  if (!appendTo) {
    normalized.appendTo = (void 0).body;
  } else if (isString$1(normalized.appendTo)) {
    let appendTo2 = (void 0).querySelector(normalized.appendTo);
    if (!isElement(appendTo2)) {
      debugWarn(
        "ElMessage",
        "the appendTo option is not an HTMLElement. Falling back to document.body."
      );
      appendTo2 = (void 0).body;
    }
    normalized.appendTo = appendTo2;
  }
};
const normalizePlacement = (normalized) => {
  if (!normalized.placement && isString$1(messageConfig.placement) && messageConfig.placement) {
    normalized.placement = messageConfig.placement;
  }
  if (!normalized.placement) {
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
  }
  if (!messagePlacement.includes(normalized.placement)) {
    debugWarn(
      "ElMessage",
      `Invalid placement: ${normalized.placement}. Falling back to '${MESSAGE_DEFAULT_PLACEMENT}'.`
    );
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
  }
};
const normalizeOptions = (params) => {
  const options = !params || isString$1(params) || isVNode(params) || isFunction$2(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  normalizeAppendTo(normalized);
  normalizePlacement(normalized);
  if (isBoolean$1(messageConfig.grouping) && !normalized.grouping) {
    normalized.grouping = messageConfig.grouping;
  }
  if (isNumber$1(messageConfig.duration) && normalized.duration === 3e3) {
    normalized.duration = messageConfig.duration;
  }
  if (isNumber$1(messageConfig.offset) && normalized.offset === 16) {
    normalized.offset = messageConfig.offset;
  }
  if (isBoolean$1(messageConfig.showClose) && !normalized.showClose) {
    normalized.showClose = messageConfig.showClose;
  }
  if (isBoolean$1(messageConfig.plain) && !normalized.plain) {
    normalized.plain = messageConfig.plain;
  }
  return normalized;
};
const closeMessage = (instance) => {
  const placement = instance.props.placement || MESSAGE_DEFAULT_PLACEMENT;
  const instances = placementInstances[placement];
  const idx = instances.indexOf(instance);
  if (idx === -1)
    return;
  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = (void 0).createElement("div");
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose == null ? void 0 : userOnClose();
      closeMessage(instance);
    },
    onDestroy: () => {
      render(null, container);
    }
  };
  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction$2(props.message) || isVNode(props.message) ? {
      default: isFunction$2(props.message) ? props.message : () => props.message
    } : null
  );
  vnode.appContext = context || message._context;
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const handler = {
    close: () => {
      vm.exposed.close();
    }
  };
  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!isClient)
    return { close: () => void 0 };
  const normalized = normalizeOptions(options);
  const instances = getOrCreatePlacementInstances(
    normalized.placement || MESSAGE_DEFAULT_PLACEMENT
  );
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(
      ({ vnode: vm }) => {
        var _a;
        return ((_a = vm.props) == null ? void 0 : _a.message) === normalized.message;
      }
    );
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  if (isNumber$1(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => void 0 };
  }
  const instance = createMessage(normalized, context);
  instances.push(instance);
  return instance.handler;
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});
function closeAll(type) {
  for (const placement in placementInstances) {
    if (hasOwn(placementInstances, placement)) {
      const instances = [...placementInstances[placement]];
      for (const instance of instances) {
        if (!type || type === instance.props.type) {
          instance.handler.close();
        }
      }
    }
  }
}
function closeAllByPlacement(placement) {
  if (!placementInstances[placement])
    return;
  const instances = [...placementInstances[placement]];
  instances.forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "EmailInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "请输入您的邮箱" },
    type: { type: String, default: "email" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "blur", "focus"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const DOMAIN_SUFFIXES = [
      "gmail.com",
      "qq.com",
      "163.com",
      "outlook.com",
      "icloud.com"
    ];
    const wrapperRef = ref(null);
    const inputRef = ref(null);
    const showDropdown = ref(false);
    const activeIndex = ref(0);
    const currentPrefix = computed(() => {
      const val = props.modelValue || "";
      const atIndex = val.indexOf("@");
      return atIndex > -1 ? val.slice(0, atIndex) : val;
    });
    const currentSuffixInput = computed(() => {
      const val = props.modelValue || "";
      const atIndex = val.indexOf("@");
      return atIndex > -1 ? val.slice(atIndex + 1) : "";
    });
    const filteredSuffixes = computed(() => {
      const input = currentSuffixInput.value.toLowerCase();
      const val = props.modelValue || "";
      if (!val.includes("@")) return [];
      return DOMAIN_SUFFIXES.filter(
        (domain) => domain.startsWith(input)
      );
    });
    __expose({
      focus: () => inputRef.value?.focus()
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "email-input-wrapper",
        ref_key: "wrapperRef",
        ref: wrapperRef
      }, _attrs))} data-v-9eeafe89><input${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="custom-email-input" data-v-9eeafe89>`);
      if (showDropdown.value && filteredSuffixes.value.length > 0) {
        _push(`<ul class="suffix-list" data-v-9eeafe89><!--[-->`);
        ssrRenderList(filteredSuffixes.value, (suffix, index) => {
          _push(`<li class="${ssrRenderClass({ active: activeIndex.value === index })}" data-v-9eeafe89><span class="prefix" data-v-9eeafe89>${ssrInterpolate(currentPrefix.value)}</span>@<span class="suffix-highlight" data-v-9eeafe89>${ssrInterpolate(suffix)}</span></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/EmailInput.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const EmailInput = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-9eeafe89"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SendCodeButton",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    countdown: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: "获取验证码" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const displayText = computed(() => {
      if (props.loading) return "发送中...";
      if (props.countdown > 0) return `${props.countdown}s后重发`;
      return props.text;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "send-code-btn-unified",
        disabled: __props.disabled || __props.loading || __props.countdown > 0,
        type: "button"
      }, _attrs))} data-v-330e9ca3>${ssrInterpolate(displayText.value)}</button>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/SendCodeButton.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const SendCodeButton = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-330e9ca3"]]);
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const TIMER_KEY_CODE = "otp_timer_end";
const TIMER_KEY_FORGOT = "otp_forgot_timer_end";
const COOLDOWN_SECONDS = 300;
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "LoginRegisterModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRouter$1();
    useRoute$1();
    const mode = ref("login");
    const loginType = ref("code");
    const codeTimer = ref(0);
    let codeInterval = null;
    const loginForm = ref({ email: "", password: "", remember: false, agree: false });
    const loginCodeForm = ref({ email: "", code: "", password: "", remember: false, agree: false });
    const registerForm = ref({ email: "", code: "", password: "", inviteId: "", agree: false });
    const loginEmailInput = ref(null);
    const loginCodeEmailInput = ref(null);
    const registerEmailInput = ref(null);
    const showPrivacyDialog = ref(false);
    const showPolicyDialog = ref(false);
    const showForgotDialog = ref(false);
    const forgotForm = ref({ email: "", code: "", password: "" });
    const forgotCodeTimer = ref(0);
    let forgotCodeInterval = null;
    const loading = ref(false);
    const focusInput = () => {
      nextTick(() => {
        if (mode.value === "login") {
          if (loginType.value === "password") loginEmailInput.value?.focus();
          else loginCodeEmailInput.value?.focus();
        } else {
          registerEmailInput.value?.focus();
        }
      });
    };
    watch([mode, loginType, () => props.visible], () => {
      if (props.visible) focusInput();
    });
    const startTimer = (timerRef, intervalRef, seconds, storageKey, isNew = true) => {
      timerRef.value = seconds;
      if (isNew) {
        const endTime = Date.now() + seconds * 1e3;
        localStorage.setItem(storageKey, endTime.toString());
      }
      if (intervalRef) clearInterval(intervalRef);
      return setInterval();
    };
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    function sendCode(type) {
      if (codeTimer.value > 0) return;
      const email = type === "register" ? registerForm.value.email : loginCodeForm.value.email;
      if (!email) {
        ElMessage.warning("请输入邮箱");
        return;
      }
      if (!isValidEmail(email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      loading.value = true;
      const apiCall = authApi.getEmailCode(email);
      apiCall.then((res) => {
        if (res.success) {
          ElMessage.success("验证码已发送，请注意查收");
          codeInterval = startTimer(codeTimer, codeInterval, COOLDOWN_SECONDS, TIMER_KEY_CODE);
        } else {
          ElMessage.error(res.msg || "验证码发送失败");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "验证码发送失败");
      }).finally(() => {
        loading.value = false;
      });
    }
    function sendForgotCode() {
      if (forgotCodeTimer.value > 0) return;
      if (!forgotForm.value.email) {
        ElMessage.warning("请输入邮箱");
        return;
      }
      if (!isValidEmail(forgotForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      loading.value = true;
      authApi.sendOtp(forgotForm.value.email).then((res) => {
        if (res.success) {
          ElMessage.success("验证码已发送");
          forgotCodeInterval = startTimer(forgotCodeTimer, forgotCodeInterval, COOLDOWN_SECONDS, TIMER_KEY_FORGOT);
        } else {
          ElMessage.error(res.msg || "发送失败");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "验证码发送失败");
      }).finally(() => {
        loading.value = false;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (__props.visible) {
        _push(`<div class="modal-mask" data-v-1c6d56a2><div class="login-modal" data-v-1c6d56a2><div class="modal-header" data-v-1c6d56a2><div class="modal-header-inner" data-v-1c6d56a2><div class="modal-title" data-v-1c6d56a2>凡图拉</div><div class="modal-subtitle" data-v-1c6d56a2>欢迎回来，请登录您的账户</div><div class="modal-tabs" data-v-1c6d56a2><button class="${ssrRenderClass(["tab-btn", { active: mode.value === "login" }])}" data-v-1c6d56a2>登录</button><button class="${ssrRenderClass(["tab-btn", { active: mode.value === "register" }])}" data-v-1c6d56a2>注册</button></div><button class="modal-close" data-v-1c6d56a2>×</button></div></div><div class="modal-body" data-v-1c6d56a2><div class="modal-form-area" data-v-1c6d56a2>`);
        if (mode.value === "login") {
          _push(`<div class="modal-form-tabs" data-v-1c6d56a2><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "code" }])}" data-v-1c6d56a2>验证码登录</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "password" }])}" data-v-1c6d56a2>密码登录</button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (mode.value === "login" && loginType.value === "password") {
          _push(`<form data-v-1c6d56a2><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>邮箱地址</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: loginForm.value.email,
            "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
            ref_key: "loginEmailInput",
            ref: loginEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>密码</label><input${ssrRenderAttr("value", loginForm.value.password)} type="password" placeholder="请输入密码" required data-v-1c6d56a2></div><div class="form-row" data-v-1c6d56a2><label data-v-1c6d56a2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-1c6d56a2> 记住我</label><a class="forgot-link" data-v-1c6d56a2>忘记密码？</a></div><div class="form-row" data-v-1c6d56a2><label data-v-1c6d56a2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} required data-v-1c6d56a2> 我已阅读并同意 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《隐私协议》`);
              } else {
                return [
                  createTextVNode("《隐私协议》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 和 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《用户政策》`);
              } else {
                return [
                  createTextVNode("《用户政策》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !loginForm.value.agree) ? " disabled" : ""} data-v-1c6d56a2>${ssrInterpolate(loading.value ? "登录中..." : "登录")}</button><div class="google-login-wrap" data-v-1c6d56a2><button type="button" class="google-btn-flat" data-v-1c6d56a2><svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-1c6d56a2><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-1c6d56a2></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-1c6d56a2></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-1c6d56a2></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-1c6d56a2></path></svg> Google 登录 </button></div></form>`);
        } else if (mode.value === "login" && loginType.value === "code") {
          _push(`<form data-v-1c6d56a2><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>邮箱地址</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: loginCodeForm.value.email,
            "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
            ref_key: "loginCodeEmailInput",
            ref: loginCodeEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group code-group" data-v-1c6d56a2><input${ssrRenderAttr("value", loginCodeForm.value.code)} type="text" placeholder="请输入验证码" required data-v-1c6d56a2>`);
          _push(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: codeTimer.value,
            onClick: ($event) => sendCode("login")
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-1c6d56a2><label data-v-1c6d56a2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.remember) ? ssrLooseContain(loginCodeForm.value.remember, null) : loginCodeForm.value.remember) ? " checked" : ""} data-v-1c6d56a2> 记住我</label></div><div class="form-row" data-v-1c6d56a2><label data-v-1c6d56a2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} required data-v-1c6d56a2> 我已阅读并同意 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《隐私协议》`);
              } else {
                return [
                  createTextVNode("《隐私协议》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 和 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《用户政策》`);
              } else {
                return [
                  createTextVNode("《用户政策》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !loginCodeForm.value.agree) ? " disabled" : ""} data-v-1c6d56a2>${ssrInterpolate(loading.value ? "登录中..." : "登录")}</button><div class="google-login-wrap" data-v-1c6d56a2><button type="button" class="google-btn-flat" data-v-1c6d56a2><svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-1c6d56a2><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-1c6d56a2></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-1c6d56a2></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-1c6d56a2></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-1c6d56a2></path></svg> Google 登录 </button></div></form>`);
        } else if (mode.value === "register") {
          _push(`<form data-v-1c6d56a2><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>邮箱地址</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: registerForm.value.email,
            "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
            ref_key: "registerEmailInput",
            ref: registerEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group code-group" data-v-1c6d56a2><input${ssrRenderAttr("value", registerForm.value.code)} type="text" placeholder="请输入验证码" required data-v-1c6d56a2>`);
          _push(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: codeTimer.value,
            onClick: ($event) => sendCode("register")
          }, null, _parent));
          _push(`</div><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>密码</label><input${ssrRenderAttr("value", registerForm.value.password)} type="password" placeholder="请输入密码 (至少6位)" required data-v-1c6d56a2></div><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>邀请码（选填）</label><input${ssrRenderAttr("value", registerForm.value.inviteId)} type="text" placeholder="请输入邀请码" data-v-1c6d56a2></div><div class="form-row" data-v-1c6d56a2><label data-v-1c6d56a2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} required data-v-1c6d56a2> 我已阅读并同意 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《隐私协议》`);
              } else {
                return [
                  createTextVNode("《隐私协议》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 和 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《用户政策》`);
              } else {
                return [
                  createTextVNode("《用户政策》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !registerForm.value.agree) ? " disabled" : ""} data-v-1c6d56a2>${ssrInterpolate(loading.value ? "注册中..." : "注册")}</button><div class="google-login-wrap" data-v-1c6d56a2><button type="button" class="google-btn-flat" data-v-1c6d56a2><svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-1c6d56a2><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-1c6d56a2></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-1c6d56a2></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-1c6d56a2></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-1c6d56a2></path></svg> Google 注册 </button></div></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPrivacyDialog.value) {
        _push(`<div class="dialog-mask" data-v-1c6d56a2><div class="dialog-box" data-v-1c6d56a2><div class="dialog-title" data-v-1c6d56a2>隐私协议</div><div class="dialog-content" data-v-1c6d56a2>这里是隐私协议内容...</div><button class="dialog-close" data-v-1c6d56a2>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPolicyDialog.value) {
        _push(`<div class="dialog-mask" data-v-1c6d56a2><div class="dialog-box" data-v-1c6d56a2><div class="dialog-title" data-v-1c6d56a2>用户政策</div><div class="dialog-content" data-v-1c6d56a2>这里是用户政策内容...</div><button class="dialog-close" data-v-1c6d56a2>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showForgotDialog.value) {
        _push(`<div class="dialog-mask" data-v-1c6d56a2><div class="dialog-box" data-v-1c6d56a2><div class="dialog-title" data-v-1c6d56a2>找回密码</div><form data-v-1c6d56a2><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>邮箱地址</label>`);
        _push(ssrRenderComponent(EmailInput, {
          modelValue: forgotForm.value.email,
          "onUpdate:modelValue": ($event) => forgotForm.value.email = $event,
          required: true
        }, null, _parent));
        _push(`</div><div class="form-group code-group" data-v-1c6d56a2><label data-v-1c6d56a2>验证码</label><input${ssrRenderAttr("value", forgotForm.value.code)} type="text" placeholder="请输入验证码" required data-v-1c6d56a2>`);
        _push(ssrRenderComponent(SendCodeButton, {
          loading: loading.value,
          countdown: forgotCodeTimer.value,
          onClick: sendForgotCode
        }, null, _parent));
        _push(`</div><div class="form-group" data-v-1c6d56a2><label data-v-1c6d56a2>新密码</label><input${ssrRenderAttr("value", forgotForm.value.password)} type="password" placeholder="请输入新密码 (至少6位)" required data-v-1c6d56a2></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-1c6d56a2>${ssrInterpolate(loading.value ? "重置中..." : "重置密码")}</button></form><button class="dialog-close" data-v-1c6d56a2>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginRegisterModal.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-1c6d56a2"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "MiniCartPopup",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useRouter$1();
    const cartStore = useCartStore();
    const updating = ref(false);
    const checkingOut = ref(false);
    const cartItem = computed(() => {
      if (cartStore.items && cartStore.items.length > 0) {
        return cartStore.items[0];
      }
      return null;
    });
    const hasItems = computed(() => !!cartItem.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mini-cart-popup" }, _attrs))} data-v-56d39993><div class="mini-cart-arrow" data-v-56d39993></div><div class="mc-header" data-v-56d39993><span class="mc-title" data-v-56d39993>购物车</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" title="清空购物车" data-v-56d39993>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(delete_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<span data-v-56d39993>清空</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-56d39993>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-56d39993><div class="mc-img-wrap" data-v-56d39993><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} alt="Product" data-v-56d39993></div><div class="mc-details" data-v-56d39993><div class="mc-name" data-v-56d39993>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-spec" data-v-56d39993>${ssrInterpolate(cartItem.value.specName)}</div><div class="mc-price-row" data-v-56d39993><span class="mc-price" data-v-56d39993>¥${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-56d39993><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-56d39993>-</button><span class="qty-num" data-v-56d39993>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-56d39993>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-56d39993>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-56d39993><div class="empty-icon" data-v-56d39993>🛒</div><p data-v-56d39993>购物车空空如也</p><button class="mc-btn secondary small" data-v-56d39993>去逛逛</button></div>`);
        }
        _push(`</div>`);
        if (hasItems.value) {
          _push(`<div class="mc-footer" data-v-56d39993><button class="mc-btn primary block"${ssrIncludeBooleanAttr(checkingOut.value) ? " disabled" : ""} data-v-56d39993>${ssrInterpolate(checkingOut.value ? "处理中..." : "去结算")}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/MiniCartPopup.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const MiniCartPopup = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-56d39993"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const modal = useModalStore();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    useRoute$1();
    const searchQuery = ref("");
    const showServiceModal = ref(false);
    const showLoginModal = ref(false);
    const closeLoginModal = () => {
      showLoginModal.value = false;
    };
    watch(() => userStore.isLoggedIn, async (newValue) => {
      if (newValue) {
        if (showLoginModal.value) showLoginModal.value = false;
        await cartStore.loadCart();
      } else {
        cartStore.items = [];
      }
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><header class="app-header" data-v-5d18ee7a><div class="header-inner" data-v-5d18ee7a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-area"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="logo" class="logo-img" data-v-5d18ee7a${_scopeId}><span class="logo-text" data-v-5d18ee7a${_scopeId}>凡图拉</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "logo",
                class: "logo-img"
              }),
              createVNode("span", { class: "logo-text" }, "凡图拉")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav-menu" data-v-5d18ee7a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-btn" data-v-5d18ee7a>订单</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/community",
        class: "nav-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`社区帮助`);
          } else {
            return [
              createTextVNode("社区帮助")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-btn" data-v-5d18ee7a>客服</button></nav><div class="header-actions" data-v-5d18ee7a><div class="search-box" data-v-5d18ee7a><input class="search-input" type="text" placeholder="搜索..."${ssrRenderAttr("value", searchQuery.value)} data-v-5d18ee7a><div class="search-icon-bg" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-5d18ee7a>`);
      _push(ssrRenderComponent(_component_el_icon, {
        size: 18,
        color: "#fff"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(search_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(search_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (!unref(userStore).isLoggedIn) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "#",
          class: "login-btn",
          onClick: ($event) => unref(modal).openLogin()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 登录/注册 `);
            } else {
              return [
                createTextVNode(" 登录/注册 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="user-section" data-v-5d18ee7a><div class="cart-wrapper" style="${ssrRenderStyle({ "position": "relative" })}" data-v-5d18ee7a><div class="cart-icon" title="购物车" id="cart-icon-ref" data-v-5d18ee7a><div class="cart-icon-wrapper" data-v-5d18ee7a>`);
        _push(ssrRenderComponent(_component_el_icon, {
          size: 26,
          color: "#E2E8F0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(shopping_cart_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(shopping_cart_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(cartStore).totalCount > 0) {
          _push(`<span class="cart-badge" data-v-5d18ee7a>${ssrInterpolate(unref(cartStore).totalCount)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        _push(ssrRenderComponent(MiniCartPopup, {
          visible: unref(cartStore).miniCartVisible,
          onClose: ($event) => unref(cartStore).miniCartVisible = false,
          class: "header-mini-cart"
        }, null, _parent));
        _push(`</div><div class="user-info-container" data-v-5d18ee7a>`);
        if (unref(userStore).loading) {
          _push(`<div class="user-info user-info--loading" data-v-5d18ee7a><div class="avatar-skeleton" data-v-5d18ee7a></div><div class="name-skeleton" data-v-5d18ee7a></div></div>`);
        } else {
          _push(`<div class="user-info" title="进入个人中心" data-v-5d18ee7a><img${ssrRenderAttr("src", unref(userStore).user?.avatar || "/images/client/pc/avatars/avatar-cat.png")}${ssrRenderAttr("alt", unref(userStore).user?.nickName || unref(userStore).user?.nickname || "用户头像")} class="user-avatar" data-v-5d18ee7a><span class="user-name" data-v-5d18ee7a>${ssrInterpolate(unref(userStore).user?.nickName || unref(userStore).user?.nickname || "用户")}</span></div>`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div></header>`);
      if (showServiceModal.value) {
        _push(ssrRenderComponent(ServiceModal, {
          onClose: ($event) => showServiceModal.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(__nuxt_component_2$1, {
        visible: showLoginModal.value,
        onClose: closeLoginModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-5d18ee7a"]]);
const MODAL_THEMES = {
  /* ======================================================================
     [方案 SUIT-001] 标准幽灵 (Standard)
     ----------------------------------------------------------------------
     说明: 下面这些配置是传给 BaseModal 的 props。
     如果只改文字/图片/位置，改这里即可。
     如果要改 CSS 样式，请去 components/base/BaseModal.vue 底部
     ====================================================================== */
  "suit-001": {
    id: "suit-001",
    name: "Classic Phantom",
    mascotImg: "/images/modal/pc/mascot_01.png",
    // 更新为新版吉祥物
    mascotPosition: "bottom",
    variantClass: "variant-standard",
    animation: "mascot-rise",
    opacity: 0.85,
    duration: "1.4s"
  },
  /* ======================================================================
     [方案 SUIT-002] 柔光风格 (Soft Light)
     ----------------------------------------------------------------------
     修改样式请去 components/base/BaseModal.vue 底部
     ====================================================================== */
  "suit-002": {
    id: "suit-002",
    name: "Soft Light",
    mascotImg: "/images/modal/pc/mascot_02.png",
    mascotPosition: "left",
    variantClass: "variant-phantom-light",
    animation: "phantom-rise-soft",
    opacity: 1,
    duration: "0.6s"
  },
  /* ======================================================================
     [方案 SUIT-003] 赛博朋克 (Cyberpunk)
     ----------------------------------------------------------------------
     修改样式请去 components/base/BaseModal.vue 底部
     ====================================================================== */
  "suit-003": {
    id: "suit-003",
    name: "Cyberpunk",
    mascotImg: "/images/modal/pc/mascot_01.png",
    mascotPosition: "right",
    variantClass: "variant-cyber",
    animation: "cyber-pop"
  }
  /* [新方案添加处] */
};
const DEFAULT_THEME_ID = "suit-001";
function getTheme(id) {
  return MODAL_THEMES[id || ""] || MODAL_THEMES[DEFAULT_THEME_ID];
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BaseModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: {},
    width: { default: "420px" },
    showClose: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    cancelText: { default: "取消" },
    confirmText: { default: "确认" },
    loadingText: { default: "处理中..." },
    confirmDisabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    themeId: { default: "suit-001" }
  },
  emits: ["close", "confirm", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const currentTheme = computed(() => getTheme(props.themeId));
    const containerWidth = computed(() => props.width);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="base-modal-overlay" data-v-94782bb7><div class="base-modal-container" style="${ssrRenderStyle({ width: containerWidth.value })}" data-v-94782bb7><div class="base-modal-header" data-v-94782bb7><h3 class="base-modal-title" data-v-94782bb7>${ssrInterpolate(__props.title)}</h3>`);
          if (__props.showClose) {
            _push2(`<button class="base-modal-close" data-v-94782bb7>×</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="base-modal-body" data-v-94782bb7>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
          if (__props.showFooter) {
            _push2(`<div class="base-modal-actions" data-v-94782bb7>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
              _push2(`<button class="base-modal-cancel" data-v-94782bb7>${ssrInterpolate(__props.cancelText)}</button><button class="base-modal-confirm"${ssrIncludeBooleanAttr(__props.confirmDisabled || __props.loading) ? " disabled" : ""} data-v-94782bb7>${ssrInterpolate(__props.loading ? __props.loadingText : __props.confirmText)}</button>`);
            }, _push2, _parent);
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (currentTheme.value.mascotImg) {
            _push2(`<img${ssrRenderAttr("src", currentTheme.value.mascotImg)} class="${ssrRenderClass([[`phantom-${currentTheme.value.mascotPosition}`, currentTheme.value.variantClass], "modal-mascot-phantom"])}" style="${ssrRenderStyle({
              animationName: currentTheme.value.animation,
              animationDuration: currentTheme.value.duration || "0.6s",
              "--mascot-final-opacity": currentTheme.value.opacity ?? 1
            })}" data-v-94782bb7>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const BaseModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-94782bb7"]]);
const _imports_1 = publicAssetsURL("/images/client/pc/weixin.png");
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "JoinUsModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props) {
    function copyWechatId() {
      const wechatId = "Companyservice";
      if ((void 0).clipboard) {
        (void 0).clipboard.writeText(wechatId).then(() => {
          ElMessage.success("微信号已复制到剪贴板");
        }).catch(() => {
          fallbackCopy(wechatId);
        });
      } else {
        fallbackCopy(wechatId);
      }
    }
    function fallbackCopy(text) {
      const textArea = (void 0).createElement("textarea");
      textArea.value = text;
      (void 0).body.appendChild(textArea);
      textArea.select();
      try {
        (void 0).execCommand("copy");
        ElMessage.success("微信号已复制到剪贴板");
      } catch (err) {
        ElMessage.error("复制失败，请手动复制微信号：" + text);
      }
      (void 0).body.removeChild(textArea);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      if (__props.visible) {
        _push(ssrRenderComponent(_component_BaseModal, mergeProps({
          visible: __props.visible,
          title: "加入我们的社群",
          width: "520px",
          "show-footer": false,
          onClose: ($event) => _ctx.$emit("close")
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="modal-subtitle" data-v-6cf907c4${_scopeId}>扫码添加客服微信，获取专属服务</p><div class="wechat-content" data-v-6cf907c4${_scopeId}><div class="qr-container" data-v-6cf907c4${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="微信二维码" class="qr-code" data-v-6cf907c4${_scopeId}></div><div class="wechat-info" data-v-6cf907c4${_scopeId}><div class="wechat-id" data-v-6cf907c4${_scopeId}><span class="wechat-label" data-v-6cf907c4${_scopeId}>客服微信：</span><span class="wechat-value" data-v-6cf907c4${_scopeId}>Companyservice</span></div><button class="copy-btn" data-v-6cf907c4${_scopeId}>📋 复制微信号</button></div><div class="steps-section" data-v-6cf907c4${_scopeId}><div class="steps-title" data-v-6cf907c4${_scopeId}>添加客服步骤</div><div class="steps-container" data-v-6cf907c4${_scopeId}><div class="step-item" data-v-6cf907c4${_scopeId}><div class="step-number" data-v-6cf907c4${_scopeId}>1</div><div class="step-text" data-v-6cf907c4${_scopeId}>下载二维码图片到电脑</div></div><div class="step-item" data-v-6cf907c4${_scopeId}><div class="step-number" data-v-6cf907c4${_scopeId}>2</div><div class="step-text" data-v-6cf907c4${_scopeId}>打开手机微信扫一扫</div></div><div class="step-item" data-v-6cf907c4${_scopeId}><div class="step-number" data-v-6cf907c4${_scopeId}>3</div><div class="step-text" data-v-6cf907c4${_scopeId}>点击加入社群</div></div></div></div></div>`);
            } else {
              return [
                createVNode("p", { class: "modal-subtitle" }, "扫码添加客服微信，获取专属服务"),
                createVNode("div", { class: "wechat-content" }, [
                  createVNode("div", { class: "qr-container" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "微信二维码",
                      class: "qr-code"
                    })
                  ]),
                  createVNode("div", { class: "wechat-info" }, [
                    createVNode("div", { class: "wechat-id" }, [
                      createVNode("span", { class: "wechat-label" }, "客服微信："),
                      createVNode("span", { class: "wechat-value" }, "Companyservice")
                    ]),
                    createVNode("button", {
                      class: "copy-btn",
                      onClick: copyWechatId
                    }, "📋 复制微信号")
                  ]),
                  createVNode("div", { class: "steps-section" }, [
                    createVNode("div", { class: "steps-title" }, "添加客服步骤"),
                    createVNode("div", { class: "steps-container" }, [
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "1"),
                        createVNode("div", { class: "step-text" }, "下载二维码图片到电脑")
                      ]),
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "2"),
                        createVNode("div", { class: "step-text" }, "打开手机微信扫一扫")
                      ]),
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "3"),
                        createVNode("div", { class: "step-text" }, "点击加入社群")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/JoinUsModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-6cf907c4"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const showJoinUs = ref(false);
    const showLoginModal = ref(false);
    const userStore = useUserStore();
    function closeJoinUs() {
      showJoinUs.value = false;
    }
    function closeLoginModal() {
      showLoginModal.value = false;
    }
    watch(() => userStore.isLoggedIn, (newValue) => {
      if (newValue && showLoginModal.value) {
        showLoginModal.value = false;
      }
    });
    const cols = [
      {
        title: "功能导航",
        items: ["个人中心", "我的订单", "邀请推广", "社区帮助"]
      },
      {
        title: "条款与政策",
        items: ["隐私政策", "用户协议", "退款政策", "免责声明"]
      },
      {
        title: "关于我们",
        items: ["公司简介", "我们的使命", "我们的优势", "加入我们"]
      },
      {
        title: "帮助中心",
        items: ["联系我们", "商务合作", "发送邮件", "常见问题"]
      },
      {
        title: "关注我们",
        extra: "获取最新促销信息和独家优惠",
        icons: [
          { label: "微信", icon: chat_dot_round_default },
          { label: "微博", icon: platform_default },
          { label: "订阅", icon: bell_default },
          { label: "抖音", icon: video_play_default }
        ],
        partner: true
        // 标记此列下方有合作伙伴
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_el_icon = ElIcon;
      const _component_JoinUsModal = __nuxt_component_2;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "app-footer" }, _attrs))} data-v-6202a509><div class="footer-bg" data-v-6202a509><div class="footer-cols" data-v-6202a509><!--[-->`);
      ssrRenderList(cols, (col, idx) => {
        _push(`<div class="footer-col" data-v-6202a509><div class="footer-title" data-v-6202a509>${ssrInterpolate(col.title)}</div><div class="footer-underline" data-v-6202a509></div>`);
        if (col.items && !col.icons) {
          _push(`<div class="footer-items" data-v-6202a509><!--[-->`);
          ssrRenderList(col.items, (item) => {
            _push(`<!--[-->`);
            if (item === "个人中心") {
              _push(`<button class="footer-item footer-link footer-button" data-v-6202a509>${ssrInterpolate(item)}</button>`);
            } else if (item === "我的订单") {
              _push(`<button class="footer-item footer-link footer-button" data-v-6202a509>${ssrInterpolate(item)}</button>`);
            } else if (item === "邀请推广") {
              _push(`<button class="footer-item footer-link footer-button" data-v-6202a509>${ssrInterpolate(item)}</button>`);
            } else if (item === "社区帮助") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/community",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "隐私政策") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/privacy",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "用户协议") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/policy",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "退款政策") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/refund",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "免责声明") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/disclaimer",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "公司简介") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/company",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "我们的使命") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/about-us",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "我们的优势") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/community",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "常见问题") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/faq",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "加入我们") {
              _push(`<button class="footer-item footer-link footer-button" data-v-6202a509>${ssrInterpolate(item)}</button>`);
            } else {
              _push(`<div class="footer-item" data-v-6202a509>${ssrInterpolate(item)}</div>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.icons) {
          _push(`<div class="footer-icons" data-v-6202a509><!--[-->`);
          ssrRenderList(col.icons, (icon) => {
            _push(`<span class="footer-icon" data-v-6202a509>`);
            _push(ssrRenderComponent(_component_el_icon, { size: 20 }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(icon.icon), null, null), _parent2, _scopeId);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(icon.icon)))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.extra && !col.partner) {
          _push(`<div class="footer-extra" data-v-6202a509>${ssrInterpolate(col.extra)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.partner) {
          _push(`<div class="footer-partner-block" data-v-6202a509><div class="footer-title" data-v-6202a509>合作伙伴</div><div class="footer-underline" data-v-6202a509></div><div class="footer-partner-list" data-v-6202a509>支付宝 | 顺丰速运 | 京东物流</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="footer-bottom" data-v-6202a509> © 2019-2025 凡图拉 | 云南凡图拉科技有限公司 | 滇ICP备 2025060486号-1 </div></div>`);
      _push(ssrRenderComponent(_component_JoinUsModal, {
        visible: showJoinUs.value,
        onClose: closeJoinUs
      }, null, _parent));
      _push(ssrRenderComponent(__nuxt_component_2$1, {
        visible: showLoginModal.value,
        onClose: closeLoginModal
      }, null, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6202a509"]]);
const _sfc_main$3 = {
  __name: "DevLoginTool",
  __ssrInlineRender: true,
  setup(__props) {
    const show = ref(true);
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      if (show.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "dev-login-tool" }, _attrs))} data-v-b4e4b66a><div class="tool-header" data-v-b4e4b66a><span data-v-b4e4b66a>开发调试工具</span><button data-v-b4e4b66a>×</button></div><div class="tool-content" data-v-b4e4b66a><p class="tool-info" data-v-b4e4b66a>当前状态: ${ssrInterpolate(unref(userStore).isLoggedIn ? "已登录" : "未登录")}</p>`);
        if (unref(userStore).user) {
          _push(`<p class="tool-info" data-v-b4e4b66a>UID: ${ssrInterpolate(unref(userStore).user.uid || "无")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tool-actions" data-v-b4e4b66a><button class="btn-mock" data-v-b4e4b66a>一键模拟登录</button><button class="btn-logout" data-v-b4e4b66a>强制登出</button></div></div></div>`);
      } else {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: "dev-tool-trigger" }, _attrs))} data-v-b4e4b66a> DEV </button>`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DevLoginTool.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const DevLoginTool = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b4e4b66a"]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const route = useRoute();
    const isAdmin = computed(() => route.path.startsWith("/_mgmt_9Xfa3"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))}>`);
      if (!unref(isAdmin)) {
        _push(ssrRenderComponent(AppHeader, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      if (!unref(isAdmin)) {
        _push(ssrRenderComponent(AppFooter, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(isAdmin)) {
        _push(ssrRenderComponent(DevLoginTool, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BxdnpjH4.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-Dq_z2JLl.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = (ssrContext) => entry(ssrContext);

export { document_default as $, isUndefined$1 as A, withInstall as B, withNoopInstall as C, definePropType as D, ElIcon as E, mutable as F, scale_to_original_default as G, full_screen_default as H, useZIndex as I, close_default as J, zoom_out_default as K, zoom_in_default as L, refresh_left_default as M, refresh_right_default as N, keysOf as O, isElement as P, isWindow as Q, picture_filled_default as R, useId as S, addUnit as T, getStyle as U, getEventCode as V, EVENT_CODE as W, throwError as X, hasClass as Y, addClass as Z, _export_sfc as _, __nuxt_component_0$1 as a, isFirefox as a$, money_default as a0, guide_default as a1, warning_default as a2, info_filled_default as a3, user_default as a4, wallet_default as a5, list_default as a6, ticket_default as a7, star_default as a8, bell_default as a9, select_default as aA, _imports_1 as aB, lightning_default as aC, top_default as aD, bottom_default as aE, buildProp as aF, isBoolean$1 as aG, composeEventHandlers as aH, useGetDerivedNamespace as aI, useIdInjection as aJ, view_default as aK, useGlobalComponentSettings as aL, removeClass as aM, clock_default as aN, right_default as aO, chat_dot_round_default as aP, shopping_cart_default as aQ, componentSizes as aR, d_arrow_left_default as aS, more_filled_default as aT, d_arrow_right_default as aU, useEmptyValues as aV, ValidateComponentsMap as aW, isEmpty as aX, useEmptyValuesProps as aY, arrow_down_default as aZ, circle_close_default as a_, switch_button_default as aa, __nuxt_component_0 as ab, authApi as ac, BaseModal as ad, user_filled_default as ae, upload_default as af, check_default as ag, ElMessage as ah, SendCodeButton as ai, EmailInput as aj, setInterval as ak, camera_default as al, circle_check_default as am, edit_default as an, credit_card_default as ao, copy_document_default as ap, message_default as aq, edit_pen_default as ar, lock_default as as, key_default as at, connection_default as au, useGlobalConfig as av, iconPropType as aw, useSizeProp as ax, useGlobalSize as ay, present_default as az, useRoute as b, iconProps as b$, hide_default as b0, star_filled_default as b1, operation_default as b2, files_default as b3, document_add_default as b4, box_default as b5, timer_default as b6, headset_default as b7, tickets_default as b8, refresh_default as b9, cpu_default as bA, circle_check_filled_default as bB, getEventKey as bC, CloseComponents as bD, defaultNamespace as bE, warning_filled_default as bF, entriesOf as bG, folder_remove_default as bH, folder_default as bI, search_default as bJ, calendar_default as bK, magic_stick_default as bL, document_copy_default as bM, rank_default as bN, video_pause_default as bO, caret_right_default as bP, back_default as bQ, withInstallDirective as bR, circle_close_filled_default as bS, sort_up_default as bT, sort_down_default as bU, badgeProps as bV, ElBadge as bW, messageConfig as bX, configProviderProps as bY, configProviderContextKey as bZ, provideGlobalConfig as b_, picture_default as ba, delete_default as bb, video_play_default as bc, useNuxtApp as bd, asyncDataDefaults as be, createError as bf, useAdminStore as bg, setting_default as bh, collection_default as bi, question_filled_default as bj, goods_default as bk, odometer_default as bl, expand_default as bm, fold_default as bn, sunny_default as bo, moon_default as bp, whenMouse as bq, more_default as br, isPropAbsent as bs, __nuxt_component_0$2 as bt, TypeComponentsMap as bu, TypeComponents as bv, getProp as bw, arrow_up_default as bx, getAdminSupabaseClient as by, minus_default as bz, __nuxt_component_2$1 as c, MESSAGE_DEFAULT_PLACEMENT as c0, messageDefaults as c1, messageEmits as c2, messagePlacement as c3, messageProps as c4, messageTypes as c5, buildLocaleContext as c6, buildTranslator as c7, localeContextKey as c8, translate as c9, ID_INJECTION_KEY as ca, namespaceContextKey as cb, ZINDEX_INJECTION_KEY as cc, defaultInitialZIndex as cd, zIndexContextKey as ce, SIZE_INJECTION_KEY as cf, DEFAULT_EMPTY_VALUES as cg, DEFAULT_VALUE_ON_CLEAR as ch, SCOPE as ci, emptyValuesContextKey as cj, getAuthToken as ck, EDGE_FUNCTIONS_URL as cl, supabaseAdmin as cm, supabase as cn, useUserStore as d, entry_default as default, useCartStore as e, arrow_right_default as f, trophy_default as g, share_default as h, useRouter as i, useRuntimeConfig as j, callEdgeFunction as k, loading_default as l, monitor_default as m, navigateTo as n, getSupabaseClient as o, plus_default as p, buildProps as q, isNumber$1 as r, service_default as s, tryUseNuxtApp as t, useModalStore as u, debugWarn as v, _export_sfc$1 as w, useNamespace as x, useLocale as y, arrow_left_default as z };
//# sourceMappingURL=server.mjs.map
