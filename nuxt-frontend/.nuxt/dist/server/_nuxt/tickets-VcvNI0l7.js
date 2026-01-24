import { ad as BaseModal, _ as _export_sfc, E as ElIcon, aK as view_default } from "../server.mjs";
import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, withDirectives, createBlock, openBlock, createCommentVNode, createVNode, toDisplayString, Fragment, renderList, createTextVNode, withKeys, withModifiers, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { t as ticketApi } from "./ticket-C_WDl8fm.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
/* empty css                         */
/* empty css                    */
import { c as clientOrderApi } from "./order-7ENcviEB.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./index-ClPmkyX9.js";
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
      if (ticketDetail.value?.ticket_no) return ticketDetail.value.ticket_no;
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
        "active": "使用中",
        "completed": "已完成",
        "pending": "处理中",
        "expired": "已过期",
        "refunding": "退款中",
        "refunded": "已退款"
      };
      return map[status] || status;
    };
    const loadData = async () => {
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
          const orderId = res.data.orders?.id;
          if (res.data.orders?.id) {
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
        title: `工单详情 ${currentTicketNo.value}`,
        width: "700px",
        "show-footer": false,
        "show-mascot": "",
        "mascot-position": "right",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-body" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-3f3744a9${_scopeId}>`);
            if (orderDetail.value) {
              _push2(`<div class="order-card-glass" data-v-3f3744a9${_scopeId}><div class="card-image" data-v-3f3744a9${_scopeId}><img${ssrRenderAttr("src", orderDetail.value.product_snapshot?.image)} alt="Product" data-v-3f3744a9${_scopeId}></div><div class="card-info" data-v-3f3744a9${_scopeId}><div class="info-top" data-v-3f3744a9${_scopeId}><span class="order-no" data-v-3f3744a9${_scopeId}>订单号 #${ssrInterpolate(orderDetail.value.order_no)}</span><span class="status-badge" data-v-3f3744a9${_scopeId}>${ssrInterpolate(formatOrderStatus(orderDetail.value.status))}</span></div><div class="product-name" data-v-3f3744a9${_scopeId}>${ssrInterpolate(orderDetail.value.product_snapshot?.product_name)}</div>`);
              if (orderDetail.value.sku_snapshot) {
                _push2(`<div class="specs" data-v-3f3744a9${_scopeId}><!--[-->`);
                ssrRenderList(orderDetail.value.sku_snapshot.spec_combination, (val, key) => {
                  _push2(`<span data-v-3f3744a9${_scopeId}>${ssrInterpolate(val)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="price-row" data-v-3f3744a9${_scopeId}><span class="price" data-v-3f3744a9${_scopeId}>¥${ssrInterpolate(orderDetail.value.total_amount?.toFixed(2))}</span><span class="quantity" data-v-3f3744a9${_scopeId}>x${ssrInterpolate(orderDetail.value.quantity)}</span></div></div></div>`);
            } else if (loadingOrder.value) {
              _push2(`<div class="order-card-loading" data-v-3f3744a9${_scopeId}><span class="loading-spinner" data-v-3f3744a9${_scopeId}></span> 加载订单信息... </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (ticketDetail.value) {
              _push2(`<div class="ticket-meta-glass" data-v-3f3744a9${_scopeId}><div class="meta-row" data-v-3f3744a9${_scopeId}><span class="label" data-v-3f3744a9${_scopeId}>提交时间:</span> <span class="val" data-v-3f3744a9${_scopeId}>${ssrInterpolate(unref(formatDate)(ticketDetail.value.created_at))}</span></div><div class="meta-row" data-v-3f3744a9${_scopeId}><span class="label" data-v-3f3744a9${_scopeId}>当前状态:</span><span class="${ssrRenderClass(["status-text", ticketDetail.value.status])}" data-v-3f3744a9${_scopeId}>${ssrInterpolate(ticketDetail.value.status === "processing" ? "处理中" : "已解决")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="chat-container" data-v-3f3744a9${_scopeId}><!--[-->`);
            ssrRenderList(replies.value, (reply, idx) => {
              _push2(`<div class="${ssrRenderClass([reply.sender, "chat-message"])}" data-v-3f3744a9${_scopeId}>`);
              if (reply.sender === "admin") {
                _push2(`<div class="avatar admin" data-v-3f3744a9${_scopeId}>服</div>`);
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
                _push2(`<div class="avatar user" data-v-3f3744a9${_scopeId}>我</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (ticketDetail.value?.status === "processing") {
              _push2(`<div class="reply-area" data-v-3f3744a9${_scopeId}><textarea class="reply-textarea" placeholder="请输入您的回复... (Enter 发送)"${ssrIncludeBooleanAttr(replying.value) ? " disabled" : ""} data-v-3f3744a9${_scopeId}>${ssrInterpolate(replyContent.value)}</textarea><div class="reply-actions" data-v-3f3744a9${_scopeId}><button class="btn-send"${ssrIncludeBooleanAttr(!replyContent.value.trim() || replying.value) ? " disabled" : ""} data-v-3f3744a9${_scopeId}>${ssrInterpolate(replying.value ? "发送中..." : "发送回复")}</button></div></div>`);
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
                      src: orderDetail.value.product_snapshot?.image,
                      alt: "Product"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "card-info" }, [
                    createVNode("div", { class: "info-top" }, [
                      createVNode("span", { class: "order-no" }, "订单号 #" + toDisplayString(orderDetail.value.order_no), 1),
                      createVNode("span", { class: "status-badge" }, toDisplayString(formatOrderStatus(orderDetail.value.status)), 1)
                    ]),
                    createVNode("div", { class: "product-name" }, toDisplayString(orderDetail.value.product_snapshot?.product_name), 1),
                    orderDetail.value.sku_snapshot ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "specs"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(orderDetail.value.sku_snapshot.spec_combination, (val, key) => {
                        return openBlock(), createBlock("span", { key }, toDisplayString(val), 1);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "price-row" }, [
                      createVNode("span", { class: "price" }, "¥" + toDisplayString(orderDetail.value.total_amount?.toFixed(2)), 1),
                      createVNode("span", { class: "quantity" }, "x" + toDisplayString(orderDetail.value.quantity), 1)
                    ])
                  ])
                ])) : loadingOrder.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "order-card-loading"
                }, [
                  createVNode("span", { class: "loading-spinner" }),
                  createTextVNode(" 加载订单信息... ")
                ])) : createCommentVNode("", true),
                ticketDetail.value ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "ticket-meta-glass"
                }, [
                  createVNode("div", { class: "meta-row" }, [
                    createVNode("span", { class: "label" }, "提交时间:"),
                    createTextVNode(),
                    createVNode("span", { class: "val" }, toDisplayString(unref(formatDate)(ticketDetail.value.created_at)), 1)
                  ]),
                  createVNode("div", { class: "meta-row" }, [
                    createVNode("span", { class: "label" }, "当前状态:"),
                    createVNode("span", {
                      class: ["status-text", ticketDetail.value.status]
                    }, toDisplayString(ticketDetail.value.status === "processing" ? "处理中" : "已解决"), 3)
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
                      }, "服")) : createCommentVNode("", true),
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
                      }, "我")) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ]),
                ticketDetail.value?.status === "processing" ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "reply-area"
                }, [
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => replyContent.value = $event,
                    class: "reply-textarea",
                    placeholder: "请输入您的回复... (Enter 发送)",
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
                    }, toDisplayString(replying.value ? "发送中..." : "发送回复"), 9, ["disabled"])
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
      { key: "all", label: "全部" },
      { key: "processing", label: "进行中" },
      { key: "resolved", label: "已解决" }
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
          tickets2.value = res.data.map((t) => ({
            id: t.id,
            shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`,
            // Use real ticket_no if exists
            content: t.title,
            time: formatDate(t.created_at),
            orderId: t.orders?.order_no || "",
            productName: t.orders?.product_snapshot?.product_name || "通用工单",
            status: t.status,
            statusText: t.status === "processing" ? "处理中" : "已解决",
            statusClass: t.status === "processing" ? "processing" : "resolved"
          }));
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
      _push(`<!--[--><div class="tickets-section" data-v-476002a0><div class="section-header" data-v-476002a0><h2 class="section-title" data-v-476002a0>我的工单</h2></div><div class="tickets-tabs" data-v-476002a0><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: activeTab.value === tab.key }])}" data-v-476002a0>${ssrInterpolate(tab.label)}</div>`);
      });
      _push(`<!--]--></div><div class="tickets-list" data-v-476002a0><!--[-->`);
      ssrRenderList(filteredTickets.value, (ticket) => {
        _push(`<div class="${ssrRenderClass([ticket.statusClass, "ticket-card-glass"])}" data-v-476002a0><div class="card-header" data-v-476002a0><div class="header-left" data-v-476002a0><span class="ticket-id" data-v-476002a0>${ssrInterpolate(ticket.shortId)}</span><div class="${ssrRenderClass([ticket.statusClass, "ticket-status-badge"])}" data-v-476002a0>${ssrInterpolate(ticket.statusText)}</div></div><span class="ticket-time" data-v-476002a0>${ssrInterpolate(ticket.time)}</span></div><div class="card-body" data-v-476002a0><div class="ticket-content-text" data-v-476002a0>${ssrInterpolate(ticket.content)}</div>`);
        if (ticket.orderId) {
          _push(`<div class="ticket-meta-row" data-v-476002a0><span class="label" data-v-476002a0>关联业务:</span><span class="product-name" data-v-476002a0>${ssrInterpolate(ticket.productName)}</span><span class="order-link" data-v-476002a0>订单 ${ssrInterpolate(ticket.orderId)}</span></div>`);
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
        _push(` 查看详情 </button></div></div>`);
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
export {
  tickets as default
};
//# sourceMappingURL=tickets-VcvNI0l7.js.map
