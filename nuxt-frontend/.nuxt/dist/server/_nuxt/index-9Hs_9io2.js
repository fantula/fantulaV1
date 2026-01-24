import { defineComponent, createElementBlock, openBlock, normalizeClass, unref, createCommentVNode, createElementVNode, renderSlot, createTextVNode, toDisplayString, normalizeStyle } from "vue";
import { q as buildProps, D as definePropType, w as _export_sfc, av as useGlobalConfig, x as useNamespace, B as withInstall } from "../server.mjs";
const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  footer: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const _sfc_main = defineComponent({
  ...{
    name: "ElCard"
  },
  __name: "card",
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is(`${_ctx.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
          ])
        },
        [
          _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.header),
                  1
                )
              ])
            ],
            2
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass]),
              style: normalizeStyle(_ctx.bodyStyle)
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            6
          ),
          _ctx.$slots.footer || _ctx.footer ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.footer),
                  1
                )
              ])
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);
const ElCard = withInstall(Card);
export {
  ElCard as E,
  cardProps as c
};
//# sourceMappingURL=index-9Hs_9io2.js.map
