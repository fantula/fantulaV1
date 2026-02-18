import { E as ElSelect, a as ElOption } from "./index-B_mQW-wd.js";
import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElDialog } from "./index-BYF0U8gS.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElAlert } from "./index-BC7fiCUI.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-BoB-s_a0.js";
import { E as ElInputNumber } from "./index-BN7OybSS.js";
import "./base-CEWXqFm3.js";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                   */
/* empty css                    */
/* empty css                  */
/* empty css                              */
/* empty css                         */
/* empty css                    */
/* empty css                        */
import { defineComponent, ref, mergeProps, withCtx, createVNode, unref, createTextVNode, withKeys, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { af as search_default, M as refresh_default, l as loading_default, I as check_default } from "./index-DNnPa_Q9.js";
import { P as PageTipHeader } from "./PageTipHeader-DurXbUjx.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { A as AdminUserCell } from "./AdminUserCell-C2sgweQM.js";
import { u as useAdminList } from "./useAdminList-DUYkwmjS.js";
import getSupabaseClient from "./supabase-F2pQZHm6.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { E as ElMessageBox } from "./index-VfPbkY7T.js";
import { _ as _export_sfc } from "../server.mjs";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-Cxdfotkm.js";
import "lodash-unified";
import "@vueuse/core";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "@vue/shared";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./constants-hAKFmBbq.js";
import "./index-BAMVq552.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./index-DbvZsXcZ.js";
import "./use-form-item-D2hCqQW8.js";
import "./icon-Ck0_dGQP.js";
import "./event-BZTOGHfp.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./use-global-config-C5kRDPtv.js";
import "./objects-Bz74KHmq.js";
import "@ctrl/tinycolor";
import "./index-NROOS5rD.js";
import "normalize-wheel-es";
import "./index-IoXmILvB.js";
import "./refs-CxYYXu5Q.js";
import "./index-BrJcxSwt.js";
import "./index-D3BlhKEk.js";
import "./index-CD49T52w.js";
/* empty css                    */
import "./index-BRSsuUkY.js";
import "./index-D9RjcsL2.js";
import "./directive-BHLqqXUb.js";
/* empty css                    */
/* empty css                  */
/* empty css                       */
/* empty css                    */
import "./index-C3_NoBue.js";
/* empty css                   */
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
import "./validator-BZYOvvAA.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatPrice, formatDate } = useBizFormat();
    const formatTime = formatDate;
    const client = getSupabaseClient();
    const getRequestStatusName = (status) => {
      const map = {
        pending: "待审核",
        approved: "已批准",
        rejected: "已拒绝",
        cancelled: "用户取消"
      };
      return map[status] || status;
    };
    const getRequestStatusType = (status) => {
      const map = {
        pending: "warning",
        approved: "success",
        rejected: "danger",
        cancelled: "info"
      };
      return map[status] || "info";
    };
    const statusFilter = ref("");
    const searchOrderNo = ref("");
    const searchUid = ref("");
    const {
      loading,
      list,
      total,
      page,
      pageSize,
      loadList,
      handleCopy
    } = useAdminList({
      fetchFn: async ({ page: page2, pageSize: pageSize2 }) => {
        let query = client.from("refund_requests").select(`
        *,
        orders!inner(*),
        profiles!refund_requests_user_id_fkey(*)
      `, { count: "exact" });
        if (statusFilter.value) {
          query = query.eq("status", statusFilter.value);
        }
        if (searchOrderNo.value) {
          query = query.eq("orders.order_no", searchOrderNo.value);
        }
        if (searchUid.value) {
          query = query.eq("profiles.uid", searchUid.value);
        }
        const { data, error, count } = await query.order("created_at", { ascending: false }).range((page2 - 1) * pageSize2, page2 * pageSize2 - 1);
        return { success: !error, data, total: count, error: error?.message };
      },
      defaultFilters: {},
      defaultPageSize: 20
    });
    const handleSearch = () => {
      page.value = 1;
      loadList();
    };
    const handleReset = () => {
      statusFilter.value = "";
      searchOrderNo.value = "";
      searchUid.value = "";
      page.value = 1;
      loadList();
    };
    const refundDialogVisible = ref(false);
    const currentRequest = ref(null);
    const refundAmount = ref(0);
    const adminNote = ref("");
    const submitting = ref(false);
    function handleViewRefund(row) {
      currentRequest.value = row;
      refundDialogVisible.value = true;
      refundAmount.value = parseFloat(row.orders?.total_amount || 0);
      adminNote.value = "";
    }
    async function handleReview(approved) {
      if (!currentRequest.value) return;
      if (approved && refundAmount.value <= 0) {
        ElMessage.warning("请填写退款金额");
        return;
      }
      const action = approved ? "同意退款" : "拒绝退款";
      try {
        await ElMessageBox.confirm(
          approved ? `确定退款 ${formatPrice(refundAmount.value)} 给用户？` : "确定拒绝此退款申请？订单将恢复原状态。",
          action,
          { confirmButtonText: "确定", cancelButtonText: "取消", type: approved ? "warning" : "info" }
        );
      } catch {
        return;
      }
      submitting.value = true;
      try {
        const { data, error } = await client.rpc("admin_review_refund", {
          p_request_id: currentRequest.value.id,
          p_approved: approved,
          p_refund_amount: approved ? refundAmount.value : null,
          p_admin_note: adminNote.value || null
        });
        if (error) throw error;
        if (data && !data.success) throw new Error(data.error);
        ElMessage.success("操作成功");
        refundDialogVisible.value = false;
        loadList();
      } catch (e) {
        ElMessage.error(e.message || "操作失败");
      } finally {
        submitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_dialog = ElDialog;
      const _component_el_icon = ElIcon;
      const _component_el_alert = ElAlert;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_input_number = ElInputNumber;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-831b3428>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "退款管理",
        description: "统一管理所有退款申请，包括待审核、已批准、已拒绝和用户取消的记录"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-831b3428${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event,
              placeholder: "状态筛选",
              style: { "width": "120px" },
              clearable: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "全部",
                    value: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "待审核",
                    value: "pending"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已退款",
                    value: "approved"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已拒绝",
                    value: "rejected"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已取消",
                    value: "cancelled"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: ""
                    }),
                    createVNode(_component_el_option, {
                      label: "待审核",
                      value: "pending"
                    }),
                    createVNode(_component_el_option, {
                      label: "已退款",
                      value: "approved"
                    }),
                    createVNode(_component_el_option, {
                      label: "已拒绝",
                      value: "rejected"
                    }),
                    createVNode(_component_el_option, {
                      label: "已取消",
                      value: "cancelled"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: searchOrderNo.value,
              "onUpdate:modelValue": ($event) => searchOrderNo.value = $event,
              placeholder: "订单号",
              style: { "width": "180px" },
              clearable: "",
              onKeyup: handleSearch
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: searchUid.value,
              "onUpdate:modelValue": ($event) => searchUid.value = $event,
              placeholder: "用户UID",
              style: { "width": "150px" },
              clearable: "",
              onKeyup: handleSearch
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleSearch,
              icon: unref(search_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`查询`);
                } else {
                  return [
                    createTextVNode("查询")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: handleReset,
              icon: unref(refresh_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`重置`);
                } else {
                  return [
                    createTextVNode("重置")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-group" }, [
                createVNode(_component_el_select, {
                  modelValue: statusFilter.value,
                  "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                  placeholder: "状态筛选",
                  style: { "width": "120px" },
                  clearable: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: ""
                    }),
                    createVNode(_component_el_option, {
                      label: "待审核",
                      value: "pending"
                    }),
                    createVNode(_component_el_option, {
                      label: "已退款",
                      value: "approved"
                    }),
                    createVNode(_component_el_option, {
                      label: "已拒绝",
                      value: "rejected"
                    }),
                    createVNode(_component_el_option, {
                      label: "已取消",
                      value: "cancelled"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_input, {
                  modelValue: searchOrderNo.value,
                  "onUpdate:modelValue": ($event) => searchOrderNo.value = $event,
                  placeholder: "订单号",
                  style: { "width": "180px" },
                  clearable: "",
                  onKeyup: withKeys(handleSearch, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_input, {
                  modelValue: searchUid.value,
                  "onUpdate:modelValue": ($event) => searchUid.value = $event,
                  placeholder: "用户UID",
                  style: { "width": "150px" },
                  clearable: "",
                  onKeyup: withKeys(handleSearch, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleSearch,
                  icon: unref(search_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("查询")
                  ]),
                  _: 1
                }, 8, ["icon"]),
                createVNode(_component_el_button, {
                  onClick: handleReset,
                  icon: unref(refresh_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("重置")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ])
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
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-831b3428${_scopeId2}>${ssrInterpolate(row.orders?.order_no || "-")}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "mono-text",
                      onClick: ($event) => unref(handleCopy)(row.orders?.order_no)
                    }, toDisplayString(row.orders?.order_no || "-"), 9, ["onClick"])
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
                  _push3(ssrRenderComponent(AdminUserCell, {
                    user: row.profiles,
                    uid: row.user_id
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(AdminUserCell, {
                      user: row.profiles,
                      uid: row.user_id
                    }, null, 8, ["user", "uid"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品",
              "min-width": "200",
              "show-overflow-tooltip": ""
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-831b3428${_scopeId2}>${ssrInterpolate(row.orders?.product_snapshot?.product_name || "未知商品")}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.orders?.product_snapshot?.product_name || "未知商品"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "reason",
              label: "退款原因",
              "min-width": "150",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "订单金额",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-831b3428${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.orders?.total_amount))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.orders?.total_amount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "申请时间",
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
              label: "状态",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: getRequestStatusType(row.status)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getRequestStatusName(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getRequestStatusName(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getRequestStatusType(row.status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getRequestStatusName(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
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
                        _push4(`${ssrInterpolate(row.status === "pending" ? "审核" : "查看")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "pending" ? "审核" : "查看"), 1)
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
                        createTextVNode(toDisplayString(row.status === "pending" ? "审核" : "查看"), 1)
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
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    class: "mono-text",
                    onClick: ($event) => unref(handleCopy)(row.orders?.order_no)
                  }, toDisplayString(row.orders?.order_no || "-"), 9, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "用户",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(AdminUserCell, {
                    user: row.profiles,
                    uid: row.user_id
                  }, null, 8, ["user", "uid"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "商品",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.orders?.product_snapshot?.product_name || "未知商品"), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "reason",
                label: "退款原因",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                label: "订单金额",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.orders?.total_amount)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "申请时间",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: getRequestStatusType(row.status)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getRequestStatusName(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
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
                      createTextVNode(toDisplayString(row.status === "pending" ? "审核" : "查看"), 1)
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
        title: "退款申请详情",
        width: "600px",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentRequest.value?.status === "pending") {
              _push2(`<div class="dialog-footer-actions" data-v-831b3428${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                onClick: ($event) => handleReview(false),
                loading: submitting.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`拒绝退款`);
                  } else {
                    return [
                      createTextVNode("拒绝退款")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: ($event) => handleReview(true),
                loading: submitting.value,
                icon: unref(check_default)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`同意退款`);
                  } else {
                    return [
                      createTextVNode("同意退款")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div data-v-831b3428${_scopeId}>`);
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
              _push2(`</div>`);
            }
          } else {
            return [
              currentRequest.value?.status === "pending" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "dialog-footer-actions"
              }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => handleReview(false),
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("拒绝退款")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: ($event) => handleReview(true),
                  loading: submitting.value,
                  icon: unref(check_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("同意退款")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading", "icon"])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => refundDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("关闭")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!currentRequest.value) {
              _push2(`<div class="loading-state" data-v-831b3428${_scopeId}>`);
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
              _push2(` 正在加载... </div>`);
            } else {
              _push2(`<div data-v-831b3428${_scopeId}>`);
              if (currentRequest.value.status === "pending") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "该申请等待审核",
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
                  title: "已完成退款",
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
                  title: "已拒绝退款",
                  type: "danger",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "cancelled") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "用户已取消申请",
                  type: "info",
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
                          _push4(`${ssrInterpolate(currentRequest.value.orders?.order_no)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRequest.value.orders?.order_no), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "订单金额" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="amount" data-v-831b3428${_scopeId3}>${ssrInterpolate(unref(formatPrice)(currentRequest.value.orders?.total_amount))}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(currentRequest.value.orders?.total_amount)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "商品" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRequest.value.orders?.product_snapshot?.product_name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRequest.value.orders?.product_snapshot?.product_name), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "订单号" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value.orders?.order_no), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "订单金额" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(currentRequest.value.orders?.total_amount)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "商品" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value.orders?.product_snapshot?.product_name), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "申请内容",
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
                          _push4(`${ssrInterpolate(unref(formatTime)(currentRequest.value.created_at))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatTime)(currentRequest.value.created_at)), 1)
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
                          createTextVNode(toDisplayString(unref(formatTime)(currentRequest.value.created_at)), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (currentRequest.value.status !== "pending" && currentRequest.value.status !== "cancelled") {
                _push2(ssrRenderComponent(_component_el_descriptions, {
                  title: "审核记录",
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
                              _push4(`<span class="amount" data-v-831b3428${_scopeId3}>${ssrInterpolate(unref(formatPrice)(currentRequest.value.refund_amount))}</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(currentRequest.value.refund_amount)), 1)
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
                      _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "处理时间" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(formatTime)(currentRequest.value.reviewed_at))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(formatTime)(currentRequest.value.reviewed_at)), 1)
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
                            createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(currentRequest.value.refund_amount)), 1)
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
                        createVNode(_component_el_descriptions_item, { label: "处理时间" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formatTime)(currentRequest.value.reviewed_at)), 1)
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
                _push2(`<div class="review-form mt-4" data-v-831b3428${_scopeId}><div class="form-row" data-v-831b3428${_scopeId}><label data-v-831b3428${_scopeId}>退款金额：</label>`);
                _push2(ssrRenderComponent(_component_el_input_number, {
                  modelValue: refundAmount.value,
                  "onUpdate:modelValue": ($event) => refundAmount.value = $event,
                  min: 0,
                  max: parseFloat(currentRequest.value.orders?.total_amount || 0),
                  precision: 2,
                  "controls-position": "right",
                  style: { "width": "150px" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="hint" data-v-831b3428${_scopeId}>（订单金额: ${ssrInterpolate(unref(formatPrice)(currentRequest.value.orders?.total_amount))}）</span></div><div class="form-row" data-v-831b3428${_scopeId}><label data-v-831b3428${_scopeId}>管理员备注：</label>`);
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
              _push2(`</div>`);
            }
          } else {
            return [
              !currentRequest.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 正在加载... ")
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                currentRequest.value.status === "pending" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "该申请等待审核",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "approved" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "已完成退款",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "rejected" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 2,
                  title: "已拒绝退款",
                  type: "danger",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "cancelled" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 3,
                  title: "用户已取消申请",
                  type: "info",
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
                        createTextVNode(toDisplayString(currentRequest.value.orders?.order_no), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "订单金额" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(currentRequest.value.orders?.total_amount)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "商品" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.orders?.product_snapshot?.product_name), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_descriptions, {
                  title: "申请内容",
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
                        createTextVNode(toDisplayString(unref(formatTime)(currentRequest.value.created_at)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                currentRequest.value.status !== "pending" && currentRequest.value.status !== "cancelled" ? (openBlock(), createBlock(_component_el_descriptions, {
                  key: 4,
                  title: "审核记录",
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
                        createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(currentRequest.value.refund_amount)), 1)
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
                    createVNode(_component_el_descriptions_item, { label: "处理时间" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formatTime)(currentRequest.value.reviewed_at)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                currentRequest.value.status === "pending" ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: "review-form mt-4"
                }, [
                  createVNode("div", { class: "form-row" }, [
                    createVNode("label", null, "退款金额："),
                    createVNode(_component_el_input_number, {
                      modelValue: refundAmount.value,
                      "onUpdate:modelValue": ($event) => refundAmount.value = $event,
                      min: 0,
                      max: parseFloat(currentRequest.value.orders?.total_amount || 0),
                      precision: 2,
                      "controls-position": "right",
                      style: { "width": "150px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                    createVNode("span", { class: "hint" }, "（订单金额: " + toDisplayString(unref(formatPrice)(currentRequest.value.orders?.total_amount)) + "）", 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/orders/refund/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-831b3428"]]);
export {
  index as default
};
//# sourceMappingURL=index-DgKwpim9.js.map
