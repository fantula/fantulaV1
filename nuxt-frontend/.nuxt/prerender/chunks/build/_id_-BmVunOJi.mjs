import { E as ElIcon } from './index-D6MDXFfa.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, watch, reactive, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, createTextVNode, withDirectives, vModelText, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderTeleport } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { R as guide_default, u as zoom_in_default, q as arrow_left_default, a4 as copy_document_default, j as circle_check_default, aj as box_default, v as refresh_left_default, i as info_filled_default, ak as timer_default, al as headset_default, am as tickets_default, A as refresh_default, h as circle_close_default, Q as money_default, l as loading_default, W as user_default, p as plus_default, an as files_default, a6 as edit_pen_default, a2 as edit_default, x as refresh_right_default, ao as document_add_default, D as arrow_down_default, S as warning_default, m as arrow_right_default, g as close_default, e as warning_filled_default } from './index-CRs4T-Jf.mjs';
import { u as useOrderDetail } from './useOrderDetail-DiadZvn2.mjs';
import { _ as _export_sfc } from './server.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { E as ElImage } from './index-DMcY9pQb.mjs';
import { _ as __nuxt_component_0 } from './BaseModal-nbvk9VuE.mjs';
import CouponSelectorModal from './CouponSelectorModal-BDyynFo8.mjs';
import { c as clientOrderApi } from './order---CTIOc2.mjs';
import { u as useUserStore } from './user-B9FaDvHc.mjs';
import { E as ElMessage } from './index-CK1iG7c1.mjs';
import { B as BaseFormModal } from './BaseFormModal-DYj1g7Mq.mjs';
import { O as OrderInfoCard } from './OrderInfoCard-CyY12spC.mjs';
import { t as ticketApi } from './ticket-CclS-v1H.mjs';
import { uploadImageToStorage } from './uploadImage-84nFn-7l.mjs';
import { S as ServiceModal } from './ServiceModal-BKBrfiAg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './useBizConfig-tsYRZrF8.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import './typescript-D6L75muK.mjs';
import './focus-trap.vue-DLhiv9tF.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-C8K_s-bH.mjs';
import './index-D_dCF80h.mjs';
import './scroll-BYDsUCKj.mjs';
import './raf-CQRaPAjg.mjs';
import './index-DuyRWKSc.mjs';
import './BaseButton-BnWAaIRO.mjs';
import './index-CGHU_uKU.mjs';
import './icon-DxnRhcjj.mjs';
import './use-global-config-C00m4e8W.mjs';
import './use-form-item-n_L16njV.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-DT739kqT.mjs';
import './BaseCouponTicket-bOGhbUT0.mjs';
import './useCouponList-CqWCtWwI.mjs';
import './coupon-CAcMEk5R.mjs';
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './virtual_public-B81IdLpj.mjs';
import './useSystemConfig-uu86svaG.mjs';

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "PcFulfillmentCdk",
  __ssrInlineRender: true,
  props: {
    cdkList: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gift-card-container" }, _attrs))} data-v-e38ff35c>`);
      if (__props.cdkList.length === 1) {
        _push(`<div class="gift-cards-wrapper" data-v-e38ff35c><div class="gift-card-item" data-v-e38ff35c><div class="card-strip" data-v-e38ff35c><span class="strip-text" data-v-e38ff35c>DIGITAL VOUCHER</span><div class="strip-decoration" data-v-e38ff35c></div></div><div class="card-content" data-v-e38ff35c><div class="code-label" data-v-e38ff35c>\u5151\u6362\u7801 / REDEEM CODE</div><div class="code-display-row" data-v-e38ff35c><span class="the-code" data-v-e38ff35c>${ssrInterpolate(__props.cdkList[0].code)}</span></div><div class="action-row" data-v-e38ff35c><button class="copy-pill-btn" data-v-e38ff35c>`);
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
        _push(` \u590D\u5236\u5361\u5BC6 </button></div></div><div class="shine-effect" data-v-e38ff35c></div></div></div>`);
      } else if (__props.cdkList.length > 1) {
        _push(`<div class="compact-stack-wrapper" data-v-e38ff35c><div class="glass-header" data-v-e38ff35c><div class="header-left" data-v-e38ff35c>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "stack-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(files_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(files_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="stack-title" data-v-e38ff35c>\u5305\u542B ${ssrInterpolate(__props.cdkList.length)} \u7EC4\u6FC0\u6D3B\u7801</span></div><button class="batch-copy-btn" data-v-e38ff35c> \u590D\u5236\u5168\u90E8 </button></div><div class="stack-list" data-v-e38ff35c><!--[-->`);
        ssrRenderList(__props.cdkList, (item, idx) => {
          _push(`<div class="stack-item" data-v-e38ff35c><div class="stack-index" data-v-e38ff35c>${ssrInterpolate(idx + 1)}</div><div class="stack-code" data-v-e38ff35c>${ssrInterpolate(item.code)}</div><button class="icon-copy-btn" data-v-e38ff35c>`);
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
          _push(`</button></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="empty-state" data-v-e38ff35c> \u6682\u65E0\u8BE6\u7EC6\u4EA4\u4ED8\u4FE1\u606F </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/PcFulfillmentCdk.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const PcFulfillmentCdk = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-e38ff35c"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "PcFulfillmentShared",
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
        slots.push({
          index: i,
          user,
          isMe
        });
      }
      return slots;
    });
    const occupiedCount = computed(() => coSharingUsers.value.length);
    const parseCdkCode = (item) => {
      if (!item) return {};
      if (item.parsed && typeof item.parsed === "object") {
        return item.parsed;
      }
      try {
        return JSON.parse(item.code);
      } catch {
        return { "\u6FC0\u6D3B\u7801": item.code };
      }
    };
    const formatSlotIndex = (idx) => {
      if (idx === void 0) return "--";
      return String(idx).padStart(2, "0");
    };
    const fetchCoSharingUsers = async () => {
      if (!props.cdkItem || !props.cdkItem.id) return;
      const cdkId = props.cdkItem.id;
      try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("slot_occupancies").select(`
        user_id,
        slot_index,
        profiles:user_id (
          id,
          avatar,
          nickname
        )
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
        console.error("\u83B7\u53D6\u5171\u4EAB\u7528\u6237\u5931\u8D25:", err);
      }
    };
    watch(() => props.cdkItem, () => {
      fetchCoSharingUsers();
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card delivery-card" }, _attrs))} data-v-43d0c29f><div class="delivery-content" data-v-43d0c29f><div class="credential-card" data-v-43d0c29f><div class="credential-header" data-v-43d0c29f><div class="slot-title-badge" data-v-43d0c29f><div class="icon-box" data-v-43d0c29f>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
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
      _push(`</div><span class="label" data-v-43d0c29f>\u60A8\u7684\u4F4D\u7F6E:</span><span class="value" data-v-43d0c29f>${ssrInterpolate(formatSlotIndex(__props.slotIndex))}\u53F7</span></div></div><div class="credential-body" data-v-43d0c29f><!--[-->`);
      ssrRenderList(parseCdkCode(__props.cdkItem), (val, key) => {
        _push(`<div class="credential-row" data-v-43d0c29f><div class="row-label" data-v-43d0c29f>${ssrInterpolate(key)}</div><div class="row-value-group" data-v-43d0c29f><span class="row-value large-text" data-v-43d0c29f>${ssrInterpolate(val)}</span><button class="copy-btn-icon" data-v-43d0c29f>`);
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
        _push(`</button></div></div>`);
      });
      _push(`<!--]--></div></div><div class="roommates-section" data-v-43d0c29f><div class="roommates-header" data-v-43d0c29f><span class="header-title" data-v-43d0c29f>\u548C\u60A8\u5171\u4EAB\u7684\u53CB\u53CB</span><span class="header-count" data-v-43d0c29f>${ssrInterpolate(occupiedCount.value)}/${ssrInterpolate(maxSlots.value)} \u5DF2\u5165\u5EA7</span></div><div class="profiles-scroll-container" data-v-43d0c29f><!--[-->`);
      ssrRenderList(allSlots.value, (slot) => {
        var _a;
        _push(`<div class="${ssrRenderClass([{ "is-me": slot.isMe }, "profile-item"])}" data-v-43d0c29f><div class="${ssrRenderClass([{ "empty": !slot.user, "active": slot.user }, "avatar-ring"])}" data-v-43d0c29f>`);
        if (slot.user && slot.user.avatar) {
          _push(`<img${ssrRenderAttr("src", slot.user.avatar)} class="profile-avatar" data-v-43d0c29f>`);
        } else if (slot.user) {
          _push(`<div class="profile-avatar placeholder" data-v-43d0c29f>${ssrInterpolate((slot.user.nickname || "U")[0].toUpperCase())}</div>`);
        } else {
          _push(`<div class="profile-avatar placeholder empty-icon" data-v-43d0c29f>`);
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
        _push(`</div><span class="profile-name" data-v-43d0c29f>${ssrInterpolate(slot.isMe ? "\u6211" : ((_a = slot.user) == null ? void 0 : _a.nickname) || "\u5F85\u52A0\u5165")}</span><span class="slot-number-tag" data-v-43d0c29f>${ssrInterpolate(slot.index)}\u53F7</span></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/PcFulfillmentShared.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const PcFulfillmentShared = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-43d0c29f"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "PcFulfillmentSubmitForm",
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
      return ((_a = latestFulfillment.value) == null ? void 0 : _a.reject_reason) || "\u672A\u586B\u5199\u539F\u56E0";
    });
    const initFormData = () => {
      var _a;
      fields.value.forEach((f) => {
        formData[f.key] = "";
      });
      if (((_a = latestFulfillment.value) == null ? void 0 : _a.payload) && (latestStatus.value === "submitted" || latestStatus.value === "rejected")) {
        Object.entries(latestFulfillment.value.payload).forEach(([k, v]) => {
          if (k === "_cdk_id") return;
          if (k in formData) {
            formData[k] = v;
          }
        });
      }
    };
    const fetchLatestFulfillment = async () => {
      if (!props.orderId) return;
      try {
        const client = getSupabaseClient();
        let query = client.from("order_fulfillments").select("*").eq("order_id", props.orderId).order("submitted_at", { ascending: false });
        if (props.cdkId) {
          query = query.contains("payload", { _cdk_id: props.cdkId });
        }
        const { data, error } = await query.limit(1).maybeSingle();
        if (!error && data) {
          latestFulfillment.value = data;
          initFormData();
        } else {
          latestFulfillment.value = null;
          initFormData();
        }
      } catch (err) {
        console.error("\u83B7\u53D6\u56DE\u6267\u5931\u8D25:", err);
      }
    };
    watch(() => props.cdkFields, () => {
      initFormData();
    }, { immediate: true });
    __expose({ refresh: fetchLatestFulfillment });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fulfillment-submit-form glass-panel" }, _attrs))} data-v-d7912859><div class="tip-header-glass" data-v-d7912859><span class="tip-text" data-v-d7912859>\u56FE\u62C9\u63D0\u9192\uFF1A\u60A8\u8981\u586B\u5199\u4EE5\u4E0B\u4FE1\u606F\u624D\u53EF\u4EE5\u54E6</span></div><div class="form-area" data-v-d7912859><!--[-->`);
      ssrRenderList(fields.value, (field) => {
        _push(`<div class="form-group" data-v-d7912859><label class="form-label" data-v-d7912859>${ssrInterpolate(field.label)}</label><div class="input-wrapper" data-v-d7912859><input${ssrRenderAttr("value", formData[field.key])} class="glass-input"${ssrRenderAttr("placeholder", "\u8BF7\u8F93\u5165" + field.label)} data-v-d7912859></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (latestStatus.value) {
        _push(`<div class="status-card-wrapper" data-v-d7912859>`);
        if (latestStatus.value === "submitted") {
          _push(`<div class="status-card pending" data-v-d7912859><div class="card-icon" data-v-d7912859>`);
          _push(ssrRenderComponent(_component_el_icon, { class: "spin" }, {
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
          _push(`</div><div class="card-content" data-v-d7912859><div class="card-title" data-v-d7912859>\u5BA1\u6838\u4E2D</div><div class="card-desc" data-v-d7912859>\u60A8\u7684\u56DE\u6267\u5DF2\u63D0\u4EA4\uFF0C\u7BA1\u7406\u5458\u6B63\u5728\u62FC\u547D\u5BA1\u6838\u4E2D...</div></div></div>`);
        } else if (latestStatus.value === "approved") {
          _push(`<div class="status-card success" data-v-d7912859><div class="card-icon" data-v-d7912859>`);
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
          _push(`</div><div class="card-content" data-v-d7912859><div class="card-title" data-v-d7912859>\u5DF2\u901A\u8FC7</div><div class="card-desc" data-v-d7912859>\u5145\u503C\u5DF2\u5B8C\u6210\uFF0C\u8BF7\u68C0\u67E5\u60A8\u7684\u8D26\u6237\u5230\u8D26\u60C5\u51B5\u3002</div></div></div>`);
        } else if (latestStatus.value === "rejected") {
          _push(`<div class="status-card error" data-v-d7912859><div class="card-icon" data-v-d7912859>`);
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
          _push(`</div><div class="card-content" data-v-d7912859><div class="card-title" data-v-d7912859>\u5DF2\u9A73\u56DE</div><div class="card-desc" data-v-d7912859>\u539F\u56E0\uFF1A${ssrInterpolate(latestRejectReason.value)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="action-footer" data-v-d7912859>`);
      if (!latestStatus.value) {
        _push(`<button class="glass-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-d7912859>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(edit_pen_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(edit_pen_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u586B\u5199\u56DE\u6267 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "submitted") {
        _push(`<button class="glass-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-d7912859>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(edit_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(edit_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u4FEE\u6539\u56DE\u6267\u4FE1\u606F </button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "rejected") {
        _push(`<button class="glass-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-d7912859>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(refresh_right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(refresh_right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u91CD\u65B0\u63D0\u4EA4 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "approved") {
        _push(`<button class="glass-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-d7912859>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(document_add_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(document_add_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u518D\u6B21\u63D0\u4EA4 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/PcFulfillmentSubmitForm.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const PcFulfillmentSubmitForm = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-d7912859"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PcFulfillmentHistory",
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
        console.error("\u83B7\u53D6\u56DE\u6267\u5386\u53F2\u5931\u8D25:", err);
      }
    };
    const statusText = (status) => {
      const map = {
        submitted: "\u5BA1\u6838\u4E2D",
        approved: "\u5DF2\u901A\u8FC7",
        rejected: "\u5DF2\u9A73\u56DE"
      };
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fulfillment-history glass-panel" }, _attrs))} data-v-6229d37d><div class="history-header" data-v-6229d37d><div class="header-left" data-v-6229d37d><span class="icon" data-v-6229d37d>\u{1F4CB}</span><span class="title" data-v-6229d37d>\u56DE\u6267\u8BB0\u5F55</span><span class="count-badge flex-center" data-v-6229d37d>${ssrInterpolate(records.value.length)}</span></div>`);
        if (records.value.length > 1) {
          _push(`<button class="expand-btn" data-v-6229d37d><span class="btn-text" data-v-6229d37d>${ssrInterpolate(isExpanded.value ? "\u6536\u8D77" : "\u5C55\u5F00\u5386\u53F2")}</span>`);
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
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="history-list" data-v-6229d37d><!--[-->`);
        ssrRenderList(displayRecords.value, (record, index) => {
          _push(`<div class="${ssrRenderClass([record.status, "history-card slide-in"])}" data-v-6229d37d><div class="card-top" data-v-6229d37d><div class="${ssrRenderClass([record.status, "status-indicator"])}" data-v-6229d37d>`);
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
          _push(`<span data-v-6229d37d>${ssrInterpolate(statusText(record.status))}</span></div><span class="time-str" data-v-6229d37d>${ssrInterpolate(formatTime(record.submitted_at))}</span></div><div class="card-payload" data-v-6229d37d><!--[-->`);
          ssrRenderList(record.payload, (value, key) => {
            _push(`<div class="payload-field" style="${ssrRenderStyle(key !== "_cdk_id" ? null : { display: "none" })}" data-v-6229d37d><span class="field-label" data-v-6229d37d>${ssrInterpolate(key)}:</span><span class="field-value" data-v-6229d37d>${ssrInterpolate(maskValue(value))}</span></div>`);
          });
          _push(`<!--]--></div>`);
          if (record.status === "rejected" && record.reject_reason) {
            _push(`<div class="reject-alert" data-v-6229d37d>`);
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
            _push(`<span data-v-6229d37d>\u9A73\u56DE\u539F\u56E0: ${ssrInterpolate(record.reject_reason)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/PcFulfillmentHistory.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const PcFulfillmentHistory = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-6229d37d"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "OrderDetailHero",
  __ssrInlineRender: true,
  props: {
    order: {},
    statusText: {},
    remainingDays: {},
    pendingRefundReason: {},
    activeTicketId: {},
    canRenew: { type: Boolean },
    canRefund: { type: Boolean },
    canCancelRefund: { type: Boolean },
    isRefundBlocked: { type: Boolean },
    getTimeLevel: { type: Function }
  },
  emits: ["back", "copy", "action"],
  setup(__props, { emit: __emit }) {
    const { formatDate } = useBizFormat();
    const formatTime = (t) => t ? formatDate(t) : "-";
    const getInteger = (val) => Math.floor(val).toLocaleString();
    const getDecimal = (val) => (val % 1).toFixed(2).split(".")[1] || "00";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "status-hero-card" }, _attrs))} data-v-c9e7f0d8><div class="${ssrRenderClass([__props.order.status, "hero-aurora-bg"])}" data-v-c9e7f0d8></div><div class="hero-content" data-v-c9e7f0d8><div class="hero-top-row" data-v-c9e7f0d8><div class="top-left-group" data-v-c9e7f0d8><div class="back-btn" data-v-c9e7f0d8>`);
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
      _push(`<span class="back-text" data-v-c9e7f0d8>\u8FD4\u56DE</span></div><div class="order-no-badge" data-v-c9e7f0d8><span class="label" data-v-c9e7f0d8>\u8BA2\u5355\u53F7</span><span class="value" data-v-c9e7f0d8>${ssrInterpolate(__props.order.order_no || "---")}</span>`);
      _push(ssrRenderComponent(_component_el_icon, {
        class: "copy-icon",
        onClick: ($event) => _ctx.$emit("copy", __props.order.order_no)
      }, {
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
      _push(`</div></div><div class="amount-display-top" data-v-c9e7f0d8><span class="amount-integer" data-v-c9e7f0d8>${ssrInterpolate(getInteger(__props.order.totalAmount || 0))}</span><span class="amount-decimal" data-v-c9e7f0d8>.${ssrInterpolate(getDecimal(__props.order.totalAmount || 0))}</span><span class="amount-unit" data-v-c9e7f0d8>\u70B9</span></div></div><div class="hero-main-row" data-v-c9e7f0d8><div class="status-group" data-v-c9e7f0d8><div class="${ssrRenderClass([__props.order.status, "status-icon-box"])}" data-v-c9e7f0d8>`);
      if (__props.order.status === "active" || __props.order.status === "completed") {
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
      } else if (__props.order.status === "pending_delivery") {
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
      } else if (__props.order.status === "refunding" || __props.order.status === "refunded") {
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
      _push(`</div><div class="status-text-wrapper" data-v-c9e7f0d8><div class="status-title-row" data-v-c9e7f0d8><h1 class="status-title" data-v-c9e7f0d8>${ssrInterpolate(__props.statusText)}</h1>`);
      if (__props.order.status === "active" && __props.remainingDays !== null) {
        _push(`<div class="${ssrRenderClass([__props.getTimeLevel(__props.remainingDays), "time-badge"])}" data-v-c9e7f0d8>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(timer_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(timer_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u5269\u4F59 ${ssrInterpolate(__props.remainingDays)} \u5929 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="status-desc" data-v-c9e7f0d8>`);
      if (__props.order.status === "refunding") {
        _push(`<span data-v-c9e7f0d8>\u9000\u6B3E\u7533\u8BF7\u5F85\u5BA1\u6838\uFF1A${ssrInterpolate(__props.pendingRefundReason || "\u8BF7\u8010\u5FC3\u7B49\u5F85")}</span>`);
      } else if (__props.order.status === "pending_delivery") {
        _push(`<span data-v-c9e7f0d8>\u7CFB\u7EDF\u6B63\u5728\u6781\u901F\u914D\u8D27\u4E2D</span>`);
      } else if (__props.order.status === "active") {
        _push(`<span data-v-c9e7f0d8>\u5546\u54C1\u72B6\u6001\u6B63\u5E38\uFF0C\u5230\u671F\u65F6\u95F4: ${ssrInterpolate(formatTime(__props.order.expires_at || ""))}</span>`);
      } else {
        _push(`<span data-v-c9e7f0d8>\u4E0B\u5355\u65F6\u95F4: ${ssrInterpolate(formatTime(__props.order.createdAt || ""))}</span>`);
      }
      _push(`</div></div></div><div class="hero-actions" data-v-c9e7f0d8><button class="hero-btn secondary" data-v-c9e7f0d8>`);
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
      if (__props.activeTicketId) {
        _push(`<button class="hero-btn secondary" data-v-c9e7f0d8>`);
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
        _push(`<button class="hero-btn secondary" data-v-c9e7f0d8>`);
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
      if (__props.canRenew) {
        _push(`<button class="hero-btn primary" data-v-c9e7f0d8>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(refresh_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(refresh_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u7EED\u8D39 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.canCancelRefund) {
        _push(`<button class="hero-btn warning" data-v-c9e7f0d8>`);
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
        _push(` \u53D6\u6D88\u9000\u6B3E </button>`);
      } else if (__props.canRefund) {
        _push(`<button class="hero-btn danger" data-v-c9e7f0d8>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(money_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(money_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` \u7533\u8BF7\u9000\u6B3E </button>`);
      } else if (__props.isRefundBlocked) {
        _push(`<button class="hero-btn disabled" disabled data-v-c9e7f0d8>`);
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
        _push(` \u9000\u6B3E\u5DF2\u8FBE\u4E0A\u9650 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="noise-overlay" data-v-c9e7f0d8></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/OrderDetailHero.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const OrderDetailHero = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-c9e7f0d8"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "RefundingCard",
  __ssrInlineRender: true,
  props: {
    refundRequest: {}
  },
  setup(__props) {
    const { formatDate } = useBizFormat();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refunding-card" }, _attrs))} data-v-2a200751><div class="refunding-header" data-v-2a200751><div class="icon-wrapper" data-v-2a200751>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "spin" }, {
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
      _push(`</div><div class="header-text" data-v-2a200751><h3 class="title" data-v-2a200751>\u9000\u6B3E\u5BA1\u6838\u4E2D</h3><p class="subtitle" data-v-2a200751>\u60A8\u7684\u9000\u6B3E\u7533\u8BF7\u5DF2\u63D0\u4EA4\uFF0C\u6B63\u5728\u7B49\u5F85\u4EBA\u5DE5\u5BA1\u6838</p></div></div><div class="refunding-body" data-v-2a200751><div class="info-grid" data-v-2a200751><div class="info-item" data-v-2a200751><span class="label" data-v-2a200751>\u7533\u8BF7\u65F6\u95F4</span><span class="value" data-v-2a200751>${ssrInterpolate(unref(formatDate)((_a = __props.refundRequest) == null ? void 0 : _a.created_at))}</span></div><div class="info-item" data-v-2a200751><span class="label" data-v-2a200751>\u9000\u6B3E\u539F\u56E0</span><span class="value reason" data-v-2a200751>${ssrInterpolate(((_b = __props.refundRequest) == null ? void 0 : _b.reason) || "\u672A\u586B\u5199")}</span></div></div><div class="notice-box" data-v-2a200751>`);
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
      _push(`<div class="notice-text" data-v-2a200751><p data-v-2a200751>\u5BA1\u6838\u671F\u95F4\u5546\u54C1\u670D\u52A1\u6682\u65F6\u51BB\u7ED3\uFF0C\u60A8\u53EF\u4EE5\uFF1A</p><ul data-v-2a200751><li data-v-2a200751>\u8010\u5FC3\u7B49\u5F85\u5BA1\u6838\u7ED3\u679C\uFF08\u901A\u5E381-3\u4E2A\u5DE5\u4F5C\u65E5\uFF09</li><li data-v-2a200751>\u5982\u9700\u6062\u590D\u4F7F\u7528\uFF0C\u53EF\u70B9\u51FB\u9876\u90E8&quot;\u53D6\u6D88\u9000\u6B3E&quot;\u6309\u94AE</li></ul></div></div></div><div class="refunding-footer" data-v-2a200751>`);
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
      _push(`<span data-v-2a200751>\u5982\u6709\u7591\u95EE\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D</span></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/RefundingCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const RefundingCard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2a200751"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "RenewalModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    const userStore = useUserStore();
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const loading = ref(false);
    const error = ref("");
    const paying = ref(false);
    const showCouponModal = ref(false);
    const skuList = ref([]);
    const currentEndTime = ref("");
    const selectedSkuId = ref("");
    const selectedCoupon = ref(null);
    const discountAmount = ref(0);
    const selectedSpecs = reactive({});
    const productInfo = reactive({
      id: "",
      name: "\u5546\u54C1",
      image: ""
    });
    const specGroups = computed(() => {
      if (skuList.value.length === 0) return [];
      const groups = {};
      skuList.value.forEach((sku) => {
        const combination = sku.spec_combination || {};
        Object.entries(combination).forEach(([name, value]) => {
          if (!groups[name]) {
            groups[name] = /* @__PURE__ */ new Map();
          }
          if (!groups[name].has(value)) {
            groups[name].set(value, {
              value,
              price: sku.price,
              skuId: sku.sku_id
            });
          }
        });
      });
      return Object.entries(groups).map(([name, valuesMap]) => ({
        name,
        values: Array.from(valuesMap.values())
      }));
    });
    const selectedSku = computed(() => {
      if (selectedSkuId.value) {
        return skuList.value.find((s) => s.sku_id === selectedSkuId.value);
      }
      if (specGroups.value.length > 0) {
        return skuList.value.find((sku) => {
          const combination = sku.spec_combination || {};
          return Object.entries(selectedSpecs).every(
            ([name, value]) => combination[name] === value
          );
        });
      }
      return null;
    });
    const originalAmount = computed(
      () => {
        var _a;
        return ((_a = selectedSku.value) == null ? void 0 : _a.price) || 0;
      }
    );
    const finalAmount = computed(
      () => Math.max(0, originalAmount.value - discountAmount.value)
    );
    const newEndTime = computed(() => {
      if (!currentEndTime.value || !selectedSku.value) return "";
      const endDate = new Date(currentEndTime.value);
      endDate.setDate(endDate.getDate() + selectedSku.value.duration);
      return endDate.toISOString();
    });
    watch(() => props.modelValue, async (val) => {
      if (val) {
        await loadRenewalSkus();
      } else {
        selectedSkuId.value = "";
        selectedCoupon.value = null;
        discountAmount.value = 0;
        Object.keys(selectedSpecs).forEach((k) => delete selectedSpecs[k]);
      }
    });
    watch(selectedSpecs, () => {
      if (specGroups.value.length > 0) {
        const matched = skuList.value.find((sku) => {
          const combination = sku.spec_combination || {};
          return Object.entries(selectedSpecs).every(
            ([name, value]) => combination[name] === value
          );
        });
        if (matched) {
          selectedSkuId.value = matched.sku_id;
        }
      }
    }, { deep: true });
    const loadRenewalSkus = async () => {
      loading.value = true;
      error.value = "";
      try {
        const res = await clientOrderApi.getRenewalSkus(props.orderId);
        if (!res.success) {
          error.value = res.error || "\u83B7\u53D6\u7EED\u8D39\u4FE1\u606F\u5931\u8D25";
          return;
        }
        skuList.value = res.skus || [];
        currentEndTime.value = res.endTime || "";
        if (res.product) {
          productInfo.id = res.product.id;
          productInfo.name = res.product.name;
          productInfo.image = res.product.image;
        }
        if (specGroups.value.length > 0) {
          specGroups.value.forEach((group) => {
            if (group.values.length > 0) {
              selectedSpecs[group.name] = group.values[0].value;
            }
          });
        } else if (skuList.value.length > 0) {
          selectedSkuId.value = skuList.value[0].sku_id;
        }
      } catch (e) {
        error.value = e.message || "\u7CFB\u7EDF\u5F02\u5E38";
      } finally {
        loading.value = false;
      }
    };
    const handleSpecSelect = (groupName, value) => {
      selectedSpecs[groupName] = value;
      selectedCoupon.value = null;
      discountAmount.value = 0;
    };
    const handleSimpleSkuSelect = (sku) => {
      selectedSkuId.value = sku.sku_id;
      selectedCoupon.value = null;
      discountAmount.value = 0;
    };
    const handleCouponSelect = async (coupon) => {
      selectedCoupon.value = coupon;
      if (!coupon) {
        discountAmount.value = 0;
        return;
      }
      if (coupon.coupon.type === "flat") {
        discountAmount.value = Math.min(coupon.coupon.value, originalAmount.value);
      } else if (coupon.coupon.type === "product") {
        discountAmount.value = originalAmount.value;
      } else {
        discountAmount.value = 0;
      }
    };
    const handlePay = async () => {
      var _a, _b, _c;
      if (!selectedSkuId.value || paying.value) return;
      const balance = (_b = (_a = userStore.user) == null ? void 0 : _a.balance) != null ? _b : 0;
      if (balance < finalAmount.value) {
        ElMessage.error(`\u4F59\u989D\u4E0D\u8DB3\uFF0C\u9700 \xA5${finalAmount.value.toFixed(2)}\uFF0C\u5F53\u524D \xA5${balance.toFixed(2)}`);
        return;
      }
      paying.value = true;
      try {
        const createRes = await clientOrderApi.createRenewalPreOrder(
          selectedSkuId.value,
          props.orderId
        );
        if (!createRes.success) {
          ElMessage.error(createRes.error || "\u521B\u5EFA\u7EED\u8D39\u8BA2\u5355\u5931\u8D25");
          return;
        }
        const preOrderId = createRes.preOrderId;
        if (selectedCoupon.value) {
          const couponRes = await clientOrderApi.applyCoupon(
            preOrderId,
            selectedCoupon.value.id
          );
          if (!couponRes.success) {
            ElMessage.warning("\u4F18\u60E0\u5238\u5E94\u7528\u5931\u8D25\uFF0C\u5C06\u6309\u539F\u4EF7\u652F\u4ED8");
            discountAmount.value = 0;
          }
        }
        const confirmRes = await clientOrderApi.confirmPreOrder(
          preOrderId,
          "balance",
          (_c = selectedCoupon.value) == null ? void 0 : _c.id
        );
        if (!confirmRes.success) {
          ElMessage.error(confirmRes.error || "\u652F\u4ED8\u5931\u8D25");
          return;
        }
        ElMessage.success("\u7EED\u8D39\u6210\u529F\uFF01");
        await userStore.fetchUserInfo();
        visible.value = false;
        emit("success", confirmRes.orderId);
        router.push(`/profile/order/${confirmRes.orderId}`);
      } catch (e) {
        ElMessage.error(e.message || "\u7CFB\u7EDF\u5F02\u5E38");
      } finally {
        paying.value = false;
      }
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(__nuxt_component_0, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "\u7EED\u8D39\u8BA2\u5355",
        width: "720px",
        footer: false,
        "show-mascot": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="renewal-content" data-v-82125b48${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="loading-state" data-v-82125b48${_scopeId}><div class="spinner" data-v-82125b48${_scopeId}></div><p data-v-82125b48${_scopeId}>\u52A0\u8F7D\u7EED\u8D39\u9009\u9879...</p></div>`);
            } else if (error.value) {
              _push2(`<div class="error-state" data-v-82125b48${_scopeId}><div class="error-icon" data-v-82125b48${_scopeId}>\u26A0\uFE0F</div><p data-v-82125b48${_scopeId}>${ssrInterpolate(error.value)}</p></div>`);
            } else {
              _push2(`<div class="renewal-form" data-v-82125b48${_scopeId}><div class="renewal-split-layout" data-v-82125b48${_scopeId}><div class="refresh-left-col" data-v-82125b48${_scopeId}><div class="product-header-compact" data-v-82125b48${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: productInfo.image,
                class: "mini-thumb",
                fit: "cover"
              }, {
                placeholder: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="ph" data-v-82125b48${_scopeId2}>IMG</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "ph" }, "IMG")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="ph-info" data-v-82125b48${_scopeId}><div class="ph-name" data-v-82125b48${_scopeId}>${ssrInterpolate(productInfo.name)}</div><div class="ph-expire" data-v-82125b48${_scopeId}>\u5F53\u524D\u5230\u671F: ${ssrInterpolate(formatDate(currentEndTime.value))}</div></div></div><div class="specs-wrapper" data-v-82125b48${_scopeId}>`);
              if (specGroups.value.length > 0) {
                _push2(`<div data-v-82125b48${_scopeId}><!--[-->`);
                ssrRenderList(specGroups.value, (specGroup) => {
                  _push2(`<div class="spec-group" data-v-82125b48${_scopeId}><div class="spec-label" data-v-82125b48${_scopeId}>${ssrInterpolate(specGroup.name)}</div><div class="spec-values" data-v-82125b48${_scopeId}><!--[-->`);
                  ssrRenderList(specGroup.values, (val) => {
                    _push2(`<div class="${ssrRenderClass(["spec-val-btn", { active: selectedSpecs[specGroup.name] === val.value }])}" data-v-82125b48${_scopeId}>${ssrInterpolate(val.value)}</div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else if (skuList.value.length > 0) {
                _push2(`<div class="simple-sku-list" data-v-82125b48${_scopeId}><div class="spec-label" data-v-82125b48${_scopeId}>\u9009\u62E9\u65F6\u957F</div><div class="spec-values" data-v-82125b48${_scopeId}><!--[-->`);
                ssrRenderList(skuList.value, (sku) => {
                  _push2(`<div class="${ssrRenderClass(["spec-val-btn", { active: selectedSkuId.value === sku.sku_id }])}" data-v-82125b48${_scopeId}>${ssrInterpolate(sku.duration)}\u5929 </div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="coupon-section" data-v-82125b48${_scopeId}><div class="coupon-label" data-v-82125b48${_scopeId}>\u4F18\u60E0\u5238</div><div class="coupon-value" data-v-82125b48${_scopeId}>`);
              if (selectedCoupon.value) {
                _push2(`<span class="coupon-selected" data-v-82125b48${_scopeId}>-\xA5${ssrInterpolate(discountAmount.value.toFixed(2))}</span>`);
              } else {
                _push2(`<span class="coupon-placeholder" data-v-82125b48${_scopeId}>\u9009\u62E9\u4F18\u60E0\u5238</span>`);
              }
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(arrow_right_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(arrow_right_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div><div class="refresh-right-col" data-v-82125b48${_scopeId}><div class="summary-card" data-v-82125b48${_scopeId}><div class="summary-title" data-v-82125b48${_scopeId}>\u8BA2\u5355\u6458\u8981</div><div class="summary-row" data-v-82125b48${_scopeId}><span data-v-82125b48${_scopeId}>\u5546\u54C1\u91D1\u989D</span><span data-v-82125b48${_scopeId}>\xA5${ssrInterpolate(originalAmount.value.toFixed(2))}</span></div>`);
              if (discountAmount.value > 0) {
                _push2(`<div class="summary-row" data-v-82125b48${_scopeId}><span data-v-82125b48${_scopeId}>\u4F18\u60E0\u62B5\u6263</span><span class="text-danger" data-v-82125b48${_scopeId}>-\xA5${ssrInterpolate(discountAmount.value.toFixed(2))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="divider" data-v-82125b48${_scopeId}></div><div class="total-row" data-v-82125b48${_scopeId}><div class="total-label" data-v-82125b48${_scopeId}>\u5E94\u4ED8\u91D1\u989D</div><div class="total-price" data-v-82125b48${_scopeId}><span class="unit" data-v-82125b48${_scopeId}>\xA5</span>${ssrInterpolate(finalAmount.value.toFixed(2))}</div></div>`);
              if (newEndTime.value) {
                _push2(`<div class="new-expire-tip" data-v-82125b48${_scopeId}> \u7EED\u8D39\u540E\u5230\u671F: ${ssrInterpolate(formatDate(newEndTime.value))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="pay-btn"${ssrIncludeBooleanAttr(!selectedSkuId.value || paying.value) ? " disabled" : ""} data-v-82125b48${_scopeId}>`);
              if (paying.value) {
                _push2(`<span data-v-82125b48${_scopeId}>\u652F\u4ED8\u4E2D...</span>`);
              } else {
                _push2(`<span data-v-82125b48${_scopeId}>\u7ACB\u5373\u652F\u4ED8</span>`);
              }
              _push2(`</button></div></div></div></div>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(CouponSelectorModal, {
              modelValue: showCouponModal.value,
              "onUpdate:modelValue": ($event) => showCouponModal.value = $event,
              orderAmount: originalAmount.value,
              skuIds: selectedSkuId.value ? [selectedSkuId.value] : [],
              productIds: productInfo.id ? [productInfo.id] : [],
              currentCouponId: (_a = selectedCoupon.value) == null ? void 0 : _a.id,
              onSelect: handleCouponSelect
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "renewal-content" }, [
                loading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "loading-state"
                }, [
                  createVNode("div", { class: "spinner" }),
                  createVNode("p", null, "\u52A0\u8F7D\u7EED\u8D39\u9009\u9879...")
                ])) : error.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "error-state"
                }, [
                  createVNode("div", { class: "error-icon" }, "\u26A0\uFE0F"),
                  createVNode("p", null, toDisplayString(error.value), 1)
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "renewal-form"
                }, [
                  createVNode("div", { class: "renewal-split-layout" }, [
                    createVNode("div", { class: "refresh-left-col" }, [
                      createVNode("div", { class: "product-header-compact" }, [
                        createVNode(_component_el_image, {
                          src: productInfo.image,
                          class: "mini-thumb",
                          fit: "cover"
                        }, {
                          placeholder: withCtx(() => [
                            createVNode("div", { class: "ph" }, "IMG")
                          ]),
                          _: 1
                        }, 8, ["src"]),
                        createVNode("div", { class: "ph-info" }, [
                          createVNode("div", { class: "ph-name" }, toDisplayString(productInfo.name), 1),
                          createVNode("div", { class: "ph-expire" }, "\u5F53\u524D\u5230\u671F: " + toDisplayString(formatDate(currentEndTime.value)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "specs-wrapper" }, [
                        specGroups.value.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(specGroups.value, (specGroup) => {
                            return openBlock(), createBlock("div", {
                              key: specGroup.name,
                              class: "spec-group"
                            }, [
                              createVNode("div", { class: "spec-label" }, toDisplayString(specGroup.name), 1),
                              createVNode("div", { class: "spec-values" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(specGroup.values, (val) => {
                                  return openBlock(), createBlock("div", {
                                    key: val.value,
                                    class: ["spec-val-btn", { active: selectedSpecs[specGroup.name] === val.value }],
                                    onClick: ($event) => handleSpecSelect(specGroup.name, val.value)
                                  }, toDisplayString(val.value), 11, ["onClick"]);
                                }), 128))
                              ])
                            ]);
                          }), 128))
                        ])) : skuList.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "simple-sku-list"
                        }, [
                          createVNode("div", { class: "spec-label" }, "\u9009\u62E9\u65F6\u957F"),
                          createVNode("div", { class: "spec-values" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(skuList.value, (sku) => {
                              return openBlock(), createBlock("div", {
                                key: sku.sku_id,
                                class: ["spec-val-btn", { active: selectedSkuId.value === sku.sku_id }],
                                onClick: ($event) => handleSimpleSkuSelect(sku)
                              }, toDisplayString(sku.duration) + "\u5929 ", 11, ["onClick"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", {
                        class: "coupon-section",
                        onClick: ($event) => showCouponModal.value = true
                      }, [
                        createVNode("div", { class: "coupon-label" }, "\u4F18\u60E0\u5238"),
                        createVNode("div", { class: "coupon-value" }, [
                          selectedCoupon.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "coupon-selected"
                          }, "-\xA5" + toDisplayString(discountAmount.value.toFixed(2)), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "coupon-placeholder"
                          }, "\u9009\u62E9\u4F18\u60E0\u5238")),
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(arrow_right_default))
                            ]),
                            _: 1
                          })
                        ])
                      ], 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "refresh-right-col" }, [
                      createVNode("div", { class: "summary-card" }, [
                        createVNode("div", { class: "summary-title" }, "\u8BA2\u5355\u6458\u8981"),
                        createVNode("div", { class: "summary-row" }, [
                          createVNode("span", null, "\u5546\u54C1\u91D1\u989D"),
                          createVNode("span", null, "\xA5" + toDisplayString(originalAmount.value.toFixed(2)), 1)
                        ]),
                        discountAmount.value > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "summary-row"
                        }, [
                          createVNode("span", null, "\u4F18\u60E0\u62B5\u6263"),
                          createVNode("span", { class: "text-danger" }, "-\xA5" + toDisplayString(discountAmount.value.toFixed(2)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "divider" }),
                        createVNode("div", { class: "total-row" }, [
                          createVNode("div", { class: "total-label" }, "\u5E94\u4ED8\u91D1\u989D"),
                          createVNode("div", { class: "total-price" }, [
                            createVNode("span", { class: "unit" }, "\xA5"),
                            createTextVNode(toDisplayString(finalAmount.value.toFixed(2)), 1)
                          ])
                        ]),
                        newEndTime.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "new-expire-tip"
                        }, " \u7EED\u8D39\u540E\u5230\u671F: " + toDisplayString(formatDate(newEndTime.value)), 1)) : createCommentVNode("", true),
                        createVNode("button", {
                          class: "pay-btn",
                          disabled: !selectedSkuId.value || paying.value,
                          onClick: handlePay
                        }, [
                          paying.value ? (openBlock(), createBlock("span", { key: 0 }, "\u652F\u4ED8\u4E2D...")) : (openBlock(), createBlock("span", { key: 1 }, "\u7ACB\u5373\u652F\u4ED8"))
                        ], 8, ["disabled"])
                      ])
                    ])
                  ])
                ]))
              ]),
              createVNode(CouponSelectorModal, {
                modelValue: showCouponModal.value,
                "onUpdate:modelValue": ($event) => showCouponModal.value = $event,
                orderAmount: originalAmount.value,
                skuIds: selectedSkuId.value ? [selectedSkuId.value] : [],
                productIds: productInfo.id ? [productInfo.id] : [],
                currentCouponId: (_b = selectedCoupon.value) == null ? void 0 : _b.id,
                onSelect: handleCouponSelect
              }, null, 8, ["modelValue", "onUpdate:modelValue", "orderAmount", "skuIds", "productIds", "currentCouponId"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/RenewalModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const RenewalModal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-82125b48"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "RefundModal",
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
    const loadingOrder = ref(false);
    const orderDetail = ref(null);
    const form = reactive({
      reason: "",
      detail: ""
    });
    const reasons = [
      "\u4E70\u9519\u4E86/\u4E0D\u9700\u8981\u4E86",
      "\u5546\u54C1\u65E0\u6CD5\u4F7F\u7528",
      "\u53D1\u8D27\u901F\u5EA6\u592A\u6162",
      "\u5546\u54C1\u63CF\u8FF0\u4E0D\u7B26",
      "\u5176\u4ED6\u539F\u56E0"
    ];
    const isValid = computed(() => !!form.reason);
    const handleClose = () => {
      visible.value = false;
    };
    const handleSubmit = async () => {
      if (!isValid.value) return;
      submitting.value = true;
      try {
        const res = await clientOrderApi.createRefundRequest(
          props.orderId,
          form.reason,
          form.detail
        );
        if (res.success) {
          ElMessage.success("\u9000\u6B3E\u7533\u8BF7\u5DF2\u63D0\u4EA4");
          emit("success");
          handleClose();
        } else {
          ElMessage.error(res.error || "\u63D0\u4EA4\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u7CFB\u7EDF\u9519\u8BEF");
      } finally {
        submitting.value = false;
      }
    };
    watch(() => props.modelValue, async (val) => {
      if (val) {
        form.reason = "";
        form.detail = "";
        if (props.orderId) {
          loadingOrder.value = true;
          try {
            const res = await clientOrderApi.getOrderDetail(props.orderId);
            if (res.success && res.data) {
              orderDetail.value = res.data;
            }
          } catch (e) {
            console.error("Load order failed:", e);
          } finally {
            loadingOrder.value = false;
          }
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "\u7533\u8BF7\u9000\u6B3E",
        subtitle: "\u9000\u6B3E\u7533\u8BF7\u5C06\u5728 1-3 \u4E2A\u5DE5\u4F5C\u65E5\u5185\u5904\u7406",
        "submit-text": "\u63D0\u4EA4\u7533\u8BF7",
        loading: submitting.value,
        "submit-disabled": !isValid.value,
        "show-mascot": "",
        onClose: handleClose,
        onCancel: handleClose,
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="refund-form" data-v-71d54375${_scopeId}>`);
            _push2(ssrRenderComponent(OrderInfoCard, {
              order: orderDetail.value,
              loading: loadingOrder.value
            }, null, _parent2, _scopeId));
            _push2(`<div class="warning-box" data-v-71d54375${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(warning_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(warning_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span data-v-71d54375${_scopeId}>\u7533\u8BF7\u9000\u6B3E\u540E\uFF0C\u5546\u54C1\u5C06\u7ACB\u5373\u51BB\u7ED3\u65E0\u6CD5\u4F7F\u7528\u3002\u5982\u6709\u7591\u95EE\u5EFA\u8BAE\u5148\u8054\u7CFB\u5BA2\u670D\u3002</span></div><div class="form-group" data-v-71d54375${_scopeId}><label data-v-71d54375${_scopeId}>\u9000\u6B3E\u539F\u56E0 <span class="required" data-v-71d54375${_scopeId}>*</span></label><div class="reason-options" data-v-71d54375${_scopeId}><!--[-->`);
            ssrRenderList(reasons, (r) => {
              _push2(`<div class="${ssrRenderClass([{ active: form.reason === r }, "reason-tag"])}" data-v-71d54375${_scopeId}>${ssrInterpolate(r)}</div>`);
            });
            _push2(`<!--]--></div></div><div class="form-group" data-v-71d54375${_scopeId}><label data-v-71d54375${_scopeId}>\u8865\u5145\u8BF4\u660E</label><textarea class="form-textarea" rows="3" placeholder="\u8BF7\u586B\u5199\u8BE6\u7EC6\u8BF4\u660E\uFF08\u9009\u586B\uFF09..." data-v-71d54375${_scopeId}>${ssrInterpolate(form.detail)}</textarea></div></div>`);
          } else {
            return [
              createVNode("div", { class: "refund-form" }, [
                createVNode(OrderInfoCard, {
                  order: orderDetail.value,
                  loading: loadingOrder.value
                }, null, 8, ["order", "loading"]),
                createVNode("div", { class: "warning-box" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(warning_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "\u7533\u8BF7\u9000\u6B3E\u540E\uFF0C\u5546\u54C1\u5C06\u7ACB\u5373\u51BB\u7ED3\u65E0\u6CD5\u4F7F\u7528\u3002\u5982\u6709\u7591\u95EE\u5EFA\u8BAE\u5148\u8054\u7CFB\u5BA2\u670D\u3002")
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, [
                    createTextVNode("\u9000\u6B3E\u539F\u56E0 "),
                    createVNode("span", { class: "required" }, "*")
                  ]),
                  createVNode("div", { class: "reason-options" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(reasons, (r) => {
                      return createVNode("div", {
                        key: r,
                        class: ["reason-tag", { active: form.reason === r }],
                        onClick: ($event) => form.reason = r
                      }, toDisplayString(r), 11, ["onClick"]);
                    }), 64))
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "\u8865\u5145\u8BF4\u660E"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => form.detail = $event,
                    class: "form-textarea",
                    rows: "3",
                    placeholder: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u8BF4\u660E\uFF08\u9009\u586B\uFF09..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.detail]
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/RefundModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const RefundModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-71d54375"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CancelRefundModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    orderNo: {},
    refundRequest: {},
    cancelledCount: {}
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
    const submitting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="modal-overlay" data-v-1d77ce0f><div class="modal-panel" data-v-1d77ce0f><div class="modal-header" data-v-1d77ce0f><div class="header-icon warning" data-v-1d77ce0f>`);
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
          _push2(`</div><h3 class="modal-title" data-v-1d77ce0f>\u53D6\u6D88\u9000\u6B3E\u7533\u8BF7</h3><button class="close-btn" data-v-1d77ce0f>`);
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
          _push2(`</button></div><div class="modal-body" data-v-1d77ce0f><div class="warning-tip" data-v-1d77ce0f>`);
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
          _push2(`<span data-v-1d77ce0f>\u53D6\u6D88\u540E\u8BA2\u5355\u5C06\u6062\u590D\u6B63\u5E38\u72B6\u6001\uFF0C\u60A8\u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u5546\u54C1\u670D\u52A1\u3002</span></div><div class="info-section" data-v-1d77ce0f><div class="info-row" data-v-1d77ce0f><span class="label" data-v-1d77ce0f>\u8BA2\u5355\u53F7</span><span class="value mono" data-v-1d77ce0f>${ssrInterpolate(__props.orderNo)}</span></div>`);
          if (__props.refundRequest) {
            _push2(`<div class="info-row" data-v-1d77ce0f><span class="label" data-v-1d77ce0f>\u7533\u8BF7\u65F6\u95F4</span><span class="value" data-v-1d77ce0f>${ssrInterpolate(unref(formatDate)(__props.refundRequest.created_at))}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.refundRequest) {
            _push2(`<div class="info-row" data-v-1d77ce0f><span class="label" data-v-1d77ce0f>\u9000\u6B3E\u539F\u56E0</span><span class="value" data-v-1d77ce0f>${ssrInterpolate(__props.refundRequest.reason)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.cancelledCount > 0) {
            _push2(`<div class="info-row highlight" data-v-1d77ce0f><span class="label" data-v-1d77ce0f>\u5DF2\u53D6\u6D88\u6B21\u6570</span><span class="value" data-v-1d77ce0f>${ssrInterpolate(__props.cancelledCount)} / 3 \u6B21</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (__props.cancelledCount >= 2) {
            _push2(`<div class="limit-warning" data-v-1d77ce0f>`);
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
            _push2(`<span data-v-1d77ce0f>\u6CE8\u610F\uFF1A\u60A8\u8FD8\u5269 <strong data-v-1d77ce0f>${ssrInterpolate(3 - __props.cancelledCount)}</strong> \u6B21\u53D6\u6D88\u673A\u4F1A\uFF0C\u8FBE\u5230\u4E0A\u9650\u540E\u5C06\u65E0\u6CD5\u518D\u7533\u8BF7\u9000\u6B3E\u3002</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="modal-footer" data-v-1d77ce0f><button class="btn secondary" data-v-1d77ce0f> \u6682\u4E0D\u53D6\u6D88 </button><button class="btn primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-1d77ce0f>${ssrInterpolate(submitting.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u53D6\u6D88")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/CancelRefundModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CancelRefundModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1d77ce0f"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TicketApplyModal",
  __ssrInlineRender: true,
  props: {
    orderId: { type: String, required: true }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const form = reactive({
      title: "",
      priority: "medium",
      content: "",
      attachments: []
    });
    const priorities = [
      { label: "\u4E00\u822C", value: "low" },
      { label: "\u91CD\u8981", value: "medium" },
      { label: "\u7D27\u6025", value: "high" }
    ];
    const submitting = ref(false);
    const uploading = ref(false);
    const loadingOrder = ref(false);
    const orderDetail = ref(null);
    const fileInput = ref(null);
    const isValid = computed(() => {
      return form.title.trim() && form.content.trim();
    });
    const triggerUpload = () => {
      var _a;
      (_a = fileInput.value) == null ? void 0 : _a.click();
    };
    const handleFileChange = async (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB");
        return;
      }
      try {
        uploading.value = true;
        const result = await uploadImageToStorage(file, `tickets/${props.orderId}`);
        if (result.success && result.url) {
          form.attachments.push(result.url);
        } else {
          alert(result.error || "\u4E0A\u4F20\u5931\u8D25");
        }
      } catch (err) {
        console.error(err);
        alert("\u4E0A\u4F20\u5931\u8D25: " + err.message);
      } finally {
        uploading.value = false;
        if (fileInput.value) fileInput.value.value = "";
      }
    };
    const removeImage = (idx) => {
      form.attachments.splice(idx, 1);
    };
    const submit = async () => {
      if (!isValid.value) return;
      submitting.value = true;
      try {
        const res = await ticketApi.create(
          props.orderId,
          form.title,
          form.content,
          form.priority,
          form.attachments
        );
        if (res.success) {
          emit("success");
          emit("close");
        } else {
          alert(res.error || "\u63D0\u4EA4\u5931\u8D25");
        }
      } catch (e) {
        alert("\u7CFB\u7EDF\u9519\u8BEF");
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: true,
        title: "\u7533\u8BF7\u5DE5\u5355",
        subtitle: "\u6211\u4EEC\u5C06\u5C3D\u5FEB\u5904\u7406\u60A8\u7684\u95EE\u9898\uFF0C\u60A8\u53EF\u4EE5\u5728\u5DE5\u5355\u5217\u8868\u67E5\u770B\u8FDB\u5EA6",
        "submit-text": "\u63D0\u4EA4\u5DE5\u5355",
        loading: submitting.value,
        "submit-disabled": !isValid.value,
        "show-mascot": "",
        "mascot-position": "right",
        onClose: ($event) => _ctx.$emit("close"),
        onCancel: ($event) => _ctx.$emit("close"),
        onSubmit: submit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-body" data-v-8e879a80${_scopeId}>`);
            _push2(ssrRenderComponent(OrderInfoCard, {
              order: orderDetail.value,
              loading: loadingOrder.value
            }, null, _parent2, _scopeId));
            _push2(`<div class="form-group" data-v-8e879a80${_scopeId}><label data-v-8e879a80${_scopeId}>\u95EE\u9898\u6807\u9898 <span class="required" data-v-8e879a80${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.title)} class="form-input" placeholder="\u8BF7\u7B80\u8981\u63CF\u8FF0\u60A8\u9047\u5230\u7684\u95EE\u9898" data-v-8e879a80${_scopeId}></div><div class="form-group" data-v-8e879a80${_scopeId}><label data-v-8e879a80${_scopeId}>\u4F18\u5148\u7EA7</label><div class="priority-options" data-v-8e879a80${_scopeId}><!--[-->`);
            ssrRenderList(priorities, (p) => {
              _push2(`<div class="${ssrRenderClass([{ active: form.priority === p.value, [p.value]: true }, "p-opt"])}" data-v-8e879a80${_scopeId}>${ssrInterpolate(p.label)}</div>`);
            });
            _push2(`<!--]--></div></div><div class="form-group" data-v-8e879a80${_scopeId}><label data-v-8e879a80${_scopeId}>\u8BE6\u7EC6\u63CF\u8FF0 <span class="required" data-v-8e879a80${_scopeId}>*</span></label><textarea class="form-textarea" rows="5" placeholder="\u8BF7\u8BE6\u7EC6\u63CF\u8FF0\u95EE\u9898\u7EC6\u8282..." data-v-8e879a80${_scopeId}>${ssrInterpolate(form.content)}</textarea></div><div class="form-group" data-v-8e879a80${_scopeId}><label data-v-8e879a80${_scopeId}>\u622A\u56FE\u51ED\u8BC1 (\u53EF\u9009)</label><div class="upload-area" data-v-8e879a80${_scopeId}><!--[-->`);
            ssrRenderList(form.attachments, (url, idx) => {
              _push2(`<div class="img-preview" data-v-8e879a80${_scopeId}><img${ssrRenderAttr("src", url)} data-v-8e879a80${_scopeId}><div class="remove-btn" data-v-8e879a80${_scopeId}>\xD7</div></div>`);
            });
            _push2(`<!--]-->`);
            if (form.attachments.length < 3) {
              _push2(`<div class="upload-btn" data-v-8e879a80${_scopeId}>`);
              if (uploading.value) {
                _push2(`<span data-v-8e879a80${_scopeId}>...</span>`);
              } else {
                _push2(`<span data-v-8e879a80${_scopeId}>+</span>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" hidden accept="image/*" data-v-8e879a80${_scopeId}></div><div class="tip" data-v-8e879a80${_scopeId}>\u6700\u591A\u4E0A\u4F20 3 \u5F20\u56FE\u7247</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-body" }, [
                createVNode(OrderInfoCard, {
                  order: orderDetail.value,
                  loading: loadingOrder.value
                }, null, 8, ["order", "loading"]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, [
                    createTextVNode("\u95EE\u9898\u6807\u9898 "),
                    createVNode("span", { class: "required" }, "*")
                  ]),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.title = $event,
                    class: "form-input",
                    placeholder: "\u8BF7\u7B80\u8981\u63CF\u8FF0\u60A8\u9047\u5230\u7684\u95EE\u9898"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.title]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "\u4F18\u5148\u7EA7"),
                  createVNode("div", { class: "priority-options" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(priorities, (p) => {
                      return createVNode("div", {
                        key: p.value,
                        class: ["p-opt", { active: form.priority === p.value, [p.value]: true }],
                        onClick: ($event) => form.priority = p.value
                      }, toDisplayString(p.label), 11, ["onClick"]);
                    }), 64))
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, [
                    createTextVNode("\u8BE6\u7EC6\u63CF\u8FF0 "),
                    createVNode("span", { class: "required" }, "*")
                  ]),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => form.content = $event,
                    class: "form-textarea",
                    rows: "5",
                    placeholder: "\u8BF7\u8BE6\u7EC6\u63CF\u8FF0\u95EE\u9898\u7EC6\u8282..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.content]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "\u622A\u56FE\u51ED\u8BC1 (\u53EF\u9009)"),
                  createVNode("div", { class: "upload-area" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(form.attachments, (url, idx) => {
                      return openBlock(), createBlock("div", {
                        class: "img-preview",
                        key: idx
                      }, [
                        createVNode("img", { src: url }, null, 8, ["src"]),
                        createVNode("div", {
                          class: "remove-btn",
                          onClick: ($event) => removeImage(idx)
                        }, "\xD7", 8, ["onClick"])
                      ]);
                    }), 128)),
                    form.attachments.length < 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "upload-btn",
                      onClick: triggerUpload
                    }, [
                      uploading.value ? (openBlock(), createBlock("span", { key: 0 }, "...")) : (openBlock(), createBlock("span", { key: 1 }, "+"))
                    ])) : createCommentVNode("", true),
                    createVNode("input", {
                      type: "file",
                      ref_key: "fileInput",
                      ref: fileInput,
                      hidden: "",
                      accept: "image/*",
                      onChange: handleFileChange
                    }, null, 544)
                  ]),
                  createVNode("div", { class: "tip" }, "\u6700\u591A\u4E0A\u4F20 3 \u5F20\u56FE\u7247")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/business/TicketApplyModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TicketApplyModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8e879a80"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductInfoCard",
  __ssrInlineRender: true,
  props: {
    productSnapshot: {},
    skuSnapshot: {},
    quantity: {},
    orderStatus: {}
  },
  setup(__props) {
    const props = __props;
    const productImage = computed(() => {
      var _a;
      return ((_a = props.productSnapshot) == null ? void 0 : _a.image) || "";
    });
    const productName = computed(() => {
      var _a;
      return ((_a = props.productSnapshot) == null ? void 0 : _a.product_name) || "\u672A\u77E5\u5546\u54C1";
    });
    const quantity = computed(() => props.quantity || 1);
    const specValues = computed(() => {
      var _a;
      if (!((_a = props.skuSnapshot) == null ? void 0 : _a.spec_combination)) return [];
      return Object.values(props.skuSnapshot.spec_combination);
    });
    const statusTheme = computed(() => {
      const s = props.orderStatus;
      if (s === "active" || s === "completed") return "theme-success";
      if (s === "pending_delivery" || s === "submitted") return "theme-processing";
      if (s === "refunding" || s === "refunded" || s === "rejected") return "theme-error";
      return "theme-default";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card product-card" }, _attrs))} data-v-2312a3c4><div class="product-thumb-wrapper" data-v-2312a3c4>`);
      if (productImage.value) {
        _push(`<img${ssrRenderAttr("src", productImage.value)} class="product-img" data-v-2312a3c4>`);
      } else {
        _push(`<div class="placeholder" data-v-2312a3c4>\u{1F4E6}</div>`);
      }
      _push(`</div><div class="product-details" data-v-2312a3c4><div class="product-name" data-v-2312a3c4>${ssrInterpolate(productName.value)}</div><div class="${ssrRenderClass([statusTheme.value, "tags-row"])}" data-v-2312a3c4><!--[-->`);
      ssrRenderList(specValues.value, (spec, index) => {
        _push(`<span class="tag themed-tag" data-v-2312a3c4>${ssrInterpolate(spec)}</span>`);
      });
      _push(`<!--]--><span class="tag qty-tag" data-v-2312a3c4>x${ssrInterpolate(quantity.value)}</span></div><div class="product-footer" data-v-2312a3c4></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/ProductInfoCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductInfoCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2312a3c4"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const orderId = route.params.id;
    const {
      // Core Data
      order,
      cdkList,
      slotList,
      instructionImage,
      // Refund State
      pendingRefundRequest,
      refundCancelledCount,
      // Ticket State
      activeTicketId,
      // Logic (from useOrderDetailLogic)
      statusText,
      remainingDays,
      getTimeLevel,
      canRenew,
      canRefund,
      canCancelRefund,
      isRefundBlocked,
      // Helpers
      // formatTime,
      // getAmountInteger,
      // getAmountDecimal,
      getFieldsForCdk,
      getCdkForSlot,
      // Actions
      loadData,
      handleRefundSuccess: onRefundSuccess,
      handleCancelRefundSuccess: onCancelRefundSuccess
    } = useOrderDetail(orderId);
    const pendingRefundReason = computed(() => {
      var _a;
      return (_a = pendingRefundRequest.value) == null ? void 0 : _a.reason;
    });
    const historyRef = ref(null);
    const handleFulfillmentSuccess = () => {
      var _a;
      (_a = historyRef.value) == null ? void 0 : _a.refresh();
    };
    const copyText = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("\u5DF2\u590D\u5236");
    };
    const showRenewalModal = ref(false);
    const showRefundModal = ref(false);
    const showCancelRefundModal = ref(false);
    const showTicketModal = ref(false);
    const showContactModal = ref(false);
    const handleAction = async (type) => {
      if (type === "contact") {
        showContactModal.value = true;
      } else if (type === "create_ticket") {
        showTicketModal.value = true;
      } else if (type === "view_ticket") {
        if (activeTicketId.value) {
          router.push("/profile/tickets");
        }
      } else if (type === "renew") {
        showRenewalModal.value = true;
      } else if (type === "apply_refund") {
        showRefundModal.value = true;
      } else if (type === "cancel_refund") {
        showCancelRefundModal.value = true;
      }
    };
    const onRenewalSuccess = (newOrderId) => {
      showRenewalModal.value = false;
    };
    const onTicketSuccess = () => {
      ElMessage.success("\u5DE5\u5355\u5DF2\u63D0\u4EA4");
      loadData();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "order-detail-page" }, _attrs))} data-v-9a09134c><div class="hero-sticky-wrapper" data-v-9a09134c>`);
      _push(ssrRenderComponent(OrderDetailHero, {
        order: unref(order),
        statusText: unref(statusText),
        remainingDays: unref(remainingDays),
        pendingRefundReason: pendingRefundReason.value,
        activeTicketId: unref(activeTicketId),
        canRenew: unref(canRenew),
        canRefund: unref(canRefund),
        canCancelRefund: unref(canCancelRefund),
        isRefundBlocked: unref(isRefundBlocked),
        getTimeLevel: unref(getTimeLevel),
        onBack: ($event) => unref(router).back(),
        onCopy: copyText,
        onAction: handleAction
      }, null, _parent));
      _push(`</div><div class="content-stream" data-v-9a09134c>`);
      _push(ssrRenderComponent(ProductInfoCard, {
        class: "fade-in-up",
        "product-snapshot": unref(order).product_snapshot,
        "sku-snapshot": unref(order).sku_snapshot,
        quantity: unref(order).quantity,
        "order-status": unref(order).status
      }, null, _parent));
      if (unref(order).status === "refunding" && unref(pendingRefundRequest)) {
        _push(ssrRenderComponent(RefundingCard, {
          class: "fade-in-up",
          "refund-request": unref(pendingRefundRequest)
        }, null, _parent));
      } else if (["pending_delivery", "active", "completed"].includes(unref(order).status || "")) {
        _push(`<div class="fulfillment-section fade-in-up" data-v-9a09134c>`);
        if (unref(order).orderType === "shared_account") {
          _push(`<!--[-->`);
          ssrRenderList(unref(slotList), (slot, idx) => {
            _push(`<div class="virtual-item-group" data-v-9a09134c>`);
            if (unref(slotList).length > 1) {
              _push(`<div class="item-separator" data-v-9a09134c><span class="sep-label" data-v-9a09134c>\u8F66\u4F4D ${ssrInterpolate(idx + 1)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(ssrRenderComponent(PcFulfillmentShared, {
              "cdk-item": unref(getCdkForSlot)(slot),
              "slot-index": slot.slot_index
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else if (unref(order).orderType === "one_time_cdk") {
          _push(ssrRenderComponent(PcFulfillmentCdk, { "cdk-list": unref(cdkList) }, null, _parent));
        } else if (unref(order).orderType === "virtual" && unref(cdkList).length > 0) {
          _push(`<div class="virtual-item-group" data-v-9a09134c>`);
          _push(ssrRenderComponent(PcFulfillmentSubmitForm, {
            "order-id": unref(order).id || "",
            "order-status": unref(order).status || "",
            "cdk-fields": unref(getFieldsForCdk)(unref(cdkList)[0]),
            "cdk-id": unref(cdkList)[0].id,
            onSubmitSuccess: handleFulfillmentSuccess
          }, null, _parent));
          _push(ssrRenderComponent(PcFulfillmentHistory, {
            ref_key: "historyRef",
            ref: historyRef,
            "order-id": unref(order).id || "",
            "filter-cdk-id": unref(cdkList)[0].id
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(instructionImage) && unref(order).status !== "refunding") {
        _push(`<div class="glass-tile tutorial-tile fade-in-up" data-v-9a09134c><div class="tile-header" data-v-9a09134c><div class="header-left" data-v-9a09134c>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "header-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(guide_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(guide_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="tile-title" data-v-9a09134c>\u4F7F\u7528\u8BF4\u660E</span></div></div><div class="tutorial-body" data-v-9a09134c><div class="image-wrapper" data-v-9a09134c><img${ssrRenderAttr("src", unref(instructionImage))} loading="lazy" data-v-9a09134c></div><div class="zoom-overlay" data-v-9a09134c><div class="zoom-pill" data-v-9a09134c>`);
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
        _push(` \u70B9\u51FB\u67E5\u770B\u5927\u56FE </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(order).id) {
        _push(ssrRenderComponent(RenewalModal, {
          modelValue: showRenewalModal.value,
          "onUpdate:modelValue": ($event) => showRenewalModal.value = $event,
          "order-id": unref(order).id,
          onSuccess: onRenewalSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(order).id) {
        _push(ssrRenderComponent(RefundModal, {
          modelValue: showRefundModal.value,
          "onUpdate:modelValue": ($event) => showRefundModal.value = $event,
          "order-id": unref(order).id,
          "order-no": unref(order).order_no || "",
          onSuccess: unref(onRefundSuccess)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showTicketModal.value && unref(order).id) {
        _push(ssrRenderComponent(TicketApplyModal, {
          "order-id": unref(order).id,
          "order-info": { order_no: unref(order).order_no || "", product_name: ((_a = unref(order).product_snapshot) == null ? void 0 : _a.product_name) || "" },
          onClose: ($event) => showTicketModal.value = false,
          onSuccess: onTicketSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(order).id) {
        _push(ssrRenderComponent(CancelRefundModal, {
          modelValue: showCancelRefundModal.value,
          "onUpdate:modelValue": ($event) => showCancelRefundModal.value = $event,
          "order-id": unref(order).id,
          "order-no": unref(order).order_no || "",
          "refund-request": unref(pendingRefundRequest),
          "cancelled-count": unref(refundCancelledCount),
          onSuccess: unref(onCancelRefundSuccess)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showContactModal.value) {
        _push(ssrRenderComponent(ServiceModal, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/order/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a09134c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BmVunOJi.mjs.map
