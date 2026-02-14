import { defineComponent, mergeProps, unref, computed, createVNode, resolveDynamicComponent, withCtx, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { aS as home_filled_default, aT as grid_default, s as service_default, W as user_default, n as circle_check_filled_default, c as circle_close_filled_default, e as warning_filled_default, i as info_filled_default } from './index-CRs4T-Jf.mjs';
import { u as useUserStore } from './user-B9FaDvHc.mjs';
import { u as useModalStore } from './modal-CBJJqDui.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
import { E as ElIcon } from './index-D6MDXFfa.mjs';
import { u as useToast } from './useToast-DsT-1f4c.mjs';
import MobileLoginSheet from './MobileLoginSheet-eVcTsj0N.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './supabase-Ds8OQlZJ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
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
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './objects-Bz74KHmq.mjs';
import './EmailInput-BxuFUYqG.mjs';
import './SendCodeButton-BHMZfVap.mjs';
import './useNotify-CME3DTm8.mjs';
import './index-CK1iG7c1.mjs';
import './typescript-D6L75muK.mjs';
import './icon-DxnRhcjj.mjs';
import './use-global-config-C00m4e8W.mjs';
import './index-C8K_s-bH.mjs';
import './event-D3FEo2C5.mjs';
import './useSendCode-_fPnCB3O.mjs';
import './interval-BnEBQU8I.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileTabBar",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useUserStore();
    useModalStore();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tab-bar-container" }, _attrs))} data-v-fab7e8cb><div class="mobile-tab-bar" data-v-fab7e8cb><!--[-->`);
      ssrRenderList(tabs.value, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: currentPath.value === tab.path }, "tab-item"])}" data-v-fab7e8cb><div class="icon-wrapper" data-v-fab7e8cb>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.icon), { class: "tab-icon" }, null), _parent);
        if (tab.badge && tab.badge > 0) {
          _push(`<div class="badge" data-v-fab7e8cb>${ssrInterpolate(tab.badge)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentPath.value === tab.path) {
          _push(`<div class="active-dot" data-v-fab7e8cb></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="tab-label" data-v-fab7e8cb>${ssrInterpolate(tab.name)}</span></div>`);
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
const MobileTabBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-fab7e8cb"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileToast",
  __ssrInlineRender: true,
  setup(__props) {
    const { isVisible, message, type } = useToast();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["mobile-toast-wrapper", unref(type)]
        }, _attrs))} data-v-3866509f><div class="toast-glass-box" data-v-3866509f><div class="icon-glow" data-v-3866509f>`);
        if (unref(type) === "success") {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (unref(type) === "error") {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_close_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_close_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (unref(type) === "warning") {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(info_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div><span class="toast-text" data-v-3866509f>${ssrInterpolate(unref(message))}</span></div></div>`);
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
const MobileToast = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3866509f"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const modalStore = useModalStore();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-layout" }, _attrs))} data-v-0ae0ed08><div class="mobile-bg-layer" data-v-0ae0ed08></div><main class="mobile-content" data-v-0ae0ed08>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      if (!unref(route).meta.hideTabBar) {
        _push(ssrRenderComponent(MobileTabBar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(MobileToast, null, null, _parent));
      _push(ssrRenderComponent(MobileLoginSheet, {
        visible: unref(modalStore).showLogin,
        onClose: ($event) => unref(modalStore).closeLogin()
      }, null, _parent));
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
const mobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ae0ed08"]]);

export { mobile as default };
//# sourceMappingURL=mobile-D7Y89Tic.mjs.map
