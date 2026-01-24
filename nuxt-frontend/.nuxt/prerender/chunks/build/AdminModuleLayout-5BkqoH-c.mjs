import { _ as _export_sfc, bt as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, watch, computed, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminModuleLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    tabs: {},
    defaultTab: {},
    hideTabsOn: { default: () => ["/post", "/edit"] }
  },
  emits: ["tab-change", "refresh"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const route = useRoute();
    useRouter();
    const activeTab = ref(props.defaultTab || ((_a = props.tabs[0]) == null ? void 0 : _a.name) || "");
    const updateActiveTab = () => {
      var _a2, _b;
      const path = route.path;
      for (const tab of props.tabs) {
        if (tab.route && (path === tab.route || tab.route !== ((_a2 = props.tabs[0]) == null ? void 0 : _a2.route) && path.startsWith(tab.route))) {
          activeTab.value = tab.name;
          return;
        }
      }
      if (!activeTab.value) {
        activeTab.value = props.defaultTab || ((_b = props.tabs[0]) == null ? void 0 : _b.name) || "";
      }
    };
    watch(() => route.path, updateActiveTab, { immediate: true });
    watch(() => props.defaultTab, (val) => {
      if (val) activeTab.value = val;
    });
    computed(() => {
      return !props.hideTabsOn.some((keyword) => route.path.includes(keyword));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-module-layout" }, _attrs))} data-v-4615a496>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="module-content" data-v-4615a496>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminModuleLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminModuleLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4615a496"]]);

export { AdminModuleLayout as A };
//# sourceMappingURL=AdminModuleLayout-5BkqoH-c.mjs.map
