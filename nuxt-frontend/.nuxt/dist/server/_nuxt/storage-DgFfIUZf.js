import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElIcon, aK as view_default, b0 as hide_default, ag as check_default, au as connection_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElButton } from "./index-DR2tYDZ3.js";
/* empty css                  */
/* empty css                      */
/* empty css                  */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, unref, createBlock, openBlock, createTextVNode, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { c as adminSettingsApi } from "./media-C2x210Ez.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import "./vnode-D0IHQw_9.js";
import "@vue/shared";
import "lodash-unified";
import "./constants-hAKFmBbq.js";
import "./use-form-common-props-DlCG9pC5.js";
import "async-validator";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "./event-BZTOGHfp.js";
import "./index-ClPmkyX9.js";
import "./aria-B8G3G_75.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "@ctrl/tinycolor";
import "./index-QnhSR2oe.js";
/* empty css                    */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "storage",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const saving = ref(false);
    const showSecret = ref(false);
    const testing = ref(false);
    const testResult = ref(null);
    const originalSecretKey = ref("");
    const form = reactive({
      R2_ACCOUNT_ID: "",
      R2_ACCESS_KEY_ID: "",
      R2_SECRET_ACCESS_KEY: "",
      R2_BUCKET_NAME: "fantula2601",
      R2_PUBLIC_BASE_URL: "https://img.fantula.com"
    });
    const loadSettings = async () => {
      loading.value = true;
      try {
        const res = await adminSettingsApi.getR2Settings();
        if (res.success && res.settings) {
          Object.assign(form, res.settings);
          originalSecretKey.value = res.settings.R2_SECRET_ACCESS_KEY || "";
        }
      } catch (e) {
        ElMessage.error("加载配置失败: " + e.message);
      } finally {
        loading.value = false;
      }
    };
    const handleSave = async () => {
      saving.value = true;
      try {
        const payload = {
          R2_ACCOUNT_ID: form.R2_ACCOUNT_ID,
          R2_ACCESS_KEY_ID: form.R2_ACCESS_KEY_ID,
          R2_BUCKET_NAME: form.R2_BUCKET_NAME,
          R2_PUBLIC_BASE_URL: form.R2_PUBLIC_BASE_URL
        };
        if (form.R2_SECRET_ACCESS_KEY !== originalSecretKey.value) {
          payload.R2_SECRET_ACCESS_KEY = form.R2_SECRET_ACCESS_KEY;
        }
        const res = await adminSettingsApi.updateR2Settings(payload);
        if (res.success) {
          ElMessage.success("配置保存成功");
          await loadSettings();
        } else {
          ElMessage.error("保存失败: " + res.error);
        }
      } catch (e) {
        ElMessage.error("保存失败: " + e.message);
      } finally {
        saving.value = false;
      }
    };
    const testConnection = async () => {
      testing.value = true;
      testResult.value = null;
      try {
        const { callEdgeFunction } = await import("../server.mjs").then((n) => n.cn);
        const { getAdminAuthToken } = await import("../server.mjs").then((n) => n.cm);
        const token = await getAdminAuthToken();
        const { data, error } = await callEdgeFunction("test-r2-connection", {
          method: "POST",
          body: {
            R2_ACCOUNT_ID: form.R2_ACCOUNT_ID,
            R2_ACCESS_KEY_ID: form.R2_ACCESS_KEY_ID,
            R2_SECRET_ACCESS_KEY: form.R2_SECRET_ACCESS_KEY,
            R2_BUCKET_NAME: form.R2_BUCKET_NAME
          },
          requireAuth: true,
          token: token || void 0
          // Pass the admin token
        });
        if (error) {
          testResult.value = {
            success: false,
            message: error
          };
        } else {
          testResult.value = {
            success: data.success,
            message: data.message || (data.success ? "连接成功" : "未知错误")
          };
        }
      } catch (e) {
        console.error("Test connection exception:", e);
        testResult.value = {
          success: false,
          message: "前端异常: " + (e.message || "未知错误")
        };
      } finally {
        testing.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "r2-settings-page" }, _attrs))} data-v-c3239d1c>`);
      _push(ssrRenderComponent(AdminActionCard, { title: "R2 存储配置" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "安全提示",
              type: "warning",
              closable: false,
              "show-icon": "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="safe-tips" data-v-c3239d1c${_scopeId2}><li data-v-c3239d1c${_scopeId2}>R2 密钥存储在数据库中，仅允许后端 Edge Function 读取</li><li data-v-c3239d1c${_scopeId2}>前端无法直接获取这些密钥，所有上传操作都通过服务端完成</li><li data-v-c3239d1c${_scopeId2}>R2 存储桶不直接暴露公网，所有访问必须通过 Cloudflare Worker 代理</li></ul>`);
                } else {
                  return [
                    createVNode("ul", { class: "safe-tips" }, [
                      createVNode("li", null, "R2 密钥存储在数据库中，仅允许后端 Edge Function 读取"),
                      createVNode("li", null, "前端无法直接获取这些密钥，所有上传操作都通过服务端完成"),
                      createVNode("li", null, "R2 存储桶不直接暴露公网，所有访问必须通过 Cloudflare Worker 代理")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form, mergeProps({
              model: form,
              "label-width": "180px",
              "label-position": "left"
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "Cloudflare 账号 ID" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_ACCOUNT_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                          placeholder: "请输入 Cloudflare Account ID"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_ACCOUNT_ID,
                            "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                            placeholder: "请输入 Cloudflare Account ID"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "Access Key ID" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_ACCESS_KEY_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                          placeholder: "请输入 R2 Access Key ID"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_ACCESS_KEY_ID,
                            "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                            placeholder: "请输入 R2 Access Key ID"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "Secret Access Key" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_SECRET_ACCESS_KEY,
                          "onUpdate:modelValue": ($event) => form.R2_SECRET_ACCESS_KEY = $event,
                          type: showSecret.value ? "text" : "password",
                          placeholder: "请输入 R2 Secret Access Key"
                        }, {
                          suffix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, {
                                class: "cursor-pointer",
                                onClick: ($event) => showSecret.value = !showSecret.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (!showSecret.value) {
                                      _push6(ssrRenderComponent(unref(view_default), null, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(unref(hide_default), null, null, _parent6, _scopeId5));
                                    }
                                  } else {
                                    return [
                                      !showSecret.value ? (openBlock(), createBlock(unref(view_default), { key: 0 })) : (openBlock(), createBlock(unref(hide_default), { key: 1 }))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, {
                                  class: "cursor-pointer",
                                  onClick: ($event) => showSecret.value = !showSecret.value
                                }, {
                                  default: withCtx(() => [
                                    !showSecret.value ? (openBlock(), createBlock(unref(view_default), { key: 0 })) : (openBlock(), createBlock(unref(hide_default), { key: 1 }))
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="form-tip" data-v-c3239d1c${_scopeId3}>密钥仅在服务端使用，不会暴露给前端</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_SECRET_ACCESS_KEY,
                            "onUpdate:modelValue": ($event) => form.R2_SECRET_ACCESS_KEY = $event,
                            type: showSecret.value ? "text" : "password",
                            placeholder: "请输入 R2 Secret Access Key"
                          }, {
                            suffix: withCtx(() => [
                              createVNode(_component_el_icon, {
                                class: "cursor-pointer",
                                onClick: ($event) => showSecret.value = !showSecret.value
                              }, {
                                default: withCtx(() => [
                                  !showSecret.value ? (openBlock(), createBlock(unref(view_default), { key: 0 })) : (openBlock(), createBlock(unref(hide_default), { key: 1 }))
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                          createVNode("div", { class: "form-tip" }, "密钥仅在服务端使用，不会暴露给前端")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "存储桶名称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_BUCKET_NAME,
                          "onUpdate:modelValue": ($event) => form.R2_BUCKET_NAME = $event,
                          placeholder: "fantula2601"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_BUCKET_NAME,
                            "onUpdate:modelValue": ($event) => form.R2_BUCKET_NAME = $event,
                            placeholder: "fantula2601"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "公开访问域名" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_PUBLIC_BASE_URL,
                          "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                          placeholder: "https://img.fantula.com"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip" data-v-c3239d1c${_scopeId3}>通过 Cloudflare Worker 代理的自定义域名</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_PUBLIC_BASE_URL,
                            "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                            placeholder: "https://img.fantula.com"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "通过 Cloudflare Worker 代理的自定义域名")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          loading: saving.value,
                          onClick: handleSave,
                          icon: unref(check_default)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`保存配置`);
                            } else {
                              return [
                                createTextVNode("保存配置")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          loading: testing.value,
                          onClick: testConnection,
                          icon: unref(connection_default),
                          style: { "margin-left": "12px" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`测试连接`);
                            } else {
                              return [
                                createTextVNode("测试连接")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            loading: saving.value,
                            onClick: handleSave,
                            icon: unref(check_default)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("保存配置")
                            ]),
                            _: 1
                          }, 8, ["loading", "icon"]),
                          createVNode(_component_el_button, {
                            loading: testing.value,
                            onClick: testConnection,
                            icon: unref(connection_default),
                            style: { "margin-left": "12px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("测试连接")
                            ]),
                            _: 1
                          }, 8, ["loading", "icon"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (testResult.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_alert, {
                            title: testResult.value.message,
                            type: testResult.value.success ? "success" : "error",
                            closable: true,
                            onClose: ($event) => testResult.value = null,
                            "show-icon": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_alert, {
                              title: testResult.value.message,
                              type: testResult.value.success ? "success" : "error",
                              closable: true,
                              onClose: ($event) => testResult.value = null,
                              "show-icon": ""
                            }, null, 8, ["title", "type", "onClose"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "Cloudflare 账号 ID" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_ACCOUNT_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                          placeholder: "请输入 Cloudflare Account ID"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "Access Key ID" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_ACCESS_KEY_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                          placeholder: "请输入 R2 Access Key ID"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "Secret Access Key" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_SECRET_ACCESS_KEY,
                          "onUpdate:modelValue": ($event) => form.R2_SECRET_ACCESS_KEY = $event,
                          type: showSecret.value ? "text" : "password",
                          placeholder: "请输入 R2 Secret Access Key"
                        }, {
                          suffix: withCtx(() => [
                            createVNode(_component_el_icon, {
                              class: "cursor-pointer",
                              onClick: ($event) => showSecret.value = !showSecret.value
                            }, {
                              default: withCtx(() => [
                                !showSecret.value ? (openBlock(), createBlock(unref(view_default), { key: 0 })) : (openBlock(), createBlock(unref(hide_default), { key: 1 }))
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                        createVNode("div", { class: "form-tip" }, "密钥仅在服务端使用，不会暴露给前端")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "存储桶名称" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_BUCKET_NAME,
                          "onUpdate:modelValue": ($event) => form.R2_BUCKET_NAME = $event,
                          placeholder: "fantula2601"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "公开访问域名" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_PUBLIC_BASE_URL,
                          "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                          placeholder: "https://img.fantula.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "通过 Cloudflare Worker 代理的自定义域名")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          loading: saving.value,
                          onClick: handleSave,
                          icon: unref(check_default)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("保存配置")
                          ]),
                          _: 1
                        }, 8, ["loading", "icon"]),
                        createVNode(_component_el_button, {
                          loading: testing.value,
                          onClick: testConnection,
                          icon: unref(connection_default),
                          style: { "margin-left": "12px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("测试连接")
                          ]),
                          _: 1
                        }, 8, ["loading", "icon"])
                      ]),
                      _: 1
                    }),
                    testResult.value ? (openBlock(), createBlock(_component_el_form_item, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_alert, {
                          title: testResult.value.message,
                          type: testResult.value.success ? "success" : "error",
                          closable: true,
                          onClose: ($event) => testResult.value = null,
                          "show-icon": ""
                        }, null, 8, ["title", "type", "onClose"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_alert, {
                title: "安全提示",
                type: "warning",
                closable: false,
                "show-icon": "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode("ul", { class: "safe-tips" }, [
                    createVNode("li", null, "R2 密钥存储在数据库中，仅允许后端 Edge Function 读取"),
                    createVNode("li", null, "前端无法直接获取这些密钥，所有上传操作都通过服务端完成"),
                    createVNode("li", null, "R2 存储桶不直接暴露公网，所有访问必须通过 Cloudflare Worker 代理")
                  ])
                ]),
                _: 1
              }),
              withDirectives((openBlock(), createBlock(_component_el_form, {
                model: form,
                "label-width": "180px",
                "label-position": "left"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "Cloudflare 账号 ID" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_ACCOUNT_ID,
                        "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                        placeholder: "请输入 Cloudflare Account ID"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "Access Key ID" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_ACCESS_KEY_ID,
                        "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                        placeholder: "请输入 R2 Access Key ID"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "Secret Access Key" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_SECRET_ACCESS_KEY,
                        "onUpdate:modelValue": ($event) => form.R2_SECRET_ACCESS_KEY = $event,
                        type: showSecret.value ? "text" : "password",
                        placeholder: "请输入 R2 Secret Access Key"
                      }, {
                        suffix: withCtx(() => [
                          createVNode(_component_el_icon, {
                            class: "cursor-pointer",
                            onClick: ($event) => showSecret.value = !showSecret.value
                          }, {
                            default: withCtx(() => [
                              !showSecret.value ? (openBlock(), createBlock(unref(view_default), { key: 0 })) : (openBlock(), createBlock(unref(hide_default), { key: 1 }))
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                      createVNode("div", { class: "form-tip" }, "密钥仅在服务端使用，不会暴露给前端")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "存储桶名称" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_BUCKET_NAME,
                        "onUpdate:modelValue": ($event) => form.R2_BUCKET_NAME = $event,
                        placeholder: "fantula2601"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "公开访问域名" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_PUBLIC_BASE_URL,
                        "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                        placeholder: "https://img.fantula.com"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "通过 Cloudflare Worker 代理的自定义域名")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        loading: saving.value,
                        onClick: handleSave,
                        icon: unref(check_default)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("保存配置")
                        ]),
                        _: 1
                      }, 8, ["loading", "icon"]),
                      createVNode(_component_el_button, {
                        loading: testing.value,
                        onClick: testConnection,
                        icon: unref(connection_default),
                        style: { "margin-left": "12px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("测试连接")
                        ]),
                        _: 1
                      }, 8, ["loading", "icon"])
                    ]),
                    _: 1
                  }),
                  testResult.value ? (openBlock(), createBlock(_component_el_form_item, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_alert, {
                        title: testResult.value.message,
                        type: testResult.value.success ? "success" : "error",
                        closable: true,
                        onClose: ($event) => testResult.value = null,
                        "show-icon": ""
                      }, null, 8, ["title", "type", "onClose"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["model"])), [
                [_directive_loading, loading.value]
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/backend-settings/storage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const storage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3239d1c"]]);
export {
  storage as default
};
//# sourceMappingURL=storage-DgFfIUZf.js.map
