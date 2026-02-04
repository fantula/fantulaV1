import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                    */
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { s as service_default, a4 as copy_document_default, ao as suitcase_default, _ as chat_dot_round_default, ap as position_default } from "./index-CmsdIFY8.js";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContactModal",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-7a92c5be><div class="contact-modal" data-v-7a92c5be><div class="modal-header" data-v-7a92c5be><div class="modal-header-inner" data-v-7a92c5be><div class="modal-title" data-v-7a92c5be>联系我们</div><div class="modal-subtitle" data-v-7a92c5be>无论是业务咨询还是商务合作，我们随时为您提供支持</div><button class="modal-close" data-v-7a92c5be>×</button></div></div><div class="modal-body" data-v-7a92c5be><div class="contact-items" data-v-7a92c5be><div class="contact-item" data-v-7a92c5be><div class="item-icon" data-v-7a92c5be>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(service_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(service_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="item-info" data-v-7a92c5be><h3 data-v-7a92c5be>客户服务</h3><p data-v-7a92c5be>订单咨询、售后处理、使用帮助</p></div><div class="item-action" data-v-7a92c5be><button class="copy-btn" data-v-7a92c5be><span data-v-7a92c5be>support@fantula.com</span>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(copy_document_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button></div></div><div class="contact-item" data-v-7a92c5be><div class="item-icon" data-v-7a92c5be>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(suitcase_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(suitcase_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="item-info" data-v-7a92c5be><h3 data-v-7a92c5be>商务合作</h3><p data-v-7a92c5be>渠道代理、大宗采购、品牌联名</p></div><div class="item-action" data-v-7a92c5be><button class="copy-btn" data-v-7a92c5be><span data-v-7a92c5be>business@fantula.com</span>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(copy_document_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button></div></div></div><div class="contact-footer" data-v-7a92c5be><div class="manual-tip" data-v-7a92c5be>也可以通过以下方式找到我们</div><div class="social-row" data-v-7a92c5be><button class="social-pill" data-v-7a92c5be>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(chat_dot_round_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-7a92c5be>微信客服</span></button><button class="social-pill" data-v-7a92c5be>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(position_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(position_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-7a92c5be>Telegram</span></button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ContactModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContactModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7a92c5be"]]);
export {
  ContactModal as C
};
//# sourceMappingURL=ContactModal-BLWDvuWe.js.map
