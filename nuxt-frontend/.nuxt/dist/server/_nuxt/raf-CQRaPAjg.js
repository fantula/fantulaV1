import { isClient } from "@vueuse/core";
const rAF = (fn) => isClient ? (void 0).requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => isClient ? (void 0).cancelAnimationFrame(handle) : clearTimeout(handle);
export {
  cAF as c,
  rAF as r
};
//# sourceMappingURL=raf-CQRaPAjg.js.map
