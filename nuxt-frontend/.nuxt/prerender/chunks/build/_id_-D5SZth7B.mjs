import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { ag as headset_default } from './index-DlETah8a.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-yXUwt-_q.mjs';
import { M as MobileOrderProductInfo } from './MobileOrderProductInfo-B15l7qUI.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
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
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    route.params.id;
    const loading = ref(true);
    const sending = ref(false);
    const ticketInfo = ref(null);
    const messages = ref([]);
    const replyContent = ref("");
    ref(null);
    const productData = computed(() => {
      var _a;
      if (!((_a = ticketInfo.value) == null ? void 0 : _a.orders)) return null;
      const o = ticketInfo.value.orders;
      const snap = o.product_snapshot || {};
      const spec = snap.spec || snap.sku_spec || snap.spec_text || o.spec_text || "\u6807\u51C6\u89C4\u683C";
      return {
        productImage: snap.image || "",
        productName: snap.product_name || "\u672A\u77E5\u5546\u54C1",
        skuSpec: spec,
        order_no: o.order_no,
        quantity: snap.quantity || 1
      };
    });
    const getStatusText = (status) => {
      const map = {
        "pending": "\u6392\u961F\u4E2D",
        "processing": "\u5904\u7406\u4E2D",
        "resolved": "\u5DF2\u56DE\u590D",
        "closed": "\u5DF2\u7ED3\u675F"
      };
      return map[status] || status;
    };
    const formatTime = (time) => {
      if (!time) return "";
      const date = new Date(time);
      return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-4c7bfd32>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u5DE5\u5355\u8BE6\u60C5" }, null, _parent));
      _push(`<div class="chat-container" data-v-4c7bfd32>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-4c7bfd32><div class="spinner-premium" data-v-4c7bfd32></div></div>`);
      } else {
        _push(`<div class="content-wrapper" data-v-4c7bfd32>`);
        if (productData.value) {
          _push(`<div class="section-card" data-v-4c7bfd32><div class="section-title" data-v-4c7bfd32>\u5173\u8054\u5546\u54C1</div>`);
          _push(ssrRenderComponent(MobileOrderProductInfo, { order: productData.value }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info-card-glass ticket-status-card" data-v-4c7bfd32><div class="card-head" data-v-4c7bfd32><div class="${ssrRenderClass([(_a = ticketInfo.value) == null ? void 0 : _a.status, "status-badge"])}" data-v-4c7bfd32><div class="dot" data-v-4c7bfd32></div> ${ssrInterpolate(getStatusText((_b = ticketInfo.value) == null ? void 0 : _b.status))}</div><div class="ticket-no" data-v-4c7bfd32>NO. ${ssrInterpolate(((_c = ticketInfo.value) == null ? void 0 : _c.ticket_no) || ((_d = ticketInfo.value) == null ? void 0 : _d.id))}</div></div><div class="card-body" data-v-4c7bfd32><div class="desc-row" data-v-4c7bfd32><span class="label" data-v-4c7bfd32>\u95EE\u9898:</span><span class="val text-highlight" data-v-4c7bfd32>${ssrInterpolate((_e = ticketInfo.value) == null ? void 0 : _e.title)}</span></div><div class="time-row" data-v-4c7bfd32>${ssrInterpolate(formatTime((_f = ticketInfo.value) == null ? void 0 : _f.created_at))}</div></div></div><div class="divider" data-v-4c7bfd32><span data-v-4c7bfd32>\u6C9F\u901A\u8BB0\u5F55</span></div><div class="messages-list" data-v-4c7bfd32><!--[-->`);
        ssrRenderList(messages.value, (msg) => {
          var _a2;
          _push(`<div class="${ssrRenderClass([{ "is-me": msg.sender === "user" }, "message-item"])}" data-v-4c7bfd32><div class="msg-avatar" data-v-4c7bfd32>`);
          if (msg.sender === "user") {
            _push(`<img${ssrRenderAttr("src", ((_a2 = unref(userStore).user) == null ? void 0 : _a2.avatar) || "/images/client/pc/avatars/avatar-cat.png")} data-v-4c7bfd32>`);
          } else {
            _push(`<div class="service-icon" data-v-4c7bfd32>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(headset_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(headset_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          }
          _push(`</div><div class="msg-content-wrapper" data-v-4c7bfd32><div class="message-bubble" data-v-4c7bfd32>${ssrInterpolate(msg.content)}</div><div class="message-time" data-v-4c7bfd32>${ssrInterpolate(formatTime(msg.time))}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div><div class="input-area-glass" data-v-4c7bfd32><div class="input-wrapper" data-v-4c7bfd32><input${ssrRenderAttr("value", replyContent.value)} type="text" class="glass-input" placeholder="\u8BF7\u8F93\u5165\u56DE\u590D\u5185\u5BB9..." data-v-4c7bfd32><button class="send-btn"${ssrIncludeBooleanAttr(!replyContent.value || sending.value) ? " disabled" : ""} data-v-4c7bfd32>`);
      if (sending.value) {
        _push(`<div class="spinner-mini" data-v-4c7bfd32></div>`);
      } else {
        _push(`<span data-v-4c7bfd32>\u53D1\u9001</span>`);
      }
      _push(`</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/tickets/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c7bfd32"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-D5SZth7B.mjs.map
