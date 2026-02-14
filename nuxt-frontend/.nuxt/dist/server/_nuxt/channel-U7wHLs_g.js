import { E as ElIcon } from "./index-D6MDXFfa.js";
/* empty css              */
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { O as search_default, ah as right_default, q as circle_check_filled_default, h as warning_filled_default, aC as compass_default } from "./index-CRs4T-Jf.js";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
import "./useToast-DsT-1f4c.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "@supabase/supabase-js";
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
  __name: "channel",
  __ssrInlineRender: true,
  setup(__props) {
    const ProductDetailSheet = defineAsyncComponent(() => import("./ProductDetailSheet-BvcxWbbA.js"));
    getSupabaseClient();
    ref(null);
    const state = ref("input");
    const loading = ref(false);
    const channelInput = ref("@");
    const resultKey = ref("");
    const boundProductId = ref(null);
    const product = ref(null);
    const showDetailSheet = ref(false);
    const isValidInput = computed(() => /^@[a-z0-9_]+$/.test(channelInput.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-fa70143e><header class="hub-header" data-v-fa70143e><h1 class="hub-title" data-v-fa70143e>探索功能 <span class="dot" data-v-fa70143e>.</span></h1><p class="hub-subtitle" data-v-fa70143e>Discovery Tools</p></header><div class="hub-body" data-v-fa70143e><div class="tool-card expanded" data-v-fa70143e><div class="tool-header" data-v-fa70143e><div class="th-icon" data-v-fa70143e>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(search_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(search_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="th-info" data-v-fa70143e><h3 data-v-fa70143e>频道识别</h3><p data-v-fa70143e>链接专属商品渠道</p></div></div><div class="tool-content" data-v-fa70143e><div class="input-row" data-v-fa70143e><input${ssrRenderAttr("value", channelInput.value)} type="text" class="glass-input" placeholder="@channel_key" spellcheck="false" data-v-fa70143e><button class="btn-icon-action"${ssrIncludeBooleanAttr(loading.value || !isValidInput.value) ? " disabled" : ""} data-v-fa70143e>`);
      if (loading.value) {
        _push(`<div class="spinner-xs" data-v-fa70143e></div>`);
      } else {
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
      }
      _push(`</button></div>`);
      if (state.value !== "input") {
        _push(`<div class="result-area" data-v-fa70143e>`);
        if (state.value === "bound" && product.value) {
          _push(`<div class="result-success animate-fade-in" data-v-fa70143e><div class="success-tag" data-v-fa70143e>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 识别成功 </div><div class="preview-card" data-v-fa70143e><img${ssrRenderAttr("src", product.value.image || product.value.coverImage)} class="pc-thumb" decoding="async" loading="lazy" data-v-fa70143e><div class="pc-info" data-v-fa70143e><div class="pc-name" data-v-fa70143e>${ssrInterpolate(product.value.name || product.value.title)}</div><div class="pc-price" data-v-fa70143e> ¥<span class="val" data-v-fa70143e>${ssrInterpolate(product.value.price)}</span></div></div><button class="pc-btn" data-v-fa70143e>购买</button></div></div>`);
        } else if (state.value === "pending") {
          _push(`<div class="result-warning animate-fade-in" data-v-fa70143e><div class="warning-icon" data-v-fa70143e>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="warning-text" data-v-fa70143e><p data-v-fa70143e>频道 <span data-v-fa70143e>${ssrInterpolate(resultKey.value)}</span> 暂未绑定商品</p><button class="btn-text-reset" data-v-fa70143e>重试</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="tools-grid" data-v-fa70143e><div class="tool-card mini disabled" data-v-fa70143e>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(compass_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(compass_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-fa70143e>更多功能</span><div class="badge-soon" data-v-fa70143e>Coming Soon</div></div></div></div>`);
      _push(ssrRenderComponent(unref(ProductDetailSheet), {
        visible: showDetailSheet.value,
        "onUpdate:visible": ($event) => showDetailSheet.value = $event,
        "goods-id": boundProductId.value || ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/channel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const channel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa70143e"]]);
export {
  channel as default
};
//# sourceMappingURL=channel-U7wHLs_g.js.map
