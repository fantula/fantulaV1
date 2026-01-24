import { defineComponent, computed, mergeProps, reactive, withCtx, unref, createVNode, ref, watch, withDirectives, withKeys, vModelText, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, vModelCheckbox, nextTick, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { d as useUserStore, _ as _export_sfc, E as ElIcon, al as camera_default, am as circle_check_default, an as edit_default, ao as credit_card_default, ap as copy_document_default, aq as message_default, ar as edit_pen_default, as as lock_default, at as key_default, f as arrow_right_default, au as connection_default, a2 as warning_default, ac as authApi, ah as ElMessage, ad as BaseModal, ae as user_filled_default, af as upload_default, ag as check_default, ai as SendCodeButton, aj as EmailInput, o as getSupabaseClient, ak as setInterval } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import Cropper from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cropperjs/dist/cropper.common.js';
import { B as BaseFormModal } from './BaseFormModal-BLJS1IwQ.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'node:crypto';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';

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
      var _a;
      (_a = fileInput.value) == null ? void 0 : _a.click();
    };
    const handleImageError = (e) => {
      e.target.src = "";
    };
    const handleFileChange = async (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        ElMessage.warning("\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        ElMessage.warning("\u4EC5\u652F\u6301 JPG, PNG, WebP \u683C\u5F0F");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        cropperImageSrc.value = (_a2 = e.target) == null ? void 0 : _a2.result;
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
        ElMessage.success('\u88C1\u526A\u6210\u529F\uFF0C\u70B9\u51FB"\u4FDD\u5B58\u4FEE\u6539"\u5E94\u7528\u5934\u50CF');
      } catch (e) {
        console.error(e);
        ElMessage.error("\u88C1\u526A\u5931\u8D25");
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
          if (!user) throw new Error("\u672A\u767B\u5F55");
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
        ElMessage.error("\u4E0A\u4F20\u5931\u8D25: " + (e.message || "\u672A\u77E5\u9519\u8BEF"));
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: __props.visible,
        title: "\u4FEE\u6539\u5934\u50CF",
        width: "560px",
        "confirm-text": "\u4FDD\u5B58\u4FEE\u6539",
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
            _push2(` \u4E0A\u4F20\u65B0\u5934\u50CF </button><input type="file" hidden accept="image/png,image/jpeg,image/webp" data-v-a62b4ced${_scopeId}><div class="upload-tip" data-v-a62b4ced${_scopeId}>\u652F\u6301 JPG, PNG, WebP \u683C\u5F0F\uFF0C\u4E0A\u4F20\u540E\u81EA\u52A8\u88C1\u526A\u538B\u7F29</div><div class="upload-limit" data-v-a62b4ced${_scopeId}>\u6700\u5927 5MB\uFF0C\u5C06\u538B\u7F29\u4E3A 200x200px</div></div></div>`);
            if (showCropper.value) {
              _push2(`<div class="cropper-section" data-v-a62b4ced${_scopeId}><div class="cropper-container" data-v-a62b4ced${_scopeId}><img${ssrRenderAttr("src", cropperImageSrc.value)} data-v-a62b4ced${_scopeId}></div><div class="cropper-actions" data-v-a62b4ced${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, { onClick: cancelCrop }, {
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
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: confirmCrop
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u786E\u8BA4\u88C1\u526A`);
                  } else {
                    return [
                      createTextVNode("\u786E\u8BA4\u88C1\u526A")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="system-avatars-section" data-v-a62b4ced${_scopeId}><div class="section-title" data-v-a62b4ced${_scopeId}>\u7CFB\u7EDF\u63A8\u8350\u5934\u50CF</div><div class="avatar-grid" data-v-a62b4ced${_scopeId}><!--[-->`);
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
                      createTextVNode("\u53D6\u6D88")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: confirmCrop
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u786E\u8BA4\u88C1\u526A")
                    ]),
                    _: 1
                  })
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "system-avatars-section"
              }, [
                createVNode("div", { class: "section-title" }, "\u7CFB\u7EDF\u63A8\u8350\u5934\u50CF"),
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
        title: "\u4FEE\u6539\u6635\u79F0",
        "confirm-text": "\u786E\u8BA4\u4FEE\u6539",
        loading: loading.value,
        "confirm-disabled": !isValid.value,
        "show-mascot": "",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        onConfirm: handleUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-group"${_scopeId}><label class="form-label"${_scopeId}>\u65B0\u6635\u79F0</label><input${ssrRenderAttr("value", newNickname.value)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u6635\u79F0"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "\u65B0\u6635\u79F0"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => newNickname.value = $event,
                  type: "text",
                  class: "form-input",
                  placeholder: "\u8BF7\u8F93\u5165\u65B0\u6635\u79F0",
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
    const cancelText = computed(() => "\u53D6\u6D88");
    const submitText = computed(() => {
      if (loading.value) return step.value === 1 ? "\u9A8C\u8BC1\u4E2D..." : "\u63D0\u4EA4\u4E2D...";
      return step.value === 1 ? "\u4E0B\u4E00\u6B65" : "\u786E\u8BA4\u6362\u7ED1";
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
          ElMessage.error(res.msg || "\u6362\u7ED1\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u6362\u7ED1\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseFormModal, mergeProps({
        visible: __props.visible,
        title: "\u6362\u7ED1\u90AE\u7BB1",
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
              _push2(`<div class="step-content" data-v-ed6c3eab${_scopeId}><div class="step-indicator" data-v-ed6c3eab${_scopeId}><span class="step-badge active" data-v-ed6c3eab${_scopeId}>1</span><span class="step-line" data-v-ed6c3eab${_scopeId}></span><span class="step-badge" data-v-ed6c3eab${_scopeId}>2</span></div><p class="step-title" data-v-ed6c3eab${_scopeId}>\u9A8C\u8BC1\u5F53\u524D\u90AE\u7BB1</p><p class="step-desc" data-v-ed6c3eab${_scopeId}>\u4E3A\u786E\u4FDD\u8D26\u53F7\u5B89\u5168\uFF0C\u8BF7\u5148\u9A8C\u8BC1\u60A8\u7684\u5F53\u524D\u90AE\u7BB1</p><div class="form-group" data-v-ed6c3eab${_scopeId}><label class="form-label" data-v-ed6c3eab${_scopeId}>\u5F53\u524D\u90AE\u7BB1</label><input${ssrRenderAttr("value", __props.currentEmail)} type="email" class="form-input" disabled data-v-ed6c3eab${_scopeId}></div><div class="form-group code-group-wrapper" data-v-ed6c3eab${_scopeId}><label class="form-label" data-v-ed6c3eab${_scopeId}>\u9A8C\u8BC1\u7801</label><div class="code-group-inner" data-v-ed6c3eab${_scopeId}><input${ssrRenderAttr("value", currentCode.value)} type="text" class="form-input code-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" inputmode="numeric" autocomplete="off" data-v-ed6c3eab${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: countdown.value,
                onClick: sendCurrentEmailCode
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="form-tip" data-v-ed6c3eab${_scopeId}>\u9A8C\u8BC1\u7801\u5C06\u53D1\u9001\u81F3: ${ssrInterpolate(__props.currentEmail)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (step.value === 2) {
              _push2(`<div class="step-content" data-v-ed6c3eab${_scopeId}><div class="step-indicator" data-v-ed6c3eab${_scopeId}><span class="step-badge done" data-v-ed6c3eab${_scopeId}>\u2713</span><span class="step-line done" data-v-ed6c3eab${_scopeId}></span><span class="step-badge active" data-v-ed6c3eab${_scopeId}>2</span></div><p class="step-title" data-v-ed6c3eab${_scopeId}>\u8BBE\u7F6E\u65B0\u90AE\u7BB1</p><p class="step-desc" data-v-ed6c3eab${_scopeId}>\u8F93\u5165\u60A8\u8981\u7ED1\u5B9A\u7684\u65B0\u90AE\u7BB1\u5730\u5740</p><div class="form-group" data-v-ed6c3eab${_scopeId}><label class="form-label" data-v-ed6c3eab${_scopeId}>\u65B0\u90AE\u7BB1\u5730\u5740</label>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: newEmail.value,
                "onUpdate:modelValue": ($event) => newEmail.value = $event,
                placeholder: "\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="info-box" data-v-ed6c3eab${_scopeId}><span class="info-icon" data-v-ed6c3eab${_scopeId}>\u2139\uFE0F</span><span data-v-ed6c3eab${_scopeId}>\u786E\u8BA4\u540E\uFF0C\u7CFB\u7EDF\u5C06\u5411\u65B0\u90AE\u7BB1\u53D1\u9001\u786E\u8BA4\u94FE\u63A5\uFF0C\u70B9\u51FB\u94FE\u63A5\u5373\u53EF\u5B8C\u6210\u6362\u7ED1</span></div></div>`);
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
                createVNode("p", { class: "step-title" }, "\u9A8C\u8BC1\u5F53\u524D\u90AE\u7BB1"),
                createVNode("p", { class: "step-desc" }, "\u4E3A\u786E\u4FDD\u8D26\u53F7\u5B89\u5168\uFF0C\u8BF7\u5148\u9A8C\u8BC1\u60A8\u7684\u5F53\u524D\u90AE\u7BB1"),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u5F53\u524D\u90AE\u7BB1"),
                  createVNode("input", {
                    value: __props.currentEmail,
                    type: "email",
                    class: "form-input",
                    disabled: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "form-group code-group-wrapper" }, [
                  createVNode("label", { class: "form-label" }, "\u9A8C\u8BC1\u7801"),
                  createVNode("div", { class: "code-group-inner" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => currentCode.value = $event,
                      type: "text",
                      class: "form-input code-input",
                      placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
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
                createVNode("div", { class: "form-tip" }, "\u9A8C\u8BC1\u7801\u5C06\u53D1\u9001\u81F3: " + toDisplayString(__props.currentEmail), 1)
              ])) : createCommentVNode("", true),
              step.value === 2 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "step-content"
              }, [
                createVNode("div", { class: "step-indicator" }, [
                  createVNode("span", { class: "step-badge done" }, "\u2713"),
                  createVNode("span", { class: "step-line done" }),
                  createVNode("span", { class: "step-badge active" }, "2")
                ]),
                createVNode("p", { class: "step-title" }, "\u8BBE\u7F6E\u65B0\u90AE\u7BB1"),
                createVNode("p", { class: "step-desc" }, "\u8F93\u5165\u60A8\u8981\u7ED1\u5B9A\u7684\u65B0\u90AE\u7BB1\u5730\u5740"),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { class: "form-label" }, "\u65B0\u90AE\u7BB1\u5730\u5740"),
                  createVNode(EmailInput, {
                    modelValue: newEmail.value,
                    "onUpdate:modelValue": ($event) => newEmail.value = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "info-box" }, [
                  createVNode("span", { class: "info-icon" }, "\u2139\uFE0F"),
                  createVNode("span", null, "\u786E\u8BA4\u540E\uFF0C\u7CFB\u7EDF\u5C06\u5411\u65B0\u90AE\u7BB1\u53D1\u9001\u786E\u8BA4\u94FE\u63A5\uFF0C\u70B9\u51FB\u94FE\u63A5\u5373\u53EF\u5B8C\u6210\u6362\u7ED1")
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
        title: "\u7ED1\u5B9A\u8C37\u6B4C\u90AE\u7BB1",
        "show-footer": false,
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="google-content" data-v-78cbf845${_scopeId}><div class="modal-subtitle" data-v-78cbf845${_scopeId}>\u5173\u8054\u60A8\u7684 Google \u8D26\u53F7\u4EE5\u66F4\u5FEB\u6377\u767B\u5F55</div><div class="${ssrRenderClass([{ bound: __props.isBound }, "status-box"])}" data-v-78cbf845${_scopeId}><div class="status-icon" data-v-78cbf845${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Google" class="google-icon" data-v-78cbf845${_scopeId}></div><div class="status-info" data-v-78cbf845${_scopeId}><div class="status-label" data-v-78cbf845${_scopeId}>\u5F53\u524D\u72B6\u6001</div><div class="status-text" data-v-78cbf845${_scopeId}>${ssrInterpolate(__props.isBound ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</div>`);
            if (__props.isBound) {
              _push2(`<div class="bound-email" data-v-78cbf845${_scopeId}>${ssrInterpolate(__props.currentGoogleEmail)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.isBound) {
              _push2(`<div class="action-area" data-v-78cbf845${_scopeId}><div class="action-tip" data-v-78cbf845${_scopeId}>\u5982\u9700\u66F4\u6362\u7ED1\u5B9A\u7684 Google \u8D26\u53F7\uFF0C\u8BF7\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE</div><button class="btn-google" data-v-78cbf845${_scopeId}><span class="btn-icon" data-v-78cbf845${_scopeId}>G</span> \u6362\u7ED1 Google \u8D26\u53F7 </button></div>`);
            } else {
              _push2(`<div class="action-area" data-v-78cbf845${_scopeId}><button class="btn-google" data-v-78cbf845${_scopeId}><span class="btn-icon" data-v-78cbf845${_scopeId}>G</span> \u7ACB\u5373\u7ED1\u5B9A Google \u8D26\u53F7 </button></div>`);
            }
            _push2(`<div class="modal-footer-tip" data-v-78cbf845${_scopeId}> \u7ED1\u5B9A\u540E\u53EF\u76F4\u63A5\u4F7F\u7528 Google \u8D26\u53F7\u767B\u5F55\u51E1\u56FE\u62C9 </div></div>`);
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
    const userEmail = computed(() => props.email || "\u5F53\u524D\u8D26\u6237");
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
      const arr = ["\u5F31", "\u5F31", "\u4E2D", "\u5F3A", "\u5F88\u5F3A"];
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
      var _a;
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
        if ((_a = e.message) == null ? void 0 : _a.toLowerCase().includes("different")) {
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
        title: "\u66F4\u65B0\u5BC6\u7801",
        width: "500px",
        "submit-text": "\u786E\u8BA4\u66F4\u65B0",
        loading: loading.value,
        "submit-disabled": !canSubmit.value,
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-group code-group-wrapper" data-v-c50a4b17${_scopeId}><label class="form-label" data-v-c50a4b17${_scopeId}>\u90AE\u7BB1\u9A8C\u8BC1\u7801</label><div class="code-group-inner" data-v-c50a4b17${_scopeId}><input type="text"${ssrRenderAttr("value", otpCode.value)} class="form-input code-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" inputmode="numeric" autocomplete="off" data-v-c50a4b17${_scopeId}>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: countdown.value,
              onClick: sendCode
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="form-tip" data-v-c50a4b17${_scopeId}>\u9A8C\u8BC1\u7801\u5C06\u53D1\u9001\u81F3: ${ssrInterpolate(userEmail.value)}</p></div><div class="form-group" data-v-c50a4b17${_scopeId}><label class="form-label" data-v-c50a4b17${_scopeId}>\u65B0\u5BC6\u7801</label><input${ssrRenderAttr("value", newPassword.value)} type="password" class="form-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801 (\u81F3\u5C118\u4F4D,\u5305\u542B\u6570\u5B57\u548C\u5B57\u6BCD)" autocomplete="new-password" data-v-c50a4b17${_scopeId}>`);
            if (newPassword.value) {
              _push2(`<div class="password-strength" data-v-c50a4b17${_scopeId}> \u5F3A\u5EA6: <span class="${ssrRenderClass(strengthClass.value)}" data-v-c50a4b17${_scopeId}>${ssrInterpolate(strengthText.value)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group" data-v-c50a4b17${_scopeId}><label class="form-label" data-v-c50a4b17${_scopeId}>\u786E\u8BA4\u65B0\u5BC6\u7801</label><input${ssrRenderAttr("value", confirmPassword.value)} type="password" class="form-input" placeholder="\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801" autocomplete="new-password" data-v-c50a4b17${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "form-group code-group-wrapper" }, [
                createVNode("label", { class: "form-label" }, "\u90AE\u7BB1\u9A8C\u8BC1\u7801"),
                createVNode("div", { class: "code-group-inner" }, [
                  withDirectives(createVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": ($event) => otpCode.value = $event,
                    class: "form-input code-input",
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
                createVNode("p", { class: "form-tip" }, "\u9A8C\u8BC1\u7801\u5C06\u53D1\u9001\u81F3: " + toDisplayString(userEmail.value), 1)
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "\u65B0\u5BC6\u7801"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => newPassword.value = $event,
                  type: "password",
                  class: "form-input",
                  placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801 (\u81F3\u5C118\u4F4D,\u5305\u542B\u6570\u5B57\u548C\u5B57\u6BCD)",
                  onInput: checkStrength,
                  autocomplete: "new-password"
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, newPassword.value]
                ]),
                newPassword.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "password-strength"
                }, [
                  createTextVNode(" \u5F3A\u5EA6: "),
                  createVNode("span", { class: strengthClass.value }, toDisplayString(strengthText.value), 3)
                ])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "\u786E\u8BA4\u65B0\u5BC6\u7801"),
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => confirmPassword.value = $event,
                  type: "password",
                  class: "form-input",
                  placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
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
        title: "\u6CE8\u9500\u8D26\u53F7",
        width: "500px",
        "show-footer": false,
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close"),
        "onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event)
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="base-modal-cancel" data-v-852eaafe${_scopeId}>\u53D6\u6D88</button><button class="delete-btn"${ssrIncludeBooleanAttr(!isConfirmed.value || !otpCode.value || loading.value) ? " disabled" : ""} data-v-852eaafe${_scopeId}>${ssrInterpolate(loading.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u6CE8\u9500")}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "base-modal-cancel",
                onClick: ($event) => _ctx.$emit("close")
              }, "\u53D6\u6D88", 8, ["onClick"]),
              createVNode("button", {
                class: "delete-btn",
                disabled: !isConfirmed.value || !otpCode.value || loading.value,
                onClick: handleDelete
              }, toDisplayString(loading.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u6CE8\u9500"), 9, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="warning-box" data-v-852eaafe${_scopeId}><span class="warning-icon" data-v-852eaafe${_scopeId}>\u26A0\uFE0F</span><div class="warning-content" data-v-852eaafe${_scopeId}> \u8B66\u544A\uFF1A\u8D26\u53F7\u6CE8\u9500\u662F\u4E0D\u53EF\u6062\u590D\u7684\u64CD\u4F5C\u3002\u6240\u6709\u4E2A\u4EBA\u6570\u636E\u3001\u8BA2\u5355\u8BB0\u5F55\u548C\u8D44\u4EA7\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002 </div></div><div class="form-group" data-v-852eaafe${_scopeId}><label class="form-label" data-v-852eaafe${_scopeId}>\u90AE\u7BB1\u9A8C\u8BC1</label><div class="captcha-row" data-v-852eaafe${_scopeId}><input${ssrRenderAttr("value", otpCode.value)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" inputmode="numeric" autocomplete="off" data-v-852eaafe${_scopeId}><button class="send-code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-852eaafe${_scopeId}>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s\u540E\u91CD\u53D1` : "\u83B7\u53D6\u9A8C\u8BC1\u7801")}</button></div><p class="form-tip" data-v-852eaafe${_scopeId}>\u4E3A\u4E86\u60A8\u7684\u8D44\u4EA7\u5B89\u5168\uFF0C\u8BF7\u9A8C\u8BC1\u90AE\u7BB1: ${ssrInterpolate(__props.email)}</p></div><div class="confirmation-area" data-v-852eaafe${_scopeId}><label class="checkbox-label" data-v-852eaafe${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(isConfirmed.value) ? ssrLooseContain(isConfirmed.value, null) : isConfirmed.value) ? " checked" : ""} data-v-852eaafe${_scopeId}><span data-v-852eaafe${_scopeId}>\u6211\u5DF2\u4E86\u89E3\u98CE\u9669\uFF0C\u786E\u8BA4\u6CE8\u9500\u5F53\u524D\u8D26\u53F7</span></label></div>`);
          } else {
            return [
              createVNode("div", { class: "warning-box" }, [
                createVNode("span", { class: "warning-icon" }, "\u26A0\uFE0F"),
                createVNode("div", { class: "warning-content" }, " \u8B66\u544A\uFF1A\u8D26\u53F7\u6CE8\u9500\u662F\u4E0D\u53EF\u6062\u590D\u7684\u64CD\u4F5C\u3002\u6240\u6709\u4E2A\u4EBA\u6570\u636E\u3001\u8BA2\u5355\u8BB0\u5F55\u548C\u8D44\u4EA7\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002 ")
              ]),
              createVNode("div", { class: "form-group" }, [
                createVNode("label", { class: "form-label" }, "\u90AE\u7BB1\u9A8C\u8BC1"),
                createVNode("div", { class: "captcha-row" }, [
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
                  createVNode("button", {
                    class: "send-code-btn",
                    disabled: countdown.value > 0 || loading.value,
                    onClick: sendCode
                  }, toDisplayString(countdown.value > 0 ? `${countdown.value}s\u540E\u91CD\u53D1` : "\u83B7\u53D6\u9A8C\u8BC1\u7801"), 9, ["disabled"])
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
          const { ElMessageBox: ElMessageBox2 } = await import('./index-DbbVjCEU.mjs');
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
      _push(` \u5B89\u5168\u7B49\u7EA7: \u9AD8 </span></div></div></div><div class="hero-actions" data-v-a2af28c4><button class="glass-pill-btn primary-glass-btn" data-v-a2af28c4>`);
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
      _push(` \u7F16\u8F91\u8D44\u6599 </button></div></div></div><div class="workspace-scroll-area" data-v-a2af28c4><div class="workspace-content" data-v-a2af28c4><div class="info-grid section-gap" data-v-a2af28c4><div class="glass-tile info-tile" data-v-a2af28c4><div class="tile-icon-bg" data-v-a2af28c4>`);
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
      _push(`</div><div class="tile-header" data-v-a2af28c4><div class="tile-label" data-v-a2af28c4>\u8D26\u6237 UID</div>`);
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
      _push(`</div><div class="tile-header" data-v-a2af28c4><div class="tile-label" data-v-a2af28c4>\u7ED1\u5B9A\u90AE\u7BB1</div>`);
      if (__props.user.email) {
        _push(`<div class="status-badge success" data-v-a2af28c4>\u5DF2\u7ED1\u5B9A</div>`);
      } else {
        _push(`<div class="status-badge warning" data-v-a2af28c4>\u672A\u7ED1\u5B9A</div>`);
      }
      _push(`</div><div class="tile-value-group" data-v-a2af28c4><span class="tile-value" data-v-a2af28c4>${ssrInterpolate(__props.user.email || "\u672A\u7ED1\u5B9A\u90AE\u7BB1")}</span><button class="icon-action-btn" data-v-a2af28c4>`);
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
      _push(`</div><div class="tile-header" data-v-a2af28c4><div class="tile-label" data-v-a2af28c4>\u8D26\u53F7\u5B89\u5168</div><div class="status-badge success" data-v-a2af28c4>\u4FDD\u62A4\u4E2D</div></div><div class="tile-value-group" data-v-a2af28c4><div class="security-level-bar" data-v-a2af28c4><div class="level-fill" style="${ssrRenderStyle({ "width": "100%" })}" data-v-a2af28c4></div></div><span class="tile-meta" data-v-a2af28c4>\u6781\u9AD8</span></div></div></div><div class="command-center section-gap" data-v-a2af28c4><h3 class="section-title" data-v-a2af28c4>\u8D26\u6237\u7BA1\u7406</h3><div class="command-grid" data-v-a2af28c4><div class="action-card-lg" data-v-a2af28c4><div class="card-bg-icon" data-v-a2af28c4>\u{1F511}</div><div class="card-content" data-v-a2af28c4><div class="card-icon-frame blue-frame" data-v-a2af28c4>`);
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
      _push(`</div><div class="card-text" data-v-a2af28c4><span class="card-title" data-v-a2af28c4>\u4FEE\u6539\u5BC6\u7801</span><span class="card-desc" data-v-a2af28c4>\u5B9A\u671F\u66F4\u65B0\u5BC6\u7801\u4FDD\u62A4\u8D26\u53F7\u5B89\u5168</span></div></div><div class="card-arrow" data-v-a2af28c4>`);
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
      _push(`</div></div><div class="action-card-lg" data-v-a2af28c4><div class="card-bg-icon" data-v-a2af28c4>\u{1F517}</div><div class="card-content" data-v-a2af28c4><div class="card-icon-frame purple-frame" data-v-a2af28c4>`);
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
      _push(`</div><div class="card-text" data-v-a2af28c4><span class="card-title" data-v-a2af28c4>\u8D26\u53F7\u7ED1\u5B9A</span><span class="card-desc" data-v-a2af28c4>Google / \u5FAE\u4FE1 \u5FEB\u6377\u767B\u5F55</span></div></div><div class="card-arrow" data-v-a2af28c4>`);
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
      _push(`</div></div><div class="action-card-lg danger-card" data-v-a2af28c4><div class="card-bg-icon" data-v-a2af28c4>\u26A0\uFE0F</div><div class="card-content" data-v-a2af28c4><div class="card-icon-frame red-frame" data-v-a2af28c4>`);
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
      _push(`</div><div class="card-text" data-v-a2af28c4><span class="card-title" data-v-a2af28c4>\u6CE8\u9500\u8D26\u53F7</span><span class="card-desc" data-v-a2af28c4>\u6C38\u4E45\u5220\u9664\u8D26\u53F7\u6570\u636E</span></div></div><div class="card-arrow" data-v-a2af28c4>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bw0sIbIb.mjs.map
