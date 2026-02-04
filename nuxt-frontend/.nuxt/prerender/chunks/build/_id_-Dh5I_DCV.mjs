import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { E as ElImage } from './index-BhTf_yFC.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, watch, reactive, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { c as arrow_left_default, q as circle_check_default, ai as box_default, y as refresh_left_default, i as info_filled_default, ak as headset_default, al as tickets_default, a0 as copy_document_default, x as zoom_in_default, S as user_default, p as plus_default, l as loading_default, o as circle_close_default, D as arrow_down_default, P as warning_default, n as close_default } from './index-CmsdIFY8.mjs';
import { c as clientOrderApi } from './order-CRVwbgS6.mjs';
import { t as ticketApi } from './ticket-C7sv4DHi.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { C as ContactModal } from './ContactModal-BLWDvuWe.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './typescript-D6L75muK.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-DBQY6eQ6.mjs';
import './index-ebnaz0b7.mjs';
import './scroll-Df9VGR5S.mjs';
import './raf-CQRaPAjg.mjs';
import './index-D2CY7Ok3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import './auth-BCuS92ob.mjs';
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-D8FaBhjU.mjs';
import './icon-eqoLCvNY.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-CO6H4Lsj.mjs';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FulfillmentShared",
  __ssrInlineRender: true,
  props: {
    cdkItem: {},
    slotIndex: {}
  },
  setup(__props) {
    const props = __props;
    const coSharingUsers = ref([]);
    const maxSlots = computed(() => {
      if (!props.cdkItem) return 5;
      if (props.cdkItem.accountData && props.cdkItem.accountData.max_slots) {
        return Number(props.cdkItem.accountData.max_slots);
      }
      return 5;
    });
    const mySlotIndex = computed(() => props.slotIndex);
    const allSlots = computed(() => {
      const slots = [];
      for (let i = 1; i <= maxSlots.value; i++) {
        const user = coSharingUsers.value.find((u) => u.slot_index === i);
        const isMe = i === Number(mySlotIndex.value);
        slots.push({ index: i, user, isMe });
      }
      return slots;
    });
    const occupiedCount = computed(() => coSharingUsers.value.length);
    const parseCdkCode = (item) => {
      if (!item) return {};
      if (item.parsed && typeof item.parsed === "object") return item.parsed;
      try {
        return JSON.parse(item.code);
      } catch {
        return { "\u6FC0\u6D3B\u7801": item.code };
      }
    };
    const formatSlotIndex = (idx) => String(idx || 0).padStart(2, "0");
    const fetchCoSharingUsers = async () => {
      if (!props.cdkItem || !props.cdkItem.id) return;
      const cdkId = props.cdkItem.id;
      try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("slot_occupancies").select(`
        user_id,
        slot_index,
        profiles:user_id (id, avatar, nickname)
      `).eq("cdk_id", cdkId).eq("status", "using").not("user_id", "is", null);
        if (!error && data) {
          coSharingUsers.value = data.filter((item) => item.profiles).map((item) => ({
            id: item.profiles.id,
            avatar: item.profiles.avatar,
            nickname: item.profiles.nickname,
            slot_index: item.slot_index
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    watch(() => props.cdkItem, fetchCoSharingUsers, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-shared-card" }, _attrs))} data-v-26d0895e><div class="credentials-box" data-v-26d0895e><div class="cred-header" data-v-26d0895e><div class="slot-badge" data-v-26d0895e>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "slot-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(user_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(user_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-26d0895e>\u6211\u7684\u8F66\u4F4D: ${ssrInterpolate(formatSlotIndex(__props.slotIndex))}\u53F7</span></div></div><div class="cred-body" data-v-26d0895e><!--[-->`);
      ssrRenderList(parseCdkCode(__props.cdkItem), (val, key) => {
        _push(`<div class="cred-row" data-v-26d0895e><div class="cred-label" data-v-26d0895e>${ssrInterpolate(key)}</div><div class="cred-value-box" data-v-26d0895e><span class="cred-value" data-v-26d0895e>${ssrInterpolate(val)}</span><div class="cred-copy" data-v-26d0895e>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(copy_document_default))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="roommates-box" data-v-26d0895e><div class="roommates-title" data-v-26d0895e><span data-v-26d0895e>\u5171\u4EAB\u8F66\u53CB</span><span class="count" data-v-26d0895e>${ssrInterpolate(occupiedCount.value)}/${ssrInterpolate(maxSlots.value)}</span></div><div class="roommates-scroll" data-v-26d0895e><!--[-->`);
      ssrRenderList(allSlots.value, (slot) => {
        var _a;
        _push(`<div class="${ssrRenderClass([{ "is-me": slot.isMe }, "roommate-item"])}" data-v-26d0895e><div class="${ssrRenderClass([{ "active": slot.user }, "avatar-box"])}" data-v-26d0895e>`);
        if (slot.user && slot.user.avatar) {
          _push(`<img${ssrRenderAttr("src", slot.user.avatar)} data-v-26d0895e>`);
        } else if (slot.user) {
          _push(`<div class="avatar-placeholder" data-v-26d0895e>${ssrInterpolate((slot.user.nickname || "U")[0].toUpperCase())}</div>`);
        } else {
          _push(`<div class="avatar-placeholder empty" data-v-26d0895e>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(plus_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(plus_default))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="roommate-name" data-v-26d0895e>${ssrInterpolate(slot.isMe ? "\u6211" : ((_a = slot.user) == null ? void 0 : _a.nickname) || "\u7A7A")}</div><div class="slot-num" data-v-26d0895e>${ssrInterpolate(slot.index)}\u53F7</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/FulfillmentShared.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const FulfillmentShared = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-26d0895e"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "FulfillmentCdk",
  __ssrInlineRender: true,
  props: {
    cdkList: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-cdk-list" }, _attrs))} data-v-963e1a12><!--[-->`);
      ssrRenderList(__props.cdkList, (item, index) => {
        _push(`<div class="cdk-item" data-v-963e1a12><div class="cdk-header" data-v-963e1a12><span class="cdk-label" data-v-963e1a12>\u5361\u5BC6 ${ssrInterpolate(index + 1)}</span><button class="copy-btn" data-v-963e1a12>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(copy_document_default))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` \u590D\u5236 </button></div><div class="cdk-content" data-v-963e1a12><div class="code-box" data-v-963e1a12>${ssrInterpolate(item.code)}</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/FulfillmentCdk.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const FulfillmentCdk = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-963e1a12"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FulfillmentSubmitForm",
  __ssrInlineRender: true,
  props: {
    orderId: {},
    orderStatus: {},
    cdkFields: {},
    cdkId: {}
  },
  emits: ["submit-success"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const latestFulfillment = ref(null);
    const isSubmitting = ref(false);
    const formData = reactive({});
    const fields = computed(() => props.cdkFields || []);
    const latestStatus = computed(() => {
      var _a;
      return (_a = latestFulfillment.value) == null ? void 0 : _a.status;
    });
    const latestRejectReason = computed(() => {
      var _a;
      return ((_a = latestFulfillment.value) == null ? void 0 : _a.reject_reason) || "-";
    });
    const initFormData = () => {
      var _a;
      fields.value.forEach((f) => formData[f.key] = "");
      if (((_a = latestFulfillment.value) == null ? void 0 : _a.payload) && ["submitted", "rejected"].includes(latestStatus.value || "")) {
        Object.entries(latestFulfillment.value.payload).forEach(([k, v]) => {
          if (k !== "_cdk_id") formData[k] = v;
        });
      }
    };
    const fetchLatestFulfillment = async () => {
      if (!props.orderId) return;
      try {
        const client = getSupabaseClient();
        let query = client.from("order_fulfillments").select("*").eq("order_id", props.orderId).order("submitted_at", { ascending: false });
        if (props.cdkId) query = query.contains("payload", { _cdk_id: props.cdkId });
        const { data, error } = await query.limit(1).maybeSingle();
        if (!error) {
          latestFulfillment.value = data;
          initFormData();
        }
      } catch (e) {
        console.error(e);
      }
    };
    watch(() => props.cdkFields, initFormData, { immediate: true });
    __expose({ refresh: fetchLatestFulfillment });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-submit-form" }, _attrs))} data-v-a72ee594><div class="form-tip" data-v-a72ee594> \u8BF7\u586B\u5199\u4EE5\u4E0B\u4FE1\u606F\u4EE5\u8FDB\u884C\u5145\u503C </div><div class="fields-container" data-v-a72ee594><!--[-->`);
      ssrRenderList(fields.value, (field) => {
        _push(`<div class="field-item" data-v-a72ee594><label data-v-a72ee594>${ssrInterpolate(field.label)}</label><div class="input-box" data-v-a72ee594><input${ssrRenderAttr("value", formData[field.key])}${ssrRenderAttr("placeholder", "\u8BF7\u8F93\u5165" + field.label)} data-v-a72ee594></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (latestStatus.value) {
        _push(`<div class="${ssrRenderClass([latestStatus.value, "status-banner"])}" data-v-a72ee594>`);
        if (latestStatus.value === "submitted") {
          _push(`<div class="status-content" data-v-a72ee594><div class="icon-spin" data-v-a72ee594>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(loading_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="text" data-v-a72ee594><div class="t-title" data-v-a72ee594>\u5BA1\u6838\u4E2D</div><div class="t-desc" data-v-a72ee594>\u60A8\u7684\u56DE\u6267\u5DF2\u63D0\u4EA4\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...</div></div></div>`);
        } else if (latestStatus.value === "approved") {
          _push(`<div class="status-content" data-v-a72ee594><div class="icon" data-v-a72ee594>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_check_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="text" data-v-a72ee594><div class="t-title" data-v-a72ee594>\u5DF2\u901A\u8FC7</div><div class="t-desc" data-v-a72ee594>\u5145\u503C\u5DF2\u5B8C\u6210\uFF0C\u8BF7\u68C0\u67E5\u5230\u8D26\u60C5\u51B5\u3002</div></div></div>`);
        } else if (latestStatus.value === "rejected") {
          _push(`<div class="status-content" data-v-a72ee594><div class="icon" data-v-a72ee594>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_close_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_close_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="text" data-v-a72ee594><div class="t-title" data-v-a72ee594>\u5DF2\u9A73\u56DE</div><div class="t-desc" data-v-a72ee594>\u539F\u56E0: ${ssrInterpolate(latestRejectReason.value)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-a72ee594>`);
      if (!latestStatus.value || latestStatus.value === "rejected") {
        _push(`<button class="action-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-a72ee594>${ssrInterpolate(isSubmitting.value ? "\u63D0\u4EA4\u4E2D..." : latestStatus.value === "rejected" ? "\u91CD\u65B0\u63D0\u4EA4" : "\u63D0\u4EA4\u56DE\u6267")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "submitted") {
        _push(`<button class="action-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-a72ee594>${ssrInterpolate(isSubmitting.value ? "\u4FDD\u5B58\u4E2D..." : "\u4FEE\u6539\u4FE1\u606F")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "approved") {
        _push(`<button class="action-btn outline"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-a72ee594> \u518D\u6B21\u63D0\u4EA4 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/FulfillmentSubmitForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const FulfillmentSubmitForm = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a72ee594"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FulfillmentHistory",
  __ssrInlineRender: true,
  props: {
    orderId: {},
    filterCdkId: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const records = ref([]);
    const isExpanded = ref(false);
    const displayRecords = computed(() => {
      if (isExpanded.value) return records.value;
      return records.value.slice(0, 1);
    });
    const fetchHistory = async () => {
      if (!props.orderId) return;
      try {
        const client = getSupabaseClient();
        let query = client.from("order_fulfillments").select("*").eq("order_id", props.orderId).order("submitted_at", { ascending: false });
        if (props.filterCdkId) {
          query = query.contains("payload", { _cdk_id: props.filterCdkId });
        }
        const { data, error } = await query;
        if (!error && data) {
          records.value = data;
        }
      } catch (err) {
        console.error(err);
      }
    };
    const statusText = (status) => {
      const map = { submitted: "\u5BA1\u6838\u4E2D", approved: "\u5DF2\u901A\u8FC7", rejected: "\u5DF2\u9A73\u56DE" };
      return map[status] || status;
    };
    const formatTime = (time) => {
      const date = new Date(time);
      const m = (date.getMonth() + 1).toString().padStart(2, "0");
      const d = date.getDate().toString().padStart(2, "0");
      const h = date.getHours().toString().padStart(2, "0");
      const min = date.getMinutes().toString().padStart(2, "0");
      return `${m}-${d} ${h}:${min}`;
    };
    const maskValue = (value) => {
      if (!value || value.length <= 4) return value;
      return value.slice(0, 2) + "****" + value.slice(-2);
    };
    __expose({ refresh: fetchHistory });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (records.value.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-history-card" }, _attrs))} data-v-765055e2><div class="card-header" data-v-765055e2><div class="header-main" data-v-765055e2><span class="title" data-v-765055e2>\u56DE\u6267\u8BB0\u5F55</span><span class="badge" data-v-765055e2>${ssrInterpolate(records.value.length)}</span></div><div class="toggle-icon" data-v-765055e2>`);
        _push(ssrRenderComponent(_component_el_icon, {
          class: { "rotate-180": isExpanded.value }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(arrow_down_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(arrow_down_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        if (isExpanded.value || records.value.length > 0) {
          _push(`<div class="history-list" data-v-765055e2><!--[-->`);
          ssrRenderList(displayRecords.value, (record, index) => {
            _push(`<div class="${ssrRenderClass([record.status, "record-item"])}" data-v-765055e2><div class="record-top" data-v-765055e2><div class="${ssrRenderClass([record.status, "status-tag"])}" data-v-765055e2>`);
            if (record.status === "approved") {
              _push(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(unref(circle_check_default), null, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(circle_check_default))
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (record.status === "rejected") {
              _push(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(unref(circle_close_default), null, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(circle_close_default))
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(loading_default))
                    ];
                  }
                }),
                _: 2
              }, _parent));
            }
            _push(`<span data-v-765055e2>${ssrInterpolate(statusText(record.status))}</span></div><span class="time" data-v-765055e2>${ssrInterpolate(formatTime(record.submitted_at))}</span></div><div class="record-body" data-v-765055e2><!--[-->`);
            ssrRenderList(record.payload, (value, key) => {
              _push(`<div class="field-row" style="${ssrRenderStyle(key !== "_cdk_id" ? null : { display: "none" })}" data-v-765055e2><span class="label" data-v-765055e2>${ssrInterpolate(key)}:</span><span class="val" data-v-765055e2>${ssrInterpolate(maskValue(value))}</span></div>`);
            });
            _push(`<!--]--></div>`);
            if (record.status === "rejected" && record.reject_reason) {
              _push(`<div class="reject-box" data-v-765055e2>`);
              _push(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(warning_default))
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`<span data-v-765055e2>\u539F\u56E0: ${ssrInterpolate(record.reject_reason)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/FulfillmentHistory.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const FulfillmentHistory = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-765055e2"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MobileRenewalSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useRouter();
    useUserStore();
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const loading = ref(false);
    const paying = ref(false);
    const skuList = ref([]);
    const currentEndTime = ref("");
    const productInfo = reactive({ id: "", name: "", image: "" });
    const selectedSkuId = ref("");
    const selectedSpecs = reactive({});
    const availableCoupons = ref([]);
    const selectedCoupon = ref(null);
    const discountAmount = ref(0);
    const specGroups = computed(() => {
      if (!skuList.value.length) return [];
      const groups = {};
      skuList.value.forEach((sku) => {
        const combo = sku.spec_combination || {};
        Object.entries(combo).forEach(([k, v]) => {
          if (!groups[k]) groups[k] = /* @__PURE__ */ new Set();
          groups[k].add(v);
        });
      });
      return Object.entries(groups).map(([k, set]) => ({
        name: k,
        values: Array.from(set).map((v) => ({ value: v }))
      }));
    });
    const originalAmount = computed(() => {
      const sku = skuList.value.find((s) => s.sku_id === selectedSkuId.value);
      return sku ? sku.price : 0;
    });
    const finalAmount = computed(() => {
      return Math.max(0, originalAmount.value - discountAmount.value).toFixed(2);
    });
    const loadData = async () => {
      loading.value = true;
      try {
        const res = await clientOrderApi.getRenewalSkus(props.orderId);
        if (res.success) {
          skuList.value = res.skus || [];
          currentEndTime.value = res.endTime || "";
          if (res.product) {
            productInfo.id = res.product.id;
            productInfo.name = res.product.name;
            productInfo.image = res.product.image;
          }
          if (skuList.value.length > 0) {
            const first = skuList.value[0];
            if (first.spec_combination) {
              Object.assign(selectedSpecs, first.spec_combination);
            }
            selectedSkuId.value = first.sku_id;
          }
          fetchCoupons();
        }
      } catch (e) {
      } finally {
        loading.value = false;
      }
    };
    const fetchCoupons = async () => {
      try {
        const res = await clientOrderApi.getUsableCoupons({
          product_ids: [productInfo.id],
          amount: originalAmount.value
        });
        if (res.success) {
          availableCoupons.value = res.data || [];
        }
      } catch (e) {
        console.error("Failed to fetch coupons", e);
      }
    };
    const formatDate = (s) => s ? s.split("T")[0] : "-";
    watch(() => props.modelValue, (v) => {
      if (v) loadData();
    });
    watch(originalAmount, () => fetchCoupons());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (visible.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sheet-mask" }, _attrs))} data-v-f04d8ecd><div class="sheet-panel" data-v-f04d8ecd><div class="sheet-header" data-v-f04d8ecd><div class="title" data-v-f04d8ecd>\u7EED\u8D39\u8BA2\u5355</div><div class="close-btn" data-v-f04d8ecd>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(close_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        if (loading.value) {
          _push(`<div class="sheet-body" data-v-f04d8ecd><div class="loading-box" data-v-f04d8ecd>\u52A0\u8F7D\u4E2D...</div></div>`);
        } else {
          _push(`<div class="sheet-body" data-v-f04d8ecd><div class="prod-row" data-v-f04d8ecd><div class="thumb" data-v-f04d8ecd><img${ssrRenderAttr("src", productInfo.image)} data-v-f04d8ecd></div><div class="info" data-v-f04d8ecd><div class="name" data-v-f04d8ecd>${ssrInterpolate(productInfo.name)}</div><div class="expire" data-v-f04d8ecd>\u5F53\u524D\u5230\u671F: ${ssrInterpolate(formatDate(currentEndTime.value))}</div></div></div><div class="specs-section" data-v-f04d8ecd><!--[-->`);
          ssrRenderList(specGroups.value, (group) => {
            _push(`<div class="group" data-v-f04d8ecd><div class="g-name" data-v-f04d8ecd>${ssrInterpolate(group.name)}</div><div class="g-vals" data-v-f04d8ecd><!--[-->`);
            ssrRenderList(group.values, (val) => {
              _push(`<div class="${ssrRenderClass([{ active: selectedSpecs[group.name] === val.value }, "val-chip"])}" data-v-f04d8ecd>${ssrInterpolate(val.value)}</div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]-->`);
          if (specGroups.value.length === 0 && skuList.value.length > 0) {
            _push(`<div class="group" data-v-f04d8ecd><div class="g-name" data-v-f04d8ecd>\u9009\u62E9\u65F6\u957F</div><div class="g-vals" data-v-f04d8ecd><!--[-->`);
            ssrRenderList(skuList.value, (sku) => {
              _push(`<div class="${ssrRenderClass([{ active: selectedSkuId.value === sku.sku_id }, "val-chip"])}" data-v-f04d8ecd>${ssrInterpolate(sku.duration)}\u5929 </div>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (availableCoupons.value.length > 0) {
            _push(`<div class="coupon-section" data-v-f04d8ecd><div class="g-name" data-v-f04d8ecd>\u4F18\u60E0\u5238</div><div class="coupon-list" data-v-f04d8ecd><div class="${ssrRenderClass([{ active: !selectedCoupon.value }, "coupon-item"])}" data-v-f04d8ecd> \u4E0D\u4F7F\u7528\u4F18\u60E0\u5238 </div><!--[-->`);
            ssrRenderList(availableCoupons.value, (coupon) => {
              var _a;
              _push(`<div class="${ssrRenderClass([{ active: ((_a = selectedCoupon.value) == null ? void 0 : _a.id) === coupon.id }, "coupon-item"])}" data-v-f04d8ecd><span class="c-name" data-v-f04d8ecd>${ssrInterpolate(coupon.coupon.name)}</span>`);
              if (coupon.coupon.type === "flat") {
                _push(`<span class="c-val" data-v-f04d8ecd>-\xA5${ssrInterpolate(coupon.coupon.value)}</span>`);
              } else if (coupon.coupon.type === "product") {
                _push(`<span class="c-val" data-v-f04d8ecd>\u514D\u5355</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`<div class="sheet-footer" data-v-f04d8ecd><div class="price-info" data-v-f04d8ecd><div class="total-label" data-v-f04d8ecd>\u603B\u8BA1</div><div class="price-row" data-v-f04d8ecd><div class="price" data-v-f04d8ecd>\xA5${ssrInterpolate(finalAmount.value)}</div>`);
        if (discountAmount.value > 0) {
          _push(`<div class="discount-tag" data-v-f04d8ecd>-\xA5${ssrInterpolate(discountAmount.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><button class="pay-btn"${ssrIncludeBooleanAttr(!selectedSkuId.value || paying.value) ? " disabled" : ""} data-v-f04d8ecd>${ssrInterpolate(paying.value ? "\u652F\u4ED8\u4E2D..." : "\u7ACB\u5373\u652F\u4ED8")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileRenewalSheet.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileRenewalSheet = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f04d8ecd"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileRefundSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    orderNo: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const submitting = ref(false);
    const form = reactive({
      reason: "",
      detail: ""
    });
    const reasons = ["\u4E70\u9519\u4E86/\u4E0D\u9700\u8981\u4E86", "\u5546\u54C1\u65E0\u6CD5\u4F7F\u7528", "\u53D1\u8D27\u901F\u5EA6\u592A\u6162", "\u5546\u54C1\u63CF\u8FF0\u4E0D\u7B26", "\u5176\u4ED6\u539F\u56E0"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (visible.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sheet-mask" }, _attrs))} data-v-d3c29205><div class="sheet-panel" data-v-d3c29205><div class="sheet-header" data-v-d3c29205><div class="title" data-v-d3c29205>\u7533\u8BF7\u9000\u6B3E</div><div class="close-btn" data-v-d3c29205>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(close_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="sheet-body" data-v-d3c29205><div class="warning-tip" data-v-d3c29205>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(warning_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u7533\u8BF7\u9000\u6B3E\u540E\u5546\u54C1\u5C06\u7ACB\u5373\u51BB\u7ED3\uFF0C\u5982\u6709\u7591\u95EE\u8BF7\u5148\u8054\u7CFB\u5BA2\u670D\u3002 \u8BA2\u5355\u53F7: ${ssrInterpolate(__props.orderNo)}</div><div class="form-section" data-v-d3c29205><div class="label" data-v-d3c29205>\u9000\u6B3E\u539F\u56E0</div><div class="reason-chips" data-v-d3c29205><!--[-->`);
        ssrRenderList(reasons, (r) => {
          _push(`<div class="${ssrRenderClass([{ active: form.reason === r }, "chip"])}" data-v-d3c29205>${ssrInterpolate(r)}</div>`);
        });
        _push(`<!--]--></div></div><div class="form-section" data-v-d3c29205><div class="label" data-v-d3c29205>\u8BE6\u7EC6\u8BF4\u660E</div><textarea class="desc-input" placeholder="\u8BF7\u586B\u5199\u8BE6\u7EC6\u8BF4\u660E\uFF08\u9009\u586B\uFF09" rows="3" data-v-d3c29205>${ssrInterpolate(form.detail)}</textarea></div><button class="submit-btn"${ssrIncludeBooleanAttr(!form.reason || submitting.value) ? " disabled" : ""} data-v-d3c29205>${ssrInterpolate(submitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u7533\u8BF7")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileRefundSheet.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileRefundSheet = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d3c29205"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileTicketSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    orderInfo: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const submitting = ref(false);
    const uploading = ref(false);
    ref(null);
    const priorities = [
      { label: "\u4E00\u822C", val: "low" },
      { label: "\u91CD\u8981", val: "medium" },
      { label: "\u7D27\u6025", val: "high" }
    ];
    const form = reactive({
      title: "",
      content: "",
      priority: "medium",
      attachments: []
    });
    const isValid = computed(() => form.title && form.content);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (visible.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sheet-mask" }, _attrs))} data-v-5cdfaf2a><div class="sheet-panel" data-v-5cdfaf2a><div class="sheet-header" data-v-5cdfaf2a><div class="title" data-v-5cdfaf2a>\u63D0\u4EA4\u5DE5\u5355</div><div class="close-btn" data-v-5cdfaf2a>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(close_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="sheet-body" data-v-5cdfaf2a>`);
        if (__props.orderInfo) {
          _push(`<div class="order-card-glass" data-v-5cdfaf2a><div class="card-image" data-v-5cdfaf2a><img${ssrRenderAttr("src", __props.orderInfo.productImage)} alt="Product" data-v-5cdfaf2a></div><div class="card-info" data-v-5cdfaf2a><div class="info-top" data-v-5cdfaf2a><span class="order-no" data-v-5cdfaf2a>\u8BA2\u5355\u53F7 ${ssrInterpolate(__props.orderInfo.order_no)}</span></div><div class="product-name" data-v-5cdfaf2a>${ssrInterpolate(__props.orderInfo.productName)}</div><div class="specs" data-v-5cdfaf2a><span data-v-5cdfaf2a>${ssrInterpolate(__props.orderInfo.skuSpec)}</span></div><div class="price-row" data-v-5cdfaf2a><span class="price" data-v-5cdfaf2a>\xA5${ssrInterpolate(__props.orderInfo.totalAmount)}</span><span class="quantity" data-v-5cdfaf2a>x${ssrInterpolate(__props.orderInfo.quantity)}</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>\u6807\u9898 <span class="req" data-v-5cdfaf2a>*</span></label><input${ssrRenderAttr("value", form.title)} class="m-input" placeholder="\u7B80\u8981\u63CF\u8FF0\u95EE\u9898" data-v-5cdfaf2a></div><div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>\u4F18\u5148\u7EA7</label><div class="priority-row" data-v-5cdfaf2a><!--[-->`);
        ssrRenderList(priorities, (p) => {
          _push(`<div class="${ssrRenderClass([{ active: form.priority === p.val, [p.val]: true }, "p-chip"])}" data-v-5cdfaf2a>${ssrInterpolate(p.label)}</div>`);
        });
        _push(`<!--]--></div></div><div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>\u8BE6\u7EC6\u63CF\u8FF0 <span class="req" data-v-5cdfaf2a>*</span></label><textarea class="m-input area" rows="4" placeholder="\u8BF7\u8BE6\u7EC6\u63CF\u8FF0..." data-v-5cdfaf2a>${ssrInterpolate(form.content)}</textarea></div><div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>\u622A\u56FE (${ssrInterpolate(form.attachments.length)}/3)</label><div class="upload-row" data-v-5cdfaf2a><!--[-->`);
        ssrRenderList(form.attachments, (url, idx) => {
          _push(`<div class="img-preview" data-v-5cdfaf2a><img${ssrRenderAttr("src", url)} data-v-5cdfaf2a><div class="del-btn" data-v-5cdfaf2a>\xD7</div></div>`);
        });
        _push(`<!--]-->`);
        if (form.attachments.length < 3) {
          _push(`<div class="add-btn" data-v-5cdfaf2a>`);
          if (uploading.value) {
            _push(`<span data-v-5cdfaf2a>...</span>`);
          } else {
            _push(`<span data-v-5cdfaf2a>+</span>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><input type="file" hidden accept="image/*" data-v-5cdfaf2a></div></div><div class="sheet-footer" data-v-5cdfaf2a><button class="submit-btn"${ssrIncludeBooleanAttr(!isValid.value || submitting.value) ? " disabled" : ""} data-v-5cdfaf2a>${ssrInterpolate(submitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u5DE5\u5355")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileTicketSheet.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileTicketSheet = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5cdfaf2a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const orderId = route.params.id;
    const loading = ref(true);
    const { getOrderStatusLabel } = useBizConfig();
    const { formatDate } = useBizFormat();
    const formatTime = (t) => t ? formatDate(t) : "--";
    const order = ref({});
    const cdkList = ref([]);
    const slotList = ref([]);
    const instructionImage = ref("");
    const activeTicketId = ref(null);
    const pendingRefundRequest = ref(null);
    const historyRef = ref(null);
    const showRenewalSheet = ref(false);
    const showRefundSheet = ref(false);
    const showTicketSheet = ref(false);
    const showContactModal = ref(false);
    const statusText = computed(() => {
      const s = order.value.status;
      if (s === "pending_delivery") return "\u5F85\u53D1\u8D27";
      if (s === "active") return "\u4F7F\u7528\u4E2D";
      if (s === "refunding") return "\u9000\u6B3E\u4E2D";
      if (s === "refunded") return "\u5DF2\u9000\u6B3E";
      return getOrderStatusLabel(s || "");
    });
    const isOneTime = computed(() => order.value.orderType === "one_time_cdk");
    const canRenew = computed(() => !isOneTime.value && ["active", "expired"].includes(order.value.status || ""));
    const canRefund = computed(() => !isOneTime.value && ["pending_delivery", "active"].includes(order.value.status || ""));
    const loadData = async () => {
      var _a, _b, _c;
      if (!orderId) return;
      loading.value = true;
      try {
        const res = await clientOrderApi.getOrderDetail(orderId);
        if (res.success && res.data) {
          const d = res.data;
          order.value = {
            id: d.id,
            order_no: d.order_no,
            orderType: d.order_type,
            status: d.status,
            quantity: d.quantity,
            totalAmount: Number(d.total_amount).toFixed(2),
            createdAt: d.created_at,
            expires_at: d.expires_at,
            productName: ((_a = d.product_snapshot) == null ? void 0 : _a.product_name) || "",
            productImage: ((_b = d.product_snapshot) == null ? void 0 : _b.image) || "",
            skuSpec: ((_c = d.sku_snapshot) == null ? void 0 : _c.spec_combination) ? Object.values(d.sku_snapshot.spec_combination).join(" ") : "\u6807\u51C6"
          };
          if (d.cdkList) {
            cdkList.value = d.cdkList;
            if (cdkList.value.length > 0) {
              const first = cdkList.value[0];
              if (first.accountData) {
                instructionImage.value = first.accountData.image || first.accountData.help_image || "";
              }
            }
          }
          slotList.value = d.slotList || [];
          if (["refunding", "active", "pending_delivery"].includes(d.status)) {
            const r = await clientOrderApi.getRefundRequest(orderId);
            if (r.success) pendingRefundRequest.value = r.data;
          }
          const t = await ticketApi.getList("processing");
          if (t.success && t.data) {
            const match = t.data.find((x) => x.order_id === orderId);
            activeTicketId.value = match ? match.id : null;
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    const getCdkForSlot = (slot) => cdkList.value.find((c) => c.id === slot.cdk_id) || {};
    const getFieldsForCdk = (cdk) => {
      var _a;
      let keys = [];
      if (cdk.parsed && typeof cdk.parsed === "object") {
        if (Array.isArray(cdk.parsed.fields) && cdk.parsed.fields.length > 0) {
          keys = cdk.parsed.fields.filter((f) => typeof f === "string");
        } else if (Object.keys(cdk.parsed).length > 0) {
          keys = Object.keys(cdk.parsed);
        }
      }
      if (keys.length === 0) {
        const raw = ((_a = cdk.code) == null ? void 0 : _a.trim()) || "";
        if (!raw) return [];
        let cleaned = raw.replace(/[\(\)（）\[\]【】]/g, "");
        keys = cleaned.split(/[,，、]/).map((s) => s.trim()).filter((s) => s.length > 0);
      }
      return keys.map((key) => ({ key, label: key, value: "" }));
    };
    const handleFulfillmentSuccess = () => {
      var _a;
      (_a = historyRef.value) == null ? void 0 : _a.refresh();
    };
    const onTicketSuccess = () => {
      ElMessage.success("\u5DE5\u5355\u5DF2\u63D0\u4EA4");
      loadData();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-order-detail" }, _attrs))} data-v-8d025a81><div class="sticky-header" data-v-8d025a81><div class="header-top" data-v-8d025a81><div class="back-btn" data-v-8d025a81>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-title" data-v-8d025a81>\u8BA2\u5355\u8BE6\u60C5</div><div class="header-action" data-v-8d025a81></div></div><div class="${ssrRenderClass([order.value.status, "status-card"])}" data-v-8d025a81><div class="status-main" data-v-8d025a81><div class="status-icon" data-v-8d025a81>`);
      if (order.value.status === "active") {
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(circle_check_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(circle_check_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (order.value.status === "pending_delivery") {
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(box_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(box_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (order.value.status === "refunding") {
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(refresh_left_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(refresh_left_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(info_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div><div class="status-text" data-v-8d025a81><div class="status-label" data-v-8d025a81>${ssrInterpolate(statusText.value)}</div>`);
      if (order.value.status === "active") {
        _push(`<div class="status-sub" data-v-8d025a81>\u5230\u671F: ${ssrInterpolate(formatTime(order.value.expires_at))}</div>`);
      } else {
        _push(`<div class="status-sub" data-v-8d025a81>\u4E0B\u5355: ${ssrInterpolate(formatTime(order.value.createdAt))}</div>`);
      }
      _push(`</div><div class="status-amount" data-v-8d025a81><span class="symbol" data-v-8d025a81>\xA5</span><span class="val" data-v-8d025a81>${ssrInterpolate(order.value.totalAmount)}</span></div></div><div class="ops-bar" data-v-8d025a81><button class="op-btn" data-v-8d025a81>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(headset_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(headset_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u5BA2\u670D </button>`);
      if (activeTicketId.value) {
        _push(`<button class="op-btn" data-v-8d025a81>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(tickets_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(tickets_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u5DE5\u5355 </button>`);
      } else {
        _push(`<button class="op-btn" data-v-8d025a81>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(tickets_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(tickets_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u62A5\u969C </button>`);
      }
      if (canRenew.value) {
        _push(`<button class="op-btn primary" data-v-8d025a81>\u7EED\u8D39</button>`);
      } else {
        _push(`<!---->`);
      }
      if (order.value.status === "refunding" || pendingRefundRequest.value) {
        _push(`<button class="op-btn warning" data-v-8d025a81>\u53D6\u6D88\u9000\u6B3E</button>`);
      } else if (canRefund.value) {
        _push(`<button class="op-btn danger" data-v-8d025a81>\u9000\u6B3E</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (!loading.value) {
        _push(`<div class="content-body" data-v-8d025a81><div class="info-card" data-v-8d025a81><div class="prod-row" data-v-8d025a81><div class="prod-thumb" data-v-8d025a81>`);
        _push(ssrRenderComponent(_component_el_image, {
          src: order.value.productImage,
          fit: "cover"
        }, null, _parent));
        _push(`</div><div class="prod-info" data-v-8d025a81><div class="prod-name" data-v-8d025a81>${ssrInterpolate(order.value.productName)}</div><div class="prod-meta" data-v-8d025a81><span class="tag" data-v-8d025a81>${ssrInterpolate(order.value.skuSpec)}</span><span class="qty" data-v-8d025a81>x${ssrInterpolate(order.value.quantity)}</span></div><div class="order-no" data-v-8d025a81> NO.${ssrInterpolate(order.value.order_no)} `);
        _push(ssrRenderComponent(_component_el_icon, null, {
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
        _push(`</div></div></div></div>`);
        if (["pending_delivery", "active", "completed", "refunding"].includes(order.value.status || "")) {
          _push(`<div class="fulfillment-container" data-v-8d025a81>`);
          if (order.value.orderType === "shared_account") {
            _push(`<!--[-->`);
            ssrRenderList(slotList.value, (slot, idx) => {
              _push(`<div class="section-group" data-v-8d025a81>`);
              _push(ssrRenderComponent(FulfillmentShared, {
                "cdk-item": getCdkForSlot(slot),
                "slot-index": slot.slot_index
              }, null, _parent));
              _push(`</div>`);
            });
            _push(`<!--]-->`);
          } else if (order.value.orderType === "one_time_cdk") {
            _push(`<div class="section-group" data-v-8d025a81><div class="section-title" data-v-8d025a81>\u5361\u5BC6\u4FE1\u606F</div>`);
            _push(ssrRenderComponent(FulfillmentCdk, { "cdk-list": cdkList.value }, null, _parent));
            _push(`</div>`);
          } else if (order.value.orderType === "virtual" && cdkList.value.length > 0) {
            _push(`<div class="section-group" data-v-8d025a81><div class="section-title" data-v-8d025a81>\u5145\u503C\u8FDB\u5EA6</div><div class="virtual-item-group" data-v-8d025a81>`);
            _push(ssrRenderComponent(FulfillmentSubmitForm, {
              "order-id": order.value.id,
              "order-status": order.value.status,
              "cdk-fields": getFieldsForCdk(cdkList.value[0]),
              "cdk-id": cdkList.value[0].id,
              onSubmitSuccess: handleFulfillmentSuccess
            }, null, _parent));
            _push(ssrRenderComponent(FulfillmentHistory, {
              ref_key: "historyRef",
              ref: historyRef,
              "order-id": order.value.id,
              "filter-cdk-id": cdkList.value[0].id
            }, null, _parent));
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (instructionImage.value) {
          _push(`<div class="section-group" data-v-8d025a81><div class="section-title" data-v-8d025a81>\u4F7F\u7528\u8BF4\u660E</div><div class="tutorial-box" data-v-8d025a81>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: instructionImage.value,
            fit: "cover"
          }, null, _parent));
          _push(`<div class="zoom-hint" data-v-8d025a81>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(zoom_in_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(zoom_in_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="loading-screen" data-v-8d025a81><div class="spinner" data-v-8d025a81></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (order.value.id) {
        _push(ssrRenderComponent(MobileRenewalSheet, {
          modelValue: showRenewalSheet.value,
          "onUpdate:modelValue": ($event) => showRenewalSheet.value = $event,
          "order-id": order.value.id,
          onSuccess: loadData
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (order.value.id) {
        _push(ssrRenderComponent(MobileRefundSheet, {
          modelValue: showRefundSheet.value,
          "onUpdate:modelValue": ($event) => showRefundSheet.value = $event,
          "order-id": order.value.id,
          "order-no": order.value.order_no,
          onSuccess: loadData
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showTicketSheet.value && order.value.id) {
        _push(ssrRenderComponent(MobileTicketSheet, {
          modelValue: showTicketSheet.value,
          "onUpdate:modelValue": ($event) => showTicketSheet.value = $event,
          "order-id": order.value.id,
          "order-info": order.value,
          onSuccess: onTicketSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showContactModal.value) {
        _push(ssrRenderComponent(ContactModal, {
          onClose: ($event) => showContactModal.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/order/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d025a81"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Dh5I_DCV.mjs.map
