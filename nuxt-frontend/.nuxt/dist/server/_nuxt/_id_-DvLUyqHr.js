import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElIcon, z as arrow_left_default, bb as delete_default, p as plus_default, bz as minus_default, ba as picture_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElSkeleton } from "./index-BXD0oWDt.js";
import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { E as ElRow, a as ElCol } from "./index-27bUWc4s.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElDivider } from "./index-QnhSR2oe.js";
import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElDialog } from "./index-CzosOSMt.js";
import { E as ElUpload } from "./index-DhXCDWyG.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElEmpty } from "./index-DKY_z0U1.js";
/* empty css                   */
/* empty css                          */
/* empty css                      */
/* empty css                */
/* empty css                */
/* empty css                  */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                         */
/* empty css                   */
/* empty css                    */
/* empty css                     */
/* empty css                         */
/* empty css                  */
/* empty css                    */
import { defineComponent, computed, ref, reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrGetDirectiveProps } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { b as adminApi, a as adminProductApi } from "./admin-supabase-nszo-IoU.js";
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
import "async-validator";
import "./index-Dxw_X3Hq.js";
import "./event-BZTOGHfp.js";
import "./index-ClPmkyX9.js";
import "./aria-B8G3G_75.js";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./index-D_b573Qt.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-DOE061f1.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
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
      const total = cdkData.value?.account_data?.stock || 0;
      if (cdkData.value?.status === "idle") return 0;
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
      const urlType = route.query.type;
      return typeMap[urlType] || cdkData.value?.cdk_type || "virtual";
    });
    const filteredProducts = computed(() => {
      if (!selectedCategoryId.value) return [];
      return products.value.filter((p) => p.category_id === selectedCategoryId.value);
    });
    const getTypeText = (type) => {
      const map = {
        "virtual": "虚拟充值",
        "shared": "账号/合租",
        "one_time": "激活码"
      };
      return map[type || ""] || type || "-";
    };
    const getStatusText = (status) => {
      const map = { "idle": "空闲", "using": "使用中", "used": "已使用" };
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
            return { id: sku.id, label: specValues || "默认规格" };
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
        ElMessage.warning("至少保留一个属性");
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
    const handleSubmit = async () => {
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
            ElMessage.error(`库存不能小于已使用数量 (${minStock.value})`);
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
            ElMessage.error("激活码不能为空");
            return;
          }
          updateData.code = formOneTime.code.trim();
        }
        const res = await adminCdkApi.updateCdk(cdkId.value, updateData);
        if (!res.success) {
          ElMessage.error(res.error || "保存失败");
          return;
        }
        const currentMappings = cdkData.value.sku_mappings || [];
        const currentSkuIds = currentMappings.map((m) => m.sku_id);
        const toRemove = currentMappings.filter((m) => !selectedSkuIds.value.includes(m.sku_id));
        for (const mapping of toRemove) {
          const rmRes = await adminCdkApi.removeCdkSkuMapping(mapping.id);
          if (!rmRes.success) {
            ElMessage.error(`解绑失败: ${rmRes.error}`);
          }
        }
        const toAdd = selectedSkuIds.value.filter((id) => !currentSkuIds.includes(id));
        for (const skuId of toAdd) {
          const addRes = await adminCdkApi.addCdkSkuMapping(cdkId.value, skuId);
          if (!addRes.success) {
            ElMessage.warning(`SKU 绑定失败: ${addRes.error}`);
          }
        }
        ElMessage.success("保存成功");
        const typeRouteMap = {
          "virtual": "virtual",
          "shared": "accounts",
          "one_time": "keys"
        };
        const targetRoute = typeRouteMap[cdkData.value?.cdk_type || ""] || "virtual";
        router.push(`/_mgmt_9Xfa3/cdk/${targetRoute}`);
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
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
      _push(`<div class="header-titles" data-v-2f9cf01b><div class="main-title" data-v-2f9cf01b>编辑资源</div><div class="sub-title" data-v-2f9cf01b>EDIT RESOURCE</div></div></div><div class="header-center" data-v-2f9cf01b></div><div class="header-right" data-v-2f9cf01b></div></div>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-2f9cf01b>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          rows: 8,
          animated: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="wizard-body" data-v-2f9cf01b><div class="centered-container" data-v-2f9cf01b><div class="form-card" data-v-2f9cf01b><h3 class="card-title" data-v-2f9cf01b>基础信息</h3>`);
        _push(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_col, { span: 8 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "CDK 类型" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_tag, {
                                  type: getStatusType(cdkData.value?.cdk_type),
                                  size: "large"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(getTypeText(cdkData.value?.cdk_type))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(getTypeText(cdkData.value?.cdk_type)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_tag, {
                                    type: getStatusType(cdkData.value?.cdk_type),
                                    size: "large"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(getTypeText(cdkData.value?.cdk_type)), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "CDK 类型" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_tag, {
                                  type: getStatusType(cdkData.value?.cdk_type),
                                  size: "large"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getTypeText(cdkData.value?.cdk_type)), 1)
                                  ]),
                                  _: 1
                                }, 8, ["type"])
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "当前状态" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_tag, {
                                  type: getStatusType(cdkData.value?.status)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(getStatusText(cdkData.value?.status))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(getStatusText(cdkData.value?.status)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_tag, {
                                    type: getStatusType(cdkData.value?.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(getStatusText(cdkData.value?.status)), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "当前状态" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_tag, {
                                  type: getStatusType(cdkData.value?.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getStatusText(cdkData.value?.status)), 1)
                                  ]),
                                  _: 1
                                }, 8, ["type"])
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "CDK ID" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  value: cdkData.value?.id,
                                  disabled: "",
                                  size: "small",
                                  style: { "font-family": "monospace", "font-size": "12px" }
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    value: cdkData.value?.id,
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
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  value: cdkData.value?.id,
                                  disabled: "",
                                  size: "small",
                                  style: { "font-family": "monospace", "font-size": "12px" }
                                }, null, 8, ["value"])
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
                          createVNode(_component_el_form_item, { label: "CDK 类型" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_tag, {
                                type: getStatusType(cdkData.value?.cdk_type),
                                size: "large"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getTypeText(cdkData.value?.cdk_type)), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "当前状态" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_tag, {
                                type: getStatusType(cdkData.value?.status)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getStatusText(cdkData.value?.status)), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 8 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "CDK ID" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                value: cdkData.value?.id,
                                disabled: "",
                                size: "small",
                                style: { "font-family": "monospace", "font-size": "12px" }
                              }, null, 8, ["value"])
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
              _push2(ssrRenderComponent(_component_el_divider, { "content-position": "left" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`商品关联`);
                  } else {
                    return [
                      createTextVNode("商品关联")
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "商品分类" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: selectedCategoryId.value,
                                  "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                  placeholder: "请选择分类",
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
                                    placeholder: "请选择分类",
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
                            createVNode(_component_el_form_item, { label: "商品分类" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedCategoryId.value,
                                  "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                  placeholder: "请选择分类",
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "选择商品" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: selectedProductId.value,
                                  "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                  placeholder: "请选择商品",
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
                                    placeholder: "请选择商品",
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
                            createVNode(_component_el_form_item, { label: "选择商品" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedProductId.value,
                                  "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                  placeholder: "请选择商品",
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
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "关联 SKU (可多选)" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: selectedSkuIds.value,
                                  "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                  multiple: "",
                                  placeholder: "选择 SKU",
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
                                    placeholder: "选择 SKU",
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
                            createVNode(_component_el_form_item, { label: "关联 SKU (可多选)" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: selectedSkuIds.value,
                                  "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                  multiple: "",
                                  placeholder: "选择 SKU",
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
                          createVNode(_component_el_form_item, { label: "商品分类" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: selectedCategoryId.value,
                                "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                                placeholder: "请选择分类",
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
                          createVNode(_component_el_form_item, { label: "选择商品" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: selectedProductId.value,
                                "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                                placeholder: "请选择商品",
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
                          createVNode(_component_el_form_item, { label: "关联 SKU (可多选)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: selectedSkuIds.value,
                                "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                                multiple: "",
                                placeholder: "选择 SKU",
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
                      _push3(`⚠️ 该 CDK 未绑定 SKU，请选择 SKU 进行关联`);
                    } else {
                      return [
                        createTextVNode("⚠️ 该 CDK 未绑定 SKU，请选择 SKU 进行关联")
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
                        createVNode(_component_el_form_item, { label: "CDK 类型" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_tag, {
                              type: getStatusType(cdkData.value?.cdk_type),
                              size: "large"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getTypeText(cdkData.value?.cdk_type)), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "当前状态" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_tag, {
                              type: getStatusType(cdkData.value?.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getStatusText(cdkData.value?.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "CDK ID" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              value: cdkData.value?.id,
                              disabled: "",
                              size: "small",
                              style: { "font-family": "monospace", "font-size": "12px" }
                            }, null, 8, ["value"])
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
                    createTextVNode("商品关联")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_row, { gutter: 20 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_col, { span: 8 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "商品分类" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: selectedCategoryId.value,
                              "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                              placeholder: "请选择分类",
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
                        createVNode(_component_el_form_item, { label: "选择商品" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: selectedProductId.value,
                              "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                              placeholder: "请选择商品",
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
                        createVNode(_component_el_form_item, { label: "关联 SKU (可多选)" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: selectedSkuIds.value,
                              "onUpdate:modelValue": ($event) => selectedSkuIds.value = $event,
                              multiple: "",
                              placeholder: "选择 SKU",
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
                    createTextVNode("⚠️ 该 CDK 未绑定 SKU，请选择 SKU 进行关联")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="form-card" data-v-2f9cf01b><h3 class="card-title" data-v-2f9cf01b>资源配置 (可编辑)</h3>`);
        if (cdkData.value?.cdk_type === "virtual") {
          _push(`<div data-v-2f9cf01b>`);
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
                        min: minStock.value,
                        size: "large",
                        style: { "width": "100%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="form-tip" data-v-2f9cf01b${_scopeId2}> 已使用: ${ssrInterpolate(usedStock.value)} 个，最小值不能低于已使用数量 </div>`);
                    } else {
                      return [
                        createVNode(_component_el_input_number, {
                          modelValue: formVirtual.stock,
                          "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                          min: minStock.value,
                          size: "large",
                          style: { "width": "100%" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "min"]),
                        createVNode("div", { class: "form-tip" }, " 已使用: " + toDisplayString(usedStock.value) + " 个，最小值不能低于已使用数量 ", 1)
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
                _push2(`<div class="dynamic-fields" data-v-2f9cf01b${_scopeId}><!--[-->`);
                ssrRenderList(formVirtual.fields, (field, idx) => {
                  _push2(`<div class="field-row" data-v-2f9cf01b${_scopeId}>`);
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
                _push2(`</div>`);
              } else {
                return [
                  createVNode(_component_el_form_item, { label: "可用库存数" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: formVirtual.stock,
                        "onUpdate:modelValue": ($event) => formVirtual.stock = $event,
                        min: minStock.value,
                        size: "large",
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min"]),
                      createVNode("div", { class: "form-tip" }, " 已使用: " + toDisplayString(usedStock.value) + " 个，最小值不能低于已使用数量 ", 1)
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
        if (cdkData.value?.cdk_type === "shared") {
          _push(`<div data-v-2f9cf01b>`);
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
                        max: 10
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="form-tip" data-v-2f9cf01b${_scopeId2}>决定该资源可同时服务的用户数</div>`);
                    } else {
                      return [
                        createVNode(_component_el_input_number, {
                          modelValue: formShared.maxSlots,
                          "onUpdate:modelValue": ($event) => formShared.maxSlots = $event,
                          min: 1,
                          max: 10
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
                _push2(`<div class="kv-list" data-v-2f9cf01b${_scopeId}><!--[-->`);
                ssrRenderList(formShared.attributes, (attr, idx) => {
                  _push2(`<div class="kv-row" data-v-2f9cf01b${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_input, {
                    modelValue: attr.key,
                    "onUpdate:modelValue": ($event) => attr.key = $event,
                    placeholder: "字段名(如:账号)",
                    style: { "width": "140px" }
                  }, null, _parent2, _scopeId));
                  _push2(`<span class="separator" data-v-2f9cf01b${_scopeId}>:</span>`);
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
                        max: 10
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
                        createTextVNode(" + 添加属性 ")
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
        if (cdkData.value?.cdk_type === "one_time") {
          _push(`<div data-v-2f9cf01b>`);
          _push(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_form_item, { label: "激活码内容" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: formOneTime.code,
                        "onUpdate:modelValue": ($event) => formOneTime.code = $event,
                        placeholder: "输入激活码"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="form-tip" data-v-2f9cf01b${_scopeId2}>注意：更改后会影响已关联的订单</div>`);
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: formOneTime.code,
                          "onUpdate:modelValue": ($event) => formOneTime.code = $event,
                          placeholder: "输入激活码"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "注意：更改后会影响已关联的订单")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_form_item, { label: "激活码内容" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: formOneTime.code,
                        "onUpdate:modelValue": ($event) => formOneTime.code = $event,
                        placeholder: "输入激活码"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "注意：更改后会影响已关联的订单")
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
              _push2(`详情页帮助图片`);
            } else {
              return [
                createTextVNode("详情页帮助图片")
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
          _push(`<span data-v-2f9cf01b>点击选择图片</span></div>`);
        }
        _push(`</div><div class="form-tip" style="${ssrRenderStyle({ "margin-top": "8px" })}" data-v-2f9cf01b> 将在客户端订单详情页展示，用于引导用户使用 </div></div></div><div class="form-actions" data-v-2f9cf01b>`);
        _push(ssrRenderComponent(_component_el_button, {
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`取消`);
            } else {
              return [
                createTextVNode("取消")
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
              _push2(` 保存修改 `);
            } else {
              return [
                createTextVNode(" 保存修改 ")
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
        title: "选择图片",
        width: "800px",
        "append-to-body": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="picker-container" data-v-2f9cf01b${_scopeId}><div class="picker-sidebar" data-v-2f9cf01b${_scopeId}><div class="${ssrRenderClass([{ active: pickerActiveCatId.value === "" }, "picker-cat-item"])}" data-v-2f9cf01b${_scopeId}>全部图片</div><!--[-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/cdk/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f9cf01b"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DvLUyqHr.js.map
