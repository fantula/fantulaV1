import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { ag as headset_default } from './index-DlETah8a.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-64au3mej.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-yXUwt-_q.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
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
//# sourceMappingURL=index-DGGLpA20.mjs.map
