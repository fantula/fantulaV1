import { _ as _export_sfc, B as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, mergeProps, unref, computed, createVNode, resolveDynamicComponent, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { aK as home_filled_default, aL as grid_default, s as service_default, Q as user_default } from './index-DlETah8a.mjs';
import { u as useToast } from './useToast-DsT-1f4c.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileTabBar",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const currentPath = computed(() => {
      return route.path;
    });
    const tabs = computed(() => [
      { name: "\u9996\u9875", path: "/mobile", icon: home_filled_default },
      { name: "\u529F\u80FD", path: "/mobile/channel", icon: grid_default },
      { name: "\u5E2E\u52A9", path: "/mobile/help", icon: service_default },
      { name: "\u6211\u7684", path: "/mobile/profile", icon: user_default }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tab-bar-container" }, _attrs))} data-v-20d5d5c2><div class="mobile-tab-bar" data-v-20d5d5c2><!--[-->`);
      ssrRenderList(tabs.value, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: currentPath.value === tab.path }, "tab-item"])}" data-v-20d5d5c2><div class="icon-wrapper" data-v-20d5d5c2>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.icon), { class: "tab-icon" }, null), _parent);
        if (tab.badge && tab.badge > 0) {
          _push(`<div class="badge" data-v-20d5d5c2>${ssrInterpolate(tab.badge)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentPath.value === tab.path) {
          _push(`<div class="active-dot" data-v-20d5d5c2></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="tab-label" data-v-20d5d5c2>${ssrInterpolate(tab.name)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/MobileTabBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileTabBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-20d5d5c2"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileToast",
  __ssrInlineRender: true,
  setup(__props) {
    const { isVisible, message, type } = useToast();
    const icon = computed(() => {
      switch (type.value) {
        case "success":
          return "\u2705";
        case "error":
          return "\u274C";
        case "warning":
          return "\u26A0\uFE0F";
        default:
          return "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["mobile-toast", unref(type)]
        }, _attrs))} data-v-04dfa169><div class="toast-content" data-v-04dfa169>`);
        if (icon.value) {
          _push(`<span class="toast-icon" data-v-04dfa169>${ssrInterpolate(icon.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="toast-text" data-v-04dfa169>${ssrInterpolate(unref(message))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/base/MobileToast.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileToast = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-04dfa169"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useHead({
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
        { name: "theme-color", content: "#0F172A" }
      ],
      bodyAttrs: {
        class: "mobile-body"
        // Hook for global CSS if needed
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-layout" }, _attrs))} data-v-f5d441bd><div class="mobile-bg-layer" data-v-f5d441bd></div><main class="mobile-content" data-v-f5d441bd>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      if (!unref(route).meta.hideTabBar) {
        _push(ssrRenderComponent(MobileTabBar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(MobileToast, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/mobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5d441bd"]]);

export { mobile as default };
//# sourceMappingURL=mobile-BAQALBbM.mjs.map
