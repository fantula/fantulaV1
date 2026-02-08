import { E as ElIcon } from "./index-jl2vZbkg.js";
/* empty css              */
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { M as warning_default } from "./index-DlETah8a.js";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseInfiniteList",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    finished: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    finishedText: { type: String, default: "没有更多了" },
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
          _push(`<div class="glass-loader" data-v-e19896b5></div><span class="loading-text" data-v-e19896b5>正在加载更多...</span>`);
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
        _push(`<span data-v-e19896b5>加载失败，点击重试</span></div>`);
      } else if (__props.finished) {
        _push(`<div class="status-finished" data-v-e19896b5><div class="finished-line" data-v-e19896b5></div>`);
        ssrRenderSlot(_ctx.$slots, "finished", {}, () => {
          _push(`<span class="finished-text" data-v-e19896b5>${ssrInterpolate(__props.finishedText)}</span>`);
        }, _push, _parent);
        _push(`<div class="finished-line" data-v-e19896b5></div></div>`);
      } else if (__props.type === "button") {
        _push(`<div class="status-action" data-v-e19896b5><button class="load-more-btn" data-v-e19896b5> 加载更多 </button></div>`);
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
export {
  BaseInfiniteList as B
};
//# sourceMappingURL=BaseInfiniteList-64au3mej.js.map
