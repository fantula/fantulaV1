import { E as ElSkeleton, a as ElSkeletonItem } from "./index-BSkMD3ma.js";
import { E as ElRow, a as ElCol } from "./index-9Sj60IxL.js";
/* empty css              */
/* empty css                     */
/* empty css                          */
/* empty css                */
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminPageSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee981c96"]]);
export {
  __nuxt_component_3 as _
};
//# sourceMappingURL=AdminPageSkeleton-DaUkIwpw.js.map
