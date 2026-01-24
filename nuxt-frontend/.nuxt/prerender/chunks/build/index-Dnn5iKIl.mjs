import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElAvatar } from './index-C2DKVZ9g.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElDialog } from './index-CzosOSMt.mjs';
import { _ as _export_sfc, b9 as refresh_default, E as ElIcon, l as loading_default, ag as check_default, ah as ElMessage, by as getAdminSupabaseClient } from './server.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { E as ElDescriptions, a as ElDescriptionsItem } from './index-J8thQwNJ.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { A as AdminDataTable } from './AdminDataTable-BzMTthVf.mjs';
import { u as useAdminOrderList } from './useAdminOrderList-DviHj6Hn.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './index-D_b573Qt.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-Dxw_X3Hq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-BlpH41lu.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './vnode-D0IHQw_9.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
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
import './index-ClPmkyX9.mjs';
import './index-QnhSR2oe.mjs';
import './index-Da73tUO2.mjs';
import './index-pXKVpQSb.mjs';
import './strings-D1uxkXhq.mjs';
import './index-DCrMmn3b.mjs';
import './directive-tOiqatq5.mjs';
import './order-kd-ypcFy.mjs';
import './constants-Co_OOoHD.mjs';
import './useBizConfig-DtWyKy4G.mjs';
import './useBizFormat-CLwhy_Ih.mjs';

