import { _ as _export_sfc, E as ElIcon, l as loading_default, a9 as bell_default, aO as right_default, a2 as warning_default, aP as chat_dot_round_default, aQ as shopping_cart_default, o as getSupabaseClient } from './server.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './index-BXD0oWDt.mjs';
import { E as ElPagination } from './index-cR1ntQxK.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, resolveDynamicComponent, createBlock, openBlock, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderVNode } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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
import './index-Cf_t59lc.mjs';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './constants-hAKFmBbq.mjs';
import './index-D_b573Qt.mjs';
import './index-BOQJCp53.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-Bf1ETwA6.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-7IYgoTSU.mjs';

const messageApi = {
  /**
   * Get paginated messages for the current user
   */
  async getMessages(page = 1, limit = 20) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    }
    const offset = (page - 1) * limit;
    const { data, error, count } = await client.from("messages").select("*", { count: "exact" }).eq("user_id", user.id).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
    if (error) {
      console.error("getMessages error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return {
      code: 0,
      msg: "success",
      success: true,
      data: {
        messages: data || [],
        total: count || 0
      }
    };
  },
  /**
   * Get unread message count (for badge display)
   */
  async getUnreadCount() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    }
    const { count, error } = await client.from("messages").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false);
    if (error) {
      console.error("getUnreadCount error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true, data: count || 0 };
  },
  /**
   * Mark a single message as read
   */
  async markAsRead(messageId) {
    const client = getSupabaseClient();
    const { error } = await client.from("messages").update({ is_read: true }).eq("id", messageId);
    if (error) {
      console.error("markAsRead error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  },
  /**
   * Mark all messages as read for the current user
   */
  async markAllAsRead() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    }
    const { error } = await client.from("messages").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    if (error) {
      console.error("markAllAsRead error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  }
};
const pageSize = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "messages",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(true);
    const markingAll = ref(false);
    const messages2 = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const activeTab = ref("all");
    const unreadCount = ref(0);
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "unread", label: "\u672A\u8BFB" },
      { key: "order", label: "\u8BA2\u5355" },
      { key: "system", label: "\u7CFB\u7EDF" }
    ];
    const loadMessages = async () => {
      loading.value = true;
      try {
        const res = await messageApi.getMessages(currentPage.value, pageSize);
        if (res.success && res.data) {
          messages2.value = res.data.messages;
          total.value = res.data.total;
        }
      } finally {
        loading.value = false;
      }
    };
    const filteredMessages = computed(() => {
      if (activeTab.value === "all") return messages2.value;
      if (activeTab.value === "unread") return messages2.value.filter((m) => !m.is_read);
      return messages2.value.filter((m) => m.type === activeTab.value);
    });
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
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_pagination = ElPagination;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "messages-section" }, _attrs))} data-v-e9aba4d8><div class="section-header" data-v-e9aba4d8><div class="header-left" data-v-e9aba4d8><h2 class="section-title" data-v-e9aba4d8>\u6D88\u606F\u4E2D\u5FC3</h2><div class="section-subtitle" data-v-e9aba4d8>Notifications</div></div>`);
      if (messages2.value.length > 0) {
        _push(`<button class="read-all-btn"${ssrIncludeBooleanAttr(markingAll.value) ? " disabled" : ""} data-v-e9aba4d8>`);
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
          _push(`<span data-v-e9aba4d8>\u5168\u90E8\u5DF2\u8BFB</span>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="message-tabs" data-v-e9aba4d8><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-e9aba4d8>${ssrInterpolate(tab.label)} `);
        if (tab.key === "unread" && unreadCount.value > 0) {
          _push(`<span class="badge" data-v-e9aba4d8>${ssrInterpolate(unreadCount.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-e9aba4d8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="message-list-container" data-v-e9aba4d8>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-e9aba4d8><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_el_skeleton, {
            animated: "",
            key: i,
            class: "skeleton-item"
          }, {
            template: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "padding": "20px" })}" data-v-e9aba4d8${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "circle",
                  style: { "width": "48px", "height": "48px" }
                }, null, _parent2, _scopeId));
                _push2(`<div style="${ssrRenderStyle({ "flex": "1" })}" data-v-e9aba4d8${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "h3",
                  style: { "width": "40%", "margin-bottom": "12px" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "80%" }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { style: { "display": "flex", "gap": "16px", "padding": "20px" } }, [
                    createVNode(_component_el_skeleton_item, {
                      variant: "circle",
                      style: { "width": "48px", "height": "48px" }
                    }),
                    createVNode("div", { style: { "flex": "1" } }, [
                      createVNode(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "40%", "margin-bottom": "12px" }
                      }),
                      createVNode(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "80%" }
                      })
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (filteredMessages.value.length === 0) {
        _push(`<div class="empty-state" data-v-e9aba4d8><div class="empty-icon-wrap" data-v-e9aba4d8>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(bell_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(bell_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="empty-text" data-v-e9aba4d8>\u6682\u65E0\u6D88\u606F</div><div class="empty-desc" data-v-e9aba4d8>\u6240\u6709\u901A\u77E5\u548C\u63D0\u9192\u90FD\u4F1A\u663E\u793A\u5728\u8FD9\u91CC</div></div>`);
      } else {
        _push(`<div class="message-list" data-v-e9aba4d8><!--[-->`);
        ssrRenderList(filteredMessages.value, (msg) => {
          _push(`<div class="${ssrRenderClass([{ unread: !msg.is_read, clickable: !!msg.link }, "message-card"])}" data-v-e9aba4d8><div class="${ssrRenderClass([getIconClass(msg.type), "message-icon"])}" data-v-e9aba4d8>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getIconComponent(msg.type)), null, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(getIconComponent(msg.type))))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="message-content" data-v-e9aba4d8><div class="message-top" data-v-e9aba4d8><span class="message-title" data-v-e9aba4d8>${ssrInterpolate(msg.title)}</span><span class="message-time" data-v-e9aba4d8>${ssrInterpolate(formatTime(msg.created_at))}</span></div><div class="message-body" data-v-e9aba4d8>${ssrInterpolate(msg.content)}</div>`);
          if (msg.link) {
            _push(`<div class="message-link-hint" data-v-e9aba4d8>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(right_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(right_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(` \u70B9\u51FB\u67E5\u770B\u8BE6\u60C5 </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (!msg.is_read) {
            _push(`<div class="unread-dot" data-v-e9aba4d8></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (total.value > pageSize) {
        _push(`<div class="pagination-wrap" data-v-e9aba4d8>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          background: "",
          layout: "prev, pager, next",
          total: total.value,
          "page-size": pageSize,
          "current-page": currentPage.value,
          "onUpdate:currentPage": ($event) => currentPage.value = $event,
          onCurrentChange: loadMessages
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9aba4d8"]]);

export { messages as default };
//# sourceMappingURL=messages-H5pbhYcv.mjs.map
