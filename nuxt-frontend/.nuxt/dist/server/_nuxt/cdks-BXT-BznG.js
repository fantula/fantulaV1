import { E as ElAlert } from "./index-BC7fiCUI.js";
import { E as ElRadioGroup, a as ElRadioButton } from "./index-_o7w7WVH.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import "./base-CEWXqFm3.js";
/* empty css                  */
/* empty css                        */
/* empty css                         */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { ref, defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { M as refresh_default, _ as delete_default } from "./index-DNnPa_Q9.js";
import { a as adminCdkApi } from "./cdk-5451p_uG.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import { u as useAdminList } from "./useAdminList-DUYkwmjS.js";
import { E as ElMessageBox } from "./index-VfPbkY7T.js";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { P as ProductThumbCell } from "./ProductThumbCell-DjG8-c-D.js";
import "./icon-Ck0_dGQP.js";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./index-_zadwVDN.js";
import "@vueuse/core";
import "@vue/shared";
import "./vnode-uc6o_sOa.js";
import "./index-DbvZsXcZ.js";
import "./event-BZTOGHfp.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "./index-Cxdfotkm.js";
import "./use-global-config-C5kRDPtv.js";
import "@ctrl/tinycolor";
import "./index-BAMVq552.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-NROOS5rD.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "./directive-BHLqqXUb.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./index-IoXmILvB.js";
import "./validator-BZYOvvAA.js";
import "./index-BrJcxSwt.js";
import "./index-BSYGfCfY.js";
/* empty css                         */
function useAdminCdkCleanup(options) {
  const isCleaning = ref(false);
  const handleSingleCleanup = async (row) => {
    try {
      await ElMessageBox.confirm("确认删除此未绑定的孤儿 CDK 吗？此操作无法恢复。", "警告", {
        type: "warning",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button--danger"
      });
      isCleaning.value = true;
      const res = await adminCdkApi.deleteCdk(row.id);
      if (res.success) {
        ElMessage.success("删除成功");
        options?.onDeleteSuccess?.(row.id);
      } else {
        ElMessage.error(res.error || "删除失败");
      }
    } catch {
    } finally {
      isCleaning.value = false;
    }
  };
  const handleBulkCleanup = async (ids) => {
    if (!ids.length) return;
    try {
      await ElMessageBox.confirm(`确认批量删除 ${ids.length} 个孤儿 CDK？`, "高风险操作", {
        type: "error",
        confirmButtonText: "确定删除",
        cancelButtonText: "取消"
      });
      isCleaning.value = true;
      const res = await adminCdkApi.deleteCdks(ids);
      if (res.success) {
        ElMessage.success("批量删除成功");
        options?.onBulkDeleteSuccess?.(ids);
      } else {
        ElMessage.error(res.error || "删除失败");
      }
    } catch {
    } finally {
      isCleaning.value = false;
    }
  };
  return {
    isCleaning,
    handleSingleCleanup,
    handleBulkCleanup
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cdks",
  __ssrInlineRender: true,
  setup(__props) {
    const { getProductTypeLabel, getProductTypeTag, getCdkStatusLabel, getCdkStatusType } = useBizConfig();
    const { formatDate } = useBizFormat();
    const {
      loading,
      list,
      total,
      currentPage,
      pageSize,
      filters,
      selectedIds,
      hasSelection,
      refresh,
      handleFilterChange,
      handleSelectionChange,
      removeRow,
      removeRows
    } = useAdminList({
      defaultFilters: { mode: "all" },
      defaultPageSize: 50,
      // CDK 数据较多，默认 50
      fetchFn: async (params) => {
        if (params.filters.mode === "all") {
          const offset = (params.page - 1) * params.pageSize;
          const res2 = await adminCdkApi.getCdks({
            limit: params.pageSize,
            offset
          });
          if (!res2.success) throw new Error(res2.error);
          return {
            success: true,
            data: res2.cdks,
            total: res2.total
          };
        }
        const res = await adminCdkApi.getCdks({ limit: 1e3 });
        if (!res.success) throw new Error(res.error);
        let data = res.cdks || [];
        data = data.filter((cdk) => !cdk.sku_mappings || cdk.sku_mappings.length === 0);
        const total2 = data.length;
        const start = (params.page - 1) * params.pageSize;
        const end = start + params.pageSize;
        const pagedData = data.slice(start, end);
        return {
          success: true,
          data: pagedData,
          total: total2
        };
      }
    });
    const getCdkTypeLabel = (type) => getProductTypeLabel(type);
    const getCdkTypeTag = (type) => getProductTypeTag(type);
    const getStatusLabel = (s) => getCdkStatusLabel(s);
    const getStatusType = (s) => getCdkStatusType(s);
    const formatSkuSpec = (spec) => {
      if (!spec) return "默认";
      return Object.values(spec).join(" / ");
    };
    const canSelectRow = (row) => !row.sku_mappings || row.sku_mappings.length === 0;
    const { isCleaning, handleSingleCleanup, handleBulkCleanup } = useAdminCdkCleanup({
      onDeleteSuccess: (id) => removeRow(id),
      onBulkDeleteSuccess: (ids) => removeRows(ids)
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdks-page" }, _attrs))} data-v-4846a93f><div class="page-tip-header" data-v-4846a93f>`);
      _push(ssrRenderComponent(_component_el_alert, {
        title: "此处显示所有 CDK 物理数据。建议定期清理未绑定 SKU 的孤儿 CDK。",
        type: "warning",
        "show-icon": "",
        closable: false,
        center: ""
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-4846a93f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_radio_group, {
              modelValue: unref(filters).mode,
              "onUpdate:modelValue": ($event) => unref(filters).mode = $event,
              onChange: unref(handleFilterChange)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "all" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`全部`);
                      } else {
                        return [
                          createTextVNode("全部")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "unlinked" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`未连接`);
                      } else {
                        return [
                          createTextVNode("未连接")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_radio_button, { label: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("全部")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "unlinked" }, {
                      default: withCtx(() => [
                        createTextVNode("未连接")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-group" }, [
                createVNode(_component_el_radio_group, {
                  modelValue: unref(filters).mode,
                  "onUpdate:modelValue": ($event) => unref(filters).mode = $event,
                  onChange: unref(handleFilterChange)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_radio_button, { label: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("全部")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "unlinked" }, {
                      default: withCtx(() => [
                        createTextVNode("未连接")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: unref(refresh),
              icon: unref(refresh_default)
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
            _push2(ssrRenderComponent(_component_el_button, {
              type: "danger",
              icon: unref(delete_default),
              disabled: !unref(hasSelection),
              loading: unref(isCleaning),
              onClick: () => unref(handleBulkCleanup)(unref(selectedIds))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 批量删除 `);
                } else {
                  return [
                    createTextVNode(" 批量删除 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: unref(refresh),
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["onClick", "icon"]),
              createVNode(_component_el_button, {
                type: "danger",
                icon: unref(delete_default),
                disabled: !unref(hasSelection),
                loading: unref(isCleaning),
                onClick: () => unref(handleBulkCleanup)(unref(selectedIds))
              }, {
                default: withCtx(() => [
                  createTextVNode(" 批量删除 ")
                ]),
                _: 1
              }, 8, ["icon", "disabled", "loading", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        ref: "adminTableRef",
        data: unref(list),
        loading: unref(loading),
        total: unref(total),
        page: unref(currentPage),
        "onUpdate:page": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
        pageSize: unref(pageSize),
        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
        onSelectionChange: unref(handleSelectionChange)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55",
              selectable: canSelectRow
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "CDK 类型",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: getCdkTypeTag(row.cdk_type)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getCdkTypeLabel(row.cdk_type))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getCdkTypeLabel(row.cdk_type)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getCdkTypeTag(row.cdk_type)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getCdkTypeLabel(row.cdk_type)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "绑定商品",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ProductThumbCell, {
                    image: row.product_snapshot?.product_image,
                    name: row.product_snapshot?.product_name || "未知商品",
                    id: void 0,
                    "truncate-id": false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ProductThumbCell, {
                      image: row.product_snapshot?.product_image,
                      name: row.product_snapshot?.product_name || "未知商品",
                      id: void 0,
                      "truncate-id": false
                    }, null, 8, ["image", "name"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "绑定 SKU",
              "min-width": "160"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.sku_mappings && row.sku_mappings.length > 0) {
                    _push3(`<div class="linked-skus" data-v-4846a93f${_scopeId2}><!--[-->`);
                    ssrRenderList(row.sku_mappings.slice(0, 2), (mapping) => {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        key: mapping.id,
                        size: "small",
                        effect: "plain",
                        style: { "margin-right": "4px" }
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(formatSkuSpec(mapping.sku?.spec_combination))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(formatSkuSpec(mapping.sku?.spec_combination)), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (row.sku_mappings.length > 2) {
                      _push3(`<span class="more-tag" data-v-4846a93f${_scopeId2}>+${ssrInterpolate(row.sku_mappings.length - 2)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "danger",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`未绑定`);
                        } else {
                          return [
                            createTextVNode("未绑定")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.sku_mappings && row.sku_mappings.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "linked-skus"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.sku_mappings.slice(0, 2), (mapping) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: mapping.id,
                          size: "small",
                          effect: "plain",
                          style: { "margin-right": "4px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(formatSkuSpec(mapping.sku?.spec_combination)), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      row.sku_mappings.length > 2 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "more-tag"
                      }, "+" + toDisplayString(row.sku_mappings.length - 2), 1)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "danger",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("未绑定")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "内容",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="code-text" data-v-4846a93f${_scopeId2}>${ssrInterpolate(row.code || "-")}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "code-text" }, toDisplayString(row.code || "-"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "库存",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-4846a93f${_scopeId2}>${ssrInterpolate(row.stock ?? 1)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.stock ?? 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: getStatusType(row.status),
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getStatusLabel(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getStatusType(row.status),
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "180",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="time-text" data-v-4846a93f${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.created_at))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "time-text" }, toDisplayString(unref(formatDate)(row.created_at)), 1)
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
                  if (!row.sku_mappings || row.sku_mappings.length === 0) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      type: "danger",
                      link: "",
                      size: "small",
                      onClick: ($event) => unref(handleSingleCleanup)(row)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`删除`);
                        } else {
                          return [
                            createTextVNode("删除")
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
                    !row.sku_mappings || row.sku_mappings.length === 0 ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      type: "danger",
                      link: "",
                      size: "small",
                      onClick: ($event) => unref(handleSingleCleanup)(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("删除")
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
                selectable: canSelectRow
              }),
              createVNode(_component_el_table_column, {
                label: "CDK 类型",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: getCdkTypeTag(row.cdk_type)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getCdkTypeLabel(row.cdk_type)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "绑定商品",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(ProductThumbCell, {
                    image: row.product_snapshot?.product_image,
                    name: row.product_snapshot?.product_name || "未知商品",
                    id: void 0,
                    "truncate-id": false
                  }, null, 8, ["image", "name"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "绑定 SKU",
                "min-width": "160"
              }, {
                default: withCtx(({ row }) => [
                  row.sku_mappings && row.sku_mappings.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "linked-skus"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.sku_mappings.slice(0, 2), (mapping) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: mapping.id,
                        size: "small",
                        effect: "plain",
                        style: { "margin-right": "4px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(formatSkuSpec(mapping.sku?.spec_combination)), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    row.sku_mappings.length > 2 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "more-tag"
                    }, "+" + toDisplayString(row.sku_mappings.length - 2), 1)) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "danger",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("未绑定")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "内容",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "code-text" }, toDisplayString(row.code || "-"), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "库存",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.stock ?? 1), 1)
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
                    type: getStatusType(row.status),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "time-text" }, toDisplayString(unref(formatDate)(row.created_at)), 1)
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
                  !row.sku_mappings || row.sku_mappings.length === 0 ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "danger",
                    link: "",
                    size: "small",
                    onClick: ($event) => unref(handleSingleCleanup)(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("删除")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/cdk/cdks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cdks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4846a93f"]]);
export {
  cdks as default
};
//# sourceMappingURL=cdks-BXT-BznG.js.map
