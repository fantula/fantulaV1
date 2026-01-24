import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElRow, a as ElCol } from './index-27bUWc4s.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElDatePicker } from './index-0HXr9sq8.mjs';
import { E as ElCheckbox } from './index-DrPRyc7n.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { a as ElTable, E as ElTableColumn } from './index-KOxrtlML.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, computed, reactive, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import dayjs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/dayjs.min.js';
import { S as StickyFormHeader } from './StickyFormHeader-BS1LLrOp.mjs';
import { E as ElSelect, a as ElOption } from './index-Cf_t59lc.mjs';
import { b as adminApi, a as adminProductApi } from './admin-supabase-nszo-IoU.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/customParseFormat.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/advancedFormat.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/localeData.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/weekOfYear.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/weekYear.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/dayOfYear.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/isSameOrAfter.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/plugin/isSameOrBefore.js';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-D_b573Qt.mjs';
import './index-DOE061f1.mjs';
import './index-DCrMmn3b.mjs';
import './index-7IYgoTSU.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
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
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './vnode-D0IHQw_9.mjs';
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';

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
        specText = "\u9ED8\u8BA4\u89C4\u683C";
      }
      const priceText = sku.price !== void 0 ? ` (\xA5${sku.price})` : "";
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
          productName: (currentProduct == null ? void 0 : currentProduct.product_name) || "\u672A\u77E5\u5546\u54C1",
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
        placeholder: "\u5206\u7C7B\u7B5B\u9009",
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
        placeholder: "\u9009\u62E9\u5546\u54C1",
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
        placeholder: "\u9009\u62E9 SKU (\u53EF\u591A\u9009)",
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
      name: [{ required: true, message: "\u8BF7\u8F93\u5165\u540D\u79F0", trigger: "blur" }],
      value: [{ required: true, message: "\u8BF7\u8F93\u5165\u4F18\u60E0\u91D1\u989D", trigger: "blur" }]
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
            ElMessage.warning("\u8BF7\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u5173\u8054\u5546\u54C1 SKU");
            return;
          }
          if (!isUnlimitedDate.value && !form.endDate) {
            ElMessage.warning("\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F");
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
      const _component_el_divider = ElDivider;
      const _component_el_date_picker = ElDatePicker;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_tag = ElTag;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-post-page" }, _attrs))} data-v-9a907a68>`);
      _push(ssrRenderComponent(StickyFormHeader, {
        title: isEdit.value ? "\u7F16\u8F91\u5546\u54C1\u5238" : "\u65B0\u589E\u5546\u54C1\u5238",
        "sub-title": isEdit.value ? "\u4FEE\u6539\u5546\u54C1\u5238\u4FE1\u606F" : "\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u6307\u5B9A\u5546\u54C1\u4F18\u60E0\u5238",
        "submit-text": isEdit.value ? "\u4FDD\u5B58" : "\u65B0\u589E",
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
                  _push3(`<div class="card-header" data-v-9a907a68${_scopeId2}><span data-v-9a907a68${_scopeId2}>\u57FA\u7840\u4FE1\u606F</span></div>`);
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
                                      placeholder: "\u4F8B\u5982\uFF1AiPhone 15 \u4E13\u5C5E\u4F18\u60E0\u5238"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: form.name,
                                        "onUpdate:modelValue": ($event) => form.name = $event,
                                        placeholder: "\u4F8B\u5982\uFF1AiPhone 15 \u4E13\u5C5E\u4F18\u60E0\u5238"
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
                                      placeholder: "\u4F8B\u5982\uFF1AiPhone 15 \u4E13\u5C5E\u4F18\u60E0\u5238"
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
                                    placeholder: "\u4F8B\u5982\uFF1AiPhone 15 \u4E13\u5C5E\u4F18\u60E0\u5238"
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
                        _push4(`<div class="date-picker-wrapper" data-v-9a907a68${_scopeId3}>`);
                        if (!isUnlimitedDate.value) {
                          _push4(`<div class="date-text" data-v-9a907a68${_scopeId3}><span class="label" data-v-9a907a68${_scopeId3}>\u5F00\u59CB\uFF1A</span><span class="value" data-v-9a907a68${_scopeId3}>${ssrInterpolate(formatDate(form.startDate))}</span></div>`);
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
                          _push4(`<div class="form-tip" data-v-9a907a68${_scopeId3}>\u9ED8\u8BA4\u4ECE\u4ECA\u65E5\u5F00\u59CB\u751F\u6548\uFF0C\u8BF7\u9009\u62E9\u622A\u6B62\u65E5\u671F</div>`);
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
                                  placeholder: "\u4F8B\u5982\uFF1AiPhone 15 \u4E13\u5C5E\u4F18\u60E0\u5238"
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
              class: "form-card"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="card-header" data-v-9a907a68${_scopeId2}><span data-v-9a907a68${_scopeId2}>\u5173\u8054\u5546\u54C1 SKU</span>`);
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    size: "small",
                    style: { "margin-left": "8px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u8D2D\u4E70\u6307\u5B9A SKU \u65F6\u53EF\u7528`);
                      } else {
                        return [
                          createTextVNode("\u8D2D\u4E70\u6307\u5B9A SKU \u65F6\u53EF\u7528")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("span", null, "\u5173\u8054\u5546\u54C1 SKU"),
                      createVNode(_component_el_tag, {
                        type: "info",
                        size: "small",
                        style: { "margin-left": "8px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u8D2D\u4E70\u6307\u5B9A SKU \u65F6\u53EF\u7528")
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
                    "empty-text": "\u6682\u65E0\u5173\u8054 SKU"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_table_column, {
                          prop: "productName",
                          label: "\u5546\u54C1\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_table_column, {
                          prop: "spec",
                          label: "\u89C4\u683C (SKU)"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_table_column, {
                          label: "\u64CD\u4F5C",
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
                                    _push6(`\u79FB\u9664`);
                                  } else {
                                    return [
                                      createTextVNode("\u79FB\u9664")
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
                                    createTextVNode("\u79FB\u9664")
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
                            label: "\u5546\u54C1\u540D\u79F0"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "spec",
                            label: "\u89C4\u683C (SKU)"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u64CD\u4F5C",
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
                                  createTextVNode("\u79FB\u9664")
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
                        "empty-text": "\u6682\u65E0\u5173\u8054 SKU"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            prop: "productName",
                            label: "\u5546\u54C1\u540D\u79F0"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "spec",
                            label: "\u89C4\u683C (SKU)"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u64CD\u4F5C",
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
                                  createTextVNode("\u79FB\u9664")
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
                  _push3(`<div class="card-header" data-v-9a907a68${_scopeId2}><span data-v-9a907a68${_scopeId2}>\u6548\u679C\u9884\u89C8</span></div>`);
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
                  _push3(`<div class="preview-container" data-v-9a907a68${_scopeId2}><div class="coupon-ticket product-ticket" data-v-9a907a68${_scopeId2}><div class="ticket-left" data-v-9a907a68${_scopeId2}><div class="ticket-amount" data-v-9a907a68${_scopeId2}><small data-v-9a907a68${_scopeId2}>\xA5</small>${ssrInterpolate(form.value || "0")}</div><div class="ticket-cond" data-v-9a907a68${_scopeId2}>\u6307\u5B9A\u5546\u54C1</div></div><div class="ticket-right" data-v-9a907a68${_scopeId2}><div class="ticket-name" data-v-9a907a68${_scopeId2}>${ssrInterpolate(form.name || "\u4F18\u60E0\u5238\u540D\u79F0")}</div><div class="ticket-date" data-v-9a907a68${_scopeId2}>${ssrInterpolate(isUnlimitedDate.value ? "\u6C38\u4E45\u6709\u6548" : `${formatDate(form.startDate)} \u81F3 ${form.endDate || "?"}`)}</div><div class="ticket-btn" data-v-9a907a68${_scopeId2}>\u53BB\u8D2D\u4E70</div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "preview-container" }, [
                      createVNode("div", { class: "coupon-ticket product-ticket" }, [
                        createVNode("div", { class: "ticket-left" }, [
                          createVNode("div", { class: "ticket-amount" }, [
                            createVNode("small", null, "\xA5"),
                            createTextVNode(toDisplayString(form.value || "0"), 1)
                          ]),
                          createVNode("div", { class: "ticket-cond" }, "\u6307\u5B9A\u5546\u54C1")
                        ]),
                        createVNode("div", { class: "ticket-right" }, [
                          createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "\u4F18\u60E0\u5238\u540D\u79F0"), 1),
                          createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "\u6C38\u4E45\u6709\u6548" : `${formatDate(form.startDate)} \u81F3 ${form.endDate || "?"}`), 1),
                          createVNode("div", { class: "ticket-btn" }, "\u53BB\u8D2D\u4E70")
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
                                placeholder: "\u4F8B\u5982\uFF1AiPhone 15 \u4E13\u5C5E\u4F18\u60E0\u5238"
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
                class: "form-card"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "card-header" }, [
                    createVNode("span", null, "\u5173\u8054\u5546\u54C1 SKU"),
                    createVNode(_component_el_tag, {
                      type: "info",
                      size: "small",
                      style: { "margin-left": "8px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u8D2D\u4E70\u6307\u5B9A SKU \u65F6\u53EF\u7528")
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
                      "empty-text": "\u6682\u65E0\u5173\u8054 SKU"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          prop: "productName",
                          label: "\u5546\u54C1\u540D\u79F0"
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "spec",
                          label: "\u89C4\u683C (SKU)"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u64CD\u4F5C",
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
                                createTextVNode("\u79FB\u9664")
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
                    createVNode("span", null, "\u6548\u679C\u9884\u89C8")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "preview-container" }, [
                    createVNode("div", { class: "coupon-ticket product-ticket" }, [
                      createVNode("div", { class: "ticket-left" }, [
                        createVNode("div", { class: "ticket-amount" }, [
                          createVNode("small", null, "\xA5"),
                          createTextVNode(toDisplayString(form.value || "0"), 1)
                        ]),
                        createVNode("div", { class: "ticket-cond" }, "\u6307\u5B9A\u5546\u54C1")
                      ]),
                      createVNode("div", { class: "ticket-right" }, [
                        createVNode("div", { class: "ticket-name" }, toDisplayString(form.name || "\u4F18\u60E0\u5238\u540D\u79F0"), 1),
                        createVNode("div", { class: "ticket-date" }, toDisplayString(isUnlimitedDate.value ? "\u6C38\u4E45\u6709\u6548" : `${formatDate(form.startDate)} \u81F3 ${form.endDate || "?"}`), 1),
                        createVNode("div", { class: "ticket-btn" }, "\u53BB\u8D2D\u4E70")
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

export { post as default };
//# sourceMappingURL=post-DWLyqUjF.mjs.map
