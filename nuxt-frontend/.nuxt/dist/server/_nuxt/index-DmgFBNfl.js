import { E as ElButton } from "./index-BmUjCntg.js";
import { E as ElIcon } from "./index-C4aUwruK.js";
import { E as ElTableColumn } from "./index-Bx8hctOV.js";
import { E as ElTag } from "./index-BwbEmU3g.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
import { ref, reactive, defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { A as AdminModuleLayout } from "./AdminModuleLayout-C9xtT9eb.js";
import { A as AdminActionCard } from "./AdminActionCard-l7l1Gr-n.js";
import { A as AdminDataTable } from "./AdminDataTable-D1_qu9TL.js";
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { a as adminTicketApi } from "./ticket-D4JFVklQ.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { E as ElMessage } from "./index-CIurcsSv.js";
import { _ as delete_default } from "./index-CCIZH4aC.js";
import TicketChatModal from "./TicketChatModal-B00mgvo3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-CadSVx0p.js";
import "./index-C1njJNPQ.js";
import "./use-global-config-CaR6i8cb.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-BJm4fR6K.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "./index-CKAw5W0O.js";
import "./index-DqrhOzxH.js";
import "./index-CLY1HctY.js";
import "@popperjs/core";
import "./index-DHEUW9kI.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-7dcjom-z.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
/* empty css                    */
/* empty css                     */
import "vue-router";
import "./index-CMbz_fag.js";
import "./index-bbvp9z3V.js";
import "./index-_mZ_Kpkf.js";
import "./index-lNg7AKkv.js";
import "./strings-D1uxkXhq.js";
import "./scroll-ozMyDWSO.js";
import "./index-Q1HnLtiN.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./directive-DYMvUrfr.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
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
import "./index-CGm1hG-X.js";
import "./index-Dl9iHi_U.js";
import "./index-COtmEGfB.js";
/* empty css                   */
/* empty css                         */
import "./useAdminDialog-DLYHZIYu.js";
import "./index-C2vl4wFZ.js";
import "./index-BxcbCFKt.js";
import "./validator-BiwSbFK3.js";
import "./uploadImage-84nFn-7l.js";
import "./AdminDataDialog-JvUlVmw9.js";
import "./index-Bc7gqtRm.js";
import "./refs-CxYYXu5Q.js";
/* empty css                   */
function useAdminTicketList() {
  const loading = ref(false);
  const list = ref([]);
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    total: 0
  });
  const currentTab = ref("processing");
  const selectedIds = ref([]);
  const { formatDate } = useBizFormat();
  const {
    getTicketPriorityLabel,
    getTicketPriorityType,
    getTicketStatusLabel,
    getTicketStatusType
  } = useBizConfig();
  const loadList = async () => {
    loading.value = true;
    try {
      const res = await adminTicketApi.getList({
        page: pagination.page,
        pageSize: pagination.pageSize,
        status: currentTab.value
      });
      if (res.success) {
        list.value = res.data;
        pagination.total = res.total;
      } else {
        ElMessage.error(res.error || "加载失败");
      }
    } catch (e) {
      ElMessage.error("系统错误");
    } finally {
      loading.value = false;
    }
  };
  const handlePageChange = (page) => {
    pagination.page = page;
    loadList();
  };
  const handleTabChange = (val) => {
    currentTab.value = val;
    pagination.page = 1;
    loadList();
  };
  const handleSelectionChange = (rows) => {
    selectedIds.value = rows.map((r) => r.id);
  };
  const handleCleanup = async () => {
  };
  const handleCopy = (text) => {
    if (!text) return;
    (void 0).clipboard.writeText(text);
    ElMessage.success("复制成功");
  };
  return {
    loading,
    list,
    pagination,
    currentTab,
    selectedIds,
    loadList,
    handlePageChange,
    handleTabChange,
    handleSelectionChange,
    handleCleanup,
    handleCopy,
    // Exported
    formatDate,
    getTicketPriorityLabel,
    getTicketPriorityType,
    getTicketStatusLabel,
    getTicketStatusType
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      list,
      pagination,
      currentTab,
      loadList,
      handlePageChange,
      handleTabChange,
      handleSelectionChange,
      handleCleanup,
      formatDate,
      getTicketPriorityLabel,
      getTicketPriorityType,
      getTicketStatusLabel,
      getTicketStatusType
    } = useAdminTicketList();
    const tabs = [
      { name: "processing", label: "处理中" },
      { name: "resolved", label: "已解决" },
      { name: "all", label: "全部" }
    ];
    const showChat = ref(false);
    const selectedTicketId = ref("");
    const openChat = (row) => {
      selectedTicketId.value = row.id;
      showChat.value = true;
    };
    const onChatClosed = () => {
      showChat.value = false;
      selectedTicketId.value = "";
      loadList();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      _push(ssrRenderComponent(AdminModuleLayout, mergeProps({
        title: "工单管理",
        tabs,
        "default-tab": unref(currentTab),
        onTabChange: unref(handleTabChange)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6" data-v-46e16d4a${_scopeId}>`);
            _push2(ssrRenderComponent(AdminActionCard, null, {
              actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "warning",
                    plain: "",
                    onClick: unref(handleCleanup)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(delete_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(delete_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` 清理历史图片 `);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(delete_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 清理历史图片 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "warning",
                      plain: "",
                      onClick: unref(handleCleanup)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" 清理历史图片 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(AdminDataTable, {
              data: unref(list),
              loading: unref(loading),
              total: unref(pagination).total,
              "current-page": unref(pagination).page,
              "onUpdate:currentPage": ($event) => unref(pagination).page = $event,
              "page-size": unref(pagination).pageSize,
              "onUpdate:pageSize": ($event) => unref(pagination).pageSize = $event,
              onPageChange: unref(handlePageChange),
              onSelectionChange: unref(handleSelectionChange)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "工单ID",
                    width: "160"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="mono-text cursor-pointer hover:text-blue-600" data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.ticket_no || `T-${row.id.substring(0, 8).toUpperCase()}`)}</span><div class="sub-text mt-1" data-v-46e16d4a${_scopeId3}>${ssrInterpolate(unref(formatDate)(row.created_at).split(" ")[0])}</div>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: "mono-text cursor-pointer hover:text-blue-600",
                            onClick: ($event) => openChat(row)
                          }, toDisplayString(row.ticket_no || `T-${row.id.substring(0, 8).toUpperCase()}`), 9, ["onClick"]),
                          createVNode("div", { class: "sub-text mt-1" }, toDisplayString(unref(formatDate)(row.created_at).split(" ")[0]), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "关联订单",
                    width: "160"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (row.orders) {
                          _push4(`<div data-v-46e16d4a${_scopeId3}><div class="mono-text cursor-pointer hover:text-blue-600" data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.orders.order_no)}</div><div class="sub-text truncate"${ssrRenderAttr("title", row.orders.product_snapshot?.product_name)} data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.orders.product_snapshot?.product_name)}</div></div>`);
                        } else {
                          _push4(`<div class="sub-text text-gray-400" data-v-46e16d4a${_scopeId3}>-</div>`);
                        }
                      } else {
                        return [
                          row.orders ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", {
                              class: "mono-text cursor-pointer hover:text-blue-600",
                              onClick: ($event) => _ctx.handleCopy(row.orders.order_no)
                            }, toDisplayString(row.orders.order_no), 9, ["onClick"]),
                            createVNode("div", {
                              class: "sub-text truncate",
                              title: row.orders.product_snapshot?.product_name
                            }, toDisplayString(row.orders.product_snapshot?.product_name), 9, ["title"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "sub-text text-gray-400"
                          }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "内容概要",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="font-medium truncate mb-1 cursor-pointer hover:text-blue-500" data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.title)}</div><div class="sub-text truncate" data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.ticket_messages?.[0]?.content || "暂无消息")}</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "font-medium truncate mb-1 cursor-pointer hover:text-blue-500",
                            onClick: ($event) => openChat(row)
                          }, toDisplayString(row.title), 9, ["onClick"]),
                          createVNode("div", { class: "sub-text truncate" }, toDisplayString(row.ticket_messages?.[0]?.content || "暂无消息"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "用户",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="user-cell" data-v-46e16d4a${_scopeId3}><div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-500" data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.user_id.substring(0, 2).toUpperCase())}</div><div class="flex flex-col min-w-0" data-v-46e16d4a${_scopeId3}><span class="mono-text text-xs" data-v-46e16d4a${_scopeId3}>UID: ${ssrInterpolate(row.user_id.substring(0, 8).toUpperCase())}</span><span class="sub-text truncate"${ssrRenderAttr("title", row.profiles?.email)} data-v-46e16d4a${_scopeId3}>${ssrInterpolate(row.profiles?.email || "未知用户")}</span></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "user-cell" }, [
                            createVNode("div", { class: "w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-500" }, toDisplayString(row.user_id.substring(0, 2).toUpperCase()), 1),
                            createVNode("div", { class: "flex flex-col min-w-0" }, [
                              createVNode("span", { class: "mono-text text-xs" }, "UID: " + toDisplayString(row.user_id.substring(0, 8).toUpperCase()), 1),
                              createVNode("span", {
                                class: "sub-text truncate",
                                title: row.profiles?.email
                              }, toDisplayString(row.profiles?.email || "未知用户"), 9, ["title"])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "优先级",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: unref(getTicketPriorityType)(row.priority),
                          effect: "plain",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(getTicketPriorityLabel)(row.priority))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(getTicketPriorityLabel)(row.priority)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: unref(getTicketPriorityType)(row.priority),
                            effect: "plain",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getTicketPriorityLabel)(row.priority)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: unref(getTicketStatusType)(row.status),
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(getTicketStatusLabel)(row.status))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(getTicketStatusLabel)(row.status)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: unref(getTicketStatusType)(row.status),
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getTicketStatusLabel)(row.status)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "100",
                    fixed: "right",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: ($event) => openChat(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 处理 `);
                            } else {
                              return [
                                createTextVNode(" 处理 ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            size: "small",
                            onClick: ($event) => openChat(row)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 处理 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "工单ID",
                      width: "160"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", {
                          class: "mono-text cursor-pointer hover:text-blue-600",
                          onClick: ($event) => openChat(row)
                        }, toDisplayString(row.ticket_no || `T-${row.id.substring(0, 8).toUpperCase()}`), 9, ["onClick"]),
                        createVNode("div", { class: "sub-text mt-1" }, toDisplayString(unref(formatDate)(row.created_at).split(" ")[0]), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "关联订单",
                      width: "160"
                    }, {
                      default: withCtx(({ row }) => [
                        row.orders ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("div", {
                            class: "mono-text cursor-pointer hover:text-blue-600",
                            onClick: ($event) => _ctx.handleCopy(row.orders.order_no)
                          }, toDisplayString(row.orders.order_no), 9, ["onClick"]),
                          createVNode("div", {
                            class: "sub-text truncate",
                            title: row.orders.product_snapshot?.product_name
                          }, toDisplayString(row.orders.product_snapshot?.product_name), 9, ["title"])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "sub-text text-gray-400"
                        }, "-"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "内容概要",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", {
                          class: "font-medium truncate mb-1 cursor-pointer hover:text-blue-500",
                          onClick: ($event) => openChat(row)
                        }, toDisplayString(row.title), 9, ["onClick"]),
                        createVNode("div", { class: "sub-text truncate" }, toDisplayString(row.ticket_messages?.[0]?.content || "暂无消息"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "用户",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { class: "user-cell" }, [
                          createVNode("div", { class: "w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-500" }, toDisplayString(row.user_id.substring(0, 2).toUpperCase()), 1),
                          createVNode("div", { class: "flex flex-col min-w-0" }, [
                            createVNode("span", { class: "mono-text text-xs" }, "UID: " + toDisplayString(row.user_id.substring(0, 8).toUpperCase()), 1),
                            createVNode("span", {
                              class: "sub-text truncate",
                              title: row.profiles?.email
                            }, toDisplayString(row.profiles?.email || "未知用户"), 9, ["title"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "优先级",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: unref(getTicketPriorityType)(row.priority),
                          effect: "plain",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(getTicketPriorityLabel)(row.priority)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: unref(getTicketStatusType)(row.status),
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(getTicketStatusLabel)(row.status)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "100",
                      fixed: "right",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: ($event) => openChat(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 处理 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (showChat.value) {
              _push2(ssrRenderComponent(TicketChatModal, {
                modelValue: showChat.value,
                "onUpdate:modelValue": ($event) => showChat.value = $event,
                ticketId: selectedTicketId.value,
                onClosed: onChatClosed
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode(AdminActionCard, null, {
                  actions: withCtx(() => [
                    createVNode(_component_el_button, {
                      type: "warning",
                      plain: "",
                      onClick: unref(handleCleanup)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" 清理历史图片 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(AdminDataTable, {
                  data: unref(list),
                  loading: unref(loading),
                  total: unref(pagination).total,
                  "current-page": unref(pagination).page,
                  "onUpdate:currentPage": ($event) => unref(pagination).page = $event,
                  "page-size": unref(pagination).pageSize,
                  "onUpdate:pageSize": ($event) => unref(pagination).pageSize = $event,
                  onPageChange: unref(handlePageChange),
                  onSelectionChange: unref(handleSelectionChange)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      label: "工单ID",
                      width: "160"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", {
                          class: "mono-text cursor-pointer hover:text-blue-600",
                          onClick: ($event) => openChat(row)
                        }, toDisplayString(row.ticket_no || `T-${row.id.substring(0, 8).toUpperCase()}`), 9, ["onClick"]),
                        createVNode("div", { class: "sub-text mt-1" }, toDisplayString(unref(formatDate)(row.created_at).split(" ")[0]), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "关联订单",
                      width: "160"
                    }, {
                      default: withCtx(({ row }) => [
                        row.orders ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("div", {
                            class: "mono-text cursor-pointer hover:text-blue-600",
                            onClick: ($event) => _ctx.handleCopy(row.orders.order_no)
                          }, toDisplayString(row.orders.order_no), 9, ["onClick"]),
                          createVNode("div", {
                            class: "sub-text truncate",
                            title: row.orders.product_snapshot?.product_name
                          }, toDisplayString(row.orders.product_snapshot?.product_name), 9, ["title"])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "sub-text text-gray-400"
                        }, "-"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "内容概要",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", {
                          class: "font-medium truncate mb-1 cursor-pointer hover:text-blue-500",
                          onClick: ($event) => openChat(row)
                        }, toDisplayString(row.title), 9, ["onClick"]),
                        createVNode("div", { class: "sub-text truncate" }, toDisplayString(row.ticket_messages?.[0]?.content || "暂无消息"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "用户",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { class: "user-cell" }, [
                          createVNode("div", { class: "w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-500" }, toDisplayString(row.user_id.substring(0, 2).toUpperCase()), 1),
                          createVNode("div", { class: "flex flex-col min-w-0" }, [
                            createVNode("span", { class: "mono-text text-xs" }, "UID: " + toDisplayString(row.user_id.substring(0, 8).toUpperCase()), 1),
                            createVNode("span", {
                              class: "sub-text truncate",
                              title: row.profiles?.email
                            }, toDisplayString(row.profiles?.email || "未知用户"), 9, ["title"])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "优先级",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: unref(getTicketPriorityType)(row.priority),
                          effect: "plain",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(getTicketPriorityLabel)(row.priority)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: unref(getTicketStatusType)(row.status),
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(getTicketStatusLabel)(row.status)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "100",
                      fixed: "right",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: ($event) => openChat(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 处理 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data", "loading", "total", "current-page", "onUpdate:currentPage", "page-size", "onUpdate:pageSize", "onPageChange", "onSelectionChange"])
              ]),
              showChat.value ? (openBlock(), createBlock(TicketChatModal, {
                key: 0,
                modelValue: showChat.value,
                "onUpdate:modelValue": ($event) => showChat.value = $event,
                ticketId: selectedTicketId.value,
                onClosed: onChatClosed
              }, null, 8, ["modelValue", "onUpdate:modelValue", "ticketId"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/tickets/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-46e16d4a"]]);
export {
  index as default
};
//# sourceMappingURL=index-DmgFBNfl.js.map
