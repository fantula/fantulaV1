import { E as ElForm, a as ElFormItem } from "./index-BYu6jnca.js";
import { E as ElRow, a as ElCol } from "./index-CxNi_TTV.js";
import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElSelect, a as ElOption } from "./index-B_mQW-wd.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElCollapse, a as ElCollapseItem } from "./index-Dk4UY6mW.js";
import { E as ElInputNumber } from "./index-BN7OybSS.js";
import { E as ElSwitch } from "./index-ByWmxDYy.js";
import { v as vLoading } from "./directive-BHLqqXUb.js";
import "./base-CEWXqFm3.js";
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
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, computed, reactive, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { a as adminFaqApi } from "./help-center-d-ts0aZv.js";
import { a as adminProductApi } from "./product-CmEpuoIC.js";
import { S as StickyFormHeader } from "./StickyFormHeader-BCDCqf0B.js";
import { marked } from "marked";
import { a as adminRoute } from "./admin-routes-C0qcXhse.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { _ as _export_sfc } from "../server.mjs";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./constants-hAKFmBbq.js";
import "./use-form-item-D2hCqQW8.js";
import "./objects-Bz74KHmq.js";
import "async-validator";
import "@vueuse/core";
import "./index-_zadwVDN.js";
import "./typescript-D6L75muK.js";
import "./index-DNnPa_Q9.js";
import "./icon-Ck0_dGQP.js";
import "./event-BZTOGHfp.js";
import "./index-Cxdfotkm.js";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-BAMVq552.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./index-Bhn2XfO3.js";
import "./index-D3BlhKEk.js";
import "./validator-BZYOvvAA.js";
import "./use-global-config-C5kRDPtv.js";
import "./supabase-F2pQZHm6.js";
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
import "./index-CXu9YNCC.js";
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
    const compiledMarkdown = computed(() => {
      if (!form.answer) return '<div class="empty-preview">暂无内容</div>';
      try {
        return marked(form.answer);
      } catch (e) {
        return form.answer;
      }
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
            router.push(adminRoute("help-center/faq"));
          } else {
            ElMessage.error(res.error || "更新失败");
          }
        } else {
          const res = await adminFaqApi.createFaq(data);
          if (res.success) {
            ElMessage.success("创建成功");
            router.push(adminRoute("help-center/faq"));
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
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_tag = ElTag;
      const _component_el_collapse = ElCollapse;
      const _component_el_collapse_item = ElCollapseItem;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-post-page" }, _attrs))} data-v-035840f3>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: isEdit.value ? "编辑问题" : "创建问题",
        "back-path": unref(adminRoute)("help-center/faq"),
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "split-layout" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-035840f3><div class="editor-pane" data-v-035840f3><div class="form-card" data-v-035840f3>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: form,
        "label-width": "100px",
        class: "faq-form",
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_col, { span: 16 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "问题标题",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.question,
                                "onUpdate:modelValue": ($event) => form.question = $event,
                                placeholder: "请输入问题，例如：如何进行虚拟充值？",
                                size: "large"
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_col, { span: 8 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "问题分类",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_select, {
                                modelValue: form.categoryId,
                                "onUpdate:modelValue": ($event) => form.categoryId = $event,
                                placeholder: "请选择分类",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(categories.value, (cat) => {
                                      _push6(ssrRenderComponent(_component_el_option, {
                                        key: cat.id,
                                        label: cat.name,
                                        value: cat.id
                                      }, null, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
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
                              }, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_col, { span: 16 }, {
                      default: withCtx(() => [
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
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
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
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "答案内容 (支持 Markdown)",
              required: "",
              class: "answer-editor-item"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "在此输入详细解答，右侧将实时预览...",
                    resize: "vertical"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="markdown-tips" data-v-035840f3${_scopeId2}><span data-v-035840f3${_scopeId2}>支持 Markdown 语法:</span>`);
                  _push3(ssrRenderComponent(_component_el_tag, {
                    size: "small",
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`**粗体**`);
                      } else {
                        return [
                          createTextVNode("**粗体**")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_tag, {
                    size: "small",
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`- 列表`);
                      } else {
                        return [
                          createTextVNode("- 列表")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_tag, {
                    size: "small",
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`[链接](url)`);
                      } else {
                        return [
                          createTextVNode("[链接](url)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.answer,
                      "onUpdate:modelValue": ($event) => form.answer = $event,
                      type: "textarea",
                      rows: 15,
                      placeholder: "在此输入详细解答，右侧将实时预览...",
                      resize: "vertical"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "markdown-tips" }, [
                      createVNode("span", null, "支持 Markdown 语法:"),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("**粗体**")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("- 列表")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("[链接](url)")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_collapse, { class: "mt-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_collapse_item, {
                    title: "高级配置",
                    name: "1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "关联商品" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_select, {
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
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<!--[-->`);
                                                ssrRenderList(productOptions.value, (item) => {
                                                  _push8(ssrRenderComponent(_component_el_option, {
                                                    key: item.id,
                                                    label: item.product_name,
                                                    value: item.id
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="product-option" data-v-035840f3${_scopeId8}><span data-v-035840f3${_scopeId8}>${ssrInterpolate(item.product_name)}</span><span class="product-id-sub" data-v-035840f3${_scopeId8}>${ssrInterpolate(item.id)}</span></div>`);
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
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
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
                                          }, _parent7, _scopeId6));
                                          _push7(`<div class="form-tip" data-v-035840f3${_scopeId6}>绑定后优先展示在商品详情页。</div>`);
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
                                            createVNode("div", { class: "form-tip" }, "绑定后优先展示在商品详情页。")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
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
                                          createVNode("div", { class: "form-tip" }, "绑定后优先展示在商品详情页。")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_col, { span: 6 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "排序权重" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_input_number, {
                                            modelValue: form.sortOrder,
                                            "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                            min: 0
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_input_number, {
                                              modelValue: form.sortOrder,
                                              "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                              min: 0
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "排序权重" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_input_number, {
                                            modelValue: form.sortOrder,
                                            "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                            min: 0
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_col, { span: 6 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "是否启用" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_switch, {
                                            modelValue: form.isActive,
                                            "onUpdate:modelValue": ($event) => form.isActive = $event
                                          }, null, _parent7, _scopeId6));
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
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
                                        createVNode("div", { class: "form-tip" }, "绑定后优先展示在商品详情页。")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 6 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "排序权重" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_input_number, {
                                          modelValue: form.sortOrder,
                                          "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                          min: 0
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 6 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "是否启用" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_switch, {
                                          modelValue: form.isActive,
                                          "onUpdate:modelValue": ($event) => form.isActive = $event
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_row, { gutter: 20 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
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
                                      createVNode("div", { class: "form-tip" }, "绑定后优先展示在商品详情页。")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 6 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "排序权重" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input_number, {
                                        modelValue: form.sortOrder,
                                        "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                        min: 0
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 6 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "是否启用" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_switch, {
                                        modelValue: form.isActive,
                                        "onUpdate:modelValue": ($event) => form.isActive = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_collapse_item, {
                      title: "高级配置",
                      name: "1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_row, { gutter: 20 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
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
                                    createVNode("div", { class: "form-tip" }, "绑定后优先展示在商品详情页。")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "排序权重" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: form.sortOrder,
                                      "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                      min: 0
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "是否启用" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: form.isActive,
                                      "onUpdate:modelValue": ($event) => form.isActive = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_row, { gutter: 20 }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 16 }, {
                    default: withCtx(() => [
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
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 8 }, {
                    default: withCtx(() => [
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
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "答案内容 (支持 Markdown)",
                required: "",
                class: "answer-editor-item"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "在此输入详细解答，右侧将实时预览...",
                    resize: "vertical"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "markdown-tips" }, [
                    createVNode("span", null, "支持 Markdown 语法:"),
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("**粗体**")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("- 列表")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("[链接](url)")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_collapse, { class: "mt-4" }, {
                default: withCtx(() => [
                  createVNode(_component_el_collapse_item, {
                    title: "高级配置",
                    name: "1"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_row, { gutter: 20 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
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
                                  createVNode("div", { class: "form-tip" }, "绑定后优先展示在商品详情页。")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "排序权重" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: form.sortOrder,
                                    "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                                    min: 0
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "是否启用" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: form.isActive,
                                    "onUpdate:modelValue": ($event) => form.isActive = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="preview-pane" data-v-035840f3><div class="preview-header" data-v-035840f3><span class="preview-title" data-v-035840f3>实时预览 (客户端效果)</span></div><div class="preview-content markdown-body" data-v-035840f3>${compiledMarkdown.value ?? ""}</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/help-center/faq/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-035840f3"]]);
export {
  post as default
};
//# sourceMappingURL=post-DPEiioWA.js.map
