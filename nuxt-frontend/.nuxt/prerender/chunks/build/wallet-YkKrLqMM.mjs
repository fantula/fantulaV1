import { _ as _export_sfc, d as useUserStore, E as ElIcon, a5 as wallet_default, a2 as warning_default, az as lightning_default, $ as document_default, aA as top_default, aB as bottom_default, ac as authApi } from './server.mjs';
import { E as ElTooltip } from './index-CIoWkt90.mjs';
import { E as ElSkeleton } from './index-BXD0oWDt.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { W as WalletRechargeModal } from './WalletRechargeModal-BlA6TVen.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './constants-hAKFmBbq.mjs';

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
      _push(`</div><div class="header-text" data-v-6affe454><span class="card-label" data-v-6affe454>\u6211\u7684\u989D\u5EA6</span><div class="card-tag" data-v-6affe454>My Quota</div></div></div>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "\u51E1\u56FE\u62C9\u989D\u5EA6\u4EC5\u7528\u4E8E\u5E73\u53F0\u5185\u670D\u52A1\u4F7F\u7528\uFF0C\u4E0D\u53EF\u63D0\u73B0\u6216\u8F6C\u8BA9",
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
      _push(`</div><div class="balance-display" data-v-6affe454><div class="balance-number" data-v-6affe454><span class="amount-integer" data-v-6affe454>${ssrInterpolate(balanceInteger.value)}</span><span class="amount-decimal" data-v-6affe454>.${ssrInterpolate(balanceDecimal.value)}</span></div><div class="balance-unit" data-v-6affe454>\u70B9</div></div><div class="hero-footer" data-v-6affe454><button class="neon-action-btn" data-v-6affe454>`);
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
      _push(`<span data-v-6affe454>\u7ACB\u5373\u5145\u503C</span><div class="btn-glow" data-v-6affe454></div></button></div></div>`);
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
      _push(`</div><div class="ledger-section" data-v-6affe454><div class="ledger-header" data-v-6affe454><h3 class="section-title" data-v-6affe454>\u989D\u5EA6\u6D41\u6C34</h3><div class="glass-pill-tabs" data-v-6affe454><div class="${ssrRenderClass([{ active: activeTab.value === "all" }, "pill-tab"])}" data-v-6affe454>\u5168\u90E8</div><div class="${ssrRenderClass([{ active: activeTab.value === "income" }, "pill-tab income"])}" data-v-6affe454>\u83B7\u53D6</div><div class="${ssrRenderClass([{ active: activeTab.value === "expense" }, "pill-tab expense"])}" data-v-6affe454>\u6D88\u8017</div></div></div><div class="ledger-stream" data-v-6affe454>`);
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
        _push(`</div><span data-v-6affe454>\u6682\u65E0${ssrInterpolate(activeTab.value === "all" ? "" : activeTab.value === "income" ? "\u83B7\u53D6" : "\u6D88\u8017")}\u8BB0\u5F55</span></div>`);
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
          _push(`</div><div class="stream-content" data-v-6affe454><div class="stream-title" data-v-6affe454>${ssrInterpolate(item.description || item.type)}</div><div class="stream-date" data-v-6affe454>${ssrInterpolate(formatDate(item.created_at))}</div></div><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-amount"])}" data-v-6affe454>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(formatAmount(item.amount))} <span class="stream-unit" data-v-6affe454>\u70B9</span></div></div>`);
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

export { wallet as default };
//# sourceMappingURL=wallet-YkKrLqMM.mjs.map
