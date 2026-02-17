import { E as ElIcon } from './index-C4aUwruK.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, withModifiers, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { F as star_default, a0 as star_filled_default } from './index-CCIZH4aC.mjs';
import { f as favoriteApi } from './common-CeIxTI3I.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-BcO6J-HE.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-D74TXOlf.mjs';
import { u as useToast } from './useToast-DsT-1f4c.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './supabase-Ds8OQlZJ.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const ProductDetailSheet = defineAsyncComponent(() => import('./ProductDetailSheet-Du5DOz6i.mjs'));
    useRouter();
    const { showToast } = useToast();
    const categories = ref([]);
    const allFavorites = ref([]);
    const activeTab = ref("all");
    const sheetVisible = ref(false);
    const selectedGoodsId = ref("");
    const filteredList = computed(() => {
      if (activeTab.value === "all") return allFavorites.value;
      return allFavorites.value.filter((item) => item.categoryId === activeTab.value);
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredList,
      pageSize: 10
    });
    const handleRemove = async (id) => {
      try {
        const res = await favoriteApi.removeFavorite(id);
        if (res.success) {
          showToast("\u5DF2\u53D6\u6D88\u6536\u85CF", "success");
          allFavorites.value = allFavorites.value.filter((item) => item.id !== id);
        } else {
          showToast(res.msg || "\u64CD\u4F5C\u5931\u8D25", "error");
        }
      } catch (e) {
        showToast("\u7F51\u7EDC\u9519\u8BEF", "error");
      }
    };
    const openProductDetail = (productId) => {
      selectedGoodsId.value = productId;
      sheetVisible.value = true;
    };
    watch(activeTab, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-97a8d2c3><div class="mobile-bg-fixed" data-v-97a8d2c3></div>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u6211\u7684\u6536\u85CF" }, null, _parent));
      if (categories.value.length > 0) {
        _push(`<div class="categories-tabs glass-tabs" data-v-97a8d2c3><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<div class="${ssrRenderClass([{ active: activeTab.value === cat.id }, "tab-item"])}" data-v-97a8d2c3>${ssrInterpolate(cat.name)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content-body" data-v-97a8d2c3>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-97a8d2c3${_scopeId}><div class="empty-icon-box" data-v-97a8d2c3${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(star_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(star_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><p data-v-97a8d2c3${_scopeId}>\u6682\u65E0\u6536\u85CF\u5546\u54C1</p></div>`);
            } else {
              _push2(`<div class="favorites-grid" data-v-97a8d2c3${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="info-card-glass fav-card" data-v-97a8d2c3${_scopeId}><div class="card-img" data-v-97a8d2c3${_scopeId}><img${ssrRenderAttr("src", item.productImage)}${ssrRenderAttr("alt", item.productName)} loading="lazy" decoding="async" data-v-97a8d2c3${_scopeId}>`);
                if (item.stock === 0) {
                  _push2(`<div class="stock-overlay" data-v-97a8d2c3${_scopeId}><span data-v-97a8d2c3${_scopeId}>\u7F3A\u8D27</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="card-info" data-v-97a8d2c3${_scopeId}><div class="product-title" data-v-97a8d2c3${_scopeId}>${ssrInterpolate(item.productName)}</div><div class="info-row-bottom" data-v-97a8d2c3${_scopeId}><div class="price-wrap" data-v-97a8d2c3${_scopeId}><span class="symbol" data-v-97a8d2c3${_scopeId}>\xA5</span><span class="amount" data-v-97a8d2c3${_scopeId}>${ssrInterpolate(item.price)}</span></div><div class="fav-action" data-v-97a8d2c3${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, { class: "fav-icon filled" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(star_filled_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(star_filled_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode("div", { class: "empty-icon-box" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(star_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("p", null, "\u6682\u65E0\u6536\u85CF\u5546\u54C1")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "favorites-grid"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.id,
                    class: "info-card-glass fav-card",
                    onClick: ($event) => openProductDetail(item.productId)
                  }, [
                    createVNode("div", { class: "card-img" }, [
                      createVNode("img", {
                        src: item.productImage,
                        alt: item.productName,
                        loading: "lazy",
                        decoding: "async"
                      }, null, 8, ["src", "alt"]),
                      item.stock === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "stock-overlay"
                      }, [
                        createVNode("span", null, "\u7F3A\u8D27")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "card-info" }, [
                      createVNode("div", { class: "product-title" }, toDisplayString(item.productName), 1),
                      createVNode("div", { class: "info-row-bottom" }, [
                        createVNode("div", { class: "price-wrap" }, [
                          createVNode("span", { class: "symbol" }, "\xA5"),
                          createVNode("span", { class: "amount" }, toDisplayString(item.price), 1)
                        ]),
                        createVNode("div", {
                          class: "fav-action",
                          onClick: withModifiers(($event) => handleRemove(item.id), ["stop"])
                        }, [
                          createVNode(_component_el_icon, { class: "fav-icon filled" }, {
                            default: withCtx(() => [
                              createVNode(unref(star_filled_default))
                            ]),
                            _: 1
                          })
                        ], 8, ["onClick"])
                      ])
                    ])
                  ], 8, ["onClick"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(ProductDetailSheet), {
        visible: sheetVisible.value,
        "onUpdate:visible": ($event) => sheetVisible.value = $event,
        goodsId: selectedGoodsId.value
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/favorites/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97a8d2c3"]]);

export { index as default };
//# sourceMappingURL=index-dUfYT8Kk.mjs.map
