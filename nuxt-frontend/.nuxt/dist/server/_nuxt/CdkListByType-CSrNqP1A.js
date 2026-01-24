import { E as ElSelect, a as ElOption } from "./index-Cf_t59lc.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
import { i as useRouter, b9 as refresh_default, bb as delete_default, p as plus_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                         */
/* empty css                   */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { defineComponent, computed, ref, reactive, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { a as adminCdkApi } from "./cdk-ObzrOMzo.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-CCOHgBz_.js";
import { u as useBizConfig } from "./useBizConfig-DtWyKy4G.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CdkListByType",
  __ssrInlineRender: true,
  props: {
    type: {}
  },
  setup(__props) {
    const { getProductTypeLabel, getCdkStatusLabel, getCdkStatusType } = useBizConfig();
    const props = __props;
    const router = useRouter();
    const typeLabel = computed(() => getProductTypeLabel(props.type));
    const loading = ref(false);
    const cdkList = ref([]);
    const categoryOptions = ref([]);
    const productOptions = ref([]);
    const selectedRows = ref([]);
    const filters = reactive({
      categoryId: "",
      productId: "",
      status: ""
    });
    const filteredProducts = computed(() => {
      if (!filters.categoryId) return productOptions.value;
      return productOptions.value.filter((p) => p.category_id === filters.categoryId);
    });
    const loadCdks = async () => {
      loading.value = true;
      try {
        const params = {
          cdk_type: props.type,
          limit: 200
        };
        if (filters.productId) params.product_id = filters.productId;
        if (filters.status && filters.status !== "unlinked") params.status = filters.status;
        const res = await adminCdkApi.getCdks(params);
        if (res.success) {
          let result = res.cdks;
          if (filters.status === "unlinked") {
            result = result.filter((cdk) => !cdk.sku_mappings || cdk.sku_mappings.length === 0);
          }
          cdkList.value = result;
        } else ElMessage.error(res.error);
      } catch (e) {
        ElMessage.error(e.message);
      } finally {
        loading.value = false;
      }
    };
    const handleCategoryChange = () => {
      filters.productId = "";
      loadCdks();
    };
    const handleSearch = () => loadCdks();
    const handleAdd = () => {
      router.push({ path: "/_mgmt_9Xfa3/cdk/post", query: { type: props.type } });
    };
    const handleEdit = (row) => {
      router.push({
        path: `/_mgmt_9Xfa3/cdk/edit/${row.id}`,
        query: { type: props.type }
      });
    };
    const handleToggleStatus = async (row, enabled) => {
      if (enabled) {
        const res = await adminCdkApi.enableCdk(row.id);
        if (res.success) {
          ElMessage.success("上架成功");
          loadCdks();
        }
      } else {
        const res = await adminCdkApi.disableCdk(row.id);
        if (res.success) {
          ElMessage.success("下架成功");
          loadCdks();
        }
      }
    };
    const handleSelectionChange = (rows) => selectedRows.value = rows;
    const handleBulkDelete = () => {
      if (!selectedRows.value.length) return;
      ElMessageBox.confirm(`确认批量删除 ${selectedRows.value.length} 条 CDK？`, "警告", {
        type: "warning",
        confirmButtonText: "确定删除",
        cancelButtonText: "取消"
      }).then(async () => {
        const res = await adminCdkApi.deleteCdks(selectedRows.value.map((r) => r.id));
        if (res.success) {
          ElMessage.success("批量删除成功");
          selectedRows.value = [];
          loadCdks();
        } else ElMessage.error(res.error);
      });
    };
    const getStatusLabel = (s) => getCdkStatusLabel(s);
    const getStatusType = (s) => getCdkStatusType(s);
    const copyCode = (code) => {
      (void 0).clipboard.writeText(code);
      ElMessage.success("已复制");
    };
    const formatSkuSpec = (spec) => {
      if (!spec) return "默认";
      return Object.values(spec).join(" / ");
    };
    const formatCodeDisplay = (code) => {
      if (!code) return "-";
      try {
        const obj = JSON.parse(code);
        if (typeof obj === "object" && obj !== null) {
          if (obj.fields && Array.isArray(obj.fields)) {
            return `字段: ${obj.fields.join(", ")}`;
          }
          return Object.entries(obj).map(([k, v]) => `${k}：${v}`).join("  ");
        }
        return code;
      } catch {
        return code;
      }
    };
    const getIdleSlots = (row) => {
      if (row.slot_occupancies && Array.isArray(row.slot_occupancies)) {
        return row.slot_occupancies.filter((s) => s.status === "idle").length;
      }
      if (row.status === "idle") return row.max_slots || 1;
      return 0;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdk-list-view" }, _attrs))} data-v-8373458f>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-8373458f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filters.categoryId,
              "onUpdate:modelValue": ($event) => filters.categoryId = $event,
              placeholder: "选择分类",
              clearable: "",
              style: { "width": "140px" },
              onChange: handleCategoryChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(categoryOptions.value, (c) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: c.id,
                      label: c.name,
                      value: c.id
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(categoryOptions.value, (c) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: c.id,
                        label: c.name,
                        value: c.id
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filters.productId,
              "onUpdate:modelValue": ($event) => filters.productId = $event,
              placeholder: "筛选商品",
              clearable: "",
              filterable: "",
              style: { "width": "160px" },
              onChange: handleSearch,
              disabled: !filters.categoryId
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(filteredProducts.value, (p) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: p.id,
                      label: p.product_name,
                      value: p.id
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (p) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: p.id,
                        label: p.product_name,
                        value: p.id
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filters.status,
              "onUpdate:modelValue": ($event) => filters.status = $event,
              placeholder: "状态",
              clearable: "",
              style: { "width": "120px" },
              onChange: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "未连接SKU",
                    value: "unlinked"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "空闲",
                    value: "idle"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "使用中",
                    value: "using"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已使用",
                    value: "used"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已下架",
                    value: "disabled"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "未连接SKU",
                      value: "unlinked"
                    }),
                    createVNode(_component_el_option, {
                      label: "空闲",
                      value: "idle"
                    }),
                    createVNode(_component_el_option, {
                      label: "使用中",
                      value: "using"
                    }),
                    createVNode(_component_el_option, {
                      label: "已使用",
                      value: "used"
                    }),
                    createVNode(_component_el_option, {
                      label: "已下架",
                      value: "disabled"
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
                createVNode(_component_el_select, {
                  modelValue: filters.categoryId,
                  "onUpdate:modelValue": ($event) => filters.categoryId = $event,
                  placeholder: "选择分类",
                  clearable: "",
                  style: { "width": "140px" },
                  onChange: handleCategoryChange
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(categoryOptions.value, (c) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: c.id,
                        label: c.name,
                        value: c.id
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_select, {
                  modelValue: filters.productId,
                  "onUpdate:modelValue": ($event) => filters.productId = $event,
                  placeholder: "筛选商品",
                  clearable: "",
                  filterable: "",
                  style: { "width": "160px" },
                  onChange: handleSearch,
                  disabled: !filters.categoryId
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (p) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: p.id,
                        label: p.product_name,
                        value: p.id
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode(_component_el_select, {
                  modelValue: filters.status,
                  "onUpdate:modelValue": ($event) => filters.status = $event,
                  placeholder: "状态",
                  clearable: "",
                  style: { "width": "120px" },
                  onChange: handleSearch
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "未连接SKU",
                      value: "unlinked"
                    }),
                    createVNode(_component_el_option, {
                      label: "空闲",
                      value: "idle"
                    }),
                    createVNode(_component_el_option, {
                      label: "使用中",
                      value: "using"
                    }),
                    createVNode(_component_el_option, {
                      label: "已使用",
                      value: "used"
                    }),
                    createVNode(_component_el_option, {
                      label: "已下架",
                      value: "disabled"
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
              disabled: !selectedRows.value.length,
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
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: handleAdd
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`新增 ${ssrInterpolate(typeLabel.value)}`);
                } else {
                  return [
                    createTextVNode("新增 " + toDisplayString(typeLabel.value), 1)
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
                disabled: !selectedRows.value.length,
                onClick: handleBulkDelete
              }, {
                default: withCtx(() => [
                  createTextVNode(" 批量删除 ")
                ]),
                _: 1
              }, 8, ["icon", "disabled"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: handleAdd
              }, {
                default: withCtx(() => [
                  createTextVNode("新增 " + toDisplayString(typeLabel.value), 1)
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: cdkList.value,
        loading: loading.value,
        onSelectionChange: handleSelectionChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="product-cell" data-v-8373458f${_scopeId2}>`);
                  if (row.product_snapshot?.product_image) {
                    _push3(ssrRenderComponent(_component_el_image, {
                      src: row.product_snapshot.product_image,
                      fit: "cover",
                      style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span class="product-name" data-v-8373458f${_scopeId2}>${ssrInterpolate(row.product_snapshot?.product_name || "未知商品")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      row.product_snapshot?.product_image ? (openBlock(), createBlock(_component_el_image, {
                        key: 0,
                        src: row.product_snapshot.product_image,
                        fit: "cover",
                        style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px" }
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", { class: "product-name" }, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "规格",
              "min-width": "160"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.sku_mappings && row.sku_mappings.length > 0) {
                    _push3(`<div class="sku-mappings-cell" data-v-8373458f${_scopeId2}><!--[-->`);
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
                      _push3(`<span class="more-tag" data-v-8373458f${_scopeId2}>+${ssrInterpolate(row.sku_mappings.length - 2)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "warning",
                      size: "small",
                      effect: "plain"
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
                      class: "sku-mappings-cell"
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
                      type: "warning",
                      size: "small",
                      effect: "plain"
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
              "min-width": "240"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="code-display" data-v-8373458f${_scopeId2}><span class="code-text" data-v-8373458f${_scopeId2}>${ssrInterpolate(formatCodeDisplay(row.code))}</span>`);
                  if (row.code) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      size: "small",
                      onClick: ($event) => copyCode(row.code)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`复制`);
                        } else {
                          return [
                            createTextVNode("复制")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "code-display" }, [
                      createVNode("span", { class: "code-text" }, toDisplayString(formatCodeDisplay(row.code)), 1),
                      row.code ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        link: "",
                        size: "small",
                        onClick: ($event) => copyCode(row.code)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("复制")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (props.type === "shared") {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "库存/剩余",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="stock-info" data-v-8373458f${_scopeId2}><span data-v-8373458f${_scopeId2}>${ssrInterpolate(row.max_slots || 1)}</span><span class="stock-divider" data-v-8373458f${_scopeId2}>/</span><span class="remaining" data-v-8373458f${_scopeId2}>${ssrInterpolate(getIdleSlots(row))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "stock-info" }, [
                        createVNode("span", null, toDisplayString(row.max_slots || 1), 1),
                        createVNode("span", { class: "stock-divider" }, "/"),
                        createVNode("span", { class: "remaining" }, toDisplayString(getIdleSlots(row)), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "库存",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-8373458f${_scopeId2}>${ssrInterpolate(row.stock ?? 1)}</span>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(row.stock ?? 1), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (["idle", "disabled"].includes(row.status)) {
                    _push3(ssrRenderComponent(_component_el_switch, {
                      "model-value": row.status === "idle",
                      "active-text": "上架",
                      "inactive-text": "下架",
                      "inline-prompt": "",
                      onChange: (val) => handleToggleStatus(row, val)
                    }, null, _parent3, _scopeId2));
                  } else {
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
                  }
                } else {
                  return [
                    ["idle", "disabled"].includes(row.status) ? (openBlock(), createBlock(_component_el_switch, {
                      key: 0,
                      "model-value": row.status === "idle",
                      "active-text": "上架",
                      "inactive-text": "下架",
                      "inline-prompt": "",
                      onChange: (val) => handleToggleStatus(row, val)
                    }, null, 8, ["model-value", "onChange"])) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: getStatusType(row.status),
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"]))
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
                    link: "",
                    type: "primary",
                    size: "small",
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
                } else {
                  return [
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      size: "small",
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
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
                label: "商品",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "product-cell" }, [
                    row.product_snapshot?.product_image ? (openBlock(), createBlock(_component_el_image, {
                      key: 0,
                      src: row.product_snapshot.product_image,
                      fit: "cover",
                      style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px" }
                    }, null, 8, ["src"])) : createCommentVNode("", true),
                    createVNode("span", { class: "product-name" }, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "规格",
                "min-width": "160"
              }, {
                default: withCtx(({ row }) => [
                  row.sku_mappings && row.sku_mappings.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "sku-mappings-cell"
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
                    type: "warning",
                    size: "small",
                    effect: "plain"
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
                "min-width": "240"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "code-display" }, [
                    createVNode("span", { class: "code-text" }, toDisplayString(formatCodeDisplay(row.code)), 1),
                    row.code ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      link: "",
                      size: "small",
                      onClick: ($event) => copyCode(row.code)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("复制")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              props.type === "shared" ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                label: "库存/剩余",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "stock-info" }, [
                    createVNode("span", null, toDisplayString(row.max_slots || 1), 1),
                    createVNode("span", { class: "stock-divider" }, "/"),
                    createVNode("span", { class: "remaining" }, toDisplayString(getIdleSlots(row)), 1)
                  ])
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_el_table_column, {
                key: 1,
                label: "库存",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.stock ?? 1), 1)
                ]),
                _: 1
              })),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  ["idle", "disabled"].includes(row.status) ? (openBlock(), createBlock(_component_el_switch, {
                    key: 0,
                    "model-value": row.status === "idle",
                    "active-text": "上架",
                    "inactive-text": "下架",
                    "inline-prompt": "",
                    onChange: (val) => handleToggleStatus(row, val)
                  }, null, 8, ["model-value", "onChange"])) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: getStatusType(row.status),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"]))
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
                    link: "",
                    type: "primary",
                    size: "small",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/cdk/CdkListByType.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CdkListByType = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8373458f"]]);
export {
  CdkListByType as C
};
//# sourceMappingURL=CdkListByType-CSrNqP1A.js.map
