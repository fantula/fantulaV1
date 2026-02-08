import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { I as search_default, ac as right_default, f as circle_check_filled_default, w as warning_filled_default, av as compass_default } from './index-DlETah8a.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import '@supabase/supabase-js';
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
import 'vue-router';
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
  __name: "channel",
  __ssrInlineRender: true,
  setup(__props) {
    const ProductDetailSheet = defineAsyncComponent(() => import('./ProductDetailSheet-BXqgptIL.mjs'));
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-fa70143e><header class="hub-header" data-v-fa70143e><h1 class="hub-title" data-v-fa70143e>\u63A2\u7D22\u529F\u80FD <span class="dot" data-v-fa70143e>.</span></h1><p class="hub-subtitle" data-v-fa70143e>Discovery Tools</p></header><div class="hub-body" data-v-fa70143e><div class="tool-card expanded" data-v-fa70143e><div class="tool-header" data-v-fa70143e><div class="th-icon" data-v-fa70143e>`);
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
      _push(`</div><div class="th-info" data-v-fa70143e><h3 data-v-fa70143e>\u9891\u9053\u8BC6\u522B</h3><p data-v-fa70143e>\u94FE\u63A5\u4E13\u5C5E\u5546\u54C1\u6E20\u9053</p></div></div><div class="tool-content" data-v-fa70143e><div class="input-row" data-v-fa70143e><input${ssrRenderAttr("value", channelInput.value)} type="text" class="glass-input" placeholder="@channel_key" spellcheck="false" data-v-fa70143e><button class="btn-icon-action"${ssrIncludeBooleanAttr(loading.value || !isValidInput.value) ? " disabled" : ""} data-v-fa70143e>`);
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
          _push(` \u8BC6\u522B\u6210\u529F </div><div class="preview-card" data-v-fa70143e><img${ssrRenderAttr("src", product.value.image || product.value.coverImage)} class="pc-thumb" decoding="async" loading="lazy" data-v-fa70143e><div class="pc-info" data-v-fa70143e><div class="pc-name" data-v-fa70143e>${ssrInterpolate(product.value.name || product.value.title)}</div><div class="pc-price" data-v-fa70143e> \xA5<span class="val" data-v-fa70143e>${ssrInterpolate(product.value.price)}</span></div></div><button class="pc-btn" data-v-fa70143e>\u8D2D\u4E70</button></div></div>`);
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
          _push(`</div><div class="warning-text" data-v-fa70143e><p data-v-fa70143e>\u9891\u9053 <span data-v-fa70143e>${ssrInterpolate(resultKey.value)}</span> \u6682\u672A\u7ED1\u5B9A\u5546\u54C1</p><button class="btn-text-reset" data-v-fa70143e>\u91CD\u8BD5</button></div></div>`);
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
      _push(`<span data-v-fa70143e>\u66F4\u591A\u529F\u80FD</span><div class="badge-soon" data-v-fa70143e>Coming Soon</div></div></div></div>`);
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

export { channel as default };
//# sourceMappingURL=channel-CFysR-sd.mjs.map
