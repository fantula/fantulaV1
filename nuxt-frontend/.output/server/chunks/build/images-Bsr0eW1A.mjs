import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { E as ElButton } from './index-DZvUdcyn.mjs';
import { E as ElInput } from './index-CcE-rjwX.mjs';
import { E as ElDivider } from './index-DL7T-Mp9.mjs';
import { E as ElEmpty } from './index-EXqkolUp.mjs';
import { E as ElImage } from './index-BhTf_yFC.mjs';
import { E as ElPagination } from './index-dRoeuTok.mjs';
import { E as ElDialog } from './index-DmU8t9ja.mjs';
import { E as ElForm, a as ElFormItem } from './index-DCJPe4PK.mjs';
import { E as ElSelect, a as ElOption } from './index-uIKF9nns.mjs';
import { v as vLoading } from './directive-D1M1s_ef.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { g as picture_default, ar as folder_remove_default, as as folder_default, at as setting_default, r as refresh_default, a6 as upload_default, H as view_default, _ as edit_default, d as delete_default, J as check_default } from './index-CmsdIFY8.mjs';
import { a as adminImageApi, c as adminImageCategoryApi } from './media-DksayCA2.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
import { E as ElMessageBox } from './index-DVSiICTI.mjs';
import { _ as _export_sfc } from './server.mjs';
import { E as ElUpload } from './index-BMCTPr7n.mjs';
import { u as useSupabaseSession } from './useSupabaseSession-D0X5WUcm.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './icon-eqoLCvNY.mjs';
import './index-CO6H4Lsj.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './typescript-D6L75muK.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './event-D3FEo2C5.mjs';
import './index-D2CY7Ok3.mjs';
import './aria-Rs9hkxop.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './index-ebnaz0b7.mjs';
import './scroll-Df9VGR5S.mjs';
import './raf-CQRaPAjg.mjs';
import './index-NMCQtDk_.mjs';
import './vnode-C7bAOlXh.mjs';
import './refs-CxYYXu5Q.mjs';
import 'async-validator';
import './index-D6r9Uwf3.mjs';
import '@popperjs/core';
import './index-DGjXPDlO.mjs';
import './index-BZB4XnD2.mjs';
import './strings-D1uxkXhq.mjs';
import './index-BDc7M6dy.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './validator-CGHVIElq.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CategoryManagerModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const loading = ref(false);
    const categories = ref([]);
    const newCatName = ref("");
    const fetchCategories = async () => {
      loading.value = true;
      const res = await adminImageCategoryApi.getCategories();
      if (res.success) {
        categories.value = res.categories;
      }
      loading.value = false;
    };
    const handleAdd = async () => {
      if (!newCatName.value.trim()) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0");
        return;
      }
      loading.value = true;
      const res = await adminImageCategoryApi.createCategory(newCatName.value);
      if (res.success) {
        ElMessage.success("\u5206\u7C7B\u6DFB\u52A0\u6210\u529F");
        newCatName.value = "";
        await fetchCategories();
        emit("change");
      } else {
        ElMessage.error("\u6DFB\u52A0\u5931\u8D25: " + res.error);
      }
      loading.value = false;
    };
    const handleDelete = (cat) => {
      ElMessageBox.confirm(`\u786E\u8BA4\u5220\u9664\u5206\u7C7B "${cat.name}" \u5417\uFF1F`, "\u5220\u9664\u5206\u7C7B", {
        type: "warning"
      }).then(async () => {
        loading.value = true;
        const res = await adminImageCategoryApi.deleteCategory(cat.id);
        if (res.success) {
          ElMessage.success("\u5206\u7C7B\u5220\u9664\u6210\u529F");
          await fetchCategories();
          emit("change");
        } else {
          ElMessage.error("\u5220\u9664\u5931\u8D25: " + res.error);
        }
        loading.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_divider = ElDivider;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "\u5206\u7C7B\u7BA1\u7406",
        width: "500px",
        "append-to-body": "",
        "z-index": 2e3,
        onOpen: fetchCategories
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cat-manager" data-v-c7ce2fa3${_scopeId}><div class="add-cat-row" data-v-c7ce2fa3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: newCatName.value,
              "onUpdate:modelValue": ($event) => newCatName.value = $event,
              placeholder: "\u65B0\u5206\u7C7B\u540D\u79F0",
              style: { "margin-right": "10px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleAdd,
              loading: loading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6DFB\u52A0\u5206\u7C7B`);
                } else {
                  return [
                    createTextVNode("\u6DFB\u52A0\u5206\u7C7B")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "cat-list" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-c7ce2fa3${_scopeId}><!--[-->`);
            ssrRenderList(categories.value, (cat) => {
              _push2(`<div class="cat-item" data-v-c7ce2fa3${_scopeId}><span data-v-c7ce2fa3${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
              _push2(ssrRenderComponent(_component_el_button, {
                link: "",
                type: "danger",
                size: "small",
                onClick: ($event) => handleDelete(cat)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u5220\u9664`);
                  } else {
                    return [
                      createTextVNode("\u5220\u9664")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "cat-manager" }, [
                createVNode("div", { class: "add-cat-row" }, [
                  createVNode(_component_el_input, {
                    modelValue: newCatName.value,
                    "onUpdate:modelValue": ($event) => newCatName.value = $event,
                    placeholder: "\u65B0\u5206\u7C7B\u540D\u79F0",
                    style: { "margin-right": "10px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: handleAdd,
                    loading: loading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u6DFB\u52A0\u5206\u7C7B")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                createVNode(_component_el_divider),
                withDirectives((openBlock(), createBlock("div", { class: "cat-list" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                    return openBlock(), createBlock("div", {
                      key: cat.id,
                      class: "cat-item"
                    }, [
                      createVNode("span", null, toDisplayString(cat.name), 1),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger",
                        size: "small",
                        onClick: ($event) => handleDelete(cat)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5220\u9664")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]);
                  }), 128))
                ])), [
                  [_directive_loading, loading.value]
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/media/CategoryManagerModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CategoryManagerModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c7ce2fa3"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageUploadModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    categories: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const form = reactive({
      categoryId: "",
      name: ""
    });
    const fileList = ref([]);
    const uploading = ref(false);
    const handleFileChange = (file, fileListRef) => {
      fileList.value = fileListRef;
      if (!form.name && file.name) {
        form.name = file.name;
      }
    };
    const submitUpload = async () => {
      var _a;
      if (!form.categoryId) {
        ElMessage.warning("\u8BF7\u9009\u62E9\u5206\u7C7B");
        return;
      }
      if (fileList.value.length === 0) {
        ElMessage.warning("\u8BF7\u9009\u62E9\u56FE\u7247\u6587\u4EF6");
        return;
      }
      if (form.name && form.name.length > 50) {
        ElMessage.warning("\u56FE\u7247\u540D\u79F0\u8FC7\u957F\uFF0C\u8BF7\u7CBE\u7B80");
        return;
      }
      uploading.value = true;
      try {
        const session = useSupabaseSession();
        const token = (_a = session.value) == null ? void 0 : _a.access_token;
        if (!token) {
          ElMessage.error("\u8BF7\u767B\u5F55\u7BA1\u7406\u5458\u8D26\u53F7");
          uploading.value = false;
          return;
        }
        const file = fileList.value[0].raw;
        const { uploadImageToStorage } = await import('./uploadImage-DZo6xiHb.mjs');
        const uploadRes = await uploadImageToStorage(file, "uploads", void 0, token);
        if (!uploadRes.success) {
          ElMessage.error("\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25: " + uploadRes.error);
          uploading.value = false;
          return;
        }
        const res = await adminImageApi.createImage({
          name: form.name || file.name,
          url: uploadRes.url,
          category_id: form.categoryId
        });
        if (res.success) {
          ElMessage.success("\u4E0A\u4F20\u6210\u529F");
          visible.value = false;
          emit("success");
        } else {
          ElMessage.error("\u4FDD\u5B58\u56FE\u7247\u8BB0\u5F55\u5931\u8D25: " + res.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        ElMessage.error("\u4E0A\u4F20\u5931\u8D25: " + (error.message || "\u672A\u77E5\u9519\u8BEF"));
      } finally {
        uploading.value = false;
      }
    };
    const resetForm = () => {
      form.categoryId = "";
      form.name = "";
      fileList.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_upload = ElUpload;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "\u4E0A\u4F20\u56FE\u7247",
        width: "500px",
        onClosed: resetForm,
        "append-to-body": "",
        "z-index": 2e3
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-17d87497${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => visible.value = false
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
              onClick: submitUpload,
              loading: uploading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5F00\u59CB\u4E0A\u4F20`);
                } else {
                  return [
                    createTextVNode("\u5F00\u59CB\u4E0A\u4F20")
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
                  onClick: ($event) => visible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitUpload,
                  loading: uploading.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u5F00\u59CB\u4E0A\u4F20")
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
                    label: "\u6240\u5C5E\u5206\u7C7B",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: form.categoryId,
                          "onUpdate:modelValue": ($event) => form.categoryId = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.categories, (cat) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: cat.id,
                                    label: cat.name,
                                    value: cat.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: form.categoryId,
                            "onUpdate:modelValue": ($event) => form.categoryId = $event,
                            placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.name,
                            "onUpdate:modelValue": ($event) => form.name = $event,
                            placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u9009\u62E9\u56FE\u7247",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_upload, {
                          class: "upload-demo",
                          action: "#",
                          "auto-upload": false,
                          limit: 1,
                          "on-change": handleFileChange,
                          "file-list": fileList.value,
                          "list-type": "picture"
                        }, {
                          tip: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="el-upload__tip" data-v-17d87497${_scopeId4}>\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_button, { type: "primary" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u70B9\u51FB\u9009\u62E9\u6587\u4EF6`);
                                  } else {
                                    return [
                                      createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_button, { type: "primary" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
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
                          createVNode(_component_el_upload, {
                            class: "upload-demo",
                            action: "#",
                            "auto-upload": false,
                            limit: 1,
                            "on-change": handleFileChange,
                            "file-list": fileList.value,
                            "list-type": "picture"
                          }, {
                            tip: withCtx(() => [
                              createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_button, { type: "primary" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["file-list"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u6240\u5C5E\u5206\u7C7B",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: form.categoryId,
                          "onUpdate:modelValue": ($event) => form.categoryId = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: cat.id,
                                label: cat.name,
                                value: cat.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u9009\u62E9\u56FE\u7247",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_upload, {
                          class: "upload-demo",
                          action: "#",
                          "auto-upload": false,
                          limit: 1,
                          "on-change": handleFileChange,
                          "file-list": fileList.value,
                          "list-type": "picture"
                        }, {
                          tip: withCtx(() => [
                            createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_button, { type: "primary" }, {
                              default: withCtx(() => [
                                createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["file-list"])
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
                    label: "\u6240\u5C5E\u5206\u7C7B",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.categoryId,
                        "onUpdate:modelValue": ($event) => form.categoryId = $event,
                        placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: cat.id,
                              label: cat.name,
                              value: cat.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.name,
                        "onUpdate:modelValue": ($event) => form.name = $event,
                        placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u9009\u62E9\u56FE\u7247",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_upload, {
                        class: "upload-demo",
                        action: "#",
                        "auto-upload": false,
                        limit: 1,
                        "on-change": handleFileChange,
                        "file-list": fileList.value,
                        "list-type": "picture"
                      }, {
                        tip: withCtx(() => [
                          createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_button, { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["file-list"])
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
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/media/ImageUploadModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ImageUploadModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-17d87497"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "images",
  __ssrInlineRender: true,
  setup(__props) {
    const session = useSupabaseSession();
    const loading = ref(false);
    const catLoading = ref(false);
    const categories = ref([]);
    const images2 = ref([]);
    const currentCategoryId = ref("");
    const searchKeyword = ref("");
    const selectedIds = ref([]);
    const catDialogVisible = ref(false);
    const uploadDialogVisible = ref(false);
    const editDialogVisible = ref(false);
    const previewVisible = ref(false);
    const previewUrl = ref("");
    const fetchCategories = async () => {
      catLoading.value = true;
      const res = await adminImageCategoryApi.getCategories();
      if (res.success) {
        categories.value = res.categories;
      }
      catLoading.value = false;
    };
    const totalImages = computed(() => images2.value.length);
    const fetchImages = async () => {
      loading.value = true;
      selectedIds.value = [];
      try {
        const res = await adminImageApi.getImages({
          category_id: currentCategoryId.value,
          keyword: searchKeyword.value
        });
        if (res.success) {
          images2.value = res.images || [];
        } else {
          ElMessage.error(res.error || "\u83B7\u53D6\u56FE\u7247\u5931\u8D25");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      fetchImages();
    };
    const editForm = reactive({
      id: "",
      name: "",
      category_id: ""
    });
    const handleEdit = (img) => {
      editForm.id = img.id;
      editForm.name = img.name;
      editForm.category_id = img.category_id || "";
      editDialogVisible.value = true;
    };
    const confirmEdit = async () => {
      const res = await adminImageApi.updateImage(editForm.id, {
        name: editForm.name,
        category_id: editForm.category_id
      });
      if (res.success) {
        ElMessage.success("\u66F4\u65B0\u6210\u529F");
        editDialogVisible.value = false;
        fetchImages();
      } else {
        ElMessage.error(res.error || "\u66F4\u65B0\u5931\u8D25");
      }
    };
    const handleDelete = (img) => {
      var _a;
      const token = (_a = session.value) == null ? void 0 : _a.access_token;
      ElMessageBox.confirm("\u786E\u8BA4\u5220\u9664\u6B64\u56FE\u7247\uFF1F", "\u8B66\u544A", { type: "warning" }).then(async () => {
        const res = await adminImageApi.deleteImage(img.id, token);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
          fetchImages();
        } else {
          ElMessage.error(res.error);
        }
      });
    };
    const handleBatchDelete = () => {
      var _a;
      const token = (_a = session.value) == null ? void 0 : _a.access_token;
      ElMessageBox.confirm(`\u786E\u8BA4\u5220\u9664\u9009\u4E2D\u7684 ${selectedIds.value.length} \u5F20\u56FE\u7247\uFF1F`, "\u6279\u91CF\u5220\u9664", { type: "warning" }).then(async () => {
        const res = await adminImageApi.deleteImages(selectedIds.value, token);
        if (res.success) {
          ElMessage.success("\u6279\u91CF\u5220\u9664\u6210\u529F");
          fetchImages();
        } else {
          ElMessage.error(res.error);
        }
      });
    };
    const syncing = ref(false);
    const syncFromR2 = async () => {
      var _a, _b, _c;
      syncing.value = true;
      try {
        const token = (_a = session.value) == null ? void 0 : _a.access_token;
        if (!token) return ElMessage.error("\u8BF7\u767B\u5F55\u7BA1\u7406\u5458\u8D26\u53F7");
        const { getEdgeFunctionsUrl } = await import('./supabase-jxF0-7J3.mjs');
        const response = await fetch(`${getEdgeFunctionsUrl()}/list-r2`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ prefix: "uploads" })
        });
        const result = await response.json();
        if (result.error) throw new Error(result.error);
        const r2Objects = result.objects || [];
        const existingUrls = new Set(images2.value.map((i) => i.url));
        const missing = r2Objects.filter((obj) => !existingUrls.has(obj.url));
        if (missing.length === 0) {
          ElMessage.success("\u5DF2\u662F\u6700\u65B0");
          return;
        }
        let uncategorizedId = (_b = categories.value.find((c) => c.name === "\u672A\u5206\u7C7B")) == null ? void 0 : _b.id;
        if (!uncategorizedId) {
          const cRes = await adminImageCategoryApi.createCategory("\u672A\u5206\u7C7B");
          if (cRes.success) uncategorizedId = (_c = cRes.category) == null ? void 0 : _c.id;
          await fetchCategories();
        }
        let added = 0;
        for (const m of missing) {
          const name = m.key.split("/").pop();
          const res = await adminImageApi.createImage({ name, url: m.url, category_id: uncategorizedId });
          if (res.success) added++;
        }
        ElMessage.success(`\u540C\u6B65\u5B8C\u6210\uFF0C\u65B0\u589E ${added} \u5F20\u56FE\u7247`);
        fetchImages();
      } catch (e) {
        ElMessage.error("\u540C\u6B65\u5931\u8D25: " + e.message);
      } finally {
        syncing.value = false;
      }
    };
    const handleUploadSuccess = () => {
      fetchImages();
    };
    const previewImage = (url) => {
      previewUrl.value = url;
      previewVisible.value = true;
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_input = ElInput;
      const _component_el_divider = ElDivider;
      const _component_el_empty = ElEmpty;
      const _component_el_image = ElImage;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "media-layout" }, _attrs))} data-v-facd55ae><div class="media-sidebar" data-v-facd55ae><div class="sidebar-header" data-v-facd55ae><h3 class="sidebar-title" data-v-facd55ae>\u56FE\u7247\u5206\u7C7B</h3></div><div class="category-nav" data-v-facd55ae><div class="${ssrRenderClass([{ active: currentCategoryId.value === "" }, "nav-item"])}" data-v-facd55ae>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(picture_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(picture_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="nav-label" data-v-facd55ae>\u5168\u90E8\u56FE\u7247</span>`);
      if (totalImages.value > 0 && currentCategoryId.value === "") {
        _push(`<span class="nav-count" data-v-facd55ae>${ssrInterpolate(totalImages.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="nav-divider" data-v-facd55ae></div><div${ssrRenderAttrs(mergeProps({ class: "nav-list" }, ssrGetDirectiveProps(_ctx, _directive_loading, catLoading.value)))} data-v-facd55ae><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: currentCategoryId.value === cat.id, "is-uncategorized": cat.name === "\u672A\u5206\u7C7B" }, "nav-item"])}" data-v-facd55ae>`);
        if (cat.name === "\u672A\u5206\u7C7B") {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(folder_remove_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(folder_remove_default))
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(folder_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(folder_default))
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`<span class="nav-label" data-v-facd55ae>${ssrInterpolate(cat.name)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="sidebar-footer" data-v-facd55ae>`);
      _push(ssrRenderComponent(_component_el_button, {
        block: "",
        onClick: ($event) => catDialogVisible.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "el-icon--left" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(setting_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(setting_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u7BA1\u7406\u5206\u7C7B `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "el-icon--left" }, {
                default: withCtx(() => [
                  createVNode(unref(setting_default))
                ]),
                _: 1
              }),
              createTextVNode(" \u7BA1\u7406\u5206\u7C7B ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="media-content" data-v-facd55ae><div class="content-toolbar" data-v-facd55ae><div class="toolbar-left" data-v-facd55ae>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: searchKeyword.value,
        "onUpdate:modelValue": ($event) => searchKeyword.value = $event,
        placeholder: "\u641C\u7D22\u56FE\u7247...",
        "prefix-icon": "Search",
        clearable: "",
        style: { "width": "240px" },
        onKeyup: handleSearch,
        onClear: handleSearch
      }, null, _parent));
      _push(`</div><div class="toolbar-right" data-v-facd55ae>`);
      if (selectedIds.value.length > 0) {
        _push(`<div class="batch-actions" data-v-facd55ae><span class="selection-info" data-v-facd55ae>\u5DF2\u9009 ${ssrInterpolate(selectedIds.value.length)} \u9879</span>`);
        _push(ssrRenderComponent(_component_el_button, {
          type: "danger",
          link: "",
          onClick: handleBatchDelete
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u6279\u91CF\u5220\u9664`);
            } else {
              return [
                createTextVNode("\u6279\u91CF\u5220\u9664")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_divider, { direction: "vertical" }, null, _parent));
        _push(ssrRenderComponent(_component_el_button, {
          link: "",
          onClick: ($event) => selectedIds.value = []
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u53D6\u6D88\u9009\u62E9`);
            } else {
              return [
                createTextVNode("\u53D6\u6D88\u9009\u62E9")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedIds.value.length > 0) {
        _push(ssrRenderComponent(_component_el_divider, { direction: "vertical" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_el_button, {
        onClick: syncFromR2,
        loading: syncing.value,
        icon: unref(refresh_default)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`R2 \u540C\u6B65`);
          } else {
            return [
              createTextVNode("R2 \u540C\u6B65")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: ($event) => uploadDialogVisible.value = true,
        icon: unref(upload_default)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u4E0A\u4F20\u56FE\u7247`);
          } else {
            return [
              createTextVNode("\u4E0A\u4F20\u56FE\u7247")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(mergeProps({ class: "content-body" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-facd55ae>`);
      if (images2.value.length === 0) {
        _push(`<div class="empty-state" data-v-facd55ae>`);
        _push(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u56FE\u7247" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="image-grid-container" data-v-facd55ae><!--[-->`);
        ssrRenderList(images2.value, (img) => {
          _push(`<div class="${ssrRenderClass([{ selected: selectedIds.value.includes(img.id) }, "grid-item"])}" data-v-facd55ae><div class="img-preview" data-v-facd55ae>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: img.url,
            fit: "cover",
            loading: "lazy",
            class: "real-image"
          }, null, _parent));
          _push(`<div class="img-overlay" data-v-facd55ae><div class="overlay-actions" data-v-facd55ae>`);
          _push(ssrRenderComponent(_component_el_button, {
            circle: "",
            size: "small",
            icon: unref(view_default),
            onClick: ($event) => previewImage(img.url)
          }, null, _parent));
          _push(ssrRenderComponent(_component_el_button, {
            circle: "",
            size: "small",
            type: "primary",
            icon: unref(edit_default),
            onClick: ($event) => handleEdit(img)
          }, null, _parent));
          _push(ssrRenderComponent(_component_el_button, {
            circle: "",
            size: "small",
            type: "danger",
            icon: unref(delete_default),
            onClick: ($event) => handleDelete(img)
          }, null, _parent));
          _push(`</div></div>`);
          if (selectedIds.value.includes(img.id)) {
            _push(`<div class="selection-mark" data-v-facd55ae>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(check_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(check_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="img-meta" data-v-facd55ae><div class="img-name"${ssrRenderAttr("title", img.name)} data-v-facd55ae>${ssrInterpolate(img.name)}</div><div class="img-info" data-v-facd55ae>`);
          if (img.category) {
            _push(`<span class="cat-badge" data-v-facd55ae>${ssrInterpolate(img.category.name)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="date" data-v-facd55ae>${ssrInterpolate(formatDate(img.created_at))}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (images2.value.length > 0) {
        _push(`<div class="content-footer" data-v-facd55ae>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          background: "",
          layout: "total, prev, pager, next",
          total: images2.value.length,
          "page-size": 50,
          "hide-on-single-page": ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(CategoryManagerModal, {
        modelValue: catDialogVisible.value,
        "onUpdate:modelValue": ($event) => catDialogVisible.value = $event,
        onChange: fetchCategories
      }, null, _parent));
      _push(ssrRenderComponent(ImageUploadModal, {
        modelValue: uploadDialogVisible.value,
        "onUpdate:modelValue": ($event) => uploadDialogVisible.value = $event,
        categories: categories.value,
        onSuccess: handleUploadSuccess
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: editDialogVisible.value,
        "onUpdate:modelValue": ($event) => editDialogVisible.value = $event,
        title: "\u7F16\u8F91\u56FE\u7247\u4FE1\u606F",
        width: "400px",
        "append-to-body": "",
        "z-index": 2e3
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-facd55ae${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => editDialogVisible.value = false
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
              onClick: confirmEdit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u4FDD\u5B58`);
                } else {
                  return [
                    createTextVNode("\u4FDD\u5B58")
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
                  onClick: ($event) => editDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: confirmEdit
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u4FDD\u5B58")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: editForm,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u540D\u79F0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: editForm.name,
                          "onUpdate:modelValue": ($event) => editForm.name = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: editForm.name,
                            "onUpdate:modelValue": ($event) => editForm.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: editForm.category_id,
                          "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(categories.value, (cat) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: cat.id,
                                    label: cat.name,
                                    value: cat.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: editForm.category_id,
                            "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
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
                    createVNode(_component_el_form_item, { label: "\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: editForm.name,
                          "onUpdate:modelValue": ($event) => editForm.name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: editForm.category_id,
                          "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: cat.id,
                                label: cat.name,
                                value: cat.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
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
                model: editForm,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: editForm.name,
                        "onUpdate:modelValue": ($event) => editForm.name = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: editForm.category_id,
                        "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: cat.id,
                              label: cat.name,
                              value: cat.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: previewVisible.value,
        "onUpdate:modelValue": ($event) => previewVisible.value = $event,
        width: "800px",
        "custom-class": "preview-dialog",
        "append-to-body": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", previewUrl.value)} style="${ssrRenderStyle({ "max-width": "100%", "max-height": "600px", "display": "block", "margin": "0 auto" })}" data-v-facd55ae${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: previewUrl.value,
                style: { "max-width": "100%", "max-height": "600px", "display": "block", "margin": "0 auto" }
              }, null, 8, ["src"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media/images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const images = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-facd55ae"]]);

export { images as default };
//# sourceMappingURL=images-Bsr0eW1A.mjs.map
