import { E as ElForm, a as ElFormItem } from "./index-uVJ2GEO7.js";
import { E as ElCard } from "./index-B15mgGFM.js";
import { E as ElRow, a as ElCol } from "./index-pXmMS3Fm.js";
import { E as ElInput } from "./index-ttyu327u.js";
import { E as ElSelect, a as ElOption } from "./index-CIsKhoUN.js";
import { E as ElInputNumber } from "./index-eckTRjyM.js";
import { E as ElSwitch } from "./index-DVwBR8VS.js";
import { E as ElImage } from "./index-DMcY9pQb.js";
import { E as ElIcon } from "./index-D6MDXFfa.js";
import { E as ElSlider } from "./index-nq0OpVQX.js";
import { a as ElCheckbox } from "./index-RDuG-1hQ.js";
import { E as ElButton } from "./index-CGHU_uKU.js";
import { E as ElTag } from "./index-RGUM47gz.js";
/* empty css              */
/* empty css                 */
/* empty css                 */
/* empty css                */
/* empty css                      */
/* empty css                  */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                         */
/* empty css                   */
/* empty css                         */
/* empty css                    */
/* empty css                     */
/* empty css                   */
import { ref, computed, reactive, defineComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, createTextVNode, toDisplayString, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { y as picture_filled_default, C as arrow_up_default, D as arrow_down_default, B as delete_default, L as picture_default, N as document_default } from "./index-CRs4T-Jf.js";
import { A as AdminImageSelector } from "./AdminImageSelector-Ct3D0KZ8.js";
import { S as StickyFormHeader } from "./StickyFormHeader-BEb9UJKB.js";
import { T as TagInputGroup } from "./TagInputGroup-CZpRnLRo.js";
/* empty css                    */
import { useRouter, useRoute } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { a as adminProductApi } from "./product-Fh-4dbUo.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import "./index-C8K_s-bH.js";
import "lodash-unified";
import "@vue/shared";
import "./constants-hAKFmBbq.js";
import "./use-form-item-n_L16njV.js";
import "./objects-Bz74KHmq.js";
import "async-validator";
import "@vueuse/core";
import "./use-global-config-C00m4e8W.js";
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "./event-BZTOGHfp.js";
import "./index-B6zOcltc.js";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "./index-m3FMdVd3.js";
import "@popperjs/core";
import "./focus-trap.vue-DLhiv9tF.js";
import "./index-D4s2dalC.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BYDsUCKj.js";
import "./raf-CQRaPAjg.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./index-D3BlhKEk.js";
import "./validator-DW0BNsk6.js";
import "./index-D_dCF80h.js";
import "@ctrl/tinycolor";
import "./index-Co5uNv20.js";
import "./index-DT739kqT.js";
import "./directive-Cp0y9Az7.js";
/* empty css                     */
/* empty css                  */
/* empty css                    */
import "./media-BJaGHW2U.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "./AdminDataDialog-CdRAbjlt.js";
import "./index-BzKtum8I.js";
import "./index-Cpe5xmf8.js";
import "./refs-CxYYXu5Q.js";
/* empty css                   */
/* empty css                    */
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
    name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
    categoryId: [{ required: true, message: "请选择分类", trigger: "change" }],
    image: [{ required: true, message: "请上传商品头图", trigger: "change" }]
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
            if (!skuRes.success) ElMessage.warning("商品已创建但SKU复制失败: " + skuRes.error);
          }
          ElMessage.success("保存成功");
          goBack();
        } else {
          ElMessage.error(res.error || "保存失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "保存异常");
      } finally {
        submitting.value = false;
      }
    });
  };
  const goBack = () => router.push("/admin/products");
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
  __name: "edit",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-post-page" }, _attrs))} data-v-bb7ab85f>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: unref(isEdit) ? "编辑商品" : "创建商品",
        subtitle: unref(isEdit) ? "Edit Product" : "New Product",
        loading: unref(loading),
        "submit-text": "保存商品",
        onBack: unref(goBack),
        onCancel: unref(goBack),
        onSubmit: unref(submitProduct)
      }, null, _parent));
      _push(`<div class="main-body" data-v-bb7ab85f><div class="content-wrapper" data-v-bb7ab85f>`);
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
                  _push3(`<div class="card-header" data-v-bb7ab85f${_scopeId2}>基本信息</div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, "基本信息")
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
                                label: "商品名称",
                                prop: "name"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      placeholder: "请输入商品主标题",
                                      size: "large"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: unref(form).name,
                                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                        placeholder: "请输入商品主标题",
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
                                            label: "商品分类",
                                            prop: "categoryId"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_el_select, {
                                                  modelValue: unref(form).categoryId,
                                                  "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                  placeholder: "请选择分类",
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
                                                    placeholder: "请选择分类",
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
                                              label: "商品分类",
                                              prop: "categoryId"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_el_select, {
                                                  modelValue: unref(form).categoryId,
                                                  "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                  placeholder: "请选择分类",
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
                                          _push7(ssrRenderComponent(_component_el_form_item, { label: "商品排序" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_el_input_number, {
                                                  modelValue: unref(form).sortOrder,
                                                  "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                  min: 0,
                                                  style: { "width": "100%" },
                                                  placeholder: "数值越小越靠前"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_el_input_number, {
                                                    modelValue: unref(form).sortOrder,
                                                    "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                    min: 0,
                                                    style: { "width": "100%" },
                                                    placeholder: "数值越小越靠前"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_form_item, { label: "商品排序" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_el_input_number, {
                                                  modelValue: unref(form).sortOrder,
                                                  "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                  min: 0,
                                                  style: { "width": "100%" },
                                                  placeholder: "数值越小越靠前"
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
                                            label: "商品分类",
                                            prop: "categoryId"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_select, {
                                                modelValue: unref(form).categoryId,
                                                "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                                placeholder: "请选择分类",
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
                                          createVNode(_component_el_form_item, { label: "商品排序" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_input_number, {
                                                modelValue: unref(form).sortOrder,
                                                "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                                min: 0,
                                                style: { "width": "100%" },
                                                placeholder: "数值越小越靠前"
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "商品标签" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(TagInputGroup, {
                                      modelValue: unref(form).tags,
                                      "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                      "add-button-text": "+ 新标签"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(TagInputGroup, {
                                        modelValue: unref(form).tags,
                                        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                        "add-button-text": "+ 新标签"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "上架状态" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_switch, {
                                      modelValue: unref(form).status,
                                      "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                      "active-text": "立即上架",
                                      "inactive-text": "暂不上架"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_switch, {
                                        modelValue: unref(form).status,
                                        "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                        "active-text": "立即上架",
                                        "inactive-text": "暂不上架"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "商品名称",
                                  prop: "name"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).name,
                                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                      placeholder: "请输入商品主标题",
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
                                          label: "商品分类",
                                          prop: "categoryId"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_select, {
                                              modelValue: unref(form).categoryId,
                                              "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                              placeholder: "请选择分类",
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
                                        createVNode(_component_el_form_item, { label: "商品排序" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_input_number, {
                                              modelValue: unref(form).sortOrder,
                                              "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                              min: 0,
                                              style: { "width": "100%" },
                                              placeholder: "数值越小越靠前"
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
                                createVNode(_component_el_form_item, { label: "商品标签" }, {
                                  default: withCtx(() => [
                                    createVNode(TagInputGroup, {
                                      modelValue: unref(form).tags,
                                      "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                      "add-button-text": "+ 新标签"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "上架状态" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: unref(form).status,
                                      "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                      "active-text": "立即上架",
                                      "inactive-text": "暂不上架"
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
                                label: "商品图片",
                                prop: "image",
                                class: "img-upload-item"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="image-gallery-trigger" data-v-bb7ab85f${_scopeId5}>`);
                                    if (unref(form).image) {
                                      _push6(ssrRenderComponent(_component_el_image, {
                                        src: unref(form).image,
                                        class: "trigger-img",
                                        fit: "cover"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<div class="trigger-content" data-v-bb7ab85f${_scopeId5}>`);
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
                                      _push6(`<span data-v-bb7ab85f${_scopeId5}>封面图</span></div>`);
                                    }
                                    if (unref(form).image) {
                                      _push6(`<div class="trigger-overlay" data-v-bb7ab85f${_scopeId5}>更换图片</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div><div class="form-tip" data-v-bb7ab85f${_scopeId5}>建议尺寸 800x800</div>`);
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
                                          createVNode("span", null, "封面图")
                                        ])),
                                        unref(form).image ? (openBlock(), createBlock("div", {
                                          key: 2,
                                          class: "trigger-overlay"
                                        }, "更换图片")) : createCommentVNode("", true)
                                      ], 8, ["onClick"]),
                                      createVNode("div", { class: "form-tip" }, "建议尺寸 800x800")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "商品图片",
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
                                        createVNode("span", null, "封面图")
                                      ])),
                                      unref(form).image ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: "trigger-overlay"
                                      }, "更换图片")) : createCommentVNode("", true)
                                    ], 8, ["onClick"]),
                                    createVNode("div", { class: "form-tip" }, "建议尺寸 800x800")
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
                                label: "商品名称",
                                prop: "name"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).name,
                                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                    placeholder: "请输入商品主标题",
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
                                        label: "商品分类",
                                        prop: "categoryId"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_select, {
                                            modelValue: unref(form).categoryId,
                                            "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                            placeholder: "请选择分类",
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
                                      createVNode(_component_el_form_item, { label: "商品排序" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_input_number, {
                                            modelValue: unref(form).sortOrder,
                                            "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                            min: 0,
                                            style: { "width": "100%" },
                                            placeholder: "数值越小越靠前"
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
                              createVNode(_component_el_form_item, { label: "商品标签" }, {
                                default: withCtx(() => [
                                  createVNode(TagInputGroup, {
                                    modelValue: unref(form).tags,
                                    "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                    "add-button-text": "+ 新标签"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "上架状态" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: unref(form).status,
                                    "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                    "active-text": "立即上架",
                                    "inactive-text": "暂不上架"
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
                                label: "商品图片",
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
                                      createVNode("span", null, "封面图")
                                    ])),
                                    unref(form).image ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "trigger-overlay"
                                    }, "更换图片")) : createCommentVNode("", true)
                                  ], 8, ["onClick"]),
                                  createVNode("div", { class: "form-tip" }, "建议尺寸 800x800")
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
                              label: "商品名称",
                              prop: "name"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  placeholder: "请输入商品主标题",
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
                                      label: "商品分类",
                                      prop: "categoryId"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_select, {
                                          modelValue: unref(form).categoryId,
                                          "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                          placeholder: "请选择分类",
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
                                    createVNode(_component_el_form_item, { label: "商品排序" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_input_number, {
                                          modelValue: unref(form).sortOrder,
                                          "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                          min: 0,
                                          style: { "width": "100%" },
                                          placeholder: "数值越小越靠前"
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
                            createVNode(_component_el_form_item, { label: "商品标签" }, {
                              default: withCtx(() => [
                                createVNode(TagInputGroup, {
                                  modelValue: unref(form).tags,
                                  "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                  "add-button-text": "+ 新标签"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "上架状态" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_switch, {
                                  modelValue: unref(form).status,
                                  "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                  "active-text": "立即上架",
                                  "inactive-text": "暂不上架"
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
                              label: "商品图片",
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
                                    createVNode("span", null, "封面图")
                                  ])),
                                  unref(form).image ? (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "trigger-overlay"
                                  }, "更换图片")) : createCommentVNode("", true)
                                ], 8, ["onClick"]),
                                createVNode("div", { class: "form-tip" }, "建议尺寸 800x800")
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
                  _push3(`<div class="card-header" data-v-bb7ab85f${_scopeId2}>营销与展示</div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, "营销与展示")
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "展示价格" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: unref(form).displayPrice,
                                      "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                      min: 0,
                                      precision: 2,
                                      style: { "width": "100%" }
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="form-tip" data-v-bb7ab85f${_scopeId5}>列表页起步价</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: unref(form).displayPrice,
                                        "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                        min: 0,
                                        precision: 2,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-tip" }, "列表页起步价")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "展示价格" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: unref(form).displayPrice,
                                      "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                      min: 0,
                                      precision: 2,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-tip" }, "列表页起步价")
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "初始销量" }, {
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
                                createVNode(_component_el_form_item, { label: "初始销量" }, {
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "好评度(%)" }, {
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
                                createVNode(_component_el_form_item, { label: "好评度(%)" }, {
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
                              createVNode(_component_el_form_item, { label: "展示价格" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: unref(form).displayPrice,
                                    "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                    min: 0,
                                    precision: 2,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-tip" }, "列表页起步价")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "初始销量" }, {
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
                              createVNode(_component_el_form_item, { label: "好评度(%)" }, {
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "角标标签" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_select, {
                                      modelValue: unref(form).badgeLabel,
                                      "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                      placeholder: "请选择",
                                      clearable: "",
                                      style: { "width": "100%" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "热卖",
                                            value: "热卖"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "新品",
                                            value: "新品"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "推荐",
                                            value: "推荐"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "限量",
                                            value: "限量"
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_el_option, {
                                            label: "优惠",
                                            value: "优惠"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_option, {
                                              label: "热卖",
                                              value: "热卖"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "新品",
                                              value: "新品"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "推荐",
                                              value: "推荐"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "限量",
                                              value: "限量"
                                            }),
                                            createVNode(_component_el_option, {
                                              label: "优惠",
                                              value: "优惠"
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
                                        placeholder: "请选择",
                                        clearable: "",
                                        style: { "width": "100%" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_option, {
                                            label: "热卖",
                                            value: "热卖"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "新品",
                                            value: "新品"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "推荐",
                                            value: "推荐"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "限量",
                                            value: "限量"
                                          }),
                                          createVNode(_component_el_option, {
                                            label: "优惠",
                                            value: "优惠"
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
                                createVNode(_component_el_form_item, { label: "角标标签" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: unref(form).badgeLabel,
                                      "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                      placeholder: "请选择",
                                      clearable: "",
                                      style: { "width": "100%" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_option, {
                                          label: "热卖",
                                          value: "热卖"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "新品",
                                          value: "新品"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "推荐",
                                          value: "推荐"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "限量",
                                          value: "限量"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "优惠",
                                          value: "优惠"
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "加购配置" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_checkbox, {
                                      modelValue: unref(form).allowAddon,
                                      "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`允许用户在下单时增加购买数量`);
                                        } else {
                                          return [
                                            createTextVNode("允许用户在下单时增加购买数量")
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
                                          createTextVNode("允许用户在下单时增加购买数量")
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
                                createVNode(_component_el_form_item, { label: "加购配置" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_checkbox, {
                                      modelValue: unref(form).allowAddon,
                                      "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("允许用户在下单时增加购买数量")
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
                              createVNode(_component_el_form_item, { label: "角标标签" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: unref(form).badgeLabel,
                                    "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                    placeholder: "请选择",
                                    clearable: "",
                                    style: { "width": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_option, {
                                        label: "热卖",
                                        value: "热卖"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "新品",
                                        value: "新品"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "推荐",
                                        value: "推荐"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "限量",
                                        value: "限量"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "优惠",
                                        value: "优惠"
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
                              createVNode(_component_el_form_item, { label: "加购配置" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, {
                                    modelValue: unref(form).allowAddon,
                                    "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("允许用户在下单时增加购买数量")
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
                            createVNode(_component_el_form_item, { label: "展示价格" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: unref(form).displayPrice,
                                  "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                  min: 0,
                                  precision: 2,
                                  style: { "width": "100%" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-tip" }, "列表页起步价")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "初始销量" }, {
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
                            createVNode(_component_el_form_item, { label: "好评度(%)" }, {
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
                            createVNode(_component_el_form_item, { label: "角标标签" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: unref(form).badgeLabel,
                                  "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                  placeholder: "请选择",
                                  clearable: "",
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_option, {
                                      label: "热卖",
                                      value: "热卖"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "新品",
                                      value: "新品"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "推荐",
                                      value: "推荐"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "限量",
                                      value: "限量"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "优惠",
                                      value: "优惠"
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
                            createVNode(_component_el_form_item, { label: "加购配置" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_checkbox, {
                                  modelValue: unref(form).allowAddon,
                                  "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("允许用户在下单时增加购买数量")
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
                  _push3(`<div class="card-header" data-v-bb7ab85f${_scopeId2}><span data-v-bb7ab85f${_scopeId2}>商品详情</span><div class="header-actions" data-v-bb7ab85f${_scopeId2}>`);
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
                        _push4(` 添加文本`);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(document_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 添加文本")
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
                        _push4(` 添加图片`);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(picture_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 添加图片")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "商品详情"),
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
                            createTextVNode(" 添加文本")
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
                            createTextVNode(" 添加图片")
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
                  _push3(`<div class="detail-module-list" data-v-bb7ab85f${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(form).detailModules, (mod, idx) => {
                    _push3(`<div class="detail-module-item" data-v-bb7ab85f${_scopeId2}><div class="module-actions" data-v-bb7ab85f${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      effect: "plain"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(mod.type === "image" ? "图片模块" : "文本模块")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(mod.type === "image" ? "图片模块" : "文本模块"), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="action-btns" data-v-bb7ab85f${_scopeId2}>`);
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
                    _push3(`</div></div><div class="module-display" data-v-bb7ab85f${_scopeId2}>`);
                    if (mod.type === "image") {
                      _push3(`<div class="module-image-trigger" data-v-bb7ab85f${_scopeId2}>`);
                      if (mod.content) {
                        _push3(ssrRenderComponent(_component_el_image, {
                          src: mod.content,
                          class: "module-img-preview",
                          fit: "contain"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<div class="image-placeholder" data-v-bb7ab85f${_scopeId2}>`);
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
                        _push3(`<span data-v-bb7ab85f${_scopeId2}>点击选择图片</span></div>`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: mod.content,
                        "onUpdate:modelValue": ($event) => mod.content = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: "请输入段落文本"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]-->`);
                  if (unref(form).detailModules.length === 0) {
                    _push3(`<div class="empty-detail-tip" data-v-bb7ab85f${_scopeId2}> 暂无详情内容，请点击上方按钮添加 </div>`);
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
                                createTextVNode(toDisplayString(mod.type === "image" ? "图片模块" : "文本模块"), 1)
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
                                createVNode("span", null, "点击选择图片")
                              ]))
                            ], 8, ["onClick"])) : (openBlock(), createBlock(_component_el_input, {
                              key: 1,
                              modelValue: mod.content,
                              "onUpdate:modelValue": ($event) => mod.content = $event,
                              type: "textarea",
                              rows: 3,
                              placeholder: "请输入段落文本"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ])
                        ]);
                      }), 128)),
                      unref(form).detailModules.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "empty-detail-tip"
                      }, " 暂无详情内容，请点击上方按钮添加 ")) : createCommentVNode("", true)
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
                  createVNode("div", { class: "card-header" }, "基本信息")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_row, { gutter: 40 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "商品名称",
                            prop: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "请输入商品主标题",
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
                                    label: "商品分类",
                                    prop: "categoryId"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_select, {
                                        modelValue: unref(form).categoryId,
                                        "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
                                        placeholder: "请选择分类",
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
                                  createVNode(_component_el_form_item, { label: "商品排序" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input_number, {
                                        modelValue: unref(form).sortOrder,
                                        "onUpdate:modelValue": ($event) => unref(form).sortOrder = $event,
                                        min: 0,
                                        style: { "width": "100%" },
                                        placeholder: "数值越小越靠前"
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
                          createVNode(_component_el_form_item, { label: "商品标签" }, {
                            default: withCtx(() => [
                              createVNode(TagInputGroup, {
                                modelValue: unref(form).tags,
                                "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                                "add-button-text": "+ 新标签"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "上架状态" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: unref(form).status,
                                "onUpdate:modelValue": ($event) => unref(form).status = $event,
                                "active-text": "立即上架",
                                "inactive-text": "暂不上架"
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
                            label: "商品图片",
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
                                  createVNode("span", null, "封面图")
                                ])),
                                unref(form).image ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "trigger-overlay"
                                }, "更换图片")) : createCommentVNode("", true)
                              ], 8, ["onClick"]),
                              createVNode("div", { class: "form-tip" }, "建议尺寸 800x800")
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
                  createVNode("div", { class: "card-header" }, "营销与展示")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_row, { gutter: 40 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "展示价格" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: unref(form).displayPrice,
                                "onUpdate:modelValue": ($event) => unref(form).displayPrice = $event,
                                min: 0,
                                precision: 2,
                                style: { "width": "100%" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "form-tip" }, "列表页起步价")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "初始销量" }, {
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
                          createVNode(_component_el_form_item, { label: "好评度(%)" }, {
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
                          createVNode(_component_el_form_item, { label: "角标标签" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: unref(form).badgeLabel,
                                "onUpdate:modelValue": ($event) => unref(form).badgeLabel = $event,
                                placeholder: "请选择",
                                clearable: "",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "热卖",
                                    value: "热卖"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "新品",
                                    value: "新品"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "推荐",
                                    value: "推荐"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "限量",
                                    value: "限量"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "优惠",
                                    value: "优惠"
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
                          createVNode(_component_el_form_item, { label: "加购配置" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox, {
                                modelValue: unref(form).allowAddon,
                                "onUpdate:modelValue": ($event) => unref(form).allowAddon = $event
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("允许用户在下单时增加购买数量")
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
                    createVNode("span", null, "商品详情"),
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
                          createTextVNode(" 添加文本")
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
                          createTextVNode(" 添加图片")
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
                              createTextVNode(toDisplayString(mod.type === "image" ? "图片模块" : "文本模块"), 1)
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
                              createVNode("span", null, "点击选择图片")
                            ]))
                          ], 8, ["onClick"])) : (openBlock(), createBlock(_component_el_input, {
                            key: 1,
                            modelValue: mod.content,
                            "onUpdate:modelValue": ($event) => mod.content = $event,
                            type: "textarea",
                            rows: 3,
                            placeholder: "请输入段落文本"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ])
                      ]);
                    }), 128)),
                    unref(form).detailModules.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-detail-tip"
                    }, " 暂无详情内容，请点击上方按钮添加 ")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb7ab85f"]]);
export {
  edit as default
};
//# sourceMappingURL=edit-B60fS-G2.js.map
