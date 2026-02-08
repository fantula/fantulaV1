import { E as ElCard } from './index-DIUT_jMU.mjs';
import { E as ElForm, a as ElFormItem } from './index-BHYewqHp.mjs';
import { E as ElRow, a as ElCol } from './index-CF8IRL2O.mjs';
import { E as ElInput } from './index-DfZ5KWBt.mjs';
import { E as ElDivider } from './index-sO8Yjc2X.mjs';
import { E as ElAlert } from './index-CHfwRf2j.mjs';
import { v as vLoading } from './directive-BBpaOxz2.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, ref, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { P as PageTipHeader } from './PageTipHeader-DqGE4r9z.mjs';
import { S as StickyFormHeader } from './StickyFormHeader-CqBxqACk.mjs';
import { E as ElUpload } from './index-5J0LyWSE.mjs';
import { E as ElImage } from './index-BmjXUoge.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { Y as edit_default, p as plus_default } from './index-DlETah8a.mjs';
import { g as getAdminSupabaseClient } from './supabase-admin-Yv96kmWU.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './objects-Bz74KHmq.mjs';
import './constants-hAKFmBbq.mjs';
import './use-form-item-Bhmdieo-.mjs';
import 'async-validator';
import '@vueuse/core';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './event-D3FEo2C5.mjs';
import './index-Cy25Tved.mjs';
import './aria-Rs9hkxop.mjs';
import './vnode-BKSxKQVt.mjs';
import './index-Cfk6gFRD.mjs';
import '@ctrl/tinycolor';
import './focus-trap.vue-BCkHbPy6.mjs';
import './index-7KygWwCI.mjs';
import './scroll-BuMAfCNC.mjs';
import './raf-CQRaPAjg.mjs';
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
import '../routes/renderer.mjs';
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

