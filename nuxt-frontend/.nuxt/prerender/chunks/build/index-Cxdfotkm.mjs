import { pick } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import { b as buildProps } from './base-CEWXqFm3.mjs';

const ariaProps = buildProps({
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel: String,
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};

export { ariaProps as a, useAriaProps as u };
//# sourceMappingURL=index-Cxdfotkm.mjs.map
