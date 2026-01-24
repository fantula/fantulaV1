import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElCard } from "./index-9Hs_9io2.js";
import { a as ElTable, E as ElTableColumn } from "./index-BB44-vTK.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElSwitch } from "./index-_GccYHgs.js";
import { E as ElDialog } from "./index-CzosOSMt.js";
import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { p as plus_default, b9 as refresh_default, E as ElIcon, bJ as search_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
/* empty css                   */
/* empty css                 */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                         */
/* empty css                   */
/* empty css                   */
/* empty css                    */
/* empty css                      */
/* empty css                  */
/* empty css                         */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, withDirectives, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { d as adminBannerApi, b as adminImageApi } from "./media-C2x210Ez.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "lodash-unified";
import "./index-D_b573Qt.js";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "@vue/shared";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-BlpH41lu.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./index-ClPmkyX9.js";
import "./validator-T0bsmJHo.js";
import "./index-Dg8Z-nTr.js";
import "./vnode-D0IHQw_9.js";
import "./refs-CxYYXu5Q.js";
import "async-validator";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
import "./index-DOE061f1.js";
import "./index-QnhSR2oe.js";
/* empty css                    */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "banners",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const banners2 = ref([]);
    const fetchData = async () => {
      loading.value = true;
      const res = await adminBannerApi.getBanners();
      if (res.success) {
        banners2.value = res.banners;
      }
      loading.value = false;
    };
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const form = reactive({
      id: "",
      image_id: "",
      title: "",
      link: "",
      sort_order: 0
    });
    const selectedImage = ref(null);
    const openCreateDialog = () => {
      isEdit.value = false;
      form.id = "";
      form.image_id = "";
      form.title = "";
      form.link = "";
      form.sort_order = 0;
      selectedImage.value = null;
      dialogVisible.value = true;
    };
    const handleEdit = (row) => {
      isEdit.value = true;
      form.id = row.id;
      form.image_id = row.image_id;
      form.title = row.title || "";
      form.link = row.link || "";
      form.sort_order = row.sort_order;
      selectedImage.value = row.image || null;
      dialogVisible.value = true;
    };
    const submitForm = async () => {
      if (!form.image_id) {
        ElMessage.warning("请选择图片");
        return;
      }
      if (isEdit.value) {
        const updatePayload = {
          title: form.title,
          link: form.link,
          sort_order: form.sort_order,
          image_id: form.image_id
        };
        const resUpdate = await adminBannerApi.updateBanner(form.id, updatePayload);
        if (resUpdate.success) {
          ElMessage.success("更新成功");
          dialogVisible.value = false;
          fetchData();
        } else {
          ElMessage.error("更新失败: " + resUpdate.error);
        }
      } else {
        const res = await adminBannerApi.createBanner({
          image_id: form.image_id,
          title: form.title,
          link: form.link,
          sort_order: form.sort_order
        });
        if (res.success) {
          ElMessage.success("创建成功");
          dialogVisible.value = false;
          fetchData();
        } else {
          ElMessage.error("创建失败: " + res.error);
        }
      }
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
    const handleDelete = (row) => {
      ElMessageBox.confirm("确认删除该轮播图吗？", "删除提示", {
        type: "warning"
      }).then(async () => {
        const res = await adminBannerApi.deleteBanner(row.id);
        if (res.success) {
          ElMessage.success("删除成功");
          fetchData();
        } else {
          ElMessage.error("删除失败");
        }
      });
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
        form.image_id = img.id;
        selectorVisible.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_image = ElImage;
      const _component_el_switch = ElSwitch;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_icon = ElIcon;
      const _component_el_input = ElInput;
      const _component_el_input_number = ElInputNumber;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-page" }, _attrs))} data-v-fdec4af0>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="action-bar" data-v-fdec4af0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: openCreateDialog
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
            _push2(`</div><div class="mt-2 text-gray-500 text-sm" data-v-fdec4af0${_scopeId}> 提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。 </div>`);
          } else {
            return [
              createVNode("div", { class: "action-bar" }, [
                createVNode(_component_el_button, {
                  type: "primary",
                  icon: unref(plus_default),
                  onClick: openCreateDialog
                }, {
                  default: withCtx(() => [
                    createTextVNode("添加轮播图")
                  ]),
                  _: 1
                }, 8, ["icon"]),
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
      _push(ssrRenderComponent(_component_el_card, mergeProps({
        shadow: "never",
        class: "list-card"
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, {
              data: banners2.value,
              style: { "width": "100%" },
              "row-key": "id"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "排序",
                    width: "100"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, { type: "info" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.sort_order)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.sort_order), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "封面图",
                    width: "200"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (row.image) {
                          _push4(ssrRenderComponent(_component_el_image, {
                            src: row.image.url,
                            fit: "cover",
                            style: { "width": "160px", "height": "60px", "border-radius": "4px" },
                            "preview-src-list": [row.image.url],
                            "preview-teleported": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<span class="text-gray-400" data-v-fdec4af0${_scopeId3}>无图片</span>`);
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "title",
                    label: "标题",
                    "min-width": "150",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "link",
                    label: "跳转链接",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "100"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: row.status,
                          "onUpdate:modelValue": ($event) => row.status = $event,
                          "active-value": "on",
                          "inactive-value": "off",
                          onChange: (val) => handleStatusChange(row, val === "on")
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "150",
                    align: "right"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "primary",
                          onClick: ($event) => handleEdit(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`编辑`);
                            } else {
                              return [
                                createTextVNode("编辑")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "danger",
                          onClick: ($event) => handleDelete(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`删除`);
                            } else {
                              return [
                                createTextVNode("删除")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            onClick: ($event) => handleEdit(row)
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
                  }, _parent3, _scopeId2));
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
                          onClick: ($event) => handleEdit(row)
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table, {
                data: banners2.value,
                style: { "width": "100%" },
                "row-key": "id"
              }, {
                default: withCtx(() => [
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
                        onClick: ($event) => handleEdit(row)
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
                ]),
                _: 1
              }, 8, ["data"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? "编辑轮播图" : "添加轮播图",
        width: "500px",
        "append-to-body": "",
        "z-index": 2e3
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-fdec4af0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
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
              onClick: submitForm
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存`);
                } else {
                  return [
                    createTextVNode("保存")
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
                  onClick: ($event) => dialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitForm
                }, {
                  default: withCtx(() => [
                    createTextVNode("保存")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
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
                        _push4(`<div class="image-selector" data-v-fdec4af0${_scopeId3}>`);
                        if (selectedImage.value) {
                          _push4(ssrRenderComponent(_component_el_image, {
                            src: selectedImage.value.url,
                            fit: "cover",
                            class: "preview-img"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<div class="placeholder" data-v-fdec4af0${_scopeId3}>`);
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
                          _push4(`<span data-v-fdec4af0${_scopeId3}>点击选择图片</span></div>`);
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
                          modelValue: form.title,
                          "onUpdate:modelValue": ($event) => form.title = $event,
                          placeholder: "可选"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.title,
                            "onUpdate:modelValue": ($event) => form.title = $event,
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
                          modelValue: form.link,
                          "onUpdate:modelValue": ($event) => form.link = $event,
                          placeholder: "可选，例如 /activity/1"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.link,
                            "onUpdate:modelValue": ($event) => form.link = $event,
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
                          modelValue: form.sort_order,
                          "onUpdate:modelValue": ($event) => form.sort_order = $event,
                          min: 0
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="tips" data-v-fdec4af0${_scopeId3}>值越小越靠前</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: form.sort_order,
                            "onUpdate:modelValue": ($event) => form.sort_order = $event,
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
                          modelValue: form.title,
                          "onUpdate:modelValue": ($event) => form.title = $event,
                          placeholder: "可选"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "跳转链接" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.link,
                          "onUpdate:modelValue": ($event) => form.link = $event,
                          placeholder: "可选，例如 /activity/1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "排序值" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: form.sort_order,
                          "onUpdate:modelValue": ($event) => form.sort_order = $event,
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
                model: form,
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
                        modelValue: form.title,
                        "onUpdate:modelValue": ($event) => form.title = $event,
                        placeholder: "可选"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "跳转链接" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.link,
                        "onUpdate:modelValue": ($event) => form.link = $event,
                        placeholder: "可选，例如 /activity/1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "排序值" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: form.sort_order,
                        "onUpdate:modelValue": ($event) => form.sort_order = $event,
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
            _push2(`<span class="dialog-footer" data-v-fdec4af0${_scopeId}>`);
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
            _push2(`<div class="selector-header" data-v-fdec4af0${_scopeId}>`);
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
            _push2(`</div><div${ssrRenderAttrs(mergeProps({ class: "selector-grid" }, ssrGetDirectiveProps(_ctx, _directive_loading, selectorLoading.value)))} data-v-fdec4af0${_scopeId}><!--[-->`);
            ssrRenderList(imageList.value, (img) => {
              _push2(`<div class="${ssrRenderClass([{ active: tempSelectedImageId.value === img.id }, "selector-item"])}" data-v-fdec4af0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover",
                class: "selector-img"
              }, null, _parent2, _scopeId));
              _push2(`<div class="selector-name" data-v-fdec4af0${_scopeId}>${ssrInterpolate(img.name)}</div></div>`);
            });
            _push2(`<!--]--></div><div class="selector-pagination" data-v-fdec4af0${_scopeId}></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/media/banners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const banners = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fdec4af0"]]);
export {
  banners as default
};
//# sourceMappingURL=banners-Bo9Ey6Rj.js.map
