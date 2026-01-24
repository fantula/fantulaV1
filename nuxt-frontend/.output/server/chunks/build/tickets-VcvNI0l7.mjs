import { _ as _export_sfc, E as ElIcon, aK as view_default, ad as BaseModal } from './server.mjs';
import { defineComponent, ref, computed, withCtx, unref, createVNode, watch, mergeProps, withDirectives, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, createTextVNode, withKeys, withModifiers, vModelText, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { t as ticketApi } from './ticket-C_WDl8fm.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { c as clientOrderApi } from './order-7ENcviEB.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-ClPmkyX9.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
    const formatOrderStatus = (status) => {
      const map = {
        "active": "\u4F7F\u7528\u4E2D",
        "completed": "\u5DF2\u5B8C\u6210",
        "pending": "\u5904\u7406\u4E2D",
        "expired": "\u5DF2\u8FC7\u671F",
        "refunding": "\u9000\u6B3E\u4E2D",
        "refunded": "\u5DF2\u9000\u6B3E"
      };
      return map[status] || status;
    };
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
      const _component_BaseModal = BaseModal;
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
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-body" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-3f3744a9${_scopeId}>`);
            if (orderDetail.value) {
              _push2(`<div class="order-card-glass" data-v-3f3744a9${_scopeId}><div class="card-image" data-v-3f3744a9${_scopeId}><img${ssrRenderAttr("src", (_a = orderDetail.value.product_snapshot) == null ? void 0 : _a.image)} alt="Product" data-v-3f3744a9${_scopeId}></div><div class="card-info" data-v-3f3744a9${_scopeId}><div class="info-top" data-v-3f3744a9${_scopeId}><span class="order-no" data-v-3f3744a9${_scopeId}>\u8BA2\u5355\u53F7 #${ssrInterpolate(orderDetail.value.order_no)}</span><span class="status-badge" data-v-3f3744a9${_scopeId}>${ssrInterpolate(formatOrderStatus(orderDetail.value.status))}</span></div><div class="product-name" data-v-3f3744a9${_scopeId}>${ssrInterpolate((_b = orderDetail.value.product_snapshot) == null ? void 0 : _b.product_name)}</div>`);
              if (orderDetail.value.sku_snapshot) {
                _push2(`<div class="specs" data-v-3f3744a9${_scopeId}><!--[-->`);
                ssrRenderList(orderDetail.value.sku_snapshot.spec_combination, (val, key) => {
                  _push2(`<span data-v-3f3744a9${_scopeId}>${ssrInterpolate(val)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="price-row" data-v-3f3744a9${_scopeId}><span class="price" data-v-3f3744a9${_scopeId}>\xA5${ssrInterpolate((_c = orderDetail.value.total_amount) == null ? void 0 : _c.toFixed(2))}</span><span class="quantity" data-v-3f3744a9${_scopeId}>x${ssrInterpolate(orderDetail.value.quantity)}</span></div></div></div>`);
            } else if (loadingOrder.value) {
              _push2(`<div class="order-card-loading" data-v-3f3744a9${_scopeId}><span class="loading-spinner" data-v-3f3744a9${_scopeId}></span> \u52A0\u8F7D\u8BA2\u5355\u4FE1\u606F... </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (ticketDetail.value) {
              _push2(`<div class="ticket-meta-glass" data-v-3f3744a9${_scopeId}><div class="meta-row" data-v-3f3744a9${_scopeId}><span class="label" data-v-3f3744a9${_scopeId}>\u63D0\u4EA4\u65F6\u95F4:</span> <span class="val" data-v-3f3744a9${_scopeId}>${ssrInterpolate(unref(formatDate)(ticketDetail.value.created_at))}</span></div><div class="meta-row" data-v-3f3744a9${_scopeId}><span class="label" data-v-3f3744a9${_scopeId}>\u5F53\u524D\u72B6\u6001:</span><span class="${ssrRenderClass(["status-text", ticketDetail.value.status])}" data-v-3f3744a9${_scopeId}>${ssrInterpolate(ticketDetail.value.status === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="chat-container" data-v-3f3744a9${_scopeId}><!--[-->`);
            ssrRenderList(replies.value, (reply, idx) => {
              _push2(`<div class="${ssrRenderClass([reply.sender, "chat-message"])}" data-v-3f3744a9${_scopeId}>`);
              if (reply.sender === "admin") {
                _push2(`<div class="avatar admin" data-v-3f3744a9${_scopeId}>\u670D</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="message-content-wrapper" data-v-3f3744a9${_scopeId}><div class="message-bubble" data-v-3f3744a9${_scopeId}><div class="msg-text" data-v-3f3744a9${_scopeId}>${ssrInterpolate(reply.content)}</div>`);
              if (reply.attachments && reply.attachments.length) {
                _push2(`<div class="msg-attachments" data-v-3f3744a9${_scopeId}><!--[-->`);
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
              _push2(`</div><div class="message-time" data-v-3f3744a9${_scopeId}>${ssrInterpolate(unref(formatDate)(reply.time))}</div></div>`);
              if (reply.sender === "user") {
                _push2(`<div class="avatar user" data-v-3f3744a9${_scopeId}>\u6211</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (((_d = ticketDetail.value) == null ? void 0 : _d.status) === "processing") {
              _push2(`<div class="reply-area" data-v-3f3744a9${_scopeId}><textarea class="reply-textarea" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u56DE\u590D... (Enter \u53D1\u9001)"${ssrIncludeBooleanAttr(replying.value) ? " disabled" : ""} data-v-3f3744a9${_scopeId}>${ssrInterpolate(replyContent.value)}</textarea><div class="reply-actions" data-v-3f3744a9${_scopeId}><button class="btn-send"${ssrIncludeBooleanAttr(!replyContent.value.trim() || replying.value) ? " disabled" : ""} data-v-3f3744a9${_scopeId}>${ssrInterpolate(replying.value ? "\u53D1\u9001\u4E2D..." : "\u53D1\u9001\u56DE\u590D")}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "modal-body" }, [
                orderDetail.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "order-card-glass"
                }, [
                  createVNode("div", { class: "card-image" }, [
                    createVNode("img", {
                      src: (_e = orderDetail.value.product_snapshot) == null ? void 0 : _e.image,
                      alt: "Product"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "card-info" }, [
                    createVNode("div", { class: "info-top" }, [
                      createVNode("span", { class: "order-no" }, "\u8BA2\u5355\u53F7 #" + toDisplayString(orderDetail.value.order_no), 1),
                      createVNode("span", { class: "status-badge" }, toDisplayString(formatOrderStatus(orderDetail.value.status)), 1)
                    ]),
                    createVNode("div", { class: "product-name" }, toDisplayString((_f = orderDetail.value.product_snapshot) == null ? void 0 : _f.product_name), 1),
                    orderDetail.value.sku_snapshot ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "specs"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(orderDetail.value.sku_snapshot.spec_combination, (val, key) => {
                        return openBlock(), createBlock("span", { key }, toDisplayString(val), 1);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "price-row" }, [
                      createVNode("span", { class: "price" }, "\xA5" + toDisplayString((_g = orderDetail.value.total_amount) == null ? void 0 : _g.toFixed(2)), 1),
                      createVNode("span", { class: "quantity" }, "x" + toDisplayString(orderDetail.value.quantity), 1)
                    ])
                  ])
                ])) : loadingOrder.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "order-card-loading"
                }, [
                  createVNode("span", { class: "loading-spinner" }),
                  createTextVNode(" \u52A0\u8F7D\u8BA2\u5355\u4FE1\u606F... ")
                ])) : createCommentVNode("", true),
                ticketDetail.value ? (openBlock(), createBlock("div", {
                  key: 2,
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
                ((_h = ticketDetail.value) == null ? void 0 : _h.status) === "processing" ? (openBlock(), createBlock("div", {
                  key: 3,
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/business/TicketDetailModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TicketDetailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3f3744a9"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatDate } = useBizFormat();
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "processing", label: "\u8FDB\u884C\u4E2D" },
      { key: "resolved", label: "\u5DF2\u89E3\u51B3" }
    ];
    const activeTab = ref("all");
    const loading = ref(false);
    const tickets2 = ref([]);
    const showDetailModal = ref(false);
    const currentTicketId = ref("");
    const fetchTickets = async () => {
      loading.value = true;
      try {
        const res = await ticketApi.getList();
        if (res.success && res.data) {
          tickets2.value = res.data.map((t) => {
            var _a, _b, _c;
            return {
              id: t.id,
              shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`,
              // Use real ticket_no if exists
              content: t.title,
              time: formatDate(t.created_at),
              orderId: ((_a = t.orders) == null ? void 0 : _a.order_no) || "",
              productName: ((_c = (_b = t.orders) == null ? void 0 : _b.product_snapshot) == null ? void 0 : _c.product_name) || "\u901A\u7528\u5DE5\u5355",
              status: t.status,
              statusText: t.status === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3",
              statusClass: t.status === "processing" ? "processing" : "resolved"
            };
          });
        }
      } catch (e) {
        console.error("Fetch tickets failed", e);
      } finally {
        loading.value = false;
      }
    };
    const filteredTickets = computed(() => {
      if (activeTab.value === "all") return tickets2.value;
      return tickets2.value.filter((ticket) => ticket.status === activeTab.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<!--[--><div class="tickets-section" data-v-476002a0><div class="section-header" data-v-476002a0><h2 class="section-title" data-v-476002a0>\u6211\u7684\u5DE5\u5355</h2></div><div class="tickets-tabs" data-v-476002a0><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: activeTab.value === tab.key }])}" data-v-476002a0>${ssrInterpolate(tab.label)}</div>`);
      });
      _push(`<!--]--></div><div class="tickets-list" data-v-476002a0><!--[-->`);
      ssrRenderList(filteredTickets.value, (ticket) => {
        _push(`<div class="${ssrRenderClass([ticket.statusClass, "ticket-card-glass"])}" data-v-476002a0><div class="card-header" data-v-476002a0><div class="header-left" data-v-476002a0><span class="ticket-id" data-v-476002a0>${ssrInterpolate(ticket.shortId)}</span><div class="${ssrRenderClass([ticket.statusClass, "ticket-status-badge"])}" data-v-476002a0>${ssrInterpolate(ticket.statusText)}</div></div><span class="ticket-time" data-v-476002a0>${ssrInterpolate(ticket.time)}</span></div><div class="card-body" data-v-476002a0><div class="ticket-content-text" data-v-476002a0>${ssrInterpolate(ticket.content)}</div>`);
        if (ticket.orderId) {
          _push(`<div class="ticket-meta-row" data-v-476002a0><span class="label" data-v-476002a0>\u5173\u8054\u4E1A\u52A1:</span><span class="product-name" data-v-476002a0>${ssrInterpolate(ticket.productName)}</span><span class="order-link" data-v-476002a0>\u8BA2\u5355 ${ssrInterpolate(ticket.orderId)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="card-actions" data-v-476002a0><button class="action-btn glass-btn" data-v-476002a0>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(view_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(view_default))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` \u67E5\u770B\u8BE6\u60C5 </button></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(TicketDetailModal, {
        visible: showDetailModal.value,
        "onUpdate:visible": ($event) => showDetailModal.value = $event,
        "ticket-id": currentTicketId.value,
        onClose: ($event) => showDetailModal.value = false,
        onReplySuccess: fetchTickets
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tickets = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-476002a0"]]);

export { tickets as default };
//# sourceMappingURL=tickets-VcvNI0l7.mjs.map
