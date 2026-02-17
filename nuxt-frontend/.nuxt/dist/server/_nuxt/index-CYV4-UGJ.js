import { E as ElRow, a as ElCol } from "./index-9Sj60IxL.js";
import { E as ElCard } from "./index-Cx5gKxG7.js";
import { E as ElIcon } from "./index-C4aUwruK.js";
import { E as ElStatistic } from "./index-Czr0kgZJ.js";
import { E as ElAlert } from "./index-BkMjcDuB.js";
/* empty css              */
/* empty css                */
/* empty css                 */
/* empty css                      */
/* empty css                  */
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { Y as top_default, t as money_default, as as goods_default, B as user_default } from "./index-CCIZH4aC.js";
import { _ as __nuxt_component_3 } from "./AdminPageSkeleton-DaUkIwpw.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./typescript-D6L75muK.js";
import "./use-global-config-CaR6i8cb.js";
import "./index-C1njJNPQ.js";
import "./objects-Bz74KHmq.js";
import "@vueuse/core";
import "./icon-CadSVx0p.js";
import "./vnode-uc6o_sOa.js";
import "./index-BSkMD3ma.js";
/* empty css                     */
/* empty css                          */
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
    const maxOrderCount = computed(() => {
      if (!stats.value.order_trend.length) return 10;
      return Math.max(...stats.value.order_trend.map((i) => i.count)) || 10;
    });
    const maxSalesAmount = computed(() => {
      if (!stats.value.sales_trend.length) return 100;
      return Math.max(...stats.value.sales_trend.map((i) => i.amount)) || 100;
    });
    const calculatePercent = (val, max) => {
      if (max === 0) return 0;
      return Math.min(100, val / max * 100);
    };
    const formatDate = (dateStr) => {
      const d = new Date(dateStr);
      return `${d.getMonth() + 1}-${d.getDate()}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      const _component_el_statistic = ElStatistic;
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-page" }, _attrs))} data-v-13499724><div class="page-header" data-v-13499724><h2 data-v-13499724>仪表盘</h2><p class="subtitle" data-v-13499724>欢迎回到凡图拉后台管理系统</p></div>`);
      if (loading.value) {
        _push(ssrRenderComponent(__nuxt_component_3, { type: "dashboard" }, null, _parent));
      } else {
        _push(`<div class="dashboard-content" data-v-13499724>`);
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
                          _push4(`<div class="card-header" data-v-13499724${_scopeId3}><span data-v-13499724${_scopeId3}>今日新增订单</span>`);
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
                              createVNode("span", null, "今日新增订单"),
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
                          _push4(`<div class="metric-content" data-v-13499724${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.today_orders
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-13499724${_scopeId3}>昨日: ${ssrInterpolate(stats.value.yesterday_orders)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.today_orders
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "昨日: " + toDisplayString(stats.value.yesterday_orders), 1)
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
                            createVNode("span", null, "今日新增订单"),
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
                            createVNode("div", { class: "metric-sub" }, "昨日: " + toDisplayString(stats.value.yesterday_orders), 1)
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
                          _push4(`<div class="card-header" data-v-13499724${_scopeId3}><span data-v-13499724${_scopeId3}>今日营业额</span>`);
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
                              createVNode("span", null, "今日营业额"),
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
                          _push4(`<div class="metric-content" data-v-13499724${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.today_sales,
                            prefix: "¥",
                            precision: 2
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-13499724${_scopeId3}>昨日: ¥${ssrInterpolate(Number(stats.value.yesterday_sales).toFixed(2))}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.today_sales,
                                prefix: "¥",
                                precision: 2
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "昨日: ¥" + toDisplayString(Number(stats.value.yesterday_sales).toFixed(2)), 1)
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
                            createVNode("span", null, "今日营业额"),
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
                              prefix: "¥",
                              precision: 2
                            }, null, 8, ["value"]),
                            createVNode("div", { class: "metric-sub" }, "昨日: ¥" + toDisplayString(Number(stats.value.yesterday_sales).toFixed(2)), 1)
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
                          _push4(`<div class="card-header" data-v-13499724${_scopeId3}><span data-v-13499724${_scopeId3}>商品总数</span>`);
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
                              createVNode("span", null, "商品总数"),
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
                          _push4(`<div class="metric-content" data-v-13499724${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.total_products
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-13499724${_scopeId3}>上架中: ${ssrInterpolate(stats.value.active_products)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.total_products
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "上架中: " + toDisplayString(stats.value.active_products), 1)
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
                            createVNode("span", null, "商品总数"),
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
                            createVNode("div", { class: "metric-sub" }, "上架中: " + toDisplayString(stats.value.active_products), 1)
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
                          _push4(`<div class="card-header" data-v-13499724${_scopeId3}><span data-v-13499724${_scopeId3}>今日新增用户</span>`);
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
                              createVNode("span", null, "今日新增用户"),
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
                          _push4(`<div class="metric-content" data-v-13499724${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: stats.value.today_new_users
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-13499724${_scopeId3}>本月: ${ssrInterpolate(stats.value.month_new_users)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: stats.value.today_new_users
                              }, null, 8, ["value"]),
                              createVNode("div", { class: "metric-sub" }, "本月: " + toDisplayString(stats.value.month_new_users), 1)
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
                            createVNode("span", null, "今日新增用户"),
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
                            createVNode("div", { class: "metric-sub" }, "本月: " + toDisplayString(stats.value.month_new_users), 1)
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
                          createVNode("span", null, "今日新增订单"),
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
                          createVNode("div", { class: "metric-sub" }, "昨日: " + toDisplayString(stats.value.yesterday_orders), 1)
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
                          createVNode("span", null, "今日营业额"),
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
                            prefix: "¥",
                            precision: 2
                          }, null, 8, ["value"]),
                          createVNode("div", { class: "metric-sub" }, "昨日: ¥" + toDisplayString(Number(stats.value.yesterday_sales).toFixed(2)), 1)
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
                          createVNode("span", null, "商品总数"),
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
                          createVNode("div", { class: "metric-sub" }, "上架中: " + toDisplayString(stats.value.active_products), 1)
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
                          createVNode("span", null, "今日新增用户"),
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
                          createVNode("div", { class: "metric-sub" }, "本月: " + toDisplayString(stats.value.month_new_users), 1)
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
                          _push4(`<div class="card-header" data-v-13499724${_scopeId3}><span data-v-13499724${_scopeId3}>近7日订单趋势</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "近7日订单趋势")
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="chart-container" data-v-13499724${_scopeId3}><div class="chart-wrapper" data-v-13499724${_scopeId3}><div class="simple-bar-chart" data-v-13499724${_scopeId3}><!--[-->`);
                          ssrRenderList(stats.value.order_trend, (item, index2) => {
                            _push4(`<div class="bar-group" data-v-13499724${_scopeId3}><div class="bar-col" data-v-13499724${_scopeId3}><div class="bar-val" data-v-13499724${_scopeId3}>${ssrInterpolate(item.count)}</div><div class="bar-fill" style="${ssrRenderStyle({ height: `${calculatePercent(item.count, maxOrderCount.value)}%` })}" data-v-13499724${_scopeId3}></div></div><div class="bar-label" data-v-13499724${_scopeId3}>${ssrInterpolate(formatDate(item.date))}</div></div>`);
                          });
                          _push4(`<!--]--></div></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "chart-container" }, [
                              createVNode("div", { class: "chart-wrapper" }, [
                                createVNode("div", { class: "simple-bar-chart" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(stats.value.order_trend, (item, index2) => {
                                    return openBlock(), createBlock("div", {
                                      key: index2,
                                      class: "bar-group"
                                    }, [
                                      createVNode("div", { class: "bar-col" }, [
                                        createVNode("div", { class: "bar-val" }, toDisplayString(item.count), 1),
                                        createVNode("div", {
                                          class: "bar-fill",
                                          style: { height: `${calculatePercent(item.count, maxOrderCount.value)}%` }
                                        }, null, 4)
                                      ]),
                                      createVNode("div", { class: "bar-label" }, toDisplayString(formatDate(item.date)), 1)
                                    ]);
                                  }), 128))
                                ])
                              ])
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
                            createVNode("span", null, "近7日订单趋势")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "chart-container" }, [
                            createVNode("div", { class: "chart-wrapper" }, [
                              createVNode("div", { class: "simple-bar-chart" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(stats.value.order_trend, (item, index2) => {
                                  return openBlock(), createBlock("div", {
                                    key: index2,
                                    class: "bar-group"
                                  }, [
                                    createVNode("div", { class: "bar-col" }, [
                                      createVNode("div", { class: "bar-val" }, toDisplayString(item.count), 1),
                                      createVNode("div", {
                                        class: "bar-fill",
                                        style: { height: `${calculatePercent(item.count, maxOrderCount.value)}%` }
                                      }, null, 4)
                                    ]),
                                    createVNode("div", { class: "bar-label" }, toDisplayString(formatDate(item.date)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])
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
                          _push4(`<div class="card-header" data-v-13499724${_scopeId3}><span data-v-13499724${_scopeId3}>近7日销售额趋势</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "card-header" }, [
                              createVNode("span", null, "近7日销售额趋势")
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="chart-container" data-v-13499724${_scopeId3}><div class="chart-wrapper" data-v-13499724${_scopeId3}><div class="simple-bar-chart sales" data-v-13499724${_scopeId3}><!--[-->`);
                          ssrRenderList(stats.value.sales_trend, (item, index2) => {
                            _push4(`<div class="bar-group" data-v-13499724${_scopeId3}><div class="bar-col" data-v-13499724${_scopeId3}><div class="bar-val" data-v-13499724${_scopeId3}>¥${ssrInterpolate(item.amount)}</div><div class="bar-fill" style="${ssrRenderStyle({ height: `${calculatePercent(item.amount, maxSalesAmount.value)}%` })}" data-v-13499724${_scopeId3}></div></div><div class="bar-label" data-v-13499724${_scopeId3}>${ssrInterpolate(formatDate(item.date))}</div></div>`);
                          });
                          _push4(`<!--]--></div></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "chart-container" }, [
                              createVNode("div", { class: "chart-wrapper" }, [
                                createVNode("div", { class: "simple-bar-chart sales" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(stats.value.sales_trend, (item, index2) => {
                                    return openBlock(), createBlock("div", {
                                      key: index2,
                                      class: "bar-group"
                                    }, [
                                      createVNode("div", { class: "bar-col" }, [
                                        createVNode("div", { class: "bar-val" }, "¥" + toDisplayString(item.amount), 1),
                                        createVNode("div", {
                                          class: "bar-fill",
                                          style: { height: `${calculatePercent(item.amount, maxSalesAmount.value)}%` }
                                        }, null, 4)
                                      ]),
                                      createVNode("div", { class: "bar-label" }, toDisplayString(formatDate(item.date)), 1)
                                    ]);
                                  }), 128))
                                ])
                              ])
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
                            createVNode("span", null, "近7日销售额趋势")
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "chart-container" }, [
                            createVNode("div", { class: "chart-wrapper" }, [
                              createVNode("div", { class: "simple-bar-chart sales" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(stats.value.sales_trend, (item, index2) => {
                                  return openBlock(), createBlock("div", {
                                    key: index2,
                                    class: "bar-group"
                                  }, [
                                    createVNode("div", { class: "bar-col" }, [
                                      createVNode("div", { class: "bar-val" }, "¥" + toDisplayString(item.amount), 1),
                                      createVNode("div", {
                                        class: "bar-fill",
                                        style: { height: `${calculatePercent(item.amount, maxSalesAmount.value)}%` }
                                      }, null, 4)
                                    ]),
                                    createVNode("div", { class: "bar-label" }, toDisplayString(formatDate(item.date)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])
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
                          createVNode("span", null, "近7日订单趋势")
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "chart-container" }, [
                          createVNode("div", { class: "chart-wrapper" }, [
                            createVNode("div", { class: "simple-bar-chart" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(stats.value.order_trend, (item, index2) => {
                                return openBlock(), createBlock("div", {
                                  key: index2,
                                  class: "bar-group"
                                }, [
                                  createVNode("div", { class: "bar-col" }, [
                                    createVNode("div", { class: "bar-val" }, toDisplayString(item.count), 1),
                                    createVNode("div", {
                                      class: "bar-fill",
                                      style: { height: `${calculatePercent(item.count, maxOrderCount.value)}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("div", { class: "bar-label" }, toDisplayString(formatDate(item.date)), 1)
                                ]);
                              }), 128))
                            ])
                          ])
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
                          createVNode("span", null, "近7日销售额趋势")
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "chart-container" }, [
                          createVNode("div", { class: "chart-wrapper" }, [
                            createVNode("div", { class: "simple-bar-chart sales" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(stats.value.sales_trend, (item, index2) => {
                                return openBlock(), createBlock("div", {
                                  key: index2,
                                  class: "bar-group"
                                }, [
                                  createVNode("div", { class: "bar-col" }, [
                                    createVNode("div", { class: "bar-val" }, "¥" + toDisplayString(item.amount), 1),
                                    createVNode("div", {
                                      class: "bar-fill",
                                      style: { height: `${calculatePercent(item.amount, maxSalesAmount.value)}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("div", { class: "bar-label" }, toDisplayString(formatDate(item.date)), 1)
                                ]);
                              }), 128))
                            ])
                          ])
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
        _push(`<div class="secondary-metrics" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-13499724>`);
        if (stats.value.cdk_warning_count > 0) {
          _push(ssrRenderComponent(_component_el_alert, {
            title: `CDK 库存预警：有 ${stats.value.cdk_warning_count} 个热销商品 CDK 库存不足 10 个，请及时补货。`,
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-13499724"]]);
export {
  index as default
};
//# sourceMappingURL=index-CYV4-UGJ.js.map
