import { isClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';

const rAF = (fn) => isClient ? (void 0).requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => isClient ? (void 0).cancelAnimationFrame(handle) : clearTimeout(handle);

export { cAF as c, rAF as r };
//# sourceMappingURL=raf-CQRaPAjg.mjs.map
