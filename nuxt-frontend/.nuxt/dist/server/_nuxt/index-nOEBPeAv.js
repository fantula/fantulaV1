import { defineComponent, ref, watch, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, nextTick, useSSRContext, withDirectives, withKeys, vModelText, toDisplayString, vModelCheckbox, reactive } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { ad as BaseModal, E as ElIcon, ae as user_filled_default, af as upload_default, ag as check_default, ah as ElMessage, o as getSupabaseClient, _ as _export_sfc, ac as authApi, ai as SendCodeButton, aj as EmailInput, ak as setInterval, d as useUserStore, al as camera_default, am as circle_check_default, an as edit_default, ao as credit_card_default, ap as copy_document_default, aq as message_default, ar as edit_pen_default, as as lock_default, at as key_default, f as arrow_right_default, au as connection_default, a2 as warning_default } from "../server.mjs";
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { E as ElButton } from "./index-DR2tYDZ3.js";
import Cropper from "cropperjs";
import { B as BaseFormModal } from "./BaseFormModal-BLJS1IwQ.js";
import { publicAssetsURL } from "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
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
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ChangeAvatarModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentAvatar: {}
  },
  emits: ["close", "update", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fileInput = ref(null);
    const previewAvatar = ref("");
    const selectedSystemAvatar = ref("");
    const loading = ref(false);
    const previewLoading = ref(false);
    const pendingFile = ref(null);
    const showCropper = ref(false);
    const cropperImage = ref(null);
    const cropperImageSrc = ref("");
    let cropperInstance = null;
    const systemAvatars = [];
    watch(() => props.visible, (val) => {
      if (val) {
        previewAvatar.value = "";
        selectedSystemAvatar.value = "";
        pendingFile.value = null;
        showCropper.value = false;
        destroyCropper();
        if (fileInput.value) fileInput.value.value = "";
      }
    });
    const displayAvatar = computed(() => previewAvatar.value || props.currentAvatar);
    const hasChange = computed(() => {
      return (previewAvatar.value || selectedSystemAvatar.value) && !loading.value && !showCropper.value;
    });
    const triggerUpload = () => {
      fileInput.value?.click();
    };
    const handleImageError = (e) => {
      e.target.src = "";
    };
    const handleFileChange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        ElMessage.warning("图片大小不能超过 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        ElMessage.warning("仅支持 JPG, PNG, WebP 格式");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        cropperImageSrc.value = e.target?.result;
        showCropper.value = true;
        nextTick(() => {
          initCropper();
        });
      };
      reader.readAsDataURL(file);
    };
    const initCropper = () => {
      if (cropperImage.value && !cropperInstance) {
        cropperInstance = new Cropper(cropperImage.value, {
          aspectRatio: 1,
          viewMode: 1,
          minCropBoxWidth: 100,
          minCropBoxHeight: 100,
          background: true,
          guides: true,
          center: true,
          highlight: true,
          cropBoxMovable: true,
          cropBoxResizable: true,
          toggleDragModeOnDblclick: false
        });
      }
    };
    const cancelCrop = () => {
      destroyCropper();
      showCropper.value = false;
      cropperImageSrc.value = "";
    };
    const confirmCrop = async () => {
      if (!cropperInstance) return;
      loading.value = true;
      try {
        const canvas = cropperInstance.getCroppedCanvas({
          width: 200,
          height: 200,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high"
        });
        const blob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob2) => {
              if (blob2) resolve(blob2);
              else reject(new Error("Canvas to blob failed"));
            },
            "image/webp",
            0.85
            // 85% 质量
          );
        });
        pendingFile.value = new File([blob], `avatar_${Date.now()}.webp`, { type: "image/webp" });
        previewAvatar.value = URL.createObjectURL(blob);
        selectedSystemAvatar.value = "";
        destroyCropper();
        showCropper.value = false;
        ElMessage.success('裁剪成功，点击"保存修改"应用头像');
      } catch (e) {
        console.error(e);
        ElMessage.error("裁剪失败");
      } finally {
        loading.value = false;
      }
    };
    const destroyCropper = () => {
      if (cropperInstance) {
        cropperInstance.destroy();
        cropperInstance = null;
      }
    };
    const selectSystemAvatar = (img) => {
      selectedSystemAvatar.value = img;
      previewAvatar.value = img;
      pendingFile.value = null;
    };
    const handleConfirm = async () => {
      loading.value = true;
      let finalAvatarUrl = selectedSystemAvatar.value || props.currentAvatar;
      try {
        if (pendingFile.value) {
          const client = getSupabaseClient();
          const { data: { user } } = await client.auth.getUser();
          if (!user) throw new Error("未登录");
          const fileName = `avatar_${Date.now()}.webp`;
          const filePath = `${user.id}/${fileName}`;
          const { error: uploadError } = await client.storage.from("avatars").upload(filePath, pendingFile.value, { upsert: true });
          if (uploadError) throw uploadError;
          const { data: publicData } = client.storage.from("avatars").getPublicUrl(filePath);
          finalAvatarUrl = publicData.publicUrl;
        }
        emit("update", finalAvatarUrl);
      } catch (e) {
        console.error(e);
        ElMessage.error("上传失败: " + (e.message || "未知错误"));
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: __props.visible,
        title: "修改头像",
        width: "560px",
        "confirm-text": "保存修改",
        loading: loading.value,
        "confirm-disabled": !hasChange.value,
        "show-mascot": "",
        "mascot-position": "bottom",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        onConfirm: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="avatar-preview-section" data-v-a62b4ced${_scopeId}><div class="preview-wrapper" data-v-a62b4ced${_scopeId}>`);
            if (previewLoading.value) {
              _push2(`<div class="preview-skeleton" data-v-a62b4ced${_scopeId}></div>`);
            } else if (displayAvatar.value) {
              _push2(`<img${ssrRenderAttr("src", displayAvatar.value)} class="preview-avatar" data-v-a62b4ced${_scopeId}>`);
            } else {
              _push2(`<div class="preview-avatar-placeholder" data-v-a62b4ced${_scopeId}>`);
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
            _push2(`</div><div class="upload-btn-wrapper" data-v-a62b4ced${_scopeId}><button class="btn-upload" data-v-a62b4ced${_scopeId}>`);
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
            _push2(` 上传新头像 </button><input type="file" hidden accept="image/png,image/jpeg,image/webp" data-v-a62b4ced${_scopeId}><div class="upload-tip" data-v-a62b4ced${_scopeId}>支持 JPG, PNG, WebP 格式，上传后自动裁剪压缩</div><div class="upload-limit" data-v-a62b4ced${_scopeId}>最大 5MB，将压缩为 200x200px</div></div></div>`);
            if (showCropper.value) {
              _push2(`<div class="cropper-section" data-v-a62b4ced${_scopeId}><div class="cropper-container" data-v-a62b4ced${_scopeId}><img${ssrRenderAttr("src", cropperImageSrc.value)} data-v-a62b4ced${_scopeId}></div><div class="cropper-actions" data-v-a62b4ced${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, { onClick: cancelCrop }, {
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
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: confirmCrop
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`确认裁剪`);
                  } else {
                    return [
                      createTextVNode("确认裁剪")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="system-avatars-section" data-v-a62b4ced${_scopeId}><div class="section-title" data-v-a62b4ced${_scopeId}>系统推荐头像</div><div class="avatar-grid" data-v-a62b4ced${_scopeId}><!--[-->`);
              ssrRenderList(systemAvatars, (img, index) => {
                _push2(`<div class="${ssrRenderClass([{ active: selectedSystemAvatar.value === img }, "avatar-item"])}" data-v-a62b4ced${_scopeId}><img${ssrRenderAttr("src", img)} class="system-avatar-img" loading="lazy" data-v-a62b4ced${_scopeId}>`);
                if (selectedSystemAvatar.value === img) {
                  _push2(`<div class="check-mark-overlay" data-v-a62b4ced${_scopeId}>`);
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
            }
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
                    createTextVNode(" 上传新头像 ")
                  ]),
                  createVNode("input", {
                    type: "file",
                    ref_key: "fileInput",
                    ref: fileInput,
                    hidden: "",
                    accept: "image/png,image/jpeg,image/webp",
                    onChange: handleFileChange
                  }, null, 544),
                  createVNode("div", { class: "upload-tip" }, "支持 JPG, PNG, WebP 格式，上传后自动裁剪压缩"),
                  createVNode("div", { class: "upload-limit" }, "最大 5MB，将压缩为 200x200px")
                ])
              ]),
              showCropper.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "cropper-section"
              }, [
                createVNode("div", {
                  class: "cropper-container",
                  ref: "cropperContainer"
                }, [
                  createVNode("img", {
                    ref_key: "cropperImage",
                    ref: cropperImage,
                    src: cropperImageSrc.value
                  }, null, 8, ["src"])
                ], 512),
                createVNode("div", { class: "cropper-actions" }, [
                  createVNode(_component_el_button, { onClick: cancelCrop }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: confirmCrop
                  }, {
                    default: withCtx(() => [
                      createTextVNode("确认裁剪")
                    ]),
                    _: 1
                  })
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "system-avatars-section"
              }, [
                createVNode("div", { class: "section-title" }, "系统推荐头像"),
                createVNode("div", { class: "avatar-grid" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(systemAvatars, (img, index) => {
                    return createVNode("div", {
                      key: index,
                      class: ["avatar-item", { active: selectedSystemAvatar.value === img }],
                      onClick: ($event) => selectSystemAvatar(img)
                    }, [
                      createVNode("img", {
                        src: img,
                        class: "system-avatar-img",
                        loading: "lazy"
                      }, null, 8, ["src"]),
                      selectedSystemAvatar.value === img ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "check-mark-overlay"
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
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChangeAvatarModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ChangeAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-a62b4ced"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ChangeNicknameModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentNickname: {}
  },
  emits: ["close", "update", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const newNickname = ref(props.currentNickname);
    const loading = ref(false);
    watch(() => props.visible, (val) => {
      if (val) {
        newNickname.value = props.currentNickname;
      }
    });
    const isValid = computed(() => {
      return newNickname.value.trim().length >= 2 && newNickname.value !== props.currentNickname && !loading.value;
    });
    const handleUpdate = async () => {
      if (!isValid.value) return;
      loading.value = true;
      try {
        const res = await authApi.updateProfile({ nickname: newNickname.value });
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.NICKNAME_MODAL.SUCCESS);
          emit("update", newNickname.value);
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.NICKNAME_MODAL.FAIL);
        }
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.NICKNAME_MODAL.FAIL);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: __props.visible,
        title: "修改昵称",
        "confirm-text": "确认修改",
        loading: loading.value,
        "confirm-disabled": !isValid.value,
        "show-mascot": "",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        onConfirm: handleUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-group"${_scopeId}><label class="form-label"${_scopeId}>新昵称</label><input${ssrRenderAttr("value", newNickname.value)} type="text" class="form-input" placeholder="请输入新昵称"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "新昵称"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => newNickname.value = $event,
                  type: "text",
                  class: "form-input",
                  placeholder: "请输入新昵称",
                  onKeyup: withKeys(handleUpdate, ["enter"])
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, newNickname.value]
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChangeNicknameModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const TIMER_KEY$2 = "otp_change_email_timer_end";
const COOLDOWN_SECONDS$2 = 300;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BindEmailModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentEmail: {}
  },
  emits: ["close", "confirm", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const step = ref(1);
    const currentCode = ref("");
    const newEmail = ref("");
    const countdown = ref(0);
    const loading = ref(false);
    let timerInterval = null;
    watch(() => props.visible, (val) => {
      if (val) {
        step.value = 1;
        currentCode.value = "";
        newEmail.value = "";
      }
    });
    const cancelText = computed(() => "取消");
    const submitText = computed(() => {
      if (loading.value) return step.value === 1 ? "验证中..." : "提交中...";
      return step.value === 1 ? "下一步" : "确认换绑";
    });
    const submitDisabled = computed(() => {
      if (step.value === 1) return !currentCode.value || currentCode.value.length < 4 || loading.value;
      return !isValidEmail.value || loading.value;
    });
    const handleStepSubmit = () => {
      if (step.value === 1) {
        verifyCurrentEmail();
      } else {
        handleConfirm();
      }
    };
    const isValidEmail = computed(() => {
      return newEmail.value && newEmail.value.includes("@") && newEmail.value !== props.currentEmail;
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
    async function sendCurrentEmailCode() {
      if (!props.currentEmail || countdown.value > 0 || loading.value) return;
      loading.value = true;
      try {
        const res = await authApi.sendOtp(props.currentEmail);
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.EMAIL_MODAL.CODE_SENT);
          startTimer(COOLDOWN_SECONDS$2);
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL);
        }
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL);
      } finally {
        loading.value = false;
      }
    }
    async function verifyCurrentEmail() {
      if (!currentCode.value || currentCode.value.length < 4 || loading.value) return;
      loading.value = true;
      try {
        const res = await authApi.verifyOtp(props.currentEmail, currentCode.value);
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.EMAIL_MODAL.VERIFY_SUCCESS);
          step.value = 2;
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL);
        }
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL);
      } finally {
        loading.value = false;
      }
    }
    async function handleConfirm() {
      if (!isValidEmail.value || loading.value) return;
      if (newEmail.value === props.currentEmail) {
        ElMessage.error(CLIENT_MESSAGES.EMAIL_MODAL.SAME_EMAIL);
        return;
      }
      loading.value = true;
      try {
        const checkRes = await authApi.checkEmailAvailable(newEmail.value);
        if (!checkRes.success) {
          ElMessage.error(CLIENT_MESSAGES.EMAIL_MODAL.EMAIL_OCCUPIED);
          loading.value = false;
          return;
        }
        const res = await authApi.updateEmail(newEmail.value);
        if (res.success) {
          ElMessage.success(CLIENT_MESSAGES.EMAIL_MODAL.CONFIRM_SENT);
          emit("confirm", newEmail.value);
          emit("close");
        } else {
          ElMessage.error(res.msg || "换绑失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "换绑失败");
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "换绑邮箱",
        width: "500px",
        "theme-id": "suit-001",
        "cancel-text": cancelText.value,
        "confirm-text": submitText.value,
        loading: loading.value,
        "confirm-disabled": submitDisabled.value,
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        onConfirm: handleStepSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (step.value === 1) {
              _push2(`<div class="step-content" data-v-ed6c3eab${_scopeId}><div class="step-indicator" data-v-ed6c3eab${_scopeId}><span class="step-badge active" data-v-ed6c3eab${_scopeId}>1</span><span class="step-line" data-v-ed6c3eab${_scopeId}></span><span class="step-badge" data-v-ed6c3eab${_scopeId}>2</span></div><p class="step-title" data-v-ed6c3eab${_scopeId}>验证当前邮箱</p><p class="step-desc" data-v-ed6c3eab${_scopeId}>为确保账号安全，请先验证您的当前邮箱</p><div class="form-group" data-v-ed6c3eab${_scopeId}><label class="form-label" data-v-ed6c3eab${_scopeId}>当前邮箱</label><input${ssrRenderAttr("value", __props.currentEmail)} type="email" class="form-input" disabled data-v-ed6c3eab${_scopeId}></div><div class="form-group code-group-wrapper" data-v-ed6c3eab${_scopeId}><label class="form-label" data-v-ed6c3eab${_scopeId}>验证码</label><div class="code-group-inner" data-v-ed6c3eab${_scopeId}><input${ssrRenderAttr("value", currentCode.value)} type="text" class="form-input code-input" placeholder="请输入验证码" maxlength="6" inputmode="numeric" autocomplete="off" data-v-ed6c3eab${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: countdown.value,
                onClick: sendCurrentEmailCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="form-tip" data-v-ed6c3eab${_scopeId}>验证码将发送至: ${ssrInterpolate(__props.currentEmail)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (step.value === 2) {
              _push2(`<div class="step-content" data-v-ed6c3eab${_scopeId}><div class="step-indicator" data-v-ed6c3eab${_scopeId}><span class="step-badge done" data-v-ed6c3eab${_scopeId}>✓</span><span class="step-line done" data-v-ed6c3eab${_scopeId}></span><span class="step-badge active" data-v-ed6c3eab${_scopeId}>2</span></div><p class="step-title" data-v-ed6c3eab${_scopeId}>设置新邮箱</p><p class="step-desc" data-v-ed6c3eab${_scopeId}>输入您要绑定的新邮箱地址</p><div class="form-group" data-v-ed6c3eab${_scopeId}><label class="form-label" data-v-ed6c3eab${_scopeId}>新邮箱地址</label>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: newEmail.value,
                "onUpdate:modelValue": ($event) => newEmail.value = $event,
                placeholder: "请输入新邮箱"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="info-box" data-v-ed6c3eab${_scopeId}><span class="info-icon" data-v-ed6c3eab${_scopeId}>ℹ️</span><span data-v-ed6c3eab${_scopeId}>确认后，系统将向新邮箱发送确认链接，点击链接即可完成换绑</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              step.value === 1 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "step-content"
              }, [
                createVNode("div", { class: "step-indicator" }, [
                  createVNode("span", { class: "step-badge active" }, "1"),
                  createVNode("span", { class: "step-line" }),
                  createVNode("span", { class: "step-badge" }, "2")
                ]),
                createVNode("p", { class: "step-title" }, "验证当前邮箱"),
                createVNode("p", { class: "step-desc" }, "为确保账号安全，请先验证您的当前邮箱"),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "当前邮箱"),
                  createVNode("input", {
                    value: __props.currentEmail,
                    type: "email",
                    class: "form-input",
                    disabled: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "form-group code-group-wrapper" }, [
                  createVNode("label", { class: "form-label" }, "验证码"),
                  createVNode("div", { class: "code-group-inner" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => currentCode.value = $event,
                      type: "text",
                      class: "form-input code-input",
                      placeholder: "请输入验证码",
                      maxlength: "6",
                      inputmode: "numeric",
                      autocomplete: "off",
                      onInput: ($event) => currentCode.value = currentCode.value.replace(/\D/g, "")
                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                      [vModelText, currentCode.value]
                    ]),
                    createVNode(SendCodeButton, {
                      loading: loading.value,
                      countdown: countdown.value,
                      onClick: sendCurrentEmailCode
                    }, null, 8, ["loading", "countdown"])
                  ])
                ]),
                createVNode("div", { class: "form-tip" }, "验证码将发送至: " + toDisplayString(__props.currentEmail), 1)
              ])) : createCommentVNode("", true),
              step.value === 2 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "step-content"
              }, [
                createVNode("div", { class: "step-indicator" }, [
                  createVNode("span", { class: "step-badge done" }, "✓"),
                  createVNode("span", { class: "step-line done" }),
                  createVNode("span", { class: "step-badge active" }, "2")
                ]),
                createVNode("p", { class: "step-title" }, "设置新邮箱"),
                createVNode("p", { class: "step-desc" }, "输入您要绑定的新邮箱地址"),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "新邮箱地址"),
                  createVNode(EmailInput, {
                    modelValue: newEmail.value,
                    "onUpdate:modelValue": ($event) => newEmail.value = $event,
                    placeholder: "请输入新邮箱"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "info-box" }, [
                  createVNode("span", { class: "info-icon" }, "ℹ️"),
                  createVNode("span", null, "确认后，系统将向新邮箱发送确认链接，点击链接即可完成换绑")
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BindEmailModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BindEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ed6c3eab"]]);
const _imports_0 = publicAssetsURL("/images/shared/oauth-google.png");
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="google-content" data-v-78cbf845${_scopeId}><div class="modal-subtitle" data-v-78cbf845${_scopeId}>关联您的 Google 账号以更快捷登录</div><div class="${ssrRenderClass([{ bound: __props.isBound }, "status-box"])}" data-v-78cbf845${_scopeId}><div class="status-icon" data-v-78cbf845${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Google" class="google-icon" data-v-78cbf845${_scopeId}></div><div class="status-info" data-v-78cbf845${_scopeId}><div class="status-label" data-v-78cbf845${_scopeId}>当前状态</div><div class="status-text" data-v-78cbf845${_scopeId}>${ssrInterpolate(__props.isBound ? "已绑定" : "未绑定")}</div>`);
            if (__props.isBound) {
              _push2(`<div class="bound-email" data-v-78cbf845${_scopeId}>${ssrInterpolate(__props.currentGoogleEmail)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.isBound) {
              _push2(`<div class="action-area" data-v-78cbf845${_scopeId}><div class="action-tip" data-v-78cbf845${_scopeId}>如需更换绑定的 Google 账号，请点击下方按钮</div><button class="btn-google" data-v-78cbf845${_scopeId}><span class="btn-icon" data-v-78cbf845${_scopeId}>G</span> 换绑 Google 账号 </button></div>`);
            } else {
              _push2(`<div class="action-area" data-v-78cbf845${_scopeId}><button class="btn-google" data-v-78cbf845${_scopeId}><span class="btn-icon" data-v-78cbf845${_scopeId}>G</span> 立即绑定 Google 账号 </button></div>`);
            }
            _push2(`<div class="modal-footer-tip" data-v-78cbf845${_scopeId}> 绑定后可直接使用 Google 账号登录凡图拉 </div></div>`);
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BindGoogleModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BindGoogleModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-78cbf845"]]);
const TIMER_KEY$1 = "otp_password_timer_end";
const COOLDOWN_SECONDS$1 = 300;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ChangePasswordModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    email: {}
  },
  emits: ["close", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const otpCode = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const strength = ref(0);
    const loading = ref(false);
    const countdown = ref(0);
    let timerInterval = null;
    watch(() => props.visible, (val) => {
      if (val) {
        otpCode.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
        strength.value = 0;
      }
    });
    const userEmail = computed(() => props.email || "当前账户");
    const startTimer = (seconds, isNew = true) => {
      countdown.value = seconds;
      if (isNew) {
        const endTime = Date.now() + seconds * 1e3;
        localStorage.setItem(TIMER_KEY$1, endTime.toString());
      }
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval();
    };
    const checkStrength = () => {
      let s = 0;
      if (newPassword.value.length >= 8) s++;
      if (/\d/.test(newPassword.value)) s++;
      if (/[a-zA-Z]/.test(newPassword.value)) s++;
      if (/[^a-zA-Z0-9]/.test(newPassword.value)) s++;
      strength.value = s;
    };
    const strengthText = computed(() => {
      const arr = ["弱", "弱", "中", "强", "很强"];
      return arr[strength.value >= 0 && strength.value < arr.length ? strength.value : 0];
    });
    const strengthClass = computed(() => {
      const arr = ["weak", "weak", "medium", "strong", "very-strong"];
      return arr[strength.value >= 0 && strength.value < arr.length ? strength.value : 0];
    });
    const canSubmit = computed(() => {
      return otpCode.value.length >= 4 && newPassword.value.length >= 8 && /\d/.test(newPassword.value) && /[a-zA-Z]/.test(newPassword.value) && confirmPassword.value === newPassword.value;
    });
    const sendCode = async () => {
      if (countdown.value > 0 || loading.value) return;
      loading.value = true;
      try {
        const res = await authApi.sendOtp(props.email);
        if (res.success) {
          startTimer(COOLDOWN_SECONDS$1);
          ElMessage.success(CLIENT_MESSAGES.PASSWORD_MODAL.CODE_SENT);
        } else {
          ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL);
        }
      } catch (e) {
        ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL);
      } finally {
        loading.value = false;
      }
    };
    const handleSubmit = async () => {
      if (!canSubmit.value || loading.value) return;
      loading.value = true;
      try {
        const verifyRes = await authApi.verifyOtp(props.email, otpCode.value);
        if (!verifyRes.success) {
          ElMessage.error(verifyRes.msg || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL);
          loading.value = false;
          return;
        }
        const updateRes = await authApi.updatePassword(newPassword.value);
        if (updateRes.success) {
          ElMessage.success(CLIENT_MESSAGES.PASSWORD_MODAL.SUCCESS);
          emit("close");
        } else {
          ElMessage.error(updateRes.msg || CLIENT_MESSAGES.PASSWORD_MODAL.FAIL);
        }
      } catch (e) {
        if (e.message?.toLowerCase().includes("different")) {
          ElMessage.error(CLIENT_MESSAGES.PASSWORD_MODAL.SAME_PASSWORD);
        } else {
          ElMessage.error(e.message || CLIENT_MESSAGES.GLOBAL.UNKNOWN_ERROR);
        }
      } finally {
        loading.value = false;
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
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-group code-group-wrapper" data-v-c50a4b17${_scopeId}><label class="form-label" data-v-c50a4b17${_scopeId}>邮箱验证码</label><div class="code-group-inner" data-v-c50a4b17${_scopeId}><input type="text"${ssrRenderAttr("value", otpCode.value)} class="form-input code-input" placeholder="请输入验证码" maxlength="6" inputmode="numeric" autocomplete="off" data-v-c50a4b17${_scopeId}>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: countdown.value,
              onClick: sendCode
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="form-tip" data-v-c50a4b17${_scopeId}>验证码将发送至: ${ssrInterpolate(userEmail.value)}</p></div><div class="form-group" data-v-c50a4b17${_scopeId}><label class="form-label" data-v-c50a4b17${_scopeId}>新密码</label><input${ssrRenderAttr("value", newPassword.value)} type="password" class="form-input" placeholder="请输入新密码 (至少8位,包含数字和字母)" autocomplete="new-password" data-v-c50a4b17${_scopeId}>`);
            if (newPassword.value) {
              _push2(`<div class="password-strength" data-v-c50a4b17${_scopeId}> 强度: <span class="${ssrRenderClass(strengthClass.value)}" data-v-c50a4b17${_scopeId}>${ssrInterpolate(strengthText.value)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-c50a4b17${_scopeId}><label class="form-label" data-v-c50a4b17${_scopeId}>确认新密码</label><input${ssrRenderAttr("value", confirmPassword.value)} type="password" class="form-input" placeholder="请再次输入新密码" autocomplete="new-password" data-v-c50a4b17${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "form-group code-group-wrapper" }, [
                createVNode("label", { class: "form-label" }, "邮箱验证码"),
                createVNode("div", { class: "code-group-inner" }, [
                  withDirectives(createVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": ($event) => otpCode.value = $event,
                    class: "form-input code-input",
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
                    countdown: countdown.value,
                    onClick: sendCode
                  }, null, 8, ["loading", "countdown"])
                ]),
                createVNode("p", { class: "form-tip" }, "验证码将发送至: " + toDisplayString(userEmail.value), 1)
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "新密码"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => newPassword.value = $event,
                  type: "password",
                  class: "form-input",
                  placeholder: "请输入新密码 (至少8位,包含数字和字母)",
                  onInput: checkStrength,
                  autocomplete: "new-password"
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, newPassword.value]
                ]),
                newPassword.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "password-strength"
                }, [
                  createTextVNode(" 强度: "),
                  createVNode("span", { class: strengthClass.value }, toDisplayString(strengthText.value), 3)
                ])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "确认新密码"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => confirmPassword.value = $event,
                  type: "password",
                  class: "form-input",
                  placeholder: "请再次输入新密码",
                  autocomplete: "new-password"
                }, null, 8, ["onUpdate:modelValue"]), [
                  [vModelText, confirmPassword.value]
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChangePasswordModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c50a4b17"]]);
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
      const _component_BaseModal = BaseModal;
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
            _push2(`<button class="base-modal-cancel" data-v-852eaafe${_scopeId}>取消</button><button class="delete-btn"${ssrIncludeBooleanAttr(!isConfirmed.value || !otpCode.value || loading.value) ? " disabled" : ""} data-v-852eaafe${_scopeId}>${ssrInterpolate(loading.value ? "处理中..." : "确认注销")}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "base-modal-cancel",
                onClick: ($event) => _ctx.$emit("close")
              }, "取消", 8, ["onClick"]),
              createVNode("button", {
                class: "delete-btn",
                disabled: !isConfirmed.value || !otpCode.value || loading.value,
                onClick: handleDelete
              }, toDisplayString(loading.value ? "处理中..." : "确认注销"), 9, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="warning-box" data-v-852eaafe${_scopeId}><span class="warning-icon" data-v-852eaafe${_scopeId}>⚠️</span><div class="warning-content" data-v-852eaafe${_scopeId}> 警告：账号注销是不可恢复的操作。所有个人数据、订单记录和资产将被永久删除。 </div></div><div class="form-group" data-v-852eaafe${_scopeId}><label class="form-label" data-v-852eaafe${_scopeId}>邮箱验证</label><div class="captcha-row" data-v-852eaafe${_scopeId}><input${ssrRenderAttr("value", otpCode.value)} type="text" class="form-input" placeholder="请输入验证码" maxlength="6" inputmode="numeric" autocomplete="off" data-v-852eaafe${_scopeId}><button class="send-code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-852eaafe${_scopeId}>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s后重发` : "获取验证码")}</button></div><p class="form-tip" data-v-852eaafe${_scopeId}>为了您的资产安全，请验证邮箱: ${ssrInterpolate(__props.email)}</p></div><div class="confirmation-area" data-v-852eaafe${_scopeId}><label class="checkbox-label" data-v-852eaafe${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(isConfirmed.value) ? ssrLooseContain(isConfirmed.value, null) : isConfirmed.value) ? " checked" : ""} data-v-852eaafe${_scopeId}><span data-v-852eaafe${_scopeId}>我已了解风险，确认注销当前账号</span></label></div>`);
          } else {
            return [
              createVNode("div", { class: "warning-box" }, [
                createVNode("span", { class: "warning-icon" }, "⚠️"),
                createVNode("div", { class: "warning-content" }, " 警告：账号注销是不可恢复的操作。所有个人数据、订单记录和资产将被永久删除。 ")
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "邮箱验证"),
                createVNode("div", { class: "captcha-row" }, [
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
                  createVNode("button", {
                    class: "send-code-btn",
                    disabled: countdown.value > 0 || loading.value,
                    onClick: sendCode
                  }, toDisplayString(countdown.value > 0 ? `${countdown.value}s后重发` : "获取验证码"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DeleteAccountModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-852eaafe"]]);
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
    const handleDeleteAccount = async () => {
      try {
        const res = await authApi.deleteAccount();
        if (res.success) {
          const { ElMessageBox: ElMessageBox2 } = await import("./index-DfyAzYq5.js");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "personal-info-page" }, _attrs))} data-v-a2af28c4><div class="profile-banner" data-v-a2af28c4><div class="banner-glass" data-v-a2af28c4></div><div class="banner-content" data-v-a2af28c4><div class="hero-left" data-v-a2af28c4><div class="hero-avatar-wrapper" data-v-a2af28c4><img${ssrRenderAttr("src", __props.user.avatar || "/images/client/pc/avatars/avatar-cat.png")} class="hero-avatar" data-v-a2af28c4><div class="hero-avatar-overlay" data-v-a2af28c4>`);
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
      _push(`</div></div><div class="hero-text" data-v-a2af28c4><h1 class="hero-nickname" data-v-a2af28c4>${ssrInterpolate(__props.user.nickname)}</h1><div class="hero-tags" data-v-a2af28c4><span class="user-tag role-tag" data-v-a2af28c4>FANTULA Member</span><span class="user-tag security-tag" data-v-a2af28c4>`);
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
      _push(` 安全等级: 高 </span></div></div></div><div class="hero-actions" data-v-a2af28c4><button class="glass-pill-btn primary-glass-btn" data-v-a2af28c4>`);
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
      _push(` 编辑资料 </button></div></div></div><div class="workspace-scroll-area" data-v-a2af28c4><div class="workspace-content" data-v-a2af28c4><div class="info-grid section-gap" data-v-a2af28c4><div class="glass-tile info-tile" data-v-a2af28c4><div class="tile-icon-bg" data-v-a2af28c4>`);
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
      _push(`</div><div class="tile-header" data-v-a2af28c4><div class="tile-label" data-v-a2af28c4>账户 UID</div>`);
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
      _push(`</div><div class="tile-value-group" data-v-a2af28c4><span class="tile-value-mono" data-v-a2af28c4>${ssrInterpolate(__props.user.uid || __props.user.id || "---")}</span><button class="copy-btn-mini" data-v-a2af28c4>`);
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
      _push(`</button></div></div><div class="glass-tile info-tile" data-v-a2af28c4><div class="tile-icon-bg" data-v-a2af28c4>`);
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
      _push(`</div><div class="tile-header" data-v-a2af28c4><div class="tile-label" data-v-a2af28c4>绑定邮箱</div>`);
      if (__props.user.email) {
        _push(`<div class="status-badge success" data-v-a2af28c4>已绑定</div>`);
      } else {
        _push(`<div class="status-badge warning" data-v-a2af28c4>未绑定</div>`);
      }
      _push(`</div><div class="tile-value-group" data-v-a2af28c4><span class="tile-value" data-v-a2af28c4>${ssrInterpolate(__props.user.email || "未绑定邮箱")}</span><button class="icon-action-btn" data-v-a2af28c4>`);
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
      _push(`</button></div></div><div class="glass-tile info-tile" data-v-a2af28c4><div class="tile-icon-bg" data-v-a2af28c4>`);
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
      _push(`</div><div class="tile-header" data-v-a2af28c4><div class="tile-label" data-v-a2af28c4>账号安全</div><div class="status-badge success" data-v-a2af28c4>保护中</div></div><div class="tile-value-group" data-v-a2af28c4><div class="security-level-bar" data-v-a2af28c4><div class="level-fill" style="${ssrRenderStyle({ "width": "100%" })}" data-v-a2af28c4></div></div><span class="tile-meta" data-v-a2af28c4>极高</span></div></div></div><div class="command-center section-gap" data-v-a2af28c4><h3 class="section-title" data-v-a2af28c4>账户管理</h3><div class="command-grid" data-v-a2af28c4><div class="action-card-lg" data-v-a2af28c4><div class="card-bg-icon" data-v-a2af28c4>🔑</div><div class="card-content" data-v-a2af28c4><div class="card-icon-frame blue-frame" data-v-a2af28c4>`);
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
      _push(`</div><div class="card-text" data-v-a2af28c4><span class="card-title" data-v-a2af28c4>修改密码</span><span class="card-desc" data-v-a2af28c4>定期更新密码保护账号安全</span></div></div><div class="card-arrow" data-v-a2af28c4>`);
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
      _push(`</div></div><div class="action-card-lg" data-v-a2af28c4><div class="card-bg-icon" data-v-a2af28c4>🔗</div><div class="card-content" data-v-a2af28c4><div class="card-icon-frame purple-frame" data-v-a2af28c4>`);
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
      _push(`</div><div class="card-text" data-v-a2af28c4><span class="card-title" data-v-a2af28c4>账号绑定</span><span class="card-desc" data-v-a2af28c4>Google / 微信 快捷登录</span></div></div><div class="card-arrow" data-v-a2af28c4>`);
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
      _push(`</div></div><div class="action-card-lg danger-card" data-v-a2af28c4><div class="card-bg-icon" data-v-a2af28c4>⚠️</div><div class="card-content" data-v-a2af28c4><div class="card-icon-frame red-frame" data-v-a2af28c4>`);
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
      _push(`</div><div class="card-text" data-v-a2af28c4><span class="card-title" data-v-a2af28c4>注销账号</span><span class="card-desc" data-v-a2af28c4>永久删除账号数据</span></div></div><div class="card-arrow" data-v-a2af28c4>`);
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
      _push(ssrRenderComponent(_sfc_main$6, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfilePersonalInfo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProfilePersonalInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a2af28c4"]]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-nOEBPeAv.js.map
