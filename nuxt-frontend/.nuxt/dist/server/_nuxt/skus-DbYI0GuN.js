import { E as ElRadioGroup, a as ElRadioButton } from "./index-5s1BkUoL.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-BB44-vTK.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { by as getAdminSupabaseClient, ah as ElMessage, b9 as refresh_default, bb as delete_default, _ as _export_sfc } from "../server.mjs";
/* empty css                        */
/* empty css                         */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                         */
import { ref, defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-BzMTthVf.js";
import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { u as useBizConfig } from "./useBizConfig-DtWyKy4G.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./event-BZTOGHfp.js";
import "@vue/shared";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "./index-7IYgoTSU.js";
import "./index-Dxw_X3Hq.js";
import "lodash-unified";
import "@ctrl/tinycolor";
import "./index-D_b573Qt.js";
import "@vueuse/core";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-BlpH41lu.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./index-ClPmkyX9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
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
import "./index-Da73tUO2.js";
import "./index-pXKVpQSb.js";
import "./strings-D1uxkXhq.js";
import "./index-Bf1ETwA6.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./directive-tOiqatq5.js";
import "./index-DvOrIhmd.js";
/* empty css                  */
import "./index-Dg8Z-nTr.js";
import "./validator-T0bsmJHo.js";
const adminSkuApi = {
  /**
   * 获取所有物理 SKU (用于 SKU 管理页)
   */
  async getAllSkus(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("product_skus").select("*, product_sku_map(product_id)", { count: "exact" }).is("tag", null);
    const { data, error } = await query;
    if (error) return { success: false, error: error.message };
    let skus2 = data.map((sku) => {
      const mappings = sku.product_sku_map || [];
      return {
        ...sku,
        is_linked: mappings.length > 0,
        linked_count: mappings.length
      };
    });
    if (params?.showUnlinkedOnly) {
      skus2 = skus2.filter((s) => !s.is_linked);
    }
    skus2.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return { success: true, skus: skus2 };
  },
  /**
   * 批量删除 SKU (物理删除)
   * 强制解除关联: CDK映射, 商品映射
   */
  async deleteSkus(ids) {
    const client = getAdminSupabaseClient();
    await client.from("cdk_sku_map").delete().in("sku_id", ids);
    await client.from("product_sku_map").delete().in("sku_id", ids);
    const { error } = await client.from("product_skus").delete().in("id", ids);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 获取共享 SKU 组
   */
  /**
   * 获取共享 SKU 组
   * 逻辑更改: 直接从 product_skus 表根据 tag 字段聚合，不再依赖 shared_sku_groups 表
   */
  async getSharedSkuGroups() {
    const client = getAdminSupabaseClient();
    const { data: skus2, error } = await client.from("product_skus").select("*").not("tag", "is", null).order("tag", { ascending: true }).order("sort_order", { ascending: true });
    if (error) return { success: false, groups: [], error: error.message };
    if (!skus2 || skus2.length === 0) return { success: true, groups: [] };
    const groupsMap = /* @__PURE__ */ new Map();
    skus2.forEach((sku) => {
      const tag = sku.tag;
      if (!groupsMap.has(tag)) {
        groupsMap.set(tag, {
          tag,
          // Use the tag_name from the first SKU found in this group
          tag_name: sku.tag_name || `Group #${tag}`,
          created_at: sku.created_at,
          skus: []
        });
      }
      groupsMap.get(tag).skus.push(sku);
    });
    return { success: true, groups: Array.from(groupsMap.values()) };
  },
  /**
   * 获取使用某共享组的所有商品 (用于查看)
   */
  async getProductsBySharedTag(tag) {
    const client = getAdminSupabaseClient();
    const { data: skus2 } = await client.from("product_skus").select("id").eq("tag", tag);
    if (!skus2 || !skus2.length) return { success: true, products: [] };
    const skuIds = skus2.map((s) => s.id);
    const { data: maps, error: mapError } = await client.from("product_sku_map").select("product_id").in("sku_id", skuIds);
    if (mapError) return { success: false, error: mapError.message };
    if (!maps || !maps.length) return { success: true, products: [] };
    const productIds = [...new Set(maps.map((m) => m.product_id))];
    const { data: products, error: prodError } = await client.from("products").select("id, product_name, image, display_price, status").in("id", productIds);
    if (prodError) return { success: false, error: prodError.message };
    return { success: true, products: products || [] };
  }
};
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "skus-page" }, _attrs))} data-v-8c90ec3c>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "此处显示所有 SKU 物理数据。删除 SKU 将自动解除它与所有商品和CDK的关联，请谨慎操作。",
        type: "warning"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-8c90ec3c${_scopeId}>`);
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
                  _push3(`<div class="sku-cell" data-v-8c90ec3c${_scopeId2}>`);
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
                  _push3(`<div class="sku-info" data-v-8c90ec3c${_scopeId2}><div class="sku-specs" data-v-8c90ec3c${_scopeId2}>`);
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
                    _push3(`<div class="linked-products" data-v-8c90ec3c${_scopeId2}>`);
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
                    _push3(`<div data-v-8c90ec3c${_scopeId2}>`);
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
                  _push3(`<span data-v-8c90ec3c${_scopeId2}>${ssrInterpolate(row.stock_count !== void 0 ? row.stock_count : "-")}</span>`);
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
                  _push3(`<span class="time-text" data-v-8c90ec3c${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.created_at))}</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/skus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const skus = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c90ec3c"]]);
export {
  skus as default
};
//# sourceMappingURL=skus-DbYI0GuN.js.map
