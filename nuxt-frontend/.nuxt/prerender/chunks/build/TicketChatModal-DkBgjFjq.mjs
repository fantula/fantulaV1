import { E as ElIcon } from './index-_zadwVDN.mjs';
import { E as ElButton } from './index-CXu9YNCC.mjs';
import { E as ElTag } from './index-2JZmBUf1.mjs';
import { E as ElEmpty } from './index-BRSsuUkY.mjs';
import { E as ElAvatar } from './index-C3_NoBue.mjs';
import { E as ElImage } from './index-BSYGfCfY.mjs';
import { E as ElInput } from './index-BeH2PDwZ.mjs';
import { v as vLoading } from './directive-BHLqqXUb.mjs';
import { defineComponent, computed, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, withDirectives, openBlock, createBlock, Fragment, createCommentVNode, renderList, withKeys, withModifiers, nextTick, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { a as adminTicketApi } from './ticket-D0g-SEGL.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { c as confirmAction } from './useAdminDialog-LVLqZ-7L.mjs';
import { n as refresh_right_default, b as close_default, ad as picture_default, R as check_default, g as circle_check_filled_default } from './index-DNnPa_Q9.mjs';
import { uploadImageToStorage } from './uploadImage-BNZa78ds.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-C7G4EUwl.mjs';
import { A as AdminUserCell } from './AdminUserCell-C2sgweQM.mjs';
import { useClipboard } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { u as useBizFormat } from './useBizFormat-D_CzFEgD.mjs';
import { _ as _export_sfc } from './server.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import './icon-Ck0_dGQP.mjs';
import './index-DbvZsXcZ.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './use-form-item-D2hCqQW8.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-bphs7bB3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Cxdfotkm.mjs';
import './index-ByGmkA5C.mjs';
import './event-D3FEo2C5.mjs';
import './aria-Rs9hkxop.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './vnode-uc6o_sOa.mjs';
import './typescript-D6L75muK.mjs';
import './index-BrJcxSwt.mjs';
import './scroll-BEbqb1sm.mjs';
import './raf-CQRaPAjg.mjs';
import './index-DuyRWKSc.mjs';
import './event-BZTOGHfp.mjs';
import './supabase-F2pQZHm6.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
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
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './index-VfPbkY7T.mjs';
import './index-IoXmILvB.mjs';
import './validator-BZYOvvAA.mjs';
import './index-BYF0U8gS.mjs';
import './refs-CxYYXu5Q.mjs';

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
      var _a, _b;
      const expiry = ((_a = props.order) == null ? void 0 : _a.expires_at) || ((_b = props.order) == null ? void 0 : _b.end_time);
      return formatRemainingTime(expiry);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["order-snapshot-card", { "is-compact": __props.compact }]
      }, _attrs))} data-v-76bac7c6><img${ssrRenderAttr("src", ((_b = (_a = __props.order) == null ? void 0 : _a.product_snapshot) == null ? void 0 : _b.image) || __props.defaultImage)} class="product-img" data-v-76bac7c6><div class="order-info" data-v-76bac7c6><div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>\u8BA2\u5355\u53F7</span><span class="value mono copyable" data-v-76bac7c6>${ssrInterpolate(__props.order.order_no)}</span></div><div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>\u5546\u54C1</span><span class="value truncate"${ssrRenderAttr("title", (_d = (_c = __props.order) == null ? void 0 : _c.product_snapshot) == null ? void 0 : _d.product_name)} data-v-76bac7c6>${ssrInterpolate(((_f = (_e = __props.order) == null ? void 0 : _e.product_snapshot) == null ? void 0 : _f.product_name) || "\u672A\u77E5\u5546\u54C1")}</span></div>`);
      if ((_h = (_g = __props.order) == null ? void 0 : _g.sku_snapshot) == null ? void 0 : _h.spec_combination) {
        _push(`<div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>\u89C4\u683C</span><span class="value spec-tag" data-v-76bac7c6>${ssrInterpolate(formatSpecs(__props.order.sku_snapshot.spec_combination))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="info-row" data-v-76bac7c6><span class="label" data-v-76bac7c6>\u91D1\u989D</span><span class="value price" data-v-76bac7c6>\xA5${ssrInterpolate(unref(formatPrice)(__props.order.total_amount || __props.order.amount))}</span></div>`);
      if (timeLeft.value && timeLeft.value !== "\u5DF2\u8FC7\u671F") {
        _push(`<div class="time-left-box" data-v-76bac7c6><span class="time-label" data-v-76bac7c6>\u5269\u4F59\u65F6\u95F4</span><span class="time-value" data-v-76bac7c6>${ssrInterpolate(timeLeft.value)}</span></div>`);
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
        }
      } catch (e) {
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
        const { getAuthToken } = await import('./supabase-F2pQZHm6.mjs');
        const token = await getAuthToken();
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
        title: "\u5DE5\u5355\u8BE6\u60C5\u4E0E\u5904\u7406",
        width: "900px",
        class: "ticket-chat-modal",
        onClosed: handleClose,
        "close-on-click-modal": false,
        "destroy-on-close": "",
        "append-to-body": "",
        "show-footer": false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
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
              _push2(`<!--[--><div class="layout-sidebar" data-v-d164d7b9${_scopeId}><div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>\u5DE5\u5355\u72B6\u6001</div><div class="value" data-v-d164d7b9${_scopeId}>`);
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
              _push2(`</div></div><div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>\u63D0\u4EA4\u7528\u6237</div><div class="user-card" data-v-d164d7b9${_scopeId}>`);
              _push2(ssrRenderComponent(AdminUserCell, {
                uid: (_b = ticket.value) == null ? void 0 : _b.user_id,
                email: (_d = (_c = ticket.value) == null ? void 0 : _c.profiles) == null ? void 0 : _d.email
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if ((_e = ticket.value) == null ? void 0 : _e.orders) {
                _push2(`<div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>\u5173\u8054\u8BA2\u5355\u5FEB\u7167</div>`);
                _push2(ssrRenderComponent(OrderSnapshotCard, {
                  order: ticket.value.orders
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="info-block" data-v-d164d7b9${_scopeId}><div class="label" data-v-d164d7b9${_scopeId}>\u521B\u5EFA\u65F6\u95F4</div><div class="value text-gray-500 text-sm" data-v-d164d7b9${_scopeId}>${ssrInterpolate(ticket.value ? new Date(ticket.value.created_at).toLocaleString() : "-")}</div></div></div><div class="layout-main" data-v-d164d7b9${_scopeId}><div class="chat-container custom-scrollbar" data-v-d164d7b9${_scopeId}>`);
              if (messages.value.length === 0) {
                _push2(`<div class="empty-chat" data-v-d164d7b9${_scopeId}>`);
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
                _push2(`<div data-v-d164d7b9${_scopeId}><div class="date-divider" data-v-d164d7b9${_scopeId}><span data-v-d164d7b9${_scopeId}>${ssrInterpolate(date)}</span></div><!--[-->`);
                ssrRenderList(group, (msg) => {
                  var _a2;
                  _push2(`<div class="${ssrRenderClass([{ "is-admin": msg.is_admin }, "message-row"])}" data-v-d164d7b9${_scopeId}>`);
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
                  _push2(`<div class="message-content" data-v-d164d7b9${_scopeId}><div class="bubble" data-v-d164d7b9${_scopeId}>${ssrInterpolate(msg.content)}</div><div class="meta" data-v-d164d7b9${_scopeId}><span data-v-d164d7b9${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div>`);
                  if ((_a2 = msg.attachments) == null ? void 0 : _a2.length) {
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
              if (((_f = ticket.value) == null ? void 0 : _f.status) !== "processing" && ((_g = ticket.value) == null ? void 0 : _g.status) !== "resolved") {
                _push2(`<div class="text-xs text-red-400 text-center mb-2" data-v-d164d7b9${_scopeId}> \u5F53\u524D\u72B6\u6001\u5F02\u5E38: ${ssrInterpolate((_h = ticket.value) == null ? void 0 : _h.status)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (((_i = ticket.value) == null ? void 0 : _i.status) === "processing") {
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
                  placeholder: "\u8BF7\u8F93\u5165\u56DE\u590D\u5185\u5BB9 (Cmd/Ctrl + Enter \u53D1\u9001)",
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
              } else if (((_j = ticket.value) == null ? void 0 : _j.status) === "resolved") {
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
                          type: unref(getTicketStatusType)((_k = ticket.value) == null ? void 0 : _k.status),
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
                        createVNode(AdminUserCell, {
                          uid: (_l = ticket.value) == null ? void 0 : _l.user_id,
                          email: (_n = (_m = ticket.value) == null ? void 0 : _m.profiles) == null ? void 0 : _n.email
                        }, null, 8, ["uid", "email"])
                      ])
                    ]),
                    ((_o = ticket.value) == null ? void 0 : _o.orders) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "info-block"
                    }, [
                      createVNode("div", { class: "label" }, "\u5173\u8054\u8BA2\u5355\u5FEB\u7167"),
                      createVNode(OrderSnapshotCard, {
                        order: ticket.value.orders
                      }, null, 8, ["order"])
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
                      ((_p = ticket.value) == null ? void 0 : _p.status) !== "processing" && ((_q = ticket.value) == null ? void 0 : _q.status) !== "resolved" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-red-400 text-center mb-2"
                      }, " \u5F53\u524D\u72B6\u6001\u5F02\u5E38: " + toDisplayString((_r = ticket.value) == null ? void 0 : _r.status), 1)) : createCommentVNode("", true),
                      ((_s = ticket.value) == null ? void 0 : _s.status) === "processing" ? (openBlock(), createBlock("div", {
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
                      ])) : ((_t = ticket.value) == null ? void 0 : _t.status) === "resolved" ? (openBlock(), createBlock("div", {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/tickets/components/TicketChatModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TicketChatModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d164d7b9"]]);

export { TicketChatModal as default };
//# sourceMappingURL=TicketChatModal-DkBgjFjq.mjs.map
