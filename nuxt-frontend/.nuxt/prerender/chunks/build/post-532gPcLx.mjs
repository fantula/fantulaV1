import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElRow, a as ElCol } from './index-27bUWc4s.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElSwitch } from './index-_GccYHgs.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElDatePicker } from './index-xXDjrfd3.mjs';
import { E as ElCheckbox } from './index-BlpH41lu.mjs';
import { _ as _export_sfc, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, computed, reactive, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import dayjs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/dayjs.min.js';
import { S as StickyFormHeader } from './StickyFormHeader-BS1LLrOp.mjs';
import { b as adminApi } from './admin-supabase-nszo-IoU.mjs';
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
import './index-DOE061f1.mjs';
import './validator-T0bsmJHo.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/customParseFormat.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/advancedFormat.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/localeData.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/weekOfYear.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/weekYear.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/dayOfYear.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/isSameOrAfter.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/isSameOrBefore.js';
import './index-DR2tYDZ3.mjs';
import './index-7IYgoTSU.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-D_b573Qt.mjs';
import './index-DCrMmn3b.mjs';
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
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const formRef = ref();
    const submitting = ref(false);
    const id = route.query.id;
    const isEdit = computed(() => !!id);
    const isUnlimitedDate = ref(false);
    const form = reactive({
      name: "",
      value: 0,
      minUsage: 0,
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: "",
      totalQuantity: 1e3,
      status: true
    });
    const rules = {
      name: [{ required: true, message: "\u8BF7\u8F93\u5165\u540D\u79F0", trigger: "blur" }],
      value: [{ required: true, message: "\u8BF7\u8F93\u5165\u51CF\u514D\u91D1\u989D", trigger: "blur" }]
    };
    const formatDate = (d) => dayjs(d).format("YYYY-MM-DD");
    const disabledDate = (time) => {
      return dayjs(time).isBefore(dayjs(), "day");
    };
    watch(isUnlimitedDate, (val) => {
      if (val) form.endDate = "";
    });
    const handleSubmit = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (valid) {
          if (!isUnlimitedDate.value && !form.endDate) {
            ElMessage.warning("\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F");
            return;
          }
          submitting.value = true;
          try {
            const payload = {
              name: form.name,
              type: "flat",
              value: form.value,
              product_ids: [],
              min_usage: form.minUsage,
              total_quantity: 0,
              // Default to 0 (unlimited)
              start_date: isUnlimitedDate.value ? null : form.startDate,
              end_date: isUnlimitedDate.value ? null : form.endDate,
              status: form.status
            };
            let res;
            if (isEdit.value) {
              res = await adminApi.coupon.updateCoupon(id, payload);
            } else {
              res = await adminApi.coupon.createCoupon(payload);
            }
            if (res.success) {
              ElMessage.success(isEdit.value ? "\u66F4\u65B0\u6210\u529F" : "\u521B\u5EFA\u6210\u529F");
              router.back();
            } else {
              ElMessage.error(res.error || "\u4FDD\u5B58\u5931\u8D25");
            }
          } catch (e) {
            ElMessage.error("\u4FDD\u5B58\u5F02\u5E38");
          } finally {
            submitting.value = false;
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_card = ElCard;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _component_el_divider = ElDivider;
      const _component_el_date_picker = ElDatePicker;
      const _component_el_checkbox = ElCheckbox;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-post-page" }, _attrs))} data-v-2ae7ba5d>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: isEdit.value ? "\u7F16\u8F91\u7ACB\u51CF\u5238" : "\u65B0\u589E\u7ACB\u51CF\u5238",
        "sub-title": isEdit.value ? "\u4FEE\u6539\u7ACB\u51CF\u5238\u4FE1\u606F" : "\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u6EE1\u51CF\u4F18\u60E0\u5238",
        "submit-text": isEdit.value ? "\u4FDD\u5B58" : "\u65B0\u589E",
        loading: submitting.value,
        onSubmit: handleSubmit,
        onCancel: ($event) => unref(router).back(),
        onBack: ($event) => unref(router).back()
      }, null, _parent));
      _push(`<div class="form-content" data-v-2ae7ba5d>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "formRef",
        ref: formRef,
        model: form,
        rules,
        "label-width": "120px",
        "label-position": "top",
        size: "large"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_card, {
              shadow: "never",
              class: "form-card"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-2ae7ba5d${_scopeId2}><span data-v-2ae7ba5d${_scopeId2}>\u57FA\u7840\u4FE1\u606F</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "\u57FA\u7840\u4FE1\u606F")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 24 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 12 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "\u4F18\u60E0\u5238\u540D\u79F0",
                                prop: "name"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: form.name,
                                      "onUpdate:modelValue": ($event) => form.name = $event,
                                      placeholder: "\u4F8B\u5982\uFF1A\u6EE1100\u51CF10\u4FC3\u9500"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: form.name,
                                        "onUpdate:modelValue": ($event) => form.name = $event,
                                        placeholder: "\u4F8B\u5982\uFF1A\u6EE1100\u51CF10\u4FC3\u9500"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "\u4F18\u60E0\u5238\u540D\u79F0",
                                  prop: "name"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: form.name,
                                      "onUpdate:modelValue": ($event) => form.name = $event,
                                      placeholder: "\u4F8B\u5982\uFF1A\u6EE1100\u51CF10\u4FC3\u9500"
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
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "\u4F18\u60E0\u5238\u540D\u79F0",
                                prop: "name"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: form.name,
                                    "onUpdate:modelValue": ($event) => form.name = $event,
                                    placeholder: "\u4F8B\u5982\uFF1A\u6EE1100\u51CF10\u4FC3\u9500"
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
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 24 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "\u51CF\u514D\u91D1\u989D",
                                prop: "value"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: form.value,
                                      "onUpdate:modelValue": ($event) => form.value = $event,
                                      min: 0.01,
                                      precision: 2,
                                      "controls-position": "right",
                                      style: { "width": "100%" }
                                    }, {
                                      prefix: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`\xA5`);
                                        } else {
                                          return [
                                            createTextVNode("\xA5")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: form.value,
                                        "onUpdate:modelValue": ($event) => form.value = $event,
                                        min: 0.01,
                                        precision: 2,
                                        "controls-position": "right",
                                        style: { "width": "100%" }
                                      }, {
                                        prefix: withCtx(() => [
                                          createTextVNode("\xA5")
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
                                createVNode(_component_el_form_item, {
                                  label: "\u51CF\u514D\u91D1\u989D",
                                  prop: "value"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: form.value,
                                      "onUpdate:modelValue": ($event) => form.value = $event,
                                      min: 0.01,
                                      precision: 2,
                                      "controls-position": "right",
                                      style: { "width": "100%" }
                                    }, {
                                      prefix: withCtx(() => [
                                        createTextVNode("\xA5")
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
                        _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "\u6700\u4F4E\u4F7F\u7528\u91D1\u989D",
                                prop: "minUsage"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: form.minUsage,
                                      "onUpdate:modelValue": ($event) => form.minUsage = $event,
                                      min: 0,
                                      precision: 2,
                                      "controls-position": "right",
                                      style: { "width": "100%" }
                                    }, {
                                      prefix: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`\xA5`);
                                        } else {
                                          return [
                                            createTextVNode("\xA5")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="form-tip" data-v-2ae7ba5d${_scopeId5}>\u8BA2\u5355\u6EE1\u591A\u5C11\u5143\u53EF\u7528\uFF080\u8868\u793A\u65E0\u95E8\u69DB\uFF09</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: form.minUsage,
                                        "onUpdate:modelValue": ($event) => form.minUsage = $event,
                                        min: 0,
                                        precision: 2,
                                        "controls-position": "right",
                                        style: { "width": "100%" }
                                      }, {
                                        prefix: withCtx(() => [
                                          createTextVNode("\xA5")
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-tip" }, "\u8BA2\u5355\u6EE1\u591A\u5C11\u5143\u53EF\u7528\uFF080\u8868\u793A\u65E0\u95E8\u69DB\uFF09")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "\u6700\u4F4E\u4F7F\u7528\u91D1\u989D",
                                  prop: "minUsage"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: form.minUsage,
                                      "onUpdate:modelValue": ($event) => form.minUsage = $event,
                                      min: 0,
                                      precision: 2,
                                      "controls-position": "right",
                                      style: { "width": "100%" }
                                    }, {
                                      prefix: withCtx(() => [
                                        createTextVNode("\xA5")
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-tip" }, "\u8BA2\u5355\u6EE1\u591A\u5C11\u5143\u53EF\u7528\uFF080\u8868\u793A\u65E0\u95E8\u69DB\uFF09")
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
                                label: "\u72B6\u6001",
                                prop: "status"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_switch, {
                                      modelValue: form.status,
                                      "onUpdate:modelValue": ($event) => form.status = $event,
                                      "active-text": "\u542F\u7528",
                                      "inactive-text": "\u505C\u7528"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_switch, {
                                        modelValue: form.status,
                                        "onUpdate:modelValue": ($event) => form.status = $event,
                                        "active-text": "\u542F\u7528",
                                        "inactive-text": "\u505C\u7528"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "\u72B6\u6001",
                                  prop: "status"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: form.status,
                                      "onUpdate:modelValue": ($event) => form.status = $event,
                                      "active-text": "\u542F\u7528",
                                      "inactive-text": "\u505C\u7528"
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
                              createVNode(_component_el_form_item, {
                                label: "\u51CF\u514D\u91D1\u989D",
                                prop: "value"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: form.value,
                                    "onUpdate:modelValue": ($event) => form.value = $event,
                                    min: 0.01,
                                    precision: 2,
                                    "controls-position": "right",
                                    style: { "width": "100%" }
                                  }, {
                                    prefix: withCtx(() => [
                                      createTextVNode("\xA5")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "\u6700\u4F4E\u4F7F\u7528\u91D1\u989D",
                                prop: "minUsage"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: form.minUsage,
                                    "onUpdate:modelValue": ($event) => form.minUsage = $event,
                                    min: 0,
                                    precision: 2,
                                    "controls-position": "right",
                                    style: { "width": "100%" }
                                  }, {
                                    prefix: withCtx(() => [
                                      createTextVNode("\xA5")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-tip" }, "\u8BA2\u5355\u6EE1\u591A\u5C11\u5143\u53EF\u7528\uFF080\u8868\u793A\u65E0\u95E8\u69DB\uFF09")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "\u72B6\u6001",
                                prop: "status"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: form.status,
                                    "onUpdate:modelValue": ($event) => form.status = $event,
                                    "active-text": "\u542F\u7528",
                                    "inactive-text": "\u505C\u7528"
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
                  _push3(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u53D1\u653E\u89C4\u5219`);
                      } else {
                        return [
                          createTextVNode("\u53D1\u653E\u89C4\u5219")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6709\u6548\u671F" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="date-picker-wrapper" data-v-2ae7ba5d${_scopeId3}>`);
                        if (!isUnlimitedDate.value) {
                          _push4(`<div class="date-text" data-v-2ae7ba5d${_scopeId3}><span class="label" data-v-2ae7ba5d${_scopeId3}>\u5F00\u59CB\uFF1A</span><span class="value" data-v-2ae7ba5d${_scopeId3}>${ssrInterpolate(formatDate(form.startDate))}</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (!isUnlimitedDate.value) {
                          _push4(ssrRenderComponent(_component_el_date_picker, {
                            modelValue: form.endDate,
                            "onUpdate:modelValue": ($event) => form.endDate = $event,
                            type: "date",
                            placeholder: "\u9009\u62E9\u7ED3\u675F\u65E5\u671F",
                            "value-format": "YYYY-MM-DD",
                            style: { "flex": "1", "margin": "0 12px" },
                            "disabled-date": disabledDate
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_el_checkbox, {
                          modelValue: isUnlimitedDate.value,
                          "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                          label: "\u6C38\u4E45\u6709\u6548",
                          border: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (!isUnlimitedDate.value) {
                          _push4(`<div class="form-tip" data-v-2ae7ba5d${_scopeId3}>\u9ED8\u8BA4\u4ECE\u4ECA\u65E5\u5F00\u59CB\u751F\u6548\uFF0C\u8BF7\u9009\u62E9\u622A\u6B62\u65E5\u671F</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "date-picker-wrapper" }, [
                            !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "date-text"
                            }, [
                              createVNode("span", { class: "label" }, "\u5F00\u59CB\uFF1A"),
                              createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                            ])) : createCommentVNode("", true),
                            !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                              key: 1,
                              modelValue: form.endDate,
                              "onUpdate:modelValue": ($event) => form.endDate = $event,
                              type: "date",
                              placeholder: "\u9009\u62E9\u7ED3\u675F\u65E5\u671F",
                              "value-format": "YYYY-MM-DD",
                              style: { "flex": "1", "margin": "0 12px" },
                              "disabled-date": disabledDate
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                            createVNode(_component_el_checkbox, {
                              modelValue: isUnlimitedDate.value,
                              "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                              label: "\u6C38\u4E45\u6709\u6548",
                              border: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "form-tip"
                          }, "\u9ED8\u8BA4\u4ECE\u4ECA\u65E5\u5F00\u59CB\u751F\u6548\uFF0C\u8BF7\u9009\u62E9\u622A\u6B62\u65E5\u671F")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_row, { gutter: 24 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "\u4F18\u60E0\u5238\u540D\u79F0",
                              prop: "name"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: form.name,
                                  "onUpdate:modelValue": ($event) => form.name = $event,
                                  placeholder: "\u4F8B\u5982\uFF1A\u6EE1100\u51CF10\u4FC3\u9500"
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
                    createVNode(_component_el_row, { gutter: 24 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "\u51CF\u514D\u91D1\u989D",
                              prop: "value"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: form.value,
                                  "onUpdate:modelValue": ($event) => form.value = $event,
                                  min: 0.01,
                                  precision: 2,
                                  "controls-position": "right",
                                  style: { "width": "100%" }
                                }, {
                                  prefix: withCtx(() => [
                                    createTextVNode("\xA5")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "\u6700\u4F4E\u4F7F\u7528\u91D1\u989D",
                              prop: "minUsage"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: form.minUsage,
                                  "onUpdate:modelValue": ($event) => form.minUsage = $event,
                                  min: 0,
                                  precision: 2,
                                  "controls-position": "right",
                                  style: { "width": "100%" }
                                }, {
                                  prefix: withCtx(() => [
                                    createTextVNode("\xA5")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-tip" }, "\u8BA2\u5355\u6EE1\u591A\u5C11\u5143\u53EF\u7528\uFF080\u8868\u793A\u65E0\u95E8\u69DB\uFF09")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 8 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "\u72B6\u6001",
                              prop: "status"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_switch, {
                                  modelValue: form.status,
                                  "onUpdate:modelValue": ($event) => form.status = $event,
                                  "active-text": "\u542F\u7528",
                                  "inactive-text": "\u505C\u7528"
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
                    createVNode(_component_el_divider, { "content-position": "left" }, {
                      default: withCtx(() => [
                        createTextVNode("\u53D1\u653E\u89C4\u5219")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6709\u6548\u671F" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "date-picker-wrapper" }, [
                          !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "date-text"
                          }, [
                            createVNode("span", { class: "label" }, "\u5F00\u59CB\uFF1A"),
                            createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                          ])) : createCommentVNode("", true),
                          !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                            key: 1,
                            modelValue: form.endDate,
                            "onUpdate:modelValue": ($event) => form.endDate = $event,
                            type: "date",
                            placeholder: "\u9009\u62E9\u7ED3\u675F\u65E5\u671F",
                            "value-format": "YYYY-MM-DD",
                            style: { "flex": "1", "margin": "0 12px" },
                            "disabled-date": disabledDate
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          createVNode(_component_el_checkbox, {
                            modelValue: isUnlimitedDate.value,
                            "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                            label: "\u6C38\u4E45\u6709\u6548",
                            border: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "form-tip"
                        }, "\u9ED8\u8BA4\u4ECE\u4ECA\u65E5\u5F00\u59CB\u751F\u6548\uFF0C\u8BF7\u9009\u62E9\u622A\u6B62\u65E5\u671F")) : createCommentVNode("", true)
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
              class: "form-card",
              style: { "margin-top": "24px" }
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-2ae7ba5d${_scopeId2}><span data-v-2ae7ba5d${_scopeId2}>\u6548\u679C\u9884\u89C8</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "\u6548\u679C\u9884\u89C8")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="preview-container" data-v-2ae7ba5d${_scopeId2}><div class="coupon-ticket flat-ticket" data-v-2ae7ba5d${_scopeId2}><div class="ticket-left" data-v-2ae7ba5d${_scopeId2}><div class="ticket-amount" data-v-2ae7ba5d${_scopeId2}><small data-v-2ae7ba5d${_scopeId2}>\xA5</small>${ssrInterpolate(form.value || "0")}</div><div class="ticket-cond" data-v-2ae7ba5d${_scopeId2}>\u6EE1 ${ssrInterpolate(form.minUsage)} \u53EF\u7528</div></div><div class="ticket-right" data-v-2ae7ba5d${_scopeId2}><div class="ticket-name" data-v-2ae7ba5d${_scopeId2}>${ssrInterpolate(form.name || "\u4F18\u60E0\u5238\u540D\u79F0")}</div><div class="ticket-date" data-v-2ae7ba5d${_scopeId2}>${ssrInterpolate(isUnlimitedDate.value ? "\u6C38\u4E45\u6709\u6548" : `${formatDate(form.startDate)} \u81F3 ${form.endDate || "?"}`)}</div><div class="ticket-btn" data-v-2ae7ba5d${_scopeId2}>\u7ACB\u5373\u9886\u53D6</div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "preview-container" }, [
                      createVNode("div", { class: "coupon-ticket flat-ticket" }, [
                        createVNode("div", { class: "ticket-left" }, [
                          createVNode("div", { class: "ticket-amount" }, [
                            createVNode("small", null, "\xA5"),
                            createTextVNode(toDisplayString(form.value || "0"), 1)
                          ]),
                          createVNode("div", { class: "ticket-cond" }, "\u6EE1 " + toDisplayString(form.minUsage) + " \u53EF\u7528", 1)
                        ]),
                        createVNode("div", { class: "ticket-right" }, [
                          createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "\u4F18\u60E0\u5238\u540D\u79F0"), 1),
                          createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "\u6C38\u4E45\u6709\u6548" : `${formatDate(form.startDate)} \u81F3 ${form.endDate || "?"}`), 1),
                          createVNode("div", { class: "ticket-btn" }, "\u7ACB\u5373\u9886\u53D6")
                        ])
                      ])
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
                  createVNode("div", { class: "card-header" }, [
                    createVNode("span", null, "\u57FA\u7840\u4FE1\u606F")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_row, { gutter: 24 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "\u4F18\u60E0\u5238\u540D\u79F0",
                            prop: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.name,
                                "onUpdate:modelValue": ($event) => form.name = $event,
                                placeholder: "\u4F8B\u5982\uFF1A\u6EE1100\u51CF10\u4FC3\u9500"
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
                  createVNode(_component_el_row, { gutter: 24 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "\u51CF\u514D\u91D1\u989D",
                            prop: "value"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: form.value,
                                "onUpdate:modelValue": ($event) => form.value = $event,
                                min: 0.01,
                                precision: 2,
                                "controls-position": "right",
                                style: { "width": "100%" }
                              }, {
                                prefix: withCtx(() => [
                                  createTextVNode("\xA5")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "\u6700\u4F4E\u4F7F\u7528\u91D1\u989D",
                            prop: "minUsage"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: form.minUsage,
                                "onUpdate:modelValue": ($event) => form.minUsage = $event,
                                min: 0,
                                precision: 2,
                                "controls-position": "right",
                                style: { "width": "100%" }
                              }, {
                                prefix: withCtx(() => [
                                  createTextVNode("\xA5")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "form-tip" }, "\u8BA2\u5355\u6EE1\u591A\u5C11\u5143\u53EF\u7528\uFF080\u8868\u793A\u65E0\u95E8\u69DB\uFF09")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "\u72B6\u6001",
                            prop: "status"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: form.status,
                                "onUpdate:modelValue": ($event) => form.status = $event,
                                "active-text": "\u542F\u7528",
                                "inactive-text": "\u505C\u7528"
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
                  createVNode(_component_el_divider, { "content-position": "left" }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D1\u653E\u89C4\u5219")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6709\u6548\u671F" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "date-picker-wrapper" }, [
                        !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "date-text"
                        }, [
                          createVNode("span", { class: "label" }, "\u5F00\u59CB\uFF1A"),
                          createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                        ])) : createCommentVNode("", true),
                        !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                          key: 1,
                          modelValue: form.endDate,
                          "onUpdate:modelValue": ($event) => form.endDate = $event,
                          type: "date",
                          placeholder: "\u9009\u62E9\u7ED3\u675F\u65E5\u671F",
                          "value-format": "YYYY-MM-DD",
                          style: { "flex": "1", "margin": "0 12px" },
                          "disabled-date": disabledDate
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        createVNode(_component_el_checkbox, {
                          modelValue: isUnlimitedDate.value,
                          "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                          label: "\u6C38\u4E45\u6709\u6548",
                          border: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "form-tip"
                      }, "\u9ED8\u8BA4\u4ECE\u4ECA\u65E5\u5F00\u59CB\u751F\u6548\uFF0C\u8BF7\u9009\u62E9\u622A\u6B62\u65E5\u671F")) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_card, {
                shadow: "never",
                class: "form-card",
                style: { "margin-top": "24px" }
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "card-header" }, [
                    createVNode("span", null, "\u6548\u679C\u9884\u89C8")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "preview-container" }, [
                    createVNode("div", { class: "coupon-ticket flat-ticket" }, [
                      createVNode("div", { class: "ticket-left" }, [
                        createVNode("div", { class: "ticket-amount" }, [
                          createVNode("small", null, "\xA5"),
                          createTextVNode(toDisplayString(form.value || "0"), 1)
                        ]),
                        createVNode("div", { class: "ticket-cond" }, "\u6EE1 " + toDisplayString(form.minUsage) + " \u53EF\u7528", 1)
                      ]),
                      createVNode("div", { class: "ticket-right" }, [
                        createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "\u4F18\u60E0\u5238\u540D\u79F0"), 1),
                        createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "\u6C38\u4E45\u6709\u6548" : `${formatDate(form.startDate)} \u81F3 ${form.endDate || "?"}`), 1),
                        createVNode("div", { class: "ticket-btn" }, "\u7ACB\u5373\u9886\u53D6")
                      ])
                    ])
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/coupons/flat/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ae7ba5d"]]);

export { post as default };
//# sourceMappingURL=post-532gPcLx.mjs.map
