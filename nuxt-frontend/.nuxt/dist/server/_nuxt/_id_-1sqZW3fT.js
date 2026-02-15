import { E as ElSkeleton } from "./index-CjBk2Z9n.js";
import { E as ElPageHeader } from "./index-CPbCmBxW.js";
import { E as ElCard } from "./index-Cx5gKxG7.js";
import { E as ElSwitch } from "./index-_EDdYz_8.js";
import { E as ElForm, a as ElFormItem } from "./index-C-iEkQSR.js";
import { E as ElInput } from "./index-CYgslNeO.js";
import { E as ElButton } from "./index-BOdp6qaH.js";
import { a as ElTable, E as ElTableColumn } from "./index-BXxUPXtj.js";
import { E as ElEmpty } from "./index-bbvp9z3V.js";
/* empty css              */
/* empty css                     */
/* empty css                          */
/* empty css                    */
/* empty css                 */
/* empty css                   */
/* empty css                 */
/* empty css                      */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                  */
/* empty css                    */
import { defineComponent, withAsyncContext, computed, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { c as useRoute, f as useRouter, _ as _export_sfc } from "../server.mjs";
import { u as useFetch } from "./fetch-Dk_hX_ae.js";
import { E as ElMessage } from "./index-CQnGB6WT.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./index-CbQ9NNm4.js";
import "./icon-D-Vgi0cb.js";
import "./index-C4aUwruK.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./index-CMbz_fag.js";
import "./index-C1njJNPQ.js";
import "./use-global-config-CaR6i8cb.js";
import "./validator-BiwSbFK3.js";
import "./index-DqrhOzxH.js";
import "./event-BZTOGHfp.js";
import "./use-form-item-BJm4fR6K.js";
import "./constants-hAKFmBbq.js";
import "async-validator";
import "./typescript-D6L75muK.js";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "@ctrl/tinycolor";
import "./index-CKAw5W0O.js";
import "./index-CLY1HctY.js";
import "@popperjs/core";
import "./index-DHEUW9kI.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-DWB_V3f7.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const templateId = route.params.id;
    const { data: res, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/system/notifications/templates",
      "$C1DTIg0j8W"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const template = computed(() => {
      if (!res.value?.data) return null;
      return res.value.data.find((t) => t.id === templateId);
    });
    const form = ref({
      subject_template: "",
      body_template: "",
      is_enabled: true
    });
    watch(template, (newVal) => {
      if (newVal) {
        form.value = {
          subject_template: newVal.subject_template,
          body_template: newVal.body_template,
          is_enabled: newVal.is_enabled
        };
      }
    }, { immediate: true });
    const saving = ref(false);
    const handleSave = async () => {
      if (!template.value) return;
      saving.value = true;
      try {
        const { error } = await useFetch(
          "/api/admin/system/notifications/templates",
          {
            method: "POST",
            body: {
              id: template.value.id,
              event_type: template.value.event_type,
              ...form.value
            }
          },
          "$dyjpCzN47g"
          /* nuxt-injected */
        );
        if (error.value) {
          ElMessage.error(error.value.statusMessage || "保存失败");
        } else {
          ElMessage.success("保存成功");
          refresh();
        }
      } catch (e) {
        ElMessage.error("保存失败");
      } finally {
        saving.value = false;
      }
    };
    const testEmail = ref("");
    const testDataJson = ref("");
    const sendingTest = ref(false);
    const handleSendTest = async () => {
      if (!testEmail.value) {
        ElMessage.warning("请输入收件人邮箱");
        return;
      }
      if (!template.value) return;
      let testData = {};
      try {
        if (testDataJson.value) {
          testData = JSON.parse(testDataJson.value);
        } else {
          template.value.variables?.forEach((v) => {
            testData[v.key] = `[TEST_${v.key.toUpperCase()}]`;
          });
        }
      } catch (e) {
        ElMessage.error("测试数据 JSON 格式错误");
        return;
      }
      sendingTest.value = true;
      try {
        const { error } = await useFetch(
          "/api/admin/system/notifications/test",
          {
            method: "POST",
            body: {
              event_type: template.value.event_type,
              to: testEmail.value,
              data: testData
            }
          },
          "$1wBfcVaRzl"
          /* nuxt-injected */
        );
        if (error.value) {
          ElMessage.error(error.value.statusMessage || "发送失败");
        } else {
          ElMessage.success("测试邮件已发送");
        }
      } catch (e) {
        ElMessage.error("发送失败");
      } finally {
        sendingTest.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_page_header = ElPageHeader;
      const _component_el_card = ElCard;
      const _component_el_switch = ElSwitch;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_empty = ElEmpty;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "template-edit-page" }, _attrs))} data-v-03c492e9>`);
      if (unref(pending)) {
        _push(`<div class="loading-state" data-v-03c492e9>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          rows: 5,
          animated: ""
        }, null, _parent));
        _push(`</div>`);
      } else if (template.value) {
        _push(`<!--[--><div class="page-header" data-v-03c492e9>`);
        _push(ssrRenderComponent(_component_el_page_header, {
          onBack: ($event) => unref(router).back()
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-large font-600 mr-3" data-v-03c492e9${_scopeId}>编辑模板: ${ssrInterpolate(template.value.name)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-large font-600 mr-3" }, "编辑模板: " + toDisplayString(template.value.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="content-grid" data-v-03c492e9><div class="edit-section" data-v-03c492e9>`);
        _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-03c492e9${_scopeId}><span data-v-03c492e9${_scopeId}>模板内容</span>`);
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: form.value.is_enabled,
                "onUpdate:modelValue": ($event) => form.value.is_enabled = $event,
                "active-text": "启用",
                "inactive-text": "禁用"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("span", null, "模板内容"),
                  createVNode(_component_el_switch, {
                    modelValue: form.value.is_enabled,
                    "onUpdate:modelValue": ($event) => form.value.is_enabled = $event,
                    "active-text": "启用",
                    "inactive-text": "禁用"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "邮件标题" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: form.value.subject_template,
                            "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                            placeholder: "请输入邮件标题"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="form-tip" data-v-03c492e9${_scopeId3}>支持使用变量，如 ${ssrInterpolate("{{")}order_no${ssrInterpolate("}}")}</div>`);
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: form.value.subject_template,
                              "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                              placeholder: "请输入邮件标题"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("div", { class: "form-tip" }, "支持使用变量，如 " + toDisplayString("{{") + "order_no" + toDisplayString("}}"))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "邮件内容 (HTML)" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: form.value.body_template,
                            "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                            type: "textarea",
                            rows: 15,
                            placeholder: "请输入邮件内容（支持 HTML）"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: form.value.body_template,
                              "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                              type: "textarea",
                              rows: 15,
                              placeholder: "请输入邮件内容（支持 HTML）"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            onClick: handleSave
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`保存修改`);
                              } else {
                                return [
                                  createTextVNode("保存修改")
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
                              onClick: handleSave
                            }, {
                              default: withCtx(() => [
                                createTextVNode("保存修改")
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
                      createVNode(_component_el_form_item, { label: "邮件标题" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.value.subject_template,
                            "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                            placeholder: "请输入邮件标题"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "支持使用变量，如 " + toDisplayString("{{") + "order_no" + toDisplayString("}}"))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "邮件内容 (HTML)" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.value.body_template,
                            "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                            type: "textarea",
                            rows: 15,
                            placeholder: "请输入邮件内容（支持 HTML）"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            type: "primary",
                            loading: saving.value,
                            onClick: handleSave
                          }, {
                            default: withCtx(() => [
                              createTextVNode("保存修改")
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
                createVNode(_component_el_form, { "label-position": "top" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_form_item, { label: "邮件标题" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.subject_template,
                          "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                          placeholder: "请输入邮件标题"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "支持使用变量，如 " + toDisplayString("{{") + "order_no" + toDisplayString("}}"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "邮件内容 (HTML)" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.body_template,
                          "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                          type: "textarea",
                          rows: 15,
                          placeholder: "请输入邮件内容（支持 HTML）"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          loading: saving.value,
                          onClick: handleSave
                        }, {
                          default: withCtx(() => [
                            createTextVNode("保存修改")
                          ]),
                          _: 1
                        }, 8, ["loading"])
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
        }, _parent));
        _push(`</div><div class="side-section" data-v-03c492e9>`);
        _push(ssrRenderComponent(_component_el_card, {
          shadow: "never",
          class: "mb-4"
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-03c492e9${_scopeId}><span data-v-03c492e9${_scopeId}>可用变量</span></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("span", null, "可用变量")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_table, {
                data: template.value.variables || [],
                size: "small",
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      prop: "key",
                      label: "变量名",
                      width: "100"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<code data-v-03c492e9${_scopeId3}>${ssrInterpolate(row.key)}</code>`);
                        } else {
                          return [
                            createVNode("code", null, toDisplayString(row.key), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      prop: "desc",
                      label: "描述"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_table_column, {
                        prop: "key",
                        label: "变量名",
                        width: "100"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("code", null, toDisplayString(row.key), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        prop: "desc",
                        label: "描述"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_table, {
                  data: template.value.variables || [],
                  size: "small",
                  border: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      prop: "key",
                      label: "变量名",
                      width: "100"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("code", null, toDisplayString(row.key), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "desc",
                      label: "描述"
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-03c492e9${_scopeId}><span data-v-03c492e9${_scopeId}>发送测试邮件</span></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("span", null, "发送测试邮件")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "收件人邮箱" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: testEmail.value,
                            "onUpdate:modelValue": ($event) => testEmail.value = $event,
                            placeholder: "name@example.com"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: testEmail.value,
                              "onUpdate:modelValue": ($event) => testEmail.value = $event,
                              placeholder: "name@example.com"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (template.value.variables && template.value.variables.length > 0) {
                      _push3(`<div class="mb-4" data-v-03c492e9${_scopeId2}><div class="text-sm text-gray-500 mb-2" data-v-03c492e9${_scopeId2}>测试数据 (可选 JSON)</div>`);
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: testDataJson.value,
                        "onUpdate:modelValue": ($event) => testDataJson.value = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: '{"order_no": "TEST001"}'
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_el_button, {
                      block: "",
                      onClick: handleSendTest,
                      loading: sendingTest.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`发送测试`);
                        } else {
                          return [
                            createTextVNode("发送测试")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_form_item, { label: "收件人邮箱" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: testEmail.value,
                            "onUpdate:modelValue": ($event) => testEmail.value = $event,
                            placeholder: "name@example.com"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      template.value.variables && template.value.variables.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-4"
                      }, [
                        createVNode("div", { class: "text-sm text-gray-500 mb-2" }, "测试数据 (可选 JSON)"),
                        createVNode(_component_el_input, {
                          modelValue: testDataJson.value,
                          "onUpdate:modelValue": ($event) => testDataJson.value = $event,
                          type: "textarea",
                          rows: 3,
                          placeholder: '{"order_no": "TEST001"}'
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true),
                      createVNode(_component_el_button, {
                        block: "",
                        onClick: handleSendTest,
                        loading: sendingTest.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("发送测试")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_form, { "label-position": "top" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_form_item, { label: "收件人邮箱" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: testEmail.value,
                          "onUpdate:modelValue": ($event) => testEmail.value = $event,
                          placeholder: "name@example.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    template.value.variables && template.value.variables.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4"
                    }, [
                      createVNode("div", { class: "text-sm text-gray-500 mb-2" }, "测试数据 (可选 JSON)"),
                      createVNode(_component_el_input, {
                        modelValue: testDataJson.value,
                        "onUpdate:modelValue": ($event) => testDataJson.value = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: '{"order_no": "TEST001"}'
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])) : createCommentVNode("", true),
                    createVNode(_component_el_button, {
                      block: "",
                      onClick: handleSendTest,
                      loading: sendingTest.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode("发送测试")
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
        }, _parent));
        _push(`</div></div><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_el_empty, { description: "模板不存在" }, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/backend-settings/notification/template/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03c492e9"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-1sqZW3fT.js.map
