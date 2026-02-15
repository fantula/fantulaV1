import { E as ElIcon } from './index-C4aUwruK.mjs';
import { B as BaseButton } from './BaseButton-BnWAaIRO.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { E as ticket_default } from './index-CbQ9NNm4.mjs';
import { c as couponApi } from './coupon-CAcMEk5R.mjs';
import { E as ElMessage } from './index-CQnGB6WT.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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
import './typescript-D6L75muK.mjs';
import './icon-D-Vgi0cb.mjs';
import './use-global-config-CaR6i8cb.mjs';
import './index-C1njJNPQ.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RedemptionCard",
  __ssrInlineRender: true,
  emits: ["redeemed"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const redeemCode = ref("");
    const redeeming = ref(false);
    const handleRedeem = async () => {
      if (!redeemCode.value || redeeming.value) return;
      redeeming.value = true;
      try {
        const res = await couponApi.redeemCoupon(redeemCode.value);
        if (res.success) {
          emit("redeemed", res.data);
          redeemCode.value = "";
        } else {
          ElMessage.error(res.msg || "\u5151\u6362\u5931\u8D25");
        }
      } finally {
        redeeming.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_BaseButton = BaseButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "redemption-card" }, _attrs))} data-v-b06bbd07><div class="redemption-header" data-v-b06bbd07>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "redemption-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ticket_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ticket_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="redemption-title" data-v-b06bbd07>\u5151\u6362\u4F18\u60E0\u5238</div></div><div class="redemption-body" data-v-b06bbd07><div class="input-group" data-v-b06bbd07><input type="text" class="redemption-input" placeholder="\u8BF7\u8F93\u5165\u5151\u6362\u7801"${ssrRenderAttr("value", redeemCode.value)} data-v-b06bbd07>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        class: "redemption-btn-wrapper",
        loading: redeeming.value,
        disabled: !redeemCode.value,
        onClick: handleRedeem,
        themeId: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u7ACB\u5373\u5151\u6362 `);
          } else {
            return [
              createTextVNode(" \u7ACB\u5373\u5151\u6362 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="redemption-tips" data-v-b06bbd07>\u5151\u6362\u7801\u901A\u5E38\u753116\u4F4D\u5B57\u6BCD\u548C\u6570\u5B57\u7EC4\u6210\uFF0C\u533A\u5206\u5927\u5C0F\u5199</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/RedemptionCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RedemptionCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b06bbd07"]]);

export { RedemptionCard as default };
//# sourceMappingURL=RedemptionCard-6ApDEHzz.mjs.map
