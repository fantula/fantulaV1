import { pick } from 'lodash-unified';
import { q as buildProps } from './server.mjs';

const ariaProps = buildProps({
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};

export { ariaProps as a, useAriaProps as u };
//# sourceMappingURL=index-Dxw_X3Hq.mjs.map
