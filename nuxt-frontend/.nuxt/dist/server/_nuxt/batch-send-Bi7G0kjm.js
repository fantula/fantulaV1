import { E as ElCard } from "./index-DIUT_jMU.js";
import { E as ElTag } from "./index-CAqDGa72.js";
import { E as ElInput } from "./index-DfZ5KWBt.js";
import { E as ElButton } from "./index-Cfk6gFRD.js";
import { E as ElDivider } from "./index-sO8Yjc2X.js";
import { E as ElAvatar } from "./index-DcKx3ntK.js";
import { E as ElEmpty } from "./index-DHhizeNf.js";
import { E as ElForm, a as ElFormItem } from "./index-BHYewqHp.js";
import { E as ElSelect, a as ElOption } from "./index-CHDWEhch.js";
import { E as ElAlert } from "./index-CHfwRf2j.js";
import { a as ElTable, E as ElTableColumn } from "./index-CppwRAFr.js";
import { v as vLoading } from "./directive-BBpaOxz2.js";
/* empty css              */
/* empty css                 */
/* empty css                */
/* empty css                  */
/* empty css                   */
/* empty css                    */
/* empty css                   */
/* empty css                  */
/* empty css                 */
/* empty css                      */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                    */
/* empty css                        */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, withKeys, TransitionGroup, openBlock, createBlock, Fragment, renderList, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { b as close_default } from "./index-DlETah8a.js";
import { e as adminMessageApi, f as adminUserApi } from "./index-CUCx8vYk.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-DSo6N35Z.js";
import { E as ElMessageBox } from "./index-C_BEi-G8.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-79yNXOXL.js";
import "./index-K5TIzHX_.js";
import "./objects-Bz74KHmq.js";
import "./index-jl2vZbkg.js";
import "@vueuse/core";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "./typescript-D6L75muK.js";
import "./icon-CK7WLSPl.js";
import "./event-BZTOGHfp.js";
import "./index-DqrhOzxH.js";
import "./event-D3FEo2C5.js";
import "./index-Cy25Tved.js";
import "./aria-Rs9hkxop.js";
import "@ctrl/tinycolor";
import "./index-BgvvVJ20.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./vnode-BKSxKQVt.js";
import "async-validator";
import "./index-CmHlMPx0.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BuMAfCNC.js";
import "./raf-CQRaPAjg.js";
import "./index-D4pu9U8U.js";
import "normalize-wheel-es";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./cdk-BcOf0oEp.js";
import "./coupon-DnjcrSN8.js";
import "./media-DksayCA2.js";
import "./order-BDjtswS6.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "./index-CuQ4LNHg.js";
import "./validator-BaQl3RdN.js";
import "./index-7KygWwCI.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "batch-send",
  __ssrInlineRender: true,
  setup(__props) {
    const uidInput = ref("");
    const validating = ref(false);
    const sending = ref(false);
    const loadingMessages = ref(false);
    const recipients = ref([]);
    const messageList = ref([]);
    const formRef = ref();
    const form = reactive({
      type: "system",
      title: "",
      content: "",
      link: ""
    });
    const rules = reactive({
      title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
      content: [{ required: true, message: "请输入消息正文", trigger: "blur" }]
    });
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleString("zh-CN");
    };
    const loadMessages = async () => {
      loadingMessages.value = true;
      try {
        const result = await adminMessageApi.getMessages({ limit: 20 });
        if (result.success) {
          messageList.value = result.messages;
        }
      } catch (e) {
        console.error("加载消息失败:", e);
      } finally {
        loadingMessages.value = false;
      }
    };
    const addUser = async () => {
      const uid = uidInput.value.trim();
      if (!uid) return;
      if (uid.length !== 8) {
        ElMessage.warning("UID 格式错误，应为8位数字");
        return;
      }
      if (recipients.value.some((u) => u.uid === uid)) {
        ElMessage.warning("该用户已在列表中");
        uidInput.value = "";
        return;
      }
      validating.value = true;
      try {
        const result = await adminUserApi.getUserByUid(uid);
        if (result.success && result.user) {
          recipients.value.unshift({
            uid: result.user.uid,
            email: result.user.email
          });
          ElMessage.success(`添加用户 ${result.user.email} 成功`);
          uidInput.value = "";
        } else {
          ElMessage.error("用户不存在，请检查UID");
        }
      } catch (e) {
        ElMessage.error(e.message || "查询用户失败");
      } finally {
        validating.value = false;
      }
    };
    const removeUser = (uid) => {
      recipients.value = recipients.value.filter((u) => u.uid !== uid);
    };
    const handleSend = async () => {
      if (recipients.value.length === 0) {
        ElMessage.warning("请至少添加一个接收用户");
        return;
      }
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            await ElMessageBox.confirm(
              `确认向 ${recipients.value.length} 位用户发送消息吗？
发送后不可撤回。`,
              "发送确认",
              {
                confirmButtonText: "确认发送",
                cancelButtonText: "取消",
                type: "warning"
              }
            );
            sending.value = true;
            let successCount = 0;
            let failCount = 0;
            for (const user of recipients.value) {
              const result = await adminMessageApi.sendMessage(user.uid, form.title, form.content, form.type, form.link || void 0);
              if (result.success) {
                successCount++;
              } else {
                failCount++;
                console.error(`发送给 ${user.uid} 失败:`, result.error);
              }
            }
            if (successCount > 0) {
              ElMessage.success(`成功发送 ${successCount} 条消息${failCount > 0 ? `，失败 ${failCount} 条` : ""}`);
            } else {
              ElMessage.error("消息发送失败");
            }
            recipients.value = [];
            form.type = "system";
            form.title = "";
            form.content = "";
            form.link = "";
            formRef.value?.resetFields();
            await loadMessages();
          } catch (e) {
          } finally {
            sending.value = false;
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_tag = ElTag;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_divider = ElDivider;
      const _component_el_avatar = ElAvatar;
      const _component_el_empty = ElEmpty;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_alert = ElAlert;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "message-page" }, _attrs))} data-v-3d5e5fe0><div class="content-layout" data-v-3d5e5fe0>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "recipient-card"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-3d5e5fe0${_scopeId}><span data-v-3d5e5fe0${_scopeId}>接收用户</span>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: "info",
              round: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(recipients.value.length)} 人`);
                } else {
                  return [
                    createTextVNode(toDisplayString(recipients.value.length) + " 人", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "接收用户"),
                createVNode(_component_el_tag, {
                  type: "info",
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(recipients.value.length) + " 人", 1)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="recipient-input-area" data-v-3d5e5fe0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: uidInput.value,
              "onUpdate:modelValue": ($event) => uidInput.value = $event,
              placeholder: "请输入8位用户UID",
              maxlength: "8",
              clearable: "",
              onKeyup: addUser,
              style: { "margin-bottom": "10px" }
            }, {
              append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: addUser,
                    loading: validating.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`添加`);
                      } else {
                        return [
                          createTextVNode("添加")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      onClick: addUser,
                      loading: validating.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("添加")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="input-tip" data-v-3d5e5fe0${_scopeId}>请输入精准UID，系统将自动校验用户是否存在。</div></div>`);
            _push2(ssrRenderComponent(_component_el_divider, { "content-position": "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`已添加用户列表`);
                } else {
                  return [
                    createTextVNode("已添加用户列表")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="recipient-list" data-v-3d5e5fe0${_scopeId}><!--[-->`);
            ssrRenderList(recipients.value, (user) => {
              _push2(`<div class="recipient-item" data-v-3d5e5fe0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_avatar, {
                size: 32,
                src: user.avatar
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(user.email?.charAt(0).toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(user.email?.charAt(0).toUpperCase()), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="recipient-info" data-v-3d5e5fe0${_scopeId}><div class="recipient-name" data-v-3d5e5fe0${_scopeId}>${ssrInterpolate(user.email || "用户")}</div><div class="recipient-uid" data-v-3d5e5fe0${_scopeId}>UID: ${ssrInterpolate(user.uid)}</div></div>`);
              _push2(ssrRenderComponent(_component_el_button, {
                link: "",
                type: "danger",
                icon: unref(close_default),
                onClick: ($event) => removeUser(user.uid)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (recipients.value.length === 0) {
              _push2(`<div class="empty-list" data-v-3d5e5fe0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "暂无接收对象",
                "image-size": 60
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "recipient-input-area" }, [
                createVNode(_component_el_input, {
                  modelValue: uidInput.value,
                  "onUpdate:modelValue": ($event) => uidInput.value = $event,
                  placeholder: "请输入8位用户UID",
                  maxlength: "8",
                  clearable: "",
                  onKeyup: withKeys(addUser, ["enter"]),
                  style: { "margin-bottom": "10px" }
                }, {
                  append: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: addUser,
                      loading: validating.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("添加")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "input-tip" }, "请输入精准UID，系统将自动校验用户是否存在。")
              ]),
              createVNode(_component_el_divider, { "content-position": "center" }, {
                default: withCtx(() => [
                  createTextVNode("已添加用户列表")
                ]),
                _: 1
              }),
              createVNode("div", { class: "recipient-list" }, [
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(recipients.value, (user) => {
                      return openBlock(), createBlock("div", {
                        key: user.uid,
                        class: "recipient-item"
                      }, [
                        createVNode(_component_el_avatar, {
                          size: 32,
                          src: user.avatar
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(user.email?.charAt(0).toUpperCase()), 1)
                          ]),
                          _: 2
                        }, 1032, ["src"]),
                        createVNode("div", { class: "recipient-info" }, [
                          createVNode("div", { class: "recipient-name" }, toDisplayString(user.email || "用户"), 1),
                          createVNode("div", { class: "recipient-uid" }, "UID: " + toDisplayString(user.uid), 1)
                        ]),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger",
                          icon: unref(close_default),
                          onClick: ($event) => removeUser(user.uid)
                        }, null, 8, ["icon", "onClick"])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }),
                recipients.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "empty-list"
                }, [
                  createVNode(_component_el_empty, {
                    description: "暂无接收对象",
                    "image-size": 60
                  })
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "message-card"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-3d5e5fe0${_scopeId}><span data-v-3d5e5fe0${_scopeId}>消息内容</span></div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "消息内容")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              "label-position": "top",
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "消息类型",
                    prop: "type"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: form.type,
                          "onUpdate:modelValue": ($event) => form.type = $event,
                          placeholder: "选择消息类型",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "📢 系统通知",
                                value: "system"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "📦 订单消息",
                                value: "order"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "🎉 活动推广",
                                value: "activity"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "🔒 安全提醒",
                                value: "security"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_option, {
                                  label: "📢 系统通知",
                                  value: "system"
                                }),
                                createVNode(_component_el_option, {
                                  label: "📦 订单消息",
                                  value: "order"
                                }),
                                createVNode(_component_el_option, {
                                  label: "🎉 活动推广",
                                  value: "activity"
                                }),
                                createVNode(_component_el_option, {
                                  label: "🔒 安全提醒",
                                  value: "security"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: form.type,
                            "onUpdate:modelValue": ($event) => form.type = $event,
                            placeholder: "选择消息类型",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "📢 系统通知",
                                value: "system"
                              }),
                              createVNode(_component_el_option, {
                                label: "📦 订单消息",
                                value: "order"
                              }),
                              createVNode(_component_el_option, {
                                label: "🎉 活动推广",
                                value: "activity"
                              }),
                              createVNode(_component_el_option, {
                                label: "🔒 安全提醒",
                                value: "security"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "消息标题",
                    prop: "title"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.title,
                          "onUpdate:modelValue": ($event) => form.title = $event,
                          placeholder: "请输入消息标题"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.title,
                            "onUpdate:modelValue": ($event) => form.title = $event,
                            placeholder: "请输入消息标题"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "消息正文",
                    prop: "content"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.content,
                          "onUpdate:modelValue": ($event) => form.content = $event,
                          type: "textarea",
                          rows: 8,
                          placeholder: "请输入消息正文内容...",
                          resize: "none"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.content,
                            "onUpdate:modelValue": ($event) => form.content = $event,
                            type: "textarea",
                            rows: 8,
                            placeholder: "请输入消息正文内容...",
                            resize: "none"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "跳转链接",
                    prop: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.link,
                          "onUpdate:modelValue": ($event) => form.link = $event,
                          placeholder: "可选，如 /profile/orders 让用户点击跳转"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="input-tip" data-v-3d5e5fe0${_scopeId3}>用户点击消息时将跳转到此路径。留空则无跳转。</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.link,
                            "onUpdate:modelValue": ($event) => form.link = $event,
                            placeholder: "可选，如 /profile/orders 让用户点击跳转"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "input-tip" }, "用户点击消息时将跳转到此路径。留空则无跳转。")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_alert, {
                          title: "发送后将生成站内信，不可撤回。",
                          type: "warning",
                          "show-icon": "",
                          closable: false,
                          style: { "margin-bottom": "15px" }
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          size: "large",
                          onClick: handleSend,
                          loading: sending.value,
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 确认发送消息 `);
                            } else {
                              return [
                                createTextVNode(" 确认发送消息 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_alert, {
                            title: "发送后将生成站内信，不可撤回。",
                            type: "warning",
                            "show-icon": "",
                            closable: false,
                            style: { "margin-bottom": "15px" }
                          }),
                          createVNode(_component_el_button, {
                            type: "primary",
                            size: "large",
                            onClick: handleSend,
                            loading: sending.value,
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 确认发送消息 ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "消息类型",
                      prop: "type"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: form.type,
                          "onUpdate:modelValue": ($event) => form.type = $event,
                          placeholder: "选择消息类型",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "📢 系统通知",
                              value: "system"
                            }),
                            createVNode(_component_el_option, {
                              label: "📦 订单消息",
                              value: "order"
                            }),
                            createVNode(_component_el_option, {
                              label: "🎉 活动推广",
                              value: "activity"
                            }),
                            createVNode(_component_el_option, {
                              label: "🔒 安全提醒",
                              value: "security"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "消息标题",
                      prop: "title"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.title,
                          "onUpdate:modelValue": ($event) => form.title = $event,
                          placeholder: "请输入消息标题"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "消息正文",
                      prop: "content"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.content,
                          "onUpdate:modelValue": ($event) => form.content = $event,
                          type: "textarea",
                          rows: 8,
                          placeholder: "请输入消息正文内容...",
                          resize: "none"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "跳转链接",
                      prop: "link"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.link,
                          "onUpdate:modelValue": ($event) => form.link = $event,
                          placeholder: "可选，如 /profile/orders 让用户点击跳转"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "input-tip" }, "用户点击消息时将跳转到此路径。留空则无跳转。")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_alert, {
                          title: "发送后将生成站内信，不可撤回。",
                          type: "warning",
                          "show-icon": "",
                          closable: false,
                          style: { "margin-bottom": "15px" }
                        }),
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "large",
                          onClick: handleSend,
                          loading: sending.value,
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 确认发送消息 ")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                "label-position": "top",
                model: form,
                rules,
                ref_key: "formRef",
                ref: formRef
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "消息类型",
                    prop: "type"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.type,
                        "onUpdate:modelValue": ($event) => form.type = $event,
                        placeholder: "选择消息类型",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_option, {
                            label: "📢 系统通知",
                            value: "system"
                          }),
                          createVNode(_component_el_option, {
                            label: "📦 订单消息",
                            value: "order"
                          }),
                          createVNode(_component_el_option, {
                            label: "🎉 活动推广",
                            value: "activity"
                          }),
                          createVNode(_component_el_option, {
                            label: "🔒 安全提醒",
                            value: "security"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "消息标题",
                    prop: "title"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.title,
                        "onUpdate:modelValue": ($event) => form.title = $event,
                        placeholder: "请输入消息标题"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "消息正文",
                    prop: "content"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.content,
                        "onUpdate:modelValue": ($event) => form.content = $event,
                        type: "textarea",
                        rows: 8,
                        placeholder: "请输入消息正文内容...",
                        resize: "none"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "跳转链接",
                    prop: "link"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.link,
                        "onUpdate:modelValue": ($event) => form.link = $event,
                        placeholder: "可选，如 /profile/orders 让用户点击跳转"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "input-tip" }, "用户点击消息时将跳转到此路径。留空则无跳转。")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_alert, {
                        title: "发送后将生成站内信，不可撤回。",
                        type: "warning",
                        "show-icon": "",
                        closable: false,
                        style: { "margin-bottom": "15px" }
                      }),
                      createVNode(_component_el_button, {
                        type: "primary",
                        size: "large",
                        onClick: handleSend,
                        loading: sending.value,
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 确认发送消息 ")
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
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "history-card",
        style: { "margin-top": "24px" }
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-3d5e5fe0${_scopeId}><span data-v-3d5e5fe0${_scopeId}>最近发送记录</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              text: "",
              onClick: loadMessages
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`刷新`);
                } else {
                  return [
                    createTextVNode("刷新")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "最近发送记录"),
                createVNode(_component_el_button, {
                  text: "",
                  onClick: loadMessages
                }, {
                  default: withCtx(() => [
                    createTextVNode("刷新")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: messageList.value,
              style: { "width": "100%" }
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loadingMessages.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "user_uid",
                    label: "用户UID",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "title",
                    label: "标题",
                    "min-width": "200"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "content",
                    label: "内容",
                    "min-width": "300",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "已读",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: row.is_read ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.is_read ? "已读" : "未读")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.is_read ? "已读" : "未读"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: row.is_read ? "success" : "info",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.is_read ? "已读" : "未读"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "发送时间",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatDate(row.created_at))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "user_uid",
                      label: "用户UID",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "title",
                      label: "标题",
                      "min-width": "200"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "content",
                      label: "内容",
                      "min-width": "300",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "已读",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.is_read ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.is_read ? "已读" : "未读"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "发送时间",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: messageList.value,
                style: { "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "user_uid",
                    label: "用户UID",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "title",
                    label: "标题",
                    "min-width": "200"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "content",
                    label: "内容",
                    "min-width": "300",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "已读",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.is_read ? "success" : "info",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.is_read ? "已读" : "未读"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "发送时间",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, loadingMessages.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/messages/batch-send.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const batchSend = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d5e5fe0"]]);
export {
  batchSend as default
};
//# sourceMappingURL=batch-send-Bi7G0kjm.js.map
