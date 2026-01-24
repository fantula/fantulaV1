import { a as ElTable } from './index-KOxrtlML.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { E as ElPagination } from './index-cR1ntQxK.mjs';
import { _ as _export_sfc } from './server.mjs';
import { defineComponent, mergeProps, withCtx, renderSlot, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminDataTable",
  __ssrInlineRender: true,
  props: {
    data: {},
    loading: { type: Boolean },
    total: {},
    currentPage: {},
    pageSize: {}
  },
  emits: ["update:currentPage", "update:pageSize", "selection-change"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_table = ElTable;
      const _component_el_empty = ElEmpty;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-data-table" }, _attrs))} data-v-d54e5100><div class="table-container" data-v-d54e5100>`);
      _push(ssrRenderComponent(_component_el_table, mergeProps(_ctx.$attrs, {
        data: __props.data,
        border: "",
        style: { "width": "100%" },
        onSelectionChange: ($event) => _ctx.$emit("selection-change", $event)
      }, ssrGetDirectiveProps(_ctx, _directive_loading, __props.loading)), {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_empty, {
              description: "\u6682\u65E0\u6570\u636E",
              "image-size": 100
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_empty, {
                description: "\u6682\u65E0\u6570\u636E",
                "image-size": 100
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
      if (__props.total !== void 0) {
        _push(`<div class="pagination-wrapper" data-v-d54e5100>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          background: "",
          layout: "total, sizes, prev, pager, next, jumper",
          total: __props.total,
          "current-page": __props.currentPage,
          "page-size": __props.pageSize,
          "page-sizes": [10, 20, 50, 100],
          "onUpdate:currentPage": ($event) => _ctx.$emit("update:currentPage", $event),
          "onUpdate:pageSize": ($event) => _ctx.$emit("update:pageSize", $event)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminDataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminDataTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d54e5100"]]);

export { AdminDataTable as A };
//# sourceMappingURL=AdminDataTable-CCOHgBz_.mjs.map
