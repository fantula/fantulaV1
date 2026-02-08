import { E as ElIcon } from "./index-jl2vZbkg.js";
import { E as ElEmpty } from "./index-DHhizeNf.js";
/* empty css              */
/* empty css                  */
import { defineComponent, computed, ref, watch, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { b as close_default, i as info_filled_default, q as refresh_default, l as loading_default } from "./index-DlETah8a.js";
import { c as couponApi } from "./coupon-D1so52Ot.js";
import { M as MobileCouponTicket } from "./MobileCouponTicket-CKmGRj2b.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./index-K5TIzHX_.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
    const listLoading = ref(false);
    const coupons = ref([]);
    const tempSelected = ref(null);
    watch(() => props.modelValue, (val) => {
      if (val) {
        loadCoupons();
      }
    });
    const sortedCoupons = computed(() => {
      return [...coupons.value].sort((a, b) => {
        const aValid = isApplicable(a);
        const bValid = isApplicable(b);
        if (aValid && !bValid) return -1;
        if (!aValid && bValid) return 1;
        return b.coupon.value - a.coupon.value;
      });
    });
    const loadCoupons = async () => {
      listLoading.value = true;
      try {
        const res = await couponApi.getUserCoupons();
        if (res.success && res.data) {
          const now = /* @__PURE__ */ new Date();
          coupons.value = res.data.filter(
            (c) => c.status === "unused" && c.coupon.type !== "balance" && (!c.coupon.end_date || new Date(c.coupon.end_date) >= now)
          );
          if (props.currentCouponId) {
            tempSelected.value = coupons.value.find((c) => c.id === props.currentCouponId) || null;
          } else {
            tempSelected.value = null;
          }
        }
      } catch (e) {
      } finally {
        listLoading.value = false;
      }
    };
    const isApplicable = (coupon) => {
      const c = coupon.coupon;
      if (props.orderAmount < c.min_usage) return false;
      if (c.type === "product") {
        const cAny = c;
        if (cAny.sku_ids && cAny.sku_ids.length > 0) {
          const hasCommonSku = props.skuIds.some((sid) => cAny.sku_ids.includes(sid));
          if (!hasCommonSku) return false;
        } else if (cAny.product_ids && cAny.product_ids.length > 0) {
          const hasCommonProduct = props.productIds.some((pid) => cAny.product_ids?.includes(pid));
          if (!hasCommonProduct) return false;
        }
      }
      return true;
    };
    const getInapplicableReason = (coupon) => {
      if (props.orderAmount < coupon.coupon.min_usage) {
        return `还差 ¥${(coupon.coupon.min_usage - props.orderAmount).toFixed(2)}`;
      }
      if (coupon.coupon.type === "product") {
        return "该商品不可用";
      }
      return "不可用";
    };
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
          _push2(`<div class="sheet-mask" data-v-952a247a><div class="sheet-panel-glass" data-v-952a247a><div class="sheet-header" data-v-952a247a><div class="title" data-v-952a247a>选择优惠券</div><div class="close-btn" data-v-952a247a>`);
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
          _push2(`</div></div><div class="sheet-sub-header" data-v-952a247a><div class="header-tip" data-v-952a247a>`);
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
          _push2(` 仅显示当前订单可用的优惠券 </div><div class="refresh-btn" data-v-952a247a>`);
          _push2(ssrRenderComponent(_component_el_icon, {
            class: { spinning: listLoading.value }
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
          _push2(`</div></div><div class="sheet-body" data-v-952a247a>`);
          if (listLoading.value) {
            _push2(`<div class="loading-state" data-v-952a247a>`);
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
            _push2(`<span data-v-952a247a>加载中...</span></div>`);
          } else if (coupons.value.length === 0) {
            _push2(`<div class="empty-state" data-v-952a247a>`);
            _push2(ssrRenderComponent(_component_el_empty, {
              description: "暂无可用优惠券",
              "image-size": 80
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<div class="coupon-list" data-v-952a247a><div class="${ssrRenderClass([{ active: tempSelected.value === null }, "no-coupon-item glass-card"])}" data-v-952a247a><div class="label" data-v-952a247a>不使用优惠券</div><div class="radio-check" data-v-952a247a></div></div><!--[-->`);
            ssrRenderList(sortedCoupons.value, (coupon) => {
              _push2(`<div class="${ssrRenderClass([{ disabled: !isApplicable(coupon) }, "coupon-wrapper"])}" data-v-952a247a>`);
              _push2(ssrRenderComponent(MobileCouponTicket, {
                type: coupon.coupon.type,
                value: coupon.coupon.value,
                title: coupon.coupon.name,
                expiryText: formatDate(coupon.coupon.end_date),
                status: "unused",
                disabled: !isApplicable(coupon)
              }, null, _parent));
              _push2(`<div class="selection-overlay" data-v-952a247a><div class="${ssrRenderClass([{ checked: tempSelected.value?.id === coupon.id }, "radio-check"])}" data-v-952a247a></div></div>`);
              if (!isApplicable(coupon)) {
                _push2(`<div class="inapplicable-reason" data-v-952a247a>${ssrInterpolate(getInapplicableReason(coupon))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div><div class="sheet-footer" data-v-952a247a><button class="submit-btn-glow" data-v-952a247a> 确认使用 </button></div></div></div>`);
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
const MobileCouponSelectorSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-952a247a"]]);
export {
  MobileCouponSelectorSheet as default
};
//# sourceMappingURL=MobileCouponSelectorSheet-Ds6bBvJq.js.map