const adminFulfillmentApi = {
  /**
   * Get the latest fulfillment receipt for an order
   */
  async getOrderFulfillment(orderId) {
    try {
      const client = getAdminSupabaseClient();
      const { data, error } = await client.from("order_fulfillments").select("*").eq("order_id", orderId).order("submitted_at", { ascending: false }).limit(1).maybeSingle();
      if (error) {
        return { success: false, error: "\u83B7\u53D6\u56DE\u6267\u5931\u8D25: " + error.message };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message || "\u7CFB\u7EDF\u5F02\u5E38" };
    }
  },
  /**
   * Approve a fulfillment receipt and update order status to active
   */
  async approveFulfillment(fulfillmentId, orderId) {
    try {
      const client = getAdminSupabaseClient();
      const { error: fulfillmentError } = await client.from("order_fulfillments").update({
        status: "approved",
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", fulfillmentId);
      if (fulfillmentError) {
        return { success: false, error: "\u66F4\u65B0\u56DE\u6267\u5931\u8D25: " + fulfillmentError.message };
      }
      const { error: orderError } = await client.from("orders").update({ status: "active" }).eq("id", orderId);
      if (orderError) {
        return { success: false, error: "\u66F4\u65B0\u8BA2\u5355\u72B6\u6001\u5931\u8D25: " + orderError.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "\u7CFB\u7EDF\u5F02\u5E38" };
    }
  },
  /**
   * Reject a fulfillment receipt
   */
  async rejectFulfillment(fulfillmentId, reason) {
    try {
      const client = getAdminSupabaseClient();
      const { error } = await client.from("order_fulfillments").update({
        status: "rejected",
        reject_reason: reason,
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", fulfillmentId);
      if (error) {
        return { success: false, error: "\u9A73\u56DE\u5931\u8D25: " + error.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "\u7CFB\u7EDF\u5F02\u5E38" };
    }
  }
};
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
      DEFAULT_AVATAR,
      loadList,
      handleCopy,
      formatSpec,
      getStatusText,
      getStatusType,
      formatTime,
      formatPrice
    } = useAdminOrderList("virtual");
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
          ElMessage.error(result.error || "\u83B7\u53D6\u56DE\u6267\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u7CFB\u7EDF\u5F02\u5E38");
      } finally {
        receiptLoading.value = false;
      }
    };
    const getReceiptStatusName = (status) => {
      const map = {
        "submitted": "\u5F85\u5BA1\u6838",
        "approved": "\u5DF2\u901A\u8FC7",
        "rejected": "\u5DF2\u9A73\u56DE"
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
          ElMessage.success("\u5DF2\u901A\u8FC7\uFF0C\u8BA2\u5355\u5DF2\u6807\u8BB0\u4E3A\u53D1\u8D27\u5B8C\u6210\uFF0C\u72B6\u6001\u53D8\u66F4\u4E3A\u670D\u52A1\u4E2D");
          receiptDialogVisible.value = false;
          loadList();
        } else {
          ElMessage.error(result.error || "\u64CD\u4F5C\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u7CFB\u7EDF\u5F02\u5E38");
      } finally {
        receiptSubmitting.value = false;
      }
    };
    const handleRejectReceipt = async () => {
      if (!currentReceipt.value) return;
      if (!rejectReason.value) {
        ElMessage.warning("\u8BF7\u586B\u5199\u9A73\u56DE\u539F\u56E0");
        return;
      }
      receiptSubmitting.value = true;
      try {
        const result = await adminFulfillmentApi.rejectFulfillment(currentReceipt.value.id, rejectReason.value);
        if (result.success) {
          ElMessage.success("\u5DF2\u9A73\u56DE\uFF0C\u7528\u6237\u5C06\u6536\u5230\u901A\u77E5\u9700\u91CD\u65B0\u63D0\u4EA4");
          receiptDialogVisible.value = false;
          loadList();
        } else {
          ElMessage.error(result.error || "\u64CD\u4F5C\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u7CFB\u7EDF\u5F02\u5E38");
      } finally {
        receiptSubmitting.value = false;
      }
    };
    watch([page, pageSize], () => loadList(), { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_avatar = ElAvatar;
      const _component_el_tag = ElTag;
      const _component_el_dialog = ElDialog;
      const _component_el_icon = ElIcon;
      const _component_el_alert = ElAlert;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_input = ElInput;
      const _component_el_empty = ElEmpty;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-aaf0e5e0>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u865A\u62DF\u5145\u503C\u8BA2\u5355",
        description: "\u663E\u793A\u6240\u6709\u865A\u62DF\u5145\u503C\u7C7B\u578B\u7684\u8BA2\u5355\uFF0C\u53EF\u5BA1\u6838\u7528\u6237\u63D0\u4EA4\u7684\u56DE\u6267\u4FE1\u606F"
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
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
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
                  createTextVNode("\u5237\u65B0")
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
              label: "\u8BA2\u5355\u53F7",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-aaf0e5e0${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
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
              label: "\u7528\u6237",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="user-cell" data-v-aaf0e5e0${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 28,
                    src: ((_a = row._profile) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR)
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="uid-text" data-v-aaf0e5e0${_scopeId2}>${ssrInterpolate(((_b = row._profile) == null ? void 0 : _b.uid) || "\u65E0UID")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 28,
                        src: ((_c = row._profile) == null ? void 0 : _c.avatar) || unref(DEFAULT_AVATAR)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "uid-text" }, toDisplayString(((_d = row._profile) == null ? void 0 : _d.uid) || "\u65E0UID"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5546\u54C1",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="product-cell" data-v-aaf0e5e0${_scopeId2}>`);
                  if ((_a = row.product_snapshot) == null ? void 0 : _a.image) {
                    _push3(`<img${ssrRenderAttr("src", row.product_snapshot.image)} class="product-thumb" data-v-aaf0e5e0${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span data-v-aaf0e5e0${_scopeId2}>${ssrInterpolate(((_b = row.product_snapshot) == null ? void 0 : _b.product_name) || "\u672A\u77E5\u5546\u54C1")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      ((_c = row.product_snapshot) == null ? void 0 : _c.image) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.product_snapshot.image,
                        class: "product-thumb"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(((_d = row.product_snapshot) == null ? void 0 : _d.product_name) || "\u672A\u77E5\u5546\u54C1"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u89C4\u683C",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<span class="spec-text" data-v-aaf0e5e0${_scopeId2}>${ssrInterpolate(unref(formatSpec)((_a = row.sku_snapshot) == null ? void 0 : _a.spec_combination))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(unref(formatSpec)((_b = row.sku_snapshot) == null ? void 0 : _b.spec_combination)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6570\u91CF",
              width: "60",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-aaf0e5e0${_scopeId2}>${ssrInterpolate(row.quantity || 1)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u603B\u652F\u4ED8",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-aaf0e5e0${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.total_amount))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u4F18\u60E0\u5238",
              width: "80"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  if ((_a = row.coupon_snapshot) == null ? void 0 : _a.discount_amount) {
                    _push3(`<span class="discount" data-v-aaf0e5e0${_scopeId2}> -${ssrInterpolate(unref(formatPrice)(row.coupon_snapshot.discount_amount))}</span>`);
                  } else {
                    _push3(`<span class="no-discount" data-v-aaf0e5e0${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    ((_b = row.coupon_snapshot) == null ? void 0 : _b.discount_amount) ? (openBlock(), createBlock("span", {
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
              label: "\u72B6\u6001",
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
              label: "\u521B\u5EFA\u65F6\u95F4",
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
              label: "\u5230\u671F\u65F6\u95F4",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`${ssrInterpolate(row.status === "pending_delivery" ? "\u5BA1\u6838\u56DE\u6267" : "\u67E5\u770B\u56DE\u6267")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "pending_delivery" ? "\u5BA1\u6838\u56DE\u6267" : "\u67E5\u770B\u56DE\u6267"), 1)
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
                        createTextVNode(toDisplayString(row.status === "pending_delivery" ? "\u5BA1\u6838\u56DE\u6267" : "\u67E5\u770B\u56DE\u6267"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "\u8BA2\u5355\u53F7",
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
                label: "\u7528\u6237",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => {
                  var _a, _b;
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 28,
                        src: ((_a = row._profile) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "uid-text" }, toDisplayString(((_b = row._profile) == null ? void 0 : _b.uid) || "\u65E0UID"), 1)
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5546\u54C1",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => {
                  var _a, _b;
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      ((_a = row.product_snapshot) == null ? void 0 : _a.image) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.product_snapshot.image,
                        class: "product-thumb"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(((_b = row.product_snapshot) == null ? void 0 : _b.product_name) || "\u672A\u77E5\u5546\u54C1"), 1)
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u89C4\u683C",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => {
                  var _a;
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(unref(formatSpec)((_a = row.sku_snapshot) == null ? void 0 : _a.spec_combination)), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u6570\u91CF",
                width: "60",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u603B\u652F\u4ED8",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u4F18\u60E0\u5238",
                width: "80"
              }, {
                default: withCtx(({ row }) => {
                  var _a;
                  return [
                    ((_a = row.coupon_snapshot) == null ? void 0 : _a.discount_amount) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "discount"
                    }, " -" + toDisplayString(unref(formatPrice)(row.coupon_snapshot.discount_amount)), 1)) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "no-discount"
                    }, "-"))
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
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
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5230\u671F\u65F6\u95F4",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.end_time || row.expires_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
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
                      createTextVNode(toDisplayString(row.status === "pending_delivery" ? "\u5BA1\u6838\u56DE\u6267" : "\u67E5\u770B\u56DE\u6267"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: receiptDialogVisible.value,
        "onUpdate:modelValue": ($event) => receiptDialogVisible.value = $event,
        title: "\u865A\u62DF\u5145\u503C - \u56DE\u6267\u5BA1\u6838",
        width: "600px",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (((_a = currentReceipt.value) == null ? void 0 : _a.status) === "submitted") {
              _push2(`<div class="dialog-footer-actions" data-v-aaf0e5e0${_scopeId}>`);
              if (!rejectMode.value) {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_el_button, {
                  onClick: ($event) => rejectMode.value = true
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`\u9A73\u56DE\u8BA2\u5355`);
                    } else {
                      return [
                        createTextVNode("\u9A73\u56DE\u8BA2\u5355")
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
                      _push3(` \u786E\u8BA4\u53D1\u8D27 (\u901A\u8FC7) `);
                    } else {
                      return [
                        createTextVNode(" \u786E\u8BA4\u53D1\u8D27 (\u901A\u8FC7) ")
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
                  type: "danger",
                  onClick: handleRejectReceipt,
                  loading: receiptSubmitting.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u786E\u8BA4\u9A73\u56DE `);
                    } else {
                      return [
                        createTextVNode(" \u786E\u8BA4\u9A73\u56DE ")
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
                    _push3(`\u5173\u95ED`);
                  } else {
                    return [
                      createTextVNode("\u5173\u95ED")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              ((_b = currentReceipt.value) == null ? void 0 : _b.status) === "submitted" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "dialog-footer-actions"
              }, [
                !rejectMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode(_component_el_button, {
                    onClick: ($event) => rejectMode.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u9A73\u56DE\u8BA2\u5355")
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
                      createTextVNode(" \u786E\u8BA4\u53D1\u8D27 (\u901A\u8FC7) ")
                    ]),
                    _: 1
                  }, 8, ["loading", "icon"])
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(_component_el_button, {
                    onClick: ($event) => rejectMode.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D6\u6D88")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "danger",
                    onClick: handleRejectReceipt,
                    loading: receiptSubmitting.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u786E\u8BA4\u9A73\u56DE ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ], 64))
              ])) : (openBlock(), createBlock(_component_el_button, {
                key: 1,
                onClick: ($event) => receiptDialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5173\u95ED")
                ]),
                _: 1
              }, 8, ["onClick"]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (receiptLoading.value) {
              _push2(`<div class="loading-state" data-v-aaf0e5e0${_scopeId}>`);
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
              _push2(` \u6B63\u5728\u52A0\u8F7D\u56DE\u6267\u8BB0\u5F55... </div>`);
            } else if (currentReceipt.value) {
              _push2(`<!--[-->`);
              if (currentReceipt.value.status === "submitted") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u8BE5\u8BA2\u5355\u7B49\u5F85\u53D1\u8D27\u5BA1\u6838",
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
                  title: "\u8BE5\u8BA2\u5355\u5DF2\u53D1\u8D27\u5B8C\u6210",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "\u63D0\u4EA4\u4FE1\u606F",
                column: 1,
                border: "",
                class: "receipt-descriptions"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u63D0\u4EA4\u65F6\u95F4" }, {
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
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
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
                            _push4(`<span class="payload-value" data-v-aaf0e5e0${_scopeId3}>${ssrInterpolate(value)}</span>`);
                          } else {
                            return [
                              createVNode("span", { class: "payload-value" }, toDisplayString(value), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "\u63D0\u4EA4\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatTime)(currentReceipt.value.submitted_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
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
                            createVNode("span", { class: "payload-value" }, toDisplayString(value), 1)
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
                _push2(`<div class="reject-reason-box" data-v-aaf0e5e0${_scopeId}><p class="label" data-v-aaf0e5e0${_scopeId}>\u9A73\u56DE\u539F\u56E0\uFF1A</p><p class="content" data-v-aaf0e5e0${_scopeId}>${ssrInterpolate(currentReceipt.value.reject_reason)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (rejectMode.value) {
                _push2(`<div class="reject-input-area" data-v-aaf0e5e0${_scopeId}><p class="input-label" data-v-aaf0e5e0${_scopeId}>\u8BF7\u8F93\u5165\u9A73\u56DE\u539F\u56E0\u901A\u77E5\u7528\u6237\uFF1A</p>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: rejectReason.value,
                  "onUpdate:modelValue": ($event) => rejectReason.value = $event,
                  type: "textarea",
                  rows: 3,
                  placeholder: "\u4F8B\u5982\uFF1A\u8D26\u53F7\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4..."
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="empty-receipt" data-v-aaf0e5e0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "\u7528\u6237\u5C1A\u672A\u63D0\u4EA4\u5145\u503C\u56DE\u6267",
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
                createTextVNode(" \u6B63\u5728\u52A0\u8F7D\u56DE\u6267\u8BB0\u5F55... ")
              ])) : currentReceipt.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                currentReceipt.value.status === "submitted" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "\u8BE5\u8BA2\u5355\u7B49\u5F85\u53D1\u8D27\u5BA1\u6838",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentReceipt.value.status === "approved" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "\u8BE5\u8BA2\u5355\u5DF2\u53D1\u8D27\u5B8C\u6210",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                createVNode(_component_el_descriptions, {
                  title: "\u63D0\u4EA4\u4FE1\u606F",
                  column: 1,
                  border: "",
                  class: "receipt-descriptions"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "\u63D0\u4EA4\u65F6\u95F4" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formatTime)(currentReceipt.value.submitted_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "\u5F53\u524D\u72B6\u6001" }, {
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
                          createVNode("span", { class: "payload-value" }, toDisplayString(value), 1)
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
                  createVNode("p", { class: "label" }, "\u9A73\u56DE\u539F\u56E0\uFF1A"),
                  createVNode("p", { class: "content" }, toDisplayString(currentReceipt.value.reject_reason), 1)
                ])) : createCommentVNode("", true),
                rejectMode.value ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "reject-input-area"
                }, [
                  createVNode("p", { class: "input-label" }, "\u8BF7\u8F93\u5165\u9A73\u56DE\u539F\u56E0\u901A\u77E5\u7528\u6237\uFF1A"),
                  createVNode(_component_el_input, {
                    modelValue: rejectReason.value,
                    "onUpdate:modelValue": ($event) => rejectReason.value = $event,
                    type: "textarea",
                    rows: 3,
                    placeholder: "\u4F8B\u5982\uFF1A\u8D26\u53F7\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createBlock("div", {
                key: 2,
                class: "empty-receipt"
              }, [
                createVNode(_component_el_empty, {
                  description: "\u7528\u6237\u5C1A\u672A\u63D0\u4EA4\u5145\u503C\u56DE\u6267",
                  "image-size": 80
                })
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/orders/recharge/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aaf0e5e0"]]);

export { index as default };
//# sourceMappingURL=index-Dnn5iKIl.mjs.map
