import { defineComponent, computed, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createCommentVNode, renderSlot } from "vue";
import { q as buildProps, D as definePropType, w as _export_sfc, x as useNamespace, B as withInstall } from "../server.mjs";
const dividerProps = buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  },
  borderStyle: {
    type: definePropType(String),
    default: "solid"
  }
});
const _sfc_main = defineComponent({
  ...{
    name: "ElDivider"
  },
  __name: "divider",
  props: dividerProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("divider");
    const dividerStyle = computed(() => {
      return ns.cssVar({
        "border-style": props.borderStyle
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).m(_ctx.direction)]),
          style: normalizeStyle(dividerStyle.value),
          role: "separator"
        },
        [
          _ctx.$slots.default && _ctx.direction !== "vertical" ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("text"), unref(ns).is(_ctx.contentPosition)])
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        6
      );
    };
  }
});
var Divider = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);
const ElDivider = withInstall(Divider);
export {
  ElDivider as E,
  dividerProps as d
};
//# sourceMappingURL=index-QnhSR2oe.js.map
