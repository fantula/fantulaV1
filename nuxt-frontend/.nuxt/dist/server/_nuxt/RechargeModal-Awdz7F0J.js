/* empty css              */
/* empty css                    */
import { defineComponent, ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-CTq2VprR.js";
import { _ as _imports_1 } from "./virtual_public-FTeKDcap.js";
import { b as close_default } from "./index-DlETah8a.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-Cnuc6I82.js";
import { _ as _export_sfc } from "../server.mjs";
import "#internal/nuxt/paths";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
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
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-C8TGo9ts.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RechargeModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    useUserStore();
    const isWechatBrowser = ref(false);
    ref(null);
    const options = ref([]);
    const loading = ref(false);
    const selectedIdx = ref(0);
    const customValue = ref(null);
    const payType = ref("wechat");
    const payAmount = computed(() => {
      if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
        return options.value[selectedIdx.value].value;
      }
      return customValue.value || 0;
    });
    const currentBonus = computed(() => {
      if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
        return options.value[selectedIdx.value].bonus;
      }
      return 0;
    });
    const totalPoints = computed(() => payAmount.value + currentBonus.value);
    const isValidAmount = computed(() => payAmount.value > 0);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-c08ff378><div class="modal-content" data-v-c08ff378><div class="modal-header" data-v-c08ff378><h3 class="modal-title" data-v-c08ff378>购置额度</h3><button class="close-btn" data-v-c08ff378>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-c08ff378><div class="section-title" data-v-c08ff378>选择额度</div><div class="amount-grid" data-v-c08ff378><!--[-->`);
          ssrRenderList(options.value, (item, idx) => {
            _push2(`<div class="${ssrRenderClass(["amount-card", { active: selectedIdx.value === idx }])}" data-v-c08ff378><div class="amount-val" data-v-c08ff378>${ssrInterpolate(item.value)}<span class="unit" data-v-c08ff378>点</span></div>`);
            if (item.bonus > 0) {
              _push2(`<div class="bonus-tag" data-v-c08ff378>送 ${ssrInterpolate(item.bonus)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--><div class="${ssrRenderClass(["amount-card", "custom-card", { active: selectedIdx.value === -1 }])}" data-v-c08ff378><span class="custom-label" data-v-c08ff378>自定义</span></div></div>`);
          if (selectedIdx.value === -1) {
            _push2(`<div class="custom-input-wrap" data-v-c08ff378><input${ssrRenderAttr("value", customValue.value)} type="number" placeholder="请输入充值金额" class="premium-input" data-v-c08ff378><span class="suffix" data-v-c08ff378>点</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="section-title mt-4" data-v-c08ff378>支付方式</div><div class="pay-methods" data-v-c08ff378><div class="pay-item disabled" data-v-c08ff378><div class="pay-left" data-v-c08ff378><img${ssrRenderAttr("src", _imports_0)} class="pay-icon" alt="Alipay" data-v-c08ff378><span data-v-c08ff378>支付宝</span><span class="coming-soon" data-v-c08ff378>即将开通</span></div></div><div class="${ssrRenderClass(["pay-item", { active: payType.value === "wechat" }])}" data-v-c08ff378><div class="pay-left" data-v-c08ff378><img${ssrRenderAttr("src", _imports_1)} class="pay-icon" alt="WeChat" data-v-c08ff378><span data-v-c08ff378>微信支付</span></div><div class="${ssrRenderClass([{ checked: payType.value === "wechat" }, "pay-radio"])}" data-v-c08ff378>`);
          if (payType.value === "wechat") {
            _push2(`<div class="radio-dot" data-v-c08ff378></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
          if (!isWechatBrowser.value) {
            _push2(`<div class="wechat-tip" data-v-c08ff378><div class="tip-icon" data-v-c08ff378>💡</div><div class="tip-text" data-v-c08ff378>请在微信中打开本页面以使用微信支付</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-footer" data-v-c08ff378>`);
          if (isValidAmount.value) {
            _push2(`<div class="total-info" data-v-c08ff378><span data-v-c08ff378>实际到账:</span><span class="total-val" data-v-c08ff378>${ssrInterpolate(totalPoints.value)} 点</span>`);
            if (currentBonus.value > 0) {
              _push2(`<span class="bonus-hint" data-v-c08ff378>(含赠送 ${ssrInterpolate(currentBonus.value)})</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="pay-btn"${ssrIncludeBooleanAttr(loading.value || !isValidAmount.value || !isWechatBrowser.value) ? " disabled" : ""} data-v-c08ff378>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-c08ff378></span>`);
          } else if (!isWechatBrowser.value) {
            _push2(`<span data-v-c08ff378>请在微信内打开</span>`);
          } else {
            _push2(`<span data-v-c08ff378>立即支付 ¥${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/RechargeModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c08ff378"]]);
export {
  RechargeModal as default
};
//# sourceMappingURL=RechargeModal-Awdz7F0J.js.map
