import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElIcon, z as arrow_left_default, bb as delete_default, p as plus_default, bz as minus_default, bA as cpu_default, ba as picture_default, bB as circle_check_filled_default, by as getAdminSupabaseClient, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElSteps, a as ElStep } from "./index-BOvktpI5.js";
import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElDivider } from "./index-QnhSR2oe.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElDialog } from "./index-CzosOSMt.js";
import { E as ElUpload } from "./index-DhXCDWyG.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElEmpty } from "./index-DKY_z0U1.js";
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                  */
/* empty css                         */
/* empty css                    */
/* empty css                   */
/* empty css                    */
/* empty css                     */
/* empty css                         */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, Transition, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrGetDirectiveProps } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { a as adminProductApi, b as adminApi } from "./admin-supabase-nszo-IoU.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { a as adminCdkApi } from "./cdk-ObzrOMzo.js";
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
import "./event-BZTOGHfp.js";
import "./index-BrFCEoKQ.js";
import "./vnode-D0IHQw_9.js";
import "async-validator";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./index-Dxw_X3Hq.js";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-D_b573Qt.js";
import "./index-BOQJCp53.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./index-DCrMmn3b.js";
import "./index-DOE061f1.js";
import "./index-ClPmkyX9.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
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
      fields: ["邮箱"]
      // Default field example
    });
    const formShared = reactive({
      maxSlots: 5,
      attributes: [{ key: "账号", value: "" }, { key: "密码", value: "" }]
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
            existingCodes = new Set(mappings.map((m) => m.cdk?.code).filter(Boolean));
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
          ElMessage.info(`已自动去除 ${inputDuplicates} 条重复输入`);
        }
        cardParsedResult.value = {
          valid,
          duplicates,
          invalid
        };
      } catch (err) {
        ElMessage.error("解析校验失败，请重试");
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
              label: specValues || "默认规格"
            };
          });
        }
      } finally {
        loadingSkus.value = false;
      }
      cardParsedResult.value = null;
      formCard.rawContent = "";
      formShared.maxSlots = 5;
      formShared.attributes.splice(0, formShared.attributes.length, { key: "账号", value: "" }, { key: "密码", value: "" });
    };
    const getTypeText = (type) => {
      const map = {
        "virtual": "虚拟充值",
        "shared_account": "账号/合租",
        "one_time_cdk": "激活码"
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
      ElMessage.success("已选择图片");
    };
    const handlePickerUpload = async (file) => {
      pickerLoading.value = true;
      try {
        const { uploadImageToStorage } = await import("./uploadImage-C-btIIZs.js");
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
      if (activeStep.value === 0) {
        if (!formStep1.productId) return ElMessage.warning("请先选择商品");
        activeStep.value = 1;
      } else if (activeStep.value === 1) {
        if (currentCdkType.value === "shared_account") {
          if (formShared.attributes.some((a) => !a.key || !a.value)) {
            return ElMessage.warning("请补全所有账号资源的字段名称与内容");
          }
        }
        if (currentCdkType.value === "one_time_cdk") {
          if (!cardParsedResult.value) {
            return ElMessage.warning("请先点击解析并校验激活码");
          }
          if (cardParsedResult.value.valid.length === 0) {
            return ElMessage.warning("没有可用的有效激活码，请检查输入");
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
            codes = cardParsedResult.value?.valid || [];
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
            ElMessage.warning("没有可添加的资源");
            submitting.value = false;
            return;
          }
          let targetSkuIds = formStep1.skuIds.length > 0 ? formStep1.skuIds : skuOptions.value.map((s) => s.id);
          if (targetSkuIds.length === 0) {
            ElMessage.warning("该商品没有可用的 SKU，请先创建 SKU");
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
            errors.push(result.error || "未知错误");
          }
          if (successCount > 0) {
            ElMessage.success(`成功添加 ${successCount} 条资源`);
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
          ElMessage.error(err.message || "添加失败");
        } finally {
          submitting.value = false;
        }
      }
    };
    const prevStep = () => {
      if (activeStep.value > 0) activeStep.value--;
    };
    return (_ctx, _push, _parent, _attrs) => {
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
            _push2(` 返回列表 `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "back-icon" }, {
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
      _push(`<div class="header-titles" data-v-6f09973b><div class="main-title" data-v-6f09973b>添加资源</div><div class="sub-title" data-v-6f09973b>ADD RESOURCES</div></div></div><div class="header-center" data-v-6f09973b>`);
      _push(ssrRenderComponent(_component_el_steps, {
        active: activeStep.value,
        "finish-status": "success",
        simple: "",
        style: { "width": "100%", "background": "transparent" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_step, { title: "选择商品" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_step, { title: "配置资源" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_step, { title: "确认添加" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_step, { title: "选择商品" }),
              createVNode(_component_el_step, { title: "配置资源" }),
              createVNode(_component_el_step, { title: "确认添加" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-right" data-v-6f09973b></div></div><div class="wizard-body" data-v-6f09973b><div class="centered-container" data-v-6f09973b><div class="step-content" style="${ssrRenderStyle(activeStep.value === 0 ? null : { display: "none" })}" data-v-6f09973b><div class="form-card" data-v-6f09973b><h3 class="card-title" data-v-6f09973b>基础信息</h3>`);
      _push(ssrRenderComponent(_component_el_form, {
        model: formStep1,
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, { label: "商品分类" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: formStep1.categoryId,
                    "onUpdate:modelValue": ($event) => formStep1.categoryId = $event,
                    placeholder: "请选择分类",
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
                      placeholder: "请选择分类",
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
            _push2(ssrRenderComponent(_component_el_form_item, { label: "选择商品" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: formStep1.productId,
                    "onUpdate:modelValue": ($event) => formStep1.productId = $event,
                    placeholder: "请选择商品",
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
                      placeholder: "请选择商品",
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
            _push2(ssrRenderComponent(_component_el_form_item, { label: "关联 SKU (可多选)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: formStep1.skuIds,
                    "onUpdate:modelValue": ($event) => formStep1.skuIds = $event,
                    multiple: "",
                    placeholder: "该资源将应用于哪些 SKU",
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
                      placeholder: "该资源将应用于哪些 SKU",
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
                title: `当前资源类型: ${getTypeText(currentCdkType.value)}`,
                type: "info",
                "show-icon": "",
                closable: false,
                style: { "margin-top": "20px" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (currentCdkType.value === "virtual") {
                      _push3(`<div data-v-6f09973b${_scopeId2}>系统将引导您配置库存数量与订单填写字段。</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (currentCdkType.value === "shared_account") {
                      _push3(`<div data-v-6f09973b${_scopeId2}>系统将引导您输入账号密码及最大并发数。</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (currentCdkType.value === "one_time_cdk") {
                      _push3(`<div data-v-6f09973b${_scopeId2}>系统将引导您批量导入激活码内容。</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      currentCdkType.value === "virtual" ? (openBlock(), createBlock("div", { key: 0 }, "系统将引导您配置库存数量与订单填写字段。")) : createCommentVNode("", true),
                      currentCdkType.value === "shared_account" ? (openBlock(), createBlock("div", { key: 1 }, "系统将引导您输入账号密码及最大并发数。")) : createCommentVNode("", true),
                      currentCdkType.value === "one_time_cdk" ? (openBlock(), createBlock("div", { key: 2 }, "系统将引导您批量导入激活码内容。")) : createCommentVNode("", true)
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
              createVNode(_component_el_form_item, { label: "商品分类" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: formStep1.categoryId,
                    "onUpdate:modelValue": ($event) => formStep1.categoryId = $event,
                    placeholder: "请选择分类",
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
              createVNode(_component_el_form_item, { label: "选择商品" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: formStep1.productId,
                    "onUpdate:modelValue": ($event) => formStep1.productId = $event,
                    placeholder: "请选择商品",
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
              createVNode(_component_el_form_item, { label: "关联 SKU (可多选)" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: formStep1.skuIds,
                    "onUpdate:modelValue": ($event) => formStep1.skuIds = $event,
                    multiple: "",
                    placeholder: "该资源将应用于哪些 SKU",
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
                title: `当前资源类型: ${getTypeText(currentCdkType.value)}`,
                type: "info",
                "show-icon": "",
                closable: false,
                style: { "margin-top": "20px" }
              }, {
                default: withCtx(() => [
                  currentCdkType.value === "virtual" ? (openBlock(), createBlock("div", { key: 0 }, "系统将引导您配置库存数量与订单填写字段。")) : createCommentVNode("", true),
                  currentCdkType.value === "shared_account" ? (openBlock(), createBlock("div", { key: 1 }, "系统将引导您输入账号密码及最大并发数。")) : createCommentVNode("", true),
                  currentCdkType.value === "one_time_cdk" ? (openBlock(), createBlock("div", { key: 2 }, "系统将引导您批量导入激活码内容。")) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["title"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="step-content" style="${ssrRenderStyle(activeStep.value === 1 ? null : { display: "none" })}" data-v-6f09973b><div class="form-card" data-v-6f09973b><h3 class="card-title" data-v-6f09973b>资源配置: ${ssrInterpolate(getTypeText(currentCdkType.value))}</h3>`);
      if (currentCdkType.value === "virtual") {
        _push(`<div data-v-6f09973b>`);
        _push(ssrRenderComponent(_component_el_form, {
          model: formVirtual,
          "label-position": "top"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, { label: "可用库存数" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input_number, {
                      modelValue: formVirtual.stock,
                      "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                      min: 1,
                      size: "large",
                      style: { "width": "100%" }
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="form-tip" data-v-6f09973b${_scopeId2}>设置该资源的可用服务位数量 (如 GPT KEY 的并发上限)</div>`);
                  } else {
                    return [
                      createVNode(_component_el_input_number, {
                        modelValue: formVirtual.stock,
                        "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                        min: 1,
                        size: "large",
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "设置该资源的可用服务位数量 (如 GPT KEY 的并发上限)")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`订单填写字段配置`);
                  } else {
                    return [
                      createTextVNode("订单填写字段配置")
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
                  placeholder: "输入字段名 (如: 游戏账号)"
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
                    _push3(` 添加字段 `);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(plus_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" 添加字段 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="form-tip" data-v-6f09973b${_scopeId}>用户下单时需要填写的辅助信息字段。</div></div>`);
            } else {
              return [
                createVNode(_component_el_form_item, { label: "可用库存数" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input_number, {
                      modelValue: formVirtual.stock,
                      "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                      min: 1,
                      size: "large",
                      style: { "width": "100%" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "设置该资源的可用服务位数量 (如 GPT KEY 的并发上限)")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_divider, { "content-position": "left" }, {
                  default: withCtx(() => [
                    createTextVNode("订单填写字段配置")
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
                        placeholder: "输入字段名 (如: 游戏账号)"
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
                      createTextVNode(" 添加字段 ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "form-tip" }, "用户下单时需要填写的辅助信息字段。")
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
              _push2(ssrRenderComponent(_component_el_form_item, { label: "最大车位数" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input_number, {
                      modelValue: formShared.maxSlots,
                      "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                      min: 1,
                      max: 10,
                      "controls-position": "right"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="form-tip" data-v-6f09973b${_scopeId2}>决定该资源可同时服务的用户数</div>`);
                  } else {
                    return [
                      createVNode(_component_el_input_number, {
                        modelValue: formShared.maxSlots,
                        "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                        min: 1,
                        max: 10,
                        "controls-position": "right"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "决定该资源可同时服务的用户数")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`属性配置`);
                  } else {
                    return [
                      createTextVNode("属性配置")
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
                  placeholder: "字段名(如:账号)",
                  style: { "width": "140px" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="separator" data-v-6f09973b${_scopeId}>:</span>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: attr.value,
                  "onUpdate:modelValue": ($event) => attr.value = $event,
                  placeholder: "字段值",
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
                    _push3(` + 添加属性 `);
                  } else {
                    return [
                      createTextVNode(" + 添加属性 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode(_component_el_form_item, { label: "最大车位数" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input_number, {
                      modelValue: formShared.maxSlots,
                      "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                      min: 1,
                      max: 10,
                      "controls-position": "right"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "决定该资源可同时服务的用户数")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_divider, { "content-position": "left" }, {
                  default: withCtx(() => [
                    createTextVNode("属性配置")
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
                        placeholder: "字段名(如:账号)",
                        style: { "width": "140px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "separator" }, ":"),
                      createVNode(_component_el_input, {
                        modelValue: attr.value,
                        "onUpdate:modelValue": ($event) => attr.value = $event,
                        placeholder: "字段值",
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
                      createTextVNode(" + 添加属性 ")
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
              _push2(ssrRenderComponent(_component_el_form_item, { label: "批量输入卡密" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: formCard.rawContent,
                      "onUpdate:modelValue": ($event) => formCard.rawContent = $event,
                      type: "textarea",
                      rows: 8,
                      placeholder: "支持直接粘贴，自动去重过滤。\nAAAA-BBBB-CCCC\n1111-2222-3333",
                      onInput: resetCardParse
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: formCard.rawContent,
                        "onUpdate:modelValue": ($event) => formCard.rawContent = $event,
                        type: "textarea",
                        rows: 8,
                        placeholder: "支持直接粘贴，自动去重过滤。\nAAAA-BBBB-CCCC\n1111-2222-3333",
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
                    _push3(` 解析并校验 `);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(cpu_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" 解析并校验 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (!cardParsedResult.value) {
                _push2(`<span class="parse-tip" data-v-6f09973b${_scopeId}>未解析，请先点击解析按钮</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (cardParsedResult.value) {
                _push2(`<div class="parse-dashboard" data-v-6f09973b${_scopeId}><div class="stat-item success" data-v-6f09973b${_scopeId}><span class="num" data-v-6f09973b${_scopeId}>${ssrInterpolate(cardParsedResult.value.valid.length)}</span><span class="label" data-v-6f09973b${_scopeId}>可用数量</span></div><div class="stat-item warning" data-v-6f09973b${_scopeId}><span class="num" data-v-6f09973b${_scopeId}>${ssrInterpolate(cardParsedResult.value.duplicates.length)}</span><span class="label" data-v-6f09973b${_scopeId}>重复/库存已存</span></div><div class="stat-item danger" data-v-6f09973b${_scopeId}><span class="num" data-v-6f09973b${_scopeId}>${ssrInterpolate(cardParsedResult.value.invalid.length)}</span><span class="label" data-v-6f09973b${_scopeId}>格式无效</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (cardParsedResult.value && cardParsedResult.value.valid.length > 0) {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "解析完成",
                  type: "success",
                  closable: false,
                  "show-icon": "",
                  style: { "margin-top": "16px" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` 将仅入库 ${ssrInterpolate(cardParsedResult.value.valid.length)} 条有效卡密。重复与无效项将被忽略。 `);
                    } else {
                      return [
                        createTextVNode(" 将仅入库 " + toDisplayString(cardParsedResult.value.valid.length) + " 条有效卡密。重复与无效项将被忽略。 ", 1)
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
                createVNode(_component_el_form_item, { label: "批量输入卡密" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: formCard.rawContent,
                      "onUpdate:modelValue": ($event) => formCard.rawContent = $event,
                      type: "textarea",
                      rows: 8,
                      placeholder: "支持直接粘贴，自动去重过滤。\nAAAA-BBBB-CCCC\n1111-2222-3333",
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
                      createTextVNode(" 解析并校验 ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"]),
                  !cardParsedResult.value ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "parse-tip"
                  }, "未解析，请先点击解析按钮")) : createCommentVNode("", true)
                ]),
                createVNode(Transition, { name: "el-zoom-in-top" }, {
                  default: withCtx(() => [
                    cardParsedResult.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "parse-dashboard"
                    }, [
                      createVNode("div", { class: "stat-item success" }, [
                        createVNode("span", { class: "num" }, toDisplayString(cardParsedResult.value.valid.length), 1),
                        createVNode("span", { class: "label" }, "可用数量")
                      ]),
                      createVNode("div", { class: "stat-item warning" }, [
                        createVNode("span", { class: "num" }, toDisplayString(cardParsedResult.value.duplicates.length), 1),
                        createVNode("span", { class: "label" }, "重复/库存已存")
                      ]),
                      createVNode("div", { class: "stat-item danger" }, [
                        createVNode("span", { class: "num" }, toDisplayString(cardParsedResult.value.invalid.length), 1),
                        createVNode("span", { class: "label" }, "格式无效")
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                cardParsedResult.value && cardParsedResult.value.valid.length > 0 ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "解析完成",
                  type: "success",
                  closable: false,
                  "show-icon": "",
                  style: { "margin-top": "16px" }
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 将仅入库 " + toDisplayString(cardParsedResult.value.valid.length) + " 条有效卡密。重复与无效项将被忽略。 ", 1)
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
      _push(`<div class="common-section" data-v-6f09973b><span class="section-label" data-v-6f09973b>详情页帮助图片 (可选)</span><div class="image-selector" data-v-6f09973b>`);
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
        _push(`<span data-v-6f09973b>选择图片</span></div>`);
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
      _push(`</div><h2 data-v-6f09973b>准备就绪</h2><p data-v-6f09973b>请确认以下信息无误后提交</p><div class="summary-box" data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>商品:</span><span class="value" data-v-6f09973b>${ssrInterpolate(currentProduct.value?.product_name)}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>SKU:</span><span class="value" data-v-6f09973b>${ssrInterpolate(skuOptions.value.filter((s) => formStep1.skuIds.includes(s.id)).map((s) => s.label).join(", ") || "通用")}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>类型:</span><span class="value" data-v-6f09973b>${ssrInterpolate(getTypeText(currentCdkType.value))}</span></div>`);
      _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
      if (currentCdkType.value === "virtual") {
        _push(`<div data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>新增库存:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formVirtual.stock)}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>配置字段:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formVirtual.fields.join(", ") || "无")}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentCdkType.value === "shared_account") {
        _push(`<div data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>最大车位数:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formShared.maxSlots)}</span></div><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>属性字段:</span> <span class="value" data-v-6f09973b>${ssrInterpolate(formShared.attributes.map((a) => a.key).join("/"))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentCdkType.value === "one_time_cdk") {
        _push(`<div data-v-6f09973b><div class="summary-item" data-v-6f09973b><span class="label" data-v-6f09973b>有效激活码:</span> <span class="value highlight" data-v-6f09973b>${ssrInterpolate(cardParsedResult.value?.valid?.length || 0)}</span> 条</div></div>`);
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
            _push2(`上一步`);
          } else {
            return [
              createTextVNode("上一步")
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
            _push2(`${ssrInterpolate(activeStep.value === 2 ? "确认添加" : "下一步")}`);
          } else {
            return [
              createTextVNode(toDisplayString(activeStep.value === 2 ? "确认添加" : "下一步"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: imagePickerVisible.value,
        "onUpdate:modelValue": ($event) => imagePickerVisible.value = $event,
        title: "图库选择",
        width: "800px",
        "append-to-body": "",
        "destroy-on-close": "",
        class: "picker-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="picker-container" data-v-6f09973b${_scopeId}><div class="picker-sidebar" data-v-6f09973b${_scopeId}><div class="${ssrRenderClass([{ active: pickerActiveCatId.value === "" }, "picker-cat-item"])}" data-v-6f09973b${_scopeId}>全部图片</div><!--[-->`);
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
                        _push4(`上传新图片`);
                      } else {
                        return [
                          createTextVNode("上传新图片")
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
                        createTextVNode("上传新图片")
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
              _push2(ssrRenderComponent(_component_el_empty, { description: "暂无图片" }, null, _parent2, _scopeId));
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
                  }, "全部图片", 10, ["onClick"]),
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
                            createTextVNode("上传新图片")
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
                    description: "暂无图片"
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
export {
  post as default
};
//# sourceMappingURL=post-2Xu1ccKD.js.map
