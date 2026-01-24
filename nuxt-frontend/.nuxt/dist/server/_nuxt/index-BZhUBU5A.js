import { E as ElIcon, b5 as box_default, ba as picture_default, bb as delete_default, f as arrow_right_default, ad as BaseModal, a2 as warning_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { ref, computed, defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { c as clientOrderApi } from "./order-7ENcviEB.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useBizConfig } from "./useBizConfig-DtWyKy4G.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
function useOrderList() {
  const loading = ref(false);
  const orders = ref([]);
  const preOrders = ref([]);
  const currentTab = ref("all");
  const { formatPrice, formatDate } = useBizFormat();
  const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
  const tabs = [
    { label: "全部订单", value: "all" },
    { label: "待支付", value: "pending" },
    { label: "待发货", value: "pending_delivery" },
    { label: "使用中", value: "active" },
    { label: "已过期", value: "expired" },
    { label: "退款/售后", value: "refund" }
    // 包含 refunding + refunded
  ];
  const allOrders = computed(() => {
    const pendingList = preOrders.value.map((o) => ({
      id: o.id,
      order_no: o.order_no,
      status: "pending",
      total_amount: o.total_amount,
      quantity: o.quantity,
      created_at: o.created_at,
      // 扁平化字段 (供模板直接使用)
      product_name: o.product_snapshot?.product_name || "待支付商品",
      product_image: o.product_snapshot?.image || "",
      spec_text: formatSpec(o.sku_snapshot?.spec_combination),
      isPending: true
    }));
    const paidList = orders.value.map((o) => ({
      id: o.id,
      order_no: o.order_no,
      status: o.status,
      total_amount: o.total_amount,
      quantity: o.quantity,
      created_at: o.created_at,
      // 扁平化字段
      product_name: o.product_snapshot?.product_name || "未知商品",
      product_image: o.product_snapshot?.image || "",
      spec_text: formatSpec(o.sku_snapshot?.spec_combination),
      isPending: false
    }));
    const merged = [...pendingList, ...paidList];
    merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return merged;
  });
  const filterStrategies = {
    "all": () => true,
    // 待支付: 仅显示预订单 (pending)
    "pending": (o) => o.isPending === true && o.status === "pending",
    // 待发货: 仅显示正式订单
    "pending_delivery": (o) => !o.isPending && o.status === "pending_delivery",
    // 使用中: 仅显示正式订单
    "active": (o) => !o.isPending && o.status === "active",
    // 已过期: 仅显示正式订单 (预订单过期会被自动清理或不显示)
    "expired": (o) => !o.isPending && o.status === "expired",
    // 退款/售后: 包含退款中和已退款
    "refund": (o) => !o.isPending && ["refunding", "refunded"].includes(o.status)
  };
  const filteredList = computed(() => {
    const strategy = filterStrategies[currentTab.value];
    if (!strategy) return allOrders.value;
    return allOrders.value.filter(strategy);
  });
  async function loadList() {
    loading.value = true;
    try {
      const [ordersRes, preOrdersRes] = await Promise.all([
        clientOrderApi.getOrderList(),
        clientOrderApi.getPendingPreOrders()
      ]);
      if (ordersRes.success) {
        orders.value = ordersRes.data || [];
      }
      if (preOrdersRes.success) {
        preOrders.value = preOrdersRes.data || [];
      }
    } catch (error) {
      console.error("加载订单列表失败:", error);
    } finally {
      loading.value = false;
    }
  }
  function changeTab(tabValue) {
    currentTab.value = tabValue;
  }
  async function deletePreOrder(preOrderId) {
    const res = await clientOrderApi.cancelPreOrder(preOrderId);
    if (res.success) {
      preOrders.value = preOrders.value.filter((o) => o.id !== preOrderId);
      return true;
    }
    return false;
  }
  function formatSpec(spec) {
    if (!spec) return "";
    if (typeof spec === "string") return spec;
    return Object.values(spec).join(" / ");
  }
  function getCurrentTabLabel() {
    return tabs.find((t) => t.value === currentTab.value)?.label || "订单";
  }
  return {
    // 状态
    loading,
    orders,
    preOrders,
    currentTab,
    tabs,
    // 计算属性
    allOrders,
    filteredList,
    // 方法
    loadList,
    changeTab,
    deletePreOrder,
    formatSpec,
    getCurrentTabLabel,
    // 全局工具
    formatPrice,
    formatDate,
    getOrderStatusLabel,
    getOrderStatusType
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const {
      loading,
      filteredList,
      currentTab,
      tabs,
      loadList,
      deletePreOrder,
      getCurrentTabLabel,
      formatDate,
      getOrderStatusLabel
    } = useOrderList();
    const getStatusText = (status) => getOrderStatusLabel(status);
    const formatTime = (time) => formatDate(time);
    const confirmModalVisible = ref(false);
    const confirmLoading = ref(false);
    const confirmModalType = ref("cleanup");
    const confirmTargetItem = ref(null);
    const confirmModalMessage = computed(() => {
      return confirmModalType.value === "pending" ? "确定要取消这个订单吗？取消后将释放锁定库存。" : "该订单已无效(过期或退款)，确认要从列表中移除吗？";
    });
    const handleConfirmDelete = async () => {
      if (!confirmTargetItem.value) return;
      confirmLoading.value = true;
      try {
        if (confirmModalType.value === "pending") {
          const success = await deletePreOrder(confirmTargetItem.value.id);
          if (success) {
            ElMessage.success("订单已取消");
            confirmModalVisible.value = false;
          } else {
            ElMessage.error("操作失败");
          }
        } else {
          setTimeout(() => {
            ElMessage.success("记录已清理");
            confirmModalVisible.value = false;
            loadList();
          }, 500);
        }
      } catch (e) {
        console.error(e);
      } finally {
        confirmLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "orders-page" }, _attrs))} data-v-f3252da0><div class="section-header" data-v-f3252da0><h2 class="section-title" data-v-f3252da0>我的订单</h2><div class="section-subtitle" data-v-f3252da0>Order History</div></div><div class="order-tabs" data-v-f3252da0><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: unref(currentTab) === tab.value }])}" data-v-f3252da0><span data-v-f3252da0>${ssrInterpolate(tab.label)}</span>`);
        if (unref(currentTab) === tab.value) {
          _push(`<div class="active-glow" data-v-f3252da0></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="orders-scroll-area" data-v-f3252da0><div class="orders-container" data-v-f3252da0>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-f3252da0><div class="glass-loader" data-v-f3252da0></div><p data-v-f3252da0>正在加载订单...</p></div>`);
      } else if (unref(filteredList).length === 0) {
        _push(`<div class="empty-state" data-v-f3252da0><div class="empty-icon-wrapper" data-v-f3252da0>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(box_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(box_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="empty-text" data-v-f3252da0>暂无${ssrInterpolate(unref(getCurrentTabLabel)())}记录</div><button class="go-shopping-btn" data-v-f3252da0>前往选购</button></div>`);
      } else {
        _push(`<div class="order-list" data-v-f3252da0><!--[-->`);
        ssrRenderList(unref(filteredList), (item) => {
          _push(`<div class="${ssrRenderClass([["status-" + (item.isPending ? "pending" : item.status)], "order-card"])}" data-v-f3252da0><div class="status-line" data-v-f3252da0></div><div class="card-inner" data-v-f3252da0><div class="card-header" data-v-f3252da0><div class="order-no-group" data-v-f3252da0><span class="label" data-v-f3252da0>NO.</span><span class="value" data-v-f3252da0>${ssrInterpolate(item.order_no)}</span></div><div class="${ssrRenderClass([item.isPending ? "pending" : item.status, "status-pill"])}" data-v-f3252da0><div class="dot" data-v-f3252da0></div><span data-v-f3252da0>${ssrInterpolate(item.isPending ? "待支付" : getStatusText(item.status))}</span></div></div><div class="card-body" data-v-f3252da0><div class="product-thumb" data-v-f3252da0>`);
          if (item.product_image) {
            _push(`<img${ssrRenderAttr("src", item.product_image)} class="thumb-img" data-v-f3252da0>`);
          } else {
            _push(`<div class="placeholder-img" data-v-f3252da0>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(picture_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(picture_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          }
          _push(`</div><div class="product-info" data-v-f3252da0><div class="name-row" data-v-f3252da0><h3 class="product-name" data-v-f3252da0>${ssrInterpolate(item.product_name)}</h3><span class="spec-tag" data-v-f3252da0>${ssrInterpolate(item.spec_text || "标准规格")}</span></div><div class="price-row" data-v-f3252da0><div class="price" data-v-f3252da0><span class="amount" data-v-f3252da0>${ssrInterpolate(Number(item.total_amount).toFixed(2))}</span><span class="unit" data-v-f3252da0>点</span></div><div class="qty" data-v-f3252da0>x${ssrInterpolate(item.quantity)}</div></div></div></div><div class="card-footer" data-v-f3252da0><div class="order-time" data-v-f3252da0>${ssrInterpolate(formatTime(item.created_at))}</div><div class="card-actions" data-v-f3252da0>`);
          if (item.isPending || item.status === "pending") {
            _push(`<!--[--><button class="action-btn delete" data-v-f3252da0>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(delete_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</button><button class="action-btn pay" data-v-f3252da0>去支付</button><!--]-->`);
          } else if (["expired", "refunded", "cancelled"].includes(item.status)) {
            _push(`<button class="action-btn cleanup" data-v-f3252da0>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(delete_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(` 清理记录 </button>`);
          } else {
            _push(`<button class="action-btn view" data-v-f3252da0>查看详情 `);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(arrow_right_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</button>`);
          }
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(BaseModal, {
        visible: confirmModalVisible.value,
        "onUpdate:visible": ($event) => confirmModalVisible.value = $event,
        title: confirmModalType.value === "pending" ? "取消订单" : "清理记录",
        width: "400px",
        confirmText: "确认删除",
        "confirm-type": "danger",
        loading: confirmLoading.value,
        "show-mascot": "",
        onConfirm: handleConfirmDelete
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="confirm-content" data-v-f3252da0${_scopeId}><div class="confirm-icon" data-v-f3252da0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(warning_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(warning_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><p class="confirm-text" data-v-f3252da0${_scopeId}>${ssrInterpolate(confirmModalMessage.value)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "confirm-content" }, [
                createVNode("div", { class: "confirm-icon" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(warning_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("p", { class: "confirm-text" }, toDisplayString(confirmModalMessage.value), 1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/order/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3252da0"]]);
export {
  index as default
};
//# sourceMappingURL=index-BZhUBU5A.js.map
