import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, computed, watch, reactive, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderTeleport } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useToast } from './useToast-DsT-1f4c.mjs';
import { e as circle_check_default, a3 as box_default, r as refresh_left_default, i as info_filled_default, a5 as headset_default, a6 as tickets_default, m as zoom_in_default, l as loading_default, B as user_default, L as copy_document_default, p as plus_default, d as circle_close_default, a9 as arrow_down_default, v as warning_default, b as close_default, T as select_default, w as warning_filled_default } from './index-DNnPa_Q9.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-4aDAI7XP.mjs';
import { M as MobileOrderProductInfo } from './MobileOrderProductInfo-Ctf9yxKT.mjs';
import { u as useOrderDetail } from './useOrderDetail-D54TMbz_.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import { _ as _export_sfc } from './server.mjs';
import { c as clientOrderApi } from './order---CTIOc2.mjs';
import { c as couponApi } from './coupon-CAcMEk5R.mjs';
import { u as useUserStore } from './user-DLDq0pTF.mjs';
import { u as useNotify } from './useNotify-QNEBBzdZ.mjs';
import { u as useBizFormat } from './useBizFormat-D_CzFEgD.mjs';
import { M as MobileContactModal } from './MobileContactModal-B0rdP2gU.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './ticket-CclS-v1H.mjs';
import './useBizConfig-tsYRZrF8.mjs';
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
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './index-BwQVtIp5.mjs';
import './typescript-D6L75muK.mjs';
import './icon-Ck0_dGQP.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './index-DbvZsXcZ.mjs';
import './event-D3FEo2C5.mjs';
import './useSystemConfig-uu86svaG.mjs';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "MobileFulfillmentShared",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-shared-card" }, _attrs))} data-v-58ab82d2><div class="info-card-glass" data-v-58ab82d2><div class="card-header" data-v-58ab82d2><div class="slot-badge" data-v-58ab82d2>`);
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
      _push(`<span data-v-58ab82d2>\u6211\u7684\u8F66\u4F4D: ${ssrInterpolate(formatSlotIndex(__props.slotIndex))}\u53F7</span></div></div><div class="card-body" data-v-58ab82d2><!--[-->`);
      ssrRenderList(parseCdkCode(__props.cdkItem), (val, key) => {
        _push(`<div class="cred-row" data-v-58ab82d2><div class="cred-label" data-v-58ab82d2>${ssrInterpolate(key)}</div><div class="cred-value-box" data-v-58ab82d2><span class="cred-value" data-v-58ab82d2>${ssrInterpolate(val)}</span><div class="copy-tag" data-v-58ab82d2>`);
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
      _push(`<!--]--></div></div><div class="info-card-glass" data-v-58ab82d2><div class="card-header" data-v-58ab82d2><span class="section-title" data-v-58ab82d2>\u5171\u4EAB\u8F66\u53CB</span><span class="count-badge" data-v-58ab82d2>${ssrInterpolate(occupiedCount.value)}/${ssrInterpolate(maxSlots.value)}</span></div><div class="card-body" data-v-58ab82d2><div class="roommates-scroll" data-v-58ab82d2><!--[-->`);
      ssrRenderList(allSlots.value, (slot) => {
        var _a;
        _push(`<div class="${ssrRenderClass([{ "is-me": slot.isMe }, "roommate-item"])}" data-v-58ab82d2><div class="${ssrRenderClass([{ "active": slot.user }, "avatar-box"])}" data-v-58ab82d2>`);
        if (slot.user && slot.user.avatar) {
          _push(`<img${ssrRenderAttr("src", slot.user.avatar)} data-v-58ab82d2>`);
        } else if (slot.user) {
          _push(`<div class="avatar-placeholder" data-v-58ab82d2>${ssrInterpolate((slot.user.nickname || "U")[0].toUpperCase())}</div>`);
        } else {
          _push(`<div class="avatar-placeholder empty" data-v-58ab82d2>`);
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
        _push(`</div><div class="roommate-name" data-v-58ab82d2>${ssrInterpolate(slot.isMe ? "\u6211" : ((_a = slot.user) == null ? void 0 : _a.nickname) || "\u7A7A")}</div><div class="slot-num" data-v-58ab82d2>${ssrInterpolate(slot.index)}\u53F7</div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileFulfillmentShared.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const MobileFulfillmentShared = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-58ab82d2"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "MobileFulfillmentCdk",
  __ssrInlineRender: true,
  props: {
    cdkList: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-cdk-list" }, _attrs))} data-v-531a1122><!--[-->`);
      ssrRenderList(__props.cdkList, (item, index) => {
        _push(`<div class="info-card-glass" data-v-531a1122><div class="cdk-header" data-v-531a1122><span class="cdk-label" data-v-531a1122>\u5361\u5BC6 ${ssrInterpolate(index + 1)}</span><div class="copy-tag" data-v-531a1122>`);
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
        _push(`</div></div><div class="cdk-content" data-v-531a1122><div class="code-box" data-v-531a1122>${ssrInterpolate(item.code)}</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileFulfillmentCdk.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const MobileFulfillmentCdk = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-531a1122"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MobileFulfillmentSubmitForm",
  __ssrInlineRender: true,
  props: {
    orderId: {},
    orderStatus: {},
    cdkFields: {},
    cdkId: {}
  },
  emits: ["submit-success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const formData = reactive({});
    const latestFulfillment = ref(null);
    const isSubmitting = ref(false);
    const fields = computed(() => props.cdkFields || []);
    const latestStatus = computed(() => {
      var _a;
      return ((_a = latestFulfillment.value) == null ? void 0 : _a.status) || "";
    });
    const latestRejectReason = computed(() => {
      var _a;
      return ((_a = latestFulfillment.value) == null ? void 0 : _a.reject_reason) || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-submit-form" }, _attrs))} data-v-5c8d21eb><div class="form-tip" data-v-5c8d21eb>`);
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
      _push(`<span data-v-5c8d21eb>\u8BF7\u586B\u5199\u4EE5\u4E0B\u4FE1\u606F\u4EE5\u8FDB\u884C\u5145\u503C</span></div><div class="fields-container" data-v-5c8d21eb><!--[-->`);
      ssrRenderList(fields.value, (field) => {
        _push(`<div class="field-item" data-v-5c8d21eb><label data-v-5c8d21eb>${ssrInterpolate(field.label)}</label><div class="input-wrapper" data-v-5c8d21eb><input${ssrRenderAttr("value", formData[field.key])}${ssrRenderAttr("placeholder", "\u8BF7\u8F93\u5165" + field.label)} class="input-glass" data-v-5c8d21eb></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (latestStatus.value) {
        _push(`<div class="${ssrRenderClass([latestStatus.value, "status-banner"])}" data-v-5c8d21eb>`);
        if (latestStatus.value === "submitted") {
          _push(`<div class="status-content" data-v-5c8d21eb><div class="icon-spin" data-v-5c8d21eb>`);
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
          _push(`</div><div class="text" data-v-5c8d21eb><div class="t-title" data-v-5c8d21eb>\u5BA1\u6838\u4E2D</div><div class="t-desc" data-v-5c8d21eb>\u60A8\u7684\u56DE\u6267\u5DF2\u63D0\u4EA4\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...</div></div></div>`);
        } else if (latestStatus.value === "approved") {
          _push(`<div class="status-content" data-v-5c8d21eb><div class="icon" data-v-5c8d21eb>`);
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
          _push(`</div><div class="text" data-v-5c8d21eb><div class="t-title" data-v-5c8d21eb>\u5DF2\u901A\u8FC7</div><div class="t-desc" data-v-5c8d21eb>\u5145\u503C\u5DF2\u5B8C\u6210\uFF0C\u8BF7\u68C0\u67E5\u5230\u8D26\u60C5\u51B5\u3002</div></div></div>`);
        } else if (latestStatus.value === "rejected") {
          _push(`<div class="status-content" data-v-5c8d21eb><div class="icon" data-v-5c8d21eb>`);
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
          _push(`</div><div class="text" data-v-5c8d21eb><div class="t-title" data-v-5c8d21eb>\u5DF2\u9A73\u56DE</div><div class="t-desc" data-v-5c8d21eb>\u539F\u56E0: ${ssrInterpolate(latestRejectReason.value)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-5c8d21eb>`);
      if (!latestStatus.value || latestStatus.value === "rejected") {
        _push(`<button class="action-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-5c8d21eb>${ssrInterpolate(isSubmitting.value ? "\u63D0\u4EA4\u4E2D..." : latestStatus.value === "rejected" ? "\u91CD\u65B0\u63D0\u4EA4" : "\u63D0\u4EA4\u56DE\u6267")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "submitted") {
        _push(`<button class="action-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-5c8d21eb>${ssrInterpolate(isSubmitting.value ? "\u4FDD\u5B58\u4E2D..." : "\u4FEE\u6539\u4FE1\u606F")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "approved") {
        _push(`<button class="action-btn outline"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-5c8d21eb> \u518D\u6B21\u63D0\u4EA4 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileFulfillmentSubmitForm.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const MobileFulfillmentSubmitForm = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-5c8d21eb"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MobileFulfillmentHistory",
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-history-card" }, _attrs))} data-v-ee78458d><div class="card-header" data-v-ee78458d><div class="header-main" data-v-ee78458d><span class="title" data-v-ee78458d>\u56DE\u6267\u8BB0\u5F55</span><span class="badge" data-v-ee78458d>${ssrInterpolate(records.value.length)}</span></div><div class="toggle-icon" data-v-ee78458d>`);
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
          _push(`<div class="history-list" data-v-ee78458d><!--[-->`);
          ssrRenderList(displayRecords.value, (record, index) => {
            _push(`<div class="${ssrRenderClass([record.status, "record-item"])}" data-v-ee78458d><div class="record-top" data-v-ee78458d><div class="${ssrRenderClass([record.status, "status-tag"])}" data-v-ee78458d>`);
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
            _push(`<span data-v-ee78458d>${ssrInterpolate(statusText(record.status))}</span></div><span class="time" data-v-ee78458d>${ssrInterpolate(formatTime(record.submitted_at))}</span></div><div class="record-body" data-v-ee78458d><!--[-->`);
            ssrRenderList(record.payload, (value, key) => {
              _push(`<div class="field-row" style="${ssrRenderStyle(key !== "_cdk_id" ? null : { display: "none" })}" data-v-ee78458d><span class="label" data-v-ee78458d>${ssrInterpolate(key)}:</span><span class="val" data-v-ee78458d>${ssrInterpolate(maskValue(value))}</span></div>`);
            });
            _push(`<!--]--></div>`);
            if (record.status === "rejected" && record.reject_reason) {
              _push(`<div class="reject-box" data-v-ee78458d>`);
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
              _push(`<span data-v-ee78458d>\u539F\u56E0: ${ssrInterpolate(record.reject_reason)}</span></div>`);
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileFulfillmentHistory.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const MobileFulfillmentHistory = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-ee78458d"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MobileRenewalSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    order: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useUserStore();
    useNotify();
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
    const productInfoAsOrder = computed(() => ({
      ...props.order,
      productName: productInfo.name || props.order.productName,
      productImage: productInfo.image || props.order.productImage
    }));
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
        const res = await couponApi.getUserCoupons();
        if (res.success && res.data) {
          availableCoupons.value = res.data.filter((c) => {
            if (c.status !== "unused") return false;
            if (c.coupon.min_usage > originalAmount.value) return false;
            if (c.coupon.end_date && new Date(c.coupon.end_date) < /* @__PURE__ */ new Date()) return false;
            return true;
          });
        }
      } catch (e) {
        console.error("Failed to fetch coupons", e);
      }
    };
    watch(() => props.modelValue, (v) => {
      if (v) loadData();
    });
    watch(originalAmount, () => fetchCoupons());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="sheet-mask" data-v-520a0ed8><div class="sheet-panel-glass aurora-sheet-panel" data-v-520a0ed8><div class="sheet-header" data-v-520a0ed8><div class="title" data-v-520a0ed8>\u7EED\u8D39\u8BA2\u5355</div><div class="close-btn" data-v-520a0ed8>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(close_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div>`);
          if (loading.value) {
            _push2(`<div class="sheet-body" data-v-520a0ed8><div class="loading-box" data-v-520a0ed8><div class="spinner" data-v-520a0ed8></div><div data-v-520a0ed8>\u52A0\u8F7D\u4E2D...</div></div></div>`);
          } else {
            _push2(`<div class="sheet-body" data-v-520a0ed8>`);
            _push2(ssrRenderComponent(MobileOrderProductInfo, { order: productInfoAsOrder.value }, null, _parent));
            _push2(`<div class="specs-section" data-v-520a0ed8><!--[-->`);
            ssrRenderList(specGroups.value, (group) => {
              _push2(`<div class="group" data-v-520a0ed8><div class="g-name" data-v-520a0ed8>${ssrInterpolate(group.name)}</div><div class="g-vals" data-v-520a0ed8><!--[-->`);
              ssrRenderList(group.values, (val) => {
                _push2(`<div class="${ssrRenderClass([{ "active-blue": selectedSpecs[group.name] === val.value, active: selectedSpecs[group.name] === val.value }, "val-chip-glass aurora-option-card"])}" data-v-520a0ed8>${ssrInterpolate(val.value)}</div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]-->`);
            if (specGroups.value.length === 0 && skuList.value.length > 0) {
              _push2(`<div class="group" data-v-520a0ed8><div class="g-name" data-v-520a0ed8>\u9009\u62E9\u65F6\u957F</div><div class="g-vals" data-v-520a0ed8><!--[-->`);
              ssrRenderList(skuList.value, (sku) => {
                _push2(`<div class="${ssrRenderClass([{ "active": selectedSkuId.value === sku.sku_id, "active-blue": selectedSkuId.value === sku.sku_id }, "val-chip-glass aurora-option-card"])}" data-v-520a0ed8>${ssrInterpolate(sku.duration)}\u5929 </div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (availableCoupons.value.length > 0) {
              _push2(`<div class="coupon-section" data-v-520a0ed8><div class="g-name" data-v-520a0ed8>\u4F18\u60E0\u5238</div><div class="coupon-list" data-v-520a0ed8><div class="${ssrRenderClass([{ active: !selectedCoupon.value }, "coupon-item-glass aurora-option-card"])}" data-v-520a0ed8> \u4E0D\u4F7F\u7528\u4F18\u60E0\u5238 `);
              if (!selectedCoupon.value) {
                _push2(ssrRenderComponent(_component_el_icon, { class: "chk" }, {
                  default: withCtx((_, _push3, _parent2, _scopeId) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(select_default), null, null, _parent2, _scopeId));
                    } else {
                      return [
                        createVNode(unref(select_default))
                      ];
                    }
                  }),
                  _: 1
                }, _parent));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--[-->`);
              ssrRenderList(availableCoupons.value, (coupon) => {
                var _a, _b;
                _push2(`<div class="${ssrRenderClass([{ active: ((_a = selectedCoupon.value) == null ? void 0 : _a.id) === coupon.id }, "coupon-item-glass aurora-option-card"])}" data-v-520a0ed8><div class="c-left" data-v-520a0ed8><span class="c-name" data-v-520a0ed8>${ssrInterpolate(coupon.coupon.name)}</span></div><div class="c-right" data-v-520a0ed8>`);
                if (coupon.coupon.type === "flat") {
                  _push2(`<span class="c-val" data-v-520a0ed8>-\xA5${ssrInterpolate(coupon.coupon.value)}</span>`);
                } else if (coupon.coupon.type === "product") {
                  _push2(`<span class="c-val" data-v-520a0ed8>\u514D\u5355</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (((_b = selectedCoupon.value) == null ? void 0 : _b.id) === coupon.id) {
                  _push2(ssrRenderComponent(_component_el_icon, { class: "chk" }, {
                    default: withCtx((_, _push3, _parent2, _scopeId) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(select_default), null, null, _parent2, _scopeId));
                      } else {
                        return [
                          createVNode(unref(select_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          }
          _push2(`<div class="sheet-footer" data-v-520a0ed8><div class="price-info" data-v-520a0ed8><div class="total-label" data-v-520a0ed8>\u603B\u8BA1</div><div class="price-row" data-v-520a0ed8><span class="price-val" data-v-520a0ed8>${ssrInterpolate(finalAmount.value)}</span>`);
          if (discountAmount.value > 0) {
            _push2(`<div class="discount-tag" data-v-520a0ed8>\u5DF2\u7701 \xA5${ssrInterpolate(discountAmount.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><button class="aurora-btn-accent"${ssrIncludeBooleanAttr(!selectedSkuId.value || paying.value) ? " disabled" : ""} data-v-520a0ed8>${ssrInterpolate(paying.value ? "\u652F\u4ED8\u4E2D..." : "\u7ACB\u5373\u7EED\u8D39")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileRenewalSheet.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const MobileRenewalSheet = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-520a0ed8"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MobileRefundSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    orderNo: {},
    order: {}
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
    useNotify();
    const reasons = ["\u4E70\u9519\u4E86/\u4E0D\u9700\u8981\u4E86", "\u5546\u54C1\u65E0\u6CD5\u4F7F\u7528", "\u53D1\u8D27\u901F\u5EA6\u592A\u6162", "\u5546\u54C1\u63CF\u8FF0\u4E0D\u7B26", "\u5176\u4ED6\u539F\u56E0"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="sheet-mask" data-v-9aaa6412><div class="sheet-panel-glass aurora-sheet-panel" data-v-9aaa6412><div class="sheet-header" data-v-9aaa6412><div class="title" data-v-9aaa6412>\u7533\u8BF7\u9000\u6B3E</div><div class="close-btn" data-v-9aaa6412>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(close_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div><div class="sheet-body" data-v-9aaa6412>`);
          if (__props.order) {
            _push2(ssrRenderComponent(MobileOrderProductInfo, {
              order: __props.order,
              compact: true
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="warning-tip-glass" data-v-9aaa6412><div class="icon-box" data-v-9aaa6412>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="content" data-v-9aaa6412><div data-v-9aaa6412>\u7533\u8BF7\u9000\u6B3E\u540E\u670D\u52A1\u5C06\u7ACB\u5373\u6682\u505C\u3002</div></div></div><div class="form-section" data-v-9aaa6412><div class="label" data-v-9aaa6412>\u9000\u6B3E\u539F\u56E0</div><div class="reason-chips" data-v-9aaa6412><!--[-->`);
          ssrRenderList(reasons, (r) => {
            _push2(`<div class="${ssrRenderClass([{ active: form.reason === r }, "chip-glass aurora-option-card"])}" data-v-9aaa6412>${ssrInterpolate(r)} `);
            if (form.reason === r) {
              _push2(ssrRenderComponent(_component_el_icon, { class: "chk" }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(select_default), null, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(select_default))
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div><div class="form-section" data-v-9aaa6412><div class="label" data-v-9aaa6412>\u8BE6\u7EC6\u8BF4\u660E</div><textarea class="aurora-textarea" placeholder="\u8BF7\u586B\u5199\u8BE6\u7EC6\u8BF4\u660E\uFF08\u9009\u586B\uFF09" rows="3" data-v-9aaa6412>${ssrInterpolate(form.detail)}</textarea></div></div><div class="sheet-footer" data-v-9aaa6412><button class="aurora-btn-danger"${ssrIncludeBooleanAttr(!form.reason || submitting.value) ? " disabled" : ""} data-v-9aaa6412>${ssrInterpolate(submitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u7533\u8BF7")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileRefundSheet.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MobileRefundSheet = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-9aaa6412"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
    useNotify();
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
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="sheet-mask" data-v-c68ea6df><div class="sheet-panel-glass aurora-sheet-panel" data-v-c68ea6df><div class="sheet-header" data-v-c68ea6df><div class="title" data-v-c68ea6df>\u63D0\u4EA4\u5DE5\u5355</div><div class="close-btn" data-v-c68ea6df>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(close_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div><div class="sheet-body" data-v-c68ea6df>`);
          if (__props.orderInfo) {
            _push2(ssrRenderComponent(MobileOrderProductInfo, {
              order: __props.orderInfo,
              compact: true
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="form-group" data-v-c68ea6df><label data-v-c68ea6df>\u6807\u9898 <span class="req" data-v-c68ea6df>*</span></label><input${ssrRenderAttr("value", form.title)} class="aurora-input" placeholder="\u7B80\u8981\u63CF\u8FF0\u95EE\u9898" data-v-c68ea6df></div><div class="form-group" data-v-c68ea6df><label data-v-c68ea6df>\u4F18\u5148\u7EA7</label><div class="priority-row" data-v-c68ea6df><!--[-->`);
          ssrRenderList(priorities, (p) => {
            _push2(`<div class="${ssrRenderClass([{ active: form.priority === p.val, [p.val]: true }, "p-chip-glass"])}" data-v-c68ea6df>${ssrInterpolate(p.label)}</div>`);
          });
          _push2(`<!--]--></div></div><div class="form-group" data-v-c68ea6df><label data-v-c68ea6df>\u8BE6\u7EC6\u63CF\u8FF0 <span class="req" data-v-c68ea6df>*</span></label><textarea class="aurora-textarea" rows="4" placeholder="\u8BF7\u8BE6\u7EC6\u63CF\u8FF0..." data-v-c68ea6df>${ssrInterpolate(form.content)}</textarea></div><div class="form-group" data-v-c68ea6df><label data-v-c68ea6df>\u622A\u56FE (${ssrInterpolate(form.attachments.length)}/3)</label><div class="upload-row" data-v-c68ea6df><!--[-->`);
          ssrRenderList(form.attachments, (url, idx) => {
            _push2(`<div class="img-preview" data-v-c68ea6df><img${ssrRenderAttr("src", url)} data-v-c68ea6df><div class="del-btn" data-v-c68ea6df>\xD7</div></div>`);
          });
          _push2(`<!--]-->`);
          if (form.attachments.length < 3) {
            _push2(`<div class="add-btn-glass" data-v-c68ea6df>`);
            if (uploading.value) {
              _push2(`<span class="loading-spin" data-v-c68ea6df>C</span>`);
            } else {
              _push2(`<span data-v-c68ea6df>+</span>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><input type="file" hidden accept="image/*" data-v-c68ea6df></div></div><div class="sheet-footer" data-v-c68ea6df><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(!isValid.value || submitting.value) ? " disabled" : ""} data-v-c68ea6df>${ssrInterpolate(submitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u5DE5\u5355")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileTicketSheet.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileTicketSheet = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c68ea6df"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileCancelRefundSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    orderNo: {},
    refundRequest: {},
    cancelledCount: {},
    order: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatDate } = useBizFormat();
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    useNotify();
    const submitting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="modal-overlay" data-v-0df0900c><div class="modal-panel-glass aurora-sheet-panel" data-v-0df0900c><div class="modal-header" data-v-0df0900c><div class="header-icon warning" data-v-0df0900c>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><h3 class="modal-title" data-v-0df0900c>\u53D6\u6D88\u9000\u6B3E\u7533\u8BF7</h3><button class="close-btn" data-v-0df0900c>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(close_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(close_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</button></div><div class="modal-body" data-v-0df0900c><div class="warning-tip-glass" data-v-0df0900c><div class="tip-icon" data-v-0df0900c>`);
          _push2(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(info_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="tip-content" data-v-0df0900c>\u53D6\u6D88\u540E\u8BA2\u5355\u5C06\u6062\u590D\u6B63\u5E38\u72B6\u6001\uFF0C\u60A8\u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u5546\u54C1\u670D\u52A1\u3002</div></div>`);
          if (__props.order) {
            _push2(ssrRenderComponent(MobileOrderProductInfo, {
              order: __props.order,
              compact: true,
              style: { "margin-bottom": "12px" }
            }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="info-card-glass" data-v-0df0900c><div class="info-row" data-v-0df0900c><span class="label" data-v-0df0900c>\u8BA2\u5355\u53F7</span><span class="value mono" data-v-0df0900c>${ssrInterpolate(__props.orderNo)}</span></div>`);
          if (__props.refundRequest) {
            _push2(`<div class="info-row" data-v-0df0900c><span class="label" data-v-0df0900c>\u7533\u8BF7\u65F6\u95F4</span><span class="value" data-v-0df0900c>${ssrInterpolate(unref(formatDate)(__props.refundRequest.created_at))}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.refundRequest) {
            _push2(`<div class="info-row" data-v-0df0900c><span class="label" data-v-0df0900c>\u9000\u6B3E\u539F\u56E0</span><span class="value" data-v-0df0900c>${ssrInterpolate(__props.refundRequest.reason)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.cancelledCount > 0) {
            _push2(`<div class="info-row highlight" data-v-0df0900c><span class="label" data-v-0df0900c>\u5DF2\u53D6\u6D88\u6B21\u6570</span><span class="value" data-v-0df0900c>${ssrInterpolate(__props.cancelledCount)} / 3 \u6B21</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.cancelledCount >= 2) {
            _push2(`<div class="limit-warning" data-v-0df0900c>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(warning_filled_default))
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`<span data-v-0df0900c>\u6CE8\u610F\uFF1A\u60A8\u8FD8\u5269 <strong data-v-0df0900c>${ssrInterpolate(3 - __props.cancelledCount)}</strong> \u6B21\u53D6\u6D88\u673A\u4F1A\uFF0C\u8FBE\u5230\u4E0A\u9650\u540E\u5C06\u65E0\u6CD5\u518D\u7533\u8BF7\u9000\u6B3E\u3002</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-footer" data-v-0df0900c><button class="btn-glass secondary" data-v-0df0900c> \u6682\u4E0D\u53D6\u6D88 </button><button class="btn-glass primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-0df0900c>${ssrInterpolate(submitting.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u53D6\u6D88")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileCancelRefundSheet.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileCancelRefundSheet = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0df0900c"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileRefundingCard",
  __ssrInlineRender: true,
  props: {
    refundRequest: {}
  },
  setup(__props) {
    const { formatDate } = useBizFormat();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refunding-card" }, _attrs))} data-v-bd642bcd><div class="card-header" data-v-bd642bcd><div class="icon-wrapper" data-v-bd642bcd>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "spinning" }, {
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
      _push(`</div><div class="title" data-v-bd642bcd>\u9000\u6B3E\u5904\u7406\u4E2D</div></div><div class="card-body" data-v-bd642bcd><div class="info-row" data-v-bd642bcd><span class="label" data-v-bd642bcd>\u7533\u8BF7\u65F6\u95F4</span><span class="value" data-v-bd642bcd>${ssrInterpolate(unref(formatDate)((_a = __props.refundRequest) == null ? void 0 : _a.created_at))}</span></div><div class="info-row" data-v-bd642bcd><span class="label" data-v-bd642bcd>\u9000\u6B3E\u539F\u56E0</span><span class="value" data-v-bd642bcd>${ssrInterpolate(((_b = __props.refundRequest) == null ? void 0 : _b.reason) || "--")}</span></div>`);
      if ((_c = __props.refundRequest) == null ? void 0 : _c.reason_detail) {
        _push(`<div class="info-row" data-v-bd642bcd><span class="label" data-v-bd642bcd>\u8BE6\u7EC6\u8BF4\u660E</span><span class="value" data-v-bd642bcd>${ssrInterpolate((_d = __props.refundRequest) == null ? void 0 : _d.reason_detail)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card-tip" data-v-bd642bcd>`);
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
      _push(`<span data-v-bd642bcd>\u60A8\u7684\u9000\u6B3E\u7533\u8BF7\u6B63\u5728\u5BA1\u6838\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u3002\u5982\u9700\u53D6\u6D88\uFF0C\u53EF\u70B9\u51FB\u4E0A\u65B9&quot;\u53D6\u6D88\u9000\u6B3E&quot;\u6309\u94AE\u3002</span></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileRefundingCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileRefundingCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bd642bcd"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const orderId = route.params.id;
    const { showToast } = useToast();
    const {
      order,
      cdkList,
      slotList,
      instructionImage,
      loading,
      activeTicketId,
      pendingRefundRequest,
      refundCancelledCount,
      // Logic
      statusText,
      canRenew,
      canRefund,
      canCancelRefund,
      isRefundBlocked,
      // Helpers
      formatTime,
      getCdkForSlot,
      // Actions
      loadData,
      handleRefundSuccess,
      handleCancelRefundSuccess
    } = useOrderDetail(orderId);
    ref(null);
    const showRenewalSheet = ref(false);
    const showRefundSheet = ref(false);
    const showTicketSheet = ref(false);
    const showContactModal = ref(false);
    const showCancelRefundSheet = ref(false);
    const onTicketSuccess = () => {
      showToast("\u5DE5\u5355\u5DF2\u63D0\u4EA4", "success");
      loadData();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-order-detail" }, _attrs))} data-v-d2977145>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u8BA2\u5355\u8BE6\u60C5" }, null, _parent));
      _push(`<div class="${ssrRenderClass([unref(order).status, "status-card-glass"])}" data-v-d2977145><div class="status-main" data-v-d2977145><div class="status-icon-wrapper" data-v-d2977145>`);
      if (unref(order).status === "active") {
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
      } else if (unref(order).status === "pending_delivery") {
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
      } else if (unref(order).status === "refunding") {
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
      _push(`</div><div class="status-content" data-v-d2977145><div class="status-title" data-v-d2977145>${ssrInterpolate(unref(statusText))}</div>`);
      if (unref(order).status === "active") {
        _push(`<div class="status-desc" data-v-d2977145>\u5230\u671F: ${ssrInterpolate(unref(formatTime)(unref(order).expires_at))}</div>`);
      } else {
        _push(`<div class="status-desc" data-v-d2977145>\u4E0B\u5355: ${ssrInterpolate(unref(formatTime)(unref(order).createdAt))}</div>`);
      }
      _push(`</div><div class="status-price" data-v-d2977145><span class="val" data-v-d2977145>${ssrInterpolate(Number(unref(order).totalAmount).toFixed(2))}</span></div></div><div class="ops-bar-glass" data-v-d2977145><button class="action-btn ghost" data-v-d2977145>`);
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
      _push(` \u8054\u7CFB\u5BA2\u670D </button>`);
      if (unref(activeTicketId)) {
        _push(`<button class="action-btn ghost" data-v-d2977145>`);
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
        _push(` \u67E5\u770B\u5DE5\u5355 </button>`);
      } else {
        _push(`<button class="action-btn ghost" data-v-d2977145>`);
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
        _push(` \u7533\u8BF7\u5DE5\u5355 </button>`);
      }
      if (unref(canRenew)) {
        _push(`<button class="action-btn primary" data-v-d2977145>\u7EED\u8D39</button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(canCancelRefund)) {
        _push(`<button class="action-btn warning" data-v-d2977145>\u53D6\u6D88\u9000\u6B3E</button>`);
      } else if (unref(canRefund)) {
        _push(`<button class="action-btn danger" data-v-d2977145>\u7533\u8BF7\u9000\u6B3E</button>`);
      } else if (unref(isRefundBlocked)) {
        _push(`<button class="action-btn disabled" disabled data-v-d2977145>\u9000\u6B3E\u4E0A\u9650</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!unref(loading)) {
        _push(`<div class="content-body" data-v-d2977145>`);
        _push(ssrRenderComponent(MobileOrderProductInfo, { order: unref(order) }, null, _parent));
        if (unref(order).status === "refunding" && unref(pendingRefundRequest)) {
          _push(ssrRenderComponent(MobileRefundingCard, { "refund-request": unref(pendingRefundRequest) }, null, _parent));
        } else if (["pending_delivery", "active", "completed"].includes(unref(order).status || "")) {
          _push(`<div class="fulfillment-container" data-v-d2977145>`);
          if (unref(order).orderType === "shared_account") {
            _push(`<!--[-->`);
            ssrRenderList(unref(slotList), (slot, idx) => {
              _push(`<div class="section-group" data-v-d2977145>`);
              _push(ssrRenderComponent(MobileFulfillmentShared, {
                "cdk-item": unref(getCdkForSlot)(slot),
                "slot-index": slot.slot_index
              }, null, _parent));
              _push(`</div>`);
            });
            _push(`<!--]-->`);
          } else if (unref(order).orderType === "one_time_cdk") {
            _push(`<div class="section-group" data-v-d2977145><div class="section-header" data-v-d2977145>\u5361\u5BC6\u4FE1\u606F</div>`);
            _push(ssrRenderComponent(MobileFulfillmentCdk, { "cdk-list": unref(cdkList) }, null, _parent));
            _push(`</div>`);
          } else if (unref(order).orderType === "virtual") {
            _push(`<!--[--><div class="section-group" data-v-d2977145><div class="section-header" data-v-d2977145>\u5145\u503C\u8FDB\u5EA6</div><div class="delivery-content" data-v-d2977145>`);
            if (unref(order).delivery_type === "cdk") {
              _push(`<div data-v-d2977145>`);
              _push(ssrRenderComponent(MobileFulfillmentCdk, { "cdk-list": unref(cdkList) }, null, _parent));
              _push(`</div>`);
            } else if (["manual", "shared"].includes(unref(order).delivery_type)) {
              _push(`<div data-v-d2977145>`);
              if (!_ctx.hasFulfillmentRecord) {
                _push(ssrRenderComponent(MobileFulfillmentSubmitForm, {
                  "order-id": unref(order).id,
                  "delivery-type": unref(order).delivery_type,
                  onSuccess: _ctx.refreshData
                }, null, _parent));
              } else {
                _push(ssrRenderComponent(MobileFulfillmentShared, { fulfillment: _ctx.fulfillmentData }, null, _parent));
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
            if (_ctx.fulfillmentHistory.length > 0) {
              _push(`<div class="detail-card" data-v-d2977145><h3 class="card-title" data-v-d2977145>\u53D1\u8D27\u8BB0\u5F55</h3>`);
              _push(ssrRenderComponent(MobileFulfillmentHistory, { history: _ctx.fulfillmentHistory }, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(instructionImage) && unref(order).status !== "refunding") {
          _push(`<div class="section-group" data-v-d2977145><div class="section-header" data-v-d2977145>\u4F7F\u7528\u8BF4\u660E</div><div class="tutorial-box" data-v-d2977145><img${ssrRenderAttr("src", unref(instructionImage))} class="tutorial-img" loading="lazy" data-v-d2977145><div class="zoom-hint" data-v-d2977145>`);
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
      if (unref(loading)) {
        _push(`<div class="loading-screen" data-v-d2977145><div class="spinner" data-v-d2977145></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(order).id) {
        _push(ssrRenderComponent(MobileRenewalSheet, {
          modelValue: showRenewalSheet.value,
          "onUpdate:modelValue": ($event) => showRenewalSheet.value = $event,
          "order-id": unref(order).id || "",
          order: unref(order),
          onSuccess: unref(loadData)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(order).id) {
        _push(ssrRenderComponent(MobileRefundSheet, {
          modelValue: showRefundSheet.value,
          "onUpdate:modelValue": ($event) => showRefundSheet.value = $event,
          "order-id": unref(order).id || "",
          "order-no": unref(order).order_no || "",
          order: unref(order),
          onSuccess: unref(handleRefundSuccess)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showTicketSheet.value && unref(order).id) {
        _push(ssrRenderComponent(MobileTicketSheet, {
          modelValue: showTicketSheet.value,
          "onUpdate:modelValue": ($event) => showTicketSheet.value = $event,
          "order-id": unref(order).id,
          "order-info": unref(order),
          onSuccess: onTicketSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(order).id) {
        _push(ssrRenderComponent(MobileCancelRefundSheet, {
          modelValue: showCancelRefundSheet.value,
          "onUpdate:modelValue": ($event) => showCancelRefundSheet.value = $event,
          "order-id": unref(order).id || "",
          "order-no": unref(order).order_no || "",
          order: unref(order),
          "refund-request": unref(pendingRefundRequest),
          "cancelled-count": unref(refundCancelledCount),
          onSuccess: unref(handleCancelRefundSuccess)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(MobileContactModal, {
        modelValue: showContactModal.value,
        "onUpdate:modelValue": ($event) => showContactModal.value = $event
      }, null, _parent));
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2977145"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DNmQWtJ5.mjs.map
