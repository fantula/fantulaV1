import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileInfiniteList",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    finished: { type: Boolean },
    list: {},
    distance: {}
  },
  emits: ["load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sentinel = ref(null);
    let observer = null;
    const setupObserver = () => {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !props.loading && !props.finished) {
          emit("load");
        }
      }, {
        root: null,
        rootMargin: `0px 0px ${props.distance || 100}px 0px`,
        threshold: 0.1
      });
      if (sentinel.value) {
        observer.observe(sentinel.value);
      }
    };
    watch(sentinel, () => {
      setupObserver();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-infinite-list" }, _attrs))} data-v-fd61fb37>`);
      if (__props.list.length > 0) {
        _push(`<div class="list-content" data-v-fd61fb37>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (!__props.loading && __props.list.length === 0) {
        _push(`<div class="empty-state" data-v-fd61fb37>`);
        ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
          _push(`<div class="default-empty" data-v-fd61fb37>\u6682\u65E0\u6570\u636E</div>`);
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="list-status" data-v-fd61fb37>`);
      if (__props.loading) {
        _push(`<div class="loading-text" data-v-fd61fb37>`);
        ssrRenderSlot(_ctx.$slots, "loading", {}, () => {
          _push(`<div class="loading-spinner" data-v-fd61fb37></div> \u52A0\u8F7D\u4E2D... `);
        }, _push, _parent);
        _push(`</div>`);
      } else if (__props.finished && __props.list.length > 0) {
        _push(`<div class="finished-text" data-v-fd61fb37>`);
        ssrRenderSlot(_ctx.$slots, "finished", {}, () => {
          _push(`\u6CA1\u6709\u66F4\u591A\u4E86`);
        }, _push, _parent);
        _push(`</div>`);
      } else if (!__props.finished && !__props.loading) {
        _push(`<div style="${ssrRenderStyle({ "height": "1px", "width": "100%" })}" data-v-fd61fb37></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/list/MobileInfiniteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileInfiniteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd61fb37"]]);

export { MobileInfiniteList as M };
//# sourceMappingURL=MobileInfiniteList-D165vu5R.mjs.map
