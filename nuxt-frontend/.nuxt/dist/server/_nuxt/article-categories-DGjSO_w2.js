import { E as ElButton } from "./index-CGHU_uKU.js";
import { E as ElTableColumn } from "./index-DnlpAwTZ.js";
import { E as ElSwitch } from "./index-DVwBR8VS.js";
import { E as ElForm, a as ElFormItem } from "./index-uVJ2GEO7.js";
import { E as ElInput } from "./index-ttyu327u.js";
import { E as ElColorPicker } from "./index-nE7c0BS8.js";
import { E as ElInputNumber } from "./index-eckTRjyM.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                 */
/* empty css                      */
/* empty css                  */
/* empty css                               */
/* empty css                         */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { b as adminArticleApi } from "./help-center-CsRpUZsm.js";
import { p as plus_default } from "./index-CRs4T-Jf.js";
import { P as PageTipHeader } from "./PageTipHeader-CYVW2ELG.js";
import { A as AdminActionCard } from "./AdminActionCard-Br1XkmCK.js";
import { A as AdminDataTable } from "./AdminDataTable-adUoqR6P.js";
import { A as AdminDataDialog } from "./AdminDataDialog-CdRAbjlt.js";
import { u as useAdminDialog, c as confirmDelete } from "./useAdminDialog-B2Mn_Lor.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-DxnRhcjj.js";
import "./index-C8K_s-bH.js";
import "lodash-unified";
import "@vue/shared";
import "./index-D6MDXFfa.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C00m4e8W.js";
import "./use-form-item-n_L16njV.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-D4s2dalC.js";
import "./index-B6zOcltc.js";
import "./index-m3FMdVd3.js";
import "@popperjs/core";
import "./focus-trap.vue-DLhiv9tF.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-RDuG-1hQ.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-DW0BNsk6.js";
import "async-validator";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-C8YaaWrc.js";
import "./index-D3BlhKEk.js";
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
import "./index-CDEPy-be.js";
import "./vnode-uc6o_sOa.js";
/* empty css                  */
import "./index-DEoO_C5P.js";
/* empty css                    */
import "./index-DT739kqT.js";
import "./index-CdIsMbUc.js";
import "./index-CIsKhoUN.js";
import "./index-RGUM47gz.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BYDsUCKj.js";
import "./directive-Cp0y9Az7.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./index-BzKtum8I.js";
import "./index-Cpe5xmf8.js";
import "./refs-CxYYXu5Q.js";
import "./index-D_dCF80h.js";
/* empty css                   */
/* empty css                    */
/* empty css                        */
import "./index-DwAj9U47.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "article-categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const categories = ref([]);
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
    const dialog = useAdminDialog({
      id: "",
      name: "",
      icon: "📝",
      color: "#409EFF",
      sort_order: 10,
      is_active: true
    }, {
      onSubmit: async (form, isEdit) => {
        if (!form.name) {
          ElMessage.warning("请输入分类名称");
          return { success: false };
        }
        const payload = {
          name: form.name,
          icon: form.icon,
          color: form.color,
          sort_order: form.sort_order,
          is_active: form.is_active
        };
        let res;
        if (isEdit) {
          res = await adminArticleApi.updateCategory(form.id, payload);
        } else {
          res = await adminArticleApi.createCategory(payload);
        }
        if (res.error) {
          return { success: false, error: res.error.message || String(res.error) };
        }
        return { success: true };
      },
      onSuccess: async () => {
        await fetchCategories();
      }
    });
    const handleStatusChange = async (row) => {
      try {
        const { error } = await adminArticleApi.updateCategory(row.id, { is_active: row.is_active });
        if (error) {
          row.is_active = !row.is_active;
          throw error;
        }
        ElMessage.success(row.is_active ? "已启用" : "已禁用");
      } catch (error) {
        ElMessage.error("更新状态失败: " + (error.message || String(error)));
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "确定要删除这个分类吗？",
        async () => {
          const res = await adminArticleApi.deleteCategory(row.id);
          if (res.error) {
            throw new Error(res.error.message || String(res.error));
          }
          await fetchCategories();
          return { success: true };
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_switch = ElSwitch;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_color_picker = ElColorPicker;
      const _component_el_input_number = ElInputNumber;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-e68f5feb>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "文章分类",
        description: "管理帮助中心文章的分类结构。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => unref(dialog).openAdd()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`新增分类`);
                } else {
                  return [
                    createTextVNode("新增分类")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: ($event) => unref(dialog).openAdd()
              }, {
                default: withCtx(() => [
                  createTextVNode("新增分类")
                ]),
                _: 1
              }, 8, ["icon", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: categories.value,
        loading: loading.value,
        "show-pagination": false,
        class: "mt-4",
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
                  _push3(`<span style="${ssrRenderStyle({ "font-size": "20px" })}" data-v-e68f5feb${_scopeId2}>${ssrInterpolate(row.icon)}</span>`);
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
                  _push3(`<span style="${ssrRenderStyle({ color: row.color, fontWeight: "bold" })}" data-v-e68f5feb${_scopeId2}>${ssrInterpolate(row.name)}</span>`);
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
                  _push3(`<div class="flex items-center" data-v-e68f5feb${_scopeId2}><div style="${ssrRenderStyle({ background: row.color, width: "16px", height: "16px", borderRadius: "4px", marginRight: "8px", border: "1px solid #ddd" })}" data-v-e68f5feb${_scopeId2}></div><span data-v-e68f5feb${_scopeId2}>${ssrInterpolate(row.color)}</span></div>`);
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
                    onClick: ($event) => unref(dialog).openEdit(row)
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
                      onClick: ($event) => unref(dialog).openEdit(row)
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
                    onClick: ($event) => unref(dialog).openEdit(row)
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
      _push(ssrRenderComponent(AdminDataDialog, {
        modelValue: unref(dialog).visible.value,
        "onUpdate:modelValue": ($event) => unref(dialog).visible.value = $event,
        title: unref(dialog).isEdit.value ? "编辑分类" : "新增分类",
        loading: unref(dialog).loading.value,
        onConfirm: unref(dialog).submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: unref(dialog).form,
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
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "例如: 使用攻略"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.name,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
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
                          modelValue: unref(dialog).form.icon,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                          placeholder: "Emoji 或 Element 图标名",
                          style: { "width": "100px" }
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(dialog).form.icon) {
                                _push5(`<span data-v-e68f5feb${_scopeId4}>${ssrInterpolate(unref(dialog).form.icon)}</span>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-gray-400 text-xs ml-2" data-v-e68f5feb${_scopeId3}>推荐使用 Emoji，如 📝</span>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.icon,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                            placeholder: "Emoji 或 Element 图标名",
                            style: { "width": "100px" }
                          }, {
                            append: withCtx(() => [
                              unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
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
                          modelValue: unref(dialog).form.color,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.color,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event,
                          style: { "width": "120px", "margin-left": "10px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_color_picker, {
                            modelValue: unref(dialog).form.color,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.color,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event,
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
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0,
                          max: 999
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-gray-400 text-xs ml-2" data-v-e68f5feb${_scopeId3}>数字越小越靠前</span>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sort_order,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
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
                          modelValue: unref(dialog).form.is_active,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
                          "active-text": "启用",
                          "inactive-text": "禁用"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: unref(dialog).form.is_active,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
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
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
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
                          modelValue: unref(dialog).form.icon,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                          placeholder: "Emoji 或 Element 图标名",
                          style: { "width": "100px" }
                        }, {
                          append: withCtx(() => [
                            unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
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
                          modelValue: unref(dialog).form.color,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.color,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event,
                          style: { "width": "120px", "margin-left": "10px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "排序" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
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
                          modelValue: unref(dialog).form.is_active,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
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
                model: unref(dialog).form,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "名称",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.name,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
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
                        modelValue: unref(dialog).form.icon,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                        placeholder: "Emoji 或 Element 图标名",
                        style: { "width": "100px" }
                      }, {
                        append: withCtx(() => [
                          unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
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
                        modelValue: unref(dialog).form.color,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.color,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.color = $event,
                        style: { "width": "120px", "margin-left": "10px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "排序" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: unref(dialog).form.sort_order,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
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
                        modelValue: unref(dialog).form.is_active,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
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
const articleCategories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e68f5feb"]]);
export {
  articleCategories as default
};
//# sourceMappingURL=article-categories-DGjSO_w2.js.map
