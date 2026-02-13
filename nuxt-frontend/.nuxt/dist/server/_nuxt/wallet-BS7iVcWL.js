import { E as ElIcon } from "./index-CsSUb8pm.js";
/* empty css              */
import { defineComponent, defineAsyncComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { i as info_filled_default, ad as lightning_default } from "./index-DuV_oMrC.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-C1i1UnhA.js";
import { u as useInfiniteScroll } from "./useInfiniteScroll-Cg7MWwox.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { M as MobileInfiniteList } from "./MobileInfiniteList-D165vu5R.js";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-iRi1Uk9z.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
import "./common-D9iMPQj0.js";
import "./cart-B8xez9id.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    defineAsyncComponent(() => import("./RechargeModal-CDeMTilj.js"));
    useRouter();
    const userStore = useUserStore();
    const { formatDate } = useBizFormat();
    ref(false);
    const showTipModal = ref(false);
    const balance = computed(() => userStore.user?.balance || 0);
    const transactions = ref([]);
    ref(false);
    const currentTab = ref("all");
    const tabs = [
      { label: "全部", value: "all" },
      { label: "收入", value: "income" },
      { label: "支出", value: "expense" }
    ];
    const filteredTransactions = computed(() => {
      if (currentTab.value === "all") return transactions.value;
      if (currentTab.value === "income") return transactions.value.filter((t) => t.amount > 0);
      if (currentTab.value === "expense") return transactions.value.filter((t) => t.amount < 0);
      return transactions.value;
    });
    const { displayList, loading, finished, loadMore } = useInfiniteScroll({
      data: filteredTransactions,
      pageSize: 10
    });
    const showTip = () => {
      showTipModal.value = true;
    };
    const getAmountClass = (amt) => {
      return amt > 0 ? "text-green" : "text-white";
    };
    watch(currentTab, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-wallet-page" }, _attrs))} data-v-68cffb3a>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "我的额度" }, null, _parent));
      _push(`<div class="asset-card" data-v-68cffb3a><div class="aurora-bg" data-v-68cffb3a></div><div class="card-content" data-v-68cffb3a><div class="card-top" data-v-68cffb3a><span class="label" data-v-68cffb3a>当前可用额度</span>`);
      _push(ssrRenderComponent(_component_el_icon, {
        class: "info-icon",
        onClick: showTip
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(info_filled_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="balance-row" data-v-68cffb3a><span class="symbol" data-v-68cffb3a></span><span class="amount" data-v-68cffb3a>${ssrInterpolate(Number(balance.value).toFixed(2))}</span><span class="unit" data-v-68cffb3a>点</span></div><button class="recharge-btn" data-v-68cffb3a>`);
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
      _push(` 立即充值 </button></div></div><div class="transaction-section" data-v-68cffb3a><div class="tabs-row" data-v-68cffb3a><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: currentTab.value === tab.value }, "tab-pill"])}" data-v-68cffb3a>${ssrInterpolate(tab.label)}</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(MobileInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        list: unref(displayList),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(displayList), (item, index) => {
              _push2(`<div class="txn-item" data-v-68cffb3a${_scopeId}><div class="txn-left" data-v-68cffb3a${_scopeId}><div class="txn-title" data-v-68cffb3a${_scopeId}>${ssrInterpolate(item.description || "余额变动")}</div><div class="txn-time" data-v-68cffb3a${_scopeId}>${ssrInterpolate(unref(formatDate)(item.createdAt))}</div></div><div class="${ssrRenderClass([getAmountClass(item.amount), "txn-right"])}" data-v-68cffb3a${_scopeId}>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(Number(item.amount).toFixed(2))}</div></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item, index) => {
                return openBlock(), createBlock("div", {
                  class: "txn-item",
                  key: index
                }, [
                  createVNode("div", { class: "txn-left" }, [
                    createVNode("div", { class: "txn-title" }, toDisplayString(item.description || "余额变动"), 1),
                    createVNode("div", { class: "txn-time" }, toDisplayString(unref(formatDate)(item.createdAt)), 1)
                  ]),
                  createVNode("div", {
                    class: ["txn-right", getAmountClass(item.amount)]
                  }, toDisplayString(item.amount > 0 ? "+" : "") + toDisplayString(Number(item.amount).toFixed(2)), 3)
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showTipModal.value) {
          _push2(`<div class="modal-overlay" data-v-68cffb3a><div class="tip-content" data-v-68cffb3a><div class="tip-header" data-v-68cffb3a>`);
          _push2(ssrRenderComponent(_component_el_icon, { class: "tip-icon" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(info_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-68cffb3a>额度说明</span></div><div class="tip-body" data-v-68cffb3a> 凡图拉额度仅用于平台内服务使用，不可提现或转让。 </div><div class="tip-footer" data-v-68cffb3a><button class="modal-confirm-btn" data-v-68cffb3a>我知道了</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/wallet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wallet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-68cffb3a"]]);
export {
  wallet as default
};
//# sourceMappingURL=wallet-BS7iVcWL.js.map
