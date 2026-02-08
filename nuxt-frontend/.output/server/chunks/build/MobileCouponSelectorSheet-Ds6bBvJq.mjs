import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { E as ElEmpty } from './index-DHhizeNf.mjs';
import { defineComponent, computed, ref, watch, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { j as close_default, i as info_filled_default, r as refresh_default, l as loading_default } from './index-DlETah8a.mjs';
import { c as couponApi } from './coupon-D1so52Ot.mjs';
import { M as MobileCouponTicket } from './MobileCouponTicket-CKmGRj2b.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './index-K5TIzHX_.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

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
          const hasCommonProduct = props.productIds.some((pid) => {
            var _a;
            return (_a = cAny.product_ids) == null ? void 0 : _a.includes(pid);
          });
          if (!hasCommonProduct) return false;
        }
      }
      return true;
    };
    const getInapplicableReason = (coupon) => {
      if (props.orderAmount < coupon.coupon.min_usage) {
        return `\u8FD8\u5DEE \xA5${(coupon.coupon.min_usage - props.orderAmount).toFixed(2)}`;
      }
      if (coupon.coupon.type === "product") {
        return "\u8BE5\u5546\u54C1\u4E0D\u53EF\u7528";
      }
      return "\u4E0D\u53EF\u7528";
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(dateStr);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_empty = ElEmpty;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="sheet-mask" data-v-952a247a><div class="sheet-panel-glass" data-v-952a247a><div class="sheet-header" data-v-952a247a><div class="title" data-v-952a247a>\u9009\u62E9\u4F18\u60E0\u5238</div><div class="close-btn" data-v-952a247a>`);
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
          _push2(` \u4EC5\u663E\u793A\u5F53\u524D\u8BA2\u5355\u53EF\u7528\u7684\u4F18\u60E0\u5238 </div><div class="refresh-btn" data-v-952a247a>`);
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
            _push2(`<span data-v-952a247a>\u52A0\u8F7D\u4E2D...</span></div>`);
          } else if (coupons.value.length === 0) {
            _push2(`<div class="empty-state" data-v-952a247a>`);
            _push2(ssrRenderComponent(_component_el_empty, {
              description: "\u6682\u65E0\u53EF\u7528\u4F18\u60E0\u5238",
              "image-size": 80
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<div class="coupon-list" data-v-952a247a><div class="${ssrRenderClass([{ active: tempSelected.value === null }, "no-coupon-item glass-card"])}" data-v-952a247a><div class="label" data-v-952a247a>\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238</div><div class="radio-check" data-v-952a247a></div></div><!--[-->`);
            ssrRenderList(sortedCoupons.value, (coupon) => {
              var _a;
              _push2(`<div class="${ssrRenderClass([{ disabled: !isApplicable(coupon) }, "coupon-wrapper"])}" data-v-952a247a>`);
              _push2(ssrRenderComponent(MobileCouponTicket, {
                type: coupon.coupon.type,
                value: coupon.coupon.value,
                title: coupon.coupon.name,
                expiryText: formatDate(coupon.coupon.end_date),
                status: "unused",
                disabled: !isApplicable(coupon)
              }, null, _parent));
              _push2(`<div class="selection-overlay" data-v-952a247a><div class="${ssrRenderClass([{ checked: ((_a = tempSelected.value) == null ? void 0 : _a.id) === coupon.id }, "radio-check"])}" data-v-952a247a></div></div>`);
              if (!isApplicable(coupon)) {
                _push2(`<div class="inapplicable-reason" data-v-952a247a>${ssrInterpolate(getInapplicableReason(coupon))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div><div class="sheet-footer" data-v-952a247a><button class="submit-btn-glow" data-v-952a247a> \u786E\u8BA4\u4F7F\u7528 </button></div></div></div>`);
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

export { MobileCouponSelectorSheet as default };
//# sourceMappingURL=MobileCouponSelectorSheet-Ds6bBvJq.mjs.map
