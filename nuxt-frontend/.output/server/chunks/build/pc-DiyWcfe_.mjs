import { _ as _export_sfc, B as __nuxt_component_0$2, G as useState, u as useRouter$1 } from './server.mjs';
import { defineComponent, mergeProps, ref, watch, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, toDisplayString, resolveDynamicComponent, computed, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-R7CyI21u.mjs';
import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { _ as _imports_0 } from './virtual_public-B81IdLpj.mjs';
import { useRoute, useRouter } from 'vue-router';
import { u as useModalStore } from './modal-_wZ2Eah3.mjs';
import { u as useUserStore } from './user-C1i1UnhA.mjs';
import { useCartStore } from './cart-B8xez9id.mjs';
import { S as ServiceModal } from './ServiceModal-D76_d7WV.mjs';
import __nuxt_component_0$1 from './LoginRegisterModal-CloBqWAq.mjs';
import { ag as shopping_cart_default, ah as star_filled_default, _ as star_default, ab as chat_dot_round_default, aU as platform_default, $ as bell_default, ay as video_play_default, d as delete_default, O as search_default, l as loading_default, o as circle_check_filled_default, ai as right_default, g as warning_filled_default } from './index-DuV_oMrC.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { supabasePreOrderApi } from './supabase-fcLPkUp1.mjs';
import { B as BaseButton } from './BaseButton-BnWAaIRO.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
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
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
import './objects-Bz74KHmq.mjs';
import './common-D9iMPQj0.mjs';
import '@supabase/supabase-js';
import './useSystemConfig-Dp_BX2zp.mjs';
import './BaseModal-nbvk9VuE.mjs';
import './EmailInput-BxuFUYqG.mjs';
import './SendCodeButton-BHMZfVap.mjs';
import './wechat-login-WH-GLTWF.mjs';
import './useSendCode-BPjllPca.mjs';
import './interval-BHZX8LlC.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CyvpkMdQ.mjs';
import './use-global-config-Dt87SALX.mjs';
import './index-xMedQC9S.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ChannelRecognitionModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ChannelRecognitionModal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-6d9313dd"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MiniCartPopup",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const router = useRouter();
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
    const handleCheckout = async () => {
      if (!cartItem.value) return;
      if (checkingOut.value) return;
      checkingOut.value = true;
      try {
        const result = await supabasePreOrderApi.createPreOrder(
          cartItem.value.skuId,
          cartItem.value.quantity,
          "cart"
        );
        if (result.success && result.pre_order_id) {
          cartStore.clearCart();
          emit("close");
          router.push(`/checkout/${result.pre_order_id}`);
        } else {
          ElMessage.error(result.error || "\u521B\u5EFA\u8BA2\u5355\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u7ED3\u7B97\u5931\u8D25: " + (e.message || "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        checkingOut.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mini-cart-popup" }, _attrs))} data-v-93ee4536><div class="mini-cart-arrow" data-v-93ee4536></div><div class="mc-header" data-v-93ee4536><span class="mc-title" data-v-93ee4536>\u8D2D\u7269\u8F66</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" title="\u6E05\u7A7A\u8D2D\u7269\u8F66" data-v-93ee4536>`);
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
          _push(`<span data-v-93ee4536>\u6E05\u7A7A</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-93ee4536>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-93ee4536><div class="mc-img-wrap" data-v-93ee4536><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} alt="Product" data-v-93ee4536></div><div class="mc-details" data-v-93ee4536><div class="mc-name" data-v-93ee4536>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-spec" data-v-93ee4536>${ssrInterpolate(cartItem.value.specName)}</div><div class="mc-price-row" data-v-93ee4536><span class="mc-price" data-v-93ee4536>\xA5${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-93ee4536><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-93ee4536>-</button><span class="qty-num" data-v-93ee4536>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-93ee4536>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-93ee4536>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-93ee4536><div class="empty-icon" data-v-93ee4536>\u{1F6D2}</div><p data-v-93ee4536>\u8D2D\u7269\u8F66\u7A7A\u7A7A\u5982\u4E5F</p>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "secondary",
            size: "small",
            onClick: ($event) => emit("close")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u53BB\u901B\u901B`);
              } else {
                return [
                  createTextVNode("\u53BB\u901B\u901B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
        if (hasItems.value) {
          _push(`<div class="mc-footer" data-v-93ee4536>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "primary",
            block: "",
            loading: checkingOut.value,
            disabled: checkingOut.value,
            onClick: handleCheckout
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(checkingOut.value ? "\u5904\u7406\u4E2D..." : "\u53BB\u7ED3\u7B97")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(checkingOut.value ? "\u5904\u7406\u4E2D..." : "\u53BB\u7ED3\u7B97"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/cart/MiniCartPopup.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MiniCartPopup = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-93ee4536"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      _push(ssrRenderComponent(__nuxt_component_0$1, {
        visible: showLoginModal.value,
        onClose: closeLoginModal
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/AppHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-00086e9a"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const showLoginModal = ref(false);
    const showContactModal = ref(false);
    const userStore = useUserStore();
    const footerGroups = [
      {
        title: "\u5173\u4E8E\u6211\u4EEC",
        items: [
          { text: "\u516C\u53F8\u7B80\u4ECB", type: "link", path: "/company" },
          { text: "\u6211\u4EEC\u7684\u4F7F\u547D", type: "link", path: "/about-us" },
          { text: "\u6211\u4EEC\u7684\u4F18\u52BF", type: "link", path: "/advantages" },
          { text: "\u52A0\u5165\u6211\u4EEC", type: "link", path: "/join-us" }
        ]
      },
      {
        title: "\u670D\u52A1\u4E0E\u652F\u6301",
        items: [
          { text: "\u4E2A\u4EBA\u4E2D\u5FC3", type: "button", path: "/profile", auth: true },
          { text: "\u6211\u7684\u8BA2\u5355", type: "button", path: "/profile/orders", auth: true },
          { text: "\u5E38\u89C1\u95EE\u9898", type: "link", path: "/faq" },
          { text: "\u8054\u7CFB\u6211\u4EEC", type: "button", action: "contact" }
        ]
      },
      {
        title: "\u6761\u6B3E\u4E0E\u653F\u7B56",
        items: [
          { text: "\u9690\u79C1\u653F\u7B56", type: "link", path: "/privacy" },
          { text: "\u7528\u6237\u534F\u8BAE", type: "link", path: "/policy" },
          { text: "\u9000\u6B3E\u653F\u7B56", type: "link", path: "/refund" },
          { text: "\u514D\u8D23\u58F0\u660E", type: "link", path: "/disclaimer" }
        ]
      },
      {
        title: "\u5173\u6CE8\u6211\u4EEC",
        extra: "\u83B7\u53D6\u6700\u65B0\u4FC3\u9500\u4FE1\u606F\u548C\u72EC\u5BB6\u4F18\u60E0",
        icons: [
          { label: "\u5FAE\u4FE1", icon: chat_dot_round_default, url: "#" },
          { label: "\u5FAE\u535A", icon: platform_default, url: "#" },
          { label: "\u8BA2\u9605", icon: bell_default, url: "#" },
          { label: "\u6296\u97F3", icon: video_play_default, url: "#" }
        ]
      }
    ];
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "app-footer" }, _attrs))} data-v-4a7f0f2f><div class="footer-bg" data-v-4a7f0f2f><div class="footer-cols" data-v-4a7f0f2f><!--[-->`);
      ssrRenderList(footerGroups, (col, idx) => {
        _push(`<div class="footer-col" data-v-4a7f0f2f><div class="footer-title" data-v-4a7f0f2f>${ssrInterpolate(col.title)}</div><div class="footer-underline" data-v-4a7f0f2f></div>`);
        if (col.items) {
          _push(`<div class="footer-items" data-v-4a7f0f2f><!--[-->`);
          ssrRenderList(col.items, (item) => {
            _push(`<!--[-->`);
            if (item.type === "link" && !item.auth) {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: item.path,
                class: "footer-item footer-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(item.text)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.text), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else if (item.type === "button" || item.auth) {
              _push(`<button class="footer-item footer-link footer-button" data-v-4a7f0f2f>${ssrInterpolate(item.text)}</button>`);
            } else {
              _push(`<div class="footer-item" data-v-4a7f0f2f>${ssrInterpolate(item.text)}</div>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.icons) {
          _push(`<div class="footer-icons" data-v-4a7f0f2f><!--[-->`);
          ssrRenderList(col.icons, (icon) => {
            _push(`<a class="footer-icon"${ssrRenderAttr("href", icon.url || "#")} target="_blank"${ssrRenderAttr("aria-label", icon.label)}${ssrRenderAttr("title", icon.label)} data-v-4a7f0f2f>`);
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
            _push(`</a>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (col.extra) {
          _push(`<div class="footer-extra" data-v-4a7f0f2f>${ssrInterpolate(col.extra)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="footer-bottom" data-v-4a7f0f2f> \xA9 2019-2026 \u51E1\u56FE\u62C9 | \u4E91\u5357\u51E1\u56FE\u62C9\u79D1\u6280\u6709\u9650\u516C\u53F8 | \u6EC7ICP\u5907 2025060486\u53F7-1 </div></div>`);
      _push(ssrRenderComponent(__nuxt_component_0$1, {
        visible: showLoginModal.value,
        onClose: closeLoginModal
      }, null, _parent));
      if (showContactModal.value) {
        _push(ssrRenderComponent(ServiceModal, { onClose: closeContactModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4a7f0f2f"]]);
const _sfc_main$1 = {
  __name: "DevLoginTool",
  __ssrInlineRender: true,
  setup(__props) {
    ref(true);
    useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      {
        _push(`<!---->`);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-c43de7bf>`);
      _push(ssrRenderComponent(AppHeader, null, null, _parent));
      _push(`<div class="page-slot-wrapper" data-v-c43de7bf>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
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
const pc = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c43de7bf"]]);

export { pc as default };
//# sourceMappingURL=pc-DiyWcfe_.mjs.map
