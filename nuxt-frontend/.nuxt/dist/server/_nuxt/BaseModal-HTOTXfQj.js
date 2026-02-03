import { defineComponent, computed, ref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrInterpolate, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { B as BaseButton } from "./BaseButton-B3srPw2H.js";
import { _ as _export_sfc } from "../server.mjs";
const MODAL_THEMES = {
  /* ======================================================================
     [方案 SUIT-001] 标准幽灵 (Standard)
     ----------------------------------------------------------------------
     说明: 下面这些配置是传给 BaseModal 的 props。
     如果只改文字/图片/位置，改这里即可。
     如果要改 CSS 样式，请去 components/shared/BaseModal.vue 底部
     ====================================================================== */
  "suit-001": {
    id: "suit-001",
    name: "Classic Phantom",
    mascotImg: "/images/modal/pc/mascot_01.png",
    // 更新为新版吉祥物
    mascotPosition: "bottom",
    variantClass: "variant-standard",
    animation: "mascot-rise",
    opacity: 0.85,
    duration: "1.4s"
  },
  /* ======================================================================
     [方案 SUIT-002] 柔光风格 (Soft Light)
     ----------------------------------------------------------------------
     修改样式请去 components/shared/BaseModal.vue 底部
     ====================================================================== */
  "suit-002": {
    id: "suit-002",
    name: "Soft Light",
    mascotImg: "/images/modal/pc/mascot_02.png",
    mascotPosition: "left",
    variantClass: "variant-phantom-light",
    animation: "phantom-rise-soft",
    opacity: 1,
    duration: "0.6s"
  },
  /* ======================================================================
     [方案 SUIT-003] 赛博朋克 (Cyberpunk)
     ----------------------------------------------------------------------
     修改样式请去 components/shared/BaseModal.vue 底部
     ====================================================================== */
  "suit-003": {
    id: "suit-003",
    name: "Cyberpunk",
    mascotImg: "/images/modal/pc/mascot_01.png",
    mascotPosition: "right",
    variantClass: "variant-cyber",
    animation: "cyber-pop"
  }
  /* [新方案添加处] */
};
const DEFAULT_THEME_ID = "suit-001";
function getTheme(id) {
  return MODAL_THEMES[id || ""] || MODAL_THEMES[DEFAULT_THEME_ID];
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: {},
    width: { default: "420px" },
    showClose: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    cancelText: { default: "取消" },
    confirmText: { default: "确认" },
    loadingText: { default: "处理中..." },
    confirmDisabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    themeId: { default: "suit-001" },
    confirmThemeId: { default: "primary" },
    cancelThemeId: { default: "secondary" }
  },
  emits: ["close", "confirm", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const currentTheme = computed(() => getTheme(props.themeId));
    const emit = __emit;
    const containerWidth = computed(() => props.width);
    ref(false);
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="base-modal-overlay" data-v-084e2e9c><div class="base-modal-container" style="${ssrRenderStyle({ width: containerWidth.value })}" data-v-084e2e9c><div class="base-modal-header" data-v-084e2e9c><h3 class="base-modal-title" data-v-084e2e9c>${ssrInterpolate(__props.title)}</h3>`);
          if (__props.showClose) {
            _push2(`<button class="base-modal-close" data-v-084e2e9c>×</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="base-modal-body" data-v-084e2e9c>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
          if (__props.showFooter) {
            _push2(`<div class="base-modal-actions" data-v-084e2e9c>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
              _push2(ssrRenderComponent(BaseButton, {
                themeId: __props.cancelThemeId,
                onClick: handleClose
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.cancelText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.cancelText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push2(ssrRenderComponent(BaseButton, {
                themeId: __props.confirmThemeId,
                disabled: __props.confirmDisabled || __props.loading,
                loading: __props.loading,
                onClick: ($event) => _ctx.$emit("confirm")
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.loading ? __props.loadingText : __props.confirmText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.loading ? __props.loadingText : __props.confirmText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            }, _push2, _parent);
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (currentTheme.value.mascotImg) {
            _push2(`<img${ssrRenderAttr("src", currentTheme.value.mascotImg)} class="${ssrRenderClass([[`phantom-${currentTheme.value.mascotPosition}`, currentTheme.value.variantClass], "modal-mascot-phantom"])}" style="${ssrRenderStyle({
              animationName: currentTheme.value.animation,
              animationDuration: currentTheme.value.duration || "0.6s",
              "--mascot-final-opacity": currentTheme.value.opacity ?? 1
            })}" data-v-084e2e9c>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BaseModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-084e2e9c"]]);
export {
  BaseModal as B
};
//# sourceMappingURL=BaseModal-HTOTXfQj.js.map
