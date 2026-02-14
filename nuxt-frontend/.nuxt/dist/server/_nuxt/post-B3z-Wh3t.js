import { E as ElForm, a as ElFormItem } from "./index-uVJ2GEO7.js";
import { E as ElInput } from "./index-ttyu327u.js";
import { E as ElSelect, a as ElOption } from "./index-CIsKhoUN.js";
import { E as ElDivider } from "./index-DEoO_C5P.js";
import { E as ElInputNumber } from "./index-eckTRjyM.js";
import { E as ElSwitch } from "./index-DVwBR8VS.js";
import { v as vLoading } from "./directive-Cp0y9Az7.js";
/* empty css              */
/* empty css                 */
/* empty css                      */
/* empty css                  */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                    */
/* empty css                         */
/* empty css                   */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { a as adminFaqApi } from "./help-center-CsRpUZsm.js";
import { a as adminProductApi } from "./product-Fh-4dbUo.js";
import { S as StickyFormHeader } from "./StickyFormHeader-BEb9UJKB.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "./index-CRs4T-Jf.js";
import "lodash-unified";
import "@vue/shared";
import "./index-C8K_s-bH.js";
import "./constants-hAKFmBbq.js";
import "./use-form-item-n_L16njV.js";
import "./objects-Bz74KHmq.js";
import "async-validator";
import "@vueuse/core";
import "./index-D6MDXFfa.js";
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
import "./index-RGUM47gz.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BYDsUCKj.js";
import "./raf-CQRaPAjg.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./index-D3BlhKEk.js";
import "./validator-DW0BNsk6.js";
import "./use-global-config-C00m4e8W.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./index-CGHU_uKU.js";
import "@ctrl/tinycolor";
/* empty css                   */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const submitting = ref(false);
    const isEdit = computed(() => !!route.query.id);
    const categories = ref([]);
    const productOptions = ref([]);
    const productSearchLoading = ref(false);
    const form = reactive({
      id: "",
      question: "",
      answer: "",
      categoryId: "",
      productId: "",
      sortOrder: 0,
      isActive: true
    });
    const searchProducts = async (query) => {
      if (query) {
        productSearchLoading.value = true;
        try {
          const res = await adminProductApi.getProducts({ keyword: query, page_size: 10 });
          if (res.success) {
            productOptions.value = res.products;
          }
        } finally {
          productSearchLoading.value = false;
        }
      } else {
        productOptions.value = [];
      }
    };
    const submitForm = async () => {
      if (!form.question || !form.answer || !form.categoryId) {
        ElMessage.warning("请填写完整信息");
        return;
      }
      submitting.value = true;
      try {
        const data = {
          question: form.question,
          answer: form.answer,
          category_id: form.categoryId,
          product_id: form.productId || void 0,
          sort_order: form.sortOrder,
          is_active: form.isActive
        };
        if (isEdit.value) {
          const res = await adminFaqApi.updateFaq(form.id, data);
          if (res.success) {
            ElMessage.success("更新成功");
            router.push("/admin/help-center/faq");
          } else {
            ElMessage.error(res.error || "更新失败");
          }
        } else {
          const res = await adminFaqApi.createFaq(data);
          if (res.success) {
            ElMessage.success("创建成功");
            router.push("/admin/help-center/faq");
          } else {
            ElMessage.error(res.error || "创建失败");
          }
        }
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_divider = ElDivider;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-post-page" }, _attrs))} data-v-08e853d2>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: isEdit.value ? "编辑问题" : "创建问题",
        "back-path": "/admin/help-center/faq",
        loading: submitting.value,
        onSave: submitForm
      }, {
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) ;
          else {
            return [];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-08e853d2>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: form,
        "label-width": "120px",
        class: "faq-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "问题标题",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.question,
                    "onUpdate:modelValue": ($event) => form.question = $event,
                    placeholder: "请输入问题，例如：如何进行虚拟充值？",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.question,
                      "onUpdate:modelValue": ($event) => form.question = $event,
                      placeholder: "请输入问题，例如：如何进行虚拟充值？",
                      size: "large"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "问题分类",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: form.categoryId,
                    "onUpdate:modelValue": ($event) => form.categoryId = $event,
                    placeholder: "请选择分类",
                    style: { "width": "100%" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(categories.value, (cat) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: cat.id,
                            label: cat.name,
                            value: cat.id
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: form.categoryId,
                      "onUpdate:modelValue": ($event) => form.categoryId = $event,
                      placeholder: "请选择分类",
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_divider, {
              "border-style": "dashed",
              "content-position": "left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`详细解答`);
                } else {
                  return [
                    createTextVNode("详细解答")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "答案内容",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 8,
                    placeholder: "请输入详细解答..."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="form-tip" data-v-08e853d2${_scopeId2}>支持基本的文本内容，将直接显示在客户端。</div>`);
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.answer,
                      "onUpdate:modelValue": ($event) => form.answer = $event,
                      type: "textarea",
                      rows: 8,
                      placeholder: "请输入详细解答..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "支持基本的文本内容，将直接显示在客户端。")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_divider, {
              "border-style": "dashed",
              "content-position": "left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`高级配置`);
                } else {
                  return [
                    createTextVNode("高级配置")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "关联商品" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: form.productId,
                    "onUpdate:modelValue": ($event) => form.productId = $event,
                    filterable: "",
                    remote: "",
                    clearable: "",
                    placeholder: "搜索并选择关联的商品（可选）",
                    "remote-method": searchProducts,
                    loading: productSearchLoading.value,
                    style: { "width": "100%" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(productOptions.value, (item) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: item.id,
                            label: item.product_name,
                            value: item.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="product-option" data-v-08e853d2${_scopeId4}><span data-v-08e853d2${_scopeId4}>${ssrInterpolate(item.product_name)}</span><span class="product-id-sub" data-v-08e853d2${_scopeId4}>${ssrInterpolate(item.id)}</span></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "product-option" }, [
                                    createVNode("span", null, toDisplayString(item.product_name), 1),
                                    createVNode("span", { class: "product-id-sub" }, toDisplayString(item.id), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(productOptions.value, (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.id,
                              label: item.product_name,
                              value: item.id
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "product-option" }, [
                                  createVNode("span", null, toDisplayString(item.product_name), 1),
                                  createVNode("span", { class: "product-id-sub" }, toDisplayString(item.id), 1)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="form-tip" data-v-08e853d2${_scopeId2}> 绑定后，该问题将优先展示在对应商品的详情页中。 </div>`);
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: form.productId,
                      "onUpdate:modelValue": ($event) => form.productId = $event,
                      filterable: "",
                      remote: "",
                      clearable: "",
                      placeholder: "搜索并选择关联的商品（可选）",
                      "remote-method": searchProducts,
                      loading: productSearchLoading.value,
                      style: { "width": "100%" }
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(productOptions.value, (item) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: item.id,
                            label: item.product_name,
                            value: item.id
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "product-option" }, [
                                createVNode("span", null, toDisplayString(item.product_name), 1),
                                createVNode("span", { class: "product-id-sub" }, toDisplayString(item.id), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "loading"]),
                    createVNode("div", { class: "form-tip" }, " 绑定后，该问题将优先展示在对应商品的详情页中。 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "排序权重" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input_number, {
                    modelValue: form.sortOrder,
                    "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                    min: 0
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="form-tip" data-v-08e853d2${_scopeId2}>数值越小越靠前</div>`);
                } else {
                  return [
                    createVNode(_component_el_input_number, {
                      modelValue: form.sortOrder,
                      "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "数值越小越靠前")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "是否启用" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: form.isActive,
                    "onUpdate:modelValue": ($event) => form.isActive = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: form.isActive,
                      "onUpdate:modelValue": ($event) => form.isActive = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form_item, {
                label: "问题标题",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.question,
                    "onUpdate:modelValue": ($event) => form.question = $event,
                    placeholder: "请输入问题，例如：如何进行虚拟充值？",
                    size: "large"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "问题分类",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: form.categoryId,
                    "onUpdate:modelValue": ($event) => form.categoryId = $event,
                    placeholder: "请选择分类",
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
              }),
              createVNode(_component_el_divider, {
                "border-style": "dashed",
                "content-position": "left"
              }, {
                default: withCtx(() => [
                  createTextVNode("详细解答")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "答案内容",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 8,
                    placeholder: "请输入详细解答..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "form-tip" }, "支持基本的文本内容，将直接显示在客户端。")
                ]),
                _: 1
              }),
              createVNode(_component_el_divider, {
                "border-style": "dashed",
                "content-position": "left"
              }, {
                default: withCtx(() => [
                  createTextVNode("高级配置")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "关联商品" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: form.productId,
                    "onUpdate:modelValue": ($event) => form.productId = $event,
                    filterable: "",
                    remote: "",
                    clearable: "",
                    placeholder: "搜索并选择关联的商品（可选）",
                    "remote-method": searchProducts,
                    loading: productSearchLoading.value,
                    style: { "width": "100%" }
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(productOptions.value, (item) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: item.id,
                          label: item.product_name,
                          value: item.id
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "product-option" }, [
                              createVNode("span", null, toDisplayString(item.product_name), 1),
                              createVNode("span", { class: "product-id-sub" }, toDisplayString(item.id), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "loading"]),
                  createVNode("div", { class: "form-tip" }, " 绑定后，该问题将优先展示在对应商品的详情页中。 ")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "排序权重" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input_number, {
                    modelValue: form.sortOrder,
                    "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                    min: 0
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "form-tip" }, "数值越小越靠前")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "是否启用" }, {
                default: withCtx(() => [
                  createVNode(_component_el_switch, {
                    modelValue: form.isActive,
                    "onUpdate:modelValue": ($event) => form.isActive = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/help-center/faq/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08e853d2"]]);
export {
  post as default
};
//# sourceMappingURL=post-B3z-Wh3t.js.map
