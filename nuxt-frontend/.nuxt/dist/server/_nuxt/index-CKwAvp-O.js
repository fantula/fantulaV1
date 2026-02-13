import { E as ElButton } from "./index-DV2Xa1Kj.js";
import { E as ElTableColumn } from "./index-ghXUvVLW.js";
import { E as ElTag } from "./index-CzsgKIaa.js";
import { E as ElSwitch } from "./index-Cdq-rMDq.js";
import { v as vLoading } from "./directive-DOWfgPYe.js";
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
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { A as refresh_default, p as plus_default } from "./index-DuV_oMrC.js";
import { b as adminApi } from "./index-CUCx8vYk.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { P as PageTipHeader } from "./PageTipHeader-Dofk1SFn.js";
import { A as AdminActionCard } from "./AdminActionCard-CU3C31Qp.js";
import { B as BulkActionBar } from "./BulkActionBar-DDw01dtb.js";
import { A as AdminDataTable } from "./AdminDataTable-CJO5xpdf.js";
import { C as CouponCodeGenerator, a as CouponCodeDrawer, _ as _sfc_main$1 } from "./CouponCodeEditor-Dc-gfJ9A.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-Ho-fELR6.js";
import { E as ElMessageBox } from "./index-CJRqI9Bk.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-CyvpkMdQ.js";
import "./index-xMedQC9S.js";
import "lodash-unified";
import "@vue/shared";
import "./index-CsSUb8pm.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-Dt87SALX.js";
import "./use-form-item-VP6j78iG.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CVMnQJck.js";
import "./index-C88l1uRA.js";
import "./index-B8mpCVSS.js";
import "@popperjs/core";
import "./focus-trap.vue-CG7JU5b_.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-7GSISQj3.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-B2QmXMzy.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./cdk-BcOf0oEp.js";
import "./coupon-DnjcrSN8.js";
import "./media-DksayCA2.js";
import "./order-BDjtswS6.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "./index-B4LZdJVK.js";
import "./vnode-BKSxKQVt.js";
/* empty css                  */
import "./index-BWwwK9Wh.js";
/* empty css                    */
import "./index-B_8BWUnE.js";
import "./index-BDljrZG0.js";
import "./index-z3smHzuf.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DHYrZ40v.js";
import "./index-DHiqjM1w.js";
import "./typescript-D6L75muK.js";
import "./index-Cy25Tved.js";
import "./index-BKas9GMw.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
import "./index-CcOBk9kW.js";
import "./index-wSws2F9U.js";
import "./refs-CxYYXu5Q.js";
import "./index-CC_9xuAU.js";
import "./index-BPcRo9Xd.js";
import "./index-COX41yze.js";
import "./index-Bd_1JmUc.js";
import "async-validator";
import "./index-C8Zv6czV.js";
import "./index-D3BlhKEk.js";
/* empty css                   */
/* empty css                     */
/* empty css                 */
/* empty css                      */
/* empty css                         */
import "./index-iMmQZoDW.js";
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
        const res = await adminApi.coupon.getCoupons({ type: "product" });
        if (res.success) {
          list.value = res.coupons.map((item) => ({ ...item, statusLoading: false }));
          total.value = res.total || list.value.length;
        }
      } catch (e) {
        ElMessage.error("加载异常");
      } finally {
        loading.value = false;
      }
    };
    const handleCreate = () => {
      router.push("/admin/coupons/product/post");
    };
    const handleEdit = (row) => {
      router.push(`/admin/coupons/product/post?id=${row.id}`);
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
      ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券吗？`, "批量删除", {
        type: "warning"
      }).then(async () => {
        let successCount = 0;
        for (const id of selectedIds.value) {
          const res = await adminApi.coupon.deleteCoupon(id);
          if (res.success) successCount++;
        }
        ElMessage.success(`成功删除 ${successCount} 个优惠券`);
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
      } finally {
        row.statusLoading = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-product-list" }, _attrs))} data-v-82f82944>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "指定商品券",
        description: "管理特定商品专用的优惠券，用户购买指定商品时可享受优惠。"
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
                  _push3(`新增指定商品券`);
                } else {
                  return [
                    createTextVNode("新增指定商品券")
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
                  createTextVNode("新增指定商品券")
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
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="code-info" data-v-82f82944${_scopeId2}><div class="code-name" data-v-82f82944${_scopeId2}>${ssrInterpolate(row.name)}</div></div>`);
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
              label: "关联商品",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.sku_ids && row.sku_ids.length) {
                    _push3(`<div class="product-tags" data-v-82f82944${_scopeId2}><!--[-->`);
                    ssrRenderList(row.sku_ids.slice(0, 3), (sid) => {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        key: sid,
                        size: "small",
                        effect: "plain",
                        class: "product-tag"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` SKU: ${ssrInterpolate(sid.slice(0, 6))}... `);
                          } else {
                            return [
                              createTextVNode(" SKU: " + toDisplayString(sid.slice(0, 6)) + "... ", 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (row.sku_ids.length > 3) {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`+${ssrInterpolate(row.sku_ids.length - 3)}`);
                          } else {
                            return [
                              createTextVNode("+" + toDisplayString(row.sku_ids.length - 3), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<span class="text-secondary" data-v-82f82944${_scopeId2}>无关联商品</span>`);
                  }
                } else {
                  return [
                    row.sku_ids && row.sku_ids.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "product-tags"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.sku_ids.slice(0, 3), (sid) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: sid,
                          size: "small",
                          effect: "plain",
                          class: "product-tag"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" SKU: " + toDisplayString(sid.slice(0, 6)) + "... ", 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      row.sku_ids.length > 3 ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("+" + toDisplayString(row.sku_ids.length - 3), 1)
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-secondary"
                    }, "无关联商品"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "立减金额",
              width: "120",
              align: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-82f82944${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.value))}</span>`);
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
              width: "200",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row.end_date) {
                    _push3(`<div class="validity-tag" data-v-82f82944${_scopeId2}>永久有效</div>`);
                  } else {
                    _push3(`<div class="validity-range" data-v-82f82944${_scopeId2}><div data-v-82f82944${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.end_date))} 到期</div></div>`);
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
                      createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)) + " 到期", 1)
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
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "code-info" }, [
                    createVNode("div", { class: "code-name" }, toDisplayString(row.name), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "关联商品",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  row.sku_ids && row.sku_ids.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "product-tags"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.sku_ids.slice(0, 3), (sid) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: sid,
                        size: "small",
                        effect: "plain",
                        class: "product-tag"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" SKU: " + toDisplayString(sid.slice(0, 6)) + "... ", 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    row.sku_ids.length > 3 ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("+" + toDisplayString(row.sku_ids.length - 3), 1)
                      ]),
                      _: 2
                    }, 1024)) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-secondary"
                  }, "无关联商品"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "立减金额",
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
                width: "200",
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
                    createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)) + " 到期", 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons/product/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-82f82944"]]);
export {
  index as default
};
//# sourceMappingURL=index-CKwAvp-O.js.map
