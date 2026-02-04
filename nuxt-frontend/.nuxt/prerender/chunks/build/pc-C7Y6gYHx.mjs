import { _ as _export_sfc, y as __nuxt_component_0$2, I as useState, u as useRouter$1 } from './server.mjs';
import { defineComponent, mergeProps, ref, watch, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, toDisplayString, resolveDynamicComponent, computed, nextTick, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DErVm1dK.mjs';
import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useModalStore } from './modal-HUsR3oCs.mjs';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { u as useCartStore } from './cart-D8FaBhjU.mjs';
import { _ as __nuxt_component_2$1 } from './LoginRegisterModal-Qu_Lr8ij.mjs';
import { ae as shopping_cart_default, af as star_filled_default, W as star_default, a7 as chat_dot_round_default, aP as platform_default, X as bell_default, av as video_play_default, d as delete_default, L as search_default, l as loading_default, h as circle_check_filled_default, ag as right_default, w as warning_filled_default } from './index-CmsdIFY8.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { B as BaseModal } from './BaseModal-HTOTXfQj.mjs';
import { _ as _imports_1 } from './virtual_public-FTeKDcap.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
import { C as ContactModal } from './ContactModal-BLWDvuWe.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'node:crypto';
import 'node:url';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './install-VBSKbHUK.mjs';
import './objects-Bz74KHmq.mjs';
import './auth-BCuS92ob.mjs';
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import './SendCodeButton-Bt2-2zIY.mjs';
import './BaseButton-B3srPw2H.mjs';
import './interval-BHZX8LlC.mjs';
import './typescript-D6L75muK.mjs';
import './icon-eqoLCvNY.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './index-CO6H4Lsj.mjs';
import './event-D3FEo2C5.mjs';

