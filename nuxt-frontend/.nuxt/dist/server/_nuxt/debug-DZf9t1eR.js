import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRoute } from "vue-router";
import "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = {
  __name: "debug",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const products = ref([]);
    const loading = ref(true);
    const typeMap = { "virtual": "virtual", "shared": "shared_account", "one_time": "one_time_cdk" };
    const targetType = computed(() => route.query.type ? typeMap[route.query.type] : "N/A");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><h2>Product Debug</h2>`);
      if (loading.value) {
        _push(`<div>Loading...</div>`);
      } else {
        _push(`<div><table border="1" cellpadding="4"><thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Cat ID</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(products.value, (p) => {
          _push(`<tr><td>${ssrInterpolate(p.id)}</td><td>${ssrInterpolate(p.product_name)}</td><td>${ssrInterpolate(p.product_type)}</td><td>${ssrInterpolate(p.category_id)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table><h3>Query Params</h3><pre>${ssrInterpolate(unref(route).query)}</pre><h3>Type Map Check</h3><p>Query Type: ${ssrInterpolate(unref(route).query.type)}</p><p>Mapped Type: ${ssrInterpolate(targetType.value)}</p></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/cdk/debug.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=debug-DZf9t1eR.js.map
