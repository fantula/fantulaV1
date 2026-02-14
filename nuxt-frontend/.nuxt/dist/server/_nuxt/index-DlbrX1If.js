import { b as buildProps, M as check_default, f as close_default, w as withInstall, o as withNoopInstall } from "./index-CRs4T-Jf.js";
import { C as CHANGE_EVENT } from "./event-BZTOGHfp.js";
import { i as isNumber, b as useNamespace } from "../server.mjs";
import { defineComponent, getCurrentInstance, watch, provide, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createVNode, ref, inject, computed, normalizeStyle, createCommentVNode, createElementVNode, createBlock, withCtx, resolveDynamicComponent, toDisplayString, createTextVNode } from "vue";
import { u as useOrderedChildren } from "./index-DGk0tJv4.js";
import { i as iconPropType } from "./icon-DxnRhcjj.js";
import { E as ElIcon } from "./index-D6MDXFfa.js";
const stepsProps = buildProps({
  /**
   * @description the spacing of each step, will be responsive if omitted. Supports percentage.
   */
  space: {
    type: [Number, String],
    default: ""
  },
  /**
   * @description current activation step
   */
  active: {
    type: Number,
    default: 0
  },
  /**
   * @description display direction
   */
  direction: {
    type: String,
    default: "horizontal",
    values: ["horizontal", "vertical"]
  },
  /**
   * @description center title and description
   */
  alignCenter: {
    type: Boolean
  },
  /**
   * @description whether to apply simple theme
   */
  simple: {
    type: Boolean
  },
  /**
   * @description status of end step
   */
  finishStatus: {
    type: String,
    values: ["wait", "process", "finish", "error", "success"],
    default: "finish"
  },
  /**
   * @description status of current step
   */
  processStatus: {
    type: String,
    values: ["wait", "process", "finish", "error", "success"],
    default: "process"
  }
});
const stepsEmits = {
  [CHANGE_EVENT]: (newVal, oldVal) => [newVal, oldVal].every(isNumber)
};
const STEPS_INJECTION_KEY = "ElSteps";
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSteps"
  },
  __name: "steps",
  props: stepsProps,
  emits: stepsEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("steps");
    const {
      children: steps,
      addChild: addStep,
      removeChild: removeStep,
      ChildrenSorter: StepsSorter
    } = useOrderedChildren(getCurrentInstance(), "ElStep");
    watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    provide(STEPS_INJECTION_KEY, { props, steps, addStep, removeStep });
    watch(
      () => props.active,
      (newVal, oldVal) => {
        emit(CHANGE_EVENT, newVal, oldVal);
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).m(__props.simple ? "simple" : __props.direction)])
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(unref(StepsSorter))
        ],
        2
        /* CLASS */
      );
    };
  }
});
const stepProps = buildProps({
  /**
   * @description step title
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon: {
    type: iconPropType
  },
  /**
   * @description step description
   */
  description: {
    type: String,
    default: ""
  },
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   */
  status: {
    type: String,
    values: ["", "wait", "process", "finish", "error", "success"],
    default: ""
  }
});
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElStep"
  },
  __name: "item",
  props: stepProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("step");
    const index = ref(-1);
    const lineStyle = ref({});
    const internalStatus = ref("");
    const parent = inject(STEPS_INJECTION_KEY);
    const currentInstance = getCurrentInstance();
    let stepDiff = 0;
    const currentStatus = computed(() => {
      return props.status || internalStatus.value;
    });
    computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.internalStatus.value : "wait";
    });
    const isCenter = computed(() => {
      return parent.props.alignCenter;
    });
    const isVertical = computed(() => {
      return parent.props.direction === "vertical";
    });
    const isSimple = computed(() => {
      return parent.props.simple;
    });
    const stepsCount = computed(() => {
      return parent.steps.value.length;
    });
    const isLast = computed(() => {
      var _a;
      return ((_a = parent.steps.value[stepsCount.value - 1]) == null ? void 0 : _a.uid) === currentInstance.uid;
    });
    const space = computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });
    const containerKls = computed(() => {
      return [
        ns.b(),
        ns.is(isSimple.value ? "simple" : parent.props.direction),
        ns.is("flex", isLast.value && !space.value && !isCenter.value),
        ns.is("center", isCenter.value && !isVertical.value && !isSimple.value)
      ];
    });
    const style = computed(() => {
      const style2 = {
        flexBasis: isNumber(space.value) ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value) return style2;
      if (isLast.value) {
        style2.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style2;
    });
    const setIndex = (val) => {
      index.value = val;
    };
    const calcProgress = (status) => {
      const isWait = status === "wait";
      const delayTimer = Math.abs(stepDiff) === 1 ? 0 : -(index.value + 1 - parent.props.active) * 150;
      const style2 = {
        transitionDelay: `${delayTimer}ms`
      };
      const step = status === parent.props.processStatus || isWait ? 0 : 100;
      style2.borderWidth = step && !isSimple.value ? "1px" : 0;
      style2[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
      lineStyle.value = style2;
    };
    const stepItemState = {
      uid: currentInstance.uid,
      getVnode: () => currentInstance.vnode,
      currentStatus,
      internalStatus,
      setIndex,
      calcProgress
    };
    parent.addStep(stepItemState);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          style: normalizeStyle(style.value),
          class: normalizeClass(containerKls.value)
        },
        [
          createCommentVNode(" icon & line "),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("head"), unref(ns).is(currentStatus.value)])
            },
            [
              !isSimple.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("line"))
                },
                [
                  createElementVNode(
                    "i",
                    {
                      class: normalizeClass(unref(ns).e("line-inner")),
                      style: normalizeStyle(lineStyle.value)
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass([unref(ns).e("icon"), unref(ns).is(__props.icon || _ctx.$slots.icon ? "icon" : "text")])
                },
                [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    __props.icon ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 0,
                      class: normalizeClass(unref(ns).e("icon-inner"))
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : currentStatus.value === "success" ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 1,
                      class: normalizeClass([unref(ns).e("icon-inner"), unref(ns).is("status")])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(check_default))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : currentStatus.value === "error" ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 2,
                      class: normalizeClass([unref(ns).e("icon-inner"), unref(ns).is("status")])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(close_default))
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["class"])) : !isSimple.value ? (openBlock(), createElementBlock(
                      "div",
                      {
                        key: 3,
                        class: normalizeClass(unref(ns).e("icon-inner"))
                      },
                      toDisplayString(index.value + 1),
                      3
                      /* TEXT, CLASS */
                    )) : createCommentVNode("v-if", true)
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          createCommentVNode(" title & description "),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("main"))
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass([unref(ns).e("title"), unref(ns).is(currentStatus.value)])
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
              ),
              isSimple.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("arrow"))
                },
                null,
                2
                /* CLASS */
              )) : (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass([unref(ns).e("description"), unref(ns).is(currentStatus.value)])
                },
                [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(
                      toDisplayString(__props.description),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ))
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});
const ElSteps = withInstall(_sfc_main$1, {
  Step: _sfc_main
});
const ElStep = withNoopInstall(_sfc_main);
export {
  ElSteps as E,
  STEPS_INJECTION_KEY as S,
  ElStep as a,
  stepsEmits as b,
  stepsProps as c,
  stepProps as s
};
//# sourceMappingURL=index-DlbrX1If.js.map
