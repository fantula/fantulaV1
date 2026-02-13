import { E as ElIcon } from './index-CsSUb8pm.mjs';
import __nuxt_component_0 from './LoginRegisterModal-CloBqWAq.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useModalStore } from './modal-_wZ2Eah3.mjs';
import { N as document_default, Q as money_default, R as guide_default, s as service_default, S as warning_default, i as info_filled_default } from './index-DuV_oMrC.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vueuse/core';
import '@vue/shared';
import './objects-Bz74KHmq.mjs';
import 'lodash-unified';
import './nuxt-link-R7CyI21u.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './user-C1i1UnhA.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
import './common-D9iMPQj0.mjs';
import './cart-B8xez9id.mjs';
import './EmailInput-BxuFUYqG.mjs';
import './SendCodeButton-BHMZfVap.mjs';
import './BaseButton-BnWAaIRO.mjs';
import './BaseModal-nbvk9VuE.mjs';
import './wechat-login-WH-GLTWF.mjs';
import './useSendCode-BPjllPca.mjs';
import './interval-BHZX8LlC.mjs';
import './index-Ho-fELR6.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CyvpkMdQ.mjs';
import './use-global-config-Dt87SALX.mjs';
import './index-xMedQC9S.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "refund",
  __ssrInlineRender: true,
  setup(__props) {
    const modal = useModalStore();
    useHead({
      title: "\u9000\u6B3E\u4E0E\u552E\u540E\u653F\u7B56 - \u51E1\u56FE\u62C9",
      meta: [
        { name: "description", content: "\u51E1\u56FE\u62C9\u9000\u6B3E\u4E0E\u552E\u540E\u653F\u7B56\uFF0C\u4E86\u89E3\u6570\u5B57\u5546\u54C1\u9000\u6B3E\u89C4\u5219\u548C\u670D\u52A1\u8BF4\u660E\u3002" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_LoginRegisterModal = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-page" }, _attrs))} data-v-d7ec225d><div class="refund-content" data-v-d7ec225d><div class="refund-header" data-v-d7ec225d><div class="refund-header-title" data-v-d7ec225d>\u552E\u540E\u652F\u6301\u4E0E\u6743\u76CA\u4FDD\u969C</div><div class="refund-header-desc" data-v-d7ec225d>\u672C\u653F\u7B56\u9002\u7528\u4E8E\u672C\u5E73\u53F0\u6570\u5B57\u5316\u670D\u52A1\u7684\u552E\u540E\u5904\u7406\u4E0E\u6743\u76CA\u4FDD\u969C\u8BF4\u660E</div></div><div class="refund-body" data-v-d7ec225d><div class="refund-panel" data-v-d7ec225d><div class="panel-content" data-v-d7ec225d><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>\u653F\u7B56\u8BF4\u660E</div></div><div class="section-content" data-v-d7ec225d><div class="welcome-text" data-v-d7ec225d> \u6B22\u8FCE\u60A8\u4F7F\u7528\u51E1\u56FE\u62C9\u5E73\u53F0\u3002\u672C\u653F\u7B56\u9002\u7528\u4E8E\u672C\u5E73\u53F0\u63D0\u4F9B\u7684\u5404\u7C7B\u6570\u5B57\u5316\u6743\u76CA\u670D\u52A1\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u4F1A\u5458\u6743\u76CA\u8BA2\u9605\u3001\u793C\u54C1\u5361\u5151\u6362\u3001\u865A\u62DF\u6743\u76CA\u534F\u52A9\u7B49\uFF09\u7684\u552E\u540E\u5904\u7406\u4E0E\u670D\u52A1\u8BF4\u660E\u3002 </div><div class="highlight-notice" data-v-d7ec225d> \u8BF7\u4ED4\u7EC6\u9605\u8BFB\u4EE5\u4E0B\u6761\u6B3E\uFF0C\u5728\u60A8\u8BA2\u9605\u670D\u52A1\u65F6\u5373\u8868\u793A\u60A8\u5DF2\u540C\u610F\u672C\u653F\u7B56\u7684\u6240\u6709\u5185\u5BB9\u3002 </div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>\u4E00\u3001\u6743\u76CA\u8FD4\u8FD8\u89C4\u5219</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item main-rule" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u51E1\u56FE\u62C9\u5E73\u53F0\u6240\u63D0\u4F9B\u670D\u52A1\u5747\u4E3A\u6570\u5B57\u5316\u6743\u76CA\u670D\u52A1\uFF0C\u4E00\u7ECF\u4EA4\u4ED8\u89C6\u4E3A\u670D\u52A1\u5B8C\u6210\uFF0C\u4E0D\u652F\u6301\u65E0\u7406\u7531\u64A4\u9500\u670D\u52A1\u8BA2\u9605\u3002</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u5982\u9047\u4E0B\u5217\u60C5\u51B5\uFF0C\u5E73\u53F0\u53EF\u652F\u6301\u6743\u76CA\u56DE\u9000\uFF1A</div></div><div class="sub-rules" data-v-d7ec225d><div class="sub-rule-item" data-v-d7ec225d><span class="sub-rule-dot" data-v-d7ec225d>-</span><span class="sub-rule-text" data-v-d7ec225d>\u6743\u76CA\u672A\u80FD\u6210\u529F\u4EA4\u4ED8\uFF0C\u6216\u56E0\u5E73\u53F0\u539F\u56E0\u5BFC\u81F4\u8BA2\u9605\u5931\u8D25\uFF1B</span></div><div class="sub-rule-item" data-v-d7ec225d><span class="sub-rule-dot" data-v-d7ec225d>-</span><span class="sub-rule-text" data-v-d7ec225d>\u6743\u76CA\u7801\u672A\u4F7F\u7528\uFF0C\u4E14\u5E73\u53F0\u5728\u6838\u9A8C\u540E\u786E\u8BA4\u7B26\u5408\u56DE\u9000\u6761\u4EF6\uFF1B</span></div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u6240\u6709\u6743\u76CA\u56DE\u9000\u5C06\u4EE5\u5E73\u53F0\u300C\u670D\u52A1\u989D\u5EA6\u300D\u5F62\u5F0F\u8FD4\u8FD8\uFF0C\u4E0D\u5177\u5907\u8D27\u5E01\u5151\u6362\u6216\u8F6C\u8D26\u529F\u80FD\u3002</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u5E73\u53F0\u670D\u52A1\u989D\u5EA6\u53EF\u7EE7\u7EED\u7528\u4E8E\u5151\u6362\u672C\u5E73\u53F0\u5176\u4ED6\u670D\u52A1\u6743\u76CA\u3002</div></div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>\u4E8C\u3001\u7533\u8BF7\u6D41\u7A0B</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u7528\u6237\u53EF\u5728\u8BA2\u5355\u9875\u9762\u70B9\u51FB\u7533\u8BF7\u552E\u540E\uFF0C\u6216\u901A\u8FC7\u5BA2\u670D\u63D0\u4EA4\u95EE\u9898\u63CF\u8FF0\u548C\u8BA2\u5355\u4FE1\u606F\uFF1B</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u5E73\u53F0\u5C06\u57281-3\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5BA1\u6838\u5E76\u7ED9\u4E88\u7B54\u590D\uFF0C\u5982\u901A\u8FC7\u5BA1\u6838\u5C06\u76F4\u63A5\u8FD4\u8FD8\u81F3\u670D\u52A1\u989D\u5EA6\uFF1B</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u82E5\u7533\u8BF7\u88AB\u9A73\u56DE\uFF0C\u7528\u6237\u4ECD\u53EF\u7EE7\u7EED\u901A\u8FC7\u4EBA\u5DE5\u5BA2\u670D\u7533\u8BC9\u4E00\u6B21\u3002</div></div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>\u4E09\u3001\u552E\u540E\u652F\u6301</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u56FD\u5185\u5BA2\u670D\u6E20\u9053\uFF1A\u5FAE\u4FE1\u5BA2\u670D</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u6D77\u5916\u5BA2\u670D\uFF08\u5F85\u4E0A\u7EBF\uFF09\uFF1ATelegram / WhatsApp</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u670D\u52A1\u65F6\u95F4\uFF1A9:00 - 22:00\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09\uFF0C\u8282\u5047\u65E5\u53EF\u80FD\u987A\u5EF6</div></div></div></div><div class="policy-section" data-v-d7ec225d><div class="section-header" data-v-d7ec225d><div class="section-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="section-title" data-v-d7ec225d>\u56DB\u3001\u5E73\u53F0\u8D23\u4EFB\u8303\u56F4</div></div><div class="section-content" data-v-d7ec225d><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u5E73\u53F0\u4E3A\u7B2C\u4E09\u65B9\u6570\u5B57\u5316\u6743\u76CA\u670D\u52A1\u5E73\u53F0\uFF0C\u670D\u52A1\u4EA4\u4ED8\u5B8C\u6210\u540E\u82E5\u56E0\u76EE\u6807\u670D\u52A1\u5546\uFF08\u5982\u4F1A\u5458\u5E73\u53F0\uFF09\u5C01\u7981\u3001\u62D2\u7EDD\u767B\u5F55\u3001\u5730\u533A\u9650\u5236\u7B49\u95EE\u9898\u5BFC\u81F4\u65E0\u6CD5\u4F7F\u7528\uFF0C\u5E73\u53F0\u5C06\u5C3D\u529B\u534F\u52A9\u7533\u8BC9\uFF0C\u4F46\u4E0D\u627F\u62C5\u8D23\u4EFB\u8D54\u507F\u6216\u518D\u6B21\u8865\u53D1\u4E49\u52A1\u3002</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u7528\u6237\u56E0\u8D26\u53F7\u81EA\u8EAB\u95EE\u9898\u3001\u586B\u9519\u4FE1\u606F\u3001\u8BEF\u64CD\u4F5C\u3001\u9057\u5931\u767B\u5F55\u65B9\u5F0F\u7B49\uFF0C\u5BFC\u81F4\u6743\u76CA\u5931\u6548\u7684\uFF0C\u5E73\u53F0\u4E0D\u4E88\u53D7\u7406\u3002</div></div><div class="rule-item" data-v-d7ec225d><div class="rule-dot" data-v-d7ec225d></div><div class="rule-text" data-v-d7ec225d>\u865A\u62DF\u6743\u76CA\u4EF7\u503C\u53EF\u80FD\u56E0\u6C47\u7387\u3001\u5730\u533A\u9650\u5236\u3001\u5B98\u65B9\u653F\u7B56\u53D8\u52A8\u968F\u65F6\u8C03\u6574\uFF0C\u7528\u6237\u5E94\u4EE5\u8BA2\u9605\u65F6\u663E\u793A\u4E3A\u51C6\u3002</div></div><div class="important-disclaimer" data-v-d7ec225d><div class="disclaimer-title" data-v-d7ec225d>\u91CD\u8981\u514D\u8D23\u58F0\u660E</div><div class="disclaimer-text" data-v-d7ec225d> \u51E1\u56FE\u62C9\u5E73\u53F0\u4F5C\u4E3A\u670D\u52A1\u63D0\u4F9B\u5546\uFF0C\u4EC5\u63D0\u4F9B\u6570\u5B57\u5316\u6743\u76CA\u534F\u52A9\u670D\u52A1\u3002\u6240\u6709\u6838\u5FC3\u6743\u76CA\u5185\u5BB9\u7531\u76EE\u6807\u670D\u52A1\u5546\u63D0\u4F9B\uFF0C\u5E73\u53F0\u4E0D\u627F\u62C5\u56E0\u76EE\u6807\u670D\u52A1\u5546\u653F\u7B56\u53D8\u66F4\u3001\u670D\u52A1\u4E2D\u65AD\u7B49\u5BFC\u81F4\u7684\u635F\u5931\u3002 </div></div></div></div></div></div></div><div class="important-notice-section" data-v-d7ec225d><div class="notice-container" data-v-d7ec225d><div class="notice-header" data-v-d7ec225d><div class="notice-icon" data-v-d7ec225d>`);
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
      _push(`</div><div class="notice-title" data-v-d7ec225d>\u91CD\u8981\u63D0\u793A</div></div><div class="notice-content" data-v-d7ec225d> \u8BF7\u5728\u8D2D\u4E70\u524D\u4ED4\u7EC6\u9605\u8BFB\u672C\u653F\u7B56\uFF0C\u5982\u6709\u7591\u95EE\u8BF7\u8054\u7CFB\u5BA2\u670D\u54A8\u8BE2\u3002\u8D2D\u4E70\u5373\u8868\u793A\u60A8\u5DF2\u7406\u89E3\u5E76\u540C\u610F\u672C\u653F\u7B56\u7684\u6240\u6709\u6761\u6B3E\u3002\u672C\u653F\u7B56\u53EF\u80FD\u4E0D\u5B9A\u671F\u66F4\u65B0\uFF0C\u8BF7\u5B9A\u671F\u67E5\u9605\u6700\u65B0\u7248\u672C\u3002 </div></div></div></div>`);
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

export { refund as default };
//# sourceMappingURL=refund-B6P-6EHm.mjs.map
