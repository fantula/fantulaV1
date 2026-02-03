import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { s as service_default, a0 as copy_document_default, ao as suitcase_default, a7 as chat_dot_round_default, ap as position_default } from './index-4qszPKX4.mjs';
import { _ as _export_sfc } from './server.mjs';

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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-7a92c5be><div class="contact-modal" data-v-7a92c5be><div class="modal-header" data-v-7a92c5be><div class="modal-header-inner" data-v-7a92c5be><div class="modal-title" data-v-7a92c5be>\u8054\u7CFB\u6211\u4EEC</div><div class="modal-subtitle" data-v-7a92c5be>\u65E0\u8BBA\u662F\u4E1A\u52A1\u54A8\u8BE2\u8FD8\u662F\u5546\u52A1\u5408\u4F5C\uFF0C\u6211\u4EEC\u968F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u652F\u6301</div><button class="modal-close" data-v-7a92c5be>\xD7</button></div></div><div class="modal-body" data-v-7a92c5be><div class="contact-items" data-v-7a92c5be><div class="contact-item" data-v-7a92c5be><div class="item-icon" data-v-7a92c5be>`);
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
        _push(`</div><div class="item-info" data-v-7a92c5be><h3 data-v-7a92c5be>\u5BA2\u6237\u670D\u52A1</h3><p data-v-7a92c5be>\u8BA2\u5355\u54A8\u8BE2\u3001\u552E\u540E\u5904\u7406\u3001\u4F7F\u7528\u5E2E\u52A9</p></div><div class="item-action" data-v-7a92c5be><button class="copy-btn" data-v-7a92c5be><span data-v-7a92c5be>support@fantula.com</span>`);
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
        _push(`</div><div class="item-info" data-v-7a92c5be><h3 data-v-7a92c5be>\u5546\u52A1\u5408\u4F5C</h3><p data-v-7a92c5be>\u6E20\u9053\u4EE3\u7406\u3001\u5927\u5B97\u91C7\u8D2D\u3001\u54C1\u724C\u8054\u540D</p></div><div class="item-action" data-v-7a92c5be><button class="copy-btn" data-v-7a92c5be><span data-v-7a92c5be>business@fantula.com</span>`);
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
        _push(`</button></div></div></div><div class="contact-footer" data-v-7a92c5be><div class="manual-tip" data-v-7a92c5be>\u4E5F\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u627E\u5230\u6211\u4EEC</div><div class="social-row" data-v-7a92c5be><button class="social-pill" data-v-7a92c5be>`);
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
        _push(`<span data-v-7a92c5be>\u5FAE\u4FE1\u5BA2\u670D</span></button><button class="social-pill" data-v-7a92c5be>`);
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

export { ContactModal as C };
//# sourceMappingURL=ContactModal-Co07Pgk0.mjs.map
