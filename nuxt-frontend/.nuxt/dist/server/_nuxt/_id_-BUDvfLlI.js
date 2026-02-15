import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { a6 as headset_default } from "./index-CbQ9NNm4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import "./useToast-DsT-1f4c.js";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-Na2GamiB.js";
import { M as MobileOrderProductInfo } from "./MobileOrderProductInfo-WYxlSRAN.js";
import { D as DEFAULT_AVATAR } from "./constants-BRAeDQ6J.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
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
      if (!ticketInfo.value?.orders) return null;
      const o = ticketInfo.value.orders;
      const snap = o.product_snapshot || {};
      const spec = snap.spec || snap.sku_spec || snap.spec_text || o.spec_text || "标准规格";
      return {
        productImage: snap.image || "",
        productName: snap.product_name || "未知商品",
        skuSpec: spec,
        order_no: o.order_no,
        quantity: snap.quantity || 1
      };
    });
    const getStatusText = (status) => {
      const map = {
        "pending": "排队中",
        "processing": "处理中",
        "resolved": "已回复",
        "closed": "已结束"
      };
      return map[status] || status;
    };
    const formatTime = (time) => {
      if (!time) return "";
      const date = new Date(time);
      return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-930c18cd>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "工单详情" }, null, _parent));
      _push(`<div class="chat-container" data-v-930c18cd>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-930c18cd><div class="spinner-premium" data-v-930c18cd></div></div>`);
      } else {
        _push(`<div class="content-wrapper" data-v-930c18cd>`);
        if (productData.value) {
          _push(`<div class="section-card" data-v-930c18cd><div class="section-title" data-v-930c18cd>关联商品</div>`);
          _push(ssrRenderComponent(MobileOrderProductInfo, { order: productData.value }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info-card-glass ticket-status-card" data-v-930c18cd><div class="card-head" data-v-930c18cd><div class="${ssrRenderClass([ticketInfo.value?.status, "status-badge"])}" data-v-930c18cd><div class="dot" data-v-930c18cd></div> ${ssrInterpolate(getStatusText(ticketInfo.value?.status))}</div><div class="ticket-no" data-v-930c18cd>NO. ${ssrInterpolate(ticketInfo.value?.ticket_no || ticketInfo.value?.id)}</div></div><div class="card-body" data-v-930c18cd><div class="desc-row" data-v-930c18cd><span class="label" data-v-930c18cd>问题:</span><span class="val text-highlight" data-v-930c18cd>${ssrInterpolate(ticketInfo.value?.title)}</span></div><div class="time-row" data-v-930c18cd>${ssrInterpolate(formatTime(ticketInfo.value?.created_at))}</div></div></div><div class="divider" data-v-930c18cd><span data-v-930c18cd>沟通记录</span></div><div class="messages-list" data-v-930c18cd><!--[-->`);
        ssrRenderList(messages.value, (msg) => {
          _push(`<div class="${ssrRenderClass([{ "is-me": msg.sender === "user" }, "message-item"])}" data-v-930c18cd><div class="msg-avatar" data-v-930c18cd>`);
          if (msg.sender === "user") {
            _push(`<img${ssrRenderAttr("src", unref(userStore).user?.avatar || unref(DEFAULT_AVATAR))} data-v-930c18cd>`);
          } else {
            _push(`<div class="service-icon" data-v-930c18cd>`);
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
          _push(`</div><div class="msg-content-wrapper" data-v-930c18cd><div class="message-bubble" data-v-930c18cd>${ssrInterpolate(msg.content)}</div><div class="message-time" data-v-930c18cd>${ssrInterpolate(formatTime(msg.time))}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div><div class="input-area-glass" data-v-930c18cd><div class="input-wrapper" data-v-930c18cd><input${ssrRenderAttr("value", replyContent.value)} type="text" class="glass-input" placeholder="请输入回复内容..." data-v-930c18cd><button class="send-btn"${ssrIncludeBooleanAttr(!replyContent.value || sending.value) ? " disabled" : ""} data-v-930c18cd>`);
      if (sending.value) {
        _push(`<div class="spinner-mini" data-v-930c18cd></div>`);
      } else {
        _push(`<span data-v-930c18cd>发送</span>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-930c18cd"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BUDvfLlI.js.map
