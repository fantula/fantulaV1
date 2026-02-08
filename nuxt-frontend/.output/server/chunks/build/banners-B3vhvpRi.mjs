import { E as ElButton } from './index-Cfk6gFRD.mjs';
import { E as ElTableColumn } from './index-CppwRAFr.mjs';
import { E as ElTag } from './index-CAqDGa72.mjs';
import { E as ElImage } from './index-BmjXUoge.mjs';
import { E as ElSwitch } from './index-E7MQUUY5.mjs';
import { E as ElForm, a as ElFormItem } from './index-BHYewqHp.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { E as ElInput } from './index-DfZ5KWBt.mjs';
import { E as ElInputNumber } from './index-DKzxlu5F.mjs';
import { E as ElDialog } from './index-Dhc7L6Kv.mjs';
import { v as vLoading } from './directive-BBpaOxz2.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, withDirectives, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { p as plus_default, r as refresh_default, I as search_default } from './index-DlETah8a.mjs';
import { d as adminBannerApi, a as adminImageApi } from './media-DksayCA2.mjs';
import { A as AdminActionCard } from './AdminActionCard-BmEdBcE0.mjs';
import { A as AdminDataTable } from './AdminDataTable-C0ckSjEK.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-D5vWIKYY.mjs';
import { u as useAdminDialog, a as confirmDelete } from './useAdminDialog-CsbKStaI.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './icon-CK7WLSPl.mjs';
import './index-K5TIzHX_.mjs';
import './use-global-config-79yNXOXL.mjs';
import './objects-Bz74KHmq.mjs';
import './use-form-item-Bhmdieo-.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-CmHlMPx0.mjs';
import './index-DqrhOzxH.mjs';
import '@vueuse/core';
import './index-BgvvVJ20.mjs';
import '@popperjs/core';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-D4pu9U8U.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './typescript-D6L75muK.mjs';
import './index-7KygWwCI.mjs';
import './scroll-BuMAfCNC.mjs';
import './index-Cy25Tved.mjs';
import './validator-BaQl3RdN.mjs';
import 'async-validator';
import './index-D3BlhKEk.mjs';
import './index-CuQ4LNHg.mjs';
import './vnode-BKSxKQVt.mjs';
import './refs-CxYYXu5Q.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './index-sO8Yjc2X.mjs';
import './index-DHhizeNf.mjs';
import './index-2hf2A4Op.mjs';
import './index-CHDWEhch.mjs';
import './strings-D1uxkXhq.mjs';
import './index-C_BEi-G8.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

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
          ElMessage.warning("\u8BF7\u9009\u62E9\u56FE\u7247");
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
        ElMessage.success("\u72B6\u6001\u5DF2\u66F4\u65B0");
      } else {
        ElMessage.error("\u66F4\u65B0\u5931\u8D25");
        row.status = isActive ? "off" : "on";
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "\u786E\u8BA4\u5220\u9664\u8BE5\u8F6E\u64AD\u56FE\u5417\uFF1F",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-page" }, _attrs))} data-v-89889680>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="action-bar" data-v-89889680${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => unref(dialog).openAdd()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6DFB\u52A0\u8F6E\u64AD\u56FE`);
                } else {
                  return [
                    createTextVNode("\u6DFB\u52A0\u8F6E\u64AD\u56FE")
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
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-2 text-gray-500 text-sm" data-v-89889680${_scopeId}> \u63D0\u793A\uFF1A\u8F6E\u64AD\u56FE\u56FE\u7247\u9700\u4ECE\u56FE\u7247\u7BA1\u7406\u4E2D\u9009\u62E9\uFF0C\u524D\u7AEF\u5C55\u793A\u987A\u5E8F\u7531\u6392\u5E8F\u503C\u51B3\u5B9A\uFF08\u8D8A\u5C0F\u8D8A\u9760\u524D\uFF09\u3002 </div>`);
          } else {
            return [
              createVNode("div", { class: "action-bar" }, [
                createVNode(_component_el_button, {
                  type: "primary",
                  icon: unref(plus_default),
                  onClick: ($event) => unref(dialog).openAdd()
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u6DFB\u52A0\u8F6E\u64AD\u56FE")
                  ]),
                  _: 1
                }, 8, ["icon", "onClick"]),
                createVNode(_component_el_button, {
                  onClick: fetchData,
                  icon: unref(refresh_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u5237\u65B0")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              createVNode("div", { class: "mt-2 text-gray-500 text-sm" }, " \u63D0\u793A\uFF1A\u8F6E\u64AD\u56FE\u56FE\u7247\u9700\u4ECE\u56FE\u7247\u7BA1\u7406\u4E2D\u9009\u62E9\uFF0C\u524D\u7AEF\u5C55\u793A\u987A\u5E8F\u7531\u6392\u5E8F\u503C\u51B3\u5B9A\uFF08\u8D8A\u5C0F\u8D8A\u9760\u524D\uFF09\u3002 ")
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
              label: "\u6392\u5E8F",
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
              label: "\u5C01\u9762\u56FE",
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
                    _push3(`<span class="text-gray-400" data-v-89889680${_scopeId2}>\u65E0\u56FE\u7247</span>`);
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
                    }, "\u65E0\u56FE\u7247"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "title",
              label: "\u6807\u9898",
              "min-width": "150",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "link",
              label: "\u8DF3\u8F6C\u94FE\u63A5",
              "min-width": "200",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`\u7F16\u8F91`);
                      } else {
                        return [
                          createTextVNode("\u7F16\u8F91")
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
                        _push4(`\u5220\u9664`);
                      } else {
                        return [
                          createTextVNode("\u5220\u9664")
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
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => handleDelete(row)
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "\u6392\u5E8F",
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
                label: "\u5C01\u9762\u56FE",
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
                  }, "\u65E0\u56FE\u7247"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "title",
                label: "\u6807\u9898",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "link",
                label: "\u8DF3\u8F6C\u94FE\u63A5",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
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
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
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
      }, _parent));
      _push(ssrRenderComponent(AdminDataDialog, {
        modelValue: unref(dialog).visible.value,
        "onUpdate:modelValue": ($event) => unref(dialog).visible.value = $event,
        title: unref(dialog).isEdit.value ? "\u7F16\u8F91\u8F6E\u64AD\u56FE" : "\u6DFB\u52A0\u8F6E\u64AD\u56FE",
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
                    label: "\u5C01\u9762\u56FE\u7247",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="image-selector" data-v-89889680${_scopeId3}>`);
                        if (selectedImage.value) {
                          _push4(ssrRenderComponent(_component_el_image, {
                            src: selectedImage.value.url,
                            fit: "cover",
                            class: "preview-img"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<div class="placeholder" data-v-89889680${_scopeId3}>`);
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
                          _push4(`<span data-v-89889680${_scopeId3}>\u70B9\u51FB\u9009\u62E9\u56FE\u7247</span></div>`);
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
                              createVNode("span", null, "\u70B9\u51FB\u9009\u62E9\u56FE\u7247")
                            ]))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6807\u9898" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.title,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                          placeholder: "\u53EF\u9009"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.title,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                            placeholder: "\u53EF\u9009"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u8DF3\u8F6C\u94FE\u63A5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.link,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                          placeholder: "\u53EF\u9009\uFF0C\u4F8B\u5982 /activity/1"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.link,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                            placeholder: "\u53EF\u9009\uFF0C\u4F8B\u5982 /activity/1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6392\u5E8F\u503C" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="tips" data-v-89889680${_scopeId3}>\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sort_order,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                            min: 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "tips" }, "\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u5C01\u9762\u56FE\u7247",
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
                            createVNode("span", null, "\u70B9\u51FB\u9009\u62E9\u56FE\u7247")
                          ]))
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6807\u9898" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.title,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                          placeholder: "\u53EF\u9009"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u8DF3\u8F6C\u94FE\u63A5" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.link,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                          placeholder: "\u53EF\u9009\uFF0C\u4F8B\u5982 /activity/1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u503C" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "tips" }, "\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
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
                    label: "\u5C01\u9762\u56FE\u7247",
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
                          createVNode("span", null, "\u70B9\u51FB\u9009\u62E9\u56FE\u7247")
                        ]))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6807\u9898" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.title,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.title = $event,
                        placeholder: "\u53EF\u9009"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u8DF3\u8F6C\u94FE\u63A5" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.link,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.link = $event,
                        placeholder: "\u53EF\u9009\uFF0C\u4F8B\u5982 /activity/1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6392\u5E8F\u503C" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: unref(dialog).form.sort_order,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                        min: 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "tips" }, "\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
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
        title: "\u9009\u62E9\u56FE\u7247",
        width: "800px",
        "append-to-body": "",
        "z-index": 2100
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-89889680${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => selectorVisible.value = false
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
              onClick: confirmImageSelection,
              disabled: !tempSelectedImageId.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u786E\u5B9A`);
                } else {
                  return [
                    createTextVNode("\u786E\u5B9A")
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
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: confirmImageSelection,
                  disabled: !tempSelectedImageId.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u786E\u5B9A")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="selector-header" data-v-89889680${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: selectorKeyword.value,
              "onUpdate:modelValue": ($event) => selectorKeyword.value = $event,
              placeholder: "\u641C\u7D22\u56FE\u7247",
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
            _push2(`</div><div${ssrRenderAttrs(mergeProps({ class: "selector-grid" }, ssrGetDirectiveProps(_ctx, _directive_loading, selectorLoading.value)))} data-v-89889680${_scopeId}><!--[-->`);
            ssrRenderList(imageList.value, (img) => {
              _push2(`<div class="${ssrRenderClass([{ active: tempSelectedImageId.value === img.id }, "selector-item"])}" data-v-89889680${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover",
                class: "selector-img"
              }, null, _parent2, _scopeId));
              _push2(`<div class="selector-name" data-v-89889680${_scopeId}>${ssrInterpolate(img.name)}</div></div>`);
            });
            _push2(`<!--]--></div><div class="selector-pagination" data-v-89889680${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "selector-header" }, [
                createVNode(_component_el_input, {
                  modelValue: selectorKeyword.value,
                  "onUpdate:modelValue": ($event) => selectorKeyword.value = $event,
                  placeholder: "\u641C\u7D22\u56FE\u7247",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media/banners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const banners = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-89889680"]]);

export { banners as default };
//# sourceMappingURL=banners-B3vhvpRi.mjs.map
