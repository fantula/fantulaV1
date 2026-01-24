import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-CGOd9nF1.js";
import { d as useUserStore, _ as _export_sfc } from "../server.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "referral",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const stats = ref({
      registerNum: 0,
      orderNum: 0,
      orderAmount: 0
    });
    const inviteInfo = ref({
      code: "",
      link: "",
      nickName: "",
      avatar: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "referral-section" }, _attrs))} data-v-f38c5494><div class="section-header" data-v-f38c5494><h2 class="section-title" data-v-f38c5494>返现推广</h2></div><div class="referral-top" data-v-f38c5494><div class="invite-area" data-v-f38c5494><h3 class="invite-title" data-v-f38c5494>邀请好友，赚取高额返现</h3><p class="invite-desc" data-v-f38c5494>分享推广码邀请好友</p></div><div class="earnings-area" data-v-f38c5494><div class="earnings-content" data-v-f38c5494><div class="earnings-label" data-v-f38c5494>我的推广收益</div><div class="earnings-amount" data-v-f38c5494>¥ ${ssrInterpolate(stats.value.orderAmount ?? 0)}</div></div><button class="withdraw-btn" data-v-f38c5494>立即提现</button></div></div><div class="referral-middle" data-v-f38c5494><div class="referral-code-area" data-v-f38c5494><div class="area-header" data-v-f38c5494>我的推广码</div><div class="code-content" data-v-f38c5494><div class="code-label" data-v-f38c5494>您的专属推广码</div><div class="code-section" data-v-f38c5494><div class="code-display" data-v-f38c5494>${ssrInterpolate(inviteInfo.value.code)}</div><button class="copy-code-btn" data-v-f38c5494>复制推广码</button></div></div></div><div class="referral-link-area" data-v-f38c5494><div class="area-header" data-v-f38c5494>推广链接</div><div class="link-content" data-v-f38c5494><div class="link-label" data-v-f38c5494>您的专属推广链接</div><div class="link-section" data-v-f38c5494><input type="text" class="link-input"${ssrRenderAttr("value", inviteInfo.value.link)} readonly data-v-f38c5494><button class="copy-link-btn" data-v-f38c5494>复制链接</button></div><p class="link-tip" data-v-f38c5494>分享此链接给好友，好友通过此链接注册即可成为您的推广用户</p></div></div></div><div class="referral-stats" data-v-f38c5494><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="推广用户图标" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>用户</div></div></div><div class="stat-label" data-v-f38c5494>推广用户</div><div class="stat-value" data-v-f38c5494>${ssrInterpolate(stats.value.registerNum ?? 0)}</div></div><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="成功订单图标" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>订单</div></div></div><div class="stat-label" data-v-f38c5494>成功订单</div><div class="stat-value" data-v-f38c5494>${ssrInterpolate(stats.value.orderNum ?? 0)}</div></div><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="累计收益图标" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>收益</div></div></div><div class="stat-label" data-v-f38c5494>累计收益</div><div class="stat-value" data-v-f38c5494>¥${ssrInterpolate(stats.value.orderAmount ?? 0)}</div></div><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="本月收益图标" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>月收益</div></div></div><div class="stat-label" data-v-f38c5494>本月收益</div><div class="stat-value" data-v-f38c5494>--</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/referral.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const referral = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f38c5494"]]);
export {
  referral as default
};
//# sourceMappingURL=referral-CXlLgOio.js.map
