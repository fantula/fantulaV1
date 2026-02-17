import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElAlert } from "./index-BC7fiCUI.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-BoB-s_a0.js";
import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElEmpty } from "./index-BRSsuUkY.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                  */
/* empty css                              */
/* empty css                  */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { M as refresh_default, l as loading_default, Q as copy_document_default, I as check_default } from "./index-DNnPa_Q9.js";
import { P as PageTipHeader } from "./PageTipHeader-DurXbUjx.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { A as AdminDataDialog } from "./AdminDataDialog-C7G4EUwl.js";
import { A as AdminUserCell } from "./AdminUserCell-C2sgweQM.js";
import { P as ProductThumbCell } from "./ProductThumbCell-DjG8-c-D.js";
import { u as useAdminOrderList, O as OrderDetailDialog } from "./useAdminOrderList-CUJTHnsB.js";
import { a as adminFulfillmentApi } from "./fulfillment-BkNi-rM7.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-C5kRDPtv.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-BAMVq552.js";
import "./index-Cxdfotkm.js";
import "@vueuse/core";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-NROOS5rD.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./vnode-uc6o_sOa.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-CD49T52w.js";
/* empty css                    */
import "./index-D9RjcsL2.js";
import "./index-B_mQW-wd.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./index-C8YaaWrc.js";
import "./directive-BHLqqXUb.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./index-BYF0U8gS.js";
import "./index-IoXmILvB.js";
import "./refs-CxYYXu5Q.js";
import "./index-BrJcxSwt.js";
/* empty css                   */
/* empty css                    */
import "./index-C3_NoBue.js";
/* empty css                   */
import "./index-BSYGfCfY.js";
/* empty css                         */
import "./order-Ic3SkFUp.js";
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
import "./useBizFormat-D_CzFEgD.js";
import "./useBizConfig-tsYRZrF8.js";
import "./TagInputGroup-B4JrW5qx.js";
import "./admin-routes-C0qcXhse.js";
import "./constants-BRAeDQ6J.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      list,
      total,
      page,
      pageSize,
      loadList,
      handleCopy,
      formatSpec,
      getStatusText,
      getStatusType,
      formatTime,
      formatPrice
    } = useAdminOrderList("virtual");
    const detailVisible = ref(false);
    const detailId = ref("");
    const openDetail = (row) => {
      detailId.value = row.id;
      detailVisible.value = true;
    };
    const receiptDialogVisible = ref(false);
    const receiptLoading = ref(false);
    const receiptSubmitting = ref(false);
    const currentReceipt = ref(null);
    const currentOrderId = ref("");
    const rejectMode = ref(false);
    const rejectReason = ref("");
    const handleViewReceipt = async (order) => {
      currentOrderId.value = order.id;
      receiptDialogVisible.value = true;
      rejectMode.value = false;
      rejectReason.value = "";
      currentReceipt.value = null;
      receiptLoading.value = true;
      try {
        const result = await adminFulfillmentApi.getOrderFulfillment(order.id);
        if (result.success) {
          currentReceipt.value = result.data || null;
        } else {
          ElMessage.error(result.error || "获取回执失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "系统异常");
      } finally {
        receiptLoading.value = false;
      }
    };
    const getReceiptStatusName = (status) => {
      const map = {
        "submitted": "待审核",
        "approved": "已通过",
        "rejected": "已驳回"
      };
      return map[status] || status;
    };
    const getReceiptStatusType = (status) => {
      const map = {
        "submitted": "warning",
        "approved": "success",
        "rejected": "danger"
      };
      return map[status] || "info";
    };
    const handleApproveReceipt = async () => {
      if (!currentReceipt.value) return;
      receiptSubmitting.value = true;
      try {
        const result = await adminFulfillmentApi.approveFulfillment(currentReceipt.value.id, currentOrderId.value);
        if (result.success) {
          ElMessage.success("已通过，订单已标记为发货完成，状态变更为服务中");
          receiptDialogVisible.value = false;
          loadList();
        } else {
          ElMessage.error(result.error || "操作失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "系统异常");
      } finally {
        receiptSubmitting.value = false;
      }
    };
    const handleRejectReceipt = async () => {
      if (!currentReceipt.value) return;
      if (!rejectReason.value) {
        ElMessage.warning("请填写驳回原因");
        return;
      }
      receiptSubmitting.value = true;
      try {
        const result = await adminFulfillmentApi.rejectFulfillment(currentReceipt.value.id, rejectReason.value);
        if (result.success) {
          ElMessage.success("已驳回，用户将收到通知需重新提交");
          receiptDialogVisible.value = false;
          loadList();
        } else {
          ElMessage.error(result.error || "操作失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "系统异常");
      } finally {
        receiptSubmitting.value = false;
      }
    };
    watch([page, pageSize], () => loadList(), { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_icon = ElIcon;
      const _component_el_alert = ElAlert;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_input = ElInput;
      const _component_el_empty = ElEmpty;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-6222dfed>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "虚拟充值订单",
        description: "显示所有虚拟充值类型的订单，可审核用户提交的回执信息"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: unref(loadList),
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
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: unref(loadList),
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["onClick", "icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: unref(list),
        loading: unref(loading),
        total: unref(total),
        "current-page": unref(page),
        "onUpdate:currentPage": ($event) => isRef(page) ? page.value = $event : null,
        "page-size": unref(pageSize),
        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
        onPageChange: unref(loadList)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "订单号",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-6222dfed${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "mono-text",
                      onClick: ($event) => unref(handleCopy)(row.order_no)
                    }, toDisplayString(row.order_no), 9, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "用户",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(AdminUserCell, {
                    user: row._profile,
                    uid: row._profile?.uid
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(AdminUserCell, {
                      user: row._profile,
                      uid: row._profile?.uid
                    }, null, 8, ["user", "uid"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ProductThumbCell, {
                    image: row.product_snapshot?.image,
                    name: row.product_snapshot?.product_name || "未知商品",
                    id: row.product_id,
                    "truncate-id": true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ProductThumbCell, {
                      image: row.product_snapshot?.image,
                      name: row.product_snapshot?.product_name || "未知商品",
                      id: row.product_id,
                      "truncate-id": true
                    }, null, 8, ["image", "name", "id"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "规格",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="spec-text" data-v-6222dfed${_scopeId2}>${ssrInterpolate(unref(formatSpec)(row.sku_snapshot?.spec_combination))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(unref(formatSpec)(row.sku_snapshot?.spec_combination)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "数量",
              width: "60",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-6222dfed${_scopeId2}>${ssrInterpolate(row.quantity || 1)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "总支付",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-6222dfed${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.total_amount))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "优惠券",
              width: "80"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.coupon_snapshot?.discount_amount) {
                    _push3(`<span class="discount" data-v-6222dfed${_scopeId2}> -${ssrInterpolate(unref(formatPrice)(row.coupon_snapshot.discount_amount))}</span>`);
                  } else {
                    _push3(`<span class="no-discount" data-v-6222dfed${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.coupon_snapshot?.discount_amount ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "discount"
                    }, " -" + toDisplayString(unref(formatPrice)(row.coupon_snapshot.discount_amount)), 1)) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "no-discount"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: unref(getStatusType)(row.status) || "info",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(getStatusText)(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(getStatusText)(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: unref(getStatusType)(row.status) || "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(getStatusText)(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatTime)(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "到期时间",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatTime)(row.end_time || row.expires_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatTime)(row.end_time || row.expires_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "120",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleViewReceipt(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.status === "pending_delivery" ? "审核回执" : "查看回执")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "pending_delivery" ? "审核回执" : "查看回执"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openDetail(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 详情 `);
                      } else {
                        return [
                          createTextVNode(" 详情 ")
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
                      onClick: ($event) => handleViewReceipt(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.status === "pending_delivery" ? "审核回执" : "查看回执"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => openDetail(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 详情 ")
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
                label: "订单号",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    class: "mono-text",
                    onClick: ($event) => unref(handleCopy)(row.order_no)
                  }, toDisplayString(row.order_no), 9, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "用户",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(AdminUserCell, {
                    user: row._profile,
                    uid: row._profile?.uid
                  }, null, 8, ["user", "uid"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "商品",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(ProductThumbCell, {
                    image: row.product_snapshot?.image,
                    name: row.product_snapshot?.product_name || "未知商品",
                    id: row.product_id,
                    "truncate-id": true
                  }, null, 8, ["image", "name", "id"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "规格",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "spec-text" }, toDisplayString(unref(formatSpec)(row.sku_snapshot?.spec_combination)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "数量",
                width: "60",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "总支付",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "优惠券",
                width: "80"
              }, {
                default: withCtx(({ row }) => [
                  row.coupon_snapshot?.discount_amount ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "discount"
                  }, " -" + toDisplayString(unref(formatPrice)(row.coupon_snapshot.discount_amount)), 1)) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "no-discount"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: unref(getStatusType)(row.status) || "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(getStatusText)(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "到期时间",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.end_time || row.expires_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "120",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleViewReceipt(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.status === "pending_delivery" ? "审核回执" : "查看回执"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openDetail(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 详情 ")
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
        modelValue: receiptDialogVisible.value,
        "onUpdate:modelValue": ($event) => receiptDialogVisible.value = $event,
        title: "虚拟充值 - 回执审核",
        width: "600px",
        "destroy-on-close": "",
        "show-footer": false
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentReceipt.value?.status === "submitted") {
              _push2(`<div class="dialog-footer-actions" data-v-6222dfed${_scopeId}>`);
              if (!rejectMode.value) {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_el_button, {
                  onClick: ($event) => rejectMode.value = true
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`驳回订单`);
                    } else {
                      return [
                        createTextVNode("驳回订单")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  onClick: handleApproveReceipt,
                  loading: receiptSubmitting.value,
                  icon: unref(check_default)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` 确认发货 (通过) `);
                    } else {
                      return [
                        createTextVNode(" 确认发货 (通过) ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              } else {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_el_button, {
                  onClick: ($event) => rejectMode.value = false
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
                  type: "danger",
                  onClick: handleRejectReceipt,
                  loading: receiptSubmitting.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` 确认驳回 `);
                    } else {
                      return [
                        createTextVNode(" 确认驳回 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
            } else {
              _push2(ssrRenderComponent(_component_el_button, {
                onClick: ($event) => receiptDialogVisible.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`关闭`);
                  } else {
                    return [
                      createTextVNode("关闭")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              currentReceipt.value?.status === "submitted" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "dialog-footer-actions"
              }, [
                !rejectMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode(_component_el_button, {
                    onClick: ($event) => rejectMode.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("驳回订单")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: handleApproveReceipt,
                    loading: receiptSubmitting.value,
                    icon: unref(check_default)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 确认发货 (通过) ")
                    ]),
                    _: 1
                  }, 8, ["loading", "icon"])
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(_component_el_button, {
                    onClick: ($event) => rejectMode.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "danger",
                    onClick: handleRejectReceipt,
                    loading: receiptSubmitting.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 确认驳回 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ], 64))
              ])) : (openBlock(), createBlock(_component_el_button, {
                key: 1,
                onClick: ($event) => receiptDialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("关闭")
                ]),
                _: 1
              }, 8, ["onClick"]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (receiptLoading.value) {
              _push2(`<div class="loading-state" data-v-6222dfed${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(loading_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(loading_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 正在加载回执记录... </div>`);
            } else if (currentReceipt.value) {
              _push2(`<!--[-->`);
              if (currentReceipt.value.status === "submitted") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "该订单等待发货审核",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentReceipt.value.status === "approved") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "该订单已发货完成",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "提交信息",
                column: 1,
                border: "",
                class: "receipt-descriptions"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "提交时间" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatTime)(currentReceipt.value.submitted_at))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatTime)(currentReceipt.value.submitted_at)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "当前状态" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: getReceiptStatusType(currentReceipt.value.status)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(getReceiptStatusName(currentReceipt.value.status))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(getReceiptStatusName(currentReceipt.value.status)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_tag, {
                              type: getReceiptStatusType(currentReceipt.value.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getReceiptStatusName(currentReceipt.value.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<!--[-->`);
                    ssrRenderList(currentReceipt.value.payload, (value, key) => {
                      _push3(ssrRenderComponent(_component_el_descriptions_item, {
                        label: key,
                        "label-class-name": "bold-label"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="payload-row" data-v-6222dfed${_scopeId3}><span class="payload-value" data-v-6222dfed${_scopeId3}>${ssrInterpolate(value)}</span>`);
                            if (value) {
                              _push4(ssrRenderComponent(_component_el_icon, {
                                class: "copy-icon",
                                onClick: ($event) => unref(handleCopy)(String(value))
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(copy_document_default), null, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(copy_document_default))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "payload-row" }, [
                                createVNode("span", { class: "payload-value" }, toDisplayString(value), 1),
                                value ? (openBlock(), createBlock(_component_el_icon, {
                                  key: 0,
                                  class: "copy-icon",
                                  onClick: ($event) => unref(handleCopy)(String(value))
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(copy_document_default))
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "提交时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatTime)(currentReceipt.value.submitted_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "当前状态" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_tag, {
                            type: getReceiptStatusType(currentReceipt.value.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getReceiptStatusName(currentReceipt.value.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["type"])
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(currentReceipt.value.payload, (value, key) => {
                        return openBlock(), createBlock(_component_el_descriptions_item, {
                          key,
                          label: key,
                          "label-class-name": "bold-label"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "payload-row" }, [
                              createVNode("span", { class: "payload-value" }, toDisplayString(value), 1),
                              value ? (openBlock(), createBlock(_component_el_icon, {
                                key: 0,
                                class: "copy-icon",
                                onClick: ($event) => unref(handleCopy)(String(value))
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(copy_document_default))
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["label"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (currentReceipt.value.status === "rejected") {
                _push2(`<div class="reject-reason-box" data-v-6222dfed${_scopeId}><p class="label" data-v-6222dfed${_scopeId}>驳回原因：</p><p class="content" data-v-6222dfed${_scopeId}>${ssrInterpolate(currentReceipt.value.reject_reason)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (rejectMode.value) {
                _push2(`<div class="reject-input-area" data-v-6222dfed${_scopeId}><p class="input-label" data-v-6222dfed${_scopeId}>请输入驳回原因通知用户：</p>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: rejectReason.value,
                  "onUpdate:modelValue": ($event) => rejectReason.value = $event,
                  type: "textarea",
                  rows: 3,
                  placeholder: "例如：账号密码错误，请重新提交..."
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="empty-receipt" data-v-6222dfed${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "用户尚未提交充值回执",
                "image-size": 80
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              receiptLoading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 正在加载回执记录... ")
              ])) : currentReceipt.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                currentReceipt.value.status === "submitted" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "该订单等待发货审核",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentReceipt.value.status === "approved" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "该订单已发货完成",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                createVNode(_component_el_descriptions, {
                  title: "提交信息",
                  column: 1,
                  border: "",
                  class: "receipt-descriptions"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "提交时间" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formatTime)(currentReceipt.value.submitted_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "当前状态" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, {
                          type: getReceiptStatusType(currentReceipt.value.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getReceiptStatusName(currentReceipt.value.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["type"])
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(currentReceipt.value.payload, (value, key) => {
                      return openBlock(), createBlock(_component_el_descriptions_item, {
                        key,
                        label: key,
                        "label-class-name": "bold-label"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "payload-row" }, [
                            createVNode("span", { class: "payload-value" }, toDisplayString(value), 1),
                            value ? (openBlock(), createBlock(_component_el_icon, {
                              key: 0,
                              class: "copy-icon",
                              onClick: ($event) => unref(handleCopy)(String(value))
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(copy_document_default))
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["label"]);
                    }), 128))
                  ]),
                  _: 1
                }),
                currentReceipt.value.status === "rejected" ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "reject-reason-box"
                }, [
                  createVNode("p", { class: "label" }, "驳回原因："),
                  createVNode("p", { class: "content" }, toDisplayString(currentReceipt.value.reject_reason), 1)
                ])) : createCommentVNode("", true),
                rejectMode.value ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "reject-input-area"
                }, [
                  createVNode("p", { class: "input-label" }, "请输入驳回原因通知用户："),
                  createVNode(_component_el_input, {
                    modelValue: rejectReason.value,
                    "onUpdate:modelValue": ($event) => rejectReason.value = $event,
                    type: "textarea",
                    rows: 3,
                    placeholder: "例如：账号密码错误，请重新提交..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createBlock("div", {
                key: 2,
                class: "empty-receipt"
              }, [
                createVNode(_component_el_empty, {
                  description: "用户尚未提交充值回执",
                  "image-size": 80
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(OrderDetailDialog, {
        modelValue: detailVisible.value,
        "onUpdate:modelValue": ($event) => detailVisible.value = $event,
        "order-id": detailId.value,
        type: "virtual"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/orders/recharge/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6222dfed"]]);
export {
  index as default
};
//# sourceMappingURL=index-CTia1DIP.js.map
