import { pick } from "lodash-unified";
import { b as buildProps } from "./base-CEWXqFm3.js";
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
export {
  ariaProps as a,
  useAriaProps as u
};
//# sourceMappingURL=index-Cxdfotkm.js.map
