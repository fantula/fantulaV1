import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                    */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext, reactive, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, createTextVNode, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { S as user_default, a4 as copy_document_default, p as plus_default, ai as files_default, l as loading_default, a as circle_check_default, c as circle_close_default, a6 as edit_pen_default, a2 as edit_default, q as refresh_right_default, aj as document_add_default, A as arrow_down_default, P as warning_default, f as arrow_right_default, h as arrow_left_default, ak as box_default, r as refresh_left_default, i as info_filled_default, al as timer_default, am as headset_default, an as tickets_default, v as refresh_default, N as money_default, O as guide_default, o as zoom_in_default } from "./index-4qszPKX4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { c as clientOrderApi } from "./order-CRVwbgS6.js";
import { t as ticketApi } from "./ticket-C7sv4DHi.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import { _ as _export_sfc } from "../server.mjs";
import { E as ElImage } from "./index-BB-fMy6o.js";
/* empty css                         */
import { B as BaseModal } from "./BaseModal-HTOTXfQj.js";
import { C as CouponSelectorModal } from "./CouponSelectorModal-By6Mp4b5.js";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { E as ElMessage } from "./index-CJUZrfXE.js";
import { B as BaseFormModal } from "./BaseFormModal-BT6-Hc0e.js";
import { C as ContactModal } from "./ContactModal-Co07Pgk0.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
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
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./index-D2CY7Ok3.js";
import "./BaseButton-B3srPw2H.js";
import "./index-B9iQGHXi.js";
import "./icon-BcxG_YvU.js";
import "./index-CO6H4Lsj.js";
import "./use-global-config-BPKjMkzA.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-EXqkolUp.js";
/* empty css                  */
import "./BaseCouponTicket-CKW8RMPT.js";
import "./coupon-D1so52Ot.js";
import "./auth-BCuS92ob.js";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
        return { "激活码": item.code };
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
        console.error("获取共享用户失败:", err);
      }
    };
    watch(() => props.cdkItem, () => {
      fetchCoSharingUsers();
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card delivery-card" }, _attrs))} data-v-dc55ef36><div class="delivery-content" data-v-dc55ef36><div class="credential-card" data-v-dc55ef36><div class="credential-header" data-v-dc55ef36><div class="slot-title-badge" data-v-dc55ef36><div class="icon-box" data-v-dc55ef36>`);
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
      _push(`</div><span class="label" data-v-dc55ef36>您的位置:</span><span class="value" data-v-dc55ef36>${ssrInterpolate(formatSlotIndex(__props.slotIndex))}号</span></div></div><div class="credential-body" data-v-dc55ef36><!--[-->`);
      ssrRenderList(parseCdkCode(__props.cdkItem), (val, key) => {
        _push(`<div class="credential-row" data-v-dc55ef36><div class="row-label" data-v-dc55ef36>${ssrInterpolate(key)}</div><div class="row-value-group" data-v-dc55ef36><span class="row-value large-text" data-v-dc55ef36>${ssrInterpolate(val)}</span><button class="copy-btn-icon" data-v-dc55ef36>`);
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
      _push(`<!--]--></div></div><div class="roommates-section" data-v-dc55ef36><div class="roommates-header" data-v-dc55ef36><span class="header-title" data-v-dc55ef36>和您共享的友友</span><span class="header-count" data-v-dc55ef36>${ssrInterpolate(occupiedCount.value)}/${ssrInterpolate(maxSlots.value)} 已入座</span></div><div class="profiles-scroll-container" data-v-dc55ef36><!--[-->`);
      ssrRenderList(allSlots.value, (slot) => {
        _push(`<div class="${ssrRenderClass([{ "is-me": slot.isMe }, "profile-item"])}" data-v-dc55ef36><div class="${ssrRenderClass([{ "empty": !slot.user, "active": slot.user }, "avatar-ring"])}" data-v-dc55ef36>`);
        if (slot.user && slot.user.avatar) {
          _push(`<img${ssrRenderAttr("src", slot.user.avatar)} class="profile-avatar" data-v-dc55ef36>`);
        } else if (slot.user) {
          _push(`<div class="profile-avatar placeholder" data-v-dc55ef36>${ssrInterpolate((slot.user.nickname || "U")[0].toUpperCase())}</div>`);
        } else {
          _push(`<div class="profile-avatar placeholder empty-icon" data-v-dc55ef36>`);
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
        _push(`</div><span class="profile-name" data-v-dc55ef36>${ssrInterpolate(slot.isMe ? "我" : slot.user?.nickname || "待加入")}</span><span class="slot-number-tag" data-v-dc55ef36>${ssrInterpolate(slot.index)}号</span></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/FulfillmentShared.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const FulfillmentShared = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-dc55ef36"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FulfillmentCdk",
  __ssrInlineRender: true,
  props: {
    cdkList: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gift-card-container" }, _attrs))} data-v-aff2e377>`);
      if (__props.cdkList.length === 1) {
        _push(`<div class="gift-cards-wrapper" data-v-aff2e377><div class="gift-card-item" data-v-aff2e377><div class="card-strip" data-v-aff2e377><span class="strip-text" data-v-aff2e377>DIGITAL VOUCHER</span><div class="strip-decoration" data-v-aff2e377></div></div><div class="card-content" data-v-aff2e377><div class="code-label" data-v-aff2e377>兑换码 / REDEEM CODE</div><div class="code-display-row" data-v-aff2e377><span class="the-code" data-v-aff2e377>${ssrInterpolate(__props.cdkList[0].code)}</span></div><div class="action-row" data-v-aff2e377><button class="copy-pill-btn" data-v-aff2e377>`);
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
        _push(` 复制卡密 </button></div></div><div class="shine-effect" data-v-aff2e377></div></div></div>`);
      } else if (__props.cdkList.length > 1) {
        _push(`<div class="compact-stack-wrapper" data-v-aff2e377><div class="glass-header" data-v-aff2e377><div class="header-left" data-v-aff2e377>`);
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
        _push(`<span class="stack-title" data-v-aff2e377>包含 ${ssrInterpolate(__props.cdkList.length)} 组激活码</span></div><button class="batch-copy-btn" data-v-aff2e377> 复制全部 </button></div><div class="stack-list" data-v-aff2e377><!--[-->`);
        ssrRenderList(__props.cdkList, (item, idx) => {
          _push(`<div class="stack-item" data-v-aff2e377><div class="stack-index" data-v-aff2e377>${ssrInterpolate(idx + 1)}</div><div class="stack-code" data-v-aff2e377>${ssrInterpolate(item.code)}</div><button class="icon-copy-btn" data-v-aff2e377>`);
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
        _push(`<div class="empty-state" data-v-aff2e377> 暂无详细交付信息 </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/FulfillmentCdk.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const FulfillmentCdk = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-aff2e377"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
    const latestRejectReason = computed(() => latestFulfillment.value?.reject_reason || "未填写原因");
    const initFormData = () => {
      fields.value.forEach((f) => {
        formData[f.key] = "";
      });
      if (latestFulfillment.value?.payload && (latestStatus.value === "submitted" || latestStatus.value === "rejected")) {
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
        console.error("获取回执失败:", err);
      }
    };
    watch(() => props.cdkFields, () => {
      initFormData();
    }, { immediate: true });
    __expose({ refresh: fetchLatestFulfillment });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fulfillment-submit-form glass-panel" }, _attrs))} data-v-b63f781d><div class="tip-header-glass" data-v-b63f781d><span class="tip-text" data-v-b63f781d>图拉提醒：您要填写以下信息才可以哦</span></div><div class="form-area" data-v-b63f781d><!--[-->`);
      ssrRenderList(fields.value, (field) => {
        _push(`<div class="form-group" data-v-b63f781d><label class="form-label" data-v-b63f781d>${ssrInterpolate(field.label)}</label><div class="input-wrapper" data-v-b63f781d><input${ssrRenderAttr("value", formData[field.key])} class="glass-input"${ssrRenderAttr("placeholder", "请输入" + field.label)} data-v-b63f781d></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (latestStatus.value) {
        _push(`<div class="status-card-wrapper" data-v-b63f781d>`);
        if (latestStatus.value === "submitted") {
          _push(`<div class="status-card pending" data-v-b63f781d><div class="card-icon" data-v-b63f781d>`);
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
          _push(`</div><div class="card-content" data-v-b63f781d><div class="card-title" data-v-b63f781d>审核中</div><div class="card-desc" data-v-b63f781d>您的回执已提交，管理员正在拼命审核中...</div></div></div>`);
        } else if (latestStatus.value === "approved") {
          _push(`<div class="status-card success" data-v-b63f781d><div class="card-icon" data-v-b63f781d>`);
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
          _push(`</div><div class="card-content" data-v-b63f781d><div class="card-title" data-v-b63f781d>已通过</div><div class="card-desc" data-v-b63f781d>充值已完成，请检查您的账户到账情况。</div></div></div>`);
        } else if (latestStatus.value === "rejected") {
          _push(`<div class="status-card error" data-v-b63f781d><div class="card-icon" data-v-b63f781d>`);
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
          _push(`</div><div class="card-content" data-v-b63f781d><div class="card-title" data-v-b63f781d>已驳回</div><div class="card-desc" data-v-b63f781d>原因：${ssrInterpolate(latestRejectReason.value)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="action-footer" data-v-b63f781d>`);
      if (!latestStatus.value) {
        _push(`<button class="glass-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-b63f781d>`);
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
        _push(` 填写回执 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "submitted") {
        _push(`<button class="glass-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-b63f781d>`);
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
        _push(` 修改回执信息 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "rejected") {
        _push(`<button class="glass-btn primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-b63f781d>`);
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
        _push(` 重新提交 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (latestStatus.value === "approved") {
        _push(`<button class="glass-btn secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-b63f781d>`);
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
        _push(` 再次提交 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/FulfillmentSubmitForm.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const FulfillmentSubmitForm = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-b63f781d"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
        console.error("获取回执历史失败:", err);
      }
    };
    const statusText = (status) => {
      const map = {
        submitted: "审核中",
        approved: "已通过",
        rejected: "已驳回"
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fulfillment-history glass-panel" }, _attrs))} data-v-4257991e><div class="history-header" data-v-4257991e><div class="header-left" data-v-4257991e><span class="icon" data-v-4257991e>📋</span><span class="title" data-v-4257991e>回执记录</span><span class="count-badge flex-center" data-v-4257991e>${ssrInterpolate(records.value.length)}</span></div>`);
        if (records.value.length > 1) {
          _push(`<button class="expand-btn" data-v-4257991e><span class="btn-text" data-v-4257991e>${ssrInterpolate(isExpanded.value ? "收起" : "展开历史")}</span>`);
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
        _push(`</div><div class="history-list" data-v-4257991e><!--[-->`);
        ssrRenderList(displayRecords.value, (record, index) => {
          _push(`<div class="${ssrRenderClass([record.status, "history-card slide-in"])}" data-v-4257991e><div class="card-top" data-v-4257991e><div class="${ssrRenderClass([record.status, "status-indicator"])}" data-v-4257991e>`);
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
          _push(`<span data-v-4257991e>${ssrInterpolate(statusText(record.status))}</span></div><span class="time-str" data-v-4257991e>${ssrInterpolate(formatTime(record.submitted_at))}</span></div><div class="card-payload" data-v-4257991e><!--[-->`);
          ssrRenderList(record.payload, (value, key) => {
            _push(`<div class="payload-field" style="${ssrRenderStyle(key !== "_cdk_id" ? null : { display: "none" })}" data-v-4257991e><span class="field-label" data-v-4257991e>${ssrInterpolate(key)}:</span><span class="field-value" data-v-4257991e>${ssrInterpolate(maskValue(value))}</span></div>`);
          });
          _push(`<!--]--></div>`);
          if (record.status === "rejected" && record.reject_reason) {
            _push(`<div class="reject-alert" data-v-4257991e>`);
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
            _push(`<span data-v-4257991e>驳回原因: ${ssrInterpolate(record.reject_reason)}</span></div>`);
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/FulfillmentHistory.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const FulfillmentHistory = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-4257991e"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      name: "商品",
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
      () => selectedSku.value?.price || 0
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
          error.value = res.error || "获取续费信息失败";
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
        error.value = e.message || "系统异常";
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
      if (!selectedSkuId.value || paying.value) return;
      const balance = userStore.user?.balance ?? 0;
      if (balance < finalAmount.value) {
        ElMessage.error(`余额不足，需 ¥${finalAmount.value.toFixed(2)}，当前 ¥${balance.toFixed(2)}`);
        return;
      }
      paying.value = true;
      try {
        const createRes = await clientOrderApi.createRenewalPreOrder(
          selectedSkuId.value,
          props.orderId
        );
        if (!createRes.success) {
          ElMessage.error(createRes.error || "创建续费订单失败");
          return;
        }
        const preOrderId = createRes.preOrderId;
        if (selectedCoupon.value) {
          const couponRes = await clientOrderApi.applyCoupon(
            preOrderId,
            selectedCoupon.value.id
          );
          if (!couponRes.success) {
            ElMessage.warning("优惠券应用失败，将按原价支付");
            discountAmount.value = 0;
          }
        }
        const confirmRes = await clientOrderApi.confirmPreOrder(
          preOrderId,
          "balance",
          selectedCoupon.value?.id
        );
        if (!confirmRes.success) {
          ElMessage.error(confirmRes.error || "支付失败");
          return;
        }
        ElMessage.success("续费成功！");
        await userStore.fetchUserInfo();
        visible.value = false;
        emit("success", confirmRes.orderId);
        router.push(`/profile/order/${confirmRes.orderId}`);
      } catch (e) {
        ElMessage.error(e.message || "系统异常");
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
      _push(ssrRenderComponent(BaseModal, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "续费订单",
        width: "720px",
        footer: false,
        "show-mascot": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="renewal-content" data-v-82125b48${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="loading-state" data-v-82125b48${_scopeId}><div class="spinner" data-v-82125b48${_scopeId}></div><p data-v-82125b48${_scopeId}>加载续费选项...</p></div>`);
            } else if (error.value) {
              _push2(`<div class="error-state" data-v-82125b48${_scopeId}><div class="error-icon" data-v-82125b48${_scopeId}>⚠️</div><p data-v-82125b48${_scopeId}>${ssrInterpolate(error.value)}</p></div>`);
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
              _push2(`<div class="ph-info" data-v-82125b48${_scopeId}><div class="ph-name" data-v-82125b48${_scopeId}>${ssrInterpolate(productInfo.name)}</div><div class="ph-expire" data-v-82125b48${_scopeId}>当前到期: ${ssrInterpolate(formatDate(currentEndTime.value))}</div></div></div><div class="specs-wrapper" data-v-82125b48${_scopeId}>`);
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
                _push2(`<div class="simple-sku-list" data-v-82125b48${_scopeId}><div class="spec-label" data-v-82125b48${_scopeId}>选择时长</div><div class="spec-values" data-v-82125b48${_scopeId}><!--[-->`);
                ssrRenderList(skuList.value, (sku) => {
                  _push2(`<div class="${ssrRenderClass(["spec-val-btn", { active: selectedSkuId.value === sku.sku_id }])}" data-v-82125b48${_scopeId}>${ssrInterpolate(sku.duration)}天 </div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="coupon-section" data-v-82125b48${_scopeId}><div class="coupon-label" data-v-82125b48${_scopeId}>优惠券</div><div class="coupon-value" data-v-82125b48${_scopeId}>`);
              if (selectedCoupon.value) {
                _push2(`<span class="coupon-selected" data-v-82125b48${_scopeId}>-¥${ssrInterpolate(discountAmount.value.toFixed(2))}</span>`);
              } else {
                _push2(`<span class="coupon-placeholder" data-v-82125b48${_scopeId}>选择优惠券</span>`);
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
              _push2(`</div></div></div><div class="refresh-right-col" data-v-82125b48${_scopeId}><div class="summary-card" data-v-82125b48${_scopeId}><div class="summary-title" data-v-82125b48${_scopeId}>订单摘要</div><div class="summary-row" data-v-82125b48${_scopeId}><span data-v-82125b48${_scopeId}>商品金额</span><span data-v-82125b48${_scopeId}>¥${ssrInterpolate(originalAmount.value.toFixed(2))}</span></div>`);
              if (discountAmount.value > 0) {
                _push2(`<div class="summary-row" data-v-82125b48${_scopeId}><span data-v-82125b48${_scopeId}>优惠抵扣</span><span class="text-danger" data-v-82125b48${_scopeId}>-¥${ssrInterpolate(discountAmount.value.toFixed(2))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="divider" data-v-82125b48${_scopeId}></div><div class="total-row" data-v-82125b48${_scopeId}><div class="total-label" data-v-82125b48${_scopeId}>应付金额</div><div class="total-price" data-v-82125b48${_scopeId}><span class="unit" data-v-82125b48${_scopeId}>¥</span>${ssrInterpolate(finalAmount.value.toFixed(2))}</div></div>`);
              if (newEndTime.value) {
                _push2(`<div class="new-expire-tip" data-v-82125b48${_scopeId}> 续费后到期: ${ssrInterpolate(formatDate(newEndTime.value))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="pay-btn"${ssrIncludeBooleanAttr(!selectedSkuId.value || paying.value) ? " disabled" : ""} data-v-82125b48${_scopeId}>`);
              if (paying.value) {
                _push2(`<span data-v-82125b48${_scopeId}>支付中...</span>`);
              } else {
                _push2(`<span data-v-82125b48${_scopeId}>立即支付</span>`);
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
              currentCouponId: selectedCoupon.value?.id,
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
                  createVNode("p", null, "加载续费选项...")
                ])) : error.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "error-state"
                }, [
                  createVNode("div", { class: "error-icon" }, "⚠️"),
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
                          createVNode("div", { class: "ph-expire" }, "当前到期: " + toDisplayString(formatDate(currentEndTime.value)), 1)
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
                          createVNode("div", { class: "spec-label" }, "选择时长"),
                          createVNode("div", { class: "spec-values" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(skuList.value, (sku) => {
                              return openBlock(), createBlock("div", {
                                key: sku.sku_id,
                                class: ["spec-val-btn", { active: selectedSkuId.value === sku.sku_id }],
                                onClick: ($event) => handleSimpleSkuSelect(sku)
                              }, toDisplayString(sku.duration) + "天 ", 11, ["onClick"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", {
                        class: "coupon-section",
                        onClick: ($event) => showCouponModal.value = true
                      }, [
                        createVNode("div", { class: "coupon-label" }, "优惠券"),
                        createVNode("div", { class: "coupon-value" }, [
                          selectedCoupon.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "coupon-selected"
                          }, "-¥" + toDisplayString(discountAmount.value.toFixed(2)), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "coupon-placeholder"
                          }, "选择优惠券")),
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
                        createVNode("div", { class: "summary-title" }, "订单摘要"),
                        createVNode("div", { class: "summary-row" }, [
                          createVNode("span", null, "商品金额"),
                          createVNode("span", null, "¥" + toDisplayString(originalAmount.value.toFixed(2)), 1)
                        ]),
                        discountAmount.value > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "summary-row"
                        }, [
                          createVNode("span", null, "优惠抵扣"),
                          createVNode("span", { class: "text-danger" }, "-¥" + toDisplayString(discountAmount.value.toFixed(2)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "divider" }),
                        createVNode("div", { class: "total-row" }, [
                          createVNode("div", { class: "total-label" }, "应付金额"),
                          createVNode("div", { class: "total-price" }, [
                            createVNode("span", { class: "unit" }, "¥"),
                            createTextVNode(toDisplayString(finalAmount.value.toFixed(2)), 1)
                          ])
                        ]),
                        newEndTime.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "new-expire-tip"
                        }, " 续费后到期: " + toDisplayString(formatDate(newEndTime.value)), 1)) : createCommentVNode("", true),
                        createVNode("button", {
                          class: "pay-btn",
                          disabled: !selectedSkuId.value || paying.value,
                          onClick: handlePay
                        }, [
                          paying.value ? (openBlock(), createBlock("span", { key: 0 }, "支付中...")) : (openBlock(), createBlock("span", { key: 1 }, "立即支付"))
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
                currentCouponId: selectedCoupon.value?.id,
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/RenewalModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const RenewalModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-82125b48"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
    const form = reactive({
      reason: "",
      detail: ""
    });
    const reasons = [
      "买错了/不需要了",
      "商品无法使用",
      "发货速度太慢",
      "商品描述不符",
      "其他原因"
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
          ElMessage.success("退款申请已提交");
          emit("success");
          handleClose();
        } else {
          ElMessage.error(res.error || "提交失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "系统错误");
      } finally {
        submitting.value = false;
      }
    };
    watch(() => props.modelValue, (val) => {
      if (val) {
        form.reason = "";
        form.detail = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        title: "申请退款",
        subtitle: "退款申请将在 1-3 个工作日内处理",
        "submit-text": "提交申请",
        loading: submitting.value,
        "submit-disabled": !isValid.value,
        "show-mascot": "",
        onClose: handleClose,
        onCancel: handleClose,
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="refund-form" data-v-f5be65aa${_scopeId}><div class="info-box" data-v-f5be65aa${_scopeId}><div class="label" data-v-f5be65aa${_scopeId}>订单号</div><div class="value" data-v-f5be65aa${_scopeId}>${ssrInterpolate(__props.orderNo)}</div></div><div class="warning-box" data-v-f5be65aa${_scopeId}>`);
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
            _push2(`<span data-v-f5be65aa${_scopeId}>申请退款后，商品将立即冻结无法使用。如有疑问建议先联系客服。</span></div><div class="form-group" data-v-f5be65aa${_scopeId}><label data-v-f5be65aa${_scopeId}>退款原因 <span class="required" data-v-f5be65aa${_scopeId}>*</span></label><div class="reason-options" data-v-f5be65aa${_scopeId}><!--[-->`);
            ssrRenderList(reasons, (r) => {
              _push2(`<div class="${ssrRenderClass([{ active: form.reason === r }, "reason-tag"])}" data-v-f5be65aa${_scopeId}>${ssrInterpolate(r)}</div>`);
            });
            _push2(`<!--]--></div></div><div class="form-group" data-v-f5be65aa${_scopeId}><label data-v-f5be65aa${_scopeId}>补充说明</label><textarea class="form-textarea" rows="3" placeholder="请填写详细说明（选填）..." data-v-f5be65aa${_scopeId}>${ssrInterpolate(form.detail)}</textarea></div></div>`);
          } else {
            return [
              createVNode("div", { class: "refund-form" }, [
                createVNode("div", { class: "info-box" }, [
                  createVNode("div", { class: "label" }, "订单号"),
                  createVNode("div", { class: "value" }, toDisplayString(__props.orderNo), 1)
                ]),
                createVNode("div", { class: "warning-box" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(warning_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "申请退款后，商品将立即冻结无法使用。如有疑问建议先联系客服。")
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, [
                    createTextVNode("退款原因 "),
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
                  createVNode("label", null, "补充说明"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => form.detail = $event,
                    class: "form-textarea",
                    rows: "3",
                    placeholder: "请填写详细说明（选填）..."
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/RefundModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const RefundModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f5be65aa"]]);
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
      { label: "一般", value: "low" },
      { label: "重要", value: "medium" },
      { label: "紧急", value: "high" }
    ];
    const submitting = ref(false);
    const uploading = ref(false);
    const loadingOrder = ref(false);
    const orderDetail = ref(null);
    const fileInput = ref(null);
    const isValid = computed(() => {
      return form.title.trim() && form.content.trim();
    });
    const formatStatus = (status) => {
      const map = {
        "active": "使用中",
        "completed": "已完成",
        "pending": "处理中",
        "expired": "已过期",
        "refunding": "退款中",
        "refunded": "已退款",
        "pending_delivery": "待发货"
      };
      return map[status] || status;
    };
    const triggerUpload = () => {
      fileInput.value?.click();
    };
    const handleFileChange = async (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("图片大小不能超过 5MB");
        return;
      }
      try {
        uploading.value = true;
        const client = getSupabaseClient();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split(".").pop()}`;
        const { data, error } = await client.storage.from("tickets").upload(`${props.orderId}/${fileName}`, file);
        if (error) throw error;
        const { data: { publicUrl } } = client.storage.from("tickets").getPublicUrl(data.path);
        form.attachments.push(publicUrl);
      } catch (err) {
        console.error(err);
        alert("上传失败: " + err.message);
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
          alert(res.error || "提交失败");
        }
      } catch (e) {
        alert("系统错误");
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: true,
        title: "申请工单",
        subtitle: "我们将尽快处理您的问题，您可以在工单列表查看进度",
        "submit-text": "提交工单",
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
            _push2(`<div class="modal-body" data-v-da51f9e6${_scopeId}>`);
            if (orderDetail.value) {
              _push2(`<div class="order-card-glass" data-v-da51f9e6${_scopeId}><div class="card-image" data-v-da51f9e6${_scopeId}><img${ssrRenderAttr("src", orderDetail.value.product_snapshot?.image)} alt="Product" data-v-da51f9e6${_scopeId}></div><div class="card-info" data-v-da51f9e6${_scopeId}><div class="info-top" data-v-da51f9e6${_scopeId}><span class="order-no" data-v-da51f9e6${_scopeId}>订单号 ${ssrInterpolate(orderDetail.value.order_no)}</span><span class="status-badge" data-v-da51f9e6${_scopeId}>${ssrInterpolate(formatStatus(orderDetail.value.status))}</span></div><div class="product-name" data-v-da51f9e6${_scopeId}>${ssrInterpolate(orderDetail.value.product_snapshot?.product_name)}</div>`);
              if (orderDetail.value.sku_snapshot) {
                _push2(`<div class="specs" data-v-da51f9e6${_scopeId}><!--[-->`);
                ssrRenderList(orderDetail.value.sku_snapshot.spec_combination, (val, key) => {
                  _push2(`<span data-v-da51f9e6${_scopeId}>${ssrInterpolate(val)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="price-row" data-v-da51f9e6${_scopeId}><span class="price" data-v-da51f9e6${_scopeId}>¥${ssrInterpolate(orderDetail.value.total_amount?.toFixed(2))}</span><span class="quantity" data-v-da51f9e6${_scopeId}>x${ssrInterpolate(orderDetail.value.quantity)}</span></div></div></div>`);
            } else if (loadingOrder.value) {
              _push2(`<div class="order-card-loading" data-v-da51f9e6${_scopeId}><span class="loading-spinner" data-v-da51f9e6${_scopeId}></span> 加载订单信息... </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="form-group" data-v-da51f9e6${_scopeId}><label data-v-da51f9e6${_scopeId}>问题标题 <span class="required" data-v-da51f9e6${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.title)} class="form-input" placeholder="请简要描述您遇到的问题" data-v-da51f9e6${_scopeId}></div><div class="form-group" data-v-da51f9e6${_scopeId}><label data-v-da51f9e6${_scopeId}>优先级</label><div class="priority-options" data-v-da51f9e6${_scopeId}><!--[-->`);
            ssrRenderList(priorities, (p) => {
              _push2(`<div class="${ssrRenderClass([{ active: form.priority === p.value, [p.value]: true }, "p-opt"])}" data-v-da51f9e6${_scopeId}>${ssrInterpolate(p.label)}</div>`);
            });
            _push2(`<!--]--></div></div><div class="form-group" data-v-da51f9e6${_scopeId}><label data-v-da51f9e6${_scopeId}>详细描述 <span class="required" data-v-da51f9e6${_scopeId}>*</span></label><textarea class="form-textarea" rows="5" placeholder="请详细描述问题细节..." data-v-da51f9e6${_scopeId}>${ssrInterpolate(form.content)}</textarea></div><div class="form-group" data-v-da51f9e6${_scopeId}><label data-v-da51f9e6${_scopeId}>截图凭证 (可选)</label><div class="upload-area" data-v-da51f9e6${_scopeId}><!--[-->`);
            ssrRenderList(form.attachments, (url, idx) => {
              _push2(`<div class="img-preview" data-v-da51f9e6${_scopeId}><img${ssrRenderAttr("src", url)} data-v-da51f9e6${_scopeId}><div class="remove-btn" data-v-da51f9e6${_scopeId}>×</div></div>`);
            });
            _push2(`<!--]-->`);
            if (form.attachments.length < 3) {
              _push2(`<div class="upload-btn" data-v-da51f9e6${_scopeId}>`);
              if (uploading.value) {
                _push2(`<span data-v-da51f9e6${_scopeId}>...</span>`);
              } else {
                _push2(`<span data-v-da51f9e6${_scopeId}>+</span>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" hidden accept="image/*" data-v-da51f9e6${_scopeId}></div><div class="tip" data-v-da51f9e6${_scopeId}>最多上传 3 张图片</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-body" }, [
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
                      createVNode("span", { class: "order-no" }, "订单号 " + toDisplayString(orderDetail.value.order_no), 1),
                      createVNode("span", { class: "status-badge" }, toDisplayString(formatStatus(orderDetail.value.status)), 1)
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
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, [
                    createTextVNode("问题标题 "),
                    createVNode("span", { class: "required" }, "*")
                  ]),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.title = $event,
                    class: "form-input",
                    placeholder: "请简要描述您遇到的问题"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.title]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "优先级"),
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
                    createTextVNode("详细描述 "),
                    createVNode("span", { class: "required" }, "*")
                  ]),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => form.content = $event,
                    class: "form-textarea",
                    rows: "5",
                    placeholder: "请详细描述问题细节..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.content]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", null, "截图凭证 (可选)"),
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
                        }, "×", 8, ["onClick"])
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
                  createVNode("div", { class: "tip" }, "最多上传 3 张图片")
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
const TicketApplyModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-da51f9e6"]]);
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
    const productImage = computed(() => props.productSnapshot?.image || "");
    const productName = computed(() => props.productSnapshot?.product_name || "未知商品");
    const quantity = computed(() => props.quantity || 1);
    const specValues = computed(() => {
      if (!props.skuSnapshot?.spec_combination) return [];
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
        _push(`<div class="placeholder" data-v-2312a3c4>📦</div>`);
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
    useRouter();
    const orderId = route.params.id;
    const loading = ref(true);
    const { getOrderStatusLabel } = useBizConfig();
    const { formatDate } = useBizFormat();
    const order = ref({});
    const cdkList = ref([]);
    const slotList = ref([]);
    const instructionImage = ref("");
    const activeTicketId = ref(null);
    const pendingRefundRequest = ref(null);
    const statusText = computed(() => {
      const s = order.value.status;
      if (s === "pending_delivery") return "待发货";
      if (s === "active") return "使用中";
      if (s === "refunding") return "退款中";
      if (s === "refunded") return "已退款";
      return getOrderStatusLabel(s || "");
    });
    const pendingRefundReason = computed(() => pendingRefundRequest.value?.reason);
    const remainingDays = computed(() => {
      if (!order.value.expires_at) return null;
      const diff = new Date(order.value.expires_at).getTime() - Date.now();
      if (diff <= 0) return 0;
      return Math.ceil(diff / (1e3 * 60 * 60 * 24));
    });
    const getTimeLevel = (days) => {
      if (days <= 3) return "critical";
      if (days <= 7) return "warning";
      return "safe";
    };
    const isOneTime = computed(() => order.value.orderType === "one_time_cdk");
    const canRenew = computed(() => {
      if (isOneTime.value) return false;
      const s = order.value.status;
      return ["active", "expired"].includes(s || "");
    });
    const canRefund = computed(() => {
      if (isOneTime.value) return false;
      const s = order.value.status;
      return ["pending_delivery", "active"].includes(s || "");
    });
    const getInteger = (val) => Math.floor(val).toLocaleString();
    const getDecimal = (val) => (val % 1).toFixed(2).split(".")[1] || "00";
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
    const getCdkForSlot = (slot) => {
      if (!slot || !slot.cdk_id) return {};
      return cdkList.value.find((c) => c.id === slot.cdk_id) || {};
    };
    const historyRef = ref(null);
    const handleFulfillmentSuccess = () => {
      historyRef.value?.refresh();
    };
    const formatTime = (t) => t ? formatDate(t) : "-";
    const copyText = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("已复制");
    };
    const onRenewalSuccess = (newOrderId) => {
      showRenewalModal.value = false;
    };
    const onTicketSuccess = () => {
      ElMessage.success("工单已提交");
      loadData();
    };
    const onRefundSuccess = () => {
      loadData();
    };
    const showRenewalModal = ref(false);
    const showRefundModal = ref(false);
    const showTicketModal = ref(false);
    const showContactModal = ref(false);
    ref(0);
    const loadData = async () => {
      if (!orderId) return;
      loading.value = true;
      try {
        const res = await clientOrderApi.getOrderDetail(orderId);
        if (res.success && res.data) {
          const d = res.data;
          const pSnap = d.product_snapshot || {};
          const sSnap = d.sku_snapshot || {};
          order.value = {
            id: d.id,
            order_no: d.order_no,
            orderType: d.order_type,
            status: d.status,
            quantity: d.quantity,
            totalAmount: d.total_amount,
            createdAt: d.created_at,
            expires_at: d.expires_at,
            productName: pSnap.product_name || "",
            productImage: pSnap.image || "",
            skuSpec: sSnap.spec_combination ? Object.values(sSnap.spec_combination).join(" ") : "默认",
            product_snapshot: pSnap,
            sku_snapshot: sSnap
          };
          if (d.cdkList && Array.isArray(d.cdkList)) {
            cdkList.value = d.cdkList.map((cdk) => ({ ...cdk }));
            if (cdkList.value.length > 0) {
              const first = cdkList.value[0];
              if (first.accountData) {
                instructionImage.value = first.accountData.image || first.accountData.help_image || first.accountData.common_image || "";
              }
            }
          }
          if (d.slotList && Array.isArray(d.slotList)) {
            slotList.value = d.slotList;
          } else {
            slotList.value = [];
          }
          if (d.status === "refunding" || d.status === "active" || d.status === "pending_delivery") {
            const refundRes = await clientOrderApi.getRefundRequest(orderId);
            if (refundRes.success && refundRes.data) {
              pendingRefundRequest.value = refundRes.data;
            } else {
              pendingRefundRequest.value = null;
            }
          }
          const ticketRes = await ticketApi.getList("processing");
          if (ticketRes.success && ticketRes.data) {
            const match = ticketRes.data.find((t) => t.order_id === orderId);
            if (match) {
              activeTicketId.value = match.id;
            } else {
              activeTicketId.value = null;
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "order-detail-page" }, _attrs))} data-v-8889af3c><div class="hero-sticky-wrapper" data-v-8889af3c><div class="status-hero-card" data-v-8889af3c><div class="${ssrRenderClass([order.value.status, "hero-aurora-bg"])}" data-v-8889af3c></div><div class="hero-content" data-v-8889af3c><div class="hero-top-row" data-v-8889af3c><div class="top-left-group" data-v-8889af3c><div class="back-btn" data-v-8889af3c>`);
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
      _push(`<span class="back-text" data-v-8889af3c>返回</span></div><div class="order-no-badge" data-v-8889af3c><span class="label" data-v-8889af3c>订单号</span><span class="value" data-v-8889af3c>${ssrInterpolate(order.value.order_no || "---")}</span>`);
      _push(ssrRenderComponent(_component_el_icon, {
        class: "copy-icon",
        onClick: ($event) => copyText(order.value.order_no)
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
      _push(`</div></div><div class="amount-display-top" data-v-8889af3c><span class="amount-integer" data-v-8889af3c>${ssrInterpolate(getInteger(order.value.totalAmount || 0))}</span><span class="amount-decimal" data-v-8889af3c>.${ssrInterpolate(getDecimal(order.value.totalAmount || 0))}</span><span class="amount-unit" data-v-8889af3c>点</span></div></div><div class="hero-main-row" data-v-8889af3c><div class="status-group" data-v-8889af3c><div class="${ssrRenderClass([order.value.status, "status-icon-box"])}" data-v-8889af3c>`);
      if (order.value.status === "active" || order.value.status === "completed") {
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
      } else if (order.value.status === "refunding" || order.value.status === "refunded") {
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
      _push(`</div><div class="status-text-wrapper" data-v-8889af3c><div class="status-title-row" data-v-8889af3c><h1 class="status-title" data-v-8889af3c>${ssrInterpolate(statusText.value)}</h1>`);
      if (order.value.status === "active" && remainingDays.value !== null) {
        _push(`<div class="${ssrRenderClass([getTimeLevel(remainingDays.value), "time-badge"])}" data-v-8889af3c>`);
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
        _push(` 剩余 ${ssrInterpolate(remainingDays.value)} 天 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="status-desc" data-v-8889af3c>`);
      if (order.value.status === "refunding") {
        _push(`<span data-v-8889af3c>退款申请待审核：${ssrInterpolate(pendingRefundReason.value || "请耐心等待")}</span>`);
      } else if (order.value.status === "pending_delivery") {
        _push(`<span data-v-8889af3c>系统正在极速配货中</span>`);
      } else if (order.value.status === "active") {
        _push(`<span data-v-8889af3c>商品状态正常，到期时间: ${ssrInterpolate(formatTime(order.value.expires_at || ""))}</span>`);
      } else {
        _push(`<span data-v-8889af3c>下单时间: ${ssrInterpolate(formatTime(order.value.createdAt || ""))}</span>`);
      }
      _push(`</div></div></div><div class="hero-actions" data-v-8889af3c><button class="hero-btn secondary" data-v-8889af3c>`);
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
      _push(` 联系客服 </button>`);
      if (activeTicketId.value) {
        _push(`<button class="hero-btn secondary" data-v-8889af3c>`);
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
        _push(` 查看工单 </button>`);
      } else {
        _push(`<button class="hero-btn secondary" data-v-8889af3c>`);
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
        _push(` 申请工单 </button>`);
      }
      if (canRenew.value) {
        _push(`<button class="hero-btn primary" data-v-8889af3c>`);
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
        _push(` 续费 </button>`);
      } else {
        _push(`<!---->`);
      }
      if (order.value.status === "refunding" || pendingRefundRequest.value) {
        _push(`<button class="hero-btn warning" data-v-8889af3c>`);
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
        _push(` 取消退款 </button>`);
      } else if (canRefund.value) {
        _push(`<button class="hero-btn danger" data-v-8889af3c>`);
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
        _push(` 申请退款 </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="noise-overlay" data-v-8889af3c></div></div></div><div class="content-stream" data-v-8889af3c>`);
      _push(ssrRenderComponent(ProductInfoCard, {
        class: "fade-in-up",
        "product-snapshot": order.value.product_snapshot,
        "sku-snapshot": order.value.sku_snapshot,
        quantity: order.value.quantity,
        "order-status": order.value.status
      }, null, _parent));
      if (["pending_delivery", "active", "completed", "refunding"].includes(order.value.status || "")) {
        _push(`<div class="fulfillment-section fade-in-up" data-v-8889af3c>`);
        if (order.value.orderType === "shared_account") {
          _push(`<!--[-->`);
          ssrRenderList(slotList.value, (slot, idx) => {
            _push(`<div class="virtual-item-group" data-v-8889af3c>`);
            if (slotList.value.length > 1) {
              _push(`<div class="item-separator" data-v-8889af3c><span class="sep-label" data-v-8889af3c>车位 ${ssrInterpolate(idx + 1)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(ssrRenderComponent(FulfillmentShared, {
              "cdk-item": getCdkForSlot(slot),
              "slot-index": slot.slot_index
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else if (order.value.orderType === "one_time_cdk") {
          _push(ssrRenderComponent(FulfillmentCdk, { "cdk-list": cdkList.value }, null, _parent));
        } else if (order.value.orderType === "virtual" && cdkList.value.length > 0) {
          _push(`<div class="virtual-item-group" data-v-8889af3c>`);
          _push(ssrRenderComponent(FulfillmentSubmitForm, {
            "order-id": order.value.id || "",
            "order-status": order.value.status || "",
            "cdk-fields": getFieldsForCdk(cdkList.value[0]),
            "cdk-id": cdkList.value[0].id,
            onSubmitSuccess: handleFulfillmentSuccess
          }, null, _parent));
          _push(ssrRenderComponent(FulfillmentHistory, {
            ref_key: "historyRef",
            ref: historyRef,
            "order-id": order.value.id || "",
            "filter-cdk-id": cdkList.value[0].id
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (instructionImage.value) {
        _push(`<div class="glass-tile tutorial-tile fade-in-up" data-v-8889af3c><div class="tile-header" data-v-8889af3c><div class="header-left" data-v-8889af3c>`);
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
        _push(`<span class="tile-title" data-v-8889af3c>使用说明</span></div></div><div class="tutorial-body" data-v-8889af3c><div class="image-wrapper" data-v-8889af3c><img${ssrRenderAttr("src", instructionImage.value)} loading="lazy" data-v-8889af3c></div><div class="zoom-overlay" data-v-8889af3c><div class="zoom-pill" data-v-8889af3c>`);
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
        _push(` 点击查看大图 </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (order.value.id) {
        _push(ssrRenderComponent(RenewalModal, {
          modelValue: showRenewalModal.value,
          "onUpdate:modelValue": ($event) => showRenewalModal.value = $event,
          "order-id": order.value.id,
          onSuccess: onRenewalSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (order.value.id) {
        _push(ssrRenderComponent(RefundModal, {
          modelValue: showRefundModal.value,
          "onUpdate:modelValue": ($event) => showRefundModal.value = $event,
          "order-id": order.value.id,
          "order-no": order.value.order_no,
          onSuccess: onRefundSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showTicketModal.value && order.value.id) {
        _push(ssrRenderComponent(TicketApplyModal, {
          "order-id": order.value.id,
          "order-info": { order_no: order.value.order_no || "", product_name: order.value.product_snapshot?.product_name || "" },
          onClose: ($event) => showTicketModal.value = false,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/order/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8889af3c"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-D_HDm_A9.js.map
