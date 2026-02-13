import { w as withInstall, b as buildProps, c as definePropType, q as withNoopInstall } from './index-DuV_oMrC.mjs';
import { i as iconPropType } from './icon-CyvpkMdQ.mjs';
import { i as isNumber$1, g as useNamespace } from './server.mjs';
import { d as componentSizes } from './index-xMedQC9S.mjs';
import { defineComponent, provide, reactive, toRef, createVNode, isVNode, cloneVNode, createTextVNode, inject, ref, computed, watch, openBlock, createElementBlock, normalizeStyle, normalizeClass, createBlock, unref, withCtx, resolveDynamicComponent, renderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { a as addUnit, E as ElIcon } from './index-CsSUb8pm.mjs';
import { isString } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { u as useTooltipContentProps, E as ElTooltip } from './index-B8mpCVSS.mjs';
import { placements } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import { f as flattedChildren } from './vnode-BKSxKQVt.mjs';

const avatarProps = buildProps({
  /**
   * @description avatar size.
   */
  size: {
    type: [Number, String],
    values: componentSizes,
    validator: (val) => isNumber$1(val)
  },
  /**
   * @description avatar shape.
   */
  shape: {
    type: String,
    values: ["circle", "square"]
  },
  /**
   * @description representation type to icon, more info on icon component.
   */
  icon: {
    type: iconPropType
  },
  /**
   * @description the source of the image for an image avatar.
   */
  src: {
    type: String,
    default: ""
  },
  /**
   * @description native attribute `alt` of image avatar.
   */
  alt: String,
  /**
   * @description native attribute srcset of image avatar.
   */
  srcSet: String,
  /**
   * @description set how the image fit its container for an image avatar.
   */
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
var _sfc_main = /* @__PURE__ */ defineComponent({
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
      if (isString(size.value)) classList.push(ns.m(size.value));
      if (icon) classList.push(ns.m("icon"));
      if (shape.value) classList.push(ns.m(shape.value));
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
      () => [props.src, props.srcSet],
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
          (__props.src || __props.srcSet) && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: __props.src,
            alt: __props.alt,
            srcset: __props.srcSet,
            style: normalizeStyle(fitStyle.value),
            onError: handleError
          }, null, 44, _hoisted_1)) : __props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
            ]),
            _: 1
            /* STABLE */
          })) : renderSlot(_ctx.$slots, "default", { key: 2 })
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});
const avatarGroupProps = {
  /**
   * @description control the size of avatars in this avatar-group
   */
  size: {
    type: definePropType([Number, String]),
    values: componentSizes,
    validator: (val) => isNumber$1(val)
  },
  /**
   * @description control the shape of avatars in this avatar-group
   */
  shape: {
    type: definePropType(String),
    values: ["circle", "square"]
  },
  /**
   * @description whether to collapse avatars
   */
  collapseAvatars: Boolean,
  /**
   * @description whether show all collapsed avatars when mouse hover text of the collapse-avatar. To use this, `collapse-avatars` must be true
   */
  collapseAvatarsTooltip: Boolean,
  /**
   * @description the max avatars number to be shown. To use this, `collapse-avatars` must be true
   */
  maxCollapseAvatars: {
    type: Number,
    default: 1
  },
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    type: definePropType(String),
    default: "light"
  },
  /**
   * @description placement of tooltip
   */
  placement: {
    type: definePropType(String),
    values: placements,
    default: "top"
  },
  /**
   * @description custom class name for tooltip
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description custom style for tooltip
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description custom class name for the collapse-avatar
   */
  collapseClass: String,
  /**
   * @description custom style for the collapse-avatar
   */
  collapseStyle: {
    type: definePropType([String, Array, Object])
  }
};
var AvatarGroup = /* @__PURE__ */ defineComponent({
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
          default: () => createVNode(_sfc_main, {
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
const ElAvatar = withInstall(_sfc_main, {
  AvatarGroup
});
const ElAvatarGroup = withNoopInstall(AvatarGroup);

export { ElAvatar as E, ElAvatarGroup as a, avatarEmits as b, avatarGroupContextKey as c, avatarGroupProps as d, avatarProps as e };
//# sourceMappingURL=index-COkWjNv2.mjs.map
