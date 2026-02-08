import { E as ElSkeleton, a as ElSkeletonItem } from './index-DrSf1xVr.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, unref, withCtx, createVNode, openBlock, createBlock, TransitionGroup, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { t as ticketApi } from './ticket-C7sv4DHi.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { s as service_default, d as delete_default } from './index-DlETah8a.mjs';
import { B as BaseConfirmModal } from './BaseConfirmModal-BtjC0-sZ.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-64au3mej.mjs';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
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
import './BaseModal-CiVpglQ1.mjs';
import './BaseButton-BlqmccK6.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const TicketDetailModal = defineAsyncComponent(() => import('./TicketDetailModal-BNniKnbR.mjs'));
    const { formatDate } = useBizFormat();
    useRouter();
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "processing", label: "\u8FDB\u884C\u4E2D" },
      { key: "resolved", label: "\u5DF2\u89E3\u51B3" }
    ];
    const activeTab = ref("all");
    const tickets2 = ref([]);
    const showDetailModal = ref(false);
    const currentTicketId = ref("");
    const showDeleteModal = ref(false);
    const deleteTicketId = ref("");
    const deleteLoading = ref(false);
    const filteredTickets = computed(() => {
      if (activeTab.value === "all") return tickets2.value;
      return tickets2.value.filter((ticket) => ticket.status === activeTab.value);
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredTickets,
      pageSize: 10
    });
    const fetchTickets = async () => {
      loading.value = true;
      try {
        const res = await ticketApi.getList();
        if (res.success && res.data) {
          tickets2.value = res.data.map((t) => {
            var _a, _b, _c;
            return {
              id: t.id,
              shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`,
              content: t.title,
              time: formatDate(t.created_at),
              orderId: ((_a = t.orders) == null ? void 0 : _a.order_no) || "",
              productName: ((_c = (_b = t.orders) == null ? void 0 : _b.product_snapshot) == null ? void 0 : _c.product_name) || "",
              status: t.status,
              statusText: t.status === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3",
              statusClass: t.status === "processing" ? "processing" : "resolved"
            };
          });
        }
      } catch (e) {
        console.error("Fetch tickets failed", e);
        error.value = true;
      } finally {
        loading.value = false;
      }
    };
    const openViewModal = (ticket) => {
      currentTicketId.value = ticket.id;
      showDetailModal.value = true;
    };
    const handleDeleteClick = (ticket) => {
      deleteTicketId.value = ticket.id;
      showDeleteModal.value = true;
    };
    const confirmDelete = async () => {
      if (!deleteTicketId.value) return;
      deleteLoading.value = true;
      try {
        const res = await ticketApi.delete(deleteTicketId.value);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
          showDeleteModal.value = false;
          tickets2.value = tickets2.value.filter((t) => t.id !== deleteTicketId.value);
        } else {
          ElMessage.error(res.error || "\u5220\u9664\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u5220\u9664\u5F02\u5E38");
      } finally {
        deleteLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><div class="tickets-section" data-v-137774be><div class="section-header" data-v-137774be><div class="header-left" data-v-137774be><h2 class="section-title" data-v-137774be>\u6211\u7684\u5DE5\u5355</h2><div class="section-subtitle" data-v-137774be>Support Tickets</div></div></div><div class="tickets-tabs" data-v-137774be><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.key }, "tab-item"])}" data-v-137774be>${ssrInterpolate(tab.label)} `);
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-137774be></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="tickets-list-container" data-v-137774be>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        offset: 150
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && unref(loading)) {
              _push2(`<div class="loading-state" data-v-137774be${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(ssrRenderComponent(_component_el_skeleton, {
                  animated: "",
                  key: i,
                  class: "skeleton-item"
                }, {
                  template: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "padding": "20px" })}" data-v-137774be${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "circle",
                        style: { "width": "48px", "height": "48px" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<div style="${ssrRenderStyle({ "flex": "1" })}" data-v-137774be${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "40%", "margin-bottom": "12px" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "80%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
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
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(displayList).length === 0 && unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                  return createVNode(_component_el_skeleton, {
                    animated: "",
                    key: i,
                    class: "skeleton-item"
                  }, {
                    template: withCtx(() => [
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
                    ]),
                    _: 1
                  });
                }), 64))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-137774be${_scopeId}><div class="empty-icon-wrap" data-v-137774be${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(service_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(service_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="empty-text" data-v-137774be${_scopeId}>\u6682\u65E0\u5DE5\u5355</div><div class="empty-desc" data-v-137774be${_scopeId}>\u60A8\u8FD8\u6CA1\u6709\u63D0\u4EA4\u8FC7\u4EFB\u4F55\u5DE5\u5355\u8BB0\u5F55</div></div>`);
            } else {
              _push2(`<div class="tickets-list" data-v-137774be${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (ticket) => {
                _push2(`<div class="${ssrRenderClass([ticket.statusClass, "ticket-card"])}" data-v-137774be${_scopeId}><div class="${ssrRenderClass([ticket.statusClass, "ticket-icon"])}" data-v-137774be${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(service_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(service_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="ticket-content" data-v-137774be${_scopeId}><div class="ticket-top" data-v-137774be${_scopeId}><div class="ticket-title-row" data-v-137774be${_scopeId}><span class="ticket-id" data-v-137774be${_scopeId}>${ssrInterpolate(ticket.shortId)}</span><span class="${ssrRenderClass([ticket.statusClass, "status-tag"])}" data-v-137774be${_scopeId}>${ssrInterpolate(ticket.statusText)}</span></div><span class="ticket-time" data-v-137774be${_scopeId}>${ssrInterpolate(ticket.time)}</span></div><div class="ticket-body" data-v-137774be${_scopeId}>${ssrInterpolate(ticket.content)}</div>`);
                if (ticket.productName) {
                  _push2(`<div class="ticket-meta" data-v-137774be${_scopeId}> \u5173\u8054: ${ssrInterpolate(ticket.productName)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="delete-action" data-v-137774be${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(delete_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(delete_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode("div", { class: "empty-icon-wrap" }, [
                  createVNode(_component_el_icon, { class: "empty-icon" }, {
                    default: withCtx(() => [
                      createVNode(unref(service_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "empty-text" }, "\u6682\u65E0\u5DE5\u5355"),
                createVNode("div", { class: "empty-desc" }, "\u60A8\u8FD8\u6CA1\u6709\u63D0\u4EA4\u8FC7\u4EFB\u4F55\u5DE5\u5355\u8BB0\u5F55")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "tickets-list"
              }, [
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (ticket) => {
                      return openBlock(), createBlock("div", {
                        key: ticket.id,
                        class: ["ticket-card", ticket.statusClass],
                        onClick: ($event) => openViewModal(ticket)
                      }, [
                        createVNode("div", {
                          class: ["ticket-icon", ticket.statusClass]
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(service_default))
                            ]),
                            _: 1
                          })
                        ], 2),
                        createVNode("div", { class: "ticket-content" }, [
                          createVNode("div", { class: "ticket-top" }, [
                            createVNode("div", { class: "ticket-title-row" }, [
                              createVNode("span", { class: "ticket-id" }, toDisplayString(ticket.shortId), 1),
                              createVNode("span", {
                                class: ["status-tag", ticket.statusClass]
                              }, toDisplayString(ticket.statusText), 3)
                            ]),
                            createVNode("span", { class: "ticket-time" }, toDisplayString(ticket.time), 1)
                          ]),
                          createVNode("div", { class: "ticket-body" }, toDisplayString(ticket.content), 1),
                          ticket.productName ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "ticket-meta"
                          }, " \u5173\u8054: " + toDisplayString(ticket.productName), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", {
                          class: "delete-action",
                          onClick: withModifiers(($event) => handleDeleteClick(ticket), ["stop"])
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(delete_default))
                            ]),
                            _: 1
                          })
                        ], 8, ["onClick"])
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
      _push(ssrRenderComponent(unref(TicketDetailModal), {
        visible: showDetailModal.value,
        "onUpdate:visible": ($event) => showDetailModal.value = $event,
        "ticket-id": currentTicketId.value,
        onClose: ($event) => showDetailModal.value = false,
        onReplySuccess: fetchTickets
      }, null, _parent));
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showDeleteModal.value,
        "onUpdate:visible": ($event) => showDeleteModal.value = $event,
        title: "\u5220\u9664\u5DE5\u5355",
        message: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u5DE5\u5355\u8BB0\u5F55\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002",
        type: "danger",
        "confirm-text": "\u5220\u9664",
        loading: deleteLoading.value,
        onConfirm: confirmDelete
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/tickets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tickets = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-137774be"]]);

export { tickets as default };
//# sourceMappingURL=tickets-B7ourJ6x.mjs.map
