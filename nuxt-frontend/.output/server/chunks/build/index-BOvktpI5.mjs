import { defineComponent, ref, inject, getCurrentInstance, computed, createElementBlock, openBlock, normalizeClass, normalizeStyle, createCommentVNode, createElementVNode, unref, renderSlot, createBlock, withCtx, resolveDynamicComponent, createVNode, toDisplayString, createTextVNode, watch, provide } from 'vue';
import { B as withInstall, C as withNoopInstall, w as _export_sfc$1, q as buildProps, x as useNamespace, r as isNumber$1, E as ElIcon, ag as check_default, J as close_default, aw as iconPropType } from './server.mjs';
import { C as CHANGE_EVENT } from './event-BZTOGHfp.mjs';
import { u as useOrderedChildren } from './index-BrFCEoKQ.mjs';

const stepsProps = buildProps({
  space: {
    type: [Number, String],
    default: ""
  },
  active: {
    type: Number,
    default: 0
  },
  direction: {
    type: String,
    default: "horizontal",
    values: ["horizontal", "vertical"]
  },
  alignCenter: {
    type: Boolean
  },
  simple: {
    type: Boolean
  },
  finishStatus: {
    type: String,
    values: ["wait", "process", "finish", "error", "success"],
    default: "finish"
  },
  processStatus: {
    type: String,
    values: ["wait", "process", "finish", "error", "success"],
    default: "process"
  }
});
const stepsEmits = {
  [CHANGE_EVENT]: (newVal, oldVal) => [newVal, oldVal].every(isNumber$1)
};
const STEPS_INJECTION_KEY = "ElSteps";
const _sfc_main$1 = defineComponent({
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
          class: normalizeClass([unref(ns).b(), unref(ns).m(_ctx.simple ? "simple" : _ctx.direction)])
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(unref(StepsSorter))
        ],
        2
      );
    };
  }
});
var Steps = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/steps/src/steps.vue"]]);
const stepProps = buildProps({
  title: {
    type: String,
    default: ""
  },
  icon: {
    type: iconPropType
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    values: ["", "wait", "process", "finish", "error", "success"],
    default: ""
  }
});
const _sfc_main = defineComponent({
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
        flexBasis: isNumber$1(space.value) ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value)
        return style2;
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
                  )
                ],
                2
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass([unref(ns).e("icon"), unref(ns).is(_ctx.icon || _ctx.$slots.icon ? "icon" : "text")])
                },
                [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 0,
                      class: normalizeClass(unref(ns).e("icon-inner"))
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
                      ]),
                      _: 1
                    }, 8, ["class"])) : currentStatus.value === "success" ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 1,
                      class: normalizeClass([unref(ns).e("icon-inner"), unref(ns).is("status")])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(check_default))
                      ]),
                      _: 1
                    }, 8, ["class"])) : currentStatus.value === "error" ? (openBlock(), createBlock(unref(ElIcon), {
                      key: 2,
                      class: normalizeClass([unref(ns).e("icon-inner"), unref(ns).is("status")])
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(close_default))
                      ]),
                      _: 1
                    }, 8, ["class"])) : !isSimple.value ? (openBlock(), createElementBlock(
                      "div",
                      {
                        key: 3,
                        class: normalizeClass(unref(ns).e("icon-inner"))
                      },
                      toDisplayString(index.value + 1),
                      3
                    )) : createCommentVNode("v-if", true)
                  ])
                ],
                2
              )
            ],
            2
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
                      toDisplayString(_ctx.title),
                      1
                    )
                  ])
                ],
                2
              ),
              isSimple.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("arrow"))
                },
                null,
                2
              )) : (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass([unref(ns).e("description"), unref(ns).is(currentStatus.value)])
                },
                [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(
                      toDisplayString(_ctx.description),
                      1
                    )
                  ])
                ],
                2
              ))
            ],
            2
          )
        ],
        6
      );
    };
  }
});
var Step = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/steps/src/item.vue"]]);
const ElSteps = withInstall(Steps, {
  Step
});
const ElStep = withNoopInstall(Step);

export { ElSteps as E, STEPS_INJECTION_KEY as S, ElStep as a, stepsEmits as b, stepsProps as c, stepProps as s };
//# sourceMappingURL=index-BOvktpI5.mjs.map
