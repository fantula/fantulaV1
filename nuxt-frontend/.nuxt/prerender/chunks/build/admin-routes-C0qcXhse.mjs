const ADMIN_PREFIX = "/manager_portal";
const adminRoute = (path = "") => {
  if (!path) return ADMIN_PREFIX;
  return `${ADMIN_PREFIX}/${path}`;
};
const adminRoutes = {
  // 核心
  home: () => adminRoute(),
  login: () => adminRoute("login"),
  // 订单管理
  orders: () => adminRoute("orders"),
  ordersShare: () => adminRoute("orders/share"),
  ordersCdkey: () => adminRoute("orders/cdkey"),
  ordersRecharge: () => adminRoute("orders/recharge"),
  // 商品管理
  products: () => adminRoute("products"),
  productEdit: () => adminRoute("products/edit"),
  productSpecs: (id) => adminRoute(`products/specs/${id}`),
  // CDK 管理
  cdk: () => adminRoute("cdk"),
  cdkVirtual: () => adminRoute("cdk/virtual"),
  cdkAccounts: () => adminRoute("cdk/accounts"),
  cdkKeys: () => adminRoute("cdk/keys"),
  cdkCdks: () => adminRoute("cdk/cdks"),
  cdkChannelRecognition: () => adminRoute("cdk/channel-recognition"),
  cdkPost: () => adminRoute("cdk/post"),
  cdkEdit: (id) => adminRoute(`cdk/edit/${id}`),
  // 优惠券管理
  coupons: () => adminRoute("coupons"),
  couponsFlat: () => adminRoute("coupons/flat"),
  couponsFlatPost: () => adminRoute("coupons/flat/post"),
  couponsProduct: () => adminRoute("coupons/product"),
  couponsProductPost: () => adminRoute("coupons/product/post"),
  couponsBalance: () => adminRoute("coupons/balance"),
  couponsBalancePost: () => adminRoute("coupons/balance/post"),
  // 用户管理
  users: () => adminRoute("users"),
  usersAccounts: () => adminRoute("users/accounts"),
  // 工单管理
  tickets: () => adminRoute("tickets"),
  // 充值管理
  recharge: () => adminRoute("recharge"),
  rechargeManual: () => adminRoute("recharge/manual"),
  rechargeRecords: () => adminRoute("recharge/records"),
  // 媒体中心
  media: () => adminRoute("media"),
  // 文章管理
  article: () => adminRoute("article"),
  articlePost: () => adminRoute("article/post"),
  // 帮助中心
  helpCenter: () => adminRoute("help-center"),
  helpCenterFaq: () => adminRoute("help-center/faq"),
  helpCenterFaqPost: () => adminRoute("help-center/faq/post"),
  helpCenterArticles: () => adminRoute("help-center/articles"),
  helpCenterArticlesPost: () => adminRoute("help-center/articles/post"),
  // 消息管理
  messages: () => adminRoute("messages"),
  // 系统设置
  settings: () => adminRoute("backend-settings"),
  settingsNotification: () => adminRoute("backend-settings/notification"),
  settingsNotificationTemplate: (id) => adminRoute(`backend-settings/notification/template/${id}`)
};

export { adminRoute as a, adminRoutes as b };
//# sourceMappingURL=admin-routes-C0qcXhse.mjs.map
