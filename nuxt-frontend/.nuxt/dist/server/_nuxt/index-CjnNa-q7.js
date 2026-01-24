import { E as ElCard } from "./index-9Hs_9io2.js";
import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
import { E as ElDialog } from "./index-I18rzBgu.js";
import { E as ElSelect, a as ElOption } from "./index-Cf_t59lc.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { p as plus_default, E as ElIcon, bJ as search_default, ag as check_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElPagination } from "./index-cR1ntQxK.js";
/* empty css                 */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                         */
/* empty css                  */
/* empty css                         */
/* empty css                   */
/* empty css                   */
/* empty css                    */
/* empty css                   */
/* empty css                       */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, withDirectives, createBlock, openBlock, Fragment, renderList, withKeys, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { b as adminApi } from "./admin-supabase-nszo-IoU.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./vnode-D0IHQw_9.js";
import "@vue/shared";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "lodash-unified";
import "./index-D_b573Qt.js";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./index-ClPmkyX9.js";
import "./index-DOE061f1.js";
import "./validator-T0bsmJHo.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-BOQJCp53.js";
import "./strings-D1uxkXhq.js";
import "./index-DCrMmn3b.js";
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
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const selectorVisible = ref(false);
    const banners = ref([]);
    const libraryImages = ref([]);
    const categories = ref([]);
    const fetchData = async () => {
      loading.value = true;
      try {
        const res = await adminApi.banner.getBanners();
        if (res.success) {
          banners.value = res.banners;
        } else {
          ElMessage.error("加载轮播图失败: " + res.error);
        }
      } finally {
        loading.value = false;
      }
    };
    const fetchLibrary = async () => {
      const res = await adminApi.image.getImages({
        category_id: selectorCategory.value,
        keyword: selectorKeyword.value
      });
      if (res.success) {
        libraryImages.value = res.images;
      }
    };
    const sortedBanners = computed(() => {
      return [...banners.value].sort((a, b) => a.sort_order - b.sort_order);
    });
    const selectorCategory = ref("");
    const selectorKeyword = ref("");
    const selectedImageId = ref("");
    const selectedImageObj = ref(null);
    const openImageSelector = async () => {
      selectedImageId.value = "";
      selectedImageObj.value = null;
      await fetchLibrary();
      selectorVisible.value = true;
    };
    const selectImage = (img) => {
      selectedImageId.value = img.id;
      selectedImageObj.value = img;
    };
    const confirmAddBanner = async () => {
      if (!selectedImageObj.value) return;
      loading.value = true;
      try {
        const res = await adminApi.banner.createBanner({
          image_id: selectedImageObj.value.id,
          title: selectedImageObj.value.name,
          sort_order: banners.value.length + 1
        });
        if (res.success) {
          ElMessage.success("添加成功");
          selectorVisible.value = false;
          await fetchData();
        } else {
          ElMessage.error("添加失败: " + res.error);
        }
      } finally {
        loading.value = false;
      }
    };
    const handleSortChange = async (row) => {
      const res = await adminApi.banner.updateBanner(row.id, { sort_order: row.sort_order });
      if (res.success) {
        ElMessage.success("排序已更新");
      }
    };
    const handleStatusChange = async (row, val) => {
      const newStatus = val ? "on" : "off";
      const res = await adminApi.banner.updateBanner(row.id, { status: newStatus });
      if (res.success) {
        row.status = newStatus;
        ElMessage.success(newStatus === "on" ? "已启用" : "已停用");
      } else {
        ElMessage.error("更新状态失败: " + res.error);
      }
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("确认移除该轮播图吗？", "删除", {
        type: "warning"
      }).then(async () => {
        const res = await adminApi.banner.deleteBanner(row.id);
        if (res.success) {
          ElMessage.success("已删除");
          await fetchData();
        } else {
          ElMessage.error("删除失败: " + res.error);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_alert = ElAlert;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _component_el_dialog = ElDialog;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-page" }, _attrs))} data-v-22a412b1><div class="page-header" data-v-22a412b1><h2 data-v-22a412b1>轮播图管理</h2></div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "action-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="action-container" data-v-22a412b1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。",
              type: "info",
              "show-icon": "",
              closable: false,
              style: { "margin-right": "20px", "flex": "1" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: openImageSelector
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "action-container" }, [
                createVNode(_component_el_alert, {
                  title: "提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。",
                  type: "info",
                  "show-icon": "",
                  closable: false,
                  style: { "margin-right": "20px", "flex": "1" }
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  icon: unref(plus_default),
                  onClick: openImageSelector
                }, {
                  default: withCtx(() => [
                    createTextVNode("添加轮播图")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "list-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: sortedBanners.value,
              style: { "width": "100%" },
              border: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "图片预览",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_image, {
                          src: row.image?.url || row.url,
                          fit: "cover",
                          style: { "width": "140px", "height": "70px", "border-radius": "4px" },
                          "preview-src-list": [row.image?.url || row.url]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_image, {
                            src: row.image?.url || row.url,
                            fit: "cover",
                            style: { "width": "140px", "height": "70px", "border-radius": "4px" },
                            "preview-src-list": [row.image?.url || row.url]
                          }, null, 8, ["src", "preview-src-list"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "图片名称",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.image?.name || row.title || "未命名")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.image?.name || row.title || "未命名"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "排序值",
                    width: "150"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: row.sort_order,
                          "onUpdate:modelValue": ($event) => row.sort_order = $event,
                          min: 0,
                          max: 999,
                          size: "small",
                          "controls-position": "right",
                          onChange: ($event) => handleSortChange(row)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: row.sort_order,
                            "onUpdate:modelValue": ($event) => row.sort_order = $event,
                            min: 0,
                            max: 999,
                            size: "small",
                            "controls-position": "right",
                            onChange: ($event) => handleSortChange(row)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          "model-value": row.status === "on",
                          onChange: (val) => handleStatusChange(row, !!val)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            "model-value": row.status === "on",
                            onChange: (val) => handleStatusChange(row, !!val)
                          }, null, 8, ["model-value", "onChange"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "100",
                    fixed: "right",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
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
                      label: "图片预览",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_image, {
                          src: row.image?.url || row.url,
                          fit: "cover",
                          style: { "width": "140px", "height": "70px", "border-radius": "4px" },
                          "preview-src-list": [row.image?.url || row.url]
                        }, null, 8, ["src", "preview-src-list"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "图片名称",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(row.image?.name || row.title || "未命名"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "排序值",
                      width: "150"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_input_number, {
                          modelValue: row.sort_order,
                          "onUpdate:modelValue": ($event) => row.sort_order = $event,
                          min: 0,
                          max: 999,
                          size: "small",
                          "controls-position": "right",
                          onChange: ($event) => handleSortChange(row)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_switch, {
                          "model-value": row.status === "on",
                          onChange: (val) => handleStatusChange(row, !!val)
                        }, null, 8, ["model-value", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "100",
                      fixed: "right",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
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
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: sortedBanners.value,
                style: { "width": "100%" },
                border: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "图片预览",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_image, {
                        src: row.image?.url || row.url,
                        fit: "cover",
                        style: { "width": "140px", "height": "70px", "border-radius": "4px" },
                        "preview-src-list": [row.image?.url || row.url]
                      }, null, 8, ["src", "preview-src-list"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "图片名称",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(row.image?.name || row.title || "未命名"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "排序值",
                    width: "150"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_input_number, {
                        modelValue: row.sort_order,
                        "onUpdate:modelValue": ($event) => row.sort_order = $event,
                        min: 0,
                        max: 999,
                        size: "small",
                        "controls-position": "right",
                        onChange: ($event) => handleSortChange(row)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_switch, {
                        "model-value": row.status === "on",
                        onChange: (val) => handleStatusChange(row, !!val)
                      }, null, 8, ["model-value", "onChange"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "100",
                    fixed: "right",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
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
              }, 8, ["data"])), [
                [_directive_loading, loading.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: selectorVisible.value,
        "onUpdate:modelValue": ($event) => selectorVisible.value = $event,
        title: "选择图片",
        width: "800px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-22a412b1${_scopeId}>`);
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
              onClick: confirmAddBanner,
              disabled: !selectedImageId.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认添加`);
                } else {
                  return [
                    createTextVNode("确认添加")
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
                  onClick: confirmAddBanner,
                  disabled: !selectedImageId.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("确认添加")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "15px", "display": "flex" })}" data-v-22a412b1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: selectorCategory.value,
              "onUpdate:modelValue": ($event) => selectorCategory.value = $event,
              placeholder: "图片分类",
              clearable: "",
              style: { "width": "150px", "margin-right": "15px" },
              onChange: fetchLibrary
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "全部",
                    value: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(categories.value, (cat) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: cat.id,
                      label: cat.name,
                      value: cat.id
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: ""
                    }),
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: selectorKeyword.value,
              "onUpdate:modelValue": ($event) => selectorKeyword.value = $event,
              placeholder: "搜索图片名称",
              clearable: "",
              style: { "width": "200px" },
              onKeyup: fetchLibrary
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
            _push2(`</div><div class="selector-grid" data-v-22a412b1${_scopeId}><!--[-->`);
            ssrRenderList(libraryImages.value, (img) => {
              _push2(`<div class="${ssrRenderClass([{ "is-selected": selectedImageId.value === img.id }, "selector-item"])}" data-v-22a412b1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover",
                class: "selector-thumb"
              }, null, _parent2, _scopeId));
              _push2(`<div class="selector-name" data-v-22a412b1${_scopeId}>${ssrInterpolate(img.name)}</div>`);
              if (selectedImageId.value === img.id) {
                _push2(`<div class="selector-mask" data-v-22a412b1${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(check_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(check_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="pagination-wrapper" style="${ssrRenderStyle({ "margin-top": "15px", "display": "flex", "justify-content": "flex-end" })}" data-v-22a412b1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              background: "",
              layout: "prev, pager, next",
              total: libraryImages.value.length,
              "page-size": 12
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "margin-bottom": "15px", "display": "flex" } }, [
                createVNode(_component_el_select, {
                  modelValue: selectorCategory.value,
                  "onUpdate:modelValue": ($event) => selectorCategory.value = $event,
                  placeholder: "图片分类",
                  clearable: "",
                  style: { "width": "150px", "margin-right": "15px" },
                  onChange: fetchLibrary
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: ""
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: cat.id,
                        label: cat.name,
                        value: cat.id
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_input, {
                  modelValue: selectorKeyword.value,
                  "onUpdate:modelValue": ($event) => selectorKeyword.value = $event,
                  placeholder: "搜索图片名称",
                  clearable: "",
                  style: { "width": "200px" },
                  onKeyup: withKeys(fetchLibrary, ["enter"])
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
              createVNode("div", { class: "selector-grid" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(libraryImages.value, (img) => {
                  return openBlock(), createBlock("div", {
                    key: img.id,
                    class: ["selector-item", { "is-selected": selectedImageId.value === img.id }],
                    onClick: ($event) => selectImage(img)
                  }, [
                    createVNode(_component_el_image, {
                      src: img.url,
                      fit: "cover",
                      class: "selector-thumb"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "selector-name" }, toDisplayString(img.name), 1),
                    selectedImageId.value === img.id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "selector-mask"
                    }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(check_default))
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ], 10, ["onClick"]);
                }), 128))
              ]),
              createVNode("div", {
                class: "pagination-wrapper",
                style: { "margin-top": "15px", "display": "flex", "justify-content": "flex-end" }
              }, [
                createVNode(_component_el_pagination, {
                  background: "",
                  layout: "prev, pager, next",
                  total: libraryImages.value.length,
                  "page-size": 12
                }, null, 8, ["total"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/banners/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22a412b1"]]);
export {
  index as default
};
//# sourceMappingURL=index-CjnNa-q7.js.map
