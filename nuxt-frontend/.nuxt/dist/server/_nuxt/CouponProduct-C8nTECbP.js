import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { B as BaseCouponTicket } from "./BaseCouponTicket-CoNCTgZN.js";
import { useRouter } from "vue-router";
import "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
import "lodash-unified";
import "@vue/shared";
import "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
import "@vueuse/core";
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
import "./objects-Bz74KHmq.js";
import "./index-DNnPa_Q9.js";
import "./BaseButton-BnWAaIRO.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CouponProduct",
  __ssrInlineRender: true,
  props: {
    couponData: {},
    isExpired: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    const status = computed(() => {
      if (props.couponData.status === "used") return "used";
      if (props.isExpired || props.couponData.status === "expired") return "expired";
      return "unused";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "永久有效";
      const date = new Date(props.couponData.coupon.end_date);
      return `有效期至 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const displayValue = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "兑换";
      return val;
    });
    const displayUnit = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "";
      return "点";
    });
    const displayDesc = computed(() => {
      const extra = props.couponData.coupon.extra;
      if (extra && extra.product_name) {
        return `${extra.product_name} 专用`;
      }
      return "指定商品专用优惠";
    });
    const handleAction = () => {
      const extra = props.couponData.coupon.extra;
      if (extra && extra.product_id) {
        router.push(`/product/${extra.product_id}`);
      } else {
        router.push("/");
      }
    };
    const handleClick = () => {
      emit("click", props.couponData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCouponTicket, mergeProps({
        color: "cyan",
        value: displayValue.value,
        unit: displayUnit.value,
        title: __props.couponData.coupon.name,
        desc: displayDesc.value,
        "type-label": "商品券",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "去购买",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/CouponProduct.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=CouponProduct-C8nTECbP.js.map
