import { E as ElAlert } from "./index-BC7fiCUI.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
/* empty css                  */
/* empty css                */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { K as connection_default, I as check_default } from "./index-DNnPa_Q9.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-Ck0_dGQP.js";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./vnode-uc6o_sOa.js";
import "@vue/shared";
import "./index-DbvZsXcZ.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "./use-global-config-C5kRDPtv.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "./index-CD49T52w.js";
/* empty css                    */
import "./typescript-D6L75muK.js";
import "./event-D3FEo2C5.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "storage",
  __ssrInlineRender: true,
  setup(__props) {
    const testing = ref(false);
    const testResult = ref(null);
    const testConnection = async () => {
      testing.value = true;
      testResult.value = null;
      try {
        const { callEdgeFunction } = await import("./supabase-F2pQZHm6.js");
        const { getAuthToken } = await import("./supabase-F2pQZHm6.js");
        const token = await getAuthToken();
        if (!token) {
          ElMessage.error("请登录");
          testing.value = false;
          return;
        }
        const { data, error } = await callEdgeFunction("test-r2-connection", {
          method: "POST",
          body: {},
          requireAuth: true,
          token
        });
        if (error) {
          testResult.value = {
            success: false,
            message: error
          };
        } else {
          testResult.value = {
            success: data.success,
            message: data.message || (data.success ? "连接成功" : "未知错误")
          };
        }
      } catch (e) {
        testResult.value = {
          success: false,
          message: "前端异常: " + (e.message || "未知错误")
        };
      } finally {
        testing.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "r2-settings-page" }, _attrs))} data-v-475630d9>`);
      _push(ssrRenderComponent(AdminActionCard, { title: "R2 存储配置 (环境变量)" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="config-status" data-v-475630d9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "配置已托管",
              type: "info",
              closable: false,
              "show-icon": "",
              class: "mb-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="status-content" data-v-475630d9${_scopeId2}><p data-v-475630d9${_scopeId2}>当前 R2 配置已迁移至 <strong data-v-475630d9${_scopeId2}>Supabase Edge Function 环境变量</strong>，不再从数据库读取。</p><p data-v-475630d9${_scopeId2}>如需修改密钥或存储桶，请在 Supabase Dashboard &gt; Edge Functions &gt; Secrets 中设置。</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "status-content" }, [
                      createVNode("p", null, [
                        createTextVNode("当前 R2 配置已迁移至 "),
                        createVNode("strong", null, "Supabase Edge Function 环境变量"),
                        createTextVNode("，不再从数据库读取。")
                      ]),
                      createVNode("p", null, "如需修改密钥或存储桶，请在 Supabase Dashboard > Edge Functions > Secrets 中设置。")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="env-list" data-v-475630d9${_scopeId}><h3 data-v-475630d9${_scopeId}>当前环境状态</h3><div class="env-item" data-v-475630d9${_scopeId}><span class="label" data-v-475630d9${_scopeId}>Config Source:</span><span class="value" data-v-475630d9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: "success",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Environment Variables`);
                } else {
                  return [
                    createTextVNode("Environment Variables")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div><div class="env-item" data-v-475630d9${_scopeId}><span class="label" data-v-475630d9${_scopeId}>R2 Connection:</span><span class="value" data-v-475630d9${_scopeId}>`);
            if (testResult.value?.success) {
              _push2(ssrRenderComponent(_component_el_tag, {
                type: "success",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Connected`);
                  } else {
                    return [
                      createTextVNode("Connected")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else if (testResult.value && !testResult.value.success) {
              _push2(ssrRenderComponent(_component_el_tag, {
                type: "danger",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Error`);
                  } else {
                    return [
                      createTextVNode("Error")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_el_tag, {
                type: "info",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Checking...`);
                  } else {
                    return [
                      createTextVNode("Checking...")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</span></div></div><div class="action-area" data-v-475630d9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              loading: testing.value,
              onClick: testConnection,
              icon: unref(connection_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 测试连接 `);
                } else {
                  return [
                    createTextVNode(" 测试连接 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (testResult.value && testResult.value.success) {
              _push2(`<span class="text-green-600 text-sm ml-4" data-v-475630d9${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "mr-1 top-0.5 relative" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(check_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(check_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 连接成功 (Bucket: fantula2601) </span>`);
            } else {
              _push2(`<!---->`);
            }
            if (testResult.value && !testResult.value.success) {
              _push2(`<span class="text-red-500 text-sm ml-4" data-v-475630d9${_scopeId}>${ssrInterpolate(testResult.value.message)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "config-status" }, [
                createVNode(_component_el_alert, {
                  title: "配置已托管",
                  type: "info",
                  closable: false,
                  "show-icon": "",
                  class: "mb-6"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "status-content" }, [
                      createVNode("p", null, [
                        createTextVNode("当前 R2 配置已迁移至 "),
                        createVNode("strong", null, "Supabase Edge Function 环境变量"),
                        createTextVNode("，不再从数据库读取。")
                      ]),
                      createVNode("p", null, "如需修改密钥或存储桶，请在 Supabase Dashboard > Edge Functions > Secrets 中设置。")
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "env-list" }, [
                  createVNode("h3", null, "当前环境状态"),
                  createVNode("div", { class: "env-item" }, [
                    createVNode("span", { class: "label" }, "Config Source:"),
                    createVNode("span", { class: "value" }, [
                      createVNode(_component_el_tag, {
                        type: "success",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Environment Variables")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "env-item" }, [
                    createVNode("span", { class: "label" }, "R2 Connection:"),
                    createVNode("span", { class: "value" }, [
                      testResult.value?.success ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: "success",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Connected")
                        ]),
                        _: 1
                      })) : testResult.value && !testResult.value.success ? (openBlock(), createBlock(_component_el_tag, {
                        key: 1,
                        type: "danger",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Error")
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(_component_el_tag, {
                        key: 2,
                        type: "info",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Checking...")
                        ]),
                        _: 1
                      }))
                    ])
                  ])
                ]),
                createVNode("div", { class: "action-area" }, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    loading: testing.value,
                    onClick: testConnection,
                    icon: unref(connection_default)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 测试连接 ")
                    ]),
                    _: 1
                  }, 8, ["loading", "icon"]),
                  testResult.value && testResult.value.success ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-green-600 text-sm ml-4"
                  }, [
                    createVNode(_component_el_icon, { class: "mr-1 top-0.5 relative" }, {
                      default: withCtx(() => [
                        createVNode(unref(check_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" 连接成功 (Bucket: fantula2601) ")
                  ])) : createCommentVNode("", true),
                  testResult.value && !testResult.value.success ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-red-500 text-sm ml-4"
                  }, toDisplayString(testResult.value.message), 1)) : createCommentVNode("", true)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/backend-settings/storage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const storage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-475630d9"]]);
export {
  storage as default
};
//# sourceMappingURL=storage-Cuz94l_5.js.map
