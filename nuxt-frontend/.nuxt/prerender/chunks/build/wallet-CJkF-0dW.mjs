import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, TransitionGroup, Fragment, renderList, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useUserStore, a as authApi } from './user-CctDsbAN.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';
import { E as ElTooltip } from './index-bphs7bB3.mjs';
import { C as wallet_default, v as warning_default, X as lightning_default, q as document_default, Y as top_default, Z as bottom_default } from './index-DNnPa_Q9.mjs';
import { u as useBizFormat } from './useBizFormat-D_CzFEgD.mjs';
import { _ as _export_sfc } from './server.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-Dt0cDKAc.mjs';
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
import './common-Bgv_wRgd.mjs';
import './cart-CDhPH3qi.mjs';
import './base-CEWXqFm3.mjs';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Cxdfotkm.mjs';
import './index-ByGmkA5C.mjs';
import './event-D3FEo2C5.mjs';
import './aria-Rs9hkxop.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './constants-hAKFmBbq.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AssetHeroCard",
  __ssrInlineRender: true,
  props: {
    balance: {}
  },
  emits: ["recharge"],
  setup(__props) {
    const props = __props;
    const { formatPrice } = useBizFormat();
    const balanceInteger = computed(() => {
      const formatted = formatPrice(props.balance);
      return formatted.split(".")[0];
    });
    const balanceDecimal = computed(() => {
      const formatted = formatPrice(props.balance);
      return formatted.split(".")[1] || "00";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_tooltip = ElTooltip;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "asset-hero-card" }, _attrs))} data-v-4fa12610><div class="hero-aurora-bg" data-v-4fa12610></div><div class="hero-content" data-v-4fa12610><div class="hero-header" data-v-4fa12610><div class="header-main" data-v-4fa12610><div class="card-icon-wrapper" data-v-4fa12610>`);
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
      _push(`</div><div class="header-text" data-v-4fa12610><span class="card-label" data-v-4fa12610>\u6211\u7684\u989D\u5EA6</span><div class="card-tag" data-v-4fa12610>My Quota</div></div></div>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "\u51E1\u56FE\u62C9\u989D\u5EA6\u4EC5\u7528\u4E8E\u5E73\u53F0\u5185 service \u4F7F\u7528\uFF0C\u4E0D\u53EF\u63D0\u73B0\u6216\u8F6C\u8BA9",
        placement: "top",
        effect: "dark"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="info-btn" data-v-4fa12610${_scopeId}>`);
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
      _push(`</div><div class="balance-display" data-v-4fa12610><div class="balance-number" data-v-4fa12610><span class="amount-integer" data-v-4fa12610>${ssrInterpolate(balanceInteger.value)}</span><span class="amount-decimal" data-v-4fa12610>.${ssrInterpolate(balanceDecimal.value)}</span></div><div class="balance-unit" data-v-4fa12610>\u70B9</div></div><div class="hero-footer" data-v-4fa12610><button class="neon-action-btn" data-v-4fa12610>`);
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
      _push(`<span data-v-4fa12610>\u7ACB\u5373\u5145\u503C</span><div class="btn-glow" data-v-4fa12610></div></button></div></div>`);
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/wallet/AssetHeroCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AssetHeroCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4fa12610"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WalletLedger",
  __ssrInlineRender: true,
  props: {
    displayList: {},
    loading: { type: Boolean },
    finished: { type: Boolean },
    error: { type: Boolean },
    activeTab: {}
  },
  emits: ["loadMore", "switchTab"],
  setup(__props, { emit: __emit }) {
    const { formatDate } = useBizFormat();
    const getTypeClass = (amount) => {
      return amount > 0 ? "income" : "expense";
    };
    const formatAmount = (val) => {
      return Math.abs(Number(val)).toFixed(2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ledger-section" }, _attrs))} data-v-f08be406><div class="ledger-header" data-v-f08be406><h3 class="section-title" data-v-f08be406>\u989D\u5EA6\u6D41\u6C34</h3><div class="glass-pill-tabs" data-v-f08be406><div class="${ssrRenderClass([{ active: __props.activeTab === "all" }, "pill-tab"])}" data-v-f08be406>\u5168\u90E8</div><div class="${ssrRenderClass([{ active: __props.activeTab === "income" }, "pill-tab income"])}" data-v-f08be406>\u83B7\u53D6</div><div class="${ssrRenderClass([{ active: __props.activeTab === "expense" }, "pill-tab expense"])}" data-v-f08be406>\u6D88\u8017</div></div></div><div class="ledger-stream" data-v-f08be406>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: __props.loading,
        finished: __props.finished,
        error: __props.error,
        onLoad: ($event) => _ctx.$emit("loadMore"),
        offset: 100
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.displayList.length === 0 && !__props.loading) {
              _push2(`<div class="stream-empty" data-v-f08be406${_scopeId}><div class="empty-bubble" data-v-f08be406${_scopeId}>`);
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
              _push2(`</div><span data-v-f08be406${_scopeId}>\u6682\u65E0${ssrInterpolate(__props.activeTab === "all" ? "" : __props.activeTab === "income" ? "\u83B7\u53D6" : "\u6D88\u8017")}\u8BB0\u5F55</span></div>`);
            } else {
              _push2(`<div class="stream-list" data-v-f08be406${_scopeId}><!--[-->`);
              ssrRenderList(__props.displayList, (item, index) => {
                _push2(`<div class="glass-stream-item" style="${ssrRenderStyle({ animationDelay: `${index * 0.05}s` })}" data-v-f08be406${_scopeId}><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-icon-box"])}" data-v-f08be406${_scopeId}>`);
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
                _push2(`</div><div class="stream-content" data-v-f08be406${_scopeId}><div class="stream-title" data-v-f08be406${_scopeId}>${ssrInterpolate(item.description || item.type)}</div><div class="stream-date" data-v-f08be406${_scopeId}>${ssrInterpolate(unref(formatDate)(item.created_at))}</div></div><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-amount"])}" data-v-f08be406${_scopeId}>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(formatAmount(item.amount))} <span class="stream-unit" data-v-f08be406${_scopeId}>\u70B9</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              __props.displayList.length === 0 && !__props.loading ? (openBlock(), createBlock("div", {
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
                createVNode("span", null, "\u6682\u65E0" + toDisplayString(__props.activeTab === "all" ? "" : __props.activeTab === "income" ? "\u83B7\u53D6" : "\u6D88\u8017") + "\u8BB0\u5F55", 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "stream-list"
              }, [
                createVNode(TransitionGroup, { name: "list-fade" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.displayList, (item, index) => {
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
                          createVNode("div", { class: "stream-date" }, toDisplayString(unref(formatDate)(item.created_at)), 1)
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
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/wallet/WalletLedger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WalletLedger = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f08be406"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    const WalletRechargeModal = defineAsyncComponent(() => import('./WalletRechargeModal-DCQhsplf.mjs'));
    useUserStore();
    useRoute();
    const showRechargeModal = ref(false);
    const balance = ref(0);
    const transactions = ref([]);
    const loading = ref(true);
    const activeTab = ref("all");
    const filteredTransactions = computed(() => {
      if (activeTab.value === "all") return transactions.value;
      if (activeTab.value === "income") return transactions.value.filter((t) => t.amount > 0);
      if (activeTab.value === "expense") return transactions.value.filter((t) => t.amount < 0);
      return transactions.value;
    });
    const { displayList, loading: listLoading, finished, error, loadMore } = useInfiniteScroll({
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
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    const handleModalClose = () => {
      showRechargeModal.value = false;
      fetchWallet();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-page" }, _attrs))} data-v-8c8bd966>`);
      _push(ssrRenderComponent(AssetHeroCard, {
        balance: balance.value,
        onRecharge: ($event) => showRechargeModal.value = true
      }, null, _parent));
      _push(ssrRenderComponent(WalletLedger, {
        displayList: unref(displayList),
        loading: unref(listLoading),
        finished: unref(finished),
        error: unref(error),
        activeTab: activeTab.value,
        onSwitchTab: switchTab,
        onLoadMore: unref(loadMore)
      }, null, _parent));
      if (showRechargeModal.value) {
        _push(ssrRenderComponent(unref(WalletRechargeModal), {
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
const wallet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c8bd966"]]);

export { wallet as default };
//# sourceMappingURL=wallet-CJkF-0dW.mjs.map
