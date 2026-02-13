import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import ProductDetailSheet from "./ProductDetailSheet-eRLQDIjq.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./index-CsSUb8pm.js";
import "./index-DuV_oMrC.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./index-CC2EaJo5.js";
/* empty css              */
/* empty css                          */
import "./cart-B8xez9id.js";
import "./common-D9iMPQj0.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "./user-C1i1UnhA.js";
import "./useToast-DsT-1f4c.js";
import "./useProductDetail-D9yIQzx6.js";
/* empty css                    */
import "./goods-Q8QuJnLu.js";
import "./supabase-fcLPkUp1.js";
import "./modal-_wZ2Eah3.js";
import "./asyncData-BY91Pj36.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "./index-Ho-fELR6.js";
import "./typescript-D6L75muK.js";
import "./icon-CyvpkMdQ.js";
import "./use-global-config-Dt87SALX.js";
import "./index-xMedQC9S.js";
import "./event-D3FEo2C5.js";
import "./interval-BHZX8LlC.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const goodsId = route.params.id;
    const sheetVisible = ref(false);
    watch(sheetVisible, (val) => {
      if (!val) {
        setTimeout(() => {
          router.back();
        }, 300);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-page-container" }, _attrs))} data-v-c8311b9c>`);
      _push(ssrRenderComponent(ProductDetailSheet, {
        visible: sheetVisible.value,
        "onUpdate:visible": ($event) => sheetVisible.value = $event,
        goodsId: unref(goodsId)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/goods/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c8311b9c"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CFYlndbk.js.map
