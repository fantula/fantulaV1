import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import ProductDetailSheet from "./ProductDetailSheet-DcwCPkcm.js";
import { u as useProductDetail } from "./useProductDetail-ZO6mdtEA.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useHead, _ as _export_sfc } from "../server.mjs";
import "./index-C4aUwruK.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./index-CjBk2Z9n.js";
import "./index-CbQ9NNm4.js";
/* empty css              */
/* empty css                          */
import "./cart-Lqo8L2Wc.js";
import "./common-CeIxTI3I.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./user-DLDq0pTF.js";
import "./useNotify-BkAlUoZx.js";
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-CQnGB6WT.js";
import "./typescript-D6L75muK.js";
import "./icon-D-Vgi0cb.js";
import "./use-global-config-CaR6i8cb.js";
import "./index-C1njJNPQ.js";
import "./event-D3FEo2C5.js";
import "./interval-BnEBQU8I.js";
import "./goods-BXDiUgaK.js";
import "./supabase-D4dCvdwD.js";
import "./modal-CBJJqDui.js";
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const goodsId = route.params.id;
    const sheetVisible = ref(false);
    const { goodsSeo } = useProductDetail();
    useHead({
      title: computed(() => `${goodsSeo.value.title} - 凡图拉`),
      meta: [
        { name: "description", content: computed(() => goodsSeo.value.desc) },
        { name: "keywords", content: computed(() => `${goodsSeo.value.title},数字产品,代充,凡图拉`) },
        // Open Graph
        { property: "og:title", content: computed(() => goodsSeo.value.title) },
        { property: "og:description", content: computed(() => goodsSeo.value.desc) },
        { property: "og:image", content: computed(() => goodsSeo.value.image) },
        // Mobile Viewport optimization (already global, but safe to ensure)
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" }
      ]
    });
    watch(sheetVisible, (val) => {
      if (!val) {
        setTimeout(() => {
          router.back();
        }, 300);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-page-container" }, _attrs))} data-v-2cb9e3ff>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2cb9e3ff"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CHyhZ4Hc.js.map
