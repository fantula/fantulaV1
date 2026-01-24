import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElRadioGroup, a as ElRadioButton } from "./index-f9lru7bI.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { b9 as refresh_default, bb as delete_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
/* empty css                  */
/* empty css                        */
/* empty css                         */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                         */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { a as adminCdkApi } from "./cdk-ObzrOMzo.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-CCOHgBz_.js";
import { u as useBizConfig } from "./useBizConfig-DtWyKy4G.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./vnode-D0IHQw_9.js";
import "@vue/shared";
import "./event-BZTOGHfp.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "./index-7IYgoTSU.js";
import "./index-Dxw_X3Hq.js";
import "lodash-unified";
import "@ctrl/tinycolor";
import "./index-D_b573Qt.js";
import "@vueuse/core";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./index-ClPmkyX9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-DKY_z0U1.js";
import "./index-cR1ntQxK.js";
import "./index-Cf_t59lc.js";
import "./strings-D1uxkXhq.js";
import "./index-Bf1ETwA6.js";
import "./index-DCrMmn3b.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./directive-tOiqatq5.js";
import "./index-Dg8Z-nTr.js";
import "./validator-T0bsmJHo.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cdks",
  __ssrInlineRender: true,
  setup(__props) {
    const { getProductTypeLabel, getProductTypeTag, getCdkStatusLabel, getCdkStatusType } = useBizConfig();
    const { formatDate } = useBizFormat();
    const loading = ref(false);
    const filterMode = ref("all");
    const cdks2 = ref([]);
    const selectedIds = ref([]);
    const loadCdks = async () => {
      loading.value = true;
      try {
        const res = await adminCdkApi.getCdks({ limit: 500 });
        if (res.success) {
          let data = res.cdks || [];
          if (filterMode.value === "unlinked") {
            data = data.filter((cdk) => !cdk.sku_mappings || cdk.sku_mappings.length === 0);
          }
          cdks2.value = data;
        } else {
          ElMessage.error(res.error);
        }
      } catch (e) {
        ElMessage.error(e.message || "加载失败");
      } finally {
        loading.value = false;
      }
    };
    const handleFilterChange = () => {
      loadCdks();
    };
    const getCdkTypeLabel = (type) => getProductTypeLabel(type);
    const getCdkTypeTag = (type) => getProductTypeTag(type);
    const getStatusLabel = (s) => getCdkStatusLabel(s);
    const getStatusType = (s) => getCdkStatusType(s);
    const formatSkuSpec = (spec) => {
      if (!spec) return "默认";
      return Object.values(spec).join(" / ");
    };
    const canSelectRow = (row) => !row.sku_mappings || row.sku_mappings.length === 0;
    const handleSelectionChange = (val) => {
      selectedIds.value = val.map((v) => v.id);
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("确认删除此未绑定的孤儿 CDK 吗？此操作无法恢复。", "警告", { type: "warning" }).then(async () => {
        const res = await adminCdkApi.deleteCdk(row.id);
        if (res.success) {
          ElMessage.success("删除成功");
          loadCdks();
        } else ElMessage.error(res.error);
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
          selectedIds.value = [];
          loadCdks();
        } else ElMessage.error(res.error);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdks-page" }, _attrs))} data-v-b5660394><div class="page-tip-header" data-v-b5660394>`);
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
            _push2(`<div class="filter-group" data-v-b5660394${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_radio_group, {
              modelValue: filterMode.value,
              "onUpdate:modelValue": ($event) => filterMode.value = $event,
              onChange: handleFilterChange
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
                  modelValue: filterMode.value,
                  "onUpdate:modelValue": ($event) => filterMode.value = $event,
                  onChange: handleFilterChange
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
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadCdks,
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
              disabled: !selectedIds.value.length,
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
                onClick: loadCdks,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "danger",
                icon: unref(delete_default),
                disabled: !selectedIds.value.length,
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
        data: cdks2.value,
        loading: loading.value,
        onSelectionChange: handleSelectionChange
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
                  _push3(`<div class="product-cell" style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}" data-v-b5660394${_scopeId2}>`);
                  if (row.product_snapshot?.product_image) {
                    _push3(ssrRenderComponent(_component_el_image, {
                      src: row.product_snapshot.product_image,
                      fit: "cover",
                      style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span class="product-name" data-v-b5660394${_scopeId2}>${ssrInterpolate(row.product_snapshot?.product_name || "未知商品")}</span></div>`);
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
                    _push3(`<div class="linked-skus" data-v-b5660394${_scopeId2}><!--[-->`);
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
                      _push3(`<span class="more-tag" data-v-b5660394${_scopeId2}>+${ssrInterpolate(row.sku_mappings.length - 2)}</span>`);
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
                  _push3(`<span class="code-text" data-v-b5660394${_scopeId2}>${ssrInterpolate(row.code || "-")}</span>`);
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
                  _push3(`<span data-v-b5660394${_scopeId2}>${ssrInterpolate(row.stock ?? 1)}</span>`);
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
                  _push3(`<span class="time-text" data-v-b5660394${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.created_at))}</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/cdk/cdks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cdks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b5660394"]]);
export {
  cdks as default
};
//# sourceMappingURL=cdks-DYwHvdnx.js.map
