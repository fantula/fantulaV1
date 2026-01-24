import { E as ElDialog } from "./index-CzosOSMt.js";
import { by as getAdminSupabaseClient, E as ElIcon, N as refresh_right_default, ag as check_default, bB as circle_check_filled_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElAvatar } from "./index-C2DKVZ9g.js";
import { E as ElEmpty } from "./index-DKY_z0U1.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
/* empty css                   */
/* empty css                    */
/* empty css                   */
/* empty css                */
/* empty css                   */
/* empty css                  */
/* empty css                         */
/* empty css                  */
/* empty css                        */
/* empty css                    */
import { defineComponent, computed, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, withDirectives, createBlock, openBlock, createCommentVNode, Fragment, renderList, withKeys, withModifiers, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { u as useBizConfig } from "./useBizConfig-DtWyKy4G.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
const adminTicketApi = {
  // 1. Get List
  async getList(params) {
    const client = getAdminSupabaseClient();
    const { page, pageSize, status } = params;
    let query = client.from("tickets").select("*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)", { count: "exact" }).order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    const { data, error, count } = await query;
    if (error) return { success: false, data: [], total: 0, error: error.message };
    return { success: true, data, total: count || 0 };
  },
  // 1.5 Get Detail
  async getDetail(ticketId) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("tickets").select("*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)").eq("id", ticketId).single();
    if (error) return { success: false, data: null, error: error.message };
    return { success: true, data };
  },
  // 2. Get Messages for a Ticket
  async getMessages(ticketId) {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("ticket_messages").select("*, profiles(email)").eq("ticket_id", ticketId).order("created_at", { ascending: true });
    if (error) return { success: false, data: [], error: error.message };
    return { success: true, data };
  },
  // 3. Admin Reply
  async reply(ticketId, content, attachments = []) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("ticket_messages").insert({
      ticket_id: ticketId,
      sender_id: null,
      // Null = System/Admin
      is_admin: true,
      content,
      message_type: attachments.length > 0 ? "image" : "text",
      attachments
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  // 4. Resolve Ticket
  async resolve(ticketId) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("tickets").update({ status: "resolved", resolved_at: /* @__PURE__ */ new Date(), updated_at: /* @__PURE__ */ new Date() }).eq("id", ticketId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  // 5. Cleanup Images (One-Click)
  async cleanupImages(daysOld = 7) {
    const client = getAdminSupabaseClient();
    const dateLimit = /* @__PURE__ */ new Date();
    dateLimit.setDate(dateLimit.getDate() - daysOld);
    const { data: tickets } = await client.from("tickets").select("id").eq("status", "resolved").lt("resolved_at", dateLimit.toISOString());
    if (!tickets || tickets.length === 0) return { success: true, count: 0 };
    const ticketIds = tickets.map((t) => t.id);
    const { data: messages } = await client.from("ticket_messages").select("id, attachments").in("ticket_id", ticketIds).not("attachments", "is", null);
    if (!messages || messages.length === 0) return { success: true, count: 0 };
    let deletedFilesCount = 0;
    const filesToDelete = [];
    messages.forEach((msg) => {
      if (Array.isArray(msg.attachments)) {
        msg.attachments.forEach((url) => {
          try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split("/tickets/");
            if (pathParts.length > 1) {
              filesToDelete.push(decodeURIComponent(pathParts[1]));
            }
          } catch (e) {
            filesToDelete.push(url);
          }
        });
      }
    });
    if (filesToDelete.length > 0) {
      const { data, error } = await client.storage.from("tickets").remove(filesToDelete);
      if (error) return { success: false, count: 0, error: error.message };
      deletedFilesCount = data?.length || 0;
    }
    return { success: true, count: deletedFilesCount };
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TicketChatModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    ticketId: {}
  },
  emits: ["update:modelValue", "closed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getTicketStatusLabel, getTicketStatusType } = useBizConfig();
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const loading = ref(false);
    const loaded = ref(false);
    const error = ref(null);
    const sending = ref(false);
    const resolving = ref(false);
    const messages = ref([]);
    const ticket = ref(null);
    const replyText = ref("");
    const chatBox = ref(null);
    const handleClose = () => {
      emit("closed");
    };
    const copyText = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("已复制");
    };
    const timeLeft = computed(() => {
      if (!ticket.value?.orders) return null;
      const order = ticket.value.orders;
      const expiryStr = order.expires_at || order.end_time;
      if (!expiryStr) return null;
      const expiry = new Date(expiryStr).getTime();
      const now = (/* @__PURE__ */ new Date()).getTime();
      const diff = expiry - now;
      if (diff <= 0) return "已过期";
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
      if (days > 0) return `${days}天 ${hours}小时`;
      return `${hours}小时`;
    });
    const formatTime = (isoString) => {
      return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    const isToday = (date) => {
      const today = /* @__PURE__ */ new Date();
      return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };
    const isYesterday = (date) => {
      const yesterday = /* @__PURE__ */ new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
    };
    const groupedMessages = computed(() => {
      const groups = {};
      messages.value.forEach((msg) => {
        const date = new Date(msg.created_at);
        const dateStr = isToday(date) ? "今天" : isYesterday(date) ? "昨天" : date.toLocaleDateString();
        if (!groups[dateStr]) groups[dateStr] = [];
        groups[dateStr].push(msg);
      });
      return groups;
    });
    const scrollToBottom = () => {
      nextTick(() => {
        if (chatBox.value) {
          chatBox.value.scrollTop = chatBox.value.scrollHeight + 200;
        }
      });
    };
    const loadData = async () => {
      if (!props.ticketId) return;
      loading.value = true;
      error.value = null;
      try {
        console.log("[TicketChatModal] Loading data for:", props.ticketId);
        const [resDetail, resMsgs] = await Promise.all([
          adminTicketApi.getDetail(props.ticketId),
          adminTicketApi.getMessages(props.ticketId)
        ]);
        if (resDetail.success) {
          ticket.value = resDetail.data;
          loaded.value = true;
        } else {
          throw new Error(resDetail.error || "工单详情加载失败");
        }
        if (resMsgs.success) {
          messages.value = resMsgs.data;
          scrollToBottom();
        } else {
          console.warn("[TicketChatModal] Messages load warning:", resMsgs.error);
        }
      } catch (e) {
        console.error("[TicketChatModal] Load Failed:", e);
        error.value = e.message || "加载失败，请重试";
        loaded.value = false;
      } finally {
        loading.value = false;
      }
    };
    const handleReply = async () => {
      if (!replyText.value.trim()) return;
      sending.value = true;
      try {
        const res = await adminTicketApi.reply(props.ticketId, replyText.value);
        if (res.success) {
          replyText.value = "";
          ElMessage.success("发送成功");
          const resMsgs = await adminTicketApi.getMessages(props.ticketId);
          if (resMsgs.success) {
            messages.value = resMsgs.data;
            scrollToBottom();
          }
        } else {
          ElMessage.error(res.error || "发送失败");
        }
      } catch (e) {
        ElMessage.error("系统错误");
      } finally {
        sending.value = false;
      }
    };
    const handleResolve = async () => {
      try {
        await ElMessageBox.confirm("确定要将此工单标记为已解决吗？用户将无法再回复。", "确认结单", {
          confirmButtonText: "确定结单",
          cancelButtonText: "取消",
          type: "warning"
        });
        resolving.value = true;
        const res = await adminTicketApi.resolve(props.ticketId);
        if (res.success) {
          ElMessage.success("工单已结单");
          await loadData();
        } else {
          ElMessage.error("操作失败");
        }
      } catch (e) {
      } finally {
        resolving.value = false;
      }
    };
    watch(() => props.modelValue, (val) => {
      if (val && props.ticketId) {
        messages.value = [];
        ticket.value = null;
        replyText.value = "";
        error.value = null;
        loaded.value = false;
        loadData();
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_icon = ElIcon;
      const _component_CircleCloseFilled = resolveComponent("CircleCloseFilled");
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_avatar = ElAvatar;
      const _component_el_empty = ElEmpty;
      const _component_el_image = ElImage;
      const _component_el_input = ElInput;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "工单详情与处理",
        width: "900px",
        class: "ticket-chat-modal",
        onClose: handleClose,
        "close-on-click-modal": false,
        "destroy-on-close": "",
        "append-to-body": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-layout" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-96458b2d${_scopeId}>`);
            if (error.value) {
              _push2(`<div class="flex flex-col items-center justify-center w-full h-full text-center" data-v-96458b2d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, {
                class: "text-red-500 mb-2",
                size: 40
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CircleCloseFilled, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CircleCloseFilled)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="text-gray-600 mb-4" data-v-96458b2d${_scopeId}>${ssrInterpolate(error.value)}</div>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: loadData
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, { class: "mr-1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(refresh_right_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(refresh_right_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` 重试 `);
                  } else {
                    return [
                      createVNode(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx(() => [
                          createVNode(unref(refresh_right_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" 重试 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (loaded.value) {
              _push2(`<!--[--><div class="layout-sidebar" data-v-96458b2d${_scopeId}><div class="info-block" data-v-96458b2d${_scopeId}><div class="label" data-v-96458b2d${_scopeId}>工单状态</div><div class="value" data-v-96458b2d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_tag, {
                type: unref(getTicketStatusType)(ticket.value?.status),
                effect: "dark",
                size: "large"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getTicketStatusLabel)(ticket.value?.status))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(getTicketStatusLabel)(ticket.value?.status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><div class="info-block" data-v-96458b2d${_scopeId}><div class="label" data-v-96458b2d${_scopeId}>提交用户</div><div class="user-card" data-v-96458b2d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_avatar, {
                size: 32,
                class: "user-avatar"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(ticket.value?.user_id?.substring(0, 2).toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(ticket.value?.user_id?.substring(0, 2).toUpperCase()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="user-details" data-v-96458b2d${_scopeId}><div class="uid" data-v-96458b2d${_scopeId}>UID: ${ssrInterpolate(ticket.value?.user_id?.substring(0, 8).toUpperCase())}</div>`);
              if (ticket.value?.profiles?.email) {
                _push2(`<div class="email" data-v-96458b2d${_scopeId}>${ssrInterpolate(ticket.value.profiles.email)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (ticket.value?.orders) {
                _push2(`<div class="info-block" data-v-96458b2d${_scopeId}><div class="label" data-v-96458b2d${_scopeId}>关联订单快照</div><div class="order-card-large" data-v-96458b2d${_scopeId}><img${ssrRenderAttr("src", ticket.value.orders.product_snapshot?.image)} class="order-img-large" data-v-96458b2d${_scopeId}><div class="order-details-rows" data-v-96458b2d${_scopeId}><div class="detail-row" data-v-96458b2d${_scopeId}><span class="row-label" data-v-96458b2d${_scopeId}>订单号</span><span class="row-value font-mono copyable" data-v-96458b2d${_scopeId}>${ssrInterpolate(ticket.value.orders.order_no)}</span></div><div class="detail-row" data-v-96458b2d${_scopeId}><span class="row-label" data-v-96458b2d${_scopeId}>商品</span><span class="row-value"${ssrRenderAttr("title", ticket.value.orders.product_snapshot?.product_name)} data-v-96458b2d${_scopeId}>${ssrInterpolate(ticket.value.orders.product_snapshot?.product_name)}</span></div>`);
                if (ticket.value.orders.sku_snapshot?.spec_combination) {
                  _push2(`<div class="detail-row" data-v-96458b2d${_scopeId}><span class="row-label" data-v-96458b2d${_scopeId}>规格</span><span class="row-value spec-tag" data-v-96458b2d${_scopeId}>${ssrInterpolate(Object.values(ticket.value.orders.sku_snapshot.spec_combination).join(" / "))}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="detail-row" data-v-96458b2d${_scopeId}><span class="row-label" data-v-96458b2d${_scopeId}>金额</span><span class="row-value price" data-v-96458b2d${_scopeId}>¥${ssrInterpolate(ticket.value.orders.total_amount?.toFixed(2))}</span></div>`);
                if (timeLeft.value) {
                  _push2(`<div class="detail-row bg-blue-50 p-2 rounded mt-2 border border-blue-100" data-v-96458b2d${_scopeId}><span class="row-label text-blue-600" data-v-96458b2d${_scopeId}>剩余时间</span><span class="row-value font-bold text-blue-700" data-v-96458b2d${_scopeId}>${ssrInterpolate(timeLeft.value)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="info-block" data-v-96458b2d${_scopeId}><div class="label" data-v-96458b2d${_scopeId}>创建时间</div><div class="value text-gray-500 text-sm" data-v-96458b2d${_scopeId}>${ssrInterpolate(ticket.value ? new Date(ticket.value.created_at).toLocaleString() : "-")}</div></div></div><div class="layout-main" data-v-96458b2d${_scopeId}><div class="chat-container custom-scrollbar" data-v-96458b2d${_scopeId}>`);
              if (messages.value.length === 0) {
                _push2(`<div class="empty-chat" data-v-96458b2d${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_empty, {
                  description: "暂无沟通记录",
                  "image-size": 60
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(groupedMessages.value, (group, date) => {
                _push2(`<div data-v-96458b2d${_scopeId}><div class="date-divider" data-v-96458b2d${_scopeId}><span data-v-96458b2d${_scopeId}>${ssrInterpolate(date)}</span></div><!--[-->`);
                ssrRenderList(group, (msg) => {
                  _push2(`<div class="${ssrRenderClass([{ "is-admin": msg.is_admin }, "message-row"])}" data-v-96458b2d${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_avatar, {
                    size: 32,
                    class: msg.is_admin ? "avatar-admin" : "avatar-user"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(msg.is_admin ? "服" : "客")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(msg.is_admin ? "服" : "客"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<div class="message-content" data-v-96458b2d${_scopeId}><div class="bubble" data-v-96458b2d${_scopeId}>${ssrInterpolate(msg.content)}</div><div class="meta" data-v-96458b2d${_scopeId}><span data-v-96458b2d${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div>`);
                  if (msg.attachments?.length) {
                    _push2(`<div class="attachments" data-v-96458b2d${_scopeId}><!--[-->`);
                    ssrRenderList(msg.attachments, (url) => {
                      _push2(ssrRenderComponent(_component_el_image, {
                        key: url,
                        src: url,
                        class: "attachment-img",
                        "preview-src-list": msg.attachments,
                        "preview-teleported": "",
                        fit: "cover"
                      }, null, _parent2, _scopeId));
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]--></div><div class="chat-footer" data-v-96458b2d${_scopeId}>`);
              if (ticket.value?.status !== "processing" && ticket.value?.status !== "resolved") {
                _push2(`<div class="text-xs text-red-400 text-center mb-2" data-v-96458b2d${_scopeId}> 当前状态异常: ${ssrInterpolate(ticket.value?.status)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (ticket.value?.status === "processing") {
                _push2(`<div class="action-area" data-v-96458b2d${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: replyText.value,
                  "onUpdate:modelValue": ($event) => replyText.value = $event,
                  type: "textarea",
                  rows: 3,
                  resize: "none",
                  placeholder: "请输入回复内容 (Cmd/Ctrl + Enter 发送)",
                  onKeydown: [handleReply, handleReply]
                }, null, _parent2, _scopeId));
                _push2(`<div class="footer-buttons" data-v-96458b2d${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "success",
                  plain: "",
                  onClick: handleResolve,
                  loading: resolving.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(check_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(check_default))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(` 标记已解决 `);
                    } else {
                      return [
                        createVNode(_component_el_icon, { class: "mr-1" }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" 标记已解决 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  onClick: handleReply,
                  loading: sending.value,
                  disabled: !replyText.value.trim()
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` 发送回复 `);
                    } else {
                      return [
                        createTextVNode(" 发送回复 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else if (ticket.value?.status === "resolved") {
                _push2(`<div class="resolved-banner" data-v-96458b2d${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, { class: "text-green-500 mr-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(circle_check_filled_default))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(` 工单已结单，无法继续回复 </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "modal-layout" }, [
                error.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-col items-center justify-center w-full h-full text-center"
                }, [
                  createVNode(_component_el_icon, {
                    class: "text-red-500 mb-2",
                    size: 40
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CircleCloseFilled)
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "text-gray-600 mb-4" }, toDisplayString(error.value), 1),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: loadData
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx(() => [
                          createVNode(unref(refresh_right_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" 重试 ")
                    ]),
                    _: 1
                  })
                ])) : loaded.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "layout-sidebar" }, [
                    createVNode("div", { class: "info-block" }, [
                      createVNode("div", { class: "label" }, "工单状态"),
                      createVNode("div", { class: "value" }, [
                        createVNode(_component_el_tag, {
                          type: unref(getTicketStatusType)(ticket.value?.status),
                          effect: "dark",
                          size: "large"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(getTicketStatusLabel)(ticket.value?.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["type"])
                      ])
                    ]),
                    createVNode("div", { class: "info-block" }, [
                      createVNode("div", { class: "label" }, "提交用户"),
                      createVNode("div", { class: "user-card" }, [
                        createVNode(_component_el_avatar, {
                          size: 32,
                          class: "user-avatar"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(ticket.value?.user_id?.substring(0, 2).toUpperCase()), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "user-details" }, [
                          createVNode("div", { class: "uid" }, "UID: " + toDisplayString(ticket.value?.user_id?.substring(0, 8).toUpperCase()), 1),
                          ticket.value?.profiles?.email ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "email"
                          }, toDisplayString(ticket.value.profiles.email), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    ticket.value?.orders ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "info-block"
                    }, [
                      createVNode("div", { class: "label" }, "关联订单快照"),
                      createVNode("div", { class: "order-card-large" }, [
                        createVNode("img", {
                          src: ticket.value.orders.product_snapshot?.image,
                          class: "order-img-large"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "order-details-rows" }, [
                          createVNode("div", { class: "detail-row" }, [
                            createVNode("span", { class: "row-label" }, "订单号"),
                            createVNode("span", {
                              class: "row-value font-mono copyable",
                              onClick: ($event) => copyText(ticket.value.orders.order_no)
                            }, toDisplayString(ticket.value.orders.order_no), 9, ["onClick"])
                          ]),
                          createVNode("div", { class: "detail-row" }, [
                            createVNode("span", { class: "row-label" }, "商品"),
                            createVNode("span", {
                              class: "row-value",
                              title: ticket.value.orders.product_snapshot?.product_name
                            }, toDisplayString(ticket.value.orders.product_snapshot?.product_name), 9, ["title"])
                          ]),
                          ticket.value.orders.sku_snapshot?.spec_combination ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "detail-row"
                          }, [
                            createVNode("span", { class: "row-label" }, "规格"),
                            createVNode("span", { class: "row-value spec-tag" }, toDisplayString(Object.values(ticket.value.orders.sku_snapshot.spec_combination).join(" / ")), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "detail-row" }, [
                            createVNode("span", { class: "row-label" }, "金额"),
                            createVNode("span", { class: "row-value price" }, "¥" + toDisplayString(ticket.value.orders.total_amount?.toFixed(2)), 1)
                          ]),
                          timeLeft.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "detail-row bg-blue-50 p-2 rounded mt-2 border border-blue-100"
                          }, [
                            createVNode("span", { class: "row-label text-blue-600" }, "剩余时间"),
                            createVNode("span", { class: "row-value font-bold text-blue-700" }, toDisplayString(timeLeft.value), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "info-block" }, [
                      createVNode("div", { class: "label" }, "创建时间"),
                      createVNode("div", { class: "value text-gray-500 text-sm" }, toDisplayString(ticket.value ? new Date(ticket.value.created_at).toLocaleString() : "-"), 1)
                    ])
                  ]),
                  createVNode("div", { class: "layout-main" }, [
                    createVNode("div", {
                      class: "chat-container custom-scrollbar",
                      ref_key: "chatBox",
                      ref: chatBox
                    }, [
                      messages.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "empty-chat"
                      }, [
                        createVNode(_component_el_empty, {
                          description: "暂无沟通记录",
                          "image-size": 60
                        })
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(groupedMessages.value, (group, date) => {
                        return openBlock(), createBlock("div", { key: date }, [
                          createVNode("div", { class: "date-divider" }, [
                            createVNode("span", null, toDisplayString(date), 1)
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(group, (msg) => {
                            return openBlock(), createBlock("div", {
                              key: msg.id,
                              class: ["message-row", { "is-admin": msg.is_admin }]
                            }, [
                              createVNode(_component_el_avatar, {
                                size: 32,
                                class: msg.is_admin ? "avatar-admin" : "avatar-user"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(msg.is_admin ? "服" : "客"), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"]),
                              createVNode("div", { class: "message-content" }, [
                                createVNode("div", { class: "bubble" }, toDisplayString(msg.content), 1),
                                createVNode("div", { class: "meta" }, [
                                  createVNode("span", null, toDisplayString(formatTime(msg.created_at)), 1)
                                ]),
                                msg.attachments?.length ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "attachments"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(msg.attachments, (url) => {
                                    return openBlock(), createBlock(_component_el_image, {
                                      key: url,
                                      src: url,
                                      class: "attachment-img",
                                      "preview-src-list": msg.attachments,
                                      "preview-teleported": "",
                                      fit: "cover"
                                    }, null, 8, ["src", "preview-src-list"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ])
                            ], 2);
                          }), 128))
                        ]);
                      }), 128))
                    ], 512),
                    createVNode("div", { class: "chat-footer" }, [
                      ticket.value?.status !== "processing" && ticket.value?.status !== "resolved" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-red-400 text-center mb-2"
                      }, " 当前状态异常: " + toDisplayString(ticket.value?.status), 1)) : createCommentVNode("", true),
                      ticket.value?.status === "processing" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "action-area"
                      }, [
                        createVNode(_component_el_input, {
                          modelValue: replyText.value,
                          "onUpdate:modelValue": ($event) => replyText.value = $event,
                          type: "textarea",
                          rows: 3,
                          resize: "none",
                          placeholder: "请输入回复内容 (Cmd/Ctrl + Enter 发送)",
                          onKeydown: [
                            withKeys(withModifiers(handleReply, ["meta"]), ["enter"]),
                            withKeys(withModifiers(handleReply, ["ctrl"]), ["enter"])
                          ]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"]),
                        createVNode("div", { class: "footer-buttons" }, [
                          createVNode(_component_el_button, {
                            type: "success",
                            plain: "",
                            onClick: handleResolve,
                            loading: resolving.value
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, { class: "mr-1" }, {
                                default: withCtx(() => [
                                  createVNode(unref(check_default))
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 标记已解决 ")
                            ]),
                            _: 1
                          }, 8, ["loading"]),
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: handleReply,
                            loading: sending.value,
                            disabled: !replyText.value.trim()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 发送回复 ")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ])
                      ])) : ticket.value?.status === "resolved" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "resolved-banner"
                      }, [
                        createVNode(_component_el_icon, { class: "text-green-500 mr-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(circle_check_filled_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" 工单已结单，无法继续回复 ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/tickets/components/TicketChatModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TicketChatModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96458b2d"]]);
const TicketChatModal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TicketChatModal
}, Symbol.toStringTag, { value: "Module" }));
export {
  TicketChatModal as T,
  adminTicketApi as a,
  TicketChatModal$1 as b
};
//# sourceMappingURL=TicketChatModal-DW4iUsSW.js.map
