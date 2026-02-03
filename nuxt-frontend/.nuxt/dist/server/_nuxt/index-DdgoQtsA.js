import { defineComponent, mergeProps, useSSRContext, ref, unref, computed } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { S as user_default, f as arrow_right_default, a5 as message_default, a7 as lock_default, x as delete_default, Y as switch_button_default, at as setting_default, j as circle_check_filled_default, T as wallet_default, ak as box_default, a as circle_check_default, s as service_default, U as list_default, V as ticket_default, W as star_default, am as headset_default, X as bell_default } from "./index-4qszPKX4.js";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { _ as _export_sfc } from "../server.mjs";
import { E as EditNicknameModal, C as ChangePasswordModal, a as ChangeEmailModal, D as DeleteAccountModal } from "./DeleteAccountModal-DIgRctBE.js";
import { R as RechargeModal } from "./RechargeModal-CpBOy_mm.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "./auth-BCuS92ob.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
/* empty css              */
/* empty css                    */
import "./virtual_public-CTq2VprR.js";
import "./virtual_public-FTeKDcap.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileWalletSheet",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    transactions: {},
    loading: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    };
    const parseType = (item) => {
      const type = item.type || "";
      if (type === "payment") return "消费";
      if (type === "recharge") return "充值";
      if (type === "refund") return "退款";
      return type || "变动";
    };
    const parseDescription = (item) => {
      if (item.description) return item.description;
      if (item.memo) return item.memo;
      if (item.type === "payment") return "商品购买";
      return "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-sheet-overlay" }, _attrs))} data-v-6bd398dc><div class="wallet-sheet-content" data-v-6bd398dc><div class="sheet-handle-bar" data-v-6bd398dc><div class="sheet-handle" data-v-6bd398dc></div></div><div class="sheet-header" data-v-6bd398dc><div class="sheet-title" data-v-6bd398dc>额度变动</div></div><div class="sheet-body" data-v-6bd398dc>`);
        if (__props.loading) {
          _push(`<div class="loading-state" data-v-6bd398dc><div class="loading-spinner" data-v-6bd398dc></div> 加载中... </div>`);
        } else if (__props.transactions.length > 0) {
          _push(`<div class="transaction-list" data-v-6bd398dc><!--[-->`);
          ssrRenderList(__props.transactions, (item, index2) => {
            _push(`<div class="transaction-item" data-v-6bd398dc><div class="t-left" data-v-6bd398dc><div class="t-main-text" data-v-6bd398dc>${ssrInterpolate(parseType(item))}</div><div class="t-sub-text" data-v-6bd398dc>${ssrInterpolate(parseDescription(item))}</div><div class="t-time" data-v-6bd398dc>${ssrInterpolate(formatDate(item.created_at))}</div></div><div class="t-right" data-v-6bd398dc><span class="${ssrRenderClass(["t-amount", Number(item.amount) >= 0 ? "text-green" : "text-red"])}" data-v-6bd398dc>${ssrInterpolate(Number(item.amount) > 0 ? "+" : "")}${ssrInterpolate(Number(item.amount).toFixed(2))}</span><span class="t-balance" data-v-6bd398dc>余额 ${ssrInterpolate(Number(item.balance_after).toFixed(2))}</span></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="empty-state" data-v-6bd398dc> 暂无变动记录 </div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/MobileWalletSheet.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileWalletSheet = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6bd398dc"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileSettingsSheet",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const userStore = useUserStore();
    const activeModal = ref(null);
    const handleSuccess = (msg) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-41646d86>`);
      if (__props.visible) {
        _push(`<div class="sheet-overlay" data-v-41646d86><div class="sheet-content" data-v-41646d86><div class="sheet-handle-bar" data-v-41646d86><div class="sheet-handle" data-v-41646d86></div></div><div class="sheet-header" data-v-41646d86><div class="sheet-title" data-v-41646d86>设置</div></div><div class="sheet-body" data-v-41646d86><div class="setting-group" data-v-41646d86><div class="group-title" data-v-41646d86>账号信息</div><div class="setting-item" data-v-41646d86><div class="item-left" data-v-41646d86>`);
        _push(ssrRenderComponent(unref(user_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-41646d86>修改昵称</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div><div class="setting-item" data-v-41646d86><div class="item-left" data-v-41646d86>`);
        _push(ssrRenderComponent(unref(message_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-41646d86>换绑邮箱</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div></div><div class="setting-group" data-v-41646d86><div class="group-title" data-v-41646d86>安全与隐私</div><div class="setting-item" data-v-41646d86><div class="item-left" data-v-41646d86>`);
        _push(ssrRenderComponent(unref(lock_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-41646d86>修改密码</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div><div class="setting-item" data-v-41646d86><div class="item-left" data-v-41646d86>`);
        _push(ssrRenderComponent(unref(delete_default), { class: "w-5 h-5 text-red-400" }, null, _parent));
        _push(`<span class="text-red-400" data-v-41646d86>注销账号</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div></div><div class="setting-group" data-v-41646d86><div class="setting-item logout-item" data-v-41646d86>`);
        _push(ssrRenderComponent(unref(switch_button_default), { class: "w-5 h-5" }, null, _parent));
        _push(`<span data-v-41646d86>退出登录</span></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": unref(userStore).user?.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess()
      }, null, _parent));
      _push(ssrRenderComponent(ChangePasswordModal, {
        visible: activeModal.value === "password",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess()
      }, null, _parent));
      _push(ssrRenderComponent(ChangeEmailModal, {
        visible: activeModal.value === "email",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess()
      }, null, _parent));
      _push(ssrRenderComponent(DeleteAccountModal, {
        visible: activeModal.value === "delete",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/MobileSettingsSheet.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileSettingsSheet = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-41646d86"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const userStore = useUserStore();
    const showWalletSheet = ref(false);
    const showSettings = ref(false);
    const showRecharge = ref(false);
    const loadingWallet = ref(false);
    const userInfo = computed(() => {
      const u = userStore.user;
      if (!u) return { nickname: "用户", avatar: "", uid: "---" };
      return {
        nickname: u.nickName || u.nickname || u.email?.split("@")[0] || "用户",
        avatar: u.avatar || "",
        uid: u.uid || u.id?.toString().slice(0, 8) || "---"
      };
    });
    const orderCounts = computed(() => {
      const pending = userStore.getOrdersByStatus("待支付").length;
      const paid = userStore.getOrdersByStatus("已发货").length;
      return { pending, paid };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-profile-minimal" }, _attrs))} data-v-bc89de50><div class="top-nav" data-v-bc89de50><div class="page-title" data-v-bc89de50>个人中心</div><button class="settings-btn" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(setting_default), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><div class="header-container" data-v-bc89de50><div class="member-card" data-v-bc89de50><div class="card-content" data-v-bc89de50><div class="avatar-wrap" data-v-bc89de50><img${ssrRenderAttr("src", userInfo.value.avatar || "/images/default-avatar.png")} class="avatar-img" data-v-bc89de50></div><div class="user-details" data-v-bc89de50><h1 class="username" data-v-bc89de50>${ssrInterpolate(userInfo.value.nickname)}</h1><div class="tags-row" data-v-bc89de50><div class="tag-pill blue-pill" data-v-bc89de50>FANTULA Member</div><div class="tag-pill green-pill" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(circle_check_filled_default), { class: "w-3 h-3 mr-1" }, null, _parent));
      _push(` 安全等级: 高 </div></div></div>`);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "card-arrow" }, null, _parent));
      _push(`</div><div class="card-glow" data-v-bc89de50></div></div></div><div class="section-card wallet-section" data-v-bc89de50><div class="wallet-background" data-v-bc89de50></div><div class="wallet-content" data-v-bc89de50><div class="wallet-left" data-v-bc89de50><div class="wallet-label" data-v-bc89de50>我的额度</div><div class="wallet-value" data-v-bc89de50>${ssrInterpolate(Number(unref(userStore).user?.balance || 0).toFixed(2))}</div></div><div class="wallet-actions" data-v-bc89de50><button class="action-btn primary-btn pill-btn" data-v-bc89de50>充值</button><button class="action-btn outline-btn pill-btn" data-v-bc89de50> 详情 </button></div></div></div><div class="section-card order-card" data-v-bc89de50><div class="card-header" data-v-bc89de50><span class="card-title" data-v-bc89de50>我的订单</span><div class="card-more" data-v-bc89de50> 全部订单 `);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-3 h-3 ml-1" }, null, _parent));
      _push(`</div></div><div class="order-grid" data-v-bc89de50><div class="order-item" data-v-bc89de50><div class="icon-wrap" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(wallet_default), { class: "w-6 h-6" }, null, _parent));
      if (orderCounts.value.pending > 0) {
        _push(`<div class="badge-dot" data-v-bc89de50>${ssrInterpolate(orderCounts.value.pending)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-bc89de50>待支付</span></div><div class="order-item" data-v-bc89de50><div class="icon-wrap" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(box_default), { class: "w-6 h-6" }, null, _parent));
      if (orderCounts.value.paid > 0) {
        _push(`<div class="badge-dot" data-v-bc89de50>${ssrInterpolate(orderCounts.value.paid)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-bc89de50>待发货</span></div><div class="order-item" data-v-bc89de50><div class="icon-wrap" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(circle_check_default), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><span class="order-label" data-v-bc89de50>已完成</span></div><div class="order-item" data-v-bc89de50><div class="icon-wrap" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(service_default), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><span class="order-label" data-v-bc89de50>售后</span></div></div></div><div class="menu-list-group" data-v-bc89de50><div class="menu-item" data-v-bc89de50><div class="menu-left" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(list_default), { class: "w-5 h-5 text-icon" }, null, _parent));
      _push(`<span class="menu-text" data-v-bc89de50>我的订单</span></div>`);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
      _push(`</div><div class="menu-item" data-v-bc89de50><div class="menu-left" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(ticket_default), { class: "w-5 h-5 text-icon" }, null, _parent));
      _push(`<span class="menu-text" data-v-bc89de50>兑换中心</span></div>`);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
      _push(`</div><div class="menu-item" data-v-bc89de50><div class="menu-left" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(star_default), { class: "w-5 h-5 text-icon" }, null, _parent));
      _push(`<span class="menu-text" data-v-bc89de50>我的收藏</span></div>`);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
      _push(`</div><div class="menu-item" data-v-bc89de50><div class="menu-left" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(headset_default), { class: "w-5 h-5 text-icon" }, null, _parent));
      _push(`<span class="menu-text" data-v-bc89de50>我的工单</span></div>`);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
      _push(`</div><div class="menu-item" data-v-bc89de50><div class="menu-left" data-v-bc89de50>`);
      _push(ssrRenderComponent(unref(bell_default), { class: "w-5 h-5 text-icon" }, null, _parent));
      _push(`<span class="menu-text" data-v-bc89de50>我的消息</span>`);
      if (unref(userStore).unreadMessageCount > 0) {
        _push(`<div class="list-dot" data-v-bc89de50></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(MobileWalletSheet, {
        visible: showWalletSheet.value,
        transactions: unref(userStore).transactions,
        loading: loadingWallet.value,
        onClose: ($event) => showWalletSheet.value = false
      }, null, _parent));
      _push(ssrRenderComponent(MobileSettingsSheet, {
        visible: showSettings.value,
        onClose: ($event) => showSettings.value = false
      }, null, _parent));
      _push(ssrRenderComponent(RechargeModal, {
        visible: showRecharge.value,
        onClose: ($event) => showRecharge.value = false,
        onSuccess: ($event) => unref(userStore).fetchUserInfo()
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc89de50"]]);
export {
  index as default
};
//# sourceMappingURL=index-DdgoQtsA.js.map
