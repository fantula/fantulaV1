import { w as withInstall, b as buildProps } from './install-VBSKbHUK.mjs';
import { b as useLocale, d as componentSizes } from './index-K5TIzHX_.mjs';
import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, unref, renderSlot, withModifiers, createVNode, withCtx, createCommentVNode, createBlock, Transition } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { j as close_default } from './index-DlETah8a.mjs';
import { b as useFormSize } from './use-form-item-Bhmdieo-.mjs';
import { g as useNamespace } from './server.mjs';

const tagProps = buildProps({
  /**
   * @description type of Tag
   */
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger"],
    default: "primary"
  },
  /**
   * @description whether Tag can be removed
   */
  closable: Boolean,
  /**
   * @description whether to disable animations
   */
  disableTransitions: Boolean,
  /**
   * @description whether Tag has a highlighted border
   */
  hit: Boolean,
  /**
   * @description background color of the Tag
   */
  color: String,
  /**
   * @description size of Tag
   */
  size: {
    type: String,
    values: componentSizes
  },
  /**
   * @description theme of Tag
   */
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  /**
   * @description whether Tag is rounded
   */
  round: Boolean
});
const tagEmits = {
  close: (evt) => evt instanceof MouseEvent,
  click: (evt) => evt instanceof MouseEvent
};
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTag"
  },
  __name: "tag",
  props: tagProps,
  emits: tagEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tagSize = useFormSize();
    const { t } = useLocale();
    const ns = useNamespace("tag");
    const containerKls = computed(() => {
      const { type, hit, effect, closable, round } = props;
      return [
        ns.b(),
        ns.is("closable", closable),
        ns.m(type || "primary"),
        ns.m(tagSize.value),
        ns.m(effect),
        ns.is("hit", hit),
        ns.is("round", round)
      ];
    });
    const handleClose = (event) => {
      emit("close", event);
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    const handleVNodeMounted = (vnode) => {
      var _a, _b, _c;
      if ((_c = (_b = (_a = vnode == null ? void 0 : vnode.component) == null ? void 0 : _a.subTree) == null ? void 0 : _b.component) == null ? void 0 : _c.bum) {
        vnode.component.subTree.component.bum = null;
      }
    };
    return (_ctx, _cache) => {
      return __props.disableTransitions ? (openBlock(), createElementBlock(
        "span",
        {
          key: 0,
          class: normalizeClass(containerKls.value),
          style: normalizeStyle({ backgroundColor: __props.color }),
          onClick: handleClick
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("content"))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          __props.closable ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": unref(t)("el.tag.close"),
            class: normalizeClass(unref(ns).e("close")),
            type: "button",
            onClick: withModifiers(handleClose, ["stop"])
          }, [
            createVNode(unref(ElIcon), null, {
              default: withCtx(() => [
                createVNode(unref(close_default))
              ]),
              _: 1
              /* STABLE */
            })
          ], 10, _hoisted_1)) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : (openBlock(), createBlock(Transition, {
        key: 1,
        name: `${unref(ns).namespace.value}-zoom-in-center`,
        appear: "",
        onVnodeMounted: handleVNodeMounted
      }, {
        default: withCtx(() => [
          createElementVNode(
            "span",
            {
              class: normalizeClass(containerKls.value),
              style: normalizeStyle({ backgroundColor: __props.color }),
              onClick: handleClick
            },
            [
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ),
              __props.closable ? (openBlock(), createElementBlock("button", {
                key: 0,
                "aria-label": unref(t)("el.tag.close"),
                class: normalizeClass(unref(ns).e("close")),
                type: "button",
                onClick: withModifiers(handleClose, ["stop"])
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(close_default))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ], 10, _hoisted_2)) : createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]));
    };
  }
});
const ElTag = withInstall(_sfc_main);

export { ElTag as E, tagEmits as a, tagProps as t };
//# sourceMappingURL=index-CAqDGa72.mjs.map
