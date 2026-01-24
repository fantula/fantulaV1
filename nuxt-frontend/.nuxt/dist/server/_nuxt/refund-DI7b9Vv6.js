import { u as useModalStore, E as ElIcon, $ as document_default, a0 as money_default, a1 as guide_default, s as service_default, a2 as warning_default, a3 as info_filled_default, c as __nuxt_component_2, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "refund",
  __ssrInlineRender: true,
  setup(__props) {
    const modal = useModalStore();
    useHead({
      title: "退款与售后政策 - 凡图拉",
      meta: [
        { name: "description", content: "凡图拉退款与售后政策，了解数字商品退款规则和服务说明。" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_LoginRegisterModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-page" }, _attrs))} data-v-5f694132><div class="refund-content" data-v-5f694132><div class="refund-header" data-v-5f694132><div class="refund-header-title" data-v-5f694132>退款与售后政策</div><div class="refund-header-desc" data-v-5f694132>本政策适用于本平台所售数字商品的退款、售后处理与服务说明</div></div><div class="refund-body" data-v-5f694132><div class="refund-panel" data-v-5f694132><div class="panel-content" data-v-5f694132><div class="policy-section" data-v-5f694132><div class="section-header" data-v-5f694132><div class="section-icon" data-v-5f694132>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(document_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(document_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="section-title" data-v-5f694132>政策说明</div></div><div class="section-content" data-v-5f694132><div class="welcome-text" data-v-5f694132> 欢迎您使用凡图拉平台。本政策适用于本平台所售数字商品（包括但不限于各类会员订阅、礼品卡、虚拟产品代充服务等）的退款、售后处理与服务说明。 </div><div class="highlight-notice" data-v-5f694132> 请仔细阅读以下条款，在您购买商品时即表示您已同意本政策的所有内容。 </div></div></div><div class="policy-section" data-v-5f694132><div class="section-header" data-v-5f694132><div class="section-icon" data-v-5f694132>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(money_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(money_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="section-title" data-v-5f694132>一、退款规则</div></div><div class="section-content" data-v-5f694132><div class="rule-item main-rule" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>凡图拉平台所售商品一律为虚拟数字商品，一经发货视为服务完成，不支持无理由退款或退货。</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>如遇下列情况，平台可支持退款：</div></div><div class="sub-rules" data-v-5f694132><div class="sub-rule-item" data-v-5f694132><span class="sub-rule-dot" data-v-5f694132>-</span><span class="sub-rule-text" data-v-5f694132>商品未能成功交付，或因平台操作问题导致下单失败；</span></div><div class="sub-rule-item" data-v-5f694132><span class="sub-rule-dot" data-v-5f694132>-</span><span class="sub-rule-text" data-v-5f694132>商品未使用，且平台在核验后确认符合退款条件；</span></div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>所有退款将以平台「钱包余额」形式退回，不支持原路退回或提现。</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>平台钱包余额可继续用于购买本平台商品，不具备法币提现功能。</div></div></div></div><div class="policy-section" data-v-5f694132><div class="section-header" data-v-5f694132><div class="section-icon" data-v-5f694132>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(guide_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(guide_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="section-title" data-v-5f694132>二、申请流程</div></div><div class="section-content" data-v-5f694132><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>用户可在订单页面点击申请售后，或通过客服提交问题描述和订单信息；</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>平台将在1-3个工作日内审核并给予答复，如通过审核将直接退回钱包余额；</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>若申请被驳回，用户仍可继续通过人工客服申诉一次。</div></div></div></div><div class="policy-section" data-v-5f694132><div class="section-header" data-v-5f694132><div class="section-icon" data-v-5f694132>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(service_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(service_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="section-title" data-v-5f694132>三、售后支持</div></div><div class="section-content" data-v-5f694132><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>国内客服渠道：微信客服</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>海外客服（待上线）：Telegram / WhatsApp</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>服务时间：9:00 - 22:00（北京时间），节假日可能顺延</div></div></div></div><div class="policy-section" data-v-5f694132><div class="section-header" data-v-5f694132><div class="section-icon" data-v-5f694132>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(warning_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="section-title" data-v-5f694132>四、平台责任范围</div></div><div class="section-content" data-v-5f694132><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>平台为第三方中介平台，代购服务完成后若因目标服务商（如会员平台）封禁、拒绝登录、地区限制等问题导致无法使用，平台将尽力协助申诉，但不承担责任赔偿或再次补发义务。</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>用户因账号自身问题、填错信息、误操作、遗失登录方式等，导致商品失效的，平台不予退款。</div></div><div class="rule-item" data-v-5f694132><div class="rule-dot" data-v-5f694132></div><div class="rule-text" data-v-5f694132>虚拟商品价格可能因汇率、地区限制、官方定价变动随时调整，用户应以下单时价格为准。</div></div><div class="important-disclaimer" data-v-5f694132><div class="disclaimer-title" data-v-5f694132>重要免责声明</div><div class="disclaimer-text" data-v-5f694132> 凡图拉平台作为中介服务商，仅提供代购服务，不直接提供数字商品内容。所有商品内容由目标服务商提供，平台不承担因目标服务商政策变更、服务中断等导致的损失。 </div></div></div></div></div></div></div><div class="important-notice-section" data-v-5f694132><div class="notice-container" data-v-5f694132><div class="notice-header" data-v-5f694132><div class="notice-icon" data-v-5f694132>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(info_filled_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="notice-title" data-v-5f694132>重要提示</div></div><div class="notice-content" data-v-5f694132> 请在购买前仔细阅读本政策，如有疑问请联系客服咨询。购买即表示您已理解并同意本政策的所有条款。本政策可能不定期更新，请定期查阅最新版本。 </div></div></div></div>`);
      _push(ssrRenderComponent(_component_LoginRegisterModal, {
        visible: unref(modal).showLogin,
        onClose: ($event) => unref(modal).closeLogin()
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/refund.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const refund = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f694132"]]);
export {
  refund as default
};
//# sourceMappingURL=refund-DI7b9Vv6.js.map
