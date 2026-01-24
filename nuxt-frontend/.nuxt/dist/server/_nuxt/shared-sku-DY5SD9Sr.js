import { E as ElButton } from "./index-DR2tYDZ3.js";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { ah as ElMessage, b9 as refresh_default, E as ElIcon, ba as picture_default, _ as _export_sfc, p as plus_default } from "../server.mjs";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                  */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, withDirectives, createBlock, openBlock, useSSRContext, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttrs, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { e as adminSharedSkuApi } from "./admin-supabase-nszo-IoU.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-CCOHgBz_.js";
import { A as AdminDataDialog } from "./AdminDataDialog-CUwf_G99.js";
import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
import { S as SkuEditor } from "./SkuEditor-Cd65qRno.js";
import { E as ElDrawer } from "./index-4Qac4SKg.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
/* empty css                   */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                         */
/* empty css                    */
import { v as vLoading } from "./directive-tOiqatq5.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
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
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-ClPmkyX9.js";
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
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-DKY_z0U1.js";
import "./index-cR1ntQxK.js";
import "./index-Cf_t59lc.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
/* empty css                  */
/* empty css                       */
/* empty css                   */
import "./index-I18rzBgu.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
/* empty css                   */
import "./index-DvOrIhmd.js";
/* empty css                  */
import "./index-iY4Ojb3q.js";
import "./index-DOE061f1.js";
/* empty css                         */
import "./AdminImageSelector-CmeJFGoK.js";
import "./index-DhXCDWyG.js";
/* empty css                     */
import "./validator-T0bsmJHo.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LinkedProductDrawer",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    tag: {},
    tagName: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = ref(false);
    const list = ref([]);
    const loading = ref(false);
    watch(() => props.modelValue, (val) => {
      visible.value = val;
      if (val && props.tag) {
        loadData();
      }
    });
    watch(visible, (val) => {
      emit("update:modelValue", val);
    });
    const loadData = async () => {
      if (!props.tag) return;
      loading.value = true;
      try {
        const res = await adminSharedSkuApi.getProductsBySharedTag(props.tag);
        if (res.success) {
          list.value = res.products || [];
        } else {
          ElMessage.error(res.error || "加载失败");
        }
      } catch (e) {
        console.error("getProductsBySharedTag Error:", e);
        ElMessage.error(e.message || "网络异常");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_drawer = ElDrawer;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_el_tag = ElTag;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_drawer, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: `关联商品列表 - ${__props.tagName || "#" + __props.tag}`,
        size: "600px",
        "destroy-on-close": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="drawer-container" data-v-c3045899${_scopeId}><div class="toolbar" data-v-c3045899${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              circle: "",
              onClick: loadData
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: list.value,
              border: "",
              stripe: "",
              height: "calc(100vh - 150px)"
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "商品信息",
                    "min-width": "250"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="product-cell" data-v-c3045899${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_image, {
                          src: row.image,
                          class: "p-thumb",
                          fit: "cover"
                        }, {
                          error: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="image-slot" data-v-c3045899${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(picture_default), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(picture_default))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "image-slot" }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(picture_default))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`<div class="p-info" data-v-c3045899${_scopeId3}><div class="p-name" data-v-c3045899${_scopeId3}>${ssrInterpolate(row.product_name)}</div><div class="p-id" data-v-c3045899${_scopeId3}>ID: ${ssrInterpolate(row.id.substring(0, 8))}...</div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "product-cell" }, [
                            createVNode(_component_el_image, {
                              src: row.image,
                              class: "p-thumb",
                              fit: "cover"
                            }, {
                              error: withCtx(() => [
                                createVNode("div", { class: "image-slot" }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(picture_default))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["src"]),
                            createVNode("div", { class: "p-info" }, [
                              createVNode("div", { class: "p-name" }, toDisplayString(row.product_name), 1),
                              createVNode("div", { class: "p-id" }, "ID: " + toDisplayString(row.id.substring(0, 8)) + "...", 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: row.status === "on" ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.status === "on" ? "上架" : "下架")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status === "on" ? "上架" : "下架"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: row.status === "on" ? "success" : "info",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.status === "on" ? "上架" : "下架"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "商品信息",
                      "min-width": "250"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { class: "product-cell" }, [
                          createVNode(_component_el_image, {
                            src: row.image,
                            class: "p-thumb",
                            fit: "cover"
                          }, {
                            error: withCtx(() => [
                              createVNode("div", { class: "image-slot" }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(picture_default))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }, 8, ["src"]),
                          createVNode("div", { class: "p-info" }, [
                            createVNode("div", { class: "p-name" }, toDisplayString(row.product_name), 1),
                            createVNode("div", { class: "p-id" }, "ID: " + toDisplayString(row.id.substring(0, 8)) + "...", 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status === "on" ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status === "on" ? "上架" : "下架"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "drawer-container" }, [
                createVNode("div", { class: "toolbar" }, [
                  createVNode(_component_el_button, {
                    icon: unref(refresh_default),
                    circle: "",
                    onClick: loadData
                  }, null, 8, ["icon"])
                ]),
                withDirectives((openBlock(), createBlock(_component_el_table, {
                  data: list.value,
                  border: "",
                  stripe: "",
                  height: "calc(100vh - 150px)"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      label: "商品信息",
                      "min-width": "250"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { class: "product-cell" }, [
                          createVNode(_component_el_image, {
                            src: row.image,
                            class: "p-thumb",
                            fit: "cover"
                          }, {
                            error: withCtx(() => [
                              createVNode("div", { class: "image-slot" }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(picture_default))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }, 8, ["src"]),
                          createVNode("div", { class: "p-info" }, [
                            createVNode("div", { class: "p-name" }, toDisplayString(row.product_name), 1),
                            createVNode("div", { class: "p-id" }, "ID: " + toDisplayString(row.id.substring(0, 8)) + "...", 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status === "on" ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status === "on" ? "上架" : "下架"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [_directive_loading, loading.value]
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/product/LinkedProductDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LinkedProductDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c3045899"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "shared-sku",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const saving = ref(false);
    const groups = ref([]);
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const currentTag = ref(0);
    const tagName = ref("");
    const currentSkus = ref([]);
    const currentSpecs = ref([]);
    const editorRef = ref();
    const loadGroups = async () => {
      loading.value = true;
      try {
        const res = await adminSharedSkuApi.getSharedSkuGroups();
        if (res.success) groups.value = res.groups;
      } finally {
        loading.value = false;
      }
    };
    const getUniqueSpecs = (group) => {
      const keys = /* @__PURE__ */ new Set();
      group.skus.forEach((s) => Object.keys(s.spec_combination).forEach((k) => keys.add(k)));
      return Array.from(keys);
    };
    const getPriceRange = (group) => {
      if (!group.skus.length) return "-";
      const prices = group.skus.map((s) => s.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      if (min === max) return `¥${min}`;
      return `¥${min} - ¥${max}`;
    };
    const openAddDialog = async () => {
      isEdit.value = false;
      const res = await adminSharedSkuApi.getNextTag();
      currentTag.value = res.tag || 0;
      tagName.value = "";
      currentSkus.value = [];
      currentSpecs.value = [];
      dialogVisible.value = true;
    };
    const openEditDialog = (row) => {
      isEdit.value = true;
      currentTag.value = row.tag;
      tagName.value = row.tag_name || "";
      const specMap = /* @__PURE__ */ new Map();
      const skus = row.skus.map((s) => {
        Object.entries(s.spec_combination).forEach(([k, v]) => {
          if (!specMap.has(k)) specMap.set(k, /* @__PURE__ */ new Set());
          specMap.get(k).add(v);
        });
        return {
          id: s.id,
          specValues: s.spec_combination,
          product_type: s.product_type,
          price: s.price,
          duration: s.duration,
          intro: s.intro,
          image: s.image,
          tag: s.tag
        };
      });
      currentSpecs.value = Array.from(specMap.entries()).map(([name, values]) => ({
        name,
        values: Array.from(values),
        inputVisible: false,
        inputValue: ""
      }));
      currentSkus.value = skus;
      dialogVisible.value = true;
    };
    const submitSave = async () => {
      if (!editorRef.value) return;
      saving.value = true;
      try {
        const skusToSave = editorRef.value.getSkus();
        if (skusToSave.length === 0) {
          ElMessage.warning("请至少添加一个SKU");
          return;
        }
        const payload = skusToSave.map((s, i) => ({
          id: s.id,
          spec_combination: s.specValues,
          product_type: s.product_type,
          price: s.price,
          duration: s.duration,
          image: s.image,
          intro: s.intro,
          sort_order: i
        }));
        let res;
        if (isEdit.value) {
          res = await adminSharedSkuApi.updateSharedSkuGroup(currentTag.value, payload, tagName.value);
        } else {
          res = await adminSharedSkuApi.createSharedSkuGroup(currentTag.value, payload, tagName.value);
        }
        if (res.success) {
          ElMessage.success("保存成功");
          dialogVisible.value = false;
          loadGroups();
        } else ElMessage.error(res.error);
      } finally {
        saving.value = false;
      }
    };
    const confirmDelete = (row) => {
      ElMessageBox.confirm(`确认删除规格组 #${row.tag}? 此操作无法恢复。`, "警告", { type: "warning" }).then(async () => {
        const res = await adminSharedSkuApi.deleteSharedSkuGroup(row.tag);
        if (res.success) {
          ElMessage.success("删除成功");
          loadGroups();
        } else ElMessage.error(res.error);
      });
    };
    const productsDialogVisible = ref(false);
    const currentTagForView = ref(0);
    const currentTagNameForView = ref("");
    const openProductsDialog = (row) => {
      currentTagForView.value = row.tag;
      currentTagNameForView.value = row.tag_name;
      productsDialogVisible.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_input = ElInput;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "shared-sku-page" }, _attrs))} data-v-71f13eae>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "共享规格组可被多个商品引用，修改此处将同步更新所有关联商品。",
        type: "warning"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadGroups,
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
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: openAddDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`新建共享规格组`);
                } else {
                  return [
                    createTextVNode("新建共享规格组")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: loadGroups,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("新建共享规格组")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: groups.value,
        loading: loading.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "组 ID",
              prop: "tag",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    effect: "dark"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`#${ssrInterpolate(row.tag)}`);
                      } else {
                        return [
                          createTextVNode("#" + toDisplayString(row.tag), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (row.tag_name) {
                    _push3(`<div style="${ssrRenderStyle({ "font-size": "12px", "margin-top": "5px", "color": "#909399" })}" data-v-71f13eae${_scopeId2}>${ssrInterpolate(row.tag_name)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: "info",
                      effect: "dark"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("#" + toDisplayString(row.tag), 1)
                      ]),
                      _: 2
                    }, 1024),
                    row.tag_name ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "font-size": "12px", "margin-top": "5px", "color": "#909399" }
                    }, toDisplayString(row.tag_name), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "SKU 数量",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.skus.length)} 个规格`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.skus.length) + " 个规格", 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.skus.length) + " 个规格", 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "包含规格项",
              "min-width": "250"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="spec-preview" data-v-71f13eae${_scopeId2}><!--[-->`);
                  ssrRenderList(getUniqueSpecs(row), (spec) => {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      key: spec,
                      size: "small",
                      type: "warning",
                      effect: "plain",
                      class: "spec-tag"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(spec)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(spec), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "spec-preview" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(getUniqueSpecs(row), (spec) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: spec,
                          size: "small",
                          type: "warning",
                          effect: "plain",
                          class: "spec-tag"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(spec), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "价格范围",
              width: "180",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(getPriceRange(row))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(getPriceRange(row)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "150",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEditDialog(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`管理规格`);
                      } else {
                        return [
                          createTextVNode("管理规格")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => openProductsDialog(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`查看引用`);
                      } else {
                        return [
                          createTextVNode("查看引用")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => confirmDelete(row)
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
                      onClick: ($event) => openEditDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("管理规格")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "info",
                      onClick: ($event) => openProductsDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("查看引用")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => confirmDelete(row)
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
                label: "组 ID",
                prop: "tag",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: "info",
                    effect: "dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("#" + toDisplayString(row.tag), 1)
                    ]),
                    _: 2
                  }, 1024),
                  row.tag_name ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "font-size": "12px", "margin-top": "5px", "color": "#909399" }
                  }, toDisplayString(row.tag_name), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "SKU 数量",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.skus.length) + " 个规格", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "包含规格项",
                "min-width": "250"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "spec-preview" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(getUniqueSpecs(row), (spec) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: spec,
                        size: "small",
                        type: "warning",
                        effect: "plain",
                        class: "spec-tag"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(spec), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "价格范围",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(getPriceRange(row)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "150",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openEditDialog(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("管理规格")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => openProductsDialog(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("查看引用")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => confirmDelete(row)
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
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? `编辑规格组 #${currentTag.value}` : "新建共享规格组",
        width: "900px",
        "show-footer": true,
        "confirm-text": "保存更改",
        loading: saving.value,
        onConfirm: submitSave
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "20px" })}" data-v-71f13eae${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: tagName.value,
              "onUpdate:modelValue": ($event) => tagName.value = $event,
              placeholder: "请输入共享组标签名（可选，方便记忆）"
            }, {
              prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`标签名`);
                } else {
                  return [
                    createTextVNode("标签名")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (dialogVisible.value) {
              _push2(ssrRenderComponent(SkuEditor, {
                ref_key: "editorRef",
                ref: editorRef,
                mode: "standalone",
                tag: currentTag.value,
                "initial-skus": currentSkus.value,
                "initial-specs": currentSpecs.value
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { style: { "margin-bottom": "20px" } }, [
                createVNode(_component_el_input, {
                  modelValue: tagName.value,
                  "onUpdate:modelValue": ($event) => tagName.value = $event,
                  placeholder: "请输入共享组标签名（可选，方便记忆）"
                }, {
                  prepend: withCtx(() => [
                    createTextVNode("标签名")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              dialogVisible.value ? (openBlock(), createBlock(SkuEditor, {
                key: 0,
                ref_key: "editorRef",
                ref: editorRef,
                mode: "standalone",
                tag: currentTag.value,
                "initial-skus": currentSkus.value,
                "initial-specs": currentSpecs.value
              }, null, 8, ["tag", "initial-skus", "initial-specs"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(LinkedProductDrawer, {
        modelValue: productsDialogVisible.value,
        "onUpdate:modelValue": ($event) => productsDialogVisible.value = $event,
        tag: currentTagForView.value,
        "tag-name": currentTagNameForView.value
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/shared-sku.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sharedSku = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71f13eae"]]);
export {
  sharedSku as default
};
//# sourceMappingURL=shared-sku-DY5SD9Sr.js.map
