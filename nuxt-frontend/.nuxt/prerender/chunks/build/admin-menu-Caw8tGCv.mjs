import { b as adminRoutes } from './admin-routes-C0qcXhse.mjs';

const ADMIN_MENU_ITEMS = [
  { index: adminRoutes.home(), path: adminRoutes.home(), icon: "Odometer", title: "\u4EEA\u8868\u76D8" },
  { index: adminRoutes.orders(), path: adminRoutes.orders(), icon: "List", title: "\u8BA2\u5355\u7BA1\u7406" },
  { index: adminRoutes.products(), path: adminRoutes.products(), icon: "Goods", title: "\u5546\u54C1\u7BA1\u7406" },
  { index: adminRoutes.cdk(), path: adminRoutes.cdk(), icon: "Key", title: "CDK\u7BA1\u7406" },
  { index: adminRoutes.coupons(), path: adminRoutes.coupons(), icon: "Ticket", title: "\u4F18\u60E0\u5238\u7BA1\u7406" },
  { index: adminRoutes.users(), path: adminRoutes.users(), icon: "User", title: "\u7528\u6237\u7BA1\u7406", spacing: true },
  { index: adminRoutes.tickets(), path: adminRoutes.tickets(), icon: "Service", title: "\u5DE5\u5355\u7BA1\u7406" },
  { index: adminRoutes.recharge(), path: adminRoutes.recharge(), icon: "Money", title: "\u5145\u503C\u7BA1\u7406" },
  { index: adminRoutes.media(), path: adminRoutes.media(), icon: "Picture", title: "\u5A92\u4F53\u4E2D\u5FC3" },
  { index: adminRoutes.helpCenter(), path: adminRoutes.helpCenter(), icon: "QuestionFilled", title: "\u5E2E\u52A9\u4E2D\u5FC3" },
  { index: adminRoutes.messages(), path: adminRoutes.messages(), icon: "Message", title: "\u6D88\u606F\u53D1\u9001\u7BA1\u7406" },
  { index: adminRoutes.settings(), path: adminRoutes.settings(), icon: "Setting", title: "\u7CFB\u7EDF\u8BBE\u7F6E" }
];
const getPermissionMenuItems = () => {
  return ADMIN_MENU_ITEMS.filter((item) => item.index !== adminRoutes.home());
};

export { ADMIN_MENU_ITEMS as A, getPermissionMenuItems as g };
//# sourceMappingURL=admin-menu-Caw8tGCv.mjs.map
