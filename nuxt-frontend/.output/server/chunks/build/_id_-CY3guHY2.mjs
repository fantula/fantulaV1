import { E as ElSkeleton } from './index-CC2EaJo5.mjs';
import { E as ElPageHeader } from './index-tG5JMyTd.mjs';
import { E as ElCard } from './index-D03GMqMv.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { E as ElForm, a as ElFormItem } from './index-Bd_1JmUc.mjs';
import { E as ElInput } from './index-DHiqjM1w.mjs';
import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { a as ElTable, E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElEmpty } from './index-B_8BWUnE.mjs';
import { defineComponent, withAsyncContext, computed, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, h as useRoute, u as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-x0v8Ka9T.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
import './index-DuV_oMrC.mjs';
import 'lodash-unified';
import '@vue/shared';
import './icon-CyvpkMdQ.mjs';
import './index-CsSUb8pm.mjs';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './index-BWwwK9Wh.mjs';
import './index-xMedQC9S.mjs';
import './use-global-config-Dt87SALX.mjs';
import './validator-B2QmXMzy.mjs';
import './index-C88l1uRA.mjs';
import './event-BZTOGHfp.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import 'async-validator';
import './typescript-D6L75muK.mjs';
import './event-D3FEo2C5.mjs';
import './index-Cy25Tved.mjs';
import './aria-Rs9hkxop.mjs';
import '@ctrl/tinycolor';
import './index-CVMnQJck.mjs';
import './index-B8mpCVSS.mjs';
import '@popperjs/core';
import './focus-trap.vue-CG7JU5b_.mjs';
import './index-7GSISQj3.mjs';
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
import './asyncData-BY91Pj36.mjs';
import 'perfect-debounce';

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
      "$OoTKmD-Tl9"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const template = computed(() => {
      var _a;
      if (!((_a = res.value) == null ? void 0 : _a.data)) return null;
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
          "$Ccai6W5vv4"
          /* nuxt-injected */
        );
        if (error.value) {
          ElMessage.error(error.value.statusMessage || "\u4FDD\u5B58\u5931\u8D25");
        } else {
          ElMessage.success("\u4FDD\u5B58\u6210\u529F");
          refresh();
        }
      } catch (e) {
        ElMessage.error("\u4FDD\u5B58\u5931\u8D25");
      } finally {
        saving.value = false;
      }
    };
    const testEmail = ref("");
    const testDataJson = ref("");
    const sendingTest = ref(false);
    const handleSendTest = async () => {
      var _a;
      if (!testEmail.value) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u6536\u4EF6\u4EBA\u90AE\u7BB1");
        return;
      }
      if (!template.value) return;
      let testData = {};
      try {
        if (testDataJson.value) {
          testData = JSON.parse(testDataJson.value);
        } else {
          (_a = template.value.variables) == null ? void 0 : _a.forEach((v) => {
            testData[v.key] = `[TEST_${v.key.toUpperCase()}]`;
          });
        }
      } catch (e) {
        ElMessage.error("\u6D4B\u8BD5\u6570\u636E JSON \u683C\u5F0F\u9519\u8BEF");
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
          "$YdjG07uvWd"
          /* nuxt-injected */
        );
        if (error.value) {
          ElMessage.error(error.value.statusMessage || "\u53D1\u9001\u5931\u8D25");
        } else {
          ElMessage.success("\u6D4B\u8BD5\u90AE\u4EF6\u5DF2\u53D1\u9001");
        }
      } catch (e) {
        ElMessage.error("\u53D1\u9001\u5931\u8D25");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "template-edit-page" }, _attrs))} data-v-15aa5d1d>`);
      if (unref(pending)) {
        _push(`<div class="loading-state" data-v-15aa5d1d>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          rows: 5,
          animated: ""
        }, null, _parent));
        _push(`</div>`);
      } else if (template.value) {
        _push(`<!--[--><div class="page-header" data-v-15aa5d1d>`);
        _push(ssrRenderComponent(_component_el_page_header, {
          onBack: ($event) => unref(router).back()
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-large font-600 mr-3" data-v-15aa5d1d${_scopeId}>\u7F16\u8F91\u6A21\u677F: ${ssrInterpolate(template.value.name)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-large font-600 mr-3" }, "\u7F16\u8F91\u6A21\u677F: " + toDisplayString(template.value.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="content-grid" data-v-15aa5d1d><div class="edit-section" data-v-15aa5d1d>`);
        _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-15aa5d1d${_scopeId}><span data-v-15aa5d1d${_scopeId}>\u6A21\u677F\u5185\u5BB9</span>`);
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: form.value.is_enabled,
                "onUpdate:modelValue": ($event) => form.value.is_enabled = $event,
                "active-text": "\u542F\u7528",
                "inactive-text": "\u7981\u7528"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("span", null, "\u6A21\u677F\u5185\u5BB9"),
                  createVNode(_component_el_switch, {
                    modelValue: form.value.is_enabled,
                    "onUpdate:modelValue": ($event) => form.value.is_enabled = $event,
                    "active-text": "\u542F\u7528",
                    "inactive-text": "\u7981\u7528"
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
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u90AE\u4EF6\u6807\u9898" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: form.value.subject_template,
                            "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="form-tip" data-v-15aa5d1d${_scopeId3}>\u652F\u6301\u4F7F\u7528\u53D8\u91CF\uFF0C\u5982 ${ssrInterpolate("{{")}order_no${ssrInterpolate("}}")}</div>`);
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: form.value.subject_template,
                              "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                              placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("div", { class: "form-tip" }, "\u652F\u6301\u4F7F\u7528\u53D8\u91CF\uFF0C\u5982 " + toDisplayString("{{") + "order_no" + toDisplayString("}}"))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u90AE\u4EF6\u5185\u5BB9 (HTML)" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: form.value.body_template,
                            "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                            type: "textarea",
                            rows: 15,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u5185\u5BB9\uFF08\u652F\u6301 HTML\uFF09"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: form.value.body_template,
                              "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                              type: "textarea",
                              rows: 15,
                              placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u5185\u5BB9\uFF08\u652F\u6301 HTML\uFF09"
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
                                _push5(`\u4FDD\u5B58\u4FEE\u6539`);
                              } else {
                                return [
                                  createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
                                createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
                      createVNode(_component_el_form_item, { label: "\u90AE\u4EF6\u6807\u9898" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.value.subject_template,
                            "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "\u652F\u6301\u4F7F\u7528\u53D8\u91CF\uFF0C\u5982 " + toDisplayString("{{") + "order_no" + toDisplayString("}}"))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u90AE\u4EF6\u5185\u5BB9 (HTML)" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.value.body_template,
                            "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                            type: "textarea",
                            rows: 15,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u5185\u5BB9\uFF08\u652F\u6301 HTML\uFF09"
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
                              createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
                    createVNode(_component_el_form_item, { label: "\u90AE\u4EF6\u6807\u9898" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.subject_template,
                          "onUpdate:modelValue": ($event) => form.value.subject_template = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u6807\u9898"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "\u652F\u6301\u4F7F\u7528\u53D8\u91CF\uFF0C\u5982 " + toDisplayString("{{") + "order_no" + toDisplayString("}}"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u90AE\u4EF6\u5185\u5BB9 (HTML)" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.body_template,
                          "onUpdate:modelValue": ($event) => form.value.body_template = $event,
                          type: "textarea",
                          rows: 15,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u4EF6\u5185\u5BB9\uFF08\u652F\u6301 HTML\uFF09"
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
                            createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
        _push(`</div><div class="side-section" data-v-15aa5d1d>`);
        _push(ssrRenderComponent(_component_el_card, {
          shadow: "never",
          class: "mb-4"
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card-header" data-v-15aa5d1d${_scopeId}><span data-v-15aa5d1d${_scopeId}>\u53EF\u7528\u53D8\u91CF</span></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("span", null, "\u53EF\u7528\u53D8\u91CF")
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
                      label: "\u53D8\u91CF\u540D",
                      width: "100"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<code data-v-15aa5d1d${_scopeId3}>${ssrInterpolate(row.key)}</code>`);
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
                      label: "\u63CF\u8FF0"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_table_column, {
                        prop: "key",
                        label: "\u53D8\u91CF\u540D",
                        width: "100"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("code", null, toDisplayString(row.key), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        prop: "desc",
                        label: "\u63CF\u8FF0"
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
                      label: "\u53D8\u91CF\u540D",
                      width: "100"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("code", null, toDisplayString(row.key), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "desc",
                      label: "\u63CF\u8FF0"
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
              _push2(`<div class="card-header" data-v-15aa5d1d${_scopeId}><span data-v-15aa5d1d${_scopeId}>\u53D1\u9001\u6D4B\u8BD5\u90AE\u4EF6</span></div>`);
            } else {
              return [
                createVNode("div", { class: "card-header" }, [
                  createVNode("span", null, "\u53D1\u9001\u6D4B\u8BD5\u90AE\u4EF6")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6536\u4EF6\u4EBA\u90AE\u7BB1" }, {
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
                      _push3(`<div class="mb-4" data-v-15aa5d1d${_scopeId2}><div class="text-sm text-gray-500 mb-2" data-v-15aa5d1d${_scopeId2}>\u6D4B\u8BD5\u6570\u636E (\u53EF\u9009 JSON)</div>`);
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
                          _push4(`\u53D1\u9001\u6D4B\u8BD5`);
                        } else {
                          return [
                            createTextVNode("\u53D1\u9001\u6D4B\u8BD5")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_form_item, { label: "\u6536\u4EF6\u4EBA\u90AE\u7BB1" }, {
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
                        createVNode("div", { class: "text-sm text-gray-500 mb-2" }, "\u6D4B\u8BD5\u6570\u636E (\u53EF\u9009 JSON)"),
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
                          createTextVNode("\u53D1\u9001\u6D4B\u8BD5")
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
                    createVNode(_component_el_form_item, { label: "\u6536\u4EF6\u4EBA\u90AE\u7BB1" }, {
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
                      createVNode("div", { class: "text-sm text-gray-500 mb-2" }, "\u6D4B\u8BD5\u6570\u636E (\u53EF\u9009 JSON)"),
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
                        createTextVNode("\u53D1\u9001\u6D4B\u8BD5")
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
        _push(ssrRenderComponent(_component_el_empty, { description: "\u6A21\u677F\u4E0D\u5B58\u5728" }, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/notification/template/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15aa5d1d"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CY3guHY2.mjs.map
