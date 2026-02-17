import { E as ElAlert } from './index-BkMjcDuB.mjs';
import { E as ElTag } from './index-BwbEmU3g.mjs';
import { E as ElButton } from './index-BmUjCntg.mjs';
import { E as ElIcon } from './index-C4aUwruK.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { Q as connection_default, R as check_default } from './index-CCIZH4aC.mjs';
import { A as AdminActionCard } from './AdminActionCard-l7l1Gr-n.mjs';
import { E as ElMessage } from './index-CIurcsSv.mjs';
import { _ as _export_sfc } from './server.mjs';
import './icon-CadSVx0p.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import './vnode-uc6o_sOa.mjs';
import './index-C1njJNPQ.mjs';
import './use-form-item-BJm4fR6K.mjs';
import './constants-hAKFmBbq.mjs';
import './use-global-config-CaR6i8cb.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-CMbz_fag.mjs';
import './typescript-D6L75muK.mjs';
import './event-D3FEo2C5.mjs';
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
        const { callEdgeFunction } = await import('./supabase-Ds8OQlZJ.mjs');
        const { getAuthToken } = await import('./supabase-Ds8OQlZJ.mjs');
        const token = await getAuthToken();
        if (!token) {
          ElMessage.error("\u8BF7\u767B\u5F55");
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
            message: data.message || (data.success ? "\u8FDE\u63A5\u6210\u529F" : "\u672A\u77E5\u9519\u8BEF")
          };
        }
      } catch (e) {
        testResult.value = {
          success: false,
          message: "\u524D\u7AEF\u5F02\u5E38: " + (e.message || "\u672A\u77E5\u9519\u8BEF")
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
      _push(ssrRenderComponent(AdminActionCard, { title: "R2 \u5B58\u50A8\u914D\u7F6E (\u73AF\u5883\u53D8\u91CF)" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="config-status" data-v-475630d9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "\u914D\u7F6E\u5DF2\u6258\u7BA1",
              type: "info",
              closable: false,
              "show-icon": "",
              class: "mb-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="status-content" data-v-475630d9${_scopeId2}><p data-v-475630d9${_scopeId2}>\u5F53\u524D R2 \u914D\u7F6E\u5DF2\u8FC1\u79FB\u81F3 <strong data-v-475630d9${_scopeId2}>Supabase Edge Function \u73AF\u5883\u53D8\u91CF</strong>\uFF0C\u4E0D\u518D\u4ECE\u6570\u636E\u5E93\u8BFB\u53D6\u3002</p><p data-v-475630d9${_scopeId2}>\u5982\u9700\u4FEE\u6539\u5BC6\u94A5\u6216\u5B58\u50A8\u6876\uFF0C\u8BF7\u5728 Supabase Dashboard &gt; Edge Functions &gt; Secrets \u4E2D\u8BBE\u7F6E\u3002</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "status-content" }, [
                      createVNode("p", null, [
                        createTextVNode("\u5F53\u524D R2 \u914D\u7F6E\u5DF2\u8FC1\u79FB\u81F3 "),
                        createVNode("strong", null, "Supabase Edge Function \u73AF\u5883\u53D8\u91CF"),
                        createTextVNode("\uFF0C\u4E0D\u518D\u4ECE\u6570\u636E\u5E93\u8BFB\u53D6\u3002")
                      ]),
                      createVNode("p", null, "\u5982\u9700\u4FEE\u6539\u5BC6\u94A5\u6216\u5B58\u50A8\u6876\uFF0C\u8BF7\u5728 Supabase Dashboard > Edge Functions > Secrets \u4E2D\u8BBE\u7F6E\u3002")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="env-list" data-v-475630d9${_scopeId}><h3 data-v-475630d9${_scopeId}>\u5F53\u524D\u73AF\u5883\u72B6\u6001</h3><div class="env-item" data-v-475630d9${_scopeId}><span class="label" data-v-475630d9${_scopeId}>Config Source:</span><span class="value" data-v-475630d9${_scopeId}>`);
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
            if ((_a = testResult.value) == null ? void 0 : _a.success) {
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
                  _push3(` \u6D4B\u8BD5\u8FDE\u63A5 `);
                } else {
                  return [
                    createTextVNode(" \u6D4B\u8BD5\u8FDE\u63A5 ")
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
              _push2(` \u8FDE\u63A5\u6210\u529F (Bucket: fantula2601) </span>`);
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
                  title: "\u914D\u7F6E\u5DF2\u6258\u7BA1",
                  type: "info",
                  closable: false,
                  "show-icon": "",
                  class: "mb-6"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "status-content" }, [
                      createVNode("p", null, [
                        createTextVNode("\u5F53\u524D R2 \u914D\u7F6E\u5DF2\u8FC1\u79FB\u81F3 "),
                        createVNode("strong", null, "Supabase Edge Function \u73AF\u5883\u53D8\u91CF"),
                        createTextVNode("\uFF0C\u4E0D\u518D\u4ECE\u6570\u636E\u5E93\u8BFB\u53D6\u3002")
                      ]),
                      createVNode("p", null, "\u5982\u9700\u4FEE\u6539\u5BC6\u94A5\u6216\u5B58\u50A8\u6876\uFF0C\u8BF7\u5728 Supabase Dashboard > Edge Functions > Secrets \u4E2D\u8BBE\u7F6E\u3002")
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "env-list" }, [
                  createVNode("h3", null, "\u5F53\u524D\u73AF\u5883\u72B6\u6001"),
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
                      ((_b = testResult.value) == null ? void 0 : _b.success) ? (openBlock(), createBlock(_component_el_tag, {
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
                      createTextVNode(" \u6D4B\u8BD5\u8FDE\u63A5 ")
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
                    createTextVNode(" \u8FDE\u63A5\u6210\u529F (Bucket: fantula2601) ")
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

export { storage as default };
//# sourceMappingURL=storage-CtG6TFXj.mjs.map
