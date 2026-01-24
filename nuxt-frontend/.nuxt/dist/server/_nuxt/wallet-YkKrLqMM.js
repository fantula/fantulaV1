import { d as useUserStore, E as ElIcon, a5 as wallet_default, a2 as warning_default, az as lightning_default, $ as document_default, aA as top_default, aB as bottom_default, ac as authApi, _ as _export_sfc } from "../server.mjs";
import { E as ElTooltip } from "./index-CIoWkt90.js";
import { E as ElSkeleton } from "./index-BXD0oWDt.js";
/* empty css                    */
/* empty css                   */
/* empty css                          */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { W as WalletRechargeModal } from "./WalletRechargeModal-BlA6TVen.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "@popperjs/core";
import "./index-Dxw_X3Hq.js";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./constants-hAKFmBbq.js";
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
      const _component_el_skeleton = ElSkeleton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-page" }, _attrs))} data-v-6affe454><div class="asset-hero-card" data-v-6affe454><div class="hero-aurora-bg" data-v-6affe454></div><div class="hero-content" data-v-6affe454><div class="hero-header" data-v-6affe454><div class="header-main" data-v-6affe454><div class="card-icon-wrapper" data-v-6affe454>`);
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
      _push(`</div><div class="header-text" data-v-6affe454><span class="card-label" data-v-6affe454>我的额度</span><div class="card-tag" data-v-6affe454>My Quota</div></div></div>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "凡图拉额度仅用于平台内服务使用，不可提现或转让",
        placement: "top",
        effect: "dark"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="info-btn" data-v-6affe454${_scopeId}>`);
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
      _push(`</div><div class="balance-display" data-v-6affe454><div class="balance-number" data-v-6affe454><span class="amount-integer" data-v-6affe454>${ssrInterpolate(balanceInteger.value)}</span><span class="amount-decimal" data-v-6affe454>.${ssrInterpolate(balanceDecimal.value)}</span></div><div class="balance-unit" data-v-6affe454>点</div></div><div class="hero-footer" data-v-6affe454><button class="neon-action-btn" data-v-6affe454>`);
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
      _push(`<span data-v-6affe454>立即充值</span><div class="btn-glow" data-v-6affe454></div></button></div></div>`);
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
      _push(`</div><div class="ledger-section" data-v-6affe454><div class="ledger-header" data-v-6affe454><h3 class="section-title" data-v-6affe454>额度流水</h3><div class="glass-pill-tabs" data-v-6affe454><div class="${ssrRenderClass([{ active: activeTab.value === "all" }, "pill-tab"])}" data-v-6affe454>全部</div><div class="${ssrRenderClass([{ active: activeTab.value === "income" }, "pill-tab income"])}" data-v-6affe454>获取</div><div class="${ssrRenderClass([{ active: activeTab.value === "expense" }, "pill-tab expense"])}" data-v-6affe454>消耗</div></div></div><div class="ledger-stream" data-v-6affe454>`);
      if (loading.value) {
        _push(`<div class="stream-loading" data-v-6affe454>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          animated: "",
          rows: 3
        }, null, _parent));
        _push(`</div>`);
      } else if (filteredTransactions.value.length === 0) {
        _push(`<div class="stream-empty" data-v-6affe454><div class="empty-bubble" data-v-6affe454>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(document_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><span data-v-6affe454>暂无${ssrInterpolate(activeTab.value === "all" ? "" : activeTab.value === "income" ? "获取" : "消耗")}记录</span></div>`);
      } else {
        _push(`<div class="stream-list" data-v-6affe454><!--[-->`);
        ssrRenderList(filteredTransactions.value, (item, index) => {
          _push(`<div class="glass-stream-item" style="${ssrRenderStyle({ animationDelay: `${index * 0.05}s` })}" data-v-6affe454><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-icon-box"])}" data-v-6affe454>`);
          if (item.amount > 0) {
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(top_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(top_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(bottom_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(bottom_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`</div><div class="stream-content" data-v-6affe454><div class="stream-title" data-v-6affe454>${ssrInterpolate(item.description || item.type)}</div><div class="stream-date" data-v-6affe454>${ssrInterpolate(formatDate(item.created_at))}</div></div><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-amount"])}" data-v-6affe454>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(formatAmount(item.amount))} <span class="stream-unit" data-v-6affe454>点</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/wallet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wallet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6affe454"]]);
export {
  wallet as default
};
//# sourceMappingURL=wallet-YkKrLqMM.js.map
