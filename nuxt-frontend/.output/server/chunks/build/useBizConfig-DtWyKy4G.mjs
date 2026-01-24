const PRODUCT_TYPES = {
  virtual: {
    label: "\u865A\u62DF\u5145\u503C",
    color: "primary",
    icon: "Lightning"
  },
  shared_account: {
    label: "\u8D26\u53F7\u5408\u79DF",
    color: "success",
    icon: "UserFilled"
  },
  one_time_cdk: {
    label: "\u5151\u6362\u7801",
    color: "warning",
    icon: "Key"
  }
};
function useBizConfig() {
  const getProductTypeLabel = (type) => {
    const config = PRODUCT_TYPES[type];
    return config ? config.label : type || "\u672A\u77E5\u7C7B\u578B";
  };
  const getProductTypeTag = (type) => {
    const config = PRODUCT_TYPES[type];
    return config ? config.color : "info";
  };
  const productTypeOptions = Object.entries(PRODUCT_TYPES).map(([value, config]) => ({
    label: config.label,
    value
  }));
  const ORDER_STATUS = {
    "pending": { label: "\u5F85\u652F\u4ED8", type: "danger" },
    // Changed to danger/orange
    "pending_delivery": { label: "\u5F85\u53D1\u8D27", type: "warning" },
    "active": { label: "\u4F7F\u7528\u4E2D", type: "success" },
    // Changed from 服务中
    "expired": { label: "\u5DF2\u8FC7\u671F", type: "info" },
    "completed": { label: "\u5DF2\u5B8C\u6210", type: "" },
    "converted": { label: "\u5DF2\u8F6C\u6362", type: "info" },
    "cancelled": { label: "\u5DF2\u53D6\u6D88", type: "info" },
    "refunding": { label: "\u9000\u6B3E\u4E2D", type: "warning" },
    "refunded": { label: "\u5DF2\u9000\u6B3E", type: "info" }
    // Refunded is usually neutral/gray or red. User didn't specify color, but "已退款" implies done. Info/Gray is safe.
  };
  const getOrderStatusLabel = (status) => {
    const config = ORDER_STATUS[status];
    return config ? config.label : status;
  };
  const getOrderStatusType = (status) => {
    const config = ORDER_STATUS[status];
    return config ? config.type : "info";
  };
  const orderStatusOptions = Object.entries(ORDER_STATUS).map(([value, config]) => ({
    label: config.label,
    value
  }));
  const CDK_STATUS = {
    "idle": { label: "\u7A7A\u95F2", type: "success" },
    "using": { label: "\u4F7F\u7528\u4E2D", type: "warning" },
    "used": { label: "\u5DF2\u4F7F\u7528", type: "info" },
    "disabled": { label: "\u5DF2\u4E0B\u67B6", type: "danger" }
  };
  const getCdkStatusLabel = (status) => {
    const config = CDK_STATUS[status];
    return config ? config.label : status;
  };
  const getCdkStatusType = (status) => {
    const config = CDK_STATUS[status];
    return config ? config.type : "info";
  };
  const cdkStatusOptions = Object.entries(CDK_STATUS).map(([value, config]) => ({
    label: config.label,
    value
  }));
  const COUPON_TYPES = {
    "balance": { label: "\u989D\u5EA6\u5238", color: "success" },
    "flat": { label: "\u7ACB\u51CF\u5238", color: "danger" },
    "product": { label: "\u6307\u5B9A\u5546\u54C1\u5238", color: "warning" }
  };
  const getCouponTypeLabel = (type) => {
    const config = COUPON_TYPES[type];
    return config ? config.label : type;
  };
  const getCouponTypeTag = (type) => {
    const config = COUPON_TYPES[type];
    return config ? config.color : "info";
  };
  const couponTypeOptions = Object.entries(COUPON_TYPES).map(([value, config]) => ({
    label: config.label,
    value
  }));
  const COUPON_STATUS = {
    "unused": { label: "\u672A\u4F7F\u7528", type: "success" },
    "used": { label: "\u5DF2\u4F7F\u7528", type: "info" },
    "expired": { label: "\u5DF2\u8FC7\u671F", type: "danger" }
  };
  const getCouponStatusLabel = (status) => {
    const config = COUPON_STATUS[status];
    return config ? config.label : status;
  };
  const getCouponStatusType = (status) => {
    const config = COUPON_STATUS[status];
    return config ? config.type : "info";
  };
  const couponStatusOptions = Object.entries(COUPON_STATUS).map(([value, config]) => ({
    label: config.label,
    value
  }));
  return {
    PRODUCT_TYPES,
    getProductTypeLabel,
    getProductTypeTag,
    productTypeOptions,
    ORDER_STATUS,
    getOrderStatusLabel,
    getOrderStatusType,
    orderStatusOptions,
    CDK_STATUS,
    getCdkStatusLabel,
    getCdkStatusType,
    cdkStatusOptions,
    COUPON_TYPES,
    getCouponTypeLabel,
    getCouponTypeTag,
    couponTypeOptions,
    COUPON_STATUS,
    getCouponStatusLabel,
    getCouponStatusType,
    couponStatusOptions,
    // ==========================================
    // 7. 工单优先级定义
    // ==========================================
    TICKET_PRIORITY: {
      "low": { label: "\u4E00\u822C", type: "info" },
      "medium": { label: "\u91CD\u8981", type: "warning" },
      "high": { label: "\u7D27\u6025", type: "danger" }
    },
    getTicketPriorityLabel: (p) => {
      const map = { "low": "\u4E00\u822C", "medium": "\u91CD\u8981", "high": "\u7D27\u6025" };
      return map[p] || p;
    },
    getTicketPriorityType: (p) => {
      const map = { "low": "info", "medium": "warning", "high": "danger" };
      return map[p] || "info";
    },
    // ==========================================
    // 8. 工单状态定义
    // ==========================================
    TICKET_STATUS: {
      "processing": { label: "\u5904\u7406\u4E2D", type: "primary" },
      "resolved": { label: "\u5DF2\u89E3\u51B3", type: "success" }
    },
    getTicketStatusLabel: (s) => {
      return s === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3";
    },
    getTicketStatusType: (s) => {
      return s === "processing" ? "primary" : "success";
    }
  };
}

export { useBizConfig as u };
//# sourceMappingURL=useBizConfig-DtWyKy4G.mjs.map
