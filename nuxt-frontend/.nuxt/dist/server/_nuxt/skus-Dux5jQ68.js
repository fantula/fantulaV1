import { E as ElRadioGroup, a as ElRadioButton } from "./index-tnznqLDe.js";
import { E as ElButton } from "./index-BmUjCntg.js";
import { E as ElTableColumn } from "./index-Bx8hctOV.js";
import { E as ElImage } from "./index-Dl9iHi_U.js";
import { E as ElTag } from "./index-BwbEmU3g.js";
/* empty css              */
/* empty css                        */
/* empty css                         */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                         */
import { ref, defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { M as refresh_default, _ as delete_default } from "./index-CCIZH4aC.js";
import { A as AdminActionCard } from "./AdminActionCard-l7l1Gr-n.js";
import { A as AdminDataTable } from "./AdminDataTable-D1_qu9TL.js";
import { P as PageTipHeader } from "./PageTipHeader-CeUy9d_M.js";
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { a as adminSkuApi } from "./sku-DxqcmBf6.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { E as ElMessageBox } from "./index-C2vl4wFZ.js";
import { E as ElMessage } from "./index-CIurcsSv.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./index-C1njJNPQ.js";
import "./event-BZTOGHfp.js";
import "./use-form-item-BJm4fR6K.js";
import "./constants-hAKFmBbq.js";
import "./index-DqrhOzxH.js";
import "./icon-CadSVx0p.js";
import "./index-C4aUwruK.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-CaR6i8cb.js";
import "@ctrl/tinycolor";
import "./index-CKAw5W0O.js";
import "./index-CLY1HctY.js";
import "@popperjs/core";
import "./index-DHEUW9kI.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-7dcjom-z.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./typescript-D6L75muK.js";
import "./index-COtmEGfB.js";
import "./scroll-ozMyDWSO.js";
import "./index-DuyRWKSc.js";
import "./index-CMbz_fag.js";
/* empty css                    */
import "./index-bbvp9z3V.js";
import "./index-_mZ_Kpkf.js";
import "./index-lNg7AKkv.js";
import "./strings-D1uxkXhq.js";
import "./index-Q1HnLtiN.js";
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
import "./index-BkMjcDuB.js";
/* empty css                  */
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
import "./index-BxcbCFKt.js";
import "./validator-BiwSbFK3.js";
function useAdminGlobalSkuList() {
  const loading = ref(false);
  const skus2 = ref([]);
  const filterMode = ref("unlinked");
  const selectedIds = ref([]);
  const loadSkus = async () => {
    loading.value = true;
    selectedIds.value = [];
    try {
      const res = await adminSkuApi.getAllSkus({
        showUnlinkedOnly: filterMode.value === "unlinked"
      });
      if (res.success) {
        skus2.value = res.skus || [];
      } else {
        ElMessage.error(res.error || "加载失败");
      }
    } catch (e) {
      ElMessage.error(e.message || "系统错误");
    } finally {
      loading.value = false;
    }
  };
  const handleFilterChange = () => {
    loadSkus();
  };
  const handleDelete = (row) => {
    ElMessageBox.confirm("确认删除此 SKU (包含解除相关联的所有 CDK/商品绑定)？", "删除确认", {
      type: "warning",
      confirmButtonText: "确定删除",
      cancelButtonText: "取消"
    }).then(async () => {
      const res = await adminSkuApi.deleteSkus([row.id]);
      if (res.success) {
        ElMessage.success("删除成功");
        loadSkus();
      } else {
        ElMessage.error(res.error);
      }
    });
  };
  const handleBulkDelete = () => {
    if (!selectedIds.value.length) return;
    ElMessageBox.confirm(`确认批量删除 ${selectedIds.value.length} 个 SKU (强制解绑所有关联)？`, "高风险操作", {
      type: "error",
      confirmButtonText: "确定删除",
      cancelButtonText: "取消"
    }).then(async () => {
      const res = await adminSkuApi.deleteSkus(selectedIds.value);
      if (res.success) {
        ElMessage.success("批量删除成功");
        loadSkus();
      } else {
        ElMessage.error(res.error);
      }
    });
  };
  const handleSelectionChange = (val) => {
    selectedIds.value = val.map((v) => v.id);
  };
  const formatDate = (str) => str ? new Date(str).toLocaleString("zh-CN", { fontSize: "12px" }) : "-";
  const { getProductTypeLabel, getProductTypeTag } = useBizConfig();
  return {
    loading,
    skus: skus2,
    filterMode,
    selectedIds,
    loadSkus,
    handleFilterChange,
    handleDelete,
    handleBulkDelete,
    handleSelectionChange,
    formatDate,
    getProductTypeLabel,
    getProductTypeTag
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "skus",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      skus: skus2,
      filterMode,
      selectedIds,
      loadSkus,
      handleFilterChange,
      handleDelete,
      handleBulkDelete,
      handleSelectionChange,
      formatDate,
      getProductTypeLabel,
      getProductTypeTag
    } = useAdminGlobalSkuList();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "skus-page" }, _attrs))} data-v-915b7412>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "此处显示所有 SKU 物理数据。删除 SKU 将自动解除它与所有商品和CDK的关联，请谨慎操作。",
        type: "warning"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-915b7412${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_radio_group, {
              modelValue: unref(filterMode),
              "onUpdate:modelValue": ($event) => isRef(filterMode) ? filterMode.value = $event : null,
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
                  modelValue: unref(filterMode),
                  "onUpdate:modelValue": ($event) => isRef(filterMode) ? filterMode.value = $event : null,
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
              onClick: unref(loadSkus),
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
              disabled: !unref(selectedIds).length,
              onClick: unref(handleBulkDelete)
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
                onClick: unref(loadSkus),
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
                disabled: !unref(selectedIds).length,
                onClick: unref(handleBulkDelete)
              }, {
                default: withCtx(() => [
                  createTextVNode(" 批量删除 ")
                ]),
                _: 1
              }, 8, ["icon", "disabled", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        ref: "adminTableRef",
        data: unref(skus2),
        loading: unref(loading),
        onSelectionChange: unref(handleSelectionChange)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "SKU 规格",
              width: "280"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="sku-cell" data-v-915b7412${_scopeId2}>`);
                  if (row.image) {
                    _push3(ssrRenderComponent(_component_el_image, {
                      src: row.image,
                      class: "sku-thumb",
                      "preview-src-list": [row.image],
                      "preview-teleported": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="sku-info" data-v-915b7412${_scopeId2}><div class="sku-specs" data-v-915b7412${_scopeId2}>`);
                  if (row.tag_name) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      type: "info",
                      effect: "plain",
                      style: { "margin-right": "4px" }
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(row.tag_name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(row.tag_name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(row.spec_combination || {}, (val, key) => {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      key,
                      size: "small",
                      effect: "plain",
                      style: { "margin-right": "4px" }
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(key)}: ${ssrInterpolate(val)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(key) + ": " + toDisplayString(val), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "sku-cell" }, [
                      row.image ? (openBlock(), createBlock(_component_el_image, {
                        key: 0,
                        src: row.image,
                        class: "sku-thumb",
                        "preview-src-list": [row.image],
                        "preview-teleported": ""
                      }, null, 8, ["src", "preview-src-list"])) : createCommentVNode("", true),
                      createVNode("div", { class: "sku-info" }, [
                        createVNode("div", { class: "sku-specs" }, [
                          row.tag_name ? (openBlock(), createBlock(_component_el_tag, {
                            key: 0,
                            size: "small",
                            type: "info",
                            effect: "plain",
                            style: { "margin-right": "4px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.tag_name), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(row.spec_combination || {}, (val, key) => {
                            return openBlock(), createBlock(_component_el_tag, {
                              key,
                              size: "small",
                              effect: "plain",
                              style: { "margin-right": "4px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(key) + ": " + toDisplayString(val), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "类型",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: unref(getProductTypeTag)(row.product_type)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(getProductTypeLabel)(row.product_type))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(getProductTypeLabel)(row.product_type)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: unref(getProductTypeTag)(row.product_type)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(getProductTypeLabel)(row.product_type)), 1)
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
                  if (row.is_linked) {
                    _push3(`<div class="linked-products" data-v-915b7412${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "success",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`已绑定 ${ssrInterpolate(row.linked_count)} 个商品`);
                        } else {
                          return [
                            createTextVNode("已绑定 " + toDisplayString(row.linked_count) + " 个商品", 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div data-v-915b7412${_scopeId2}>`);
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
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    row.is_linked ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "linked-products"
                    }, [
                      createVNode(_component_el_tag, {
                        type: "success",
                        effect: "plain",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("已绑定 " + toDisplayString(row.linked_count) + " 个商品", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_el_tag, {
                        type: "danger",
                        effect: "plain",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("未绑定")
                        ]),
                        _: 1
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "库存",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-915b7412${_scopeId2}>${ssrInterpolate(row.stock_count !== void 0 ? row.stock_count : "-")}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.stock_count !== void 0 ? row.stock_count : "-"), 1)
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
                  _push3(`<span class="time-text" data-v-915b7412${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.created_at))}</span>`);
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
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "danger",
                    link: "",
                    size: "small",
                    onClick: ($event) => unref(handleDelete)(row)
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
                  return [
                    createVNode(_component_el_button, {
                      type: "danger",
                      link: "",
                      size: "small",
                      onClick: ($event) => unref(handleDelete)(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("删除")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                type: "selection",
                width: "55"
              }),
              createVNode(_component_el_table_column, {
                label: "SKU 规格",
                width: "280"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "sku-cell" }, [
                    row.image ? (openBlock(), createBlock(_component_el_image, {
                      key: 0,
                      src: row.image,
                      class: "sku-thumb",
                      "preview-src-list": [row.image],
                      "preview-teleported": ""
                    }, null, 8, ["src", "preview-src-list"])) : createCommentVNode("", true),
                    createVNode("div", { class: "sku-info" }, [
                      createVNode("div", { class: "sku-specs" }, [
                        row.tag_name ? (openBlock(), createBlock(_component_el_tag, {
                          key: 0,
                          size: "small",
                          type: "info",
                          effect: "plain",
                          style: { "margin-right": "4px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.tag_name), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(row.spec_combination || {}, (val, key) => {
                          return openBlock(), createBlock(_component_el_tag, {
                            key,
                            size: "small",
                            effect: "plain",
                            style: { "margin-right": "4px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(key) + ": " + toDisplayString(val), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "类型",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: unref(getProductTypeTag)(row.product_type)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(getProductTypeLabel)(row.product_type)), 1)
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
                  row.is_linked ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "linked-products"
                  }, [
                    createVNode(_component_el_tag, {
                      type: "success",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("已绑定 " + toDisplayString(row.linked_count) + " 个商品", 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(_component_el_tag, {
                      type: "danger",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("未绑定")
                      ]),
                      _: 1
                    })
                  ]))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "库存",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.stock_count !== void 0 ? row.stock_count : "-"), 1)
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
                  createVNode(_component_el_button, {
                    type: "danger",
                    link: "",
                    size: "small",
                    onClick: ($event) => unref(handleDelete)(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("删除")
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
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/products/skus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const skus = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-915b7412"]]);
export {
  skus as default
};
//# sourceMappingURL=skus-Dux5jQ68.js.map
