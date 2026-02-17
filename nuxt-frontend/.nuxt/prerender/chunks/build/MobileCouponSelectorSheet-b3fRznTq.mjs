import { E as ElIcon } from './index-C4aUwruK.mjs';
import { E as ElEmpty } from './index-bbvp9z3V.mjs';
import { defineComponent, computed, ref, toRef, watch, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { b as close_default, i as info_filled_default, U as refresh_default, l as loading_default } from './index-CCIZH4aC.mjs';
import { M as MobileCouponTicket } from './MobileCouponTicket-CKmGRj2b.mjs';
import { u as useCouponList } from './useCouponList-CqWCtWwI.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './index-C1njJNPQ.mjs';
import './coupon-CAcMEk5R.mjs';
import './supabase-Ds8OQlZJ.mjs';
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
      if (!dateStr) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(dateStr);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_empty = ElEmpty;
      ssrRenderTeleport(_push, (_push2) => {
        if (visible.value) {
          _push2(`<div class="sheet-mask" data-v-fc5c9d4a><div class="sheet-panel-glass aurora-sheet-panel" data-v-fc5c9d4a><div class="sheet-header" data-v-fc5c9d4a><div class="title" data-v-fc5c9d4a>\u9009\u62E9\u4F18\u60E0\u5238</div><div class="close-btn" data-v-fc5c9d4a>`);
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
          _push2(` \u4EC5\u663E\u793A\u5F53\u524D\u8BA2\u5355\u53EF\u7528\u7684\u4F18\u60E0\u5238 </div><div class="refresh-btn" data-v-fc5c9d4a>`);
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
            _push2(`<span data-v-fc5c9d4a>\u52A0\u8F7D\u4E2D...</span></div>`);
          } else if (unref(coupons).length === 0) {
            _push2(`<div class="empty-state" data-v-fc5c9d4a>`);
            _push2(ssrRenderComponent(_component_el_empty, {
              description: "\u6682\u65E0\u53EF\u7528\u4F18\u60E0\u5238",
              "image-size": 80
            }, null, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<div class="coupon-list" data-v-fc5c9d4a><div class="${ssrRenderClass([{ active: tempSelected.value === null }, "no-coupon-item glass-card"])}" data-v-fc5c9d4a><div class="label" data-v-fc5c9d4a>\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238</div><div class="radio-check" data-v-fc5c9d4a></div></div><!--[-->`);
            ssrRenderList(unref(sortedCoupons), (coupon) => {
              var _a;
              _push2(`<div class="${ssrRenderClass([{ disabled: !unref(isApplicable)(coupon) }, "coupon-wrapper"])}" data-v-fc5c9d4a>`);
              _push2(ssrRenderComponent(MobileCouponTicket, {
                type: coupon.coupon.type,
                value: coupon.coupon.value,
                title: coupon.coupon.name,
                expiryText: formatDate(coupon.coupon.end_date),
                status: "unused",
                disabled: !unref(isApplicable)(coupon)
              }, null, _parent));
              _push2(`<div class="selection-overlay" data-v-fc5c9d4a><div class="${ssrRenderClass([{ checked: ((_a = tempSelected.value) == null ? void 0 : _a.id) === coupon.id }, "radio-check"])}" data-v-fc5c9d4a></div></div>`);
              if (!unref(isApplicable)(coupon)) {
                _push2(`<div class="inapplicable-reason" data-v-fc5c9d4a>${ssrInterpolate(unref(getInapplicableReason)(coupon))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div><div class="sheet-footer" data-v-fc5c9d4a><button class="submit-btn-glow" data-v-fc5c9d4a> \u786E\u8BA4\u4F7F\u7528 </button></div></div></div>`);
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

export { MobileCouponSelectorSheet as default };
//# sourceMappingURL=MobileCouponSelectorSheet-b3fRznTq.mjs.map
