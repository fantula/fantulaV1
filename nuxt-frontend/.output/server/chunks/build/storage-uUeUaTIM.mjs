import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { _ as _export_sfc, E as ElIcon, aK as view_default, b0 as hide_default, ag as check_default, au as connection_default, ah as ElMessage } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, unref, createBlock, openBlock, createTextVNode, createCommentVNode, withDirectives, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { b as adminSettingsApi } from './media-C2x210Ez.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import './vnode-D0IHQw_9.mjs';
import '@vue/shared';
import 'lodash-unified';
import './constants-hAKFmBbq.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import 'async-validator';
import '@vueuse/core';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
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
import '@supabase/supabase-js';
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
import './index-7IYgoTSU.mjs';
import '@ctrl/tinycolor';
import './index-QnhSR2oe.mjs';

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
        ElMessage.error("\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25: " + e.message);
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
          ElMessage.success("\u914D\u7F6E\u4FDD\u5B58\u6210\u529F");
          await loadSettings();
        } else {
          ElMessage.error("\u4FDD\u5B58\u5931\u8D25: " + res.error);
        }
      } catch (e) {
        ElMessage.error("\u4FDD\u5B58\u5931\u8D25: " + e.message);
      } finally {
        saving.value = false;
      }
    };
    const testConnection = async () => {
      testing.value = true;
      testResult.value = null;
      try {
        const { callEdgeFunction } = await import('./server.mjs').then((n) => n.cn);
        const { getAdminAuthToken } = await import('./server.mjs').then((n) => n.cm);
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
            message: data.message || (data.success ? "\u8FDE\u63A5\u6210\u529F" : "\u672A\u77E5\u9519\u8BEF")
          };
        }
      } catch (e) {
        console.error("Test connection exception:", e);
        testResult.value = {
          success: false,
          message: "\u524D\u7AEF\u5F02\u5E38: " + (e.message || "\u672A\u77E5\u9519\u8BEF")
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
      _push(ssrRenderComponent(AdminActionCard, { title: "R2 \u5B58\u50A8\u914D\u7F6E" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "\u5B89\u5168\u63D0\u793A",
              type: "warning",
              closable: false,
              "show-icon": "",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="safe-tips" data-v-c3239d1c${_scopeId2}><li data-v-c3239d1c${_scopeId2}>R2 \u5BC6\u94A5\u5B58\u50A8\u5728\u6570\u636E\u5E93\u4E2D\uFF0C\u4EC5\u5141\u8BB8\u540E\u7AEF Edge Function \u8BFB\u53D6</li><li data-v-c3239d1c${_scopeId2}>\u524D\u7AEF\u65E0\u6CD5\u76F4\u63A5\u83B7\u53D6\u8FD9\u4E9B\u5BC6\u94A5\uFF0C\u6240\u6709\u4E0A\u4F20\u64CD\u4F5C\u90FD\u901A\u8FC7\u670D\u52A1\u7AEF\u5B8C\u6210</li><li data-v-c3239d1c${_scopeId2}>R2 \u5B58\u50A8\u6876\u4E0D\u76F4\u63A5\u66B4\u9732\u516C\u7F51\uFF0C\u6240\u6709\u8BBF\u95EE\u5FC5\u987B\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406</li></ul>`);
                } else {
                  return [
                    createVNode("ul", { class: "safe-tips" }, [
                      createVNode("li", null, "R2 \u5BC6\u94A5\u5B58\u50A8\u5728\u6570\u636E\u5E93\u4E2D\uFF0C\u4EC5\u5141\u8BB8\u540E\u7AEF Edge Function \u8BFB\u53D6"),
                      createVNode("li", null, "\u524D\u7AEF\u65E0\u6CD5\u76F4\u63A5\u83B7\u53D6\u8FD9\u4E9B\u5BC6\u94A5\uFF0C\u6240\u6709\u4E0A\u4F20\u64CD\u4F5C\u90FD\u901A\u8FC7\u670D\u52A1\u7AEF\u5B8C\u6210"),
                      createVNode("li", null, "R2 \u5B58\u50A8\u6876\u4E0D\u76F4\u63A5\u66B4\u9732\u516C\u7F51\uFF0C\u6240\u6709\u8BBF\u95EE\u5FC5\u987B\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406")
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "Cloudflare \u8D26\u53F7 ID" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_ACCOUNT_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                          placeholder: "\u8BF7\u8F93\u5165 Cloudflare Account ID"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_ACCOUNT_ID,
                            "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                            placeholder: "\u8BF7\u8F93\u5165 Cloudflare Account ID"
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
                          placeholder: "\u8BF7\u8F93\u5165 R2 Access Key ID"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_ACCESS_KEY_ID,
                            "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                            placeholder: "\u8BF7\u8F93\u5165 R2 Access Key ID"
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
                          placeholder: "\u8BF7\u8F93\u5165 R2 Secret Access Key"
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
                        _push4(`<div class="form-tip" data-v-c3239d1c${_scopeId3}>\u5BC6\u94A5\u4EC5\u5728\u670D\u52A1\u7AEF\u4F7F\u7528\uFF0C\u4E0D\u4F1A\u66B4\u9732\u7ED9\u524D\u7AEF</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_SECRET_ACCESS_KEY,
                            "onUpdate:modelValue": ($event) => form.R2_SECRET_ACCESS_KEY = $event,
                            type: showSecret.value ? "text" : "password",
                            placeholder: "\u8BF7\u8F93\u5165 R2 Secret Access Key"
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
                          createVNode("div", { class: "form-tip" }, "\u5BC6\u94A5\u4EC5\u5728\u670D\u52A1\u7AEF\u4F7F\u7528\uFF0C\u4E0D\u4F1A\u66B4\u9732\u7ED9\u524D\u7AEF")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u5B58\u50A8\u6876\u540D\u79F0" }, {
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u516C\u5F00\u8BBF\u95EE\u57DF\u540D" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.R2_PUBLIC_BASE_URL,
                          "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                          placeholder: "https://img.fantula.com"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip" data-v-c3239d1c${_scopeId3}>\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406\u7684\u81EA\u5B9A\u4E49\u57DF\u540D</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.R2_PUBLIC_BASE_URL,
                            "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                            placeholder: "https://img.fantula.com"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406\u7684\u81EA\u5B9A\u4E49\u57DF\u540D")
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
                              _push5(`\u4FDD\u5B58\u914D\u7F6E`);
                            } else {
                              return [
                                createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
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
                              _push5(`\u6D4B\u8BD5\u8FDE\u63A5`);
                            } else {
                              return [
                                createTextVNode("\u6D4B\u8BD5\u8FDE\u63A5")
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
                              createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
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
                              createTextVNode("\u6D4B\u8BD5\u8FDE\u63A5")
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
                    createVNode(_component_el_form_item, { label: "Cloudflare \u8D26\u53F7 ID" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_ACCOUNT_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                          placeholder: "\u8BF7\u8F93\u5165 Cloudflare Account ID"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "Access Key ID" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_ACCESS_KEY_ID,
                          "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                          placeholder: "\u8BF7\u8F93\u5165 R2 Access Key ID"
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
                          placeholder: "\u8BF7\u8F93\u5165 R2 Secret Access Key"
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
                        createVNode("div", { class: "form-tip" }, "\u5BC6\u94A5\u4EC5\u5728\u670D\u52A1\u7AEF\u4F7F\u7528\uFF0C\u4E0D\u4F1A\u66B4\u9732\u7ED9\u524D\u7AEF")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u5B58\u50A8\u6876\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_BUCKET_NAME,
                          "onUpdate:modelValue": ($event) => form.R2_BUCKET_NAME = $event,
                          placeholder: "fantula2601"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u516C\u5F00\u8BBF\u95EE\u57DF\u540D" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.R2_PUBLIC_BASE_URL,
                          "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                          placeholder: "https://img.fantula.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406\u7684\u81EA\u5B9A\u4E49\u57DF\u540D")
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
                            createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
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
                            createTextVNode("\u6D4B\u8BD5\u8FDE\u63A5")
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
                title: "\u5B89\u5168\u63D0\u793A",
                type: "warning",
                closable: false,
                "show-icon": "",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode("ul", { class: "safe-tips" }, [
                    createVNode("li", null, "R2 \u5BC6\u94A5\u5B58\u50A8\u5728\u6570\u636E\u5E93\u4E2D\uFF0C\u4EC5\u5141\u8BB8\u540E\u7AEF Edge Function \u8BFB\u53D6"),
                    createVNode("li", null, "\u524D\u7AEF\u65E0\u6CD5\u76F4\u63A5\u83B7\u53D6\u8FD9\u4E9B\u5BC6\u94A5\uFF0C\u6240\u6709\u4E0A\u4F20\u64CD\u4F5C\u90FD\u901A\u8FC7\u670D\u52A1\u7AEF\u5B8C\u6210"),
                    createVNode("li", null, "R2 \u5B58\u50A8\u6876\u4E0D\u76F4\u63A5\u66B4\u9732\u516C\u7F51\uFF0C\u6240\u6709\u8BBF\u95EE\u5FC5\u987B\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406")
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
                  createVNode(_component_el_form_item, { label: "Cloudflare \u8D26\u53F7 ID" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_ACCOUNT_ID,
                        "onUpdate:modelValue": ($event) => form.R2_ACCOUNT_ID = $event,
                        placeholder: "\u8BF7\u8F93\u5165 Cloudflare Account ID"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "Access Key ID" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_ACCESS_KEY_ID,
                        "onUpdate:modelValue": ($event) => form.R2_ACCESS_KEY_ID = $event,
                        placeholder: "\u8BF7\u8F93\u5165 R2 Access Key ID"
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
                        placeholder: "\u8BF7\u8F93\u5165 R2 Secret Access Key"
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
                      createVNode("div", { class: "form-tip" }, "\u5BC6\u94A5\u4EC5\u5728\u670D\u52A1\u7AEF\u4F7F\u7528\uFF0C\u4E0D\u4F1A\u66B4\u9732\u7ED9\u524D\u7AEF")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u5B58\u50A8\u6876\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_BUCKET_NAME,
                        "onUpdate:modelValue": ($event) => form.R2_BUCKET_NAME = $event,
                        placeholder: "fantula2601"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u516C\u5F00\u8BBF\u95EE\u57DF\u540D" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.R2_PUBLIC_BASE_URL,
                        "onUpdate:modelValue": ($event) => form.R2_PUBLIC_BASE_URL = $event,
                        placeholder: "https://img.fantula.com"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "\u901A\u8FC7 Cloudflare Worker \u4EE3\u7406\u7684\u81EA\u5B9A\u4E49\u57DF\u540D")
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
                          createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
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
                          createTextVNode("\u6D4B\u8BD5\u8FDE\u63A5")
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

export { storage as default };
//# sourceMappingURL=storage-uUeUaTIM.mjs.map
