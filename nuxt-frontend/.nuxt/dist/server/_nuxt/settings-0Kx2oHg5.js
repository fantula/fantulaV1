import { E as ElCard } from "./index-B15mgGFM.js";
import { E as ElForm } from "./index-uVJ2GEO7.js";
import { E as ElSwitch } from "./index-DVwBR8VS.js";
import { E as ElInput } from "./index-ttyu327u.js";
import { E as ElDivider } from "./index-DEoO_C5P.js";
import { v as vLoading } from "./directive-Cp0y9Az7.js";
/* empty css              */
/* empty css                 */
/* empty css                 */
/* empty css                   */
/* empty css                  */
/* empty css                    */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { a as adminMessageApi } from "./message-CbmmzyV5.js";
import { P as PageTipHeader } from "./PageTipHeader-CYVW2ELG.js";
import { S as StickyFormHeader } from "./StickyFormHeader-BEb9UJKB.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "./index-CRs4T-Jf.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "./objects-Bz74KHmq.js";
import "./constants-hAKFmBbq.js";
import "./use-form-item-n_L16njV.js";
import "async-validator";
import "@vueuse/core";
import "./index-D6MDXFfa.js";
import "./validator-DW0BNsk6.js";
import "./index-B6zOcltc.js";
import "./icon-DxnRhcjj.js";
import "./event-BZTOGHfp.js";
import "./typescript-D6L75muK.js";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
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
import "./index-CDEPy-be.js";
import "./vnode-uc6o_sOa.js";
/* empty css                  */
import "./index-CGHU_uKU.js";
import "@ctrl/tinycolor";
/* empty css                   */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const saving = ref(false);
    const defaultItem = { enable: true, title: "", template: "" };
    const settings2 = reactive({
      order_created: { ...defaultItem },
      order_shipped: { ...defaultItem },
      virtual_order_received: { ...defaultItem },
      coupon_redeemed: { ...defaultItem },
      quota_changed: { ...defaultItem },
      ticket_replied: { ...defaultItem }
    });
    const saveSettings = async () => {
      saving.value = true;
      try {
        const res = await adminMessageApi.updateNotificationSettings(settings2);
        if (res.success) {
          ElMessage.success("配置已保存");
        } else {
          ElMessage.error(res.error || "保存失败");
        }
      } catch (e) {
        ElMessage.error("保存失败");
      } finally {
        saving.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_switch = ElSwitch;
      const _component_el_input = ElInput;
      const _component_el_divider = ElDivider;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-page" }, _attrs))} data-v-2fa024b5>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "通知配置",
        description: "配置各类业务场景下的自动消息通知模板。"
      }, null, _parent));
      _push(ssrRenderComponent(StickyFormHeader, {
        title: "通知配置",
        loading: saving.value,
        onSave: saveSettings,
        "show-back": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "settings-list" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-2fa024b5${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="section-title" data-v-2fa024b5${_scopeId2}>订单相关</div><div class="setting-item" data-v-2fa024b5${_scopeId2}><div class="setting-header" data-v-2fa024b5${_scopeId2}><span class="label" data-v-2fa024b5${_scopeId2}>下单通知 (Order Created)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.order_created.enable,
                    "onUpdate:modelValue": ($event) => settings2.order_created.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.order_created.enable) {
                    _push3(`<div class="template-area" data-v-2fa024b5${_scopeId2}><div class="field-row" data-v-2fa024b5${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.order_created.title,
                      "onUpdate:modelValue": ($event) => settings2.order_created.title = $event,
                      placeholder: "消息标题",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.order_created.template,
                      "onUpdate:modelValue": ($event) => settings2.order_created.template = $event,
                      type: "textarea",
                      rows: 2,
                      placeholder: "请输入通知模板"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-2fa024b5${_scopeId2}>可用变量: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-2fa024b5${_scopeId2}><div class="setting-header" data-v-2fa024b5${_scopeId2}><span class="label" data-v-2fa024b5${_scopeId2}>订单发货 (Order Shipped)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.order_shipped.enable,
                    "onUpdate:modelValue": ($event) => settings2.order_shipped.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.order_shipped.enable) {
                    _push3(`<div class="template-area" data-v-2fa024b5${_scopeId2}><div class="field-row" data-v-2fa024b5${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.order_shipped.title,
                      "onUpdate:modelValue": ($event) => settings2.order_shipped.title = $event,
                      placeholder: "消息标题",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.order_shipped.template,
                      "onUpdate:modelValue": ($event) => settings2.order_shipped.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-2fa024b5${_scopeId2}>可用变量: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-2fa024b5${_scopeId2}><div class="setting-header" data-v-2fa024b5${_scopeId2}><span class="label" data-v-2fa024b5${_scopeId2}>虚拟/API回执 (Receipt)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.virtual_order_received.enable,
                    "onUpdate:modelValue": ($event) => settings2.virtual_order_received.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.virtual_order_received.enable) {
                    _push3(`<div class="template-area" data-v-2fa024b5${_scopeId2}><div class="field-row" data-v-2fa024b5${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.virtual_order_received.title,
                      "onUpdate:modelValue": ($event) => settings2.virtual_order_received.title = $event,
                      placeholder: "消息标题",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.virtual_order_received.template,
                      "onUpdate:modelValue": ($event) => settings2.virtual_order_received.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-2fa024b5${_scopeId2}>可用变量: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="section-title" data-v-2fa024b5${_scopeId2}>账户与权益</div><div class="setting-item" data-v-2fa024b5${_scopeId2}><div class="setting-header" data-v-2fa024b5${_scopeId2}><span class="label" data-v-2fa024b5${_scopeId2}>优惠券兑换 (Redeemed)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.coupon_redeemed.enable,
                    "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.coupon_redeemed.enable) {
                    _push3(`<div class="template-area" data-v-2fa024b5${_scopeId2}><div class="field-row" data-v-2fa024b5${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.coupon_redeemed.title,
                      "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.title = $event,
                      placeholder: "消息标题",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.coupon_redeemed.template,
                      "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-2fa024b5${_scopeId2}><div class="setting-header" data-v-2fa024b5${_scopeId2}><span class="label" data-v-2fa024b5${_scopeId2}>额度变动 (Quota Changed)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.quota_changed.enable,
                    "onUpdate:modelValue": ($event) => settings2.quota_changed.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.quota_changed.enable) {
                    _push3(`<div class="template-area" data-v-2fa024b5${_scopeId2}><div class="field-row" data-v-2fa024b5${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.quota_changed.title,
                      "onUpdate:modelValue": ($event) => settings2.quota_changed.title = $event,
                      placeholder: "消息标题",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.quota_changed.template,
                      "onUpdate:modelValue": ($event) => settings2.quota_changed.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-2fa024b5${_scopeId2}>可用变量: {balance}, {amount}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="section-title" data-v-2fa024b5${_scopeId2}>服务支持</div><div class="setting-item" data-v-2fa024b5${_scopeId2}><div class="setting-header" data-v-2fa024b5${_scopeId2}><span class="label" data-v-2fa024b5${_scopeId2}>工单回复 (Ticket Replied)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.ticket_replied.enable,
                    "onUpdate:modelValue": ($event) => settings2.ticket_replied.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.ticket_replied.enable) {
                    _push3(`<div class="template-area" data-v-2fa024b5${_scopeId2}><div class="field-row" data-v-2fa024b5${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.ticket_replied.title,
                      "onUpdate:modelValue": ($event) => settings2.ticket_replied.title = $event,
                      placeholder: "消息标题",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.ticket_replied.template,
                      "onUpdate:modelValue": ($event) => settings2.ticket_replied.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "section-title" }, "订单相关"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "下单通知 (Order Created)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.order_created.enable,
                          "onUpdate:modelValue": ($event) => settings2.order_created.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.order_created.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.order_created.title,
                            "onUpdate:modelValue": ($event) => settings2.order_created.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_created.template,
                          "onUpdate:modelValue": ($event) => settings2.order_created.template = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "请输入通知模板"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "订单发货 (Order Shipped)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.order_shipped.enable,
                          "onUpdate:modelValue": ($event) => settings2.order_shipped.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.order_shipped.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.order_shipped.title,
                            "onUpdate:modelValue": ($event) => settings2.order_shipped.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_shipped.template,
                          "onUpdate:modelValue": ($event) => settings2.order_shipped.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "虚拟/API回执 (Receipt)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.virtual_order_received.enable,
                          "onUpdate:modelValue": ($event) => settings2.virtual_order_received.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.virtual_order_received.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.virtual_order_received.title,
                            "onUpdate:modelValue": ($event) => settings2.virtual_order_received.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.virtual_order_received.template,
                          "onUpdate:modelValue": ($event) => settings2.virtual_order_received.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "账户与权益"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "优惠券兑换 (Redeemed)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.coupon_redeemed.enable,
                          "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.coupon_redeemed.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.coupon_redeemed.title,
                            "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.coupon_redeemed.template,
                          "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "额度变动 (Quota Changed)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.quota_changed.enable,
                          "onUpdate:modelValue": ($event) => settings2.quota_changed.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.quota_changed.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.quota_changed.title,
                            "onUpdate:modelValue": ($event) => settings2.quota_changed.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.quota_changed.template,
                          "onUpdate:modelValue": ($event) => settings2.quota_changed.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {balance}, {amount}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "服务支持"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "工单回复 (Ticket Replied)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.ticket_replied.enable,
                          "onUpdate:modelValue": ($event) => settings2.ticket_replied.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.ticket_replied.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.ticket_replied.title,
                            "onUpdate:modelValue": ($event) => settings2.ticket_replied.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.ticket_replied.template,
                          "onUpdate:modelValue": ($event) => settings2.ticket_replied.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "settings-list" }, [
                createVNode(_component_el_form, { "label-position": "top" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "section-title" }, "订单相关"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "下单通知 (Order Created)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.order_created.enable,
                          "onUpdate:modelValue": ($event) => settings2.order_created.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.order_created.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.order_created.title,
                            "onUpdate:modelValue": ($event) => settings2.order_created.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_created.template,
                          "onUpdate:modelValue": ($event) => settings2.order_created.template = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "请输入通知模板"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "订单发货 (Order Shipped)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.order_shipped.enable,
                          "onUpdate:modelValue": ($event) => settings2.order_shipped.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.order_shipped.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.order_shipped.title,
                            "onUpdate:modelValue": ($event) => settings2.order_shipped.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_shipped.template,
                          "onUpdate:modelValue": ($event) => settings2.order_shipped.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "虚拟/API回执 (Receipt)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.virtual_order_received.enable,
                          "onUpdate:modelValue": ($event) => settings2.virtual_order_received.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.virtual_order_received.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.virtual_order_received.title,
                            "onUpdate:modelValue": ($event) => settings2.virtual_order_received.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.virtual_order_received.template,
                          "onUpdate:modelValue": ($event) => settings2.virtual_order_received.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "账户与权益"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "优惠券兑换 (Redeemed)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.coupon_redeemed.enable,
                          "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.coupon_redeemed.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.coupon_redeemed.title,
                            "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.coupon_redeemed.template,
                          "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "额度变动 (Quota Changed)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.quota_changed.enable,
                          "onUpdate:modelValue": ($event) => settings2.quota_changed.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.quota_changed.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.quota_changed.title,
                            "onUpdate:modelValue": ($event) => settings2.quota_changed.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.quota_changed.template,
                          "onUpdate:modelValue": ($event) => settings2.quota_changed.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "可用变量: {balance}, {amount}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "服务支持"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "工单回复 (Ticket Replied)"),
                        createVNode(_component_el_switch, {
                          modelValue: settings2.ticket_replied.enable,
                          "onUpdate:modelValue": ($event) => settings2.ticket_replied.enable = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      settings2.ticket_replied.enable ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "template-area"
                      }, [
                        createVNode("div", { class: "field-row" }, [
                          createVNode(_component_el_input, {
                            modelValue: settings2.ticket_replied.title,
                            "onUpdate:modelValue": ($event) => settings2.ticket_replied.title = $event,
                            placeholder: "消息标题",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.ticket_replied.template,
                          "onUpdate:modelValue": ($event) => settings2.ticket_replied.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })
              ])), [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/messages/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2fa024b5"]]);
export {
  settings as default
};
//# sourceMappingURL=settings-0Kx2oHg5.js.map
