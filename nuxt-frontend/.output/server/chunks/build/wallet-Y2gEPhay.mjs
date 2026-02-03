import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { E as ElTooltip } from './index-D6r9Uwf3.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, TransitionGroup, Fragment, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { W as WalletRechargeModal } from './WalletRechargeModal-CGOnPK2n.mjs';
import { a as authApi } from './auth-BCuS92ob.mjs';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { u as useInfiniteScroll, B as BaseInfiniteList } from './BaseInfiniteList-pSsymcej.mjs';
import { T as wallet_default, P as warning_default, a9 as lightning_default, K as document_default, aa as top_default, ab as bottom_default } from './index-4qszPKX4.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import '@popperjs/core';
import './index-DqrhOzxH.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './constants-hAKFmBbq.mjs';
import './BaseModal-HTOTXfQj.mjs';
import './BaseButton-B3srPw2H.mjs';
import './virtual_public-CTq2VprR.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './virtual_public-FTeKDcap.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
import 'qrcode';
import './interval-BHZX8LlC.mjs';
import './index-CJUZrfXE.mjs';
import './typescript-D6L75muK.mjs';
import './icon-BcxG_YvU.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './index-CO6H4Lsj.mjs';
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-D8FaBhjU.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    useRoute();
    useRouter();
    const showRechargeModal = ref(false);
    const balance = ref(0);
    const transactions = ref([]);
    const loading = ref(true);
    const activeTab = ref("all");
    const balanceInteger = computed(() => Math.floor(balance.value).toLocaleString());
    const balanceDecimal = computed(() => (balance.value % 1).toFixed(2).split(".")[1]);
    const filteredTransactions = computed(() => {
      if (activeTab.value === "all") return transactions.value;
      if (activeTab.value === "income") return transactions.value.filter((t) => t.amount > 0);
      if (activeTab.value === "expense") return transactions.value.filter((t) => t.amount < 0);
      return transactions.value;
    });
    const { displayList, finished, error, loadMore } = useInfiniteScroll({
      data: filteredTransactions,
      pageSize: 10
    });
    const fetchWallet = async () => {
      loading.value = true;
      try {
        const res = await authApi.getWalletData();
        if (res.success && res.data) {
          balance.value = res.data.balance || 0;
          transactions.value = res.data.transactions || [];
        }
      } finally {
        setTimeout(() => {
          loading.value = false;
        }, 300);
      }
    };
    const getTypeClass = (amount) => {
      return amount > 0 ? "income" : "expense";
    };
    const formatAmount = (val) => {
      return Math.abs(val).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const handleModalClose = () => {
      showRechargeModal.value = false;
      fetchWallet();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_tooltip = ElTooltip;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-page" }, _attrs))} data-v-bf9dce34><div class="asset-hero-card" data-v-bf9dce34><div class="hero-aurora-bg" data-v-bf9dce34></div><div class="hero-content" data-v-bf9dce34><div class="hero-header" data-v-bf9dce34><div class="header-main" data-v-bf9dce34><div class="card-icon-wrapper" data-v-bf9dce34>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(wallet_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(wallet_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-text" data-v-bf9dce34><span class="card-label" data-v-bf9dce34>\u6211\u7684\u989D\u5EA6</span><div class="card-tag" data-v-bf9dce34>My Quota</div></div></div>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "\u51E1\u56FE\u62C9\u989D\u5EA6\u4EC5\u7528\u4E8E\u5E73\u53F0\u5185\u670D\u52A1\u4F7F\u7528\uFF0C\u4E0D\u53EF\u63D0\u73B0\u6216\u8F6C\u8BA9",
        placement: "top",
        effect: "dark"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="info-btn" data-v-bf9dce34${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(warning_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(warning_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "info-btn" }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(warning_default))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="balance-display" data-v-bf9dce34><div class="balance-number" data-v-bf9dce34><span class="amount-integer" data-v-bf9dce34>${ssrInterpolate(balanceInteger.value)}</span><span class="amount-decimal" data-v-bf9dce34>.${ssrInterpolate(balanceDecimal.value)}</span></div><div class="balance-unit" data-v-bf9dce34>\u70B9</div></div><div class="hero-footer" data-v-bf9dce34><button class="neon-action-btn" data-v-bf9dce34>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(lightning_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(lightning_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-bf9dce34>\u7ACB\u5373\u5145\u503C</span><div class="btn-glow" data-v-bf9dce34></div></button></div></div>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "card-bg-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(wallet_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(wallet_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="ledger-section" data-v-bf9dce34><div class="ledger-header" data-v-bf9dce34><h3 class="section-title" data-v-bf9dce34>\u989D\u5EA6\u6D41\u6C34</h3><div class="glass-pill-tabs" data-v-bf9dce34><div class="${ssrRenderClass([{ active: activeTab.value === "all" }, "pill-tab"])}" data-v-bf9dce34>\u5168\u90E8</div><div class="${ssrRenderClass([{ active: activeTab.value === "income" }, "pill-tab income"])}" data-v-bf9dce34>\u83B7\u53D6</div><div class="${ssrRenderClass([{ active: activeTab.value === "expense" }, "pill-tab expense"])}" data-v-bf9dce34>\u6D88\u8017</div></div></div><div class="ledger-stream" data-v-bf9dce34>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: loading.value,
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        offset: 100
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !loading.value) {
              _push2(`<div class="stream-empty" data-v-bf9dce34${_scopeId}><div class="empty-bubble" data-v-bf9dce34${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(document_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(document_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><span data-v-bf9dce34${_scopeId}>\u6682\u65E0${ssrInterpolate(activeTab.value === "all" ? "" : activeTab.value === "income" ? "\u83B7\u53D6" : "\u6D88\u8017")}\u8BB0\u5F55</span></div>`);
            } else {
              _push2(`<div class="stream-list" data-v-bf9dce34${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item, index) => {
                _push2(`<div class="glass-stream-item" style="${ssrRenderStyle({ animationDelay: `${index * 0.05}s` })}" data-v-bf9dce34${_scopeId}><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-icon-box"])}" data-v-bf9dce34${_scopeId}>`);
                if (item.amount > 0) {
                  _push2(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(top_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(top_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(bottom_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(bottom_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                }
                _push2(`</div><div class="stream-content" data-v-bf9dce34${_scopeId}><div class="stream-title" data-v-bf9dce34${_scopeId}>${ssrInterpolate(item.description || item.type)}</div><div class="stream-date" data-v-bf9dce34${_scopeId}>${ssrInterpolate(formatDate(item.created_at))}</div></div><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-amount"])}" data-v-bf9dce34${_scopeId}>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(formatAmount(item.amount))} <span class="stream-unit" data-v-bf9dce34${_scopeId}>\u70B9</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !loading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "stream-empty"
              }, [
                createVNode("div", { class: "empty-bubble" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(document_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("span", null, "\u6682\u65E0" + toDisplayString(activeTab.value === "all" ? "" : activeTab.value === "income" ? "\u83B7\u53D6" : "\u6D88\u8017") + "\u8BB0\u5F55", 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "stream-list"
              }, [
                createVNode(TransitionGroup, { name: "list-fade" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item, index) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "glass-stream-item",
                        style: { animationDelay: `${index * 0.05}s` }
                      }, [
                        createVNode("div", {
                          class: ["stream-icon-box", getTypeClass(item.amount)]
                        }, [
                          item.amount > 0 ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(top_default))
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(bottom_default))
                            ]),
                            _: 1
                          }))
                        ], 2),
                        createVNode("div", { class: "stream-content" }, [
                          createVNode("div", { class: "stream-title" }, toDisplayString(item.description || item.type), 1),
                          createVNode("div", { class: "stream-date" }, toDisplayString(formatDate(item.created_at)), 1)
                        ]),
                        createVNode("div", {
                          class: ["stream-amount", getTypeClass(item.amount)]
                        }, [
                          createTextVNode(toDisplayString(item.amount > 0 ? "+" : "") + toDisplayString(formatAmount(item.amount)) + " ", 1),
                          createVNode("span", { class: "stream-unit" }, "\u70B9")
                        ], 2)
                      ], 4);
                    }), 128))
                  ]),
                  _: 1
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (showRechargeModal.value) {
        _push(ssrRenderComponent(WalletRechargeModal, {
          "initial-amount": Number(_ctx.$route.query.amount),
          onClose: handleModalClose
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/wallet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wallet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bf9dce34"]]);

export { wallet as default };
//# sourceMappingURL=wallet-Y2gEPhay.mjs.map
