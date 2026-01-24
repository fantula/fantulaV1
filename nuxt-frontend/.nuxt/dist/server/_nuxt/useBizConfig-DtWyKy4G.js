const PRODUCT_TYPES = {
  virtual: {
    label: "虚拟充值",
    color: "primary",
    icon: "Lightning"
  },
  shared_account: {
    label: "账号合租",
    color: "success",
    icon: "UserFilled"
  },
  one_time_cdk: {
    label: "兑换码",
    color: "warning",
    icon: "Key"
  }
};
function useBizConfig() {
  const getProductTypeLabel = (type) => {
    const config = PRODUCT_TYPES[type];
    return config ? config.label : type || "未知类型";
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
    "pending": { label: "待支付", type: "danger" },
    // Changed to danger/orange
    "pending_delivery": { label: "待发货", type: "warning" },
    "active": { label: "使用中", type: "success" },
    // Changed from 服务中
    "expired": { label: "已过期", type: "info" },
    "completed": { label: "已完成", type: "" },
    "converted": { label: "已转换", type: "info" },
    "cancelled": { label: "已取消", type: "info" },
    "refunding": { label: "退款中", type: "warning" },
    "refunded": { label: "已退款", type: "info" }
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
    "idle": { label: "空闲", type: "success" },
    "using": { label: "使用中", type: "warning" },
    "used": { label: "已使用", type: "info" },
    "disabled": { label: "已下架", type: "danger" }
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
    "balance": { label: "额度券", color: "success" },
    "flat": { label: "立减券", color: "danger" },
    "product": { label: "指定商品券", color: "warning" }
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
    "unused": { label: "未使用", type: "success" },
    "used": { label: "已使用", type: "info" },
    "expired": { label: "已过期", type: "danger" }
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
      "low": { label: "一般", type: "info" },
      "medium": { label: "重要", type: "warning" },
      "high": { label: "紧急", type: "danger" }
    },
    getTicketPriorityLabel: (p) => {
      const map = { "low": "一般", "medium": "重要", "high": "紧急" };
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
      "processing": { label: "处理中", type: "primary" },
      "resolved": { label: "已解决", type: "success" }
    },
    getTicketStatusLabel: (s) => {
      return s === "processing" ? "处理中" : "已解决";
    },
    getTicketStatusType: (s) => {
      return s === "processing" ? "primary" : "success";
    }
  };
}
export {
  useBizConfig as u
};
//# sourceMappingURL=useBizConfig-DtWyKy4G.js.map
