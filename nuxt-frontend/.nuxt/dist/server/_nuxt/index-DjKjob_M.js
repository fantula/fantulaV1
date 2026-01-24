import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-BB44-vTK.js";
import { E as ElAvatar } from "./index-C2DKVZ9g.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { by as getAdminSupabaseClient, ah as ElMessage, b9 as refresh_default, _ as _export_sfc } from "../server.mjs";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                   */
/* empty css                    */
import { ref, computed, defineComponent, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { A as AdminDataTable } from "./AdminDataTable-BzMTthVf.js";
import { B as BulkActionBar } from "./BulkActionBar-DNKbMSDo.js";
/* empty css                        */
/* empty css                  */
/* empty css                    */
import { D as DEFAULT_AVATAR } from "./constants-Co_OOoHD.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { v as vLoading } from "./directive-tOiqatq5.js";
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
import "./index-Bf1ETwA6.js";
import "./event-BZTOGHfp.js";
import "./index-ClPmkyX9.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-BlpH41lu.js";
import "normalize-wheel-es";
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
import "./index-DvOrIhmd.js";
/* empty css                  */
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-DKY_z0U1.js";
import "./index-Da73tUO2.js";
/* empty css                    */
/* empty css                  */
/* empty css                       */
import "./index-Dg8Z-nTr.js";
import "./validator-T0bsmJHo.js";
import "./index-B-o0CD59.js";
const adminPreOrderApi = {
  /**
   * 获取预订单列表
   * 默认过滤掉 'pending' (待支付) 状态
   */
  async getPreOrders(params) {
    const client = getAdminSupabaseClient();
    const limit = params.limit || 500;
    let query = client.from("pre_orders").select(`
                id, order_no, status, total_amount, quantity, created_at, product_snapshot, user_id,
                profiles(id, uid, avatar, nickname)
            `, { count: "exact" }).neq("status", "pending").order("created_at", { ascending: false }).limit(limit);
    const { data, error, count } = await query;
    if (error) {
      console.error("获取预订单列表失败:", error);
      return { success: false, orders: [], total: 0, error: error.message };
    }
    const orders = (data || []).map((order) => {
      const rawProfile = order.profiles || order.profile;
      const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile || null;
      return {
        ...order,
        _profile: profile
      };
    });
    return { success: true, orders, total: count || 0 };
  },
  /**
   * 批量删除预订单
   */
  async deletePreOrders(ids) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("pre_orders").delete().in("id", ids);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
function useAdminPreOrderList() {
  const loading = ref(false);
  const rawList = ref([]);
  const selectedIds = ref([]);
  const statusFilter = ref("");
  async function loadList() {
    loading.value = true;
    selectedIds.value = [];
    try {
      const { success, orders, error } = await adminPreOrderApi.getPreOrders({ limit: 500 });
      if (!success) {
        ElMessage.error(error || "加载失败");
        return;
      }
      rawList.value = orders;
    } catch (e) {
      console.error("加载预订单失败:", e);
      ElMessage.error("系统异常");
    } finally {
      loading.value = false;
    }
  }
  const filteredList = computed(() => {
    if (!statusFilter.value) return rawList.value;
    return rawList.value.filter((o) => o.status === statusFilter.value);
  });
  const stats = computed(() => {
    const converted = rawList.value.filter((o) => o.status === "converted").length;
    const expired = rawList.value.filter((o) => o.status === "expired").length;
    const deleted = rawList.value.filter((o) => o.status === "deleted").length;
    return {
      converted,
      expired,
      deleted,
      total: converted + expired + deleted
    };
  });
  async function handleBulkDelete() {
    if (selectedIds.value.length === 0) return;
    try {
      await ElMessageBox.confirm(
        `确定要删除选中的 ${selectedIds.value.length} 条预订单记录吗？此操作不可恢复。`,
        "确认删除",
        { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" }
      );
      const { success, error } = await adminPreOrderApi.deletePreOrders(selectedIds.value);
      if (!success) {
        ElMessage.error(error || "删除失败");
        return;
      }
      ElMessage.success(`成功删除 ${selectedIds.value.length} 条记录`);
      loadList();
    } catch (e) {
      if (e !== "cancel") {
        ElMessage.error("操作取消或失败");
      }
    }
  }
  function handleSelectionChange(selection) {
    selectedIds.value = selection.map((item) => item.id);
  }
  function handleCopy(text) {
    if (!text) return;
    (void 0).clipboard.writeText(text);
    ElMessage.success("已复制");
  }
  const getStatusText = (status) => {
    const map = {
      converted: "已转换",
      expired: "已过期",
      deleted: "已删除"
    };
    return map[status] || status;
  };
  const getStatusType = (status) => {
    const map = {
      converted: "success",
      expired: "info",
      deleted: "danger"
    };
    return map[status] || "info";
  };
  const formatTime = (time) => {
    if (!time) return "-";
    return new Date(time).toLocaleString("zh-CN", { hour12: false });
  };
  return {
    loading,
    list: filteredList,
    // 对外暴露的是筛选后的列表
    stats,
    statusFilter,
    selectedIds,
    DEFAULT_AVATAR,
    loadList,
    handleBulkDelete,
    handleSelectionChange,
    handleCopy,
    getStatusText,
    getStatusType,
    formatTime
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      list,
      stats,
      statusFilter,
      selectedIds,
      DEFAULT_AVATAR: DEFAULT_AVATAR2,
      loadList,
      handleBulkDelete,
      handleSelectionChange,
      handleCopy,
      getStatusText,
      getStatusType,
      formatTime
    } = useAdminPreOrderList();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_avatar = ElAvatar;
      const _component_el_tag = ElTag;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-26e55e06>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "预订单统计",
        description: "查看已转换、已过期、已删除的预订单记录，支持批量清理"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              placeholder: "状态筛选",
              clearable: "",
              style: { "width": "140px", "margin-right": "12px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已转换",
                    value: "converted"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已过期",
                    value: "expired"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已删除",
                    value: "deleted"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "已转换",
                      value: "converted"
                    }),
                    createVNode(_component_el_option, {
                      label: "已过期",
                      value: "expired"
                    }),
                    createVNode(_component_el_option, {
                      label: "已删除",
                      value: "deleted"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
          } else {
            return [
              createVNode(_component_el_select, {
                modelValue: unref(statusFilter),
                "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                placeholder: "状态筛选",
                clearable: "",
                style: { "width": "140px", "margin-right": "12px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_option, {
                    label: "已转换",
                    value: "converted"
                  }),
                  createVNode(_component_el_option, {
                    label: "已过期",
                    value: "expired"
                  }),
                  createVNode(_component_el_option, {
                    label: "已删除",
                    value: "deleted"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: unref(loadList)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(selectedIds).length > 0) {
        _push(ssrRenderComponent(BulkActionBar, {
          count: unref(selectedIds).length,
          onDelete: unref(handleBulkDelete),
          "delete-text": "批量删除"
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
              width: "50"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "订单号",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-26e55e06${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
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
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="user-cell" data-v-26e55e06${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 24,
                    src: row._profile?.avatar || unref(DEFAULT_AVATAR2)
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="user-email" data-v-26e55e06${_scopeId2}>${ssrInterpolate(row._profile?.nickname || row._profile?.uid || "未知用户")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 24,
                        src: row._profile?.avatar || unref(DEFAULT_AVATAR2)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "user-email" }, toDisplayString(row._profile?.nickname || row._profile?.uid || "未知用户"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="product-cell" data-v-26e55e06${_scopeId2}>`);
                  if (row.product_snapshot?.image) {
                    _push3(`<img${ssrRenderAttr("src", row.product_snapshot.image)} class="product-thumb" data-v-26e55e06${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span data-v-26e55e06${_scopeId2}>${ssrInterpolate(row.product_snapshot?.product_name || "未知商品")}</span></div>`);
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
              label: "金额",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-26e55e06${_scopeId2}>¥${ssrInterpolate(row.total_amount)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, "¥" + toDisplayString(row.total_amount), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "数量",
              prop: "quantity",
              width: "80"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: unref(getStatusType)(row.status),
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
                      type: unref(getStatusType)(row.status),
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
              width: "170"
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
          } else {
            return [
              createVNode(_component_el_table_column, {
                type: "selection",
                width: "50"
              }),
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
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "user-cell" }, [
                    createVNode(_component_el_avatar, {
                      size: 24,
                      src: row._profile?.avatar || unref(DEFAULT_AVATAR2)
                    }, null, 8, ["src"]),
                    createVNode("span", { class: "user-email" }, toDisplayString(row._profile?.nickname || row._profile?.uid || "未知用户"), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "商品",
                "min-width": "180"
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
                label: "金额",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, "¥" + toDisplayString(row.total_amount), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "数量",
                prop: "quantity",
                width: "80"
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: unref(getStatusType)(row.status),
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
                width: "170"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="stats-row" data-v-26e55e06><div class="stat-card" data-v-26e55e06><div class="stat-value" data-v-26e55e06>${ssrInterpolate(unref(stats).converted)}</div><div class="stat-label" data-v-26e55e06>已转换</div></div><div class="stat-card" data-v-26e55e06><div class="stat-value" data-v-26e55e06>${ssrInterpolate(unref(stats).expired)}</div><div class="stat-label" data-v-26e55e06>已过期</div></div><div class="stat-card" data-v-26e55e06><div class="stat-value" data-v-26e55e06>${ssrInterpolate(unref(stats).deleted)}</div><div class="stat-label" data-v-26e55e06>已删除</div></div><div class="stat-card total" data-v-26e55e06><div class="stat-value" data-v-26e55e06>${ssrInterpolate(unref(stats).total)}</div><div class="stat-label" data-v-26e55e06>总计</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/orders/preorders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-26e55e06"]]);
export {
  index as default
};
//# sourceMappingURL=index-DjKjob_M.js.map
