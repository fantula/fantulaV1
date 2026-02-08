import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OrderInfoCard",
  __ssrInlineRender: true,
  props: {
    order: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const getImage = () => {
      return props.order?.product_snapshot?.image || "/images/placeholder.png";
    };
    const getProductName = () => {
      return props.order?.product_snapshot?.product_name || "商品";
    };
    const getSpecs = () => {
      const specs = props.order?.sku_snapshot?.spec_combination;
      if (!specs || typeof specs !== "object") return [];
      return Object.values(specs);
    };
    const formatPrice = () => {
      const amount = props.order?.total_amount;
      return typeof amount === "number" ? amount.toFixed(2) : "0.00";
    };
    const formatStatus = (status) => {
      const map = {
        "pending_payment": "待支付",
        "pending_delivery": "待发货",
        "active": "使用中",
        "completed": "已完成",
        "expired": "已过期",
        "refunding": "退款中",
        "refunded": "已退款",
        "cancelled": "已取消"
      };
      return map[status || ""] || status || "未知";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["order-info-card", { loading: __props.loading }]
      }, _attrs))} data-v-0e342188>`);
      if (__props.loading) {
        _push(`<div class="loading-content" data-v-0e342188><span class="loading-spinner" data-v-0e342188></span><span data-v-0e342188>加载订单信息...</span></div>`);
      } else if (__props.order) {
        _push(`<!--[--><div class="card-image" data-v-0e342188><img${ssrRenderAttr("src", getImage())} alt="Product" data-v-0e342188></div><div class="card-info" data-v-0e342188><div class="info-top" data-v-0e342188><span class="order-no" data-v-0e342188>订单号 ${ssrInterpolate(__props.order.order_no)}</span><span class="${ssrRenderClass([__props.order.status, "status-badge"])}" data-v-0e342188>${ssrInterpolate(formatStatus(__props.order.status))}</span></div><div class="product-row" data-v-0e342188><span class="product-name" data-v-0e342188>${ssrInterpolate(getProductName())}</span>`);
        if (getSpecs().length) {
          _push(`<span class="specs" data-v-0e342188><!--[-->`);
          ssrRenderList(getSpecs(), (spec) => {
            _push(`<span class="spec-tag" data-v-0e342188>${ssrInterpolate(spec)}</span>`);
          });
          _push(`<!--]--></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="price-row" data-v-0e342188><span class="price" data-v-0e342188>¥${ssrInterpolate(formatPrice())}</span><span class="quantity" data-v-0e342188>x${ssrInterpolate(__props.order.quantity || 1)}</span></div></div><!--]-->`);
      } else {
        _push(`<div class="empty-state" data-v-0e342188> 暂无订单信息 </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/order/OrderInfoCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OrderInfoCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e342188"]]);
export {
  OrderInfoCard as O
};
//# sourceMappingURL=OrderInfoCard-D-u1EGMb.js.map
