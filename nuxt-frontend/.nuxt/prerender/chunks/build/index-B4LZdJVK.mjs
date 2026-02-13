import { T as TypeComponentsMap, a as TypeComponents } from './icon-CyvpkMdQ.mjs';
import { w as withInstall, b as buildProps } from './index-DuV_oMrC.mjs';
import { k as keysOf } from './objects-Bz74KHmq.mjs';
import { defineComponent, useSlots, ref, computed, openBlock, createBlock, Transition, unref, withCtx, withDirectives, createElementVNode, normalizeClass, renderSlot, resolveDynamicComponent, createCommentVNode, createElementBlock, createTextVNode, toDisplayString, Fragment, createVNode, vShow } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { f as flattedChildren, i as isComment } from './vnode-BKSxKQVt.mjs';
import { g as useNamespace } from './server.mjs';

const alertEffects = ["light", "dark"];
const alertProps = buildProps({
  /**
   * @description alert title.
   */
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  /**
   * @description alert type.
   */
  type: {
    type: String,
    values: keysOf(TypeComponentsMap),
    default: "info"
  },
  /**
   * @description whether alert can be dismissed.
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * @description text for replacing x button
   */
  closeText: {
    type: String,
    default: ""
  },
  /**
   * @description whether show icon
   */
  showIcon: Boolean,
  /**
   * @description should content be placed in center.
   */
  center: Boolean,
  effect: {
    type: String,
    values: alertEffects,
    default: "light"
  }
});
const alertEmits = {
  close: (evt) => evt instanceof MouseEvent
};
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElAlert"
  },
  __name: "alert",
  props: alertProps,
  emits: alertEmits,
  setup(__props, { emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("alert");
    const visible = ref(true);
    const iconComponent = computed(() => TypeComponentsMap[props.type]);
    const hasDesc = computed(() => {
      var _a;
      if (props.description) return true;
      const slotContent = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (!slotContent) return false;
      const children = flattedChildren(slotContent);
      return children.some((child) => !isComment(child));
    });
    const close = (evt) => {
      visible.value = false;
      emit("close", evt);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).b(), unref(ns).m(__props.type), unref(ns).is("center", __props.center), unref(ns).is(__props.effect)]),
              role: "alert"
            },
            [
              __props.showIcon && (_ctx.$slots.icon || iconComponent.value) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass([unref(ns).e("icon"), unref(ns).is("big", hasDesc.value)])
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
                  ])
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["class"])) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  __props.title || _ctx.$slots.title ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass([unref(ns).e("title"), { "with-description": hasDesc.value }])
                    },
                    [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createTextVNode(
                          toDisplayString(__props.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  hasDesc.value ? (openBlock(), createElementBlock(
                    "p",
                    {
                      key: 1,
                      class: normalizeClass(unref(ns).e("description"))
                    },
                    [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createTextVNode(
                          toDisplayString(__props.description),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  __props.closable ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 2 },
                    [
                      __props.closeText ? (openBlock(), createElementBlock(
                        "div",
                        {
                          key: 0,
                          class: normalizeClass([unref(ns).e("close-btn"), unref(ns).is("customed")]),
                          onClick: close
                        },
                        toDisplayString(__props.closeText),
                        3
                        /* TEXT, CLASS */
                      )) : (openBlock(), createBlock(unref(ElIcon), {
                        key: 1,
                        class: normalizeClass(unref(ns).e("close-btn")),
                        onClick: close
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Close))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["class"]))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    };
  }
});
const ElAlert = withInstall(_sfc_main);

export { ElAlert as E, alertEffects as a, alertEmits as b, alertProps as c };
//# sourceMappingURL=index-B4LZdJVK.mjs.map
