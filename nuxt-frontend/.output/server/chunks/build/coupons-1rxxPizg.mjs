import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { A as AdminModuleLayout } from './AdminModuleLayout-5BkqoH-c.mjs';
import './server.mjs';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
  __name: "coupons",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { name: "balance", label: "\u989D\u5EA6\u5238", route: "/_mgmt_9Xfa3/coupons/balance" },
      { name: "flat", label: "\u7ACB\u51CF\u5238", route: "/_mgmt_9Xfa3/coupons/flat" },
      { name: "product", label: "\u6307\u5B9A\u5546\u54C1", route: "/_mgmt_9Xfa3/coupons/product" },
      { name: "stats", label: "\u4F18\u60E0\u5238\u7EDF\u8BA1", route: "/_mgmt_9Xfa3/coupons/stats" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(ssrRenderComponent(AdminModuleLayout, mergeProps({
        title: "\u4F18\u60E0\u5238\u7BA1\u7406",
        tabs,
        "default-tab": "balance",
        "hide-tabs-on": ["/post"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_router_view, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_router_view)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/coupons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=coupons-1rxxPizg.mjs.map
