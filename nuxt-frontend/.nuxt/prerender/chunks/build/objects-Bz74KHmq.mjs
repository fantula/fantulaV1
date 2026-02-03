import { set, get } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';

const keysOf = (arr) => Object.keys(arr);
const entriesOf = (arr) => Object.entries(arr);
const getProp = (obj, path, defaultValue) => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val) {
      set(obj, path, val);
    }
  };
};

export { entriesOf as e, getProp as g, keysOf as k };
//# sourceMappingURL=objects-Bz74KHmq.mjs.map
