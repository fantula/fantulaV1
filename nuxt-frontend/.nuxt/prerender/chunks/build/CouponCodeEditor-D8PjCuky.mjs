import { E as ElDialog } from './index-CzosOSMt.mjs';
import { E as ElTabs, a as ElTabPane } from './index-DghwLlHw.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, bL as magic_stick_default, ah as ElMessage, bM as document_copy_default, bb as delete_default, b9 as refresh_default, E as ElIcon, ap as copy_document_default } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, createTextVNode, computed, unref, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { c as adminCouponApi, b as adminApi } from './admin-supabase-nszo-IoU.mjs';
import { E as ElDrawer } from './index-Dh4oAC1v.mjs';
import { a as ElTable, E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElPagination } from './index-Da73tUO2.mjs';
import dayjs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/dayjs.min.js';
import { useClipboard } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CouponCodeGenerator",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    coupon: {}
  },
  emits: ["update:modelValue", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const activeTab = ref("random");
    const loading = ref(false);
    const quantity = ref(50);
    const customCode = ref("");
    const usageLimit = ref(1e3);
    const handleClose = () => {
      visible.value = false;
    };
    const generateRandomCode = () => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let str = "";
      for (let i = 0; i < 12; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      customCode.value = `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6, 9)}-${str.slice(9, 12)}`;
    };
    const handleGenerate = async () => {
      var _a;
      if (!((_a = props.coupon) == null ? void 0 : _a.id)) return;
      if (activeTab.value === "universal") {
        if (!customCode.value || customCode.value.length < 3) {
          ElMessage.warning("\u901A\u7528\u7801\u81F3\u5C11\u9700\u89813\u4E2A\u5B57\u7B26");
          return;
        }
      }
      loading.value = true;
      try {
        const res = await adminApi.coupon.generateCouponCodes(
          props.coupon.id,
          activeTab.value === "random" ? quantity.value : 1,
          activeTab.value,
          activeTab.value === "universal" ? customCode.value : void 0,
          activeTab.value === "universal" ? usageLimit.value : void 0
        );
        if (res.success) {
          ElMessage.success(`\u6210\u529F\u751F\u6210 ${res.count} \u4E2A\u5151\u6362\u7801`);
          emit("success");
          handleClose();
          customCode.value = "";
          quantity.value = 50;
        } else {
          ElMessage.error(res.error || "\u751F\u6210\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u7CFB\u7EDF\u5F02\u5E38");
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_tabs = ElTabs;
      const _component_el_tab_pane = ElTabPane;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input_number = ElInputNumber;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "\u751F\u6210\u5151\u6362\u7801",
        width: "500px",
        onClose: handleClose,
        "append-to-body": ""
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-b9b2ddbe${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, { onClick: handleClose }, {
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
              loading: loading.value,
              onClick: handleGenerate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(activeTab.value === "random" ? `\u751F\u6210 ${quantity.value} \u4E2A` : "\u521B\u5EFA\u901A\u7528\u7801")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(activeTab.value === "random" ? `\u751F\u6210 ${quantity.value} \u4E2A` : "\u521B\u5EFA\u901A\u7528\u7801"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, { onClick: handleClose }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  loading: loading.value,
                  onClick: handleGenerate
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(activeTab.value === "random" ? `\u751F\u6210 ${quantity.value} \u4E2A` : "\u521B\u5EFA\u901A\u7528\u7801"), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.coupon) {
              _push2(`<div class="coupon-info" data-v-b9b2ddbe${_scopeId}><div class="info-label" data-v-b9b2ddbe${_scopeId}>\u5F53\u524D\u4F18\u60E0\u5238\uFF1A</div><div class="info-value" data-v-b9b2ddbe${_scopeId}>${ssrInterpolate(__props.coupon.name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_el_tabs, {
              modelValue: activeTab.value,
              "onUpdate:modelValue": ($event) => activeTab.value = $event,
              class: "generator-tabs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tab_pane, {
                    label: "\u6279\u91CF\u968F\u673A\u751F\u6210",
                    name: "random"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="tab-content" data-v-b9b2ddbe${_scopeId3}><p class="desc" data-v-b9b2ddbe${_scopeId3}>\u7CFB\u7EDF\u5C06\u81EA\u52A8\u751F\u6210\u6307\u5B9A\u6570\u91CF\u7684\u552F\u4E00\u5151\u6362\u7801\uFF08\u5982 X7A9-B2C1\uFF09\uFF0C\u6BCF\u4E2A\u7801\u4EC5\u9650\u4F7F\u7528\u4E00\u6B21\u3002</p>`);
                        _push4(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u751F\u6210\u6570\u91CF" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: quantity.value,
                                      "onUpdate:modelValue": ($event) => quantity.value = $event,
                                      min: 1,
                                      max: 1e3,
                                      style: { "width": "100%" }
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: quantity.value,
                                        "onUpdate:modelValue": ($event) => quantity.value = $event,
                                        min: 1,
                                        max: 1e3,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u751F\u6210\u6570\u91CF" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: quantity.value,
                                      "onUpdate:modelValue": ($event) => quantity.value = $event,
                                      min: 1,
                                      max: 1e3,
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
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "tab-content" }, [
                            createVNode("p", { class: "desc" }, "\u7CFB\u7EDF\u5C06\u81EA\u52A8\u751F\u6210\u6307\u5B9A\u6570\u91CF\u7684\u552F\u4E00\u5151\u6362\u7801\uFF08\u5982 X7A9-B2C1\uFF09\uFF0C\u6BCF\u4E2A\u7801\u4EC5\u9650\u4F7F\u7528\u4E00\u6B21\u3002"),
                            createVNode(_component_el_form, { "label-position": "top" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u751F\u6210\u6570\u91CF" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: quantity.value,
                                      "onUpdate:modelValue": ($event) => quantity.value = $event,
                                      min: 1,
                                      max: 1e3,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_tab_pane, {
                    label: "\u521B\u5EFA\u901A\u7528\u7801",
                    name: "universal"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="tab-content" data-v-b9b2ddbe${_scopeId3}><p class="desc" data-v-b9b2ddbe${_scopeId3}>\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9A\u7684\u5151\u6362\u7801\uFF08\u5982 VIP888\uFF09\uFF0C\u53EF\u591A\u4EBA\u4F7F\u7528\u6216\u5355\u4EBA\u591A\u6B21\u4F7F\u7528\uFF0C\u76F4\u5230\u8FBE\u5230\u603B\u6B21\u6570\u9650\u5236\u3002</p>`);
                        _push4(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u81EA\u5B9A\u4E49\u5151\u6362\u7801" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: customCode.value,
                                      "onUpdate:modelValue": ($event) => customCode.value = $event,
                                      placeholder: "\u4F8B\u5982\uFF1AVIP888",
                                      "show-word-limit": "",
                                      maxlength: "20",
                                      clearable: ""
                                    }, {
                                      prefix: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`#`);
                                        } else {
                                          return [
                                            createTextVNode("#")
                                          ];
                                        }
                                      }),
                                      append: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_button, {
                                            icon: unref(magic_stick_default),
                                            onClick: generateRandomCode,
                                            title: "\u968F\u673A\u751F\u6210"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_button, {
                                              icon: unref(magic_stick_default),
                                              onClick: generateRandomCode,
                                              title: "\u968F\u673A\u751F\u6210"
                                            }, null, 8, ["icon"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: customCode.value,
                                        "onUpdate:modelValue": ($event) => customCode.value = $event,
                                        placeholder: "\u4F8B\u5982\uFF1AVIP888",
                                        "show-word-limit": "",
                                        maxlength: "20",
                                        clearable: ""
                                      }, {
                                        prefix: withCtx(() => [
                                          createTextVNode("#")
                                        ]),
                                        append: withCtx(() => [
                                          createVNode(_component_el_button, {
                                            icon: unref(magic_stick_default),
                                            onClick: generateRandomCode,
                                            title: "\u968F\u673A\u751F\u6210"
                                          }, null, 8, ["icon"])
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u6700\u5927\u4F7F\u7528\u6B21\u6570" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input_number, {
                                      modelValue: usageLimit.value,
                                      "onUpdate:modelValue": ($event) => usageLimit.value = $event,
                                      min: 1,
                                      max: 1e5,
                                      style: { "width": "100%" }
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="form-help" data-v-b9b2ddbe${_scopeId5}>\u9650\u5236\u8BE5\u7801\u603B\u5171\u53EF\u88AB\u5151\u6362\u591A\u5C11\u6B21</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_input_number, {
                                        modelValue: usageLimit.value,
                                        "onUpdate:modelValue": ($event) => usageLimit.value = $event,
                                        min: 1,
                                        max: 1e5,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-help" }, "\u9650\u5236\u8BE5\u7801\u603B\u5171\u53EF\u88AB\u5151\u6362\u591A\u5C11\u6B21")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "\u81EA\u5B9A\u4E49\u5151\u6362\u7801" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: customCode.value,
                                      "onUpdate:modelValue": ($event) => customCode.value = $event,
                                      placeholder: "\u4F8B\u5982\uFF1AVIP888",
                                      "show-word-limit": "",
                                      maxlength: "20",
                                      clearable: ""
                                    }, {
                                      prefix: withCtx(() => [
                                        createTextVNode("#")
                                      ]),
                                      append: withCtx(() => [
                                        createVNode(_component_el_button, {
                                          icon: unref(magic_stick_default),
                                          onClick: generateRandomCode,
                                          title: "\u968F\u673A\u751F\u6210"
                                        }, null, 8, ["icon"])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "\u6700\u5927\u4F7F\u7528\u6B21\u6570" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: usageLimit.value,
                                      "onUpdate:modelValue": ($event) => usageLimit.value = $event,
                                      min: 1,
                                      max: 1e5,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-help" }, "\u9650\u5236\u8BE5\u7801\u603B\u5171\u53EF\u88AB\u5151\u6362\u591A\u5C11\u6B21")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "tab-content" }, [
                            createVNode("p", { class: "desc" }, "\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9A\u7684\u5151\u6362\u7801\uFF08\u5982 VIP888\uFF09\uFF0C\u53EF\u591A\u4EBA\u4F7F\u7528\u6216\u5355\u4EBA\u591A\u6B21\u4F7F\u7528\uFF0C\u76F4\u5230\u8FBE\u5230\u603B\u6B21\u6570\u9650\u5236\u3002"),
                            createVNode(_component_el_form, { "label-position": "top" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u81EA\u5B9A\u4E49\u5151\u6362\u7801" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: customCode.value,
                                      "onUpdate:modelValue": ($event) => customCode.value = $event,
                                      placeholder: "\u4F8B\u5982\uFF1AVIP888",
                                      "show-word-limit": "",
                                      maxlength: "20",
                                      clearable: ""
                                    }, {
                                      prefix: withCtx(() => [
                                        createTextVNode("#")
                                      ]),
                                      append: withCtx(() => [
                                        createVNode(_component_el_button, {
                                          icon: unref(magic_stick_default),
                                          onClick: generateRandomCode,
                                          title: "\u968F\u673A\u751F\u6210"
                                        }, null, 8, ["icon"])
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "\u6700\u5927\u4F7F\u7528\u6B21\u6570" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: usageLimit.value,
                                      "onUpdate:modelValue": ($event) => usageLimit.value = $event,
                                      min: 1,
                                      max: 1e5,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-help" }, "\u9650\u5236\u8BE5\u7801\u603B\u5171\u53EF\u88AB\u5151\u6362\u591A\u5C11\u6B21")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tab_pane, {
                      label: "\u6279\u91CF\u968F\u673A\u751F\u6210",
                      name: "random"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "tab-content" }, [
                          createVNode("p", { class: "desc" }, "\u7CFB\u7EDF\u5C06\u81EA\u52A8\u751F\u6210\u6307\u5B9A\u6570\u91CF\u7684\u552F\u4E00\u5151\u6362\u7801\uFF08\u5982 X7A9-B2C1\uFF09\uFF0C\u6BCF\u4E2A\u7801\u4EC5\u9650\u4F7F\u7528\u4E00\u6B21\u3002"),
                          createVNode(_component_el_form, { "label-position": "top" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u751F\u6210\u6570\u91CF" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: quantity.value,
                                    "onUpdate:modelValue": ($event) => quantity.value = $event,
                                    min: 1,
                                    max: 1e3,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_tab_pane, {
                      label: "\u521B\u5EFA\u901A\u7528\u7801",
                      name: "universal"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "tab-content" }, [
                          createVNode("p", { class: "desc" }, "\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9A\u7684\u5151\u6362\u7801\uFF08\u5982 VIP888\uFF09\uFF0C\u53EF\u591A\u4EBA\u4F7F\u7528\u6216\u5355\u4EBA\u591A\u6B21\u4F7F\u7528\uFF0C\u76F4\u5230\u8FBE\u5230\u603B\u6B21\u6570\u9650\u5236\u3002"),
                          createVNode(_component_el_form, { "label-position": "top" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u81EA\u5B9A\u4E49\u5151\u6362\u7801" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: customCode.value,
                                    "onUpdate:modelValue": ($event) => customCode.value = $event,
                                    placeholder: "\u4F8B\u5982\uFF1AVIP888",
                                    "show-word-limit": "",
                                    maxlength: "20",
                                    clearable: ""
                                  }, {
                                    prefix: withCtx(() => [
                                      createTextVNode("#")
                                    ]),
                                    append: withCtx(() => [
                                      createVNode(_component_el_button, {
                                        icon: unref(magic_stick_default),
                                        onClick: generateRandomCode,
                                        title: "\u968F\u673A\u751F\u6210"
                                      }, null, 8, ["icon"])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "\u6700\u5927\u4F7F\u7528\u6B21\u6570" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: usageLimit.value,
                                    "onUpdate:modelValue": ($event) => usageLimit.value = $event,
                                    min: 1,
                                    max: 1e5,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-help" }, "\u9650\u5236\u8BE5\u7801\u603B\u5171\u53EF\u88AB\u5151\u6362\u591A\u5C11\u6B21")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
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
              __props.coupon ? (openBlock(), createBlock("div", {
                key: 0,
                class: "coupon-info"
              }, [
                createVNode("div", { class: "info-label" }, "\u5F53\u524D\u4F18\u60E0\u5238\uFF1A"),
                createVNode("div", { class: "info-value" }, toDisplayString(__props.coupon.name), 1)
              ])) : createCommentVNode("", true),
              createVNode(_component_el_tabs, {
                modelValue: activeTab.value,
                "onUpdate:modelValue": ($event) => activeTab.value = $event,
                class: "generator-tabs"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_tab_pane, {
                    label: "\u6279\u91CF\u968F\u673A\u751F\u6210",
                    name: "random"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "tab-content" }, [
                        createVNode("p", { class: "desc" }, "\u7CFB\u7EDF\u5C06\u81EA\u52A8\u751F\u6210\u6307\u5B9A\u6570\u91CF\u7684\u552F\u4E00\u5151\u6362\u7801\uFF08\u5982 X7A9-B2C1\uFF09\uFF0C\u6BCF\u4E2A\u7801\u4EC5\u9650\u4F7F\u7528\u4E00\u6B21\u3002"),
                        createVNode(_component_el_form, { "label-position": "top" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u751F\u6210\u6570\u91CF" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: quantity.value,
                                  "onUpdate:modelValue": ($event) => quantity.value = $event,
                                  min: 1,
                                  max: 1e3,
                                  style: { "width": "100%" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_tab_pane, {
                    label: "\u521B\u5EFA\u901A\u7528\u7801",
                    name: "universal"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "tab-content" }, [
                        createVNode("p", { class: "desc" }, "\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9A\u7684\u5151\u6362\u7801\uFF08\u5982 VIP888\uFF09\uFF0C\u53EF\u591A\u4EBA\u4F7F\u7528\u6216\u5355\u4EBA\u591A\u6B21\u4F7F\u7528\uFF0C\u76F4\u5230\u8FBE\u5230\u603B\u6B21\u6570\u9650\u5236\u3002"),
                        createVNode(_component_el_form, { "label-position": "top" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "\u81EA\u5B9A\u4E49\u5151\u6362\u7801" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: customCode.value,
                                  "onUpdate:modelValue": ($event) => customCode.value = $event,
                                  placeholder: "\u4F8B\u5982\uFF1AVIP888",
                                  "show-word-limit": "",
                                  maxlength: "20",
                                  clearable: ""
                                }, {
                                  prefix: withCtx(() => [
                                    createTextVNode("#")
                                  ]),
                                  append: withCtx(() => [
                                    createVNode(_component_el_button, {
                                      icon: unref(magic_stick_default),
                                      onClick: generateRandomCode,
                                      title: "\u968F\u673A\u751F\u6210"
                                    }, null, 8, ["icon"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "\u6700\u5927\u4F7F\u7528\u6B21\u6570" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input_number, {
                                  modelValue: usageLimit.value,
                                  "onUpdate:modelValue": ($event) => usageLimit.value = $event,
                                  min: 1,
                                  max: 1e5,
                                  style: { "width": "100%" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-help" }, "\u9650\u5236\u8BE5\u7801\u603B\u5171\u53EF\u88AB\u5151\u6362\u591A\u5C11\u6B21")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/CouponCodeGenerator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CouponCodeGenerator = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b9b2ddbe"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CouponCodeDrawer",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    couponId: {},
    couponName: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = ref(false);
    const list = ref([]);
    const loading = ref(false);
    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(20);
    const selectedIds = ref([]);
    const { copy } = useClipboard();
    watch(() => props.modelValue, (val) => {
      visible.value = val;
      if (val && props.couponId) {
        loadData();
      }
    });
    watch(visible, (val) => {
      emit("update:modelValue", val);
    });
    const loadData = async () => {
      if (!props.couponId) return;
      loading.value = true;
      selectedIds.value = [];
      try {
        const res = await adminCouponApi.getCouponCodes(props.couponId, {
          page: page.value,
          size: pageSize.value,
          status: "available"
          // 只查询可使用状态
        });
        if (res.success) {
          list.value = res.codes;
          total.value = res.total;
        } else {
          ElMessage.error(res.error || "\u52A0\u8F7D\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u7F51\u7EDC\u5F02\u5E38");
      } finally {
        loading.value = false;
      }
    };
    const handleSelectionChange = (selection) => {
      selectedIds.value = selection.map((s) => s.id);
    };
    const copyCode = (code) => {
      copy(code);
      ElMessage.success("\u5DF2\u590D\u5236");
    };
    const batchCopy = () => {
      const codes = list.value.filter((item) => selectedIds.value.includes(item.id)).map((item) => item.code).join("\n");
      copy(codes);
      ElMessage.success(`\u5DF2\u590D\u5236 ${selectedIds.value.length} \u4E2A\u5151\u6362\u7801`);
    };
    const deleteSingle = async (id) => {
      try {
        await ElMessageBox.confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u5151\u6362\u7801\u5417\uFF1F", "\u5220\u9664\u786E\u8BA4", { type: "warning" });
        const res = await adminCouponApi.deleteCouponCodes([id]);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
          loadData();
        } else {
          ElMessage.error(res.error || "\u5220\u9664\u5931\u8D25");
        }
      } catch (e) {
      }
    };
    const batchDelete = async () => {
      try {
        await ElMessageBox.confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9009\u4E2D\u7684 ${selectedIds.value.length} \u4E2A\u5151\u6362\u7801\u5417\uFF1F`, "\u6279\u91CF\u5220\u9664", { type: "warning" });
        const res = await adminCouponApi.deleteCouponCodes(selectedIds.value);
        if (res.success) {
          ElMessage.success(`\u6210\u529F\u5220\u9664 ${res.count} \u4E2A\u5151\u6362\u7801`);
          loadData();
        } else {
          ElMessage.error(res.error || "\u5220\u9664\u5931\u8D25");
        }
      } catch (e) {
      }
    };
    const formatDate = (d) => {
      if (!d) return "-";
      return dayjs(d).format("YYYY-MM-DD HH:mm:ss");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_drawer = ElDrawer;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_icon = ElIcon;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_drawer, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: `\u5151\u6362\u7801\u5217\u8868 - ${__props.couponName}`,
        size: "800px",
        "destroy-on-close": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="code-list-container" data-v-4d3ad756${_scopeId}><div class="toolbar" data-v-4d3ad756${_scopeId}><div class="toolbar-left" data-v-4d3ad756${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(document_copy_default),
              onClick: batchCopy,
              disabled: selectedIds.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u6279\u91CF\u590D\u5236 (${ssrInterpolate(selectedIds.value.length)}) `);
                } else {
                  return [
                    createTextVNode(" \u6279\u91CF\u590D\u5236 (" + toDisplayString(selectedIds.value.length) + ") ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "danger",
              icon: unref(delete_default),
              onClick: batchDelete,
              disabled: selectedIds.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u6279\u91CF\u5220\u9664 `);
                } else {
                  return [
                    createTextVNode(" \u6279\u91CF\u5220\u9664 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              circle: "",
              onClick: loadData
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: list.value,
              border: "",
              stripe: "",
              height: "calc(100vh - 200px)",
              onSelectionChange: handleSelectionChange
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    type: "selection",
                    width: "55"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "code",
                    label: "\u5151\u6362\u7801",
                    width: "200"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="code-text" data-v-4d3ad756${_scopeId3}>${ssrInterpolate(row.code)} `);
                        _push4(ssrRenderComponent(_component_el_icon, {
                          class: "copy-icon",
                          onClick: ($event) => copyCode(row.code)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(copy_document_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(copy_document_default))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "code-text" }, [
                            createTextVNode(toDisplayString(row.code) + " ", 1),
                            createVNode(_component_el_icon, {
                              class: "copy-icon",
                              onClick: ($event) => copyCode(row.code)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(copy_document_default))
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u4F7F\u7528\u6B21\u6570",
                    width: "120",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.used_count)} / ${ssrInterpolate(row.max_usage)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.used_count) + " / " + toDisplayString(row.max_usage), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u751F\u6210\u65F6\u95F4",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatDate(row.created_at))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "danger",
                          size: "small",
                          text: "",
                          onClick: ($event) => deleteSingle(row.id)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u5220\u9664`);
                            } else {
                              return [
                                createTextVNode("\u5220\u9664")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "danger",
                            size: "small",
                            text: "",
                            onClick: ($event) => deleteSingle(row.id)
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      type: "selection",
                      width: "55"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "code",
                      label: "\u5151\u6362\u7801",
                      width: "200"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { class: "code-text" }, [
                          createTextVNode(toDisplayString(row.code) + " ", 1),
                          createVNode(_component_el_icon, {
                            class: "copy-icon",
                            onClick: ($event) => copyCode(row.code)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(copy_document_default))
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u4F7F\u7528\u6B21\u6570",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(row.used_count) + " / " + toDisplayString(row.max_usage), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u751F\u6210\u65F6\u95F4",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          type: "danger",
                          size: "small",
                          text: "",
                          onClick: ($event) => deleteSingle(row.id)
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
            }, _parent2, _scopeId));
            _push2(`<div class="pagination-footer" data-v-4d3ad756${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              "current-page": page.value,
              "onUpdate:currentPage": ($event) => page.value = $event,
              "page-size": pageSize.value,
              "onUpdate:pageSize": ($event) => pageSize.value = $event,
              total: total.value,
              "page-sizes": [20, 50, 100],
              layout: "total, sizes, prev, pager, next",
              onSizeChange: loadData,
              onCurrentChange: loadData
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "code-list-container" }, [
                createVNode("div", { class: "toolbar" }, [
                  createVNode("div", { class: "toolbar-left" }, [
                    createVNode(_component_el_button, {
                      type: "primary",
                      icon: unref(document_copy_default),
                      onClick: batchCopy,
                      disabled: selectedIds.value.length === 0
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u6279\u91CF\u590D\u5236 (" + toDisplayString(selectedIds.value.length) + ") ", 1)
                      ]),
                      _: 1
                    }, 8, ["icon", "disabled"]),
                    createVNode(_component_el_button, {
                      type: "danger",
                      icon: unref(delete_default),
                      onClick: batchDelete,
                      disabled: selectedIds.value.length === 0
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u6279\u91CF\u5220\u9664 ")
                      ]),
                      _: 1
                    }, 8, ["icon", "disabled"])
                  ]),
                  createVNode(_component_el_button, {
                    icon: unref(refresh_default),
                    circle: "",
                    onClick: loadData
                  }, null, 8, ["icon"])
                ]),
                withDirectives((openBlock(), createBlock(_component_el_table, {
                  data: list.value,
                  border: "",
                  stripe: "",
                  height: "calc(100vh - 200px)",
                  onSelectionChange: handleSelectionChange
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      type: "selection",
                      width: "55"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "code",
                      label: "\u5151\u6362\u7801",
                      width: "200"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { class: "code-text" }, [
                          createTextVNode(toDisplayString(row.code) + " ", 1),
                          createVNode(_component_el_icon, {
                            class: "copy-icon",
                            onClick: ($event) => copyCode(row.code)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(copy_document_default))
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u4F7F\u7528\u6B21\u6570",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(row.used_count) + " / " + toDisplayString(row.max_usage), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u751F\u6210\u65F6\u95F4",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          type: "danger",
                          size: "small",
                          text: "",
                          onClick: ($event) => deleteSingle(row.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u5220\u9664")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [_directive_loading, loading.value]
                ]),
                createVNode("div", { class: "pagination-footer" }, [
                  createVNode(_component_el_pagination, {
                    "current-page": page.value,
                    "onUpdate:currentPage": ($event) => page.value = $event,
                    "page-size": pageSize.value,
                    "onUpdate:pageSize": ($event) => pageSize.value = $event,
                    total: total.value,
                    "page-sizes": [20, 50, 100],
                    layout: "total, sizes, prev, pager, next",
                    onSizeChange: loadData,
                    onCurrentChange: loadData
                  }, null, 8, ["current-page", "onUpdate:currentPage", "page-size", "onUpdate:pageSize", "total"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/coupon/CouponCodeDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CouponCodeDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4d3ad756"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CouponCodeEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    coupon: {}
  },
  emits: ["update:modelValue", "saved"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const codeValue = ref("");
    const saving = ref(false);
    watch(() => props.coupon, (newCoupon) => {
      codeValue.value = (newCoupon == null ? void 0 : newCoupon.code) || "";
    }, { immediate: true });
    const handleSave = async () => {
      if (!props.coupon) return;
      saving.value = true;
      try {
        const res = await adminApi.coupon.updateCouponCode(props.coupon.id, codeValue.value);
        if (res.success) {
          ElMessage.success("\u4FDD\u5B58\u6210\u529F");
          emit("update:modelValue", false);
          emit("saved");
        } else {
          ElMessage.error(res.error || "\u4FDD\u5B58\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u4FDD\u5B58\u5F02\u5E38");
      } finally {
        saving.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        "model-value": __props.modelValue,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:modelValue", $event),
        title: "\u7F16\u8F91\u4F18\u60E0\u5238\u8BF4\u660E",
        width: "500px",
        "destroy-on-close": ""
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => _ctx.$emit("update:modelValue", false)
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
              loading: saving.value,
              onClick: handleSave
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
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: ($event) => _ctx.$emit("update:modelValue", false)
              }, {
                default: withCtx(() => [
                  createTextVNode("\u53D6\u6D88")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                loading: saving.value,
                onClick: handleSave
              }, {
                default: withCtx(() => [
                  createTextVNode("\u4FDD\u5B58")
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u4F18\u60E0\u5238\u540D\u79F0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          "model-value": (_a = __props.coupon) == null ? void 0 : _a.name,
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            "model-value": (_b = __props.coupon) == null ? void 0 : _b.name,
                            disabled: ""
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u4F7F\u7528\u8BF4\u660E" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: codeValue.value,
                          "onUpdate:modelValue": ($event) => codeValue.value = $event,
                          type: "textarea",
                          rows: 4,
                          placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u5238\u4F7F\u7528\u8BF4\u660E\uFF0C\u5982\uFF1A\u4EC5\u9650\u65B0\u7528\u6237\u4F7F\u7528\u3001\u9650\u8D2D1\u6B21\u7B49"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: codeValue.value,
                            "onUpdate:modelValue": ($event) => codeValue.value = $event,
                            type: "textarea",
                            rows: 4,
                            placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u5238\u4F7F\u7528\u8BF4\u660E\uFF0C\u5982\uFF1A\u4EC5\u9650\u65B0\u7528\u6237\u4F7F\u7528\u3001\u9650\u8D2D1\u6B21\u7B49"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "\u4F18\u60E0\u5238\u540D\u79F0" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(_component_el_input, {
                            "model-value": (_a = __props.coupon) == null ? void 0 : _a.name,
                            disabled: ""
                          }, null, 8, ["model-value"])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u4F7F\u7528\u8BF4\u660E" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: codeValue.value,
                          "onUpdate:modelValue": ($event) => codeValue.value = $event,
                          type: "textarea",
                          rows: 4,
                          placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u5238\u4F7F\u7528\u8BF4\u660E\uFF0C\u5982\uFF1A\u4EC5\u9650\u65B0\u7528\u6237\u4F7F\u7528\u3001\u9650\u8D2D1\u6B21\u7B49"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              createVNode(_component_el_form, { "label-position": "top" }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "\u4F18\u60E0\u5238\u540D\u79F0" }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(_component_el_input, {
                          "model-value": (_a = __props.coupon) == null ? void 0 : _a.name,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u4F7F\u7528\u8BF4\u660E" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: codeValue.value,
                        "onUpdate:modelValue": ($event) => codeValue.value = $event,
                        type: "textarea",
                        rows: 4,
                        placeholder: "\u8BF7\u8F93\u5165\u4F18\u60E0\u5238\u4F7F\u7528\u8BF4\u660E\uFF0C\u5982\uFF1A\u4EC5\u9650\u65B0\u7528\u6237\u4F7F\u7528\u3001\u9650\u8D2D1\u6B21\u7B49"
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/coupon/CouponCodeEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { CouponCodeGenerator as C, _sfc_main as _, CouponCodeDrawer as a };
//# sourceMappingURL=CouponCodeEditor-D8PjCuky.mjs.map
