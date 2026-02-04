import { E as ElCard } from "./index-D8QB_Wqc.js";
import { E as ElButton } from "./index-DZvUdcyn.js";
import { E as ElForm } from "./index-DCJPe4PK.js";
import { E as ElSwitch } from "./index-uvs_ySzw.js";
import { E as ElInput } from "./index-CcE-rjwX.js";
import { E as ElDivider } from "./index-DL7T-Mp9.js";
import { v as vLoading } from "./directive-D1M1s_ef.js";
/* empty css              */
/* empty css                 */
/* empty css                   */
/* empty css                 */
/* empty css                   */
/* empty css                  */
/* empty css                    */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from "vue/server-renderer";
import { g as getAdminSupabaseClient } from "./supabase-admin-Yv96kmWU.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-eYVppfk3.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./index-CO6H4Lsj.js";
import "./objects-Bz74KHmq.js";
import "./index-CmsdIFY8.js";
import "./icon-eqoLCvNY.js";
import "./index-Byc6LUYX.js";
import "@vueuse/core";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "async-validator";
import "./validator-CGHVIElq.js";
import "./index-DqrhOzxH.js";
import "./event-BZTOGHfp.js";
import "./typescript-D6L75muK.js";
import "./event-D3FEo2C5.js";
import "./index-D2CY7Ok3.js";
import "./aria-Rs9hkxop.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const adminMessageApi = {
  async getMessages(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("messages").select("*", { count: "exact" });
    if (params?.user_uid) {
      query = query.eq("user_uid", params.user_uid);
    }
    query = query.order("created_at", { ascending: false });
    if (params?.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      return { success: false, messages: [], total: 0, error: error.message };
    }
    return { success: true, messages: data || [], total: count || 0 };
  },
  async sendMessage(userUid, title, content, type = "system", link) {
    const client = getAdminSupabaseClient();
    const { data: profile, error: profileError } = await client.from("profiles").select("id, uid").eq("uid", userUid).single();
    if (profileError || !profile) {
      return { success: false, error: "用户不存在，禁止发送消息" };
    }
    const { data, error } = await client.from("messages").insert({
      user_id: profile.id,
      user_uid: userUid,
      title,
      content,
      type,
      link: link || null
    }).select("id").single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, message_id: data.id };
  },
  /**
   * 获取客户消息通知配置
   */
  async getNotificationSettings() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("system_settings").select("value").eq("key", "customer_notification_config").single();
    if (error) {
      if (error.code === "PGRST116") {
        return { success: true, settings: {} };
      }
      return { success: false, error: error.message };
    }
    let settings2 = data.value;
    if (typeof settings2 === "string") {
      try {
        settings2 = JSON.parse(settings2);
      } catch (e) {
      }
    }
    return { success: true, settings: settings2 };
  },
  /**
   * 更新客户消息通知配置
   */
  async updateNotificationSettings(settings2) {
    const client = getAdminSupabaseClient();
    const value = settings2;
    const { error } = await client.from("system_settings").upsert({
      key: "customer_notification_config",
      value,
      description: "Customer notification trigger configuration"
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
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
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_switch = ElSwitch;
      const _component_el_input = ElInput;
      const _component_el_divider = ElDivider;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-page" }, _attrs))} data-v-0e16cbbc>`);
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-0e16cbbc${_scopeId}><span data-v-0e16cbbc${_scopeId}>客户消息通知配置</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: saveSettings,
              loading: saving.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存配置`);
                } else {
                  return [
                    createTextVNode("保存配置")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "客户消息通知配置"),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: saveSettings,
                  loading: saving.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("保存配置")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "settings-list" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-0e16cbbc${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="section-title" data-v-0e16cbbc${_scopeId2}>订单相关</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>下单通知 (Order Created)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.order_created.enable,
                    "onUpdate:modelValue": ($event) => settings2.order_created.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.order_created.enable) {
                    _push3(`<div class="template-area" data-v-0e16cbbc${_scopeId2}><div class="field-row" data-v-0e16cbbc${_scopeId2}>`);
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
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>可用变量: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>订单发货 (Order Shipped)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.order_shipped.enable,
                    "onUpdate:modelValue": ($event) => settings2.order_shipped.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.order_shipped.enable) {
                    _push3(`<div class="template-area" data-v-0e16cbbc${_scopeId2}><div class="field-row" data-v-0e16cbbc${_scopeId2}>`);
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
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>可用变量: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>虚拟/API回执 (Receipt)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.virtual_order_received.enable,
                    "onUpdate:modelValue": ($event) => settings2.virtual_order_received.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.virtual_order_received.enable) {
                    _push3(`<div class="template-area" data-v-0e16cbbc${_scopeId2}><div class="field-row" data-v-0e16cbbc${_scopeId2}>`);
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
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>可用变量: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="section-title" data-v-0e16cbbc${_scopeId2}>账户与权益</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>优惠券兑换 (Redeemed)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.coupon_redeemed.enable,
                    "onUpdate:modelValue": ($event) => settings2.coupon_redeemed.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.coupon_redeemed.enable) {
                    _push3(`<div class="template-area" data-v-0e16cbbc${_scopeId2}><div class="field-row" data-v-0e16cbbc${_scopeId2}>`);
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
                  _push3(`</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>额度变动 (Quota Changed)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.quota_changed.enable,
                    "onUpdate:modelValue": ($event) => settings2.quota_changed.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.quota_changed.enable) {
                    _push3(`<div class="template-area" data-v-0e16cbbc${_scopeId2}><div class="field-row" data-v-0e16cbbc${_scopeId2}>`);
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
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>可用变量: {balance}, {amount}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="section-title" data-v-0e16cbbc${_scopeId2}>服务支持</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>工单回复 (Ticket Replied)</span>`);
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: settings2.ticket_replied.enable,
                    "onUpdate:modelValue": ($event) => settings2.ticket_replied.enable = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (settings2.ticket_replied.enable) {
                    _push3(`<div class="template-area" data-v-0e16cbbc${_scopeId2}><div class="field-row" data-v-0e16cbbc${_scopeId2}>`);
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
const settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e16cbbc"]]);
export {
  settings as default
};
//# sourceMappingURL=settings-CFJhZrCl.js.map
