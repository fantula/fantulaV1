import { w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, normalizeStyle } from 'vue';
import { f as useNamespace, i as isNumber$1 } from './server.mjs';
import { isFunction } from '@vue/shared';

const statisticProps = buildProps({
  /**
   * @description Setting the decimal point
   */
  decimalSeparator: {
    type: String,
    default: "."
  },
  /**
   * @description Sets the thousandth identifier
   */
  groupSeparator: {
    type: String,
    default: ","
  },
  /**
   * @description numerical precision
   */
  precision: {
    type: Number,
    default: 0
  },
  /**
   * @description Custom numerical presentation
   */
  formatter: Function,
  /**
   * @description Numerical content
   */
  value: {
    type: definePropType([Number, Object]),
    default: 0
  },
  /**
   * @description Sets the prefix of a number
   */
  prefix: String,
  /**
   * @description  Sets the suffix of a number
   */
  suffix: String,
  /**
   * @description Numeric titles
   */
  title: String,
  /**
   * @description Styles numeric values
   */
  valueStyle: {
    type: definePropType([String, Object, Array])
  }
});
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElStatistic"
  },
  __name: "statistic",
  props: statisticProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("statistic");
    const displayValue = computed(() => {
      const { value, formatter, precision, decimalSeparator, groupSeparator } = props;
      if (isFunction(formatter)) return formatter(value);
      if (!isNumber$1(value) || Number.isNaN(value)) return value;
      let [integer, decimal = ""] = String(value).split(".");
      decimal = decimal.padEnd(precision, "0").slice(0, precision > 0 ? precision : 0);
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
      return [integer, decimal].join(decimal ? decimalSeparator : "");
    });
    __expose({
      /**
       * @description current display value
       */
      displayValue
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          _ctx.$slots.title || __props.title ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("head"))
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
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("content"))
            },
            [
              _ctx.$slots.prefix || __props.prefix ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("prefix"))
                },
                [
                  renderSlot(_ctx.$slots, "prefix", {}, () => [
                    createElementVNode(
                      "span",
                      null,
                      toDisplayString(__props.prefix),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("number")),
                  style: normalizeStyle(__props.valueStyle)
                },
                toDisplayString(displayValue.value),
                7
                /* TEXT, CLASS, STYLE */
              ),
              _ctx.$slots.suffix || __props.suffix ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(unref(ns).e("suffix"))
                },
                [
                  renderSlot(_ctx.$slots, "suffix", {}, () => [
                    createElementVNode(
                      "span",
                      null,
                      toDisplayString(__props.suffix),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});
const ElStatistic = withInstall(_sfc_main);

export { ElStatistic as E, statisticProps as s };
//# sourceMappingURL=index-BypRx3Tq.mjs.map
