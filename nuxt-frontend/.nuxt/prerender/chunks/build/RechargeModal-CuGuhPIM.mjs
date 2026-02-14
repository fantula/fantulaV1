import { defineComponent, ref, computed, unref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0, a as _imports_1 } from './virtual_public-Dz2P0tZ2.mjs';
import { g as close_default } from './index-CRs4T-Jf.mjs';
import { u as useNotify } from './useNotify-CME3DTm8.mjs';
import { u as useUserStore } from './user-B9FaDvHc.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './useToast-DsT-1f4c.mjs';
import './index-CK1iG7c1.mjs';
import './typescript-D6L75muK.mjs';
import './icon-DxnRhcjj.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-D6MDXFfa.mjs';
import './objects-Bz74KHmq.mjs';
import './use-global-config-C00m4e8W.mjs';
import './index-C8K_s-bH.mjs';
import './event-D3FEo2C5.mjs';
import './supabase-Ds8OQlZJ.mjs';
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
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RechargeModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    useUserStore();
    useNotify();
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
          _push2(`<div class="modal-overlay" data-v-99724da3><div class="modal-content aurora-sheet-panel" data-v-99724da3><div class="modal-header" data-v-99724da3><h3 class="modal-title" data-v-99724da3>\u8D2D\u7F6E\u989D\u5EA6</h3><button class="close-btn" data-v-99724da3>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-99724da3><div class="section-title" data-v-99724da3>\u9009\u62E9\u989D\u5EA6</div><div class="amount-grid" data-v-99724da3><!--[-->`);
          ssrRenderList(options.value, (item, idx) => {
            _push2(`<div class="${ssrRenderClass(["amount-card", "aurora-option-card", { active: selectedIdx.value === idx }])}" data-v-99724da3><div class="amount-val" data-v-99724da3>${ssrInterpolate(item.value)}<span class="unit" data-v-99724da3>\u70B9</span></div>`);
            if (item.bonus > 0) {
              _push2(`<div class="bonus-tag" data-v-99724da3>\u9001 ${ssrInterpolate(item.bonus)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--><div class="${ssrRenderClass(["amount-card", "aurora-option-card", "custom-card", { active: selectedIdx.value === -1 }])}" data-v-99724da3><span class="custom-label" data-v-99724da3>\u81EA\u5B9A\u4E49</span></div></div>`);
          if (selectedIdx.value === -1) {
            _push2(`<div class="custom-input-wrap" data-v-99724da3><input${ssrRenderAttr("value", customValue.value)} type="number" placeholder="\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D" class="premium-input aurora-input" data-v-99724da3><span class="suffix" data-v-99724da3>\u70B9</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="section-title mt-4" data-v-99724da3>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-99724da3><div class="pay-item disabled" data-v-99724da3><div class="pay-left" data-v-99724da3><img${ssrRenderAttr("src", _imports_0)} class="pay-icon" alt="Alipay" data-v-99724da3><span data-v-99724da3>\u652F\u4ED8\u5B9D</span><span class="coming-soon" data-v-99724da3>\u5373\u5C06\u5F00\u901A</span></div></div><div class="${ssrRenderClass(["pay-item", { active: payType.value === "wechat" }])}" data-v-99724da3><div class="pay-left" data-v-99724da3><img${ssrRenderAttr("src", _imports_1)} class="pay-icon" alt="WeChat" data-v-99724da3><span data-v-99724da3>\u5FAE\u4FE1\u652F\u4ED8</span></div><div class="${ssrRenderClass([{ checked: payType.value === "wechat" }, "pay-radio"])}" data-v-99724da3>`);
          if (payType.value === "wechat") {
            _push2(`<div class="radio-dot" data-v-99724da3></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
          if (!isWechatBrowser.value) {
            _push2(`<div class="wechat-tip" data-v-99724da3><div class="tip-icon" data-v-99724da3>\u{1F4A1}</div><div class="tip-text" data-v-99724da3>\u8BF7\u5728\u5FAE\u4FE1\u4E2D\u6253\u5F00\u672C\u9875\u9762\u4EE5\u4F7F\u7528\u5FAE\u4FE1\u652F\u4ED8</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-footer" data-v-99724da3>`);
          if (isValidAmount.value) {
            _push2(`<div class="total-info" data-v-99724da3><span data-v-99724da3>\u5B9E\u9645\u5230\u8D26:</span><span class="total-val" data-v-99724da3>${ssrInterpolate(totalPoints.value)} \u70B9</span>`);
            if (currentBonus.value > 0) {
              _push2(`<span class="bonus-hint" data-v-99724da3>(\u542B\u8D60\u9001 ${ssrInterpolate(currentBonus.value)})</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="pay-btn aurora-btn-accent"${ssrIncludeBooleanAttr(loading.value || !isValidAmount.value || !isWechatBrowser.value) ? " disabled" : ""} data-v-99724da3>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-99724da3></span>`);
          } else if (!isWechatBrowser.value) {
            _push2(`<span data-v-99724da3>\u8BF7\u5728\u5FAE\u4FE1\u5185\u6253\u5F00</span>`);
          } else {
            _push2(`<span data-v-99724da3>\u7ACB\u5373\u652F\u4ED8 \xA5${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
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
const RechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99724da3"]]);

export { RechargeModal as default };
//# sourceMappingURL=RechargeModal-CuGuhPIM.mjs.map
