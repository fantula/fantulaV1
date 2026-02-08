import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { G as check_default } from './index-DlETah8a.mjs';
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
  __name: "MobilePaySuccessModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    orderNo: {},
    amount: {}
  },
  emits: ["close", "viewOrder", "goHome"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-7110e182><div class="modal-content" data-v-7110e182><div class="success-header" data-v-7110e182><div class="icon-circle" data-v-7110e182>`);
          _push2(ssrRenderComponent(_component_el_icon, { class: "check-icon" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(check_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(check_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="success-title" data-v-7110e182>\u652F\u4ED8\u6210\u529F</div></div><div class="success-body" data-v-7110e182><div class="info-row" data-v-7110e182><span class="label" data-v-7110e182>\u8BA2\u5355\u7F16\u53F7</span><span class="val link" data-v-7110e182>${ssrInterpolate(__props.orderNo)}</span></div><div class="info-row" data-v-7110e182><span class="label" data-v-7110e182>\u652F\u4ED8\u91D1\u989D</span><span class="val amount" data-v-7110e182>${ssrInterpolate(__props.amount)} <span class="unit" data-v-7110e182>\u70B9</span></span></div></div><div class="modal-footer" data-v-7110e182><button class="btn-primary" data-v-7110e182>\u67E5\u770B\u8BA2\u5355</button><button class="btn-secondary" data-v-7110e182>\u8FD4\u56DE\u9996\u9875</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/checkout/MobilePaySuccessModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobilePaySuccessModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7110e182"]]);

export { MobilePaySuccessModal as default };
//# sourceMappingURL=MobilePaySuccessModal-Bx1TfsZr.mjs.map
