import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { a6 as headset_default } from "./index-CbQ9NNm4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useInfiniteScroll } from "./useInfiniteScroll-Cg7MWwox.js";
import { B as BaseInfiniteList } from "./BaseInfiniteList-hAmHFiQE.js";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-Na2GamiB.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const activeTab = ref("all");
    const allTickets = ref([]);
    const tabs = [
      { key: "all", label: "全部" },
      { key: "processing", label: "进行中" },
      { key: "resolved", label: "已解决" }
    ];
    const filteredList = computed(() => {
      if (activeTab.value === "all") return allTickets.value;
      return allTickets.value.filter((t) => t.status === activeTab.value);
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredList,
      pageSize: 10
    });
    const goToDetail = (id) => {
      router.push(`/mobile/profile/tickets/${id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-d8eb2cad>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "我的工单" }, null, _parent));
      _push(`<div class="tabs-header glass-tabs" data-v-d8eb2cad><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-d8eb2cad>${ssrInterpolate(tab.label)}</div>`);
      });
      _push(`<!--]--></div><div class="content-body" data-v-d8eb2cad>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-d8eb2cad${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(headset_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(headset_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-d8eb2cad${_scopeId}>暂无工单记录</p></div>`);
            } else {
              _push2(`<div class="ticket-list" data-v-d8eb2cad${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (ticket) => {
                _push2(`<div class="info-card-glass ticket-card" data-v-d8eb2cad${_scopeId}><div class="ticket-header" data-v-d8eb2cad${_scopeId}><span class="ticket-id" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.shortId)}</span><span class="${ssrRenderClass([ticket.statusClass, "ticket-status"])}" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.statusText)}</span></div><div class="ticket-title" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.content)}</div><div class="ticket-footer" data-v-d8eb2cad${_scopeId}><div class="ticket-meta" data-v-d8eb2cad${_scopeId}>`);
                if (ticket.productName) {
                  _push2(`<span data-v-d8eb2cad${_scopeId}>关联: ${ssrInterpolate(ticket.productName)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="ticket-time" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.time)}</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode(_component_el_icon, { class: "empty-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(headset_default))
                  ]),
                  _: 1
                }),
                createVNode("p", null, "暂无工单记录")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "ticket-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (ticket) => {
                  return openBlock(), createBlock("div", {
                    key: ticket.id,
                    class: "info-card-glass ticket-card",
                    onClick: ($event) => goToDetail(ticket.id)
                  }, [
                    createVNode("div", { class: "ticket-header" }, [
                      createVNode("span", { class: "ticket-id" }, toDisplayString(ticket.shortId), 1),
                      createVNode("span", {
                        class: ["ticket-status", ticket.statusClass]
                      }, toDisplayString(ticket.statusText), 3)
                    ]),
                    createVNode("div", { class: "ticket-title" }, toDisplayString(ticket.content), 1),
                    createVNode("div", { class: "ticket-footer" }, [
                      createVNode("div", { class: "ticket-meta" }, [
                        ticket.productName ? (openBlock(), createBlock("span", { key: 0 }, "关联: " + toDisplayString(ticket.productName), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "ticket-time" }, toDisplayString(ticket.time), 1)
                    ])
                  ], 8, ["onClick"]);
                }), 128))
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/tickets/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d8eb2cad"]]);
export {
  index as default
};
//# sourceMappingURL=index-Bv5u0TyP.js.map
