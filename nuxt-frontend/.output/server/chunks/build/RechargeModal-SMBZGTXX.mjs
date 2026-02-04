import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-CTq2VprR.mjs';
import { _ as _imports_1 } from './virtual_public-FTeKDcap.mjs';
import { n as close_default } from './index-CmsdIFY8.mjs';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { _ as _export_sfc } from './server.mjs';

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
          _push2(`<div class="modal-overlay" data-v-898d96f7><div class="modal-content" data-v-898d96f7><div class="modal-header" data-v-898d96f7><h3 class="modal-title" data-v-898d96f7>\u8D2D\u7F6E\u989D\u5EA6</h3><button class="close-btn" data-v-898d96f7>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-898d96f7><div class="section-title" data-v-898d96f7>\u9009\u62E9\u989D\u5EA6</div><div class="amount-grid" data-v-898d96f7><!--[-->`);
          ssrRenderList(options.value, (item, idx) => {
            _push2(`<div class="${ssrRenderClass(["amount-card", { active: selectedIdx.value === idx }])}" data-v-898d96f7><div class="amount-val" data-v-898d96f7>${ssrInterpolate(item.value)}<span class="unit" data-v-898d96f7>\u70B9</span></div>`);
            if (item.bonus > 0) {
              _push2(`<div class="bonus-tag" data-v-898d96f7>\u9001 ${ssrInterpolate(item.bonus)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--><div class="${ssrRenderClass(["amount-card", "custom-card", { active: selectedIdx.value === -1 }])}" data-v-898d96f7><span class="custom-label" data-v-898d96f7>\u81EA\u5B9A\u4E49</span></div></div>`);
          if (selectedIdx.value === -1) {
            _push2(`<div class="custom-input-wrap" data-v-898d96f7><input${ssrRenderAttr("value", customValue.value)} type="number" placeholder="\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D" class="premium-input" data-v-898d96f7><span class="suffix" data-v-898d96f7>\u70B9</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="section-title mt-4" data-v-898d96f7>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-898d96f7><div class="pay-item disabled" data-v-898d96f7><div class="pay-left" data-v-898d96f7><img${ssrRenderAttr("src", _imports_0)} class="pay-icon" alt="Alipay" data-v-898d96f7><span data-v-898d96f7>\u652F\u4ED8\u5B9D</span><span class="coming-soon" data-v-898d96f7>\u5373\u5C06\u5F00\u901A</span></div></div><div class="${ssrRenderClass(["pay-item", { active: payType.value === "wechat" }])}" data-v-898d96f7><div class="pay-left" data-v-898d96f7><img${ssrRenderAttr("src", _imports_1)} class="pay-icon" alt="WeChat" data-v-898d96f7><span data-v-898d96f7>\u5FAE\u4FE1\u652F\u4ED8</span></div><div class="${ssrRenderClass([{ checked: payType.value === "wechat" }, "pay-radio"])}" data-v-898d96f7>`);
          if (payType.value === "wechat") {
            _push2(`<div class="radio-dot" data-v-898d96f7></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
          if (!isWechatBrowser.value) {
            _push2(`<div class="wechat-tip" data-v-898d96f7><div class="tip-icon" data-v-898d96f7>\u{1F4A1}</div><div class="tip-text" data-v-898d96f7>\u8BF7\u5728\u5FAE\u4FE1\u4E2D\u6253\u5F00\u672C\u9875\u9762\u4EE5\u4F7F\u7528\u5FAE\u4FE1\u652F\u4ED8</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-footer" data-v-898d96f7>`);
          if (isValidAmount.value) {
            _push2(`<div class="total-info" data-v-898d96f7><span data-v-898d96f7>\u5B9E\u9645\u5230\u8D26:</span><span class="total-val" data-v-898d96f7>${ssrInterpolate(totalPoints.value)} \u70B9</span>`);
            if (currentBonus.value > 0) {
              _push2(`<span class="bonus-hint" data-v-898d96f7>(\u542B\u8D60\u9001 ${ssrInterpolate(currentBonus.value)})</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="pay-btn"${ssrIncludeBooleanAttr(loading.value || !isValidAmount.value || !isWechatBrowser.value) ? " disabled" : ""} data-v-898d96f7>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-898d96f7></span>`);
          } else if (!isWechatBrowser.value) {
            _push2(`<span data-v-898d96f7>\u8BF7\u5728\u5FAE\u4FE1\u5185\u6253\u5F00</span>`);
          } else {
            _push2(`<span data-v-898d96f7>\u7ACB\u5373\u652F\u4ED8 \xA5${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
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
const RechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-898d96f7"]]);

export { RechargeModal as R };
//# sourceMappingURL=RechargeModal-SMBZGTXX.mjs.map
