import { watch, unref } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { v as debugWarn } from './server.mjs';

const useDeprecated = ({ from, replacement, scope, version, ref, type = "API" }, condition) => {
  watch(
    () => unref(condition),
    (val) => {
      if (val) {
        debugWarn(
          scope,
          `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`
        );
      }
    },
    {
      immediate: true
    }
  );
};

export { useDeprecated as u };
//# sourceMappingURL=index-7IYgoTSU.mjs.map
