import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElTooltip } from "./index-D6r9Uwf3.js";
/* empty css              */
/* empty css                    */
/* empty css                   */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, TransitionGroup, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { W as WalletRechargeModal } from "./WalletRechargeModal-CGOnPK2n.js";
import { a as authApi } from "./auth-BCuS92ob.js";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { u as useInfiniteScroll, B as BaseInfiniteList } from "./BaseInfiniteList-pSsymcej.js";
import { T as wallet_default, P as warning_default, a9 as lightning_default, K as document_default, aa as top_default, ab as bottom_default } from "./index-4qszPKX4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "@popperjs/core";
import "./index-DqrhOzxH.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./constants-hAKFmBbq.js";
import "./BaseModal-HTOTXfQj.js";
import "./BaseButton-B3srPw2H.js";
/* empty css                    */
import "./virtual_public-CTq2VprR.js";
import "#internal/nuxt/paths";
import "./virtual_public-FTeKDcap.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
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
import "qrcode";
import "./interval-BHZX8LlC.js";
import "./index-CJUZrfXE.js";
import "./typescript-D6L75muK.js";
import "./icon-BcxG_YvU.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./index-CO6H4Lsj.js";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
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
      _push(`</div><div class="header-text" data-v-bf9dce34><span class="card-label" data-v-bf9dce34>我的额度</span><div class="card-tag" data-v-bf9dce34>My Quota</div></div></div>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "凡图拉额度仅用于平台内服务使用，不可提现或转让",
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
      _push(`</div><div class="balance-display" data-v-bf9dce34><div class="balance-number" data-v-bf9dce34><span class="amount-integer" data-v-bf9dce34>${ssrInterpolate(balanceInteger.value)}</span><span class="amount-decimal" data-v-bf9dce34>.${ssrInterpolate(balanceDecimal.value)}</span></div><div class="balance-unit" data-v-bf9dce34>点</div></div><div class="hero-footer" data-v-bf9dce34><button class="neon-action-btn" data-v-bf9dce34>`);
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
      _push(`<span data-v-bf9dce34>立即充值</span><div class="btn-glow" data-v-bf9dce34></div></button></div></div>`);
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
      _push(`</div><div class="ledger-section" data-v-bf9dce34><div class="ledger-header" data-v-bf9dce34><h3 class="section-title" data-v-bf9dce34>额度流水</h3><div class="glass-pill-tabs" data-v-bf9dce34><div class="${ssrRenderClass([{ active: activeTab.value === "all" }, "pill-tab"])}" data-v-bf9dce34>全部</div><div class="${ssrRenderClass([{ active: activeTab.value === "income" }, "pill-tab income"])}" data-v-bf9dce34>获取</div><div class="${ssrRenderClass([{ active: activeTab.value === "expense" }, "pill-tab expense"])}" data-v-bf9dce34>消耗</div></div></div><div class="ledger-stream" data-v-bf9dce34>`);
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
              _push2(`</div><span data-v-bf9dce34${_scopeId}>暂无${ssrInterpolate(activeTab.value === "all" ? "" : activeTab.value === "income" ? "获取" : "消耗")}记录</span></div>`);
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
                _push2(`</div><div class="stream-content" data-v-bf9dce34${_scopeId}><div class="stream-title" data-v-bf9dce34${_scopeId}>${ssrInterpolate(item.description || item.type)}</div><div class="stream-date" data-v-bf9dce34${_scopeId}>${ssrInterpolate(formatDate(item.created_at))}</div></div><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-amount"])}" data-v-bf9dce34${_scopeId}>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(formatAmount(item.amount))} <span class="stream-unit" data-v-bf9dce34${_scopeId}>点</span></div></div>`);
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
                createVNode("span", null, "暂无" + toDisplayString(activeTab.value === "all" ? "" : activeTab.value === "income" ? "获取" : "消耗") + "记录", 1)
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
                          createVNode("span", { class: "stream-unit" }, "点")
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
export {
  wallet as default
};
//# sourceMappingURL=wallet-Y2gEPhay.js.map
