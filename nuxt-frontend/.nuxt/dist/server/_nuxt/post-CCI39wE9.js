import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElIcon, z as arrow_left_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElSelect, a as ElOption } from "./index-Cf_t59lc.js";
import { E as ElDivider } from "./index-QnhSR2oe.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
/* empty css                   */
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
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { a as adminProductApi } from "./admin-supabase-nszo-IoU.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { a as adminFaqApi } from "./help-center-CbrlDHXl.js";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "async-validator";
import "./index-Dxw_X3Hq.js";
import "./event-BZTOGHfp.js";
import "./index-ClPmkyX9.js";
import "./aria-B8G3G_75.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./index-D_b573Qt.js";
import "./index-BOQJCp53.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-DOE061f1.js";
import "./validator-T0bsmJHo.js";
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
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
            router.push("/_mgmt_9Xfa3/faq");
          } else {
            ElMessage.error(res.error || "更新失败");
          }
        } else {
          const res = await adminFaqApi.createFaq(data);
          if (res.success) {
            ElMessage.success("创建成功");
            router.push("/_mgmt_9Xfa3/faq");
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
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_divider = ElDivider;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-post-page" }, _attrs))} data-v-0de8c673><div class="page-header" data-v-0de8c673><div class="header-left" data-v-0de8c673>`);
      _push(ssrRenderComponent(_component_el_button, {
        link: "",
        onClick: ($event) => _ctx.$router.back()
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
            _push2(` 返回列表 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(arrow_left_default))
                ]),
                _: 1
              }),
              createTextVNode(" 返回列表 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="page-title" data-v-0de8c673>${ssrInterpolate(isEdit.value ? "编辑问题" : "创建问题")}</h2></div></div><div${ssrRenderAttrs(mergeProps({ class: "form-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-0de8c673>`);
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
                  _push3(`<div class="form-tip" data-v-0de8c673${_scopeId2}>支持基本的文本内容，将直接显示在客户端。</div>`);
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
                                _push5(`<div class="product-option" data-v-0de8c673${_scopeId4}><span data-v-0de8c673${_scopeId4}>${ssrInterpolate(item.product_name)}</span><span class="product-id-sub" data-v-0de8c673${_scopeId4}>${ssrInterpolate(item.id)}</span></div>`);
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
                  _push3(`<div class="form-tip" data-v-0de8c673${_scopeId2}> 绑定后，该问题将优先展示在对应商品的详情页中。 </div>`);
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
                  _push3(`<div class="form-tip" data-v-0de8c673${_scopeId2}>数值越小越靠前</div>`);
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
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    onClick: submitForm,
                    loading: submitting.value,
                    size: "large"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(isEdit.value ? "保存修改" : "立即发布")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(isEdit.value ? "保存修改" : "立即发布"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => _ctx.$router.back(),
                    size: "large"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`取消`);
                      } else {
                        return [
                          createTextVNode("取消")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: submitForm,
                      loading: submitting.value,
                      size: "large"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(isEdit.value ? "保存修改" : "立即发布"), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_el_button, {
                      onClick: ($event) => _ctx.$router.back(),
                      size: "large"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("取消")
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
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: submitForm,
                    loading: submitting.value,
                    size: "large"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(isEdit.value ? "保存修改" : "立即发布"), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_el_button, {
                    onClick: ($event) => _ctx.$router.back(),
                    size: "large"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/faq/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0de8c673"]]);
export {
  post as default
};
//# sourceMappingURL=post-CCI39wE9.js.map
