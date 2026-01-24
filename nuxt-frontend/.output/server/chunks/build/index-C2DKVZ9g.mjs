import { defineComponent, provide, reactive, toRef, createVNode, cloneVNode, isVNode, createTextVNode, inject, ref, computed, watch, createElementBlock, openBlock, normalizeStyle, normalizeClass, createBlock, renderSlot, unref, withCtx, resolveDynamicComponent } from 'vue';
import { B as withInstall, w as _export_sfc$1, q as buildProps, x as useNamespace, D as definePropType, r as isNumber$1, T as addUnit, E as ElIcon, aw as iconPropType, aR as componentSizes, C as withNoopInstall } from './server.mjs';
import { isString } from '@vue/shared';
import { E as ElTooltip, u as useTooltipContentProps } from './index-CIoWkt90.mjs';
import { placements } from '@popperjs/core';
import { f as flattedChildren } from './vnode-D0IHQw_9.mjs';

const avatarProps = buildProps({
  size: {
    type: [Number, String],
    values: componentSizes,
    validator: (val) => isNumber$1(val)
  },
  shape: {
    type: String,
    values: ["circle", "square"]
  },
  icon: {
    type: iconPropType
  },
  src: {
    type: String,
    default: ""
  },
  alt: String,
  srcSet: String,
  fit: {
    type: definePropType(String),
    default: "cover"
  }
});
const avatarEmits = {
  error: (evt) => evt instanceof Event
};
const avatarGroupContextKey = /* @__PURE__ */ Symbol(
  "avatarGroupContextKey"
);
const _hoisted_1 = ["src", "alt", "srcset"];
const _sfc_main = defineComponent({
  ...{
    name: "ElAvatar"
  },
  __name: "avatar",
  props: avatarProps,
  emits: avatarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const avatarGroupContext = inject(avatarGroupContextKey, void 0);
    const ns = useNamespace("avatar");
    const hasLoadError = ref(false);
    const size = computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.size;
    });
    const shape = computed(
      () => {
        var _a, _b;
        return (_b = (_a = props.shape) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.shape) != null ? _b : "circle";
      }
    );
    const avatarClass = computed(() => {
      const { icon } = props;
      const classList = [ns.b()];
      if (isString(size.value))
        classList.push(ns.m(size.value));
      if (icon)
        classList.push(ns.m("icon"));
      if (shape.value)
        classList.push(ns.m(shape.value));
      return classList;
    });
    const sizeStyle = computed(() => {
      return isNumber$1(size.value) ? ns.cssVarBlock({
        size: addUnit(size.value)
      }) : void 0;
    });
    const fitStyle = computed(() => ({
      objectFit: props.fit
    }));
    watch(
      () => props.src,
      () => hasLoadError.value = false
    );
    function handleError(e) {
      hasLoadError.value = true;
      emit("error", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          class: normalizeClass(avatarClass.value),
          style: normalizeStyle(sizeStyle.value)
        },
        [
          (_ctx.src || _ctx.srcSet) && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _ctx.src,
            alt: _ctx.alt,
            srcset: _ctx.srcSet,
            style: normalizeStyle(fitStyle.value),
            onError: handleError
          }, null, 44, _hoisted_1)) : _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
            ]),
            _: 1
          })) : renderSlot(_ctx.$slots, "default", { key: 2 })
        ],
        6
      );
    };
  }
});
var Avatar = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/avatar/src/avatar.vue"]]);
const avatarGroupProps = buildProps({
  size: avatarProps.size,
  shape: avatarProps.shape,
  collapseAvatars: Boolean,
  collapseAvatarsTooltip: Boolean,
  maxCollapseAvatars: {
    type: Number,
    default: 1
  },
  effect: {
    type: definePropType(String),
    default: "light"
  },
  placement: {
    type: definePropType(String),
    values: placements,
    default: "top"
  },
  popperClass: useTooltipContentProps.popperClass,
  popperStyle: useTooltipContentProps.popperStyle,
  collapseClass: String,
  collapseStyle: {
    type: definePropType([String, Array, Object])
  }
});
var AvatarGroup = defineComponent({
  name: "ElAvatarGroup",
  props: avatarGroupProps,
  setup(props, {
    slots
  }) {
    const ns = useNamespace("avatar-group");
    provide(avatarGroupContextKey, reactive({
      size: toRef(props, "size"),
      shape: toRef(props, "shape")
    }));
    return () => {
      var _a, _b;
      const avatars = flattedChildren((_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : []);
      let visibleAvatars = avatars;
      const showCollapseAvatar = props.collapseAvatars && avatars.length > props.maxCollapseAvatars;
      if (showCollapseAvatar) {
        visibleAvatars = avatars.slice(0, props.maxCollapseAvatars);
        const hiddenAvatars = avatars.slice(props.maxCollapseAvatars);
        visibleAvatars.push(createVNode(ElTooltip, {
          "popperClass": props.popperClass,
          "popperStyle": props.popperStyle,
          "placement": props.placement,
          "effect": props.effect,
          "disabled": !props.collapseAvatarsTooltip
        }, {
          default: () => createVNode(Avatar, {
            "size": props.size,
            "shape": props.shape,
            "class": props.collapseClass,
            "style": props.collapseStyle
          }, {
            default: () => [createTextVNode("+ "), hiddenAvatars.length]
          }),
          content: () => createVNode("div", {
            "class": ns.e("collapse-avatars")
          }, [hiddenAvatars.map((node, idx) => {
            var _a2;
            return isVNode(node) ? cloneVNode(node, {
              key: (_a2 = node.key) != null ? _a2 : idx
            }) : node;
          })])
        }));
      }
      return createVNode("div", {
        "class": ns.b()
      }, [visibleAvatars]);
    };
  }
});
const ElAvatar = withInstall(Avatar, {
  AvatarGroup
});
withNoopInstall(AvatarGroup);

export { ElAvatar as E, avatarEmits as a, avatarGroupContextKey as b, avatarGroupProps as c, avatarProps as d };
//# sourceMappingURL=index-C2DKVZ9g.mjs.map
