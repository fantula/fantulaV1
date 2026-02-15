import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createVNode, Transition, withCtx, withDirectives, createElementVNode, normalizeStyle, createTextVNode, toDisplayString, vShow, watch, shallowReactive, ref, createBlock, createCommentVNode, resolveDynamicComponent, Fragment, withModifiers, nextTick, isVNode, render } from "vue";
import { b as buildProps, d as definePropType, w as withInstall, a as withInstallFunction } from "./install-VBSKbHUK.js";
import { m as mutable } from "./typescript-D6L75muK.js";
import { i as iconPropType, T as TypeComponentsMap, a as TypeComponents } from "./icon-D-Vgi0cb.js";
import { isClient, useEventListener, useResizeObserver, useTimeoutFn } from "@vueuse/core";
import { b as useNamespace, i as isNumber, o as isBoolean, p as isElement, d as debugWarn } from "../server.mjs";
import { a as addUnit, E as ElIcon } from "./index-C4aUwruK.js";
import { p as provideGlobalConfig, u as useGlobalComponentSettings } from "./use-global-config-CaR6i8cb.js";
import { g as getEventCode, E as EVENT_CODE } from "./event-D3FEo2C5.js";
import { u as useEmptyValuesProps, a as useSizeProp } from "./index-C1njJNPQ.js";
import { isString, isFunction, hasOwn } from "@vue/shared";
const badgeProps = buildProps({
  /**
   * @description display value.
   */
  value: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
   */
  max: {
    type: Number,
    default: 99
  },
  /**
   * @description if a little dot is displayed.
   */
  isDot: Boolean,
  /**
   * @description hidden badge.
   */
  hidden: Boolean,
  /**
   * @description badge type.
   */
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  },
  /**
   * @description whether to show badge when value is zero.
   */
  showZero: {
    type: Boolean,
    default: true
  },
  /**
   * @description customize dot background color
   */
  color: String,
  /**
   * @description CSS style of badge
   */
  badgeStyle: {
    type: definePropType([String, Object, Array])
  },
  /**
   * @description set offset of the badge
   */
  offset: {
    type: definePropType(Array),
    default: () => [0, 0]
  },
  /**
   * @description custom class name of badge
   */
  badgeClass: {
    type: String
  }
});
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElBadge"
  },
  __name: "badge",
  props: badgeProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("badge");
    const content = computed(() => {
      if (props.isDot) return "";
      if (isNumber(props.value) && isNumber(props.max)) {
        return props.max < props.value ? `${props.max}+` : `${props.value}`;
      }
      return `${props.value}`;
    });
    const style = computed(() => {
      var _a;
      return [
        {
          backgroundColor: props.color,
          marginRight: addUnit(-props.offset[0]),
          marginTop: addUnit(props.offset[1])
        },
        (_a = props.badgeStyle) != null ? _a : {}
      ];
    });
    __expose({
      /** @description badge content */
      content
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(Transition, {
            name: `${unref(ns).namespace.value}-zoom-in-center`,
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode(
                "sup",
                {
                  class: normalizeClass([
                    unref(ns).e("content"),
                    unref(ns).em("content", __props.type),
                    unref(ns).is("fixed", !!_ctx.$slots.default),
                    unref(ns).is("dot", __props.isDot),
                    unref(ns).is("hide-zero", !__props.showZero && __props.value === 0),
                    __props.badgeClass
                  ]),
                  style: normalizeStyle(style.value)
                },
                [
                  renderSlot(_ctx.$slots, "content", { value: content.value }, () => [
                    createTextVNode(
                      toDisplayString(content.value),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                6
                /* CLASS, STYLE */
              ), [
                [vShow, !__props.hidden && (content.value || __props.isDot || _ctx.$slots.content)]
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name"])
        ],
        2
        /* CLASS */
      );
    };
  }
});
const ElBadge = withInstall(_sfc_main$1);
const configProviderProps = buildProps({
  /**
   * @description Controlling if the users want a11y features
   */
  a11y: {
    type: Boolean,
    default: true
  },
  /**
   * @description Locale Object
   */
  locale: {
    type: definePropType(Object)
  },
  /**
   * @description global component size
   */
  size: useSizeProp,
  /**
   * @description button related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#button-attribute)
   */
  button: {
    type: definePropType(Object)
  },
  /**
   * @description card related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#card-attribute)
   */
  card: {
    type: definePropType(Object)
  },
  /**
   * @description dialog related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#dialog-attribute)
   */
  dialog: {
    type: definePropType(Object)
  },
  /**
   * @description link related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#link-attribute)
   */
  link: {
    type: definePropType(Object)
  },
  /**
   * @description features at experimental stage to be added, all features are default to be set to false, [see the following table](https://element-plus.org/en-US/component/config-provider.html#experimental-features)                                                                            | ^[object]
   */
  experimentalFeatures: {
    type: definePropType(Object)
  },
  /**
   * @description Controls if we should handle keyboard navigation
   */
  keyboardNavigation: {
    type: Boolean,
    default: true
  },
  /**
   * @description message related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#message-attribute)
   */
  message: {
    type: definePropType(Object)
  },
  /**
   * @description global Initial zIndex
   */
  zIndex: Number,
  /**
   * @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
   */
  namespace: {
    type: String,
    default: "el"
  },
  ...useEmptyValuesProps
});
const messageConfig = {
  placement: "top"
};
const ConfigProvider = defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    watch(
      () => props.message,
      (val) => {
        var _a, _b;
        Object.assign(messageConfig, (_b = (_a = config == null ? void 0 : config.value) == null ? void 0 : _a.message) != null ? _b : {}, val != null ? val : {});
      },
      { immediate: true, deep: true }
    );
    return () => renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
  }
});
const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const MESSAGE_DEFAULT_PLACEMENT = "top";
const messageDefaults = mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? (void 0).body : void 0
});
const messageProps = buildProps({
  /**
   * @description custom class name for Message
   */
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  /**
   * @description display duration, millisecond. If set to 0, it will not turn off automatically
   */
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  /**
   * @description custom icon component, overrides `type`
   */
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  /**
   * @description message dom id
   */
  id: {
    type: String,
    default: messageDefaults.id
  },
  /**
   * @description message text
   */
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  /**
   * @description callback function when closed with the message instance as the parameter
   */
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  /**
   * @description whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  /**
   * @description message type
   */
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  /**
   * @description whether message is plain
   */
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  /**
   * @description set the distance to the top of viewport
   */
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  /**
   * @description message placement position
   */
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  /**
   * @description message element zIndex value
   */
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  /**
   * @description merge messages with the same content, type of VNode message is not supported
   */
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  /**
   * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
   */
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = {
  destroy: () => true
};
const placementInstances = shallowReactive(
  {}
);
const getOrCreatePlacementInstances = (placement) => {
  if (!placementInstances[placement]) {
    placementInstances[placement] = shallowReactive([]);
  }
  return placementInstances[placement];
};
const getInstance = (id, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};
const getLastOffset = (id, placement) => {
  const { prev } = getInstance(id, placement);
  if (!prev) return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 16 : offset;
};
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElMessage"
  },
  __name: "message",
  props: messageProps,
  emits: messageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const isStartTransition = ref(false);
    const { ns, zIndex } = useGlobalComponentSettings("message");
    const { currentZIndex, nextZIndex } = zIndex;
    const messageRef = ref();
    const visible = ref(false);
    const height = ref(0);
    let stopTimer = void 0;
    const badgeType = computed(
      () => props.type ? props.type === "error" ? "danger" : props.type : "info"
    );
    const typeClass = computed(() => {
      const type = props.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const iconComponent = computed(
      () => props.icon || TypeComponentsMap[props.type] || ""
    );
    const placement = computed(() => props.placement || MESSAGE_DEFAULT_PLACEMENT);
    const lastOffset = computed(() => getLastOffset(props.id, placement.value));
    const offset = computed(() => {
      return getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value;
    });
    const bottom = computed(() => height.value + offset.value);
    const horizontalClass = computed(() => {
      if (placement.value.includes("left")) return ns.is("left");
      if (placement.value.includes("right")) return ns.is("right");
      return ns.is("center");
    });
    const verticalProperty = computed(
      () => placement.value.startsWith("top") ? "top" : "bottom"
    );
    const customStyle = computed(() => ({
      [verticalProperty.value]: `${offset.value}px`,
      zIndex: currentZIndex.value
    }));
    function startTimer() {
      if (props.duration === 0) return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration));
    }
    function clearTimer() {
      stopTimer == null ? void 0 : stopTimer();
    }
    function close() {
      visible.value = false;
      nextTick(() => {
        var _a;
        if (!isStartTransition.value) {
          (_a = props.onClose) == null ? void 0 : _a.call(props);
          emit("destroy");
        }
      });
    }
    function keydown(event) {
      const code = getEventCode(event);
      if (code === EVENT_CODE.esc) {
        close();
      }
    }
    watch(
      () => props.repeatNum,
      () => {
        clearTimer();
        startTimer();
      }
    );
    useEventListener(void 0, "keydown", keydown);
    useResizeObserver(messageRef, () => {
      height.value = messageRef.value.getBoundingClientRect().height;
    });
    __expose({
      visible,
      bottom,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
        onBeforeLeave: __props.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            id: __props.id,
            ref_key: "messageRef",
            ref: messageRef,
            class: normalizeClass([
              unref(ns).b(),
              { [unref(ns).m(__props.type)]: __props.type },
              unref(ns).is("closable", __props.showClose),
              unref(ns).is("plain", __props.plain),
              unref(ns).is("bottom", verticalProperty.value === "bottom"),
              horizontalClass.value,
              __props.customClass
            ]),
            style: normalizeStyle(customStyle.value),
            role: "alert",
            onMouseenter: clearTimer,
            onMouseleave: startTimer
          }, [
            __props.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
              key: 0,
              value: __props.repeatNum,
              type: badgeType.value,
              class: normalizeClass(unref(ns).e("badge"))
            }, null, 8, ["value", "type", "class"])) : createCommentVNode("v-if", true),
            iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass([unref(ns).e("icon"), typeClass.value])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default", {}, () => [
              !__props.dangerouslyUseHTMLString ? (openBlock(), createElementBlock(
                "p",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("content"))
                },
                toDisplayString(__props.message),
                3
                /* TEXT, CLASS */
              )) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                  createElementVNode("p", {
                    class: normalizeClass(unref(ns).e("content")),
                    innerHTML: __props.message
                  }, null, 10, _hoisted_2)
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              ))
            ]),
            __props.showClose ? (openBlock(), createBlock(unref(ElIcon), {
              key: 2,
              class: normalizeClass(unref(ns).e("closeBtn")),
              onClick: withModifiers(close, ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(unref(Close))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : createCommentVNode("v-if", true)
          ], 46, _hoisted_1), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});
