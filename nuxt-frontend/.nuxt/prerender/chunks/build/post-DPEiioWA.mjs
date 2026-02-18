import { E as ElForm, a as ElFormItem } from './index-BYu6jnca.mjs';
import { E as ElRow, a as ElCol } from './index-CxNi_TTV.mjs';
import { E as ElInput } from './index-BeH2PDwZ.mjs';
import { E as ElSelect, a as ElOption } from './index-B_mQW-wd.mjs';
import { E as ElTag } from './index-2JZmBUf1.mjs';
import { E as ElCollapse, a as ElCollapseItem } from './index-Dk4UY6mW.mjs';
import { E as ElInputNumber } from './index-BN7OybSS.mjs';
import { E as ElSwitch } from './index-ByWmxDYy.mjs';
import { v as vLoading } from './directive-BHLqqXUb.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { a as adminFaqApi } from './help-center-d-ts0aZv.mjs';
import { a as adminProductApi } from './product-CmEpuoIC.mjs';
import { S as StickyFormHeader } from './StickyFormHeader-BCDCqf0B.mjs';
import { marked } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/marked/lib/marked.esm.js';
import { a as adminRoute } from './admin-routes-C0qcXhse.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './index-DbvZsXcZ.mjs';
import './constants-hAKFmBbq.mjs';
import './use-form-item-D2hCqQW8.mjs';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-_zadwVDN.mjs';
import './typescript-D6L75muK.mjs';
import './index-DNnPa_Q9.mjs';
import './icon-Ck0_dGQP.mjs';
import './event-BZTOGHfp.mjs';
import './index-Cxdfotkm.mjs';
import './event-D3FEo2C5.mjs';
import './index-DuyRWKSc.mjs';
import './aria-Rs9hkxop.mjs';
import './index-bphs7bB3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-ByGmkA5C.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './index-BAMVq552.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-BEbqb1sm.mjs';
import './raf-CQRaPAjg.mjs';
import './index-C8YaaWrc.mjs';
import './vnode-uc6o_sOa.mjs';
import './index-Bhn2XfO3.mjs';
import './index-D3BlhKEk.mjs';
import './validator-BZYOvvAA.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './supabase-F2pQZHm6.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './index-CXu9YNCC.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';

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
      if (!form.answer) return '<div class="empty-preview">\u6682\u65E0\u5185\u5BB9</div>';
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
        ElMessage.warning("\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F");
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
            ElMessage.success("\u66F4\u65B0\u6210\u529F");
            router.push(adminRoute("help-center/faq"));
          } else {
            ElMessage.error(res.error || "\u66F4\u65B0\u5931\u8D25");
          }
        } else {
          const res = await adminFaqApi.createFaq(data);
          if (res.success) {
            ElMessage.success("\u521B\u5EFA\u6210\u529F");
            router.push(adminRoute("help-center/faq"));
          } else {
            ElMessage.error(res.error || "\u521B\u5EFA\u5931\u8D25");
          }
        }
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
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
        title: isEdit.value ? "\u7F16\u8F91\u95EE\u9898" : "\u521B\u5EFA\u95EE\u9898",
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
                          label: "\u95EE\u9898\u6807\u9898",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.question,
                                "onUpdate:modelValue": ($event) => form.question = $event,
                                placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1A\u5982\u4F55\u8FDB\u884C\u865A\u62DF\u5145\u503C\uFF1F",
                                size: "large"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.question,
                                  "onUpdate:modelValue": ($event) => form.question = $event,
                                  placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1A\u5982\u4F55\u8FDB\u884C\u865A\u62DF\u5145\u503C\uFF1F",
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
                            label: "\u95EE\u9898\u6807\u9898",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.question,
                                "onUpdate:modelValue": ($event) => form.question = $event,
                                placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1A\u5982\u4F55\u8FDB\u884C\u865A\u62DF\u5145\u503C\uFF1F",
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
                          label: "\u95EE\u9898\u5206\u7C7B",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_select, {
                                modelValue: form.categoryId,
                                "onUpdate:modelValue": ($event) => form.categoryId = $event,
                                placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
                                  placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
                            label: "\u95EE\u9898\u5206\u7C7B",
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
                          label: "\u95EE\u9898\u6807\u9898",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.question,
                              "onUpdate:modelValue": ($event) => form.question = $event,
                              placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1A\u5982\u4F55\u8FDB\u884C\u865A\u62DF\u5145\u503C\uFF1F",
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
                          label: "\u95EE\u9898\u5206\u7C7B",
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
              label: "\u7B54\u6848\u5185\u5BB9 (\u652F\u6301 Markdown)",
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
                    placeholder: "\u5728\u6B64\u8F93\u5165\u8BE6\u7EC6\u89E3\u7B54\uFF0C\u53F3\u4FA7\u5C06\u5B9E\u65F6\u9884\u89C8...",
                    resize: "vertical"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="markdown-tips" data-v-035840f3${_scopeId2}><span data-v-035840f3${_scopeId2}>\u652F\u6301 Markdown \u8BED\u6CD5:</span>`);
                  _push3(ssrRenderComponent(_component_el_tag, {
                    size: "small",
                    type: "info"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`**\u7C97\u4F53**`);
                      } else {
                        return [
                          createTextVNode("**\u7C97\u4F53**")
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
                        _push4(`- \u5217\u8868`);
                      } else {
                        return [
                          createTextVNode("- \u5217\u8868")
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
                        _push4(`[\u94FE\u63A5](url)`);
                      } else {
                        return [
                          createTextVNode("[\u94FE\u63A5](url)")
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
                      placeholder: "\u5728\u6B64\u8F93\u5165\u8BE6\u7EC6\u89E3\u7B54\uFF0C\u53F3\u4FA7\u5C06\u5B9E\u65F6\u9884\u89C8...",
                      resize: "vertical"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "markdown-tips" }, [
                      createVNode("span", null, "\u652F\u6301 Markdown \u8BED\u6CD5:"),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("**\u7C97\u4F53**")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("- \u5217\u8868")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("[\u94FE\u63A5](url)")
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
                    title: "\u9AD8\u7EA7\u914D\u7F6E",
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_select, {
                                            modelValue: form.productId,
                                            "onUpdate:modelValue": ($event) => form.productId = $event,
                                            filterable: "",
                                            remote: "",
                                            clearable: "",
                                            placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                          _push7(`<div class="form-tip" data-v-035840f3${_scopeId6}>\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002</div>`);
                                        } else {
                                          return [
                                            createVNode(_component_el_select, {
                                              modelValue: form.productId,
                                              "onUpdate:modelValue": ($event) => form.productId = $event,
                                              filterable: "",
                                              remote: "",
                                              clearable: "",
                                              placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                            createVNode("div", { class: "form-tip" }, "\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_select, {
                                            modelValue: form.productId,
                                            "onUpdate:modelValue": ($event) => form.productId = $event,
                                            filterable: "",
                                            remote: "",
                                            clearable: "",
                                            placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                          createVNode("div", { class: "form-tip" }, "\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002")
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
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
                                      createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                                      createVNode(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                                    createVNode(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_select, {
                                          modelValue: form.productId,
                                          "onUpdate:modelValue": ($event) => form.productId = $event,
                                          filterable: "",
                                          remote: "",
                                          clearable: "",
                                          placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                        createVNode("div", { class: "form-tip" }, "\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 6 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
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
                                    createVNode(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                                  createVNode(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_select, {
                                        modelValue: form.productId,
                                        "onUpdate:modelValue": ($event) => form.productId = $event,
                                        filterable: "",
                                        remote: "",
                                        clearable: "",
                                        placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                      createVNode("div", { class: "form-tip" }, "\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 6 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
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
                                  createVNode(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                      title: "\u9AD8\u7EA7\u914D\u7F6E",
                      name: "1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_row, { gutter: 20 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: form.productId,
                                      "onUpdate:modelValue": ($event) => form.productId = $event,
                                      filterable: "",
                                      remote: "",
                                      clearable: "",
                                      placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                    createVNode("div", { class: "form-tip" }, "\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
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
                                createVNode(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                        label: "\u95EE\u9898\u6807\u9898",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.question,
                            "onUpdate:modelValue": ($event) => form.question = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1A\u5982\u4F55\u8FDB\u884C\u865A\u62DF\u5145\u503C\uFF1F",
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
                        label: "\u95EE\u9898\u5206\u7C7B",
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
                label: "\u7B54\u6848\u5185\u5BB9 (\u652F\u6301 Markdown)",
                required: "",
                class: "answer-editor-item"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "\u5728\u6B64\u8F93\u5165\u8BE6\u7EC6\u89E3\u7B54\uFF0C\u53F3\u4FA7\u5C06\u5B9E\u65F6\u9884\u89C8...",
                    resize: "vertical"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "markdown-tips" }, [
                    createVNode("span", null, "\u652F\u6301 Markdown \u8BED\u6CD5:"),
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("**\u7C97\u4F53**")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("- \u5217\u8868")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("[\u94FE\u63A5](url)")
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
                    title: "\u9AD8\u7EA7\u914D\u7F6E",
                    name: "1"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_row, { gutter: 20 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: form.productId,
                                    "onUpdate:modelValue": ($event) => form.productId = $event,
                                    filterable: "",
                                    remote: "",
                                    clearable: "",
                                    placeholder: "\u641C\u7D22\u5E76\u9009\u62E9\u5173\u8054\u7684\u5546\u54C1\uFF08\u53EF\u9009\uFF09",
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
                                  createVNode("div", { class: "form-tip" }, "\u7ED1\u5B9A\u540E\u4F18\u5148\u5C55\u793A\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u3002")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
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
                              createVNode(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
      _push(`</div></div><div class="preview-pane" data-v-035840f3><div class="preview-header" data-v-035840f3><span class="preview-title" data-v-035840f3>\u5B9E\u65F6\u9884\u89C8 (\u5BA2\u6237\u7AEF\u6548\u679C)</span></div><div class="preview-content markdown-body" data-v-035840f3>${(_a = compiledMarkdown.value) != null ? _a : ""}</div></div></div></div>`);
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

export { post as default };
//# sourceMappingURL=post-DPEiioWA.mjs.map
