import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { L as search_default, l as loading_default, j as circle_check_filled_default, ag as right_default, w as warning_filled_default } from "./index-CmsdIFY8.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "channel",
  __ssrInlineRender: true,
  setup(__props) {
    getSupabaseClient();
    useRouter();
    ref(null);
    const state = ref("input");
    const loading = ref(false);
    const channelInput = ref("@");
    const resultKey = ref("");
    ref(null);
    const isValidInput = computed(() => {
      return /^@[a-z0-9_]+$/.test(channelInput.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-channel-page" }, _attrs))} data-v-d4b5200c><div class="channel-header" data-v-d4b5200c><div class="header-icon" data-v-d4b5200c>`);
      _push(ssrRenderComponent(_component_el_icon, {
        size: 32,
        color: "#fff"
      }, {
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
      _push(`</div><h1 data-v-d4b5200c>频道识别</h1><p data-v-d4b5200c>请输入频道标识以连接专属商品</p></div><div class="channel-body" data-v-d4b5200c>`);
      if (state.value === "input") {
        _push(`<div class="input-section" data-v-d4b5200c><div class="input-wrapper" data-v-d4b5200c><input${ssrRenderAttr("value", channelInput.value)} type="text" class="channel-input" placeholder="@channel_name" spellcheck="false" data-v-d4b5200c>`);
        if (loading.value) {
          _push(`<div class="input-loader" data-v-d4b5200c>`);
          _push(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(loading_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="action-btn"${ssrIncludeBooleanAttr(loading.value || !isValidInput.value) ? " disabled" : ""} data-v-d4b5200c>${ssrInterpolate(loading.value ? "识别中..." : "立即识别")}</button></div>`);
      } else if (state.value === "bound") {
        _push(`<div class="result-section" data-v-d4b5200c><div class="status-icon success" data-v-d4b5200c>`);
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
        _push(`</div><h3 class="result-key" data-v-d4b5200c>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-d4b5200c>已成功识别频道</p><button class="action-btn success-btn" data-v-d4b5200c> 前往购买 `);
        _push(ssrRenderComponent(_component_el_icon, { class: "ml-1" }, {
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
        _push(`</button><button class="text-btn" data-v-d4b5200c>重新输入</button></div>`);
      } else if (state.value === "pending") {
        _push(`<div class="result-section" data-v-d4b5200c><div class="status-icon warning" data-v-d4b5200c>`);
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
        _push(`</div><h3 class="result-key" data-v-d4b5200c>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-d4b5200c>频道尚未绑定商品</p><p class="result-sub-msg" data-v-d4b5200c>已记录请求，请稍后重试或联系客服</p><button class="text-btn" data-v-d4b5200c>返回</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/channel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const channel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4b5200c"]]);
export {
  channel as default
};
//# sourceMappingURL=channel-BncEJ_-U.js.map
