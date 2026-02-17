import { _ as _export_sfc, w as __nuxt_component_0$2, H as useState, f as useRouter } from './server.mjs';
import { defineComponent, mergeProps, unref, ref, watch, withCtx, createVNode, createTextVNode, withModifiers, toDisplayString, resolveDynamicComponent, openBlock, createBlock, nextTick, computed, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-Bz8d0esR.mjs';
import { _ as _imports_0 } from './virtual_public-B81IdLpj.mjs';
import { useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useModalStore } from './modal-CBJJqDui.mjs';
import { u as useUserStore } from './user-DLDq0pTF.mjs';
import { useCartStore } from './cart-Lqo8L2Wc.mjs';
import { S as ServiceModal } from './ServiceModal-y9UVDNga.mjs';
import __nuxt_component_0 from './LoginRegisterModal-Bx2zS6iM.mjs';
import { E as ElIcon } from './index-C4aUwruK.mjs';
import { S as chat_dot_round_default, aO as platform_default, G as bell_default, ah as video_play_default, af as search_default, l as loading_default, g as circle_check_filled_default, a1 as right_default, w as warning_filled_default } from './index-CCIZH4aC.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
import './common-CeIxTI3I.mjs';
import './useSystemConfig-uu86svaG.mjs';
import './BaseModal-nbvk9VuE.mjs';
import './BaseButton-BnWAaIRO.mjs';
import './index-CIurcsSv.mjs';
import './install-VBSKbHUK.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CadSVx0p.mjs';
import './use-global-config-CaR6i8cb.mjs';
import './index-C1njJNPQ.mjs';
import './objects-Bz74KHmq.mjs';
import './event-D3FEo2C5.mjs';
import './EmailInput-BxuFUYqG.mjs';
import './SendCodeButton-BHMZfVap.mjs';
import './wechat-login-DYkcuR5o.mjs';
import './useSendCode-CIzwVzrG.mjs';
import './interval-BnEBQU8I.mjs';
import './useNotify-Bx9I1ZGd.mjs';
import './useToast-DsT-1f4c.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ChannelRecognitionModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ChannelRecognitionModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6d9313dd"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    useState("is-current-page-favorited", () => false);
    const modal = useModalStore();
    const userStore = useUserStore();
    useCartStore();
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
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<!--[--><header class="app-header" data-v-a516c3dd><div class="header-inner" data-v-a516c3dd>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-area"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="logo" class="logo-img" data-v-a516c3dd${_scopeId}><span class="logo-text" data-v-a516c3dd${_scopeId}>\u51E1\u56FE\u62C9</span>`);
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
      _push(`<nav class="nav-menu" data-v-a516c3dd>`);
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
      _push(`<button class="nav-btn" data-v-a516c3dd>\u9891\u9053\u8BC6\u522B</button><button class="nav-btn" data-v-a516c3dd>\u8BA2\u5355</button>`);
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
      _push(`<button class="nav-btn" data-v-a516c3dd>\u8054\u7CFB\u56FE\u62C9</button></nav><div class="header-actions" data-v-a516c3dd>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "#",
              class: "login-btn",
              onClick: ($event) => unref(modal).openLogin()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u767B\u5F55/\u6CE8\u518C `);
                } else {
                  return [
                    createTextVNode(" \u767B\u5F55/\u6CE8\u518C ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "#",
                class: "login-btn",
                onClick: withModifiers(($event) => unref(modal).openLogin(), ["prevent"])
              }, {
                default: withCtx(() => [
                  createTextVNode(" \u767B\u5F55/\u6CE8\u518C ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        })
      }, _parent));
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
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a516c3dd"]]);
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
      _push(`<!--]--></div><div class="footer-bottom" data-v-4a7f0f2f> \xA9 2019-2026 \u51E1\u56FE\u62C9 | \u4E91\u5357\u51E1\u56FE\u62C9\u79D1\u6280\u6709\u9650\u516C\u53F8 | \u6EC7ICP\u5907 2025060486\u53F7-1 </div></div>`);
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
    const isDev = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-1f142014>`);
      _push(ssrRenderComponent(AppHeader, null, null, _parent));
      _push(`<div class="page-slot-wrapper" data-v-1f142014>`);
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
const pc = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f142014"]]);

export { pc as default };
//# sourceMappingURL=pc-BanVpZ-G.mjs.map
