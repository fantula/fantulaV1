import { ref, watch, defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { P as warning_default } from './index-CmsdIFY8.mjs';
import { _ as _export_sfc } from './server.mjs';

function useInfiniteScroll(options) {
  const {
    data,
    fetchData,
    pageSize = 10,
    manual = false
  } = options;
  const displayList = ref([]);
  const loading = ref(false);
  const finished = ref(false);
  const page = ref(1);
  const total = ref(0);
  const error = ref(false);
  const isClientMode = !!data;
  const loadMore = async () => {
    if (loading.value || finished.value) return;
    loading.value = true;
    error.value = false;
    try {
      if (isClientMode) {
        const sourceData = data.value;
        const start = (page.value - 1) * pageSize;
        const end = start + pageSize;
        const nextBatch = sourceData.slice(start, end);
        if (nextBatch.length > 0) {
          displayList.value.push(...nextBatch);
          page.value++;
        }
        if (displayList.value.length >= sourceData.length) {
          finished.value = true;
        }
      } else if (fetchData) {
        const res = await fetchData(page.value, pageSize);
        if (res.list.length > 0) {
          displayList.value.push(...res.list);
          page.value++;
        }
        if (res.hasMore === false || res.list.length < pageSize) {
          finished.value = true;
        }
        if (typeof res.total === "number") {
          total.value = res.total;
        }
      }
    } catch (e) {
      console.error("Infinite Scroll Load Error:", e);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };
  const reset = () => {
    displayList.value = [];
    page.value = 1;
    finished.value = false;
    loading.value = false;
    error.value = false;
    loadMore();
  };
  if (isClientMode) {
    watch(data, () => {
      reset();
    });
  } else if (!manual) {
    loadMore();
  }
  return {
    displayList,
    loading,
    finished,
    error,
    loadMore,
    reset
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseInfiniteList",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    finished: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    finishedText: { type: String, default: "\u6CA1\u6709\u66F4\u591A\u4E86" },
    type: { type: String, default: "scroll", validator: (v) => ["scroll", "button"].includes(v) },
    offset: { type: Number, default: 100 }
    // Distance from bottom to trigger
  },
  emits: ["load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const triggerRef = ref(null);
    let observer = null;
    const startObserver = () => {
      if (props.type !== "scroll" || !triggerRef.value) return;
      stopObserver();
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !props.loading && !props.finished && !props.error) {
          emit("load");
        }
      }, {
        root: null,
        // viewport
        rootMargin: `0px 0px ${props.offset}px 0px`,
        threshold: 0.1
      });
      observer.observe(triggerRef.value);
    };
    const stopObserver = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
    watch(() => [props.loading, props.finished, props.error, props.type], () => {
      if (props.finished || props.type === "button") {
        stopObserver();
      } else {
        startObserver();
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "base-infinite-list" }, _attrs))} data-v-e19896b5><div class="list-content" data-v-e19896b5>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="list-status" style="${ssrRenderStyle(__props.loading || __props.finished || __props.error || __props.type === "scroll" ? null : { display: "none" })}" data-v-e19896b5>`);
      if (__props.loading) {
        _push(`<div class="status-loading" data-v-e19896b5>`);
        ssrRenderSlot(_ctx.$slots, "loading", {}, () => {
          _push(`<div class="glass-loader" data-v-e19896b5></div><span class="loading-text" data-v-e19896b5>\u6B63\u5728\u52A0\u8F7D\u66F4\u591A...</span>`);
        }, _push, _parent);
        _push(`</div>`);
      } else if (__props.error) {
        _push(`<div class="status-error" data-v-e19896b5>`);
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
        _push(`<span data-v-e19896b5>\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5</span></div>`);
      } else if (__props.finished) {
        _push(`<div class="status-finished" data-v-e19896b5><div class="finished-line" data-v-e19896b5></div>`);
        ssrRenderSlot(_ctx.$slots, "finished", {}, () => {
          _push(`<span class="finished-text" data-v-e19896b5>${ssrInterpolate(__props.finishedText)}</span>`);
        }, _push, _parent);
        _push(`<div class="finished-line" data-v-e19896b5></div></div>`);
      } else if (__props.type === "button") {
        _push(`<div class="status-action" data-v-e19896b5><button class="load-more-btn" data-v-e19896b5> \u52A0\u8F7D\u66F4\u591A </button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BaseInfiniteList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseInfiniteList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e19896b5"]]);

export { BaseInfiniteList as B, useInfiniteScroll as u };
//# sourceMappingURL=BaseInfiniteList-C6mBVzQc.mjs.map
