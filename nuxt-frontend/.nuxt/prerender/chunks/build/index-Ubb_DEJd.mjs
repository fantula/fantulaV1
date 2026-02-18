import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, unref, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { G as bell_default, S as chat_dot_round_default, v as warning_default, $ as shopping_cart_default } from './index-DNnPa_Q9.mjs';
import { u as useUserStore, m as messageApi } from './user-CctDsbAN.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-Dt0cDKAc.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-4aDAI7XP.mjs';
import { u as useToast } from './useToast-DsT-1f4c.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const { showToast } = useToast();
    const activeTab = ref("all");
    const unreadCount = ref(0);
    const markingAll = ref(false);
    const infiniteListRef = ref();
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "unread", label: "\u672A\u8BFB" },
      { key: "order", label: "\u8BA2\u5355" },
      { key: "system", label: "\u7CFB\u7EDF" }
    ];
    const fetchMessages = async (page, size) => {
      const res = await messageApi.getMessages(page, size);
      if (res.success && res.data) {
        let list = res.data.messages || [];
        if (activeTab.value === "unread") {
          list = list.filter((m) => !m.is_read);
        } else if (activeTab.value !== "all") {
          list = list.filter((m) => m.type === activeTab.value);
        }
        return {
          list,
          hasMore: list.length > 0,
          // Approx
          total: res.data.total
        };
      }
      return { list: [], hasMore: false };
    };
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      fetchData: fetchMessages,
      pageSize: 20
    });
    const handleClick = async (msg) => {
      if (!msg.is_read) {
        await messageApi.markAsRead(msg.id);
        msg.is_read = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
        userStore.fetchUnreadMessageCount();
      }
    };
    const handleReadAll = async () => {
      if (markingAll.value) return;
      markingAll.value = true;
      try {
        const res = await messageApi.markAllAsRead();
        if (res.success) {
          showToast("\u5168\u90E8\u5DF2\u8BFB", "success");
          displayList.value.forEach((m) => m.is_read = true);
          unreadCount.value = 0;
          userStore.fetchUnreadMessageCount();
        }
      } finally {
        markingAll.value = false;
      }
    };
    const getIcon = (type) => {
      const map = {
        order: shopping_cart_default,
        security: warning_default,
        activity: chat_dot_round_default,
        system: bell_default
      };
      return map[type] || bell_default;
    };
    const formatTime = (dateStr) => {
      const date = new Date(dateStr);
      const now = /* @__PURE__ */ new Date();
      const diff = (now.getTime() - date.getTime()) / 1e3 / 60;
      if (diff < 1) return "\u521A\u521A";
      if (diff < 60) return `${Math.floor(diff)}\u5206\u949F\u524D`;
      const hours = diff / 60;
      if (hours < 24) return `${Math.floor(hours)}\u5C0F\u65F6\u524D`;
      return `${date.getMonth() + 1}-${date.getDate()}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-2f39f4b0>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u6D88\u606F\u4E2D\u5FC3" }, {
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([{ disabled: markingAll.value }, "read-all-btn"])}" data-v-2f39f4b0${_scopeId}>${ssrInterpolate(markingAll.value ? "..." : "\u5DF2\u8BFB")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["read-all-btn", { disabled: markingAll.value }],
                onClick: handleReadAll
              }, toDisplayString(markingAll.value ? "..." : "\u5DF2\u8BFB"), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tabs-header glass-tabs" data-v-2f39f4b0><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-2f39f4b0>${ssrInterpolate(tab.label)} `);
        if (tab.key === "unread" && unreadCount.value > 0) {
          _push(`<span class="dot" data-v-2f39f4b0></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="content-body" data-v-2f39f4b0>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        ref_key: "infiniteListRef",
        ref: infiniteListRef
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-2f39f4b0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(bell_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(bell_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-2f39f4b0${_scopeId}>\u6682\u65E0\u6D88\u606F</p></div>`);
            } else {
              _push2(`<div class="message-list" data-v-2f39f4b0${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (msg) => {
                _push2(`<div class="${ssrRenderClass([{ "is-unread": !msg.is_read }, "info-card-glass message-card"])}" data-v-2f39f4b0${_scopeId}><div class="${ssrRenderClass([msg.type, "msg-icon"])}" data-v-2f39f4b0${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(getIcon(msg.type)), null, null), _parent3, _scopeId2);
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(getIcon(msg.type))))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="msg-content" data-v-2f39f4b0${_scopeId}><div class="msg-top" data-v-2f39f4b0${_scopeId}><span class="msg-title" data-v-2f39f4b0${_scopeId}>${ssrInterpolate(msg.title)}</span><span class="msg-time" data-v-2f39f4b0${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div><div class="msg-body" data-v-2f39f4b0${_scopeId}>${ssrInterpolate(msg.content)}</div></div>`);
                if (!msg.is_read) {
                  _push2(`<div class="unread-dot" data-v-2f39f4b0${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
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
                    createVNode(unref(bell_default))
                  ]),
                  _: 1
                }),
                createVNode("p", null, "\u6682\u65E0\u6D88\u606F")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "message-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (msg) => {
                  return openBlock(), createBlock("div", {
                    key: msg.id,
                    class: ["info-card-glass message-card", { "is-unread": !msg.is_read }],
                    onClick: ($event) => handleClick(msg)
                  }, [
                    createVNode("div", {
                      class: ["msg-icon", msg.type]
                    }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(getIcon(msg.type))))
                        ]),
                        _: 2
                      }, 1024)
                    ], 2),
                    createVNode("div", { class: "msg-content" }, [
                      createVNode("div", { class: "msg-top" }, [
                        createVNode("span", { class: "msg-title" }, toDisplayString(msg.title), 1),
                        createVNode("span", { class: "msg-time" }, toDisplayString(formatTime(msg.created_at)), 1)
                      ]),
                      createVNode("div", { class: "msg-body" }, toDisplayString(msg.content), 1)
                    ]),
                    !msg.is_read ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "unread-dot"
                    })) : createCommentVNode("", true)
                  ], 10, ["onClick"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/messages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f39f4b0"]]);

export { index as default };
//# sourceMappingURL=index-Ubb_DEJd.mjs.map
