import { E as ElIcon } from "./index-D6MDXFfa.js";
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { Z as ticket_default } from "./index-CRs4T-Jf.js";
import { c as couponApi } from "./coupon-CAcMEk5R.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
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
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "./event-D3FEo2C5.js";
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
          ElMessage.error(res.msg || "兑换失败");
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
      _push(`<div class="redemption-title" data-v-b06bbd07>兑换优惠券</div></div><div class="redemption-body" data-v-b06bbd07><div class="input-group" data-v-b06bbd07><input type="text" class="redemption-input" placeholder="请输入兑换码"${ssrRenderAttr("value", redeemCode.value)} data-v-b06bbd07>`);
      _push(ssrRenderComponent(_component_BaseButton, {
        class: "redemption-btn-wrapper",
        loading: redeeming.value,
        disabled: !redeemCode.value,
        onClick: handleRedeem,
        themeId: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 立即兑换 `);
          } else {
            return [
              createTextVNode(" 立即兑换 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="redemption-tips" data-v-b06bbd07>兑换码通常由16位字母和数字组成，区分大小写</p></div></div>`);
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
export {
  RedemptionCard as default
};
//# sourceMappingURL=RedemptionCard-RlNPbTxd.js.map
