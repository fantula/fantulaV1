import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, TransitionGroup, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useUserStore, m as messageApi } from './user-C1i1UnhA.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-D4mXnhlO.mjs';
import { l as loading_default, $ as bell_default, S as warning_default, ab as chat_dot_round_default, ag as shopping_cart_default } from './index-DuV_oMrC.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
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
import './common-D9iMPQj0.mjs';
import './cart-B8xez9id.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "messages",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const markingAll = ref(false);
    const activeTab = ref("all");
    const unreadCount = ref(0);
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "unread", label: "\u672A\u8BFB" },
      { key: "order", label: "\u8BA2\u5355" },
      { key: "system", label: "\u7CFB\u7EDF" }
    ];
    const messages2 = ref([]);
    const filteredMessages = computed(() => {
      if (activeTab.value === "all") return messages2.value;
      if (activeTab.value === "unread") return messages2.value.filter((m) => !m.is_read);
      return messages2.value.filter((m) => m.type === activeTab.value);
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredMessages,
      pageSize: 10
    });
    const handleMessageClick = async (msg) => {
      if (!msg.is_read) {
        await messageApi.markAsRead(msg.id);
        msg.is_read = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
        await userStore.fetchUnreadMessageCount();
      }
    };
    const getIconClass = (type) => `type-${type}`;
    const getIconComponent = (type) => {
      const map = {
        system: bell_default,
        order: shopping_cart_default,
        activity: chat_dot_round_default,
        security: warning_default
      };
      return map[type] || bell_default;
    };
    const formatTime = (dateStr) => {
      const date = new Date(dateStr);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 6e4);
      const diffHours = Math.floor(diffMs / 36e5);
      const diffDays = Math.floor(diffMs / 864e5);
      if (diffMins < 1) return "\u521A\u521A";
      if (diffMins < 60) return `${diffMins} \u5206\u949F\u524D`;
      if (diffHours < 24) return `${diffHours} \u5C0F\u65F6\u524D`;
      if (diffDays < 7) return `${diffDays} \u5929\u524D`;
      return date.toLocaleDateString("zh-CN");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "messages-section" }, _attrs))} data-v-0f3b5b1a><div class="section-header" data-v-0f3b5b1a><div class="header-left" data-v-0f3b5b1a><h2 class="section-title" data-v-0f3b5b1a>\u6D88\u606F\u4E2D\u5FC3</h2><div class="section-subtitle" data-v-0f3b5b1a>Notifications</div></div>`);
      if (unref(displayList).length > 0) {
        _push(`<button class="read-all-btn"${ssrIncludeBooleanAttr(markingAll.value) ? " disabled" : ""} data-v-0f3b5b1a>`);
        if (markingAll.value) {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(loading_default))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<span data-v-0f3b5b1a>\u5168\u90E8\u5DF2\u8BFB</span>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="message-tabs" data-v-0f3b5b1a><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-0f3b5b1a>${ssrInterpolate(tab.label)} `);
        if (tab.key === "unread" && unreadCount.value > 0) {
          _push(`<div class="tab-unread-dot" data-v-0f3b5b1a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-0f3b5b1a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="message-list-container" data-v-0f3b5b1a>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading) && !unref(error)) {
              _push2(`<div class="empty-state" data-v-0f3b5b1a${_scopeId}><div class="empty-icon-wrap" data-v-0f3b5b1a${_scopeId}>`);
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
              _push2(`</div><div class="empty-text" data-v-0f3b5b1a${_scopeId}>\u6682\u65E0\u6D88\u606F</div><div class="empty-desc" data-v-0f3b5b1a${_scopeId}>\u6240\u6709\u901A\u77E5\u548C\u63D0\u9192\u90FD\u4F1A\u663E\u793A\u5728\u8FD9\u91CC</div></div>`);
            } else {
              _push2(`<div class="message-list" data-v-0f3b5b1a${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (msg) => {
                _push2(`<div class="${ssrRenderClass([{ unread: !msg.is_read }, "message-card"])}" data-v-0f3b5b1a${_scopeId}><div class="${ssrRenderClass([getIconClass(msg.type), "message-icon"])}" data-v-0f3b5b1a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(getIconComponent(msg.type)), null, null), _parent3, _scopeId2);
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(getIconComponent(msg.type))))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="message-content" data-v-0f3b5b1a${_scopeId}><div class="message-top" data-v-0f3b5b1a${_scopeId}><span class="message-title" data-v-0f3b5b1a${_scopeId}>${ssrInterpolate(msg.title)}</span><span class="message-time" data-v-0f3b5b1a${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div><div class="message-body" data-v-0f3b5b1a${_scopeId}>${ssrInterpolate(msg.content)}</div></div>`);
                if (!msg.is_read) {
                  _push2(`<div class="unread-dot" data-v-0f3b5b1a${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) && !unref(error) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode("div", { class: "empty-icon-wrap" }, [
                  createVNode(_component_el_icon, { class: "empty-icon" }, {
                    default: withCtx(() => [
                      createVNode(unref(bell_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "empty-text" }, "\u6682\u65E0\u6D88\u606F"),
                createVNode("div", { class: "empty-desc" }, "\u6240\u6709\u901A\u77E5\u548C\u63D0\u9192\u90FD\u4F1A\u663E\u793A\u5728\u8FD9\u91CC")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "message-list"
              }, [
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (msg) => {
                      return openBlock(), createBlock("div", {
                        key: msg.id,
                        class: ["message-card", { unread: !msg.is_read }],
                        onClick: ($event) => handleMessageClick(msg)
                      }, [
                        createVNode("div", {
                          class: ["message-icon", getIconClass(msg.type)]
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(getIconComponent(msg.type))))
                            ]),
                            _: 2
                          }, 1024)
                        ], 2),
                        createVNode("div", { class: "message-content" }, [
                          createVNode("div", { class: "message-top" }, [
                            createVNode("span", { class: "message-title" }, toDisplayString(msg.title), 1),
                            createVNode("span", { class: "message-time" }, toDisplayString(formatTime(msg.created_at)), 1)
                          ]),
                          createVNode("div", { class: "message-body" }, toDisplayString(msg.content), 1)
                        ]),
                        !msg.is_read ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "unread-dot"
                        })) : createCommentVNode("", true)
                      ], 10, ["onClick"]);
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f3b5b1a"]]);

export { messages as default };
//# sourceMappingURL=messages-DydPcYtN.mjs.map
