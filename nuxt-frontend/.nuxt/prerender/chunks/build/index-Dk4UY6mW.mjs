import { w as withInstall, e as withNoopInstall, b as buildProps, d as definePropType } from './base-CEWXqFm3.mjs';
import { m as mutable } from './typescript-D6L75muK.mjs';
import { i as isNumber$1, b as useNamespace, G as useIdInjection, o as isBoolean$1, D as throwError, d as debugWarn } from './server.mjs';
import { isString, isArray, isPromise } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { C as CHANGE_EVENT, U as UPDATE_MODEL_EVENT } from './event-BZTOGHfp.mjs';
import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withKeys, withModifiers, renderSlot, createTextVNode, toDisplayString, createVNode, withCtx, createBlock, resolveDynamicComponent, withDirectives, vShow, inject, ref, computed, watch, provide } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { castArray } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import { f as arrow_right_default } from './index-DNnPa_Q9.mjs';
import { i as iconPropType } from './icon-Ck0_dGQP.mjs';
import { E as ElCollapseTransition } from './index-Bhn2XfO3.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';

const emitChangeFn = (value) => isNumber$1(value) || isString(value) || isArray(value);
const collapseProps = buildProps({
  /**
   * @description whether to activate accordion mode
   */
  accordion: Boolean,
  /**
   * @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
   */
  modelValue: {
    type: definePropType([Array, String, Number]),
    default: () => mutable([])
  },
  /**
   * @description set expand icon position
   */
  expandIconPosition: {
    type: definePropType([String]),
    default: "right"
  },
  /**
   * @description before-collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop collapsing
   */
  beforeCollapse: {
    type: definePropType(
      Function
    )
  }
});
const collapseEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn
};
const collapseContextKey = /* @__PURE__ */ Symbol("collapseContextKey");
const SCOPE = "ElCollapse";
const useCollapse = (props, emit) => {
  const activeNames = ref(castArray(props.modelValue));
  const setActiveNames = (_activeNames) => {
    activeNames.value = _activeNames;
    const value = props.accordion ? activeNames.value[0] : activeNames.value;
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value);
  };
  const handleChange = (name) => {
    if (props.accordion) {
      setActiveNames([activeNames.value[0] === name ? "" : name]);
    } else {
      const _activeNames = [...activeNames.value];
      const index = _activeNames.indexOf(name);
      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(name);
      }
      setActiveNames(_activeNames);
    }
  };
  const handleItemClick = async (name) => {
    const { beforeCollapse } = props;
    if (!beforeCollapse) {
      handleChange(name);
      return;
    }
    const shouldChange = beforeCollapse(name);
    const isPromiseOrBool = [
      isPromise(shouldChange),
      isBoolean$1(shouldChange)
    ].includes(true);
    if (!isPromiseOrBool) {
      throwError(
        SCOPE,
        "beforeCollapse must return type `Promise<boolean>` or `boolean`"
      );
    }
    if (isPromise(shouldChange)) {
      shouldChange.then((result) => {
        if (result !== false) {
          handleChange(name);
        }
      }).catch((e) => {
        debugWarn(SCOPE, `some error occurred: ${e}`);
      });
    } else if (shouldChange) {
      handleChange(name);
    }
  };
  watch(
    () => props.modelValue,
    () => activeNames.value = castArray(props.modelValue),
    { deep: true }
  );
  provide(collapseContextKey, {
    activeNames,
    handleItemClick
  });
  return {
    activeNames,
    setActiveNames
  };
};
const useCollapseDOM = (props) => {
  const ns = useNamespace("collapse");
  const rootKls = computed(() => [
    ns.b(),
    ns.b(`icon-position-${props.expandIconPosition}`)
  ]);
  return {
    rootKls
  };
};
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCollapse"
  },
  __name: "collapse",
  props: collapseProps,
  emits: collapseEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { activeNames, setActiveNames } = useCollapse(props, emit);
    const { rootKls } = useCollapseDOM(props);
    __expose({
      /** @description active names */
      activeNames,
      /** @description set active names */
      setActiveNames
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});
const collapseItemProps = buildProps({
  /**
   * @description title of the panel
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description unique identification of the panel
   */
  name: {
    type: definePropType([String, Number]),
    default: void 0
  },
  /**
   * @description icon of the collapse item
   */
  icon: {
    type: iconPropType,
    default: arrow_right_default
  },
  /**
   * @description disable the collapse item
   */
  disabled: Boolean
});
const useCollapseItem = (props) => {
  const collapse = inject(collapseContextKey);
  const { namespace } = useNamespace("collapse");
  const focusing = ref(false);
  const isClick = ref(false);
  const idInjection = useIdInjection();
  const id = computed(() => idInjection.current++);
  const name = computed(() => {
    var _a;
    return (_a = props.name) != null ? _a : `${namespace.value}-id-${idInjection.prefix}-${unref(id)}`;
  });
  const isActive = computed(
    () => collapse == null ? void 0 : collapse.activeNames.value.includes(unref(name))
  );
  const handleFocus = () => {
    setTimeout(() => {
      if (!isClick.value) {
        focusing.value = true;
      } else {
        isClick.value = false;
      }
    }, 50);
  };
  const handleHeaderClick = (e) => {
    if (props.disabled) return;
    const target = e.target;
    if (target == null ? void 0 : target.closest("input, textarea, select")) return;
    collapse == null ? void 0 : collapse.handleItemClick(unref(name));
    focusing.value = false;
    isClick.value = true;
  };
  const handleEnterClick = (e) => {
    const target = e.target;
    if (target == null ? void 0 : target.closest("input, textarea, select")) return;
    e.preventDefault();
    collapse == null ? void 0 : collapse.handleItemClick(unref(name));
  };
  return {
    focusing,
    id,
    isActive,
    handleFocus,
    handleHeaderClick,
    handleEnterClick
  };
};
const useCollapseItemDOM = (props, { focusing, isActive, id }) => {
  const ns = useNamespace("collapse");
  const rootKls = computed(() => [
    ns.b("item"),
    ns.is("active", unref(isActive)),
    ns.is("disabled", props.disabled)
  ]);
  const headKls = computed(() => [
    ns.be("item", "header"),
    ns.is("active", unref(isActive)),
    { focusing: unref(focusing) && !props.disabled }
  ]);
  const arrowKls = computed(() => [
    ns.be("item", "arrow"),
    ns.is("active", unref(isActive))
  ]);
  const itemTitleKls = computed(() => [ns.be("item", "title")]);
  const itemWrapperKls = computed(() => ns.be("item", "wrap"));
  const itemContentKls = computed(() => ns.be("item", "content"));
  const scopedContentId = computed(() => ns.b(`content-${unref(id)}`));
  const scopedHeadId = computed(() => ns.b(`head-${unref(id)}`));
  return {
    itemTitleKls,
    arrowKls,
    headKls,
    rootKls,
    itemWrapperKls,
    itemContentKls,
    scopedContentId,
    scopedHeadId
  };
};
const _hoisted_1 = ["id", "aria-expanded", "aria-controls", "aria-describedby", "tabindex", "aria-disabled"];
const _hoisted_2 = ["id", "aria-hidden", "aria-labelledby"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCollapseItem"
  },
  __name: "collapse-item",
  props: collapseItemProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      focusing,
      id,
      isActive,
      handleFocus,
      handleHeaderClick,
      handleEnterClick
    } = useCollapseItem(props);
    const {
      arrowKls,
      headKls,
      rootKls,
      itemTitleKls,
      itemWrapperKls,
      itemContentKls,
      scopedContentId,
      scopedHeadId
    } = useCollapseItemDOM(props, { focusing, isActive, id });
    __expose({
      /** @description current collapse-item whether active */
      isActive
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          createElementVNode("div", {
            id: unref(scopedHeadId),
            class: normalizeClass(unref(headKls)),
            "aria-expanded": unref(isActive),
            "aria-controls": unref(scopedContentId),
            "aria-describedby": unref(scopedContentId),
            tabindex: __props.disabled ? void 0 : 0,
            "aria-disabled": __props.disabled,
            role: "button",
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => unref(handleHeaderClick) && unref(handleHeaderClick)(...args)),
            onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(
              //@ts-ignore
              (...args) => unref(handleEnterClick) && unref(handleEnterClick)(...args),
              ["stop"]
            ), ["space", "enter"])),
            onFocus: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
            onBlur: _cache[3] || (_cache[3] = ($event) => focusing.value = false)
          }, [
            createElementVNode(
              "span",
              {
                class: normalizeClass(unref(itemTitleKls))
              },
              [
                renderSlot(_ctx.$slots, "title", { isActive: unref(isActive) }, () => [
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
            renderSlot(_ctx.$slots, "icon", { isActive: unref(isActive) }, () => [
              createVNode(unref(ElIcon), {
                class: normalizeClass(unref(arrowKls))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])
            ])
          ], 42, _hoisted_1),
          createVNode(unref(ElCollapseTransition), null, {
            default: withCtx(() => [
              withDirectives(createElementVNode("div", {
                id: unref(scopedContentId),
                role: "region",
                class: normalizeClass(unref(itemWrapperKls)),
                "aria-hidden": !unref(isActive),
                "aria-labelledby": unref(scopedHeadId)
              }, [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(itemContentKls))
                  },
                  [
                    renderSlot(_ctx.$slots, "default")
                  ],
                  2
                  /* CLASS */
                )
              ], 10, _hoisted_2), [
                [vShow, unref(isActive)]
              ])
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        2
        /* CLASS */
      );
    };
  }
});
const ElCollapse = withInstall(_sfc_main$1, {
  CollapseItem: _sfc_main
});
const ElCollapseItem = withNoopInstall(_sfc_main);

export { ElCollapse as E, ElCollapseItem as a, collapseEmits as b, collapseContextKey as c, collapseItemProps as d, collapseProps as e, emitChangeFn as f };
//# sourceMappingURL=index-Dk4UY6mW.mjs.map
