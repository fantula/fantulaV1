import { A as __nuxt_component_0 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { A as AdminModuleLayout } from './AdminModuleLayout-CO8X8t6n.mjs';
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
  __name: "backend-settings",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { name: "info", label: "\u7CFB\u7EDF\u72B6\u6001", route: "/admin/backend-settings" },
      { name: "contact", label: "\u8054\u7CFB\u65B9\u5F0F", route: "/admin/backend-settings/contact" },
      { name: "scheduler", label: "\u5B9A\u65F6\u4EFB\u52A1", route: "/admin/backend-settings/scheduler" },
      { name: "storage", label: "\u5B58\u50A8\u6D4B\u8BD5", route: "/admin/backend-settings/storage" },
      { name: "notification", label: "\u90AE\u4EF6\u901A\u77E5", route: "/admin/backend-settings/notification" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(ssrRenderComponent(AdminModuleLayout, mergeProps({
        title: "\u7CFB\u7EDF\u8BBE\u7F6E",
        tabs,
        "default-tab": "info"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=backend-settings-gnAz70O_.mjs.map
