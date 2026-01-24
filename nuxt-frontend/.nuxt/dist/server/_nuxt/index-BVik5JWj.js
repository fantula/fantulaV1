import { E as ElCard } from "./index-9Hs_9io2.js";
import { E as ElSelect, a as ElOption } from "./index-Cf_t59lc.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElIcon, bJ as search_default, b9 as refresh_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElPagination } from "./index-cR1ntQxK.js";
import { E as ElDialog } from "./index-I18rzBgu.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-J8thQwNJ.js";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
/* empty css                 */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                       */
/* empty css                   */
/* empty css                    */
/* empty css                              */
/* empty css                      */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, unref, createTextVNode, withKeys, toDisplayString, withDirectives, createBlock, openBlock, createCommentVNode, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { v as vLoading } from "./directive-tOiqatq5.js";
import "./index-B9I5bL_Z.js";
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
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-DrPRyc7n.js";
import "normalize-wheel-es";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "async-validator";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const filterParams = reactive({
      status: "",
      uid: ""
    });
    const dialogVisible = ref(false);
    const rejectDialogVisible = ref(false);
    const agreeDialogVisible = ref(false);
    const rejectForm = reactive({
      reason: ""
    });
    const currentRow = ref(null);
    const refundList = ref([
      {
        id: "1",
        refundNo: "REF202505200001",
        orderNo: "ORD202505201001",
        uid: "10086",
        amount: 99,
        applyTime: "2025-05-20 14:30:00",
        status: "pending",
        reason: "买错了，不需要了",
        orderInfo: {
          orderNo: "ORD202505201001",
          productName: "高级会员年卡",
          productSpec: "12个月",
          paidAmount: 99,
          payTime: "2025-05-20 10:00:00",
          expiryTime: "2026-05-20 10:00:00",
          paymentMethod: "微信支付"
        }
      },
      {
        id: "2",
        refundNo: "REF202505190005",
        orderNo: "ORD202505190888",
        uid: "10010",
        amount: 299,
        applyTime: "2025-05-19 16:00:00",
        status: "refunded",
        reason: "商品描述不符",
        orderInfo: {
          orderNo: "ORD202505190888",
          productName: "限量版皮肤礼包",
          productSpec: "全套",
          paidAmount: 299,
          payTime: "2025-05-19 12:00:00",
          expiryTime: "永久",
          paymentMethod: "支付宝"
        }
      },
      {
        id: "3",
        refundNo: "REF202505180022",
        orderNo: "ORD202505180666",
        uid: "9527",
        amount: 50,
        applyTime: "2025-05-18 09:30:00",
        status: "rejected",
        reason: "不想玩了",
        rejectReason: "虚拟商品一经发出概不退换",
        orderInfo: {
          orderNo: "ORD202505180666",
          productName: "游戏点券",
          productSpec: "500点",
          paidAmount: 50,
          payTime: "2025-05-18 09:00:00",
          expiryTime: "永久",
          paymentMethod: "余额支付"
        }
      }
    ]);
    const getStatusTag = (status) => {
      const map = {
        pending: "warning",
        refunded: "success",
        rejected: "danger"
      };
      return map[status] || "info";
    };
    const getStatusName = (status) => {
      const map = {
        pending: "待处理",
        refunded: "已退款",
        rejected: "已驳回"
      };
      return map[status] || status;
    };
    const handleSearch = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        ElMessage.success("查询成功 (Mock)");
      }, 500);
    };
    const handleRefresh = () => {
      loading.value = true;
      filterParams.status = "";
      filterParams.uid = "";
      setTimeout(() => {
        loading.value = false;
        ElMessage.success("已刷新");
      }, 500);
    };
    const handleDetail = (row) => {
      currentRow.value = row;
      dialogVisible.value = true;
    };
    const resetDialog = () => {
    };
    const handleAgree = () => {
      if (!currentRow.value) return;
      agreeDialogVisible.value = true;
    };
    const confirmAgree = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        if (currentRow.value) {
          currentRow.value.status = "refunded";
        }
        agreeDialogVisible.value = false;
        dialogVisible.value = false;
        ElMessage.success("操作成功，已同意退款");
      }, 800);
    };
    const handleReject = () => {
      rejectForm.reason = "";
      rejectDialogVisible.value = true;
    };
    const confirmReject = () => {
      if (!rejectForm.reason) {
        ElMessage.warning("驳回原因不能为空");
        return;
      }
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        if (currentRow.value) {
          currentRow.value.status = "rejected";
          currentRow.value.rejectReason = rejectForm.reason;
        }
        rejectDialogVisible.value = false;
        dialogVisible.value = false;
        ElMessage.warning("已驳回该退款申请");
      }, 800);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-page" }, _attrs))} data-v-27f3e0b9><div class="page-header" data-v-27f3e0b9><h2 data-v-27f3e0b9>退款管理</h2></div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "filter-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-container" data-v-27f3e0b9${_scopeId}><div class="filter-left" data-v-27f3e0b9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filterParams.status,
              "onUpdate:modelValue": ($event) => filterParams.status = $event,
              placeholder: "退款状态",
              clearable: "",
              style: { "width": "150px", "margin-right": "15px" },
              onChange: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "待处理",
                    value: "pending"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已驳回",
                    value: "rejected"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已退款",
                    value: "refunded"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "待处理",
                      value: "pending"
                    }),
                    createVNode(_component_el_option, {
                      label: "已驳回",
                      value: "rejected"
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
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: filterParams.uid,
              "onUpdate:modelValue": ($event) => filterParams.uid = $event,
              placeholder: "用户UID",
              clearable: "",
              style: { "width": "200px", "margin-right": "15px" },
              onKeyup: handleSearch
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(search_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(search_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(search_default),
              onClick: handleSearch
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
              icon: unref(refresh_default),
              onClick: handleRefresh
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
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "filter-container" }, [
                createVNode("div", { class: "filter-left" }, [
                  createVNode(_component_el_select, {
                    modelValue: filterParams.status,
                    "onUpdate:modelValue": ($event) => filterParams.status = $event,
                    placeholder: "退款状态",
                    clearable: "",
                    style: { "width": "150px", "margin-right": "15px" },
                    onChange: handleSearch
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "待处理",
                        value: "pending"
                      }),
                      createVNode(_component_el_option, {
                        label: "已驳回",
                        value: "rejected"
                      }),
                      createVNode(_component_el_option, {
                        label: "已退款",
                        value: "refunded"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_input, {
                    modelValue: filterParams.uid,
                    "onUpdate:modelValue": ($event) => filterParams.uid = $event,
                    placeholder: "用户UID",
                    clearable: "",
                    style: { "width": "200px", "margin-right": "15px" },
                    onKeyup: withKeys(handleSearch, ["enter"])
                  }, {
                    prefix: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(search_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    icon: unref(search_default),
                    onClick: handleSearch
                  }, {
                    default: withCtx(() => [
                      createTextVNode("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(_component_el_button, {
                    icon: unref(refresh_default),
                    onClick: handleRefresh
                  }, {
                    default: withCtx(() => [
                      createTextVNode("刷新")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "list-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: refundList.value,
              style: { "width": "100%" },
              border: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "refundNo",
                    label: "退款编号",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "orderNo",
                    label: "关联订单号",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "uid",
                    label: "用户UID",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "退款金额",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` ¥${ssrInterpolate(row.amount)}`);
                      } else {
                        return [
                          createTextVNode(" ¥" + toDisplayString(row.amount), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "applyTime",
                    label: "申请时间",
                    width: "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "120",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: getStatusTag(row.status)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(getStatusName(row.status))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(getStatusName(row.status)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: getStatusTag(row.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStatusName(row.status)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "120",
                    fixed: "right",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "primary",
                          onClick: ($event) => handleDetail(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.status === "pending" ? "处理" : "查看")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status === "pending" ? "处理" : "查看"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            onClick: ($event) => handleDetail(row)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.status === "pending" ? "处理" : "查看"), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "refundNo",
                      label: "退款编号",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "orderNo",
                      label: "关联订单号",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "uid",
                      label: "用户UID",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "退款金额",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(" ¥" + toDisplayString(row.amount), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "applyTime",
                      label: "申请时间",
                      width: "180"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: getStatusTag(row.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getStatusName(row.status)), 1)
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
                          onClick: ($event) => handleDetail(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status === "pending" ? "处理" : "查看"), 1)
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
            }, _parent2, _scopeId));
            _push2(`<div class="pagination-wrapper" style="${ssrRenderStyle({ "margin-top": "20px", "display": "flex", "justify-content": "flex-end" })}" data-v-27f3e0b9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              background: "",
              layout: "prev, pager, next",
              total: 100
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: refundList.value,
                style: { "width": "100%" },
                border: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "refundNo",
                    label: "退款编号",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "orderNo",
                    label: "关联订单号",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "uid",
                    label: "用户UID",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "退款金额",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(" ¥" + toDisplayString(row.amount), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "applyTime",
                    label: "申请时间",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "120",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: getStatusTag(row.status)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getStatusName(row.status)), 1)
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
                        onClick: ($event) => handleDetail(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.status === "pending" ? "处理" : "查看"), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, loading.value]
              ]),
              createVNode("div", {
                class: "pagination-wrapper",
                style: { "margin-top": "20px", "display": "flex", "justify-content": "flex-end" }
              }, [
                createVNode(_component_el_pagination, {
                  background: "",
                  layout: "prev, pager, next",
                  total: 100
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: currentRow.value?.status === "pending" ? "处理退款申请" : "查看退款详情",
        width: "700px",
        onClose: resetDialog
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-27f3e0b9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
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
            if (currentRow.value?.status === "pending") {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "danger",
                onClick: handleReject
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`驳回退款`);
                  } else {
                    return [
                      createTextVNode("驳回退款")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: handleAgree
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
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => dialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("关闭")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                currentRow.value?.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode(_component_el_button, {
                    type: "danger",
                    onClick: handleReject
                  }, {
                    default: withCtx(() => [
                      createTextVNode("驳回退款")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: handleAgree
                  }, {
                    default: withCtx(() => [
                      createTextVNode("同意退款")
                    ]),
                    _: 1
                  })
                ], 64)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentRow.value) {
              _push2(`<div class="detail-container" data-v-27f3e0b9${_scopeId}><div class="section-title" data-v-27f3e0b9${_scopeId}>订单信息</div>`);
              _push2(ssrRenderComponent(_component_el_descriptions, {
                column: 2,
                border: "",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "订单号" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.orderInfo.orderNo)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.orderInfo.orderNo), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "实付金额" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`¥${ssrInterpolate(currentRow.value.orderInfo.paidAmount)}`);
                        } else {
                          return [
                            createTextVNode("¥" + toDisplayString(currentRow.value.orderInfo.paidAmount), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      label: "商品名称",
                      span: 2
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.orderInfo.productName)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.orderInfo.productName), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      label: "商品规格",
                      span: 2
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.orderInfo.productSpec)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.orderInfo.productSpec), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "支付时间" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.orderInfo.payTime)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.orderInfo.payTime), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "支付方式" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.orderInfo.paymentMethod)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.orderInfo.paymentMethod), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      label: "过期时间",
                      span: 2
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.orderInfo.expiryTime)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.orderInfo.expiryTime), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "订单号" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.orderInfo.orderNo), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "实付金额" }, {
                        default: withCtx(() => [
                          createTextVNode("¥" + toDisplayString(currentRow.value.orderInfo.paidAmount), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "商品名称",
                        span: 2
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.orderInfo.productName), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "商品规格",
                        span: 2
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.orderInfo.productSpec), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "支付时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.orderInfo.payTime), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "支付方式" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.orderInfo.paymentMethod), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "过期时间",
                        span: 2
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.orderInfo.expiryTime), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="section-title" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-27f3e0b9${_scopeId}>退款申请信息</div>`);
              _push2(ssrRenderComponent(_component_el_descriptions, {
                column: 1,
                border: "",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "退款理由" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRow.value.reason)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRow.value.reason), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "当前状态" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: getStatusTag(currentRow.value.status)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(getStatusName(currentRow.value.status))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(getStatusName(currentRow.value.status)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_tag, {
                              type: getStatusTag(currentRow.value.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getStatusName(currentRow.value.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (currentRow.value.status === "rejected" && currentRow.value.rejectReason) {
                      _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "驳回原因" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span style="${ssrRenderStyle({ "color": "#F56C6C" })}" data-v-27f3e0b9${_scopeId3}>${ssrInterpolate(currentRow.value.rejectReason)}</span>`);
                          } else {
                            return [
                              createVNode("span", { style: { "color": "#F56C6C" } }, toDisplayString(currentRow.value.rejectReason), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "退款理由" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRow.value.reason), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "当前状态" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_tag, {
                            type: getStatusTag(currentRow.value.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStatusName(currentRow.value.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["type"])
                        ]),
                        _: 1
                      }),
                      currentRow.value.status === "rejected" && currentRow.value.rejectReason ? (openBlock(), createBlock(_component_el_descriptions_item, {
                        key: 0,
                        label: "驳回原因"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { style: { "color": "#F56C6C" } }, toDisplayString(currentRow.value.rejectReason), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentRow.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "detail-container"
              }, [
                createVNode("div", { class: "section-title" }, "订单信息"),
                createVNode(_component_el_descriptions, {
                  column: 2,
                  border: "",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "订单号" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.orderInfo.orderNo), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "实付金额" }, {
                      default: withCtx(() => [
                        createTextVNode("¥" + toDisplayString(currentRow.value.orderInfo.paidAmount), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, {
                      label: "商品名称",
                      span: 2
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.orderInfo.productName), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, {
                      label: "商品规格",
                      span: 2
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.orderInfo.productSpec), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "支付时间" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.orderInfo.payTime), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "支付方式" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.orderInfo.paymentMethod), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, {
                      label: "过期时间",
                      span: 2
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.orderInfo.expiryTime), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", {
                  class: "section-title",
                  style: { "margin-top": "20px" }
                }, "退款申请信息"),
                createVNode(_component_el_descriptions, {
                  column: 1,
                  border: "",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "退款理由" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRow.value.reason), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "当前状态" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, {
                          type: getStatusTag(currentRow.value.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getStatusName(currentRow.value.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["type"])
                      ]),
                      _: 1
                    }),
                    currentRow.value.status === "rejected" && currentRow.value.rejectReason ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 0,
                      label: "驳回原因"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { style: { "color": "#F56C6C" } }, toDisplayString(currentRow.value.rejectReason), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: rejectDialogVisible.value,
        "onUpdate:modelValue": ($event) => rejectDialogVisible.value = $event,
        title: "驳回退款",
        width: "400px",
        "append-to-body": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-27f3e0b9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => rejectDialogVisible.value = false
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
              onClick: confirmReject
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认驳回`);
                } else {
                  return [
                    createTextVNode("确认驳回")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => rejectDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "danger",
                  onClick: confirmReject
                }, {
                  default: withCtx(() => [
                    createTextVNode("确认驳回")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: rejectForm,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "驳回原因" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: rejectForm.reason,
                          "onUpdate:modelValue": ($event) => rejectForm.reason = $event,
                          type: "textarea",
                          rows: 3,
                          placeholder: "请输入驳回原因"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: rejectForm.reason,
                            "onUpdate:modelValue": ($event) => rejectForm.reason = $event,
                            type: "textarea",
                            rows: 3,
                            placeholder: "请输入驳回原因"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "驳回原因" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: rejectForm.reason,
                          "onUpdate:modelValue": ($event) => rejectForm.reason = $event,
                          type: "textarea",
                          rows: 3,
                          placeholder: "请输入驳回原因"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: rejectForm,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "驳回原因" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: rejectForm.reason,
                        "onUpdate:modelValue": ($event) => rejectForm.reason = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: "请输入驳回原因"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: agreeDialogVisible.value,
        "onUpdate:modelValue": ($event) => agreeDialogVisible.value = $event,
        title: "确认同意退款",
        width: "400px",
        "append-to-body": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-27f3e0b9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => agreeDialogVisible.value = false
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
              type: "primary",
              onClick: confirmAgree
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认同意`);
                } else {
                  return [
                    createTextVNode("确认同意")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => agreeDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: confirmAgree
                }, {
                  default: withCtx(() => [
                    createTextVNode("确认同意")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-27f3e0b9${_scopeId}>确认同意该退款申请吗？操作后资金将退回用户钱包。</span>`);
          } else {
            return [
              createVNode("span", null, "确认同意该退款申请吗？操作后资金将退回用户钱包。")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/refunds/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-27f3e0b9"]]);
export {
  index as default
};
//# sourceMappingURL=index-BVik5JWj.js.map
