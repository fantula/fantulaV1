import { defineComponent, renderSlot, openBlock, createBlock, Teleport } from "vue";
import { b as buildProps, d as definePropType, w as withInstall } from "./base-CEWXqFm3.js";
const teleportProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    required: true
  },
  disabled: Boolean
});
var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "teleport",
  props: teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport, {
        key: 1,
        to: _ctx.to
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});
const ElTeleport = withInstall(_sfc_main);
export {
  ElTeleport as E,
  teleportProps as t
};
//# sourceMappingURL=index-ByGmkA5C.js.map