const adminSystemApi = {
  /**
   * 获取联系方式配置
   */
  async getContactConfig() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("system_configs").select("value").eq("key", "contact_info").single();
    if (error) {
      if (error.code === "PGRST116") {
        return {
          success: true,
          data: {
            wechat_id: "Spotify-cn",
            wechat_qr: "",
            telegram_id: "@Fantula_Support",
            telegram_qr: "",
            service_time: "10:00 - 23:00"
          }
        };
      }
      return { success: false, error: error.message };
    }
    return { success: true, data: data.value };
  },
  /**
   * 更新联系方式配置
   */
  async updateContactConfig(config) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("system_configs").upsert({
      key: "contact_info",
      value: config,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ContactImageUploader",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    folder: {},
    tip: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const uploading = ref(false);
    const handleUpload = async (options) => {
      const file = options.file;
      const folder = props.folder || "contact_materials";
      if (!file.type.startsWith("image/")) {
        ElMessage.error("\u8BF7\u4E0A\u4F20\u56FE\u7247\u6587\u4EF6");
        return;
      }
      uploading.value = true;
      const client = getAdminSupabaseClient();
      try {
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
        const filePath = `${folder}/${fileName}`;
        const bucket = "media";
        const { data, error } = await client.storage.from(bucket).upload(filePath, file, {
          cacheControl: "3600",
          upsert: false
        });
        if (error) throw error;
        const { data: { publicUrl } } = client.storage.from(bucket).getPublicUrl(filePath);
        if (publicUrl) {
          emit("update:modelValue", publicUrl);
          ElMessage.success("\u4E0A\u4F20\u6210\u529F");
        }
      } catch (e) {
        console.error("Upload failed", e);
        ElMessage.error(e.message || "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5B58\u50A8\u914D\u7F6E");
      } finally {
        uploading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_upload = ElUpload;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-uploader" }, _attrs))} data-v-33e18f0c><div class="uploader-wrapper" data-v-33e18f0c>`);
      _push(ssrRenderComponent(_component_el_upload, {
        class: "upload-demo",
        action: "#",
        "show-file-list": false,
        "http-request": handleUpload,
        disabled: uploading.value,
        accept: "image/*"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.modelValue) {
              _push2(`<div class="preview-container" data-v-33e18f0c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: __props.modelValue,
                fit: "contain",
                class: "preview-image"
              }, null, _parent2, _scopeId));
              _push2(`<div class="overlay" data-v-33e18f0c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(edit_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(edit_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span data-v-33e18f0c${_scopeId}>\u66F4\u6362\u56FE\u7247</span></div></div>`);
            } else {
              _push2(`<div class="upload-placeholder" data-v-33e18f0c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(plus_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(plus_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="text" data-v-33e18f0c${_scopeId}>\u70B9\u51FB\u4E0A\u4F20</span></div>`);
            }
          } else {
            return [
              __props.modelValue ? (openBlock(), createBlock("div", {
                key: 0,
                class: "preview-container"
              }, [
                createVNode(_component_el_image, {
                  src: __props.modelValue,
                  fit: "contain",
                  class: "preview-image"
                }, null, 8, ["src"]),
                createVNode("div", { class: "overlay" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(edit_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "\u66F4\u6362\u56FE\u7247")
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "upload-placeholder"
              }, [
                createVNode(_component_el_icon, { class: "icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(plus_default))
                  ]),
                  _: 1
                }),
                createVNode("span", { class: "text" }, "\u70B9\u51FB\u4E0A\u4F20")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.tip) {
        _push(`<div class="upload-tip" data-v-33e18f0c>${ssrInterpolate(__props.tip)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/ContactImageUploader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ContactImageUploader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-33e18f0c"]]);
function useAdminContactConfig() {
  const loading = ref(false);
  const saving = ref(false);
  const form = ref({
    wechat_id: "",
    wechat_qr: "",
    telegram_id: "",
    telegram_qr: "",
    service_time: ""
  });
  const loadConfig = async () => {
    loading.value = true;
    try {
      const res = await adminSystemApi.getContactConfig();
      if (res.success && res.data) {
        form.value = { ...form.value, ...res.data };
      } else {
        console.warn("Using static defaults due to DB missing/error", res.error);
        form.value = {
          wechat_id: "Spotify-cn",
          wechat_qr: "/images/contact/wechat_qr.jpg",
          telegram_id: "@FANTULA_SUPPORT",
          telegram_qr: "/images/contact/telegram_qr.jpg",
          service_time: "10:00 - 23:00"
        };
      }
    } catch (e) {
      ElMessage.error(e.message || "\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25");
    } finally {
      loading.value = false;
    }
  };
  const saveConfig = async () => {
    saving.value = true;
    try {
      const res = await adminSystemApi.updateContactConfig(form.value);
      if (res.success) {
        ElMessage.success("\u914D\u7F6E\u5DF2\u4FDD\u5B58");
      } else {
        ElMessage.error(res.error || "\u4FDD\u5B58\u5931\u8D25");
      }
    } catch (e) {
      ElMessage.error(e.message || "\u4FDD\u5B58\u5F02\u5E38");
    } finally {
      saving.value = false;
    }
  };
  return {
    form,
    loading,
    saving,
    loadConfig,
    saveConfig
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { form, loading, saving, saveConfig } = useAdminContactConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_divider = ElDivider;
      const _component_el_alert = ElAlert;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-d6bbbc24>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u8054\u7CFB\u65B9\u5F0F\u8BBE\u7F6E",
        description: "\u7BA1\u7406\u524D\u53F0\u663E\u793A\u7684\u5FAE\u4FE1\u3001Telegram\u53CA\u5728\u7EBF\u65F6\u95F4\u4FE1\u606F\u3002\u5185\u5BB9\u5C06\u5B9E\u65F6\u540C\u6B65\u81F3 PC \u7AEF\u53CA\u79FB\u52A8\u7AEF\u663E\u793A\u3002"
      }, null, _parent));
      _push(ssrRenderComponent(StickyFormHeader, {
        title: "\u8054\u7CFB\u65B9\u5F0F",
        subtitle: "\u914D\u7F6E\u4E2D\u5FC3",
        loading: unref(saving),
        onSave: unref(saveConfig),
        "show-back": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_card, mergeProps({
        shadow: "never",
        class: "mt-4"
      }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: unref(form),
              "label-width": "120px",
              class: "py-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_row, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 24 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h3 class="section-title" data-v-d6bbbc24${_scopeId4}>\u{1F552} \u670D\u52A1\u65F6\u95F4\u8BBE\u7F6E</h3>`);
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u5728\u7EBF\u670D\u52A1\u65F6\u95F4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: unref(form).service_time,
                                      "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                      placeholder: "\u4F8B\u5982: 10:00 - 23:00",
                                      style: { "max-width": "400px" }
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="form-tip" data-v-d6bbbc24${_scopeId5}>\u663E\u793A\u5728\u5DF2\u8054\u7CFB\u5BA2\u670D\u5F39\u7A97\u4E2D\u7684\u670D\u52A1\u65F6\u95F4\u63D0\u793A</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: unref(form).service_time,
                                        "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                        placeholder: "\u4F8B\u5982: 10:00 - 23:00",
                                        style: { "max-width": "400px" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-tip" }, "\u663E\u793A\u5728\u5DF2\u8054\u7CFB\u5BA2\u670D\u5F39\u7A97\u4E2D\u7684\u670D\u52A1\u65F6\u95F4\u63D0\u793A")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("h3", { class: "section-title" }, "\u{1F552} \u670D\u52A1\u65F6\u95F4\u8BBE\u7F6E"),
                                createVNode(_component_el_form_item, { label: "\u5728\u7EBF\u670D\u52A1\u65F6\u95F4" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).service_time,
                                      "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                      placeholder: "\u4F8B\u5982: 10:00 - 23:00",
                                      style: { "max-width": "400px" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-tip" }, "\u663E\u793A\u5728\u5DF2\u8054\u7CFB\u5BA2\u670D\u5F39\u7A97\u4E2D\u7684\u670D\u52A1\u65F6\u95F4\u63D0\u793A")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_col, { span: 24 }, {
                            default: withCtx(() => [
                              createVNode("h3", { class: "section-title" }, "\u{1F552} \u670D\u52A1\u65F6\u95F4\u8BBE\u7F6E"),
                              createVNode(_component_el_form_item, { label: "\u5728\u7EBF\u670D\u52A1\u65F6\u95F4" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).service_time,
                                    "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                    placeholder: "\u4F8B\u5982: 10:00 - 23:00",
                                    style: { "max-width": "400px" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-tip" }, "\u663E\u793A\u5728\u5DF2\u8054\u7CFB\u5BA2\u670D\u5F39\u7A97\u4E2D\u7684\u670D\u52A1\u65F6\u95F4\u63D0\u793A")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<h3 class="section-title" data-v-d6bbbc24${_scopeId2}>\u{1F5A5}\uFE0F PC \u7AEF\u8BBE\u7F6E (Modal)</h3><div class="p-4 bg-gray-50 rounded mb-6" data-v-d6bbbc24${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 40 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 12 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="sub-title" data-v-d6bbbc24${_scopeId4}>\u5FAE\u4FE1\u5BA2\u670D (WeChat)</div>`);
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u5FAE\u4FE1\u53F7 / ID" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: unref(form).wechat_id,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                      placeholder: "Spotify-cn"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: unref(form).wechat_id,
                                        "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                        placeholder: "Spotify-cn"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u5FAE\u4FE1\u4E8C\u7EF4\u7801" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(ContactImageUploader, {
                                      modelValue: unref(form).wechat_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                      folder: "contact_materials",
                                      tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(ContactImageUploader, {
                                        modelValue: unref(form).wechat_qr,
                                        "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                        folder: "contact_materials",
                                        tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "sub-title" }, "\u5FAE\u4FE1\u5BA2\u670D (WeChat)"),
                                createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u53F7 / ID" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).wechat_id,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                      placeholder: "Spotify-cn"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u4E8C\u7EF4\u7801" }, {
                                  default: withCtx(() => [
                                    createVNode(ContactImageUploader, {
                                      modelValue: unref(form).wechat_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                      folder: "contact_materials",
                                      tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_col, { span: 12 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="sub-title" data-v-d6bbbc24${_scopeId4}>Telegram \u5BA2\u670D</div>`);
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "\u7528\u6237\u540D / ID" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: unref(form).telegram_id,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                      placeholder: "@Fantula_Support"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: unref(form).telegram_id,
                                        "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                        placeholder: "@Fantula_Support"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "Telegram\u4E8C\u7EF4\u7801" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(ContactImageUploader, {
                                      modelValue: unref(form).telegram_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                      folder: "contact_materials",
                                      tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(ContactImageUploader, {
                                        modelValue: unref(form).telegram_qr,
                                        "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                        folder: "contact_materials",
                                        tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "sub-title" }, "Telegram \u5BA2\u670D"),
                                createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D / ID" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).telegram_id,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                      placeholder: "@Fantula_Support"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "Telegram\u4E8C\u7EF4\u7801" }, {
                                  default: withCtx(() => [
                                    createVNode(ContactImageUploader, {
                                      modelValue: unref(form).telegram_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                      folder: "contact_materials",
                                      tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "\u5FAE\u4FE1\u5BA2\u670D (WeChat)"),
                              createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u53F7 / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).wechat_id,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                    placeholder: "Spotify-cn"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u4E8C\u7EF4\u7801" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).wechat_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                    folder: "contact_materials",
                                    tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "Telegram \u5BA2\u670D"),
                              createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).telegram_id,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                    placeholder: "@Fantula_Support"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "Telegram\u4E8C\u7EF4\u7801" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).telegram_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                    folder: "contact_materials",
                                    tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<h3 class="section-title" data-v-d6bbbc24${_scopeId2}>\u{1F4F1} \u79FB\u52A8\u7AEF\u8BBE\u7F6E (H5)</h3><div class="p-4 bg-blue-50 rounded" data-v-d6bbbc24${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_alert, {
                    title: "\u79FB\u52A8\u7AEF\u81EA\u52A8\u540C\u6B65",
                    type: "info",
                    closable: false,
                    "show-icon": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u79FB\u52A8\u7AEF\u5C06\u81EA\u52A8\u590D\u7528\u4E0A\u8FF0\u914D\u7F6E\u4FE1\u606F\u3002 <ul data-v-d6bbbc24${_scopeId3}><li data-v-d6bbbc24${_scopeId3}><strong data-v-d6bbbc24${_scopeId3}>\u5FAE\u4FE1\u53F7/TG\u53F7</strong>: \u70B9\u51FB\u53EF\u76F4\u63A5\u590D\u5236\u3002</li><li data-v-d6bbbc24${_scopeId3}><strong data-v-d6bbbc24${_scopeId3}>\u4E8C\u7EF4\u7801</strong>: \u79FB\u52A8\u7AEF\u6682\u4E0D\u5C55\u793A\u4E8C\u7EF4\u7801\uFF0C\u4EC5\u5C55\u793A\u6587\u672CID\u3002</li></ul>`);
                      } else {
                        return [
                          createTextVNode(" \u79FB\u52A8\u7AEF\u5C06\u81EA\u52A8\u590D\u7528\u4E0A\u8FF0\u914D\u7F6E\u4FE1\u606F\u3002 "),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "\u5FAE\u4FE1\u53F7/TG\u53F7"),
                              createTextVNode(": \u70B9\u51FB\u53EF\u76F4\u63A5\u590D\u5236\u3002")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "\u4E8C\u7EF4\u7801"),
                              createTextVNode(": \u79FB\u52A8\u7AEF\u6682\u4E0D\u5C55\u793A\u4E8C\u7EF4\u7801\uFF0C\u4EC5\u5C55\u793A\u6587\u672CID\u3002")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_el_row, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 24 }, {
                          default: withCtx(() => [
                            createVNode("h3", { class: "section-title" }, "\u{1F552} \u670D\u52A1\u65F6\u95F4\u8BBE\u7F6E"),
                            createVNode(_component_el_form_item, { label: "\u5728\u7EBF\u670D\u52A1\u65F6\u95F4" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).service_time,
                                  "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                  placeholder: "\u4F8B\u5982: 10:00 - 23:00",
                                  style: { "max-width": "400px" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-tip" }, "\u663E\u793A\u5728\u5DF2\u8054\u7CFB\u5BA2\u670D\u5F39\u7A97\u4E2D\u7684\u670D\u52A1\u65F6\u95F4\u63D0\u793A")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_divider),
                    createVNode("h3", { class: "section-title" }, "\u{1F5A5}\uFE0F PC \u7AEF\u8BBE\u7F6E (Modal)"),
                    createVNode("div", { class: "p-4 bg-gray-50 rounded mb-6" }, [
                      createVNode(_component_el_row, { gutter: 40 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "\u5FAE\u4FE1\u5BA2\u670D (WeChat)"),
                              createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u53F7 / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).wechat_id,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                    placeholder: "Spotify-cn"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u4E8C\u7EF4\u7801" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).wechat_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                    folder: "contact_materials",
                                    tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "Telegram \u5BA2\u670D"),
                              createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).telegram_id,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                    placeholder: "@Fantula_Support"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "Telegram\u4E8C\u7EF4\u7801" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).telegram_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                    folder: "contact_materials",
                                    tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("h3", { class: "section-title" }, "\u{1F4F1} \u79FB\u52A8\u7AEF\u8BBE\u7F6E (H5)"),
                    createVNode("div", { class: "p-4 bg-blue-50 rounded" }, [
                      createVNode(_component_el_alert, {
                        title: "\u79FB\u52A8\u7AEF\u81EA\u52A8\u540C\u6B65",
                        type: "info",
                        closable: false,
                        "show-icon": ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u79FB\u52A8\u7AEF\u5C06\u81EA\u52A8\u590D\u7528\u4E0A\u8FF0\u914D\u7F6E\u4FE1\u606F\u3002 "),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "\u5FAE\u4FE1\u53F7/TG\u53F7"),
                              createTextVNode(": \u70B9\u51FB\u53EF\u76F4\u63A5\u590D\u5236\u3002")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "\u4E8C\u7EF4\u7801"),
                              createTextVNode(": \u79FB\u52A8\u7AEF\u6682\u4E0D\u5C55\u793A\u4E8C\u7EF4\u7801\uFF0C\u4EC5\u5C55\u793A\u6587\u672CID\u3002")
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: unref(form),
                "label-width": "120px",
                class: "py-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_row, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_col, { span: 24 }, {
                        default: withCtx(() => [
                          createVNode("h3", { class: "section-title" }, "\u{1F552} \u670D\u52A1\u65F6\u95F4\u8BBE\u7F6E"),
                          createVNode(_component_el_form_item, { label: "\u5728\u7EBF\u670D\u52A1\u65F6\u95F4" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: unref(form).service_time,
                                "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                placeholder: "\u4F8B\u5982: 10:00 - 23:00",
                                style: { "max-width": "400px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "form-tip" }, "\u663E\u793A\u5728\u5DF2\u8054\u7CFB\u5BA2\u670D\u5F39\u7A97\u4E2D\u7684\u670D\u52A1\u65F6\u95F4\u63D0\u793A")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_divider),
                  createVNode("h3", { class: "section-title" }, "\u{1F5A5}\uFE0F PC \u7AEF\u8BBE\u7F6E (Modal)"),
                  createVNode("div", { class: "p-4 bg-gray-50 rounded mb-6" }, [
                    createVNode(_component_el_row, { gutter: 40 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "sub-title" }, "\u5FAE\u4FE1\u5BA2\u670D (WeChat)"),
                            createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u53F7 / ID" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).wechat_id,
                                  "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                  placeholder: "Spotify-cn"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "\u5FAE\u4FE1\u4E8C\u7EF4\u7801" }, {
                              default: withCtx(() => [
                                createVNode(ContactImageUploader, {
                                  modelValue: unref(form).wechat_qr,
                                  "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                  folder: "contact_materials",
                                  tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "sub-title" }, "Telegram \u5BA2\u670D"),
                            createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D / ID" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).telegram_id,
                                  "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                  placeholder: "@Fantula_Support"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "Telegram\u4E8C\u7EF4\u7801" }, {
                              default: withCtx(() => [
                                createVNode(ContactImageUploader, {
                                  modelValue: unref(form).telegram_qr,
                                  "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                  folder: "contact_materials",
                                  tip: "\u5EFA\u8BAE\u5C3A\u5BF8: 300x300"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_el_divider),
                  createVNode("h3", { class: "section-title" }, "\u{1F4F1} \u79FB\u52A8\u7AEF\u8BBE\u7F6E (H5)"),
                  createVNode("div", { class: "p-4 bg-blue-50 rounded" }, [
                    createVNode(_component_el_alert, {
                      title: "\u79FB\u52A8\u7AEF\u81EA\u52A8\u540C\u6B65",
                      type: "info",
                      closable: false,
                      "show-icon": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u79FB\u52A8\u7AEF\u5C06\u81EA\u52A8\u590D\u7528\u4E0A\u8FF0\u914D\u7F6E\u4FE1\u606F\u3002 "),
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "\u5FAE\u4FE1\u53F7/TG\u53F7"),
                            createTextVNode(": \u70B9\u51FB\u53EF\u76F4\u63A5\u590D\u5236\u3002")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "\u4E8C\u7EF4\u7801"),
                            createTextVNode(": \u79FB\u52A8\u7AEF\u6682\u4E0D\u5C55\u793A\u4E8C\u7EF4\u7801\uFF0C\u4EC5\u5C55\u793A\u6587\u672CID\u3002")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6bbbc24"]]);

export { contact as default };
//# sourceMappingURL=contact-DiB8GD3m.mjs.map
