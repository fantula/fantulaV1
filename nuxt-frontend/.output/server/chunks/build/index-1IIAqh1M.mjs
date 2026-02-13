import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { v as vLoading } from './directive-DOWfgPYe.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { r as refresh_default, p as plus_default } from './index-DuV_oMrC.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { u as useAdminCouponList } from './useAdminCouponList-Ckzk72V9.mjs';
import { P as PageTipHeader } from './PageTipHeader-Dofk1SFn.mjs';
import { A as AdminActionCard } from './AdminActionCard-CU3C31Qp.mjs';
import { B as BulkActionBar } from './BulkActionBar-DDw01dtb.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { C as CouponCodeGenerator, a as CouponCodeDrawer, _ as _sfc_main$1 } from './CouponCodeEditor-Dc-gfJ9A.mjs';
import './icon-CyvpkMdQ.mjs';
import './index-xMedQC9S.mjs';
import 'lodash-unified';
import '@vue/shared';
import './index-CsSUb8pm.mjs';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './use-global-config-Dt87SALX.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-CVMnQJck.mjs';
import './index-C88l1uRA.mjs';
import './index-B8mpCVSS.mjs';
import '@popperjs/core';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-7GSISQj3.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './validator-B2QmXMzy.mjs';
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
import './useAdminList-BwghEQmC.mjs';
import './index-Ho-fELR6.mjs';
import './typescript-D6L75muK.mjs';
import './coupon-DnjcrSN8.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './index-CJRqI9Bk.mjs';
import './index-DHiqjM1w.mjs';
import './index-Cy25Tved.mjs';
import './index-wSws2F9U.mjs';
import './vnode-BKSxKQVt.mjs';
import './index-CC_9xuAU.mjs';
import './scroll-DHYrZ40v.mjs';
import './index-B4LZdJVK.mjs';
import './index-BWwwK9Wh.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './index-z3smHzuf.mjs';
import './index-CzsgKIaa.mjs';
import './strings-D1uxkXhq.mjs';
import './index-BKas9GMw.mjs';
import './index-CcOBk9kW.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-BPcRo9Xd.mjs';
import './index-COX41yze.mjs';
import './index-Bd_1JmUc.mjs';
import 'async-validator';
import './index-C8Zv6czV.mjs';
import './index-D3BlhKEk.mjs';
import './index-CUCx8vYk.mjs';
import './cdk-BcOf0oEp.mjs';
import './media-DksayCA2.mjs';
import './order-BDjtswS6.mjs';
import './index-iMmQZoDW.mjs';
import 'dayjs';

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
        title: "\u7ACB\u51CF\u5238\u7BA1\u7406",
        description: "\u7BA1\u7406\u6EE1\u51CF\u7C7B\u578B\u7684\u4F18\u60E0\u5238\uFF0C\u7528\u6237\u6EE1\u8DB3\u6700\u4F4E\u6D88\u8D39\u91D1\u989D\u540E\u53EF\u51CF\u514D\u6307\u5B9A\u91D1\u989D\u3002"
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
              onClick: handleCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u65B0\u589E\u7ACB\u51CF\u5238`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u7ACB\u51CF\u5238")
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
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon", "onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: handleCreate
              }, {
                default: withCtx(() => [
                  createTextVNode("\u65B0\u589E\u7ACB\u51CF\u5238")
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
              label: "\u540D\u79F0",
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
              label: "\u4F18\u60E0\u5185\u5BB9",
              width: "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="benefit-tag" data-v-a8c64b27${_scopeId2}><span data-v-a8c64b27${_scopeId2}>\u6EE1 ${ssrInterpolate(row.min_usage)} \u51CF</span><span class="benefit-value" data-v-a8c64b27${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.value))}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "benefit-tag" }, [
                      createVNode("span", null, "\u6EE1 " + toDisplayString(row.min_usage) + " \u51CF", 1),
                      createVNode("span", { class: "benefit-value" }, toDisplayString(unref(formatPrice)(row.value)), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6709\u6548\u671F",
              width: "220",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row.end_date) {
                    _push3(`<div class="validity-tag" data-v-a8c64b27${_scopeId2}>\u6C38\u4E45\u6709\u6548</div>`);
                  } else {
                    _push3(`<div class="validity-range" data-v-a8c64b27${_scopeId2}><div data-v-a8c64b27${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.start_date))}</div><div class="date-sep" data-v-a8c64b27${_scopeId2}>\u81F3</div><div data-v-a8c64b27${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.end_date))}</div></div>`);
                  }
                } else {
                  return [
                    !row.end_date ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "validity-tag"
                    }, "\u6C38\u4E45\u6709\u6548")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "validity-range"
                    }, [
                      createVNode("div", null, toDisplayString(unref(formatDate)(row.start_date)), 1),
                      createVNode("div", { class: "date-sep" }, "\u81F3"),
                      createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)), 1)
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "inline-prompt": "",
                    "active-text": "\u542F\u7528",
                    "inactive-text": "\u505C\u7528",
                    loading: row.statusLoading,
                    onChange: ($event) => unref(toggleStatus)(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "inline-prompt": "",
                      "active-text": "\u542F\u7528",
                      "inactive-text": "\u505C\u7528",
                      loading: row.statusLoading,
                      onChange: ($event) => unref(toggleStatus)(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
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
                    type: "success",
                    onClick: ($event) => handleGenerate(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u53D1\u5238`);
                      } else {
                        return [
                          createTextVNode("\u53D1\u5238")
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
                        _push4(`\u8BF4\u660E`);
                      } else {
                        return [
                          createTextVNode("\u8BF4\u660E")
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
                        _push4(`\u8BE6\u60C5`);
                      } else {
                        return [
                          createTextVNode("\u8BE6\u60C5")
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
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "success",
                      onClick: ($event) => handleGenerate(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u53D1\u5238")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "warning",
                      onClick: ($event) => handleEditCode(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u8BF4\u660E")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "info",
                      onClick: ($event) => handleViewCodes(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u8BE6\u60C5")
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
                label: "\u540D\u79F0",
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
                label: "\u4F18\u60E0\u5185\u5BB9",
                width: "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "benefit-tag" }, [
                    createVNode("span", null, "\u6EE1 " + toDisplayString(row.min_usage) + " \u51CF", 1),
                    createVNode("span", { class: "benefit-value" }, toDisplayString(unref(formatPrice)(row.value)), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u6709\u6548\u671F",
                width: "220",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  !row.end_date ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "validity-tag"
                  }, "\u6C38\u4E45\u6709\u6548")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "validity-range"
                  }, [
                    createVNode("div", null, toDisplayString(unref(formatDate)(row.start_date)), 1),
                    createVNode("div", { class: "date-sep" }, "\u81F3"),
                    createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)), 1)
                  ]))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    "inline-prompt": "",
                    "active-text": "\u542F\u7528",
                    "inactive-text": "\u505C\u7528",
                    loading: row.statusLoading,
                    onChange: ($event) => unref(toggleStatus)(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "success",
                    onClick: ($event) => handleGenerate(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D1\u5238")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleEditCode(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8BF4\u660E")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => handleViewCodes(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8BE6\u60C5")
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

export { index as default };
//# sourceMappingURL=index-1IIAqh1M.mjs.map
