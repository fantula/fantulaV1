import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { v as vLoading } from "./directive-BHLqqXUb.js";
import "./base-CEWXqFm3.js";
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                    */
import { ref, reactive, defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, withKeys, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { af as search_default, B as user_default, M as refresh_default } from "./index-DNnPa_Q9.js";
import { P as PageTipHeader } from "./PageTipHeader-DurXbUjx.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { B as BulkActionBar } from "./BulkActionBar-CLGgud4y.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
/* empty css                    */
/* empty css                        */
/* empty css                    */
import { a as adminCouponApi } from "./coupon-Llh82Qx6.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { E as ElMessageBox } from "./index-VfPbkY7T.js";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { _ as _export_sfc } from "../server.mjs";
import "./typescript-D6L75muK.js";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./event-BZTOGHfp.js";
import "./index-Cxdfotkm.js";
import "@vueuse/core";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "./aria-Rs9hkxop.js";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C5kRDPtv.js";
import "@ctrl/tinycolor";
import "./index-BAMVq552.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-NROOS5rD.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-BC7fiCUI.js";
import "./vnode-uc6o_sOa.js";
/* empty css                  */
import "./index-CD49T52w.js";
/* empty css                    */
import "./index-BRSsuUkY.js";
import "./index-D9RjcsL2.js";
import "./index-B_mQW-wd.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./index-C8YaaWrc.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
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
import "./index-IoXmILvB.js";
import "./validator-BZYOvvAA.js";
import "./index-BrJcxSwt.js";
const useAdminCouponStats = () => {
  const loading = ref(false);
  const dataList = ref([]);
  const selectedIds = ref([]);
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    total: 0
  });
  const filters = reactive({
    code: "",
    userUid: ""
  });
  const { formatDate } = useBizFormat();
  const { getCouponStatusType, getCouponStatusLabel } = useBizConfig();
  const loadData = async () => {
    loading.value = true;
    try {
      const { success, data, total, error } = await adminCouponApi.getCouponStats({
        page: pagination.page,
        pageSize: pagination.pageSize,
        code: filters.code,
        userUid: filters.userUid
      });
      if (success) {
        dataList.value = data;
        pagination.total = total;
      } else {
        ElMessage.error(error || "加载失败");
      }
    } catch (e) {
      ElMessage.error("系统异常: " + e.message);
    } finally {
      loading.value = false;
    }
  };
  const handleSearch = () => {
    pagination.page = 1;
    loadData();
  };
  const handleSizeChange = (val) => {
    pagination.pageSize = val;
    pagination.page = 1;
    loadData();
  };
  const handleCurrentChange = (val) => {
    pagination.page = val;
    loadData();
  };
  const handleSelectionChange = (rows) => {
    selectedIds.value = rows.map((r) => r.id);
  };
  const doDelete = async (ids) => {
    try {
      const { success, count, error } = await adminCouponApi.deleteCouponUsages(ids);
      if (success) {
        ElMessage.success(`成功删除 ${count || ids.length} 条记录`);
        loadData();
        selectedIds.value = [];
      } else {
        ElMessage.error(error || "删除失败");
      }
    } catch (e) {
      ElMessage.error("删除异常: " + e.message);
    }
  };
  const handleDelete = (row) => {
    ElMessageBox.confirm("确定删除该条记录吗？删除后用户侧将不再显示此优惠券。", "警告", {
      confirmButtonText: "确定删除",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      doDelete([row.id]);
    }).catch(() => {
    });
  };
  const handleBatchDelete = () => {
    if (selectedIds.value.length === 0) return;
    ElMessageBox.confirm(`确定删除选中的 ${selectedIds.value.length} 条记录吗？`, "批量删除", {
      confirmButtonText: "确定删除",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      doDelete(selectedIds.value);
    }).catch(() => {
    });
  };
  return {
    // State
    loading,
    dataList,
    selectedIds,
    pagination,
    filters,
    // Actions
    loadData,
    handleSearch,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleDelete,
    handleBatchDelete,
    // Formatters
    formatDate,
    getCouponStatusType,
    getCouponStatusLabel
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      dataList,
      selectedIds,
      pagination,
      filters,
      loadData,
      handleSearch,
      handleSelectionChange,
      handleDelete,
      handleBatchDelete,
      formatDate,
      getCouponStatusType,
      getCouponStatusLabel
    } = useAdminCouponStats();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-stats-page" }, _attrs))} data-v-1e65dcee>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "优惠券统计",
        description: "查看优惠券领取和使用记录，支持按兑换码或用户查询。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: unref(loadData)
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
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: unref(loadData)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon", "onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-1e65dcee${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(filters).code,
              "onUpdate:modelValue": ($event) => unref(filters).code = $event,
              placeholder: "搜索兑换码",
              style: { "width": "200px" },
              clearable: "",
              onKeyup: unref(handleSearch),
              onClear: unref(handleSearch)
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
              modelValue: unref(filters).userUid,
              "onUpdate:modelValue": ($event) => unref(filters).userUid = $event,
              placeholder: "搜索用户UID (8位)",
              style: { "width": "200px" },
              clearable: "",
              onKeyup: unref(handleSearch),
              onClear: unref(handleSearch)
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
              onClick: unref(handleSearch)
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-group" }, [
                createVNode(_component_el_input, {
                  modelValue: unref(filters).code,
                  "onUpdate:modelValue": ($event) => unref(filters).code = $event,
                  placeholder: "搜索兑换码",
                  style: { "width": "200px" },
                  clearable: "",
                  onKeyup: withKeys(unref(handleSearch), ["enter"]),
                  onClear: unref(handleSearch)
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
                }, 8, ["modelValue", "onUpdate:modelValue", "onKeyup", "onClear"]),
                createVNode(_component_el_input, {
                  modelValue: unref(filters).userUid,
                  "onUpdate:modelValue": ($event) => unref(filters).userUid = $event,
                  placeholder: "搜索用户UID (8位)",
                  style: { "width": "200px" },
                  clearable: "",
                  onKeyup: withKeys(unref(handleSearch), ["enter"]),
                  onClear: unref(handleSearch)
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
                }, 8, ["modelValue", "onUpdate:modelValue", "onKeyup", "onClear"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: unref(handleSearch)
                }, {
                  default: withCtx(() => [
                    createTextVNode("查询")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(selectedIds).length > 0) {
        _push(ssrRenderComponent(BulkActionBar, {
          count: unref(selectedIds).length,
          onDelete: unref(handleBatchDelete)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataTable, mergeProps({
        data: unref(dataList),
        total: unref(pagination).total,
        "current-page": unref(pagination).page,
        "onUpdate:currentPage": ($event) => unref(pagination).page = $event,
        "page-size": unref(pagination).pageSize,
        "onUpdate:pageSize": ($event) => unref(pagination).pageSize = $event,
        onPageChange: unref(loadData),
        onSelectionChange: unref(handleSelectionChange)
      }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "code",
              label: "兑换码",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="code-text" data-v-1e65dcee${_scopeId2}>${ssrInterpolate(row.code)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "code-text" }, toDisplayString(row.code), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "coupon_name",
              label: "优惠券名称",
              "min-width": "150"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "所属用户",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.display_uid || row.user_uid) {
                    _push3(`<div class="user-cell" data-v-1e65dcee${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(row.display_uid || row.user_uid)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(row.display_uid || row.user_uid), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (row.user_nickname) {
                      _push3(`<div class="user-nickname" data-v-1e65dcee${_scopeId2}>${ssrInterpolate(row.user_nickname)}</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<span class="text-gray" data-v-1e65dcee${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.display_uid || row.user_uid ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "user-cell"
                    }, [
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.display_uid || row.user_uid), 1)
                        ]),
                        _: 2
                      }, 1024),
                      row.user_nickname ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "user-nickname"
                      }, toDisplayString(row.user_nickname), 1)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-gray"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "关联订单",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.order_no) {
                    _push3(`<span class="order-no" data-v-1e65dcee${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
                  } else if (row.order_id) {
                    _push3(`<span class="order-uuid" data-v-1e65dcee${_scopeId2}>${ssrInterpolate(row.order_id)}</span>`);
                  } else {
                    _push3(`<span class="text-gray" data-v-1e65dcee${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.order_no ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "order-no"
                    }, toDisplayString(row.order_no), 1)) : row.order_id ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "order-uuid"
                    }, toDisplayString(row.order_id), 1)) : (openBlock(), createBlock("span", {
                      key: 2,
                      class: "text-gray"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "status",
              label: "状态",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: unref(getCouponStatusType)(row.status),
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(getCouponStatusLabel)(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(getCouponStatusLabel)(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: unref(getCouponStatusType)(row.status),
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(getCouponStatusLabel)(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "领取时间",
              width: "170",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatDate)(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "使用时间",
              width: "170",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatDate)(row.used_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatDate)(row.used_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "100",
              align: "center",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (["used", "expired"].includes(row.status)) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => unref(handleDelete)(row)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 删除 `);
                        } else {
                          return [
                            createTextVNode(" 删除 ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    ["used", "expired"].includes(row.status) ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => unref(handleDelete)(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 删除 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                type: "selection",
                width: "55",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "code",
                label: "兑换码",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "code-text" }, toDisplayString(row.code), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "coupon_name",
                label: "优惠券名称",
                "min-width": "150"
              }),
              createVNode(_component_el_table_column, {
                label: "所属用户",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  row.display_uid || row.user_uid ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "user-cell"
                  }, [
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.display_uid || row.user_uid), 1)
                      ]),
                      _: 2
                    }, 1024),
                    row.user_nickname ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "user-nickname"
                    }, toDisplayString(row.user_nickname), 1)) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-gray"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "关联订单",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  row.order_no ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "order-no"
                  }, toDisplayString(row.order_no), 1)) : row.order_id ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: "order-uuid"
                  }, toDisplayString(row.order_id), 1)) : (openBlock(), createBlock("span", {
                    key: 2,
                    class: "text-gray"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "status",
                label: "状态",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: unref(getCouponStatusType)(row.status),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(getCouponStatusLabel)(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "领取时间",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "使用时间",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatDate)(row.used_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "100",
                align: "center",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  ["used", "expired"].includes(row.status) ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    link: "",
                    type: "danger",
                    size: "small",
                    onClick: ($event) => unref(handleDelete)(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 删除 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/coupons/stats/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e65dcee"]]);
export {
  index as default
};
//# sourceMappingURL=index-3mQEZDcm.js.map
