import { bt as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
/* empty css                    */
/* empty css                     */
import { defineComponent, ref, watch, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
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
    const props = __props;
    const route = useRoute();
    useRouter();
    const activeTab = ref(props.defaultTab || props.tabs[0]?.name || "");
    const updateActiveTab = () => {
      const path = route.path;
      for (const tab of props.tabs) {
        if (tab.route && (path === tab.route || tab.route !== props.tabs[0]?.route && path.startsWith(tab.route))) {
          activeTab.value = tab.name;
          return;
        }
      }
      if (!activeTab.value) {
        activeTab.value = props.defaultTab || props.tabs[0]?.name || "";
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
      const _component_ClientOnly = __nuxt_component_0;
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
export {
  AdminModuleLayout as A
};
//# sourceMappingURL=AdminModuleLayout-5BkqoH-c.js.map
