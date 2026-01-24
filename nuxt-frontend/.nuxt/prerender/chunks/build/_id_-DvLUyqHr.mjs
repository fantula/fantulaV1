import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, z as arrow_left_default, bb as delete_default, p as plus_default, bz as minus_default, ba as picture_default, ah as ElMessage } from './server.mjs';
import { E as ElSkeleton } from './index-BXD0oWDt.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElRow, a as ElCol } from './index-27bUWc4s.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElDialog } from './index-CzosOSMt.mjs';
import { E as ElUpload } from './index-DhXCDWyG.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withDirectives, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { b as adminApi, a as adminProductApi } from './admin-supabase-nszo-IoU.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-D_b573Qt.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-DOE061f1.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const cdkId = computed(() => route.params.id);
    const loading = ref(true);
    const submitting = ref(false);
    const cdkData = ref(null);
    const formVirtual = reactive({
      stock: 0,
      fields: []
    });
    const formShared = reactive({
      attributes: [{ key: "", value: "" }],
      maxSlots: 1
    });
    const formOneTime = reactive({
      code: ""
    });
    const usedStock = computed(() => {
      var _a, _b, _c;
      const total = ((_b = (_a = cdkData.value) == null ? void 0 : _a.account_data) == null ? void 0 : _b.stock) || 0;
      if (((_c = cdkData.value) == null ? void 0 : _c.status) === "idle") return 0;
      return Math.max(1, Math.floor(total * 0.5));
    });
    const minStock = computed(() => usedStock.value);
    const commonImage = ref("");
    const imagePickerVisible = ref(false);
    const pickerLoading = ref(false);
    const galleryImages = ref([]);
    const pickerCategories = ref([]);
    const pickerActiveCatId = ref("");
    const selectedSkuIds = ref([]);
    const skuOptions = ref([]);
    const loadingSkus = ref(false);
    const categories = ref([]);
    const products = ref([]);
    const selectedCategoryId = ref("");
    const selectedProductId = ref("");
    const typeMap = { "virtual": "virtual", "shared": "shared_account", "one_time": "one_time_cdk" };
    const currentCdkType = computed(() => {
      var _a;
      const urlType = route.query.type;
      return typeMap[urlType] || ((_a = cdkData.value) == null ? void 0 : _a.cdk_type) || "virtual";
    });
    const filteredProducts = computed(() => {
      if (!selectedCategoryId.value) return [];
      return products.value.filter((p) => p.category_id === selectedCategoryId.value);
    });
    const getTypeText = (type) => {
      const map = {
        "virtual": "\u865A\u62DF\u5145\u503C",
        "shared": "\u8D26\u53F7/\u5408\u79DF",
        "one_time": "\u6FC0\u6D3B\u7801"
      };
      return map[type || ""] || type || "-";
    };
    const getStatusText = (status) => {
      const map = { "idle": "\u7A7A\u95F2", "using": "\u4F7F\u7528\u4E2D", "used": "\u5DF2\u4F7F\u7528" };
      return map[status || ""] || status || "-";
    };
    const getStatusType = (status) => {
      const map = { "idle": "success", "using": "warning", "used": "info" };
      return map[status || ""] || "info";
    };
    const loadSkuOptions = async (productId) => {
      loadingSkus.value = true;
      try {
        const skuRes = await adminProductApi.getProductWithSkus(productId);
        if (skuRes.success && skuRes.skus) {
          const targetType = currentCdkType.value;
          let filteredSkus = skuRes.skus;
          if (targetType) {
            filteredSkus = filteredSkus.filter((sku) => sku.product_type === targetType);
          }
          skuOptions.value = filteredSkus.map((sku) => {
            const specValues = Object.values(sku.spec_combination || {}).join(" ");
            return { id: sku.id, label: specValues || "\u9ED8\u8BA4\u89C4\u683C" };
          });
        }
      } finally {
        loadingSkus.value = false;
      }
    };
    const handleCategoryChange = () => {
      selectedProductId.value = "";
      selectedSkuIds.value = [];
      skuOptions.value = [];
    };
    const handleProductChange = async (productId) => {
      selectedSkuIds.value = [];
      skuOptions.value = [];
      if (productId) {
        await loadSkuOptions(productId);
      }
    };
    const addVirtualField = () => formVirtual.fields.push("");
    const removeVirtualField = (idx) => formVirtual.fields.splice(idx, 1);
    const addSharedAttr = () => formShared.attributes.push({ key: "", value: "" });
    const removeSharedAttr = (idx) => {
      if (formShared.attributes.length === 1) {
        ElMessage.warning("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5C5E\u6027");
        return;
      }
      formShared.attributes.splice(idx, 1);
    };
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
    const handleSubmit = async () => {
      var _a;
      if (!cdkData.value) return;
      submitting.value = true;
      try {
        const updateData = {
          account_data: commonImage.value ? { image: commonImage.value } : null
        };
        if (selectedProductId.value) {
          const selectedProduct = products.value.find((p) => p.id === selectedProductId.value);
          if (selectedProduct) {
            updateData.product_snapshot = {
              product_id: selectedProduct.id,
              product_name: selectedProduct.product_name,
              product_image: selectedProduct.image || void 0
            };
          }
        }
        if (cdkData.value.cdk_type === "virtual") {
          if (formVirtual.stock < minStock.value) {
            ElMessage.error(`\u5E93\u5B58\u4E0D\u80FD\u5C0F\u4E8E\u5DF2\u4F7F\u7528\u6570\u91CF (${minStock.value})`);
            return;
          }
          updateData.stock = formVirtual.stock;
          updateData.code = JSON.stringify({
            fields: formVirtual.fields.filter((f) => f.trim())
          });
        } else if (cdkData.value.cdk_type === "shared") {
          const attrObj = {};
          formShared.attributes.forEach((a) => {
            if (a.key) attrObj[a.key] = a.value;
          });
          updateData.code = JSON.stringify(attrObj);
          updateData.max_slots = formShared.maxSlots;
        } else if (cdkData.value.cdk_type === "one_time") {
          if (!formOneTime.code.trim()) {
            ElMessage.error("\u6FC0\u6D3B\u7801\u4E0D\u80FD\u4E3A\u7A7A");
            return;
          }
          updateData.code = formOneTime.code.trim();
        }
        const res = await adminCdkApi.updateCdk(cdkId.value, updateData);
        if (!res.success) {
          ElMessage.error(res.error || "\u4FDD\u5B58\u5931\u8D25");
          return;
        }
        const currentMappings = cdkData.value.sku_mappings || [];
        const currentSkuIds = currentMappings.map((m) => m.sku_id);
        const toRemove = currentMappings.filter((m) => !selectedSkuIds.value.includes(m.sku_id));
        for (const mapping of toRemove) {
          const rmRes = await adminCdkApi.removeCdkSkuMapping(mapping.id);
          if (!rmRes.success) {
            ElMessage.error(`\u89E3\u7ED1\u5931\u8D25: ${rmRes.error}`);
          }
        }
        const toAdd = selectedSkuIds.value.filter((id) => !currentSkuIds.includes(id));
        for (const skuId of toAdd) {
          const addRes = await adminCdkApi.addCdkSkuMapping(cdkId.value, skuId);
          if (!addRes.success) {
            ElMessage.warning(`SKU \u7ED1\u5B9A\u5931\u8D25: ${addRes.error}`);
          }
        }
        ElMessage.success("\u4FDD\u5B58\u6210\u529F");
        const typeRouteMap = {
          "virtual": "virtual",
          "shared": "accounts",
          "one_time": "keys"
        };
        const targetRoute = typeRouteMap[((_a = cdkData.value) == null ? void 0 : _a.cdk_type) || ""] || "virtual";
        router.push(`/_mgmt_9Xfa3/cdk/${targetRoute}`);
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_form = ElForm;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_form_item = ElFormItem;
      const _component_el_tag = ElTag;
      const _component_el_input = ElInput;
      const _component_el_divider = ElDivider;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_alert = ElAlert;
      const _component_el_input_number = ElInputNumber;
      const _component_el_dialog = ElDialog;
      const _component_el_upload = ElUpload;
      const _component_el_image = ElImage;
      const _component_el_empty = ElEmpty;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdk-edit-page" }, _attrs))} data-v-2f9cf01b><div class="wizard-header" data-v-2f9cf01b><div class="header-left" data-v-2f9cf01b>`);
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
      _push(`<div class="header-titles" data-v-2f9cf01b><div class="main-title" data-v-2f9cf01b>\u7F16\u8F91\u8D44\u6E90</div><div class="sub-title" data-v-2f9cf01b>EDIT RESOURCE</div></div></div><div class="header-center" data-v-2f9cf01b></div><div class="header-right" data-v-2f9cf01b></div></div>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-2f9cf01b>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          rows: 8,
          animated: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="wizard-body" data-v-2f9cf01b><div class="centered-container" data-v-2f9cf01b><div class="form-card" data-v-2f9cf01b><h3 class="card-title" data-v-2f9cf01b>\u57FA\u7840\u4FE1\u606F</h3>`);
        _push(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_col, { span: 8 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "CDK \u7C7B\u578B" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_tag, {
                                  type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.cdk_type),
                                  size: "large"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a3, _b3;
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(getTypeText((_a3 = cdkData.value) == null ? void 0 : _a3.cdk_type))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(getTypeText((_b3 = cdkData.value) == null ? void 0 : _b3.cdk_type)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_tag, {
                                    type: getStatusType((_b2 = cdkData.value) == null ? void 0 : _b2.cdk_type),
                                    size: "large"
                                  }, {
                                    default: withCtx(() => {
                                      var _a3;
                                      return [
                                        createTextVNode(toDisplayString(getTypeText((_a3 = cdkData.value) == null ? void 0 : _a3.cdk_type)), 1)
                                      ];
                                    }),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "CDK \u7C7B\u578B" }, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createVNode(_component_el_tag, {
                                    type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.cdk_type),
                                    size: "large"
                                  }, {
                                    default: withCtx(() => {
                                      var _a3;
                                      return [
                                        createTextVNode(toDisplayString(getTypeText((_a3 = cdkData.value) == null ? void 0 : _a3.cdk_type)), 1)
                                      ];
                                    }),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }),
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_tag, {
                                  type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.status)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a3, _b3;
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(getStatusText((_a3 = cdkData.value) == null ? void 0 : _a3.status))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(getStatusText((_b3 = cdkData.value) == null ? void 0 : _b3.status)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_tag, {
                                    type: getStatusType((_b2 = cdkData.value) == null ? void 0 : _b2.status)
                                  }, {
                                    default: withCtx(() => {
                                      var _a3;
                                      return [
                                        createTextVNode(toDisplayString(getStatusText((_a3 = cdkData.value) == null ? void 0 : _a3.status)), 1)
                                      ];
                                    }),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createVNode(_component_el_tag, {
                                    type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.status)
                                  }, {
                                    default: withCtx(() => {
                                      var _a3;
                                      return [
                                        createTextVNode(toDisplayString(getStatusText((_a3 = cdkData.value) == null ? void 0 : _a3.status)), 1)
                                      ];
                                    }),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }),
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "CDK ID" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  value: (_a2 = cdkData.value) == null ? void 0 : _a2.id,
                                  disabled: "",
                                  size: "small",
                                  style: { "font-family": "monospace", "font-size": "12px" }
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    value: (_b2 = cdkData.value) == null ? void 0 : _b2.id,
                                    disabled: "",
                                    size: "small",
                                    style: { "font-family": "monospace", "font-size": "12px" }
                                  }, null, 8, ["value"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "CDK ID" }, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createVNode(_component_el_input, {
                                    value: (_a2 = cdkData.value) == null ? void 0 : _a2.id,
                                    disabled: "",
                                    size: "small",
                                    style: { "font-family": "monospace", "font-size": "12px" }
                                  }, null, 8, ["value"])
                                ];
                              }),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "CDK \u7C7B\u578B" }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(_component_el_tag, {
                                  type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.cdk_type),
                                  size: "large"
                                }, {
                                  default: withCtx(() => {
                                    var _a3;
                                    return [
                                      createTextVNode(toDisplayString(getTypeText((_a3 = cdkData.value) == null ? void 0 : _a3.cdk_type)), 1)
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["type"])
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(_component_el_tag, {
                                  type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.status)
                                }, {
                                  default: withCtx(() => {
                                    var _a3;
                                    return [
                                      createTextVNode(toDisplayString(getStatusText((_a3 = cdkData.value) == null ? void 0 : _a3.status)), 1)
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["type"])
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "CDK ID" }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(_component_el_input, {
                                  value: (_a2 = cdkData.value) == null ? void 0 : _a2.id,
                                  disabled: "",
                                  size: "small",
                                  style: { "font-family": "monospace", "font-size": "12px" }
                                }, null, 8, ["value"])
                              ];
                            }),
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
              _push2(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u5546\u54C1\u5173\u8054`);
                  } else {
                    return [
                      createTextVNode("\u5546\u54C1\u5173\u8054")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_col, { span: 8 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "\u5546\u54C1\u5206\u7C7B" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: selectedCategoryId.value,
                                  "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                  placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                  filterable: "",
                                  onChange: handleCategoryChange,
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
                                    modelValue: selectedCategoryId.value,
                                    "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                    filterable: "",
                                    onChange: handleCategoryChange,
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
                            createVNode(_component_el_form_item, { label: "\u5546\u54C1\u5206\u7C7B" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedCategoryId.value,
                                  "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                  placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                  filterable: "",
                                  onChange: handleCategoryChange,
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
                    _push3(ssrRenderComponent(_component_el_col, { span: 8 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: selectedProductId.value,
                                  "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                  placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                                  filterable: "",
                                  onChange: handleProductChange,
                                  disabled: !selectedCategoryId.value,
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(filteredProducts.value, (prod) => {
                                        _push6(ssrRenderComponent(_component_el_option, {
                                          key: prod.id,
                                          label: prod.product_name,
                                          value: prod.id
                                        }, null, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
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
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_select, {
                                    modelValue: selectedProductId.value,
                                    "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                    placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                                    filterable: "",
                                    onChange: handleProductChange,
                                    disabled: !selectedCategoryId.value,
                                    style: { "width": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                                        return openBlock(), createBlock(_component_el_option, {
                                          key: prod.id,
                                          label: prod.product_name,
                                          value: prod.id
                                        }, null, 8, ["label", "value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedProductId.value,
                                  "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                  placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                                  filterable: "",
                                  onChange: handleProductChange,
                                  disabled: !selectedCategoryId.value,
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                                      return openBlock(), createBlock(_component_el_option, {
                                        key: prod.id,
                                        label: prod.product_name,
                                        value: prod.id
                                      }, null, 8, ["label", "value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "\u5173\u8054 SKU (\u53EF\u591A\u9009)" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: selectedSkuIds.value,
                                  "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                  multiple: "",
                                  placeholder: "\u9009\u62E9 SKU",
                                  filterable: "",
                                  loading: loadingSkus.value,
                                  disabled: !selectedProductId.value,
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(skuOptions.value, (sku) => {
                                        _push6(ssrRenderComponent(_component_el_option, {
                                          key: sku.id,
                                          label: sku.label,
                                          value: sku.id
                                        }, null, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
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
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_select, {
                                    modelValue: selectedSkuIds.value,
                                    "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                    multiple: "",
                                    placeholder: "\u9009\u62E9 SKU",
                                    filterable: "",
                                    loading: loadingSkus.value,
                                    disabled: !selectedProductId.value,
                                    style: { "width": "100%" }
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
                                  }, 8, ["modelValue", "onUpdate:modelValue", "loading", "disabled"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "\u5173\u8054 SKU (\u53EF\u591A\u9009)" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedSkuIds.value,
                                  "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                  multiple: "",
                                  placeholder: "\u9009\u62E9 SKU",
                                  filterable: "",
                                  loading: loadingSkus.value,
                                  disabled: !selectedProductId.value,
                                  style: { "width": "100%" }
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
                                }, 8, ["modelValue", "onUpdate:modelValue", "loading", "disabled"])
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
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u5546\u54C1\u5206\u7C7B" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: selectedCategoryId.value,
                                "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                                filterable: "",
                                onChange: handleCategoryChange,
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
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: selectedProductId.value,
                                "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                                filterable: "",
                                onChange: handleProductChange,
                                disabled: !selectedCategoryId.value,
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                                    return openBlock(), createBlock(_component_el_option, {
                                      key: prod.id,
                                      label: prod.product_name,
                                      value: prod.id
                                    }, null, 8, ["label", "value"]);
                                  }), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "\u5173\u8054 SKU (\u53EF\u591A\u9009)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: selectedSkuIds.value,
                                "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                multiple: "",
                                placeholder: "\u9009\u62E9 SKU",
                                filterable: "",
                                loading: loadingSkus.value,
                                disabled: !selectedProductId.value,
                                style: { "width": "100%" }
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
                              }, 8, ["modelValue", "onUpdate:modelValue", "loading", "disabled"])
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
              if (selectedSkuIds.value.length === 0 && skuOptions.value.length > 0) {
                _push2(ssrRenderComponent(_component_el_alert, {
                  type: "warning",
                  closable: false,
                  style: { "margin-top": "8px" }
                }, {
                  title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`\u26A0\uFE0F \u8BE5 CDK \u672A\u7ED1\u5B9A SKU\uFF0C\u8BF7\u9009\u62E9 SKU \u8FDB\u884C\u5173\u8054`);
                    } else {
                      return [
                        createTextVNode("\u26A0\uFE0F \u8BE5 CDK \u672A\u7ED1\u5B9A SKU\uFF0C\u8BF7\u9009\u62E9 SKU \u8FDB\u884C\u5173\u8054")
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
                createVNode(_component_el_row, { gutter: 20 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "CDK \u7C7B\u578B" }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode(_component_el_tag, {
                                type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.cdk_type),
                                size: "large"
                              }, {
                                default: withCtx(() => {
                                  var _a3;
                                  return [
                                    createTextVNode(toDisplayString(getTypeText((_a3 = cdkData.value) == null ? void 0 : _a3.cdk_type)), 1)
                                  ];
                                }),
                                _: 1
                              }, 8, ["type"])
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode(_component_el_tag, {
                                type: getStatusType((_a2 = cdkData.value) == null ? void 0 : _a2.status)
                              }, {
                                default: withCtx(() => {
                                  var _a3;
                                  return [
                                    createTextVNode(toDisplayString(getStatusText((_a3 = cdkData.value) == null ? void 0 : _a3.status)), 1)
                                  ];
                                }),
                                _: 1
                              }, 8, ["type"])
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "CDK ID" }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode(_component_el_input, {
                                value: (_a2 = cdkData.value) == null ? void 0 : _a2.id,
                                disabled: "",
                                size: "small",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["value"])
                            ];
                          }),
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
                    createTextVNode("\u5546\u54C1\u5173\u8054")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_row, { gutter: 20 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "\u5546\u54C1\u5206\u7C7B" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: selectedCategoryId.value,
                              "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                              placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
                              filterable: "",
                              onChange: handleCategoryChange,
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
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: selectedProductId.value,
                              "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                              placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                              filterable: "",
                              onChange: handleProductChange,
                              disabled: !selectedCategoryId.value,
                              style: { "width": "100%" }
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (prod) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: prod.id,
                                    label: prod.product_name,
                                    value: prod.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "\u5173\u8054 SKU (\u53EF\u591A\u9009)" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: selectedSkuIds.value,
                              "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                              multiple: "",
                              placeholder: "\u9009\u62E9 SKU",
                              filterable: "",
                              loading: loadingSkus.value,
                              disabled: !selectedProductId.value,
                              style: { "width": "100%" }
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
                            }, 8, ["modelValue", "onUpdate:modelValue", "loading", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                selectedSkuIds.value.length === 0 && skuOptions.value.length > 0 ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  type: "warning",
                  closable: false,
                  style: { "margin-top": "8px" }
                }, {
                  title: withCtx(() => [
                    createTextVNode("\u26A0\uFE0F \u8BE5 CDK \u672A\u7ED1\u5B9A SKU\uFF0C\u8BF7\u9009\u62E9 SKU \u8FDB\u884C\u5173\u8054")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="form-card" data-v-2f9cf01b><h3 class="card-title" data-v-2f9cf01b>\u8D44\u6E90\u914D\u7F6E (\u53EF\u7F16\u8F91)</h3>`);
        if (((_a = cdkData.value) == null ? void 0 : _a.cdk_type) === "virtual") {
          _push(`<div data-v-2f9cf01b>`);
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
                        min: minStock.value,
                        size: "large",
                        style: { "width": "100%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="form-tip" data-v-2f9cf01b${_scopeId2}> \u5DF2\u4F7F\u7528: ${ssrInterpolate(usedStock.value)} \u4E2A\uFF0C\u6700\u5C0F\u503C\u4E0D\u80FD\u4F4E\u4E8E\u5DF2\u4F7F\u7528\u6570\u91CF </div>`);
                    } else {
                      return [
                        createVNode(_component_el_input_number, {
                          modelValue: formVirtual.stock,
                          "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                          min: minStock.value,
                          size: "large",
                          style: { "width": "100%" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "min"]),
                        createVNode("div", { class: "form-tip" }, " \u5DF2\u4F7F\u7528: " + toDisplayString(usedStock.value) + " \u4E2A\uFF0C\u6700\u5C0F\u503C\u4E0D\u80FD\u4F4E\u4E8E\u5DF2\u4F7F\u7528\u6570\u91CF ", 1)
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
                _push2(`<div class="dynamic-fields" data-v-2f9cf01b${_scopeId}><!--[-->`);
                ssrRenderList(formVirtual.fields, (field, idx) => {
                  _push2(`<div class="field-row" data-v-2f9cf01b${_scopeId}>`);
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
                _push2(`</div>`);
              } else {
                return [
                  createVNode(_component_el_form_item, { label: "\u53EF\u7528\u5E93\u5B58\u6570" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: formVirtual.stock,
                        "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                        min: minStock.value,
                        size: "large",
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min"]),
                      createVNode("div", { class: "form-tip" }, " \u5DF2\u4F7F\u7528: " + toDisplayString(usedStock.value) + " \u4E2A\uFF0C\u6700\u5C0F\u503C\u4E0D\u80FD\u4F4E\u4E8E\u5DF2\u4F7F\u7528\u6570\u91CF ", 1)
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
                    })
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
        if (((_b = cdkData.value) == null ? void 0 : _b.cdk_type) === "shared") {
          _push(`<div data-v-2f9cf01b>`);
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
                        max: 10
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="form-tip" data-v-2f9cf01b${_scopeId2}>\u51B3\u5B9A\u8BE5\u8D44\u6E90\u53EF\u540C\u65F6\u670D\u52A1\u7684\u7528\u6237\u6570</div>`);
                    } else {
                      return [
                        createVNode(_component_el_input_number, {
                          modelValue: formShared.maxSlots,
                          "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                          min: 1,
                          max: 10
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
                _push2(`<div class="kv-list" data-v-2f9cf01b${_scopeId}><!--[-->`);
                ssrRenderList(formShared.attributes, (attr, idx) => {
                  _push2(`<div class="kv-row" data-v-2f9cf01b${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_input, {
                    modelValue: attr.key,
                    "onUpdate:modelValue": ($event) => attr.key = $event,
                    placeholder: "\u5B57\u6BB5\u540D(\u5982:\u8D26\u53F7)",
                    style: { "width": "140px" }
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="separator" data-v-2f9cf01b${_scopeId}>:</span>`);
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
                      onClick: ($event) => removeSharedAttr(idx)
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
                  onClick: addSharedAttr
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
                        max: 10
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
                          onClick: ($event) => removeSharedAttr(idx)
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
                      onClick: addSharedAttr
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" + \u6DFB\u52A0\u5C5E\u6027 ")
                      ]),
                      _: 1
                    })
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
        if (((_c = cdkData.value) == null ? void 0 : _c.cdk_type) === "one_time") {
          _push(`<div data-v-2f9cf01b>`);
          _push(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_form_item, { label: "\u6FC0\u6D3B\u7801\u5185\u5BB9" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: formOneTime.code,
                        "onUpdate:modelValue": ($event) => formOneTime.code = $event,
                        placeholder: "\u8F93\u5165\u6FC0\u6D3B\u7801"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="form-tip" data-v-2f9cf01b${_scopeId2}>\u6CE8\u610F\uFF1A\u66F4\u6539\u540E\u4F1A\u5F71\u54CD\u5DF2\u5173\u8054\u7684\u8BA2\u5355</div>`);
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: formOneTime.code,
                          "onUpdate:modelValue": ($event) => formOneTime.code = $event,
                          placeholder: "\u8F93\u5165\u6FC0\u6D3B\u7801"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "\u6CE8\u610F\uFF1A\u66F4\u6539\u540E\u4F1A\u5F71\u54CD\u5DF2\u5173\u8054\u7684\u8BA2\u5355")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_form_item, { label: "\u6FC0\u6D3B\u7801\u5185\u5BB9" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: formOneTime.code,
                        "onUpdate:modelValue": ($event) => formOneTime.code = $event,
                        placeholder: "\u8F93\u5165\u6FC0\u6D3B\u7801"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "\u6CE8\u610F\uFF1A\u66F4\u6539\u540E\u4F1A\u5F71\u54CD\u5DF2\u5173\u8054\u7684\u8BA2\u5355")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u8BE6\u60C5\u9875\u5E2E\u52A9\u56FE\u7247`);
            } else {
              return [
                createTextVNode("\u8BE6\u60C5\u9875\u5E2E\u52A9\u56FE\u7247")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="form-item" data-v-2f9cf01b><div class="image-selector" data-v-2f9cf01b>`);
        if (commonImage.value) {
          _push(`<img${ssrRenderAttr("src", commonImage.value)} class="preview-img" data-v-2f9cf01b>`);
        } else {
          _push(`<div class="placeholder" data-v-2f9cf01b>`);
          _push(ssrRenderComponent(_component_el_icon, { size: 24 }, {
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
          _push(`<span data-v-2f9cf01b>\u70B9\u51FB\u9009\u62E9\u56FE\u7247</span></div>`);
        }
        _push(`</div><div class="form-tip" style="${ssrRenderStyle({ "margin-top": "8px" })}" data-v-2f9cf01b> \u5C06\u5728\u5BA2\u6237\u7AEF\u8BA2\u5355\u8BE6\u60C5\u9875\u5C55\u793A\uFF0C\u7528\u4E8E\u5F15\u5BFC\u7528\u6237\u4F7F\u7528 </div></div></div><div class="form-actions" data-v-2f9cf01b>`);
        _push(ssrRenderComponent(_component_el_button, {
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u53D6\u6D88`);
            } else {
              return [
                createTextVNode("\u53D6\u6D88")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          onClick: handleSubmit,
          loading: submitting.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u4FDD\u5B58\u4FEE\u6539 `);
            } else {
              return [
                createTextVNode(" \u4FDD\u5B58\u4FEE\u6539 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: imagePickerVisible.value,
        "onUpdate:modelValue": ($event) => imagePickerVisible.value = $event,
        title: "\u9009\u62E9\u56FE\u7247",
        width: "800px",
        "append-to-body": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="picker-container" data-v-2f9cf01b${_scopeId}><div class="picker-sidebar" data-v-2f9cf01b${_scopeId}><div class="${ssrRenderClass([{ active: pickerActiveCatId.value === "" }, "picker-cat-item"])}" data-v-2f9cf01b${_scopeId}>\u5168\u90E8\u56FE\u7247</div><!--[-->`);
            ssrRenderList(pickerCategories.value, (cat) => {
              _push2(`<div class="${ssrRenderClass([{ active: pickerActiveCatId.value === cat.id }, "picker-cat-item"])}" data-v-2f9cf01b${_scopeId}>${ssrInterpolate(cat.name)}</div>`);
            });
            _push2(`<!--]--></div><div${ssrRenderAttrs(mergeProps({ class: "picker-main" }, ssrGetDirectiveProps(_ctx, _directive_loading, pickerLoading.value)))} data-v-2f9cf01b${_scopeId}><div class="picker-toolbar" data-v-2f9cf01b${_scopeId}>`);
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
            _push2(`</div><div class="picker-grid" data-v-2f9cf01b${_scopeId}><!--[-->`);
            ssrRenderList(galleryImages.value, (img) => {
              _push2(`<div class="picker-img-card" data-v-2f9cf01b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover"
              }, null, _parent2, _scopeId));
              _push2(`<div class="picker-img-name" data-v-2f9cf01b${_scopeId}>${ssrInterpolate(img.name)}</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/cdk/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f9cf01b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DvLUyqHr.mjs.map
