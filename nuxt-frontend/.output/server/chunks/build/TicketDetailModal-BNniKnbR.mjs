import { _ as __nuxt_component_0 } from './BaseModal-CiVpglQ1.mjs';
import { E as ElImage } from './index-BmjXUoge.mjs';
import { v as vLoading } from './directive-BBpaOxz2.mjs';
import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, withDirectives, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, withKeys, withModifiers, vModelText, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { t as ticketApi } from './ticket-C7sv4DHi.mjs';
import { c as clientOrderApi } from './order-YXZ2UWGv.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { O as OrderInfoCard } from './OrderInfoCard-D-u1EGMb.mjs';
import { _ as _export_sfc } from './server.mjs';
import './BaseButton-BlqmccK6.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './typescript-D6L75muK.mjs';
import '@vueuse/core';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-jl2vZbkg.mjs';
import './objects-Bz74KHmq.mjs';
import './index-DlETah8a.mjs';
import './index-K5TIzHX_.mjs';
import './index-7KygWwCI.mjs';
import './scroll-BuMAfCNC.mjs';
import './raf-CQRaPAjg.mjs';
import './index-Cy25Tved.mjs';
import './use-global-config-79yNXOXL.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TicketDetailModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    ticketId: {}
  },
  emits: ["update:visible", "close", "reply-success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatDate } = useBizFormat();
    const isVisible = computed({
      get: () => props.visible,
      set: (val) => emit("update:visible", val)
    });
    const currentTicketNo = computed(() => {
      var _a;
      if ((_a = ticketDetail.value) == null ? void 0 : _a.ticket_no) return ticketDetail.value.ticket_no;
      if (props.ticketId) return `T-${props.ticketId.substring(0, 8).toUpperCase()}`;
      return "";
    });
    const loading = ref(false);
    const loadingOrder = ref(false);
    const replying = ref(false);
    const ticketDetail = ref(null);
    const orderDetail = ref(null);
    const replies = ref([]);
    const replyContent = ref("");
    const loadData = async () => {
      var _a, _b;
      if (!props.ticketId) return;
      loading.value = true;
      try {
        const res = await ticketApi.getDetail(props.ticketId);
        if (res.success && res.data) {
          ticketDetail.value = res.data;
          replies.value = res.data.replies.map((r) => ({
            sender: r.sender,
            content: r.content,
            attachments: r.attachments,
            time: r.time
          }));
          const orderId = (_a = res.data.orders) == null ? void 0 : _a.id;
          if ((_b = res.data.orders) == null ? void 0 : _b.id) {
            fetchOrderDetail(res.data.orders.id);
          } else if (res.data.order_id) {
            fetchOrderDetail(res.data.order_id);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    const fetchOrderDetail = async (id) => {
      loadingOrder.value = true;
      try {
        const res = await clientOrderApi.getOrderDetail(id);
        if (res.success && res.data) {
          orderDetail.value = res.data;
        }
      } finally {
        loadingOrder.value = false;
      }
    };
    const submitReply = async () => {
      if (!replyContent.value.trim() || replying.value) return;
      replying.value = true;
      try {
        const res = await ticketApi.reply(props.ticketId, replyContent.value);
        if (res.success) {
          replyContent.value = "";
          await loadData();
          emit("reply-success");
        }
      } finally {
        replying.value = false;
      }
    };
    const handleClose = () => {
      emit("close");
    };
    watch(() => props.visible, (val) => {
      if (val && props.ticketId) {
        loadData();
      } else {
        ticketDetail.value = null;
        orderDetail.value = null;
        replies.value = [];
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0;
      const _component_el_image = ElImage;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: isVisible.value,
        "onUpdate:visible": ($event) => isVisible.value = $event,
        title: `\u5DE5\u5355\u8BE6\u60C5 ${currentTicketNo.value}`,
        width: "700px",
        "show-footer": false,
        "show-mascot": "",
        "mascot-position": "right",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-body" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-1dd04986${_scopeId}>`);
            _push2(ssrRenderComponent(OrderInfoCard, {
              order: orderDetail.value,
              loading: loadingOrder.value
            }, null, _parent2, _scopeId));
            if (ticketDetail.value) {
              _push2(`<div class="ticket-meta-glass" data-v-1dd04986${_scopeId}><div class="meta-row" data-v-1dd04986${_scopeId}><span class="label" data-v-1dd04986${_scopeId}>\u63D0\u4EA4\u65F6\u95F4:</span> <span class="val" data-v-1dd04986${_scopeId}>${ssrInterpolate(unref(formatDate)(ticketDetail.value.created_at))}</span></div><div class="meta-row" data-v-1dd04986${_scopeId}><span class="label" data-v-1dd04986${_scopeId}>\u5F53\u524D\u72B6\u6001:</span><span class="${ssrRenderClass(["status-text", ticketDetail.value.status])}" data-v-1dd04986${_scopeId}>${ssrInterpolate(ticketDetail.value.status === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="chat-container" data-v-1dd04986${_scopeId}><!--[-->`);
            ssrRenderList(replies.value, (reply, idx) => {
              _push2(`<div class="${ssrRenderClass([reply.sender, "chat-message"])}" data-v-1dd04986${_scopeId}>`);
              if (reply.sender === "admin") {
                _push2(`<div class="avatar admin" data-v-1dd04986${_scopeId}>\u670D</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="message-content-wrapper" data-v-1dd04986${_scopeId}><div class="message-bubble" data-v-1dd04986${_scopeId}><div class="msg-text" data-v-1dd04986${_scopeId}>${ssrInterpolate(reply.content)}</div>`);
              if (reply.attachments && reply.attachments.length) {
                _push2(`<div class="msg-attachments" data-v-1dd04986${_scopeId}><!--[-->`);
                ssrRenderList(reply.attachments, (url) => {
                  _push2(ssrRenderComponent(_component_el_image, {
                    key: url,
                    src: url,
                    class: "attachment-img",
                    "preview-src-list": reply.attachments,
                    "preview-teleported": "",
                    fit: "cover"
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="message-time" data-v-1dd04986${_scopeId}>${ssrInterpolate(unref(formatDate)(reply.time))}</div></div>`);
              if (reply.sender === "user") {
                _push2(`<div class="avatar user" data-v-1dd04986${_scopeId}>\u6211</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (((_a = ticketDetail.value) == null ? void 0 : _a.status) === "processing") {
              _push2(`<div class="reply-area" data-v-1dd04986${_scopeId}><textarea class="reply-textarea" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u56DE\u590D... (Enter \u53D1\u9001)"${ssrIncludeBooleanAttr(replying.value) ? " disabled" : ""} data-v-1dd04986${_scopeId}>${ssrInterpolate(replyContent.value)}</textarea><div class="reply-actions" data-v-1dd04986${_scopeId}><button class="btn-send"${ssrIncludeBooleanAttr(!replyContent.value.trim() || replying.value) ? " disabled" : ""} data-v-1dd04986${_scopeId}>${ssrInterpolate(replying.value ? "\u53D1\u9001\u4E2D..." : "\u53D1\u9001\u56DE\u590D")}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "modal-body" }, [
                createVNode(OrderInfoCard, {
                  order: orderDetail.value,
                  loading: loadingOrder.value
                }, null, 8, ["order", "loading"]),
                ticketDetail.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ticket-meta-glass"
                }, [
                  createVNode("div", { class: "meta-row" }, [
                    createVNode("span", { class: "label" }, "\u63D0\u4EA4\u65F6\u95F4:"),
                    createTextVNode(),
                    createVNode("span", { class: "val" }, toDisplayString(unref(formatDate)(ticketDetail.value.created_at)), 1)
                  ]),
                  createVNode("div", { class: "meta-row" }, [
                    createVNode("span", { class: "label" }, "\u5F53\u524D\u72B6\u6001:"),
                    createVNode("span", {
                      class: ["status-text", ticketDetail.value.status]
                    }, toDisplayString(ticketDetail.value.status === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3"), 3)
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "chat-container" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(replies.value, (reply, idx) => {
                    return openBlock(), createBlock("div", {
                      key: idx,
                      class: ["chat-message", reply.sender]
                    }, [
                      reply.sender === "admin" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "avatar admin"
                      }, "\u670D")) : createCommentVNode("", true),
                      createVNode("div", { class: "message-content-wrapper" }, [
                        createVNode("div", { class: "message-bubble" }, [
                          createVNode("div", { class: "msg-text" }, toDisplayString(reply.content), 1),
                          reply.attachments && reply.attachments.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "msg-attachments"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(reply.attachments, (url) => {
                              return openBlock(), createBlock(_component_el_image, {
                                key: url,
                                src: url,
                                class: "attachment-img",
                                "preview-src-list": reply.attachments,
                                "preview-teleported": "",
                                fit: "cover"
                              }, null, 8, ["src", "preview-src-list"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "message-time" }, toDisplayString(unref(formatDate)(reply.time)), 1)
                      ]),
                      reply.sender === "user" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "avatar user"
                      }, "\u6211")) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ]),
                ((_b = ticketDetail.value) == null ? void 0 : _b.status) === "processing" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "reply-area"
                }, [
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => replyContent.value = $event,
                    class: "reply-textarea",
                    placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u56DE\u590D... (Enter \u53D1\u9001)",
                    onKeydown: withKeys(withModifiers(submitReply, ["prevent"]), ["enter"]),
                    disabled: replying.value
                  }, null, 40, ["onUpdate:modelValue", "onKeydown", "disabled"]), [
                    [vModelText, replyContent.value]
                  ]),
                  createVNode("div", { class: "reply-actions" }, [
                    createVNode("button", {
                      class: "btn-send",
                      onClick: submitReply,
                      disabled: !replyContent.value.trim() || replying.value
                    }, toDisplayString(replying.value ? "\u53D1\u9001\u4E2D..." : "\u53D1\u9001\u56DE\u590D"), 9, ["disabled"])
                  ])
                ])) : createCommentVNode("", true)
              ])), [
                [_directive_loading, loading.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/business/TicketDetailModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TicketDetailModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1dd04986"]]);

export { TicketDetailModal as default };
//# sourceMappingURL=TicketDetailModal-BNniKnbR.mjs.map
