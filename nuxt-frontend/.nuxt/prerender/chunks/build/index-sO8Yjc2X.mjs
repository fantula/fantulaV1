import { w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, normalizeClass, unref, renderSlot, createCommentVNode } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { g as useNamespace } from './server.mjs';

const dividerProps = buildProps({
  /**
   * @description Set divider's direction
   */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
   * @description Set the style of divider
   */
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  },
  /**
   * @description the position of the customized content on the divider line
   */
  borderStyle: {
    type: definePropType(String),
    default: "solid"
  }
});
var _sfc_main = /* @__PURE__ */ defineComponent({
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
          class: normalizeClass([unref(ns).b(), unref(ns).m(__props.direction)]),
          style: normalizeStyle(dividerStyle.value),
          role: "separator"
        },
        [
          _ctx.$slots.default && __props.direction !== "vertical" ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("text"), unref(ns).is(__props.contentPosition)])
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});
const ElDivider = withInstall(_sfc_main);

export { ElDivider as E, dividerProps as d };
//# sourceMappingURL=index-sO8Yjc2X.mjs.map
