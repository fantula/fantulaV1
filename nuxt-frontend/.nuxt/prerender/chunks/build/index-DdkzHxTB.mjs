import { E as ElRow, a as ElCol } from './index-CxNi_TTV.mjs';
import { E as ElCard } from './index-3ZCjTsJa.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';
import { E as ElStatistic } from './index-CUDgsolk.mjs';
import { E as ElAlert } from './index-BC7fiCUI.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, unref, computed, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { Y as top_default, t as money_default, as as goods_default, B as user_default } from './index-DNnPa_Q9.mjs';
import { A as AdminPageSkeleton } from './AdminPageSkeleton-BiQGseeS.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './typescript-D6L75muK.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './index-DbvZsXcZ.mjs';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './icon-Ck0_dGQP.mjs';
import './vnode-uc6o_sOa.mjs';
import './index-Buprbscf.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminSimpleChart",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    valueKey: {
      type: String,
      default: "count"
    },
    labelKey: {
      type: String,
      default: "date"
    },
    valuePrefix: {
      type: String,
      default: ""
    },
    isSales: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const maxValue = computed(() => {
      if (!props.data.length) return 10;
      const values = props.data.map((item) => Number(item[props.valueKey]) || 0);
      return Math.max(...values) || (props.isSales ? 100 : 10);
    });
    const calculatePercent = (val) => {
      if (maxValue.value === 0) return 0;
      return Math.min(100, val / maxValue.value * 100);
    };
    const formatDate = (dateStr) => {
      try {
        const d = new Date(dateStr);
        return `${d.getMonth() + 1}-${d.getDate()}`;
      } catch {
        return dateStr;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-wrapper" }, _attrs))} data-v-b2910f01><div class="${ssrRenderClass([{ "is-sales": __props.isSales }, "simple-bar-chart"])}" data-v-b2910f01><!--[-->`);
      ssrRenderList(__props.data, (item, index2) => {
        _push(`<div class="bar-group" data-v-b2910f01><div class="bar-col" data-v-b2910f01><div class="bar-val" data-v-b2910f01>`);
        if (__props.valuePrefix) {
          _push(`<!--[-->${ssrInterpolate(__props.valuePrefix)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`${ssrInterpolate(item[__props.valueKey])}</div><div class="bar-fill" style="${ssrRenderStyle({ height: `${calculatePercent(item[__props.valueKey])}%` })}"${ssrRenderAttr("title", `${item[__props.labelKey]}: ${__props.valuePrefix || ""}${item[__props.valueKey]}`)} data-v-b2910f01></div></div><div class="bar-label" data-v-b2910f01>${ssrInterpolate(formatDate(item[__props.labelKey]))}</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminSimpleChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminSimpleChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b2910f01"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const stats = ref({
      today_orders: 0,
      yesterday_orders: 0,
      today_sales: 0,
      yesterday_sales: 0,
      total_products: 0,
      active_products: 0,
      today_new_users: 0,
      month_new_users: 0,
      cdk_warning_count: 0,
      order_trend: [],
      sales_trend: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      const _component_el_statistic = ElStatistic;
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-page" }, _attrs))} data-v-c919be4b><div class="page-header" data-v-c919be4b><h2 data-v-c919be4b>\u4EEA\u8868\u76D8</h2><p class="subtitle" data-v-c919be4b>\u6B22\u8FCE\u56DE\u5230\u51E1\u56FE\u62C9\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF</p></div>`);
      if (loading.value) {
        _push(ssrRenderComponent(AdminPageSkeleton, { type: "dashboard" }, null, _parent));
      } else {
        _push(`<div class="dashboard-content" data-v-c919be4b>`);
        _push(ssrRenderComponent(_component_el_row, {
          gutter: 20,
          class: "metric-row"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="card-header" data-v-c919be4b${_scopeId3}><span data-v-c919be4b${_scopeId3}>\u4ECA\u65E5\u65B0\u589E\u8BA2\u5355</span>`);
                          _push4(ssrRenderComponent(_component_el_icon, { class: "icon-increase" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(top_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(top_default))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "\u4ECA\u65E5\u65B0\u589E\u8BA2\u5355"),
                              createVNode(_component_el_icon, { class: "icon-increase" }, {
                                default: withCtx(() => [
                                  createVNode(unref(top_default))
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="metric-content" data-v-c919be4b${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.today_orders
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-c919be4b${_scopeId3}>\u6628\u65E5: ${ssrInterpolate(stats.value.yesterday_orders)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.today_orders
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "\u6628\u65E5: " + toDisplayString(stats.value.yesterday_orders), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "metric-card"
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u4ECA\u65E5\u65B0\u589E\u8BA2\u5355"),
                            createVNode(_component_el_icon, { class: "icon-increase" }, {
                              default: withCtx(() => [
                                createVNode(unref(top_default))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "metric-content" }, [
                            createVNode(_component_el_statistic, {
                              value: stats.value.today_orders
                            }, null, 8, ["value"]),
                            createVNode("div", { class: "metric-sub" }, "\u6628\u65E5: " + toDisplayString(stats.value.yesterday_orders), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="card-header" data-v-c919be4b${_scopeId3}><span data-v-c919be4b${_scopeId3}>\u4ECA\u65E5\u8425\u4E1A\u989D</span>`);
                          _push4(ssrRenderComponent(_component_el_icon, { class: "icon-money" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(money_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(money_default))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "\u4ECA\u65E5\u8425\u4E1A\u989D"),
                              createVNode(_component_el_icon, { class: "icon-money" }, {
                                default: withCtx(() => [
                                  createVNode(unref(money_default))
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="metric-content" data-v-c919be4b${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.today_sales,
                            prefix: "\xA5",
                            precision: 2
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-c919be4b${_scopeId3}>\u6628\u65E5: \xA5${ssrInterpolate(Number(stats.value.yesterday_sales).toFixed(2))}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.today_sales,
                                prefix: "\xA5",
                                precision: 2
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "\u6628\u65E5: \xA5" + toDisplayString(Number(stats.value.yesterday_sales).toFixed(2)), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "metric-card"
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u4ECA\u65E5\u8425\u4E1A\u989D"),
                            createVNode(_component_el_icon, { class: "icon-money" }, {
                              default: withCtx(() => [
                                createVNode(unref(money_default))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "metric-content" }, [
                            createVNode(_component_el_statistic, {
                              value: stats.value.today_sales,
                              prefix: "\xA5",
                              precision: 2
                            }, null, 8, ["value"]),
                            createVNode("div", { class: "metric-sub" }, "\u6628\u65E5: \xA5" + toDisplayString(Number(stats.value.yesterday_sales).toFixed(2)), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="card-header" data-v-c919be4b${_scopeId3}><span data-v-c919be4b${_scopeId3}>\u5546\u54C1\u603B\u6570</span>`);
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(goods_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(goods_default))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "\u5546\u54C1\u603B\u6570"),
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(goods_default))
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="metric-content" data-v-c919be4b${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.total_products
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-c919be4b${_scopeId3}>\u4E0A\u67B6\u4E2D: ${ssrInterpolate(stats.value.active_products)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.total_products
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "\u4E0A\u67B6\u4E2D: " + toDisplayString(stats.value.active_products), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "metric-card"
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u5546\u54C1\u603B\u6570"),
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(goods_default))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "metric-content" }, [
                            createVNode(_component_el_statistic, {
                              value: stats.value.total_products
                            }, null, 8, ["value"]),
                            createVNode("div", { class: "metric-sub" }, "\u4E0A\u67B6\u4E2D: " + toDisplayString(stats.value.active_products), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="card-header" data-v-c919be4b${_scopeId3}><span data-v-c919be4b${_scopeId3}>\u4ECA\u65E5\u65B0\u589E\u7528\u6237</span>`);
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(user_default), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(user_default))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "\u4ECA\u65E5\u65B0\u589E\u7528\u6237"),
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(user_default))
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="metric-content" data-v-c919be4b${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.today_new_users
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-c919be4b${_scopeId3}>\u672C\u6708: ${ssrInterpolate(stats.value.month_new_users)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.today_new_users
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "\u672C\u6708: " + toDisplayString(stats.value.month_new_users), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "metric-card"
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u4ECA\u65E5\u65B0\u589E\u7528\u6237"),
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(user_default))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "metric-content" }, [
                            createVNode(_component_el_statistic, {
                              value: stats.value.today_new_users
                            }, null, 8, ["value"]),
                            createVNode("div", { class: "metric-sub" }, "\u672C\u6708: " + toDisplayString(stats.value.month_new_users), 1)
                          ])
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
                createVNode(_component_el_col, { span: 6 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u4ECA\u65E5\u65B0\u589E\u8BA2\u5355"),
                          createVNode(_component_el_icon, { class: "icon-increase" }, {
                            default: withCtx(() => [
                              createVNode(unref(top_default))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "metric-content" }, [
                          createVNode(_component_el_statistic, {
                            value: stats.value.today_orders
                          }, null, 8, ["value"]),
                          createVNode("div", { class: "metric-sub" }, "\u6628\u65E5: " + toDisplayString(stats.value.yesterday_orders), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_col, { span: 6 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u4ECA\u65E5\u8425\u4E1A\u989D"),
                          createVNode(_component_el_icon, { class: "icon-money" }, {
                            default: withCtx(() => [
                              createVNode(unref(money_default))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "metric-content" }, [
                          createVNode(_component_el_statistic, {
                            value: stats.value.today_sales,
                            prefix: "\xA5",
                            precision: 2
                          }, null, 8, ["value"]),
                          createVNode("div", { class: "metric-sub" }, "\u6628\u65E5: \xA5" + toDisplayString(Number(stats.value.yesterday_sales).toFixed(2)), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_col, { span: 6 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u5546\u54C1\u603B\u6570"),
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(goods_default))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "metric-content" }, [
                          createVNode(_component_el_statistic, {
                            value: stats.value.total_products
                          }, null, 8, ["value"]),
                          createVNode("div", { class: "metric-sub" }, "\u4E0A\u67B6\u4E2D: " + toDisplayString(stats.value.active_products), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_col, { span: 6 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "metric-card"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u4ECA\u65E5\u65B0\u589E\u7528\u6237"),
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(user_default))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "metric-content" }, [
                          createVNode(_component_el_statistic, {
                            value: stats.value.today_new_users
                          }, null, 8, ["value"]),
                          createVNode("div", { class: "metric-sub" }, "\u672C\u6708: " + toDisplayString(stats.value.month_new_users), 1)
                        ])
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
        _push(ssrRenderComponent(_component_el_row, {
          gutter: 20,
          class: "chart-row"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "chart-card"
                    }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="card-header" data-v-c919be4b${_scopeId3}><span data-v-c919be4b${_scopeId3}>\u8FD17\u65E5\u8BA2\u5355\u8D8B\u52BF</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "\u8FD17\u65E5\u8BA2\u5355\u8D8B\u52BF")
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="chart-container" data-v-c919be4b${_scopeId3}>`);
                          _push4(ssrRenderComponent(AdminSimpleChart, {
                            data: stats.value.order_trend,
                            "value-key": "count",
                            "label-key": "date"
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "chart-container" }, [
                              createVNode(AdminSimpleChart, {
                                data: stats.value.order_trend,
                                "value-key": "count",
                                "label-key": "date"
                              }, null, 8, ["data"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "chart-card"
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u8FD17\u65E5\u8BA2\u5355\u8D8B\u52BF")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "chart-container" }, [
                            createVNode(AdminSimpleChart, {
                              data: stats.value.order_trend,
                              "value-key": "count",
                              "label-key": "date"
                            }, null, 8, ["data"])
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "chart-card"
                    }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="card-header" data-v-c919be4b${_scopeId3}><span data-v-c919be4b${_scopeId3}>\u8FD17\u65E5\u9500\u552E\u989D\u8D8B\u52BF</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "\u8FD17\u65E5\u9500\u552E\u989D\u8D8B\u52BF")
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="chart-container" data-v-c919be4b${_scopeId3}>`);
                          _push4(ssrRenderComponent(AdminSimpleChart, {
                            data: stats.value.sales_trend,
                            "value-key": "amount",
                            "label-key": "date",
                            "value-prefix": "\xA5",
                            "is-sales": ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "chart-container" }, [
                              createVNode(AdminSimpleChart, {
                                data: stats.value.sales_trend,
                                "value-key": "amount",
                                "label-key": "date",
                                "value-prefix": "\xA5",
                                "is-sales": ""
                              }, null, 8, ["data"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "chart-card"
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u8FD17\u65E5\u9500\u552E\u989D\u8D8B\u52BF")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "chart-container" }, [
                            createVNode(AdminSimpleChart, {
                              data: stats.value.sales_trend,
                              "value-key": "amount",
                              "label-key": "date",
                              "value-prefix": "\xA5",
                              "is-sales": ""
                            }, null, 8, ["data"])
                          ])
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
                createVNode(_component_el_col, { span: 12 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "chart-card"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u8FD17\u65E5\u8BA2\u5355\u8D8B\u52BF")
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "chart-container" }, [
                          createVNode(AdminSimpleChart, {
                            data: stats.value.order_trend,
                            "value-key": "count",
                            "label-key": "date"
                          }, null, 8, ["data"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_col, { span: 12 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "chart-card"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u8FD17\u65E5\u9500\u552E\u989D\u8D8B\u52BF")
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "chart-container" }, [
                          createVNode(AdminSimpleChart, {
                            data: stats.value.sales_trend,
                            "value-key": "amount",
                            "label-key": "date",
                            "value-prefix": "\xA5",
                            "is-sales": ""
                          }, null, 8, ["data"])
                        ])
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
        _push(`<div class="secondary-metrics" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-c919be4b>`);
        if (stats.value.cdk_warning_count > 0) {
          _push(ssrRenderComponent(_component_el_alert, {
            title: `CDK \u5E93\u5B58\u9884\u8B66\uFF1A\u6709 ${stats.value.cdk_warning_count} \u4E2A\u70ED\u9500\u5546\u54C1 CDK \u5E93\u5B58\u4E0D\u8DB3 10 \u4E2A\uFF0C\u8BF7\u53CA\u65F6\u8865\u8D27\u3002`,
            type: "warning",
            "show-icon": "",
            closable: false
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c919be4b"]]);

export { index as default };
//# sourceMappingURL=index-DdkzHxTB.mjs.map
