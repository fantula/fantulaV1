import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { L as search_default, l as loading_default, h as circle_check_filled_default, ag as right_default, w as warning_filled_default } from './index-4qszPKX4.mjs';
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
      _push(`</div><h1 data-v-d4b5200c>\u9891\u9053\u8BC6\u522B</h1><p data-v-d4b5200c>\u8BF7\u8F93\u5165\u9891\u9053\u6807\u8BC6\u4EE5\u8FDE\u63A5\u4E13\u5C5E\u5546\u54C1</p></div><div class="channel-body" data-v-d4b5200c>`);
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
        _push(`</div><button class="action-btn"${ssrIncludeBooleanAttr(loading.value || !isValidInput.value) ? " disabled" : ""} data-v-d4b5200c>${ssrInterpolate(loading.value ? "\u8BC6\u522B\u4E2D..." : "\u7ACB\u5373\u8BC6\u522B")}</button></div>`);
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
        _push(`</div><h3 class="result-key" data-v-d4b5200c>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-d4b5200c>\u5DF2\u6210\u529F\u8BC6\u522B\u9891\u9053</p><button class="action-btn success-btn" data-v-d4b5200c> \u524D\u5F80\u8D2D\u4E70 `);
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
        _push(`</button><button class="text-btn" data-v-d4b5200c>\u91CD\u65B0\u8F93\u5165</button></div>`);
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
        _push(`</div><h3 class="result-key" data-v-d4b5200c>${ssrInterpolate(resultKey.value)}</h3><p class="result-msg" data-v-d4b5200c>\u9891\u9053\u5C1A\u672A\u7ED1\u5B9A\u5546\u54C1</p><p class="result-sub-msg" data-v-d4b5200c>\u5DF2\u8BB0\u5F55\u8BF7\u6C42\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u6216\u8054\u7CFB\u5BA2\u670D</p><button class="text-btn" data-v-d4b5200c>\u8FD4\u56DE</button></div>`);
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

export { channel as default };
//# sourceMappingURL=channel-BbC8nVZ1.mjs.map
