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
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { name: "recharge", label: "\u865A\u62DF\u5145\u503C", route: "/_mgmt_9Xfa3/orders/recharge" },
      { name: "share", label: "\u8D26\u53F7\u5408\u79DF", route: "/_mgmt_9Xfa3/orders/share" },
      { name: "cdkey", label: "\u5151\u6362\u7801", route: "/_mgmt_9Xfa3/orders/cdkey" },
      { name: "refund", label: "\u9000\u6B3E\u7BA1\u7406", route: "/_mgmt_9Xfa3/orders/refund" },
      { name: "cancelled-refunds", label: "\u9000\u6B3E\u7EDF\u8BA1", route: "/_mgmt_9Xfa3/orders/cancelled-refunds" },
      { name: "preorders", label: "\u9884\u8BA2\u5355\u7EDF\u8BA1", route: "/_mgmt_9Xfa3/orders/preorders" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(ssrRenderComponent(AdminModuleLayout, mergeProps({
        title: "\u8BA2\u5355\u7BA1\u7406",
        tabs,
        "default-tab": "recharge",
        "hide-tabs-on": ["/post", "/detail"]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=orders-Dipj1ssh.mjs.map
