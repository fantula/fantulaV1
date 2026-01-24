import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElAvatar } from './index-C2DKVZ9g.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { a as ElTable, E as ElTableColumn } from './index-BB44-vTK.mjs';
import { _ as _export_sfc, J as close_default, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, withKeys, createBlock, createCommentVNode, TransitionGroup, openBlock, Fragment, renderList, withDirectives, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { g as adminUserApi, h as adminMessageApi } from './admin-supabase-nszo-IoU.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@vueuse/core';
import 'lodash-unified';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import '@vue/shared';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
import './index-7IYgoTSU.mjs';
import '@ctrl/tinycolor';
import './index-CIoWkt90.mjs';
import '@popperjs/core';
import './focus-trap-D_6Xxduc.mjs';
import './vnode-D0IHQw_9.mjs';
import 'async-validator';
import './index-D_b573Qt.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './index-BlpH41lu.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
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
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';
import './index-Dg8Z-nTr.mjs';
import './validator-T0bsmJHo.mjs';
import './index-B-o0CD59.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
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
      title: [{ required: true, message: "\u8BF7\u8F93\u5165\u6D88\u606F\u6807\u9898", trigger: "blur" }],
      content: [{ required: true, message: "\u8BF7\u8F93\u5165\u6D88\u606F\u6B63\u6587", trigger: "blur" }]
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
        console.error("\u52A0\u8F7D\u6D88\u606F\u5931\u8D25:", e);
      } finally {
        loadingMessages.value = false;
      }
    };
    const addUser = async () => {
      const uid = uidInput.value.trim();
      if (!uid) return;
      if (uid.length !== 8) {
        ElMessage.warning("UID \u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u4E3A8\u4F4D\u6570\u5B57");
        return;
      }
      if (recipients.value.some((u) => u.uid === uid)) {
        ElMessage.warning("\u8BE5\u7528\u6237\u5DF2\u5728\u5217\u8868\u4E2D");
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
          ElMessage.success(`\u6DFB\u52A0\u7528\u6237 ${result.user.email} \u6210\u529F`);
          uidInput.value = "";
        } else {
          ElMessage.error("\u7528\u6237\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5UID");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u67E5\u8BE2\u7528\u6237\u5931\u8D25");
      } finally {
        validating.value = false;
      }
    };
    const removeUser = (uid) => {
      recipients.value = recipients.value.filter((u) => u.uid !== uid);
    };
    const handleSend = async () => {
      if (recipients.value.length === 0) {
        ElMessage.warning("\u8BF7\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u63A5\u6536\u7528\u6237");
        return;
      }
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        var _a;
        if (valid) {
          try {
            await ElMessageBox.confirm(
              `\u786E\u8BA4\u5411 ${recipients.value.length} \u4F4D\u7528\u6237\u53D1\u9001\u6D88\u606F\u5417\uFF1F
\u53D1\u9001\u540E\u4E0D\u53EF\u64A4\u56DE\u3002`,
              "\u53D1\u9001\u786E\u8BA4",
              {
                confirmButtonText: "\u786E\u8BA4\u53D1\u9001",
                cancelButtonText: "\u53D6\u6D88",
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
                console.error(`\u53D1\u9001\u7ED9 ${user.uid} \u5931\u8D25:`, result.error);
              }
            }
            if (successCount > 0) {
              ElMessage.success(`\u6210\u529F\u53D1\u9001 ${successCount} \u6761\u6D88\u606F${failCount > 0 ? `\uFF0C\u5931\u8D25 ${failCount} \u6761` : ""}`);
            } else {
              ElMessage.error("\u6D88\u606F\u53D1\u9001\u5931\u8D25");
            }
            recipients.value = [];
            form.type = "system";
            form.title = "";
            form.content = "";
            form.link = "";
            (_a = formRef.value) == null ? void 0 : _a.resetFields();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "message-page" }, _attrs))} data-v-71f69cc6><div class="page-header" data-v-71f69cc6><h2 data-v-71f69cc6>\u6D88\u606F\u53D1\u9001\u7BA1\u7406</h2></div><div class="content-layout" data-v-71f69cc6>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "recipient-card"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-71f69cc6${_scopeId}><span data-v-71f69cc6${_scopeId}>\u63A5\u6536\u7528\u6237</span>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: "info",
              round: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(recipients.value.length)} \u4EBA`);
                } else {
                  return [
                    createTextVNode(toDisplayString(recipients.value.length) + " \u4EBA", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u63A5\u6536\u7528\u6237"),
                createVNode(_component_el_tag, {
                  type: "info",
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(recipients.value.length) + " \u4EBA", 1)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="recipient-input-area" data-v-71f69cc6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: uidInput.value,
              "onUpdate:modelValue": ($event) => uidInput.value = $event,
              placeholder: "\u8BF7\u8F93\u51658\u4F4D\u7528\u6237UID",
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
                        _push4(`\u6DFB\u52A0`);
                      } else {
                        return [
                          createTextVNode("\u6DFB\u52A0")
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
                        createTextVNode("\u6DFB\u52A0")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="input-tip" data-v-71f69cc6${_scopeId}>\u8BF7\u8F93\u5165\u7CBE\u51C6UID\uFF0C\u7CFB\u7EDF\u5C06\u81EA\u52A8\u6821\u9A8C\u7528\u6237\u662F\u5426\u5B58\u5728\u3002</div></div>`);
            _push2(ssrRenderComponent(_component_el_divider, { "content-position": "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5DF2\u6DFB\u52A0\u7528\u6237\u5217\u8868`);
                } else {
                  return [
                    createTextVNode("\u5DF2\u6DFB\u52A0\u7528\u6237\u5217\u8868")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="recipient-list" data-v-71f69cc6${_scopeId}><!--[-->`);
            ssrRenderList(recipients.value, (user) => {
              _push2(`<div class="recipient-item" data-v-71f69cc6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_avatar, {
                size: 32,
                src: user.avatar
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`${ssrInterpolate((_a = user.email) == null ? void 0 : _a.charAt(0).toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString((_b = user.email) == null ? void 0 : _b.charAt(0).toUpperCase()), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="recipient-info" data-v-71f69cc6${_scopeId}><div class="recipient-name" data-v-71f69cc6${_scopeId}>${ssrInterpolate(user.email || "\u7528\u6237")}</div><div class="recipient-uid" data-v-71f69cc6${_scopeId}>UID: ${ssrInterpolate(user.uid)}</div></div>`);
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
              _push2(`<div class="empty-list" data-v-71f69cc6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "\u6682\u65E0\u63A5\u6536\u5BF9\u8C61",
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
                  placeholder: "\u8BF7\u8F93\u51658\u4F4D\u7528\u6237UID",
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
                        createTextVNode("\u6DFB\u52A0")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "input-tip" }, "\u8BF7\u8F93\u5165\u7CBE\u51C6UID\uFF0C\u7CFB\u7EDF\u5C06\u81EA\u52A8\u6821\u9A8C\u7528\u6237\u662F\u5426\u5B58\u5728\u3002")
              ]),
              createVNode(_component_el_divider, { "content-position": "center" }, {
                default: withCtx(() => [
                  createTextVNode("\u5DF2\u6DFB\u52A0\u7528\u6237\u5217\u8868")
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
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = user.email) == null ? void 0 : _a.charAt(0).toUpperCase()), 1)
                            ];
                          }),
                          _: 2
                        }, 1032, ["src"]),
                        createVNode("div", { class: "recipient-info" }, [
                          createVNode("div", { class: "recipient-name" }, toDisplayString(user.email || "\u7528\u6237"), 1),
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
                    description: "\u6682\u65E0\u63A5\u6536\u5BF9\u8C61",
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
            _push2(`<div class="card-header" data-v-71f69cc6${_scopeId}><span data-v-71f69cc6${_scopeId}>\u6D88\u606F\u5185\u5BB9</span></div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u6D88\u606F\u5185\u5BB9")
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
                    label: "\u6D88\u606F\u7C7B\u578B",
                    prop: "type"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: form.type,
                          "onUpdate:modelValue": ($event) => form.type = $event,
                          placeholder: "\u9009\u62E9\u6D88\u606F\u7C7B\u578B",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "\u{1F4E2} \u7CFB\u7EDF\u901A\u77E5",
                                value: "system"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "\u{1F4E6} \u8BA2\u5355\u6D88\u606F",
                                value: "order"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "\u{1F389} \u6D3B\u52A8\u63A8\u5E7F",
                                value: "activity"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "\u{1F512} \u5B89\u5168\u63D0\u9192",
                                value: "security"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_option, {
                                  label: "\u{1F4E2} \u7CFB\u7EDF\u901A\u77E5",
                                  value: "system"
                                }),
                                createVNode(_component_el_option, {
                                  label: "\u{1F4E6} \u8BA2\u5355\u6D88\u606F",
                                  value: "order"
                                }),
                                createVNode(_component_el_option, {
                                  label: "\u{1F389} \u6D3B\u52A8\u63A8\u5E7F",
                                  value: "activity"
                                }),
                                createVNode(_component_el_option, {
                                  label: "\u{1F512} \u5B89\u5168\u63D0\u9192",
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
                            placeholder: "\u9009\u62E9\u6D88\u606F\u7C7B\u578B",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "\u{1F4E2} \u7CFB\u7EDF\u901A\u77E5",
                                value: "system"
                              }),
                              createVNode(_component_el_option, {
                                label: "\u{1F4E6} \u8BA2\u5355\u6D88\u606F",
                                value: "order"
                              }),
                              createVNode(_component_el_option, {
                                label: "\u{1F389} \u6D3B\u52A8\u63A8\u5E7F",
                                value: "activity"
                              }),
                              createVNode(_component_el_option, {
                                label: "\u{1F512} \u5B89\u5168\u63D0\u9192",
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
                    label: "\u6D88\u606F\u6807\u9898",
                    prop: "title"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.title,
                          "onUpdate:modelValue": ($event) => form.title = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6807\u9898"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.title,
                            "onUpdate:modelValue": ($event) => form.title = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6807\u9898"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u6D88\u606F\u6B63\u6587",
                    prop: "content"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.content,
                          "onUpdate:modelValue": ($event) => form.content = $event,
                          type: "textarea",
                          rows: 8,
                          placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6B63\u6587\u5185\u5BB9...",
                          resize: "none"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.content,
                            "onUpdate:modelValue": ($event) => form.content = $event,
                            type: "textarea",
                            rows: 8,
                            placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6B63\u6587\u5185\u5BB9...",
                            resize: "none"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u8DF3\u8F6C\u94FE\u63A5",
                    prop: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.link,
                          "onUpdate:modelValue": ($event) => form.link = $event,
                          placeholder: "\u53EF\u9009\uFF0C\u5982 /profile/orders \u8BA9\u7528\u6237\u70B9\u51FB\u8DF3\u8F6C"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="input-tip" data-v-71f69cc6${_scopeId3}>\u7528\u6237\u70B9\u51FB\u6D88\u606F\u65F6\u5C06\u8DF3\u8F6C\u5230\u6B64\u8DEF\u5F84\u3002\u7559\u7A7A\u5219\u65E0\u8DF3\u8F6C\u3002</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.link,
                            "onUpdate:modelValue": ($event) => form.link = $event,
                            placeholder: "\u53EF\u9009\uFF0C\u5982 /profile/orders \u8BA9\u7528\u6237\u70B9\u51FB\u8DF3\u8F6C"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "input-tip" }, "\u7528\u6237\u70B9\u51FB\u6D88\u606F\u65F6\u5C06\u8DF3\u8F6C\u5230\u6B64\u8DEF\u5F84\u3002\u7559\u7A7A\u5219\u65E0\u8DF3\u8F6C\u3002")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_alert, {
                          title: "\u53D1\u9001\u540E\u5C06\u751F\u6210\u7AD9\u5185\u4FE1\uFF0C\u4E0D\u53EF\u64A4\u56DE\u3002",
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
                              _push5(` \u786E\u8BA4\u53D1\u9001\u6D88\u606F `);
                            } else {
                              return [
                                createTextVNode(" \u786E\u8BA4\u53D1\u9001\u6D88\u606F ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_alert, {
                            title: "\u53D1\u9001\u540E\u5C06\u751F\u6210\u7AD9\u5185\u4FE1\uFF0C\u4E0D\u53EF\u64A4\u56DE\u3002",
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
                              createTextVNode(" \u786E\u8BA4\u53D1\u9001\u6D88\u606F ")
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
                      label: "\u6D88\u606F\u7C7B\u578B",
                      prop: "type"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: form.type,
                          "onUpdate:modelValue": ($event) => form.type = $event,
                          placeholder: "\u9009\u62E9\u6D88\u606F\u7C7B\u578B",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "\u{1F4E2} \u7CFB\u7EDF\u901A\u77E5",
                              value: "system"
                            }),
                            createVNode(_component_el_option, {
                              label: "\u{1F4E6} \u8BA2\u5355\u6D88\u606F",
                              value: "order"
                            }),
                            createVNode(_component_el_option, {
                              label: "\u{1F389} \u6D3B\u52A8\u63A8\u5E7F",
                              value: "activity"
                            }),
                            createVNode(_component_el_option, {
                              label: "\u{1F512} \u5B89\u5168\u63D0\u9192",
                              value: "security"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u6D88\u606F\u6807\u9898",
                      prop: "title"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.title,
                          "onUpdate:modelValue": ($event) => form.title = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6807\u9898"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u6D88\u606F\u6B63\u6587",
                      prop: "content"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.content,
                          "onUpdate:modelValue": ($event) => form.content = $event,
                          type: "textarea",
                          rows: 8,
                          placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6B63\u6587\u5185\u5BB9...",
                          resize: "none"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u8DF3\u8F6C\u94FE\u63A5",
                      prop: "link"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.link,
                          "onUpdate:modelValue": ($event) => form.link = $event,
                          placeholder: "\u53EF\u9009\uFF0C\u5982 /profile/orders \u8BA9\u7528\u6237\u70B9\u51FB\u8DF3\u8F6C"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "input-tip" }, "\u7528\u6237\u70B9\u51FB\u6D88\u606F\u65F6\u5C06\u8DF3\u8F6C\u5230\u6B64\u8DEF\u5F84\u3002\u7559\u7A7A\u5219\u65E0\u8DF3\u8F6C\u3002")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_alert, {
                          title: "\u53D1\u9001\u540E\u5C06\u751F\u6210\u7AD9\u5185\u4FE1\uFF0C\u4E0D\u53EF\u64A4\u56DE\u3002",
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
                            createTextVNode(" \u786E\u8BA4\u53D1\u9001\u6D88\u606F ")
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
                    label: "\u6D88\u606F\u7C7B\u578B",
                    prop: "type"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.type,
                        "onUpdate:modelValue": ($event) => form.type = $event,
                        placeholder: "\u9009\u62E9\u6D88\u606F\u7C7B\u578B",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_option, {
                            label: "\u{1F4E2} \u7CFB\u7EDF\u901A\u77E5",
                            value: "system"
                          }),
                          createVNode(_component_el_option, {
                            label: "\u{1F4E6} \u8BA2\u5355\u6D88\u606F",
                            value: "order"
                          }),
                          createVNode(_component_el_option, {
                            label: "\u{1F389} \u6D3B\u52A8\u63A8\u5E7F",
                            value: "activity"
                          }),
                          createVNode(_component_el_option, {
                            label: "\u{1F512} \u5B89\u5168\u63D0\u9192",
                            value: "security"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u6D88\u606F\u6807\u9898",
                    prop: "title"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.title,
                        "onUpdate:modelValue": ($event) => form.title = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6807\u9898"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u6D88\u606F\u6B63\u6587",
                    prop: "content"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.content,
                        "onUpdate:modelValue": ($event) => form.content = $event,
                        type: "textarea",
                        rows: 8,
                        placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u6B63\u6587\u5185\u5BB9...",
                        resize: "none"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u8DF3\u8F6C\u94FE\u63A5",
                    prop: "link"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.link,
                        "onUpdate:modelValue": ($event) => form.link = $event,
                        placeholder: "\u53EF\u9009\uFF0C\u5982 /profile/orders \u8BA9\u7528\u6237\u70B9\u51FB\u8DF3\u8F6C"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "input-tip" }, "\u7528\u6237\u70B9\u51FB\u6D88\u606F\u65F6\u5C06\u8DF3\u8F6C\u5230\u6B64\u8DEF\u5F84\u3002\u7559\u7A7A\u5219\u65E0\u8DF3\u8F6C\u3002")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_alert, {
                        title: "\u53D1\u9001\u540E\u5C06\u751F\u6210\u7AD9\u5185\u4FE1\uFF0C\u4E0D\u53EF\u64A4\u56DE\u3002",
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
                          createTextVNode(" \u786E\u8BA4\u53D1\u9001\u6D88\u606F ")
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
            _push2(`<div class="card-header" data-v-71f69cc6${_scopeId}><span data-v-71f69cc6${_scopeId}>\u6700\u8FD1\u53D1\u9001\u8BB0\u5F55</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              text: "",
              onClick: loadMessages
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u6700\u8FD1\u53D1\u9001\u8BB0\u5F55"),
                createVNode(_component_el_button, {
                  text: "",
                  onClick: loadMessages
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u5237\u65B0")
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
                    label: "\u7528\u6237UID",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "title",
                    label: "\u6807\u9898",
                    "min-width": "200"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "content",
                    label: "\u5185\u5BB9",
                    "min-width": "300",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u5DF2\u8BFB",
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
                              _push5(`${ssrInterpolate(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB"), 1)
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
                              createTextVNode(toDisplayString(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u53D1\u9001\u65F6\u95F4",
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
                      label: "\u7528\u6237UID",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "title",
                      label: "\u6807\u9898",
                      "min-width": "200"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "content",
                      label: "\u5185\u5BB9",
                      "min-width": "300",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5DF2\u8BFB",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.is_read ? "success" : "info",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u53D1\u9001\u65F6\u95F4",
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
                    label: "\u7528\u6237UID",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "title",
                    label: "\u6807\u9898",
                    "min-width": "200"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "content",
                    label: "\u5185\u5BB9",
                    "min-width": "300",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u5DF2\u8BFB",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.is_read ? "success" : "info",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u53D1\u9001\u65F6\u95F4",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/messages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71f69cc6"]]);

export { index as default };
//# sourceMappingURL=index-DiwTpCi7.mjs.map
