import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, withDirectives, withKeys, vModelText, reactive, createTextVNode, toDisplayString, vModelCheckbox } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
/* empty css                    */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { a as authApi, u as useUserStore } from "./user-DLDq0pTF.js";
import { A as user_filled_default, I as check_default, J as chat_dot_round_default, l as loading_default, K as connection_default, L as select_default, M as refresh_default, N as camera_default, a as circle_check_default, O as edit_default, P as credit_card_default, Q as copy_document_default, R as message_default, S as edit_pen_default, T as lock_default, U as key_default, f as arrow_right_default, v as warning_default } from "./index-CCIZH4aC.js";
import { S as SYSTEM_AVATARS, D as DEFAULT_AVATAR } from "./constants-BRAeDQ6J.js";
import { B as BaseFormModal } from "./BaseFormModal-DYj1g7Mq.js";
import { E as ElMessage } from "./index-CIurcsSv.js";
import { _ as _export_sfc } from "../server.mjs";
import { S as SendCodeButton } from "./SendCodeButton-BHMZfVap.js";
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
import { u as useSendCode } from "./useSendCode-CIzwVzrG.js";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { w as wechatLoginApi } from "./wechat-login-DYkcuR5o.js";
import { s as setInterval } from "./interval-BnEBQU8I.js";
import { E as ElMessageBox } from "./index-C2vl4wFZ.js";
import { _ as __nuxt_component_0 } from "./BaseModal-nbvk9VuE.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
import "./typescript-D6L75muK.js";
import "./icon-CadSVx0p.js";
import "./use-global-config-CaR6i8cb.js";
import "./index-C1njJNPQ.js";
import "./event-D3FEo2C5.js";
import "./useNotify-Bx9I1ZGd.js";
import "./useToast-DsT-1f4c.js";
import "./index-BmUjCntg.js";
import "./use-form-item-BJm4fR6K.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-Q1HnLtiN.js";
import "./event-BZTOGHfp.js";
import "./index-DqrhOzxH.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "./index-BxcbCFKt.js";
import "./vnode-uc6o_sOa.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./validator-BiwSbFK3.js";
import "./index-COtmEGfB.js";
import "./scroll-ozMyDWSO.js";
import "./raf-CQRaPAjg.js";
const CLIENT_MESSAGES = {
  // 1. 个人中心 & 账号 (Profile & Auth)
  PROFILE: {
    AVATAR_UPDATE: "好耶～新头像生效啦",
    AVATAR_FAIL: "呜…没换成功，再试试？",
    NICKNAME_UPDATE: "我已经记住啦",
    NICKNAME_FAIL: "没改成功呢，再试试？",
    UID_COPY: "UID 帮你复制好啦",
    LOGOUT_FAIL: "还不能离开我呢，稍后再试吧"
  },
  NICKNAME_MODAL: {
    SUCCESS: "新名字我记下了",
    FAIL: "没改成功呢，再试试？"
  },
  PASSWORD_MODAL: {
    CODE_SENT: "验证码已经送过去啦",
    SEND_FAIL: "没送出去…稍后再试试吧",
    VERIFY_FAIL: "好像输错了，再检查一下吧",
    SUCCESS: "密码更新完成，我记住了",
    SAME_PASSWORD: "密码和之前一样哦",
    FAIL: "更新失败了，稍后再试吧"
  },
  EMAIL_MODAL: {
    CODE_SENT: "已发送到邮箱啦，快去看看",
    VERIFY_SUCCESS: "验证完成啦",
    SAME_EMAIL: "这个邮箱已经在用了哦",
    // Same as current user
    EMAIL_OCCUPIED: "这个邮箱被别人先绑定了",
    CONFIRM_SENT: "已发到新邮箱，记得确认哦"
  },
  DELETE_MODAL: {
    CODE_SENT: "验证码已经发给你了",
    CODE_ERROR: "不对不对，再检查下吧"
  },
  // 共享逻辑 (Shared)
  SHARE: {
    COPY_WX_SUCCESS: "微信号已复制到剪贴板"
    // Keep standard or update? User didn't specify JoinUsModal in 2nd request but listed in inventory. Let's keep specific ones or default. 
    // Wait, user provided "UID已复制" -> "UID 帮你复制好啦". 
    // JoinUsModal was in inventory but user skipped it in the reply? 
    // I will stick to what user provided explicitly.
  },
  // 2. 交易 & 支付 (Transaction & Pay)
  WALLET: {
    SYNC_SUCCESS: "余额已经更新啦",
    SYNC_FAIL: "没同步成功，再试试吧"
  },
  COUPON: {
    GET_SUCCESS: "优惠到手啦"
  },
  PAY: {
    SUCCESS: "付完了！去订单看看"
  },
  // 3. 全局通用 (Global)
  GLOBAL: {
    UNKNOWN_ERROR: "出了一点小问题…稍后再试吧",
    NETWORK_ERROR: "网络好像不太顺畅呢"
  }
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ChangeAvatarModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentAvatar: {},
    loading: { type: Boolean }
  },
  emits: ["update:visible", "close", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const loading = ref(false);
    const previewLoading = ref(false);
    const selectedAvatar = ref("");
    const previewAvatar = ref("");
    const selectSystemAvatar = (url) => {
      selectedAvatar.value = url;
      previewAvatar.value = url;
    };
    const presetAvatars = SYSTEM_AVATARS;
    const displayAvatar = computed(() => {
      return previewAvatar.value || props.currentAvatar;
    });
    const hasChange = computed(() => {
      return !!selectedAvatar.value;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        selectedAvatar.value = "";
        previewAvatar.value = "";
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const handleImageError = (e) => {
      e.target.src = DEFAULT_AVATAR;
    };
    const handleConfirm = async () => {
      if (!hasChange.value || loading.value) return;
      loading.value = true;
      let finalUrl = selectedAvatar.value || props.currentAvatar || "";
      try {
        const res = await authApi.updateProfile({ avatar: finalUrl });
        if (res.success) {
          ElMessage.success("头像修改成功");
          emit("update", finalUrl);
          handleClose();
        } else {
          ElMessage.error(res.msg || "修改失败");
        }
      } catch (e) {
        console.error(e);
        ElMessage.error(e.message || "操作失败");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "修改头像",
        width: "560px",
        "submit-text": "保存修改",
        loading: loading.value,
        "submit-disabled": !hasChange.value,
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        onSubmit: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="avatar-preview-section" data-v-74a503d7${_scopeId}><div class="preview-wrapper" data-v-74a503d7${_scopeId}>`);
            if (previewLoading.value) {
              _push2(`<div class="preview-skeleton" data-v-74a503d7${_scopeId}></div>`);
            } else if (displayAvatar.value) {
              _push2(`<img${ssrRenderAttr("src", displayAvatar.value)} class="preview-avatar" data-v-74a503d7${_scopeId}>`);
            } else {
              _push2(`<div class="preview-avatar-placeholder" data-v-74a503d7${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { size: 48 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(user_filled_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(user_filled_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="system-avatars-section" data-v-74a503d7${_scopeId}><div class="section-title" data-v-74a503d7${_scopeId}>系统推荐头像</div><div class="avatar-grid" data-v-74a503d7${_scopeId}><!--[-->`);
            ssrRenderList(unref(presetAvatars), (url, index) => {
              _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-74a503d7${_scopeId}><img${ssrRenderAttr("src", url)} class="system-avatar-img" loading="lazy" data-v-74a503d7${_scopeId}>`);
              if (selectedAvatar.value === url) {
                _push2(`<div class="active-overlay" data-v-74a503d7${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(check_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(check_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "avatar-preview-section" }, [
                createVNode("div", { class: "preview-wrapper" }, [
                  previewLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "preview-skeleton"
                  })) : displayAvatar.value ? (openBlock(), createBlock("img", {
                    key: 1,
                    src: displayAvatar.value,
                    class: "preview-avatar",
                    onError: handleImageError
                  }, null, 40, ["src"])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "preview-avatar-placeholder"
                  }, [
                    createVNode(_component_el_icon, { size: 48 }, {
                      default: withCtx(() => [
                        createVNode(unref(user_filled_default))
                      ]),
                      _: 1
                    })
                  ]))
                ])
              ]),
              createVNode("div", { class: "system-avatars-section" }, [
                createVNode("div", { class: "section-title" }, "系统推荐头像"),
                createVNode("div", { class: "avatar-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(presetAvatars), (url, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: ["avatar-item", { active: selectedAvatar.value === url }],
                      onClick: ($event) => selectSystemAvatar(url)
                    }, [
                      createVNode("img", {
                        src: url,
                        class: "system-avatar-img",
                        loading: "lazy"
                      }, null, 8, ["src"]),
                      selectedAvatar.value === url ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "active-overlay"
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        })
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ChangeAvatarModal.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const ChangeAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-74a503d7"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ChangeNicknameModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentNickname: {}
  },
  emits: ["update:visible", "close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const loading = ref(false);
    const inputValue = ref("");
    const canSubmit = computed(() => {
      const len = inputValue.value.trim().length;
      return len >= 2 && len <= 20;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        inputValue.value = props.currentNickname || "";
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const handleConfirm = async () => {
      if (!canSubmit.value || loading.value) return;
      const newValue = inputValue.value.trim();
      if (newValue === props.currentNickname) {
        handleClose();
        return;
      }
      loading.value = true;
      try {
        const res = await authApi.updateProfile({ nickname: newValue });
        if (res.success) {
          ElMessage.success("昵称修改成功");
          emit("success", newValue);
          handleClose();
        } else {
          ElMessage.error(res.msg || "修改失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "修改失败");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "修改昵称",
        loading: loading.value,
        "submit-text": "确认修改",
        "submit-disabled": !canSubmit.value,
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        onSubmit: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-group" data-v-f8a86f5b${_scopeId}><label class="form-label" data-v-f8a86f5b${_scopeId}>新昵称</label><input${ssrRenderAttr("value", inputValue.value)} class="form-input" placeholder="请输入新的昵称" maxlength="20" data-v-f8a86f5b${_scopeId}><div class="form-tip" data-v-f8a86f5b${_scopeId}>昵称支持中英文、数字，长度2-20位</div></div>`);
          } else {
            return [
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "新昵称"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => inputValue.value = $event,
                  class: "form-input",
                  placeholder: "请输入新的昵称",
                  maxlength: "20",
                  onKeyup: withKeys(handleConfirm, ["enter"])
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, inputValue.value]
                ]),
                createVNode("div", { class: "form-tip" }, "昵称支持中英文、数字，长度2-20位")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ChangeNicknameModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ChangeNicknameModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f8a86f5b"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BindEmailModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentEmail: {}
  },
  emits: ["update:visible", "close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const step = ref(1);
    const {
      loading: oldLoading,
      countdown: oldCountdown,
      sendCode: sendOldOtp
    } = useSendCode({ timerKey: "otp_security_timer" });
    const {
      loading: newLoading,
      countdown: newCountdown,
      sendCode: sendNewOtp
    } = useSendCode({ timerKey: "otp_bind_new_timer_end" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || oldLoading.value || newLoading.value);
    const countdown = computed(() => step.value === 1 ? oldCountdown.value : newCountdown.value);
    const oldCode = ref("");
    const form = reactive({
      email: "",
      code: ""
    });
    const isEmailValid = computed(() => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    });
    const canSubmit = computed(() => {
      if (props.currentEmail && step.value === 1) return false;
      return isEmailValid.value && form.code.length >= 4;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        step.value = props.currentEmail ? 1 : 2;
        oldCode.value = "";
        form.email = "";
        form.code = "";
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const sendOldCode = async () => {
      if (!props.currentEmail) return;
      await sendOldOtp(props.currentEmail);
    };
    const verifyOldEmail = async () => {
      if (!props.currentEmail || !oldCode.value) return;
      baseLoading.value = true;
      try {
        const res = await authApi.verifyOtp(props.currentEmail, oldCode.value);
        if (res.success) {
          ElMessage.success("当前邮箱验证通过");
          step.value = 2;
        } else {
          ElMessage.error(res.msg || "验证码错误");
        }
      } catch (e) {
        ElMessage.error(e.message || "验证失败");
      } finally {
        baseLoading.value = false;
      }
    };
    const sendNewCode = async () => {
      if (!isEmailValid.value) return;
      try {
        const checkRes = await authApi.checkEmailAvailable(form.email);
        if (!checkRes.success) {
          ElMessage.error("该邮箱已被注册");
          return;
        }
      } catch (e) {
      }
      await sendNewOtp(form.email);
    };
    const handleConfirm = async () => {
      if (!canSubmit.value) return;
      baseLoading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(form.email, form.code);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || "验证码错误");
          return;
        }
        const updateRes = await authApi.updateEmail(form.email);
        if (updateRes.success) {
          ElMessage.success("绑定成功，请去新邮箱查收确认邮件");
          emit("success", form.email);
          handleClose();
        } else {
          ElMessage.error(updateRes.msg || "绑定失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "操作失败");
      } finally {
        baseLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "绑定/换绑邮箱",
        width: "500px",
        "submit-text": "确认绑定",
        loading: loading.value,
        "submit-disabled": !canSubmit.value,
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        onSubmit: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.currentEmail && step.value === 1) {
              _push2(`<!--[--><div class="alert-box" data-v-c08e1d80${_scopeId}> 为了您的账号安全，请先验证当前邮箱。 </div><div class="form-group" data-v-c08e1d80${_scopeId}><label class="form-label" data-v-c08e1d80${_scopeId}>当前邮箱</label><input${ssrRenderAttr("value", __props.currentEmail)} class="form-input" disabled data-v-c08e1d80${_scopeId}></div><div class="form-group" data-v-c08e1d80${_scopeId}><label class="form-label" data-v-c08e1d80${_scopeId}>验证码</label><div class="input-with-action relative-input-group" data-v-c08e1d80${_scopeId}><input${ssrRenderAttr("value", oldCode.value)} class="form-input" placeholder="请输入验证码" maxlength="6" data-v-c08e1d80${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: countdown.value,
                onClick: sendOldCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="step-actions" data-v-c08e1d80${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary",
                block: "",
                onClick: verifyOldEmail,
                disabled: loading.value || oldCode.value.length < 4
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 下一步 `);
                  } else {
                    return [
                      createTextVNode(" 下一步 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            } else {
              _push2(`<!--[--><div class="form-group" data-v-c08e1d80${_scopeId}><label class="form-label" data-v-c08e1d80${_scopeId}>新邮箱地址</label><input${ssrRenderAttr("value", form.email)} class="form-input" placeholder="请输入新邮箱" type="email" data-v-c08e1d80${_scopeId}></div><div class="form-group" data-v-c08e1d80${_scopeId}><label class="form-label" data-v-c08e1d80${_scopeId}>验证码</label><div class="input-with-action relative-input-group" data-v-c08e1d80${_scopeId}><input${ssrRenderAttr("value", form.code)} class="form-input" placeholder="新邮箱验证码" maxlength="6" data-v-c08e1d80${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: countdown.value,
                disabled: !isEmailValid.value,
                onClick: sendNewCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            }
          } else {
            return [
              __props.currentEmail && step.value === 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("div", { class: "alert-box" }, " 为了您的账号安全，请先验证当前邮箱。 "),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "当前邮箱"),
                  createVNode("input", {
                    value: __props.currentEmail,
                    class: "form-input",
                    disabled: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "验证码"),
                  createVNode("div", { class: "input-with-action relative-input-group" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => oldCode.value = $event,
                      class: "form-input",
                      placeholder: "请输入验证码",
                      maxlength: "6"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, oldCode.value]
                    ]),
                    createVNode(SendCodeButton, {
                      loading: loading.value,
                      countdown: countdown.value,
                      onClick: sendOldCode
                    }, null, 8, ["loading", "countdown"])
                  ])
                ]),
                createVNode("div", { class: "step-actions" }, [
                  createVNode(BaseButton, {
                    themeId: "primary",
                    block: "",
                    onClick: verifyOldEmail,
                    disabled: loading.value || oldCode.value.length < 4
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 下一步 ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "新邮箱地址"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.email = $event,
                    class: "form-input",
                    placeholder: "请输入新邮箱",
                    type: "email"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.email]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "验证码"),
                  createVNode("div", { class: "input-with-action relative-input-group" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.code = $event,
                      class: "form-input",
                      placeholder: "新邮箱验证码",
                      maxlength: "6"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, form.code]
                    ]),
                    createVNode(SendCodeButton, {
                      loading: loading.value,
                      countdown: countdown.value,
                      disabled: !isEmailValid.value,
                      onClick: sendNewCode
                    }, null, 8, ["loading", "countdown", "disabled"])
                  ])
                ])
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/BindEmailModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const BindEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-c08e1d80"]]);
const _imports_0 = publicAssetsURL("/images/shared/oauth-google.png");
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BindGoogleModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    isBound: { type: Boolean },
    currentGoogleEmail: {}
  },
  emits: ["close", "bind", "update:visible"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleBind = () => {
      console.log("Initiating Google Binding...");
      emit("bind");
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "绑定谷歌邮箱",
        "show-footer": false,
        "theme-id": "suit-001",
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="google-content" data-v-24ef4ac3${_scopeId}><div class="modal-subtitle" data-v-24ef4ac3${_scopeId}>关联您的 Google 账号以更快捷登录</div><div class="${ssrRenderClass([{ bound: __props.isBound }, "status-box"])}" data-v-24ef4ac3${_scopeId}><div class="status-icon" data-v-24ef4ac3${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Google" class="google-icon" data-v-24ef4ac3${_scopeId}></div><div class="status-info" data-v-24ef4ac3${_scopeId}><div class="status-label" data-v-24ef4ac3${_scopeId}>当前状态</div><div class="status-text" data-v-24ef4ac3${_scopeId}>${ssrInterpolate(__props.isBound ? "已绑定" : "未绑定")}</div>`);
            if (__props.isBound) {
              _push2(`<div class="bound-email" data-v-24ef4ac3${_scopeId}>${ssrInterpolate(__props.currentGoogleEmail)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.isBound) {
              _push2(`<div class="action-area" data-v-24ef4ac3${_scopeId}><div class="action-tip" data-v-24ef4ac3${_scopeId}>如需更换绑定的 Google 账号，请点击下方按钮</div><button class="btn-google" data-v-24ef4ac3${_scopeId}><span class="btn-icon" data-v-24ef4ac3${_scopeId}>G</span> 换绑 Google 账号 </button></div>`);
            } else {
              _push2(`<div class="action-area" data-v-24ef4ac3${_scopeId}><button class="btn-google" data-v-24ef4ac3${_scopeId}><span class="btn-icon" data-v-24ef4ac3${_scopeId}>G</span> 立即绑定 Google 账号 </button></div>`);
            }
            _push2(`<div class="modal-footer-tip" data-v-24ef4ac3${_scopeId}> 绑定后可直接使用 Google 账号登录凡图拉 </div></div>`);
          } else {
            return [
              createVNode("div", { class: "google-content" }, [
                createVNode("div", { class: "modal-subtitle" }, "关联您的 Google 账号以更快捷登录"),
                createVNode("div", {
                  class: ["status-box", { bound: __props.isBound }]
                }, [
                  createVNode("div", { class: "status-icon" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "Google",
                      class: "google-icon"
                    })
                  ]),
                  createVNode("div", { class: "status-info" }, [
                    createVNode("div", { class: "status-label" }, "当前状态"),
                    createVNode("div", { class: "status-text" }, toDisplayString(__props.isBound ? "已绑定" : "未绑定"), 1),
                    __props.isBound ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bound-email"
                    }, toDisplayString(__props.currentGoogleEmail), 1)) : createCommentVNode("", true)
                  ])
                ], 2),
                __props.isBound ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "action-area"
                }, [
                  createVNode("div", { class: "action-tip" }, "如需更换绑定的 Google 账号，请点击下方按钮"),
                  createVNode("button", {
                    class: "btn-google",
                    onClick: handleBind
                  }, [
                    createVNode("span", { class: "btn-icon" }, "G"),
                    createTextVNode(" 换绑 Google 账号 ")
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "action-area"
                }, [
                  createVNode("button", {
                    class: "btn-google",
                    onClick: handleBind
                  }, [
                    createVNode("span", { class: "btn-icon" }, "G"),
                    createTextVNode(" 立即绑定 Google 账号 ")
                  ])
                ])),
                createVNode("div", { class: "modal-footer-tip" }, " 绑定后可直接使用 Google 账号登录凡图拉 ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/BindGoogleModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BindGoogleModal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-24ef4ac3"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BindWechatModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    isBound: { type: Boolean },
    openId: {}
  },
  emits: ["close", "update:visible", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const userStore = useUserStore();
    const loading = ref(false);
    const qrCodeUrl = ref("");
    const ticket = ref("");
    const scene = ref("");
    const scanStatus = ref("waiting");
    const isExpired = ref(false);
    let pollTimer = null;
    const maskOpenId = (id) => {
      if (!id || id.length < 10) return id;
      return id.substring(0, 6) + "****" + id.substring(id.length - 4);
    };
    const getQrCode = async () => {
      if (props.isBound) return;
      loading.value = true;
      isExpired.value = false;
      qrCodeUrl.value = "";
      try {
        const res = await wechatLoginApi.getLoginQrCode();
        if (res.success && res.data) {
          qrCodeUrl.value = res.data.qrcodeUrl;
          ticket.value = res.data.ticket;
          scene.value = res.data.sceneStr;
          loading.value = false;
          scanStatus.value = "waiting";
          startPolling();
        } else {
          ElMessage.error(res.msg || "获取二维码失败");
        }
      } catch (e) {
        ElMessage.error("网络错误");
      } finally {
        loading.value = false;
      }
    };
    const startPolling = () => {
      stopPolling();
      pollTimer = setInterval();
    };
    const stopPolling = () => {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };
    const refreshQrCode = () => {
      getQrCode();
    };
    const handleClose = () => {
      stopPolling();
      emit("close");
      emit("update:visible", false);
    };
    const handleUnbind = async () => {
      try {
        await ElMessageBox.confirm(
          "解除绑定后将无法通过微信快速登录，确定要解绑吗？",
          "解除绑定",
          {
            confirmButtonText: "确定解绑",
            cancelButtonText: "取消",
            type: "warning"
          }
        );
        loading.value = true;
        const res = await wechatLoginApi.unbindWechat();
        if (res.success) {
          ElMessage.success("解除绑定成功");
          await userStore.fetchUserInfo();
          emit("success");
        } else {
          ElMessage.error(res.msg || "解绑失败");
        }
      } catch (e) {
        if (e !== "cancel") {
          console.error(e);
          ElMessage.error("操作失败");
        }
      } finally {
        loading.value = false;
      }
    };
    watch(() => props.visible, (val) => {
      if (val && !props.isBound) {
        getQrCode();
      } else {
        stopPolling();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "绑定微信",
        "show-footer": false,
        "theme-id": "suit-001",
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="wechat-bind-content" data-v-b4007a60${_scopeId}><div class="modal-subtitle" data-v-b4007a60${_scopeId}>绑定微信后，可使用微信扫码快捷登录</div>`);
            if (__props.isBound) {
              _push2(`<div class="bound-state" data-v-b4007a60${_scopeId}><div class="status-box bound" data-v-b4007a60${_scopeId}><div class="status-icon" data-v-b4007a60${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(chat_dot_round_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="status-info" data-v-b4007a60${_scopeId}><div class="status-label" data-v-b4007a60${_scopeId}>当前状态</div><div class="status-text" data-v-b4007a60${_scopeId}>已绑定微信</div>`);
              if (__props.openId) {
                _push2(`<div class="bound-meta" data-v-b4007a60${_scopeId}>OpenID: ${ssrInterpolate(maskOpenId(__props.openId))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="action-area" data-v-b4007a60${_scopeId}><button class="btn-secondary"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-b4007a60${_scopeId}>`);
              if (loading.value) {
                _push2(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(loading_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(loading_default))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(connection_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(connection_default))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(` 解除绑定 </button></div></div>`);
            } else {
              _push2(`<div class="bind-state" data-v-b4007a60${_scopeId}><div class="qr-container" data-v-b4007a60${_scopeId}>`);
              if (loading.value) {
                _push2(`<div class="qr-loading" data-v-b4007a60${_scopeId}><div class="spinner" data-v-b4007a60${_scopeId}></div><p data-v-b4007a60${_scopeId}>获取二维码...</p></div>`);
              } else if (qrCodeUrl.value) {
                _push2(`<div class="qr-wrapper" data-v-b4007a60${_scopeId}><img${ssrRenderAttr("src", qrCodeUrl.value)} class="qr-img" data-v-b4007a60${_scopeId}>`);
                if (scanStatus.value === "scanned") {
                  _push2(`<div class="qr-overlay" data-v-b4007a60${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_icon, { class: "success-icon" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(select_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(select_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`<p data-v-b4007a60${_scopeId}>扫描成功</p><p class="sub-text" data-v-b4007a60${_scopeId}>正在绑定...</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (isExpired.value) {
                  _push2(`<div class="qr-overlay error" data-v-b4007a60${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_icon, {
                    class: "refresh-icon",
                    onClick: refreshQrCode
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(refresh_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(refresh_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`<p data-v-b4007a60${_scopeId}>二维码已过期</p><button class="text-btn" data-v-b4007a60${_scopeId}>点击刷新</button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<div class="qr-error" data-v-b4007a60${_scopeId}><p data-v-b4007a60${_scopeId}>无法加载二维码</p><button class="text-btn" data-v-b4007a60${_scopeId}>重试</button></div>`);
              }
              _push2(`</div><div class="scan-tip" data-v-b4007a60${_scopeId}> 请使用 <span class="highlight" data-v-b4007a60${_scopeId}>微信</span> 扫一扫 </div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "wechat-bind-content" }, [
                createVNode("div", { class: "modal-subtitle" }, "绑定微信后，可使用微信扫码快捷登录"),
                __props.isBound ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bound-state"
                }, [
                  createVNode("div", { class: "status-box bound" }, [
                    createVNode("div", { class: "status-icon" }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(chat_dot_round_default))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "status-info" }, [
                      createVNode("div", { class: "status-label" }, "当前状态"),
                      createVNode("div", { class: "status-text" }, "已绑定微信"),
                      __props.openId ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bound-meta"
                      }, "OpenID: " + toDisplayString(maskOpenId(__props.openId)), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "action-area" }, [
                    createVNode("button", {
                      class: "btn-secondary",
                      onClick: handleUnbind,
                      disabled: loading.value
                    }, [
                      loading.value ? (openBlock(), createBlock(_component_el_icon, {
                        key: 0,
                        class: "is-loading"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(loading_default))
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(unref(connection_default))
                        ]),
                        _: 1
                      })),
                      createTextVNode(" 解除绑定 ")
                    ], 8, ["disabled"])
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bind-state"
                }, [
                  createVNode("div", { class: "qr-container" }, [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "qr-loading"
                    }, [
                      createVNode("div", { class: "spinner" }),
                      createVNode("p", null, "获取二维码...")
                    ])) : qrCodeUrl.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "qr-wrapper"
                    }, [
                      createVNode("img", {
                        src: qrCodeUrl.value,
                        class: "qr-img"
                      }, null, 8, ["src"]),
                      scanStatus.value === "scanned" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "qr-overlay"
                      }, [
                        createVNode(_component_el_icon, { class: "success-icon" }, {
                          default: withCtx(() => [
                            createVNode(unref(select_default))
                          ]),
                          _: 1
                        }),
                        createVNode("p", null, "扫描成功"),
                        createVNode("p", { class: "sub-text" }, "正在绑定...")
                      ])) : createCommentVNode("", true),
                      isExpired.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "qr-overlay error"
                      }, [
                        createVNode(_component_el_icon, {
                          class: "refresh-icon",
                          onClick: refreshQrCode
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(refresh_default))
                          ]),
                          _: 1
                        }),
                        createVNode("p", null, "二维码已过期"),
                        createVNode("button", {
                          class: "text-btn",
                          onClick: refreshQrCode
                        }, "点击刷新")
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "qr-error"
                    }, [
                      createVNode("p", null, "无法加载二维码"),
                      createVNode("button", {
                        class: "text-btn",
                        onClick: refreshQrCode
                      }, "重试")
                    ]))
                  ]),
                  createVNode("div", { class: "scan-tip" }, [
                    createTextVNode(" 请使用 "),
                    createVNode("span", { class: "highlight" }, "微信"),
                    createTextVNode(" 扫一扫 ")
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/BindWechatModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BindWechatModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b4007a60"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PcChangePasswordModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    email: {}
  },
  emits: ["update:visible", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      loading: codeLoading,
      countdown,
      sendCode: sendOtp
    } = useSendCode({ timerKey: "otp_security_timer" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value);
    const form = reactive({
      code: "",
      newPassword: "",
      confirmPassword: ""
    });
    const canSubmit = computed(() => {
      return form.code.length >= 4 && form.newPassword.length >= 6 && form.newPassword === form.confirmPassword;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        form.code = "";
        form.newPassword = "";
        form.confirmPassword = "";
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const sendCode = async () => {
      if (!props.email) return;
      await sendOtp(props.email);
    };
    const handleConfirm = async () => {
      if (!canSubmit.value || !props.email) return;
      baseLoading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(props.email, form.code);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || "验证码错误");
          baseLoading.value = false;
          return;
        }
        const updateRes = await authApi.updatePassword(form.newPassword);
        if (updateRes.success) {
          ElMessage.success("密码修改成功");
          handleClose();
        } else {
          ElMessage.error(updateRes.msg || "密码修改失败");
        }
      } catch (e) {
        console.error(e);
        ElMessage.error(e.message || "操作失败");
      } finally {
        baseLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "更新密码",
        width: "500px",
        "submit-text": "确认更新",
        loading: loading.value,
        "submit-disabled": !canSubmit.value,
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        onSubmit: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!__props.email) {
              _push2(`<div class="alert-box" data-v-0bd66b9a${_scopeId}> 请先绑定邮箱，修改密码需要邮箱验证。 </div>`);
            } else {
              _push2(`<!--[--><div class="form-group" data-v-0bd66b9a${_scopeId}><label class="form-label" data-v-0bd66b9a${_scopeId}>验证码</label><div class="input-with-action relative-input-group" data-v-0bd66b9a${_scopeId}><input${ssrRenderAttr("value", form.code)} class="form-input" placeholder="邮箱验证码" maxlength="6" data-v-0bd66b9a${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: unref(countdown),
                onClick: sendCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="form-group" data-v-0bd66b9a${_scopeId}><label class="form-label" data-v-0bd66b9a${_scopeId}>新密码</label><input${ssrRenderAttr("value", form.newPassword)} class="form-input" type="password" placeholder="6-20位字符" data-v-0bd66b9a${_scopeId}></div><div class="form-group" data-v-0bd66b9a${_scopeId}><label class="form-label" data-v-0bd66b9a${_scopeId}>确认密码</label><input${ssrRenderAttr("value", form.confirmPassword)} class="form-input" type="password" placeholder="再次输入新密码" data-v-0bd66b9a${_scopeId}></div><!--]-->`);
            }
          } else {
            return [
              !__props.email ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert-box"
              }, " 请先绑定邮箱，修改密码需要邮箱验证。 ")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "验证码"),
                  createVNode("div", { class: "input-with-action relative-input-group" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.code = $event,
                      class: "form-input",
                      placeholder: "邮箱验证码",
                      maxlength: "6"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, form.code]
                    ]),
                    createVNode(SendCodeButton, {
                      loading: loading.value,
                      countdown: unref(countdown),
                      onClick: sendCode
                    }, null, 8, ["loading", "countdown"])
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "新密码"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.newPassword = $event,
                    class: "form-input",
                    type: "password",
                    placeholder: "6-20位字符"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.newPassword]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "确认密码"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.confirmPassword = $event,
                    class: "form-input",
                    type: "password",
                    placeholder: "再次输入新密码"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.confirmPassword]
                  ])
                ])
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/PcChangePasswordModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const PcChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0bd66b9a"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PcDeleteAccountModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    email: {}
  },
  emits: ["close", "confirm", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isConfirmed = ref(false);
    const otpCode = ref("");
    const {
      loading: codeLoading,
      countdown,
      sendCode: sendOtp
    } = useSendCode({ timerKey: "otp_security_timer" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value);
    watch(() => props.visible, (val) => {
      if (val) {
        isConfirmed.value = false;
        otpCode.value = "";
      }
    });
    const sendCode = async () => {
      await sendOtp(props.email);
    };
    const handleDelete = async () => {
      if (!isConfirmed.value || !otpCode.value) return;
      baseLoading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(props.email, otpCode.value);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || CLIENT_MESSAGES.DELETE_MODAL.CODE_ERROR);
          return;
        }
        emit("confirm");
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL);
      } finally {
        baseLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: __props.visible,
        title: "注销账号",
        width: "500px",
        "show-footer": false,
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(BaseButton, {
              themeId: "secondary",
              onClick: ($event) => _ctx.$emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(BaseButton, {
              themeId: "destructive",
              disabled: !isConfirmed.value || !otpCode.value || loading.value,
              loading: loading.value,
              onClick: handleDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(loading.value ? "处理中..." : "确认注销")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(loading.value ? "处理中..." : "确认注销"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(BaseButton, {
                themeId: "secondary",
                onClick: ($event) => _ctx.$emit("close")
              }, {
                default: withCtx(() => [
                  createTextVNode("取消")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(BaseButton, {
                themeId: "destructive",
                disabled: !isConfirmed.value || !otpCode.value || loading.value,
                loading: loading.value,
                onClick: handleDelete
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(loading.value ? "处理中..." : "确认注销"), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="warning-box" data-v-aa445466${_scopeId}><span class="warning-icon" data-v-aa445466${_scopeId}>⚠️</span><div class="warning-content" data-v-aa445466${_scopeId}> 警告：账号注销是不可恢复的操作。所有个人数据、订单记录和资产将被永久删除。 </div></div><div class="form-group" data-v-aa445466${_scopeId}><label class="form-label" data-v-aa445466${_scopeId}>邮箱验证</label><div class="captcha-row relative-input-group" data-v-aa445466${_scopeId}><input${ssrRenderAttr("value", otpCode.value)} type="text" class="form-input" placeholder="请输入验证码" maxlength="6" inputmode="numeric" autocomplete="off" data-v-aa445466${_scopeId}>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: unref(countdown),
              onClick: sendCode
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="form-tip" data-v-aa445466${_scopeId}>为了您的资产安全，请验证邮箱: ${ssrInterpolate(__props.email)}</p></div><div class="confirmation-area" data-v-aa445466${_scopeId}><label class="checkbox-label" data-v-aa445466${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(isConfirmed.value) ? ssrLooseContain(isConfirmed.value, null) : isConfirmed.value) ? " checked" : ""} data-v-aa445466${_scopeId}><span data-v-aa445466${_scopeId}>我已了解风险，确认注销当前账号</span></label></div>`);
          } else {
            return [
              createVNode("div", { class: "warning-box" }, [
                createVNode("span", { class: "warning-icon" }, "⚠️"),
                createVNode("div", { class: "warning-content" }, " 警告：账号注销是不可恢复的操作。所有个人数据、订单记录和资产将被永久删除。 ")
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "邮箱验证"),
                createVNode("div", { class: "captcha-row relative-input-group" }, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => otpCode.value = $event,
                    type: "text",
                    class: "form-input",
                    placeholder: "请输入验证码",
                    maxlength: "6",
                    inputmode: "numeric",
                    autocomplete: "off",
                    onInput: ($event) => otpCode.value = otpCode.value.replace(/\D/g, "")
                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                    [vModelText, otpCode.value]
                  ]),
                  createVNode(SendCodeButton, {
                    loading: loading.value,
                    countdown: unref(countdown),
                    onClick: sendCode
                  }, null, 8, ["loading", "countdown"])
                ]),
                createVNode("p", { class: "form-tip" }, "为了您的资产安全，请验证邮箱: " + toDisplayString(__props.email), 1)
              ]),
              createVNode("div", { class: "confirmation-area" }, [
                createVNode("label", { class: "checkbox-label" }, [
                  withDirectives(createVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": ($event) => isConfirmed.value = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, isConfirmed.value]
                  ]),
                  createVNode("span", null, "我已了解风险，确认注销当前账号")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/PcDeleteAccountModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PcDeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-aa445466"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProfilePersonalInfo",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  emits: ["update:user"],
  setup(__props, { emit: __emit }) {
    const userStore = useUserStore();
    const modals = reactive({
      avatar: false,
      nickname: false,
      email: false,
      google: false,
      wechat: false,
      password: false,
      delete: false
    });
    const closeModal = (type) => {
      modals[type] = false;
    };
    const updateAvatar = async (newAvatar) => {
      try {
        const res = await authApi.updateProfile({ avatar: newAvatar });
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.PROFILE.AVATAR_UPDATE);
          await userStore.fetchUserInfo();
          closeModal("avatar");
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PROFILE.AVATAR_FAIL);
        }
      } catch (error) {
        ElMessage.error(error.message || CLIENT_MESSAGES.PROFILE.AVATAR_FAIL);
      }
    };
    const updateNickname = async (newNickname) => {
      try {
        const res = await authApi.updateProfile({ nickname: newNickname });
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.PROFILE.NICKNAME_UPDATE);
          await userStore.fetchUserInfo();
          closeModal("nickname");
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PROFILE.NICKNAME_FAIL);
        }
      } catch (error) {
        ElMessage.error(error.message || CLIENT_MESSAGES.PROFILE.NICKNAME_FAIL);
      }
    };
    const updateEmail = async (newEmail) => {
      await userStore.fetchUserInfo();
      closeModal("email");
    };
    const handleGoogleBind = () => {
      console.log("Google Bind Action Triggered");
    };
    const handleWechatSuccess = async () => {
      await userStore.fetchUserInfo();
      closeModal("wechat");
    };
    const handleDeleteAccount = async () => {
      try {
        const res = await authApi.deleteAccount();
        if (res.success) {
          const { ElMessageBox: ElMessageBox2 } = await import("./index-BSG0hpWl.js");
          await userStore.logout();
          ElMessageBox2.alert(
            "您的账号已成功注销，所有数据已被永久删除。感谢您的使用！",
            "注销成功",
            {
              confirmButtonText: "返回首页",
              type: "success",
              center: true,
              callback: () => {
                (void 0).location.href = "/";
              }
            }
          );
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PROFILE.LOGOUT_FAIL);
        }
      } catch (error) {
        ElMessage.error(error.message || CLIENT_MESSAGES.PROFILE.LOGOUT_FAIL);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "personal-info-page" }, _attrs))} data-v-5c070934><div class="profile-banner" data-v-5c070934><div class="banner-glass" data-v-5c070934></div><div class="banner-content" data-v-5c070934><div class="hero-left" data-v-5c070934><div class="hero-avatar-wrapper" data-v-5c070934><img${ssrRenderAttr("src", __props.user.avatar || unref(DEFAULT_AVATAR))} class="hero-avatar" data-v-5c070934><div class="hero-avatar-overlay" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(camera_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(camera_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hero-text" data-v-5c070934><h1 class="hero-nickname" data-v-5c070934>${ssrInterpolate(__props.user.nickname)}</h1><div class="hero-tags" data-v-5c070934><span class="user-tag role-tag" data-v-5c070934>FANTULA Member</span><span class="user-tag security-tag" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(circle_check_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(circle_check_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` 安全等级: 高 </span></div></div></div><div class="hero-actions" data-v-5c070934><button class="glass-pill-btn primary-glass-btn" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(edit_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(edit_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` 编辑资料 </button></div></div></div><div class="workspace-scroll-area" data-v-5c070934><div class="workspace-content" data-v-5c070934><div class="info-grid section-gap" data-v-5c070934><div class="glass-tile info-tile" data-v-5c070934><div class="tile-icon-bg" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(credit_card_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(credit_card_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="tile-header" data-v-5c070934><div class="tile-label" data-v-5c070934>账户 UID</div>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "tile-corner-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(credit_card_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(credit_card_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="tile-value-group" data-v-5c070934><span class="tile-value-mono" data-v-5c070934>${ssrInterpolate(__props.user.uid || __props.user.id || "---")}</span><button class="copy-btn-mini" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(copy_document_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div></div><div class="glass-tile info-tile" data-v-5c070934><div class="tile-icon-bg" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(message_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(message_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="tile-header" data-v-5c070934><div class="tile-label" data-v-5c070934>绑定邮箱</div>`);
      if (__props.user.email) {
        _push(`<div class="status-badge success" data-v-5c070934>已绑定</div>`);
      } else {
        _push(`<div class="status-badge warning" data-v-5c070934>未绑定</div>`);
      }
      _push(`</div><div class="tile-value-group" data-v-5c070934><span class="tile-value" data-v-5c070934>${ssrInterpolate(__props.user.email || "未绑定邮箱")}</span><button class="icon-action-btn" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(edit_pen_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(edit_pen_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div></div><div class="glass-tile info-tile" data-v-5c070934><div class="tile-icon-bg" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(lock_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(lock_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="tile-header" data-v-5c070934><div class="tile-label" data-v-5c070934>账号安全</div><div class="status-badge success" data-v-5c070934>保护中</div></div><div class="tile-value-group" data-v-5c070934><div class="security-level-bar" data-v-5c070934><div class="level-fill" style="${ssrRenderStyle({ "width": "100%" })}" data-v-5c070934></div></div><span class="tile-meta" data-v-5c070934>极高</span></div></div></div><div class="command-center section-gap" data-v-5c070934><h3 class="section-title" data-v-5c070934>账户管理</h3><div class="command-grid" data-v-5c070934><div class="action-card-lg" data-v-5c070934><div class="card-bg-icon" data-v-5c070934>🔑</div><div class="card-content" data-v-5c070934><div class="card-icon-frame blue-frame" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(key_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(key_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-text" data-v-5c070934><span class="card-title" data-v-5c070934>修改密码</span><span class="card-desc" data-v-5c070934>定期更新密码保护账号安全</span></div></div><div class="card-arrow" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
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
      _push(`</div></div><div class="action-card-lg" data-v-5c070934><div class="card-bg-icon" data-v-5c070934>🔗</div><div class="card-content" data-v-5c070934><div class="card-icon-frame purple-frame" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(connection_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(connection_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-text" data-v-5c070934><span class="card-title" data-v-5c070934>谷歌绑定</span><span class="card-desc" data-v-5c070934>绑定 Google 账号快捷登录</span></div></div>`);
      if (!__props.user.isGoogleBound) {
        _push(`<div class="card-arrow" data-v-5c070934>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
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
        _push(`</div>`);
      } else {
        _push(`<div class="status-text-mini" data-v-5c070934>已绑定</div>`);
      }
      _push(`</div><div class="action-card-lg" data-v-5c070934><div class="card-bg-icon" data-v-5c070934>🔗</div><div class="card-content" data-v-5c070934><div class="card-icon-frame green-frame" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(connection_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(connection_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-text" data-v-5c070934><span class="card-title" data-v-5c070934>微信绑定</span><span class="card-desc" data-v-5c070934>绑定微信扫码快捷登录</span></div></div>`);
      if (!__props.user.openId) {
        _push(`<div class="card-arrow" data-v-5c070934>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
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
        _push(`</div>`);
      } else {
        _push(`<div class="status-text-mini" data-v-5c070934>已绑定</div>`);
      }
      _push(`</div><div class="action-card-lg danger-card" data-v-5c070934><div class="card-bg-icon" data-v-5c070934>⚠️</div><div class="card-content" data-v-5c070934><div class="card-icon-frame red-frame" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(warning_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-text" data-v-5c070934><span class="card-title" data-v-5c070934>注销账号</span><span class="card-desc" data-v-5c070934>永久删除账号数据</span></div></div><div class="card-arrow" data-v-5c070934>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
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
      _push(`</div></div></div></div></div></div>`);
      _push(ssrRenderComponent(ChangeAvatarModal, {
        visible: modals.avatar,
        "onUpdate:visible": ($event) => modals.avatar = $event,
        "current-avatar": __props.user.avatar,
        onClose: ($event) => closeModal("avatar"),
        onUpdate: updateAvatar
      }, null, _parent));
      _push(ssrRenderComponent(ChangeNicknameModal, {
        visible: modals.nickname,
        "onUpdate:visible": ($event) => modals.nickname = $event,
        "current-nickname": __props.user.nickname,
        onClose: ($event) => closeModal("nickname"),
        onUpdate: updateNickname
      }, null, _parent));
      _push(ssrRenderComponent(BindEmailModal, {
        visible: modals.email,
        "onUpdate:visible": ($event) => modals.email = $event,
        "current-email": __props.user.email,
        onClose: ($event) => closeModal("email"),
        onConfirm: updateEmail
      }, null, _parent));
      _push(ssrRenderComponent(BindGoogleModal, {
        visible: modals.google,
        "onUpdate:visible": ($event) => modals.google = $event,
        "is-bound": !!__props.user.isGoogleBound,
        "current-google-email": __props.user.googleEmail,
        onClose: ($event) => closeModal("google"),
        onBind: handleGoogleBind
      }, null, _parent));
      _push(ssrRenderComponent(BindWechatModal, {
        visible: modals.wechat,
        "onUpdate:visible": ($event) => modals.wechat = $event,
        "is-bound": !!__props.user.openId,
        "open-id": __props.user.openId,
        onClose: ($event) => closeModal("wechat"),
        onSuccess: handleWechatSuccess
      }, null, _parent));
      _push(ssrRenderComponent(PcChangePasswordModal, {
        visible: modals.password,
        "onUpdate:visible": ($event) => modals.password = $event,
        email: __props.user.email,
        onClose: ($event) => closeModal("password")
      }, null, _parent));
      _push(ssrRenderComponent(PcDeleteAccountModal, {
        visible: modals.delete,
        "onUpdate:visible": ($event) => modals.delete = $event,
        email: __props.user.email,
        onClose: ($event) => closeModal("delete"),
        onConfirm: handleDeleteAccount
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/ProfilePersonalInfo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProfilePersonalInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5c070934"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const userInfo = computed(() => {
      const storeUser = userStore.user;
      if (storeUser) {
        return {
          id: storeUser.id,
          uid: storeUser.uid || storeUser.id?.slice(0, 8) || "未分配",
          nickname: storeUser.nickName || storeUser.nickname || storeUser.email?.split("@")[0] || "用户",
          avatar: storeUser.avatar || "",
          email: storeUser.email || "未绑定",
          isGoogleBound: false,
          googleEmail: ""
        };
      }
      return {
        id: "",
        uid: "---",
        // 占位符比"加载中"更干净
        nickname: "用户",
        // 默认称呼
        avatar: "",
        email: "未绑定",
        isGoogleBound: false,
        googleEmail: ""
      };
    });
    const handleUserUpdate = (newUser) => {
      userStore.fetchUserInfo();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ProfilePersonalInfo, mergeProps({
        user: userInfo.value,
        "onUpdate:user": handleUserUpdate
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BtF9I0SP.js.map
