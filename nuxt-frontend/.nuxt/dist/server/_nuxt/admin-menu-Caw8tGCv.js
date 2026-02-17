import { b as adminRoutes } from "./admin-routes-C0qcXhse.js";
const ADMIN_MENU_ITEMS = [
  { index: adminRoutes.home(), path: adminRoutes.home(), icon: "Odometer", title: "仪表盘" },
  { index: adminRoutes.orders(), path: adminRoutes.orders(), icon: "List", title: "订单管理" },
  { index: adminRoutes.products(), path: adminRoutes.products(), icon: "Goods", title: "商品管理" },
  { index: adminRoutes.cdk(), path: adminRoutes.cdk(), icon: "Key", title: "CDK管理" },
  { index: adminRoutes.coupons(), path: adminRoutes.coupons(), icon: "Ticket", title: "优惠券管理" },
  { index: adminRoutes.users(), path: adminRoutes.users(), icon: "User", title: "用户管理", spacing: true },
  { index: adminRoutes.tickets(), path: adminRoutes.tickets(), icon: "Service", title: "工单管理" },
  { index: adminRoutes.recharge(), path: adminRoutes.recharge(), icon: "Money", title: "充值管理" },
  { index: adminRoutes.media(), path: adminRoutes.media(), icon: "Picture", title: "媒体中心" },
  { index: adminRoutes.helpCenter(), path: adminRoutes.helpCenter(), icon: "QuestionFilled", title: "帮助中心" },
  { index: adminRoutes.messages(), path: adminRoutes.messages(), icon: "Message", title: "消息发送管理" },
  { index: adminRoutes.settings(), path: adminRoutes.settings(), icon: "Setting", title: "系统设置" }
];
const getPermissionMenuItems = () => {
  return ADMIN_MENU_ITEMS.filter((item) => item.index !== adminRoutes.home());
};
export {
  ADMIN_MENU_ITEMS as A,
  getPermissionMenuItems as g
};
//# sourceMappingURL=admin-menu-Caw8tGCv.js.map
