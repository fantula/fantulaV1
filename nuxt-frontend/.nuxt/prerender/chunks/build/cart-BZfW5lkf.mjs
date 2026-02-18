import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { $ as shopping_cart_default, R as check_default, ae as minus_default, p as plus_default } from './index-DNnPa_Q9.mjs';
import { useCartStore } from './cart-CDhPH3qi.mjs';
import { u as useNotify } from './useNotify-QNEBBzdZ.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-4aDAI7XP.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './common-Bgv_wRgd.mjs';
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
import './useToast-DsT-1f4c.mjs';
import './index-BwQVtIp5.mjs';
import './typescript-D6L75muK.mjs';
import './icon-Ck0_dGQP.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './index-DbvZsXcZ.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const cartStore = useCartStore();
    useNotify();
    const loading = ref(false);
    const isEditMode = ref(false);
    const selectedIds = ref(/* @__PURE__ */ new Set());
    const isAllSelected = computed(() => {
      return cartStore.items.length > 0 && selectedIds.value.size === cartStore.items.length;
    });
    const selectedItems = computed(() => {
      return cartStore.items.filter((item) => selectedIds.value.has(item.id));
    });
    const totalPrice = computed(() => {
      return selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    });
    const totalCount = computed(() => {
      return selectedItems.value.reduce((sum, item) => sum + item.quantity, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-5b83e772>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u8D2D\u7269\u8F66" }, {
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="edit-btn" data-v-5b83e772${_scopeId}>${ssrInterpolate(isEditMode.value ? "\u5B8C\u6210" : "\u7F16\u8F91")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: "edit-btn",
                onClick: ($event) => isEditMode.value = !isEditMode.value
              }, toDisplayString(isEditMode.value ? "\u5B8C\u6210" : "\u7F16\u8F91"), 9, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="cart-body" data-v-5b83e772>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-5b83e772><div class="spinner-premium" data-v-5b83e772></div></div>`);
      } else if (unref(cartStore).items.length === 0) {
        _push(`<div class="empty-state" data-v-5b83e772><div class="empty-icon-box" data-v-5b83e772>`);
        _push(ssrRenderComponent(unref(shopping_cart_default), { class: "e-icon" }, null, _parent));
        _push(`</div><p data-v-5b83e772>\u8D2D\u7269\u8F66\u7A7A\u7A7A\u5982\u4E5F</p><button class="btn-go" data-v-5b83e772>\u53BB\u901B\u901B</button></div>`);
      } else {
        _push(`<div class="cart-list" data-v-5b83e772><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="${ssrRenderClass([{ active: selectedIds.value.has(item.id) }, "cart-card"])}" data-v-5b83e772><div class="checkbox-area" data-v-5b83e772><div class="${ssrRenderClass([{ checked: selectedIds.value.has(item.id) }, "custom-checkbox"])}" data-v-5b83e772>`);
          if (selectedIds.value.has(item.id)) {
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(check_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(check_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="card-thumb" data-v-5b83e772><img${ssrRenderAttr("src", item.productImage)} loading="lazy" decoding="async" data-v-5b83e772></div><div class="card-info" data-v-5b83e772><div class="ci-top" data-v-5b83e772><div class="ci-title" data-v-5b83e772>${ssrInterpolate(item.productName)}</div><div class="ci-sku" data-v-5b83e772>${ssrInterpolate(item.specName || "\u9ED8\u8BA4\u89C4\u683C")}</div></div><div class="ci-bottom" data-v-5b83e772><div class="ci-price" data-v-5b83e772>\xA5<span class="price-val" data-v-5b83e772>${ssrInterpolate(item.price)}</span></div><div class="stepper" data-v-5b83e772><div class="${ssrRenderClass([{ disabled: item.quantity <= 1 }, "step-btn minus"])}" data-v-5b83e772>`);
          _push(ssrRenderComponent(unref(minus_default), null, null, _parent));
          _push(`</div><div class="step-num" data-v-5b83e772>${ssrInterpolate(item.quantity)}</div><div class="step-btn plus" data-v-5b83e772>`);
          _push(ssrRenderComponent(unref(plus_default), null, null, _parent));
          _push(`</div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (unref(cartStore).items.length > 0) {
        _push(`<div class="cart-footer" data-v-5b83e772><div class="footer-left" data-v-5b83e772><div class="${ssrRenderClass([{ checked: isAllSelected.value }, "custom-checkbox"])}" data-v-5b83e772>`);
        if (isAllSelected.value) {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(check_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(check_default))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="sel-text" data-v-5b83e772>\u5168\u9009</span></div>`);
        if (!isEditMode.value) {
          _push(`<div class="footer-right" data-v-5b83e772><div class="total-box" data-v-5b83e772><span class="t-label" data-v-5b83e772>\u5408\u8BA1:</span><span class="t-price" data-v-5b83e772>\xA5${ssrInterpolate(totalPrice.value)}</span></div><button class="btn-checkout"${ssrIncludeBooleanAttr(selectedIds.value.size === 0) ? " disabled" : ""} data-v-5b83e772> \u53BB\u7ED3\u7B97(${ssrInterpolate(totalCount.value)}) </button></div>`);
        } else {
          _push(`<div class="footer-right" data-v-5b83e772><button class="btn-delete"${ssrIncludeBooleanAttr(selectedIds.value.size === 0) ? " disabled" : ""} data-v-5b83e772> \u5220\u9664 </button></div>`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5b83e772"]]);

export { cart as default };
//# sourceMappingURL=cart-BZfW5lkf.mjs.map