let seed = 1;
const normalizeAppendTo = (normalized) => {
  const appendTo = normalized.appendTo;
  if (!appendTo) {
    normalized.appendTo = (void 0).body;
  } else if (isString(normalized.appendTo)) {
    let appendTo2 = (void 0).querySelector(normalized.appendTo);
    if (!isElement(appendTo2)) {
      debugWarn(
        "ElMessage",
        "the appendTo option is not an HTMLElement. Falling back to document.body."
      );
      appendTo2 = (void 0).body;
    }
    normalized.appendTo = appendTo2;
  }
};
const normalizePlacement = (normalized) => {
  if (!normalized.placement && isString(messageConfig.placement) && messageConfig.placement) {
    normalized.placement = messageConfig.placement;
  }
  if (!normalized.placement) {
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
  }
  if (!messagePlacement.includes(normalized.placement)) {
    debugWarn(
      "ElMessage",
      `Invalid placement: ${normalized.placement}. Falling back to '${MESSAGE_DEFAULT_PLACEMENT}'.`
    );
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
  }
};
const normalizeOptions = (params) => {
  const options = !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  normalizeAppendTo(normalized);
  normalizePlacement(normalized);
  if (isBoolean(messageConfig.grouping) && !normalized.grouping) {
    normalized.grouping = messageConfig.grouping;
  }
  if (isNumber(messageConfig.duration) && normalized.duration === 3e3) {
    normalized.duration = messageConfig.duration;
  }
  if (isNumber(messageConfig.offset) && normalized.offset === 16) {
    normalized.offset = messageConfig.offset;
  }
  if (isBoolean(messageConfig.showClose) && !normalized.showClose) {
    normalized.showClose = messageConfig.showClose;
  }
  if (isBoolean(messageConfig.plain) && !normalized.plain) {
    normalized.plain = messageConfig.plain;
  }
  return normalized;
};
const closeMessage = (instance) => {
  const placement = instance.props.placement || MESSAGE_DEFAULT_PLACEMENT;
  const instances = placementInstances[placement];
  const idx = instances.indexOf(instance);
  if (idx === -1) return;
  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = (void 0).createElement("div");
  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose == null ? void 0 : userOnClose();
      closeMessage(instance);
    },
    // clean message element preventing mem leak
    onDestroy: () => {
      render(null, container);
    }
  };
  const vnode = createVNode(
    _sfc_main,
    props,
    isFunction(props.message) || isVNode(props.message) ? {
      default: isFunction(props.message) ? props.message : () => props.message
    } : null
  );
  vnode.appContext = context || message._context;
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const handler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposed.close();
    }
  };
  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!isClient) return { close: () => void 0 };
  const normalized = normalizeOptions(options);
  const instances = getOrCreatePlacementInstances(
    normalized.placement || MESSAGE_DEFAULT_PLACEMENT
  );
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(
      ({ vnode: vm }) => {
        var _a;
        return ((_a = vm.props) == null ? void 0 : _a.message) === normalized.message;
      }
    );
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => void 0 };
  }
  const instance = createMessage(normalized, context);
  instances.push(instance);
  return instance.handler;
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});
function closeAll(type) {
  for (const placement in placementInstances) {
    if (hasOwn(placementInstances, placement)) {
      const instances = [...placementInstances[placement]];
      for (const instance of instances) {
        if (!type || type === instance.props.type) {
          instance.handler.close();
        }
      }
    }
  }
}
function closeAllByPlacement(placement) {
  if (!placementInstances[placement]) return;
  const instances = [...placementInstances[placement]];
  instances.forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");
export {
  ConfigProvider as C,
  ElMessage as E,
  MESSAGE_DEFAULT_PLACEMENT as M,
  ElBadge as a,
  badgeProps as b,
  configProviderProps as c,
  messageDefaults as d,
  messageEmits as e,
  messagePlacement as f,
  messageProps as g,
  messageTypes as h,
  messageConfig as m
};
//# sourceMappingURL=index-CQnGB6WT.js.map
