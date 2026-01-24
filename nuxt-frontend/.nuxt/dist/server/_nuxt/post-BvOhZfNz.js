import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { E as ElCard } from "./index-9Hs_9io2.js";
import { E as ElRow, a as ElCol } from "./index-27bUWc4s.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElDivider } from "./index-QnhSR2oe.js";
import { E as ElDatePicker } from "./index-xXDjrfd3.js";
import { a as ElCheckbox } from "./index-BlpH41lu.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { a as ElTable, E as ElTableColumn } from "./index-BB44-vTK.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { _ as _export_sfc, ah as ElMessage } from "../server.mjs";
/* empty css                      */
/* empty css                 */
/* empty css                */
/* empty css                  */
/* empty css                    */
/* empty css                              */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                     */
/* empty css                */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, useSSRContext, reactive, unref, createVNode, createTextVNode, createCommentVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { S as StickyFormHeader } from "./StickyFormHeader-BS1LLrOp.js";
import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
/* empty css                   */
import { a as adminProductApi, b as adminApi } from "./admin-supabase-nszo-IoU.js";
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
import "dayjs/plugin/customParseFormat.js";
import "dayjs/plugin/advancedFormat.js";
import "dayjs/plugin/localeData.js";
import "dayjs/plugin/weekOfYear.js";
import "dayjs/plugin/weekYear.js";
import "dayjs/plugin/dayOfYear.js";
import "dayjs/plugin/isSameOrAfter.js";
import "dayjs/plugin/isSameOrBefore.js";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./index-D_b573Qt.js";
import "./index-DOE061f1.js";
import "./index-DCrMmn3b.js";
import "./index-7IYgoTSU.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
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
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./vnode-D0IHQw_9.js";
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminSkuSelector",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    categories: {},
    products: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentCategoryId = ref("");
    const currentProductId = ref("");
    const currentBatchSkuIds = ref([]);
    const currentProductSkus = ref([]);
    const skuLoading = ref(false);
    const filteredProductList = computed(() => {
      if (!currentCategoryId.value) return props.products;
      return props.products.filter((p) => p.category_id === currentCategoryId.value);
    });
    const formatSkuName = (sku) => {
      let specText = "";
      if (sku.tag_name) {
        specText = sku.tag_name;
      } else if (sku.spec_combination && Object.keys(sku.spec_combination).length) {
        specText = Object.entries(sku.spec_combination).map(([key, val]) => `${key}:${val}`).join(" | ");
      } else {
        specText = "默认规格";
      }
      const priceText = sku.price !== void 0 ? ` (¥${sku.price})` : "";
      return specText + priceText;
    };
    const handleCategoryChange = () => {
      currentProductId.value = "";
      currentBatchSkuIds.value = [];
      currentProductSkus.value = [];
    };
    const handleProductChange = async (val) => {
      currentBatchSkuIds.value = [];
      currentProductSkus.value = [];
      if (!val) return;
      skuLoading.value = true;
      const res = await adminProductApi.getProductWithSkus(val);
      if (res.success && res.skus) {
        currentProductSkus.value = res.skus;
        const skuIdsInModel = new Set(props.modelValue.map((s) => s.id));
        currentBatchSkuIds.value = res.skus.filter((sku) => skuIdsInModel.has(sku.id)).map((sku) => sku.id);
      }
      skuLoading.value = false;
    };
    const handleSkuSelectionChange = () => {
      const currentProductSkuIds = new Set(currentProductSkus.value.map((s) => s.id));
      const otherProductItems = props.modelValue.filter((item) => !currentProductSkuIds.has(item.id));
      const currentProduct = props.products.find((p) => p.id === currentProductId.value);
      const newItems = currentBatchSkuIds.value.map((id) => {
        const sku = currentProductSkus.value.find((s) => s.id === id);
        if (!sku) return null;
        return {
          id: sku.id,
          productName: currentProduct?.product_name || "未知商品",
          spec: formatSkuName(sku)
        };
      }).filter(Boolean);
      emit("update:modelValue", [...otherProductItems, ...newItems]);
    };
    watch(() => props.modelValue, (newVal) => {
      if (currentProductSkus.value.length > 0) {
        const skuIdsInModel = new Set(newVal.map((s) => s.id));
        currentBatchSkuIds.value = currentProductSkus.value.filter((sku) => skuIdsInModel.has(sku.id)).map((sku) => sku.id);
      }
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-sku-selector" }, _attrs))} data-v-66238d5d><div class="selector-controls" data-v-66238d5d>`);
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: currentCategoryId.value,
        "onUpdate:modelValue": ($event) => currentCategoryId.value = $event,
        placeholder: "分类筛选",
        style: { "width": "140px" },
        clearable: "",
        onChange: handleCategoryChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.categories, (cat) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: cat.id,
                label: cat.name,
                value: cat.id
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
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
      }, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: currentProductId.value,
        "onUpdate:modelValue": ($event) => currentProductId.value = $event,
        placeholder: "选择商品",
        style: { "flex": "1", "margin": "0 12px" },
        filterable: "",
        disabled: !__props.categories.length && !__props.products.length,
        onChange: handleProductChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(filteredProductList.value, (prod) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: prod.id,
                label: prod.product_name,
                value: prod.id
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(filteredProductList.value, (prod) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: prod.id,
                  label: prod.product_name,
                  value: prod.id
                }, null, 8, ["label", "value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: currentBatchSkuIds.value,
        "onUpdate:modelValue": ($event) => currentBatchSkuIds.value = $event,
        placeholder: "选择 SKU (可多选)",
        style: { "flex": "1", "max-width": "400px", "margin-right": "12px" },
        loading: skuLoading.value,
        disabled: !currentProductId.value,
        multiple: "",
        "collapse-tags": "",
        "collapse-tags-tooltip": "",
        filterable: "",
        onChange: handleSkuSelectionChange,
        onRemoveTag: handleSkuSelectionChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(currentProductSkus.value, (sku) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: sku.id,
                label: formatSkuName(sku),
                value: sku.id
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(currentProductSkus.value, (sku) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: sku.id,
                  label: formatSkuName(sku),
                  value: sku.id
                }, null, 8, ["label", "value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminSkuSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminSkuSelector = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-66238d5d"]]);
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
    const categoryList = ref([]);
    const allProductList = ref([]);
    const form = reactive({
      name: "",
      value: 0,
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: "",
      skuInfos: [],
      totalQuantity: 1e3,
      status: true
    });
    const rules = {
      name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      value: [{ required: true, message: "请输入优惠金额", trigger: "blur" }]
    };
    const formatDate = (d) => dayjs(d).format("YYYY-MM-DD");
    const disabledDate = (time) => {
      return dayjs(time).isBefore(dayjs(), "day");
    };
    watch(isUnlimitedDate, (val) => {
      if (val) form.endDate = "";
    });
    const handleRemoveSku = (index) => {
      form.skuInfos.splice(index, 1);
    };
    const handleSubmit = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (valid) {
          if (form.skuInfos.length === 0) {
            ElMessage.warning("请至少添加一个关联商品 SKU");
            return;
          }
          if (!isUnlimitedDate.value && !form.endDate) {
            ElMessage.warning("请选择结束日期");
            return;
          }
          submitting.value = true;
          try {
            const payload = {
              name: form.name,
              type: "product",
              value: form.value,
              sku_ids: form.skuInfos.map((s) => s.id),
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
      const _component_el_divider = ElDivider;
      const _component_el_date_picker = ElDatePicker;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_tag = ElTag;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-post-page" }, _attrs))} data-v-9a907a68>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: isEdit.value ? "编辑商品券" : "新增商品券",
        "sub-title": isEdit.value ? "修改商品券信息" : "创建一个新的指定商品优惠券",
        "submit-text": isEdit.value ? "保存" : "新增",
        loading: submitting.value,
        onSubmit: handleSubmit,
        onCancel: ($event) => unref(router).back(),
        onBack: ($event) => unref(router).back()
      }, null, _parent));
      _push(`<div class="form-content" data-v-9a907a68>`);
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
                  _push3(`<div class="card-header" data-v-9a907a68${_scopeId2}><span data-v-9a907a68${_scopeId2}>基础信息</span></div>`);
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
                                      placeholder: "例如：iPhone 15 专属优惠券"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: form.name,
                                        "onUpdate:modelValue": ($event) => form.name = $event,
                                        placeholder: "例如：iPhone 15 专属优惠券"
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
                                      placeholder: "例如：iPhone 15 专属优惠券"
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
                                    placeholder: "例如：iPhone 15 专属优惠券"
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
                        _push4(`发放规则`);
                      } else {
                        return [
                          createTextVNode("发放规则")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "有效期" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="date-picker-wrapper" data-v-9a907a68${_scopeId3}>`);
                        if (!isUnlimitedDate.value) {
                          _push4(`<div class="date-text" data-v-9a907a68${_scopeId3}><span class="label" data-v-9a907a68${_scopeId3}>开始：</span><span class="value" data-v-9a907a68${_scopeId3}>${ssrInterpolate(formatDate(form.startDate))}</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (!isUnlimitedDate.value) {
                          _push4(ssrRenderComponent(_component_el_date_picker, {
                            modelValue: form.endDate,
                            "onUpdate:modelValue": ($event) => form.endDate = $event,
                            type: "date",
                            placeholder: "选择结束日期",
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
                          label: "永久有效",
                          border: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (!isUnlimitedDate.value) {
                          _push4(`<div class="form-tip" data-v-9a907a68${_scopeId3}>默认从今日开始生效，请选择截止日期</div>`);
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
                                  placeholder: "例如：iPhone 15 专属优惠券"
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
                        createTextVNode("发放规则")
                      ]),
                      _: 1
                    }),
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, {
              shadow: "never",
              class: "form-card"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-9a907a68${_scopeId2}><span data-v-9a907a68${_scopeId2}>关联商品 SKU</span>`);
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    size: "small",
                    style: { "margin-left": "8px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`购买指定 SKU 时可用`);
                      } else {
                        return [
                          createTextVNode("购买指定 SKU 时可用")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "关联商品 SKU"),
                      createVNode(_component_el_tag, {
                        type: "info",
                        size: "small",
                        style: { "margin-left": "8px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("购买指定 SKU 时可用")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="product-selector" data-v-9a907a68${_scopeId2}>`);
                  _push3(ssrRenderComponent(AdminSkuSelector, {
                    modelValue: form.skuInfos,
                    "onUpdate:modelValue": ($event) => form.skuInfos = $event,
                    categories: categoryList.value,
                    products: allProductList.value
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table, {
                    data: form.skuInfos,
                    style: { "width": "100%", "margin-top": "16px" },
                    border: "",
                    "empty-text": "暂无关联 SKU"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_table_column, {
                          prop: "productName",
                          label: "商品名称"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_table_column, {
                          prop: "spec",
                          label: "规格 (SKU)"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_table_column, {
                          label: "操作",
                          width: "100",
                          align: "center"
                        }, {
                          default: withCtx(({ $index }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_button, {
                                link: "",
                                type: "danger",
                                onClick: ($event) => handleRemoveSku($index)
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`移除`);
                                  } else {
                                    return [
                                      createTextVNode("移除")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_button, {
                                  link: "",
                                  type: "danger",
                                  onClick: ($event) => handleRemoveSku($index)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("移除")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_table_column, {
                            prop: "productName",
                            label: "商品名称"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "spec",
                            label: "规格 (SKU)"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "操作",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ $index }) => [
                              createVNode(_component_el_button, {
                                link: "",
                                type: "danger",
                                onClick: ($event) => handleRemoveSku($index)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("移除")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-selector" }, [
                      createVNode(AdminSkuSelector, {
                        modelValue: form.skuInfos,
                        "onUpdate:modelValue": ($event) => form.skuInfos = $event,
                        categories: categoryList.value,
                        products: allProductList.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "categories", "products"]),
                      createVNode(_component_el_table, {
                        data: form.skuInfos,
                        style: { "width": "100%", "margin-top": "16px" },
                        border: "",
                        "empty-text": "暂无关联 SKU"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            prop: "productName",
                            label: "商品名称"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "spec",
                            label: "规格 (SKU)"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "操作",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ $index }) => [
                              createVNode(_component_el_button, {
                                link: "",
                                type: "danger",
                                onClick: ($event) => handleRemoveSku($index)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("移除")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ])
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
                  _push3(`<div class="card-header" data-v-9a907a68${_scopeId2}><span data-v-9a907a68${_scopeId2}>效果预览</span></div>`);
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
                  _push3(`<div class="preview-container" data-v-9a907a68${_scopeId2}><div class="coupon-ticket product-ticket" data-v-9a907a68${_scopeId2}><div class="ticket-left" data-v-9a907a68${_scopeId2}><div class="ticket-amount" data-v-9a907a68${_scopeId2}><small data-v-9a907a68${_scopeId2}>¥</small>${ssrInterpolate(form.value || "0")}</div><div class="ticket-cond" data-v-9a907a68${_scopeId2}>指定商品</div></div><div class="ticket-right" data-v-9a907a68${_scopeId2}><div class="ticket-name" data-v-9a907a68${_scopeId2}>${ssrInterpolate(form.name || "优惠券名称")}</div><div class="ticket-date" data-v-9a907a68${_scopeId2}>${ssrInterpolate(isUnlimitedDate.value ? "永久有效" : `${formatDate(form.startDate)} 至 ${form.endDate || "?"}`)}</div><div class="ticket-btn" data-v-9a907a68${_scopeId2}>去购买</div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "preview-container" }, [
                      createVNode("div", { class: "coupon-ticket product-ticket" }, [
                        createVNode("div", { class: "ticket-left" }, [
                          createVNode("div", { class: "ticket-amount" }, [
                            createVNode("small", null, "¥"),
                            createTextVNode(toDisplayString(form.value || "0"), 1)
                          ]),
                          createVNode("div", { class: "ticket-cond" }, "指定商品")
                        ]),
                        createVNode("div", { class: "ticket-right" }, [
                          createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "优惠券名称"), 1),
                          createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "永久有效" : `${formatDate(form.startDate)} 至 ${form.endDate || "?"}`), 1),
                          createVNode("div", { class: "ticket-btn" }, "去购买")
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
                                placeholder: "例如：iPhone 15 专属优惠券"
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
                      createTextVNode("发放规则")
                    ]),
                    _: 1
                  }),
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
              }),
              createVNode(_component_el_card, {
                shadow: "never",
                class: "form-card"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "card-header" }, [
                    createVNode("span", null, "关联商品 SKU"),
                    createVNode(_component_el_tag, {
                      type: "info",
                      size: "small",
                      style: { "margin-left": "8px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("购买指定 SKU 时可用")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "product-selector" }, [
                    createVNode(AdminSkuSelector, {
                      modelValue: form.skuInfos,
                      "onUpdate:modelValue": ($event) => form.skuInfos = $event,
                      categories: categoryList.value,
                      products: allProductList.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "categories", "products"]),
                    createVNode(_component_el_table, {
                      data: form.skuInfos,
                      style: { "width": "100%", "margin-top": "16px" },
                      border: "",
                      "empty-text": "暂无关联 SKU"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          prop: "productName",
                          label: "商品名称"
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "spec",
                          label: "规格 (SKU)"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "操作",
                          width: "100",
                          align: "center"
                        }, {
                          default: withCtx(({ $index }) => [
                            createVNode(_component_el_button, {
                              link: "",
                              type: "danger",
                              onClick: ($event) => handleRemoveSku($index)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("移除")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data"])
                  ])
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
                    createVNode("div", { class: "coupon-ticket product-ticket" }, [
                      createVNode("div", { class: "ticket-left" }, [
                        createVNode("div", { class: "ticket-amount" }, [
                          createVNode("small", null, "¥"),
                          createTextVNode(toDisplayString(form.value || "0"), 1)
                        ]),
                        createVNode("div", { class: "ticket-cond" }, "指定商品")
                      ]),
                      createVNode("div", { class: "ticket-right" }, [
                        createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "优惠券名称"), 1),
                        createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "永久有效" : `${formatDate(form.startDate)} 至 ${form.endDate || "?"}`), 1),
                        createVNode("div", { class: "ticket-btn" }, "去购买")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/coupons/product/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a907a68"]]);
export {
  post as default
};
//# sourceMappingURL=post-BvOhZfNz.js.map
