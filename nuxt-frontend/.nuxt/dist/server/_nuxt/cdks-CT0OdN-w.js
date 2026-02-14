import { E as ElAlert } from "./index-CDEPy-be.js";
import { E as ElRadioGroup, a as ElRadioButton } from "./index-CDoqByFu.js";
import { E as ElButton } from "./index-CGHU_uKU.js";
import { E as ElTableColumn } from "./index-DnlpAwTZ.js";
import { E as ElTag } from "./index-RGUM47gz.js";
import { E as ElImage } from "./index-DMcY9pQb.js";
/* empty css              */
/* empty css                  */
/* empty css                        */
/* empty css                         */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                         */
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { A as refresh_default, B as delete_default } from "./index-CRs4T-Jf.js";
import { a as adminCdkApi } from "./cdk-BjYTT9Wd.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { A as AdminActionCard } from "./AdminActionCard-Br1XkmCK.js";
import { A as AdminDataTable } from "./AdminDataTable-adUoqR6P.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useAdminList } from "./useAdminList-BaLXphr7.js";
import { E as ElMessageBox } from "./index-DwAj9U47.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import "./icon-DxnRhcjj.js";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./index-D6MDXFfa.js";
import "@vueuse/core";
import "@vue/shared";
import "./vnode-uc6o_sOa.js";
import "./index-C8K_s-bH.js";
import "./event-BZTOGHfp.js";
import "./use-form-item-n_L16njV.js";
import "./constants-hAKFmBbq.js";
import "./index-B6zOcltc.js";
import "./use-global-config-C00m4e8W.js";
import "@ctrl/tinycolor";
import "./index-D4s2dalC.js";
import "./index-m3FMdVd3.js";
import "@popperjs/core";
import "./focus-trap.vue-DLhiv9tF.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-RDuG-1hQ.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./typescript-D6L75muK.js";
import "./index-D_dCF80h.js";
import "./scroll-BYDsUCKj.js";
import "./index-DuyRWKSc.js";
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
import "./index-DEoO_C5P.js";
/* empty css                    */
import "./index-DT739kqT.js";
import "./index-CdIsMbUc.js";
import "./index-CIsKhoUN.js";
import "./strings-D1uxkXhq.js";
import "./index-ttyu327u.js";
import "./index-C8YaaWrc.js";
import "./directive-Cp0y9Az7.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./index-Cpe5xmf8.js";
import "./validator-DW0BNsk6.js";
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
        const res = await adminCdkApi.getCdks({ limit: 500 });
        if (!res.success) throw new Error(res.error);
        let data = res.cdks || [];
        if (params.filters.mode === "unlinked") {
          data = data.filter((cdk) => !cdk.sku_mappings || cdk.sku_mappings.length === 0);
        }
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
    const handleDelete = (row) => {
      ElMessageBox.confirm("确认删除此未绑定的孤儿 CDK 吗？此操作无法恢复。", "警告", { type: "warning" }).then(async () => {
        const res = await adminCdkApi.deleteCdk(row.id);
        if (res.success) {
          ElMessage.success("删除成功");
          removeRow(row.id);
        } else {
          ElMessage.error(res.error);
        }
      });
    };
    const handleBulkDelete = () => {
      if (!selectedIds.value.length) return;
      ElMessageBox.confirm(`确认批量删除 ${selectedIds.value.length} 个孤儿 CDK？`, "高风险操作", {
        type: "error",
        confirmButtonText: "确定删除",
        cancelButtonText: "取消"
      }).then(async () => {
        const res = await adminCdkApi.deleteCdks(selectedIds.value);
        if (res.success) {
          ElMessage.success("批量删除成功");
          removeRows(selectedIds.value);
        } else {
          ElMessage.error(res.error);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdks-page" }, _attrs))} data-v-ab87fb70><div class="page-tip-header" data-v-ab87fb70>`);
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
            _push2(`<div class="filter-group" data-v-ab87fb70${_scopeId}>`);
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
              onClick: handleBulkDelete
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
                onClick: handleBulkDelete
              }, {
                default: withCtx(() => [
                  createTextVNode(" 批量删除 ")
                ]),
                _: 1
              }, 8, ["icon", "disabled"])
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
                  _push3(`<div class="product-cell" style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}" data-v-ab87fb70${_scopeId2}>`);
                  if (row.product_snapshot?.product_image) {
                    _push3(ssrRenderComponent(_component_el_image, {
                      src: row.product_snapshot.product_image,
                      fit: "cover",
                      style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span class="product-name" data-v-ab87fb70${_scopeId2}>${ssrInterpolate(row.product_snapshot?.product_name || "未知商品")}</span></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "product-cell",
                      style: { "display": "flex", "align-items": "center" }
                    }, [
                      row.product_snapshot?.product_image ? (openBlock(), createBlock(_component_el_image, {
                        key: 0,
                        src: row.product_snapshot.product_image,
                        fit: "cover",
                        style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", { class: "product-name" }, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                    ])
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
                    _push3(`<div class="linked-skus" data-v-ab87fb70${_scopeId2}><!--[-->`);
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
                      _push3(`<span class="more-tag" data-v-ab87fb70${_scopeId2}>+${ssrInterpolate(row.sku_mappings.length - 2)}</span>`);
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
                  _push3(`<span class="code-text" data-v-ab87fb70${_scopeId2}>${ssrInterpolate(row.code || "-")}</span>`);
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
                  _push3(`<span data-v-ab87fb70${_scopeId2}>${ssrInterpolate(row.stock ?? 1)}</span>`);
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
                  _push3(`<span class="time-text" data-v-ab87fb70${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.created_at))}</span>`);
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
                      onClick: ($event) => handleDelete(row)
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
                      onClick: ($event) => handleDelete(row)
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
                  createVNode("div", {
                    class: "product-cell",
                    style: { "display": "flex", "align-items": "center" }
                  }, [
                    row.product_snapshot?.product_image ? (openBlock(), createBlock(_component_el_image, {
                      key: 0,
                      src: row.product_snapshot.product_image,
                      fit: "cover",
                      style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                    }, null, 8, ["src"])) : createCommentVNode("", true),
                    createVNode("span", { class: "product-name" }, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                  ])
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
                    onClick: ($event) => handleDelete(row)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cdk/cdks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cdks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ab87fb70"]]);
export {
  cdks as default
};
//# sourceMappingURL=cdks-CT0OdN-w.js.map
