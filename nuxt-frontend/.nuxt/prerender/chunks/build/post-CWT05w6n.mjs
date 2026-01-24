import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElRow, a as ElCol } from './index-27bUWc4s.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElSwitch } from './index-_GccYHgs.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { _ as _export_sfc, E as ElIcon, R as picture_filled_default, bx as arrow_up_default, aZ as arrow_down_default, bb as delete_default, ba as picture_default, $ as document_default, ah as ElMessage } from './server.mjs';
import { E as ElSlider } from './index-Cz9caq8f.mjs';
import { E as ElCheckbox } from './index-BlpH41lu.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, createTextVNode, toDisplayString, isRef, ref, computed, reactive, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { A as AdminImageSelector } from './AdminImageSelector-Qku4uUI9.mjs';
import { S as StickyFormHeader } from './StickyFormHeader-BS1LLrOp.mjs';
import { T as TagInputGroup } from './TagInputGroup-CxiLjtEh.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { a as adminProductApi } from './product-B3IUpyB3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './use-form-common-props-DlCG9pC5.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-D_b573Qt.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-DOE061f1.mjs';
import './validator-T0bsmJHo.mjs';
import './index-B-o0CD59.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import './index-7IYgoTSU.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-DhXCDWyG.mjs';
import './index-DKY_z0U1.mjs';
import './media-C2x210Ez.mjs';
import './AdminDataDialog-9iEmWGfo.mjs';
import './index-CzosOSMt.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './directive-tOiqatq5.mjs';

