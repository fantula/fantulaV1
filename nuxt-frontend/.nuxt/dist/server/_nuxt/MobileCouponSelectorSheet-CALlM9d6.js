import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElEmpty } from "./index-BRSsuUkY.js";
import "./base-CEWXqFm3.js";
/* empty css                  */
import { defineComponent, computed, ref, toRef, watch, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { b as close_default, i as info_filled_default, M as refresh_default, l as loading_default } from "./index-DNnPa_Q9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { M as MobileCouponTicket } from "./MobileCouponTicket-CKmGRj2b.js";
import { u as useCouponList } from "./useCouponList-CqWCtWwI.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./index-DbvZsXcZ.js";
import "./coupon-CAcMEk5R.js";
import "./supabase-Ds8OQlZJ.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileCouponSelectorSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderAmount: {},
    skuIds: {},
    productIds: {},
    currentCouponId: {}
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const tempSelected = ref(null);
    const {
      loading: listLoading,
      coupons,
      sortedCoupons,
      loadCoupons,
      isApplicable,
      getInapplicableReason
    } = useCouponList(
      toRef(props, "orderAmount"),
      toRef(props, "skuIds"),
      toRef(props, "productIds")
    );
    watch(() => props.modelValue, (val) => {
      if (val) {
        loadCoupons();
      }
    });
    watch(sortedCoupons, (list) => {
      if (visible.value && list.length > 0) {
        if (props.currentCouponId) {
          tempSelected.value = list.find((c) => c.id === props.currentCouponId) || null;
        } else {
          tempSelected.value = null;
        }
      }
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "永久有效";
      const date = new Date(dateStr);
      return `有效期至 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_empty = ElEmpty;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="sheet-mask" data-v-fc5c9d4a><div class="sheet-panel-glass aurora-sheet-panel" data-v-fc5c9d4a><div class="sheet-header" data-v-fc5c9d4a><div class="title" data-v-fc5c9d4a>选择优惠券</div><div class="close-btn" data-v-fc5c9d4a>`);
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
          _push2(`</div></div><div class="sheet-sub-header" data-v-fc5c9d4a><div class="header-tip" data-v-fc5c9d4a>`);
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
          _push2(` 仅显示当前订单可用的优惠券 </div><div class="refresh-btn" data-v-fc5c9d4a>`);
          _push2(ssrRenderComponent(_component_el_icon, {
            class: { spinning: unref(listLoading) }
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(refresh_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(refresh_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div><div class="sheet-body" data-v-fc5c9d4a>`);
          if (unref(listLoading)) {
            _push2(`<div class="loading-state" data-v-fc5c9d4a>`);
            _push2(ssrRenderComponent(_component_el_icon, { class: "spinning" }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(loading_default))
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`<span data-v-fc5c9d4a>加载中...</span></div>`);
          } else if (unref(coupons).length === 0) {
            _push2(`<div class="empty-state" data-v-fc5c9d4a>`);
            _push2(ssrRenderComponent(_component_el_empty, {
              description: "暂无可用优惠券",
              "image-size": 80
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<div class="coupon-list" data-v-fc5c9d4a><div class="${ssrRenderClass([{ active: tempSelected.value === null }, "no-coupon-item glass-card"])}" data-v-fc5c9d4a><div class="label" data-v-fc5c9d4a>不使用优惠券</div><div class="radio-check" data-v-fc5c9d4a></div></div><!--[-->`);
            ssrRenderList(unref(sortedCoupons), (coupon) => {
              _push2(`<div class="${ssrRenderClass([{ disabled: !unref(isApplicable)(coupon) }, "coupon-wrapper"])}" data-v-fc5c9d4a>`);
              _push2(ssrRenderComponent(MobileCouponTicket, {
                type: coupon.coupon.type,
                value: coupon.coupon.value,
                title: coupon.coupon.name,
                expiryText: formatDate(coupon.coupon.end_date),
                status: "unused",
                disabled: !unref(isApplicable)(coupon)
              }, null, _parent));
              _push2(`<div class="selection-overlay" data-v-fc5c9d4a><div class="${ssrRenderClass([{ checked: tempSelected.value?.id === coupon.id }, "radio-check"])}" data-v-fc5c9d4a></div></div>`);
              if (!unref(isApplicable)(coupon)) {
                _push2(`<div class="inapplicable-reason" data-v-fc5c9d4a>${ssrInterpolate(unref(getInapplicableReason)(coupon))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div><div class="sheet-footer" data-v-fc5c9d4a><button class="submit-btn-glow" data-v-fc5c9d4a> 确认使用 </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/checkout/MobileCouponSelectorSheet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileCouponSelectorSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc5c9d4a"]]);
export {
  MobileCouponSelectorSheet as default
};
//# sourceMappingURL=MobileCouponSelectorSheet-CALlM9d6.js.map
