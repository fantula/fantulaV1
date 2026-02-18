import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElEmpty } from "./index-BRSsuUkY.js";
import { E as ElAvatar } from "./index-C3_NoBue.js";
import { E as ElImage } from "./index-BSYGfCfY.js";
import { E as ElInput } from "./index-BeH2PDwZ.js";
import { v as vLoading } from "./directive-BHLqqXUb.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                */
/* empty css                  */
/* empty css                   */
/* empty css                         */
/* empty css                  */
/* empty css                    */
/* empty css                        */
/* empty css                    */
/* empty css                    */
import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, watch, resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, openBlock, createBlock, Fragment, createCommentVNode, renderList, withKeys, withModifiers, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { a as adminTicketApi } from "./ticket-D0g-SEGL.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { a as confirmAction } from "./useAdminDialog-LVLqZ-7L.js";
import { n as refresh_right_default, b as close_default, ad as picture_default, I as check_default, h as circle_check_filled_default } from "./index-DNnPa_Q9.js";
import { uploadImageToStorage } from "./uploadImage-BNZa78ds.js";
import { A as AdminDataDialog } from "./AdminDataDialog-C7G4EUwl.js";
import { A as AdminUserCell } from "./AdminUserCell-C2sgweQM.js";
import { useClipboard } from "@vueuse/core";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "./use-global-config-C5kRDPtv.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-Cxdfotkm.js";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./vnode-uc6o_sOa.js";
import "./typescript-D6L75muK.js";
import "./index-BrJcxSwt.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./index-DuyRWKSc.js";
import "./event-BZTOGHfp.js";
import "./supabase-F2pQZHm6.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./index-VfPbkY7T.js";
import "./index-IoXmILvB.js";
import "./validator-BZYOvvAA.js";
import "./index-BYF0U8gS.js";
import "./refs-CxYYXu5Q.js";
/* empty css                   */
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderSnapshotCard",
  __ssrInlineRender: true,
  props: {
    order: {},
    compact: { type: Boolean, default: false },
    defaultImage: { default: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }
  },
  setup(__props) {
    const props = __props;
    const { copy: copyText } = useClipboard();
    const { formatPrice, formatRemainingTime } = useBizFormat();
    const formatSpecs = (specs) => {
      if (!specs) return "";
      return Object.values(specs).join(" / ");
    };
    const timeLeft = computed(() => {
      const expiry = props.order?.expires_at || props.order?.end_time;
      return formatRemainingTime(expiry);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["order-snapshot-card", { "is-compact": __props.compact }]
      }, _attrs))} data-v-76bac7c6><img${ssrRenderAttr("src", __props.order?.product_snapshot?.image || __props.defaultImage)} class="product-img" data-v-76bac7c6><div class="order-info" data-v-76bac7c6><div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>订单号</span><span class="value mono copyable" data-v-76bac7c6>${ssrInterpolate(__props.order.order_no)}</span></div><div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>商品</span><span class="value truncate"${ssrRenderAttr("title", __props.order?.product_snapshot?.product_name)} data-v-76bac7c6>${ssrInterpolate(__props.order?.product_snapshot?.product_name || "未知商品")}</span></div>`);
      if (__props.order?.sku_snapshot?.spec_combination) {
        _push(`<div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>规格</span><span class="value spec-tag" data-v-76bac7c6>${ssrInterpolate(formatSpecs(__props.order.sku_snapshot.spec_combination))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>金额</span><span class="value price" data-v-76bac7c6>¥${ssrInterpolate(unref(formatPrice)(__props.order.total_amount || __props.order.amount))}</span></div>`);
      if (timeLeft.value && timeLeft.value !== "已过期") {
        _push(`<div class="time-left-box" data-v-76bac7c6><span class="time-label" data-v-76bac7c6>剩余时间</span><span class="time-value" data-v-76bac7c6>${ssrInterpolate(timeLeft.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/OrderSnapshotCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const OrderSnapshotCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-76bac7c6"]]);
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
    const fileInput = ref(null);
    const isUploading = ref(false);
    const pendingAttachments = ref([]);
    const handleClose = () => {
      emit("closed");
    };
    computed(() => {
      return null;
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
        }
      } catch (e) {
        error.value = e.message || "加载失败，请重试";
        loaded.value = false;
      } finally {
        loading.value = false;
      }
    };
    const triggerUpload = () => {
      fileInput.value?.click();
    };
    const handleFileSelect = async (event) => {
      const input = event.target;
      if (!input.files || input.files.length === 0) return;
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        ElMessage.warning("图片大小不能超过 5MB");
        input.value = "";
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        ElMessage.warning("只支持 JPG, PNG, GIF 格式");
        input.value = "";
        return;
      }
      isUploading.value = true;
      try {
        const { getAuthToken } = await import("./supabase-F2pQZHm6.js");
        const token = await getAuthToken();
        if (!token) {
          ElMessage.error("请登录");
          isUploading.value = false;
          return;
        }
        const res = await uploadImageToStorage(file, "tickets", void 0, token);
        if (res.success && res.url) {
          pendingAttachments.value.push(res.url);
        } else {
          ElMessage.error(res.error || "上传失败");
        }
      } catch (e) {
        ElMessage.error("上传出错");
      } finally {
        isUploading.value = false;
        input.value = "";
      }
    };
    const removeAttachment = (index) => {
      pendingAttachments.value.splice(index, 1);
    };
    const handleReply = async () => {
      if (!replyText.value.trim() && pendingAttachments.value.length === 0) return;
      sending.value = true;
      try {
        const res = await adminTicketApi.reply(props.ticketId, replyText.value, pendingAttachments.value);
        if (res.success) {
          replyText.value = "";
          pendingAttachments.value = [];
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
      const success = await confirmAction(
        "确定要将此工单标记为已解决吗？用户将无法再回复。",
        async () => {
          resolving.value = true;
          try {
            const res = await adminTicketApi.resolve(props.ticketId);
            return res;
          } finally {
            resolving.value = false;
          }
        },
        {
          title: "确认结单",
          confirmText: "确定结单",
          type: "warning",
          successMessage: "工单已结单"
        }
      );
      if (success) {
        await loadData();
      }
    };
    watch(() => props.modelValue, (val) => {
      if (val && props.ticketId) {
        messages.value = [];
        ticket.value = null;
        replyText.value = "";
        pendingAttachments.value = [];
        error.value = null;
        loaded.value = false;
        loadData();
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_CircleCloseFilled = resolveComponent("CircleCloseFilled");
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_empty = ElEmpty;
      const _component_el_avatar = ElAvatar;
      const _component_el_image = ElImage;
      const _component_el_input = ElInput;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(AdminDataDialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "工单详情与处理",
        width: "900px",
        class: "ticket-chat-modal",
        onClosed: handleClose,
        "close-on-click-modal": false,
        "destroy-on-close": "",
        "append-to-body": "",
        "show-footer": false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-layout" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-d164d7b9${_scopeId}>`);
            if (error.value) {
              _push2(`<div class="flex flex-col items-center justify-center w-full h-full text-center" data-v-d164d7b9${_scopeId}>`);
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
              _push2(`<div class="text-gray-600 mb-4" data-v-d164d7b9${_scopeId}>${ssrInterpolate(error.value)}</div>`);
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
              _push2(`<!--[--><div class="layout-sidebar" data-v-d164d7b9${_scopeId}><div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>工单状态</div><div class="value" data-v-d164d7b9${_scopeId}>`);
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
              _push2(`</div></div><div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>提交用户</div><div class="user-card" data-v-d164d7b9${_scopeId}>`);
              _push2(ssrRenderComponent(AdminUserCell, {
                uid: ticket.value?.user_id,
                email: ticket.value?.profiles?.email
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (ticket.value?.orders) {
                _push2(`<div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>关联订单快照</div>`);
                _push2(ssrRenderComponent(OrderSnapshotCard, {
                  order: ticket.value.orders
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>创建时间</div><div class="value text-gray-500 text-sm" data-v-d164d7b9${_scopeId}>${ssrInterpolate(ticket.value ? new Date(ticket.value.created_at).toLocaleString() : "-")}</div></div></div><div class="layout-main" data-v-d164d7b9${_scopeId}><div class="chat-container custom-scrollbar" data-v-d164d7b9${_scopeId}>`);
              if (messages.value.length === 0) {
                _push2(`<div class="empty-chat" data-v-d164d7b9${_scopeId}>`);
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
                _push2(`<div data-v-d164d7b9${_scopeId}><div class="date-divider" data-v-d164d7b9${_scopeId}><span data-v-d164d7b9${_scopeId}>${ssrInterpolate(date)}</span></div><!--[-->`);
                ssrRenderList(group, (msg) => {
                  _push2(`<div class="${ssrRenderClass([{ "is-admin": msg.is_admin }, "message-row"])}" data-v-d164d7b9${_scopeId}>`);
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
                  _push2(`<div class="message-content" data-v-d164d7b9${_scopeId}><div class="bubble" data-v-d164d7b9${_scopeId}>${ssrInterpolate(msg.content)}</div><div class="meta" data-v-d164d7b9${_scopeId}><span data-v-d164d7b9${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div>`);
                  if (msg.attachments?.length) {
                    _push2(`<div class="attachments" data-v-d164d7b9${_scopeId}><!--[-->`);
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
              _push2(`<!--]--></div><div class="chat-footer" data-v-d164d7b9${_scopeId}>`);
              if (ticket.value?.status !== "processing" && ticket.value?.status !== "resolved") {
                _push2(`<div class="text-xs text-red-400 text-center mb-2" data-v-d164d7b9${_scopeId}> 当前状态异常: ${ssrInterpolate(ticket.value?.status)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (ticket.value?.status === "processing") {
                _push2(`<div class="action-area" data-v-d164d7b9${_scopeId}>`);
                if (pendingAttachments.value.length > 0) {
                  _push2(`<div class="preview-area" data-v-d164d7b9${_scopeId}><!--[-->`);
                  ssrRenderList(pendingAttachments.value, (url, index) => {
                    _push2(`<div class="preview-item" data-v-d164d7b9${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_image, {
                      src: url,
                      class: "preview-img",
                      fit: "cover"
                    }, null, _parent2, _scopeId));
                    _push2(`<div class="remove-btn" data-v-d164d7b9${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(unref(close_default), null, null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(unref(close_default))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`</div></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: replyText.value,
                  "onUpdate:modelValue": ($event) => replyText.value = $event,
                  type: "textarea",
                  rows: 3,
                  resize: "none",
                  placeholder: "请输入回复内容 (Cmd/Ctrl + Enter 发送)",
                  onKeydown: [handleReply, handleReply]
                }, null, _parent2, _scopeId));
                _push2(`<div class="footer-buttons" data-v-d164d7b9${_scopeId}><input type="file" style="${ssrRenderStyle({ "display": "none" })}" accept="image/jpeg,image/png,image/gif" data-v-d164d7b9${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "info",
                  plain: "",
                  onClick: triggerUpload,
                  loading: isUploading.value,
                  circle: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(picture_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(picture_default))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(picture_default))
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<div class="flex-grow" data-v-d164d7b9${_scopeId}></div>`);
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
                  disabled: !replyText.value.trim() && pendingAttachments.value.length === 0
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
                _push2(`<div class="resolved-banner" data-v-d164d7b9${_scopeId}>`);
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
                        createVNode(AdminUserCell, {
                          uid: ticket.value?.user_id,
                          email: ticket.value?.profiles?.email
                        }, null, 8, ["uid", "email"])
                      ])
                    ]),
                    ticket.value?.orders ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "info-block"
                    }, [
                      createVNode("div", { class: "label" }, "关联订单快照"),
                      createVNode(OrderSnapshotCard, {
                        order: ticket.value.orders
                      }, null, 8, ["order"])
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
                        pendingAttachments.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "preview-area"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(pendingAttachments.value, (url, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "preview-item"
                            }, [
                              createVNode(_component_el_image, {
                                src: url,
                                class: "preview-img",
                                fit: "cover"
                              }, null, 8, ["src"]),
                              createVNode("div", {
                                class: "remove-btn",
                                onClick: ($event) => removeAttachment(index)
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(close_default))
                                  ]),
                                  _: 1
                                })
                              ], 8, ["onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
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
                          createVNode("input", {
                            type: "file",
                            ref_key: "fileInput",
                            ref: fileInput,
                            style: { "display": "none" },
                            accept: "image/jpeg,image/png,image/gif",
                            onChange: handleFileSelect
                          }, null, 544),
                          createVNode(_component_el_button, {
                            type: "info",
                            plain: "",
                            onClick: triggerUpload,
                            loading: isUploading.value,
                            circle: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(picture_default))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["loading"]),
                          createVNode("div", { class: "flex-grow" }),
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
                            disabled: !replyText.value.trim() && pendingAttachments.value.length === 0
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/tickets/components/TicketChatModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TicketChatModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d164d7b9"]]);
export {
  TicketChatModal as default
};
//# sourceMappingURL=TicketChatModal-DkBgjFjq.js.map
