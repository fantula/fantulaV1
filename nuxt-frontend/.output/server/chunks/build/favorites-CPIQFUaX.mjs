import { E as ElSkeleton, a as ElSkeletonItem } from './index-BXD0oWDt.mjs';
import { _ as _export_sfc, d as useUserStore, u as useModalStore, E as ElIcon, b1 as star_filled_default, aO as right_default, b2 as operation_default } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import '@vue/shared';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@supabase/supabase-js';
import '@vueuse/core';
import 'lodash-unified';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    useModalStore();
    const loading = ref(true);
    const submitting = ref(false);
    const categories = ref([]);
    const favorites2 = ref([]);
    const activeTab = ref("all");
    const filteredFavorites = computed(() => {
      if (activeTab.value === "all") return favorites2.value;
      return favorites2.value.filter((item) => item.categoryId === activeTab.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "favorites-section" }, _attrs))} data-v-1d635bb7><div class="section-header" data-v-1d635bb7><h2 class="section-title" data-v-1d635bb7>\u6211\u7684\u6536\u85CF</h2><div class="section-subtitle" data-v-1d635bb7>My Collection</div></div><div class="favorites-tabs" data-v-1d635bb7><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === cat.id }, "tab-item"])}" data-v-1d635bb7>${ssrInterpolate(cat.name)} `);
        if (activeTab.value === cat.id) {
          _push(`<div class="active-indicator" data-v-1d635bb7></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="favorites-list-container" data-v-1d635bb7>`);
      if (loading.value) {
        _push(`<div class="loading-grid" data-v-1d635bb7><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(_component_el_skeleton, {
            animated: "",
            class: "skeleton-item",
            key: i
          }, {
            template: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "image",
                  class: "skeleton-img"
                }, null, _parent2, _scopeId));
                _push2(`<div style="${ssrRenderStyle({ "padding": "14px" })}" data-v-1d635bb7${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "h3",
                  style: { "width": "50%" }
                }, null, _parent2, _scopeId));
                _push2(`<div style="${ssrRenderStyle({ "margin-top": "10px" })}" data-v-1d635bb7${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "30%" }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
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
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (filteredFavorites.value.length === 0) {
        _push(`<div class="empty-state" data-v-1d635bb7>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(star_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(star_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="empty-text" data-v-1d635bb7>\u6682\u65E0\u6536\u85CF\u5546\u54C1</div><div class="empty-desc" data-v-1d635bb7>\u53BB\u63A2\u7D22\u66F4\u591A\u597D\u7269\uFF0C\u586B\u6EE1\u60A8\u7684\u6536\u85CF\u5939\u5427</div><button class="go-shopping-btn" data-v-1d635bb7> \u524D\u5F80\u5546\u57CE `);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<div class="favorites-grid" data-v-1d635bb7><!--[-->`);
        ssrRenderList(filteredFavorites.value, (item) => {
          _push(`<div class="favorite-card" data-v-1d635bb7><div class="card-image-container" data-v-1d635bb7><img${ssrRenderAttr("src", item.productImage)}${ssrRenderAttr("alt", item.productName)} class="product-img" data-v-1d635bb7></div><div class="card-content" data-v-1d635bb7><h3 class="product-title" data-v-1d635bb7>${ssrInterpolate(item.productName)}</h3>`);
          if (item.specName) {
            _push(`<div class="spec-row" data-v-1d635bb7>`);
            _push(ssrRenderComponent(_component_el_icon, { class: "spec-icon" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(operation_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(operation_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<span class="spec-text" data-v-1d635bb7>${ssrInterpolate(item.specName)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="price-row" data-v-1d635bb7><span class="amount" data-v-1d635bb7>${ssrInterpolate(Number(item.price).toFixed(2))}</span><span class="unit" data-v-1d635bb7>\u70B9</span></div><div class="card-actions" data-v-1d635bb7><button class="action-btn cancel-btn" data-v-1d635bb7> \u53D6\u6D88\u6536\u85CF </button><button class="action-btn buy-btn"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-1d635bb7>${ssrInterpolate(submitting.value ? "\u5904\u7406\u4E2D..." : "\u7ACB\u5373\u8D2D\u4E70")}</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const favorites = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1d635bb7"]]);

export { favorites as default };
//# sourceMappingURL=favorites-CPIQFUaX.mjs.map
