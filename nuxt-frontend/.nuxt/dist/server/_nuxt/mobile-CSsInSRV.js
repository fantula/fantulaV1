import { defineComponent, computed, mergeProps, createVNode, resolveDynamicComponent, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { aN as home_filled_default, aO as grid_default, s as service_default, S as user_default } from "./index-CmsdIFY8.js";
import { _ as _export_sfc } from "../server.mjs";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileTabBar",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const currentPath = computed(() => {
      return route.path;
    });
    const tabs = computed(() => [
      { name: "首页", path: "/mobile", icon: home_filled_default },
      { name: "功能", path: "/mobile/channel", icon: grid_default },
      { name: "帮助", path: "/mobile/help", icon: service_default },
      { name: "我的", path: "/mobile/profile", icon: user_default }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tab-bar-container" }, _attrs))} data-v-e0aade76><div class="mobile-tab-bar" data-v-e0aade76><!--[-->`);
      ssrRenderList(tabs.value, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: currentPath.value === tab.path }, "tab-item"])}" data-v-e0aade76><div class="icon-wrapper" data-v-e0aade76>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.icon), { class: "tab-icon" }, null), _parent);
        if (tab.badge && tab.badge > 0) {
          _push(`<div class="badge" data-v-e0aade76>${ssrInterpolate(tab.badge)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentPath.value === tab.path) {
          _push(`<div class="active-dot" data-v-e0aade76></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="tab-label" data-v-e0aade76>${ssrInterpolate(tab.name)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/MobileTabBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileTabBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e0aade76"]]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-layout" }, _attrs))} data-v-1bd966f1><div class="mobile-bg-layer" data-v-1bd966f1></div><main class="mobile-content" data-v-1bd966f1>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      if (!unref(route).meta.hideTabBar) {
        _push(ssrRenderComponent(MobileTabBar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
const mobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bd966f1"]]);
export {
  mobile as default
};
//# sourceMappingURL=mobile-CSsInSRV.js.map
