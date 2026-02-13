import { E as ElIcon } from "./index-CsSUb8pm.js";
import __nuxt_component_0 from "./LoginRegisterModal-CloBqWAq.js";
/* empty css              */
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useModalStore } from "./modal-_wZ2Eah3.js";
import { N as document_default, Q as money_default, R as guide_default, s as service_default, S as warning_default, i as info_filled_default } from "./index-DuV_oMrC.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./nuxt-link-R7CyI21u.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
/* empty css                    */
import "./user-C1i1UnhA.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
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
import "./common-D9iMPQj0.js";
import "./cart-B8xez9id.js";
import "./EmailInput-BxuFUYqG.js";
import "./SendCodeButton-BHMZfVap.js";
import "./BaseButton-BnWAaIRO.js";
import "./BaseModal-nbvk9VuE.js";
import "./wechat-login-WH-GLTWF.js";
import "./useSendCode-BPjllPca.js";
import "./interval-BHZX8LlC.js";
import "./index-Ho-fELR6.js";
import "./typescript-D6L75muK.js";
import "./icon-CyvpkMdQ.js";
import "./use-global-config-Dt87SALX.js";
import "./index-xMedQC9S.js";
import "./event-D3FEo2C5.js";
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
      const _component_LoginRegisterModal = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-page" }, _attrs))} data-v-d7ec225d><div class="refund-content" data-v-d7ec225d><div class="refund-header" data-v-d7ec225d><div class="refund-header-title" data-v-d7ec225d>售后支持与权益保障</div><div class="refund-header-desc" data-v-d7ec225d>本政策适用于本平台数字化服务的售后处理与权益保障说明</div></div><div class="refund-body" data-v-d7ec225d><div class="refund-panel" data-v-d7ec225d><div class="panel-content" data-v-d7ec225d><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>政策说明</div></div><div class="section-content" data-v-d7ec225d><div class="welcome-text" data-v-d7ec225d> 欢迎您使用凡图拉平台。本政策适用于本平台提供的各类数字化权益服务（包括但不限于会员权益订阅、礼品卡兑换、虚拟权益协助等）的售后处理与服务说明。 </div><div class="highlight-notice" data-v-d7ec225d> 请仔细阅读以下条款，在您订阅服务时即表示您已同意本政策的所有内容。 </div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>一、权益返还规则</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item main-rule" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>凡图拉平台所提供服务均为数字化权益服务，一经交付视为服务完成，不支持无理由撤销服务订阅。</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>如遇下列情况，平台可支持权益回退：</div></div><div class="sub-rules" data-v-d7ec225d><div class="sub-rule-item" data-v-d7ec225d><span class="sub-rule-dot" data-v-d7ec225d>-</span><span class="sub-rule-text" data-v-d7ec225d>权益未能成功交付，或因平台原因导致订阅失败；</span></div><div class="sub-rule-item" data-v-d7ec225d><span class="sub-rule-dot" data-v-d7ec225d>-</span><span class="sub-rule-text" data-v-d7ec225d>权益码未使用，且平台在核验后确认符合回退条件；</span></div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>所有权益回退将以平台「服务额度」形式返还，不具备货币兑换或转账功能。</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>平台服务额度可继续用于兑换本平台其他服务权益。</div></div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>二、申请流程</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>用户可在订单页面点击申请售后，或通过客服提交问题描述和订单信息；</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>平台将在1-3个工作日内审核并给予答复，如通过审核将直接返还至服务额度；</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>若申请被驳回，用户仍可继续通过人工客服申诉一次。</div></div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>三、售后支持</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>国内客服渠道：微信客服</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>海外客服（待上线）：Telegram / WhatsApp</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>服务时间：9:00 - 22:00（北京时间），节假日可能顺延</div></div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>四、平台责任范围</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>平台为第三方数字化权益服务平台，服务交付完成后若因目标服务商（如会员平台）封禁、拒绝登录、地区限制等问题导致无法使用，平台将尽力协助申诉，但不承担责任赔偿或再次补发义务。</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>用户因账号自身问题、填错信息、误操作、遗失登录方式等，导致权益失效的，平台不予受理。</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>虚拟权益价值可能因汇率、地区限制、官方政策变动随时调整，用户应以订阅时显示为准。</div></div><div class="important-disclaimer" data-v-d7ec225d><div class="disclaimer-title" data-v-d7ec225d>重要免责声明</div><div class="disclaimer-text" data-v-d7ec225d> 凡图拉平台作为服务提供商，仅提供数字化权益协助服务。所有核心权益内容由目标服务商提供，平台不承担因目标服务商政策变更、服务中断等导致的损失。 </div></div></div></div></div></div></div><div class="important-notice-section" data-v-d7ec225d><div class="notice-container" data-v-d7ec225d><div class="notice-header" data-v-d7ec225d><div class="notice-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="notice-title" data-v-d7ec225d>重要提示</div></div><div class="notice-content" data-v-d7ec225d> 请在购买前仔细阅读本政策，如有疑问请联系客服咨询。购买即表示您已理解并同意本政策的所有条款。本政策可能不定期更新，请定期查阅最新版本。 </div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/refund.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const refund = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7ec225d"]]);
export {
  refund as default
};
//# sourceMappingURL=refund-B6P-6EHm.js.map
