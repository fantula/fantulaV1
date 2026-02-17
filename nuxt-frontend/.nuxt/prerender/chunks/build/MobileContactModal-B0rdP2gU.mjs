import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, computed, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderComponent, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { b as close_default, S as chat_dot_round_default, L as copy_document_default, ac as clock_default, ab as position_default } from './index-DNnPa_Q9.mjs';
import { u as useNotify } from './useNotify-QNEBBzdZ.mjs';
import { u as useSystemConfig } from './useSystemConfig-uu86svaG.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileContactModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useNotify();
    const { contactConfig } = useSystemConfig();
    const config = computed(() => {
      return contactConfig.value || {
        wechat_id: "Spotify-cn",
        telegram_id: "@Fantula_Support",
        service_time: "10:00 - 23:00"
      };
    });
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="modal-overlay" data-v-466cc7e7><div class="modal-panel-glass" data-v-466cc7e7><div class="modal-header" data-v-466cc7e7><div class="header-title" data-v-466cc7e7>\u8054\u7CFB\u6211\u4EEC</div><div class="close-btn" data-v-466cc7e7>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(close_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div><div class="modal-body" data-v-466cc7e7><div class="contact-card-glass wechat" data-v-466cc7e7><div class="card-icon" data-v-466cc7e7>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(chat_dot_round_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="card-info" data-v-466cc7e7><div class="label" data-v-466cc7e7>\u5FAE\u4FE1\u5BA2\u670D</div><div class="value" data-v-466cc7e7>${ssrInterpolate(config.value.wechat_id || "Spotify-cn")}</div></div><div class="copy-tag" data-v-466cc7e7>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(copy_document_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-466cc7e7>\u590D\u5236</span></div></div><div class="time-tip" data-v-466cc7e7>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(clock_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(clock_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-466cc7e7>\u5728\u7EBF\u65F6\u95F4\uFF1A${ssrInterpolate(config.value.service_time || "10:00 - 23:00")}</span></div><div class="contact-card-glass telegram" data-v-466cc7e7><div class="card-icon" data-v-466cc7e7>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(position_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(position_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="card-info" data-v-466cc7e7><div class="label" data-v-466cc7e7>Telegram</div><div class="value" data-v-466cc7e7>${ssrInterpolate(config.value.telegram_id || "@Fantula_Support")}</div></div><div class="copy-tag" data-v-466cc7e7>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(copy_document_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-466cc7e7>\u590D\u5236</span></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/modal/MobileContactModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileContactModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-466cc7e7"]]);

export { MobileContactModal as M };
//# sourceMappingURL=MobileContactModal-B0rdP2gU.mjs.map
