import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-BB44-vTK.js";
import { E as ElAvatar } from "./index-C2DKVZ9g.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElDialog } from "./index-CzosOSMt.js";
import { b9 as refresh_default, E as ElIcon, l as loading_default, ag as check_default, by as getAdminSupabaseClient, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-J8thQwNJ.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElEmpty } from "./index-DKY_z0U1.js";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                   */
/* empty css                   */
/* empty css                    */
/* empty css                  */
/* empty css                              */
/* empty css                  */
/* empty css                         */
/* empty css                  */
/* empty css                        */
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-BzMTthVf.js";
import { D as DEFAULT_AVATAR } from "./constants-Co_OOoHD.js";
import { u as useBizConfig } from "./useBizConfig-DtWyKy4G.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./index-CIoWkt90.js";
import "@vueuse/core";
import "@popperjs/core";
import "./index-Dxw_X3Hq.js";
import "lodash-unified";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "@vue/shared";
import "./constants-hAKFmBbq.js";
import "./index-D_b573Qt.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./event-BZTOGHfp.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-BlpH41lu.js";
import "normalize-wheel-es";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
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
import "./index-ClPmkyX9.js";
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-Da73tUO2.js";
/* empty css                    */
/* empty css                       */
/* empty css                    */
import "./directive-tOiqatq5.js";
import "./validator-T0bsmJHo.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatPrice, formatDate } = useBizFormat();
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
    const getStatusText = (status) => getOrderStatusLabel(status);
    const getStatusType = (status) => getOrderStatusType(status);
    const formatTime = (time) => formatDate(time);
    function formatSpec(spec) {
      if (!spec) return "-";
      if (typeof spec === "string") return spec;
      if (typeof spec === "object") {
        return Object.entries(spec).map(([k, v]) => `${k}: ${v}`).join(" / ");
      }
      return "-";
    }
    const loading = ref(false);
    const list = ref([]);
    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(20);
    const statusFilter = ref("");
    const refundDialogVisible = ref(false);
    const refundLoading = ref(false);
    const refundSubmitting = ref(false);
    const currentOrder = ref(null);
    const currentRequest = ref(null);
    const refundAmount = ref(0);
    const adminNote = ref("");
    async function loadList() {
      loading.value = true;
      try {
        const client = getAdminSupabaseClient();
        let query = client.from("orders").select(`
        *,
        _profile:profiles!orders_user_id_fkey(id, uid, avatar)
      `, { count: "exact" });
        if (statusFilter.value) {
          query = query.eq("status", statusFilter.value);
        } else {
          query = query.in("status", ["refunding", "refunded"]);
        }
        const { data, error, count } = await query.order("created_at", { ascending: false }).range((page.value - 1) * pageSize.value, page.value * pageSize.value - 1);
        if (!error && data) {
          list.value = data;
          total.value = count || 0;
        }
      } catch (e) {
        console.error("加载订单失败:", e);
      }
      loading.value = false;
    }
    watch([page, pageSize, statusFilter], () => loadList());
    function handleCopy(text) {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("已复制");
    }
    async function handleViewRefund(order) {
      currentOrder.value = order;
      refundDialogVisible.value = true;
      currentRequest.value = null;
      refundAmount.value = parseFloat(order.total_amount || 0);
      adminNote.value = "";
      refundLoading.value = true;
      try {
        const client = getAdminSupabaseClient();
        const { data, error } = await client.from("refund_requests").select("*").eq("order_id", order.id).order("created_at", { ascending: false }).limit(1).single();
        if (!error && data) {
          currentRequest.value = data;
        }
      } catch (e) {
        console.error("获取退款申请失败:", e);
      } finally {
        refundLoading.value = false;
      }
    }
    const getRequestStatusName = (status) => {
      const map = {
        pending: "待审核",
        approved: "已通过",
        rejected: "已拒绝"
      };
      return map[status] || status;
    };
    const getRequestStatusType = (status) => {
      const map = {
        pending: "warning",
        approved: "success",
        rejected: "danger"
      };
      return map[status] || "info";
    };
    async function handleReview(approved) {
      if (!currentRequest.value) return;
      if (approved && refundAmount.value <= 0) {
        ElMessage.warning("请填写退款金额");
        return;
      }
      const action = approved ? "同意退款" : "拒绝退款";
      try {
        await ElMessageBox.confirm(
          approved ? `确定退款 ¥${refundAmount.value} 给用户？` : "确定拒绝此退款申请？订单将恢复原状态。",
          action,
          { confirmButtonText: "确定", cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      refundSubmitting.value = true;
      try {
        const client = getAdminSupabaseClient();
        const { data, error } = await client.rpc("admin_review_refund", {
          p_request_id: currentRequest.value.id,
          p_approved: approved,
          p_refund_amount: approved ? refundAmount.value : null,
          p_admin_note: adminNote.value || null
        });
        if (error) throw error;
        if (!data?.success) {
          ElMessage.error(data?.error || "操作失败");
          return;
        }
        ElMessage.success(data?.message || "操作成功");
        refundDialogVisible.value = false;
        loadList();
      } catch (e) {
        ElMessage.error(e.message || "操作失败");
      } finally {
        refundSubmitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_avatar = ElAvatar;
      const _component_el_tag = ElTag;
      const _component_el_dialog = ElDialog;
      const _component_el_icon = ElIcon;
      const _component_el_alert = ElAlert;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_input_number = ElInputNumber;
      const _component_el_input = ElInput;
      const _component_el_empty = ElEmpty;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-ba2e4f28>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "退款管理",
        description: "显示退款中和已退款的订单，审核用户的退款申请"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event,
              placeholder: "状态筛选",
              style: { "width": "120px", "margin-right": "12px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "全部",
                    value: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "退款中",
                    value: "refunding"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已退款",
                    value: "refunded"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: ""
                    }),
                    createVNode(_component_el_option, {
                      label: "退款中",
                      value: "refunding"
                    }),
                    createVNode(_component_el_option, {
                      label: "已退款",
                      value: "refunded"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadList,
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
              createVNode(_component_el_select, {
                modelValue: statusFilter.value,
                "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                placeholder: "状态筛选",
                style: { "width": "120px", "margin-right": "12px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_option, {
                    label: "全部",
                    value: ""
                  }),
                  createVNode(_component_el_option, {
                    label: "退款中",
                    value: "refunding"
                  }),
                  createVNode(_component_el_option, {
                    label: "已退款",
                    value: "refunded"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_el_button, {
                onClick: loadList,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: list.value,
        loading: loading.value,
        total: total.value,
        "current-page": page.value,
        "onUpdate:currentPage": ($event) => page.value = $event,
        "page-size": pageSize.value,
        "onUpdate:pageSize": ($event) => pageSize.value = $event,
        onPageChange: loadList
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "订单号",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "mono-text",
                      onClick: ($event) => handleCopy(row.order_no)
                    }, toDisplayString(row.order_no), 9, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "用户",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="user-cell" data-v-ba2e4f28${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 28,
                    src: row._profile?.avatar || unref(DEFAULT_AVATAR)
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="uid-text" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(row._profile?.uid || "无UID")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 28,
                        src: row._profile?.avatar || unref(DEFAULT_AVATAR)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "uid-text" }, toDisplayString(row._profile?.uid || "无UID"), 1)
                    ])
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
                  _push3(`<div class="product-cell" data-v-ba2e4f28${_scopeId2}>`);
                  if (row.product_snapshot?.image) {
                    _push3(`<img${ssrRenderAttr("src", row.product_snapshot.image)} class="product-thumb" data-v-ba2e4f28${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(row.product_snapshot?.product_name || "未知商品")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      row.product_snapshot?.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.product_snapshot.image,
                        class: "product-thumb"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                    ])
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
                  _push3(`<span class="spec-text" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(formatSpec(row.sku_snapshot?.spec_combination))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.sku_snapshot?.spec_combination)), 1)
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
                  _push3(`<span data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(row.quantity || 1)}</span>`);
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
                  _push3(`<span class="amount" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.total_amount))}</span>`);
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
                    _push3(`<span class="discount" data-v-ba2e4f28${_scopeId2}> -${ssrInterpolate(unref(formatPrice)(row.coupon_snapshot.discount_amount))}</span>`);
                  } else {
                    _push3(`<span class="no-discount" data-v-ba2e4f28${_scopeId2}>-</span>`);
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
                    type: getStatusType(row.status) || "info",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getStatusText(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getStatusType(row.status) || "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusText(row.status)), 1)
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
                  _push3(`${ssrInterpolate(formatTime(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatTime(row.created_at)), 1)
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
                  _push3(`${ssrInterpolate(formatTime(row.end_time || row.expires_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatTime(row.end_time || row.expires_at)), 1)
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
                    onClick: ($event) => handleViewRefund(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.status === "refunding" ? "审核" : "查看")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "refunding" ? "审核" : "查看"), 1)
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
                      onClick: ($event) => handleViewRefund(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.status === "refunding" ? "审核" : "查看"), 1)
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
                label: "订单号",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    class: "mono-text",
                    onClick: ($event) => handleCopy(row.order_no)
                  }, toDisplayString(row.order_no), 9, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "用户",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "user-cell" }, [
                    createVNode(_component_el_avatar, {
                      size: 28,
                      src: row._profile?.avatar || unref(DEFAULT_AVATAR)
                    }, null, 8, ["src"]),
                    createVNode("span", { class: "uid-text" }, toDisplayString(row._profile?.uid || "无UID"), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "商品",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "product-cell" }, [
                    row.product_snapshot?.image ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: row.product_snapshot.image,
                      class: "product-thumb"
                    }, null, 8, ["src"])) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "规格",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.sku_snapshot?.spec_combination)), 1)
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
                    type: getStatusType(row.status) || "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getStatusText(row.status)), 1)
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
                  createTextVNode(toDisplayString(formatTime(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "到期时间",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.end_time || row.expires_at)), 1)
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
                    onClick: ($event) => handleViewRefund(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.status === "refunding" ? "审核" : "查看"), 1)
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
        modelValue: refundDialogVisible.value,
        "onUpdate:modelValue": ($event) => refundDialogVisible.value = $event,
        title: "退款申请审核",
        width: "600px",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentRequest.value?.status === "pending") {
              _push2(`<div class="dialog-footer-actions" data-v-ba2e4f28${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                onClick: ($event) => handleReview(false),
                loading: refundSubmitting.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 拒绝退款 `);
                  } else {
                    return [
                      createTextVNode(" 拒绝退款 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: ($event) => handleReview(true),
                loading: refundSubmitting.value,
                icon: unref(check_default)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 同意退款 `);
                  } else {
                    return [
                      createTextVNode(" 同意退款 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(ssrRenderComponent(_component_el_button, {
                onClick: ($event) => refundDialogVisible.value = false
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
              currentRequest.value?.status === "pending" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "dialog-footer-actions"
              }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => handleReview(false),
                  loading: refundSubmitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 拒绝退款 ")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: ($event) => handleReview(true),
                  loading: refundSubmitting.value,
                  icon: unref(check_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 同意退款 ")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading", "icon"])
              ])) : (openBlock(), createBlock(_component_el_button, {
                key: 1,
                onClick: ($event) => refundDialogVisible.value = false
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
            if (refundLoading.value) {
              _push2(`<div class="loading-state" data-v-ba2e4f28${_scopeId}>`);
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
              _push2(` 正在加载退款申请... </div>`);
            } else if (currentRequest.value) {
              _push2(`<!--[-->`);
              if (currentRequest.value.status === "pending") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "该订单等待退款审核",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "approved") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "该订单已完成退款",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "rejected") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "该退款申请已被拒绝",
                  type: "danger",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "订单信息",
                column: 2,
                border: "",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "订单号" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentOrder.value?.order_no)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentOrder.value?.order_no), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "订单金额" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="amount" data-v-ba2e4f28${_scopeId3}>¥${ssrInterpolate(currentOrder.value?.total_amount)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "amount" }, "¥" + toDisplayString(currentOrder.value?.total_amount), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "商品" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentOrder.value?.product_snapshot?.product_name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentOrder.value?.product_snapshot?.product_name), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "原状态" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRequest.value?.original_status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRequest.value?.original_status), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "订单号" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentOrder.value?.order_no), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "订单金额" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "amount" }, "¥" + toDisplayString(currentOrder.value?.total_amount), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "商品" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentOrder.value?.product_snapshot?.product_name), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "原状态" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value?.original_status), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "退款申请",
                column: 1,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "退款原因" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRequest.value.reason)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRequest.value.reason), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (currentRequest.value.reason_detail) {
                      _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "补充说明" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(currentRequest.value.reason_detail)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(currentRequest.value.reason_detail), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "申请时间" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(formatTime(currentRequest.value.created_at))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(formatTime(currentRequest.value.created_at)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "申请状态" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: getRequestStatusType(currentRequest.value.status)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(getRequestStatusName(currentRequest.value.status))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_tag, {
                              type: getRequestStatusType(currentRequest.value.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "退款原因" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value.reason), 1)
                        ]),
                        _: 1
                      }),
                      currentRequest.value.reason_detail ? (openBlock(), createBlock(_component_el_descriptions_item, {
                        key: 0,
                        label: "补充说明"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value.reason_detail), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_el_descriptions_item, { label: "申请时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(formatTime(currentRequest.value.created_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "申请状态" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_tag, {
                            type: getRequestStatusType(currentRequest.value.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["type"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (currentRequest.value.status !== "pending") {
                _push2(ssrRenderComponent(_component_el_descriptions, {
                  title: "审核结果",
                  column: 1,
                  border: "",
                  class: "mt-4"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (currentRequest.value.refund_amount) {
                        _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "退款金额" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="amount" data-v-ba2e4f28${_scopeId3}>¥${ssrInterpolate(currentRequest.value.refund_amount)}</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "amount" }, "¥" + toDisplayString(currentRequest.value.refund_amount), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (currentRequest.value.admin_note) {
                        _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "管理员备注" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(currentRequest.value.admin_note)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(currentRequest.value.admin_note), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "审核时间" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(formatTime(currentRequest.value.reviewed_at))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(formatTime(currentRequest.value.reviewed_at)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        currentRequest.value.refund_amount ? (openBlock(), createBlock(_component_el_descriptions_item, {
                          key: 0,
                          label: "退款金额"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "amount" }, "¥" + toDisplayString(currentRequest.value.refund_amount), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        currentRequest.value.admin_note ? (openBlock(), createBlock(_component_el_descriptions_item, {
                          key: 1,
                          label: "管理员备注"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentRequest.value.admin_note), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_el_descriptions_item, { label: "审核时间" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(formatTime(currentRequest.value.reviewed_at)), 1)
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "pending") {
                _push2(`<div class="review-form mt-4" data-v-ba2e4f28${_scopeId}><div class="form-row" data-v-ba2e4f28${_scopeId}><label data-v-ba2e4f28${_scopeId}>退款金额：</label>`);
                _push2(ssrRenderComponent(_component_el_input_number, {
                  modelValue: refundAmount.value,
                  "onUpdate:modelValue": ($event) => refundAmount.value = $event,
                  min: 0,
                  max: parseFloat(currentOrder.value?.total_amount || 0),
                  precision: 2,
                  "controls-position": "right",
                  style: { "width": "150px" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="hint" data-v-ba2e4f28${_scopeId}>（订单金额: ¥${ssrInterpolate(currentOrder.value?.total_amount)}）</span></div><div class="form-row" data-v-ba2e4f28${_scopeId}><label data-v-ba2e4f28${_scopeId}>管理员备注：</label>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: adminNote.value,
                  "onUpdate:modelValue": ($event) => adminNote.value = $event,
                  type: "textarea",
                  rows: 2,
                  placeholder: "审核备注（选填）",
                  style: { "flex": "1" }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="empty-receipt" data-v-ba2e4f28${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "未找到退款申请记录",
                "image-size": 80
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              refundLoading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 正在加载退款申请... ")
              ])) : currentRequest.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                currentRequest.value.status === "pending" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "该订单等待退款审核",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "approved" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "该订单已完成退款",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "rejected" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 2,
                  title: "该退款申请已被拒绝",
                  type: "danger",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                createVNode(_component_el_descriptions, {
                  title: "订单信息",
                  column: 2,
                  border: "",
                  class: "mb-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "订单号" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentOrder.value?.order_no), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "订单金额" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "amount" }, "¥" + toDisplayString(currentOrder.value?.total_amount), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "商品" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentOrder.value?.product_snapshot?.product_name), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "原状态" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value?.original_status), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_descriptions, {
                  title: "退款申请",
                  column: 1,
                  border: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "退款原因" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.reason), 1)
                      ]),
                      _: 1
                    }),
                    currentRequest.value.reason_detail ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 0,
                      label: "补充说明"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.reason_detail), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_descriptions_item, { label: "申请时间" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(formatTime(currentRequest.value.created_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "申请状态" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, {
                          type: getRequestStatusType(currentRequest.value.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["type"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                currentRequest.value.status !== "pending" ? (openBlock(), createBlock(_component_el_descriptions, {
                  key: 3,
                  title: "审核结果",
                  column: 1,
                  border: "",
                  class: "mt-4"
                }, {
                  default: withCtx(() => [
                    currentRequest.value.refund_amount ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 0,
                      label: "退款金额"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "amount" }, "¥" + toDisplayString(currentRequest.value.refund_amount), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    currentRequest.value.admin_note ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 1,
                      label: "管理员备注"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.admin_note), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_descriptions_item, { label: "审核时间" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(formatTime(currentRequest.value.reviewed_at)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                currentRequest.value.status === "pending" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "review-form mt-4"
                }, [
                  createVNode("div", { class: "form-row" }, [
                    createVNode("label", null, "退款金额："),
                    createVNode(_component_el_input_number, {
                      modelValue: refundAmount.value,
                      "onUpdate:modelValue": ($event) => refundAmount.value = $event,
                      min: 0,
                      max: parseFloat(currentOrder.value?.total_amount || 0),
                      precision: 2,
                      "controls-position": "right",
                      style: { "width": "150px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                    createVNode("span", { class: "hint" }, "（订单金额: ¥" + toDisplayString(currentOrder.value?.total_amount) + "）", 1)
                  ]),
                  createVNode("div", { class: "form-row" }, [
                    createVNode("label", null, "管理员备注："),
                    createVNode(_component_el_input, {
                      modelValue: adminNote.value,
                      "onUpdate:modelValue": ($event) => adminNote.value = $event,
                      type: "textarea",
                      rows: 2,
                      placeholder: "审核备注（选填）",
                      style: { "flex": "1" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createBlock("div", {
                key: 2,
                class: "empty-receipt"
              }, [
                createVNode(_component_el_empty, {
                  description: "未找到退款申请记录",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/orders/refund/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba2e4f28"]]);
export {
  index as default
};
//# sourceMappingURL=index-BRVMzk_h.js.map
