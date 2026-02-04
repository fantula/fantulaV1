import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElImage } from "./index-BhTf_yFC.js";
/* empty css              */
/* empty css                         */
/* empty css                    */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { S as user_default, a4 as copy_document_default, p as plus_default, l as loading_default, a as circle_check_default, c as circle_close_default, A as arrow_down_default, P as warning_default, b as close_default, h as arrow_left_default, ak as box_default, r as refresh_left_default, i as info_filled_default, am as headset_default, an as tickets_default, o as zoom_in_default } from "./index-CmsdIFY8.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { c as clientOrderApi } from "./order-CRVwbgS6.js";
import { t as ticketApi } from "./ticket-C7sv4DHi.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import { _ as _export_sfc } from "../server.mjs";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { C as ContactModal } from "./ContactModal-BLWDvuWe.js";
import { E as ElMessage } from "./index-eYVppfk3.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./index-D2CY7Ok3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./auth-BCuS92ob.js";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
import "./icon-eqoLCvNY.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-CO6H4Lsj.js";
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
        return { "激活码": item.code };
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
      _push(`<span data-v-26d0895e>我的车位: ${ssrInterpolate(formatSlotIndex(__props.slotIndex))}号</span></div></div><div class="cred-body" data-v-26d0895e><!--[-->`);
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
      _push(`<!--]--></div></div><div class="roommates-box" data-v-26d0895e><div class="roommates-title" data-v-26d0895e><span data-v-26d0895e>共享车友</span><span class="count" data-v-26d0895e>${ssrInterpolate(occupiedCount.value)}/${ssrInterpolate(maxSlots.value)}</span></div><div class="roommates-scroll" data-v-26d0895e><!--[-->`);
      ssrRenderList(allSlots.value, (slot) => {
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
        _push(`</div><div class="roommate-name" data-v-26d0895e>${ssrInterpolate(slot.isMe ? "我" : slot.user?.nickname || "空")}</div><div class="slot-num" data-v-26d0895e>${ssrInterpolate(slot.index)}号</div></div>`);
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
        _push(`<div class="cdk-item" data-v-963e1a12><div class="cdk-header" data-v-963e1a12><span class="cdk-label" data-v-963e1a12>卡密 ${ssrInterpolate(index + 1)}</span><button class="copy-btn" data-v-963e1a12>`);
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
        _push(` 复制 </button></div><div class="cdk-content" data-v-963e1a12><div class="code-box" data-v-963e1a12>${ssrInterpolate(item.code)}</div></div></div>`);
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
    const latestStatus = computed(() => latestFulfillment.value?.status);
    const latestRejectReason = computed(() => latestFulfillment.value?.reject_reason || "-");
    const initFormData = () => {
      fields.value.forEach((f) => formData[f.key] = "");
      if (latestFulfillment.value?.payload && ["submitted", "rejected"].includes(latestStatus.value || "")) {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-submit-form" }, _attrs))} data-v-a72ee594><div class="form-tip" data-v-a72ee594> 请填写以下信息以进行充值 </div><div class="fields-container" data-v-a72ee594><!--[-->`);
      ssrRenderList(fields.value, (field) => {
        _push(`<div class="field-item" data-v-a72ee594><label data-v-a72ee594>${ssrInterpolate(field.label)}</label><div class="input-box" data-v-a72ee594><input${ssrRenderAttr("value", formData[field.key])}${ssrRenderAttr("placeholder", "请输入" + field.label)} data-v-a72ee594></div></div>`);
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
          _push(`</div><div class="text" data-v-a72ee594><div class="t-title" data-v-a72ee594>审核中</div><div class="t-desc" data-v-a72ee594>您的回执已提交，请耐心等待...</div></div></div>`);
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
          _push(`</div><div class="text" data-v-a72ee594><div class="t-title" data-v-a72ee594>已通过</div><div class="t-desc" data-v-a72ee594>充值已完成，请检查到账情况。</div></div></div>`);
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
          _push(`</div><div class="text" data-v-a72ee594><div class="t-title" data-v-a72ee594>已驳回</div><div class="t-desc" data-v-a72ee594>原因: ${ssrInterpolate(latestRejectReason.value)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-a72ee594>`);
      if (!latestStatus.value || latestStatus.value === "rejected") {
        _push(`<button class="action-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-a72ee594>${ssrInterpolate(isSubmitting.value ? "提交中..." : latestStatus.value === "rejected" ? "重新提交" : "提交回执")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "submitted") {
        _push(`<button class="action-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-a72ee594>${ssrInterpolate(isSubmitting.value ? "保存中..." : "修改信息")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "approved") {
        _push(`<button class="action-btn outline"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-a72ee594> 再次提交 </button>`);
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
      const map = { submitted: "审核中", approved: "已通过", rejected: "已驳回" };
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-history-card" }, _attrs))} data-v-765055e2><div class="card-header" data-v-765055e2><div class="header-main" data-v-765055e2><span class="title" data-v-765055e2>回执记录</span><span class="badge" data-v-765055e2>${ssrInterpolate(records.value.length)}</span></div><div class="toggle-icon" data-v-765055e2>`);
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
              _push(`<span data-v-765055e2>原因: ${ssrInterpolate(record.reject_reason)}</span></div>`);
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sheet-mask" }, _attrs))} data-v-f04d8ecd><div class="sheet-panel" data-v-f04d8ecd><div class="sheet-header" data-v-f04d8ecd><div class="title" data-v-f04d8ecd>续费订单</div><div class="close-btn" data-v-f04d8ecd>`);
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
          _push(`<div class="sheet-body" data-v-f04d8ecd><div class="loading-box" data-v-f04d8ecd>加载中...</div></div>`);
        } else {
          _push(`<div class="sheet-body" data-v-f04d8ecd><div class="prod-row" data-v-f04d8ecd><div class="thumb" data-v-f04d8ecd><img${ssrRenderAttr("src", productInfo.image)} data-v-f04d8ecd></div><div class="info" data-v-f04d8ecd><div class="name" data-v-f04d8ecd>${ssrInterpolate(productInfo.name)}</div><div class="expire" data-v-f04d8ecd>当前到期: ${ssrInterpolate(formatDate(currentEndTime.value))}</div></div></div><div class="specs-section" data-v-f04d8ecd><!--[-->`);
          ssrRenderList(specGroups.value, (group) => {
            _push(`<div class="group" data-v-f04d8ecd><div class="g-name" data-v-f04d8ecd>${ssrInterpolate(group.name)}</div><div class="g-vals" data-v-f04d8ecd><!--[-->`);
            ssrRenderList(group.values, (val) => {
              _push(`<div class="${ssrRenderClass([{ active: selectedSpecs[group.name] === val.value }, "val-chip"])}" data-v-f04d8ecd>${ssrInterpolate(val.value)}</div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]-->`);
          if (specGroups.value.length === 0 && skuList.value.length > 0) {
            _push(`<div class="group" data-v-f04d8ecd><div class="g-name" data-v-f04d8ecd>选择时长</div><div class="g-vals" data-v-f04d8ecd><!--[-->`);
            ssrRenderList(skuList.value, (sku) => {
              _push(`<div class="${ssrRenderClass([{ active: selectedSkuId.value === sku.sku_id }, "val-chip"])}" data-v-f04d8ecd>${ssrInterpolate(sku.duration)}天 </div>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (availableCoupons.value.length > 0) {
            _push(`<div class="coupon-section" data-v-f04d8ecd><div class="g-name" data-v-f04d8ecd>优惠券</div><div class="coupon-list" data-v-f04d8ecd><div class="${ssrRenderClass([{ active: !selectedCoupon.value }, "coupon-item"])}" data-v-f04d8ecd> 不使用优惠券 </div><!--[-->`);
            ssrRenderList(availableCoupons.value, (coupon) => {
              _push(`<div class="${ssrRenderClass([{ active: selectedCoupon.value?.id === coupon.id }, "coupon-item"])}" data-v-f04d8ecd><span class="c-name" data-v-f04d8ecd>${ssrInterpolate(coupon.coupon.name)}</span>`);
              if (coupon.coupon.type === "flat") {
                _push(`<span class="c-val" data-v-f04d8ecd>-¥${ssrInterpolate(coupon.coupon.value)}</span>`);
              } else if (coupon.coupon.type === "product") {
                _push(`<span class="c-val" data-v-f04d8ecd>免单</span>`);
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
        _push(`<div class="sheet-footer" data-v-f04d8ecd><div class="price-info" data-v-f04d8ecd><div class="total-label" data-v-f04d8ecd>总计</div><div class="price-row" data-v-f04d8ecd><div class="price" data-v-f04d8ecd>¥${ssrInterpolate(finalAmount.value)}</div>`);
        if (discountAmount.value > 0) {
          _push(`<div class="discount-tag" data-v-f04d8ecd>-¥${ssrInterpolate(discountAmount.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><button class="pay-btn"${ssrIncludeBooleanAttr(!selectedSkuId.value || paying.value) ? " disabled" : ""} data-v-f04d8ecd>${ssrInterpolate(paying.value ? "支付中..." : "立即支付")}</button></div></div></div>`);
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
    const reasons = ["买错了/不需要了", "商品无法使用", "发货速度太慢", "商品描述不符", "其他原因"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (visible.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sheet-mask" }, _attrs))} data-v-d3c29205><div class="sheet-panel" data-v-d3c29205><div class="sheet-header" data-v-d3c29205><div class="title" data-v-d3c29205>申请退款</div><div class="close-btn" data-v-d3c29205>`);
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
        _push(` 申请退款后商品将立即冻结，如有疑问请先联系客服。 订单号: ${ssrInterpolate(__props.orderNo)}</div><div class="form-section" data-v-d3c29205><div class="label" data-v-d3c29205>退款原因</div><div class="reason-chips" data-v-d3c29205><!--[-->`);
        ssrRenderList(reasons, (r) => {
          _push(`<div class="${ssrRenderClass([{ active: form.reason === r }, "chip"])}" data-v-d3c29205>${ssrInterpolate(r)}</div>`);
        });
        _push(`<!--]--></div></div><div class="form-section" data-v-d3c29205><div class="label" data-v-d3c29205>详细说明</div><textarea class="desc-input" placeholder="请填写详细说明（选填）" rows="3" data-v-d3c29205>${ssrInterpolate(form.detail)}</textarea></div><button class="submit-btn"${ssrIncludeBooleanAttr(!form.reason || submitting.value) ? " disabled" : ""} data-v-d3c29205>${ssrInterpolate(submitting.value ? "提交中..." : "提交申请")}</button></div></div></div>`);
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
      { label: "一般", val: "low" },
      { label: "重要", val: "medium" },
      { label: "紧急", val: "high" }
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sheet-mask" }, _attrs))} data-v-5cdfaf2a><div class="sheet-panel" data-v-5cdfaf2a><div class="sheet-header" data-v-5cdfaf2a><div class="title" data-v-5cdfaf2a>提交工单</div><div class="close-btn" data-v-5cdfaf2a>`);
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
          _push(`<div class="order-card-glass" data-v-5cdfaf2a><div class="card-image" data-v-5cdfaf2a><img${ssrRenderAttr("src", __props.orderInfo.productImage)} alt="Product" data-v-5cdfaf2a></div><div class="card-info" data-v-5cdfaf2a><div class="info-top" data-v-5cdfaf2a><span class="order-no" data-v-5cdfaf2a>订单号 ${ssrInterpolate(__props.orderInfo.order_no)}</span></div><div class="product-name" data-v-5cdfaf2a>${ssrInterpolate(__props.orderInfo.productName)}</div><div class="specs" data-v-5cdfaf2a><span data-v-5cdfaf2a>${ssrInterpolate(__props.orderInfo.skuSpec)}</span></div><div class="price-row" data-v-5cdfaf2a><span class="price" data-v-5cdfaf2a>¥${ssrInterpolate(__props.orderInfo.totalAmount)}</span><span class="quantity" data-v-5cdfaf2a>x${ssrInterpolate(__props.orderInfo.quantity)}</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>标题 <span class="req" data-v-5cdfaf2a>*</span></label><input${ssrRenderAttr("value", form.title)} class="m-input" placeholder="简要描述问题" data-v-5cdfaf2a></div><div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>优先级</label><div class="priority-row" data-v-5cdfaf2a><!--[-->`);
        ssrRenderList(priorities, (p) => {
          _push(`<div class="${ssrRenderClass([{ active: form.priority === p.val, [p.val]: true }, "p-chip"])}" data-v-5cdfaf2a>${ssrInterpolate(p.label)}</div>`);
        });
        _push(`<!--]--></div></div><div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>详细描述 <span class="req" data-v-5cdfaf2a>*</span></label><textarea class="m-input area" rows="4" placeholder="请详细描述..." data-v-5cdfaf2a>${ssrInterpolate(form.content)}</textarea></div><div class="form-group" data-v-5cdfaf2a><label data-v-5cdfaf2a>截图 (${ssrInterpolate(form.attachments.length)}/3)</label><div class="upload-row" data-v-5cdfaf2a><!--[-->`);
        ssrRenderList(form.attachments, (url, idx) => {
          _push(`<div class="img-preview" data-v-5cdfaf2a><img${ssrRenderAttr("src", url)} data-v-5cdfaf2a><div class="del-btn" data-v-5cdfaf2a>×</div></div>`);
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
        _push(`</div><input type="file" hidden accept="image/*" data-v-5cdfaf2a></div></div><div class="sheet-footer" data-v-5cdfaf2a><button class="submit-btn"${ssrIncludeBooleanAttr(!isValid.value || submitting.value) ? " disabled" : ""} data-v-5cdfaf2a>${ssrInterpolate(submitting.value ? "提交中..." : "提交工单")}</button></div></div></div>`);
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
      if (s === "pending_delivery") return "待发货";
      if (s === "active") return "使用中";
      if (s === "refunding") return "退款中";
      if (s === "refunded") return "已退款";
      return getOrderStatusLabel(s || "");
    });
    const isOneTime = computed(() => order.value.orderType === "one_time_cdk");
    const canRenew = computed(() => !isOneTime.value && ["active", "expired"].includes(order.value.status || ""));
    const canRefund = computed(() => !isOneTime.value && ["pending_delivery", "active"].includes(order.value.status || ""));
    const loadData = async () => {
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
            productName: d.product_snapshot?.product_name || "",
            productImage: d.product_snapshot?.image || "",
            skuSpec: d.sku_snapshot?.spec_combination ? Object.values(d.sku_snapshot.spec_combination).join(" ") : "标准"
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
      let keys = [];
      if (cdk.parsed && typeof cdk.parsed === "object") {
        if (Array.isArray(cdk.parsed.fields) && cdk.parsed.fields.length > 0) {
          keys = cdk.parsed.fields.filter((f) => typeof f === "string");
        } else if (Object.keys(cdk.parsed).length > 0) {
          keys = Object.keys(cdk.parsed);
        }
      }
      if (keys.length === 0) {
        const raw = cdk.code?.trim() || "";
        if (!raw) return [];
        let cleaned = raw.replace(/[\(\)（）\[\]【】]/g, "");
        keys = cleaned.split(/[,，、]/).map((s) => s.trim()).filter((s) => s.length > 0);
      }
      return keys.map((key) => ({ key, label: key, value: "" }));
    };
    const handleFulfillmentSuccess = () => {
      historyRef.value?.refresh();
    };
    const onTicketSuccess = () => {
      ElMessage.success("工单已提交");
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
      _push(`</div><div class="header-title" data-v-8d025a81>订单详情</div><div class="header-action" data-v-8d025a81></div></div><div class="${ssrRenderClass([order.value.status, "status-card"])}" data-v-8d025a81><div class="status-main" data-v-8d025a81><div class="status-icon" data-v-8d025a81>`);
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
        _push(`<div class="status-sub" data-v-8d025a81>到期: ${ssrInterpolate(formatTime(order.value.expires_at))}</div>`);
      } else {
        _push(`<div class="status-sub" data-v-8d025a81>下单: ${ssrInterpolate(formatTime(order.value.createdAt))}</div>`);
      }
      _push(`</div><div class="status-amount" data-v-8d025a81><span class="symbol" data-v-8d025a81>¥</span><span class="val" data-v-8d025a81>${ssrInterpolate(order.value.totalAmount)}</span></div></div><div class="ops-bar" data-v-8d025a81><button class="op-btn" data-v-8d025a81>`);
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
      _push(` 客服 </button>`);
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
        _push(` 工单 </button>`);
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
        _push(` 报障 </button>`);
      }
      if (canRenew.value) {
        _push(`<button class="op-btn primary" data-v-8d025a81>续费</button>`);
      } else {
        _push(`<!---->`);
      }
      if (order.value.status === "refunding" || pendingRefundRequest.value) {
        _push(`<button class="op-btn warning" data-v-8d025a81>取消退款</button>`);
      } else if (canRefund.value) {
        _push(`<button class="op-btn danger" data-v-8d025a81>退款</button>`);
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
            _push(`<div class="section-group" data-v-8d025a81><div class="section-title" data-v-8d025a81>卡密信息</div>`);
            _push(ssrRenderComponent(FulfillmentCdk, { "cdk-list": cdkList.value }, null, _parent));
            _push(`</div>`);
          } else if (order.value.orderType === "virtual" && cdkList.value.length > 0) {
            _push(`<div class="section-group" data-v-8d025a81><div class="section-title" data-v-8d025a81>充值进度</div><div class="virtual-item-group" data-v-8d025a81>`);
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
          _push(`<div class="section-group" data-v-8d025a81><div class="section-title" data-v-8d025a81>使用说明</div><div class="tutorial-box" data-v-8d025a81>`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-Dh5I_DCV.js.map
