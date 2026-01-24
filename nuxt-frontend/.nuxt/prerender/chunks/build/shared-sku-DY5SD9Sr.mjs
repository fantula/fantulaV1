import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTableColumn, a as ElTable } from './index-KOxrtlML.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { _ as _export_sfc, b9 as refresh_default, p as plus_default, ah as ElMessage, E as ElIcon, ba as picture_default } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, watch, withDirectives, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { e as adminSharedSkuApi } from './admin-supabase-nszo-IoU.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { A as AdminDataTable } from './AdminDataTable-CCOHgBz_.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-CUwf_G99.mjs';
import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { S as SkuEditor } from './SkuEditor-Cd65qRno.mjs';
import { E as ElDrawer } from './index-4Qac4SKg.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './index-D_b573Qt.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-Dxw_X3Hq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-DrPRyc7n.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './index-ClPmkyX9.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';
import './index-QnhSR2oe.mjs';
import './index-DKY_z0U1.mjs';
import './index-cR1ntQxK.mjs';
import './index-Cf_t59lc.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-I18rzBgu.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './index-DvOrIhmd.mjs';
import './index-iY4Ojb3q.mjs';
import './index-DOE061f1.mjs';
import './AdminImageSelector-CmeJFGoK.mjs';
import './index-DhXCDWyG.mjs';
import './validator-T0bsmJHo.mjs';

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
          ElMessage.error(res.error || "\u52A0\u8F7D\u5931\u8D25");
        }
      } catch (e) {
        console.error("getProductsBySharedTag Error:", e);
        ElMessage.error(e.message || "\u7F51\u7EDC\u5F02\u5E38");
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
        title: `\u5173\u8054\u5546\u54C1\u5217\u8868 - ${__props.tagName || "#" + __props.tag}`,
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
                    label: "\u5546\u54C1\u4FE1\u606F",
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
                    label: "\u72B6\u6001",
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
                              _push5(`${ssrInterpolate(row.status === "on" ? "\u4E0A\u67B6" : "\u4E0B\u67B6")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status === "on" ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
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
                              createTextVNode(toDisplayString(row.status === "on" ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
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
                      label: "\u5546\u54C1\u4FE1\u606F",
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
                      label: "\u72B6\u6001",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status === "on" ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status === "on" ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
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
                      label: "\u5546\u54C1\u4FE1\u606F",
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
                      label: "\u72B6\u6001",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status === "on" ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status === "on" ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
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
      if (min === max) return `\xA5${min}`;
      return `\xA5${min} - \xA5${max}`;
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
          ElMessage.warning("\u8BF7\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2ASKU");
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
          ElMessage.success("\u4FDD\u5B58\u6210\u529F");
          dialogVisible.value = false;
          loadGroups();
        } else ElMessage.error(res.error);
      } finally {
        saving.value = false;
      }
    };
    const confirmDelete = (row) => {
      ElMessageBox.confirm(`\u786E\u8BA4\u5220\u9664\u89C4\u683C\u7EC4 #${row.tag}? \u6B64\u64CD\u4F5C\u65E0\u6CD5\u6062\u590D\u3002`, "\u8B66\u544A", { type: "warning" }).then(async () => {
        const res = await adminSharedSkuApi.deleteSharedSkuGroup(row.tag);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
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
        title: "\u5171\u4EAB\u89C4\u683C\u7EC4\u53EF\u88AB\u591A\u4E2A\u5546\u54C1\u5F15\u7528\uFF0C\u4FEE\u6539\u6B64\u5904\u5C06\u540C\u6B65\u66F4\u65B0\u6240\u6709\u5173\u8054\u5546\u54C1\u3002",
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
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
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
                  _push3(`\u65B0\u5EFA\u5171\u4EAB\u89C4\u683C\u7EC4`);
                } else {
                  return [
                    createTextVNode("\u65B0\u5EFA\u5171\u4EAB\u89C4\u683C\u7EC4")
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
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("\u65B0\u5EFA\u5171\u4EAB\u89C4\u683C\u7EC4")
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
              label: "\u7EC4 ID",
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
              label: "SKU \u6570\u91CF",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.skus.length)} \u4E2A\u89C4\u683C`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.skus.length) + " \u4E2A\u89C4\u683C", 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.skus.length) + " \u4E2A\u89C4\u683C", 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5305\u542B\u89C4\u683C\u9879",
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
              label: "\u4EF7\u683C\u8303\u56F4",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`\u7BA1\u7406\u89C4\u683C`);
                      } else {
                        return [
                          createTextVNode("\u7BA1\u7406\u89C4\u683C")
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
                        _push4(`\u67E5\u770B\u5F15\u7528`);
                      } else {
                        return [
                          createTextVNode("\u67E5\u770B\u5F15\u7528")
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
                      onClick: ($event) => openEditDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7BA1\u7406\u89C4\u683C")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "info",
                      onClick: ($event) => openProductsDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u67E5\u770B\u5F15\u7528")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => confirmDelete(row)
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
                label: "\u7EC4 ID",
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
                label: "SKU \u6570\u91CF",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.skus.length) + " \u4E2A\u89C4\u683C", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5305\u542B\u89C4\u683C\u9879",
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
                label: "\u4EF7\u683C\u8303\u56F4",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(getPriceRange(row)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u7BA1\u7406\u89C4\u683C")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => openProductsDialog(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u67E5\u770B\u5F15\u7528")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => confirmDelete(row)
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
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? `\u7F16\u8F91\u89C4\u683C\u7EC4 #${currentTag.value}` : "\u65B0\u5EFA\u5171\u4EAB\u89C4\u683C\u7EC4",
        width: "900px",
        "show-footer": true,
        "confirm-text": "\u4FDD\u5B58\u66F4\u6539",
        loading: saving.value,
        onConfirm: submitSave
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "20px" })}" data-v-71f13eae${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: tagName.value,
              "onUpdate:modelValue": ($event) => tagName.value = $event,
              placeholder: "\u8BF7\u8F93\u5165\u5171\u4EAB\u7EC4\u6807\u7B7E\u540D\uFF08\u53EF\u9009\uFF0C\u65B9\u4FBF\u8BB0\u5FC6\uFF09"
            }, {
              prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6807\u7B7E\u540D`);
                } else {
                  return [
                    createTextVNode("\u6807\u7B7E\u540D")
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
                  placeholder: "\u8BF7\u8F93\u5165\u5171\u4EAB\u7EC4\u6807\u7B7E\u540D\uFF08\u53EF\u9009\uFF0C\u65B9\u4FBF\u8BB0\u5FC6\uFF09"
                }, {
                  prepend: withCtx(() => [
                    createTextVNode("\u6807\u7B7E\u540D")
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

export { sharedSku as default };
//# sourceMappingURL=shared-sku-DY5SD9Sr.mjs.map
