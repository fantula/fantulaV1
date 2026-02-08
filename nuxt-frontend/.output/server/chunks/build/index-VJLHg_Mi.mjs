import { defineComponent, computed, mergeProps, reactive, withCtx, unref, createVNode, ref, watch, openBlock, createBlock, createTextVNode, Fragment, renderList, createCommentVNode, withDirectives, withKeys, vModelText, toDisplayString, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { u as useUserStore, a as authApi } from './user-Cnuc6I82.mjs';
import { X as camera_default, n as circle_check_default, Y as edit_default, Z as credit_card_default, _ as copy_document_default, $ as message_default, a0 as edit_pen_default, a1 as lock_default, a2 as key_default, a as arrow_right_default, a3 as connection_default, M as warning_default, P as user_filled_default, a4 as upload_default, G as check_default, a5 as chat_dot_round_default, a6 as select_default, r as refresh_default } from './index-DlETah8a.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { B as BaseFormModal } from './BaseFormModal-VZJs6EG8.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { _ as _export_sfc } from './server.mjs';
import { S as SendCodeButton } from './SendCodeButton-BHMZfVap.mjs';
import { B as BaseButton } from './BaseButton-BlqmccK6.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { w as wechatLoginApi } from './wechat-login-Bgv3Vumd.mjs';
import { _ as __nuxt_component_0 } from './BaseModal-CiVpglQ1.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import '@supabase/supabase-js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';
import './cart-C8TGo9ts.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './event-D3FEo2C5.mjs';

const CLIENT_MESSAGES = {
  // 1. 个人中心 & 账号 (Profile & Auth)
  PROFILE: {
    AVATAR_UPDATE: "\u597D\u8036\uFF5E\u65B0\u5934\u50CF\u751F\u6548\u5566",
    AVATAR_FAIL: "\u545C\u2026\u6CA1\u6362\u6210\u529F\uFF0C\u518D\u8BD5\u8BD5\uFF1F",
    NICKNAME_UPDATE: "\u6211\u5DF2\u7ECF\u8BB0\u4F4F\u5566",
    NICKNAME_FAIL: "\u6CA1\u6539\u6210\u529F\u5462\uFF0C\u518D\u8BD5\u8BD5\uFF1F",
    UID_COPY: "UID \u5E2E\u4F60\u590D\u5236\u597D\u5566",
    LOGOUT_FAIL: "\u8FD8\u4E0D\u80FD\u79BB\u5F00\u6211\u5462\uFF0C\u7A0D\u540E\u518D\u8BD5\u5427"
  },
  NICKNAME_MODAL: {
    SUCCESS: "\u65B0\u540D\u5B57\u6211\u8BB0\u4E0B\u4E86",
    FAIL: "\u6CA1\u6539\u6210\u529F\u5462\uFF0C\u518D\u8BD5\u8BD5\uFF1F"
  },
  PASSWORD_MODAL: {
    CODE_SENT: "\u9A8C\u8BC1\u7801\u5DF2\u7ECF\u9001\u8FC7\u53BB\u5566",
    SEND_FAIL: "\u6CA1\u9001\u51FA\u53BB\u2026\u7A0D\u540E\u518D\u8BD5\u8BD5\u5427",
    VERIFY_FAIL: "\u597D\u50CF\u8F93\u9519\u4E86\uFF0C\u518D\u68C0\u67E5\u4E00\u4E0B\u5427",
    SUCCESS: "\u5BC6\u7801\u66F4\u65B0\u5B8C\u6210\uFF0C\u6211\u8BB0\u4F4F\u4E86",
    SAME_PASSWORD: "\u5BC6\u7801\u548C\u4E4B\u524D\u4E00\u6837\u54E6",
    FAIL: "\u66F4\u65B0\u5931\u8D25\u4E86\uFF0C\u7A0D\u540E\u518D\u8BD5\u5427"
  },
  EMAIL_MODAL: {
    CODE_SENT: "\u5DF2\u53D1\u9001\u5230\u90AE\u7BB1\u5566\uFF0C\u5FEB\u53BB\u770B\u770B",
    VERIFY_SUCCESS: "\u9A8C\u8BC1\u5B8C\u6210\u5566",
    SAME_EMAIL: "\u8FD9\u4E2A\u90AE\u7BB1\u5DF2\u7ECF\u5728\u7528\u4E86\u54E6",
    // Same as current user
    EMAIL_OCCUPIED: "\u8FD9\u4E2A\u90AE\u7BB1\u88AB\u522B\u4EBA\u5148\u7ED1\u5B9A\u4E86",
    CONFIRM_SENT: "\u5DF2\u53D1\u5230\u65B0\u90AE\u7BB1\uFF0C\u8BB0\u5F97\u786E\u8BA4\u54E6"
  },
  DELETE_MODAL: {
    CODE_SENT: "\u9A8C\u8BC1\u7801\u5DF2\u7ECF\u53D1\u7ED9\u4F60\u4E86",
    CODE_ERROR: "\u4E0D\u5BF9\u4E0D\u5BF9\uFF0C\u518D\u68C0\u67E5\u4E0B\u5427"
  },
  // 共享逻辑 (Shared)
  SHARE: {
    COPY_WX_SUCCESS: "\u5FAE\u4FE1\u53F7\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"
    // Keep standard or update? User didn't specify JoinUsModal in 2nd request but listed in inventory. Let's keep specific ones or default. 
    // Wait, user provided "UID已复制" -> "UID 帮你复制好啦". 
    // JoinUsModal was in inventory but user skipped it in the reply? 
    // I will stick to what user provided explicitly.
  },
  // 2. 交易 & 支付 (Transaction & Pay)
  WALLET: {
    SYNC_SUCCESS: "\u4F59\u989D\u5DF2\u7ECF\u66F4\u65B0\u5566",
    SYNC_FAIL: "\u6CA1\u540C\u6B65\u6210\u529F\uFF0C\u518D\u8BD5\u8BD5\u5427"
  },
  COUPON: {
    GET_SUCCESS: "\u4F18\u60E0\u5230\u624B\u5566"
  },
  PAY: {
    SUCCESS: "\u4ED8\u5B8C\u4E86\uFF01\u53BB\u8BA2\u5355\u770B\u770B"
  },
  // 3. 全局通用 (Global)
  GLOBAL: {
    UNKNOWN_ERROR: "\u51FA\u4E86\u4E00\u70B9\u5C0F\u95EE\u9898\u2026\u7A0D\u540E\u518D\u8BD5\u5427",
    NETWORK_ERROR: "\u7F51\u7EDC\u597D\u50CF\u4E0D\u592A\u987A\u7545\u5462"
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
    const fileInput = ref(null);
    const pendingFile = ref(null);
    const presetAvatars = [
      "/images/client/pc/avatars/avatar-cat.png",
      "/images/client/pc/avatars/avatar-dog.png",
      "/images/client/pc/avatars/avatar-bear.png",
      "/images/client/pc/avatars/avatar-rabbit.png",
      "/images/client/pc/avatars/avatar-fox.png",
      "/images/client/pc/avatars/avatar-panda.png",
      "/images/client/pc/avatars/avatar-lion.png",
      "/images/client/pc/avatars/avatar-tiger.png"
    ];
    const displayAvatar = computed(() => {
      return previewAvatar.value || props.currentAvatar;
    });
    const hasChange = computed(() => {
      return !!selectedAvatar.value || !!pendingFile.value;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        selectedAvatar.value = "";
        previewAvatar.value = "";
        pendingFile.value = null;
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const handleImageError = (e) => {
      e.target.src = "/images/client/pc/avatars/avatar-cat.png";
    };
    const triggerUpload = () => {
      var _a;
      (_a = fileInput.value) == null ? void 0 : _a.click();
    };
    const handleFileChange = async (e) => {
      const input = e.target;
      if (!input.files || !input.files[0]) return;
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        ElMessage.warning("\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        ElMessage.warning("\u4EC5\u652F\u6301 JPG, PNG, WebP \u683C\u5F0F");
        return;
      }
      previewAvatar.value = URL.createObjectURL(file);
      pendingFile.value = file;
      selectedAvatar.value = "";
      input.value = "";
    };
    const selectSystemAvatar = (url) => {
      selectedAvatar.value = url;
      previewAvatar.value = url;
      pendingFile.value = null;
    };
    const handleConfirm = async () => {
      if (!hasChange.value || loading.value) return;
      loading.value = true;
      let finalUrl = selectedAvatar.value || props.currentAvatar || "";
      try {
        if (pendingFile.value) {
          const client = getSupabaseClient();
          const { data: { user } } = await client.auth.getUser();
          if (!user) throw new Error("\u672A\u767B\u5F55");
          const ext = pendingFile.value.name.split(".").pop();
          const fileName = `avatar_${Date.now()}.${ext}`;
          const filePath = `${user.id}/${fileName}`;
          const { error: uploadError } = await client.storage.from("avatars").upload(filePath, pendingFile.value, { upsert: true });
          if (uploadError) throw uploadError;
          const { data: publicData } = client.storage.from("avatars").getPublicUrl(filePath);
          finalUrl = publicData.publicUrl;
        }
        const res = await authApi.updateProfile({ avatar: finalUrl });
        if (res.success) {
          ElMessage.success("\u5934\u50CF\u4FEE\u6539\u6210\u529F");
          emit("update", finalUrl);
          handleClose();
        } else {
          ElMessage.error(res.msg || "\u4FEE\u6539\u5931\u8D25");
        }
      } catch (e) {
        console.error(e);
        ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "\u4FEE\u6539\u5934\u50CF",
        width: "560px",
        "submit-text": "\u4FDD\u5B58\u4FEE\u6539",
        loading: loading.value,
        "submit-disabled": !hasChange.value,
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        onSubmit: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="avatar-preview-section" data-v-2f5a8db4${_scopeId}><div class="preview-wrapper" data-v-2f5a8db4${_scopeId}>`);
            if (previewLoading.value) {
              _push2(`<div class="preview-skeleton" data-v-2f5a8db4${_scopeId}></div>`);
            } else if (displayAvatar.value) {
              _push2(`<img${ssrRenderAttr("src", displayAvatar.value)} class="preview-avatar" data-v-2f5a8db4${_scopeId}>`);
            } else {
              _push2(`<div class="preview-avatar-placeholder" data-v-2f5a8db4${_scopeId}>`);
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
            _push2(`</div><div class="upload-btn-wrapper" data-v-2f5a8db4${_scopeId}><button class="btn-upload" data-v-2f5a8db4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(upload_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(upload_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u4E0A\u4F20\u65B0\u5934\u50CF </button><input type="file" hidden accept="image/png,image/jpeg,image/webp" data-v-2f5a8db4${_scopeId}><div class="upload-tip" data-v-2f5a8db4${_scopeId}>\u652F\u6301 JPG, PNG, WebP \u683C\u5F0F\uFF0C\u4E0A\u4F20\u540E\u81EA\u52A8\u88C1\u526A\u538B\u7F29</div><div class="upload-limit" data-v-2f5a8db4${_scopeId}>\u6700\u5927 5MB\uFF0C\u5C06\u538B\u7F29\u4E3A 200x200px</div></div></div><div class="system-avatars-section" data-v-2f5a8db4${_scopeId}><div class="section-title" data-v-2f5a8db4${_scopeId}>\u7CFB\u7EDF\u63A8\u8350\u5934\u50CF</div><div class="avatar-grid" data-v-2f5a8db4${_scopeId}><!--[-->`);
            ssrRenderList(presetAvatars, (url, index) => {
              _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-2f5a8db4${_scopeId}><img${ssrRenderAttr("src", url)} class="system-avatar-img" loading="lazy" data-v-2f5a8db4${_scopeId}>`);
              if (selectedAvatar.value === url) {
                _push2(`<div class="active-overlay" data-v-2f5a8db4${_scopeId}>`);
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
                ]),
                createVNode("div", { class: "upload-btn-wrapper" }, [
                  createVNode("button", {
                    class: "btn-upload",
                    onClick: triggerUpload
                  }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(upload_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" \u4E0A\u4F20\u65B0\u5934\u50CF ")
                  ]),
                  createVNode("input", {
                    type: "file",
                    ref_key: "fileInput",
                    ref: fileInput,
                    hidden: "",
                    accept: "image/png,image/jpeg,image/webp",
                    onChange: handleFileChange
                  }, null, 544),
                  createVNode("div", { class: "upload-tip" }, "\u652F\u6301 JPG, PNG, WebP \u683C\u5F0F\uFF0C\u4E0A\u4F20\u540E\u81EA\u52A8\u88C1\u526A\u538B\u7F29"),
                  createVNode("div", { class: "upload-limit" }, "\u6700\u5927 5MB\uFF0C\u5C06\u538B\u7F29\u4E3A 200x200px")
                ])
              ]),
              createVNode("div", { class: "system-avatars-section" }, [
                createVNode("div", { class: "section-title" }, "\u7CFB\u7EDF\u63A8\u8350\u5934\u50CF"),
                createVNode("div", { class: "avatar-grid" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(presetAvatars, (url, index) => {
                    return createVNode("div", {
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
                  }), 64))
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
const ChangeAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-2f5a8db4"]]);
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
          ElMessage.success("\u6635\u79F0\u4FEE\u6539\u6210\u529F");
          emit("success", newValue);
          handleClose();
        } else {
          ElMessage.error(res.msg || "\u4FEE\u6539\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u4FEE\u6539\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "\u4FEE\u6539\u6635\u79F0",
        loading: loading.value,
        "submit-text": "\u786E\u8BA4\u4FEE\u6539",
        "submit-disabled": !canSubmit.value,
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        onSubmit: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-group" data-v-f8a86f5b${_scopeId}><label class="form-label" data-v-f8a86f5b${_scopeId}>\u65B0\u6635\u79F0</label><input${ssrRenderAttr("value", inputValue.value)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u7684\u6635\u79F0" maxlength="20" data-v-f8a86f5b${_scopeId}><div class="form-tip" data-v-f8a86f5b${_scopeId}>\u6635\u79F0\u652F\u6301\u4E2D\u82F1\u6587\u3001\u6570\u5B57\uFF0C\u957F\u5EA62-20\u4F4D</div></div>`);
          } else {
            return [
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "\u65B0\u6635\u79F0"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => inputValue.value = $event,
                  class: "form-input",
                  placeholder: "\u8BF7\u8F93\u5165\u65B0\u7684\u6635\u79F0",
                  maxlength: "20",
                  onKeyup: withKeys(handleConfirm, ["enter"])
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, inputValue.value]
                ]),
                createVNode("div", { class: "form-tip" }, "\u6635\u79F0\u652F\u6301\u4E2D\u82F1\u6587\u3001\u6570\u5B57\uFF0C\u957F\u5EA62-20\u4F4D")
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
const TIMER_KEY$2 = "otp_bind_email_timer_end";
const COOLDOWN_SECONDS$2 = 300;
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
    const loading = ref(false);
    const countdown = ref(0);
    let timerInterval = null;
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
    const startTimer = (seconds, isNew = true) => {
      countdown.value = seconds;
      if (isNew) {
        const endTime = Date.now() + seconds * 1e3;
        localStorage.setItem(TIMER_KEY$2, endTime.toString());
      }
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval();
    };
    const restoreTimer = () => {
      const endTimeStr = localStorage.getItem(TIMER_KEY$2);
      if (endTimeStr) {
        const endTime = parseInt(endTimeStr, 10);
        const now = Date.now();
        if (endTime > now) {
          const remaining = Math.ceil((endTime - now) / 1e3);
          startTimer(remaining, false);
        } else {
          localStorage.removeItem(TIMER_KEY$2);
        }
      }
    };
    watch(() => props.visible, (val) => {
      if (val) {
        step.value = props.currentEmail ? 1 : 2;
        oldCode.value = "";
        form.email = "";
        form.code = "";
        restoreTimer();
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const sendOldCode = async () => {
      if (!props.currentEmail) return;
      if (countdown.value > 0) return;
      loading.value = true;
      try {
        const res = await authApi.sendOtp(props.currentEmail);
        if (res.success) {
          ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u5230\u5F53\u524D\u90AE\u7BB1");
          startTimer(COOLDOWN_SECONDS$2);
        } else {
          ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u53D1\u9001\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const verifyOldEmail = async () => {
      if (!props.currentEmail || !oldCode.value) return;
      loading.value = true;
      try {
        const res = await authApi.verifyOtp(props.currentEmail, oldCode.value);
        if (res.success) {
          ElMessage.success("\u5F53\u524D\u90AE\u7BB1\u9A8C\u8BC1\u901A\u8FC7");
          step.value = 2;
          clearInterval(timerInterval);
          localStorage.removeItem(TIMER_KEY$2);
          countdown.value = 0;
        } else {
          ElMessage.error(res.msg || "\u9A8C\u8BC1\u7801\u9519\u8BEF");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u9A8C\u8BC1\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const sendNewCode = async () => {
      if (!isEmailValid.value) return;
      if (countdown.value > 0) return;
      try {
        const checkRes = await authApi.checkEmailAvailable(form.email);
        if (!checkRes.success) {
          ElMessage.error("\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u6CE8\u518C");
          return;
        }
      } catch (e) {
      }
      loading.value = true;
      try {
        const res = await authApi.sendOtp(form.email);
        if (res.success) {
          ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u5230\u65B0\u90AE\u7BB1");
          startTimer(COOLDOWN_SECONDS$2);
        } else {
          ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u53D1\u9001\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const handleConfirm = async () => {
      if (!canSubmit.value) return;
      loading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(form.email, form.code);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || "\u9A8C\u8BC1\u7801\u9519\u8BEF");
          loading.value = false;
          return;
        }
        const updateRes = await authApi.updateEmail(form.email);
        if (updateRes.success) {
          ElMessage.success("\u7ED1\u5B9A\u6210\u529F\uFF0C\u8BF7\u53BB\u65B0\u90AE\u7BB1\u67E5\u6536\u786E\u8BA4\u90AE\u4EF6");
          emit("success", form.email);
          handleClose();
        } else {
          ElMessage.error(updateRes.msg || "\u7ED1\u5B9A\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "\u7ED1\u5B9A/\u6362\u7ED1\u90AE\u7BB1",
        width: "500px",
        "submit-text": "\u786E\u8BA4\u7ED1\u5B9A",
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
              _push2(`<!--[--><div class="alert-box" data-v-2cf9f844${_scopeId}> \u4E3A\u4E86\u60A8\u7684\u8D26\u53F7\u5B89\u5168\uFF0C\u8BF7\u5148\u9A8C\u8BC1\u5F53\u524D\u90AE\u7BB1\u3002 </div><div class="form-group" data-v-2cf9f844${_scopeId}><label class="form-label" data-v-2cf9f844${_scopeId}>\u5F53\u524D\u90AE\u7BB1</label><input${ssrRenderAttr("value", __props.currentEmail)} class="form-input" disabled data-v-2cf9f844${_scopeId}></div><div class="form-group" data-v-2cf9f844${_scopeId}><label class="form-label" data-v-2cf9f844${_scopeId}>\u9A8C\u8BC1\u7801</label><div class="input-with-action relative-input-group" data-v-2cf9f844${_scopeId}><input${ssrRenderAttr("value", oldCode.value)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-2cf9f844${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: countdown.value,
                onClick: sendOldCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="step-actions" data-v-2cf9f844${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary",
                block: "",
                onClick: verifyOldEmail,
                disabled: loading.value || oldCode.value.length < 4
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u4E0B\u4E00\u6B65 `);
                  } else {
                    return [
                      createTextVNode(" \u4E0B\u4E00\u6B65 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            } else {
              _push2(`<!--[--><div class="form-group" data-v-2cf9f844${_scopeId}><label class="form-label" data-v-2cf9f844${_scopeId}>\u65B0\u90AE\u7BB1\u5730\u5740</label><input${ssrRenderAttr("value", form.email)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1" type="email" data-v-2cf9f844${_scopeId}></div><div class="form-group" data-v-2cf9f844${_scopeId}><label class="form-label" data-v-2cf9f844${_scopeId}>\u9A8C\u8BC1\u7801</label><div class="input-with-action relative-input-group" data-v-2cf9f844${_scopeId}><input${ssrRenderAttr("value", form.code)} class="form-input" placeholder="\u65B0\u90AE\u7BB1\u9A8C\u8BC1\u7801" maxlength="6" data-v-2cf9f844${_scopeId}>`);
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
                createVNode("div", { class: "alert-box" }, " \u4E3A\u4E86\u60A8\u7684\u8D26\u53F7\u5B89\u5168\uFF0C\u8BF7\u5148\u9A8C\u8BC1\u5F53\u524D\u90AE\u7BB1\u3002 "),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u5F53\u524D\u90AE\u7BB1"),
                  createVNode("input", {
                    value: __props.currentEmail,
                    class: "form-input",
                    disabled: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u9A8C\u8BC1\u7801"),
                  createVNode("div", { class: "input-with-action relative-input-group" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => oldCode.value = $event,
                      class: "form-input",
                      placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
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
                      createTextVNode(" \u4E0B\u4E00\u6B65 ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u65B0\u90AE\u7BB1\u5730\u5740"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.email = $event,
                    class: "form-input",
                    placeholder: "\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1",
                    type: "email"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.email]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u9A8C\u8BC1\u7801"),
                  createVNode("div", { class: "input-with-action relative-input-group" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.code = $event,
                      class: "form-input",
                      placeholder: "\u65B0\u90AE\u7BB1\u9A8C\u8BC1\u7801",
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
const BindEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2cf9f844"]]);
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
        title: "\u7ED1\u5B9A\u8C37\u6B4C\u90AE\u7BB1",
        "show-footer": false,
        "theme-id": "suit-001",
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="google-content" data-v-24ef4ac3${_scopeId}><div class="modal-subtitle" data-v-24ef4ac3${_scopeId}>\u5173\u8054\u60A8\u7684 Google \u8D26\u53F7\u4EE5\u66F4\u5FEB\u6377\u767B\u5F55</div><div class="${ssrRenderClass([{ bound: __props.isBound }, "status-box"])}" data-v-24ef4ac3${_scopeId}><div class="status-icon" data-v-24ef4ac3${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Google" class="google-icon" data-v-24ef4ac3${_scopeId}></div><div class="status-info" data-v-24ef4ac3${_scopeId}><div class="status-label" data-v-24ef4ac3${_scopeId}>\u5F53\u524D\u72B6\u6001</div><div class="status-text" data-v-24ef4ac3${_scopeId}>${ssrInterpolate(__props.isBound ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</div>`);
            if (__props.isBound) {
              _push2(`<div class="bound-email" data-v-24ef4ac3${_scopeId}>${ssrInterpolate(__props.currentGoogleEmail)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.isBound) {
              _push2(`<div class="action-area" data-v-24ef4ac3${_scopeId}><div class="action-tip" data-v-24ef4ac3${_scopeId}>\u5982\u9700\u66F4\u6362\u7ED1\u5B9A\u7684 Google \u8D26\u53F7\uFF0C\u8BF7\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE</div><button class="btn-google" data-v-24ef4ac3${_scopeId}><span class="btn-icon" data-v-24ef4ac3${_scopeId}>G</span> \u6362\u7ED1 Google \u8D26\u53F7 </button></div>`);
            } else {
              _push2(`<div class="action-area" data-v-24ef4ac3${_scopeId}><button class="btn-google" data-v-24ef4ac3${_scopeId}><span class="btn-icon" data-v-24ef4ac3${_scopeId}>G</span> \u7ACB\u5373\u7ED1\u5B9A Google \u8D26\u53F7 </button></div>`);
            }
            _push2(`<div class="modal-footer-tip" data-v-24ef4ac3${_scopeId}> \u7ED1\u5B9A\u540E\u53EF\u76F4\u63A5\u4F7F\u7528 Google \u8D26\u53F7\u767B\u5F55\u51E1\u56FE\u62C9 </div></div>`);
          } else {
            return [
              createVNode("div", { class: "google-content" }, [
                createVNode("div", { class: "modal-subtitle" }, "\u5173\u8054\u60A8\u7684 Google \u8D26\u53F7\u4EE5\u66F4\u5FEB\u6377\u767B\u5F55"),
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
                    createVNode("div", { class: "status-label" }, "\u5F53\u524D\u72B6\u6001"),
                    createVNode("div", { class: "status-text" }, toDisplayString(__props.isBound ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A"), 1),
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
                  createVNode("div", { class: "action-tip" }, "\u5982\u9700\u66F4\u6362\u7ED1\u5B9A\u7684 Google \u8D26\u53F7\uFF0C\u8BF7\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE"),
                  createVNode("button", {
                    class: "btn-google",
                    onClick: handleBind
                  }, [
                    createVNode("span", { class: "btn-icon" }, "G"),
                    createTextVNode(" \u6362\u7ED1 Google \u8D26\u53F7 ")
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
                    createTextVNode(" \u7ACB\u5373\u7ED1\u5B9A Google \u8D26\u53F7 ")
                  ])
                ])),
                createVNode("div", { class: "modal-footer-tip" }, " \u7ED1\u5B9A\u540E\u53EF\u76F4\u63A5\u4F7F\u7528 Google \u8D26\u53F7\u767B\u5F55\u51E1\u56FE\u62C9 ")
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
    useUserStore();
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
          ElMessage.error(res.msg || "\u83B7\u53D6\u4E8C\u7EF4\u7801\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u7F51\u7EDC\u9519\u8BEF");
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
    const handleUnbind = () => {
      ElMessage.info("\u5982\u9700\u89E3\u7ED1\u8BF7\u8054\u7CFB\u5BA2\u670D");
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
        title: "\u7ED1\u5B9A\u5FAE\u4FE1",
        "show-footer": false,
        "theme-id": "suit-001",
        "confirm-theme-id": "suit-001-primary",
        "cancel-theme-id": "suit-001-secondary",
        onClose: handleClose,
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="wechat-bind-content" data-v-f7b315ea${_scopeId}><div class="modal-subtitle" data-v-f7b315ea${_scopeId}>\u7ED1\u5B9A\u5FAE\u4FE1\u540E\uFF0C\u53EF\u4F7F\u7528\u5FAE\u4FE1\u626B\u7801\u5FEB\u6377\u767B\u5F55</div>`);
            if (__props.isBound) {
              _push2(`<div class="bound-state" data-v-f7b315ea${_scopeId}><div class="status-box bound" data-v-f7b315ea${_scopeId}><div class="status-icon" data-v-f7b315ea${_scopeId}>`);
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
              _push2(`</div><div class="status-info" data-v-f7b315ea${_scopeId}><div class="status-label" data-v-f7b315ea${_scopeId}>\u5F53\u524D\u72B6\u6001</div><div class="status-text" data-v-f7b315ea${_scopeId}>\u5DF2\u7ED1\u5B9A\u5FAE\u4FE1</div>`);
              if (__props.openId) {
                _push2(`<div class="bound-meta" data-v-f7b315ea${_scopeId}>OpenID: ${ssrInterpolate(maskOpenId(__props.openId))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="action-area" data-v-f7b315ea${_scopeId}><button class="btn-secondary" disabled data-v-f7b315ea${_scopeId}>`);
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
              _push2(` \u89E3\u9664\u7ED1\u5B9A (\u6682\u672A\u5F00\u653E) </button></div></div>`);
            } else {
              _push2(`<div class="bind-state" data-v-f7b315ea${_scopeId}><div class="qr-container" data-v-f7b315ea${_scopeId}>`);
              if (loading.value) {
                _push2(`<div class="qr-loading" data-v-f7b315ea${_scopeId}><div class="spinner" data-v-f7b315ea${_scopeId}></div><p data-v-f7b315ea${_scopeId}>\u83B7\u53D6\u4E8C\u7EF4\u7801...</p></div>`);
              } else if (qrCodeUrl.value) {
                _push2(`<div class="qr-wrapper" data-v-f7b315ea${_scopeId}><img${ssrRenderAttr("src", qrCodeUrl.value)} class="qr-img" data-v-f7b315ea${_scopeId}>`);
                if (scanStatus.value === "scanned") {
                  _push2(`<div class="qr-overlay" data-v-f7b315ea${_scopeId}>`);
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
                  _push2(`<p data-v-f7b315ea${_scopeId}>\u626B\u63CF\u6210\u529F</p><p class="sub-text" data-v-f7b315ea${_scopeId}>\u6B63\u5728\u7ED1\u5B9A...</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (isExpired.value) {
                  _push2(`<div class="qr-overlay error" data-v-f7b315ea${_scopeId}>`);
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
                  _push2(`<p data-v-f7b315ea${_scopeId}>\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F</p><button class="text-btn" data-v-f7b315ea${_scopeId}>\u70B9\u51FB\u5237\u65B0</button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<div class="qr-error" data-v-f7b315ea${_scopeId}><p data-v-f7b315ea${_scopeId}>\u65E0\u6CD5\u52A0\u8F7D\u4E8C\u7EF4\u7801</p><button class="text-btn" data-v-f7b315ea${_scopeId}>\u91CD\u8BD5</button></div>`);
              }
              _push2(`</div><div class="scan-tip" data-v-f7b315ea${_scopeId}> \u8BF7\u4F7F\u7528 <span class="highlight" data-v-f7b315ea${_scopeId}>\u5FAE\u4FE1</span> \u626B\u4E00\u626B </div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "wechat-bind-content" }, [
                createVNode("div", { class: "modal-subtitle" }, "\u7ED1\u5B9A\u5FAE\u4FE1\u540E\uFF0C\u53EF\u4F7F\u7528\u5FAE\u4FE1\u626B\u7801\u5FEB\u6377\u767B\u5F55"),
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
                      createVNode("div", { class: "status-label" }, "\u5F53\u524D\u72B6\u6001"),
                      createVNode("div", { class: "status-text" }, "\u5DF2\u7ED1\u5B9A\u5FAE\u4FE1"),
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
                      disabled: ""
                    }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(connection_default))
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u89E3\u9664\u7ED1\u5B9A (\u6682\u672A\u5F00\u653E) ")
                    ])
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
                      createVNode("p", null, "\u83B7\u53D6\u4E8C\u7EF4\u7801...")
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
                        createVNode("p", null, "\u626B\u63CF\u6210\u529F"),
                        createVNode("p", { class: "sub-text" }, "\u6B63\u5728\u7ED1\u5B9A...")
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
                        createVNode("p", null, "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F"),
                        createVNode("button", {
                          class: "text-btn",
                          onClick: refreshQrCode
                        }, "\u70B9\u51FB\u5237\u65B0")
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "qr-error"
                    }, [
                      createVNode("p", null, "\u65E0\u6CD5\u52A0\u8F7D\u4E8C\u7EF4\u7801"),
                      createVNode("button", {
                        class: "text-btn",
                        onClick: refreshQrCode
                      }, "\u91CD\u8BD5")
                    ]))
                  ]),
                  createVNode("div", { class: "scan-tip" }, [
                    createTextVNode(" \u8BF7\u4F7F\u7528 "),
                    createVNode("span", { class: "highlight" }, "\u5FAE\u4FE1"),
                    createTextVNode(" \u626B\u4E00\u626B ")
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
const BindWechatModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f7b315ea"]]);
const TIMER_KEY$1 = "otp_change_pwd_timer_end";
const COOLDOWN_SECONDS$1 = 300;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ChangePasswordModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    email: {}
  },
  emits: ["update:visible", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const loading = ref(false);
    const countdown = ref(0);
    let timerInterval = null;
    const form = reactive({
      code: "",
      newPassword: "",
      confirmPassword: ""
    });
    const canSubmit = computed(() => {
      return form.code.length >= 4 && form.newPassword.length >= 6 && form.newPassword === form.confirmPassword;
    });
    const startTimer = (seconds, isNew = true) => {
      countdown.value = seconds;
      if (isNew) {
        const endTime = Date.now() + seconds * 1e3;
        localStorage.setItem(TIMER_KEY$1, endTime.toString());
      }
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval();
    };
    const restoreTimer = () => {
      const endTimeStr = localStorage.getItem(TIMER_KEY$1);
      if (endTimeStr) {
        const endTime = parseInt(endTimeStr, 10);
        const now = Date.now();
        if (endTime > now) {
          const remaining = Math.ceil((endTime - now) / 1e3);
          startTimer(remaining, false);
        } else {
          localStorage.removeItem(TIMER_KEY$1);
        }
      }
    };
    watch(() => props.visible, (val) => {
      if (val) {
        form.code = "";
        form.newPassword = "";
        form.confirmPassword = "";
        restoreTimer();
      }
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const sendCode = async () => {
      if (!props.email) return;
      if (countdown.value > 0) return;
      loading.value = true;
      try {
        const res = await authApi.sendOtp(props.email);
        if (res.success) {
          ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001");
          startTimer(COOLDOWN_SECONDS$1);
        } else {
          ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u53D1\u9001\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const handleConfirm = async () => {
      if (!canSubmit.value || !props.email) return;
      loading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(props.email, form.code);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || "\u9A8C\u8BC1\u7801\u9519\u8BEF");
          loading.value = false;
          return;
        }
        const updateRes = await authApi.updatePassword(form.newPassword);
        if (updateRes.success) {
          ElMessage.success("\u5BC6\u7801\u4FEE\u6539\u6210\u529F");
          handleClose();
        } else {
          ElMessage.error(updateRes.msg || "\u5BC6\u7801\u4FEE\u6539\u5931\u8D25");
        }
      } catch (e) {
        console.error(e);
        ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "\u66F4\u65B0\u5BC6\u7801",
        width: "500px",
        "submit-text": "\u786E\u8BA4\u66F4\u65B0",
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
              _push2(`<div class="alert-box" data-v-fe581f04${_scopeId}> \u8BF7\u5148\u7ED1\u5B9A\u90AE\u7BB1\uFF0C\u4FEE\u6539\u5BC6\u7801\u9700\u8981\u90AE\u7BB1\u9A8C\u8BC1\u3002 </div>`);
            } else {
              _push2(`<!--[--><div class="form-group" data-v-fe581f04${_scopeId}><label class="form-label" data-v-fe581f04${_scopeId}>\u9A8C\u8BC1\u7801</label><div class="input-with-action relative-input-group" data-v-fe581f04${_scopeId}><input${ssrRenderAttr("value", form.code)} class="form-input" placeholder="\u90AE\u7BB1\u9A8C\u8BC1\u7801" maxlength="6" data-v-fe581f04${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: countdown.value,
                onClick: sendCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="form-group" data-v-fe581f04${_scopeId}><label class="form-label" data-v-fe581f04${_scopeId}>\u65B0\u5BC6\u7801</label><input${ssrRenderAttr("value", form.newPassword)} class="form-input" type="password" placeholder="6-20\u4F4D\u5B57\u7B26" data-v-fe581f04${_scopeId}></div><div class="form-group" data-v-fe581f04${_scopeId}><label class="form-label" data-v-fe581f04${_scopeId}>\u786E\u8BA4\u5BC6\u7801</label><input${ssrRenderAttr("value", form.confirmPassword)} class="form-input" type="password" placeholder="\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801" data-v-fe581f04${_scopeId}></div><!--]-->`);
            }
          } else {
            return [
              !__props.email ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert-box"
              }, " \u8BF7\u5148\u7ED1\u5B9A\u90AE\u7BB1\uFF0C\u4FEE\u6539\u5BC6\u7801\u9700\u8981\u90AE\u7BB1\u9A8C\u8BC1\u3002 ")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u9A8C\u8BC1\u7801"),
                  createVNode("div", { class: "input-with-action relative-input-group" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.code = $event,
                      class: "form-input",
                      placeholder: "\u90AE\u7BB1\u9A8C\u8BC1\u7801",
                      maxlength: "6"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, form.code]
                    ]),
                    createVNode(SendCodeButton, {
                      loading: loading.value,
                      countdown: countdown.value,
                      onClick: sendCode
                    }, null, 8, ["loading", "countdown"])
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u65B0\u5BC6\u7801"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.newPassword = $event,
                    class: "form-input",
                    type: "password",
                    placeholder: "6-20\u4F4D\u5B57\u7B26"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, form.newPassword]
                  ])
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u786E\u8BA4\u5BC6\u7801"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => form.confirmPassword = $event,
                    class: "form-input",
                    type: "password",
                    placeholder: "\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ChangePasswordModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-fe581f04"]]);
const TIMER_KEY = "otp_delete_timer_end";
const COOLDOWN_SECONDS = 300;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DeleteAccountModal",
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
    const loading = ref(false);
    const countdown = ref(0);
    let timerInterval = null;
    watch(() => props.visible, (val) => {
      if (val) {
        isConfirmed.value = false;
        otpCode.value = "";
      }
    });
    const startTimer = (seconds, isNew = true) => {
      countdown.value = seconds;
      if (isNew) {
        const endTime = Date.now() + seconds * 1e3;
        localStorage.setItem(TIMER_KEY, endTime.toString());
      }
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval();
    };
    const sendCode = async () => {
      if (countdown.value > 0) return;
      loading.value = true;
      try {
        const res = await authApi.sendOtp(props.email);
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.DELETE_MODAL.CODE_SENT);
          startTimer(COOLDOWN_SECONDS);
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL);
        }
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL);
      } finally {
        loading.value = false;
      }
    };
    const handleDelete = async () => {
      if (!isConfirmed.value || !otpCode.value) return;
      loading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(props.email, otpCode.value);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || CLIENT_MESSAGES.DELETE_MODAL.CODE_ERROR);
          loading.value = false;
          return;
        }
        emit("confirm");
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL);
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: __props.visible,
        title: "\u6CE8\u9500\u8D26\u53F7",
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
                  _push3(`\u53D6\u6D88`);
                } else {
                  return [
                    createTextVNode("\u53D6\u6D88")
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
                  _push3(`${ssrInterpolate(loading.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u6CE8\u9500")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(loading.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u6CE8\u9500"), 1)
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
                  createTextVNode("\u53D6\u6D88")
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
                  createTextVNode(toDisplayString(loading.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u6CE8\u9500"), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="warning-box" data-v-43b08132${_scopeId}><span class="warning-icon" data-v-43b08132${_scopeId}>\u26A0\uFE0F</span><div class="warning-content" data-v-43b08132${_scopeId}> \u8B66\u544A\uFF1A\u8D26\u53F7\u6CE8\u9500\u662F\u4E0D\u53EF\u6062\u590D\u7684\u64CD\u4F5C\u3002\u6240\u6709\u4E2A\u4EBA\u6570\u636E\u3001\u8BA2\u5355\u8BB0\u5F55\u548C\u8D44\u4EA7\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002 </div></div><div class="form-group" data-v-43b08132${_scopeId}><label class="form-label" data-v-43b08132${_scopeId}>\u90AE\u7BB1\u9A8C\u8BC1</label><div class="captcha-row relative-input-group" data-v-43b08132${_scopeId}><input${ssrRenderAttr("value", otpCode.value)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" inputmode="numeric" autocomplete="off" data-v-43b08132${_scopeId}>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: countdown.value,
              onClick: sendCode
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="form-tip" data-v-43b08132${_scopeId}>\u4E3A\u4E86\u60A8\u7684\u8D44\u4EA7\u5B89\u5168\uFF0C\u8BF7\u9A8C\u8BC1\u90AE\u7BB1: ${ssrInterpolate(__props.email)}</p></div><div class="confirmation-area" data-v-43b08132${_scopeId}><label class="checkbox-label" data-v-43b08132${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(isConfirmed.value) ? ssrLooseContain(isConfirmed.value, null) : isConfirmed.value) ? " checked" : ""} data-v-43b08132${_scopeId}><span data-v-43b08132${_scopeId}>\u6211\u5DF2\u4E86\u89E3\u98CE\u9669\uFF0C\u786E\u8BA4\u6CE8\u9500\u5F53\u524D\u8D26\u53F7</span></label></div>`);
          } else {
            return [
              createVNode("div", { class: "warning-box" }, [
                createVNode("span", { class: "warning-icon" }, "\u26A0\uFE0F"),
                createVNode("div", { class: "warning-content" }, " \u8B66\u544A\uFF1A\u8D26\u53F7\u6CE8\u9500\u662F\u4E0D\u53EF\u6062\u590D\u7684\u64CD\u4F5C\u3002\u6240\u6709\u4E2A\u4EBA\u6570\u636E\u3001\u8BA2\u5355\u8BB0\u5F55\u548C\u8D44\u4EA7\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002 ")
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "\u90AE\u7BB1\u9A8C\u8BC1"),
                createVNode("div", { class: "captcha-row relative-input-group" }, [
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => otpCode.value = $event,
                    type: "text",
                    class: "form-input",
                    placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                    maxlength: "6",
                    inputmode: "numeric",
                    autocomplete: "off",
                    onInput: ($event) => otpCode.value = otpCode.value.replace(/\D/g, "")
                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                    [vModelText, otpCode.value]
                  ]),
                  createVNode(SendCodeButton, {
                    loading: loading.value,
                    countdown: countdown.value,
                    onClick: sendCode
                  }, null, 8, ["loading", "countdown"])
                ]),
                createVNode("p", { class: "form-tip" }, "\u4E3A\u4E86\u60A8\u7684\u8D44\u4EA7\u5B89\u5168\uFF0C\u8BF7\u9A8C\u8BC1\u90AE\u7BB1: " + toDisplayString(__props.email), 1)
              ]),
              createVNode("div", { class: "confirmation-area" }, [
                createVNode("label", { class: "checkbox-label" }, [
                  withDirectives(createVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": ($event) => isConfirmed.value = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, isConfirmed.value]
                  ]),
                  createVNode("span", null, "\u6211\u5DF2\u4E86\u89E3\u98CE\u9669\uFF0C\u786E\u8BA4\u6CE8\u9500\u5F53\u524D\u8D26\u53F7")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/DeleteAccountModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-43b08132"]]);
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
          const { ElMessageBox: ElMessageBox2 } = await import('./index-B7VmXi4P.mjs');
          await userStore.logout();
          ElMessageBox2.alert(
            "\u60A8\u7684\u8D26\u53F7\u5DF2\u6210\u529F\u6CE8\u9500\uFF0C\u6240\u6709\u6570\u636E\u5DF2\u88AB\u6C38\u4E45\u5220\u9664\u3002\u611F\u8C22\u60A8\u7684\u4F7F\u7528\uFF01",
            "\u6CE8\u9500\u6210\u529F",
            {
              confirmButtonText: "\u8FD4\u56DE\u9996\u9875",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "personal-info-page" }, _attrs))} data-v-b8de3711><div class="profile-banner" data-v-b8de3711><div class="banner-glass" data-v-b8de3711></div><div class="banner-content" data-v-b8de3711><div class="hero-left" data-v-b8de3711><div class="hero-avatar-wrapper" data-v-b8de3711><img${ssrRenderAttr("src", __props.user.avatar || "/images/client/pc/avatars/avatar-cat.png")} class="hero-avatar" data-v-b8de3711><div class="hero-avatar-overlay" data-v-b8de3711>`);
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
      _push(`</div></div><div class="hero-text" data-v-b8de3711><h1 class="hero-nickname" data-v-b8de3711>${ssrInterpolate(__props.user.nickname)}</h1><div class="hero-tags" data-v-b8de3711><span class="user-tag role-tag" data-v-b8de3711>FANTULA Member</span><span class="user-tag security-tag" data-v-b8de3711>`);
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
      _push(` \u5B89\u5168\u7B49\u7EA7: \u9AD8 </span></div></div></div><div class="hero-actions" data-v-b8de3711><button class="glass-pill-btn primary-glass-btn" data-v-b8de3711>`);
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
      _push(` \u7F16\u8F91\u8D44\u6599 </button></div></div></div><div class="workspace-scroll-area" data-v-b8de3711><div class="workspace-content" data-v-b8de3711><div class="info-grid section-gap" data-v-b8de3711><div class="glass-tile info-tile" data-v-b8de3711><div class="tile-icon-bg" data-v-b8de3711>`);
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
      _push(`</div><div class="tile-header" data-v-b8de3711><div class="tile-label" data-v-b8de3711>\u8D26\u6237 UID</div>`);
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
      _push(`</div><div class="tile-value-group" data-v-b8de3711><span class="tile-value-mono" data-v-b8de3711>${ssrInterpolate(__props.user.uid || __props.user.id || "---")}</span><button class="copy-btn-mini" data-v-b8de3711>`);
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
      _push(`</button></div></div><div class="glass-tile info-tile" data-v-b8de3711><div class="tile-icon-bg" data-v-b8de3711>`);
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
      _push(`</div><div class="tile-header" data-v-b8de3711><div class="tile-label" data-v-b8de3711>\u7ED1\u5B9A\u90AE\u7BB1</div>`);
      if (__props.user.email) {
        _push(`<div class="status-badge success" data-v-b8de3711>\u5DF2\u7ED1\u5B9A</div>`);
      } else {
        _push(`<div class="status-badge warning" data-v-b8de3711>\u672A\u7ED1\u5B9A</div>`);
      }
      _push(`</div><div class="tile-value-group" data-v-b8de3711><span class="tile-value" data-v-b8de3711>${ssrInterpolate(__props.user.email || "\u672A\u7ED1\u5B9A\u90AE\u7BB1")}</span><button class="icon-action-btn" data-v-b8de3711>`);
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
      _push(`</button></div></div><div class="glass-tile info-tile" data-v-b8de3711><div class="tile-icon-bg" data-v-b8de3711>`);
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
      _push(`</div><div class="tile-header" data-v-b8de3711><div class="tile-label" data-v-b8de3711>\u8D26\u53F7\u5B89\u5168</div><div class="status-badge success" data-v-b8de3711>\u4FDD\u62A4\u4E2D</div></div><div class="tile-value-group" data-v-b8de3711><div class="security-level-bar" data-v-b8de3711><div class="level-fill" style="${ssrRenderStyle({ "width": "100%" })}" data-v-b8de3711></div></div><span class="tile-meta" data-v-b8de3711>\u6781\u9AD8</span></div></div></div><div class="command-center section-gap" data-v-b8de3711><h3 class="section-title" data-v-b8de3711>\u8D26\u6237\u7BA1\u7406</h3><div class="command-grid" data-v-b8de3711><div class="action-card-lg" data-v-b8de3711><div class="card-bg-icon" data-v-b8de3711>\u{1F511}</div><div class="card-content" data-v-b8de3711><div class="card-icon-frame blue-frame" data-v-b8de3711>`);
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
      _push(`</div><div class="card-text" data-v-b8de3711><span class="card-title" data-v-b8de3711>\u4FEE\u6539\u5BC6\u7801</span><span class="card-desc" data-v-b8de3711>\u5B9A\u671F\u66F4\u65B0\u5BC6\u7801\u4FDD\u62A4\u8D26\u53F7\u5B89\u5168</span></div></div><div class="card-arrow" data-v-b8de3711>`);
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
      _push(`</div></div><div class="action-card-lg" data-v-b8de3711><div class="card-bg-icon" data-v-b8de3711>\u{1F517}</div><div class="card-content" data-v-b8de3711><div class="card-icon-frame purple-frame" data-v-b8de3711>`);
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
      _push(`</div><div class="card-text" data-v-b8de3711><span class="card-title" data-v-b8de3711>\u8C37\u6B4C\u7ED1\u5B9A</span><span class="card-desc" data-v-b8de3711>\u7ED1\u5B9A Google \u8D26\u53F7\u5FEB\u6377\u767B\u5F55</span></div></div>`);
      if (!__props.user.isGoogleBound) {
        _push(`<div class="card-arrow" data-v-b8de3711>`);
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
        _push(`<div class="status-text-mini" data-v-b8de3711>\u5DF2\u7ED1\u5B9A</div>`);
      }
      _push(`</div><div class="action-card-lg" data-v-b8de3711><div class="card-bg-icon" data-v-b8de3711>\u{1F517}</div><div class="card-content" data-v-b8de3711><div class="card-icon-frame green-frame" data-v-b8de3711>`);
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
      _push(`</div><div class="card-text" data-v-b8de3711><span class="card-title" data-v-b8de3711>\u5FAE\u4FE1\u7ED1\u5B9A</span><span class="card-desc" data-v-b8de3711>\u7ED1\u5B9A\u5FAE\u4FE1\u626B\u7801\u5FEB\u6377\u767B\u5F55</span></div></div>`);
      if (!__props.user.openId) {
        _push(`<div class="card-arrow" data-v-b8de3711>`);
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
        _push(`<div class="status-text-mini" data-v-b8de3711>\u5DF2\u7ED1\u5B9A</div>`);
      }
      _push(`</div><div class="action-card-lg danger-card" data-v-b8de3711><div class="card-bg-icon" data-v-b8de3711>\u26A0\uFE0F</div><div class="card-content" data-v-b8de3711><div class="card-icon-frame red-frame" data-v-b8de3711>`);
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
      _push(`</div><div class="card-text" data-v-b8de3711><span class="card-title" data-v-b8de3711>\u6CE8\u9500\u8D26\u53F7</span><span class="card-desc" data-v-b8de3711>\u6C38\u4E45\u5220\u9664\u8D26\u53F7\u6570\u636E</span></div></div><div class="card-arrow" data-v-b8de3711>`);
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
      _push(ssrRenderComponent(ChangePasswordModal, {
        visible: modals.password,
        "onUpdate:visible": ($event) => modals.password = $event,
        email: __props.user.email,
        onClose: ($event) => closeModal("password")
      }, null, _parent));
      _push(ssrRenderComponent(DeleteAccountModal, {
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
const ProfilePersonalInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b8de3711"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const userInfo = computed(() => {
      var _a, _b;
      const storeUser = userStore.user;
      if (storeUser) {
        return {
          id: storeUser.id,
          uid: storeUser.uid || ((_a = storeUser.id) == null ? void 0 : _a.slice(0, 8)) || "\u672A\u5206\u914D",
          nickname: storeUser.nickName || storeUser.nickname || ((_b = storeUser.email) == null ? void 0 : _b.split("@")[0]) || "\u7528\u6237",
          avatar: storeUser.avatar || "",
          email: storeUser.email || "\u672A\u7ED1\u5B9A",
          isGoogleBound: false,
          googleEmail: ""
        };
      }
      return {
        id: "",
        uid: "---",
        // 占位符比"加载中"更干净
        nickname: "\u7528\u6237",
        // 默认称呼
        avatar: "",
        email: "\u672A\u7ED1\u5B9A",
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

export { _sfc_main as default };
//# sourceMappingURL=index-VJLHg_Mi.mjs.map
