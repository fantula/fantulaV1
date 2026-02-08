import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { B as BaseCouponTicket } from './BaseCouponTicket-CbJ8T36H.mjs';
import { useRouter } from 'vue-router';
import './index-jl2vZbkg.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './server.mjs';
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
import '@vueuse/core';
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
import './objects-Bz74KHmq.mjs';
import './index-DlETah8a.mjs';
import './BaseButton-BlqmccK6.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CouponFlat",
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
    const conditionText = computed(() => {
      const min = props.couponData.coupon.min_usage;
      return min && min > 0 ? `\u6EE1 ${min} \u70B9\u53EF\u7528` : "\u65E0\u95E8\u69DB\u4F7F\u7528";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(props.couponData.coupon.end_date);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const handleAction = () => {
      router.push("/");
    };
    const handleClick = () => {
      emit("click", props.couponData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCouponTicket, mergeProps({
        color: "purple",
        value: __props.couponData.coupon.value,
        unit: "\u70B9",
        title: __props.couponData.coupon.name,
        desc: conditionText.value,
        "type-label": "\u7ACB\u51CF\u5238",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "\u53BB\u4F7F\u7528",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/CouponFlat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CouponFlat-CqZQG8OA.mjs.map
