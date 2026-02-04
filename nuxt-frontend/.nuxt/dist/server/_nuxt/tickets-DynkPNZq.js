import { E as ElSkeleton, a as ElSkeletonItem } from "./index-qglB3PzO.js";
import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                          */
/* empty css                    */
import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, withDirectives, openBlock, createBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, createTextVNode, withKeys, withModifiers, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { t as ticketApi } from "./ticket-C7sv4DHi.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { s as service_default, x as delete_default } from "./index-CmsdIFY8.js";
import { B as BaseModal } from "./BaseModal-HTOTXfQj.js";
import { E as ElImage } from "./index-BhTf_yFC.js";
import { v as vLoading } from "./directive-D1M1s_ef.js";
/* empty css                         */
/* empty css                    */
import { c as clientOrderApi } from "./order-CRVwbgS6.js";
import { _ as _export_sfc, u as useRouter } from "../server.mjs";
import { B as BaseConfirmModal } from "./BaseConfirmModal-Dt3jVj8H.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-eYVppfk3.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./BaseButton-B3srPw2H.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./index-D2CY7Ok3.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-CO6H4Lsj.js";
import "./icon-eqoLCvNY.js";
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
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-body" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-c0de364c${_scopeId}>`);
            if (orderDetail.value) {
              _push2(`<div class="order-card-glass" data-v-c0de364c${_scopeId}><div class="card-image" data-v-c0de364c${_scopeId}><img${ssrRenderAttr("src", orderDetail.value.product_snapshot?.image)} alt="Product" data-v-c0de364c${_scopeId}></div><div class="card-info" data-v-c0de364c${_scopeId}><div class="info-top" data-v-c0de364c${_scopeId}><span class="order-no" data-v-c0de364c${_scopeId}>订单号 #${ssrInterpolate(orderDetail.value.order_no)}</span><span class="status-badge" data-v-c0de364c${_scopeId}>${ssrInterpolate(formatOrderStatus(orderDetail.value.status))}</span></div><div class="product-name" data-v-c0de364c${_scopeId}>${ssrInterpolate(orderDetail.value.product_snapshot?.product_name)}</div>`);
              if (orderDetail.value.sku_snapshot) {
                _push2(`<div class="specs" data-v-c0de364c${_scopeId}><!--[-->`);
                ssrRenderList(orderDetail.value.sku_snapshot.spec_combination, (val, key) => {
                  _push2(`<span data-v-c0de364c${_scopeId}>${ssrInterpolate(val)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="price-row" data-v-c0de364c${_scopeId}><span class="price" data-v-c0de364c${_scopeId}>¥${ssrInterpolate(orderDetail.value.total_amount?.toFixed(2))}</span><span class="quantity" data-v-c0de364c${_scopeId}>x${ssrInterpolate(orderDetail.value.quantity)}</span></div></div></div>`);
            } else if (loadingOrder.value) {
              _push2(`<div class="order-card-loading" data-v-c0de364c${_scopeId}><span class="loading-spinner" data-v-c0de364c${_scopeId}></span> 加载订单信息... </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (ticketDetail.value) {
              _push2(`<div class="ticket-meta-glass" data-v-c0de364c${_scopeId}><div class="meta-row" data-v-c0de364c${_scopeId}><span class="label" data-v-c0de364c${_scopeId}>提交时间:</span> <span class="val" data-v-c0de364c${_scopeId}>${ssrInterpolate(unref(formatDate)(ticketDetail.value.created_at))}</span></div><div class="meta-row" data-v-c0de364c${_scopeId}><span class="label" data-v-c0de364c${_scopeId}>当前状态:</span><span class="${ssrRenderClass(["status-text", ticketDetail.value.status])}" data-v-c0de364c${_scopeId}>${ssrInterpolate(ticketDetail.value.status === "processing" ? "处理中" : "已解决")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="chat-container" data-v-c0de364c${_scopeId}><!--[-->`);
            ssrRenderList(replies.value, (reply, idx) => {
              _push2(`<div class="${ssrRenderClass([reply.sender, "chat-message"])}" data-v-c0de364c${_scopeId}>`);
              if (reply.sender === "admin") {
                _push2(`<div class="avatar admin" data-v-c0de364c${_scopeId}>服</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="message-content-wrapper" data-v-c0de364c${_scopeId}><div class="message-bubble" data-v-c0de364c${_scopeId}><div class="msg-text" data-v-c0de364c${_scopeId}>${ssrInterpolate(reply.content)}</div>`);
              if (reply.attachments && reply.attachments.length) {
                _push2(`<div class="msg-attachments" data-v-c0de364c${_scopeId}><!--[-->`);
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
              _push2(`</div><div class="message-time" data-v-c0de364c${_scopeId}>${ssrInterpolate(unref(formatDate)(reply.time))}</div></div>`);
              if (reply.sender === "user") {
                _push2(`<div class="avatar user" data-v-c0de364c${_scopeId}>我</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (ticketDetail.value?.status === "processing") {
              _push2(`<div class="reply-area" data-v-c0de364c${_scopeId}><textarea class="reply-textarea" placeholder="请输入您的回复... (Enter 发送)"${ssrIncludeBooleanAttr(replying.value) ? " disabled" : ""} data-v-c0de364c${_scopeId}>${ssrInterpolate(replyContent.value)}</textarea><div class="reply-actions" data-v-c0de364c${_scopeId}><button class="btn-send"${ssrIncludeBooleanAttr(!replyContent.value.trim() || replying.value) ? " disabled" : ""} data-v-c0de364c${_scopeId}>${ssrInterpolate(replying.value ? "发送中..." : "发送回复")}</button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/business/TicketDetailModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TicketDetailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c0de364c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatDate } = useBizFormat();
    useRouter();
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
    const showDeleteModal = ref(false);
    const deleteTicketId = ref("");
    const deleteLoading = ref(false);
    const fetchTickets = async () => {
      loading.value = true;
      try {
        const res = await ticketApi.getList();
        if (res.success && res.data) {
          tickets2.value = res.data.map((t) => ({
            id: t.id,
            shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`,
            content: t.title,
            time: formatDate(t.created_at),
            orderId: t.orders?.order_no || "",
            productName: t.orders?.product_snapshot?.product_name || "",
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
    const confirmDelete = async () => {
      if (!deleteTicketId.value) return;
      deleteLoading.value = true;
      try {
        const res = await ticketApi.delete(deleteTicketId.value);
        if (res.success) {
          ElMessage.success("删除成功");
          showDeleteModal.value = false;
          fetchTickets();
        } else {
          ElMessage.error(res.error || "删除失败");
        }
      } catch (e) {
        ElMessage.error("删除异常");
      } finally {
        deleteLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><div class="tickets-section" data-v-0e47d7cf><div class="section-header" data-v-0e47d7cf><div class="header-left" data-v-0e47d7cf><h2 class="section-title" data-v-0e47d7cf>我的工单</h2><div class="section-subtitle" data-v-0e47d7cf>Support Tickets</div></div></div><div class="tickets-tabs" data-v-0e47d7cf><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-0e47d7cf>${ssrInterpolate(tab.label)} `);
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-0e47d7cf></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="tickets-list-container" data-v-0e47d7cf>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-0e47d7cf><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_el_skeleton, {
            animated: "",
            key: i,
            class: "skeleton-item"
          }, {
            template: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "padding": "20px" })}" data-v-0e47d7cf${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "circle",
                  style: { "width": "48px", "height": "48px" }
                }, null, _parent2, _scopeId));
                _push2(`<div style="${ssrRenderStyle({ "flex": "1" })}" data-v-0e47d7cf${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "h3",
                  style: { "width": "40%", "margin-bottom": "12px" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "80%" }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { style: { "display": "flex", "gap": "16px", "padding": "20px" } }, [
                    createVNode(_component_el_skeleton_item, {
                      variant: "circle",
                      style: { "width": "48px", "height": "48px" }
                    }),
                    createVNode("div", { style: { "flex": "1" } }, [
                      createVNode(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "40%", "margin-bottom": "12px" }
                      }),
                      createVNode(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "80%" }
                      })
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (filteredTickets.value.length === 0) {
        _push(`<div class="empty-state" data-v-0e47d7cf><div class="empty-icon-wrap" data-v-0e47d7cf>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
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
        _push(`</div><div class="empty-text" data-v-0e47d7cf>暂无工单</div><div class="empty-desc" data-v-0e47d7cf>您还没有提交过任何工单记录</div></div>`);
      } else {
        _push(`<div class="tickets-list" data-v-0e47d7cf><!--[-->`);
        ssrRenderList(filteredTickets.value, (ticket) => {
          _push(`<div class="${ssrRenderClass([ticket.statusClass, "ticket-card"])}" data-v-0e47d7cf><div class="${ssrRenderClass([ticket.statusClass, "ticket-icon"])}" data-v-0e47d7cf>`);
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
            _: 2
          }, _parent));
          _push(`</div><div class="ticket-content" data-v-0e47d7cf><div class="ticket-top" data-v-0e47d7cf><div class="ticket-title-row" data-v-0e47d7cf><span class="ticket-id" data-v-0e47d7cf>${ssrInterpolate(ticket.shortId)}</span><span class="${ssrRenderClass([ticket.statusClass, "status-tag"])}" data-v-0e47d7cf>${ssrInterpolate(ticket.statusText)}</span></div><span class="ticket-time" data-v-0e47d7cf>${ssrInterpolate(ticket.time)}</span></div><div class="ticket-body" data-v-0e47d7cf>${ssrInterpolate(ticket.content)}</div>`);
          if (ticket.productName) {
            _push(`<div class="ticket-meta" data-v-0e47d7cf> 关联: ${ssrInterpolate(ticket.productName)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="delete-action" data-v-0e47d7cf>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(delete_default))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(TicketDetailModal, {
        visible: showDetailModal.value,
        "onUpdate:visible": ($event) => showDetailModal.value = $event,
        "ticket-id": currentTicketId.value,
        onClose: ($event) => showDetailModal.value = false,
        onReplySuccess: fetchTickets
      }, null, _parent));
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showDeleteModal.value,
        "onUpdate:visible": ($event) => showDeleteModal.value = $event,
        title: "删除工单",
        message: "确定要删除这条工单记录吗？此操作无法撤销。",
        type: "danger",
        "confirm-text": "删除",
        loading: deleteLoading.value,
        onConfirm: confirmDelete
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tickets = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e47d7cf"]]);
export {
  tickets as default
};
//# sourceMappingURL=tickets-DynkPNZq.js.map
