import { defineComponent, computed, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { B as BaseButton } from "./BaseButton-BlqmccK6.js";
import { n as navigateTo, _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaySuccessModal",
  __ssrInlineRender: true,
  props: {
    orderId: {
      type: String,
      default: "N/A"
    },
    payType: {
      type: String,
      default: "balance"
    },
    amount: {
      type: [String, Number],
      default: 0
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const safeOrderId = computed(() => {
      return props.orderId || "N/A";
    });
    const safeAmount = computed(() => {
      try {
        const num = typeof props.amount === "string" ? parseFloat(props.amount || "0") : props.amount || 0;
        return isNaN(num) ? "0.00" : num.toFixed(2);
      } catch {
        return "0.00";
      }
    });
    const safePayTypeName = computed(() => {
      const typeMap = {
        "alipay": "支付宝支付",
        "balance": "余额支付",
        "other": "其他支付"
      };
      return typeMap[props.payType] || "未知支付方式";
    });
    const safeTime = computed(() => {
      try {
        const now = /* @__PURE__ */ new Date();
        return now.toLocaleString("zh-CN", { hour12: false });
      } catch {
        return "刚刚";
      }
    });
    const handleGoToHome = () => {
      emits("close");
      try {
        navigateTo("/");
      } catch (error) {
        (void 0).location.href = "/";
      }
    };
    const handleGoToOrders = () => {
      emits("close");
      try {
        navigateTo("/profile/order");
      } catch (error) {
        (void 0).location.href = "/profile/order";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="modal-mask" data-v-274393bd><div class="pay-success-modal glass-card" data-v-274393bd><div class="success-header" data-v-274393bd><div class="success-circle" data-v-274393bd><div class="success-icon-wrapper" data-v-274393bd><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-274393bd><polyline points="20 6 9 17 4 12" data-v-274393bd></polyline></svg></div></div><div class="success-title" data-v-274393bd>支付成功</div><div class="success-desc" data-v-274393bd>您的订单已确认，感谢您的购买</div></div><div class="success-info" data-v-274393bd><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>订单编号</span><span class="info-value info-link" data-v-274393bd>${ssrInterpolate(safeOrderId.value)}</span></div><div class="info-divider" data-v-274393bd></div><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>支付金额</span><span class="info-value info-amount" data-v-274393bd>¥${ssrInterpolate(safeAmount.value)}</span></div><div class="info-divider" data-v-274393bd></div><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>支付方式</span><span class="info-value info-paytype" data-v-274393bd>${ssrInterpolate(safePayTypeName.value)}</span></div><div class="info-divider" data-v-274393bd></div><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>支付时间</span><span class="info-value info-time" data-v-274393bd>${ssrInterpolate(safeTime.value)}</span></div></div><div class="status-box" data-v-274393bd><div class="status-icon" data-v-274393bd>🚀</div><div class="status-text" data-v-274393bd>系统正在为您自动发货，请稍候查看</div></div><div class="success-actions" data-v-274393bd>`);
        _push2(ssrRenderComponent(BaseButton, {
          themeId: "primary-orange",
          block: "",
          onClick: handleGoToOrders
        }, {
          default: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(` 前往查看订单 `);
            } else {
              return [
                createTextVNode(" 前往查看订单 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push2(ssrRenderComponent(BaseButton, {
          themeId: "secondary",
          block: "",
          onClick: handleGoToHome
        }, {
          default: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(` 返回首页 `);
            } else {
              return [
                createTextVNode(" 返回首页 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push2(`</div><div class="success-tip" data-v-274393bd> 如有任何问题，请联系客服 <span class="kefu-phone" data-v-274393bd>在线客服</span></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/PaySuccessModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PaySuccessModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-274393bd"]]);
export {
  PaySuccessModal as default
};
//# sourceMappingURL=PaySuccessModal-BlJIWln9.js.map
