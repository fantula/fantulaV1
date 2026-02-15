import { E as ElButton } from "./index-BOdp6qaH.js";
import { E as ElTableColumn } from "./index-BXxUPXtj.js";
import { E as ElTag } from "./index-CsRbYYdv.js";
import { E as ElImage } from "./index-CEmMQsAU.js";
import { E as ElSwitch } from "./index-_EDdYz_8.js";
import { E as ElForm, a as ElFormItem } from "./index-C-iEkQSR.js";
import { E as ElIcon } from "./index-C4aUwruK.js";
import { E as ElInput } from "./index-CYgslNeO.js";
import { E as ElInputNumber } from "./index-7iIj_WSU.js";
import { E as ElDialog } from "./index-Bv3pMABn.js";
import { v as vLoading } from "./directive-DYMvUrfr.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                         */
/* empty css                   */
/* empty css                 */
/* empty css                      */
/* empty css                  */
/* empty css                         */
/* empty css                   */
/* empty css                    */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, withDirectives, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { p as plus_default, M as refresh_default, ad as search_default } from "./index-CbQ9NNm4.js";
import { d as adminBannerApi, b as adminImageApi } from "./media-BJaGHW2U.js";
import { A as AdminActionCard } from "./AdminActionCard-l7l1Gr-n.js";
import { A as AdminDataTable } from "./AdminDataTable-KtdApVAC.js";
import { A as AdminDataDialog } from "./AdminDataDialog-DgjGDqf6.js";
import { u as useAdminDialog, c as confirmDelete } from "./useAdminDialog-BSe9aawB.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-CQnGB6WT.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-D-Vgi0cb.js";
import "./index-C1njJNPQ.js";
import "./use-global-config-CaR6i8cb.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-BJm4fR6K.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CKAw5W0O.js";
import "./index-DqrhOzxH.js";
import "@vueuse/core";
import "./index-CLY1HctY.js";
import "@popperjs/core";
import "./index-DHEUW9kI.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-DWB_V3f7.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./typescript-D6L75muK.js";
import "./index-COtmEGfB.js";
import "./scroll-ozMyDWSO.js";
import "./index-DuyRWKSc.js";
import "./validator-BiwSbFK3.js";
import "async-validator";
import "./index-D3BlhKEk.js";
import "./index-BxcbCFKt.js";
import "./vnode-uc6o_sOa.js";
import "./refs-CxYYXu5Q.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-CMbz_fag.js";
/* empty css                    */
import "./index-bbvp9z3V.js";
import "./index-At2TMaBE.js";
import "./index-BRGlGDSf.js";
import "./strings-D1uxkXhq.js";
import "./index-C8YaaWrc.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                        */
import "./index-TRxueLL5.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "banners",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const banners2 = ref([]);
    const selectedImage = ref(null);
    const fetchData = async () => {
      loading.value = true;
      const res = await adminBannerApi.getBanners();
      if (res.success) {
        banners2.value = res.banners;
      }
      loading.value = false;
    };
    const dialog = useAdminDialog({
      id: "",
      image_id: "",
      title: "",
      link: "",
      sort_order: 0
    }, {
      onSubmit: async (form, isEdit) => {
        if (!form.image_id) {
          ElMessage.warning("请选择图片");
          return { success: false };
        }
        if (isEdit) {
          return await adminBannerApi.updateBanner(form.id, {
            title: form.title,
            link: form.link,
            sort_order: form.sort_order,
            image_id: form.image_id
          });
        } else {
          return await adminBannerApi.createBanner({
            image_id: form.image_id,
            title: form.title,
            link: form.link,
            sort_order: form.sort_order
          });
        }
      },
      onSuccess: async () => {
        await fetchData();
        if (!dialog.visible.value) selectedImage.value = null;
      }
    });
    const openEditWithType = (row) => {
      selectedImage.value = row.image || null;
      dialog.openEdit({
        id: row.id,
        image_id: row.image_id,
        title: row.title || "",
        link: row.link || "",
        sort_order: row.sort_order
      });
    };
    const handleStatusChange = async (row, isActive) => {
      const status = isActive ? "on" : "off";
      const res = await adminBannerApi.updateBanner(row.id, { status });
      if (res.success) {
        ElMessage.success("状态已更新");
      } else {
        ElMessage.error("更新失败");
        row.status = isActive ? "off" : "on";
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "确认删除该轮播图吗？",
        async () => {
          const res = await adminBannerApi.deleteBanner(row.id);
          if (res.success) await fetchData();
          return res;
        }
      );
    };
    const selectorVisible = ref(false);
    const selectorLoading = ref(false);
    const selectorKeyword = ref("");
    const imageList = ref([]);
    const tempSelectedImageId = ref("");
    const openImageSelector = () => {
      selectorVisible.value = true;
      fetchImages();
    };
    const fetchImages = async () => {
      selectorLoading.value = true;
      const res = await adminImageApi.getImages({ keyword: selectorKeyword.value });
      if (res.success) {
        imageList.value = res.images;
      }
      selectorLoading.value = false;
    };
    const confirmImageSelection = () => {
      const img = imageList.value.find((i) => i.id === tempSelectedImageId.value);
      if (img) {
        selectedImage.value = img;
        dialog.form.image_id = img.id;
        selectorVisible.value = false;
      }
    };
    const originalOpenAdd = dialog.openAdd;
    dialog.openAdd = (initialData) => {
      selectedImage.value = null;
      originalOpenAdd(initialData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_image = ElImage;
      const _component_el_switch = ElSwitch;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_icon = ElIcon;
      const _component_el_input = ElInput;
      const _component_el_input_number = ElInputNumber;
      const _component_el_dialog = ElDialog;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-page" }, _attrs))} data-v-675b2ee2>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="action-bar" data-v-675b2ee2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => unref(dialog).openAdd()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加轮播图`);
                } else {
                  return [
                    createTextVNode("添加轮播图")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: fetchData,
              icon: unref(refresh_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`刷新`);
                } else {
                  return [
                    createTextVNode("刷新")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-2 text-gray-500 text-sm" data-v-675b2ee2${_scopeId}> 提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。 </div>`);
          } else {
            return [
              createVNode("div", { class: "action-bar" }, [
                createVNode(_component_el_button, {
                  type: "primary",
                  icon: unref(plus_default),
                  onClick: ($event) => unref(dialog).openAdd()
                }, {
                  default: withCtx(() => [
                    createTextVNode("添加轮播图")
                  ]),
                  _: 1
                }, 8, ["icon", "onClick"]),
                createVNode(_component_el_button, {
                  onClick: fetchData,
                  icon: unref(refresh_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("刷新")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              createVNode("div", { class: "mt-2 text-gray-500 text-sm" }, " 提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: banners2.value,
        loading: loading.value,
        "show-pagination": false,
        class: "list-card",
        "row-key": "id"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "排序",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, { type: "info" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.sort_order)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.sort_order), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, { type: "info" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.sort_order), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "封面图",
              width: "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.image) {
                    _push3(ssrRenderComponent(_component_el_image, {
                      src: row.image.url,
                      fit: "cover",
                      style: { "width": "160px", "height": "60px", "border-radius": "4px" },
                      "preview-src-list": [row.image.url],
                      "preview-teleported": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="text-gray-400" data-v-675b2ee2${_scopeId2}>无图片</span>`);
                  }
                } else {
                  return [
                    row.image ? (openBlock(), createBlock(_component_el_image, {
                      key: 0,
                      src: row.image.url,
                      fit: "cover",
                      style: { "width": "160px", "height": "60px", "border-radius": "4px" },
                      "preview-src-list": [row.image.url],
                      "preview-teleported": ""
                    }, null, 8, ["src", "preview-src-list"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-gray-400"
                    }, "无图片"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "title",
              label: "标题",
              "min-width": "150",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "link",
              label: "跳转链接",
              "min-width": "200",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "active-value": "on",
                    "inactive-value": "off",
                    onChange: (val) => handleStatusChange(row, val === "on")
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "active-value": "on",
                      "inactive-value": "off",
                      onChange: (val) => handleStatusChange(row, val === "on")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "150",
              align: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEditWithType(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`编辑`);
                      } else {
                        return [
                          createTextVNode("编辑")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`删除`);
                      } else {
                        return [
                          createTextVNode("删除")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => openEditWithType(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("删除")
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
              createVNode(_component_el_table_column, {
                label: "排序",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, { type: "info" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.sort_order), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "封面图",
                width: "200"
              }, {
                default: withCtx(({ row }) => [
                  row.image ? (openBlock(), createBlock(_component_el_image, {
                    key: 0,
                    src: row.image.url,
                    fit: "cover",
                    style: { "width": "160px", "height": "60px", "border-radius": "4px" },
                    "preview-src-list": [row.image.url],
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-gray-400"
                  }, "无图片"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "title",
                label: "标题",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "link",
                label: "跳转链接",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "active-value": "on",
                    "inactive-value": "off",
                    onChange: (val) => handleStatusChange(row, val === "on")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "150",
                align: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEditWithType(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("删除")
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
      _push(ssrRenderComponent(AdminDataDialog, {
        modelValue: unref(dialog).visible.value,
        "onUpdate:modelValue": ($event) => unref(dialog).visible.value = $event,
        title: unref(dialog).isEdit.value ? "编辑轮播图" : "添加轮播图",
        loading: unref(dialog).loading.value,
        onConfirm: unref(dialog).submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: unref(dialog).form,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "封面图片",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="image-selector" data-v-675b2ee2${_scopeId3}>`);
                        if (selectedImage.value) {
                          _push4(ssrRenderComponent(_component_el_image, {
                            src: selectedImage.value.url,
                            fit: "cover",
                            class: "preview-img"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<div class="placeholder" data-v-675b2ee2${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(plus_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(plus_default))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<span data-v-675b2ee2${_scopeId3}>点击选择图片</span></div>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "image-selector",
                            onClick: openImageSelector
                          }, [
                            selectedImage.value ? (openBlock(), createBlock(_component_el_image, {
                              key: 0,
                              src: selectedImage.value.url,
                              fit: "cover",
                              class: "preview-img"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "placeholder"
                            }, [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(plus_default))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "点击选择图片")
                            ]))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "标题" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.title,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                          placeholder: "可选"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.title,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                            placeholder: "可选"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "跳转链接" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.link,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                          placeholder: "可选，例如 /activity/1"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.link,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                            placeholder: "可选，例如 /activity/1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "排序值" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="tips" data-v-675b2ee2${_scopeId3}>值越小越靠前</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sort_order,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                            min: 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "tips" }, "值越小越靠前")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "封面图片",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "image-selector",
                          onClick: openImageSelector
                        }, [
                          selectedImage.value ? (openBlock(), createBlock(_component_el_image, {
                            key: 0,
                            src: selectedImage.value.url,
                            fit: "cover",
                            class: "preview-img"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "placeholder"
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(plus_default))
                              ]),
                              _: 1
                            }),
                            createVNode("span", null, "点击选择图片")
                          ]))
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "标题" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.title,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                          placeholder: "可选"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "跳转链接" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.link,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                          placeholder: "可选，例如 /activity/1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "排序值" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "tips" }, "值越小越靠前")
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
              createVNode(_component_el_form, {
                model: unref(dialog).form,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "封面图片",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "image-selector",
                        onClick: openImageSelector
                      }, [
                        selectedImage.value ? (openBlock(), createBlock(_component_el_image, {
                          key: 0,
                          src: selectedImage.value.url,
                          fit: "cover",
                          class: "preview-img"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "placeholder"
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(plus_default))
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "点击选择图片")
                        ]))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "标题" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.title,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                        placeholder: "可选"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "跳转链接" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.link,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                        placeholder: "可选，例如 /activity/1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "排序值" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: unref(dialog).form.sort_order,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                        min: 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "tips" }, "值越小越靠前")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: selectorVisible.value,
        "onUpdate:modelValue": ($event) => selectorVisible.value = $event,
        title: "选择图片",
        width: "800px",
        "append-to-body": "",
        "z-index": 2100
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-675b2ee2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => selectorVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: confirmImageSelection,
              disabled: !tempSelectedImageId.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确定`);
                } else {
                  return [
                    createTextVNode("确定")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => selectorVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: confirmImageSelection,
                  disabled: !tempSelectedImageId.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("确定")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="selector-header" data-v-675b2ee2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: selectorKeyword.value,
              "onUpdate:modelValue": ($event) => selectorKeyword.value = $event,
              placeholder: "搜索图片",
              style: { "width": "200px" },
              onInput: fetchImages
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(search_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(search_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${ssrRenderAttrs(mergeProps({ class: "selector-grid" }, ssrGetDirectiveProps(_ctx, _directive_loading, selectorLoading.value)))} data-v-675b2ee2${_scopeId}><!--[-->`);
            ssrRenderList(imageList.value, (img) => {
              _push2(`<div class="${ssrRenderClass([{ active: tempSelectedImageId.value === img.id }, "selector-item"])}" data-v-675b2ee2${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover",
                class: "selector-img"
              }, null, _parent2, _scopeId));
              _push2(`<div class="selector-name" data-v-675b2ee2${_scopeId}>${ssrInterpolate(img.name)}</div></div>`);
            });
            _push2(`<!--]--></div><div class="selector-pagination" data-v-675b2ee2${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "selector-header" }, [
                createVNode(_component_el_input, {
                  modelValue: selectorKeyword.value,
                  "onUpdate:modelValue": ($event) => selectorKeyword.value = $event,
                  placeholder: "搜索图片",
                  style: { "width": "200px" },
                  onInput: fetchImages
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              withDirectives((openBlock(), createBlock("div", { class: "selector-grid" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(imageList.value, (img) => {
                  return openBlock(), createBlock("div", {
                    key: img.id,
                    class: ["selector-item", { active: tempSelectedImageId.value === img.id }],
                    onClick: ($event) => tempSelectedImageId.value = img.id
                  }, [
                    createVNode(_component_el_image, {
                      src: img.url,
                      fit: "cover",
                      class: "selector-img"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "selector-name" }, toDisplayString(img.name), 1)
                  ], 10, ["onClick"]);
                }), 128))
              ])), [
                [_directive_loading, selectorLoading.value]
              ]),
              createVNode("div", { class: "selector-pagination" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/media/banners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const banners = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-675b2ee2"]]);
export {
  banners as default
};
//# sourceMappingURL=banners-Dw-rhHPX.js.map
