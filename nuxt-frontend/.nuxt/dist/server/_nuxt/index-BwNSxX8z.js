import { E as ElSelect, a as ElOption } from "./index-B_mQW-wd.js";
import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElSwitch } from "./index-ByWmxDYy.js";
import "./base-CEWXqFm3.js";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                   */
import { defineComponent, mergeProps, useSSRContext, ref, reactive, unref, withCtx, createTextVNode, createVNode, withKeys, isRef, createSlots, toDisplayString, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { M as refresh_default, p as plus_default, af as search_default } from "./index-DNnPa_Q9.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { _ as _export_sfc } from "../server.mjs";
import { B as BulkActionBar } from "./BulkActionBar-CLGgud4y.js";
import { P as ProductThumbCell } from "./ProductThumbCell-DjG8-c-D.js";
/* empty css                    */
/* empty css                        */
/* empty css                    */
import { a as adminProductApi } from "./product-BAjfeoTx.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { E as ElMessageBox } from "./index-VfPbkY7T.js";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { a as adminRoute } from "./admin-routes-C0qcXhse.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-Cxdfotkm.js";
import "lodash-unified";
import "@vueuse/core";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "@vue/shared";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./constants-hAKFmBbq.js";
import "./index-BAMVq552.js";
import "./index-_zadwVDN.js";
import "./objects-Bz74KHmq.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./index-DbvZsXcZ.js";
import "./use-form-item-D2hCqQW8.js";
import "./icon-Ck0_dGQP.js";
import "./event-BZTOGHfp.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./use-global-config-C5kRDPtv.js";
import "@ctrl/tinycolor";
import "./index-NROOS5rD.js";
import "normalize-wheel-es";
import "./validator-BZYOvvAA.js";
import "./index-CD49T52w.js";
/* empty css                    */
import "./index-BRSsuUkY.js";
import "./index-D9RjcsL2.js";
import "./directive-BHLqqXUb.js";
/* empty css                    */
/* empty css                  */
/* empty css                       */
/* empty css                    */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./index-BSYGfCfY.js";
import "./index-BrJcxSwt.js";
/* empty css                         */
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "./index-IoXmILvB.js";
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
    const handleAddProduct = () => router.push(adminRoute("products/edit"));
    const handleEdit = (r) => router.push(`${adminRoute("products/edit")}?id=${r.id}`);
    const handleManageConfigs = (r) => router.push(adminRoute(`products/specs/${r.id}`));
    const handleDuplicate = (r) => router.push(`${adminRoute("products/edit")}?copy_from_id=${r.id}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-list-page" }, _attrs))} data-v-2dbcce1a>`);
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
                  _push3(ssrRenderComponent(ProductThumbCell, {
                    image: row.image,
                    name: row.product_name,
                    id: row.id,
                    "truncate-id": true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ProductThumbCell, {
                      image: row.image,
                      name: row.product_name,
                      id: row.id,
                      "truncate-id": true
                    }, null, 8, ["image", "name", "id"])
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
                    _push3(`<span class="text-secondary" data-v-2dbcce1a${_scopeId2}>-</span>`);
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
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "gap": "4px" })}" data-v-2dbcce1a${_scopeId2}>`);
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
                  _push3(`<span style="${ssrRenderStyle({ "font-size": "12px" })}" data-v-2dbcce1a${_scopeId2}>${ssrInterpolate(new Date(row.created_at).toLocaleString("zh-CN"))}</span>`);
                } else {
                  return [
                    createVNode("span", { style: { "font-size": "12px" } }, toDisplayString(new Date(row.created_at).toLocaleString("zh-CN")), 1)
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
                  createVNode(ProductThumbCell, {
                    image: row.image,
                    name: row.product_name,
                    id: row.id,
                    "truncate-id": true
                  }, null, 8, ["image", "name", "id"])
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
                  createVNode("span", { style: { "font-size": "12px" } }, toDisplayString(new Date(row.created_at).toLocaleString("zh-CN")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2dbcce1a"]]);
export {
  index as default
};
//# sourceMappingURL=index-BwNSxX8z.js.map
