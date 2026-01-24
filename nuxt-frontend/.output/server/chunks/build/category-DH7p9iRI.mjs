import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, z as arrow_left_default, p as plus_default, ah as ElMessage } from './server.mjs';
import { a as ElTable, E as ElTableColumn } from './index-KOxrtlML.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElPopconfirm } from './index-C5lE8Bsy.mjs';
import { E as ElDialog } from './index-I18rzBgu.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElSwitch } from './index-CpWtG_dp.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { a as adminFaqApi } from './help-center-CbrlDHXl.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
import './index-D_b573Qt.mjs';
import './index-Dxw_X3Hq.mjs';
import './index-B9I5bL_Z.mjs';
import '@popperjs/core';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-DrPRyc7n.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './index-Dg8Z-nTr.mjs';
import './vnode-D0IHQw_9.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
import 'async-validator';
import './index-ClPmkyX9.mjs';
import './index-DOE061f1.mjs';
import './validator-T0bsmJHo.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "category",
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
        ElMessage.success("\u5220\u9664\u6210\u529F");
        fetchCategories();
      } else {
        ElMessage.error(res.error || "\u5220\u9664\u5931\u8D25");
      }
    };
    const submitForm = async () => {
      if (!form.value.name) return ElMessage.warning("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0");
      submitting.value = true;
      try {
        if (isEdit.value) {
          const res = await adminFaqApi.updateCategory(currentId.value, form.value);
          if (res.success) {
            ElMessage.success("\u66F4\u65B0\u6210\u529F");
            dialogVisible.value = false;
            fetchCategories();
          } else {
            ElMessage.error(res.error || "\u66F4\u65B0\u5931\u8D25");
          }
        } else {
          const res = await adminFaqApi.createCategory({
            name: form.value.name,
            sort_order: form.value.sort_order
          });
          if (res.success) {
            ElMessage.success("\u521B\u5EFA\u6210\u529F");
            dialogVisible.value = false;
            fetchCategories();
          } else {
            ElMessage.error(res.error || "\u521B\u5EFA\u5931\u8D25");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-category-page" }, _attrs))} data-v-bc6e31f1><div class="page-header" data-v-bc6e31f1><div class="header-left" data-v-bc6e31f1>`);
      _push(ssrRenderComponent(_component_el_button, {
        link: "",
        onClick: ($event) => _ctx.$router.push("/_mgmt_9Xfa3/faq")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(arrow_left_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(arrow_left_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u8FD4\u56DE\u5217\u8868 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(arrow_left_default))
                ]),
                _: 1
              }),
              createTextVNode(" \u8FD4\u56DE\u5217\u8868 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="title-area" data-v-bc6e31f1><h2 class="page-title" data-v-bc6e31f1>\u95EE\u9898\u5206\u7C7B\u7BA1\u7406</h2></div></div><div class="header-right" data-v-bc6e31f1>`);
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
            _push2(` \u65B0\u589E\u5206\u7C7B `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              createTextVNode(" \u65B0\u589E\u5206\u7C7B ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(mergeProps({ class: "content-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-bc6e31f1>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: categories.value,
        style: { "width": "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "sort_order",
              label: "\u6392\u5E8F",
              width: "100",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "\u5206\u7C7B\u540D\u79F0"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
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
                          _push4(`\u542F\u7528`);
                        } else {
                          return [
                            createTextVNode("\u542F\u7528")
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
                          _push4(`\u7981\u7528`);
                        } else {
                          return [
                            createTextVNode("\u7981\u7528")
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
                        createTextVNode("\u542F\u7528")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7981\u7528")
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
              label: "\u521B\u5EFA\u65F6\u95F4",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`\u7F16\u8F91`);
                      } else {
                        return [
                          createTextVNode("\u7F16\u8F91")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_popconfirm, {
                    title: "\u786E\u5B9A\u5220\u9664\u6B64\u5206\u7C7B\u5417\uFF1F",
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
                              _push5(`\u5220\u9664`);
                            } else {
                              return [
                                createTextVNode("\u5220\u9664")
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
                              createTextVNode("\u5220\u9664")
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
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: "\u786E\u5B9A\u5220\u9664\u6B64\u5206\u7C7B\u5417\uFF1F",
                      onConfirm: ($event) => handleDelete(row.id)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "danger",
                          link: "",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u5220\u9664")
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
                label: "\u6392\u5E8F",
                width: "100",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "\u5206\u7C7B\u540D\u79F0"
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
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
                      createTextVNode("\u542F\u7528")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7981\u7528")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "created_at",
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "200"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString()), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_popconfirm, {
                    title: "\u786E\u5B9A\u5220\u9664\u6B64\u5206\u7C7B\u5417\uFF1F",
                    onConfirm: ($event) => handleDelete(row.id)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "danger",
                        link: "",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5220\u9664")
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
        title: isEdit.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u65B0\u589E\u5206\u7C7B",
        width: "500px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="dialog-footer" data-v-bc6e31f1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u53D6\u6D88`);
                } else {
                  return [
                    createTextVNode("\u53D6\u6D88")
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
                  _push3(`\u786E\u5B9A`);
                } else {
                  return [
                    createTextVNode("\u786E\u5B9A")
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
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitForm,
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u786E\u5B9A")
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u5206\u7C7B\u540D\u79F0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
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
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u542F\u7528\u72B6\u6001" }, {
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
                    createVNode(_component_el_form_item, { label: "\u5206\u7C7B\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
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
                      label: "\u542F\u7528\u72B6\u6001"
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
                  createVNode(_component_el_form_item, { label: "\u5206\u7C7B\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
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
                    label: "\u542F\u7528\u72B6\u6001"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/faq/category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const category = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc6e31f1"]]);

export { category as default };
//# sourceMappingURL=category-DH7p9iRI.mjs.map
