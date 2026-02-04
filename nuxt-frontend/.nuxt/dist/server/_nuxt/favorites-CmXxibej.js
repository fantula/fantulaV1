import { E as ElSkeleton, a as ElSkeletonItem } from "./index-qglB3PzO.js";
import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                          */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, TransitionGroup, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { favoriteApi } from "./common-DNRu9xdu.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { u as useModalStore } from "./modal-HUsR3oCs.js";
import { u as useInfiniteScroll, B as BaseInfiniteList } from "./BaseInfiniteList-C6mBVzQc.js";
import { af as star_filled_default, ag as right_default, ah as operation_default } from "./index-CmsdIFY8.js";
import { E as ElMessage } from "./index-eYVppfk3.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./request-n20yf-Kr.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./auth-BCuS92ob.js";
import "./cart-D8FaBhjU.js";
import "./typescript-D6L75muK.js";
import "./icon-eqoLCvNY.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./index-CO6H4Lsj.js";
import "./event-D3FEo2C5.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    useUserStore();
    useModalStore();
    const categories = ref([]);
    const allFavorites = ref([]);
    const activeTab = ref("all");
    const filteredSource = computed(() => {
      if (activeTab.value === "all") return allFavorites.value;
      return allFavorites.value.filter((item) => item.categoryId === activeTab.value);
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredSource,
      pageSize: 10
    });
    const goToProduct = (id) => {
      router.push(`/goods/${id}`);
    };
    const removeFavorite = async (favoriteId) => {
      const res = await favoriteApi.removeFavorite(favoriteId);
      if (res.success) {
        allFavorites.value = allFavorites.value.filter((item) => item.id !== favoriteId);
        const idx = displayList.value.findIndex((i) => i.id === favoriteId);
        if (idx !== -1) displayList.value.splice(idx, 1);
        ElMessage.success("已取消收藏");
      }
    };
    const goShopping = () => {
      router.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "favorites-section" }, _attrs))} data-v-648a3683><div class="section-header" data-v-648a3683><h2 class="section-title" data-v-648a3683>我的收藏</h2><div class="section-subtitle" data-v-648a3683>My Collection</div></div><div class="favorites-tabs" data-v-648a3683><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === cat.id }, "tab-item"])}" data-v-648a3683>${ssrInterpolate(cat.name)} `);
        if (activeTab.value === cat.id) {
          _push(`<div class="active-indicator" data-v-648a3683></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="favorites-list-container" data-v-648a3683>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        offset: 200
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && unref(loading)) {
              _push2(`<div class="loading-grid" data-v-648a3683${_scopeId}><!--[-->`);
              ssrRenderList(6, (i) => {
                _push2(ssrRenderComponent(_component_el_skeleton, {
                  animated: "",
                  class: "skeleton-item",
                  key: i
                }, {
                  template: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "image",
                        class: "skeleton-img"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div style="${ssrRenderStyle({ "padding": "14px" })}" data-v-648a3683${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "50%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<div style="${ssrRenderStyle({ "margin-top": "10px" })}" data-v-648a3683${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "30%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode(_component_el_skeleton_item, {
                          variant: "image",
                          class: "skeleton-img"
                        }),
                        createVNode("div", { style: { "padding": "14px" } }, [
                          createVNode(_component_el_skeleton_item, {
                            variant: "h3",
                            style: { "width": "50%" }
                          }),
                          createVNode("div", { style: { "margin-top": "10px" } }, [
                            createVNode(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "30%" }
                            })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(displayList).length === 0 && unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-grid"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                  return createVNode(_component_el_skeleton, {
                    animated: "",
                    class: "skeleton-item",
                    key: i
                  }, {
                    template: withCtx(() => [
                      createVNode(_component_el_skeleton_item, {
                        variant: "image",
                        class: "skeleton-img"
                      }),
                      createVNode("div", { style: { "padding": "14px" } }, [
                        createVNode(_component_el_skeleton_item, {
                          variant: "h3",
                          style: { "width": "50%" }
                        }),
                        createVNode("div", { style: { "margin-top": "10px" } }, [
                          createVNode(_component_el_skeleton_item, {
                            variant: "text",
                            style: { "width": "30%" }
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  });
                }), 64))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-648a3683${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(star_filled_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(star_filled_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="empty-text" data-v-648a3683${_scopeId}>你还没有收藏商品</div><div class="empty-desc" data-v-648a3683${_scopeId}>去探索更多好物，填满您的收藏夹吧</div><button class="go-shopping-btn" data-v-648a3683${_scopeId}> 去逛逛 `);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(right_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(right_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</button></div>`);
            } else {
              _push2(`<div class="favorites-grid" data-v-648a3683${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="favorite-card" data-v-648a3683${_scopeId}><div class="card-image-container" data-v-648a3683${_scopeId}><img${ssrRenderAttr("src", item.productImage)}${ssrRenderAttr("alt", item.productName)} class="product-img" data-v-648a3683${_scopeId}></div><div class="card-content" data-v-648a3683${_scopeId}><h3 class="product-title" data-v-648a3683${_scopeId}>${ssrInterpolate(item.productName)}</h3>`);
                if (item.specName) {
                  _push2(`<div class="spec-row" data-v-648a3683${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_icon, { class: "spec-icon" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(operation_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(operation_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<span class="spec-text" data-v-648a3683${_scopeId}>${ssrInterpolate(item.specName)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="price-row" data-v-648a3683${_scopeId}><span class="amount" data-v-648a3683${_scopeId}>${ssrInterpolate(Number(item.price).toFixed(2))}</span><span class="unit" data-v-648a3683${_scopeId}>点</span></div><div class="card-actions" data-v-648a3683${_scopeId}><button class="action-btn cancel-btn" data-v-648a3683${_scopeId}> 取消收藏 </button><button class="action-btn buy-btn" data-v-648a3683${_scopeId}> 立即查看 </button></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode(_component_el_icon, { class: "empty-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(star_filled_default))
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "empty-text" }, "你还没有收藏商品"),
                createVNode("div", { class: "empty-desc" }, "去探索更多好物，填满您的收藏夹吧"),
                createVNode("button", {
                  class: "go-shopping-btn",
                  onClick: goShopping
                }, [
                  createTextVNode(" 去逛逛 "),
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(right_default))
                    ]),
                    _: 1
                  })
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "favorites-grid"
              }, [
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "favorite-card",
                        onClick: ($event) => goToProduct(item.productId)
                      }, [
                        createVNode("div", { class: "card-image-container" }, [
                          createVNode("img", {
                            src: item.productImage,
                            alt: item.productName,
                            class: "product-img"
                          }, null, 8, ["src", "alt"])
                        ]),
                        createVNode("div", { class: "card-content" }, [
                          createVNode("h3", { class: "product-title" }, toDisplayString(item.productName), 1),
                          item.specName ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "spec-row"
                          }, [
                            createVNode(_component_el_icon, { class: "spec-icon" }, {
                              default: withCtx(() => [
                                createVNode(unref(operation_default))
                              ]),
                              _: 1
                            }),
                            createVNode("span", { class: "spec-text" }, toDisplayString(item.specName), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "price-row" }, [
                            createVNode("span", { class: "amount" }, toDisplayString(Number(item.price).toFixed(2)), 1),
                            createVNode("span", { class: "unit" }, "点")
                          ]),
                          createVNode("div", { class: "card-actions" }, [
                            createVNode("button", {
                              class: "action-btn cancel-btn",
                              onClick: withModifiers(($event) => removeFavorite(item.id), ["stop"])
                            }, " 取消收藏 ", 8, ["onClick"]),
                            createVNode("button", {
                              class: "action-btn buy-btn",
                              onClick: withModifiers(($event) => goToProduct(item.productId), ["stop"])
                            }, " 立即查看 ", 8, ["onClick"])
                          ])
                        ])
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const favorites = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-648a3683"]]);
export {
  favorites as default
};
//# sourceMappingURL=favorites-CmXxibej.js.map
