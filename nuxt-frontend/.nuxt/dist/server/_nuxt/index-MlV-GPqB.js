import { E as ElButton } from "./index-Cfk6gFRD.js";
import { E as ElTableColumn } from "./index-CppwRAFr.js";
import { E as ElSwitch } from "./index-E7MQUUY5.js";
import { v as vLoading } from "./directive-BBpaOxz2.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { q as refresh_default, p as plus_default } from "./index-DlETah8a.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useAdminCouponList } from "./useAdminCouponList-CgczVq-h.js";
import { P as PageTipHeader } from "./PageTipHeader-DqGE4r9z.js";
import { A as AdminActionCard } from "./AdminActionCard-BmEdBcE0.js";
import { B as BulkActionBar } from "./BulkActionBar-CGZPKK1n.js";
import { A as AdminDataTable } from "./AdminDataTable-C0ckSjEK.js";
import { C as CouponCodeGenerator, a as CouponCodeDrawer, _ as _sfc_main$1 } from "./CouponCodeEditor-nJjVhZEx.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-CK7WLSPl.js";
import "./index-K5TIzHX_.js";
import "./index-jl2vZbkg.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-79yNXOXL.js";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CmHlMPx0.js";
import "./index-DqrhOzxH.js";
import "./index-BgvvVJ20.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-D4pu9U8U.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-BaQl3RdN.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
import "./useAdminList-BwjzBODI.js";
import "./index-DSo6N35Z.js";
import "./typescript-D6L75muK.js";
import "./coupon-DnjcrSN8.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./index-C_BEi-G8.js";
import "./index-DfZ5KWBt.js";
import "./index-Cy25Tved.js";
import "./index-CuQ4LNHg.js";
import "./vnode-BKSxKQVt.js";
import "./index-7KygWwCI.js";
import "./scroll-BuMAfCNC.js";
import "./index-CHfwRf2j.js";
/* empty css                  */
import "./index-sO8Yjc2X.js";
/* empty css                    */
import "./index-DHhizeNf.js";
import "./index-2hf2A4Op.js";
import "./index-CHDWEhch.js";
import "./index-CAqDGa72.js";
import "./strings-D1uxkXhq.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
import "./index-Dhc7L6Kv.js";
import "./refs-CxYYXu5Q.js";
import "./index-DQj_S9wC.js";
import "./index-COX41yze.js";
import "./index-BHYewqHp.js";
import "async-validator";
import "./index-DKzxlu5F.js";
import "./index-D3BlhKEk.js";
/* empty css                   */
/* empty css                     */
/* empty css                 */
/* empty css                      */
/* empty css                         */
import "./index-CUCx8vYk.js";
import "./cdk-BcOf0oEp.js";
import "./media-DksayCA2.js";
import "./order-BDjtswS6.js";
import "./index-BA4cEwD1.js";
/* empty css                   */
import "dayjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatDate, formatPrice } = useBizFormat();
    const router = useRouter();
    const showGenerator = ref(false);
    const currentCoupon = ref(null);
    const viewCodesDialog = reactive({
      visible: false,
      couponId: "",
      couponName: ""
    });
    const codeEditorDialog = reactive({
      visible: false,
      coupon: null
    });
    const {
      loading,
      list,
      selectedIds,
      refresh: loadList,
      // Alias for compatibility
      handleSelectionChange,
      handleToggleStatus: toggleStatus,
      // Alias
      handleBulkDelete
    } = useAdminCouponList("flat");
    const handleCreate = () => {
      router.push("/admin/coupons/flat/post");
    };
    const handleEdit = (row) => {
      router.push({
        path: "/admin/coupons/flat/post",
        query: { id: row.id }
      });
    };
    const handleGenerate = (row) => {
      currentCoupon.value = row;
      showGenerator.value = true;
    };
    const handleViewCodes = (row) => {
      viewCodesDialog.couponId = row.id;
      viewCodesDialog.couponName = row.name;
      viewCodesDialog.visible = true;
    };
    const handleEditCode = (row) => {
      codeEditorDialog.coupon = row;
      codeEditorDialog.visible = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-flat-list" }, _attrs))} data-v-a8c64b27>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "立减券管理",
        description: "管理满减类型的优惠券，用户满足最低消费金额后可减免指定金额。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: unref(loadList)
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
              onClick: handleCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`新增立减券`);
                } else {
                  return [
                    createTextVNode("新增立减券")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: unref(loadList)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon", "onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: handleCreate
              }, {
                default: withCtx(() => [
                  createTextVNode("新增立减券")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(selectedIds).length > 0) {
        _push(ssrRenderComponent(BulkActionBar, {
          count: unref(selectedIds).length,
          onDelete: unref(handleBulkDelete)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataTable, mergeProps({
        data: unref(list),
        onSelectionChange: unref(handleSelectionChange)
      }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "50",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "名称",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="code-info" data-v-a8c64b27${_scopeId2}><div class="code-name" data-v-a8c64b27${_scopeId2}>${ssrInterpolate(row.name)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "code-info" }, [
                      createVNode("div", { class: "code-name" }, toDisplayString(row.name), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "优惠内容",
              width: "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="benefit-tag" data-v-a8c64b27${_scopeId2}><span data-v-a8c64b27${_scopeId2}>满 ${ssrInterpolate(row.min_usage)} 减</span><span class="benefit-value" data-v-a8c64b27${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.value))}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "benefit-tag" }, [
                      createVNode("span", null, "满 " + toDisplayString(row.min_usage) + " 减", 1),
                      createVNode("span", { class: "benefit-value" }, toDisplayString(unref(formatPrice)(row.value)), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "有效期",
              width: "220",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row.end_date) {
                    _push3(`<div class="validity-tag" data-v-a8c64b27${_scopeId2}>永久有效</div>`);
                  } else {
                    _push3(`<div class="validity-range" data-v-a8c64b27${_scopeId2}><div data-v-a8c64b27${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.start_date))}</div><div class="date-sep" data-v-a8c64b27${_scopeId2}>至</div><div data-v-a8c64b27${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.end_date))}</div></div>`);
                  }
                } else {
                  return [
                    !row.end_date ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "validity-tag"
                    }, "永久有效")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "validity-range"
                    }, [
                      createVNode("div", null, toDisplayString(unref(formatDate)(row.start_date)), 1),
                      createVNode("div", { class: "date-sep" }, "至"),
                      createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)), 1)
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "inline-prompt": "",
                    "active-text": "启用",
                    "inactive-text": "停用",
                    loading: row.statusLoading,
                    onChange: ($event) => unref(toggleStatus)(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "停用",
                      loading: row.statusLoading,
                      onChange: ($event) => unref(toggleStatus)(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "260",
              align: "center",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleEdit(row)
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
                    type: "success",
                    onClick: ($event) => handleGenerate(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`发券`);
                      } else {
                        return [
                          createTextVNode("发券")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleEditCode(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`说明`);
                      } else {
                        return [
                          createTextVNode("说明")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => handleViewCodes(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`详情`);
                      } else {
                        return [
                          createTextVNode("详情")
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
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "success",
                      onClick: ($event) => handleGenerate(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("发券")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "warning",
                      onClick: ($event) => handleEditCode(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("说明")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "info",
                      onClick: ($event) => handleViewCodes(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("详情")
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
                type: "selection",
                width: "50",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                label: "名称",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "code-info" }, [
                    createVNode("div", { class: "code-name" }, toDisplayString(row.name), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "优惠内容",
                width: "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "benefit-tag" }, [
                    createVNode("span", null, "满 " + toDisplayString(row.min_usage) + " 减", 1),
                    createVNode("span", { class: "benefit-value" }, toDisplayString(unref(formatPrice)(row.value)), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "有效期",
                width: "220",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  !row.end_date ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "validity-tag"
                  }, "永久有效")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "validity-range"
                  }, [
                    createVNode("div", null, toDisplayString(unref(formatDate)(row.start_date)), 1),
                    createVNode("div", { class: "date-sep" }, "至"),
                    createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)), 1)
                  ]))
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
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "inline-prompt": "",
                    "active-text": "启用",
                    "inactive-text": "停用",
                    loading: row.statusLoading,
                    onChange: ($event) => unref(toggleStatus)(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "260",
                align: "center",
                fixed: "right"
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
                    type: "success",
                    onClick: ($event) => handleGenerate(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("发券")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleEditCode(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("说明")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => handleViewCodes(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("详情")
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
      _push(ssrRenderComponent(CouponCodeGenerator, {
        modelValue: showGenerator.value,
        "onUpdate:modelValue": ($event) => showGenerator.value = $event,
        coupon: currentCoupon.value
      }, null, _parent));
      _push(ssrRenderComponent(CouponCodeDrawer, {
        modelValue: viewCodesDialog.visible,
        "onUpdate:modelValue": ($event) => viewCodesDialog.visible = $event,
        "coupon-id": viewCodesDialog.couponId,
        "coupon-name": viewCodesDialog.couponName
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: codeEditorDialog.visible,
        "onUpdate:modelValue": ($event) => codeEditorDialog.visible = $event,
        coupon: codeEditorDialog.coupon,
        onSaved: unref(loadList)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons/flat/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a8c64b27"]]);
export {
  index as default
};
//# sourceMappingURL=index-MlV-GPqB.js.map
