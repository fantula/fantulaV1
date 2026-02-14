import { E as ElIcon } from "./index-D6MDXFfa.js";
/* empty css              */
import { defineComponent, unref, useSSRContext, ref, computed, watch, withCtx, createVNode, mergeProps } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { f as close_default, M as check_default, a1 as chat_dot_round_default, m as arrow_right_default, aB as document_copy_default } from "./index-CRs4T-Jf.js";
import { u as useUserStore, a as authApi } from "./user-B9FaDvHc.js";
import { u as useNotify } from "./useNotify-CME3DTm8.js";
import { D as DEFAULT_AVATAR, S as SYSTEM_AVATARS } from "./constants-BRAeDQ6J.js";
import { E as EditNicknameModal, M as MobileChangePasswordModal, a as MobileDeleteAccountModal } from "./MobileDeleteAccountModal-lDBIDVVv.js";
import { _ as _export_sfc } from "../server.mjs";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-BBaO6M-A.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-CK1iG7c1.js";
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "./event-D3FEo2C5.js";
import "./useSendCode-_fPnCB3O.js";
import "./interval-BnEBQU8I.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MobileLogoutModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    loading: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-469dacb3><div class="modal-content aurora-modal-panel" data-v-469dacb3><div class="modal-header" data-v-469dacb3><h3 class="modal-title text-danger" data-v-469dacb3>退出登录</h3><button class="close-btn" data-v-469dacb3>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-469dacb3><p class="confirm-text" data-v-469dacb3>确定要退出当前账号吗？</p></div><div class="modal-footer" data-v-469dacb3><button class="cancel-btn" data-v-469dacb3>取消</button><button class="save-btn btn-danger" data-v-469dacb3>`);
          if (__props.loading) {
            _push2(`<span class="spinner" data-v-469dacb3></span>`);
          } else {
            _push2(`<span data-v-469dacb3>确认退出</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/MobileLogoutModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileLogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-469dacb3"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SelectAvatarModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentAvatar: {}
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useUserStore();
    useNotify();
    const loading = ref(false);
    const selectedAvatar = ref("");
    const defaultAvatar = DEFAULT_AVATAR;
    const presetAvatars = SYSTEM_AVATARS;
    const hasChange = computed(() => {
      return selectedAvatar.value && selectedAvatar.value !== props.currentAvatar;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        selectedAvatar.value = props.currentAvatar || "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-1847c0d8><div class="modal-content aurora-modal-panel" data-v-1847c0d8><div class="modal-header" data-v-1847c0d8><h3 class="modal-title" data-v-1847c0d8>修改头像</h3><button class="close-btn" data-v-1847c0d8>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-1847c0d8><div class="current-avatar-section" data-v-1847c0d8><div class="avatar-wrapper" data-v-1847c0d8><img${ssrRenderAttr("src", __props.currentAvatar || unref(defaultAvatar))} class="current-img" data-v-1847c0d8></div><p class="section-label" data-v-1847c0d8>当前头像</p></div><div class="system-avatars-section" data-v-1847c0d8><p class="section-label align-left" data-v-1847c0d8>系统推荐</p><div class="avatar-grid" data-v-1847c0d8><!--[-->`);
          ssrRenderList(unref(presetAvatars), (url, index2) => {
            _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-1847c0d8><img${ssrRenderAttr("src", url)} class="grid-img" loading="lazy" data-v-1847c0d8>`);
            if (selectedAvatar.value === url) {
              _push2(`<div class="active-overlay" data-v-1847c0d8>`);
              _push2(ssrRenderComponent(unref(check_default), { class: "w-4 h-4" }, null, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div></div><div class="modal-footer" data-v-1847c0d8><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !hasChange.value) ? " disabled" : ""} data-v-1847c0d8>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-1847c0d8></span>`);
          } else {
            _push2(`<span data-v-1847c0d8>保存修改</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/SelectAvatarModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SelectAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1847c0d8"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WechatBindModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const userStore = useUserStore();
    const isBound = computed(() => {
      return !!userStore.user?.openId;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-4a3ba7cb><div class="modal-content aurora-modal-panel" data-v-4a3ba7cb><div class="modal-header" data-v-4a3ba7cb><h3 class="modal-title" data-v-4a3ba7cb>微信绑定</h3><button class="close-btn" data-v-4a3ba7cb>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-4a3ba7cb><div class="${ssrRenderClass([{ bound: isBound.value }, "bind-status-card"])}" data-v-4a3ba7cb><div class="icon-wrapper" data-v-4a3ba7cb>`);
          _push2(ssrRenderComponent(_component_el_icon, {
            size: 32,
            color: "#fff"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(chat_dot_round_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="status-info" data-v-4a3ba7cb><p class="status-title" data-v-4a3ba7cb>${ssrInterpolate(isBound.value ? "已绑定微信" : "未绑定微信")}</p>`);
          if (isBound.value) {
            _push2(`<p class="status-desc" data-v-4a3ba7cb> 当前账号已关联微信，可用于快速登录 </p>`);
          } else {
            _push2(`<p class="status-desc" data-v-4a3ba7cb> 绑定微信后可使用微信快速登录 </p>`);
          }
          _push2(`</div></div>`);
          if (isBound.value) {
            _push2(`<div class="action-section" data-v-4a3ba7cb><p class="tip-text" data-v-4a3ba7cb>如需更换绑定，请在PC端操作或联系客服</p></div>`);
          } else {
            _push2(`<div class="action-section" data-v-4a3ba7cb><p class="tip-text" data-v-4a3ba7cb>请在登录页或PC端进行微信绑定</p></div>`);
          }
          _push2(`</div><div class="modal-footer" data-v-4a3ba7cb><button class="submit-btn" data-v-4a3ba7cb> 知道了 </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/WechatBindModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WechatBindModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4a3ba7cb"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const loading = ref(false);
    const activeModal = ref(null);
    const { success } = useNotify();
    const handleSuccess = (msg) => {
      success(msg);
      userStore.fetchUserInfo();
    };
    const handleLogoutConfirm = async () => {
      loading.value = true;
      try {
        await authApi.logout();
      } catch (e) {
        console.error("Logout API failed:", e);
      } finally {
        userStore.logout();
        router.replace("/mobile");
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-a7d12182>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "账号设置" }, null, _parent));
      _push(`<div class="settings-content" data-v-a7d12182><div class="setting-container" data-v-a7d12182><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>头像</span></div><div class="right" data-v-a7d12182><img${ssrRenderAttr("src", unref(userStore).user?.avatar || unref(DEFAULT_AVATAR))} class="avatar-img" data-v-a7d12182>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="divider" data-v-a7d12182></div><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>昵称</span></div><div class="right" data-v-a7d12182><span class="value" data-v-a7d12182>${ssrInterpolate(unref(userStore).user?.nickName || "未设置")}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="divider" data-v-a7d12182></div><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>UID</span></div><div class="right" data-v-a7d12182><span class="value uid-text" data-v-a7d12182>${ssrInterpolate(unref(userStore).user?.uid || unref(userStore).user?.id)}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(document_copy_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(document_copy_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><h3 class="group-title" data-v-a7d12182>账号安全</h3><div class="setting-container" data-v-a7d12182><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>微信绑定</span></div><div class="right" data-v-a7d12182><span class="value" data-v-a7d12182>${ssrInterpolate(unref(userStore).user?.openId ? "已绑定" : "未绑定")}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="setting-item" data-v-a7d12182><span class="label" data-v-a7d12182>邮箱</span><div class="value-wrap" data-v-a7d12182><span class="text-val" data-v-a7d12182>${ssrInterpolate(unref(userStore).user?.email)}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="setting-item" data-v-a7d12182><span class="label" data-v-a7d12182>登录密码</span><div class="value-wrap" data-v-a7d12182><span class="text-val muted" data-v-a7d12182>修改</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="setting-container" data-v-a7d12182><div class="setting-item" data-v-a7d12182><span class="label text-danger" data-v-a7d12182>注销账号</span><div class="value-wrap" data-v-a7d12182>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="action-group" data-v-a7d12182><button class="logout-btn" data-v-a7d12182>退出登录</button></div></div>`);
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": unref(userStore).user?.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("昵称已更新")
      }, null, _parent));
      _push(ssrRenderComponent(MobileChangePasswordModal, {
        visible: activeModal.value === "password",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("密码已修改")
      }, null, _parent));
      _push(ssrRenderComponent(MobileDeleteAccountModal, {
        visible: activeModal.value === "delete",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(ssrRenderComponent(MobileLogoutModal, {
        visible: activeModal.value === "logout",
        loading: loading.value,
        onClose: ($event) => activeModal.value = null,
        onConfirm: handleLogoutConfirm
      }, null, _parent));
      _push(ssrRenderComponent(SelectAvatarModal, {
        visible: activeModal.value === "avatar",
        "current-avatar": unref(userStore).user?.avatar,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("头像已更新")
      }, null, _parent));
      _push(ssrRenderComponent(WechatBindModal, {
        visible: activeModal.value === "wechat",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7d12182"]]);
export {
  index as default
};
//# sourceMappingURL=index-BVEClLjI.js.map
