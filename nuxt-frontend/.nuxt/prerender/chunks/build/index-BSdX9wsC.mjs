import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { c as arrow_left_default, W as star_default, d as delete_default } from './index-4qszPKX4.mjs';
import { favoriteApi } from './common-DNRu9xdu.mjs';
import { u as useInfiniteScroll, B as BaseInfiniteList } from './BaseInfiniteList-pSsymcej.mjs';
import { E as ElMessage } from './index-CJUZrfXE.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './request-n20yf-Kr.mjs';
import './supabase-jxF0-7J3.mjs';
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
import './typescript-D6L75muK.mjs';
import './icon-BcxG_YvU.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './index-CO6H4Lsj.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const categories = ref([]);
    const allFavorites = ref([]);
    const activeTab = ref("all");
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
          ElMessage.success({ message: "\u5DF2\u53D6\u6D88\u6536\u85CF", offset: 100, customClass: "mobile-message" });
          allFavorites.value = allFavorites.value.filter((item) => item.id !== id);
        } else {
          ElMessage.error({ message: res.msg || "\u64CD\u4F5C\u5931\u8D25", offset: 100, customClass: "mobile-message" });
        }
      } catch (e) {
        ElMessage.error("\u7F51\u7EDC\u9519\u8BEF");
      }
    };
    const goToProduct = (id) => {
      router.push(`/mobile/goods/${id}`);
    };
    watch(activeTab, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-d1c9baad><div class="page-header" data-v-d1c9baad><div class="back-btn" data-v-d1c9baad>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h1 class="page-title" data-v-d1c9baad>\u6211\u7684\u6536\u85CF</h1><div class="header-right" data-v-d1c9baad></div></div>`);
      if (categories.value.length > 0) {
        _push(`<div class="categories-tabs" data-v-d1c9baad><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<div class="${ssrRenderClass([{ active: activeTab.value === cat.id }, "tab-item"])}" data-v-d1c9baad>${ssrInterpolate(cat.name)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content-body" data-v-d1c9baad>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-d1c9baad${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
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
              _push2(`<p data-v-d1c9baad${_scopeId}>\u6682\u65E0\u6536\u85CF\u5546\u54C1</p></div>`);
            } else {
              _push2(`<div class="favorites-grid" data-v-d1c9baad${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="fav-card" data-v-d1c9baad${_scopeId}><div class="card-img" data-v-d1c9baad${_scopeId}><img${ssrRenderAttr("src", item.productImage)}${ssrRenderAttr("alt", item.productName)} data-v-d1c9baad${_scopeId}><div class="remove-btn" data-v-d1c9baad${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(delete_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(delete_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div><div class="card-info" data-v-d1c9baad${_scopeId}><div class="product-title" data-v-d1c9baad${_scopeId}>${ssrInterpolate(item.productName)}</div>`);
                if (item.specName) {
                  _push2(`<div class="product-spec" data-v-d1c9baad${_scopeId}>${ssrInterpolate(item.specName)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="product-price" data-v-d1c9baad${_scopeId}><span class="symbol" data-v-d1c9baad${_scopeId}>\xA5</span>${ssrInterpolate(item.price)}</div></div></div>`);
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
                    createVNode(unref(star_default))
                  ]),
                  _: 1
                }),
                createVNode("p", null, "\u6682\u65E0\u6536\u85CF\u5546\u54C1")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "favorites-grid"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.id,
                    class: "fav-card",
                    onClick: ($event) => goToProduct(item.productId)
                  }, [
                    createVNode("div", { class: "card-img" }, [
                      createVNode("img", {
                        src: item.productImage,
                        alt: item.productName
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", {
                        class: "remove-btn",
                        onClick: withModifiers(($event) => handleRemove(item.id), ["stop"])
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                        })
                      ], 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "card-info" }, [
                      createVNode("div", { class: "product-title" }, toDisplayString(item.productName), 1),
                      item.specName ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "product-spec"
                      }, toDisplayString(item.specName), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "product-price" }, [
                        createVNode("span", { class: "symbol" }, "\xA5"),
                        createTextVNode(toDisplayString(item.price), 1)
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/favorites/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1c9baad"]]);

export { index as default };
//# sourceMappingURL=index-BSdX9wsC.mjs.map
