import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GlobalLoader",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    variant: { default: "initial" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["global-loader", [
          { "is-hidden": !__props.loading },
          `mode-${__props.variant}`
        ]]
      }, _attrs))} data-v-63215887>`);
      if (__props.variant === "initial") {
        _push(`<div class="bg-grid" data-v-63215887></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.variant === "initial") {
        _push(`<div class="bg-radial" data-v-63215887></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.variant === "navigation") {
        _push(`<div class="bg-glass" data-v-63215887></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.variant === "initial") {
        _push(`<div class="loader-content" data-v-63215887><h1 class="brand-name" data-v-63215887>凡图拉</h1><div class="rolling-text-container" data-v-63215887><div class="rolling-track" data-v-63215887><div class="rolling-item item-1" data-v-63215887>可靠</div><div class="rolling-item item-2" data-v-63215887>正规</div><div class="rolling-item item-3" data-v-63215887>稳定</div><div class="rolling-item item-1" data-v-63215887>可靠</div></div></div></div>`);
      } else {
        _push(`<div class="loader-content" data-v-63215887><div class="spinner-simple" data-v-63215887></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/GlobalLoader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GlobalLoader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63215887"]]);
export {
  GlobalLoader as default
};
//# sourceMappingURL=GlobalLoader-0UX4yygD.js.map
