import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { _ as _export_sfc, E as ElIcon, bJ as search_default, a4 as user_default, b9 as refresh_default, o as getSupabaseClient, ah as ElMessage } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElStatistic } from './index-C-m_XO0-.mjs';
import { a as ElTable, E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElPagination } from './index-Da73tUO2.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withKeys, withDirectives, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderStyle } from 'vue/server-renderer';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import '@vueuse/core';
import 'lodash-unified';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import '@vue/shared';
import './index-ClPmkyX9.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import './aria-B8G3G_75.mjs';
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
import '@supabase/supabase-js';
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
import './index-7IYgoTSU.mjs';
import '@ctrl/tinycolor';
import './index-D_b573Qt.mjs';
import './index-CIoWkt90.mjs';
import '@popperjs/core';
import './focus-trap-D_6Xxduc.mjs';
import './index-BlpH41lu.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './index-pXKVpQSb.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const cancelledList = ref([]);
    const totalCount = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const filterParams = reactive({
      orderNo: "",
      uid: ""
    });
    const loadData = async () => {
      loading.value = true;
      try {
        const client = getSupabaseClient();
        let query = client.from("refund_requests").select(`
        id,
        order_id,
        user_id,
        reason,
        reason_detail,
        created_at,
        reviewed_at,
        orders!inner(order_no),
        profiles!refund_requests_user_id_fkey(nickname)
      `, { count: "exact" }).eq("status", "cancelled").order("reviewed_at", { ascending: false }).range((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value - 1);
        const { data, error, count } = await query;
        if (error) {
          console.error("\u52A0\u8F7D\u5931\u8D25:", error);
          ElMessage.error("\u52A0\u8F7D\u5931\u8D25: " + error.message);
          return;
        }
        cancelledList.value = (data || []).map((item) => {
          var _a, _b;
          return {
            id: item.id,
            order_id: item.order_id,
            order_no: ((_a = item.orders) == null ? void 0 : _a.order_no) || "-",
            user_id: item.user_id,
            user_nickname: (_b = item.profiles) == null ? void 0 : _b.nickname,
            reason: item.reason,
            reason_detail: item.reason_detail,
            created_at: item.created_at,
            reviewed_at: item.reviewed_at
          };
        });
        totalCount.value = count || 0;
      } catch (e) {
        ElMessage.error("\u7CFB\u7EDF\u9519\u8BEF: " + e.message);
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      currentPage.value = 1;
      loadData();
    };
    const handleRefresh = () => {
      filterParams.orderNo = "";
      filterParams.uid = "";
      currentPage.value = 1;
      loadData();
    };
    const handlePageChange = (page) => {
      currentPage.value = page;
      loadData();
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_statistic = ElStatistic;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-stats-page" }, _attrs))} data-v-97bb9292><div class="page-header" data-v-97bb9292><h2 data-v-97bb9292>\u9000\u6B3E\u7EDF\u8BA1</h2><p class="sub-desc" data-v-97bb9292>\u5DF2\u53D6\u6D88\u7684\u9000\u6B3E\u7533\u8BF7\u8BB0\u5F55</p></div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "filter-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-container" data-v-97bb9292${_scopeId}><div class="filter-left" data-v-97bb9292${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: filterParams.orderNo,
              "onUpdate:modelValue": ($event) => filterParams.orderNo = $event,
              placeholder: "\u8BA2\u5355\u53F7",
              clearable: "",
              style: { "width": "200px", "margin-right": "15px" },
              onKeyup: handleSearch
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(search_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(search_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: filterParams.uid,
              "onUpdate:modelValue": ($event) => filterParams.uid = $event,
              placeholder: "\u7528\u6237UID",
              clearable: "",
              style: { "width": "150px", "margin-right": "15px" },
              onKeyup: handleSearch
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(user_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(user_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(user_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(search_default),
              onClick: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u67E5\u8BE2`);
                } else {
                  return [
                    createTextVNode("\u67E5\u8BE2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: handleRefresh
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="filter-right" data-v-97bb9292${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_statistic, { title: "\u603B\u53D6\u6D88\u6B21\u6570" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="stat-number" data-v-97bb9292${_scopeId2}>${ssrInterpolate(totalCount.value)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "stat-number" }, toDisplayString(totalCount.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "filter-container" }, [
                createVNode("div", { class: "filter-left" }, [
                  createVNode(_component_el_input, {
                    modelValue: filterParams.orderNo,
                    "onUpdate:modelValue": ($event) => filterParams.orderNo = $event,
                    placeholder: "\u8BA2\u5355\u53F7",
                    clearable: "",
                    style: { "width": "200px", "margin-right": "15px" },
                    onKeyup: withKeys(handleSearch, ["enter"])
                  }, {
                    prefix: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(search_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_input, {
                    modelValue: filterParams.uid,
                    "onUpdate:modelValue": ($event) => filterParams.uid = $event,
                    placeholder: "\u7528\u6237UID",
                    clearable: "",
                    style: { "width": "150px", "margin-right": "15px" },
                    onKeyup: withKeys(handleSearch, ["enter"])
                  }, {
                    prefix: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(user_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    icon: unref(search_default),
                    onClick: handleSearch
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u67E5\u8BE2")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(_component_el_button, {
                    icon: unref(refresh_default),
                    onClick: handleRefresh
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5237\u65B0")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                createVNode("div", { class: "filter-right" }, [
                  createVNode(_component_el_statistic, { title: "\u603B\u53D6\u6D88\u6B21\u6570" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "stat-number" }, toDisplayString(totalCount.value), 1)
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "list-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: cancelledList.value,
              style: { "width": "100%" },
              border: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "order_no",
                    label: "\u8BA2\u5355\u53F7",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u7528\u6237",
                    width: "150"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(`<span data-v-97bb9292${_scopeId3}>${ssrInterpolate(row.user_nickname || ((_a = row.user_id) == null ? void 0 : _a.slice(0, 8)))}</span>`);
                      } else {
                        return [
                          createVNode("span", null, toDisplayString(row.user_nickname || ((_b = row.user_id) == null ? void 0 : _b.slice(0, 8))), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "reason",
                    label: "\u9000\u6B3E\u539F\u56E0",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "reason_detail",
                    label: "\u8865\u5145\u8BF4\u660E",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.reason_detail || "-")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.reason_detail || "-"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u7533\u8BF7\u65F6\u95F4",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatDate(row.created_at))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u53D6\u6D88\u65F6\u95F4",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatDate(row.reviewed_at))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatDate(row.reviewed_at)), 1)
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
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, { type: "info" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u5DF2\u53D6\u6D88`);
                            } else {
                              return [
                                createTextVNode("\u5DF2\u53D6\u6D88")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, { type: "info" }, {
                            default: withCtx(() => [
                              createTextVNode("\u5DF2\u53D6\u6D88")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "order_no",
                      label: "\u8BA2\u5355\u53F7",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u7528\u6237",
                      width: "150"
                    }, {
                      default: withCtx(({ row }) => {
                        var _a;
                        return [
                          createVNode("span", null, toDisplayString(row.user_nickname || ((_a = row.user_id) == null ? void 0 : _a.slice(0, 8))), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "reason",
                      label: "\u9000\u6B3E\u539F\u56E0",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "reason_detail",
                      label: "\u8865\u5145\u8BF4\u660E",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(row.reason_detail || "-"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u7533\u8BF7\u65F6\u95F4",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u53D6\u6D88\u65F6\u95F4",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.reviewed_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u72B6\u6001",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, { type: "info" }, {
                          default: withCtx(() => [
                            createTextVNode("\u5DF2\u53D6\u6D88")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="pagination-wrapper" style="${ssrRenderStyle({ "margin-top": "20px", "display": "flex", "justify-content": "flex-end" })}" data-v-97bb9292${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              background: "",
              layout: "total, prev, pager, next",
              total: totalCount.value,
              "page-size": pageSize.value,
              "current-page": currentPage.value,
              onCurrentChange: handlePageChange
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: cancelledList.value,
                style: { "width": "100%" },
                border: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "order_no",
                    label: "\u8BA2\u5355\u53F7",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u7528\u6237",
                    width: "150"
                  }, {
                    default: withCtx(({ row }) => {
                      var _a;
                      return [
                        createVNode("span", null, toDisplayString(row.user_nickname || ((_a = row.user_id) == null ? void 0 : _a.slice(0, 8))), 1)
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "reason",
                    label: "\u9000\u6B3E\u539F\u56E0",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "reason_detail",
                    label: "\u8865\u5145\u8BF4\u660E",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(row.reason_detail || "-"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u7533\u8BF7\u65F6\u95F4",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u53D6\u6D88\u65F6\u95F4",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatDate(row.reviewed_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tag, { type: "info" }, {
                        default: withCtx(() => [
                          createTextVNode("\u5DF2\u53D6\u6D88")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, loading.value]
              ]),
              createVNode("div", {
                class: "pagination-wrapper",
                style: { "margin-top": "20px", "display": "flex", "justify-content": "flex-end" }
              }, [
                createVNode(_component_el_pagination, {
                  background: "",
                  layout: "total, prev, pager, next",
                  total: totalCount.value,
                  "page-size": pageSize.value,
                  "current-page": currentPage.value,
                  onCurrentChange: handlePageChange
                }, null, 8, ["total", "page-size", "current-page"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/orders/cancelled-refunds/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97bb9292"]]);

export { index as default };
//# sourceMappingURL=index-ONWF44uy.mjs.map
