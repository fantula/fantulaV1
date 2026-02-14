import { E as ElCard } from "./index-B15mgGFM.js";
import { E as ElForm, a as ElFormItem } from "./index-uVJ2GEO7.js";
import { E as ElRow, a as ElCol } from "./index-pXmMS3Fm.js";
import { E as ElInput } from "./index-ttyu327u.js";
import { E as ElDivider } from "./index-DEoO_C5P.js";
import { E as ElAlert } from "./index-CDEPy-be.js";
import { v as vLoading } from "./directive-Cp0y9Az7.js";
/* empty css              */
/* empty css                 */
/* empty css                 */
/* empty css                */
/* empty css                      */
/* empty css                  */
/* empty css                    */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { P as PageTipHeader } from "./PageTipHeader-CYVW2ELG.js";
import { S as StickyFormHeader } from "./StickyFormHeader-BEb9UJKB.js";
import { E as ElUpload } from "./index-Co5uNv20.js";
import { E as ElImage } from "./index-DMcY9pQb.js";
import { E as ElIcon } from "./index-D6MDXFfa.js";
/* empty css                     */
/* empty css                         */
/* empty css                    */
import { a5 as edit_default, p as plus_default } from "./index-CRs4T-Jf.js";
import { g as getAdminSupabaseClient } from "./supabase-admin-C2P8hOJs.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { a as adminSystemApi } from "./system-BFPljdi8.js";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "lodash-unified";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "./constants-hAKFmBbq.js";
import "./use-form-item-n_L16njV.js";
import "async-validator";
import "@vueuse/core";
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "./event-BZTOGHfp.js";
import "./index-B6zOcltc.js";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "./vnode-uc6o_sOa.js";
import "./index-CGHU_uKU.js";
import "@ctrl/tinycolor";
/* empty css                   */
import "vue-router";
import "./focus-trap.vue-DLhiv9tF.js";
import "./index-D_dCF80h.js";
import "./scroll-BYDsUCKj.js";
import "./raf-CQRaPAjg.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "./supabase-Ds8OQlZJ.js";
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
        ElMessage.error("请上传图片文件");
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
          ElMessage.success("上传成功");
        }
      } catch (e) {
        console.error("Upload failed", e);
        ElMessage.error(e.message || "上传失败，请检查存储配置");
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
              _push2(`<span data-v-33e18f0c${_scopeId}>更换图片</span></div></div>`);
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
              _push2(`<span class="text" data-v-33e18f0c${_scopeId}>点击上传</span></div>`);
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
                  createVNode("span", null, "更换图片")
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
                createVNode("span", { class: "text" }, "点击上传")
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
      ElMessage.error(e.message || "加载配置失败");
    } finally {
      loading.value = false;
    }
  };
  const saveConfig = async () => {
    saving.value = true;
    try {
      const res = await adminSystemApi.updateContactConfig(form.value);
      if (res.success) {
        ElMessage.success("配置已保存");
      } else {
        ElMessage.error(res.error || "保存失败");
      }
    } catch (e) {
      ElMessage.error(e.message || "保存异常");
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
        title: "联系方式设置",
        description: "管理前台显示的微信、Telegram及在线时间信息。内容将实时同步至 PC 端及移动端显示。"
      }, null, _parent));
      _push(ssrRenderComponent(StickyFormHeader, {
        title: "联系方式",
        subtitle: "配置中心",
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
                              _push5(`<h3 class="section-title" data-v-d6bbbc24${_scopeId4}>🕒 服务时间设置</h3>`);
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "在线服务时间" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: unref(form).service_time,
                                      "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                      placeholder: "例如: 10:00 - 23:00",
                                      style: { "max-width": "400px" }
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="form-tip" data-v-d6bbbc24${_scopeId5}>显示在已联系客服弹窗中的服务时间提示</div>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: unref(form).service_time,
                                        "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                        placeholder: "例如: 10:00 - 23:00",
                                        style: { "max-width": "400px" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "form-tip" }, "显示在已联系客服弹窗中的服务时间提示")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("h3", { class: "section-title" }, "🕒 服务时间设置"),
                                createVNode(_component_el_form_item, { label: "在线服务时间" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).service_time,
                                      "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                      placeholder: "例如: 10:00 - 23:00",
                                      style: { "max-width": "400px" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode("div", { class: "form-tip" }, "显示在已联系客服弹窗中的服务时间提示")
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
                              createVNode("h3", { class: "section-title" }, "🕒 服务时间设置"),
                              createVNode(_component_el_form_item, { label: "在线服务时间" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).service_time,
                                    "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                    placeholder: "例如: 10:00 - 23:00",
                                    style: { "max-width": "400px" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode("div", { class: "form-tip" }, "显示在已联系客服弹窗中的服务时间提示")
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
                  _push3(`<h3 class="section-title" data-v-d6bbbc24${_scopeId2}>🖥️ PC 端设置 (Modal)</h3><div class="p-4 bg-gray-50 rounded mb-6" data-v-d6bbbc24${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_row, { gutter: 40 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_col, { span: 12 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="sub-title" data-v-d6bbbc24${_scopeId4}>微信客服 (WeChat)</div>`);
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "微信号 / ID" }, {
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "微信二维码" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(ContactImageUploader, {
                                      modelValue: unref(form).wechat_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                      folder: "contact_materials",
                                      tip: "建议尺寸: 300x300"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(ContactImageUploader, {
                                        modelValue: unref(form).wechat_qr,
                                        "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                        folder: "contact_materials",
                                        tip: "建议尺寸: 300x300"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "sub-title" }, "微信客服 (WeChat)"),
                                createVNode(_component_el_form_item, { label: "微信号 / ID" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).wechat_id,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                      placeholder: "Spotify-cn"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "微信二维码" }, {
                                  default: withCtx(() => [
                                    createVNode(ContactImageUploader, {
                                      modelValue: unref(form).wechat_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                      folder: "contact_materials",
                                      tip: "建议尺寸: 300x300"
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
                              _push5(`<div class="sub-title" data-v-d6bbbc24${_scopeId4}>Telegram 客服</div>`);
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "用户名 / ID" }, {
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
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "Telegram二维码" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(ContactImageUploader, {
                                      modelValue: unref(form).telegram_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                      folder: "contact_materials",
                                      tip: "建议尺寸: 300x300"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(ContactImageUploader, {
                                        modelValue: unref(form).telegram_qr,
                                        "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                        folder: "contact_materials",
                                        tip: "建议尺寸: 300x300"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "sub-title" }, "Telegram 客服"),
                                createVNode(_component_el_form_item, { label: "用户名 / ID" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: unref(form).telegram_id,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                      placeholder: "@Fantula_Support"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { label: "Telegram二维码" }, {
                                  default: withCtx(() => [
                                    createVNode(ContactImageUploader, {
                                      modelValue: unref(form).telegram_qr,
                                      "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                      folder: "contact_materials",
                                      tip: "建议尺寸: 300x300"
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
                              createVNode("div", { class: "sub-title" }, "微信客服 (WeChat)"),
                              createVNode(_component_el_form_item, { label: "微信号 / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).wechat_id,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                    placeholder: "Spotify-cn"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "微信二维码" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).wechat_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                    folder: "contact_materials",
                                    tip: "建议尺寸: 300x300"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "Telegram 客服"),
                              createVNode(_component_el_form_item, { label: "用户名 / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).telegram_id,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                    placeholder: "@Fantula_Support"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "Telegram二维码" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).telegram_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                    folder: "contact_materials",
                                    tip: "建议尺寸: 300x300"
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
                  _push3(`<h3 class="section-title" data-v-d6bbbc24${_scopeId2}>📱 移动端设置 (H5)</h3><div class="p-4 bg-blue-50 rounded" data-v-d6bbbc24${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_alert, {
                    title: "移动端自动同步",
                    type: "info",
                    closable: false,
                    "show-icon": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 移动端将自动复用上述配置信息。 <ul data-v-d6bbbc24${_scopeId3}><li data-v-d6bbbc24${_scopeId3}><strong data-v-d6bbbc24${_scopeId3}>微信号/TG号</strong>: 点击可直接复制。</li><li data-v-d6bbbc24${_scopeId3}><strong data-v-d6bbbc24${_scopeId3}>二维码</strong>: 移动端暂不展示二维码，仅展示文本ID。</li></ul>`);
                      } else {
                        return [
                          createTextVNode(" 移动端将自动复用上述配置信息。 "),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "微信号/TG号"),
                              createTextVNode(": 点击可直接复制。")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "二维码"),
                              createTextVNode(": 移动端暂不展示二维码，仅展示文本ID。")
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
                            createVNode("h3", { class: "section-title" }, "🕒 服务时间设置"),
                            createVNode(_component_el_form_item, { label: "在线服务时间" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).service_time,
                                  "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                  placeholder: "例如: 10:00 - 23:00",
                                  style: { "max-width": "400px" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("div", { class: "form-tip" }, "显示在已联系客服弹窗中的服务时间提示")
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
                    createVNode("h3", { class: "section-title" }, "🖥️ PC 端设置 (Modal)"),
                    createVNode("div", { class: "p-4 bg-gray-50 rounded mb-6" }, [
                      createVNode(_component_el_row, { gutter: 40 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "微信客服 (WeChat)"),
                              createVNode(_component_el_form_item, { label: "微信号 / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).wechat_id,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                    placeholder: "Spotify-cn"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "微信二维码" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).wechat_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                    folder: "contact_materials",
                                    tip: "建议尺寸: 300x300"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "sub-title" }, "Telegram 客服"),
                              createVNode(_component_el_form_item, { label: "用户名 / ID" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(form).telegram_id,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                    placeholder: "@Fantula_Support"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { label: "Telegram二维码" }, {
                                default: withCtx(() => [
                                  createVNode(ContactImageUploader, {
                                    modelValue: unref(form).telegram_qr,
                                    "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                    folder: "contact_materials",
                                    tip: "建议尺寸: 300x300"
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
                    createVNode("h3", { class: "section-title" }, "📱 移动端设置 (H5)"),
                    createVNode("div", { class: "p-4 bg-blue-50 rounded" }, [
                      createVNode(_component_el_alert, {
                        title: "移动端自动同步",
                        type: "info",
                        closable: false,
                        "show-icon": ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 移动端将自动复用上述配置信息。 "),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode("strong", null, "微信号/TG号"),
                              createTextVNode(": 点击可直接复制。")
                            ]),
                            createVNode("li", null, [
                              createVNode("strong", null, "二维码"),
                              createTextVNode(": 移动端暂不展示二维码，仅展示文本ID。")
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
                          createVNode("h3", { class: "section-title" }, "🕒 服务时间设置"),
                          createVNode(_component_el_form_item, { label: "在线服务时间" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: unref(form).service_time,
                                "onUpdate:modelValue": ($event) => unref(form).service_time = $event,
                                placeholder: "例如: 10:00 - 23:00",
                                style: { "max-width": "400px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "form-tip" }, "显示在已联系客服弹窗中的服务时间提示")
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
                  createVNode("h3", { class: "section-title" }, "🖥️ PC 端设置 (Modal)"),
                  createVNode("div", { class: "p-4 bg-gray-50 rounded mb-6" }, [
                    createVNode(_component_el_row, { gutter: 40 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "sub-title" }, "微信客服 (WeChat)"),
                            createVNode(_component_el_form_item, { label: "微信号 / ID" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).wechat_id,
                                  "onUpdate:modelValue": ($event) => unref(form).wechat_id = $event,
                                  placeholder: "Spotify-cn"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "微信二维码" }, {
                              default: withCtx(() => [
                                createVNode(ContactImageUploader, {
                                  modelValue: unref(form).wechat_qr,
                                  "onUpdate:modelValue": ($event) => unref(form).wechat_qr = $event,
                                  folder: "contact_materials",
                                  tip: "建议尺寸: 300x300"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_col, { span: 12 }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "sub-title" }, "Telegram 客服"),
                            createVNode(_component_el_form_item, { label: "用户名 / ID" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(form).telegram_id,
                                  "onUpdate:modelValue": ($event) => unref(form).telegram_id = $event,
                                  placeholder: "@Fantula_Support"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { label: "Telegram二维码" }, {
                              default: withCtx(() => [
                                createVNode(ContactImageUploader, {
                                  modelValue: unref(form).telegram_qr,
                                  "onUpdate:modelValue": ($event) => unref(form).telegram_qr = $event,
                                  folder: "contact_materials",
                                  tip: "建议尺寸: 300x300"
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
                  createVNode("h3", { class: "section-title" }, "📱 移动端设置 (H5)"),
                  createVNode("div", { class: "p-4 bg-blue-50 rounded" }, [
                    createVNode(_component_el_alert, {
                      title: "移动端自动同步",
                      type: "info",
                      closable: false,
                      "show-icon": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 移动端将自动复用上述配置信息。 "),
                        createVNode("ul", null, [
                          createVNode("li", null, [
                            createVNode("strong", null, "微信号/TG号"),
                            createTextVNode(": 点击可直接复制。")
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "二维码"),
                            createTextVNode(": 移动端暂不展示二维码，仅展示文本ID。")
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
export {
  contact as default
};
//# sourceMappingURL=contact-B5aWAa-y.js.map
