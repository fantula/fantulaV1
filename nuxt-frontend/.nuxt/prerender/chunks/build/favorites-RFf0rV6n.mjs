import { E as ElSkeleton, a as ElSkeletonItem } from './index-Buprbscf.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, TransitionGroup, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { f as favoriteApi } from './common-Bgv_wRgd.mjs';
import { u as useUserStore } from './user-CctDsbAN.mjs';
import { u as useModalStore } from './modal-CBJJqDui.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-Dt0cDKAc.mjs';
import { B as BaseButton } from './BaseButton-BnWAaIRO.mjs';
import { a0 as star_filled_default, a1 as right_default, a2 as operation_default } from './index-DNnPa_Q9.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './supabase-F2pQZHm6.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
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
import './cart-CDhPH3qi.mjs';
import './typescript-D6L75muK.mjs';
import './icon-Ck0_dGQP.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './index-DbvZsXcZ.mjs';
import './event-D3FEo2C5.mjs';

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
        ElMessage.success("\u5DF2\u53D6\u6D88\u6536\u85CF");
      }
    };
    const goShopping = () => {
      router.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "favorites-section" }, _attrs))} data-v-4e90ea08><div class="section-header" data-v-4e90ea08><h2 class="section-title" data-v-4e90ea08>\u6211\u7684\u6536\u85CF</h2><div class="section-subtitle" data-v-4e90ea08>My Collection</div></div><div class="favorites-tabs" data-v-4e90ea08><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === cat.id }, "tab-item"])}" data-v-4e90ea08>${ssrInterpolate(cat.name)} `);
        if (activeTab.value === cat.id) {
          _push(`<div class="active-indicator" data-v-4e90ea08></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="favorites-list-container" data-v-4e90ea08>`);
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
              _push2(`<div class="loading-grid" data-v-4e90ea08${_scopeId}><!--[-->`);
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
                      _push3(`<div style="${ssrRenderStyle({ "padding": "14px" })}" data-v-4e90ea08${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "50%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<div style="${ssrRenderStyle({ "margin-top": "10px" })}" data-v-4e90ea08${_scopeId2}>`);
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
              _push2(`<div class="empty-state" data-v-4e90ea08${_scopeId}>`);
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
              _push2(`<div class="empty-text" data-v-4e90ea08${_scopeId}>\u4F60\u8FD8\u6CA1\u6709\u6536\u85CF\u5546\u54C1</div><div class="empty-desc" data-v-4e90ea08${_scopeId}>\u53BB\u63A2\u7D22\u66F4\u591A\u597D\u7269\uFF0C\u586B\u6EE1\u60A8\u7684\u6536\u85CF\u5939\u5427</div>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary",
                onClick: goShopping
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u53BB\u901B\u901B `);
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(right_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(right_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" \u53BB\u901B\u901B "),
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(right_default))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="favorites-grid" data-v-4e90ea08${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="favorite-card" data-v-4e90ea08${_scopeId}><div class="card-image-container" data-v-4e90ea08${_scopeId}><img${ssrRenderAttr("src", item.productImage)}${ssrRenderAttr("alt", item.productName)} class="product-img" loading="lazy" decoding="async" data-v-4e90ea08${_scopeId}></div><div class="card-content" data-v-4e90ea08${_scopeId}><h3 class="product-title" data-v-4e90ea08${_scopeId}>${ssrInterpolate(item.productName)}</h3>`);
                if (item.specName) {
                  _push2(`<div class="spec-row" data-v-4e90ea08${_scopeId}>`);
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
                  _push2(`<span class="spec-text" data-v-4e90ea08${_scopeId}>${ssrInterpolate(item.specName)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="price-row" data-v-4e90ea08${_scopeId}><span class="amount" data-v-4e90ea08${_scopeId}>${ssrInterpolate(Number(item.price).toFixed(2))}</span><span class="unit" data-v-4e90ea08${_scopeId}>\u70B9</span></div><div class="card-actions" data-v-4e90ea08${_scopeId}>`);
                _push2(ssrRenderComponent(BaseButton, {
                  themeId: "secondary",
                  size: "small",
                  class: "action-btn",
                  onClick: ($event) => removeFavorite(item.id)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u53D6\u6D88\u6536\u85CF `);
                    } else {
                      return [
                        createTextVNode(" \u53D6\u6D88\u6536\u85CF ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(BaseButton, {
                  themeId: "marketing-buy",
                  size: "small",
                  class: "action-btn",
                  onClick: ($event) => goToProduct(item.productId)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u7ACB\u5373\u67E5\u770B `);
                    } else {
                      return [
                        createTextVNode(" \u7ACB\u5373\u67E5\u770B ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
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
                createVNode("div", { class: "empty-text" }, "\u4F60\u8FD8\u6CA1\u6709\u6536\u85CF\u5546\u54C1"),
                createVNode("div", { class: "empty-desc" }, "\u53BB\u63A2\u7D22\u66F4\u591A\u597D\u7269\uFF0C\u586B\u6EE1\u60A8\u7684\u6536\u85CF\u5939\u5427"),
                createVNode(BaseButton, {
                  themeId: "primary",
                  onClick: goShopping
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u53BB\u901B\u901B "),
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(right_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
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
                            class: "product-img",
                            loading: "lazy",
                            decoding: "async"
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
                            createVNode("span", { class: "unit" }, "\u70B9")
                          ]),
                          createVNode("div", { class: "card-actions" }, [
                            createVNode(BaseButton, {
                              themeId: "secondary",
                              size: "small",
                              class: "action-btn",
                              onClick: withModifiers(($event) => removeFavorite(item.id), ["stop"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u53D6\u6D88\u6536\u85CF ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(BaseButton, {
                              themeId: "marketing-buy",
                              size: "small",
                              class: "action-btn",
                              onClick: withModifiers(($event) => goToProduct(item.productId), ["stop"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u7ACB\u5373\u67E5\u770B ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
const favorites = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e90ea08"]]);

export { favorites as default };
//# sourceMappingURL=favorites-RFf0rV6n.mjs.map
