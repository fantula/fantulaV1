import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, z as arrow_left_default, ah as ElMessage } from './server.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElSelect, a as ElOption } from './index-Cf_t59lc.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElSwitch } from './index-CpWtG_dp.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { a as adminProductApi } from './admin-supabase-nszo-IoU.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { a as adminFaqApi } from './help-center-CbrlDHXl.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-D_b573Qt.mjs';
import './index-BOQJCp53.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-DOE061f1.mjs';
import './validator-T0bsmJHo.mjs';
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';

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
            router.push("/_mgmt_9Xfa3/faq");
          } else {
            ElMessage.error(res.error || "\u66F4\u65B0\u5931\u8D25");
          }
        } else {
          const res = await adminFaqApi.createFaq(data);
          if (res.success) {
            ElMessage.success("\u521B\u5EFA\u6210\u529F");
            router.push("/_mgmt_9Xfa3/faq");
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
      _push(`<h2 class="page-title" data-v-0de8c673>${ssrInterpolate(isEdit.value ? "\u7F16\u8F91\u95EE\u9898" : "\u521B\u5EFA\u95EE\u9898")}</h2></div></div><div${ssrRenderAttrs(mergeProps({ class: "form-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-0de8c673>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: form,
        "label-width": "120px",
        class: "faq-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u95EE\u9898\u6807\u9898",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.question,
                    "onUpdate:modelValue": ($event) => form.question = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1A\u5982\u4F55\u8FDB\u884C\u865A\u62DF\u5145\u503C\uFF1F",
                    size: "large"
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u95EE\u9898\u5206\u7C7B",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: form.categoryId,
                    "onUpdate:modelValue": ($event) => form.categoryId = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_divider, {
              "border-style": "dashed",
              "content-position": "left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u8BE6\u7EC6\u89E3\u7B54`);
                } else {
                  return [
                    createTextVNode("\u8BE6\u7EC6\u89E3\u7B54")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u7B54\u6848\u5185\u5BB9",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 8,
                    placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u89E3\u7B54..."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="form-tip" data-v-0de8c673${_scopeId2}>\u652F\u6301\u57FA\u672C\u7684\u6587\u672C\u5185\u5BB9\uFF0C\u5C06\u76F4\u63A5\u663E\u793A\u5728\u5BA2\u6237\u7AEF\u3002</div>`);
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.answer,
                      "onUpdate:modelValue": ($event) => form.answer = $event,
                      type: "textarea",
                      rows: 8,
                      placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u89E3\u7B54..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "\u652F\u6301\u57FA\u672C\u7684\u6587\u672C\u5185\u5BB9\uFF0C\u5C06\u76F4\u63A5\u663E\u793A\u5728\u5BA2\u6237\u7AEF\u3002")
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
                  _push3(`\u9AD8\u7EA7\u914D\u7F6E`);
                } else {
                  return [
                    createTextVNode("\u9AD8\u7EA7\u914D\u7F6E")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u5173\u8054\u5546\u54C1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
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
                  _push3(`<div class="form-tip" data-v-0de8c673${_scopeId2}> \u7ED1\u5B9A\u540E\uFF0C\u8BE5\u95EE\u9898\u5C06\u4F18\u5148\u5C55\u793A\u5728\u5BF9\u5E94\u5546\u54C1\u7684\u8BE6\u60C5\u9875\u4E2D\u3002 </div>`);
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
                    createVNode("div", { class: "form-tip" }, " \u7ED1\u5B9A\u540E\uFF0C\u8BE5\u95EE\u9898\u5C06\u4F18\u5148\u5C55\u793A\u5728\u5BF9\u5E94\u5546\u54C1\u7684\u8BE6\u60C5\u9875\u4E2D\u3002 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input_number, {
                    modelValue: form.sortOrder,
                    "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                    min: 0
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="form-tip" data-v-0de8c673${_scopeId2}>\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D</div>`);
                } else {
                  return [
                    createVNode(_component_el_input_number, {
                      modelValue: form.sortOrder,
                      "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                      min: 0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                        _push4(`${ssrInterpolate(isEdit.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u7ACB\u5373\u53D1\u5E03")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(isEdit.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u7ACB\u5373\u53D1\u5E03"), 1)
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
                        _push4(`\u53D6\u6D88`);
                      } else {
                        return [
                          createTextVNode("\u53D6\u6D88")
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
                        createTextVNode(toDisplayString(isEdit.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u7ACB\u5373\u53D1\u5E03"), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_el_button, {
                      onClick: ($event) => _ctx.$router.back(),
                      size: "large"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u53D6\u6D88")
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
              }),
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
              }),
              createVNode(_component_el_divider, {
                "border-style": "dashed",
                "content-position": "left"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u8BE6\u7EC6\u89E3\u7B54")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u7B54\u6848\u5185\u5BB9",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.answer,
                    "onUpdate:modelValue": ($event) => form.answer = $event,
                    type: "textarea",
                    rows: 8,
                    placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u89E3\u7B54..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "form-tip" }, "\u652F\u6301\u57FA\u672C\u7684\u6587\u672C\u5185\u5BB9\uFF0C\u5C06\u76F4\u63A5\u663E\u793A\u5728\u5BA2\u6237\u7AEF\u3002")
                ]),
                _: 1
              }),
              createVNode(_component_el_divider, {
                "border-style": "dashed",
                "content-position": "left"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u9AD8\u7EA7\u914D\u7F6E")
                ]),
                _: 1
              }),
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
                  createVNode("div", { class: "form-tip" }, " \u7ED1\u5B9A\u540E\uFF0C\u8BE5\u95EE\u9898\u5C06\u4F18\u5148\u5C55\u793A\u5728\u5BF9\u5E94\u5546\u54C1\u7684\u8BE6\u60C5\u9875\u4E2D\u3002 ")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u6743\u91CD" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input_number, {
                    modelValue: form.sortOrder,
                    "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                    min: 0
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "form-tip" }, "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "\u662F\u5426\u542F\u7528" }, {
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
                      createTextVNode(toDisplayString(isEdit.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u7ACB\u5373\u53D1\u5E03"), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_el_button, {
                    onClick: ($event) => _ctx.$router.back(),
                    size: "large"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D6\u6D88")
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

export { post as default };
//# sourceMappingURL=post-CCI39wE9.mjs.map
