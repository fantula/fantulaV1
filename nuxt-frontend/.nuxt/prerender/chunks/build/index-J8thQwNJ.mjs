import { defineComponent, useSlots, provide, computed, createElementBlock, openBlock, normalizeClass, createCommentVNode, createElementVNode, unref, renderSlot, createTextVNode, toDisplayString, Fragment, renderList, createBlock, inject, createVNode, withDirectives, h } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { isNil } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import { f as flattedChildren, g as getNormalizedProps } from './vnode-D0IHQw_9.mjs';
import { B as withInstall, C as withNoopInstall, w as _export_sfc$1, q as buildProps, x as useNamespace, ax as useSizeProp, D as definePropType, T as addUnit } from './server.mjs';
import { b as useFormSize } from './use-form-common-props-DlCG9pC5.mjs';

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
const descriptionsRowProps = buildProps({
  row: {
    type: definePropType(Array),
    default: () => []
  }
});
const _hoisted_1 = { key: 1 };
const _sfc_main$1 = defineComponent({
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
              renderList(_ctx.row, (cell, _index) => {
                return openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: `tr1-${_index}`,
                  cell,
                  tag: "th",
                  type: "label"
                }, null, 8, ["cell"]);
              }),
              128
            ))
          ]),
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.row, (cell, _index) => {
                return openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: `tr2-${_index}`,
                  cell,
                  tag: "td",
                  type: "content"
                }, null, 8, ["cell"]);
              }),
              128
            ))
          ])
        ],
        64
      )) : (openBlock(), createElementBlock("tr", _hoisted_1, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.row, (cell, _index) => {
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
                )) : (openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: 1,
                  cell,
                  tag: "td",
                  type: "both"
                }, null, 8, ["cell"]))
              ],
              64
            );
          }),
          128
        ))
      ]));
    };
  }
});
var ElDescriptionsRow = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/descriptions/src/descriptions-row.vue"]]);
const descriptionProps = buildProps({
  border: Boolean,
  column: {
    type: Number,
    default: 3
  },
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  size: useSizeProp,
  title: {
    type: String,
    default: ""
  },
  extra: {
    type: String,
    default: ""
  },
  labelWidth: {
    type: [String, Number]
  }
});
const COMPONENT_NAME = "ElDescriptionsItem";
const _sfc_main = defineComponent({
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
      if (!slots.default)
        return [];
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
          _ctx.title || _ctx.extra || _ctx.$slots.title || _ctx.$slots.extra ? (openBlock(), createElementBlock(
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
                      toDisplayString(_ctx.title),
                      1
                    )
                  ])
                ],
                2
              ),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("extra"))
                },
                [
                  renderSlot(_ctx.$slots, "extra", {}, () => [
                    createTextVNode(
                      toDisplayString(_ctx.extra),
                      1
                    )
                  ])
                ],
                2
              )
            ],
            2
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
                  class: normalizeClass([unref(ns).e("table"), unref(ns).is("bordered", _ctx.border)])
                },
                [
                  createElementVNode("tbody", null, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(getRows(), (row, _index) => {
                        return openBlock(), createBlock(ElDescriptionsRow, {
                          key: _index,
                          row
                        }, null, 8, ["row"]);
                      }),
                      128
                    ))
                  ])
                ],
                2
              )
            ],
            2
          )
        ],
        2
      );
    };
  }
});
var Descriptions = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/descriptions/src/description.vue"]]);
const columnAlignment = ["left", "center", "right"];
const descriptionItemProps = buildProps({
  label: {
    type: String,
    default: ""
  },
  span: {
    type: Number,
    default: 1
  },
  rowspan: {
    type: Number,
    default: 1
  },
  width: {
    type: [String, Number],
    default: ""
  },
  minWidth: {
    type: [String, Number],
    default: ""
  },
  labelWidth: {
    type: [String, Number]
  },
  align: {
    type: String,
    values: columnAlignment,
    default: "left"
  },
  labelAlign: {
    type: String,
    values: columnAlignment
  },
  className: {
    type: String,
    default: ""
  },
  labelClassName: {
    type: String,
    default: ""
  }
});
const DescriptionItem = defineComponent({
  name: COMPONENT_NAME,
  props: descriptionItemProps
});
const ElDescriptions = withInstall(Descriptions, {
  DescriptionsItem: DescriptionItem
});
const ElDescriptionsItem = withNoopInstall(DescriptionItem);

export { ElDescriptions as E, ElDescriptionsItem as a, descriptionProps as b, columnAlignment as c, descriptionItemProps as d };
//# sourceMappingURL=index-J8thQwNJ.mjs.map
