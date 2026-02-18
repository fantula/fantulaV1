import { E as ElIcon } from "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
import { defineComponent, ref, computed, reactive, watch, unref, useSSRContext, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderAttrs } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { b as close_default, I as check_default, J as chat_dot_round_default, f as arrow_right_default, ak as document_copy_default } from "./index-DNnPa_Q9.js";
import { u as useUserStore, a as authApi } from "./user-CctDsbAN.js";
import { u as useNotify } from "./useNotify-QNEBBzdZ.js";
import { D as DEFAULT_AVATAR, S as SYSTEM_AVATARS } from "./constants-BRAeDQ6J.js";
import { E as EditNicknameModal, M as MobileChangePasswordModal, a as MobileDeleteAccountModal } from "./MobileDeleteAccountModal-Cu2Z7ugZ.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useSendCode } from "./useSendCode-Yi-n8MbA.js";
import { _ as _export_sfc } from "../server.mjs";
import { _ as __nuxt_component_0 } from "./BaseModal-nbvk9VuE.js";
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
/* empty css                    */
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-4aDAI7XP.js";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./supabase-F2pQZHm6.js";
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
import "./common-Bgv_wRgd.js";
import "./cart-CDhPH3qi.js";
import "./useToast-DsT-1f4c.js";
import "./index-BwQVtIp5.js";
import "./typescript-D6L75muK.js";
import "./icon-Ck0_dGQP.js";
import "./use-global-config-C5kRDPtv.js";
import "./index-DbvZsXcZ.js";
import "./event-D3FEo2C5.js";
import "./interval-BnEBQU8I.js";
import "./BaseButton-BnWAaIRO.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ChangeEmailModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const userStore = useUserStore();
    const step = ref(1);
    useNotify();
    const currentEmail = computed(() => userStore.user?.email);
    const oldCode = ref("");
    const form = reactive({
      email: "",
      code: ""
    });
    const isEmailValid = computed(() => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    });
    const canSubmit = computed(() => {
      return isEmailValid.value && form.code.length >= 4;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        step.value = currentEmail.value ? 1 : 2;
        oldCode.value = "";
        form.email = "";
        form.code = "";
      }
    });
    const {
      loading: oldLoading,
      countdown: oldCountdown
    } = useSendCode({ timerKey: "otp_security_timer" });
    const {
      loading: newLoading,
      countdown: newCountdown
    } = useSendCode({ timerKey: "otp_bind_new_timer_end" });
    watch(() => props.visible, (val) => {
    });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || oldLoading.value || newLoading.value);
    const countdown = computed(() => step.value === 1 ? oldCountdown.value : newCountdown.value);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-921fe21d><div class="modal-content aurora-modal-panel" data-v-921fe21d><div class="modal-header" data-v-921fe21d><h3 class="modal-title" data-v-921fe21d>${ssrInterpolate(step.value === 1 && currentEmail.value ? "验证原邮箱" : "绑定新邮箱")}</h3><button class="close-btn" data-v-921fe21d>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-921fe21d>`);
          if (currentEmail.value && step.value === 1) {
            _push2(`<!--[--><div class="alert-box" data-v-921fe21d> 为了您的账号安全，请先验证当前邮箱。 </div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>当前邮箱</label><input${ssrRenderAttr("value", currentEmail.value)} disabled class="aurora-input disabled-input" style="${ssrRenderStyle({ "color": "#94A3B8" })}" data-v-921fe21d></div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>验证码</label><div class="input-row" data-v-921fe21d><input${ssrRenderAttr("value", oldCode.value)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-921fe21d><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-921fe21d>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || oldCode.value.length < 4) ? " disabled" : ""} data-v-921fe21d>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-921fe21d></div>`);
            } else {
              _push2(`<span data-v-921fe21d>下一步</span>`);
            }
            _push2(`</button><!--]-->`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-921fe21d><label data-v-921fe21d>新邮箱地址</label><input${ssrRenderAttr("value", form.email)} type="email" class="aurora-input" placeholder="请输入新邮箱" data-v-921fe21d></div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>验证码</label><div class="input-row" data-v-921fe21d><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="新邮箱验证码" maxlength="6" data-v-921fe21d><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value || !isEmailValid.value) ? " disabled" : ""} data-v-921fe21d>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-921fe21d>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-921fe21d></div>`);
            } else {
              _push2(`<span data-v-921fe21d>确认绑定</span>`);
            }
            _push2(`</button><!--]-->`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/ChangeEmailModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ChangeEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-921fe21d"]]);
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
    const emit = __emit;
    const userStore = useUserStore();
    const { success, error } = useNotify();
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
    const handleClose = () => {
      emit("close");
    };
    const selectAvatar = (url) => {
      selectedAvatar.value = url;
    };
    const handleImageError = (e) => {
      e.target.src = defaultAvatar;
    };
    const handleConfirm = async () => {
      if (!hasChange.value) return;
      loading.value = true;
      try {
        const res = await userStore.updateProfile({ avatar: selectedAvatar.value });
        if (res.success) {
          success("头像修改成功");
          emit("success");
          handleClose();
        } else {
          error(res.message || "修改失败");
        }
      } catch (e) {
        error("操作失败");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(__nuxt_component_0, mergeProps({
        visible: __props.visible,
        title: "修改头像",
        width: "340px",
        "confirm-text": "保存修改",
        loading: loading.value,
        "confirm-disabled": !hasChange.value,
        "onUpdate:visible": handleClose,
        onClose: handleClose,
        onConfirm: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="current-avatar-section" data-v-5c7b9895${_scopeId}><div class="avatar-wrapper" data-v-5c7b9895${_scopeId}><img${ssrRenderAttr("src", __props.currentAvatar || unref(defaultAvatar))} class="current-img" data-v-5c7b9895${_scopeId}></div><p class="section-label" data-v-5c7b9895${_scopeId}>当前头像</p></div><div class="system-avatars-section" data-v-5c7b9895${_scopeId}><p class="section-label align-left" data-v-5c7b9895${_scopeId}>系统推荐</p><div class="avatar-grid" data-v-5c7b9895${_scopeId}><!--[-->`);
            ssrRenderList(unref(presetAvatars), (url, index2) => {
              _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-5c7b9895${_scopeId}><img${ssrRenderAttr("src", url)} class="grid-img" loading="lazy" data-v-5c7b9895${_scopeId}>`);
              if (selectedAvatar.value === url) {
                _push2(`<div class="active-overlay" data-v-5c7b9895${_scopeId}>`);
                _push2(ssrRenderComponent(unref(check_default), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "current-avatar-section" }, [
                createVNode("div", { class: "avatar-wrapper" }, [
                  createVNode("img", {
                    src: __props.currentAvatar || unref(defaultAvatar),
                    class: "current-img",
                    onError: handleImageError
                  }, null, 40, ["src"])
                ]),
                createVNode("p", { class: "section-label" }, "当前头像")
              ]),
              createVNode("div", { class: "system-avatars-section" }, [
                createVNode("p", { class: "section-label align-left" }, "系统推荐"),
                createVNode("div", { class: "avatar-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(presetAvatars), (url, index2) => {
                    return openBlock(), createBlock("div", {
                      key: index2,
                      class: ["avatar-item", { active: selectedAvatar.value === url }],
                      onClick: ($event) => selectAvatar(url)
                    }, [
                      createVNode("img", {
                        src: url,
                        class: "grid-img",
                        loading: "lazy"
                      }, null, 8, ["src"]),
                      selectedAvatar.value === url ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "active-overlay"
                      }, [
                        createVNode(unref(check_default), { class: "w-4 h-4" })
                      ])) : createCommentVNode("", true)
                    ], 10, ["onClick"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/SelectAvatarModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SelectAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5c7b9895"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WechatBindModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const userStore = useUserStore();
    const loading = ref(false);
    const isBound = computed(() => {
      return !!userStore.user?.openId;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-8e248bac><div class="modal-content aurora-modal-panel" data-v-8e248bac><div class="modal-header" data-v-8e248bac><h3 class="modal-title" data-v-8e248bac>微信绑定</h3><button class="close-btn" data-v-8e248bac>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-8e248bac><div class="${ssrRenderClass([{ bound: isBound.value }, "bind-status-card"])}" data-v-8e248bac><div class="icon-wrapper" data-v-8e248bac>`);
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
          _push2(`</div><div class="status-info" data-v-8e248bac><p class="status-title" data-v-8e248bac>${ssrInterpolate(isBound.value ? "已绑定微信" : "未绑定微信")}</p>`);
          if (isBound.value) {
            _push2(`<p class="status-desc" data-v-8e248bac> 当前账号已关联微信，可用于快速登录 </p>`);
          } else {
            _push2(`<p class="status-desc" data-v-8e248bac> 绑定微信后可使用微信快速登录 </p>`);
          }
          _push2(`</div></div>`);
          if (isBound.value) {
            _push2(`<div class="action-section" data-v-8e248bac><p class="tip-text" data-v-8e248bac>如需更换绑定，请先解除当前绑定</p></div>`);
          } else {
            _push2(`<div class="action-section" data-v-8e248bac><p class="tip-text" data-v-8e248bac>绑定微信后可使用微信快速登录</p></div>`);
          }
          _push2(`</div><div class="modal-footer" data-v-8e248bac>`);
          if (isBound.value) {
            _push2(`<div class="footer-actions" data-v-8e248bac><button class="submit-btn unbind-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-8e248bac>${ssrInterpolate(loading.value ? "处理中..." : "解除绑定")}</button></div>`);
          } else {
            _push2(`<button class="submit-btn" data-v-8e248bac> 立即绑定 </button>`);
          }
          _push2(`</div></div></div>`);
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
const WechatBindModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8e248bac"]]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-77cd9905>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "账号设置" }, null, _parent));
      _push(`<div class="settings-content" data-v-77cd9905><div class="setting-container" data-v-77cd9905><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>头像</span></div><div class="right" data-v-77cd9905><img${ssrRenderAttr("src", unref(userStore).user?.avatar || unref(DEFAULT_AVATAR))} class="avatar-img" data-v-77cd9905>`);
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
      _push(`</div></div><div class="divider" data-v-77cd9905></div><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>昵称</span></div><div class="right" data-v-77cd9905><span class="value" data-v-77cd9905>${ssrInterpolate(unref(userStore).user?.nickName || "未设置")}</span>`);
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
      _push(`</div></div><div class="divider" data-v-77cd9905></div><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>UID</span></div><div class="right" data-v-77cd9905><span class="value uid-text" data-v-77cd9905>${ssrInterpolate(unref(userStore).user?.uid || unref(userStore).user?.id)}</span>`);
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
      _push(`</div></div></div><h3 class="group-title" data-v-77cd9905>账号安全</h3><div class="setting-container" data-v-77cd9905><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>微信绑定</span></div><div class="right" data-v-77cd9905><span class="value" data-v-77cd9905>${ssrInterpolate(unref(userStore).user?.openId ? "已绑定" : "未绑定")}</span>`);
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
      _push(`</div></div><div class="setting-item" data-v-77cd9905><span class="label" data-v-77cd9905>邮箱</span><div class="value-wrap" data-v-77cd9905><span class="text-val" data-v-77cd9905>${ssrInterpolate(unref(userStore).user?.email)}</span>`);
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
      _push(`</div></div><div class="setting-item" data-v-77cd9905><span class="label" data-v-77cd9905>登录密码</span><div class="value-wrap" data-v-77cd9905><span class="text-val muted" data-v-77cd9905>修改</span>`);
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
      _push(`</div></div></div><div class="setting-container" data-v-77cd9905><div class="setting-item" data-v-77cd9905><span class="label text-danger" data-v-77cd9905>注销账号</span><div class="value-wrap" data-v-77cd9905>`);
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
      _push(`</div></div></div><div class="action-group" data-v-77cd9905><button class="logout-btn" data-v-77cd9905>退出登录</button></div></div>`);
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": unref(userStore).user?.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("昵称已更新")
      }, null, _parent));
      _push(ssrRenderComponent(ChangeEmailModal, {
        visible: activeModal.value === "email",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("邮箱已修改")
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77cd9905"]]);
export {
  index as default
};
//# sourceMappingURL=index-CoS_ipkl.js.map
