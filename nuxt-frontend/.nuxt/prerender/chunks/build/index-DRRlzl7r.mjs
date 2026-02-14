import { E as ElIcon } from './index-D6MDXFfa.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { al as headset_default } from './index-CRs4T-Jf.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-Bw4czlEZ.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-BBaO6M-A.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const activeTab = ref("all");
    const allTickets = ref([]);
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "processing", label: "\u8FDB\u884C\u4E2D" },
      { key: "resolved", label: "\u5DF2\u89E3\u51B3" }
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
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u6211\u7684\u5DE5\u5355" }, null, _parent));
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
              _push2(`<p data-v-d8eb2cad${_scopeId}>\u6682\u65E0\u5DE5\u5355\u8BB0\u5F55</p></div>`);
            } else {
              _push2(`<div class="ticket-list" data-v-d8eb2cad${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (ticket) => {
                _push2(`<div class="info-card-glass ticket-card" data-v-d8eb2cad${_scopeId}><div class="ticket-header" data-v-d8eb2cad${_scopeId}><span class="ticket-id" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.shortId)}</span><span class="${ssrRenderClass([ticket.statusClass, "ticket-status"])}" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.statusText)}</span></div><div class="ticket-title" data-v-d8eb2cad${_scopeId}>${ssrInterpolate(ticket.content)}</div><div class="ticket-footer" data-v-d8eb2cad${_scopeId}><div class="ticket-meta" data-v-d8eb2cad${_scopeId}>`);
                if (ticket.productName) {
                  _push2(`<span data-v-d8eb2cad${_scopeId}>\u5173\u8054: ${ssrInterpolate(ticket.productName)}</span>`);
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
                createVNode("p", null, "\u6682\u65E0\u5DE5\u5355\u8BB0\u5F55")
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
                        ticket.productName ? (openBlock(), createBlock("span", { key: 0 }, "\u5173\u8054: " + toDisplayString(ticket.productName), 1)) : createCommentVNode("", true)
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

export { index as default };
//# sourceMappingURL=index-DRRlzl7r.mjs.map
