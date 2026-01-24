import { E as ElSelect, a as ElOption } from "./index-Cf_t59lc.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
import { _ as _export_sfc, ah as ElMessage, b9 as refresh_default, p as plus_default, bJ as search_default } from "../server.mjs";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                         */
/* empty css                   */
import { defineComponent, mergeProps, useSSRContext, ref, reactive, unref, withCtx, createTextVNode, createVNode, withKeys, isRef, createSlots, toDisplayString, createBlock, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-CCOHgBz_.js";
import { B as BulkActionBar } from "./BulkActionBar-DNKbMSDo.js";
/* empty css                        */
/* empty css                    */
import { a as adminProductApi } from "./product-B3IUpyB3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./index-B9I5bL_Z.js";
import "@vueuse/core";
import "@popperjs/core";
import "./index-Dxw_X3Hq.js";
import "lodash-unified";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "@vue/shared";
import "./constants-hAKFmBbq.js";
import "./index-D_b573Qt.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./event-BZTOGHfp.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-ClPmkyX9.js";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-DrPRyc7n.js";
import "normalize-wheel-es";
import "./index-B-o0CD59.js";
import "./validator-T0bsmJHo.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
/* empty css                    */
/* empty css                  */
/* empty css                       */
/* empty css                    */
import "./directive-tOiqatq5.js";
import "./index-Dg8Z-nTr.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CategoryPills",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    items: {},
    labelKey: { default: "name" },
    valueKey: { default: "id" },
    countKey: { default: "count" },
    allLabel: { default: "全部" },
    totalCount: {},
    showTotalCount: { type: Boolean, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-pills-scroll" }, _attrs))} data-v-34a4f06b><div class="${ssrRenderClass([{ active: __props.modelValue === "" }, "pill-item"])}" data-v-34a4f06b><span data-v-34a4f06b>${ssrInterpolate(__props.allLabel)}</span>`);
      if (__props.showTotalCount) {
        _push(`<span class="count" data-v-34a4f06b>${ssrInterpolate(__props.totalCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="${ssrRenderClass([{ active: __props.modelValue === item[__props.valueKey] }, "pill-item"])}" data-v-34a4f06b><span data-v-34a4f06b>${ssrInterpolate(item[__props.labelKey])}</span>`);
        if (item[__props.countKey]) {
          _push(`<span class="count" data-v-34a4f06b>${ssrInterpolate(item[__props.countKey])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/CategoryPills.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CategoryPills = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-34a4f06b"]]);
function useAdminProductList() {
  const loading = ref(false);
  const list = ref([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(20);
  const categories = ref([]);
  const selectedIds = ref([]);
  const filters = reactive({
    category_id: "",
    status: "",
    keyword: ""
  });
  const loadList = async () => {
    loading.value = true;
    selectedIds.value = [];
    try {
      const res = await adminProductApi.getProducts({
        page: currentPage.value,
        page_size: pageSize.value,
        category_id: filters.category_id || void 0,
        status: filters.status || void 0,
        keyword: filters.keyword || void 0
      });
      if (res.success) {
        list.value = res.products;
        total.value = res.total;
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
    currentPage.value = 1;
    loadList();
  };
  const selectCategory = (id) => {
    filters.category_id = id;
    handleFilterChange();
  };
  const handleStatusChange = async (row) => {
    row.statusLoading = true;
    try {
      const res = await adminProductApi.toggleStatus(row.id, row.status);
      if (!res.success) {
        row.status = row.status === "on" ? "off" : "on";
        ElMessage.error(res.error);
      } else {
        ElMessage.success(row.status === "on" ? "上架成功" : "下架成功");
      }
    } catch {
      row.status = row.status === "on" ? "off" : "on";
      ElMessage.error("操作失败");
    } finally {
      row.statusLoading = false;
    }
  };
  const handleDelete = (row) => {
    ElMessageBox.confirm(`确认删除 "${row.product_name}" 吗?`, "警告", { type: "warning" }).then(async () => {
      const res = await adminProductApi.deleteProducts([row.id]);
      if (res.success) {
        ElMessage.success("删除成功");
        loadList();
      } else ElMessage.error(res.error);
    });
  };
  const handleBulkDelete = () => {
    if (!selectedIds.value.length) return;
    ElMessageBox.confirm(`确认批量删除 ${selectedIds.value.length} 项? 此操作不可撤销。`, "高风险警告", { type: "error" }).then(async () => {
      const res = await adminProductApi.deleteProducts(selectedIds.value);
      if (res.success) {
        ElMessage.success("批量删除成功");
        loadList();
      } else ElMessage.error(res.error);
    });
  };
  const handleSelectionChange = (val) => {
    selectedIds.value = val.map((v) => v.id);
  };
  return {
    loading,
    list,
    total,
    currentPage,
    pageSize,
    categories,
    filters,
    selectedIds,
    loadList,
    selectCategory,
    handleFilterChange,
    handleStatusChange,
    handleDelete,
    handleBulkDelete,
    handleSelectionChange
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const {
      loading,
      list,
      total,
      currentPage,
      pageSize,
      categories,
      filters,
      selectedIds,
      loadList,
      selectCategory,
      handleFilterChange,
      handleStatusChange,
      handleDelete,
      handleBulkDelete,
      handleSelectionChange
    } = useAdminProductList();
    const handleAddProduct = () => router.push("/_mgmt_9Xfa3/products/post");
    const handleEdit = (r) => router.push(`/_mgmt_9Xfa3/products/post?id=${r.id}`);
    const handleManageConfigs = (r) => router.push(`/_mgmt_9Xfa3/products/sku/${r.id}`);
    const handleDuplicate = (r) => router.push(`/_mgmt_9Xfa3/products/post?copy_from_id=${r.id}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-list-page" }, _attrs))} data-v-df4b1a1f>`);
      _push(ssrRenderComponent(CategoryPills, {
        modelValue: unref(filters).category_id,
        "onUpdate:modelValue": [($event) => unref(filters).category_id = $event, unref(selectCategory)],
        items: unref(categories),
        "label-key": "name",
        "value-key": "id",
        "count-key": "product_count",
        "total-count": unref(total)
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: unref(filters).status,
              "onUpdate:modelValue": ($event) => unref(filters).status = $event,
              placeholder: "状态: 全部",
              clearable: "",
              style: { "width": "120px" },
              onChange: unref(handleFilterChange)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "上架",
                    value: "on"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "下架",
                    value: "off"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "上架",
                      value: "on"
                    }),
                    createVNode(_component_el_option, {
                      label: "下架",
                      value: "off"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(filters).keyword,
              "onUpdate:modelValue": ($event) => unref(filters).keyword = $event,
              placeholder: "搜索商品名称 (回车)",
              clearable: "",
              style: { "width": "200px" },
              "prefix-icon": unref(search_default),
              onKeyup: unref(handleFilterChange),
              onClear: unref(handleFilterChange)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_select, {
                modelValue: unref(filters).status,
                "onUpdate:modelValue": ($event) => unref(filters).status = $event,
                placeholder: "状态: 全部",
                clearable: "",
                style: { "width": "120px" },
                onChange: unref(handleFilterChange)
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_option, {
                    label: "上架",
                    value: "on"
                  }),
                  createVNode(_component_el_option, {
                    label: "下架",
                    value: "off"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
              createVNode(_component_el_input, {
                modelValue: unref(filters).keyword,
                "onUpdate:modelValue": ($event) => unref(filters).keyword = $event,
                placeholder: "搜索商品名称 (回车)",
                clearable: "",
                style: { "width": "200px" },
                "prefix-icon": unref(search_default),
                onKeyup: withKeys(unref(handleFilterChange), ["enter"]),
                onClear: unref(handleFilterChange)
              }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon", "onKeyup", "onClear"])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: unref(loadList),
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
              type: "primary",
              onClick: handleAddProduct,
              icon: unref(plus_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加商品`);
                } else {
                  return [
                    createTextVNode("添加商品")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: unref(loadList),
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["onClick", "icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: handleAddProduct,
                icon: unref(plus_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("添加商品")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: unref(list),
        loading: unref(loading),
        total: unref(total),
        "current-page": unref(currentPage),
        "onUpdate:currentPage": [($event) => isRef(currentPage) ? currentPage.value = $event : null, unref(loadList)],
        "page-size": unref(pageSize),
        "onUpdate:pageSize": [($event) => isRef(pageSize) ? pageSize.value = $event : null, unref(loadList)],
        onSelectionChange: unref(handleSelectionChange)
      }, createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "50",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品信息",
              "min-width": "250"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="product-cell" data-v-df4b1a1f${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_image, {
                    src: row.image,
                    class: "thumb",
                    fit: "cover"
                  }, {
                    error: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="no-img" data-v-df4b1a1f${_scopeId3}>无图</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "no-img" }, "无图")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="info" data-v-df4b1a1f${_scopeId2}><div class="name"${ssrRenderAttr("title", row.product_name)} data-v-df4b1a1f${_scopeId2}>${ssrInterpolate(row.product_name)}</div><div class="id" data-v-df4b1a1f${_scopeId2}>ID: ${ssrInterpolate(row.id.slice(0, 8))}...</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      createVNode(_component_el_image, {
                        src: row.image,
                        class: "thumb",
                        fit: "cover"
                      }, {
                        error: withCtx(() => [
                          createVNode("div", { class: "no-img" }, "无图")
                        ]),
                        _: 1
                      }, 8, ["src"]),
                      createVNode("div", { class: "info" }, [
                        createVNode("div", {
                          class: "name",
                          title: row.product_name
                        }, toDisplayString(row.product_name), 9, ["title"]),
                        createVNode("div", { class: "id" }, "ID: " + toDisplayString(row.id.slice(0, 8)) + "...", 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "角标",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.badge_label) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "warning",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(row.badge_label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(row.badge_label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="text-secondary" data-v-df4b1a1f${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.badge_label ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: "warning",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.badge_label), 1)
                      ]),
                      _: 2
                    }, 1024)) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-secondary"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "排序",
              width: "80",
              align: "center",
              prop: "sort_order",
              sortable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "包含规格",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "gap": "4px" })}" data-v-df4b1a1f${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    effect: "dark",
                    size: "small",
                    style: { "margin-right": "4px" }
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.sku_count || 0)}个`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.sku_count || 0) + "个", 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(row.sku_details, (spec, idx) => {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      key: idx,
                      size: "small",
                      type: "info",
                      effect: "plain"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(spec)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(spec), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { style: { "display": "flex", "flex-wrap": "wrap", "gap": "4px" } }, [
                      createVNode(_component_el_tag, {
                        type: "info",
                        effect: "dark",
                        size: "small",
                        style: { "margin-right": "4px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.sku_count || 0) + "个", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (openBlock(true), createBlock(Fragment, null, renderList(row.sku_details, (spec, idx) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: idx,
                          size: "small",
                          type: "info",
                          effect: "plain"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(spec), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])
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
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "active-value": "on",
                    "inactive-value": "off",
                    loading: row.statusLoading,
                    onChange: ($event) => unref(handleStatusChange)(row),
                    "inline-prompt": "",
                    "active-text": "上架",
                    "inactive-text": "下架"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "active-value": "on",
                      "inactive-value": "off",
                      loading: row.statusLoading,
                      onChange: ($event) => unref(handleStatusChange)(row),
                      "inline-prompt": "",
                      "active-text": "上架",
                      "inactive-text": "下架"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "160",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(new Date(row.created_at).toLocaleString("zh-CN", { fontSize: "12px" }))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString("zh-CN", { fontSize: "12px" })), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "220",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`编辑`);
                      } else {
                        return [
                          createTextVNode("编辑")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "success",
                    onClick: ($event) => handleDuplicate(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`同款`);
                      } else {
                        return [
                          createTextVNode("同款")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleManageConfigs(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`规格`);
                      } else {
                        return [
                          createTextVNode("规格")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "danger",
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
                      link: "",
                      type: "primary",
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "success",
                      onClick: ($event) => handleDuplicate(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("同款")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "warning",
                      onClick: ($event) => handleManageConfigs(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("规格")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
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
                width: "50",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                label: "商品信息",
                "min-width": "250"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "product-cell" }, [
                    createVNode(_component_el_image, {
                      src: row.image,
                      class: "thumb",
                      fit: "cover"
                    }, {
                      error: withCtx(() => [
                        createVNode("div", { class: "no-img" }, "无图")
                      ]),
                      _: 1
                    }, 8, ["src"]),
                    createVNode("div", { class: "info" }, [
                      createVNode("div", {
                        class: "name",
                        title: row.product_name
                      }, toDisplayString(row.product_name), 9, ["title"]),
                      createVNode("div", { class: "id" }, "ID: " + toDisplayString(row.id.slice(0, 8)) + "...", 1)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "角标",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.badge_label ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "warning",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.badge_label), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-secondary"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "排序",
                width: "80",
                align: "center",
                prop: "sort_order",
                sortable: ""
              }),
              createVNode(_component_el_table_column, {
                label: "包含规格",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { style: { "display": "flex", "flex-wrap": "wrap", "gap": "4px" } }, [
                    createVNode(_component_el_tag, {
                      type: "info",
                      effect: "dark",
                      size: "small",
                      style: { "margin-right": "4px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.sku_count || 0) + "个", 1)
                      ]),
                      _: 2
                    }, 1024),
                    (openBlock(true), createBlock(Fragment, null, renderList(row.sku_details, (spec, idx) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: idx,
                        size: "small",
                        type: "info",
                        effect: "plain"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(spec), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "active-value": "on",
                    "inactive-value": "off",
                    loading: row.statusLoading,
                    onChange: ($event) => unref(handleStatusChange)(row),
                    "inline-prompt": "",
                    "active-text": "上架",
                    "inactive-text": "下架"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "160",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString("zh-CN", { fontSize: "12px" })), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "220",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "success",
                    onClick: ($event) => handleDuplicate(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("同款")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleManageConfigs(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("规格")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
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
        _: 2
      }, [
        unref(selectedIds).length > 0 ? {
          name: "toolbar",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(BulkActionBar, {
                count: unref(selectedIds).length,
                onDelete: unref(handleBulkDelete)
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(BulkActionBar, {
                  count: unref(selectedIds).length,
                  onDelete: unref(handleBulkDelete)
                }, null, 8, ["count", "onDelete"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-df4b1a1f"]]);
export {
  index as default
};
//# sourceMappingURL=index-tnRVnrFX.js.map
