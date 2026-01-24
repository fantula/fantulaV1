import { E as ElRow, a as ElCol } from "./index-27bUWc4s.js";
import { E as ElCard } from "./index-9Hs_9io2.js";
import { _ as _export_sfc, E as ElIcon, aD as top_default, a0 as money_default, bk as goods_default, a4 as user_default } from "../server.mjs";
import { E as ElStatistic } from "./index-C-m_XO0-.js";
import { E as ElAlert } from "./index-DvOrIhmd.js";
/* empty css                */
/* empty css                 */
/* empty css                      */
/* empty css                  */
import { defineComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext, ref, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { E as ElSkeleton, a as ElSkeletonItem } from "./index-BXD0oWDt.js";
/* empty css                          */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "@vue/shared";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./vnode-D0IHQw_9.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminPageSkeleton",
  __ssrInlineRender: true,
  props: {
    type: { default: "list" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-skeleton" }, _attrs))} data-v-ee981c96><div class="skeleton-header" data-v-ee981c96>`);
      _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
        template: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-content" data-v-ee981c96${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h1",
              style: { "width": "150px", "height": "30px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "300px", "margin-top": "10px" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "header-content" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "h1",
                  style: { "width": "150px", "height": "30px" }
                }),
                createVNode(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "300px", "margin-top": "10px" }
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.type === "dashboard") {
        _push(`<div class="skeleton-dashboard" data-v-ee981c96>`);
        _push(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(4, (i) => {
                _push2(ssrRenderComponent(_component_el_col, {
                  span: 6,
                  key: i
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_skeleton, {
                        animated: "",
                        class: "skeleton-card"
                      }, {
                        template: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="card-mock" data-v-ee981c96${_scopeId3}><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" })}" data-v-ee981c96${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "80px" }
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_el_skeleton_item, {
                              variant: "circle",
                              style: { "width": "24px", "height": "24px" }
                            }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                            _push4(ssrRenderComponent(_component_el_skeleton_item, {
                              variant: "h3",
                              style: { "width": "100px", "height": "40px" }
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "60px", "margin-top": "5px" }
                            }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "card-mock" }, [
                                createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" } }, [
                                  createVNode(_component_el_skeleton_item, {
                                    variant: "text",
                                    style: { "width": "80px" }
                                  }),
                                  createVNode(_component_el_skeleton_item, {
                                    variant: "circle",
                                    style: { "width": "24px", "height": "24px" }
                                  })
                                ]),
                                createVNode(_component_el_skeleton_item, {
                                  variant: "h3",
                                  style: { "width": "100px", "height": "40px" }
                                }),
                                createVNode(_component_el_skeleton_item, {
                                  variant: "text",
                                  style: { "width": "60px", "margin-top": "5px" }
                                })
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_skeleton, {
                          animated: "",
                          class: "skeleton-card"
                        }, {
                          template: withCtx(() => [
                            createVNode("div", { class: "card-mock" }, [
                              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" } }, [
                                createVNode(_component_el_skeleton_item, {
                                  variant: "text",
                                  style: { "width": "80px" }
                                }),
                                createVNode(_component_el_skeleton_item, {
                                  variant: "circle",
                                  style: { "width": "24px", "height": "24px" }
                                })
                              ]),
                              createVNode(_component_el_skeleton_item, {
                                variant: "h3",
                                style: { "width": "100px", "height": "40px" }
                              }),
                              createVNode(_component_el_skeleton_item, {
                                variant: "text",
                                style: { "width": "60px", "margin-top": "5px" }
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                  return createVNode(_component_el_col, {
                    span: 6,
                    key: i
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_skeleton, {
                        animated: "",
                        class: "skeleton-card"
                      }, {
                        template: withCtx(() => [
                          createVNode("div", { class: "card-mock" }, [
                            createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" } }, [
                              createVNode(_component_el_skeleton_item, {
                                variant: "text",
                                style: { "width": "80px" }
                              }),
                              createVNode(_component_el_skeleton_item, {
                                variant: "circle",
                                style: { "width": "24px", "height": "24px" }
                              })
                            ]),
                            createVNode(_component_el_skeleton_item, {
                              variant: "h3",
                              style: { "width": "100px", "height": "40px" }
                            }),
                            createVNode(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "60px", "margin-top": "5px" }
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  });
                }), 64))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_row, {
          gutter: 20,
          style: { "margin-top": "24px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(2, (i) => {
                _push2(ssrRenderComponent(_component_el_col, {
                  span: 12,
                  key: i
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_skeleton, {
                        animated: "",
                        class: "skeleton-chart",
                        style: { "height": "300px" }
                      }, {
                        template: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_skeleton_item, {
                              variant: "image",
                              style: { "width": "100%", "height": "100%" }
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_skeleton_item, {
                                variant: "image",
                                style: { "width": "100%", "height": "100%" }
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_skeleton, {
                          animated: "",
                          class: "skeleton-chart",
                          style: { "height": "300px" }
                        }, {
                          template: withCtx(() => [
                            createVNode(_component_el_skeleton_item, {
                              variant: "image",
                              style: { "width": "100%", "height": "100%" }
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                  return createVNode(_component_el_col, {
                    span: 12,
                    key: i
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_skeleton, {
                        animated: "",
                        class: "skeleton-chart",
                        style: { "height": "300px" }
                      }, {
                        template: withCtx(() => [
                          createVNode(_component_el_skeleton_item, {
                            variant: "image",
                            style: { "width": "100%", "height": "100%" }
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  });
                }), 64))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="skeleton-list" data-v-ee981c96><div class="skeleton-actions" data-v-ee981c96>`);
        _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
          template: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "15px", "justify-content": "center" })}" data-v-ee981c96${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "100px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "120px" }
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { style: { "display": "flex", "gap": "15px", "justify-content": "center" } }, [
                  createVNode(_component_el_skeleton_item, {
                    variant: "button",
                    style: { "width": "100px" }
                  }),
                  createVNode(_component_el_skeleton_item, {
                    variant: "button",
                    style: { "width": "120px" }
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          animated: "",
          rows: 10
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminPageSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminPageSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ee981c96"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      const _component_el_statistic = ElStatistic;
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-page" }, _attrs))} data-v-0acc4c37><div class="page-header" data-v-0acc4c37><h2 data-v-0acc4c37>仪表盘</h2><p class="subtitle" data-v-0acc4c37>欢迎回到凡图拉后台管理系统</p></div>`);
      if (loading.value) {
        _push(ssrRenderComponent(AdminPageSkeleton, { type: "dashboard" }, null, _parent));
      } else {
        _push(`<div class="dashboard-content" data-v-0acc4c37>`);
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
                          _push4(`<div class="card-header" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>今日新增订单</span>`);
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
                          _push4(`<div class="metric-content" data-v-0acc4c37${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, { value: 128 }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-0acc4c37${_scopeId3}>昨日: 105</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, { value: 128 }),
                              createVNode("div", { class: "metric-sub" }, "昨日: 105")
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
                            createVNode(_component_el_statistic, { value: 128 }),
                            createVNode("div", { class: "metric-sub" }, "昨日: 105")
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
                          _push4(`<div class="card-header" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>今日营业额</span>`);
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
                          _push4(`<div class="metric-content" data-v-0acc4c37${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, {
                            value: 12880,
                            prefix: "¥",
                            precision: 2
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-0acc4c37${_scopeId3}>昨日: ¥11,200.00</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, {
                                value: 12880,
                                prefix: "¥",
                                precision: 2
                              }),
                              createVNode("div", { class: "metric-sub" }, "昨日: ¥11,200.00")
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
                              value: 12880,
                              prefix: "¥",
                              precision: 2
                            }),
                            createVNode("div", { class: "metric-sub" }, "昨日: ¥11,200.00")
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
                          _push4(`<div class="card-header" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>商品总数</span>`);
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
                          _push4(`<div class="metric-content" data-v-0acc4c37${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, { value: 356 }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-0acc4c37${_scopeId3}>上架中: 350</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, { value: 356 }),
                              createVNode("div", { class: "metric-sub" }, "上架中: 350")
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
                            createVNode(_component_el_statistic, { value: 356 }),
                            createVNode("div", { class: "metric-sub" }, "上架中: 350")
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
                          _push4(`<div class="card-header" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>今日新增用户</span>`);
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
                          _push4(`<div class="metric-content" data-v-0acc4c37${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_statistic, { value: 42 }, null, _parent4, _scopeId3));
                          _push4(`<div class="metric-sub" data-v-0acc4c37${_scopeId3}>本月: 1,204</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "metric-content" }, [
                              createVNode(_component_el_statistic, { value: 42 }),
                              createVNode("div", { class: "metric-sub" }, "本月: 1,204")
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
                            createVNode(_component_el_statistic, { value: 42 }),
                            createVNode("div", { class: "metric-sub" }, "本月: 1,204")
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
                          createVNode(_component_el_statistic, { value: 128 }),
                          createVNode("div", { class: "metric-sub" }, "昨日: 105")
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
                            value: 12880,
                            prefix: "¥",
                            precision: 2
                          }),
                          createVNode("div", { class: "metric-sub" }, "昨日: ¥11,200.00")
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
                          createVNode(_component_el_statistic, { value: 356 }),
                          createVNode("div", { class: "metric-sub" }, "上架中: 350")
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
                          createVNode(_component_el_statistic, { value: 42 }),
                          createVNode("div", { class: "metric-sub" }, "本月: 1,204")
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
                          _push4(`<div class="card-header" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>近7日订单趋势</span></div>`);
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
                          _push4(`<div class="chart-container" data-v-0acc4c37${_scopeId3}><svg viewBox="0 0 500 200" class="line-chart" data-v-0acc4c37${_scopeId3}><line x1="50" y1="150" x2="450" y2="150" stroke="#eee" data-v-0acc4c37${_scopeId3}></line><line x1="50" y1="100" x2="450" y2="100" stroke="#eee" data-v-0acc4c37${_scopeId3}></line><line x1="50" y1="50" x2="450" y2="50" stroke="#eee" data-v-0acc4c37${_scopeId3}></line><path d="M50,140 L116,120 L182,145 L248,80 L314,90 L380,40 L446,60" fill="none" stroke="#409EFF" stroke-width="3" data-v-0acc4c37${_scopeId3}></path><circle cx="50" cy="140" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="116" cy="120" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="182" cy="145" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="248" cy="80" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="314" cy="90" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="380" cy="40" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="446" cy="60" r="4" fill="#fff" stroke="#409EFF" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle></svg><div class="chart-labels" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>周一</span><span data-v-0acc4c37${_scopeId3}>周二</span><span data-v-0acc4c37${_scopeId3}>周三</span><span data-v-0acc4c37${_scopeId3}>周四</span><span data-v-0acc4c37${_scopeId3}>周五</span><span data-v-0acc4c37${_scopeId3}>周六</span><span data-v-0acc4c37${_scopeId3}>周日</span></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "chart-container" }, [
                              (openBlock(), createBlock("svg", {
                                viewBox: "0 0 500 200",
                                class: "line-chart"
                              }, [
                                createVNode("line", {
                                  x1: "50",
                                  y1: "150",
                                  x2: "450",
                                  y2: "150",
                                  stroke: "#eee"
                                }),
                                createVNode("line", {
                                  x1: "50",
                                  y1: "100",
                                  x2: "450",
                                  y2: "100",
                                  stroke: "#eee"
                                }),
                                createVNode("line", {
                                  x1: "50",
                                  y1: "50",
                                  x2: "450",
                                  y2: "50",
                                  stroke: "#eee"
                                }),
                                createVNode("path", {
                                  d: "M50,140 L116,120 L182,145 L248,80 L314,90 L380,40 L446,60",
                                  fill: "none",
                                  stroke: "#409EFF",
                                  "stroke-width": "3"
                                }),
                                createVNode("circle", {
                                  cx: "50",
                                  cy: "140",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "116",
                                  cy: "120",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "182",
                                  cy: "145",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "248",
                                  cy: "80",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "314",
                                  cy: "90",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "380",
                                  cy: "40",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "446",
                                  cy: "60",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#409EFF",
                                  "stroke-width": "2"
                                })
                              ])),
                              createVNode("div", { class: "chart-labels" }, [
                                createVNode("span", null, "周一"),
                                createVNode("span", null, "周二"),
                                createVNode("span", null, "周三"),
                                createVNode("span", null, "周四"),
                                createVNode("span", null, "周五"),
                                createVNode("span", null, "周六"),
                                createVNode("span", null, "周日")
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
                            (openBlock(), createBlock("svg", {
                              viewBox: "0 0 500 200",
                              class: "line-chart"
                            }, [
                              createVNode("line", {
                                x1: "50",
                                y1: "150",
                                x2: "450",
                                y2: "150",
                                stroke: "#eee"
                              }),
                              createVNode("line", {
                                x1: "50",
                                y1: "100",
                                x2: "450",
                                y2: "100",
                                stroke: "#eee"
                              }),
                              createVNode("line", {
                                x1: "50",
                                y1: "50",
                                x2: "450",
                                y2: "50",
                                stroke: "#eee"
                              }),
                              createVNode("path", {
                                d: "M50,140 L116,120 L182,145 L248,80 L314,90 L380,40 L446,60",
                                fill: "none",
                                stroke: "#409EFF",
                                "stroke-width": "3"
                              }),
                              createVNode("circle", {
                                cx: "50",
                                cy: "140",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "116",
                                cy: "120",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "182",
                                cy: "145",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "248",
                                cy: "80",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "314",
                                cy: "90",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "380",
                                cy: "40",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "446",
                                cy: "60",
                                r: "4",
                                fill: "#fff",
                                stroke: "#409EFF",
                                "stroke-width": "2"
                              })
                            ])),
                            createVNode("div", { class: "chart-labels" }, [
                              createVNode("span", null, "周一"),
                              createVNode("span", null, "周二"),
                              createVNode("span", null, "周三"),
                              createVNode("span", null, "周四"),
                              createVNode("span", null, "周五"),
                              createVNode("span", null, "周六"),
                              createVNode("span", null, "周日")
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
                          _push4(`<div class="card-header" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>近7日销售额趋势</span></div>`);
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
                          _push4(`<div class="chart-container" data-v-0acc4c37${_scopeId3}><svg viewBox="0 0 500 200" class="line-chart" data-v-0acc4c37${_scopeId3}><line x1="50" y1="150" x2="450" y2="150" stroke="#eee" data-v-0acc4c37${_scopeId3}></line><line x1="50" y1="100" x2="450" y2="100" stroke="#eee" data-v-0acc4c37${_scopeId3}></line><line x1="50" y1="50" x2="450" y2="50" stroke="#eee" data-v-0acc4c37${_scopeId3}></line><path d="M50,130 L116,140 L182,110 L248,100 L314,60 L380,50 L446,30" fill="none" stroke="#67C23A" stroke-width="3" data-v-0acc4c37${_scopeId3}></path><circle cx="50" cy="130" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="116" cy="140" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="182" cy="110" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="248" cy="100" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="314" cy="60" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="380" cy="50" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle><circle cx="446" cy="30" r="4" fill="#fff" stroke="#67C23A" stroke-width="2" data-v-0acc4c37${_scopeId3}></circle></svg><div class="chart-labels" data-v-0acc4c37${_scopeId3}><span data-v-0acc4c37${_scopeId3}>周一</span><span data-v-0acc4c37${_scopeId3}>周二</span><span data-v-0acc4c37${_scopeId3}>周三</span><span data-v-0acc4c37${_scopeId3}>周四</span><span data-v-0acc4c37${_scopeId3}>周五</span><span data-v-0acc4c37${_scopeId3}>周六</span><span data-v-0acc4c37${_scopeId3}>周日</span></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "chart-container" }, [
                              (openBlock(), createBlock("svg", {
                                viewBox: "0 0 500 200",
                                class: "line-chart"
                              }, [
                                createVNode("line", {
                                  x1: "50",
                                  y1: "150",
                                  x2: "450",
                                  y2: "150",
                                  stroke: "#eee"
                                }),
                                createVNode("line", {
                                  x1: "50",
                                  y1: "100",
                                  x2: "450",
                                  y2: "100",
                                  stroke: "#eee"
                                }),
                                createVNode("line", {
                                  x1: "50",
                                  y1: "50",
                                  x2: "450",
                                  y2: "50",
                                  stroke: "#eee"
                                }),
                                createVNode("path", {
                                  d: "M50,130 L116,140 L182,110 L248,100 L314,60 L380,50 L446,30",
                                  fill: "none",
                                  stroke: "#67C23A",
                                  "stroke-width": "3"
                                }),
                                createVNode("circle", {
                                  cx: "50",
                                  cy: "130",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "116",
                                  cy: "140",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "182",
                                  cy: "110",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "248",
                                  cy: "100",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "314",
                                  cy: "60",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "380",
                                  cy: "50",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                }),
                                createVNode("circle", {
                                  cx: "446",
                                  cy: "30",
                                  r: "4",
                                  fill: "#fff",
                                  stroke: "#67C23A",
                                  "stroke-width": "2"
                                })
                              ])),
                              createVNode("div", { class: "chart-labels" }, [
                                createVNode("span", null, "周一"),
                                createVNode("span", null, "周二"),
                                createVNode("span", null, "周三"),
                                createVNode("span", null, "周四"),
                                createVNode("span", null, "周五"),
                                createVNode("span", null, "周六"),
                                createVNode("span", null, "周日")
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
                            (openBlock(), createBlock("svg", {
                              viewBox: "0 0 500 200",
                              class: "line-chart"
                            }, [
                              createVNode("line", {
                                x1: "50",
                                y1: "150",
                                x2: "450",
                                y2: "150",
                                stroke: "#eee"
                              }),
                              createVNode("line", {
                                x1: "50",
                                y1: "100",
                                x2: "450",
                                y2: "100",
                                stroke: "#eee"
                              }),
                              createVNode("line", {
                                x1: "50",
                                y1: "50",
                                x2: "450",
                                y2: "50",
                                stroke: "#eee"
                              }),
                              createVNode("path", {
                                d: "M50,130 L116,140 L182,110 L248,100 L314,60 L380,50 L446,30",
                                fill: "none",
                                stroke: "#67C23A",
                                "stroke-width": "3"
                              }),
                              createVNode("circle", {
                                cx: "50",
                                cy: "130",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "116",
                                cy: "140",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "182",
                                cy: "110",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "248",
                                cy: "100",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "314",
                                cy: "60",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "380",
                                cy: "50",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              }),
                              createVNode("circle", {
                                cx: "446",
                                cy: "30",
                                r: "4",
                                fill: "#fff",
                                stroke: "#67C23A",
                                "stroke-width": "2"
                              })
                            ])),
                            createVNode("div", { class: "chart-labels" }, [
                              createVNode("span", null, "周一"),
                              createVNode("span", null, "周二"),
                              createVNode("span", null, "周三"),
                              createVNode("span", null, "周四"),
                              createVNode("span", null, "周五"),
                              createVNode("span", null, "周六"),
                              createVNode("span", null, "周日")
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
                          (openBlock(), createBlock("svg", {
                            viewBox: "0 0 500 200",
                            class: "line-chart"
                          }, [
                            createVNode("line", {
                              x1: "50",
                              y1: "150",
                              x2: "450",
                              y2: "150",
                              stroke: "#eee"
                            }),
                            createVNode("line", {
                              x1: "50",
                              y1: "100",
                              x2: "450",
                              y2: "100",
                              stroke: "#eee"
                            }),
                            createVNode("line", {
                              x1: "50",
                              y1: "50",
                              x2: "450",
                              y2: "50",
                              stroke: "#eee"
                            }),
                            createVNode("path", {
                              d: "M50,140 L116,120 L182,145 L248,80 L314,90 L380,40 L446,60",
                              fill: "none",
                              stroke: "#409EFF",
                              "stroke-width": "3"
                            }),
                            createVNode("circle", {
                              cx: "50",
                              cy: "140",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "116",
                              cy: "120",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "182",
                              cy: "145",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "248",
                              cy: "80",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "314",
                              cy: "90",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "380",
                              cy: "40",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "446",
                              cy: "60",
                              r: "4",
                              fill: "#fff",
                              stroke: "#409EFF",
                              "stroke-width": "2"
                            })
                          ])),
                          createVNode("div", { class: "chart-labels" }, [
                            createVNode("span", null, "周一"),
                            createVNode("span", null, "周二"),
                            createVNode("span", null, "周三"),
                            createVNode("span", null, "周四"),
                            createVNode("span", null, "周五"),
                            createVNode("span", null, "周六"),
                            createVNode("span", null, "周日")
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
                          (openBlock(), createBlock("svg", {
                            viewBox: "0 0 500 200",
                            class: "line-chart"
                          }, [
                            createVNode("line", {
                              x1: "50",
                              y1: "150",
                              x2: "450",
                              y2: "150",
                              stroke: "#eee"
                            }),
                            createVNode("line", {
                              x1: "50",
                              y1: "100",
                              x2: "450",
                              y2: "100",
                              stroke: "#eee"
                            }),
                            createVNode("line", {
                              x1: "50",
                              y1: "50",
                              x2: "450",
                              y2: "50",
                              stroke: "#eee"
                            }),
                            createVNode("path", {
                              d: "M50,130 L116,140 L182,110 L248,100 L314,60 L380,50 L446,30",
                              fill: "none",
                              stroke: "#67C23A",
                              "stroke-width": "3"
                            }),
                            createVNode("circle", {
                              cx: "50",
                              cy: "130",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "116",
                              cy: "140",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "182",
                              cy: "110",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "248",
                              cy: "100",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "314",
                              cy: "60",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "380",
                              cy: "50",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            }),
                            createVNode("circle", {
                              cx: "446",
                              cy: "30",
                              r: "4",
                              fill: "#fff",
                              stroke: "#67C23A",
                              "stroke-width": "2"
                            })
                          ])),
                          createVNode("div", { class: "chart-labels" }, [
                            createVNode("span", null, "周一"),
                            createVNode("span", null, "周二"),
                            createVNode("span", null, "周三"),
                            createVNode("span", null, "周四"),
                            createVNode("span", null, "周五"),
                            createVNode("span", null, "周六"),
                            createVNode("span", null, "周日")
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
        _push(`<div class="secondary-metrics" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-0acc4c37>`);
        _push(ssrRenderComponent(_component_el_alert, {
          title: "CDK 库存预警：部分热销商品 CDK 库存不足 10 个，请及时补货。",
          type: "warning",
          "show-icon": "",
          closable: false
        }, null, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0acc4c37"]]);
export {
  index as default
};
//# sourceMappingURL=index-6S3h3Htr.js.map
