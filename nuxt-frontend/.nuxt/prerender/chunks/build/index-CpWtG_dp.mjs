import { defineComponent, computed, ref, shallowRef, watch, createElementBlock, openBlock, withModifiers, normalizeClass, createElementVNode, createCommentVNode, withKeys, unref, renderSlot, createBlock, withCtx, resolveDynamicComponent, toDisplayString, normalizeStyle, createVNode, nextTick } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { B as withInstall, w as _export_sfc$1, aG as isBoolean$1, r as isNumber$1, q as buildProps, x as useNamespace, T as addUnit, v as debugWarn, E as ElIcon, l as loading_default, D as definePropType, aw as iconPropType, X as throwError } from './server.mjs';
import { i as isValidComponentSize } from './validator-T0bsmJHo.mjs';
import { u as useAriaProps } from './index-Dxw_X3Hq.mjs';
import { U as UPDATE_MODEL_EVENT, C as CHANGE_EVENT, I as INPUT_EVENT } from './event-BZTOGHfp.mjs';
import { isString, isPromise } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { a as useFormItem, b as useFormSize, c as useFormItemInputId, u as useFormDisabled } from './use-form-common-props-DlCG9pC5.mjs';

const switchProps = buildProps({
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  loading: Boolean,
  size: {
    type: String,
    validator: isValidComponentSize
  },
  width: {
    type: [String, Number],
    default: ""
  },
  inlinePrompt: Boolean,
  inactiveActionIcon: {
    type: iconPropType
  },
  activeActionIcon: {
    type: iconPropType
  },
  activeIcon: {
    type: iconPropType
  },
  inactiveIcon: {
    type: iconPropType
  },
  activeText: {
    type: String,
    default: ""
  },
  inactiveText: {
    type: String,
    default: ""
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  name: {
    type: String,
    default: ""
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  beforeChange: {
    type: definePropType(Function)
  },
  id: String,
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
const _sfc_main = defineComponent({
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
      if (switchDisabled.value)
        return;
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
      focus,
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
            "aria-label": _ctx.ariaLabel,
            name: _ctx.name,
            "true-value": _ctx.activeValue,
            "false-value": _ctx.inactiveValue,
            disabled: unref(switchDisabled),
            tabindex: _ctx.tabindex,
            onChange: handleChange,
            onKeydown: withKeys(switchValue, ["enter"])
          }, null, 42, _hoisted_1),
          !_ctx.inlinePrompt && (_ctx.inactiveIcon || _ctx.inactiveText || _ctx.$slots.inactive) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(labelLeftKls.value)
            },
            [
              renderSlot(_ctx.$slots, "inactive", {}, () => [
                _ctx.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.inactiveIcon)))
                  ]),
                  _: 1
                })) : createCommentVNode("v-if", true),
                !_ctx.inactiveIcon && _ctx.inactiveText ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  "aria-hidden": checked.value
                }, toDisplayString(_ctx.inactiveText), 9, _hoisted_2)) : createCommentVNode("v-if", true)
              ])
            ],
            2
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("core")),
              style: normalizeStyle(coreStyle.value)
            },
            [
              _ctx.inlinePrompt ? (openBlock(), createElementBlock(
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
                        _ctx.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(_ctx.inactiveIcon)))
                          ]),
                          _: 1
                        })) : createCommentVNode("v-if", true),
                        !_ctx.inactiveIcon && _ctx.inactiveText ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_3,
                          toDisplayString(_ctx.inactiveText),
                          1
                        )) : createCommentVNode("v-if", true)
                      ])
                    ],
                    2
                  )) : (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass(unref(ns).e("inner-wrapper"))
                    },
                    [
                      renderSlot(_ctx.$slots, "active", {}, () => [
                        _ctx.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeIcon)))
                          ]),
                          _: 1
                        })) : createCommentVNode("v-if", true),
                        !_ctx.activeIcon && _ctx.activeText ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_4,
                          toDisplayString(_ctx.activeText),
                          1
                        )) : createCommentVNode("v-if", true)
                      ])
                    ],
                    2
                  ))
                ],
                2
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("action"))
                },
                [
                  _ctx.loading ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 0,
                    class: normalizeClass(unref(ns).is("loading"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(loading_default))
                    ]),
                    _: 1
                  }, 8, ["class"])) : checked.value ? renderSlot(_ctx.$slots, "active-action", { key: 1 }, () => [
                    _ctx.activeActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeActionIcon)))
                      ]),
                      _: 1
                    })) : createCommentVNode("v-if", true)
                  ]) : !checked.value ? renderSlot(_ctx.$slots, "inactive-action", { key: 2 }, () => [
                    _ctx.inactiveActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.inactiveActionIcon)))
                      ]),
                      _: 1
                    })) : createCommentVNode("v-if", true)
                  ]) : createCommentVNode("v-if", true)
                ],
                2
              )
            ],
            6
          ),
          !_ctx.inlinePrompt && (_ctx.activeIcon || _ctx.activeText || _ctx.$slots.active) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 1,
              class: normalizeClass(labelRightKls.value)
            },
            [
              renderSlot(_ctx.$slots, "active", {}, () => [
                _ctx.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeIcon)))
                  ]),
                  _: 1
                })) : createCommentVNode("v-if", true),
                !_ctx.activeIcon && _ctx.activeText ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  "aria-hidden": !checked.value
                }, toDisplayString(_ctx.activeText), 9, _hoisted_5)) : createCommentVNode("v-if", true)
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
var Switch = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue"]]);
const ElSwitch = withInstall(Switch);

export { ElSwitch as E, switchProps as a, switchEmits as s };
//# sourceMappingURL=index-CpWtG_dp.mjs.map
