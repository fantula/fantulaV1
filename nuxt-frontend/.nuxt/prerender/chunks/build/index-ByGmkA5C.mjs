import { defineComponent, renderSlot, openBlock, createBlock, Teleport } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { b as buildProps, d as definePropType, w as withInstall } from './base-CEWXqFm3.mjs';

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

export { ElTeleport as E, teleportProps as t };
//# sourceMappingURL=index-ByGmkA5C.mjs.map
