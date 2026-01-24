const ADMIN_MENU_ITEMS = [
  { index: "/_mgmt_9Xfa3", path: "/_mgmt_9Xfa3", icon: "Odometer", title: "\u4EEA\u8868\u76D8" },
  { index: "/_mgmt_9Xfa3/orders", path: "/_mgmt_9Xfa3/orders", icon: "List", title: "\u8BA2\u5355\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/products", path: "/_mgmt_9Xfa3/products", icon: "Goods", title: "\u5546\u54C1\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/cdk", path: "/_mgmt_9Xfa3/cdk", icon: "Key", title: "CDK\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/coupons", path: "/_mgmt_9Xfa3/coupons", icon: "Ticket", title: "\u4F18\u60E0\u5238\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/users", path: "/_mgmt_9Xfa3/users", icon: "User", title: "\u7528\u6237\u7BA1\u7406", spacing: true },
  { index: "/_mgmt_9Xfa3/tickets", path: "/_mgmt_9Xfa3/tickets", icon: "Service", title: "\u5DE5\u5355\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/recharge", path: "/_mgmt_9Xfa3/recharge", icon: "Money", title: "\u5145\u503C\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/media", path: "/_mgmt_9Xfa3/media", icon: "Picture", title: "\u5A92\u4F53\u4E2D\u5FC3" },
  { index: "/_mgmt_9Xfa3/help-center", path: "/_mgmt_9Xfa3/help-center", icon: "QuestionFilled", title: "\u5E2E\u52A9\u4E2D\u5FC3" },
  { index: "/_mgmt_9Xfa3/messages", path: "/_mgmt_9Xfa3/messages", icon: "Message", title: "\u6D88\u606F\u53D1\u9001\u7BA1\u7406" },
  { index: "/_mgmt_9Xfa3/backend-settings", path: "/_mgmt_9Xfa3/backend-settings", icon: "Setting", title: "\u540E\u53F0\u8BBE\u5B9A" }
];
const getPermissionMenuItems = () => {
  return ADMIN_MENU_ITEMS.filter((item) => item.index !== "/_mgmt_9Xfa3");
};

export { ADMIN_MENU_ITEMS as A, getPermissionMenuItems as g };
//# sourceMappingURL=admin-menu-DXx4fNJV.mjs.map
