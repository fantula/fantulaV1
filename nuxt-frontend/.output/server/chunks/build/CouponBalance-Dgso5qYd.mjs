import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { B as BaseCouponTicket } from './BaseCouponTicket-Bt_OgGom.mjs';
import './index-CsSUb8pm.mjs';
import './index-DuV_oMrC.mjs';
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
import 'vue-router';
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
import './BaseButton-BnWAaIRO.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CouponBalance",
  __ssrInlineRender: true,
  props: {
    couponData: {},
    isExpired: { type: Boolean }
  },
  emits: ["use", "click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const status = computed(() => {
      if (props.couponData.status === "used") return "used";
      if (props.isExpired || props.couponData.status === "expired") return "expired";
      return "unused";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(props.couponData.coupon.end_date);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const handleAction = () => {
      emit("use", props.couponData);
    };
    const handleClick = () => {
      emit("click", props.couponData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCouponTicket, mergeProps({
        color: "gold",
        value: __props.couponData.coupon.value,
        unit: "\u70B9",
        title: __props.couponData.coupon.name,
        desc: "\u76F4\u63A5\u5B58\u5165\u4F59\u989D\uFF0C\u53EF\u8D2D\u4E70\u4EFB\u610F\u670D\u52A1",
        "type-label": "\u989D\u5EA6\u5238",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "\u7ACB\u5373\u5145\u503C",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/CouponBalance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CouponBalance-Dgso5qYd.mjs.map
