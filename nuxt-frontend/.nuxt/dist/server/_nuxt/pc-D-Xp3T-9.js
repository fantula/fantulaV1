import { f as useRouter, _ as _export_sfc, H as useState, C as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, watch, nextTick, computed, mergeProps, withCtx, unref, createVNode, useSSRContext, createTextVNode, toDisplayString, openBlock, createBlock, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { _ as __nuxt_component_1 } from "./nuxt-link-Bz8d0esR.js";
import { E as ElIcon } from "./index-D6MDXFfa.js";
/* empty css              */
import { _ as _imports_0 } from "./virtual_public-B81IdLpj.js";
import { useRouter as useRouter$1, useRoute } from "vue-router";
import { u as useModalStore } from "./modal-CBJJqDui.js";
import { u as useUserStore } from "./user-0iCypJz1.js";
import { useCartStore } from "./cart-Lqo8L2Wc.js";
import { S as ServiceModal } from "./ServiceModal-BKBrfiAg.js";
import __nuxt_component_0 from "./LoginRegisterModal-Cb2thB66.js";
/* empty css                    */
import { O as search_default, l as loading_default, q as circle_check_filled_default, ah as right_default, h as warning_filled_default, B as delete_default, af as shopping_cart_default, ag as star_filled_default, _ as star_default, a1 as chat_dot_round_default, aU as platform_default, $ as bell_default, ay as video_play_default } from "./index-CRs4T-Jf.js";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
import { supabasePreOrderApi } from "./supabase-D4dCvdwD.js";
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { D as DEFAULT_AVATAR } from "./constants-BRAeDQ6J.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./objects-Bz74KHmq.js";
import "./common-CeIxTI3I.js";
import "@supabase/supabase-js";
import "./useSystemConfig-uu86svaG.js";
import "./BaseModal-nbvk9VuE.js";
import "./EmailInput-BxuFUYqG.js";
import "./SendCodeButton-BHMZfVap.js";
import "./wechat-login-DYkcuR5o.js";
import "./useSendCode-DUIi8Gb_.js";
import "./interval-BnEBQU8I.js";
import "./useNotify-CME3DTm8.js";
import "./useToast-DsT-1f4c.js";
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "./event-D3FEo2C5.js";
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
    const router = useRouter$1();
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
          ElMessage.error(result.error || "创建订单失败");
        }
      } catch (e) {
        ElMessage.error("结算失败: " + (e.message || "未知错误"));
      } finally {
        checkingOut.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mini-cart-popup" }, _attrs))} data-v-93ee4536><div class="mini-cart-arrow" data-v-93ee4536></div><div class="mc-header" data-v-93ee4536><span class="mc-title" data-v-93ee4536>购物车</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" title="清空购物车" data-v-93ee4536>`);
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
          _push(`<span data-v-93ee4536>清空</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-93ee4536>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-93ee4536><div class="mc-img-wrap" data-v-93ee4536><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} alt="Product" data-v-93ee4536></div><div class="mc-details" data-v-93ee4536><div class="mc-name" data-v-93ee4536>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-spec" data-v-93ee4536>${ssrInterpolate(cartItem.value.specName)}</div><div class="mc-price-row" data-v-93ee4536><span class="mc-price" data-v-93ee4536>¥${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-93ee4536><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-93ee4536>-</button><span class="qty-num" data-v-93ee4536>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-93ee4536>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-93ee4536>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-93ee4536><div class="empty-icon" data-v-93ee4536>🛒</div><p data-v-93ee4536>购物车空空如也</p>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "secondary",
            size: "small",
            onClick: ($event) => emit("close")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`去逛逛`);
              } else {
                return [
                  createTextVNode("去逛逛")
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
                _push2(`${ssrInterpolate(checkingOut.value ? "处理中..." : "去结算")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(checkingOut.value ? "处理中..." : "去结算"), 1)
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
      const _component_NuxtLink = __nuxt_component_1;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><header class="app-header" data-v-604fe7d5><div class="header-inner" data-v-604fe7d5>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-area"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="logo" class="logo-img" data-v-604fe7d5${_scopeId}><span class="logo-text" data-v-604fe7d5${_scopeId}>凡图拉</span>`);
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
      _push(`<nav class="nav-menu" data-v-604fe7d5>`);
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
      _push(`<button class="nav-btn" data-v-604fe7d5>频道识别</button><button class="nav-btn" data-v-604fe7d5>订单</button>`);
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
      _push(`<button class="nav-btn" data-v-604fe7d5>联系图拉</button></nav><div class="header-actions" data-v-604fe7d5>`);
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
        _push(`<div class="user-section" data-v-604fe7d5><div class="cart-wrapper" style="${ssrRenderStyle({ "position": "relative" })}" data-v-604fe7d5><div class="cart-icon" title="购物车" id="cart-icon-ref" data-v-604fe7d5><div class="cart-icon-wrapper" data-v-604fe7d5>`);
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
          _push(`<span class="cart-badge" data-v-604fe7d5>${ssrInterpolate(unref(cartStore).totalCount)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        _push(ssrRenderComponent(MiniCartPopup, {
          visible: unref(cartStore).miniCartVisible,
          onClose: ($event) => unref(cartStore).miniCartVisible = false,
          class: "header-mini-cart"
        }, null, _parent));
        _push(`</div><div class="${ssrRenderClass([{ "is-active": unref(isPageFavorited) }, "favorites-wrapper"])}" id="favorites-icon-ref" title="我的收藏" data-v-604fe7d5>`);
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
        _push(`</div><div class="user-info-container" data-v-604fe7d5>`);
        if (unref(userStore).loading) {
          _push(`<div class="user-info user-info--loading" data-v-604fe7d5><div class="avatar-skeleton" data-v-604fe7d5></div><div class="name-skeleton" data-v-604fe7d5></div></div>`);
        } else {
          _push(`<div class="user-info" title="进入个人中心" data-v-604fe7d5><img${ssrRenderAttr("src", unref(userStore).user?.avatar || unref(DEFAULT_AVATAR))}${ssrRenderAttr("alt", unref(userStore).user?.nickName || unref(userStore).user?.nickname || "用户头像")} class="user-avatar" data-v-604fe7d5><span class="user-name" data-v-604fe7d5>${ssrInterpolate(unref(userStore).user?.nickName || unref(userStore).user?.nickname || "用户")}</span></div>`);
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
      _push(ssrRenderComponent(__nuxt_component_0, {
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
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-604fe7d5"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const showLoginModal = ref(false);
    const showContactModal = ref(false);
    const userStore = useUserStore();
    const footerGroups = [
      {
        title: "关于我们",
        items: [
          { text: "公司简介", type: "link", path: "/company" },
          { text: "我们的使命", type: "link", path: "/about-us" },
          { text: "我们的优势", type: "link", path: "/advantages" },
          { text: "加入我们", type: "link", path: "/join-us" }
        ]
      },
      {
        title: "服务与支持",
        items: [
          { text: "个人中心", type: "button", path: "/profile", auth: true },
          { text: "我的订单", type: "button", path: "/profile/orders", auth: true },
          { text: "常见问题", type: "link", path: "/faq" },
          { text: "联系我们", type: "button", action: "contact" }
        ]
      },
      {
        title: "条款与政策",
        items: [
          { text: "隐私政策", type: "link", path: "/privacy" },
          { text: "用户协议", type: "link", path: "/policy" },
          { text: "退款政策", type: "link", path: "/refund" },
          { text: "免责声明", type: "link", path: "/disclaimer" }
        ]
      },
      {
        title: "关注我们",
        extra: "获取最新促销信息和独家优惠",
        icons: [
          { label: "微信", icon: chat_dot_round_default, url: "#" },
          { label: "微博", icon: platform_default, url: "#" },
          { label: "订阅", icon: bell_default, url: "#" },
          { label: "抖音", icon: video_play_default, url: "#" }
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
      const _component_NuxtLink = __nuxt_component_1;
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
      _push(`<!--]--></div><div class="footer-bottom" data-v-4a7f0f2f> © 2019-2026 凡图拉 | 云南凡图拉科技有限公司 | 滇ICP备 2025060486号-1 </div></div>`);
      _push(ssrRenderComponent(__nuxt_component_0, {
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
    const isDev = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-655a96b2>`);
      _push(ssrRenderComponent(AppHeader, null, null, _parent));
      _push(`<div class="page-slot-wrapper" data-v-655a96b2>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      if (unref(isDev)) {
        _push(ssrRenderComponent(DevLoginTool, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
const pc = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-655a96b2"]]);
export {
  pc as default
};
//# sourceMappingURL=pc-D-Xp3T-9.js.map