const _imports_0 = publicAssetsURL("/images/shared/logo_v3.png");
const weixinIcon1 = "/images/client/pc/kefuweixin1.png";
const weixinIcon2 = "/images/client/pc/kefuweixin2.png";
const dingdingIcon1 = "/images/client/pc/kefudingding1.png";
const dingdingIcon2 = "/images/client/pc/kefudingding2.png";
const phoneIcon = "/images/client/pc/kefudianhua.png";
const contactIcon = "/images/client/pc/kefulianxi.png";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ServiceModal",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-modal-mask" }, _attrs))} data-v-1b643592><div class="service-modal" data-v-1b643592><div class="modal-gradient-top" data-v-1b643592><div class="modal-header" data-v-1b643592><span class="modal-title" data-v-1b643592>\u8054\u7CFB\u5BA2\u670D</span><button class="modal-close" data-v-1b643592>\xD7</button></div><div class="modal-desc" data-v-1b643592>\u6211\u4EEC\u63D0\u4F9B\u591A\u79CD\u4FBF\u6377\u7684\u5BA2\u670D\u6E20\u9053\uFF0C7\xD724\u5C0F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u4E13\u4E1A\u670D\u52A1\u3002\u626B\u7801\u6DFB\u52A0\u5BA2\u670D\uFF0C\u83B7\u53D6\u5373\u65F6\u5E2E\u52A9\u3002</div></div><div class="modal-main-white" data-v-1b643592><div class="modal-row" data-v-1b643592><div class="modal-card" data-v-1b643592><div class="card-top-row" data-v-1b643592><div class="card-avatar wechat" data-v-1b643592><img${ssrRenderAttr("src", weixinIcon1)} alt="\u5FAE\u4FE1\u5BA2\u670D\u56FE\u6807" data-v-1b643592></div><div class="card-title" data-v-1b643592>\u5FAE\u4FE1\u5BA2\u670D</div></div><div class="card-icon-box" data-v-1b643592><img${ssrRenderAttr("src", weixinIcon2)} class="card-icon-img" alt="\u5FAE\u4FE1\u4E8C\u7EF4\u7801" data-v-1b643592></div><div class="card-desc" data-v-1b643592>\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\u6DFB\u52A0\u5BA2\u670D<br data-v-1b643592>\u6216\u641C\u7D22\u5FAE\u4FE1\u53F7\uFF1A<span class="account-code" data-v-1b643592>kefu_wechat123</span></div></div><div class="modal-card" data-v-1b643592><div class="card-top-row" data-v-1b643592><div class="card-avatar dingtalk" data-v-1b643592><img${ssrRenderAttr("src", dingdingIcon1)} alt="\u9489\u9489\u5BA2\u670D\u56FE\u6807" data-v-1b643592></div><div class="card-title" data-v-1b643592>\u9489\u9489\u5BA2\u670D</div></div><div class="card-icon-box" data-v-1b643592><img${ssrRenderAttr("src", dingdingIcon2)} class="card-icon-img" alt="\u9489\u9489\u4E8C\u7EF4\u7801" data-v-1b643592></div><div class="card-desc" data-v-1b643592>\u4F7F\u7528\u9489\u9489\u626B\u63CF\u4E8C\u7EF4\u7801\u6DFB\u52A0\u5BA2\u670D<br data-v-1b643592>\u6216\u641C\u7D22ID\uFF1A<span class="account-code" data-v-1b643592>kefu_dingtalk456</span></div></div></div><div class="modal-row phone-row" data-v-1b643592><div class="modal-card phone" data-v-1b643592><div class="phone-header" data-v-1b643592><div class="modal-card-icon phone" data-v-1b643592><img${ssrRenderAttr("src", phoneIcon)} alt="\u7535\u8BDD\u5BA2\u670D\u56FE\u6807" data-v-1b643592></div><div class="modal-card-title phone" data-v-1b643592>\u7535\u8BDD\u5BA2\u670D</div></div><div class="modal-phone-number" data-v-1b643592>400-888-9999</div><div class="modal-phone-desc" data-v-1b643592>\u670D\u52A1\u65F6\u95F4\uFF1A\u5168\u592924\u5C0F\u65F6<br data-v-1b643592>\u62E8\u6253\u5BA2\u670D\u70ED\u7EBF\u83B7\u53D6\u5373\u65F6\u652F\u6301<br data-v-1b643592>\u6216\u53D1\u9001\u90AE\u4EF6\u81F3 <span class="email-support" data-v-1b643592>support@company.com</span></div></div></div><button class="modal-action" data-v-1b643592><img${ssrRenderAttr("src", contactIcon)} alt="\u8054\u7CFB\u5BA2\u670D\u56FE\u6807" class="action-icon" data-v-1b643592> \u8054\u7CFB\u5728\u7EBF\u5BA2\u670D </button></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ServiceModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ServiceModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-1b643592"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ChannelRecognitionModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    getSupabaseClient();
    useRouter$1();
    const inputRef = ref(null);
    const state = ref("input");
    const loading = ref(false);
    const channelInput = ref("@");
    const resultKey = ref("");
    const boundProductId = ref(null);
    watch(() => props.modelValue, (val) => {
      if (val) {
        nextTick(() => {
          var _a;
          reset();
          (_a = inputRef.value) == null ? void 0 : _a.focus();
        });
      }
    });
    const isValidInput = computed(() => {
      return /^@[a-z0-9_]+$/.test(channelInput.value);
    });
    const reset = () => {
      state.value = "input";
      channelInput.value = "@";
      resultKey.value = "";
      boundProductId.value = null;
      nextTick(() => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.focus();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.modelValue) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-6d9313dd><div class="channel-modal" data-v-6d9313dd><button class="modal-close" data-v-6d9313dd>\xD7</button><div class="modal-header" data-v-6d9313dd><div class="header-icon" data-v-6d9313dd>`);
        _push(ssrRenderComponent(_component_el_icon, {
          size: 32,
          color: "#fff"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(search_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(search_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><h2 class="modal-title" data-v-6d9313dd>\u9891\u9053\u8BC6\u522B</h2><p class="modal-subtitle" data-v-6d9313dd>\u8BF7\u8F93\u5165\u9891\u9053\u6807\u8BC6\u4EE5\u8FDE\u63A5\u4E13\u5C5E\u5546\u54C1</p></div><div class="modal-body" data-v-6d9313dd>`);
        if (state.value === "input") {
          _push(`<div class="input-section" data-v-6d9313dd><div class="input-group" data-v-6d9313dd><input${ssrRenderAttr("value", channelInput.value)} type="text" class="glass-input" placeholder="@channel_name" spellcheck="false" data-v-6d9313dd>`);
          if (loading.value) {
            _push(`<div class="input-loader" data-v-6d9313dd>`);
            _push(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
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
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="primary-btn"${ssrIncludeBooleanAttr(loading.value || !unref(isValidInput)) ? " disabled" : ""} data-v-6d9313dd>${ssrInterpolate(loading.value ? "\u8BC6\u522B\u4E2D..." : "\u7ACB\u5373\u8BC6\u522B")}</button></div>`);
        } else if (state.value === "bound") {
          _push(`<div class="result-section" data-v-6d9313dd><div class="status-icon success" data-v-6d9313dd>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><h3 class="result-key" data-v-6d9313dd>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-6d9313dd>\u5DF2\u6210\u529F\u8BC6\u522B\u9891\u9053</p><div class="action-buttons" data-v-6d9313dd><button class="primary-btn success" data-v-6d9313dd> \u524D\u5F80\u8D2D\u4E70 `);
          _push(ssrRenderComponent(_component_el_icon, { class: "el-icon--right" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(right_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(right_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</button><button class="text-btn" data-v-6d9313dd>\u91CD\u65B0\u8F93\u5165</button></div></div>`);
        } else if (state.value === "pending") {
          _push(`<div class="result-section" data-v-6d9313dd><div class="status-icon warning" data-v-6d9313dd>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><h3 class="result-key" data-v-6d9313dd>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-6d9313dd>\u9891\u9053\u5C1A\u672A\u7ED1\u5B9A\u5546\u54C1</p><p class="result-sub-msg" data-v-6d9313dd>\u5DF2\u8BB0\u5F55\u8BF7\u6C42\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u6216\u8054\u7CFB\u5BA2\u670D</p><div class="action-buttons" data-v-6d9313dd><button class="text-btn" data-v-6d9313dd>\u8FD4\u56DE</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ChannelRecognitionModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ChannelRecognitionModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-6d9313dd"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MiniCartPopup",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const cartStore = useCartStore();
    const updating = ref(false);
    const checkingOut = ref(false);
    const cartItem = computed(() => {
      if (cartStore.items && cartStore.items.length > 0) {
        return cartStore.items[0];
      }
      return null;
    });
    const hasItems = computed(() => !!cartItem.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mini-cart-popup" }, _attrs))} data-v-87609fb2><div class="mini-cart-arrow" data-v-87609fb2></div><div class="mc-header" data-v-87609fb2><span class="mc-title" data-v-87609fb2>\u8D2D\u7269\u8F66</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" title="\u6E05\u7A7A\u8D2D\u7269\u8F66" data-v-87609fb2>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(delete_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<span data-v-87609fb2>\u6E05\u7A7A</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-87609fb2>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-87609fb2><div class="mc-img-wrap" data-v-87609fb2><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} alt="Product" data-v-87609fb2></div><div class="mc-details" data-v-87609fb2><div class="mc-name" data-v-87609fb2>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-spec" data-v-87609fb2>${ssrInterpolate(cartItem.value.specName)}</div><div class="mc-price-row" data-v-87609fb2><span class="mc-price" data-v-87609fb2>\xA5${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-87609fb2><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-87609fb2>-</button><span class="qty-num" data-v-87609fb2>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-87609fb2>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-87609fb2>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-87609fb2><div class="empty-icon" data-v-87609fb2>\u{1F6D2}</div><p data-v-87609fb2>\u8D2D\u7269\u8F66\u7A7A\u7A7A\u5982\u4E5F</p><button class="mc-btn secondary small" data-v-87609fb2>\u53BB\u901B\u901B</button></div>`);
        }
        _push(`</div>`);
        if (hasItems.value) {
          _push(`<div class="mc-footer" data-v-87609fb2><button class="mc-btn primary block"${ssrIncludeBooleanAttr(checkingOut.value) ? " disabled" : ""} data-v-87609fb2>${ssrInterpolate(checkingOut.value ? "\u5904\u7406\u4E2D..." : "\u53BB\u7ED3\u7B97")}</button></div>`);
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/cart/MiniCartPopup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const MiniCartPopup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-87609fb2"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isPageFavorited = useState("is-current-page-favorited", () => false);
    const modal = useModalStore();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    useRoute();
    const showServiceModal = ref(false);
    const showChannelModal = ref(false);
    const showLoginModal = ref(false);
    const closeLoginModal = () => {
      showLoginModal.value = false;
    };
    watch(() => userStore.isLoggedIn, (newValue) => {
      if (newValue && showLoginModal.value) {
        showLoginModal.value = false;
      }
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><header class="app-header" data-v-00086e9a><div class="header-inner" data-v-00086e9a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-area"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="logo" class="logo-img" data-v-00086e9a${_scopeId}><span class="logo-text" data-v-00086e9a${_scopeId}>\u51E1\u56FE\u62C9</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "logo",
                class: "logo-img"
              }),
              createVNode("span", { class: "logo-text" }, "\u51E1\u56FE\u62C9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav-menu" data-v-00086e9a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-btn" data-v-00086e9a>\u9891\u9053\u8BC6\u522B</button><button class="nav-btn" data-v-00086e9a>\u8BA2\u5355</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/faq",
        class: "nav-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u5E38\u89C1\u95EE\u9898`);
          } else {
            return [
              createTextVNode("\u5E38\u89C1\u95EE\u9898")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-btn" data-v-00086e9a>\u8054\u7CFB\u56FE\u62C9</button></nav><div class="header-actions" data-v-00086e9a>`);
      if (!unref(userStore).isLoggedIn) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "#",
          class: "login-btn",
          onClick: ($event) => unref(modal).openLogin()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u767B\u5F55/\u6CE8\u518C `);
            } else {
              return [
                createTextVNode(" \u767B\u5F55/\u6CE8\u518C ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="user-section" data-v-00086e9a><div class="cart-wrapper" style="${ssrRenderStyle({ "position": "relative" })}" data-v-00086e9a><div class="cart-icon" title="\u8D2D\u7269\u8F66" id="cart-icon-ref" data-v-00086e9a><div class="cart-icon-wrapper" data-v-00086e9a>`);
        _push(ssrRenderComponent(_component_el_icon, {
          size: 26,
          color: "#E2E8F0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(shopping_cart_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(shopping_cart_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(cartStore).totalCount > 0) {
          _push(`<span class="cart-badge" data-v-00086e9a>${ssrInterpolate(unref(cartStore).totalCount)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        _push(ssrRenderComponent(MiniCartPopup, {
          visible: unref(cartStore).miniCartVisible,
          onClose: ($event) => unref(cartStore).miniCartVisible = false,
          class: "header-mini-cart"
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([{ "is-active": unref(isPageFavorited) }, "favorites-wrapper"])}" id="favorites-icon-ref" title="\u6211\u7684\u6536\u85CF" data-v-00086e9a>`);
        _push(ssrRenderComponent(_component_el_icon, {
          size: 24,
          class: "fav-icon"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(isPageFavorited)) {
                _push2(ssrRenderComponent(unref(star_filled_default), null, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(star_default), null, null, _parent2, _scopeId));
              }
            } else {
              return [
                unref(isPageFavorited) ? (openBlock(), createBlock(unref(star_filled_default), { key: 0 })) : (openBlock(), createBlock(unref(star_default), { key: 1 }))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="user-info-container" data-v-00086e9a>`);
        if (unref(userStore).loading) {
          _push(`<div class="user-info user-info--loading" data-v-00086e9a><div class="avatar-skeleton" data-v-00086e9a></div><div class="name-skeleton" data-v-00086e9a></div></div>`);
        } else {
          _push(`<div class="user-info" title="\u8FDB\u5165\u4E2A\u4EBA\u4E2D\u5FC3" data-v-00086e9a><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || "/images/client/pc/avatars/avatar-cat.png")}${ssrRenderAttr("alt", ((_b = unref(userStore).user) == null ? void 0 : _b.nickName) || ((_c = unref(userStore).user) == null ? void 0 : _c.nickname) || "\u7528\u6237\u5934\u50CF")} class="user-avatar" data-v-00086e9a><span class="user-name" data-v-00086e9a>${ssrInterpolate(((_d = unref(userStore).user) == null ? void 0 : _d.nickName) || ((_e = unref(userStore).user) == null ? void 0 : _e.nickname) || "\u7528\u6237")}</span></div>`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div></header>`);
      if (showServiceModal.value) {
        _push(ssrRenderComponent(ServiceModal, {
          onClose: ($event) => showServiceModal.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ChannelRecognitionModal, {
        modelValue: showChannelModal.value,
        "onUpdate:modelValue": ($event) => showChannelModal.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(__nuxt_component_2$1, {
        visible: showLoginModal.value,
        onClose: closeLoginModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/AppHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-00086e9a"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "JoinUsModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props) {
    function copyWechatId() {
      const wechatId = "Companyservice";
      if ((void 0).clipboard) {
        (void 0).clipboard.writeText(wechatId).then(() => {
          ElMessage.success("\u5FAE\u4FE1\u53F7\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F");
        }).catch(() => {
          fallbackCopy(wechatId);
        });
      } else {
        fallbackCopy(wechatId);
      }
    }
    function fallbackCopy(text) {
      const textArea = (void 0).createElement("textarea");
      textArea.value = text;
      (void 0).body.appendChild(textArea);
      textArea.select();
      try {
        (void 0).execCommand("copy");
        ElMessage.success("\u5FAE\u4FE1\u53F7\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F");
      } catch (err) {
        ElMessage.error("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u5FAE\u4FE1\u53F7\uFF1A" + text);
      }
      (void 0).body.removeChild(textArea);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      if (__props.visible) {
        _push(ssrRenderComponent(_component_BaseModal, mergeProps({
          visible: __props.visible,
          title: "\u52A0\u5165\u6211\u4EEC\u7684\u793E\u7FA4",
          width: "520px",
          "show-footer": false,
          onClose: ($event) => _ctx.$emit("close")
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="modal-subtitle" data-v-cf5b7540${_scopeId}>\u626B\u7801\u6DFB\u52A0\u5BA2\u670D\u5FAE\u4FE1\uFF0C\u83B7\u53D6\u4E13\u5C5E\u670D\u52A1</p><div class="wechat-content" data-v-cf5b7540${_scopeId}><div class="qr-container" data-v-cf5b7540${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="\u5FAE\u4FE1\u4E8C\u7EF4\u7801" class="qr-code" data-v-cf5b7540${_scopeId}></div><div class="wechat-info" data-v-cf5b7540${_scopeId}><div class="wechat-id" data-v-cf5b7540${_scopeId}><span class="wechat-label" data-v-cf5b7540${_scopeId}>\u5BA2\u670D\u5FAE\u4FE1\uFF1A</span><span class="wechat-value" data-v-cf5b7540${_scopeId}>Companyservice</span></div><button class="copy-btn" data-v-cf5b7540${_scopeId}>\u{1F4CB} \u590D\u5236\u5FAE\u4FE1\u53F7</button></div><div class="steps-section" data-v-cf5b7540${_scopeId}><div class="steps-title" data-v-cf5b7540${_scopeId}>\u6DFB\u52A0\u5BA2\u670D\u6B65\u9AA4</div><div class="steps-container" data-v-cf5b7540${_scopeId}><div class="step-item" data-v-cf5b7540${_scopeId}><div class="step-number" data-v-cf5b7540${_scopeId}>1</div><div class="step-text" data-v-cf5b7540${_scopeId}>\u4E0B\u8F7D\u4E8C\u7EF4\u7801\u56FE\u7247\u5230\u7535\u8111</div></div><div class="step-item" data-v-cf5b7540${_scopeId}><div class="step-number" data-v-cf5b7540${_scopeId}>2</div><div class="step-text" data-v-cf5b7540${_scopeId}>\u6253\u5F00\u624B\u673A\u5FAE\u4FE1\u626B\u4E00\u626B</div></div><div class="step-item" data-v-cf5b7540${_scopeId}><div class="step-number" data-v-cf5b7540${_scopeId}>3</div><div class="step-text" data-v-cf5b7540${_scopeId}>\u70B9\u51FB\u52A0\u5165\u793E\u7FA4</div></div></div></div></div>`);
            } else {
              return [
                createVNode("p", { class: "modal-subtitle" }, "\u626B\u7801\u6DFB\u52A0\u5BA2\u670D\u5FAE\u4FE1\uFF0C\u83B7\u53D6\u4E13\u5C5E\u670D\u52A1"),
                createVNode("div", { class: "wechat-content" }, [
                  createVNode("div", { class: "qr-container" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "\u5FAE\u4FE1\u4E8C\u7EF4\u7801",
                      class: "qr-code"
                    })
                  ]),
                  createVNode("div", { class: "wechat-info" }, [
                    createVNode("div", { class: "wechat-id" }, [
                      createVNode("span", { class: "wechat-label" }, "\u5BA2\u670D\u5FAE\u4FE1\uFF1A"),
                      createVNode("span", { class: "wechat-value" }, "Companyservice")
                    ]),
                    createVNode("button", {
                      class: "copy-btn",
                      onClick: copyWechatId
                    }, "\u{1F4CB} \u590D\u5236\u5FAE\u4FE1\u53F7")
                  ]),
                  createVNode("div", { class: "steps-section" }, [
                    createVNode("div", { class: "steps-title" }, "\u6DFB\u52A0\u5BA2\u670D\u6B65\u9AA4"),
                    createVNode("div", { class: "steps-container" }, [
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "1"),
                        createVNode("div", { class: "step-text" }, "\u4E0B\u8F7D\u4E8C\u7EF4\u7801\u56FE\u7247\u5230\u7535\u8111")
                      ]),
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "2"),
                        createVNode("div", { class: "step-text" }, "\u6253\u5F00\u624B\u673A\u5FAE\u4FE1\u626B\u4E00\u626B")
                      ]),
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "3"),
                        createVNode("div", { class: "step-text" }, "\u70B9\u51FB\u52A0\u5165\u793E\u7FA4")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/JoinUsModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-cf5b7540"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const showJoinUs = ref(false);
    const showLoginModal = ref(false);
    const showContactModal = ref(false);
    const userStore = useUserStore();
    function closeJoinUs() {
      showJoinUs.value = false;
    }
    function closeContactModal() {
      showContactModal.value = false;
    }
    function closeLoginModal() {
      showLoginModal.value = false;
    }
    watch(() => userStore.isLoggedIn, (newValue) => {
      if (newValue && showLoginModal.value) {
        showLoginModal.value = false;
      }
    });
    const cols = [
      {
        title: "\u5173\u4E8E\u6211\u4EEC",
        items: ["\u516C\u53F8\u7B80\u4ECB", "\u6211\u4EEC\u7684\u4F7F\u547D", "\u6211\u4EEC\u7684\u4F18\u52BF", "\u52A0\u5165\u6211\u4EEC"]
      },
      {
        title: "\u670D\u52A1\u4E0E\u652F\u6301",
        items: ["\u4E2A\u4EBA\u4E2D\u5FC3", "\u6211\u7684\u8BA2\u5355", "\u5E38\u89C1\u95EE\u9898", "\u8054\u7CFB\u6211\u4EEC"]
      },
      {
        title: "\u6761\u6B3E\u4E0E\u653F\u7B56",
        items: ["\u9690\u79C1\u653F\u7B56", "\u7528\u6237\u534F\u8BAE", "\u9000\u6B3E\u653F\u7B56", "\u514D\u8D23\u58F0\u660E"]
      },
      {
        title: "\u5173\u6CE8\u6211\u4EEC",
        extra: "\u83B7\u53D6\u6700\u65B0\u4FC3\u9500\u4FE1\u606F\u548C\u72EC\u5BB6\u4F18\u60E0",
        icons: [
          { label: "\u5FAE\u4FE1", icon: chat_dot_round_default },
          { label: "\u5FAE\u535A", icon: platform_default },
          { label: "\u8BA2\u9605", icon: bell_default },
          { label: "\u6296\u97F3", icon: video_play_default }
        ],
        partner: false
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      const _component_JoinUsModal = __nuxt_component_2;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "app-footer" }, _attrs))} data-v-15dce612><div class="footer-bg" data-v-15dce612><div class="footer-cols" data-v-15dce612><!--[-->`);
      ssrRenderList(cols, (col, idx) => {
        _push(`<div class="footer-col" data-v-15dce612><div class="footer-title" data-v-15dce612>${ssrInterpolate(col.title)}</div><div class="footer-underline" data-v-15dce612></div>`);
        if (col.items && !col.icons) {
          _push(`<div class="footer-items" data-v-15dce612><!--[-->`);
          ssrRenderList(col.items, (item) => {
            _push(`<!--[-->`);
            if (item === "\u4E2A\u4EBA\u4E2D\u5FC3") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else if (item === "\u6211\u7684\u8BA2\u5355") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else if (item === "\u793E\u533A\u5E2E\u52A9") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/community",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u9690\u79C1\u653F\u7B56") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/privacy",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u7528\u6237\u534F\u8BAE") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/policy",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u9000\u6B3E\u653F\u7B56") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/refund",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u514D\u8D23\u58F0\u660E") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/disclaimer",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u516C\u53F8\u7B80\u4ECB") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/company",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u6211\u4EEC\u7684\u4F7F\u547D") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/about-us",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u6211\u4EEC\u7684\u4F18\u52BF") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/advantages",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u5E38\u89C1\u95EE\u9898") {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: "/faq",
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item === "\u52A0\u5165\u6211\u4EEC") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else if (item === "\u8054\u7CFB\u6211\u4EEC") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else {
              _push(`<div class="footer-item" data-v-15dce612>${ssrInterpolate(item)}</div>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.icons) {
          _push(`<div class="footer-icons" data-v-15dce612><!--[-->`);
          ssrRenderList(col.icons, (icon) => {
            _push(`<span class="footer-icon" data-v-15dce612>`);
            _push(ssrRenderComponent(_component_el_icon, { size: 20 }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(icon.icon), null, null), _parent2, _scopeId);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(icon.icon)))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.extra && !col.partner) {
          _push(`<div class="footer-extra" data-v-15dce612>${ssrInterpolate(col.extra)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="footer-bottom" data-v-15dce612> \xA9 2019-2026 \u51E1\u56FE\u62C9 | \u4E91\u5357\u51E1\u56FE\u62C9\u79D1\u6280\u6709\u9650\u516C\u53F8 | \u6EC7ICP\u5907 2025060486\u53F7-1 </div></div>`);
      _push(ssrRenderComponent(_component_JoinUsModal, {
        visible: showJoinUs.value,
        onClose: closeJoinUs
      }, null, _parent));
      _push(ssrRenderComponent(__nuxt_component_2$1, {
        visible: showLoginModal.value,
        onClose: closeLoginModal
      }, null, _parent));
      _push(ssrRenderComponent(ContactModal, {
        visible: showContactModal.value,
        onClose: closeContactModal
      }, null, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-15dce612"]]);
const _sfc_main$1 = {
  __name: "DevLoginTool",
  __ssrInlineRender: true,
  setup(__props) {
    const show = ref(true);
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      if (show.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "dev-login-tool" }, _attrs))} data-v-d2a422dc><div class="tool-header" data-v-d2a422dc><span data-v-d2a422dc>\u5F00\u53D1\u8C03\u8BD5\u5DE5\u5177</span><button data-v-d2a422dc>\xD7</button></div><div class="tool-content" data-v-d2a422dc><p class="tool-info" data-v-d2a422dc>\u5F53\u524D\u72B6\u6001: ${ssrInterpolate(unref(userStore).isLoggedIn ? "\u5DF2\u767B\u5F55" : "\u672A\u767B\u5F55")}</p>`);
        if (unref(userStore).user) {
          _push(`<p class="tool-info" data-v-d2a422dc>UID: ${ssrInterpolate(unref(userStore).user.uid || "\u65E0")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tool-actions" data-v-d2a422dc><button class="btn-mock" data-v-d2a422dc>\u4E00\u952E\u6A21\u62DF\u767B\u5F55</button><button class="btn-logout" data-v-d2a422dc>\u5F3A\u5236\u767B\u51FA</button></div></div></div>`);
      } else {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: "dev-tool-trigger" }, _attrs))} data-v-d2a422dc> DEV </button>`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/DevLoginTool.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DevLoginTool = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d2a422dc"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pc",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-dc0420f3>`);
      _push(ssrRenderComponent(AppHeader, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(ssrRenderComponent(DevLoginTool, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/pc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pc = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc0420f3"]]);

export { pc as default };
//# sourceMappingURL=pc-C7Y6gYHx.mjs.map
