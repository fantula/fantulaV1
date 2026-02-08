import { defineComponent, computed, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { B as BaseCouponTicket } from './BaseCouponTicket-CbJ8T36H.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import './index-jl2vZbkg.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
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
import './objects-Bz74KHmq.mjs';
import './index-DlETah8a.mjs';
import './BaseButton-BlqmccK6.mjs';

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
      if (!props.couponData.coupon.end_date) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(props.couponData.coupon.end_date);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const displayValue = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "\u5151\u6362";
      return val;
    });
    const displayUnit = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "";
      return "\u70B9";
    });
    const displayDesc = computed(() => {
      const extra = props.couponData.coupon.extra;
      if (extra && extra.product_name) {
        return `${extra.product_name} \u4E13\u7528`;
      }
      return "\u6307\u5B9A\u5546\u54C1\u4E13\u7528\u4F18\u60E0";
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
        "type-label": "\u5546\u54C1\u5238",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "\u53BB\u8D2D\u4E70",
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

export { _sfc_main as default };
//# sourceMappingURL=CouponProduct-BLzdtCDF.mjs.map
