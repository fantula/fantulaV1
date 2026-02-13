import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { i as info_filled_default, ad as lightning_default } from './index-DuV_oMrC.mjs';
import { u as useUserStore } from './user-C1i1UnhA.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { M as MobileInfiniteList } from './MobileInfiniteList-D165vu5R.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-iRi1Uk9z.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vueuse/core';
import '@vue/shared';
import './objects-Bz74KHmq.mjs';
import 'lodash-unified';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
import './common-D9iMPQj0.mjs';
import './cart-B8xez9id.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    defineAsyncComponent(() => import('./RechargeModal-CDeMTilj.mjs'));
    useRouter();
    const userStore = useUserStore();
    const { formatDate } = useBizFormat();
    ref(false);
    const showTipModal = ref(false);
    const balance = computed(() => {
      var _a;
      return ((_a = userStore.user) == null ? void 0 : _a.balance) || 0;
    });
    const transactions = ref([]);
    ref(false);
    const currentTab = ref("all");
    const tabs = [
      { label: "\u5168\u90E8", value: "all" },
      { label: "\u6536\u5165", value: "income" },
      { label: "\u652F\u51FA", value: "expense" }
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
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u6211\u7684\u989D\u5EA6" }, null, _parent));
      _push(`<div class="asset-card" data-v-68cffb3a><div class="aurora-bg" data-v-68cffb3a></div><div class="card-content" data-v-68cffb3a><div class="card-top" data-v-68cffb3a><span class="label" data-v-68cffb3a>\u5F53\u524D\u53EF\u7528\u989D\u5EA6</span>`);
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
      _push(`</div><div class="balance-row" data-v-68cffb3a><span class="symbol" data-v-68cffb3a></span><span class="amount" data-v-68cffb3a>${ssrInterpolate(Number(balance.value).toFixed(2))}</span><span class="unit" data-v-68cffb3a>\u70B9</span></div><button class="recharge-btn" data-v-68cffb3a>`);
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
      _push(` \u7ACB\u5373\u5145\u503C </button></div></div><div class="transaction-section" data-v-68cffb3a><div class="tabs-row" data-v-68cffb3a><!--[-->`);
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
              _push2(`<div class="txn-item" data-v-68cffb3a${_scopeId}><div class="txn-left" data-v-68cffb3a${_scopeId}><div class="txn-title" data-v-68cffb3a${_scopeId}>${ssrInterpolate(item.description || "\u4F59\u989D\u53D8\u52A8")}</div><div class="txn-time" data-v-68cffb3a${_scopeId}>${ssrInterpolate(unref(formatDate)(item.createdAt))}</div></div><div class="${ssrRenderClass([getAmountClass(item.amount), "txn-right"])}" data-v-68cffb3a${_scopeId}>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(Number(item.amount).toFixed(2))}</div></div>`);
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
                    createVNode("div", { class: "txn-title" }, toDisplayString(item.description || "\u4F59\u989D\u53D8\u52A8"), 1),
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
          _push2(`<span data-v-68cffb3a>\u989D\u5EA6\u8BF4\u660E</span></div><div class="tip-body" data-v-68cffb3a> \u51E1\u56FE\u62C9\u989D\u5EA6\u4EC5\u7528\u4E8E\u5E73\u53F0\u5185\u670D\u52A1\u4F7F\u7528\uFF0C\u4E0D\u53EF\u63D0\u73B0\u6216\u8F6C\u8BA9\u3002 </div><div class="tip-footer" data-v-68cffb3a><button class="modal-confirm-btn" data-v-68cffb3a>\u6211\u77E5\u9053\u4E86</button></div></div></div>`);
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

export { wallet as default };
//# sourceMappingURL=wallet-BS7iVcWL.mjs.map
