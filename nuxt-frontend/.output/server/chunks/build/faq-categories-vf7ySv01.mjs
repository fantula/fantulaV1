import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElTag } from './index-CzsgKIaa.mjs';
import { E as ElForm, a as ElFormItem } from './index-Bd_1JmUc.mjs';
import { E as ElInput } from './index-DHiqjM1w.mjs';
import { E as ElInputNumber } from './index-C8Zv6czV.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { p as plus_default } from './index-DuV_oMrC.mjs';
import { b as adminFaqApi } from './help-center-DNLjTRh2.mjs';
import { P as PageTipHeader } from './PageTipHeader-Dofk1SFn.mjs';
import { A as AdminActionCard } from './AdminActionCard-CU3C31Qp.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-DdPeAUNy.mjs';
import { u as useAdminDialog, a as confirmDelete } from './useAdminDialog-DGlLxLb0.mjs';
import { u as useBizFormat } from './useBizFormat-DFfhmR3x.mjs';
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
import 'async-validator';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
import './index-D3BlhKEk.mjs';
import './validator-B2QmXMzy.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './index-B4LZdJVK.mjs';
import './vnode-BKSxKQVt.mjs';
import './index-BWwwK9Wh.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './index-z3smHzuf.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DHYrZ40v.mjs';
import './index-BKas9GMw.mjs';
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
  __name: "faq-categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const categories = ref([]);
    const { formatDate } = useBizFormat();
    const fetchCategories = async () => {
      loading.value = true;
      const res = await adminFaqApi.getCategories();
      if (res.success) {
        categories.value = res.categories || [];
      }
      loading.value = false;
    };
    const dialog = useAdminDialog({
      id: "",
      name: "",
      sort_order: 0,
      is_active: true,
      is_checkout_visible: false
    }, {
      onSubmit: async (form, isEdit) => {
        if (!form.name) {
          ElMessage.warning("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0");
          return { success: false };
        }
        let res;
        if (isEdit) {
          res = await adminFaqApi.updateCategory(form.id, {
            name: form.name,
            sort_order: form.sort_order,
            is_active: form.is_active,
            is_checkout_visible: form.is_checkout_visible
          });
        } else {
          res = await adminFaqApi.createCategory({
            name: form.name,
            sort_order: form.sort_order,
            is_checkout_visible: form.is_checkout_visible
          });
        }
        if (res.error) {
          return { success: false, error: res.error.message || String(res.error) };
        }
        return { success: true };
      },
      onSuccess: async () => {
        await fetchCategories();
        ElMessage.success(dialog.isEdit.value ? "\u66F4\u65B0\u6210\u529F" : "\u521B\u5EFA\u6210\u529F");
      }
    });
    const formRef = dialog.formRef;
    const handleDelete = async (row) => {
      await confirmDelete(
        "\u786E\u5B9A\u8981\u5220\u9664\u6B64\u5206\u7C7B\u5417\uFF1F",
        async () => {
          const res = await adminFaqApi.deleteCategory(row.id);
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
      const _component_el_tag = ElTag;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-e2fb1650>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u95EE\u9898\u5206\u7C7B",
        description: "\u7BA1\u7406\u5E38\u89C1\u95EE\u9898\uFF08FAQ\uFF09\u7684\u5206\u7C7B\u7ED3\u6784\u3002"
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
              label: "\u7ED3\u7B97\u9875\u663E\u793A",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.is_checkout_visible) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u663E\u793A`);
                        } else {
                          return [
                            createTextVNode("\u663E\u793A")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "info",
                      size: "small",
                      effect: "plain"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u9690\u85CF`);
                        } else {
                          return [
                            createTextVNode("\u9690\u85CF")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.is_checkout_visible ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u663E\u793A")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "info",
                      size: "small",
                      effect: "plain"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u9690\u85CF")
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
                  _push3(`${ssrInterpolate(unref(formatDate)(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              width: "180",
              align: "center",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    link: "",
                    size: "small",
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
                    type: "danger",
                    link: "",
                    size: "small",
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
                      type: "primary",
                      link: "",
                      size: "small",
                      onClick: ($event) => unref(dialog).openEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "danger",
                      link: "",
                      size: "small",
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
                label: "\u7ED3\u7B97\u9875\u663E\u793A",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.is_checkout_visible ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "warning",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u663E\u793A")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "info",
                    size: "small",
                    effect: "plain"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u9690\u85CF")
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
                  createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "180",
                align: "center",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    link: "",
                    size: "small",
                    onClick: ($event) => unref(dialog).openEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "danger",
                    link: "",
                    size: "small",
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
              ref_key: "formRef",
              ref: formRef,
              model: unref(dialog).form,
              "label-width": "110px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u5206\u7C7B\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.name,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
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
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sort_order,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                            min: 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(dialog).isEdit.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u542F\u7528\u72B6\u6001" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_switch, {
                            modelValue: unref(dialog).form.is_active,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_switch, {
                              modelValue: unref(dialog).form.is_active,
                              "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u7ED3\u7B97\u9875\u663E\u793A" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: unref(dialog).form.is_checkout_visible,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip text-gray-400 text-xs mt-1" data-v-e2fb1650${_scopeId3}>\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002</div>`);
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: unref(dialog).form.is_checkout_visible,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip text-gray-400 text-xs mt-1" }, "\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u5206\u7C7B\u540D\u79F0",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    unref(dialog).isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "\u542F\u7528\u72B6\u6001"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: unref(dialog).form.is_active,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_form_item, { label: "\u7ED3\u7B97\u9875\u663E\u793A" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: unref(dialog).form.is_checkout_visible,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip text-gray-400 text-xs mt-1" }, "\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002")
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
                ref_key: "formRef",
                ref: formRef,
                model: unref(dialog).form,
                "label-width": "110px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u5206\u7C7B\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.name,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: unref(dialog).form.sort_order,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                        min: 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  unref(dialog).isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "\u542F\u7528\u72B6\u6001"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: unref(dialog).form.is_active,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, { label: "\u7ED3\u7B97\u9875\u663E\u793A" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: unref(dialog).form.is_checkout_visible,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip text-gray-400 text-xs mt-1" }, "\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/help-center/faq-categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faqCategories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2fb1650"]]);

export { faqCategories as default };
//# sourceMappingURL=faq-categories-vf7ySv01.mjs.map
