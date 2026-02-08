import { E as ElCard } from "./index-DIUT_jMU.js";
import { E as ElTag } from "./index-CAqDGa72.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-ZZ4au9mU.js";
import { E as ElButton } from "./index-Cfk6gFRD.js";
import { E as ElIcon } from "./index-jl2vZbkg.js";
import { E as ElDivider } from "./index-sO8Yjc2X.js";
/* empty css              */
/* empty css                 */
/* empty css                */
/* empty css                              */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { aA as data_line_default, ae as files_default, s as service_default } from "./index-DlETah8a.js";
import { g as getAdminSupabaseClient } from "./supabase-admin-Yv96kmWU.js";
import { getEdgeFunctionsUrl, callEdgeFunction } from "./supabase-jxF0-7J3.js";
import { b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import { u as useSupabaseSession } from "./useSupabaseSession-D0X5WUcm.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-79yNXOXL.js";
import "./index-K5TIzHX_.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "./vnode-BKSxKQVt.js";
import "./icon-CK7WLSPl.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const isDev = process.env.NODE_ENV !== "production";
    const supabaseUrl = config.public.supabaseUrl;
    const edgeUrl = getEdgeFunctionsUrl();
    const session = useSupabaseSession();
    const dbStatus = ref({ type: "info", text: "Waiting..." });
    const r2Status = ref({ type: "info", text: "Waiting..." });
    const edgeStatus = ref({ type: "info", text: "Waiting..." });
    const checking = ref(false);
    const checkAll = async () => {
      checking.value = true;
      dbStatus.value = { type: "info", text: "Checking..." };
      r2Status.value = { type: "info", text: "Checking..." };
      edgeStatus.value = { type: "info", text: "Checking..." };
      await Promise.all([checkDb(), checkR2(), checkEdge()]);
      checking.value = false;
    };
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
      try {
        const token = session.value?.access_token;
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_tag = ElTag;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_divider = ElDivider;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-dashboard" }, _attrs))} data-v-5eef87d0>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "mb-4"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-5eef87d0${_scopeId}><span data-v-5eef87d0${_scopeId}>系统信息</span>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: "success",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`正常运行`);
                } else {
                  return [
                    createTextVNode("正常运行")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "系统信息"),
                createVNode(_component_el_tag, {
                  type: "success",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode("正常运行")
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
                  _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "应用名称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`凡图拉 Admin`);
                      } else {
                        return [
                          createTextVNode("凡图拉 Admin")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "当前环境" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(isDev ? "Development" : "Production")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(isDev ? "Development" : "Production"), 1)
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
                    createVNode(_component_el_descriptions_item, { label: "应用名称" }, {
                      default: withCtx(() => [
                        createTextVNode("凡图拉 Admin")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "当前环境" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(isDev ? "Development" : "Production"), 1)
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
                  createVNode(_component_el_descriptions_item, { label: "应用名称" }, {
                    default: withCtx(() => [
                      createTextVNode("凡图拉 Admin")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "当前环境" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(isDev ? "Development" : "Production"), 1)
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
            _push2(`<div class="card-header" data-v-5eef87d0${_scopeId}><span data-v-5eef87d0${_scopeId}>服务连通性检测</span>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              size: "small",
              onClick: checkAll,
              loading: checking.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`重新检测`);
                } else {
                  return [
                    createTextVNode("重新检测")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "服务连通性检测"),
                createVNode(_component_el_button, {
                  type: "primary",
                  size: "small",
                  onClick: checkAll,
                  loading: checking.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("重新检测")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="status-list" data-v-5eef87d0${_scopeId}><div class="status-item" data-v-5eef87d0${_scopeId}><div class="status-label" data-v-5eef87d0${_scopeId}>`);
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
            _push2(` Database Connection </div><div class="status-value" data-v-5eef87d0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: dbStatus.value.type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(dbStatus.value.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(dbStatus.value.text), 1)
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
            _push2(`<div class="status-item" data-v-5eef87d0${_scopeId}><div class="status-label" data-v-5eef87d0${_scopeId}>`);
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
            _push2(` R2 Storage Connection </div><div class="status-value" data-v-5eef87d0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: r2Status.value.type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(r2Status.value.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(r2Status.value.text), 1)
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
            _push2(`<div class="status-item" data-v-5eef87d0${_scopeId}><div class="status-label" data-v-5eef87d0${_scopeId}>`);
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
            _push2(` Edge Function (Hello) </div><div class="status-value" data-v-5eef87d0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: edgeStatus.value.type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(edgeStatus.value.text)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(edgeStatus.value.text), 1)
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
                      type: dbStatus.value.type
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(dbStatus.value.text), 1)
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
                      type: r2Status.value.type
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(r2Status.value.text), 1)
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
                      type: edgeStatus.value.type
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(edgeStatus.value.text), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5eef87d0"]]);
export {
  index as default
};
//# sourceMappingURL=index-DewPmL-Y.js.map
