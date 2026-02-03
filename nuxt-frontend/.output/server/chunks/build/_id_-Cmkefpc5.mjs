import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { c as arrow_left_default, l as loading_default } from './index-4qszPKX4.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    route.params.id;
    const loading = ref(true);
    const sending = ref(false);
    const ticketInfo = ref(null);
    const messages = ref([]);
    const replyContent = ref("");
    ref(null);
    const formatTime = (time) => {
      const date = new Date(time);
      return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-bec3cbcc><div class="page-header" data-v-bec3cbcc><div class="back-btn" data-v-bec3cbcc>`);
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
      _push(`</div><h1 class="page-title" data-v-bec3cbcc>\u5DE5\u5355\u8BE6\u60C5</h1><div class="header-right" data-v-bec3cbcc></div></div><div class="chat-container" data-v-bec3cbcc>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-bec3cbcc>`);
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
        _push(`<div class="messages-list" data-v-bec3cbcc><div class="ticket-info-card" data-v-bec3cbcc><div class="info-row" data-v-bec3cbcc><span class="label" data-v-bec3cbcc>\u5DE5\u5355\u53F7:</span> ${ssrInterpolate(((_a = ticketInfo.value) == null ? void 0 : _a.ticket_no) || ((_b = ticketInfo.value) == null ? void 0 : _b.id))}</div><div class="info-row" data-v-bec3cbcc><span class="label" data-v-bec3cbcc>\u72B6\u6001:</span> ${ssrInterpolate(((_c = ticketInfo.value) == null ? void 0 : _c.status) === "processing" ? "\u5904\u7406\u4E2D" : "\u5DF2\u89E3\u51B3")}</div><div class="info-row" data-v-bec3cbcc><span class="label" data-v-bec3cbcc>\u6807\u9898:</span> ${ssrInterpolate((_d = ticketInfo.value) == null ? void 0 : _d.title)}</div></div><!--[-->`);
        ssrRenderList(messages.value, (msg) => {
          _push(`<div class="${ssrRenderClass([{ "is-me": msg.sender === "user" }, "message-item"])}" data-v-bec3cbcc><div class="message-bubble" data-v-bec3cbcc>${ssrInterpolate(msg.content)}</div><div class="message-time" data-v-bec3cbcc>${ssrInterpolate(formatTime(msg.time))}</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="input-area" data-v-bec3cbcc><input${ssrRenderAttr("value", replyContent.value)} type="text" class="chat-input" placeholder="\u8BF7\u8F93\u5165\u56DE\u590D\u5185\u5BB9..." data-v-bec3cbcc><button class="send-btn"${ssrIncludeBooleanAttr(!replyContent.value || sending.value) ? " disabled" : ""} data-v-bec3cbcc>`);
      if (sending.value) {
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
      } else {
        _push(`<span data-v-bec3cbcc>\u53D1\u9001</span>`);
      }
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/tickets/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bec3cbcc"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Cmkefpc5.mjs.map
