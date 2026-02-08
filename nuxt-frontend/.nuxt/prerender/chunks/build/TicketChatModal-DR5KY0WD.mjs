import { E as ElDialog } from './index-Dhc7L6Kv.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { E as ElButton } from './index-Cfk6gFRD.mjs';
import { E as ElTag } from './index-CAqDGa72.mjs';
import { E as ElAvatar } from './index-DcKx3ntK.mjs';
import { E as ElEmpty } from './index-DHhizeNf.mjs';
import { E as ElImage } from './index-BmjXUoge.mjs';
import { E as ElInput } from './index-DfZ5KWBt.mjs';
import { v as vLoading } from './directive-BBpaOxz2.mjs';
import { defineComponent, computed, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, withDirectives, openBlock, createBlock, Fragment, createCommentVNode, renderList, withKeys, withModifiers, nextTick, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { g as getAdminSupabaseClient } from './supabase-admin-Yv96kmWU.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { c as confirmAction } from './useAdminDialog-CsbKStaI.mjs';
import { v as refresh_right_default, j as close_default, e as picture_default, G as check_default, f as circle_check_filled_default } from './index-DlETah8a.mjs';
import { uploadImageToStorage } from './uploadImage-DZo6xiHb.mjs';
import { u as useSupabaseSession } from './useSupabaseSession-D0X5WUcm.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './icon-CK7WLSPl.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './event-BZTOGHfp.mjs';
import './index-CuQ4LNHg.mjs';
import './vnode-BKSxKQVt.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-K5TIzHX_.mjs';
import './index-7KygWwCI.mjs';
import './scroll-BuMAfCNC.mjs';
import './raf-CQRaPAjg.mjs';
import './use-global-config-79yNXOXL.mjs';
import './objects-Bz74KHmq.mjs';
import './use-form-item-Bhmdieo-.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-BgvvVJ20.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-DqrhOzxH.mjs';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import './index-C_BEi-G8.mjs';
import './validator-BaQl3RdN.mjs';
import './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';

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
  // 5. Cleanup Images (One-Click) - 使用 R2 Edge Function
  async cleanupImages(daysOld = 7, token) {
    const client = getAdminSupabaseClient();
    const dateLimit = /* @__PURE__ */ new Date();
    dateLimit.setDate(dateLimit.getDate() - daysOld);
    const { data: tickets } = await client.from("tickets").select("id").eq("status", "resolved").lt("resolved_at", dateLimit.toISOString());
    if (!tickets || tickets.length === 0) return { success: true, count: 0 };
    const ticketIds = tickets.map((t) => t.id);
    const { data: messages } = await client.from("ticket_messages").select("id, attachments").in("ticket_id", ticketIds).not("attachments", "is", null);
    if (!messages || messages.length === 0) return { success: true, count: 0 };
    const filesToDelete = [];
    messages.forEach((msg) => {
      if (Array.isArray(msg.attachments)) {
        msg.attachments.forEach((url) => {
          try {
            const urlObj = new URL(url);
            const path = urlObj.pathname.startsWith("/") ? urlObj.pathname.substring(1) : urlObj.pathname;
            if (path) {
              filesToDelete.push(decodeURIComponent(path));
            }
          } catch (e) {
            if (url && !url.startsWith("http")) {
              filesToDelete.push(url);
            }
          }
        });
      }
    });
    if (filesToDelete.length === 0) return { success: true, count: 0 };
    try {
      const { EDGE_FUNCTIONS_URL } = await import('./supabase-jxF0-7J3.mjs');
      if (!token) {
        return { success: false, count: 0, error: "\u8BF7\u5148\u767B\u5F55\u540E\u53F0\u7BA1\u7406\u5458\u8D26\u53F7" };
      }
      const response = await fetch(`${EDGE_FUNCTIONS_URL}/delete-r2`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ paths: filesToDelete })
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        return { success: false, count: 0, error: result.error || "\u5220\u9664\u5931\u8D25" };
      }
      return { success: true, count: result.deleted || 0 };
    } catch (e) {
      console.error("Cleanup error:", e);
      return { success: false, count: 0, error: e.message || "\u6E05\u7406\u5931\u8D25" };
    }
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
    const fileInput = ref(null);
    const isUploading = ref(false);
    const pendingAttachments = ref([]);
    const handleClose = () => {
      emit("closed");
    };
    const copyText = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("\u5DF2\u590D\u5236");
    };
    const timeLeft = computed(() => {
      var _a;
      if (!((_a = ticket.value) == null ? void 0 : _a.orders)) return null;
      const order = ticket.value.orders;
      const expiryStr = order.expires_at || order.end_time;
      if (!expiryStr) return null;
      const expiry = new Date(expiryStr).getTime();
      const now = (/* @__PURE__ */ new Date()).getTime();
      const diff = expiry - now;
      if (diff <= 0) return "\u5DF2\u8FC7\u671F";
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
      if (days > 0) return `${days}\u5929 ${hours}\u5C0F\u65F6`;
      return `${hours}\u5C0F\u65F6`;
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
        const dateStr = isToday(date) ? "\u4ECA\u5929" : isYesterday(date) ? "\u6628\u5929" : date.toLocaleDateString();
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
          throw new Error(resDetail.error || "\u5DE5\u5355\u8BE6\u60C5\u52A0\u8F7D\u5931\u8D25");
        }
        if (resMsgs.success) {
          messages.value = resMsgs.data;
          scrollToBottom();
        } else {
          console.warn("[TicketChatModal] Messages load warning:", resMsgs.error);
        }
      } catch (e) {
        console.error("[TicketChatModal] Load Failed:", e);
        error.value = e.message || "\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5";
        loaded.value = false;
      } finally {
        loading.value = false;
      }
    };
    const triggerUpload = () => {
      var _a;
      (_a = fileInput.value) == null ? void 0 : _a.click();
    };
    const handleFileSelect = async (event) => {
      var _a;
      const input = event.target;
      if (!input.files || input.files.length === 0) return;
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        ElMessage.warning("\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB");
        input.value = "";
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        ElMessage.warning("\u53EA\u652F\u6301 JPG, PNG, GIF \u683C\u5F0F");
        input.value = "";
        return;
      }
      isUploading.value = true;
      try {
        const session = useSupabaseSession();
        const token = (_a = session.value) == null ? void 0 : _a.access_token;
        if (!token) {
          ElMessage.error("\u8BF7\u767B\u5F55");
          isUploading.value = false;
          return;
        }
        const res = await uploadImageToStorage(file, "tickets", void 0, token);
        if (res.success && res.url) {
          pendingAttachments.value.push(res.url);
        } else {
          ElMessage.error(res.error || "\u4E0A\u4F20\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u4E0A\u4F20\u51FA\u9519");
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
          ElMessage.success("\u53D1\u9001\u6210\u529F");
          const resMsgs = await adminTicketApi.getMessages(props.ticketId);
          if (resMsgs.success) {
            messages.value = resMsgs.data;
            scrollToBottom();
          }
        } else {
          ElMessage.error(res.error || "\u53D1\u9001\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u7CFB\u7EDF\u9519\u8BEF");
      } finally {
        sending.value = false;
      }
    };
    const handleResolve = async () => {
      const success = await confirmAction(
        "\u786E\u5B9A\u8981\u5C06\u6B64\u5DE5\u5355\u6807\u8BB0\u4E3A\u5DF2\u89E3\u51B3\u5417\uFF1F\u7528\u6237\u5C06\u65E0\u6CD5\u518D\u56DE\u590D\u3002",
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
          title: "\u786E\u8BA4\u7ED3\u5355",
          confirmText: "\u786E\u5B9A\u7ED3\u5355",
          type: "warning",
          successMessage: "\u5DE5\u5355\u5DF2\u7ED3\u5355"
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
        title: "\u5DE5\u5355\u8BE6\u60C5\u4E0E\u5904\u7406",
        width: "900px",
        class: "ticket-chat-modal",
        onClose: handleClose,
        "close-on-click-modal": false,
        "destroy-on-close": "",
        "append-to-body": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "modal-layout" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-c05214ee${_scopeId}>`);
            if (error.value) {
              _push2(`<div class="flex flex-col items-center justify-center w-full h-full text-center" data-v-c05214ee${_scopeId}>`);
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
              _push2(`<div class="text-gray-600 mb-4" data-v-c05214ee${_scopeId}>${ssrInterpolate(error.value)}</div>`);
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
                    _push3(` \u91CD\u8BD5 `);
                  } else {
                    return [
                      createVNode(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx(() => [
                          createVNode(unref(refresh_right_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u91CD\u8BD5 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (loaded.value) {
              _push2(`<!--[--><div class="layout-sidebar" data-v-c05214ee${_scopeId}><div class="info-block" data-v-c05214ee${_scopeId}><div class="label" data-v-c05214ee${_scopeId}>\u5DE5\u5355\u72B6\u6001</div><div class="value" data-v-c05214ee${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_tag, {
                type: unref(getTicketStatusType)((_a = ticket.value) == null ? void 0 : _a.status),
                effect: "dark",
                size: "large"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2;
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getTicketStatusLabel)((_a2 = ticket.value) == null ? void 0 : _a2.status))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(getTicketStatusLabel)((_b2 = ticket.value) == null ? void 0 : _b2.status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><div class="info-block" data-v-c05214ee${_scopeId}><div class="label" data-v-c05214ee${_scopeId}>\u63D0\u4EA4\u7528\u6237</div><div class="user-card" data-v-c05214ee${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_avatar, {
                size: 32,
                class: "user-avatar"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c2, _d2;
                  if (_push3) {
                    _push3(`${ssrInterpolate((_b2 = (_a2 = ticket.value) == null ? void 0 : _a2.user_id) == null ? void 0 : _b2.substring(0, 2).toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString((_d2 = (_c2 = ticket.value) == null ? void 0 : _c2.user_id) == null ? void 0 : _d2.substring(0, 2).toUpperCase()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="user-details" data-v-c05214ee${_scopeId}><div class="uid" data-v-c05214ee${_scopeId}>UID: ${ssrInterpolate((_c = (_b = ticket.value) == null ? void 0 : _b.user_id) == null ? void 0 : _c.substring(0, 8).toUpperCase())}</div>`);
              if ((_e = (_d = ticket.value) == null ? void 0 : _d.profiles) == null ? void 0 : _e.email) {
                _push2(`<div class="email" data-v-c05214ee${_scopeId}>${ssrInterpolate(ticket.value.profiles.email)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if ((_f = ticket.value) == null ? void 0 : _f.orders) {
                _push2(`<div class="info-block" data-v-c05214ee${_scopeId}><div class="label" data-v-c05214ee${_scopeId}>\u5173\u8054\u8BA2\u5355\u5FEB\u7167</div><div class="order-card-large" data-v-c05214ee${_scopeId}><img${ssrRenderAttr("src", (_g = ticket.value.orders.product_snapshot) == null ? void 0 : _g.image)} class="order-img-large" data-v-c05214ee${_scopeId}><div class="order-details-rows" data-v-c05214ee${_scopeId}><div class="detail-row" data-v-c05214ee${_scopeId}><span class="row-label" data-v-c05214ee${_scopeId}>\u8BA2\u5355\u53F7</span><span class="row-value font-mono copyable" data-v-c05214ee${_scopeId}>${ssrInterpolate(ticket.value.orders.order_no)}</span></div><div class="detail-row" data-v-c05214ee${_scopeId}><span class="row-label" data-v-c05214ee${_scopeId}>\u5546\u54C1</span><span class="row-value"${ssrRenderAttr("title", (_h = ticket.value.orders.product_snapshot) == null ? void 0 : _h.product_name)} data-v-c05214ee${_scopeId}>${ssrInterpolate((_i = ticket.value.orders.product_snapshot) == null ? void 0 : _i.product_name)}</span></div>`);
                if ((_j = ticket.value.orders.sku_snapshot) == null ? void 0 : _j.spec_combination) {
                  _push2(`<div class="detail-row" data-v-c05214ee${_scopeId}><span class="row-label" data-v-c05214ee${_scopeId}>\u89C4\u683C</span><span class="row-value spec-tag" data-v-c05214ee${_scopeId}>${ssrInterpolate(Object.values(ticket.value.orders.sku_snapshot.spec_combination).join(" / "))}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="detail-row" data-v-c05214ee${_scopeId}><span class="row-label" data-v-c05214ee${_scopeId}>\u91D1\u989D</span><span class="row-value price" data-v-c05214ee${_scopeId}>\xA5${ssrInterpolate((_k = ticket.value.orders.total_amount) == null ? void 0 : _k.toFixed(2))}</span></div>`);
                if (timeLeft.value) {
                  _push2(`<div class="detail-row bg-blue-50 p-2 rounded mt-2 border border-blue-100" data-v-c05214ee${_scopeId}><span class="row-label text-blue-600" data-v-c05214ee${_scopeId}>\u5269\u4F59\u65F6\u95F4</span><span class="row-value font-bold text-blue-700" data-v-c05214ee${_scopeId}>${ssrInterpolate(timeLeft.value)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="info-block" data-v-c05214ee${_scopeId}><div class="label" data-v-c05214ee${_scopeId}>\u521B\u5EFA\u65F6\u95F4</div><div class="value text-gray-500 text-sm" data-v-c05214ee${_scopeId}>${ssrInterpolate(ticket.value ? new Date(ticket.value.created_at).toLocaleString() : "-")}</div></div></div><div class="layout-main" data-v-c05214ee${_scopeId}><div class="chat-container custom-scrollbar" data-v-c05214ee${_scopeId}>`);
              if (messages.value.length === 0) {
                _push2(`<div class="empty-chat" data-v-c05214ee${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_empty, {
                  description: "\u6682\u65E0\u6C9F\u901A\u8BB0\u5F55",
                  "image-size": 60
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(groupedMessages.value, (group, date) => {
                _push2(`<div data-v-c05214ee${_scopeId}><div class="date-divider" data-v-c05214ee${_scopeId}><span data-v-c05214ee${_scopeId}>${ssrInterpolate(date)}</span></div><!--[-->`);
                ssrRenderList(group, (msg) => {
                  var _a2;
                  _push2(`<div class="${ssrRenderClass([{ "is-admin": msg.is_admin }, "message-row"])}" data-v-c05214ee${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_avatar, {
                    size: 32,
                    class: msg.is_admin ? "avatar-admin" : "avatar-user"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(msg.is_admin ? "\u670D" : "\u5BA2")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(msg.is_admin ? "\u670D" : "\u5BA2"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<div class="message-content" data-v-c05214ee${_scopeId}><div class="bubble" data-v-c05214ee${_scopeId}>${ssrInterpolate(msg.content)}</div><div class="meta" data-v-c05214ee${_scopeId}><span data-v-c05214ee${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div>`);
                  if ((_a2 = msg.attachments) == null ? void 0 : _a2.length) {
                    _push2(`<div class="attachments" data-v-c05214ee${_scopeId}><!--[-->`);
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
              _push2(`<!--]--></div><div class="chat-footer" data-v-c05214ee${_scopeId}>`);
              if (((_l = ticket.value) == null ? void 0 : _l.status) !== "processing" && ((_m = ticket.value) == null ? void 0 : _m.status) !== "resolved") {
                _push2(`<div class="text-xs text-red-400 text-center mb-2" data-v-c05214ee${_scopeId}> \u5F53\u524D\u72B6\u6001\u5F02\u5E38: ${ssrInterpolate((_n = ticket.value) == null ? void 0 : _n.status)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (((_o = ticket.value) == null ? void 0 : _o.status) === "processing") {
                _push2(`<div class="action-area" data-v-c05214ee${_scopeId}>`);
                if (pendingAttachments.value.length > 0) {
                  _push2(`<div class="preview-area" data-v-c05214ee${_scopeId}><!--[-->`);
                  ssrRenderList(pendingAttachments.value, (url, index) => {
                    _push2(`<div class="preview-item" data-v-c05214ee${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_image, {
                      src: url,
                      class: "preview-img",
                      fit: "cover"
                    }, null, _parent2, _scopeId));
                    _push2(`<div class="remove-btn" data-v-c05214ee${_scopeId}>`);
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
                  placeholder: "\u8BF7\u8F93\u5165\u56DE\u590D\u5185\u5BB9 (Cmd/Ctrl + Enter \u53D1\u9001)",
                  onKeydown: [handleReply, handleReply]
                }, null, _parent2, _scopeId));
                _push2(`<div class="footer-buttons" data-v-c05214ee${_scopeId}><input type="file" style="${ssrRenderStyle({ "display": "none" })}" accept="image/jpeg,image/png,image/gif" data-v-c05214ee${_scopeId}>`);
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
                _push2(`<div class="flex-grow" data-v-c05214ee${_scopeId}></div>`);
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
                      _push3(` \u6807\u8BB0\u5DF2\u89E3\u51B3 `);
                    } else {
                      return [
                        createVNode(_component_el_icon, { class: "mr-1" }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u6807\u8BB0\u5DF2\u89E3\u51B3 ")
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
                      _push3(` \u53D1\u9001\u56DE\u590D `);
                    } else {
                      return [
                        createTextVNode(" \u53D1\u9001\u56DE\u590D ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else if (((_p = ticket.value) == null ? void 0 : _p.status) === "resolved") {
                _push2(`<div class="resolved-banner" data-v-c05214ee${_scopeId}>`);
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
                _push2(` \u5DE5\u5355\u5DF2\u7ED3\u5355\uFF0C\u65E0\u6CD5\u7EE7\u7EED\u56DE\u590D </div>`);
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
                      createTextVNode(" \u91CD\u8BD5 ")
                    ]),
                    _: 1
                  })
                ])) : loaded.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { class: "layout-sidebar" }, [
                    createVNode("div", { class: "info-block" }, [
                      createVNode("div", { class: "label" }, "\u5DE5\u5355\u72B6\u6001"),
                      createVNode("div", { class: "value" }, [
                        createVNode(_component_el_tag, {
                          type: unref(getTicketStatusType)((_q = ticket.value) == null ? void 0 : _q.status),
                          effect: "dark",
                          size: "large"
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString(unref(getTicketStatusLabel)((_a2 = ticket.value) == null ? void 0 : _a2.status)), 1)
                            ];
                          }),
                          _: 1
                        }, 8, ["type"])
                      ])
                    ]),
                    createVNode("div", { class: "info-block" }, [
                      createVNode("div", { class: "label" }, "\u63D0\u4EA4\u7528\u6237"),
                      createVNode("div", { class: "user-card" }, [
                        createVNode(_component_el_avatar, {
                          size: 32,
                          class: "user-avatar"
                        }, {
                          default: withCtx(() => {
                            var _a2, _b2;
                            return [
                              createTextVNode(toDisplayString((_b2 = (_a2 = ticket.value) == null ? void 0 : _a2.user_id) == null ? void 0 : _b2.substring(0, 2).toUpperCase()), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode("div", { class: "user-details" }, [
                          createVNode("div", { class: "uid" }, "UID: " + toDisplayString((_s = (_r = ticket.value) == null ? void 0 : _r.user_id) == null ? void 0 : _s.substring(0, 8).toUpperCase()), 1),
                          ((_u = (_t = ticket.value) == null ? void 0 : _t.profiles) == null ? void 0 : _u.email) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "email"
                          }, toDisplayString(ticket.value.profiles.email), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    ((_v = ticket.value) == null ? void 0 : _v.orders) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "info-block"
                    }, [
                      createVNode("div", { class: "label" }, "\u5173\u8054\u8BA2\u5355\u5FEB\u7167"),
                      createVNode("div", { class: "order-card-large" }, [
                        createVNode("img", {
                          src: (_w = ticket.value.orders.product_snapshot) == null ? void 0 : _w.image,
                          class: "order-img-large"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "order-details-rows" }, [
                          createVNode("div", { class: "detail-row" }, [
                            createVNode("span", { class: "row-label" }, "\u8BA2\u5355\u53F7"),
                            createVNode("span", {
                              class: "row-value font-mono copyable",
                              onClick: ($event) => copyText(ticket.value.orders.order_no)
                            }, toDisplayString(ticket.value.orders.order_no), 9, ["onClick"])
                          ]),
                          createVNode("div", { class: "detail-row" }, [
                            createVNode("span", { class: "row-label" }, "\u5546\u54C1"),
                            createVNode("span", {
                              class: "row-value",
                              title: (_x = ticket.value.orders.product_snapshot) == null ? void 0 : _x.product_name
                            }, toDisplayString((_y = ticket.value.orders.product_snapshot) == null ? void 0 : _y.product_name), 9, ["title"])
                          ]),
                          ((_z = ticket.value.orders.sku_snapshot) == null ? void 0 : _z.spec_combination) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "detail-row"
                          }, [
                            createVNode("span", { class: "row-label" }, "\u89C4\u683C"),
                            createVNode("span", { class: "row-value spec-tag" }, toDisplayString(Object.values(ticket.value.orders.sku_snapshot.spec_combination).join(" / ")), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "detail-row" }, [
                            createVNode("span", { class: "row-label" }, "\u91D1\u989D"),
                            createVNode("span", { class: "row-value price" }, "\xA5" + toDisplayString((_A = ticket.value.orders.total_amount) == null ? void 0 : _A.toFixed(2)), 1)
                          ]),
                          timeLeft.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "detail-row bg-blue-50 p-2 rounded mt-2 border border-blue-100"
                          }, [
                            createVNode("span", { class: "row-label text-blue-600" }, "\u5269\u4F59\u65F6\u95F4"),
                            createVNode("span", { class: "row-value font-bold text-blue-700" }, toDisplayString(timeLeft.value), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "info-block" }, [
                      createVNode("div", { class: "label" }, "\u521B\u5EFA\u65F6\u95F4"),
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
                          description: "\u6682\u65E0\u6C9F\u901A\u8BB0\u5F55",
                          "image-size": 60
                        })
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(groupedMessages.value, (group, date) => {
                        return openBlock(), createBlock("div", { key: date }, [
                          createVNode("div", { class: "date-divider" }, [
                            createVNode("span", null, toDisplayString(date), 1)
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(group, (msg) => {
                            var _a2;
                            return openBlock(), createBlock("div", {
                              key: msg.id,
                              class: ["message-row", { "is-admin": msg.is_admin }]
                            }, [
                              createVNode(_component_el_avatar, {
                                size: 32,
                                class: msg.is_admin ? "avatar-admin" : "avatar-user"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(msg.is_admin ? "\u670D" : "\u5BA2"), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"]),
                              createVNode("div", { class: "message-content" }, [
                                createVNode("div", { class: "bubble" }, toDisplayString(msg.content), 1),
                                createVNode("div", { class: "meta" }, [
                                  createVNode("span", null, toDisplayString(formatTime(msg.created_at)), 1)
                                ]),
                                ((_a2 = msg.attachments) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("div", {
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
                      ((_B = ticket.value) == null ? void 0 : _B.status) !== "processing" && ((_C = ticket.value) == null ? void 0 : _C.status) !== "resolved" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-red-400 text-center mb-2"
                      }, " \u5F53\u524D\u72B6\u6001\u5F02\u5E38: " + toDisplayString((_D = ticket.value) == null ? void 0 : _D.status), 1)) : createCommentVNode("", true),
                      ((_E = ticket.value) == null ? void 0 : _E.status) === "processing" ? (openBlock(), createBlock("div", {
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
                          placeholder: "\u8BF7\u8F93\u5165\u56DE\u590D\u5185\u5BB9 (Cmd/Ctrl + Enter \u53D1\u9001)",
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
                              createTextVNode(" \u6807\u8BB0\u5DF2\u89E3\u51B3 ")
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
                              createTextVNode(" \u53D1\u9001\u56DE\u590D ")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ])
                      ])) : ((_F = ticket.value) == null ? void 0 : _F.status) === "resolved" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "resolved-banner"
                      }, [
                        createVNode(_component_el_icon, { class: "text-green-500 mr-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(circle_check_filled_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u5DE5\u5355\u5DF2\u7ED3\u5355\uFF0C\u65E0\u6CD5\u7EE7\u7EED\u56DE\u590D ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/tickets/components/TicketChatModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TicketChatModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c05214ee"]]);
const TicketChatModal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TicketChatModal
}, Symbol.toStringTag, { value: "Module" }));

export { TicketChatModal as T, adminTicketApi as a, TicketChatModal$1 as b };
//# sourceMappingURL=TicketChatModal-DR5KY0WD.mjs.map
