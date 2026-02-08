import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, TransitionGroup, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import { u as useUserStore, m as messageApi } from './user-Cnuc6I82.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-64au3mej.mjs';
import { l as loading_default, V as bell_default, M as warning_default, a5 as chat_dot_round_default, aa as shopping_cart_default } from './index-DlETah8a.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
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
import 'vue-router';
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
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';

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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "messages-section" }, _attrs))} data-v-ca555af4><div class="section-header" data-v-ca555af4><div class="header-left" data-v-ca555af4><h2 class="section-title" data-v-ca555af4>\u6D88\u606F\u4E2D\u5FC3</h2><div class="section-subtitle" data-v-ca555af4>Notifications</div></div>`);
      if (unref(displayList).length > 0) {
        _push(`<button class="read-all-btn"${ssrIncludeBooleanAttr(markingAll.value) ? " disabled" : ""} data-v-ca555af4>`);
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
          _push(`<span data-v-ca555af4>\u5168\u90E8\u5DF2\u8BFB</span>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="message-tabs" data-v-ca555af4><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-ca555af4>${ssrInterpolate(tab.label)} `);
        if (tab.key === "unread" && unreadCount.value > 0) {
          _push(`<div class="tab-unread-dot" data-v-ca555af4></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-ca555af4></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="message-list-container" data-v-ca555af4>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading) && !unref(error)) {
              _push2(`<div class="empty-state" data-v-ca555af4${_scopeId}><div class="empty-icon-wrap" data-v-ca555af4${_scopeId}>`);
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
              _push2(`</div><div class="empty-text" data-v-ca555af4${_scopeId}>\u6682\u65E0\u6D88\u606F</div><div class="empty-desc" data-v-ca555af4${_scopeId}>\u6240\u6709\u901A\u77E5\u548C\u63D0\u9192\u90FD\u4F1A\u663E\u793A\u5728\u8FD9\u91CC</div></div>`);
            } else {
              _push2(`<div class="message-list" data-v-ca555af4${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (msg) => {
                _push2(`<div class="${ssrRenderClass([{ unread: !msg.is_read }, "message-card"])}" data-v-ca555af4${_scopeId}><div class="${ssrRenderClass([getIconClass(msg.type), "message-icon"])}" data-v-ca555af4${_scopeId}>`);
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
                _push2(`</div><div class="message-content" data-v-ca555af4${_scopeId}><div class="message-top" data-v-ca555af4${_scopeId}><span class="message-title" data-v-ca555af4${_scopeId}>${ssrInterpolate(msg.title)}</span><span class="message-time" data-v-ca555af4${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div><div class="message-body" data-v-ca555af4${_scopeId}>${ssrInterpolate(msg.content)}</div></div>`);
                if (!msg.is_read) {
                  _push2(`<div class="unread-dot" data-v-ca555af4${_scopeId}></div>`);
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
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca555af4"]]);

export { messages as default };
//# sourceMappingURL=messages-D58gtHUK.mjs.map
