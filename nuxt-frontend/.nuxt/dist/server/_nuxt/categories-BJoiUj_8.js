import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-KOxrtlML.js";
import { b9 as refresh_default, p as plus_default, E as ElIcon, bN as rank_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElRadioGroup, b as ElRadio } from "./index-f9lru7bI.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                        */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { d as adminCategoryApi } from "./admin-supabase-nszo-IoU.js";
import Sortable from "sortablejs";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-CCOHgBz_.js";
import { A as AdminDataDialog } from "./AdminDataDialog-CUwf_G99.js";
import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "lodash-unified";
import "./index-D_b573Qt.js";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "@vue/shared";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
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
import "./validator-T0bsmJHo.js";
import "async-validator";
import "./index-ClPmkyX9.js";
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-DKY_z0U1.js";
import "./index-cR1ntQxK.js";
import "./index-Cf_t59lc.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
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
import "./index-I18rzBgu.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
/* empty css                   */
import "./index-DvOrIhmd.js";
/* empty css                  */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const submitting = ref(false);
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const formRef = ref();
    const adminTableRef = ref();
    const categories2 = ref([]);
    const form = reactive({ id: "", name: "", status: "on" });
    const rules = reactive({ name: [{ required: true, message: "请输入名称", trigger: "blur" }] });
    const loadCategories = async () => {
      loading.value = true;
      try {
        const res = await adminCategoryApi.getCategories();
        if (res.success) {
          categories2.value = res.categories;
          nextTick(initSortable);
        }
      } finally {
        loading.value = false;
      }
    };
    const initSortable = () => {
      const el = adminTableRef.value?.$el;
      if (!el) return;
      const tbody = el.querySelector(".el-table__body-wrapper tbody");
      if (tbody) {
        Sortable.create(tbody, {
          handle: ".drag-handle",
          animation: 200,
          ghostClass: "sortable-ghost",
          onEnd: async (evt) => {
            const { oldIndex, newIndex } = evt;
            if (oldIndex === newIndex) return;
            const moved = categories2.value.splice(oldIndex, 1)[0];
            categories2.value.splice(newIndex, 0, moved);
            await saveSortOrder();
          }
        });
      }
    };
    const saveSortOrder = async () => {
      const items = categories2.value.map((c, i) => ({ id: c.id, sort_order: i }));
      const res = await adminCategoryApi.batchUpdateSort(items);
      if (res.success) ElMessage.success("排序已更新");
      else {
        ElMessage.error("排序更新失败");
        loadCategories();
      }
    };
    const openAddDialog = () => {
      isEdit.value = false;
      form.name = "";
      form.status = "on";
      dialogVisible.value = true;
    };
    const openEditDialog = (row) => {
      isEdit.value = true;
      form.id = row.id;
      form.name = row.name;
      form.status = row.status;
      dialogVisible.value = true;
    };
    const submitForm = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (!valid) return;
        submitting.value = true;
        try {
          const api = isEdit.value ? adminCategoryApi.updateCategory : adminCategoryApi.createCategory;
          const payload = { name: form.name, status: form.status };
          if (!isEdit.value) payload.sort_order = categories2.value.length;
          const arg = isEdit.value ? form.id : payload;
          const res = await (isEdit.value ? api(form.id, payload) : api(payload));
          if (res.success) {
            ElMessage.success(isEdit.value ? "更新成功" : "添加成功");
            dialogVisible.value = false;
            loadCategories();
          } else ElMessage.error(res.error);
        } finally {
          submitting.value = false;
        }
      });
    };
    const resetForm = () => formRef.value?.resetFields();
    const handleStatusChange = async (row) => {
      row.statusLoading = true;
      try {
        const res = await adminCategoryApi.updateCategory(row.id, { status: row.status });
        if (res.success) ElMessage.success(row.status === "on" ? "启用成功" : "停用成功");
        else {
          row.status = row.status === "on" ? "off" : "on";
          ElMessage.error(res.error);
        }
      } catch {
        row.status = row.status === "on" ? "off" : "on";
      } finally {
        row.statusLoading = false;
      }
    };
    const confirmDelete = (row) => {
      if (row.product_count > 0) return ElMessageBox.alert(`分类下有 ${row.product_count} 商品，无法删除`, "提示");
      ElMessageBox.confirm(`确认删除分类 "${row.name}"?`, "警告", { type: "warning" }).then(async () => {
        const res = await adminCategoryApi.deleteCategory(row.id);
        if (res.success) {
          ElMessage.success("删除成功");
          loadCategories();
        } else ElMessage.error(res.error);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_icon = ElIcon;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-page" }, _attrs))} data-v-8b4cde00>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "拖拽表格行可调整分类排序",
        type: "info"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadCategories,
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
              icon: unref(plus_default),
              onClick: openAddDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加商品分类`);
                } else {
                  return [
                    createTextVNode("添加商品分类")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: loadCategories,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("添加商品分类")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        ref_key: "adminTableRef",
        ref: adminTableRef,
        data: categories2.value,
        loading: loading.value,
        "row-key": "id"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              width: "60",
              align: "center"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(rank_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(rank_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(rank_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="drag-handle" data-v-8b4cde00${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(rank_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(rank_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "drag-handle" }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(rank_default))
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "分类名称",
              "min-width": "200"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "排序",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ $index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate($index + 1)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString($index + 1), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: "info",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($index + 1), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品数",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, { effect: "plain" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.product_count || 0)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.product_count || 0), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, { effect: "plain" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.product_count || 0), 1)
                      ]),
                      _: 2
                    }, 1024)
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
                    onChange: ($event) => handleStatusChange(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "active-value": "on",
                      "inactive-value": "off",
                      loading: row.statusLoading,
                      onChange: ($event) => handleStatusChange(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "170",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(new Date(row.created_at).toLocaleString("zh-CN"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString("zh-CN")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "150",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEditDialog(row)
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
                    type: "danger",
                    onClick: ($event) => confirmDelete(row)
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
                      onClick: ($event) => openEditDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => confirmDelete(row)
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
                width: "60",
                align: "center"
              }, {
                header: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(rank_default))
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "drag-handle" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(rank_default))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "分类名称",
                "min-width": "200"
              }),
              createVNode(_component_el_table_column, {
                label: "排序",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ $index }) => [
                  createVNode(_component_el_tag, {
                    type: "info",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($index + 1), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "商品数",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, { effect: "plain" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.product_count || 0), 1)
                    ]),
                    _: 2
                  }, 1024)
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
                    onChange: ($event) => handleStatusChange(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString("zh-CN")), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "150",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEditDialog(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => confirmDelete(row)
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
      _push(ssrRenderComponent(AdminDataDialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? "编辑分类" : "添加分类",
        loading: submitting.value,
        onConfirm: submitForm,
        onClosed: resetForm
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "名称",
                    prop: "name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "请输入分类名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.name,
                            "onUpdate:modelValue": ($event) => form.name = $event,
                            placeholder: "请输入分类名称"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "状态",
                    prop: "status"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_radio_group, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_radio, { value: "on" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`启用`);
                                  } else {
                                    return [
                                      createTextVNode("启用")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_radio, { value: "off" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`停用`);
                                  } else {
                                    return [
                                      createTextVNode("停用")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_radio, { value: "on" }, {
                                  default: withCtx(() => [
                                    createTextVNode("启用")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { value: "off" }, {
                                  default: withCtx(() => [
                                    createTextVNode("停用")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_radio_group, {
                            modelValue: form.status,
                            "onUpdate:modelValue": ($event) => form.status = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "on" }, {
                                default: withCtx(() => [
                                  createTextVNode("启用")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "off" }, {
                                default: withCtx(() => [
                                  createTextVNode("停用")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "名称",
                      prop: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "请输入分类名称"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "状态",
                      prop: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_radio_group, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_radio, { value: "on" }, {
                              default: withCtx(() => [
                                createTextVNode("启用")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_radio, { value: "off" }, {
                              default: withCtx(() => [
                                createTextVNode("停用")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: form,
                rules,
                ref_key: "formRef",
                ref: formRef,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "名称",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.name,
                        "onUpdate:modelValue": ($event) => form.name = $event,
                        placeholder: "请输入分类名称"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "状态",
                    prop: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio_group, {
                        modelValue: form.status,
                        "onUpdate:modelValue": ($event) => form.status = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio, { value: "on" }, {
                            default: withCtx(() => [
                              createTextVNode("启用")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_radio, { value: "off" }, {
                            default: withCtx(() => [
                              createTextVNode("停用")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "rules"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b4cde00"]]);
export {
  categories as default
};
//# sourceMappingURL=categories-BJoiUj_8.js.map
