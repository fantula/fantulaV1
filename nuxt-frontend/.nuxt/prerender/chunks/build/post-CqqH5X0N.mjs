import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, z as arrow_left_default, bb as delete_default, p as plus_default, bz as minus_default, bA as cpu_default, ba as picture_default, bB as circle_check_filled_default, by as getAdminSupabaseClient, ah as ElMessage } from './server.mjs';
import { E as ElSteps, a as ElStep } from './index-BOvktpI5.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElSelect, a as ElOption } from './index-Cf_t59lc.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElDialog } from './index-I18rzBgu.mjs';
import { E as ElUpload } from './index-DhXCDWyG.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, Transition, withDirectives, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { a as adminProductApi, b as adminApi } from './admin-supabase-nszo-IoU.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { a as adminCdkApi } from './cdk-ObzrOMzo.mjs';
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
import './event-BZTOGHfp.mjs';
import './index-BrFCEoKQ.mjs';
import './vnode-D0IHQw_9.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-D_b573Qt.mjs';
import './index-BOQJCp53.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './index-DOE061f1.mjs';
import './index-ClPmkyX9.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const activeStep = ref(0);
    const submitting = ref(false);
    const categories = ref([]);
    const products = ref([]);
    const loadingSkus = ref(false);
    const skuOptions = ref([]);
    const formStep1 = reactive({
      categoryId: "",
      productId: "",
      skuIds: []
    });
    const typeMap = { "virtual": "virtual", "shared": "shared_account", "one_time": "one_time_cdk" };
    const currentCdkType = computed(() => {
      const urlType = route.query.type;
      return typeMap[urlType] || "virtual";
    });
    const filteredProducts = computed(() => {
      if (!formStep1.categoryId) return [];
      return products.value.filter((p) => p.category_id === formStep1.categoryId);
    });
    const currentProduct = computed(() => products.value.find((p) => p.id === formStep1.productId));
    const formVirtual = reactive({
      stock: 10,
      fields: ["\u90AE\u7BB1"]
      // Default field example
    });
    const formShared = reactive({
      maxSlots: 5,
      attributes: [{ key: "\u8D26\u53F7", value: "" }, { key: "\u5BC6\u7801", value: "" }]
    });
    const formCard = reactive({
      rawContent: ""
    });
    const parsing = ref(false);
    const cardParsedResult = ref(null);
    const resetCardParse = () => {
      cardParsedResult.value = null;
    };
    const parseCards = async () => {
      if (!formCard.rawContent) return;
      parsing.value = true;
      try {
        const lines = formCard.rawContent.split("\n").map((l) => l.trim()).filter((l) => l);
        const uniqueLines = [...new Set(lines)];
        const targetSkuIds = formStep1.skuIds.length > 0 ? formStep1.skuIds : skuOptions.value.map((s) => s.id);
        let existingCodes = /* @__PURE__ */ new Set();
        if (targetSkuIds.length > 0) {
          const { data: mappings } = await getAdminSupabaseClient().from("cdk_sku_map").select("cdk:cdks!inner(code, cdk_type)").in("sku_id", targetSkuIds).eq("cdk.cdk_type", "one_time");
          if (mappings) {
            existingCodes = new Set(mappings.map((m) => {
              var _a;
              return (_a = m.cdk) == null ? void 0 : _a.code;
            }).filter(Boolean));
          }
        }
        const valid = [];
        const duplicates = [];
        const invalid = [];
        uniqueLines.forEach((line) => {
          if (line.length < 4) {
            invalid.push(line);
          } else if (existingCodes.has(line)) {
            duplicates.push(line);
          } else {
            valid.push(line);
          }
        });
        const inputDuplicates = lines.length - uniqueLines.length;
        if (inputDuplicates > 0) {
          ElMessage.info(`\u5DF2\u81EA\u52A8\u53BB\u9664 ${inputDuplicates} \u6761\u91CD\u590D\u8F93\u5165`);
        }
        cardParsedResult.value = {
          valid,
          duplicates,
          invalid
        };
      } catch (err) {
        ElMessage.error("\u89E3\u6790\u6821\u9A8C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
        cardParsedResult.value = null;
      } finally {
        parsing.value = false;
      }
    };
    const commonImage = ref("");
    const handleCategoryChange = () => {
      formStep1.productId = "";
      formStep1.skuIds = [];
      skuOptions.value = [];
    };
    const handleProductChange = async (productId) => {
      formStep1.skuIds = [];
      skuOptions.value = [];
      if (!productId) return;
      loadingSkus.value = true;
      try {
        const res = await adminProductApi.getProductWithSkus(productId);
        if (res.success && res.skus) {
          const targetType = currentCdkType.value;
          const filteredSkus = res.skus.filter((sku) => sku.product_type === targetType);
          let availableSkus = filteredSkus;
          if (targetType === "virtual") {
            const { data: boundSkuIds } = await getAdminSupabaseClient().from("cdk_sku_map").select("sku_id, cdk:cdks!inner(cdk_type)").eq("cdk.cdk_type", "virtual");
            const boundSet = new Set((boundSkuIds || []).map((m) => m.sku_id));
            availableSkus = filteredSkus.filter((sku) => !boundSet.has(sku.id));
          }
          skuOptions.value = availableSkus.map((sku) => {
            const specValues = Object.values(sku.spec_combination || {}).join(" ");
            return {
              id: sku.id,
              label: specValues || "\u9ED8\u8BA4\u89C4\u683C"
            };
          });
        }
      } finally {
        loadingSkus.value = false;
      }
      cardParsedResult.value = null;
      formCard.rawContent = "";
      formShared.maxSlots = 5;
      formShared.attributes.splice(0, formShared.attributes.length, { key: "\u8D26\u53F7", value: "" }, { key: "\u5BC6\u7801", value: "" });
    };
    const getTypeText = (type) => {
      const map = {
        "virtual": "\u865A\u62DF\u5145\u503C",
        "shared_account": "\u8D26\u53F7/\u5408\u79DF",
        "one_time_cdk": "\u6FC0\u6D3B\u7801"
      };
      return map[type] || type || "-";
    };
    const addVirtualField = () => formVirtual.fields.push("");
    const removeVirtualField = (idx) => formVirtual.fields.splice(idx, 1);
    const imagePickerVisible = ref(false);
    const pickerLoading = ref(false);
    const galleryImages = ref([]);
    const pickerCategories = ref([]);
    const pickerActiveCatId = ref("");
    const fetchPickerImages = async () => {
      pickerLoading.value = true;
      const res = await adminApi.image.getImages({
        category_id: pickerActiveCatId.value
      });
      if (res.success) galleryImages.value = res.images;
      pickerLoading.value = false;
    };
    const selectGalleryImage = (url) => {
      commonImage.value = url;
      imagePickerVisible.value = false;
      ElMessage.success("\u5DF2\u9009\u62E9\u56FE\u7247");
    };
    const handlePickerUpload = async (file) => {
      pickerLoading.value = true;
      try {
        const { uploadImageToStorage } = await import('./uploadImage-C-btIIZs.mjs');
        const upRes = await uploadImageToStorage(file.raw);
        if (upRes.success) {
          await adminApi.image.createImage({
            name: file.name,
            url: upRes.url,
            category_id: pickerActiveCatId.value || void 0
          });
          selectGalleryImage(upRes.url);
          fetchPickerImages();
        }
      } finally {
        pickerLoading.value = false;
      }
    };
    const handleNext = async () => {
      var _a;
      if (activeStep.value === 0) {
        if (!formStep1.productId) return ElMessage.warning("\u8BF7\u5148\u9009\u62E9\u5546\u54C1");
        activeStep.value = 1;
      } else if (activeStep.value === 1) {
        if (currentCdkType.value === "shared_account") {
          if (formShared.attributes.some((a) => !a.key || !a.value)) {
            return ElMessage.warning("\u8BF7\u8865\u5168\u6240\u6709\u8D26\u53F7\u8D44\u6E90\u7684\u5B57\u6BB5\u540D\u79F0\u4E0E\u5185\u5BB9");
          }
        }
        if (currentCdkType.value === "one_time_cdk") {
          if (!cardParsedResult.value) {
            return ElMessage.warning("\u8BF7\u5148\u70B9\u51FB\u89E3\u6790\u5E76\u6821\u9A8C\u6FC0\u6D3B\u7801");
          }
          if (cardParsedResult.value.valid.length === 0) {
            return ElMessage.warning("\u6CA1\u6709\u53EF\u7528\u7684\u6709\u6548\u6FC0\u6D3B\u7801\uFF0C\u8BF7\u68C0\u67E5\u8F93\u5165");
          }
        }
        activeStep.value = 2;
      } else {
        submitting.value = true;
        try {
          const productType = currentCdkType.value;
          const cdkTypeMap = {
            "virtual": "virtual",
            "shared_account": "shared",
            "one_time_cdk": "one_time"
          };
          const cdkType = cdkTypeMap[productType || ""] || "one_time";
          let codes = [];
          let accountData = commonImage.value ? { image: commonImage.value } : void 0;
          if (productType === "one_time_cdk") {
            codes = ((_a = cardParsedResult.value) == null ? void 0 : _a.valid) || [];
          } else if (productType === "virtual") {
            const fieldsData = {
              fields: formVirtual.fields.filter((f) => f.trim())
            };
            codes = [JSON.stringify(fieldsData)];
          } else if (productType === "shared_account") {
            const attrObj = {};
            formShared.attributes.forEach((a) => {
              if (a.key) attrObj[a.key] = a.value;
            });
            codes = [JSON.stringify(attrObj)];
          }
          if (codes.length === 0) {
            ElMessage.warning("\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u8D44\u6E90");
            submitting.value = false;
            return;
          }
          let targetSkuIds = formStep1.skuIds.length > 0 ? formStep1.skuIds : skuOptions.value.map((s) => s.id);
          if (targetSkuIds.length === 0) {
            ElMessage.warning("\u8BE5\u5546\u54C1\u6CA1\u6709\u53EF\u7528\u7684 SKU\uFF0C\u8BF7\u5148\u521B\u5EFA SKU");
            submitting.value = false;
            return;
          }
          let successCount = 0;
          let errors = [];
          const result = await adminCdkApi.createCdks({
            sku_ids: targetSkuIds,
            cdk_type: cdkType,
            codes,
            max_slots: productType === "shared_account" ? formShared.maxSlots : 1,
            stock: productType === "virtual" ? formVirtual.stock : 1,
            account_data: accountData,
            product_snapshot: currentProduct.value ? {
              product_id: currentProduct.value.id,
              product_name: currentProduct.value.product_name,
              product_image: currentProduct.value.image || void 0
            } : void 0
          });
          if (result.success) {
            successCount += result.count;
          } else {
            errors.push(result.error || "\u672A\u77E5\u9519\u8BEF");
          }
          if (successCount > 0) {
            ElMessage.success(`\u6210\u529F\u6DFB\u52A0 ${successCount} \u6761\u8D44\u6E90`);
            const typeRouteMap = {
              "virtual": "virtual",
              "shared": "accounts",
              "one_time": "keys"
            };
            const targetRoute = typeRouteMap[route.query.type] || "virtual";
            router.push(`/_mgmt_9Xfa3/cdk/${targetRoute}`);
          } else if (errors.length > 0) {
            ElMessage.error(errors[0]);
          }
        } catch (err) {
          ElMessage.error(err.message || "\u6DFB\u52A0\u5931\u8D25");
        } finally {
          submitting.value = false;
        }
      }
    };
    const prevStep = () => {
      if (activeStep.value > 0) activeStep.value--;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_steps = ElSteps;
      const _component_el_step = ElStep;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_alert = ElAlert;
      const _component_el_input_number = ElInputNumber;
      const _component_el_divider = ElDivider;
      const _component_el_input = ElInput;
      const _component_el_dialog = ElDialog;
      const _component_el_upload = ElUpload;
      const _component_el_image = ElImage;
      const _component_el_empty = ElEmpty;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdk-post-page" }, _attrs))} data-v-6f09973b><div class="wizard-header" data-v-6f09973b><div class="header-left" data-v-6f09973b>`);
      _push(ssrRenderComponent(_component_el_button, {
        link: "",
        class: "back-btn",
        onClick: ($event) => unref(router).back()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "back-icon" }, {
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
              createVNode(_component_el_icon, { class: "back-icon" }, {
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
      _push(`<div class="header-titles" data-v-6f09973b><div class="main-title" data-v-6f09973b>\u6DFB\u52A0\u8D44\u6E90</div><div class="sub-title" data-v-6f09973b>ADD RESOURCES</div></div></div><div class="header-center" data-v-6f09973b>`);
      _push(ssrRenderComponent(_component_el_steps, {
        active: activeStep.value,
        "finish-status": "success",
        simple: "",
        style: { "width": "100%", "background": "transparent" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_step, { title: "\u9009\u62E9\u5546\u54C1" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_step, { title: "\u914D\u7F6E\u8D44\u6E90" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_step, { title: "\u786E\u8BA4\u6DFB\u52A0" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_step, { title: "\u9009\u62E9\u5546\u54C1" }),
              createVNode(_component_el_step, { title: "\u914D\u7F6E\u8D44\u6E90" }),
              createVNode(_component_el_step, { title: "\u786E\u8BA4\u6DFB\u52A0" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-right" data-v-6f09973b></div></div><div class="wizard-body" data-v-6f09973b><div class="centered-container" data-v-6f09973b><div class="step-content" style="${ssrRenderStyle(activeStep.value === 0 ? null : { display: "none" })}" data-v-6f09973b><div class="form-card" data-v-6f09973b><h3 class="card-title" data-v-6f09973b>\u57FA\u7840\u4FE1\u606F</h3>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: formStep1,
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u5546\u54C1\u5206\u7C7B" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: formStep1.categoryId,
                    "onUpdate:modelValue": ($event) => formStep1.categoryId = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                    filterable: "",
                    onChange: handleCategoryChange,
                    size: "large",
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
                      modelValue: formStep1.categoryId,
                      "onUpdate:modelValue": ($event) => formStep1.categoryId = $event,
                      placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                      filterable: "",
                      onChange: handleCategoryChange,
                      size: "large",
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
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: formStep1.productId,
                    "onUpdate:modelValue": ($event) => formStep1.productId = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                    filterable: "",
                    onChange: handleProductChange,
                    size: "large",
                    style: { "width": "100%" },
                    disabled: !formStep1.categoryId
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(filteredProducts.value, (prod) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: prod.id,
                            label: prod.product_name,
                            value: prod.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span style="${ssrRenderStyle({ "float": "left" })}" data-v-6f09973b${_scopeId4}>${ssrInterpolate(prod.product_name)}</span><span style="${ssrRenderStyle({ "float": "right", "color": "#8492a6", "font-size": "13px" })}" data-v-6f09973b${_scopeId4}>${ssrInterpolate(getTypeText(prod.product_type))}</span>`);
                              } else {
                                return [
                                  createVNode("span", { style: { "float": "left" } }, toDisplayString(prod.product_name), 1),
                                  createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(getTypeText(prod.product_type)), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: prod.id,
                              label: prod.product_name,
                              value: prod.id
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { style: { "float": "left" } }, toDisplayString(prod.product_name), 1),
                                createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(getTypeText(prod.product_type)), 1)
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: formStep1.productId,
                      "onUpdate:modelValue": ($event) => formStep1.productId = $event,
                      placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                      filterable: "",
                      onChange: handleProductChange,
                      size: "large",
                      style: { "width": "100%" },
                      disabled: !formStep1.categoryId
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: prod.id,
                            label: prod.product_name,
                            value: prod.id
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { style: { "float": "left" } }, toDisplayString(prod.product_name), 1),
                              createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(getTypeText(prod.product_type)), 1)
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u5173\u8054 SKU (\u53EF\u591A\u9009)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: formStep1.skuIds,
                    "onUpdate:modelValue": ($event) => formStep1.skuIds = $event,
                    multiple: "",
                    placeholder: "\u8BE5\u8D44\u6E90\u5C06\u5E94\u7528\u4E8E\u54EA\u4E9B SKU",
                    size: "large",
                    style: { "width": "100%" },
                    disabled: !formStep1.productId,
                    loading: loadingSkus.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(skuOptions.value, (sku) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: sku.id,
                            label: sku.label,
                            value: sku.id
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(skuOptions.value, (sku) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: sku.id,
                              label: sku.label,
                              value: sku.id
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
                      modelValue: formStep1.skuIds,
                      "onUpdate:modelValue": ($event) => formStep1.skuIds = $event,
                      multiple: "",
                      placeholder: "\u8BE5\u8D44\u6E90\u5C06\u5E94\u7528\u4E8E\u54EA\u4E9B SKU",
                      size: "large",
                      style: { "width": "100%" },
                      disabled: !formStep1.productId,
                      loading: loadingSkus.value
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(skuOptions.value, (sku) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: sku.id,
                            label: sku.label,
                            value: sku.id
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (currentProduct.value) {
              _push2(ssrRenderComponent(_component_el_alert, {
                title: `\u5F53\u524D\u8D44\u6E90\u7C7B\u578B: ${getTypeText(currentCdkType.value)}`,
                type: "info",
                "show-icon": "",
                closable: false,
                style: { "margin-top": "20px" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (currentCdkType.value === "virtual") {
                      _push3(`<div data-v-6f09973b${_scopeId2}>\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u914D\u7F6E\u5E93\u5B58\u6570\u91CF\u4E0E\u8BA2\u5355\u586B\u5199\u5B57\u6BB5\u3002</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (currentCdkType.value === "shared_account") {
                      _push3(`<div data-v-6f09973b${_scopeId2}>\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u8F93\u5165\u8D26\u53F7\u5BC6\u7801\u53CA\u6700\u5927\u5E76\u53D1\u6570\u3002</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (currentCdkType.value === "one_time_cdk") {
                      _push3(`<div data-v-6f09973b${_scopeId2}>\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u6279\u91CF\u5BFC\u5165\u6FC0\u6D3B\u7801\u5185\u5BB9\u3002</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      currentCdkType.value === "virtual" ? (openBlock(), createBlock("div", { key: 0 }, "\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u914D\u7F6E\u5E93\u5B58\u6570\u91CF\u4E0E\u8BA2\u5355\u586B\u5199\u5B57\u6BB5\u3002")) : createCommentVNode("", true),
                      currentCdkType.value === "shared_account" ? (openBlock(), createBlock("div", { key: 1 }, "\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u8F93\u5165\u8D26\u53F7\u5BC6\u7801\u53CA\u6700\u5927\u5E76\u53D1\u6570\u3002")) : createCommentVNode("", true),
                      currentCdkType.value === "one_time_cdk" ? (openBlock(), createBlock("div", { key: 2 }, "\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u6279\u91CF\u5BFC\u5165\u6FC0\u6D3B\u7801\u5185\u5BB9\u3002")) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_el_form_item, { label: "\u5546\u54C1\u5206\u7C7B" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: formStep1.categoryId,
                    "onUpdate:modelValue": ($event) => formStep1.categoryId = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                    filterable: "",
                    onChange: handleCategoryChange,
                    size: "large",
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
              createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: formStep1.productId,
                    "onUpdate:modelValue": ($event) => formStep1.productId = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                    filterable: "",
                    onChange: handleProductChange,
                    size: "large",
                    style: { "width": "100%" },
                    disabled: !formStep1.categoryId
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: prod.id,
                          label: prod.product_name,
                          value: prod.id
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { style: { "float": "left" } }, toDisplayString(prod.product_name), 1),
                            createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(getTypeText(prod.product_type)), 1)
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "\u5173\u8054 SKU (\u53EF\u591A\u9009)" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: formStep1.skuIds,
                    "onUpdate:modelValue": ($event) => formStep1.skuIds = $event,
                    multiple: "",
                    placeholder: "\u8BE5\u8D44\u6E90\u5C06\u5E94\u7528\u4E8E\u54EA\u4E9B SKU",
                    size: "large",
                    style: { "width": "100%" },
                    disabled: !formStep1.productId,
                    loading: loadingSkus.value
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(skuOptions.value, (sku) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: sku.id,
                          label: sku.label,
                          value: sku.id
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled", "loading"])
                ]),
                _: 1
              }),
              currentProduct.value ? (openBlock(), createBlock(_component_el_alert, {
                key: 0,
                title: `\u5F53\u524D\u8D44\u6E90\u7C7B\u578B: ${getTypeText(currentCdkType.value)}`,
                type: "info",
                "show-icon": "",
                closable: false,
                style: { "margin-top": "20px" }
              }, {
                default: withCtx(() => [
                  currentCdkType.value === "virtual" ? (openBlock(), createBlock("div", { key: 0 }, "\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u914D\u7F6E\u5E93\u5B58\u6570\u91CF\u4E0E\u8BA2\u5355\u586B\u5199\u5B57\u6BB5\u3002")) : createCommentVNode("", true),
                  currentCdkType.value === "shared_account" ? (openBlock(), createBlock("div", { key: 1 }, "\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u8F93\u5165\u8D26\u53F7\u5BC6\u7801\u53CA\u6700\u5927\u5E76\u53D1\u6570\u3002")) : createCommentVNode("", true),
                  currentCdkType.value === "one_time_cdk" ? (openBlock(), createBlock("div", { key: 2 }, "\u7CFB\u7EDF\u5C06\u5F15\u5BFC\u60A8\u6279\u91CF\u5BFC\u5165\u6FC0\u6D3B\u7801\u5185\u5BB9\u3002")) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["title"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="step-content" style="${ssrRenderStyle(activeStep.value === 1 ? null : { display: "none" })}" data-v-6f09973b><div class="form-card" data-v-6f09973b><h3 class="card-title" data-v-6f09973b>\u8D44\u6E90\u914D\u7F6E: ${ssrInterpolate(getTypeText(currentCdkType.value))}</h3>`);
      if (currentCdkType.value === "virtual") {
        _push(`<div data-v-6f09973b>`);
        _push(ssrRenderComponent(_component_el_form, {
          model: formVirtual,
          "label-position": "top"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, { label: "\u53EF\u7528\u5E93\u5B58\u6570" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input_number, {
                      modelValue: formVirtual.stock,
                      "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                      min: 1,
                      size: "large",
                      style: { "width": "100%" }
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="form-tip" data-v-6f09973b${_scopeId2}>\u8BBE\u7F6E\u8BE5\u8D44\u6E90\u7684\u53EF\u7528\u670D\u52A1\u4F4D\u6570\u91CF (\u5982 GPT KEY \u7684\u5E76\u53D1\u4E0A\u9650)</div>`);
                  } else {
                    return [
                      createVNode(_component_el_input_number, {
                        modelValue: formVirtual.stock,
                        "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                        min: 1,
                        size: "large",
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "\u8BBE\u7F6E\u8BE5\u8D44\u6E90\u7684\u53EF\u7528\u670D\u52A1\u4F4D\u6570\u91CF (\u5982 GPT KEY \u7684\u5E76\u53D1\u4E0A\u9650)")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u8BA2\u5355\u586B\u5199\u5B57\u6BB5\u914D\u7F6E`);
                  } else {
                    return [
                      createTextVNode("\u8BA2\u5355\u586B\u5199\u5B57\u6BB5\u914D\u7F6E")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="dynamic-fields" data-v-6f09973b${_scopeId}><!--[-->`);
              ssrRenderList(formVirtual.fields, (field, idx) => {
                _push2(`<div class="field-row" data-v-6f09973b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: formVirtual.fields[idx],
                  "onUpdate:modelValue": ($event) => formVirtual.fields[idx] = $event,
                  placeholder: "\u8F93\u5165\u5B57\u6BB5\u540D (\u5982: \u6E38\u620F\u8D26\u53F7)"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "danger",
                  circle: "",
                  plain: "",
                  onClick: ($event) => removeVirtualField(idx)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(delete_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(delete_default))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "dashed",
                class: "add-field-btn",
                onClick: addVirtualField
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(plus_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(plus_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` \u6DFB\u52A0\u5B57\u6BB5 `);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(plus_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u6DFB\u52A0\u5B57\u6BB5 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="form-tip" data-v-6f09973b${_scopeId}>\u7528\u6237\u4E0B\u5355\u65F6\u9700\u8981\u586B\u5199\u7684\u8F85\u52A9\u4FE1\u606F\u5B57\u6BB5\u3002</div></div>`);
            } else {
              return [
                createVNode(_component_el_form_item, { label: "\u53EF\u7528\u5E93\u5B58\u6570" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input_number, {
                      modelValue: formVirtual.stock,
                      "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                      min: 1,
                      size: "large",
                      style: { "width": "100%" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "\u8BBE\u7F6E\u8BE5\u8D44\u6E90\u7684\u53EF\u7528\u670D\u52A1\u4F4D\u6570\u91CF (\u5982 GPT KEY \u7684\u5E76\u53D1\u4E0A\u9650)")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_divider, { "content-position": "left" }, {
                  default: withCtx(() => [
                    createTextVNode("\u8BA2\u5355\u586B\u5199\u5B57\u6BB5\u914D\u7F6E")
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "dynamic-fields" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(formVirtual.fields, (field, idx) => {
                    return openBlock(), createBlock("div", {
                      key: idx,
                      class: "field-row"
                    }, [
                      createVNode(_component_el_input, {
                        modelValue: formVirtual.fields[idx],
                        "onUpdate:modelValue": ($event) => formVirtual.fields[idx] = $event,
                        placeholder: "\u8F93\u5165\u5B57\u6BB5\u540D (\u5982: \u6E38\u620F\u8D26\u53F7)"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_el_button, {
                        type: "danger",
                        circle: "",
                        plain: "",
                        onClick: ($event) => removeVirtualField(idx)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(delete_default))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]);
                  }), 128)),
                  createVNode(_component_el_button, {
                    type: "dashed",
                    class: "add-field-btn",
                    onClick: addVirtualField
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(plus_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u6DFB\u52A0\u5B57\u6BB5 ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "form-tip" }, "\u7528\u6237\u4E0B\u5355\u65F6\u9700\u8981\u586B\u5199\u7684\u8F85\u52A9\u4FE1\u606F\u5B57\u6BB5\u3002")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentCdkType.value === "shared_account") {
        _push(`<div data-v-6f09973b>`);
        _push(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, { label: "\u6700\u5927\u8F66\u4F4D\u6570" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input_number, {
                      modelValue: formShared.maxSlots,
                      "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                      min: 1,
                      max: 10,
                      "controls-position": "right"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="form-tip" data-v-6f09973b${_scopeId2}>\u51B3\u5B9A\u8BE5\u8D44\u6E90\u53EF\u540C\u65F6\u670D\u52A1\u7684\u7528\u6237\u6570</div>`);
                  } else {
                    return [
                      createVNode(_component_el_input_number, {
                        modelValue: formShared.maxSlots,
                        "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                        min: 1,
                        max: 10,
                        "controls-position": "right"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "\u51B3\u5B9A\u8BE5\u8D44\u6E90\u53EF\u540C\u65F6\u670D\u52A1\u7684\u7528\u6237\u6570")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u5C5E\u6027\u914D\u7F6E`);
                  } else {
                    return [
                      createTextVNode("\u5C5E\u6027\u914D\u7F6E")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="kv-list" data-v-6f09973b${_scopeId}><!--[-->`);
              ssrRenderList(formShared.attributes, (attr, idx) => {
                _push2(`<div class="kv-row" data-v-6f09973b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: attr.key,
                  "onUpdate:modelValue": ($event) => attr.key = $event,
                  placeholder: "\u5B57\u6BB5\u540D(\u5982:\u8D26\u53F7)",
                  style: { "width": "140px" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="separator" data-v-6f09973b${_scopeId}>:</span>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: attr.value,
                  "onUpdate:modelValue": ($event) => attr.value = $event,
                  placeholder: "\u5B57\u6BB5\u503C",
                  style: { "flex": "1" }
                }, null, _parent2, _scopeId));
                if (formShared.attributes.length > 1) {
                  _push2(ssrRenderComponent(_component_el_button, {
                    circle: "",
                    plain: "",
                    size: "small",
                    onClick: ($event) => formShared.attributes.splice(idx, 1)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(minus_default), null, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(minus_default))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(minus_default))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "dashed",
                size: "small",
                class: "add-attr-btn",
                onClick: ($event) => formShared.attributes.push({ key: "", value: "" })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` + \u6DFB\u52A0\u5C5E\u6027 `);
                  } else {
                    return [
                      createTextVNode(" + \u6DFB\u52A0\u5C5E\u6027 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode(_component_el_form_item, { label: "\u6700\u5927\u8F66\u4F4D\u6570" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input_number, {
                      modelValue: formShared.maxSlots,
                      "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                      min: 1,
                      max: 10,
                      "controls-position": "right"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "\u51B3\u5B9A\u8BE5\u8D44\u6E90\u53EF\u540C\u65F6\u670D\u52A1\u7684\u7528\u6237\u6570")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_divider, { "content-position": "left" }, {
                  default: withCtx(() => [
                    createTextVNode("\u5C5E\u6027\u914D\u7F6E")
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "kv-list" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(formShared.attributes, (attr, idx) => {
                    return openBlock(), createBlock("div", {
                      key: idx,
                      class: "kv-row"
                    }, [
                      createVNode(_component_el_input, {
                        modelValue: attr.key,
                        "onUpdate:modelValue": ($event) => attr.key = $event,
                        placeholder: "\u5B57\u6BB5\u540D(\u5982:\u8D26\u53F7)",
                        style: { "width": "140px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "separator" }, ":"),
                      createVNode(_component_el_input, {
                        modelValue: attr.value,
                        "onUpdate:modelValue": ($event) => attr.value = $event,
                        placeholder: "\u5B57\u6BB5\u503C",
                        style: { "flex": "1" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      formShared.attributes.length > 1 ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        circle: "",
                        plain: "",
                        size: "small",
                        onClick: ($event) => formShared.attributes.splice(idx, 1)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(minus_default))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ]);
                  }), 128)),
                  createVNode(_component_el_button, {
                    type: "dashed",
                    size: "small",
                    class: "add-attr-btn",
                    onClick: ($event) => formShared.attributes.push({ key: "", value: "" })
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" + \u6DFB\u52A0\u5C5E\u6027 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentCdkType.value === "one_time_cdk") {
        _push(`<div data-v-6f09973b>`);
        _push(ssrRenderComponent(_component_el_form, {
          model: formCard,
          "label-position": "top"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, { label: "\u6279\u91CF\u8F93\u5165\u5361\u5BC6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: formCard.rawContent,
                      "onUpdate:modelValue": ($event) => formCard.rawContent = $event,
                      type: "textarea",
                      rows: 8,
                      placeholder: "\u652F\u6301\u76F4\u63A5\u7C98\u8D34\uFF0C\u81EA\u52A8\u53BB\u91CD\u8FC7\u6EE4\u3002\nAAAA-BBBB-CCCC\n1111-2222-3333",
                      onInput: resetCardParse
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: formCard.rawContent,
                        "onUpdate:modelValue": ($event) => formCard.rawContent = $event,
                        type: "textarea",
                        rows: 8,
                        placeholder: "\u652F\u6301\u76F4\u63A5\u7C98\u8D34\uFF0C\u81EA\u52A8\u53BB\u91CD\u8FC7\u6EE4\u3002\nAAAA-BBBB-CCCC\n1111-2222-3333",
                        onInput: resetCardParse
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="card-actions" data-v-6f09973b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: parseCards,
                loading: parsing.value,
                disabled: !formCard.rawContent
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(cpu_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(cpu_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` \u89E3\u6790\u5E76\u6821\u9A8C `);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(cpu_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u89E3\u6790\u5E76\u6821\u9A8C ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!cardParsedResult.value) {
                _push2(`<span class="parse-tip" data-v-6f09973b${_scopeId}>\u672A\u89E3\u6790\uFF0C\u8BF7\u5148\u70B9\u51FB\u89E3\u6790\u6309\u94AE</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (cardParsedResult.value) {
                _push2(`<div class="parse-dashboard" data-v-6f09973b${_scopeId}><div class="stat-item success" data-v-6f09973b${_scopeId}><span class="num" data-v-6f09973b${_scopeId}>${ssrInterpolate(cardParsedResult.value.valid.length)}</span><span class="label" data-v-6f09973b${_scopeId}>\u53EF\u7528\u6570\u91CF</span></div><div class="stat-item warning" data-v-6f09973b${_scopeId}><span class="num" data-v-6f09973b${_scopeId}>${ssrInterpolate(cardParsedResult.value.duplicates.length)}</span><span class="label" data-v-6f09973b${_scopeId}>\u91CD\u590D/\u5E93\u5B58\u5DF2\u5B58</span></div><div class="stat-item danger" data-v-6f09973b${_scopeId}><span class="num" data-v-6f09973b${_scopeId}>${ssrInterpolate(cardParsedResult.value.invalid.length)}</span><span class="label" data-v-6f09973b${_scopeId}>\u683C\u5F0F\u65E0\u6548</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (cardParsedResult.value && cardParsedResult.value.valid.length > 0) {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u89E3\u6790\u5B8C\u6210",
                  type: "success",
                  closable: false,
                  "show-icon": "",
                  style: { "margin-top": "16px" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u5C06\u4EC5\u5165\u5E93 ${ssrInterpolate(cardParsedResult.value.valid.length)} \u6761\u6709\u6548\u5361\u5BC6\u3002\u91CD\u590D\u4E0E\u65E0\u6548\u9879\u5C06\u88AB\u5FFD\u7565\u3002 `);
                    } else {
                      return [
                        createTextVNode(" \u5C06\u4EC5\u5165\u5E93 " + toDisplayString(cardParsedResult.value.valid.length) + " \u6761\u6709\u6548\u5361\u5BC6\u3002\u91CD\u590D\u4E0E\u65E0\u6548\u9879\u5C06\u88AB\u5FFD\u7565\u3002 ", 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_el_form_item, { label: "\u6279\u91CF\u8F93\u5165\u5361\u5BC6" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: formCard.rawContent,
                      "onUpdate:modelValue": ($event) => formCard.rawContent = $event,
                      type: "textarea",
                      rows: 8,
                      placeholder: "\u652F\u6301\u76F4\u63A5\u7C98\u8D34\uFF0C\u81EA\u52A8\u53BB\u91CD\u8FC7\u6EE4\u3002\nAAAA-BBBB-CCCC\n1111-2222-3333",
                      onInput: resetCardParse
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "card-actions" }, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: parseCards,
                    loading: parsing.value,
                    disabled: !formCard.rawContent
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(cpu_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u89E3\u6790\u5E76\u6821\u9A8C ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"]),
                  !cardParsedResult.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "parse-tip"
                  }, "\u672A\u89E3\u6790\uFF0C\u8BF7\u5148\u70B9\u51FB\u89E3\u6790\u6309\u94AE")) : createCommentVNode("", true)
                ]),
                createVNode(Transition, { name: "el-zoom-in-top" }, {
                  default: withCtx(() => [
                    cardParsedResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "parse-dashboard"
                    }, [
                      createVNode("div", { class: "stat-item success" }, [
                        createVNode("span", { class: "num" }, toDisplayString(cardParsedResult.value.valid.length), 1),
                        createVNode("span", { class: "label" }, "\u53EF\u7528\u6570\u91CF")
                      ]),
                      createVNode("div", { class: "stat-item warning" }, [
                        createVNode("span", { class: "num" }, toDisplayString(cardParsedResult.value.duplicates.length), 1),
                        createVNode("span", { class: "label" }, "\u91CD\u590D/\u5E93\u5B58\u5DF2\u5B58")
                      ]),
                      createVNode("div", { class: "stat-item danger" }, [
                        createVNode("span", { class: "num" }, toDisplayString(cardParsedResult.value.invalid.length), 1),
                        createVNode("span", { class: "label" }, "\u683C\u5F0F\u65E0\u6548")
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                cardParsedResult.value && cardParsedResult.value.valid.length > 0 ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "\u89E3\u6790\u5B8C\u6210",
                  type: "success",
                  closable: false,
                  "show-icon": "",
                  style: { "margin-top": "16px" }
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u5C06\u4EC5\u5165\u5E93 " + toDisplayString(cardParsedResult.value.valid.length) + " \u6761\u6709\u6548\u5361\u5BC6\u3002\u91CD\u590D\u4E0E\u65E0\u6548\u9879\u5C06\u88AB\u5FFD\u7565\u3002 ", 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
      _push(`<div class="common-section" data-v-6f09973b><span class="section-label" data-v-6f09973b>\u8BE6\u60C5\u9875\u5E2E\u52A9\u56FE\u7247 (\u53EF\u9009)</span><div class="image-selector" data-v-6f09973b>`);
      if (commonImage.value) {
        _push(`<img${ssrRenderAttr("src", commonImage.value)} class="preview-img" data-v-6f09973b>`);
      } else {
        _push(`<div class="placeholder" data-v-6f09973b>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(picture_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(picture_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-6f09973b>\u9009\u62E9\u56FE\u7247</span></div>`);
      }
      _push(`</div></div></div></div><div class="step-content" style="${ssrRenderStyle(activeStep.value === 2 ? null : { display: "none" })}" data-v-6f09973b><div class="form-card confirmation-card" data-v-6f09973b><div class="success-icon" data-v-6f09973b>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(circle_check_filled_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h2 data-v-6f09973b>\u51C6\u5907\u5C31\u7EEA</h2><p data-v-6f09973b>\u8BF7\u786E\u8BA4\u4EE5\u4E0B\u4FE1\u606F\u65E0\u8BEF\u540E\u63D0\u4EA4</p><div class="summary-box" data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u5546\u54C1:</span><span class="value" data-v-6f09973b>${ssrInterpolate((_a = currentProduct.value) == null ? void 0 : _a.product_name)}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>SKU:</span><span class="value" data-v-6f09973b>${ssrInterpolate(skuOptions.value.filter((s) => formStep1.skuIds.includes(s.id)).map((s) => s.label).join(", ") || "\u901A\u7528")}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u7C7B\u578B:</span><span class="value" data-v-6f09973b>${ssrInterpolate(getTypeText(currentCdkType.value))}</span></div>`);
      _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
      if (currentCdkType.value === "virtual") {
        _push(`<div data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u65B0\u589E\u5E93\u5B58:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formVirtual.stock)}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u914D\u7F6E\u5B57\u6BB5:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formVirtual.fields.join(", ") || "\u65E0")}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentCdkType.value === "shared_account") {
        _push(`<div data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u6700\u5927\u8F66\u4F4D\u6570:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formShared.maxSlots)}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u5C5E\u6027\u5B57\u6BB5:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formShared.attributes.map((a) => a.key).join("/"))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentCdkType.value === "one_time_cdk") {
        _push(`<div data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>\u6709\u6548\u6FC0\u6D3B\u7801:</span> <span class="value highlight" data-v-6f09973b>${ssrInterpolate(((_c = (_b = cardParsedResult.value) == null ? void 0 : _b.valid) == null ? void 0 : _c.length) || 0)}</span> \u6761</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div><div class="wizard-footer" data-v-6f09973b>`);
      _push(ssrRenderComponent(_component_el_button, {
        size: "large",
        onClick: prevStep,
        disabled: activeStep.value === 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u4E0A\u4E00\u6B65`);
          } else {
            return [
              createTextVNode("\u4E0A\u4E00\u6B65")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large",
        class: "next-btn",
        onClick: handleNext,
        loading: submitting.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(activeStep.value === 2 ? "\u786E\u8BA4\u6DFB\u52A0" : "\u4E0B\u4E00\u6B65")}`);
          } else {
            return [
              createTextVNode(toDisplayString(activeStep.value === 2 ? "\u786E\u8BA4\u6DFB\u52A0" : "\u4E0B\u4E00\u6B65"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: imagePickerVisible.value,
        "onUpdate:modelValue": ($event) => imagePickerVisible.value = $event,
        title: "\u56FE\u5E93\u9009\u62E9",
        width: "800px",
        "append-to-body": "",
        "destroy-on-close": "",
        class: "picker-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="picker-container" data-v-6f09973b${_scopeId}><div class="picker-sidebar" data-v-6f09973b${_scopeId}><div class="${ssrRenderClass([{ active: pickerActiveCatId.value === "" }, "picker-cat-item"])}" data-v-6f09973b${_scopeId}>\u5168\u90E8\u56FE\u7247</div><!--[-->`);
            ssrRenderList(pickerCategories.value, (cat) => {
              _push2(`<div class="${ssrRenderClass([{ active: pickerActiveCatId.value === cat.id }, "picker-cat-item"])}" data-v-6f09973b${_scopeId}>${ssrInterpolate(cat.name)}</div>`);
            });
            _push2(`<!--]--></div><div${ssrRenderAttrs(mergeProps({ class: "picker-main" }, ssrGetDirectiveProps(_ctx, _directive_loading, pickerLoading.value)))} data-v-6f09973b${_scopeId}><div class="picker-toolbar" data-v-6f09973b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_upload, {
              action: "#",
              "auto-upload": false,
              "show-file-list": false,
              "on-change": handlePickerUpload
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u4E0A\u4F20\u65B0\u56FE\u7247`);
                      } else {
                        return [
                          createTextVNode("\u4E0A\u4F20\u65B0\u56FE\u7247")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u4E0A\u4F20\u65B0\u56FE\u7247")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="picker-grid" data-v-6f09973b${_scopeId}><!--[-->`);
            ssrRenderList(galleryImages.value, (img) => {
              _push2(`<div class="picker-img-card" data-v-6f09973b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover"
              }, null, _parent2, _scopeId));
              _push2(`<div class="picker-img-name" data-v-6f09973b${_scopeId}>${ssrInterpolate(img.name)}</div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (galleryImages.value.length === 0) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u56FE\u7247" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "picker-container" }, [
                createVNode("div", { class: "picker-sidebar" }, [
                  createVNode("div", {
                    class: ["picker-cat-item", { active: pickerActiveCatId.value === "" }],
                    onClick: ($event) => {
                      pickerActiveCatId.value = "";
                      fetchPickerImages();
                    }
                  }, "\u5168\u90E8\u56FE\u7247", 10, ["onClick"]),
                  (openBlock(true), createBlock(Fragment, null, renderList(pickerCategories.value, (cat) => {
                    return openBlock(), createBlock("div", {
                      key: cat.id,
                      class: ["picker-cat-item", { active: pickerActiveCatId.value === cat.id }],
                      onClick: ($event) => {
                        pickerActiveCatId.value = cat.id;
                        fetchPickerImages();
                      }
                    }, toDisplayString(cat.name), 11, ["onClick"]);
                  }), 128))
                ]),
                withDirectives((openBlock(), createBlock("div", { class: "picker-main" }, [
                  createVNode("div", { class: "picker-toolbar" }, [
                    createVNode(_component_el_upload, {
                      action: "#",
                      "auto-upload": false,
                      "show-file-list": false,
                      "on-change": handlePickerUpload
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u4E0A\u4F20\u65B0\u56FE\u7247")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "picker-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(galleryImages.value, (img) => {
                      return openBlock(), createBlock("div", {
                        key: img.id,
                        class: "picker-img-card",
                        onClick: ($event) => selectGalleryImage(img.url)
                      }, [
                        createVNode(_component_el_image, {
                          src: img.url,
                          fit: "cover"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "picker-img-name" }, toDisplayString(img.name), 1)
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  galleryImages.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                    key: 0,
                    description: "\u6682\u65E0\u56FE\u7247"
                  })) : createCommentVNode("", true)
                ])), [
                  [_directive_loading, pickerLoading.value]
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/cdk/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f09973b"]]);

export { post as default };
//# sourceMappingURL=post-CqqH5X0N.mjs.map
