import { E as ElSkeleton, a as ElSkeletonItem } from "./index-BSkMD3ma.js";
import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
/* empty css                     */
/* empty css                          */
/* empty css                    */
import { defineComponent, defineAsyncComponent, ref, computed, unref, withCtx, createVNode, openBlock, createBlock, TransitionGroup, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { t as ticketApi } from "./ticket-CclS-v1H.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useInfiniteScroll } from "./useInfiniteScroll-Cg7MWwox.js";
import { s as service_default, _ as delete_default } from "./index-CCIZH4aC.js";
import { B as BaseConfirmModal } from "./BaseConfirmModal-DX5ElCqL.js";
import { B as BaseInfiniteList } from "./BaseInfiniteList-BcO6J-HE.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { f as useRouter, _ as _export_sfc } from "../server.mjs";
import { E as ElMessage } from "./index-CIurcsSv.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
import "./BaseModal-nbvk9VuE.js";
import "./BaseButton-BnWAaIRO.js";
import "./typescript-D6L75muK.js";
import "./icon-CadSVx0p.js";
import "./use-global-config-CaR6i8cb.js";
import "./index-C1njJNPQ.js";
import "./event-D3FEo2C5.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tickets",
  __ssrInlineRender: true,
  setup(__props) {
    const TicketDetailModal = defineAsyncComponent(() => import("./TicketDetailModal-DjLFz8Il.js"));
    const { formatDate } = useBizFormat();
    useRouter();
    const tabs = [
      { key: "all", label: "全部" },
      { key: "processing", label: "进行中" },
      { key: "resolved", label: "已解决" }
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
          tickets2.value = res.data.map((t) => ({
            id: t.id,
            shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`,
            content: t.title,
            time: formatDate(t.created_at),
            orderId: t.orders?.order_no || "",
            productName: t.orders?.product_snapshot?.product_name || "",
            status: t.status,
            statusText: t.status === "processing" ? "处理中" : "已解决",
            statusClass: t.status === "processing" ? "processing" : "resolved"
          }));
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
          ElMessage.success("删除成功");
          showDeleteModal.value = false;
          tickets2.value = tickets2.value.filter((t) => t.id !== deleteTicketId.value);
        } else {
          ElMessage.error(res.error || "删除失败");
        }
      } catch (e) {
        ElMessage.error("删除异常");
      } finally {
        deleteLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<!--[--><div class="tickets-section" data-v-137774be><div class="section-header" data-v-137774be><div class="header-left" data-v-137774be><h2 class="section-title" data-v-137774be>我的工单</h2><div class="section-subtitle" data-v-137774be>Support Tickets</div></div></div><div class="tickets-tabs" data-v-137774be><!--[-->`);
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
              _push2(`</div><div class="empty-text" data-v-137774be${_scopeId}>暂无工单</div><div class="empty-desc" data-v-137774be${_scopeId}>您还没有提交过任何工单记录</div></div>`);
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
                  _push2(`<div class="ticket-meta" data-v-137774be${_scopeId}> 关联: ${ssrInterpolate(ticket.productName)}</div>`);
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
                createVNode("div", { class: "empty-text" }, "暂无工单"),
                createVNode("div", { class: "empty-desc" }, "您还没有提交过任何工单记录")
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
                          }, " 关联: " + toDisplayString(ticket.productName), 1)) : createCommentVNode("", true)
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
        title: "删除工单",
        message: "确定要删除这条工单记录吗？此操作无法撤销。",
        type: "danger",
        "confirm-text": "删除",
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
export {
  tickets as default
};
//# sourceMappingURL=tickets-BD-ulKiu.js.map
