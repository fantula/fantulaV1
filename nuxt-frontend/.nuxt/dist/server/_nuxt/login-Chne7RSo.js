import { E as ElCard } from "./index-9Hs_9io2.js";
import { E as ElTabs, a as ElTabPane } from "./index-DghwLlHw.js";
import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElAlert } from "./index-DvOrIhmd.js";
import { bg as useAdminStore, ah as ElMessage, n as navigateTo, ak as setInterval, _ as _export_sfc } from "../server.mjs";
/* empty css                 */
/* empty css                     */
/* empty css                      */
/* empty css                  */
/* empty css                   */
/* empty css                  */
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, withKeys, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "lodash-unified";
import "@vueuse/core";
import "./raf-CQRaPAjg.js";
import "./strings-D1uxkXhq.js";
import "@vue/shared";
import "./event-BZTOGHfp.js";
import "./index-BrFCEoKQ.js";
import "./vnode-D0IHQw_9.js";
import "./constants-hAKFmBbq.js";
import "./use-form-common-props-DlCG9pC5.js";
import "async-validator";
import "./index-Dxw_X3Hq.js";
import "./index-ClPmkyX9.js";
import "./aria-B8G3G_75.js";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" }
      ]
    });
    const otpFormRef = ref();
    const otpForm = reactive({
      email: "",
      code: ""
    });
    const otpRules = reactive({
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
      ],
      code: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        { min: 6, max: 6, message: "验证码为6位数字", trigger: "blur" }
      ]
    });
    const handlePasswordLogin = async () => {
      const valid = await passwordFormRef.value?.validate().catch(() => false);
      if (!valid) return;
      loading.value = true;
      try {
        const result = await adminStore.login(passwordForm.email, passwordForm.password);
        if (!result.success) {
          ElMessage.error(result.error || "登录失败");
          return;
        }
        ElMessage.success(`欢迎回来，${adminStore.adminInfo?.name || "管理员"}`);
        await navigateTo("/_mgmt_9Xfa3");
      } catch (e) {
        ElMessage.error(e.message || "登录失败");
      } finally {
        loading.value = false;
      }
    };
    const handleSendCode = async () => {
      const emailValid = await otpFormRef.value?.validateField("email").catch(() => false);
      if (!emailValid) return;
      sendingCode.value = true;
      try {
        const result = await adminStore.sendOtp(otpForm.email);
        if (!result.success) {
          ElMessage.error(result.error || "发送验证码失败");
          return;
        }
        ElMessage.success("验证码已发送到您的邮箱");
        startCountdown();
      } catch (e) {
        ElMessage.error(e.message || "发送验证码失败");
      } finally {
        sendingCode.value = false;
      }
    };
    const handleOtpLogin = async () => {
      const valid = await otpFormRef.value?.validate().catch(() => false);
      if (!valid) return;
      loading.value = true;
      try {
        const result = await adminStore.loginWithOtp(otpForm.email, otpForm.code);
        if (!result.success) {
          ElMessage.error(result.error || "登录失败");
          return;
        }
        ElMessage.success(`欢迎回来，${adminStore.adminInfo?.name || "管理员"}`);
        await navigateTo("/_mgmt_9Xfa3");
      } catch (e) {
        ElMessage.error(e.message || "登录失败");
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
            _push2(`<div class="card-header" data-v-43229013${_scopeId}><span data-v-43229013${_scopeId}>后台管理系统登录</span></div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "后台管理系统登录")
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
                    label: "密码登录",
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
                                      placeholder: "邮箱",
                                      "prefix-icon": "Message",
                                      clearable: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: passwordForm.email,
                                        "onUpdate:modelValue": ($event) => passwordForm.email = $event,
                                        placeholder: "邮箱",
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
                                      placeholder: "密码",
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
                                        placeholder: "密码",
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
                                          _push7(` 登录 `);
                                        } else {
                                          return [
                                            createTextVNode(" 登录 ")
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
                                          createTextVNode(" 登录 ")
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
                                      placeholder: "邮箱",
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
                                      placeholder: "密码",
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
                                        createTextVNode(" 登录 ")
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
                                    placeholder: "邮箱",
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
                                    placeholder: "密码",
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
                                      createTextVNode(" 登录 ")
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
                    label: "验证码登录",
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
                                      placeholder: "邮箱",
                                      "prefix-icon": "Message",
                                      clearable: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: otpForm.email,
                                        "onUpdate:modelValue": ($event) => otpForm.email = $event,
                                        placeholder: "邮箱",
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
                                      placeholder: "验证码",
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
                                          _push7(`${ssrInterpolate(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码"), 1)
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
                                          placeholder: "验证码",
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
                                            createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码"), 1)
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
                                          _push7(` 登录 `);
                                        } else {
                                          return [
                                            createTextVNode(" 登录 ")
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
                                          createTextVNode(" 登录 ")
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
                                      placeholder: "邮箱",
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
                                        placeholder: "验证码",
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
                                          createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码"), 1)
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
                                        createTextVNode(" 登录 ")
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
                                    placeholder: "邮箱",
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
                                      placeholder: "验证码",
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
                                        createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码"), 1)
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
                                      createTextVNode(" 登录 ")
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
                      label: "密码登录",
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
                                  placeholder: "邮箱",
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
                                  placeholder: "密码",
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
                                    createTextVNode(" 登录 ")
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
                      label: "验证码登录",
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
                                  placeholder: "邮箱",
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
                                    placeholder: "验证码",
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
                                      createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码"), 1)
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
                                    createTextVNode(" 登录 ")
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
              title: "测试账号：admin@fantula.com / admin123456",
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
                    label: "密码登录",
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
                                placeholder: "邮箱",
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
                                placeholder: "密码",
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
                                  createTextVNode(" 登录 ")
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
                    label: "验证码登录",
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
                                placeholder: "邮箱",
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
                                  placeholder: "验证码",
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
                                    createTextVNode(toDisplayString(countdown.value > 0 ? formatCountdown(countdown.value) : "发送验证码"), 1)
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
                                  createTextVNode(" 登录 ")
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
                  title: "测试账号：admin@fantula.com / admin123456",
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
export {
  login as default
};
//# sourceMappingURL=login-Chne7RSo.js.map
