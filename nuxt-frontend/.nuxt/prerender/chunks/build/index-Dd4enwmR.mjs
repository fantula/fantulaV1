import { E as ElButton } from './index-CXu9YNCC.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';
import { E as ElTableColumn } from './index-D6Ug0Zge.mjs';
import { E as ElTag } from './index-2JZmBUf1.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, reactive, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { A as AdminModuleLayout } from './AdminModuleLayout-DGN6WPf8.mjs';
import { A as AdminActionCard } from './AdminActionCard-C3u4R3C6.mjs';
import { A as AdminDataTable } from './AdminDataTable-B-yPQpXr.mjs';
import { A as AdminUserCell } from './AdminUserCell-C2sgweQM.mjs';
import { a as adminTicketApi } from './ticket-D0g-SEGL.mjs';
import { u as useBizFormat } from './useBizFormat-D_CzFEgD.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { _ as delete_default } from './index-DNnPa_Q9.mjs';
import TicketChatModal from './TicketChatModal-DkBgjFjq.mjs';
import { useClipboard } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './icon-Ck0_dGQP.mjs';
import './index-DbvZsXcZ.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './objects-Bz74KHmq.mjs';
import './use-form-item-D2hCqQW8.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-BAMVq552.mjs';
import './index-Cxdfotkm.mjs';
import './index-bphs7bB3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-ByGmkA5C.mjs';
import './event-D3FEo2C5.mjs';
import './aria-Rs9hkxop.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './index-NROOS5rD.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import './header-BPApn9bB.mjs';
import './index-CD49T52w.mjs';
import './index-BRSsuUkY.mjs';
import './index-D9RjcsL2.mjs';
import './index-B_mQW-wd.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-BEbqb1sm.mjs';
import './index-BeH2PDwZ.mjs';
import './typescript-D6L75muK.mjs';
import './index-DuyRWKSc.mjs';
import './index-C8YaaWrc.mjs';
import './vnode-uc6o_sOa.mjs';
import './directive-BHLqqXUb.mjs';
import './index-C3_NoBue.mjs';
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
import './index-BSYGfCfY.mjs';
import './index-BrJcxSwt.mjs';
import './useAdminDialog-LVLqZ-7L.mjs';
import './index-VfPbkY7T.mjs';
import './index-IoXmILvB.mjs';
import './validator-BZYOvvAA.mjs';
import './uploadImage-BNZa78ds.mjs';
import './AdminDataDialog-C7G4EUwl.mjs';
import './index-BYF0U8gS.mjs';
import './refs-CxYYXu5Q.mjs';

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
        ElMessage.error(res.error || "\u52A0\u8F7D\u5931\u8D25");
      }
    } catch (e) {
      ElMessage.error("\u7CFB\u7EDF\u9519\u8BEF");
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
    ElMessage.success("\u590D\u5236\u6210\u529F");
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
      { name: "processing", label: "\u5904\u7406\u4E2D" },
      { name: "resolved", label: "\u5DF2\u89E3\u51B3" },
      { name: "all", label: "\u5168\u90E8" }
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
        title: "\u5DE5\u5355\u7BA1\u7406",
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
                        _push4(` \u6E05\u7406\u5386\u53F2\u56FE\u7247 `);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(delete_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u6E05\u7406\u5386\u53F2\u56FE\u7247 ")
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
                        createTextVNode(" \u6E05\u7406\u5386\u53F2\u56FE\u7247 ")
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
                    label: "\u5DE5\u5355ID",
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
                    label: "\u5173\u8054\u8BA2\u5355",
                    width: "160"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d;
                      if (_push4) {
                        if (row.orders) {
                          _push4(`<div data-v-33bcf61d${_scopeId3}><div class="mono-text cursor-pointer hover:text-blue-600" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.orders.order_no)}</div><div class="sub-text truncate"${ssrRenderAttr("title", (_a = row.orders.product_snapshot) == null ? void 0 : _a.product_name)} data-v-33bcf61d${_scopeId3}>${ssrInterpolate((_b = row.orders.product_snapshot) == null ? void 0 : _b.product_name)}</div></div>`);
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
                              title: (_c = row.orders.product_snapshot) == null ? void 0 : _c.product_name
                            }, toDisplayString((_d = row.orders.product_snapshot) == null ? void 0 : _d.product_name), 9, ["title"])
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
                    label: "\u5185\u5BB9\u6982\u8981",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d;
                      if (_push4) {
                        _push4(`<div class="font-medium truncate mb-1 cursor-pointer hover:text-blue-500" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(row.title)}</div><div class="sub-text truncate" data-v-33bcf61d${_scopeId3}>${ssrInterpolate(((_b = (_a = row.ticket_messages) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) || "\u6682\u65E0\u6D88\u606F")}</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "font-medium truncate mb-1 cursor-pointer hover:text-blue-500",
                            onClick: ($event) => openChat(row)
                          }, toDisplayString(row.title), 9, ["onClick"]),
                          createVNode("div", { class: "sub-text truncate" }, toDisplayString(((_d = (_c = row.ticket_messages) == null ? void 0 : _c[0]) == null ? void 0 : _d.content) || "\u6682\u65E0\u6D88\u606F"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u7528\u6237",
                    "min-width": "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(AdminUserCell, {
                          uid: row.user_id,
                          email: (_a = row.profiles) == null ? void 0 : _a.email
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(AdminUserCell, {
                            uid: row.user_id,
                            email: (_b = row.profiles) == null ? void 0 : _b.email
                          }, null, 8, ["uid", "email"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u4F18\u5148\u7EA7",
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
                    label: "\u72B6\u6001",
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
                    label: "\u64CD\u4F5C",
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
                              _push5(` \u5904\u7406 `);
                            } else {
                              return [
                                createTextVNode(" \u5904\u7406 ")
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
                              createTextVNode(" \u5904\u7406 ")
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
                      label: "\u5DE5\u5355ID",
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
                      label: "\u5173\u8054\u8BA2\u5355",
                      width: "160"
                    }, {
                      default: withCtx(({ row }) => {
                        var _a, _b;
                        return [
                          row.orders ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", {
                              class: "mono-text cursor-pointer hover:text-blue-600",
                              onClick: ($event) => unref(copy)(row.orders.order_no)
                            }, toDisplayString(row.orders.order_no), 9, ["onClick"]),
                            createVNode("div", {
                              class: "sub-text truncate",
                              title: (_a = row.orders.product_snapshot) == null ? void 0 : _a.product_name
                            }, toDisplayString((_b = row.orders.product_snapshot) == null ? void 0 : _b.product_name), 9, ["title"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "sub-text text-gray-400"
                          }, "-"))
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5185\u5BB9\u6982\u8981",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => {
                        var _a, _b;
                        return [
                          createVNode("div", {
                            class: "font-medium truncate mb-1 cursor-pointer hover:text-blue-500",
                            onClick: ($event) => openChat(row)
                          }, toDisplayString(row.title), 9, ["onClick"]),
                          createVNode("div", { class: "sub-text truncate" }, toDisplayString(((_b = (_a = row.ticket_messages) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) || "\u6682\u65E0\u6D88\u606F"), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u7528\u6237",
                      "min-width": "180"
                    }, {
                      default: withCtx(({ row }) => {
                        var _a;
                        return [
                          createVNode(AdminUserCell, {
                            uid: row.user_id,
                            email: (_a = row.profiles) == null ? void 0 : _a.email
                          }, null, 8, ["uid", "email"])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u4F18\u5148\u7EA7",
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
                      label: "\u72B6\u6001",
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
                      label: "\u64CD\u4F5C",
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
                            createTextVNode(" \u5904\u7406 ")
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
                        createTextVNode(" \u6E05\u7406\u5386\u53F2\u56FE\u7247 ")
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
                      label: "\u5DE5\u5355ID",
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
                      label: "\u5173\u8054\u8BA2\u5355",
                      width: "160"
                    }, {
                      default: withCtx(({ row }) => {
                        var _a, _b;
                        return [
                          row.orders ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", {
                              class: "mono-text cursor-pointer hover:text-blue-600",
                              onClick: ($event) => unref(copy)(row.orders.order_no)
                            }, toDisplayString(row.orders.order_no), 9, ["onClick"]),
                            createVNode("div", {
                              class: "sub-text truncate",
                              title: (_a = row.orders.product_snapshot) == null ? void 0 : _a.product_name
                            }, toDisplayString((_b = row.orders.product_snapshot) == null ? void 0 : _b.product_name), 9, ["title"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "sub-text text-gray-400"
                          }, "-"))
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5185\u5BB9\u6982\u8981",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => {
                        var _a, _b;
                        return [
                          createVNode("div", {
                            class: "font-medium truncate mb-1 cursor-pointer hover:text-blue-500",
                            onClick: ($event) => openChat(row)
                          }, toDisplayString(row.title), 9, ["onClick"]),
                          createVNode("div", { class: "sub-text truncate" }, toDisplayString(((_b = (_a = row.ticket_messages) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) || "\u6682\u65E0\u6D88\u606F"), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u7528\u6237",
                      "min-width": "180"
                    }, {
                      default: withCtx(({ row }) => {
                        var _a;
                        return [
                          createVNode(AdminUserCell, {
                            uid: row.user_id,
                            email: (_a = row.profiles) == null ? void 0 : _a.email
                          }, null, 8, ["uid", "email"])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u4F18\u5148\u7EA7",
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
                      label: "\u72B6\u6001",
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
                      label: "\u64CD\u4F5C",
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
                            createTextVNode(" \u5904\u7406 ")
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

export { index as default };
//# sourceMappingURL=index-Dd4enwmR.mjs.map