function useAdminProductForm() {
  const router = useRouter();
  const route = useRoute();
  const formRef = ref();
  const isEdit = computed(() => !!route.query.id);
  const submitting = ref(false);
  const categories = ref([]);
  const imagePickerVisible = ref(false);
  const pickerTarget = ref("image");
  const form = reactive({
    id: "",
    name: "",
    categoryId: void 0,
    image: "",
    sortOrder: 0,
    displayPrice: 0,
    tags: [],
    initialSales: 0,
    badgeLabel: void 0,
    // Fixed type
    rating: 100,
    allowAddon: false,
    addonUnit: "",
    status: true,
    detailModules: [],
    copySkus: []
    // For copy mode
  });
  const rules = {
    name: [{ required: true, message: "\u8BF7\u8F93\u5165\u5546\u54C1\u540D\u79F0", trigger: "blur" }],
    categoryId: [{ required: true, message: "\u8BF7\u9009\u62E9\u5206\u7C7B", trigger: "change" }],
    image: [{ required: true, message: "\u8BF7\u4E0A\u4F20\u5546\u54C1\u5934\u56FE", trigger: "change" }]
  };
  const submitProduct = async () => {
    if (!formRef.value) return;
    await formRef.value.validate(async (valid) => {
      if (!valid) return;
      submitting.value = true;
      try {
        const data = {
          product_name: form.name,
          category_id: form.categoryId,
          image: form.image,
          sort_order: form.sortOrder,
          display_price: form.displayPrice,
          tags: form.tags,
          initial_sales: form.initialSales,
          badge_label: form.badgeLabel || null,
          rating: form.rating,
          allow_addon: form.allowAddon,
          detail_modules: form.detailModules,
          status: form.status ? "on" : "off"
        };
        const res = form.id ? await adminProductApi.updateProduct(form.id, data) : await adminProductApi.createProduct(data);
        if (res.success) {
          if (!form.id && form.copySkus.length > 0 && res.product) {
            const skuRes = await adminProductApi.createProductSkus(res.product.id, form.copySkus);
            if (!skuRes.success) ElMessage.warning("\u5546\u54C1\u5DF2\u521B\u5EFA\u4F46SKU\u590D\u5236\u5931\u8D25: " + skuRes.error);
          }
          ElMessage.success("\u4FDD\u5B58\u6210\u529F");
          goBack();
        } else {
          ElMessage.error(res.error || "\u4FDD\u5B58\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u4FDD\u5B58\u5F02\u5E38");
      } finally {
        submitting.value = false;
      }
    });
  };
  const goBack = () => router.push("/_mgmt_9Xfa3/products");
  const addDetailText = () => form.detailModules.push({ type: "text", content: "" });
  const addDetailImage = () => form.detailModules.push({ type: "image", content: "" });
  const removeDetailModule = (i) => form.detailModules.splice(i, 1);
  const moveDetailModule = (i, dir) => {
    const t = form.detailModules[i];
    form.detailModules[i] = form.detailModules[i + dir];
    form.detailModules[i + dir] = t;
  };
  const openImagePicker = (target) => {
    pickerTarget.value = target;
    imagePickerVisible.value = true;
  };
  const handleImageSelected = (urls) => {
    if (urls.length === 0) return;
    const url = urls[0];
    if (pickerTarget.value === "image") {
      form.image = url;
    } else if (typeof pickerTarget.value === "number") {
      form.detailModules[pickerTarget.value].content = url;
    }
  };
  return {
    formRef,
    form,
    rules,
    loading: submitting,
    // Alias for header
    isEdit,
    categories,
    imagePickerVisible,
    submitProduct,
    goBack,
    // Modules
    addDetailText,
    addDetailImage,
    removeDetailModule,
    moveDetailModule,
    // Images
    openImagePicker,
    handleImageSelected
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      formRef,
      form,
      rules,
      loading,
      isEdit,
      categories,
      imagePickerVisible,
      submitProduct,
      goBack,
      addDetailText,
      addDetailImage,
      removeDetailModule,
      moveDetailModule,
      openImagePicker,
      handleImageSelected
    } = useAdminProductForm();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_card = ElCard;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_el_slider = ElSlider;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-post-page" }, _attrs))} data-v-4f08649c>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: unref(isEdit) ? "\u7F16\u8F91\u5546\u54C1" : "\u521B\u5EFA\u5546\u54C1",
        subtitle: unref(isEdit) ? "Edit Product" : "New Product",
        loading: unref(loading),
        "submit-text": "\u4FDD\u5B58\u5546\u54C1",
        onBack: unref(goBack),
        onCancel: unref(goBack),
        onSubmit: unref(submitProduct)
      }, null, _parent));
      _push(`<div class="main-body" data-v-4f08649c><div class="content-wrapper" data-v-4f08649c>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: unref(form),
        rules: unref(rules),
        ref_key: "formRef",
        ref: formRef,
        "label-width": "120px",
        class: "main-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_card, {
              shadow: "never",
              class: "form-card"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-4f08649c${_scopeId2}>\u57FA\u672C\u4FE1\u606F</div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, "\u57FA\u672C\u4FE1\u606F")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 40 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 16 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "\u5546\u54C1\u540D\u79F0",
                                prop: "name"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u4E3B\u6807\u9898",
                                      size: "large"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u4E3B\u6807\u9898",
                                        size: "large"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_form_item, {
                                            label: "\u5546\u54C1\u5206\u7C7B",
                                            prop: "categoryId"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_el_select, {
                                                  modelValue: unref(form).categoryId,
                                                  "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                  placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                                  style: { "width": "100%" }
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`<!--[-->`);
                                                      ssrRenderList(unref(categories), (c) => {
                                                        _push9(ssrRenderComponent(_component_el_option, {
                                                          key: c.id,
                                                          label: c.name,
                                                          value: c.id
                                                        }, null, _parent9, _scopeId8));
                                                      });
                                                      _push9(`<!--]-->`);
                                                    } else {
                                                      return [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
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
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_el_select, {
                                                    modelValue: unref(form).categoryId,
                                                    "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                                    style: { "width": "100%" }
                                                  }, {
                                                    default: withCtx(() => [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                                        return openBlock(), createBlock(_component_el_option, {
                                                          key: c.id,
                                                          label: c.name,
                                                          value: c.id
                                                        }, null, 8, ["label", "value"]);
                                                      }), 128))
                                                    ]),
                                                    _: 1
                                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_form_item, {
                                              label: "\u5546\u54C1\u5206\u7C7B",
                                              prop: "categoryId"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_el_select, {
                                                  modelValue: unref(form).categoryId,
                                                  "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                  placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                                  style: { "width": "100%" }
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                                      return openBlock(), createBlock(_component_el_option, {
                                                        key: c.id,
                                                        label: c.name,
                                                        value: c.id
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_el_input_number, {
                                                  modelValue: unref(form).sortOrder,
                                                  "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                  min: 0,
                                                  style: { "width": "100%" },
                                                  placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_el_input_number, {
                                                    modelValue: unref(form).sortOrder,
                                                    "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                    min: 0,
                                                    style: { "width": "100%" },
                                                    placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_el_input_number, {
                                                  modelValue: unref(form).sortOrder,
                                                  "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                  min: 0,
                                                  style: { "width": "100%" },
                                                  placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_col, { span: 12 }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_form_item, {
                                            label: "\u5546\u54C1\u5206\u7C7B",
                                            prop: "categoryId"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_select, {
                                                modelValue: unref(form).categoryId,
                                                "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                                style: { "width": "100%" }
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                                    return openBlock(), createBlock(_component_el_option, {
                                                      key: c.id,
                                                      label: c.name,
                                                      value: c.id
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
                                      }),
                                      createVNode(_component_el_col, { span: 12 }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_input_number, {
                                                modelValue: unref(form).sortOrder,
                                                "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                min: 0,
                                                style: { "width": "100%" },
                                                placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u5546\u54C1\u6807\u7B7E" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(TagInputGroup, {
                                      modelValue: unref(form).tags,
                                      "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                      "add-button-text": "+ \u65B0\u6807\u7B7E"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(TagInputGroup, {
                                        modelValue: unref(form).tags,
                                        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                        "add-button-text": "+ \u65B0\u6807\u7B7E"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u4E0A\u67B6\u72B6\u6001" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_switch, {
                                      modelValue: unref(form).status,
                                      "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                      "active-text": "\u7ACB\u5373\u4E0A\u67B6",
                                      "inactive-text": "\u6682\u4E0D\u4E0A\u67B6"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_switch, {
                                        modelValue: unref(form).status,
                                        "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                        "active-text": "\u7ACB\u5373\u4E0A\u67B6",
                                        "inactive-text": "\u6682\u4E0D\u4E0A\u67B6"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "\u5546\u54C1\u540D\u79F0",
                                  prop: "name"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u4E3B\u6807\u9898",
                                      size: "large"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_row, { gutter: 20 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_col, { span: 12 }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_form_item, {
                                          label: "\u5546\u54C1\u5206\u7C7B",
                                          prop: "categoryId"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_select, {
                                              modelValue: unref(form).categoryId,
                                              "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                              placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                              style: { "width": "100%" }
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                                  return openBlock(), createBlock(_component_el_option, {
                                                    key: c.id,
                                                    label: c.name,
                                                    value: c.id
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
                                    }),
                                    createVNode(_component_el_col, { span: 12 }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_input_number, {
                                              modelValue: unref(form).sortOrder,
                                              "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                              min: 0,
                                              style: { "width": "100%" },
                                              placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6807\u7B7E" }, {
                                  default: withCtx(() => [
                                    createVNode(TagInputGroup, {
                                      modelValue: unref(form).tags,
                                      "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                      "add-button-text": "+ \u65B0\u6807\u7B7E"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "\u4E0A\u67B6\u72B6\u6001" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: unref(form).status,
                                      "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                      "active-text": "\u7ACB\u5373\u4E0A\u67B6",
                                      "inactive-text": "\u6682\u4E0D\u4E0A\u67B6"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "\u5546\u54C1\u56FE\u7247",
                                prop: "image",
                                class: "img-upload-item"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="image-gallery-trigger" data-v-4f08649c${_scopeId5}>`);
                                    if (unref(form).image) {
                                      _push6(ssrRenderComponent(_component_el_image, {
                                        src: unref(form).image,
                                        class: "trigger-img",
                                        fit: "cover"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<div class="trigger-content" data-v-4f08649c${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_el_icon, { class: "trigger-icon" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(picture_filled_default), null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(picture_filled_default))
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`<span data-v-4f08649c${_scopeId5}>\u5C01\u9762\u56FE</span></div>`);
                                    }
                                    if (unref(form).image) {
                                      _push6(`<div class="trigger-overlay" data-v-4f08649c${_scopeId5}>\u66F4\u6362\u56FE\u7247</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div><div class="form-tip" data-v-4f08649c${_scopeId5}>\u5EFA\u8BAE\u5C3A\u5BF8 800x800</div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: "image-gallery-trigger",
                                        onClick: ($event) => unref(openImagePicker)("image")
                                      }, [
                                        unref(form).image ? (openBlock(), createBlock(_component_el_image, {
                                          key: 0,
                                          src: unref(form).image,
                                          class: "trigger-img",
                                          fit: "cover"
                                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "trigger-content"
                                        }, [
                                          createVNode(_component_el_icon, { class: "trigger-icon" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(picture_filled_default))
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", null, "\u5C01\u9762\u56FE")
                                        ])),
                                        unref(form).image ? (openBlock(), createBlock("div", {
                                          key: 2,
                                          class: "trigger-overlay"
                                        }, "\u66F4\u6362\u56FE\u7247")) : createCommentVNode("", true)
                                      ], 8, ["onClick"]),
                                      createVNode("div", { class: "form-tip" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x800")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "\u5546\u54C1\u56FE\u7247",
                                  prop: "image",
                                  class: "img-upload-item"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "image-gallery-trigger",
                                      onClick: ($event) => unref(openImagePicker)("image")
                                    }, [
                                      unref(form).image ? (openBlock(), createBlock(_component_el_image, {
                                        key: 0,
                                        src: unref(form).image,
                                        class: "trigger-img",
                                        fit: "cover"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "trigger-content"
                                      }, [
                                        createVNode(_component_el_icon, { class: "trigger-icon" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(picture_filled_default))
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", null, "\u5C01\u9762\u56FE")
                                      ])),
                                      unref(form).image ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: "trigger-overlay"
                                      }, "\u66F4\u6362\u56FE\u7247")) : createCommentVNode("", true)
                                    ], 8, ["onClick"]),
                                    createVNode("div", { class: "form-tip" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x800")
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
                          createVNode(_component_el_col, { span: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "\u5546\u54C1\u540D\u79F0",
                                prop: "name"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u4E3B\u6807\u9898",
                                    size: "large"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_row, { gutter: 20 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_col, { span: 12 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_form_item, {
                                        label: "\u5546\u54C1\u5206\u7C7B",
                                        prop: "categoryId"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_select, {
                                            modelValue: unref(form).categoryId,
                                            "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                            placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                            style: { "width": "100%" }
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                                return openBlock(), createBlock(_component_el_option, {
                                                  key: c.id,
                                                  label: c.name,
                                                  value: c.id
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
                                  }),
                                  createVNode(_component_el_col, { span: 12 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_input_number, {
                                            modelValue: unref(form).sortOrder,
                                            "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                            min: 0,
                                            style: { "width": "100%" },
                                            placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6807\u7B7E" }, {
                                default: withCtx(() => [
                                  createVNode(TagInputGroup, {
                                    modelValue: unref(form).tags,
                                    "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                    "add-button-text": "+ \u65B0\u6807\u7B7E"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "\u4E0A\u67B6\u72B6\u6001" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: unref(form).status,
                                    "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                    "active-text": "\u7ACB\u5373\u4E0A\u67B6",
                                    "inactive-text": "\u6682\u4E0D\u4E0A\u67B6"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "\u5546\u54C1\u56FE\u7247",
                                prop: "image",
                                class: "img-upload-item"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "image-gallery-trigger",
                                    onClick: ($event) => unref(openImagePicker)("image")
                                  }, [
                                    unref(form).image ? (openBlock(), createBlock(_component_el_image, {
                                      key: 0,
                                      src: unref(form).image,
                                      class: "trigger-img",
                                      fit: "cover"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "trigger-content"
                                    }, [
                                      createVNode(_component_el_icon, { class: "trigger-icon" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(picture_filled_default))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "\u5C01\u9762\u56FE")
                                    ])),
                                    unref(form).image ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "trigger-overlay"
                                    }, "\u66F4\u6362\u56FE\u7247")) : createCommentVNode("", true)
                                  ], 8, ["onClick"]),
                                  createVNode("div", { class: "form-tip" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x800")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_row, { gutter: 40 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 16 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "\u5546\u54C1\u540D\u79F0",
                              prop: "name"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u4E3B\u6807\u9898",
                                  size: "large"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_row, { gutter: 20 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, {
                                      label: "\u5546\u54C1\u5206\u7C7B",
                                      prop: "categoryId"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_select, {
                                          modelValue: unref(form).categoryId,
                                          "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                          placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                          style: { "width": "100%" }
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                              return openBlock(), createBlock(_component_el_option, {
                                                key: c.id,
                                                label: c.name,
                                                value: c.id
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
                                }),
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_input_number, {
                                          modelValue: unref(form).sortOrder,
                                          "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                          min: 0,
                                          style: { "width": "100%" },
                                          placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6807\u7B7E" }, {
                              default: withCtx(() => [
                                createVNode(TagInputGroup, {
                                  modelValue: unref(form).tags,
                                  "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                  "add-button-text": "+ \u65B0\u6807\u7B7E"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "\u4E0A\u67B6\u72B6\u6001" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_switch, {
                                  modelValue: unref(form).status,
                                  "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                  "active-text": "\u7ACB\u5373\u4E0A\u67B6",
                                  "inactive-text": "\u6682\u4E0D\u4E0A\u67B6"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "\u5546\u54C1\u56FE\u7247",
                              prop: "image",
                              class: "img-upload-item"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "image-gallery-trigger",
                                  onClick: ($event) => unref(openImagePicker)("image")
                                }, [
                                  unref(form).image ? (openBlock(), createBlock(_component_el_image, {
                                    key: 0,
                                    src: unref(form).image,
                                    class: "trigger-img",
                                    fit: "cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "trigger-content"
                                  }, [
                                    createVNode(_component_el_icon, { class: "trigger-icon" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(picture_filled_default))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "\u5C01\u9762\u56FE")
                                  ])),
                                  unref(form).image ? (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "trigger-overlay"
                                  }, "\u66F4\u6362\u56FE\u7247")) : createCommentVNode("", true)
                                ], 8, ["onClick"]),
                                createVNode("div", { class: "form-tip" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x800")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, {
              shadow: "never",
              class: "form-card"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-4f08649c${_scopeId2}>\u8425\u9500\u4E0E\u5C55\u793A</div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, "\u8425\u9500\u4E0E\u5C55\u793A")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 40 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u5C55\u793A\u4EF7\u683C" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: unref(form).displayPrice,
                                      "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                      min: 0,
                                      precision: 2,
                                      style: { "width": "100%" }
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="form-tip" data-v-4f08649c${_scopeId5}>\u5217\u8868\u9875\u8D77\u6B65\u4EF7</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: unref(form).displayPrice,
                                        "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                        min: 0,
                                        precision: 2,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-tip" }, "\u5217\u8868\u9875\u8D77\u6B65\u4EF7")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u5C55\u793A\u4EF7\u683C" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: unref(form).displayPrice,
                                      "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                      min: 0,
                                      precision: 2,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-tip" }, "\u5217\u8868\u9875\u8D77\u6B65\u4EF7")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u521D\u59CB\u9500\u91CF" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: unref(form).initialSales,
                                      "onUpdate:modelValue": ($event) => unref(form).initialSales = $event,
                                      min: 0,
                                      style: { "width": "100%" }
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: unref(form).initialSales,
                                        "onUpdate:modelValue": ($event) => unref(form).initialSales = $event,
                                        min: 0,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u521D\u59CB\u9500\u91CF" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: unref(form).initialSales,
                                      "onUpdate:modelValue": ($event) => unref(form).initialSales = $event,
                                      min: 0,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u597D\u8BC4\u5EA6(%)" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_slider, {
                                      modelValue: unref(form).rating,
                                      "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                                      min: 80,
                                      max: 100,
                                      "show-input": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_slider, {
                                        modelValue: unref(form).rating,
                                        "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                                        min: 80,
                                        max: 100,
                                        "show-input": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u597D\u8BC4\u5EA6(%)" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_slider, {
                                      modelValue: unref(form).rating,
                                      "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                                      min: 80,
                                      max: 100,
                                      "show-input": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u5C55\u793A\u4EF7\u683C" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: unref(form).displayPrice,
                                    "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                    min: 0,
                                    precision: 2,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-tip" }, "\u5217\u8868\u9875\u8D77\u6B65\u4EF7")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u521D\u59CB\u9500\u91CF" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: unref(form).initialSales,
                                    "onUpdate:modelValue": ($event) => unref(form).initialSales = $event,
                                    min: 0,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u597D\u8BC4\u5EA6(%)" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_slider, {
                                    modelValue: unref(form).rating,
                                    "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                                    min: 80,
                                    max: 100,
                                    "show-input": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 40 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u89D2\u6807\u6807\u7B7E" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_select, {
                                      modelValue: unref(form).badgeLabel,
                                      "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                      placeholder: "\u8BF7\u9009\u62E9",
                                      clearable: "",
                                      style: { "width": "100%" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "\u70ED\u5356",
                                            value: "\u70ED\u5356"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "\u65B0\u54C1",
                                            value: "\u65B0\u54C1"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "\u63A8\u8350",
                                            value: "\u63A8\u8350"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "\u9650\u91CF",
                                            value: "\u9650\u91CF"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "\u4F18\u60E0",
                                            value: "\u4F18\u60E0"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_option, {
                                              label: "\u70ED\u5356",
                                              value: "\u70ED\u5356"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "\u65B0\u54C1",
                                              value: "\u65B0\u54C1"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "\u63A8\u8350",
                                              value: "\u63A8\u8350"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "\u9650\u91CF",
                                              value: "\u9650\u91CF"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "\u4F18\u60E0",
                                              value: "\u4F18\u60E0"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_select, {
                                        modelValue: unref(form).badgeLabel,
                                        "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                        placeholder: "\u8BF7\u9009\u62E9",
                                        clearable: "",
                                        style: { "width": "100%" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_option, {
                                            label: "\u70ED\u5356",
                                            value: "\u70ED\u5356"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "\u65B0\u54C1",
                                            value: "\u65B0\u54C1"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "\u63A8\u8350",
                                            value: "\u63A8\u8350"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "\u9650\u91CF",
                                            value: "\u9650\u91CF"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "\u4F18\u60E0",
                                            value: "\u4F18\u60E0"
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u89D2\u6807\u6807\u7B7E" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: unref(form).badgeLabel,
                                      "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                      placeholder: "\u8BF7\u9009\u62E9",
                                      clearable: "",
                                      style: { "width": "100%" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_option, {
                                          label: "\u70ED\u5356",
                                          value: "\u70ED\u5356"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "\u65B0\u54C1",
                                          value: "\u65B0\u54C1"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "\u63A8\u8350",
                                          value: "\u63A8\u8350"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "\u9650\u91CF",
                                          value: "\u9650\u91CF"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "\u4F18\u60E0",
                                          value: "\u4F18\u60E0"
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_col, { span: 16 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u52A0\u8D2D\u914D\u7F6E" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_checkbox, {
                                      modelValue: unref(form).allowAddon,
                                      "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF`);
                                        } else {
                                          return [
                                            createTextVNode("\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_checkbox, {
                                        modelValue: unref(form).allowAddon,
                                        "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF")
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u52A0\u8D2D\u914D\u7F6E" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_checkbox, {
                                      modelValue: unref(form).allowAddon,
                                      "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u89D2\u6807\u6807\u7B7E" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: unref(form).badgeLabel,
                                    "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                    placeholder: "\u8BF7\u9009\u62E9",
                                    clearable: "",
                                    style: { "width": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_option, {
                                        label: "\u70ED\u5356",
                                        value: "\u70ED\u5356"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "\u65B0\u54C1",
                                        value: "\u65B0\u54C1"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "\u63A8\u8350",
                                        value: "\u63A8\u8350"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "\u9650\u91CF",
                                        value: "\u9650\u91CF"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "\u4F18\u60E0",
                                        value: "\u4F18\u60E0"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u52A0\u8D2D\u914D\u7F6E" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, {
                                    modelValue: unref(form).allowAddon,
                                    "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_row, { gutter: 40 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u5C55\u793A\u4EF7\u683C" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: unref(form).displayPrice,
                                  "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                  min: 0,
                                  precision: 2,
                                  style: { "width": "100%" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-tip" }, "\u5217\u8868\u9875\u8D77\u6B65\u4EF7")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u521D\u59CB\u9500\u91CF" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: unref(form).initialSales,
                                  "onUpdate:modelValue": ($event) => unref(form).initialSales = $event,
                                  min: 0,
                                  style: { "width": "100%" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u597D\u8BC4\u5EA6(%)" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_slider, {
                                  modelValue: unref(form).rating,
                                  "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                                  min: 80,
                                  max: 100,
                                  "show-input": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_row, { gutter: 40 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u89D2\u6807\u6807\u7B7E" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: unref(form).badgeLabel,
                                  "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                  placeholder: "\u8BF7\u9009\u62E9",
                                  clearable: "",
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_option, {
                                      label: "\u70ED\u5356",
                                      value: "\u70ED\u5356"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "\u65B0\u54C1",
                                      value: "\u65B0\u54C1"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "\u63A8\u8350",
                                      value: "\u63A8\u8350"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "\u9650\u91CF",
                                      value: "\u9650\u91CF"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "\u4F18\u60E0",
                                      value: "\u4F18\u60E0"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 16 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u52A0\u8D2D\u914D\u7F6E" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_checkbox, {
                                  modelValue: unref(form).allowAddon,
                                  "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, {
              shadow: "never",
              class: "form-card"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-4f08649c${_scopeId2}><span data-v-4f08649c${_scopeId2}>\u5546\u54C1\u8BE6\u60C5</span><div class="header-actions" data-v-4f08649c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    size: "small",
                    onClick: unref(addDetailText)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(document_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(document_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` \u6DFB\u52A0\u6587\u672C`);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(document_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u6DFB\u52A0\u6587\u672C")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    size: "small",
                    onClick: unref(addDetailImage)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(picture_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(picture_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` \u6DFB\u52A0\u56FE\u7247`);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(picture_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u6DFB\u52A0\u56FE\u7247")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "\u5546\u54C1\u8BE6\u60C5"),
                      createVNode("div", { class: "header-actions" }, [
                        createVNode(_component_el_button, {
                          size: "small",
                          onClick: unref(addDetailText)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(document_default))
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u6DFB\u52A0\u6587\u672C")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_el_button, {
                          size: "small",
                          onClick: unref(addDetailImage)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(picture_default))
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u6DFB\u52A0\u56FE\u7247")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="detail-module-list" data-v-4f08649c${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(form).detailModules, (mod, idx) => {
                    _push3(`<div class="detail-module-item" data-v-4f08649c${_scopeId2}><div class="module-actions" data-v-4f08649c${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      effect: "plain"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(mod.type === "image" ? "\u56FE\u7247\u6A21\u5757" : "\u6587\u672C\u6A21\u5757")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(mod.type === "image" ? "\u56FE\u7247\u6A21\u5757" : "\u6587\u672C\u6A21\u5757"), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="action-btns" data-v-4f08649c${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      disabled: idx === 0,
                      onClick: ($event) => unref(moveDetailModule)(idx, -1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(arrow_up_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(arrow_up_default))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(arrow_up_default))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      disabled: idx === unref(form).detailModules.length - 1,
                      onClick: ($event) => unref(moveDetailModule)(idx, 1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(arrow_down_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(arrow_down_default))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(arrow_down_default))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => unref(removeDetailModule)(idx)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(delete_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(delete_default))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(delete_default))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><div class="module-display" data-v-4f08649c${_scopeId2}>`);
                    if (mod.type === "image") {
                      _push3(`<div class="module-image-trigger" data-v-4f08649c${_scopeId2}>`);
                      if (mod.content) {
                        _push3(ssrRenderComponent(_component_el_image, {
                          src: mod.content,
                          class: "module-img-preview",
                          fit: "contain"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<div class="image-placeholder" data-v-4f08649c${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(picture_default), null, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(picture_default))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`<span data-v-4f08649c${_scopeId2}>\u70B9\u51FB\u9009\u62E9\u56FE\u7247</span></div>`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: mod.content,
                        "onUpdate:modelValue": ($event) => mod.content = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: "\u8BF7\u8F93\u5165\u6BB5\u843D\u6587\u672C"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]-->`);
                  if (unref(form).detailModules.length === 0) {
                    _push3(`<div class="empty-detail-tip" data-v-4f08649c${_scopeId2}> \u6682\u65E0\u8BE6\u60C5\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0 </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "detail-module-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).detailModules, (mod, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          class: "detail-module-item"
                        }, [
                          createVNode("div", { class: "module-actions" }, [
                            createVNode(_component_el_tag, {
                              size: "small",
                              effect: "plain"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(mod.type === "image" ? "\u56FE\u7247\u6A21\u5757" : "\u6587\u672C\u6A21\u5757"), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode("div", { class: "action-btns" }, [
                              createVNode(_component_el_button, {
                                link: "",
                                disabled: idx === 0,
                                onClick: ($event) => unref(moveDetailModule)(idx, -1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(arrow_up_default))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(_component_el_button, {
                                link: "",
                                disabled: idx === unref(form).detailModules.length - 1,
                                onClick: ($event) => unref(moveDetailModule)(idx, 1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(arrow_down_default))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(_component_el_button, {
                                link: "",
                                type: "danger",
                                onClick: ($event) => unref(removeDetailModule)(idx)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(delete_default))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "module-display" }, [
                            mod.type === "image" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "module-image-trigger",
                              onClick: ($event) => unref(openImagePicker)(idx)
                            }, [
                              mod.content ? (openBlock(), createBlock(_component_el_image, {
                                key: 0,
                                src: mod.content,
                                class: "module-img-preview",
                                fit: "contain"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "image-placeholder"
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(picture_default))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "\u70B9\u51FB\u9009\u62E9\u56FE\u7247")
                              ]))
                            ], 8, ["onClick"])) : (openBlock(), createBlock(_component_el_input, {
                              key: 1,
                              modelValue: mod.content,
                              "onUpdate:modelValue": ($event) => mod.content = $event,
                              type: "textarea",
                              rows: 3,
                              placeholder: "\u8BF7\u8F93\u5165\u6BB5\u843D\u6587\u672C"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ])
                        ]);
                      }), 128)),
                      unref(form).detailModules.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "empty-detail-tip"
                      }, " \u6682\u65E0\u8BE6\u60C5\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0 ")) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "form-card"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "card-header" }, "\u57FA\u672C\u4FE1\u606F")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_row, { gutter: 40 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "\u5546\u54C1\u540D\u79F0",
                            prop: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "\u8BF7\u8F93\u5165\u5546\u54C1\u4E3B\u6807\u9898",
                                size: "large"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_row, { gutter: 20 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, {
                                    label: "\u5546\u54C1\u5206\u7C7B",
                                    prop: "categoryId"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_select, {
                                        modelValue: unref(form).categoryId,
                                        "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                        placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                        style: { "width": "100%" }
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (c) => {
                                            return openBlock(), createBlock(_component_el_option, {
                                              key: c.id,
                                              label: c.name,
                                              value: c.id
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
                              }),
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6392\u5E8F" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input_number, {
                                        modelValue: unref(form).sortOrder,
                                        "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                        min: 0,
                                        style: { "width": "100%" },
                                        placeholder: "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "\u5546\u54C1\u6807\u7B7E" }, {
                            default: withCtx(() => [
                              createVNode(TagInputGroup, {
                                modelValue: unref(form).tags,
                                "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                "add-button-text": "+ \u65B0\u6807\u7B7E"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "\u4E0A\u67B6\u72B6\u6001" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: unref(form).status,
                                "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                "active-text": "\u7ACB\u5373\u4E0A\u67B6",
                                "inactive-text": "\u6682\u4E0D\u4E0A\u67B6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "\u5546\u54C1\u56FE\u7247",
                            prop: "image",
                            class: "img-upload-item"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: "image-gallery-trigger",
                                onClick: ($event) => unref(openImagePicker)("image")
                              }, [
                                unref(form).image ? (openBlock(), createBlock(_component_el_image, {
                                  key: 0,
                                  src: unref(form).image,
                                  class: "trigger-img",
                                  fit: "cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "trigger-content"
                                }, [
                                  createVNode(_component_el_icon, { class: "trigger-icon" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(picture_filled_default))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "\u5C01\u9762\u56FE")
                                ])),
                                unref(form).image ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "trigger-overlay"
                                }, "\u66F4\u6362\u56FE\u7247")) : createCommentVNode("", true)
                              ], 8, ["onClick"]),
                              createVNode("div", { class: "form-tip" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x800")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_card, {
                shadow: "never",
                class: "form-card"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "card-header" }, "\u8425\u9500\u4E0E\u5C55\u793A")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_row, { gutter: 40 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u5C55\u793A\u4EF7\u683C" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: unref(form).displayPrice,
                                "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                min: 0,
                                precision: 2,
                                style: { "width": "100%" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "form-tip" }, "\u5217\u8868\u9875\u8D77\u6B65\u4EF7")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u521D\u59CB\u9500\u91CF" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: unref(form).initialSales,
                                "onUpdate:modelValue": ($event) => unref(form).initialSales = $event,
                                min: 0,
                                style: { "width": "100%" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u597D\u8BC4\u5EA6(%)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_slider, {
                                modelValue: unref(form).rating,
                                "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                                min: 80,
                                max: 100,
                                "show-input": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_row, { gutter: 40 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u89D2\u6807\u6807\u7B7E" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: unref(form).badgeLabel,
                                "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                placeholder: "\u8BF7\u9009\u62E9",
                                clearable: "",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "\u70ED\u5356",
                                    value: "\u70ED\u5356"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "\u65B0\u54C1",
                                    value: "\u65B0\u54C1"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "\u63A8\u8350",
                                    value: "\u63A8\u8350"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "\u9650\u91CF",
                                    value: "\u9650\u91CF"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "\u4F18\u60E0",
                                    value: "\u4F18\u60E0"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u52A0\u8D2D\u914D\u7F6E" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox, {
                                modelValue: unref(form).allowAddon,
                                "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5141\u8BB8\u7528\u6237\u5728\u4E0B\u5355\u65F6\u589E\u52A0\u8D2D\u4E70\u6570\u91CF")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_card, {
                shadow: "never",
                class: "form-card"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "card-header" }, [
                    createVNode("span", null, "\u5546\u54C1\u8BE6\u60C5"),
                    createVNode("div", { class: "header-actions" }, [
                      createVNode(_component_el_button, {
                        size: "small",
                        onClick: unref(addDetailText)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(document_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u6DFB\u52A0\u6587\u672C")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_button, {
                        size: "small",
                        onClick: unref(addDetailImage)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(picture_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u6DFB\u52A0\u56FE\u7247")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "detail-module-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).detailModules, (mod, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "detail-module-item"
                      }, [
                        createVNode("div", { class: "module-actions" }, [
                          createVNode(_component_el_tag, {
                            size: "small",
                            effect: "plain"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(mod.type === "image" ? "\u56FE\u7247\u6A21\u5757" : "\u6587\u672C\u6A21\u5757"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "action-btns" }, [
                            createVNode(_component_el_button, {
                              link: "",
                              disabled: idx === 0,
                              onClick: ($event) => unref(moveDetailModule)(idx, -1)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(arrow_up_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(_component_el_button, {
                              link: "",
                              disabled: idx === unref(form).detailModules.length - 1,
                              onClick: ($event) => unref(moveDetailModule)(idx, 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(arrow_down_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(_component_el_button, {
                              link: "",
                              type: "danger",
                              onClick: ($event) => unref(removeDetailModule)(idx)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(delete_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ]),
                        createVNode("div", { class: "module-display" }, [
                          mod.type === "image" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "module-image-trigger",
                            onClick: ($event) => unref(openImagePicker)(idx)
                          }, [
                            mod.content ? (openBlock(), createBlock(_component_el_image, {
                              key: 0,
                              src: mod.content,
                              class: "module-img-preview",
                              fit: "contain"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "image-placeholder"
                            }, [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(picture_default))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "\u70B9\u51FB\u9009\u62E9\u56FE\u7247")
                            ]))
                          ], 8, ["onClick"])) : (openBlock(), createBlock(_component_el_input, {
                            key: 1,
                            modelValue: mod.content,
                            "onUpdate:modelValue": ($event) => mod.content = $event,
                            type: "textarea",
                            rows: 3,
                            placeholder: "\u8BF7\u8F93\u5165\u6BB5\u843D\u6587\u672C"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ])
                      ]);
                    }), 128)),
                    unref(form).detailModules.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-detail-tip"
                    }, " \u6682\u65E0\u8BE6\u60C5\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u6DFB\u52A0 ")) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(AdminImageSelector, {
        modelValue: unref(imagePickerVisible),
        "onUpdate:modelValue": ($event) => isRef(imagePickerVisible) ? imagePickerVisible.value = $event : null,
        multiple: false,
        onSelect: unref(handleImageSelected)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4f08649c"]]);

export { post as default };
//# sourceMappingURL=post-CWT05w6n.mjs.map
