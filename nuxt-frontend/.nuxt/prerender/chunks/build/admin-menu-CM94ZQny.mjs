const ADMIN_MENU_ITEMS = [
  { index: "/manager_portal", path: "/manager_portal", icon: "Odometer", title: "\u4EEA\u8868\u76D8" },
  { index: "/manager_portal/orders", path: "/manager_portal/orders", icon: "List", title: "\u8BA2\u5355\u7BA1\u7406" },
  { index: "/manager_portal/products", path: "/manager_portal/products", icon: "Goods", title: "\u5546\u54C1\u7BA1\u7406" },
  { index: "/manager_portal/cdk", path: "/manager_portal/cdk", icon: "Key", title: "CDK\u7BA1\u7406" },
  { index: "/manager_portal/coupons", path: "/manager_portal/coupons", icon: "Ticket", title: "\u4F18\u60E0\u5238\u7BA1\u7406" },
  { index: "/manager_portal/users", path: "/manager_portal/users", icon: "User", title: "\u7528\u6237\u7BA1\u7406", spacing: true },
  { index: "/manager_portal/tickets", path: "/manager_portal/tickets", icon: "Service", title: "\u5DE5\u5355\u7BA1\u7406" },
  { index: "/manager_portal/recharge", path: "/manager_portal/recharge", icon: "Money", title: "\u5145\u503C\u7BA1\u7406" },
  { index: "/manager_portal/media", path: "/manager_portal/media", icon: "Picture", title: "\u5A92\u4F53\u4E2D\u5FC3" },
  { index: "/manager_portal/help-center", path: "/manager_portal/help-center", icon: "QuestionFilled", title: "\u5E2E\u52A9\u4E2D\u5FC3" },
  { index: "/manager_portal/messages", path: "/manager_portal/messages", icon: "Message", title: "\u6D88\u606F\u53D1\u9001\u7BA1\u7406" },
  { index: "/manager_portal/backend-settings", path: "/manager_portal/backend-settings", icon: "Setting", title: "\u7CFB\u7EDF\u8BBE\u7F6E" }
];
const getPermissionMenuItems = () => {
  return ADMIN_MENU_ITEMS.filter((item) => item.index !== "/manager_portal");
};

export { ADMIN_MENU_ITEMS as A, getPermissionMenuItems as g };
//# sourceMappingURL=admin-menu-CM94ZQny.mjs.map
