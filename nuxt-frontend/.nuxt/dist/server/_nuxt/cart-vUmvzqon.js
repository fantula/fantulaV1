import { E as ElIcon } from "./index-CsSUb8pm.js";
/* empty css              */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { ag as shopping_cart_default, M as check_default, J as minus_default, p as plus_default } from "./index-DuV_oMrC.js";
import { useCartStore } from "./cart-B8xez9id.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "./useToast-DsT-1f4c.js";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-iRi1Uk9z.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./common-D9iMPQj0.js";
import "./supabase-jxF0-7J3.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const cartStore = useCartStore();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-bede8c5a>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "购物车" }, {
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="edit-btn" data-v-bede8c5a${_scopeId}>${ssrInterpolate(isEditMode.value ? "完成" : "编辑")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: "edit-btn",
                onClick: ($event) => isEditMode.value = !isEditMode.value
              }, toDisplayString(isEditMode.value ? "完成" : "编辑"), 9, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="cart-body" data-v-bede8c5a>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-bede8c5a><div class="spinner-premium" data-v-bede8c5a></div></div>`);
      } else if (unref(cartStore).items.length === 0) {
        _push(`<div class="empty-state" data-v-bede8c5a><div class="empty-icon-box" data-v-bede8c5a>`);
        _push(ssrRenderComponent(unref(shopping_cart_default), { class: "e-icon" }, null, _parent));
        _push(`</div><p data-v-bede8c5a>购物车空空如也</p><button class="btn-go" data-v-bede8c5a>去逛逛</button></div>`);
      } else {
        _push(`<div class="cart-list" data-v-bede8c5a><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="${ssrRenderClass([{ active: selectedIds.value.has(item.id) }, "cart-card"])}" data-v-bede8c5a><div class="checkbox-area" data-v-bede8c5a><div class="${ssrRenderClass([{ checked: selectedIds.value.has(item.id) }, "custom-checkbox"])}" data-v-bede8c5a>`);
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
          _push(`</div></div><div class="card-thumb" data-v-bede8c5a><img${ssrRenderAttr("src", item.productImage)} loading="lazy" decoding="async" data-v-bede8c5a></div><div class="card-info" data-v-bede8c5a><div class="ci-top" data-v-bede8c5a><div class="ci-title" data-v-bede8c5a>${ssrInterpolate(item.productName)}</div><div class="ci-sku" data-v-bede8c5a>${ssrInterpolate(item.specName || "默认规格")}</div></div><div class="ci-bottom" data-v-bede8c5a><div class="ci-price" data-v-bede8c5a>¥<span class="price-val" data-v-bede8c5a>${ssrInterpolate(item.price)}</span></div><div class="stepper" data-v-bede8c5a><div class="${ssrRenderClass([{ disabled: item.quantity <= 1 }, "step-btn minus"])}" data-v-bede8c5a>`);
          _push(ssrRenderComponent(unref(minus_default), null, null, _parent));
          _push(`</div><div class="step-num" data-v-bede8c5a>${ssrInterpolate(item.quantity)}</div><div class="step-btn plus" data-v-bede8c5a>`);
          _push(ssrRenderComponent(unref(plus_default), null, null, _parent));
          _push(`</div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (unref(cartStore).items.length > 0) {
        _push(`<div class="cart-footer" data-v-bede8c5a><div class="footer-left" data-v-bede8c5a><div class="${ssrRenderClass([{ checked: isAllSelected.value }, "custom-checkbox"])}" data-v-bede8c5a>`);
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
        _push(`</div><span class="sel-text" data-v-bede8c5a>全选</span></div>`);
        if (!isEditMode.value) {
          _push(`<div class="footer-right" data-v-bede8c5a><div class="total-box" data-v-bede8c5a><span class="t-label" data-v-bede8c5a>合计:</span><span class="t-price" data-v-bede8c5a>¥${ssrInterpolate(totalPrice.value)}</span></div><button class="btn-checkout"${ssrIncludeBooleanAttr(selectedIds.value.size === 0) ? " disabled" : ""} data-v-bede8c5a> 去结算(${ssrInterpolate(totalCount.value)}) </button></div>`);
        } else {
          _push(`<div class="footer-right" data-v-bede8c5a><button class="btn-delete"${ssrIncludeBooleanAttr(selectedIds.value.size === 0) ? " disabled" : ""} data-v-bede8c5a> 删除 </button></div>`);
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
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bede8c5a"]]);
export {
  cart as default
};
//# sourceMappingURL=cart-vUmvzqon.js.map
