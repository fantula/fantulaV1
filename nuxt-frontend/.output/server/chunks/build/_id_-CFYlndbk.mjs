import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import ProductDetailSheet from './ProductDetailSheet-eRLQDIjq.mjs';
import { _ as _export_sfc } from './server.mjs';
import './index-CsSUb8pm.mjs';
import './index-DuV_oMrC.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './index-CC2EaJo5.mjs';
import './cart-B8xez9id.mjs';
import './common-D9iMPQj0.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
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
import './user-C1i1UnhA.mjs';
import './useProductDetail-D9yIQzx6.mjs';
import './goods-Q8QuJnLu.mjs';
import './supabase-fcLPkUp1.mjs';
import './modal-_wZ2Eah3.mjs';
import './asyncData-BY91Pj36.mjs';
import 'perfect-debounce';
import './index-Ho-fELR6.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CyvpkMdQ.mjs';
import './use-global-config-Dt87SALX.mjs';
import './index-xMedQC9S.mjs';
import './event-D3FEo2C5.mjs';
import './interval-BHZX8LlC.mjs';

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

export { _id_ as default };
//# sourceMappingURL=_id_-CFYlndbk.mjs.map
