import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { E as ElCard } from "./index-9Hs_9io2.js";
import { E as ElRow, a as ElCol } from "./index-27bUWc4s.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElDatePicker } from "./index-xXDjrfd3.js";
import { a as ElCheckbox } from "./index-BlpH41lu.js";
import { E as ElDivider } from "./index-QnhSR2oe.js";
import { E as ElSwitch } from "./index-_GccYHgs.js";
import { ah as ElMessage, _ as _export_sfc } from "../server.mjs";
/* empty css                      */
/* empty css                 */
/* empty css                */
/* empty css                  */
/* empty css                         */
/* empty css                              */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                     */
/* empty css                    */
/* empty css                   */
import { defineComponent, ref, computed, reactive, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { S as StickyFormHeader } from "./StickyFormHeader-BS1LLrOp.js";
import { b as adminApi } from "./admin-supabase-nszo-IoU.js";
import "lodash-unified";
import "./constants-hAKFmBbq.js";
import "@vue/shared";
import "./use-form-common-props-DlCG9pC5.js";
import "async-validator";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "./event-BZTOGHfp.js";
import "./index-ClPmkyX9.js";
import "./aria-B8G3G_75.js";
import "./index-DOE061f1.js";
import "dayjs/plugin/customParseFormat.js";
import "dayjs/plugin/advancedFormat.js";
import "dayjs/plugin/localeData.js";
import "dayjs/plugin/weekOfYear.js";
import "dayjs/plugin/weekYear.js";
import "dayjs/plugin/dayOfYear.js";
import "dayjs/plugin/isSameOrAfter.js";
import "dayjs/plugin/isSameOrBefore.js";
import "./index-DR2tYDZ3.js";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./index-D_b573Qt.js";
import "./index-DCrMmn3b.js";
import "./validator-T0bsmJHo.js";
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
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
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
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: "",
      totalQuantity: 1e3,
      status: true
    });
    const rules = {
      name: [{ required: true, message: "请输入优惠券名称", trigger: "blur" }],
      value: [{ required: true, message: "请输入赠送金额", trigger: "blur" }]
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
            ElMessage.warning("请选择结束日期");
            return;
          }
          submitting.value = true;
          try {
            const payload = {
              name: form.name,
              type: "balance",
              value: form.value,
              product_ids: [],
              min_usage: 0,
              total_quantity: 0,
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
              ElMessage.success(isEdit.value ? "更新成功" : "创建成功");
              router.back();
            } else {
              ElMessage.error(res.error || "保存失败");
            }
          } catch (e) {
            ElMessage.error("保存异常");
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
      const _component_el_date_picker = ElDatePicker;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_divider = ElDivider;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-post-page" }, _attrs))} data-v-84cbc459>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: isEdit.value ? "编辑额度券" : "新增额度券",
        "sub-title": isEdit.value ? "修改额度券信息" : "创建一个新的余额充值券",
        "submit-text": isEdit.value ? "保存" : "新增",
        loading: submitting.value,
        onSubmit: handleSubmit,
        onCancel: ($event) => unref(router).back(),
        onBack: ($event) => unref(router).back()
      }, null, _parent));
      _push(`<div class="form-content" data-v-84cbc459>`);
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
                  _push3(`<div class="card-header" data-v-84cbc459${_scopeId2}><span data-v-84cbc459${_scopeId2}>基础信息</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "基础信息")
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
                                label: "优惠券名称",
                                prop: "name"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: form.name,
                                      "onUpdate:modelValue": ($event) => form.name = $event,
                                      placeholder: "例如：新用户首充福利"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: form.name,
                                        "onUpdate:modelValue": ($event) => form.name = $event,
                                        placeholder: "例如：新用户首充福利"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "优惠券名称",
                                  prop: "name"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: form.name,
                                      "onUpdate:modelValue": ($event) => form.name = $event,
                                      placeholder: "例如：新用户首充福利"
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
                                label: "优惠券名称",
                                prop: "name"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: form.name,
                                    "onUpdate:modelValue": ($event) => form.name = $event,
                                    placeholder: "例如：新用户首充福利"
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
                        _push4(ssrRenderComponent(_component_el_col, { span: 12 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "赠送余额 (元)",
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
                                          _push7(`¥`);
                                        } else {
                                          return [
                                            createTextVNode("¥")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="form-tip" data-v-84cbc459${_scopeId5}>用户领券后直接增加到账户余额的金额</div>`);
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
                                          createTextVNode("¥")
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-tip" }, "用户领券后直接增加到账户余额的金额")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, {
                                  label: "赠送余额 (元)",
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
                                        createTextVNode("¥")
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-tip" }, "用户领券后直接增加到账户余额的金额")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_col, { span: 12 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "有效期" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="date-picker-wrapper" data-v-84cbc459${_scopeId5}>`);
                                    if (!isUnlimitedDate.value) {
                                      _push6(`<div class="date-text" data-v-84cbc459${_scopeId5}><span class="label" data-v-84cbc459${_scopeId5}>开始：</span><span class="value" data-v-84cbc459${_scopeId5}>${ssrInterpolate(formatDate(form.startDate))}</span></div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    if (!isUnlimitedDate.value) {
                                      _push6(ssrRenderComponent(_component_el_date_picker, {
                                        modelValue: form.endDate,
                                        "onUpdate:modelValue": ($event) => form.endDate = $event,
                                        type: "date",
                                        placeholder: "选择结束日期",
                                        "value-format": "YYYY-MM-DD",
                                        style: { "flex": "1", "margin": "0 12px" },
                                        "disabled-date": disabledDate
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(_component_el_checkbox, {
                                      modelValue: isUnlimitedDate.value,
                                      "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                                      label: "永久有效",
                                      border: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                    if (!isUnlimitedDate.value) {
                                      _push6(`<div class="form-tip" data-v-84cbc459${_scopeId5}>默认从今日开始生效，请选择截止日期</div>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      createVNode("div", { class: "date-picker-wrapper" }, [
                                        !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "date-text"
                                        }, [
                                          createVNode("span", { class: "label" }, "开始："),
                                          createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                                        ])) : createCommentVNode("", true),
                                        !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                                          key: 1,
                                          modelValue: form.endDate,
                                          "onUpdate:modelValue": ($event) => form.endDate = $event,
                                          type: "date",
                                          placeholder: "选择结束日期",
                                          "value-format": "YYYY-MM-DD",
                                          style: { "flex": "1", "margin": "0 12px" },
                                          "disabled-date": disabledDate
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                        createVNode(_component_el_checkbox, {
                                          modelValue: isUnlimitedDate.value,
                                          "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                                          label: "永久有效",
                                          border: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "form-tip"
                                      }, "默认从今日开始生效，请选择截止日期")) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "有效期" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "date-picker-wrapper" }, [
                                      !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "date-text"
                                      }, [
                                        createVNode("span", { class: "label" }, "开始："),
                                        createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                                      ])) : createCommentVNode("", true),
                                      !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                                        key: 1,
                                        modelValue: form.endDate,
                                        "onUpdate:modelValue": ($event) => form.endDate = $event,
                                        type: "date",
                                        placeholder: "选择结束日期",
                                        "value-format": "YYYY-MM-DD",
                                        style: { "flex": "1", "margin": "0 12px" },
                                        "disabled-date": disabledDate
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                      createVNode(_component_el_checkbox, {
                                        modelValue: isUnlimitedDate.value,
                                        "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                                        label: "永久有效",
                                        border: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "form-tip"
                                    }, "默认从今日开始生效，请选择截止日期")) : createCommentVNode("", true)
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
                                label: "赠送余额 (元)",
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
                                      createTextVNode("¥")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-tip" }, "用户领券后直接增加到账户余额的金额")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "有效期" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "date-picker-wrapper" }, [
                                    !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "date-text"
                                    }, [
                                      createVNode("span", { class: "label" }, "开始："),
                                      createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                                    ])) : createCommentVNode("", true),
                                    !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                                      key: 1,
                                      modelValue: form.endDate,
                                      "onUpdate:modelValue": ($event) => form.endDate = $event,
                                      type: "date",
                                      placeholder: "选择结束日期",
                                      "value-format": "YYYY-MM-DD",
                                      style: { "flex": "1", "margin": "0 12px" },
                                      "disabled-date": disabledDate
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                    createVNode(_component_el_checkbox, {
                                      modelValue: isUnlimitedDate.value,
                                      "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                                      label: "永久有效",
                                      border: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "form-tip"
                                  }, "默认从今日开始生效，请选择截止日期")) : createCommentVNode("", true)
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
                        _push4(`发放规则`);
                      } else {
                        return [
                          createTextVNode("发放规则")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "状态",
                    prop: "status"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event,
                          "active-text": "立即启用",
                          "inactive-text": "暂不启用"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: form.status,
                            "onUpdate:modelValue": ($event) => form.status = $event,
                            "active-text": "立即启用",
                            "inactive-text": "暂不启用"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              label: "优惠券名称",
                              prop: "name"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: form.name,
                                  "onUpdate:modelValue": ($event) => form.name = $event,
                                  placeholder: "例如：新用户首充福利"
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
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, {
                              label: "赠送余额 (元)",
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
                                    createTextVNode("¥")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-tip" }, "用户领券后直接增加到账户余额的金额")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "有效期" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "date-picker-wrapper" }, [
                                  !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "date-text"
                                  }, [
                                    createVNode("span", { class: "label" }, "开始："),
                                    createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                                  ])) : createCommentVNode("", true),
                                  !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                                    key: 1,
                                    modelValue: form.endDate,
                                    "onUpdate:modelValue": ($event) => form.endDate = $event,
                                    type: "date",
                                    placeholder: "选择结束日期",
                                    "value-format": "YYYY-MM-DD",
                                    style: { "flex": "1", "margin": "0 12px" },
                                    "disabled-date": disabledDate
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                  createVNode(_component_el_checkbox, {
                                    modelValue: isUnlimitedDate.value,
                                    "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                                    label: "永久有效",
                                    border: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "form-tip"
                                }, "默认从今日开始生效，请选择截止日期")) : createCommentVNode("", true)
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
                        createTextVNode("发放规则")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "状态",
                      prop: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event,
                          "active-text": "立即启用",
                          "inactive-text": "暂不启用"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(`<div class="card-header" data-v-84cbc459${_scopeId2}><span data-v-84cbc459${_scopeId2}>效果预览</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "效果预览")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="preview-container" data-v-84cbc459${_scopeId2}><div class="coupon-ticket" data-v-84cbc459${_scopeId2}><div class="ticket-left" data-v-84cbc459${_scopeId2}><div class="ticket-amount" data-v-84cbc459${_scopeId2}>¥${ssrInterpolate(form.value || "0")}</div><div class="ticket-label" data-v-84cbc459${_scopeId2}>余额红包</div></div><div class="ticket-right" data-v-84cbc459${_scopeId2}><div class="ticket-name" data-v-84cbc459${_scopeId2}>${ssrInterpolate(form.name || "优惠券名称")}</div><div class="ticket-date" data-v-84cbc459${_scopeId2}>${ssrInterpolate(isUnlimitedDate.value ? "永久有效" : `${formatDate(form.startDate)} 至 ${form.endDate || "?"}`)}</div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "preview-container" }, [
                      createVNode("div", { class: "coupon-ticket" }, [
                        createVNode("div", { class: "ticket-left" }, [
                          createVNode("div", { class: "ticket-amount" }, "¥" + toDisplayString(form.value || "0"), 1),
                          createVNode("div", { class: "ticket-label" }, "余额红包")
                        ]),
                        createVNode("div", { class: "ticket-right" }, [
                          createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "优惠券名称"), 1),
                          createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "永久有效" : `${formatDate(form.startDate)} 至 ${form.endDate || "?"}`), 1)
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
                    createVNode("span", null, "基础信息")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_row, { gutter: 24 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "优惠券名称",
                            prop: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.name,
                                "onUpdate:modelValue": ($event) => form.name = $event,
                                placeholder: "例如：新用户首充福利"
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
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "赠送余额 (元)",
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
                                  createTextVNode("¥")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "form-tip" }, "用户领券后直接增加到账户余额的金额")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "有效期" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "date-picker-wrapper" }, [
                                !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "date-text"
                                }, [
                                  createVNode("span", { class: "label" }, "开始："),
                                  createVNode("span", { class: "value" }, toDisplayString(formatDate(form.startDate)), 1)
                                ])) : createCommentVNode("", true),
                                !isUnlimitedDate.value ? (openBlock(), createBlock(_component_el_date_picker, {
                                  key: 1,
                                  modelValue: form.endDate,
                                  "onUpdate:modelValue": ($event) => form.endDate = $event,
                                  type: "date",
                                  placeholder: "选择结束日期",
                                  "value-format": "YYYY-MM-DD",
                                  style: { "flex": "1", "margin": "0 12px" },
                                  "disabled-date": disabledDate
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                createVNode(_component_el_checkbox, {
                                  modelValue: isUnlimitedDate.value,
                                  "onUpdate:modelValue": ($event) => isUnlimitedDate.value = $event,
                                  label: "永久有效",
                                  border: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              !isUnlimitedDate.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "form-tip"
                              }, "默认从今日开始生效，请选择截止日期")) : createCommentVNode("", true)
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
                      createTextVNode("发放规则")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "状态",
                    prop: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: form.status,
                        "onUpdate:modelValue": ($event) => form.status = $event,
                        "active-text": "立即启用",
                        "inactive-text": "暂不启用"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode("span", null, "效果预览")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "preview-container" }, [
                    createVNode("div", { class: "coupon-ticket" }, [
                      createVNode("div", { class: "ticket-left" }, [
                        createVNode("div", { class: "ticket-amount" }, "¥" + toDisplayString(form.value || "0"), 1),
                        createVNode("div", { class: "ticket-label" }, "余额红包")
                      ]),
                      createVNode("div", { class: "ticket-right" }, [
                        createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "优惠券名称"), 1),
                        createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "永久有效" : `${formatDate(form.startDate)} 至 ${form.endDate || "?"}`), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/coupons/balance/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84cbc459"]]);
export {
  post as default
};
//# sourceMappingURL=post-zqo8v50D.js.map
