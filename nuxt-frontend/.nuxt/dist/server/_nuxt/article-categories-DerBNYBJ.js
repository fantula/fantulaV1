import { E as ElButton } from "./index-B9iQGHXi.js";
import { E as ElIcon } from "./index-Byc6LUYX.js";
import { a as ElTable, E as ElTableColumn } from "./index-DxpgyeZB.js";
import { E as ElSwitch } from "./index-DdwT4cg4.js";
import { E as ElDialog } from "./index-CWqyLnWY.js";
import { E as ElForm, a as ElFormItem } from "./index-DCJPe4PK.js";
import { E as ElInput } from "./index-6YP9MNcL.js";
import { E as ElColorPicker } from "./index-477L1PR6.js";
import { E as ElInputNumber } from "./index-h3-jEqCc.js";
import { v as vLoading } from "./directive-D1M1s_ef.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                   */
/* empty css                   */
/* empty css                    */
/* empty css                 */
/* empty css                      */
/* empty css                  */
/* empty css                               */
/* empty css                         */
/* empty css                    */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { a as adminArticleApi } from "./help-center-DNLjTRh2.js";
import { p as plus_default } from "./index-4qszPKX4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-CJUZrfXE.js";
import { E as ElMessageBox } from "./index-Daa9EAVW.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-BcxG_YvU.js";
import "./index-CO6H4Lsj.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "./index-DGjXPDlO.js";
import "./index-DqrhOzxH.js";
import "./index-D6r9Uwf3.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DrAKMEUO.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-CGHVIElq.js";
import "./index-NMCQtDk_.js";
import "./vnode-C7bAOlXh.js";
import "./refs-CxYYXu5Q.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "async-validator";
import "./typescript-D6L75muK.js";
import "./index-D2CY7Ok3.js";
import "./index-BDc7M6dy.js";
import "./index-D3BlhKEk.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "article-categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const categories = ref([]);
    const dialogVisible = ref(false);
    const submitting = ref(false);
    const isEdit = ref(false);
    const form = reactive({
      id: "",
      name: "",
      icon: "📝",
      color: "#409EFF",
      sort_order: 0,
      is_active: true
    });
    const fetchCategories = async () => {
      loading.value = true;
      try {
        const { data, error } = await adminArticleApi.getCategories();
        if (error) throw error;
        categories.value = data || [];
      } catch (error) {
        ElMessage.error("获取分类失败: " + error.message);
      } finally {
        loading.value = false;
      }
    };
    const openCreate = () => {
      isEdit.value = false;
      form.id = "";
      form.name = "";
      form.icon = "📝";
      form.color = "#409EFF";
      form.sort_order = 10;
      form.is_active = true;
      dialogVisible.value = true;
    };
    const openEdit = (row) => {
      isEdit.value = true;
      Object.assign(form, row);
      dialogVisible.value = true;
    };
    const handleSubmit = async () => {
      if (!form.name) {
        ElMessage.warning("请输入分类名称");
        return;
      }
      submitting.value = true;
      try {
        const payload = {
          name: form.name,
          icon: form.icon,
          color: form.color,
          sort_order: form.sort_order,
          is_active: form.is_active
        };
        if (isEdit.value) {
          const { error } = await adminArticleApi.updateCategory(form.id, payload);
          if (error) throw error;
          ElMessage.success("更新成功");
        } else {
          const { error } = await adminArticleApi.createCategory(payload);
          if (error) throw error;
          ElMessage.success("创建成功");
        }
        dialogVisible.value = false;
        fetchCategories();
      } catch (error) {
        ElMessage.error("操作失败: " + error.message);
      } finally {
        submitting.value = false;
      }
    };
    const handleStatusChange = async (row) => {
      try {
        const { error } = await adminArticleApi.updateCategory(row.id, { is_active: row.is_active });
        if (error) {
          row.is_active = !row.is_active;
          throw error;
        }
        ElMessage.success(row.is_active ? "已启用" : "已禁用");
      } catch (error) {
        ElMessage.error("更新状态失败: " + error.message);
      }
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("确定要删除这个分类吗？", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          const { error } = await adminArticleApi.deleteCategory(row.id);
          if (error) throw error;
          ElMessage.success("删除成功");
          fetchCategories();
        } catch (error) {
          ElMessage.error("删除失败: " + error.message);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_switch = ElSwitch;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_color_picker = ElColorPicker;
      const _component_el_input_number = ElInputNumber;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-cfc6ba96><div class="page-actions" data-v-cfc6ba96>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: openCreate
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "mr-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(plus_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(plus_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` 新增分类 `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "mr-1" }, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              createTextVNode(" 新增分类 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "table-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-cfc6ba96>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: categories.value,
        border: "",
        style: { "width": "100%" },
        "row-key": "id"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "sort_order",
              label: "排序",
              width: "80",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "icon",
              label: "图标",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span style="${ssrRenderStyle({ "font-size": "20px" })}" data-v-cfc6ba96${_scopeId2}>${ssrInterpolate(row.icon)}</span>`);
                } else {
                  return [
                    createVNode("span", { style: { "font-size": "20px" } }, toDisplayString(row.icon), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "名称",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span style="${ssrRenderStyle({ color: row.color, fontWeight: "bold" })}" data-v-cfc6ba96${_scopeId2}>${ssrInterpolate(row.name)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      style: { color: row.color, fontWeight: "bold" }
                    }, toDisplayString(row.name), 5)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "color",
              label: "颜色代码",
              width: "120"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center" data-v-cfc6ba96${_scopeId2}><div style="${ssrRenderStyle({ background: row.color, width: "16px", height: "16px", borderRadius: "4px", marginRight: "8px", border: "1px solid #ddd" })}" data-v-cfc6ba96${_scopeId2}></div><span data-v-cfc6ba96${_scopeId2}>${ssrInterpolate(row.color)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", {
                        style: { background: row.color, width: "16px", height: "16px", borderRadius: "4px", marginRight: "8px", border: "1px solid #ddd" }
                      }, null, 4),
                      createVNode("span", null, toDisplayString(row.color), 1)
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
                    modelValue: row.is_active,
                    "onUpdate:modelValue": ($event) => row.is_active = $event,
                    "active-color": "#13ce66",
                    "inactive-color": "#ff4949",
                    onChange: ($event) => handleStatusChange(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.is_active,
                      "onUpdate:modelValue": ($event) => row.is_active = $event,
                      "active-color": "#13ce66",
                      "inactive-color": "#ff4949",
                      onChange: ($event) => handleStatusChange(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "180",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEdit(row)
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
                  return [
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => openEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => handleDelete(row)
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
                prop: "sort_order",
                label: "排序",
                width: "80",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "icon",
                label: "图标",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { style: { "font-size": "20px" } }, toDisplayString(row.icon), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "名称",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    style: { color: row.color, fontWeight: "bold" }
                  }, toDisplayString(row.name), 5)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "color",
                label: "颜色代码",
                width: "120"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode("div", {
                      style: { background: row.color, width: "16px", height: "16px", borderRadius: "4px", marginRight: "8px", border: "1px solid #ddd" }
                    }, null, 4),
                    createVNode("span", null, toDisplayString(row.color), 1)
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
                    modelValue: row.is_active,
                    "onUpdate:modelValue": ($event) => row.is_active = $event,
                    "active-color": "#13ce66",
                    "inactive-color": "#ff4949",
                    onChange: ($event) => handleStatusChange(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "180",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
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
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? "编辑分类" : "新增分类",
        width: "500px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-cfc6ba96${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleSubmit,
              loading: submitting.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 确定 `);
                } else {
                  return [
                    createTextVNode(" 确定 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => dialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleSubmit,
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 确定 ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "名称",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "例如: 使用攻略"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.name,
                            "onUpdate:modelValue": ($event) => form.name = $event,
                            placeholder: "例如: 使用攻略"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "图标",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.icon,
                          "onUpdate:modelValue": ($event) => form.icon = $event,
                          placeholder: "Emoji 或 Element 图标名",
                          style: { "width": "100px" }
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (form.icon) {
                                _push5(`<span data-v-cfc6ba96${_scopeId4}>${ssrInterpolate(form.icon)}</span>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(form.icon), 1)) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-gray-400 text-xs ml-2" data-v-cfc6ba96${_scopeId3}>推荐使用 Emoji，如 📝</span>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.icon,
                            "onUpdate:modelValue": ($event) => form.icon = $event,
                            placeholder: "Emoji 或 Element 图标名",
                            style: { "width": "100px" }
                          }, {
                            append: withCtx(() => [
                              form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(form.icon), 1)) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "推荐使用 Emoji，如 📝")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "颜色",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_color_picker, {
                          modelValue: form.color,
                          "onUpdate:modelValue": ($event) => form.color = $event
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.color,
                          "onUpdate:modelValue": ($event) => form.color = $event,
                          style: { "width": "120px", "margin-left": "10px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_color_picker, {
                            modelValue: form.color,
                            "onUpdate:modelValue": ($event) => form.color = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_el_input, {
                            modelValue: form.color,
                            "onUpdate:modelValue": ($event) => form.color = $event,
                            style: { "width": "120px", "margin-left": "10px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "排序" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: form.sort_order,
                          "onUpdate:modelValue": ($event) => form.sort_order = $event,
                          min: 0,
                          max: 999
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-gray-400 text-xs ml-2" data-v-cfc6ba96${_scopeId3}>数字越小越靠前</span>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: form.sort_order,
                            "onUpdate:modelValue": ($event) => form.sort_order = $event,
                            min: 0,
                            max: 999
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "数字越小越靠前")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "状态" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: form.is_active,
                          "onUpdate:modelValue": ($event) => form.is_active = $event,
                          "active-text": "启用",
                          "inactive-text": "禁用"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: form.is_active,
                            "onUpdate:modelValue": ($event) => form.is_active = $event,
                            "active-text": "启用",
                            "inactive-text": "禁用"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "名称",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "例如: 使用攻略"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "图标",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.icon,
                          "onUpdate:modelValue": ($event) => form.icon = $event,
                          placeholder: "Emoji 或 Element 图标名",
                          style: { "width": "100px" }
                        }, {
                          append: withCtx(() => [
                            form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(form.icon), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "推荐使用 Emoji，如 📝")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "颜色",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_color_picker, {
                          modelValue: form.color,
                          "onUpdate:modelValue": ($event) => form.color = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_el_input, {
                          modelValue: form.color,
                          "onUpdate:modelValue": ($event) => form.color = $event,
                          style: { "width": "120px", "margin-left": "10px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "排序" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: form.sort_order,
                          "onUpdate:modelValue": ($event) => form.sort_order = $event,
                          min: 0,
                          max: 999
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "数字越小越靠前")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "状态" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: form.is_active,
                          "onUpdate:modelValue": ($event) => form.is_active = $event,
                          "active-text": "启用",
                          "inactive-text": "禁用"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "名称",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.name,
                        "onUpdate:modelValue": ($event) => form.name = $event,
                        placeholder: "例如: 使用攻略"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "图标",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.icon,
                        "onUpdate:modelValue": ($event) => form.icon = $event,
                        placeholder: "Emoji 或 Element 图标名",
                        style: { "width": "100px" }
                      }, {
                        append: withCtx(() => [
                          form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(form.icon), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "推荐使用 Emoji，如 📝")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "颜色",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_color_picker, {
                        modelValue: form.color,
                        "onUpdate:modelValue": ($event) => form.color = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_el_input, {
                        modelValue: form.color,
                        "onUpdate:modelValue": ($event) => form.color = $event,
                        style: { "width": "120px", "margin-left": "10px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "排序" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: form.sort_order,
                        "onUpdate:modelValue": ($event) => form.sort_order = $event,
                        min: 0,
                        max: 999
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "数字越小越靠前")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "状态" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: form.is_active,
                        "onUpdate:modelValue": ($event) => form.is_active = $event,
                        "active-text": "启用",
                        "inactive-text": "禁用"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/help-center/article-categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const articleCategories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfc6ba96"]]);
export {
  articleCategories as default
};
//# sourceMappingURL=article-categories-DerBNYBJ.js.map
