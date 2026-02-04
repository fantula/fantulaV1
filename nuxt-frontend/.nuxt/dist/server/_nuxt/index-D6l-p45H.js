import { E as ElButton } from "./index-DZvUdcyn.js";
import { E as ElTableColumn } from "./index-BDPO3Is8.js";
import { E as ElSwitch } from "./index-uvs_ySzw.js";
import { v as vLoading } from "./directive-D1M1s_ef.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                    */
/* empty css                        */
/* empty css                  */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { v as refresh_default, p as plus_default } from "./index-CmsdIFY8.js";
import { b as adminApi } from "./index-DjW7A1G4.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { P as PageTipHeader } from "./PageTipHeader-DNW76KgA.js";
import { A as AdminActionCard } from "./AdminActionCard-BOXSA_sB.js";
import { B as BulkActionBar } from "./BulkActionBar-Blw5Sc8y.js";
import { A as AdminDataTable } from "./AdminDataTable-DXAYh9aE.js";
import { C as CouponCodeGenerator, a as CouponCodeDrawer, _ as _sfc_main$1 } from "./CouponCodeEditor-BRLoecw0.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-eYVppfk3.js";
import { E as ElMessageBox } from "./index-DVSiICTI.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-eqoLCvNY.js";
import "./index-CO6H4Lsj.js";
import "./index-Byc6LUYX.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-DGjXPDlO.js";
import "./index-DqrhOzxH.js";
import "./index-D6r9Uwf3.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DpI-EKEn.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-CGHVIElq.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./cdk-CHAe6x4V.js";
import "./coupon-DnjcrSN8.js";
import "./media-DksayCA2.js";
import "./order-BDjtswS6.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "./index-CMWWC85k.js";
import "./vnode-C7bAOlXh.js";
/* empty css                  */
import "./index-DL7T-Mp9.js";
/* empty css                    */
import "./index-EXqkolUp.js";
import "./index-dRoeuTok.js";
import "./index-uIKF9nns.js";
import "./index-BZB4XnD2.js";
import "./strings-D1uxkXhq.js";
import "./scroll-Df9VGR5S.js";
import "./index-CcE-rjwX.js";
import "./typescript-D6L75muK.js";
import "./index-D2CY7Ok3.js";
import "./index-BDc7M6dy.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
import "./index-DmU8t9ja.js";
import "./index-NMCQtDk_.js";
import "./refs-CxYYXu5Q.js";
import "./index-ebnaz0b7.js";
import "./index-DJROtKFb.js";
import "./index-4tXJzNER.js";
import "./index-DCJPe4PK.js";
import "async-validator";
import "./index-DsxUj3pO.js";
import "./index-D3BlhKEk.js";
/* empty css                   */
/* empty css                     */
/* empty css                 */
/* empty css                      */
/* empty css                         */
import "./index-BkyvGx7Y.js";
/* empty css                   */
import "dayjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatDate, formatPrice } = useBizFormat();
    const router = useRouter();
    const loading = ref(false);
    const list = ref([]);
    const total = ref(0);
    const selectedIds = ref([]);
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
    const loadList = async () => {
      loading.value = true;
      try {
        const res = await adminApi.coupon.getCoupons({ type: "balance" });
        if (res.success) {
          list.value = res.coupons.map((item) => ({ ...item, statusLoading: false }));
          total.value = res.total || list.value.length;
        } else {
          ElMessage.error(res.error || "加载失败");
        }
      } catch (e) {
        ElMessage.error("加载异常");
      } finally {
        loading.value = false;
      }
    };
    const handleCreate = () => {
      router.push("/admin/coupons/balance/post");
    };
    const handleEdit = (row) => {
      router.push(`/admin/coupons/balance/post?id=${row.id}`);
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
    const handleSelectionChange = (selection) => {
      selectedIds.value = selection.map((item) => item.id);
    };
    const handleBulkDelete = () => {
      if (!selectedIds.value.length) return;
      ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券规则吗？`, "批量删除", {
        type: "warning"
      }).then(async () => {
        let successCount = 0;
        for (const id of selectedIds.value) {
          const res = await adminApi.coupon.deleteCoupon(id);
          if (res.success) successCount++;
        }
        ElMessage.success(`成功删除 ${successCount} 个优惠券规则`);
        loadList();
        selectedIds.value = [];
      });
    };
    const toggleStatus = async (row) => {
      row.statusLoading = true;
      try {
        const res = await adminApi.coupon.toggleStatus(row.id, row.status);
        if (res.success) {
          ElMessage.success(`已${row.status ? "启用" : "停用"}`);
        } else {
          row.status = !row.status;
          ElMessage.error(res.error || "操作失败");
        }
      } catch (e) {
        row.status = !row.status;
        ElMessage.error("操作异常");
      } finally {
        row.statusLoading = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-balance-list" }, _attrs))} data-v-0d38bde2>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "额度券管理",
        description: "管理用于充值用户余额的额度券，用户兑换后直接增加账户余额。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: loadList
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
                  _push3(`新增额度券`);
                } else {
                  return [
                    createTextVNode("新增额度券")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: loadList
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: handleCreate
              }, {
                default: withCtx(() => [
                  createTextVNode("新增额度券")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (selectedIds.value.length > 0) {
        _push(ssrRenderComponent(BulkActionBar, {
          count: selectedIds.value.length,
          onDelete: handleBulkDelete
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataTable, mergeProps({
        data: list.value,
        onSelectionChange: handleSelectionChange
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
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
                  _push3(`<div class="code-info" data-v-0d38bde2${_scopeId2}><div class="code-name" data-v-0d38bde2${_scopeId2}>${ssrInterpolate(row.name)}</div></div>`);
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
              label: "赠送余额",
              width: "120",
              align: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-0d38bde2${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.value))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.value)), 1)
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
                    _push3(`<div class="validity-tag" data-v-0d38bde2${_scopeId2}>永久有效</div>`);
                  } else {
                    _push3(`<div class="validity-range" data-v-0d38bde2${_scopeId2}><div data-v-0d38bde2${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.start_date))}</div><div class="date-sep" data-v-0d38bde2${_scopeId2}>至</div><div data-v-0d38bde2${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.end_date))}</div></div>`);
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
                    onChange: ($event) => toggleStatus(row)
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
                      onChange: ($event) => toggleStatus(row)
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
                label: "赠送余额",
                width: "120",
                align: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.value)), 1)
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
                    onChange: ($event) => toggleStatus(row)
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
        onSaved: loadList
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons/balance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d38bde2"]]);
export {
  index as default
};
//# sourceMappingURL=index-D6l-p45H.js.map
