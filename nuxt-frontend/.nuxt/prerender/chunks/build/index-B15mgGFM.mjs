import { w as withInstall, b as buildProps, d as definePropType } from './index-CRs4T-Jf.mjs';
import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, normalizeStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { a as useGlobalConfig } from './use-global-config-C00m4e8W.mjs';
import { b as useNamespace } from './server.mjs';

const cardProps = buildProps({
  /**
   * @description title of the card. Also accepts a DOM passed by `slot#header`
   */
  header: {
    type: String,
    default: ""
  },
  /**
   * @description content of footer. Also accepts a DOM passed by `slot#footer`
   */
  footer: {
    type: String,
    default: ""
  },
  /**
   * @description CSS style of card body
   */
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  /**
   * @description custom class name of card footer
   */
  headerClass: String,
  /**
   * @description custom class name of card body
   */
  bodyClass: String,
  /**
   * @description custom class name of card footer
   */
  footerClass: String,
  /**
   * @description when to show card shadows
   */
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const cardContextKey = /* @__PURE__ */ Symbol("cardContextKey");
var _sfc_main = /* @__PURE__ */ defineComponent({
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
            unref(ns).is(`${__props.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
          ])
        },
        [
          _ctx.$slots.header || __props.header ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("header"), __props.headerClass])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createTextVNode(
                  toDisplayString(__props.header),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("body"), __props.bodyClass]),
              style: normalizeStyle(__props.bodyStyle)
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          ),
          _ctx.$slots.footer || __props.footer ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer", {}, () => [
                createTextVNode(
                  toDisplayString(__props.footer),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});
const ElCard = withInstall(_sfc_main);

export { ElCard as E, cardProps as a, cardContextKey as c };
//# sourceMappingURL=index-B15mgGFM.mjs.map
