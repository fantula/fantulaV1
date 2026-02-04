import { E as ElCard } from './index-D8QB_Wqc.mjs';
import { E as ElButton } from './index-DZvUdcyn.mjs';
import { E as ElForm } from './index-DCJPe4PK.mjs';
import { E as ElSwitch } from './index-uvs_ySzw.mjs';
import { E as ElInput } from './index-CcE-rjwX.mjs';
import { E as ElDivider } from './index-DL7T-Mp9.mjs';
import { v as vLoading } from './directive-D1M1s_ef.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { g as getAdminSupabaseClient } from './supabase-admin-Yv96kmWU.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './index-CO6H4Lsj.mjs';
import './objects-Bz74KHmq.mjs';
import './index-CmsdIFY8.mjs';
import './icon-eqoLCvNY.mjs';
import './index-Byc6LUYX.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './validator-CGHVIElq.mjs';
import './index-DqrhOzxH.mjs';
import './event-BZTOGHfp.mjs';
import './typescript-D6L75muK.mjs';
import './event-D3FEo2C5.mjs';
import './index-D2CY7Ok3.mjs';
import './aria-Rs9hkxop.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
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

const adminMessageApi = {
  async getMessages(params) {
    const client = getAdminSupabaseClient();
    let query = client.from("messages").select("*", { count: "exact" });
    if (params == null ? void 0 : params.user_uid) {
      query = query.eq("user_uid", params.user_uid);
    }
    query = query.order("created_at", { ascending: false });
    if (params == null ? void 0 : params.limit) {
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
      return { success: false, error: "\u7528\u6237\u4E0D\u5B58\u5728\uFF0C\u7981\u6B62\u53D1\u9001\u6D88\u606F" };
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
          ElMessage.success("\u914D\u7F6E\u5DF2\u4FDD\u5B58");
        } else {
          ElMessage.error(res.error || "\u4FDD\u5B58\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u4FDD\u5B58\u5931\u8D25");
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
            _push2(`<div class="card-header" data-v-0e16cbbc${_scopeId}><span data-v-0e16cbbc${_scopeId}>\u5BA2\u6237\u6D88\u606F\u901A\u77E5\u914D\u7F6E</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: saveSettings,
              loading: saving.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u4FDD\u5B58\u914D\u7F6E`);
                } else {
                  return [
                    createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u5BA2\u6237\u6D88\u606F\u901A\u77E5\u914D\u7F6E"),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: saveSettings,
                  loading: saving.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
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
                  _push3(`<div class="section-title" data-v-0e16cbbc${_scopeId2}>\u8BA2\u5355\u76F8\u5173</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>\u4E0B\u5355\u901A\u77E5 (Order Created)</span>`);
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
                      placeholder: "\u6D88\u606F\u6807\u9898",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.order_created.template,
                      "onUpdate:modelValue": ($event) => settings2.order_created.template = $event,
                      type: "textarea",
                      rows: 2,
                      placeholder: "\u8BF7\u8F93\u5165\u901A\u77E5\u6A21\u677F"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>\u53EF\u7528\u53D8\u91CF: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>\u8BA2\u5355\u53D1\u8D27 (Order Shipped)</span>`);
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
                      placeholder: "\u6D88\u606F\u6807\u9898",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.order_shipped.template,
                      "onUpdate:modelValue": ($event) => settings2.order_shipped.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>\u53EF\u7528\u53D8\u91CF: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>\u865A\u62DF/API\u56DE\u6267 (Receipt)</span>`);
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
                      placeholder: "\u6D88\u606F\u6807\u9898",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.virtual_order_received.template,
                      "onUpdate:modelValue": ($event) => settings2.virtual_order_received.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>\u53EF\u7528\u53D8\u91CF: {order_no}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="section-title" data-v-0e16cbbc${_scopeId2}>\u8D26\u6237\u4E0E\u6743\u76CA</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>\u4F18\u60E0\u5238\u5151\u6362 (Redeemed)</span>`);
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
                      placeholder: "\u6D88\u606F\u6807\u9898",
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
                  _push3(`</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>\u989D\u5EA6\u53D8\u52A8 (Quota Changed)</span>`);
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
                      placeholder: "\u6D88\u606F\u6807\u9898",
                      class: "title-input"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: settings2.quota_changed.template,
                      "onUpdate:modelValue": ($event) => settings2.quota_changed.template = $event,
                      type: "textarea",
                      rows: 2
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="vars-tip" data-v-0e16cbbc${_scopeId2}>\u53EF\u7528\u53D8\u91CF: {balance}, {amount}</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="section-title" data-v-0e16cbbc${_scopeId2}>\u670D\u52A1\u652F\u6301</div><div class="setting-item" data-v-0e16cbbc${_scopeId2}><div class="setting-header" data-v-0e16cbbc${_scopeId2}><span class="label" data-v-0e16cbbc${_scopeId2}>\u5DE5\u5355\u56DE\u590D (Ticket Replied)</span>`);
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
                      placeholder: "\u6D88\u606F\u6807\u9898",
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
                    createVNode("div", { class: "section-title" }, "\u8BA2\u5355\u76F8\u5173"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u4E0B\u5355\u901A\u77E5 (Order Created)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_created.template,
                          "onUpdate:modelValue": ($event) => settings2.order_created.template = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "\u8BF7\u8F93\u5165\u901A\u77E5\u6A21\u677F"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u8BA2\u5355\u53D1\u8D27 (Order Shipped)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_shipped.template,
                          "onUpdate:modelValue": ($event) => settings2.order_shipped.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u865A\u62DF/API\u56DE\u6267 (Receipt)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.virtual_order_received.template,
                          "onUpdate:modelValue": ($event) => settings2.virtual_order_received.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "\u8D26\u6237\u4E0E\u6743\u76CA"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u4F18\u60E0\u5238\u5151\u6362 (Redeemed)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
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
                        createVNode("span", { class: "label" }, "\u989D\u5EA6\u53D8\u52A8 (Quota Changed)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.quota_changed.template,
                          "onUpdate:modelValue": ($event) => settings2.quota_changed.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {balance}, {amount}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "\u670D\u52A1\u652F\u6301"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u5DE5\u5355\u56DE\u590D (Ticket Replied)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
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
                    createVNode("div", { class: "section-title" }, "\u8BA2\u5355\u76F8\u5173"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u4E0B\u5355\u901A\u77E5 (Order Created)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_created.template,
                          "onUpdate:modelValue": ($event) => settings2.order_created.template = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "\u8BF7\u8F93\u5165\u901A\u77E5\u6A21\u677F"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u8BA2\u5355\u53D1\u8D27 (Order Shipped)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.order_shipped.template,
                          "onUpdate:modelValue": ($event) => settings2.order_shipped.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u865A\u62DF/API\u56DE\u6267 (Receipt)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.virtual_order_received.template,
                          "onUpdate:modelValue": ($event) => settings2.virtual_order_received.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {order_no}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "\u8D26\u6237\u4E0E\u6743\u76CA"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u4F18\u60E0\u5238\u5151\u6362 (Redeemed)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
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
                        createVNode("span", { class: "label" }, "\u989D\u5EA6\u53D8\u52A8 (Quota Changed)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
                            class: "title-input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_el_input, {
                          modelValue: settings2.quota_changed.template,
                          "onUpdate:modelValue": ($event) => settings2.quota_changed.template = $event,
                          type: "textarea",
                          rows: 2
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "vars-tip" }, "\u53EF\u7528\u53D8\u91CF: {balance}, {amount}")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_el_divider),
                    createVNode("div", { class: "section-title" }, "\u670D\u52A1\u652F\u6301"),
                    createVNode("div", { class: "setting-item" }, [
                      createVNode("div", { class: "setting-header" }, [
                        createVNode("span", { class: "label" }, "\u5DE5\u5355\u56DE\u590D (Ticket Replied)"),
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
                            placeholder: "\u6D88\u606F\u6807\u9898",
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

export { settings as default };
//# sourceMappingURL=settings-CFJhZrCl.mjs.map
