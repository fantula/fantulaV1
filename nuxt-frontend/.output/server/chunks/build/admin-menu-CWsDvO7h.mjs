const ADMIN_MENU_ITEMS = [
  { index: "/admin", path: "/admin", icon: "Odometer", title: "\u4EEA\u8868\u76D8" },
  { index: "/admin/orders", path: "/admin/orders", icon: "List", title: "\u8BA2\u5355\u7BA1\u7406" },
  { index: "/admin/products", path: "/admin/products", icon: "Goods", title: "\u5546\u54C1\u7BA1\u7406" },
  { index: "/admin/cdk", path: "/admin/cdk", icon: "Key", title: "CDK\u7BA1\u7406" },
  { index: "/admin/coupons", path: "/admin/coupons", icon: "Ticket", title: "\u4F18\u60E0\u5238\u7BA1\u7406" },
  { index: "/admin/users", path: "/admin/users", icon: "User", title: "\u7528\u6237\u7BA1\u7406", spacing: true },
  { index: "/admin/tickets", path: "/admin/tickets", icon: "Service", title: "\u5DE5\u5355\u7BA1\u7406" },
  { index: "/admin/recharge", path: "/admin/recharge", icon: "Money", title: "\u5145\u503C\u7BA1\u7406" },
  { index: "/admin/media", path: "/admin/media", icon: "Picture", title: "\u5A92\u4F53\u4E2D\u5FC3" },
  { index: "/admin/help-center", path: "/admin/help-center", icon: "QuestionFilled", title: "\u5E2E\u52A9\u4E2D\u5FC3" },
  { index: "/admin/messages", path: "/admin/messages", icon: "Message", title: "\u6D88\u606F\u53D1\u9001\u7BA1\u7406" },
  { index: "/admin/backend-settings", path: "/admin/backend-settings", icon: "Setting", title: "\u540E\u53F0\u8BBE\u5B9A" }
];
const getPermissionMenuItems = () => {
  return ADMIN_MENU_ITEMS.filter((item) => item.index !== "/admin");
};

export { ADMIN_MENU_ITEMS as A, getPermissionMenuItems as g };
//# sourceMappingURL=admin-menu-CWsDvO7h.mjs.map
