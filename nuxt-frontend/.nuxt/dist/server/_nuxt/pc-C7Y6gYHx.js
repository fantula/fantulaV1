import { _ as _export_sfc, u as useRouter, I as useState, y as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, mergeProps, useSSRContext, ref, watch, nextTick, computed, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { _ as __nuxt_component_0 } from "./nuxt-link-DErVm1dK.js";
import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter as useRouter$1, useRoute } from "vue-router";
import { u as useModalStore } from "./modal-HUsR3oCs.js";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { u as useCartStore } from "./cart-D8FaBhjU.js";
import { _ as __nuxt_component_2$1 } from "./LoginRegisterModal-Qu_Lr8ij.js";
/* empty css                    */
import { L as search_default, l as loading_default, j as circle_check_filled_default, ag as right_default, w as warning_filled_default, x as delete_default, ae as shopping_cart_default, af as star_filled_default, W as star_default, _ as chat_dot_round_default, aP as platform_default, X as bell_default, av as video_play_default } from "./index-CmsdIFY8.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { B as BaseModal } from "./BaseModal-HTOTXfQj.js";
import { _ as _imports_1 } from "./virtual_public-FTeKDcap.js";
import { E as ElMessage } from "./index-eYVppfk3.js";
import { C as ContactModal } from "./ContactModal-BLWDvuWe.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "./install-VBSKbHUK.js";
import "./objects-Bz74KHmq.js";
import "./auth-BCuS92ob.js";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "@supabase/supabase-js";
import "./SendCodeButton-Bt2-2zIY.js";
import "./BaseButton-B3srPw2H.js";
import "./interval-BHZX8LlC.js";
import "./typescript-D6L75muK.js";
import "./icon-eqoLCvNY.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./index-CO6H4Lsj.js";
import "./event-D3FEo2C5.js";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-modal-mask" }, _attrs))} data-v-1b643592><div class="service-modal" data-v-1b643592><div class="modal-gradient-top" data-v-1b643592><div class="modal-header" data-v-1b643592><span class="modal-title" data-v-1b643592>联系客服</span><button class="modal-close" data-v-1b643592>×</button></div><div class="modal-desc" data-v-1b643592>我们提供多种便捷的客服渠道，7×24小时为您提供专业服务。扫码添加客服，获取即时帮助。</div></div><div class="modal-main-white" data-v-1b643592><div class="modal-row" data-v-1b643592><div class="modal-card" data-v-1b643592><div class="card-top-row" data-v-1b643592><div class="card-avatar wechat" data-v-1b643592><img${ssrRenderAttr("src", weixinIcon1)} alt="微信客服图标" data-v-1b643592></div><div class="card-title" data-v-1b643592>微信客服</div></div><div class="card-icon-box" data-v-1b643592><img${ssrRenderAttr("src", weixinIcon2)} class="card-icon-img" alt="微信二维码" data-v-1b643592></div><div class="card-desc" data-v-1b643592>使用微信扫描二维码添加客服<br data-v-1b643592>或搜索微信号：<span class="account-code" data-v-1b643592>kefu_wechat123</span></div></div><div class="modal-card" data-v-1b643592><div class="card-top-row" data-v-1b643592><div class="card-avatar dingtalk" data-v-1b643592><img${ssrRenderAttr("src", dingdingIcon1)} alt="钉钉客服图标" data-v-1b643592></div><div class="card-title" data-v-1b643592>钉钉客服</div></div><div class="card-icon-box" data-v-1b643592><img${ssrRenderAttr("src", dingdingIcon2)} class="card-icon-img" alt="钉钉二维码" data-v-1b643592></div><div class="card-desc" data-v-1b643592>使用钉钉扫描二维码添加客服<br data-v-1b643592>或搜索ID：<span class="account-code" data-v-1b643592>kefu_dingtalk456</span></div></div></div><div class="modal-row phone-row" data-v-1b643592><div class="modal-card phone" data-v-1b643592><div class="phone-header" data-v-1b643592><div class="modal-card-icon phone" data-v-1b643592><img${ssrRenderAttr("src", phoneIcon)} alt="电话客服图标" data-v-1b643592></div><div class="modal-card-title phone" data-v-1b643592>电话客服</div></div><div class="modal-phone-number" data-v-1b643592>400-888-9999</div><div class="modal-phone-desc" data-v-1b643592>服务时间：全天24小时<br data-v-1b643592>拨打客服热线获取即时支持<br data-v-1b643592>或发送邮件至 <span class="email-support" data-v-1b643592>support@company.com</span></div></div></div><button class="modal-action" data-v-1b643592><img${ssrRenderAttr("src", contactIcon)} alt="联系客服图标" class="action-icon" data-v-1b643592> 联系在线客服 </button></div></div></div>`);
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
    useRouter();
    const inputRef = ref(null);
    const state = ref("input");
    const loading = ref(false);
    const channelInput = ref("@");
    const resultKey = ref("");
    const boundProductId = ref(null);
    watch(() => props.modelValue, (val) => {
      if (val) {
        nextTick(() => {
          reset();
          inputRef.value?.focus();
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
      nextTick(() => inputRef.value?.focus());
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.modelValue) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-6d9313dd><div class="channel-modal" data-v-6d9313dd><button class="modal-close" data-v-6d9313dd>×</button><div class="modal-header" data-v-6d9313dd><div class="header-icon" data-v-6d9313dd>`);
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
        _push(`</div><h2 class="modal-title" data-v-6d9313dd>频道识别</h2><p class="modal-subtitle" data-v-6d9313dd>请输入频道标识以连接专属商品</p></div><div class="modal-body" data-v-6d9313dd>`);
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
          _push(`</div><button class="primary-btn"${ssrIncludeBooleanAttr(loading.value || !unref(isValidInput)) ? " disabled" : ""} data-v-6d9313dd>${ssrInterpolate(loading.value ? "识别中..." : "立即识别")}</button></div>`);
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
          _push(`</div><h3 class="result-key" data-v-6d9313dd>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-6d9313dd>已成功识别频道</p><div class="action-buttons" data-v-6d9313dd><button class="primary-btn success" data-v-6d9313dd> 前往购买 `);
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
          _push(`</button><button class="text-btn" data-v-6d9313dd>重新输入</button></div></div>`);
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
          _push(`</div><h3 class="result-key" data-v-6d9313dd>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-6d9313dd>频道尚未绑定商品</p><p class="result-sub-msg" data-v-6d9313dd>已记录请求，请稍后重试或联系客服</p><div class="action-buttons" data-v-6d9313dd><button class="text-btn" data-v-6d9313dd>返回</button></div></div>`);
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
    useRouter$1();
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mini-cart-popup" }, _attrs))} data-v-87609fb2><div class="mini-cart-arrow" data-v-87609fb2></div><div class="mc-header" data-v-87609fb2><span class="mc-title" data-v-87609fb2>购物车</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" title="清空购物车" data-v-87609fb2>`);
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
          _push(`<span data-v-87609fb2>清空</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-87609fb2>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-87609fb2><div class="mc-img-wrap" data-v-87609fb2><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} alt="Product" data-v-87609fb2></div><div class="mc-details" data-v-87609fb2><div class="mc-name" data-v-87609fb2>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-spec" data-v-87609fb2>${ssrInterpolate(cartItem.value.specName)}</div><div class="mc-price-row" data-v-87609fb2><span class="mc-price" data-v-87609fb2>¥${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-87609fb2><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-87609fb2>-</button><span class="qty-num" data-v-87609fb2>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-87609fb2>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-87609fb2>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-87609fb2><div class="empty-icon" data-v-87609fb2>🛒</div><p data-v-87609fb2>购物车空空如也</p><button class="mc-btn secondary small" data-v-87609fb2>去逛逛</button></div>`);
        }
        _push(`</div>`);
        if (hasItems.value) {
          _push(`<div class="mc-footer" data-v-87609fb2><button class="mc-btn primary block"${ssrIncludeBooleanAttr(checkingOut.value) ? " disabled" : ""} data-v-87609fb2>${ssrInterpolate(checkingOut.value ? "处理中..." : "去结算")}</button></div>`);
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
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><header class="app-header" data-v-00086e9a><div class="header-inner" data-v-00086e9a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-area"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="logo" class="logo-img" data-v-00086e9a${_scopeId}><span class="logo-text" data-v-00086e9a${_scopeId}>凡图拉</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "logo",
                class: "logo-img"
              }),
              createVNode("span", { class: "logo-text" }, "凡图拉")
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
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-btn" data-v-00086e9a>频道识别</button><button class="nav-btn" data-v-00086e9a>订单</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/faq",
        class: "nav-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`常见问题`);
          } else {
            return [
              createTextVNode("常见问题")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-btn" data-v-00086e9a>联系图拉</button></nav><div class="header-actions" data-v-00086e9a>`);
      if (!unref(userStore).isLoggedIn) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "#",
          class: "login-btn",
          onClick: ($event) => unref(modal).openLogin()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 登录/注册 `);
            } else {
              return [
                createTextVNode(" 登录/注册 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="user-section" data-v-00086e9a><div class="cart-wrapper" style="${ssrRenderStyle({ "position": "relative" })}" data-v-00086e9a><div class="cart-icon" title="购物车" id="cart-icon-ref" data-v-00086e9a><div class="cart-icon-wrapper" data-v-00086e9a>`);
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
        _push(`</div><div class="${ssrRenderClass([{ "is-active": unref(isPageFavorited) }, "favorites-wrapper"])}" id="favorites-icon-ref" title="我的收藏" data-v-00086e9a>`);
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
          _push(`<div class="user-info" title="进入个人中心" data-v-00086e9a><img${ssrRenderAttr("src", unref(userStore).user?.avatar || "/images/client/pc/avatars/avatar-cat.png")}${ssrRenderAttr("alt", unref(userStore).user?.nickName || unref(userStore).user?.nickname || "用户头像")} class="user-avatar" data-v-00086e9a><span class="user-name" data-v-00086e9a>${ssrInterpolate(unref(userStore).user?.nickName || unref(userStore).user?.nickname || "用户")}</span></div>`);
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
          ElMessage.success("微信号已复制到剪贴板");
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
        ElMessage.success("微信号已复制到剪贴板");
      } catch (err) {
        ElMessage.error("复制失败，请手动复制微信号：" + text);
      }
      (void 0).body.removeChild(textArea);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      if (__props.visible) {
        _push(ssrRenderComponent(_component_BaseModal, mergeProps({
          visible: __props.visible,
          title: "加入我们的社群",
          width: "520px",
          "show-footer": false,
          onClose: ($event) => _ctx.$emit("close")
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="modal-subtitle" data-v-cf5b7540${_scopeId}>扫码添加客服微信，获取专属服务</p><div class="wechat-content" data-v-cf5b7540${_scopeId}><div class="qr-container" data-v-cf5b7540${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="微信二维码" class="qr-code" data-v-cf5b7540${_scopeId}></div><div class="wechat-info" data-v-cf5b7540${_scopeId}><div class="wechat-id" data-v-cf5b7540${_scopeId}><span class="wechat-label" data-v-cf5b7540${_scopeId}>客服微信：</span><span class="wechat-value" data-v-cf5b7540${_scopeId}>Companyservice</span></div><button class="copy-btn" data-v-cf5b7540${_scopeId}>📋 复制微信号</button></div><div class="steps-section" data-v-cf5b7540${_scopeId}><div class="steps-title" data-v-cf5b7540${_scopeId}>添加客服步骤</div><div class="steps-container" data-v-cf5b7540${_scopeId}><div class="step-item" data-v-cf5b7540${_scopeId}><div class="step-number" data-v-cf5b7540${_scopeId}>1</div><div class="step-text" data-v-cf5b7540${_scopeId}>下载二维码图片到电脑</div></div><div class="step-item" data-v-cf5b7540${_scopeId}><div class="step-number" data-v-cf5b7540${_scopeId}>2</div><div class="step-text" data-v-cf5b7540${_scopeId}>打开手机微信扫一扫</div></div><div class="step-item" data-v-cf5b7540${_scopeId}><div class="step-number" data-v-cf5b7540${_scopeId}>3</div><div class="step-text" data-v-cf5b7540${_scopeId}>点击加入社群</div></div></div></div></div>`);
            } else {
              return [
                createVNode("p", { class: "modal-subtitle" }, "扫码添加客服微信，获取专属服务"),
                createVNode("div", { class: "wechat-content" }, [
                  createVNode("div", { class: "qr-container" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "微信二维码",
                      class: "qr-code"
                    })
                  ]),
                  createVNode("div", { class: "wechat-info" }, [
                    createVNode("div", { class: "wechat-id" }, [
                      createVNode("span", { class: "wechat-label" }, "客服微信："),
                      createVNode("span", { class: "wechat-value" }, "Companyservice")
                    ]),
                    createVNode("button", {
                      class: "copy-btn",
                      onClick: copyWechatId
                    }, "📋 复制微信号")
                  ]),
                  createVNode("div", { class: "steps-section" }, [
                    createVNode("div", { class: "steps-title" }, "添加客服步骤"),
                    createVNode("div", { class: "steps-container" }, [
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "1"),
                        createVNode("div", { class: "step-text" }, "下载二维码图片到电脑")
                      ]),
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "2"),
                        createVNode("div", { class: "step-text" }, "打开手机微信扫一扫")
                      ]),
                      createVNode("div", { class: "step-item" }, [
                        createVNode("div", { class: "step-number" }, "3"),
                        createVNode("div", { class: "step-text" }, "点击加入社群")
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
        title: "关于我们",
        items: ["公司简介", "我们的使命", "我们的优势", "加入我们"]
      },
      {
        title: "服务与支持",
        items: ["个人中心", "我的订单", "常见问题", "联系我们"]
      },
      {
        title: "条款与政策",
        items: ["隐私政策", "用户协议", "退款政策", "免责声明"]
      },
      {
        title: "关注我们",
        extra: "获取最新促销信息和独家优惠",
        icons: [
          { label: "微信", icon: chat_dot_round_default },
          { label: "微博", icon: platform_default },
          { label: "订阅", icon: bell_default },
          { label: "抖音", icon: video_play_default }
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
            if (item === "个人中心") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else if (item === "我的订单") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else if (item === "社区帮助") {
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
            } else if (item === "隐私政策") {
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
            } else if (item === "用户协议") {
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
            } else if (item === "退款政策") {
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
            } else if (item === "免责声明") {
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
            } else if (item === "公司简介") {
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
            } else if (item === "我们的使命") {
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
            } else if (item === "我们的优势") {
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
            } else if (item === "常见问题") {
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
            } else if (item === "加入我们") {
              _push(`<button class="footer-item footer-link footer-button" data-v-15dce612>${ssrInterpolate(item)}</button>`);
            } else if (item === "联系我们") {
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
      _push(`<!--]--></div><div class="footer-bottom" data-v-15dce612> © 2019-2026 凡图拉 | 云南凡图拉科技有限公司 | 滇ICP备 2025060486号-1 </div></div>`);
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
    const isDev = process.env.NODE_ENV !== "production";
    const show = ref(true);
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      if (isDev && show.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "dev-login-tool" }, _attrs))} data-v-d2a422dc><div class="tool-header" data-v-d2a422dc><span data-v-d2a422dc>开发调试工具</span><button data-v-d2a422dc>×</button></div><div class="tool-content" data-v-d2a422dc><p class="tool-info" data-v-d2a422dc>当前状态: ${ssrInterpolate(unref(userStore).isLoggedIn ? "已登录" : "未登录")}</p>`);
        if (unref(userStore).user) {
          _push(`<p class="tool-info" data-v-d2a422dc>UID: ${ssrInterpolate(unref(userStore).user.uid || "无")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tool-actions" data-v-d2a422dc><button class="btn-mock" data-v-d2a422dc>一键模拟登录</button><button class="btn-logout" data-v-d2a422dc>强制登出</button></div></div></div>`);
      } else if (isDev) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: "dev-tool-trigger" }, _attrs))} data-v-d2a422dc> DEV </button>`);
      } else {
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
      const _component_ClientOnly = __nuxt_component_0$1;
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
export {
  pc as default
};
//# sourceMappingURL=pc-C7Y6gYHx.js.map
