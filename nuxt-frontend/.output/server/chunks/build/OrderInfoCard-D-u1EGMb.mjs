import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

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
      var _a, _b;
      return ((_b = (_a = props.order) == null ? void 0 : _a.product_snapshot) == null ? void 0 : _b.image) || "/images/placeholder.png";
    };
    const getProductName = () => {
      var _a, _b;
      return ((_b = (_a = props.order) == null ? void 0 : _a.product_snapshot) == null ? void 0 : _b.product_name) || "\u5546\u54C1";
    };
    const getSpecs = () => {
      var _a, _b;
      const specs = (_b = (_a = props.order) == null ? void 0 : _a.sku_snapshot) == null ? void 0 : _b.spec_combination;
      if (!specs || typeof specs !== "object") return [];
      return Object.values(specs);
    };
    const formatPrice = () => {
      var _a;
      const amount = (_a = props.order) == null ? void 0 : _a.total_amount;
      return typeof amount === "number" ? amount.toFixed(2) : "0.00";
    };
    const formatStatus = (status) => {
      const map = {
        "pending_payment": "\u5F85\u652F\u4ED8",
        "pending_delivery": "\u5F85\u53D1\u8D27",
        "active": "\u4F7F\u7528\u4E2D",
        "completed": "\u5DF2\u5B8C\u6210",
        "expired": "\u5DF2\u8FC7\u671F",
        "refunding": "\u9000\u6B3E\u4E2D",
        "refunded": "\u5DF2\u9000\u6B3E",
        "cancelled": "\u5DF2\u53D6\u6D88"
      };
      return map[status || ""] || status || "\u672A\u77E5";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["order-info-card", { loading: __props.loading }]
      }, _attrs))} data-v-0e342188>`);
      if (__props.loading) {
        _push(`<div class="loading-content" data-v-0e342188><span class="loading-spinner" data-v-0e342188></span><span data-v-0e342188>\u52A0\u8F7D\u8BA2\u5355\u4FE1\u606F...</span></div>`);
      } else if (__props.order) {
        _push(`<!--[--><div class="card-image" data-v-0e342188><img${ssrRenderAttr("src", getImage())} alt="Product" data-v-0e342188></div><div class="card-info" data-v-0e342188><div class="info-top" data-v-0e342188><span class="order-no" data-v-0e342188>\u8BA2\u5355\u53F7 ${ssrInterpolate(__props.order.order_no)}</span><span class="${ssrRenderClass([__props.order.status, "status-badge"])}" data-v-0e342188>${ssrInterpolate(formatStatus(__props.order.status))}</span></div><div class="product-row" data-v-0e342188><span class="product-name" data-v-0e342188>${ssrInterpolate(getProductName())}</span>`);
        if (getSpecs().length) {
          _push(`<span class="specs" data-v-0e342188><!--[-->`);
          ssrRenderList(getSpecs(), (spec) => {
            _push(`<span class="spec-tag" data-v-0e342188>${ssrInterpolate(spec)}</span>`);
          });
          _push(`<!--]--></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="price-row" data-v-0e342188><span class="price" data-v-0e342188>\xA5${ssrInterpolate(formatPrice())}</span><span class="quantity" data-v-0e342188>x${ssrInterpolate(__props.order.quantity || 1)}</span></div></div><!--]-->`);
      } else {
        _push(`<div class="empty-state" data-v-0e342188> \u6682\u65E0\u8BA2\u5355\u4FE1\u606F </div>`);
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

export { OrderInfoCard as O };
//# sourceMappingURL=OrderInfoCard-D-u1EGMb.mjs.map
