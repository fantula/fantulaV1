import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
import { ref, reactive, defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { A as AdminModuleLayout } from "./AdminModuleLayout-DGN6WPf8.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { A as AdminUserCell } from "./AdminUserCell-C2sgweQM.js";
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { a as adminTicketApi } from "./ticket-D4JFVklQ.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { _ as delete_default } from "./index-DNnPa_Q9.js";
import TicketChatModal from "./TicketChatModal-_2UW3Va2.js";
import { useClipboard } from "@vueuse/core";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-C5kRDPtv.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-BAMVq552.js";
import "./index-Cxdfotkm.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-NROOS5rD.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "vue-router";
import "./header-BPApn9bB.js";
import "./index-CD49T52w.js";
/* empty css                    */
import "./index-BRSsuUkY.js";
import "./index-D9RjcsL2.js";
import "./index-B_mQW-wd.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./index-BeH2PDwZ.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./directive-BHLqqXUb.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./index-C3_NoBue.js";
/* empty css                   */
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
import "./index-BSYGfCfY.js";
import "./index-BrJcxSwt.js";
/* empty css                         */
import "./useAdminDialog-LVLqZ-7L.js";
import "./index-VfPbkY7T.js";
import "./index-IoXmILvB.js";
import "./validator-BZYOvvAA.js";
import "./uploadImage-84nFn-7l.js";
import "./AdminDataDialog-C7G4EUwl.js";
import "./index-BYF0U8gS.js";
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
    const { copy } = useClipboard();
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
            _push2(`<div class="p-6" data-v-33bcf61d${_scopeId}>`);
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
                        _push4(`<span class="mono-text cursor-pointer hover:text-blue-600" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.ticket_no || `T-${row.id.substring(0, 8).toUpperCase()}`)}</span><div class="sub-text mt-1" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(unref(formatDate)(row.created_at).split(" ")[0])}</div>`);
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
                          _push4(`<div data-v-33bcf61d${_scopeId3}><div class="mono-text cursor-pointer hover:text-blue-600" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.orders.order_no)}</div><div class="sub-text truncate"${ssrRenderAttr("title", row.orders.product_snapshot?.product_name)} data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.orders.product_snapshot?.product_name)}</div></div>`);
                        } else {
                          _push4(`<div class="sub-text text-gray-400" data-v-33bcf61d${_scopeId3}>-</div>`);
                        }
                      } else {
                        return [
                          row.orders ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", {
                              class: "mono-text cursor-pointer hover:text-blue-600",
                              onClick: ($event) => unref(copy)(row.orders.order_no)
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
                        _push4(`<div class="font-medium truncate mb-1 cursor-pointer hover:text-blue-500" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.title)}</div><div class="sub-text truncate" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.ticket_messages?.[0]?.content || "暂无消息")}</div>`);
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
                    "min-width": "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(AdminUserCell, {
                          uid: row.user_id,
                          email: row.profiles?.email
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(AdminUserCell, {
                            uid: row.user_id,
                            email: row.profiles?.email
                          }, null, 8, ["uid", "email"])
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
                            onClick: ($event) => unref(copy)(row.orders.order_no)
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
                      "min-width": "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(AdminUserCell, {
                          uid: row.user_id,
                          email: row.profiles?.email
                        }, null, 8, ["uid", "email"])
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
                            onClick: ($event) => unref(copy)(row.orders.order_no)
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
                      "min-width": "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(AdminUserCell, {
                          uid: row.user_id,
                          email: row.profiles?.email
                        }, null, 8, ["uid", "email"])
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-33bcf61d"]]);
export {
  index as default
};
//# sourceMappingURL=index-DKWEfe7Y.js.map
