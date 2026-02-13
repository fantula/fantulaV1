import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { E as ElForm, a as ElFormItem } from './index-Bd_1JmUc.mjs';
import { E as ElInput } from './index-DHiqjM1w.mjs';
import { E as ElColorPicker } from './index-DvQn5zN4.mjs';
import { E as ElInputNumber } from './index-C8Zv6czV.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { a as adminArticleApi } from './help-center-DNLjTRh2.mjs';
import { p as plus_default } from './index-DuV_oMrC.mjs';
import { P as PageTipHeader } from './PageTipHeader-Dofk1SFn.mjs';
import { A as AdminActionCard } from './AdminActionCard-CU3C31Qp.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-DdPeAUNy.mjs';
import { u as useAdminDialog, a as confirmDelete } from './useAdminDialog-DGlLxLb0.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
import { _ as _export_sfc } from './server.mjs';
import './icon-CyvpkMdQ.mjs';
import './index-xMedQC9S.mjs';
import 'lodash-unified';
import '@vue/shared';
import './index-CsSUb8pm.mjs';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './use-global-config-Dt87SALX.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-CVMnQJck.mjs';
import './index-C88l1uRA.mjs';
import './index-B8mpCVSS.mjs';
import '@popperjs/core';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-7GSISQj3.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './validator-B2QmXMzy.mjs';
import 'async-validator';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
import './index-BKas9GMw.mjs';
import './index-D3BlhKEk.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './index-B4LZdJVK.mjs';
import './vnode-BKSxKQVt.mjs';
import './index-BWwwK9Wh.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './index-z3smHzuf.mjs';
import './index-CzsgKIaa.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DHYrZ40v.mjs';
import './directive-DOWfgPYe.mjs';
import './index-CcOBk9kW.mjs';
import './index-wSws2F9U.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-CC_9xuAU.mjs';
import './index-CJRqI9Bk.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

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
        ElMessage.error("\u83B7\u53D6\u5206\u7C7B\u5931\u8D25: " + error.message);
      } finally {
        loading.value = false;
      }
    };
    const dialog = useAdminDialog({
      id: "",
      name: "",
      icon: "\u{1F4DD}",
      color: "#409EFF",
      sort_order: 10,
      is_active: true
    }, {
      onSubmit: async (form, isEdit) => {
        if (!form.name) {
          ElMessage.warning("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0");
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
        ElMessage.success(row.is_active ? "\u5DF2\u542F\u7528" : "\u5DF2\u7981\u7528");
      } catch (error) {
        ElMessage.error("\u66F4\u65B0\u72B6\u6001\u5931\u8D25: " + (error.message || String(error)));
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u5206\u7C7B\u5417\uFF1F",
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
        title: "\u6587\u7AE0\u5206\u7C7B",
        description: "\u7BA1\u7406\u5E2E\u52A9\u4E2D\u5FC3\u6587\u7AE0\u7684\u5206\u7C7B\u7ED3\u6784\u3002"
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
                  _push3(`\u65B0\u589E\u5206\u7C7B`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u5206\u7C7B")
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
                  createTextVNode("\u65B0\u589E\u5206\u7C7B")
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
              label: "\u6392\u5E8F",
              width: "80",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "icon",
              label: "\u56FE\u6807",
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
              label: "\u540D\u79F0",
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
              label: "\u989C\u8272\u4EE3\u7801",
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
              label: "\u72B6\u6001",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`\u7F16\u8F91`);
                      } else {
                        return [
                          createTextVNode("\u7F16\u8F91")
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
                        _push4(`\u5220\u9664`);
                      } else {
                        return [
                          createTextVNode("\u5220\u9664")
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
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5220\u9664")
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
                label: "\u6392\u5E8F",
                width: "80",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "icon",
                label: "\u56FE\u6807",
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
                label: "\u540D\u79F0",
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
                label: "\u989C\u8272\u4EE3\u7801",
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
                label: "\u72B6\u6001",
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
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5220\u9664")
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
        title: unref(dialog).isEdit.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u65B0\u589E\u5206\u7C7B",
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
                    label: "\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u4F8B\u5982: \u4F7F\u7528\u653B\u7565"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.name,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                            placeholder: "\u4F8B\u5982: \u4F7F\u7528\u653B\u7565"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u56FE\u6807",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.icon,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                          placeholder: "Emoji \u6216 Element \u56FE\u6807\u540D",
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
                        _push4(`<span class="text-gray-400 text-xs ml-2" data-v-e68f5feb${_scopeId3}>\u63A8\u8350\u4F7F\u7528 Emoji\uFF0C\u5982 \u{1F4DD}</span>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.icon,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                            placeholder: "Emoji \u6216 Element \u56FE\u6807\u540D",
                            style: { "width": "100px" }
                          }, {
                            append: withCtx(() => [
                              unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "\u63A8\u8350\u4F7F\u7528 Emoji\uFF0C\u5982 \u{1F4DD}")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u989C\u8272",
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0,
                          max: 999
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-gray-400 text-xs ml-2" data-v-e68f5feb${_scopeId3}>\u6570\u5B57\u8D8A\u5C0F\u8D8A\u9760\u524D</span>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sort_order,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                            min: 0,
                            max: 999
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "\u6570\u5B57\u8D8A\u5C0F\u8D8A\u9760\u524D")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u72B6\u6001" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: unref(dialog).form.is_active,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
                          "active-text": "\u542F\u7528",
                          "inactive-text": "\u7981\u7528"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: unref(dialog).form.is_active,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
                            "active-text": "\u542F\u7528",
                            "inactive-text": "\u7981\u7528"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u540D\u79F0",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u4F8B\u5982: \u4F7F\u7528\u653B\u7565"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u56FE\u6807",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.icon,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                          placeholder: "Emoji \u6216 Element \u56FE\u6807\u540D",
                          style: { "width": "100px" }
                        }, {
                          append: withCtx(() => [
                            unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "\u63A8\u8350\u4F7F\u7528 Emoji\uFF0C\u5982 \u{1F4DD}")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u989C\u8272",
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
                    createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0,
                          max: 999
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "\u6570\u5B57\u8D8A\u5C0F\u8D8A\u9760\u524D")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: unref(dialog).form.is_active,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
                          "active-text": "\u542F\u7528",
                          "inactive-text": "\u7981\u7528"
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
                    label: "\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.name,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                        placeholder: "\u4F8B\u5982: \u4F7F\u7528\u653B\u7565"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u56FE\u6807",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.icon,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.icon = $event,
                        placeholder: "Emoji \u6216 Element \u56FE\u6807\u540D",
                        style: { "width": "100px" }
                      }, {
                        append: withCtx(() => [
                          unref(dialog).form.icon ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dialog).form.icon), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "\u63A8\u8350\u4F7F\u7528 Emoji\uFF0C\u5982 \u{1F4DD}")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u989C\u8272",
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
                  createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: unref(dialog).form.sort_order,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                        min: 0,
                        max: 999
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "text-gray-400 text-xs ml-2" }, "\u6570\u5B57\u8D8A\u5C0F\u8D8A\u9760\u524D")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: unref(dialog).form.is_active,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event,
                        "active-text": "\u542F\u7528",
                        "inactive-text": "\u7981\u7528"
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

export { articleCategories as default };
//# sourceMappingURL=article-categories-D4HRAILh.mjs.map
