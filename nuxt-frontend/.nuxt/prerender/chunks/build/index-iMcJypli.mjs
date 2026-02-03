import { w as withInstall, e as withNoopInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { a as useSizeProp } from './index-CO6H4Lsj.mjs';
import { defineComponent, useSlots, provide, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, createBlock, inject, createVNode, withDirectives, h } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { isNil } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import { f as flattedChildren, g as getNormalizedProps } from './vnode-C7bAOlXh.mjs';
import { a as addUnit } from './index-Byc6LUYX.mjs';
import { f as useNamespace } from './server.mjs';
import { b as useFormSize } from './use-form-item-Bj_anzlj.mjs';

const descriptionProps = buildProps({
  /**
   * @description with or without border
   */
  border: Boolean,
  /**
   * @description numbers of `Descriptions Item` in one line
   */
  column: {
    type: Number,
    default: 3
  },
  /**
   * @description direction of list
   */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
   * @description size of list
   */
  size: useSizeProp,
  /**
   * @description title text, display on the top left
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description extra text, display on the top right
   */
  extra: {
    type: String,
    default: ""
  },
  /**
   * @description width of every label column
   */
  labelWidth: {
    type: [String, Number]
  }
});
const descriptionsRowProps = buildProps({
  row: {
    type: definePropType(Array),
    default: () => []
  }
});
const descriptionsKey = /* @__PURE__ */ Symbol("elDescriptions");
var ElDescriptionsCell = defineComponent({
  name: "ElDescriptionsCell",
  props: {
    cell: {
      type: Object
    },
    tag: {
      type: String,
      default: "td"
    },
    type: {
      type: String
    }
  },
  setup() {
    const descriptions = inject(descriptionsKey, {});
    return {
      descriptions
    };
  },
  render() {
    var _a, _b, _c, _d;
    const item = getNormalizedProps(
      this.cell
    );
    const directives = (((_a = this.cell) == null ? void 0 : _a.dirs) || []).map((dire) => {
      const { dir, arg, modifiers, value } = dire;
      return [dir, value, arg, modifiers];
    });
    const { border, direction } = this.descriptions;
    const isVertical = direction === "vertical";
    const renderLabel = () => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = this.cell) == null ? void 0 : _a2.children) == null ? void 0 : _b2.label) == null ? void 0 : _c2.call(_b2)) || item.label;
    };
    const renderContent = () => {
      var _a2, _b2, _c2;
      return (_c2 = (_b2 = (_a2 = this.cell) == null ? void 0 : _a2.children) == null ? void 0 : _b2.default) == null ? void 0 : _c2.call(_b2);
    };
    const span = item.span;
    const rowspan = item.rowspan;
    const align = item.align ? `is-${item.align}` : "";
    const labelAlign = item.labelAlign ? `is-${item.labelAlign}` : align;
    const className = item.className;
    const labelClassName = item.labelClassName;
    const width = this.type === "label" ? (_c = (_b = item.labelWidth) != null ? _b : this.descriptions.labelWidth) != null ? _c : item.width : item.width;
    const style = {
      width: addUnit(width),
      minWidth: addUnit(item.minWidth)
    };
    const ns = useNamespace("descriptions");
    switch (this.type) {
      case "label":
        return withDirectives(
          h(
            this.tag,
            {
              style,
              class: [
                ns.e("cell"),
                ns.e("label"),
                ns.is("bordered-label", border),
                ns.is("vertical-label", isVertical),
                labelAlign,
                labelClassName
              ],
              colSpan: isVertical ? span : 1,
              rowspan: isVertical ? 1 : rowspan
            },
            renderLabel()
          ),
          directives
        );
      case "content":
        return withDirectives(
          h(
            this.tag,
            {
              style,
              class: [
                ns.e("cell"),
                ns.e("content"),
                ns.is("bordered-content", border),
                ns.is("vertical-content", isVertical),
                align,
                className
              ],
              colSpan: isVertical ? span : span * 2 - 1,
              rowspan: isVertical ? rowspan * 2 - 1 : rowspan
            },
            renderContent()
          ),
          directives
        );
      default: {
        const label = renderLabel();
        const labelStyle = {};
        const width2 = addUnit((_d = item.labelWidth) != null ? _d : this.descriptions.labelWidth);
        if (width2) {
          labelStyle.width = width2;
          labelStyle.display = "inline-block";
        }
        return withDirectives(
          h(
            "td",
            {
              style,
              class: [ns.e("cell"), align],
              colSpan: span,
              rowspan
            },
            [
              !isNil(label) ? h(
                "span",
                {
                  style: labelStyle,
                  class: [ns.e("label"), labelClassName]
                },
                label
              ) : void 0,
              h(
                "span",
                {
                  class: [ns.e("content"), className]
                },
                renderContent()
              )
            ]
          ),
          directives
        );
      }
    }
  }
});
const _hoisted_1 = { key: 1 };
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElDescriptionsRow"
  },
  __name: "descriptions-row",
  props: descriptionsRowProps,
  setup(__props) {
    const descriptions = inject(descriptionsKey, {});
    return (_ctx, _cache) => {
      return unref(descriptions).direction === "vertical" ? (openBlock(), createElementBlock(
        Fragment,
        { key: 0 },
        [
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.row, (cell, _index) => {
                return openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: `tr1-${_index}`,
                  cell,
                  tag: "th",
                  type: "label"
                }, null, 8, ["cell"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.row, (cell, _index) => {
                return openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: `tr2-${_index}`,
                  cell,
                  tag: "td",
                  type: "content"
                }, null, 8, ["cell"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (openBlock(), createElementBlock("tr", _hoisted_1, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(__props.row, (cell, _index) => {
            return openBlock(), createElementBlock(
              Fragment,
              {
                key: `tr3-${_index}`
              },
              [
                unref(descriptions).border ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    createVNode(unref(ElDescriptionsCell), {
                      cell,
                      tag: "td",
                      type: "label"
                    }, null, 8, ["cell"]),
                    createVNode(unref(ElDescriptionsCell), {
                      cell,
                      tag: "td",
                      type: "content"
                    }, null, 8, ["cell"])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: 1,
                  cell,
                  tag: "td",
                  type: "both"
                }, null, 8, ["cell"]))
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]));
    };
  }
});
const COMPONENT_NAME = "ElDescriptionsItem";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElDescriptions"
  },
  __name: "description",
  props: descriptionProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("descriptions");
    const descriptionsSize = useFormSize();
    const slots = useSlots();
    provide(descriptionsKey, props);
    const descriptionKls = computed(() => [ns.b(), ns.m(descriptionsSize.value)]);
    const filledNode = (node, span, count, isLast = false) => {
      if (!node.props) {
        node.props = {};
      }
      if (span > count) {
        node.props.span = count;
      }
      if (isLast) {
        node.props.span = span;
      }
      return node;
    };
    const getRows = () => {
      if (!slots.default) return [];
      const children = flattedChildren(slots.default()).filter(
        (node) => {
          var _a;
          return ((_a = node == null ? void 0 : node.type) == null ? void 0 : _a.name) === COMPONENT_NAME;
        }
      );
      const rows = [];
      let temp = [];
      let count = props.column;
      let totalSpan = 0;
      const rowspanTemp = [];
      children.forEach((node, index) => {
        var _a, _b, _c;
        const span = ((_a = node.props) == null ? void 0 : _a.span) || 1;
        const rowspan = ((_b = node.props) == null ? void 0 : _b.rowspan) || 1;
        const rowNo = rows.length;
        rowspanTemp[rowNo] || (rowspanTemp[rowNo] = 0);
        if (rowspan > 1) {
          for (let i = 1; i < rowspan; i++) {
            rowspanTemp[_c = rowNo + i] || (rowspanTemp[_c] = 0);
            rowspanTemp[rowNo + i]++;
            totalSpan++;
          }
        }
        if (rowspanTemp[rowNo] > 0) {
          count -= rowspanTemp[rowNo];
          rowspanTemp[rowNo] = 0;
        }
        if (index < children.length - 1) {
          totalSpan += span > count ? count : span;
        }
        if (index === children.length - 1) {
          const lastSpan = props.column - totalSpan % props.column;
          temp.push(filledNode(node, lastSpan, count, true));
          rows.push(temp);
          return;
        }
        if (span < count) {
          count -= span;
          temp.push(node);
        } else {
          temp.push(filledNode(node, span, count));
          rows.push(temp);
          count = props.column;
          temp = [];
        }
      });
      return rows;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(descriptionKls.value)
        },
        [
          __props.title || __props.extra || _ctx.$slots.title || _ctx.$slots.extra ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("header"))
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("title"))
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
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("extra"))
                },
                [
                  renderSlot(_ctx.$slots, "extra", {}, () => [
                    createTextVNode(
                      toDisplayString(__props.extra),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("body"))
            },
            [
              createElementVNode(
                "table",
                {
                  class: normalizeClass([unref(ns).e("table"), unref(ns).is("bordered", __props.border)])
                },
                [
                  createElementVNode("tbody", null, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(getRows(), (row, _index) => {
                        return openBlock(), createBlock(_sfc_main$1, {
                          key: _index,
                          row
                        }, null, 8, ["row"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ],
                2
                /* CLASS */
              )
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
const columnAlignment = ["left", "center", "right"];
const descriptionItemProps = buildProps({
  /**
   * @description label text
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * @description colspan of column
   */
  span: {
    type: Number,
    default: 1
  },
  /**
   * @description the number of rows a cell should span
   */
  rowspan: {
    type: Number,
    default: 1
  },
  /**
   * @description column width, the width of the same column in different rows is set by the max value (If no `border`, width contains label and content)
   */
  width: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description column minimum width, columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion (If no`border`, width contains label and content)
   */
  minWidth: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description column label width, if not set, it will be the same as the width of the column. Higher priority than the `label-width` of `Descriptions`
   */
  labelWidth: {
    type: [String, Number]
  },
  /**
   * @description column content alignment (If no `border`, effective for both label and content)
   */
  align: {
    type: String,
    values: columnAlignment,
    default: "left"
  },
  /**
   * @description column label alignment, if omitted, the value of the above `align` attribute will be applied (If no `border`, please use `align` attribute)
   */
  labelAlign: {
    type: String,
    values: columnAlignment
  },
  /**
   * @description column content custom class name
   */
  className: {
    type: String,
    default: ""
  },
  /**
   * @description column label custom class name
   */
  labelClassName: {
    type: String,
    default: ""
  }
});
const DescriptionItem = defineComponent({
  name: COMPONENT_NAME,
  props: descriptionItemProps
});
const ElDescriptions = withInstall(_sfc_main, {
  DescriptionsItem: DescriptionItem
});
const ElDescriptionsItem = withNoopInstall(DescriptionItem);

export { ElDescriptions as E, ElDescriptionsItem as a, descriptionProps as b, columnAlignment as c, descriptionItemProps as d };
//# sourceMappingURL=index-iMcJypli.mjs.map
