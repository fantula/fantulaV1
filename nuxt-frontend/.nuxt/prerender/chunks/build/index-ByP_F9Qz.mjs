import { E as ElCard } from './index-D03GMqMv.mjs';
import { E as ElTag } from './index-CzsgKIaa.mjs';
import { E as ElDescriptions, a as ElDescriptionsItem } from './index-DmeqTz7s.mjs';
import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { E as ElDivider } from './index-BWwwK9Wh.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, ref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { aH as data_line_default, ao as files_default, s as service_default } from './index-DuV_oMrC.mjs';
import { P as PageTipHeader } from './PageTipHeader-Dofk1SFn.mjs';
import { g as getAdminSupabaseClient } from './supabase-admin-Yv96kmWU.mjs';
import { getEdgeFunctionsUrl, callEdgeFunction } from './supabase-jxF0-7J3.mjs';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { u as useSupabaseSession } from './useSupabaseSession-D0X5WUcm.mjs';
import './use-global-config-Dt87SALX.mjs';
import './index-xMedQC9S.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import './vnode-BKSxKQVt.mjs';
import './icon-CyvpkMdQ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-B4LZdJVK.mjs';
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

function useAdminSystemStatus() {
  const config = useRuntimeConfig();
  const session = useSupabaseSession();
  const isDev = true;
  const supabaseUrl = config.public.supabaseUrl;
  const edgeUrl = getEdgeFunctionsUrl();
  const dbStatus = ref({ type: "info", text: "Waiting..." });
  const r2Status = ref({ type: "info", text: "Waiting..." });
  const edgeStatus = ref({ type: "info", text: "Waiting..." });
  const checking = ref(false);
  const checkDb = async () => {
    try {
      const client = getAdminSupabaseClient();
      const { count, error } = await client.from("admin_users").select("*", { count: "exact", head: true });
      if (error) throw error;
      dbStatus.value = { type: "success", text: `Connected (Latency: OK)` };
    } catch (e) {
      dbStatus.value = { type: "danger", text: "Error: " + e.message };
    }
  };
  const checkR2 = async () => {
    var _a;
    try {
      const token = (_a = session.value) == null ? void 0 : _a.access_token;
      if (!token) {
        r2Status.value = { type: "warning", text: "Auth Token Missing" };
        return;
      }
      const res = await callEdgeFunction("test-r2-connection", { token });
      if (res.error) throw new Error(res.error);
      r2Status.value = { type: "success", text: "Connected" };
    } catch (e) {
      r2Status.value = { type: "danger", text: "Error: " + e.message };
    }
  };
  const checkEdge = async () => {
    if (edgeUrl && edgeUrl.startsWith("http")) {
      edgeStatus.value = { type: "success", text: "Configured" };
    } else {
      edgeStatus.value = { type: "warning", text: "Not Configured" };
    }
  };
  const checkAll = async () => {
    checking.value = true;
    dbStatus.value = { type: "info", text: "Checking..." };
    r2Status.value = { type: "info", text: "Checking..." };
    edgeStatus.value = { type: "info", text: "Checking..." };
    await Promise.all([checkDb(), checkR2(), checkEdge()]);
    checking.value = false;
  };
  return {
    isDev,
    supabaseUrl,
    edgeUrl,
    dbStatus,
    r2Status,
    edgeStatus,
    checking,
    checkAll,
    checkDb,
    checkR2,
    checkEdge
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      isDev,
      supabaseUrl,
      edgeUrl,
      dbStatus,
      r2Status,
      edgeStatus,
      checking,
      checkAll
    } = useAdminSystemStatus();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_tag = ElTag;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_divider = ElDivider;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-4980cd27>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u7CFB\u7EDF\u4FE1\u606F",
        description: "\u67E5\u770B\u5F53\u524D\u7CFB\u7EDF\u670D\u52A1\u8FD0\u884C\u72B6\u6001\u53CA\u73AF\u5883\u914D\u7F6E\u3002"
      }, null, _parent));
      _push(`<div class="settings-dashboard" data-v-4980cd27>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "mb-4"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-4980cd27${_scopeId}><span data-v-4980cd27${_scopeId}>\u7CFB\u7EDF\u4FE1\u606F</span>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: "success",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6B63\u5E38\u8FD0\u884C`);
                } else {
                  return [
                    createTextVNode("\u6B63\u5E38\u8FD0\u884C")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u7CFB\u7EDF\u4FE1\u606F"),
                createVNode(_component_el_tag, {
                  type: "success",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u6B63\u5E38\u8FD0\u884C")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_descriptions, {
              column: 2,
              border: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u5E94\u7528\u540D\u79F0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u51E1\u56FE\u62C9 Admin`);
                      } else {
                        return [
                          createTextVNode("\u51E1\u56FE\u62C9 Admin")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u5F53\u524D\u73AF\u5883" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(isDev) ? "Development" : "Production")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(isDev) ? "Development" : "Production"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "Supabase Url" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(supabaseUrl))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(supabaseUrl)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "Edge Functions" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(edgeUrl))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(edgeUrl)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_descriptions_item, { label: "\u5E94\u7528\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createTextVNode("\u51E1\u56FE\u62C9 Admin")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "\u5F53\u524D\u73AF\u5883" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isDev) ? "Development" : "Production"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "Supabase Url" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(supabaseUrl)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "Edge Functions" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(edgeUrl)), 1)
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
              createVNode(_component_el_descriptions, {
                column: 2,
                border: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_descriptions_item, { label: "\u5E94\u7528\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createTextVNode("\u51E1\u56FE\u62C9 Admin")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "\u5F53\u524D\u73AF\u5883" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(isDev) ? "Development" : "Production"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "Supabase Url" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(supabaseUrl)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "Edge Functions" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(edgeUrl)), 1)
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
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-4980cd27${_scopeId}><span data-v-4980cd27${_scopeId}>\u670D\u52A1\u8FDE\u901A\u6027\u68C0\u6D4B</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              size: "small",
              onClick: unref(checkAll),
              loading: unref(checking)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u91CD\u65B0\u68C0\u6D4B`);
                } else {
                  return [
                    createTextVNode("\u91CD\u65B0\u68C0\u6D4B")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u670D\u52A1\u8FDE\u901A\u6027\u68C0\u6D4B"),
                createVNode(_component_el_button, {
                  type: "primary",
                  size: "small",
                  onClick: unref(checkAll),
                  loading: unref(checking)
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u91CD\u65B0\u68C0\u6D4B")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="status-list" data-v-4980cd27${_scopeId}><div class="status-item" data-v-4980cd27${_scopeId}><div class="status-label" data-v-4980cd27${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(data_line_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(data_line_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` Database Connection </div><div class="status-value" data-v-4980cd27${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: unref(dbStatus).type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(dbStatus).text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(dbStatus).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_el_divider, {
              direction: "horizontal",
              style: { "margin": "12px 0" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="status-item" data-v-4980cd27${_scopeId}><div class="status-label" data-v-4980cd27${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(files_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(files_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` R2 Storage Connection </div><div class="status-value" data-v-4980cd27${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: unref(r2Status).type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(r2Status).text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(r2Status).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_el_divider, {
              direction: "horizontal",
              style: { "margin": "12px 0" }
            }, null, _parent2, _scopeId));
            _push2(`<div class="status-item" data-v-4980cd27${_scopeId}><div class="status-label" data-v-4980cd27${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(service_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(service_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` Edge Function (Hello) </div><div class="status-value" data-v-4980cd27${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: unref(edgeStatus).type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(edgeStatus).text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(edgeStatus).text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "status-list" }, [
                createVNode("div", { class: "status-item" }, [
                  createVNode("div", { class: "status-label" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(data_line_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" Database Connection ")
                  ]),
                  createVNode("div", { class: "status-value" }, [
                    createVNode(_component_el_tag, {
                      type: unref(dbStatus).type
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(dbStatus).text), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])
                  ])
                ]),
                createVNode(_component_el_divider, {
                  direction: "horizontal",
                  style: { "margin": "12px 0" }
                }),
                createVNode("div", { class: "status-item" }, [
                  createVNode("div", { class: "status-label" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(files_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" R2 Storage Connection ")
                  ]),
                  createVNode("div", { class: "status-value" }, [
                    createVNode(_component_el_tag, {
                      type: unref(r2Status).type
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(r2Status).text), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])
                  ])
                ]),
                createVNode(_component_el_divider, {
                  direction: "horizontal",
                  style: { "margin": "12px 0" }
                }),
                createVNode("div", { class: "status-item" }, [
                  createVNode("div", { class: "status-label" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(service_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" Edge Function (Hello) ")
                  ]),
                  createVNode("div", { class: "status-value" }, [
                    createVNode(_component_el_tag, {
                      type: unref(edgeStatus).type
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(edgeStatus).text), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4980cd27"]]);

export { index as default };
//# sourceMappingURL=index-ByP_F9Qz.mjs.map
