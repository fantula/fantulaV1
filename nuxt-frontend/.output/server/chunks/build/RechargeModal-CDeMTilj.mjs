import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1 } from './virtual_public-Dz2P0tZ2.mjs';
import { j as close_default } from './index-DuV_oMrC.mjs';
import { u as useUserStore } from './user-C1i1UnhA.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'lodash-unified';
import '@vue/shared';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
import './common-D9iMPQj0.mjs';
import './cart-B8xez9id.mjs';

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
          _push2(`<div class="modal-overlay" data-v-207ad95d><div class="modal-content aurora-sheet-panel" data-v-207ad95d><div class="modal-header" data-v-207ad95d><h3 class="modal-title" data-v-207ad95d>\u8D2D\u7F6E\u989D\u5EA6</h3><button class="close-btn" data-v-207ad95d>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-207ad95d><div class="section-title" data-v-207ad95d>\u9009\u62E9\u989D\u5EA6</div><div class="amount-grid" data-v-207ad95d><!--[-->`);
          ssrRenderList(options.value, (item, idx) => {
            _push2(`<div class="${ssrRenderClass(["amount-card", "aurora-option-card", { active: selectedIdx.value === idx }])}" data-v-207ad95d><div class="amount-val" data-v-207ad95d>${ssrInterpolate(item.value)}<span class="unit" data-v-207ad95d>\u70B9</span></div>`);
            if (item.bonus > 0) {
              _push2(`<div class="bonus-tag" data-v-207ad95d>\u9001 ${ssrInterpolate(item.bonus)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--><div class="${ssrRenderClass(["amount-card", "aurora-option-card", "custom-card", { active: selectedIdx.value === -1 }])}" data-v-207ad95d><span class="custom-label" data-v-207ad95d>\u81EA\u5B9A\u4E49</span></div></div>`);
          if (selectedIdx.value === -1) {
            _push2(`<div class="custom-input-wrap" data-v-207ad95d><input${ssrRenderAttr("value", customValue.value)} type="number" placeholder="\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D" class="premium-input aurora-input" data-v-207ad95d><span class="suffix" data-v-207ad95d>\u70B9</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="section-title mt-4" data-v-207ad95d>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-207ad95d><div class="pay-item disabled" data-v-207ad95d><div class="pay-left" data-v-207ad95d><img${ssrRenderAttr("src", _imports_0)} class="pay-icon" alt="Alipay" data-v-207ad95d><span data-v-207ad95d>\u652F\u4ED8\u5B9D</span><span class="coming-soon" data-v-207ad95d>\u5373\u5C06\u5F00\u901A</span></div></div><div class="${ssrRenderClass(["pay-item", { active: payType.value === "wechat" }])}" data-v-207ad95d><div class="pay-left" data-v-207ad95d><img${ssrRenderAttr("src", _imports_1)} class="pay-icon" alt="WeChat" data-v-207ad95d><span data-v-207ad95d>\u5FAE\u4FE1\u652F\u4ED8</span></div><div class="${ssrRenderClass([{ checked: payType.value === "wechat" }, "pay-radio"])}" data-v-207ad95d>`);
          if (payType.value === "wechat") {
            _push2(`<div class="radio-dot" data-v-207ad95d></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
          if (!isWechatBrowser.value) {
            _push2(`<div class="wechat-tip" data-v-207ad95d><div class="tip-icon" data-v-207ad95d>\u{1F4A1}</div><div class="tip-text" data-v-207ad95d>\u8BF7\u5728\u5FAE\u4FE1\u4E2D\u6253\u5F00\u672C\u9875\u9762\u4EE5\u4F7F\u7528\u5FAE\u4FE1\u652F\u4ED8</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-footer" data-v-207ad95d>`);
          if (isValidAmount.value) {
            _push2(`<div class="total-info" data-v-207ad95d><span data-v-207ad95d>\u5B9E\u9645\u5230\u8D26:</span><span class="total-val" data-v-207ad95d>${ssrInterpolate(totalPoints.value)} \u70B9</span>`);
            if (currentBonus.value > 0) {
              _push2(`<span class="bonus-hint" data-v-207ad95d>(\u542B\u8D60\u9001 ${ssrInterpolate(currentBonus.value)})</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="pay-btn aurora-btn-accent"${ssrIncludeBooleanAttr(loading.value || !isValidAmount.value || !isWechatBrowser.value) ? " disabled" : ""} data-v-207ad95d>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-207ad95d></span>`);
          } else if (!isWechatBrowser.value) {
            _push2(`<span data-v-207ad95d>\u8BF7\u5728\u5FAE\u4FE1\u5185\u6253\u5F00</span>`);
          } else {
            _push2(`<span data-v-207ad95d>\u7ACB\u5373\u652F\u4ED8 \xA5${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
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
const RechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-207ad95d"]]);

export { RechargeModal as default };
//# sourceMappingURL=RechargeModal-CDeMTilj.mjs.map
