import { E as ElCard } from './index-Cx5gKxG7.mjs';
import { E as ElTag } from './index-CsRbYYdv.mjs';
import { E as ElInput } from './index-CYgslNeO.mjs';
import { E as ElButton } from './index-BOdp6qaH.mjs';
import { E as ElDivider } from './index-CMbz_fag.mjs';
import { E as ElAvatar } from './index-B-YZCfIF.mjs';
import { E as ElEmpty } from './index-bbvp9z3V.mjs';
import { E as ElForm, a as ElFormItem } from './index-C-iEkQSR.mjs';
import { E as ElSelect, a as ElOption } from './index-BRGlGDSf.mjs';
import { E as ElAlert } from './index-CmBkkDXB.mjs';
import { E as ElTableColumn } from './index-BXxUPXtj.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, withKeys, TransitionGroup, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { b as close_default, U as refresh_default } from './index-CbQ9NNm4.mjs';
import { _ as _export_sfc } from './server.mjs';
import { a as adminUserApi } from './user-FETuJIoK.mjs';
import { a as adminMessageApi } from './message-CbmmzyV5.mjs';
import { P as PageTipHeader } from './PageTipHeader-BwP3Y8-M.mjs';
import { A as AdminDataTable } from './AdminDataTable-KtdApVAC.mjs';
import { u as useBizFormat } from './useBizFormat-DFfhmR3x.mjs';
import { E as ElMessage } from './index-CQnGB6WT.mjs';
import { E as ElMessageBox } from './index-TRxueLL5.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './use-global-config-CaR6i8cb.mjs';
import './index-C1njJNPQ.mjs';
import './objects-Bz74KHmq.mjs';
import './index-C4aUwruK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './use-form-item-BJm4fR6K.mjs';
import './constants-hAKFmBbq.mjs';
import './typescript-D6L75muK.mjs';
import './icon-D-Vgi0cb.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './event-D3FEo2C5.mjs';
import './index-DuyRWKSc.mjs';
import './aria-Rs9hkxop.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-CLY1HctY.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-DHEUW9kI.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './vnode-uc6o_sOa.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './index-CKAw5W0O.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-ozMyDWSO.mjs';
import './raf-CQRaPAjg.mjs';
import './index-C8YaaWrc.mjs';
import './index-DWB_V3f7.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './supabase-Ds8OQlZJ.mjs';
import './index-At2TMaBE.mjs';
import './directive-DYMvUrfr.mjs';
import './index-BxcbCFKt.mjs';
import './validator-BiwSbFK3.mjs';
import './index-COtmEGfB.mjs';

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
    const { formatDate } = useBizFormat();
    const rules = reactive({
      title: [{ required: true, message: "\u8BF7\u8F93\u5165\u6D88\u606F\u6807\u9898", trigger: "blur" }],
      content: [{ required: true, message: "\u8BF7\u8F93\u5165\u6D88\u606F\u6B63\u6587", trigger: "blur" }]
    });
    const loadMessages = async () => {
      loadingMessages.value = true;
      try {
        const result = await adminMessageApi.getMessages({ limit: 20 });
        if (result.success) {
          messageList.value = result.messages;
        }
      } catch (e) {
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
            email: result.user.email,
            avatar: result.user.avatar
            // Ensure avatar is passed if available
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
      const _component_el_table_column = ElTableColumn;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-03931d8d>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u6D88\u606F\u53D1\u9001",
        description: "\u6279\u91CF\u5411\u7528\u6237\u53D1\u9001\u7AD9\u5185\u4FE1\u901A\u77E5\uFF0C\u5E76\u67E5\u770B\u53D1\u9001\u8BB0\u5F55\u3002"
      }, null, _parent));
      _push(`<div class="content-layout" data-v-03931d8d>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "recipient-card"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-03931d8d${_scopeId}><span data-v-03931d8d${_scopeId}>\u63A5\u6536\u7528\u6237</span>`);
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
            _push2(`<div class="recipient-input-area" data-v-03931d8d${_scopeId}>`);
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
            _push2(`<div class="input-tip" data-v-03931d8d${_scopeId}>\u8BF7\u8F93\u5165\u7CBE\u51C6UID\uFF0C\u7CFB\u7EDF\u5C06\u81EA\u52A8\u6821\u9A8C\u7528\u6237\u662F\u5426\u5B58\u5728\u3002</div></div>`);
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
            _push2(`<div class="recipient-list" data-v-03931d8d${_scopeId}><!--[-->`);
            ssrRenderList(recipients.value, (user) => {
              _push2(`<div class="recipient-item" data-v-03931d8d${_scopeId}>`);
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
              _push2(`<div class="recipient-info" data-v-03931d8d${_scopeId}><div class="recipient-name" data-v-03931d8d${_scopeId}>${ssrInterpolate(user.email || "\u7528\u6237")}</div><div class="recipient-uid" data-v-03931d8d${_scopeId}>UID: ${ssrInterpolate(user.uid)}</div></div>`);
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
              _push2(`<div class="empty-list" data-v-03931d8d${_scopeId}>`);
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
            _push2(`<div class="card-header" data-v-03931d8d${_scopeId}><span data-v-03931d8d${_scopeId}>\u6D88\u606F\u5185\u5BB9</span></div>`);
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
                        _push4(`<div class="input-tip" data-v-03931d8d${_scopeId3}>\u7528\u6237\u70B9\u51FB\u6D88\u606F\u65F6\u5C06\u8DF3\u8F6C\u5230\u6B64\u8DEF\u5F84\u3002\u7559\u7A7A\u5219\u65E0\u8DF3\u8F6C\u3002</div>`);
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
      _push(`</div><div class="history-section mt-6" data-v-03931d8d><div class="section-title mb-4" data-v-03931d8d><span data-v-03931d8d>\u6700\u8FD1\u53D1\u9001\u8BB0\u5F55</span>`);
      _push(ssrRenderComponent(_component_el_button, {
        size: "small",
        icon: unref(refresh_default),
        circle: "",
        onClick: loadMessages
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminDataTable, {
        data: messageList.value,
        loading: loadingMessages.value,
        total: 0,
        "show-pagination": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "user_uid",
              label: "\u7528\u6237UID",
              width: "120"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "title",
              label: "\u6807\u9898",
              "min-width": "200"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "content",
              label: "\u5185\u5BB9",
              "min-width": "300",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5DF2\u8BFB",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: row.is_read ? "success" : "info",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.is_read ? "\u5DF2\u8BFB" : "\u672A\u8BFB"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u53D1\u9001\u65F6\u95F4",
              width: "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatDate)(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
                  createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/messages/batch-send.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const batchSend = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03931d8d"]]);

export { batchSend as default };
//# sourceMappingURL=batch-send-D3XnNkRT.mjs.map
