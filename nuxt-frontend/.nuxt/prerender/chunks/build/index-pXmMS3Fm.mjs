import { w as withInstall, b as buildProps, d as definePropType } from './index-CRs4T-Jf.mjs';
import { m as mutable } from './typescript-D6L75muK.mjs';
import { defineComponent, computed, provide, openBlock, createBlock, resolveDynamicComponent, normalizeStyle, normalizeClass, withCtx, renderSlot, inject } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { b as useNamespace, i as isNumber$1 } from './server.mjs';
import { isObject } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';

const colProps = buildProps({
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description number of column the grid spans
   */
  span: {
    type: Number,
    default: 24
  },
  /**
   * @description number of spacing on the left side of the grid
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the left
   */
  pull: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the right
   */
  push: {
    type: Number,
    default: 0
  },
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
});
const rowContextKey = /* @__PURE__ */ Symbol("rowContextKey");
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCol"
  },
  __name: "col",
  props: colProps,
  setup(__props) {
    const props = __props;
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
    const ns = useNamespace("col");
    const style = computed(() => {
      const styles = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const colKls = computed(() => {
      const classes = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber$1(size)) {
          if (prop === "span") classes.push(ns.b(`${props[prop]}`));
          else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (isNumber$1(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`)
            );
          });
        }
      });
      if (gutter.value) {
        classes.push(ns.is("guttered"));
      }
      return [ns.b(), classes];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        class: normalizeClass(colKls.value),
        style: normalizeStyle(style.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "style"]);
    };
  }
});
const ElCol = withInstall(_sfc_main$1);
const RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
];
const RowAlign = ["top", "middle", "bottom"];
const rowProps = buildProps({
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description grid spacing
   */
  gutter: {
    type: Number,
    default: 0
  },
  /**
   * @description horizontal alignment of flex layout
   */
  justify: {
    type: String,
    values: RowJustify,
    default: "start"
  },
  /**
   * @description vertical alignment of flex layout
   */
  align: {
    type: String,
    values: RowAlign
  }
});
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRow"
  },
  __name: "row",
  props: rowProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("row");
    const gutter = computed(() => props.gutter);
    provide(rowContextKey, {
      gutter
    });
    const style = computed(() => {
      const styles = {};
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const rowKls = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, !!props.align)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        class: normalizeClass(rowKls.value),
        style: normalizeStyle(style.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "style"]);
    };
  }
});
const ElRow = withInstall(_sfc_main);

export { ElRow as E, RowAlign as R, ElCol as a, RowJustify as b, colProps as c, rowProps as d, rowContextKey as r };
//# sourceMappingURL=index-pXmMS3Fm.mjs.map
