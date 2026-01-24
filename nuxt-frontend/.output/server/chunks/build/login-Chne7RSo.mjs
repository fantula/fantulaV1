import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElTabs, a as ElTabPane } from './index-DghwLlHw.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { _ as _export_sfc, bg as useAdminStore, ah as ElMessage, n as navigateTo, ak as setInterval } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, withKeys, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'lodash-unified';
import '@vueuse/core';
import './raf-CQRaPAjg.mjs';
import './strings-D1uxkXhq.mjs';
import '@vue/shared';
import './event-BZTOGHfp.mjs';
import './index-BrFCEoKQ.mjs';
import './vnode-D0IHQw_9.mjs';
import './constants-hAKFmBbq.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import 'async-validator';
import './index-Dxw_X3Hq.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
import './index-7IYgoTSU.mjs';
import '@ctrl/tinycolor';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const adminStore = useAdminStore();
    const loginMode = ref("password");
    const loading = ref(false);
    const sendingCode = ref(false);
    const countdown = ref(0);
    const passwordFormRef = ref();
    const passwordForm = reactive({
      email: "",
      password: ""
    });
    const passwordRules = reactive({
      email: [
        { required: true, message: "\u8BF7\u8F93\u5165\u90AE\u7BB1", trigger: "blur" },
        { type: "email", message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u683C\u5F0F", trigger: "blur" }
      ],
      password: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" }
      ]
    });
    const otpFormRef = ref();
    const otpForm = reactive({
      email: "",
      code: ""
    });
    const otpRules = reactive({
      email: [
        { required: true, message: "\u8BF7\u8F93\u5165\u90AE\u7BB1", trigger: "blur" },
        { type: "email", message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u683C\u5F0F", trigger: "blur" }
      ],
      code: [
        { required: true, message: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801", trigger: "blur" },
        { min: 6, max: 6, message: "\u9A8C\u8BC1\u7801\u4E3A6\u4F4D\u6570\u5B57", trigger: "blur" }
      ]
    });
    const handlePasswordLogin = async () => {
      var _a, _b;
      const valid = await ((_a = passwordFormRef.value) == null ? void 0 : _a.validate().catch(() => false));
      if (!valid) return;
      loading.value = true;
      try {
        const result = await adminStore.login(passwordForm.email, passwordForm.password);
        if (!result.success) {
          ElMessage.error(result.error || "\u767B\u5F55\u5931\u8D25");
          return;
        }
        ElMessage.success(`\u6B22\u8FCE\u56DE\u6765\uFF0C${((_b = adminStore.adminInfo) == null ? void 0 : _b.name) || "\u7BA1\u7406\u5458"}`);
        await navigateTo("/_mgmt_9Xfa3");
      } catch (e) {
        ElMessage.error(e.message || "\u767B\u5F55\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const handleSendCode = async () => {
      var _a;
      const emailValid = await ((_a = otpFormRef.value) == null ? void 0 : _a.validateField("email").catch(() => false));
      if (!emailValid) return;
      sendingCode.value = true;
      try {
        const result = await adminStore.sendOtp(otpForm.email);
        if (!result.success) {
          ElMessage.error(result.error || "\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25");
          return;
        }
        ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u5230\u60A8\u7684\u90AE\u7BB1");
        startCountdown();
      } catch (e) {
        ElMessage.error(e.message || "\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25");
      } finally {
        sendingCode.value = false;
      }
    };
    const handleOtpLogin = async () => {
      var _a, _b;
      const valid = await ((_a = otpFormRef.value) == null ? void 0 : _a.validate().catch(() => false));
      if (!valid) return;
      loading.value = true;
      try {
        const result = await adminStore.loginWithOtp(otpForm.email, otpForm.code);
        if (!result.success) {
          ElMessage.error(result.error || "\u767B\u5F55\u5931\u8D25");
          return;
        }
        ElMessage.success(`\u6B22\u8FCE\u56DE\u6765\uFF0C${((_b = adminStore.adminInfo) == null ? void 0 : _b.name) || "\u7BA1\u7406\u5458"}`);
        await navigateTo("/_mgmt_9Xfa3");
      } catch (e) {
        ElMessage.error(e.message || "\u767B\u5F55\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const startCountdown = () => {
      countdown.value = 300;
      setInterval();
    };
    const formatCountdown = (seconds) => {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min}:${sec.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_tabs = ElTabs;
      const _component_el_tab_pane = ElTabPane;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container" }, _attrs))} data-v-43229013>`);
      _push(ssrRenderComponent(_component_el_card, { class: "login-card" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-43229013${_scopeId}><span data-v-43229013${_scopeId}>\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF\u767B\u5F55</span></div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF\u767B\u5F55")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_tabs, {
              modelValue: loginMode.value,
              "onUpdate:modelValue": ($event) => loginMode.value = $event,
              class: "login-tabs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tab_pane, {
                    label: "\u5BC6\u7801\u767B\u5F55",
                    name: "password"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form, {
                          model: passwordForm,
                          rules: passwordRules,
                          ref_key: "passwordFormRef",
                          ref: passwordFormRef,
                          "label-width": "0px"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { prop: "email" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: passwordForm.email,
                                      "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                      placeholder: "\u90AE\u7BB1",
                                      "prefix-icon": "Message",
                                      clearable: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: passwordForm.email,
                                        "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                        placeholder: "\u90AE\u7BB1",
                                        "prefix-icon": "Message",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { prop: "password" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: passwordForm.password,
                                      "onUpdate:modelValue": ($event) => passwordForm.password = $event,
                                      placeholder: "\u5BC6\u7801",
                                      "prefix-icon": "Lock",
                                      "show-password": "",
                                      clearable: "",
                                      onKeyup: handlePasswordLogin
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: passwordForm.password,
                                        "onUpdate:modelValue": ($event) => passwordForm.password = $event,
                                        placeholder: "\u5BC6\u7801",
                                        "prefix-icon": "Lock",
                                        "show-password": "",
                                        clearable: "",
                                        onKeyup: withKeys(handlePasswordLogin, ["enter"])
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_button, {
                                      type: "primary",
                                      class: "login-btn",
                                      onClick: handlePasswordLogin,
                                      loading: loading.value
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` \u767B\u5F55 `);
                                        } else {
                                          return [
                                            createTextVNode(" \u767B\u5F55 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_button, {
                                        type: "primary",
                                        class: "login-btn",
                                        onClick: handlePasswordLogin,
                                        loading: loading.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" \u767B\u5F55 ")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { prop: "email" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: passwordForm.email,
                                      "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                      placeholder: "\u90AE\u7BB1",
                                      "prefix-icon": "Message",
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { prop: "password" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: passwordForm.password,
                                      "onUpdate:modelValue": ($event) => passwordForm.password = $event,
                                      placeholder: "\u5BC6\u7801",
                                      "prefix-icon": "Lock",
                                      "show-password": "",
                                      clearable: "",
                                      onKeyup: withKeys(handlePasswordLogin, ["enter"])
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_button, {
                                      type: "primary",
                                      class: "login-btn",
                                      onClick: handlePasswordLogin,
                                      loading: loading.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" \u767B\u5F55 ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
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
                          createVNode(_component_el_form, {
                            model: passwordForm,
                            rules: passwordRules,
                            ref_key: "passwordFormRef",
                            ref: passwordFormRef,
                            "label-width": "0px"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { prop: "email" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: passwordForm.email,
                                    "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                    placeholder: "\u90AE\u7BB1",
                                    "prefix-icon": "Message",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { prop: "password" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: passwordForm.password,
                                    "onUpdate:modelValue": ($event) => passwordForm.password = $event,
                                    placeholder: "\u5BC6\u7801",
                                    "prefix-icon": "Lock",
                                    "show-password": "",
                                    clearable: "",
                                    onKeyup: withKeys(handlePasswordLogin, ["enter"])
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    class: "login-btn",
                                    onClick: handlePasswordLogin,
                                    loading: loading.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" \u767B\u5F55 ")
                                    ]),
                                    _: 1
                                  }, 8, ["loading"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_tab_pane, {
                    label: "\u9A8C\u8BC1\u7801\u767B\u5F55",
                    name: "otp"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form, {
                          model: otpForm,
                          rules: otpRules,
                          ref_key: "otpFormRef",
                          ref: otpFormRef,
                          "label-width": "0px"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { prop: "email" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: otpForm.email,
                                      "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                      placeholder: "\u90AE\u7BB1",
                                      "prefix-icon": "Message",
                                      clearable: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: otpForm.email,
                                        "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                        placeholder: "\u90AE\u7BB1",
                                        "prefix-icon": "Message",
                                        clearable: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, { prop: "code" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="code-input-group" data-v-43229013${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: otpForm.code,
                                      "onUpdate:modelValue": ($event) => otpForm.code = $event,
                                      placeholder: "\u9A8C\u8BC1\u7801",
                                      "prefix-icon": "Key",
                                      clearable: "",
                                      onKeyup: handleOtpLogin
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_button, {
                                      type: "primary",
                                      plain: "",
                                      disabled: countdown.value > 0 || sendingCode.value,
                                      loading: sendingCode.value,
                                      onClick: handleSendCode
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "code-input-group" }, [
                                        createVNode(_component_el_input, {
                                          modelValue: otpForm.code,
                                          "onUpdate:modelValue": ($event) => otpForm.code = $event,
                                          placeholder: "\u9A8C\u8BC1\u7801",
                                          "prefix-icon": "Key",
                                          clearable: "",
                                          onKeyup: withKeys(handleOtpLogin, ["enter"])
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(_component_el_button, {
                                          type: "primary",
                                          plain: "",
                                          disabled: countdown.value > 0 || sendingCode.value,
                                          loading: sendingCode.value,
                                          onClick: handleSendCode
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["disabled", "loading"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_button, {
                                      type: "primary",
                                      class: "login-btn",
                                      onClick: handleOtpLogin,
                                      loading: loading.value
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` \u767B\u5F55 `);
                                        } else {
                                          return [
                                            createTextVNode(" \u767B\u5F55 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_button, {
                                        type: "primary",
                                        class: "login-btn",
                                        onClick: handleOtpLogin,
                                        loading: loading.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" \u767B\u5F55 ")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { prop: "email" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: otpForm.email,
                                      "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                      placeholder: "\u90AE\u7BB1",
                                      "prefix-icon": "Message",
                                      clearable: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, { prop: "code" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "code-input-group" }, [
                                      createVNode(_component_el_input, {
                                        modelValue: otpForm.code,
                                        "onUpdate:modelValue": ($event) => otpForm.code = $event,
                                        placeholder: "\u9A8C\u8BC1\u7801",
                                        "prefix-icon": "Key",
                                        clearable: "",
                                        onKeyup: withKeys(handleOtpLogin, ["enter"])
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_component_el_button, {
                                        type: "primary",
                                        plain: "",
                                        disabled: countdown.value > 0 || sendingCode.value,
                                        loading: sendingCode.value,
                                        onClick: handleSendCode
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["disabled", "loading"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_button, {
                                      type: "primary",
                                      class: "login-btn",
                                      onClick: handleOtpLogin,
                                      loading: loading.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" \u767B\u5F55 ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
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
                          createVNode(_component_el_form, {
                            model: otpForm,
                            rules: otpRules,
                            ref_key: "otpFormRef",
                            ref: otpFormRef,
                            "label-width": "0px"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { prop: "email" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: otpForm.email,
                                    "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                    placeholder: "\u90AE\u7BB1",
                                    "prefix-icon": "Message",
                                    clearable: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, { prop: "code" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "code-input-group" }, [
                                    createVNode(_component_el_input, {
                                      modelValue: otpForm.code,
                                      "onUpdate:modelValue": ($event) => otpForm.code = $event,
                                      placeholder: "\u9A8C\u8BC1\u7801",
                                      "prefix-icon": "Key",
                                      clearable: "",
                                      onKeyup: withKeys(handleOtpLogin, ["enter"])
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(_component_el_button, {
                                      type: "primary",
                                      plain: "",
                                      disabled: countdown.value > 0 || sendingCode.value,
                                      loading: sendingCode.value,
                                      onClick: handleSendCode
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["disabled", "loading"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    class: "login-btn",
                                    onClick: handleOtpLogin,
                                    loading: loading.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" \u767B\u5F55 ")
                                    ]),
                                    _: 1
                                  }, 8, ["loading"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model", "rules"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tab_pane, {
                      label: "\u5BC6\u7801\u767B\u5F55",
                      name: "password"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form, {
                          model: passwordForm,
                          rules: passwordRules,
                          ref_key: "passwordFormRef",
                          ref: passwordFormRef,
                          "label-width": "0px"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { prop: "email" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: passwordForm.email,
                                  "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                  placeholder: "\u90AE\u7BB1",
                                  "prefix-icon": "Message",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "password" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: passwordForm.password,
                                  "onUpdate:modelValue": ($event) => passwordForm.password = $event,
                                  placeholder: "\u5BC6\u7801",
                                  "prefix-icon": "Lock",
                                  "show-password": "",
                                  clearable: "",
                                  onKeyup: withKeys(handlePasswordLogin, ["enter"])
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  class: "login-btn",
                                  onClick: handlePasswordLogin,
                                  loading: loading.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u767B\u5F55 ")
                                  ]),
                                  _: 1
                                }, 8, ["loading"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model", "rules"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_tab_pane, {
                      label: "\u9A8C\u8BC1\u7801\u767B\u5F55",
                      name: "otp"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form, {
                          model: otpForm,
                          rules: otpRules,
                          ref_key: "otpFormRef",
                          ref: otpFormRef,
                          "label-width": "0px"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { prop: "email" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: otpForm.email,
                                  "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                  placeholder: "\u90AE\u7BB1",
                                  "prefix-icon": "Message",
                                  clearable: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "code" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "code-input-group" }, [
                                  createVNode(_component_el_input, {
                                    modelValue: otpForm.code,
                                    "onUpdate:modelValue": ($event) => otpForm.code = $event,
                                    placeholder: "\u9A8C\u8BC1\u7801",
                                    "prefix-icon": "Key",
                                    clearable: "",
                                    onKeyup: withKeys(handleOtpLogin, ["enter"])
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    plain: "",
                                    disabled: countdown.value > 0 || sendingCode.value,
                                    loading: sendingCode.value,
                                    onClick: handleSendCode
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["disabled", "loading"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  class: "login-btn",
                                  onClick: handleOtpLogin,
                                  loading: loading.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u767B\u5F55 ")
                                  ]),
                                  _: 1
                                }, 8, ["loading"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model", "rules"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="login-hint" data-v-43229013${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "\u6D4B\u8BD5\u8D26\u53F7\uFF1Aadmin@fantula.com / admin123456",
              type: "info",
              "show-icon": "",
              closable: false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_el_tabs, {
                modelValue: loginMode.value,
                "onUpdate:modelValue": ($event) => loginMode.value = $event,
                class: "login-tabs"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_tab_pane, {
                    label: "\u5BC6\u7801\u767B\u5F55",
                    name: "password"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form, {
                        model: passwordForm,
                        rules: passwordRules,
                        ref_key: "passwordFormRef",
                        ref: passwordFormRef,
                        "label-width": "0px"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { prop: "email" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: passwordForm.email,
                                "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                placeholder: "\u90AE\u7BB1",
                                "prefix-icon": "Message",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { prop: "password" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: passwordForm.password,
                                "onUpdate:modelValue": ($event) => passwordForm.password = $event,
                                placeholder: "\u5BC6\u7801",
                                "prefix-icon": "Lock",
                                "show-password": "",
                                clearable: "",
                                onKeyup: withKeys(handlePasswordLogin, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                class: "login-btn",
                                onClick: handlePasswordLogin,
                                loading: loading.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u767B\u5F55 ")
                                ]),
                                _: 1
                              }, 8, ["loading"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model", "rules"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_tab_pane, {
                    label: "\u9A8C\u8BC1\u7801\u767B\u5F55",
                    name: "otp"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form, {
                        model: otpForm,
                        rules: otpRules,
                        ref_key: "otpFormRef",
                        ref: otpFormRef,
                        "label-width": "0px"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { prop: "email" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: otpForm.email,
                                "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                placeholder: "\u90AE\u7BB1",
                                "prefix-icon": "Message",
                                clearable: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { prop: "code" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "code-input-group" }, [
                                createVNode(_component_el_input, {
                                  modelValue: otpForm.code,
                                  "onUpdate:modelValue": ($event) => otpForm.code = $event,
                                  placeholder: "\u9A8C\u8BC1\u7801",
                                  "prefix-icon": "Key",
                                  clearable: "",
                                  onKeyup: withKeys(handleOtpLogin, ["enter"])
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  plain: "",
                                  disabled: countdown.value > 0 || sendingCode.value,
                                  loading: sendingCode.value,
                                  onClick: handleSendCode
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "\u53D1\u9001\u9A8C\u8BC1\u7801"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "loading"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                class: "login-btn",
                                onClick: handleOtpLogin,
                                loading: loading.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u767B\u5F55 ")
                                ]),
                                _: 1
                              }, 8, ["loading"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model", "rules"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", { class: "login-hint" }, [
                createVNode(_component_el_alert, {
                  title: "\u6D4B\u8BD5\u8D26\u53F7\uFF1Aadmin@fantula.com / admin123456",
                  type: "info",
                  "show-icon": "",
                  closable: false
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43229013"]]);

export { login as default };
//# sourceMappingURL=login-Chne7RSo.mjs.map
