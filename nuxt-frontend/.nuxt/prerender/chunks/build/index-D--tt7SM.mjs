import { w as withInstall, o as withNoopInstall, y as picture_filled_default, b as buildProps, d as definePropType } from './index-CRs4T-Jf.mjs';
import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, createBlock, createCommentVNode, toRef, mergeProps, Fragment, renderList, renderSlot, createVNode, normalizeProps, ref, watch } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { b as useNamespace, i as isNumber$1, x as isUndefined$1 } from './server.mjs';
import { isObject } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';

const skeletonProps = buildProps({
  /**
   * @description whether showing the animation
   */
  animated: Boolean,
  /**
   * @description how many fake items to render to the DOM
   */
  count: {
    type: Number,
    default: 1
  },
  /**
   * @description numbers of the row, only useful when no template slot were given
   */
  rows: {
    type: Number,
    default: 3
  },
  /**
   * @description whether showing the real DOM
   */
  loading: {
    type: Boolean,
    default: true
  },
  /**
   * @description rendering delay in milliseconds
   */
  throttle: {
    type: definePropType([Number, Object])
  }
});
const skeletonItemProps = buildProps({
  /**
   * @description the current rendering skeleton type
   */
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
});
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSkeletonItem"
  },
  __name: "skeleton-item",
  props: skeletonItemProps,
  setup(__props) {
    const ns = useNamespace("skeleton");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).e("item"), unref(ns).e(__props.variant)])
        },
        [
          __props.variant === "image" ? (openBlock(), createBlock(unref(picture_filled_default), { key: 0 })) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});
const useThrottleRender = (loading, throttle = 0) => {
  if (throttle === 0) return loading;
  const initVal = isObject(throttle) && Boolean(throttle.initVal);
  const throttled = ref(initVal);
  let timeoutHandle = null;
  const dispatchThrottling = (timer) => {
    if (isUndefined$1(timer)) {
      throttled.value = loading.value;
      return;
    }
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = setTimeout(() => {
      throttled.value = loading.value;
    }, timer);
  };
  const dispatcher = (type) => {
    if (type === "leading") {
      if (isNumber$1(throttle)) {
        dispatchThrottling(throttle);
      } else {
        dispatchThrottling(throttle.leading);
      }
    } else {
      if (isObject(throttle)) {
        dispatchThrottling(throttle.trailing);
      } else {
        throttled.value = false;
      }
    }
  };
  watch(
    () => loading.value,
    (val) => {
      dispatcher(val ? "leading" : "trailing");
    }
  );
  return throttled;
};
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSkeleton"
  },
  __name: "skeleton",
  props: skeletonProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("skeleton");
    const uiLoading = useThrottleRender(toRef(props, "loading"), props.throttle);
    __expose({
      /** @description loading state */
      uiLoading
    });
    return (_ctx, _cache) => {
      return unref(uiLoading) ? (openBlock(), createElementBlock(
        "div",
        mergeProps({
          key: 0,
          class: [unref(ns).b(), unref(ns).is("animated", __props.animated)]
        }, _ctx.$attrs),
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(__props.count, (i) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: i },
                [
                  unref(uiLoading) ? renderSlot(_ctx.$slots, "template", { key: i }, () => [
                    createVNode(_sfc_main$1, {
                      class: normalizeClass(unref(ns).is("first")),
                      variant: "p"
                    }, null, 8, ["class"]),
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(__props.rows, (item) => {
                        return openBlock(), createBlock(_sfc_main$1, {
                          key: item,
                          class: normalizeClass([
                            unref(ns).e("paragraph"),
                            unref(ns).is("last", item === __props.rows && __props.rows > 1)
                          ]),
                          variant: "p"
                        }, null, 8, ["class"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]) : createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        16
        /* FULL_PROPS */
      )) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)));
    };
  }
});
const ElSkeleton = withInstall(_sfc_main, {
  SkeletonItem: _sfc_main$1
});
const ElSkeletonItem = withNoopInstall(_sfc_main$1);

export { ElSkeleton as E, ElSkeletonItem as a, skeletonProps as b, skeletonItemProps as s, useThrottleRender as u };
//# sourceMappingURL=index-D--tt7SM.mjs.map
