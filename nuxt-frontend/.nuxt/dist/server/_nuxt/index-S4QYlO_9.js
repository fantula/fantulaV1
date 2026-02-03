import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { h as arrow_left_default, X as bell_default, _ as chat_dot_round_default, P as warning_default, ae as shopping_cart_default } from "./index-4qszPKX4.js";
import { u as useUserStore, m as messageApi } from "./user-CzJGyf4T.js";
import { u as useInfiniteScroll, B as BaseInfiniteList } from "./BaseInfiniteList-pSsymcej.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./auth-BCuS92ob.js";
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
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const userStore = useUserStore();
    const activeTab = ref("all");
    const unreadCount = ref(0);
    const markingAll = ref(false);
    const infiniteListRef = ref();
    const tabs = [
      { key: "all", label: "全部" },
      { key: "unread", label: "未读" },
      { key: "order", label: "订单" },
      { key: "system", label: "系统" }
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
      if (diff < 1) return "刚刚";
      if (diff < 60) return `${Math.floor(diff)}分钟前`;
      const hours = diff / 60;
      if (hours < 24) return `${Math.floor(hours)}小时前`;
      return `${date.getMonth() + 1}-${date.getDate()}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-e255fbb6><div class="page-header" data-v-e255fbb6><div class="back-btn" data-v-e255fbb6>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h1 class="page-title" data-v-e255fbb6>消息中心</h1><div class="header-right" data-v-e255fbb6><span class="${ssrRenderClass([{ disabled: markingAll.value }, "read-all-btn"])}" data-v-e255fbb6>${ssrInterpolate(markingAll.value ? "..." : "已读")}</span></div></div><div class="tabs-header" data-v-e255fbb6><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-e255fbb6>${ssrInterpolate(tab.label)} `);
        if (tab.key === "unread" && unreadCount.value > 0) {
          _push(`<span class="dot" data-v-e255fbb6></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="content-body" data-v-e255fbb6>`);
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
              _push2(`<div class="empty-state" data-v-e255fbb6${_scopeId}>`);
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
              _push2(`<p data-v-e255fbb6${_scopeId}>暂无消息</p></div>`);
            } else {
              _push2(`<div class="message-list" data-v-e255fbb6${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (msg) => {
                _push2(`<div class="${ssrRenderClass([{ "is-unread": !msg.is_read }, "message-card"])}" data-v-e255fbb6${_scopeId}><div class="${ssrRenderClass([msg.type, "msg-icon"])}" data-v-e255fbb6${_scopeId}>`);
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
                _push2(`</div><div class="msg-content" data-v-e255fbb6${_scopeId}><div class="msg-top" data-v-e255fbb6${_scopeId}><span class="msg-title" data-v-e255fbb6${_scopeId}>${ssrInterpolate(msg.title)}</span><span class="msg-time" data-v-e255fbb6${_scopeId}>${ssrInterpolate(formatTime(msg.created_at))}</span></div><div class="msg-body" data-v-e255fbb6${_scopeId}>${ssrInterpolate(msg.content)}</div></div>`);
                if (!msg.is_read) {
                  _push2(`<div class="unread-dot" data-v-e255fbb6${_scopeId}></div>`);
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
                createVNode("p", null, "暂无消息")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "message-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (msg) => {
                  return openBlock(), createBlock("div", {
                    key: msg.id,
                    class: ["message-card", { "is-unread": !msg.is_read }],
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e255fbb6"]]);
export {
  index as default
};
//# sourceMappingURL=index-S4QYlO_9.js.map
