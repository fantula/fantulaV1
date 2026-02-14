import { defineComponent, computed, withCtx, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { B as BaseButton } from './BaseButton-BnWAaIRO.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
        "alipay": "\u652F\u4ED8\u5B9D\u652F\u4ED8",
        "balance": "\u4F59\u989D\u652F\u4ED8",
        "other": "\u5176\u4ED6\u652F\u4ED8"
      };
      return typeMap[props.payType] || "\u672A\u77E5\u652F\u4ED8\u65B9\u5F0F";
    });
    const safeTime = computed(() => {
      try {
        const now = /* @__PURE__ */ new Date();
        return now.toLocaleString("zh-CN", { hour12: false });
      } catch {
        return "\u521A\u521A";
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
        _push2(`<div class="modal-mask" data-v-274393bd><div class="pay-success-modal glass-card" data-v-274393bd><div class="success-header" data-v-274393bd><div class="success-circle" data-v-274393bd><div class="success-icon-wrapper" data-v-274393bd><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-274393bd><polyline points="20 6 9 17 4 12" data-v-274393bd></polyline></svg></div></div><div class="success-title" data-v-274393bd>\u652F\u4ED8\u6210\u529F</div><div class="success-desc" data-v-274393bd>\u60A8\u7684\u8BA2\u5355\u5DF2\u786E\u8BA4\uFF0C\u611F\u8C22\u60A8\u7684\u8D2D\u4E70</div></div><div class="success-info" data-v-274393bd><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>\u8BA2\u5355\u7F16\u53F7</span><span class="info-value info-link" data-v-274393bd>${ssrInterpolate(safeOrderId.value)}</span></div><div class="info-divider" data-v-274393bd></div><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>\u652F\u4ED8\u91D1\u989D</span><span class="info-value info-amount" data-v-274393bd>\xA5${ssrInterpolate(safeAmount.value)}</span></div><div class="info-divider" data-v-274393bd></div><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>\u652F\u4ED8\u65B9\u5F0F</span><span class="info-value info-paytype" data-v-274393bd>${ssrInterpolate(safePayTypeName.value)}</span></div><div class="info-divider" data-v-274393bd></div><div class="info-row" data-v-274393bd><span class="info-label" data-v-274393bd>\u652F\u4ED8\u65F6\u95F4</span><span class="info-value info-time" data-v-274393bd>${ssrInterpolate(safeTime.value)}</span></div></div><div class="status-box" data-v-274393bd><div class="status-icon" data-v-274393bd>\u{1F680}</div><div class="status-text" data-v-274393bd>\u7CFB\u7EDF\u6B63\u5728\u4E3A\u60A8\u81EA\u52A8\u53D1\u8D27\uFF0C\u8BF7\u7A0D\u5019\u67E5\u770B</div></div><div class="success-actions" data-v-274393bd>`);
        _push2(ssrRenderComponent(BaseButton, {
          themeId: "primary-orange",
          block: "",
          onClick: handleGoToOrders
        }, {
          default: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(` \u524D\u5F80\u67E5\u770B\u8BA2\u5355 `);
            } else {
              return [
                createTextVNode(" \u524D\u5F80\u67E5\u770B\u8BA2\u5355 ")
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
              _push3(` \u8FD4\u56DE\u9996\u9875 `);
            } else {
              return [
                createTextVNode(" \u8FD4\u56DE\u9996\u9875 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push2(`</div><div class="success-tip" data-v-274393bd> \u5982\u6709\u4EFB\u4F55\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D <span class="kefu-phone" data-v-274393bd>\u5728\u7EBF\u5BA2\u670D</span></div></div></div>`);
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

export { PaySuccessModal as default };
//# sourceMappingURL=PaySuccessModal-CnE_GCIQ.mjs.map
