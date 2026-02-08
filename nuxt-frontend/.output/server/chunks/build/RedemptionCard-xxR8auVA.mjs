import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { B as BaseButton } from './BaseButton-BlqmccK6.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { T as ticket_default } from './index-DlETah8a.mjs';
import { c as couponApi } from './coupon-D1so52Ot.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
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
import 'vue-router';
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
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
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
//# sourceMappingURL=RedemptionCard-xxR8auVA.mjs.map
