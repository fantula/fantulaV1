import { getCurrentInstance, computed, unref, inject, provide, ref } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { l as localeContextKey, S as SIZE_INJECTION_KEY, e as emptyValuesContextKey, b as useLocale } from './index-xMedQC9S.mjs';
import { f as debugWarn, o as namespaceContextKey, z as zIndexContextKey, g as useNamespace, p as defaultNamespace, q as useZIndex, s as defaultInitialZIndex } from './server.mjs';
import { k as keysOf } from './objects-Bz74KHmq.mjs';

const configProviderContextKey = /* @__PURE__ */ Symbol();
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => {
      var _a, _b;
      return (_b = (_a = config.value) == null ? void 0 : _a[key]) != null ? _b : defaultValue;
    });
  } else {
    return config;
  }
}
function useGlobalComponentSettings(block, sizeFallback) {
  const config = useGlobalConfig();
  const ns = useNamespace(
    block,
    computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.namespace) || defaultNamespace;
    })
  );
  const locale = useLocale(computed(() => {
    var _a;
    return (_a = config.value) == null ? void 0 : _a.locale;
  }));
  const zIndex = useZIndex(
    computed(() => {
      var _a;
      return ((_a = config.value) == null ? void 0 : _a.zIndex) || defaultInitialZIndex;
    })
  );
  const size = computed(() => {
    var _a;
    return unref(sizeFallback) || ((_a = config.value) == null ? void 0 : _a.size) || "";
  });
  provideGlobalConfig(computed(() => unref(config) || {}));
  return {
    ns,
    locale,
    zIndex,
    size
  };
}
const provideGlobalConfig = (config, app, global = false) => {
  var _a;
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : void 0;
  const provideFn = (_a = app == null ? void 0 : app.provide) != null ? _a : inSetup ? provide : void 0;
  if (!provideFn) {
    debugWarn(
      "provideGlobalConfig",
      "provideGlobalConfig() can only be used inside setup()."
    );
    return;
  }
  const context = computed(() => {
    const cfg = unref(config);
    if (!(oldConfig == null ? void 0 : oldConfig.value)) return cfg;
    return mergeConfig(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  provideFn(
    localeContextKey,
    computed(() => context.value.locale)
  );
  provideFn(
    namespaceContextKey,
    computed(() => context.value.namespace)
  );
  provideFn(
    zIndexContextKey,
    computed(() => context.value.zIndex)
  );
  provideFn(SIZE_INJECTION_KEY, {
    size: computed(() => context.value.size || "")
  });
  provideFn(
    emptyValuesContextKey,
    computed(() => ({
      emptyValues: context.value.emptyValues,
      valueOnClear: context.value.valueOnClear
    }))
  );
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};
const mergeConfig = (a, b) => {
  const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
  const obj = {};
  for (const key of keys) {
    obj[key] = b[key] !== void 0 ? b[key] : a[key];
  }
  return obj;
};

export { useGlobalConfig as a, configProviderContextKey as c, provideGlobalConfig as p, useGlobalComponentSettings as u };
//# sourceMappingURL=use-global-config-Dt87SALX.mjs.map
