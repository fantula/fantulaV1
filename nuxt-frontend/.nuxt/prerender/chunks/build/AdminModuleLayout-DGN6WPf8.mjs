import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useAdminHeaderStore } from './header-BPApn9bB.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminModuleLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    tabs: {},
    defaultTab: {},
    hideTabsOn: { default: () => ["/post", "/edit"] }
  },
  emits: ["tab-change"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const route = useRoute();
    useRouter();
    const headerStore = useAdminHeaderStore();
    const activeTab = ref(props.defaultTab || ((_a = props.tabs[0]) == null ? void 0 : _a.name) || "");
    const updateActiveTab = () => {
      var _a2;
      const path = route.path;
      let bestMatch = null;
      let bestMatchLength = 0;
      for (const tab of props.tabs) {
        if (!tab.route) continue;
        if (path === tab.route) {
          bestMatch = tab.name;
          break;
        }
        const tabRouteDir = tab.route.endsWith("/") ? tab.route : `${tab.route}/`;
        const currentPathDir = path.endsWith("/") ? path : `${path}/`;
        if (currentPathDir.startsWith(tabRouteDir)) {
          if (tab.route.length > bestMatchLength) {
            bestMatch = tab.name;
            bestMatchLength = tab.route.length;
          }
        }
      }
      if (bestMatch) {
        activeTab.value = bestMatch;
        headerStore.setActiveTab(bestMatch);
      } else {
        const fallbackName = props.defaultTab || ((_a2 = props.tabs[0]) == null ? void 0 : _a2.name) || "";
        const fallbackTab = props.tabs.find((t) => t.name === fallbackName);
        if (fallbackTab) {
          activeTab.value = fallbackTab.name;
          headerStore.setActiveTab(fallbackTab.name);
        }
      }
    };
    const syncHeader = () => {
      const shouldShowTabs = !props.hideTabsOn.some((keyword) => route.path.includes(keyword));
      const tabsToShow = shouldShowTabs ? props.tabs : [];
      headerStore.setLayout(props.title, tabsToShow, activeTab.value);
    };
    watch(() => route.path, () => {
      updateActiveTab();
      syncHeader();
    });
    watch(() => props.defaultTab, (val) => {
      if (val) {
        activeTab.value = val;
        headerStore.setActiveTab(val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-module-layout" }, _attrs))} data-v-ef52de23><div class="module-content" data-v-ef52de23>`);
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
const AdminModuleLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef52de23"]]);

export { AdminModuleLayout as A };
//# sourceMappingURL=AdminModuleLayout-DGN6WPf8.mjs.map
