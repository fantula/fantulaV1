import { E as ElCard } from "./index-D03GMqMv.js";
import { E as ElInput } from "./index-DHiqjM1w.js";
import { E as ElIcon } from "./index-CsSUb8pm.js";
import { E as ElButton } from "./index-DV2Xa1Kj.js";
import { E as ElStatistic } from "./index-DXXrwTQC.js";
import { a as ElTable, E as ElTableColumn } from "./index-ghXUvVLW.js";
import { E as ElTag } from "./index-CzsgKIaa.js";
import { E as ElPagination } from "./index-BDljrZG0.js";
import { v as vLoading } from "./directive-DOWfgPYe.js";
/* empty css              */
/* empty css                 */
/* empty css                  */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                       */
/* empty css                   */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withKeys, withDirectives, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderStyle } from "vue/server-renderer";
import { O as search_default, W as user_default, A as refresh_default } from "./index-DuV_oMrC.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-Ho-fELR6.js";
import { _ as _export_sfc } from "../server.mjs";
import "./use-global-config-Dt87SALX.js";
import "./index-xMedQC9S.js";
import "lodash-unified";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "./typescript-D6L75muK.js";
import "./icon-CyvpkMdQ.js";
import "./event-BZTOGHfp.js";
import "./index-C88l1uRA.js";
import "@vueuse/core";
import "./event-D3FEo2C5.js";
import "./index-Cy25Tved.js";
import "./use-form-item-VP6j78iG.js";
import "./constants-hAKFmBbq.js";
import "./aria-Rs9hkxop.js";
import "@ctrl/tinycolor";
import "./index-CVMnQJck.js";
import "./index-B8mpCVSS.js";
import "@popperjs/core";
import "./focus-trap.vue-CG7JU5b_.js";
import "./index-7GSISQj3.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-z3smHzuf.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DHYrZ40v.js";
import "./index-BKas9GMw.js";
import "./vnode-BKSxKQVt.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
          console.error("加载失败:", error);
          ElMessage.error("加载失败: " + error.message);
          return;
        }
        cancelledList.value = (data || []).map((item) => ({
          id: item.id,
          order_id: item.order_id,
          order_no: item.orders?.order_no || "-",
          user_id: item.user_id,
          user_nickname: item.profiles?.nickname,
          reason: item.reason,
          reason_detail: item.reason_detail,
          created_at: item.created_at,
          reviewed_at: item.reviewed_at
        }));
        totalCount.value = count || 0;
      } catch (e) {
        ElMessage.error("系统错误: " + e.message);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-stats-page" }, _attrs))} data-v-8626a269><div class="page-header" data-v-8626a269><h2 data-v-8626a269>退款统计</h2><p class="sub-desc" data-v-8626a269>已取消的退款申请记录</p></div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "filter-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-container" data-v-8626a269${_scopeId}><div class="filter-left" data-v-8626a269${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: filterParams.orderNo,
              "onUpdate:modelValue": ($event) => filterParams.orderNo = $event,
              placeholder: "订单号",
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
              placeholder: "用户UID",
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
                  _push3(`查询`);
                } else {
                  return [
                    createTextVNode("查询")
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
                  _push3(`刷新`);
                } else {
                  return [
                    createTextVNode("刷新")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="filter-right" data-v-8626a269${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_statistic, { title: "总取消次数" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="stat-number" data-v-8626a269${_scopeId2}>${ssrInterpolate(totalCount.value)}</span>`);
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
                    placeholder: "订单号",
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
                    placeholder: "用户UID",
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
                      createTextVNode("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(_component_el_button, {
                    icon: unref(refresh_default),
                    onClick: handleRefresh
                  }, {
                    default: withCtx(() => [
                      createTextVNode("刷新")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                createVNode("div", { class: "filter-right" }, [
                  createVNode(_component_el_statistic, { title: "总取消次数" }, {
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
                    label: "订单号",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "用户",
                    width: "150"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-8626a269${_scopeId3}>${ssrInterpolate(row.user_nickname || row.user_id?.slice(0, 8))}</span>`);
                      } else {
                        return [
                          createVNode("span", null, toDisplayString(row.user_nickname || row.user_id?.slice(0, 8)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "reason",
                    label: "退款原因",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "reason_detail",
                    label: "补充说明",
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
                    label: "申请时间",
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
                    label: "取消时间",
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
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, { type: "info" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`已取消`);
                            } else {
                              return [
                                createTextVNode("已取消")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, { type: "info" }, {
                            default: withCtx(() => [
                              createTextVNode("已取消")
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
                      label: "订单号",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "用户",
                      width: "150"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", null, toDisplayString(row.user_nickname || row.user_id?.slice(0, 8)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "reason",
                      label: "退款原因",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "reason_detail",
                      label: "补充说明",
                      "min-width": "150",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(row.reason_detail || "-"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "申请时间",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "取消时间",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.reviewed_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, { type: "info" }, {
                          default: withCtx(() => [
                            createTextVNode("已取消")
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
            _push2(`<div class="pagination-wrapper" style="${ssrRenderStyle({ "margin-top": "20px", "display": "flex", "justify-content": "flex-end" })}" data-v-8626a269${_scopeId}>`);
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
                    label: "订单号",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "用户",
                    width: "150"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", null, toDisplayString(row.user_nickname || row.user_id?.slice(0, 8)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "reason",
                    label: "退款原因",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "reason_detail",
                    label: "补充说明",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(row.reason_detail || "-"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "申请时间",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "取消时间",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatDate(row.reviewed_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tag, { type: "info" }, {
                        default: withCtx(() => [
                          createTextVNode("已取消")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/cancelled-refunds/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8626a269"]]);
export {
  index as default
};
//# sourceMappingURL=index-nDLRVXBF.js.map
