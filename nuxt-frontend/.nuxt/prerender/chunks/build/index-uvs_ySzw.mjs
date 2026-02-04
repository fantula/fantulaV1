import { i as isValidComponentSize } from './validator-CGHVIElq.mjs';
import { w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { u as useAriaProps } from './index-DqrhOzxH.mjs';
import { i as iconPropType } from './icon-eqoLCvNY.mjs';
import { f as useNamespace, e as debugWarn, j as isBoolean$1, i as isNumber$1, w as throwError } from './server.mjs';
import { isString, isPromise } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { U as UPDATE_MODEL_EVENT, C as CHANGE_EVENT, I as INPUT_EVENT } from './event-BZTOGHfp.mjs';
import { defineComponent, computed, ref, shallowRef, watch, openBlock, createElementBlock, withModifiers, normalizeClass, createElementVNode, withKeys, unref, renderSlot, createBlock, withCtx, resolveDynamicComponent, createCommentVNode, toDisplayString, normalizeStyle, createVNode, nextTick } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { a as addUnit, E as ElIcon } from './index-Byc6LUYX.mjs';
import { l as loading_default } from './index-CmsdIFY8.mjs';
import { a as useFormItem, b as useFormSize, c as useFormItemInputId, u as useFormDisabled } from './use-form-item-Bj_anzlj.mjs';

const switchProps = buildProps({
  /**
   * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
   */
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /**
   * @description whether Switch is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether Switch is in loading state
   */
  loading: Boolean,
  /**
   * @description size of Switch
   */
  size: {
    type: String,
    validator: isValidComponentSize
  },
  /**
   * @description width of Switch
   */
  width: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description whether icon or text is displayed inside dot, only the first character will be rendered for text
   */
  inlinePrompt: Boolean,
  /**
   * @description component of the icon displayed in action when in `off` state
   */
  inactiveActionIcon: {
    type: iconPropType
  },
  /**
   * @description component of the icon displayed in action when in `on` state
   */
  activeActionIcon: {
    type: iconPropType
  },
  /**
   * @description component of the icon displayed when in `on` state, overrides `active-text`
   */
  activeIcon: {
    type: iconPropType
  },
  /**
   * @description component of the icon displayed when in `off` state, overrides `inactive-text`
   */
  inactiveIcon: {
    type: iconPropType
  },
  /**
   * @description text displayed when in `on` state
   */
  activeText: {
    type: String,
    default: ""
  },
  /**
   * @description text displayed when in `off` state
   */
  inactiveText: {
    type: String,
    default: ""
  },
  /**
   * @description switch value when in `on` state
   */
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  /**
   * @description switch value when in `off` state
   */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /**
   * @description input name of Switch
   */
  name: {
    type: String,
    default: ""
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
   */
  beforeChange: {
    type: definePropType(Function)
  },
  /**
   * @description id for input
   */
  id: String,
  /**
   * @description tabindex for input
   */
  tabindex: {
    type: [String, Number]
  },
  ...useAriaProps(["ariaLabel"])
});
const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isBoolean$1(val) || isString(val) || isNumber$1(val),
  [CHANGE_EVENT]: (val) => isBoolean$1(val) || isString(val) || isNumber$1(val),
  [INPUT_EVENT]: (val) => isBoolean$1(val) || isString(val) || isNumber$1(val)
};
const _hoisted_1 = ["id", "aria-checked", "aria-disabled", "aria-label", "name", "true-value", "false-value", "disabled", "tabindex"];
const _hoisted_2 = ["aria-hidden"];
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = ["aria-hidden"];
const COMPONENT_NAME = "ElSwitch";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "switch",
  props: switchProps,
  emits: switchEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formItem } = useFormItem();
    const switchSize = useFormSize();
    const ns = useNamespace("switch");
    const { inputId } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const switchDisabled = useFormDisabled(
      computed(() => {
        if (props.loading) {
          return true;
        }
        return void 0;
      })
    );
    const isControlled = ref(props.modelValue !== false);
    const input = shallowRef();
    const switchKls = computed(() => [
      ns.b(),
      ns.m(switchSize.value),
      ns.is("disabled", switchDisabled.value),
      ns.is("checked", checked.value)
    ]);
    const labelLeftKls = computed(() => [
      ns.e("label"),
      ns.em("label", "left"),
      ns.is("active", !checked.value)
    ]);
    const labelRightKls = computed(() => [
      ns.e("label"),
      ns.em("label", "right"),
      ns.is("active", checked.value)
    ]);
    const coreStyle = computed(() => ({
      width: addUnit(props.width)
    }));
    watch(
      () => props.modelValue,
      () => {
        isControlled.value = true;
      }
    );
    const actualValue = computed(() => {
      return isControlled.value ? props.modelValue : false;
    });
    const checked = computed(() => actualValue.value === props.activeValue);
    if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue);
      emit(CHANGE_EVENT, props.inactiveValue);
      emit(INPUT_EVENT, props.inactiveValue);
    }
    watch(checked, (val) => {
      var _a;
      input.value.checked = val;
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => debugWarn(err));
      }
    });
    const handleChange = () => {
      const val = checked.value ? props.inactiveValue : props.activeValue;
      emit(UPDATE_MODEL_EVENT, val);
      emit(CHANGE_EVENT, val);
      emit(INPUT_EVENT, val);
      nextTick(() => {
        input.value.checked = checked.value;
      });
    };
    const switchValue = () => {
      if (switchDisabled.value) return;
      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }
      const shouldChange = beforeChange();
      const isPromiseOrBool = [
        isPromise(shouldChange),
        isBoolean$1(shouldChange)
      ].includes(true);
      if (!isPromiseOrBool) {
        throwError(
          COMPONENT_NAME,
          "beforeChange must return type `Promise<boolean>` or `boolean`"
        );
      }
      if (isPromise(shouldChange)) {
        shouldChange.then((result) => {
          if (result) {
            handleChange();
          }
        }).catch((e) => {
          debugWarn(COMPONENT_NAME, `some error occurred: ${e}`);
        });
      } else if (shouldChange) {
        handleChange();
      }
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    __expose({
      /**
       *  @description manual focus to the switch component
       **/
      focus,
      /**
       * @description whether Switch is checked
       */
      checked
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(switchKls.value),
          onClick: withModifiers(switchValue, ["prevent"])
        },
        [
          createElementVNode("input", {
            id: unref(inputId),
            ref_key: "input",
            ref: input,
            class: normalizeClass(unref(ns).e("input")),
            type: "checkbox",
            role: "switch",
            "aria-checked": checked.value,
            "aria-disabled": unref(switchDisabled),
            "aria-label": __props.ariaLabel,
            name: __props.name,
            "true-value": __props.activeValue,
            "false-value": __props.inactiveValue,
            disabled: unref(switchDisabled),
            tabindex: __props.tabindex,
            onChange: handleChange,
            onKeydown: withKeys(switchValue, ["enter"])
          }, null, 42, _hoisted_1),
          !__props.inlinePrompt && (__props.inactiveIcon || __props.inactiveText || _ctx.$slots.inactive) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(labelLeftKls.value)
            },
            [
              renderSlot(_ctx.$slots, "inactive", {}, () => [
                __props.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(__props.inactiveIcon)))
                  ]),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true),
                !__props.inactiveIcon && __props.inactiveText ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  "aria-hidden": checked.value
                }, toDisplayString(__props.inactiveText), 9, _hoisted_2)) : createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("core")),
              style: normalizeStyle(coreStyle.value)
            },
            [
              __props.inlinePrompt ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("inner"))
                },
                [
                  !checked.value ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass(unref(ns).e("inner-wrapper"))
                    },
                    [
                      renderSlot(_ctx.$slots, "inactive", {}, () => [
                        __props.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(__props.inactiveIcon)))
                          ]),
                          _: 1
                          /* STABLE */
                        })) : createCommentVNode("v-if", true),
                        !__props.inactiveIcon && __props.inactiveText ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_3,
                          toDisplayString(__props.inactiveText),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass(unref(ns).e("inner-wrapper"))
                    },
                    [
                      renderSlot(_ctx.$slots, "active", {}, () => [
                        __props.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(__props.activeIcon)))
                          ]),
                          _: 1
                          /* STABLE */
                        })) : createCommentVNode("v-if", true),
                        !__props.activeIcon && __props.activeText ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_4,
                          toDisplayString(__props.activeText),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ])
                    ],
                    2
                    /* CLASS */
                  ))
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("action"))
                },
                [
                  __props.loading ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 0,
                    class: normalizeClass(unref(ns).is("loading"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(loading_default))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class"])) : checked.value ? renderSlot(_ctx.$slots, "active-action", { key: 1 }, () => [
                    __props.activeActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.activeActionIcon)))
                      ]),
                      _: 1
                      /* STABLE */
                    })) : createCommentVNode("v-if", true)
                  ]) : !checked.value ? renderSlot(_ctx.$slots, "inactive-action", { key: 2 }, () => [
                    __props.inactiveActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.inactiveActionIcon)))
                      ]),
                      _: 1
                      /* STABLE */
                    })) : createCommentVNode("v-if", true)
                  ]) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ],
            6
            /* CLASS, STYLE */
          ),
          !__props.inlinePrompt && (__props.activeIcon || __props.activeText || _ctx.$slots.active) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 1,
              class: normalizeClass(labelRightKls.value)
            },
            [
              renderSlot(_ctx.$slots, "active", {}, () => [
                __props.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(__props.activeIcon)))
                  ]),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true),
                !__props.activeIcon && __props.activeText ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  "aria-hidden": !checked.value
                }, toDisplayString(__props.activeText), 9, _hoisted_5)) : createCommentVNode("v-if", true)
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
const ElSwitch = withInstall(_sfc_main);

export { ElSwitch as E, switchProps as a, switchEmits as s };
//# sourceMappingURL=index-uvs_ySzw.mjs.map
