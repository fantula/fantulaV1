import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElIcon, p as plus_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElPopconfirm } from "./index-C5lE8Bsy.js";
import { E as ElDialog } from "./index-I18rzBgu.js";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                    */
/* empty css                   */
/* empty css                    */
/* empty css                      */
/* empty css                  */
/* empty css                         */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { a as adminFaqApi } from "./help-center-CbrlDHXl.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
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
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "./index-D_b573Qt.js";
import "./index-Dxw_X3Hq.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-Dg8Z-nTr.js";
import "./vnode-D0IHQw_9.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "async-validator";
import "./index-ClPmkyX9.js";
import "./index-DOE061f1.js";
import "./validator-T0bsmJHo.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq-categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const categories = ref([]);
    const dialogVisible = ref(false);
    const submitting = ref(false);
    const isEdit = ref(false);
    const currentId = ref("");
    const form = ref({
      name: "",
      sort_order: 0,
      is_active: true
    });
    const fetchCategories = async () => {
      loading.value = true;
      const res = await adminFaqApi.getCategories();
      if (res.success) {
        categories.value = res.categories;
      }
      loading.value = false;
    };
    const handleAdd = () => {
      isEdit.value = false;
      form.value = { name: "", sort_order: 0, is_active: true };
      dialogVisible.value = true;
    };
    const handleEdit = (row) => {
      isEdit.value = true;
      currentId.value = row.id;
      form.value = {
        name: row.name,
        sort_order: row.sort_order,
        is_active: row.is_active
      };
      dialogVisible.value = true;
    };
    const handleDelete = async (id) => {
      const res = await adminFaqApi.deleteCategory(id);
      if (res.success) {
        ElMessage.success("删除成功");
        fetchCategories();
      } else {
        ElMessage.error(res.error || "删除失败");
      }
    };
    const submitForm = async () => {
      if (!form.value.name) return ElMessage.warning("请输入分类名称");
      submitting.value = true;
      try {
        if (isEdit.value) {
          const res = await adminFaqApi.updateCategory(currentId.value, form.value);
          if (res.success) {
            ElMessage.success("更新成功");
            dialogVisible.value = false;
            fetchCategories();
          } else {
            ElMessage.error(res.error || "更新失败");
          }
        } else {
          const res = await adminFaqApi.createCategory({
            name: form.value.name,
            sort_order: form.value.sort_order
          });
          if (res.success) {
            ElMessage.success("创建成功");
            dialogVisible.value = false;
            fetchCategories();
          } else {
            ElMessage.error(res.error || "创建失败");
          }
        }
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_popconfirm = ElPopconfirm;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-category-page" }, _attrs))} data-v-39850a32><div class="page-actions" data-v-39850a32>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: handleAdd
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
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
              createVNode(_component_el_icon, null, {
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
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "content-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-39850a32>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: categories.value,
        style: { "width": "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "sort_order",
              label: "排序",
              width: "100",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "分类名称"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.is_active) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "success",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`启用`);
                        } else {
                          return [
                            createTextVNode("启用")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "info",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`禁用`);
                        } else {
                          return [
                            createTextVNode("禁用")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.is_active ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: "success",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("启用")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("禁用")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "created_at",
              label: "创建时间",
              width: "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(new Date(row.created_at).toLocaleString())}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString()), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "180",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    link: "",
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
                  _push3(ssrRenderComponent(_component_el_popconfirm, {
                    title: "确定删除此分类吗？",
                    onConfirm: ($event) => handleDelete(row.id)
                  }, {
                    reference: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "danger",
                          link: "",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`删除`);
                            } else {
                              return [
                                createTextVNode("删除")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "danger",
                            link: "",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      link: "",
                      size: "small",
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: "确定删除此分类吗？",
                      onConfirm: ($event) => handleDelete(row.id)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "danger",
                          link: "",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onConfirm"])
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
                width: "100",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "分类名称"
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.is_active ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "success",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("启用")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "created_at",
                label: "创建时间",
                width: "200"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString()), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    link: "",
                    size: "small",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_popconfirm, {
                    title: "确定删除此分类吗？",
                    onConfirm: ($event) => handleDelete(row.id)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "danger",
                        link: "",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onConfirm"])
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
            _push2(`<div class="dialog-footer" data-v-39850a32${_scopeId}>`);
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
              onClick: submitForm,
              loading: submitting.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确定`);
                } else {
                  return [
                    createTextVNode("确定")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "dialog-footer" }, [
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
                  onClick: submitForm,
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("确定")
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
              model: form.value,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "分类名称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "请输入分类名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "请输入分类名称"
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
                          modelValue: form.value.sort_order,
                          "onUpdate:modelValue": ($event) => form.value.sort_order = $event,
                          min: 0
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: form.value.sort_order,
                            "onUpdate:modelValue": ($event) => form.value.sort_order = $event,
                            min: 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (isEdit.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "启用状态" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_switch, {
                            modelValue: form.value.is_active,
                            "onUpdate:modelValue": ($event) => form.value.is_active = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_switch, {
                              modelValue: form.value.is_active,
                              "onUpdate:modelValue": ($event) => form.value.is_active = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "分类名称" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "请输入分类名称"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "排序" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: form.value.sort_order,
                          "onUpdate:modelValue": ($event) => form.value.sort_order = $event,
                          min: 0
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "启用状态"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: form.value.is_active,
                          "onUpdate:modelValue": ($event) => form.value.is_active = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: form.value,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "分类名称" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "请输入分类名称"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "排序" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: form.value.sort_order,
                        "onUpdate:modelValue": ($event) => form.value.sort_order = $event,
                        min: 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "启用状态"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: form.value.is_active,
                        "onUpdate:modelValue": ($event) => form.value.is_active = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/help-center/faq-categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faqCategories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39850a32"]]);
export {
  faqCategories as default
};
//# sourceMappingURL=faq-categories-CxKTEnwZ.js.map
