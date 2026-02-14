/* empty css              */
/* empty css                    */
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { c as useRoute } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { u as useToast } from "./useToast-DsT-1f4c.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
const useNotify = () => {
  const route = useRoute();
  const { showToast } = useToast();
  const notify = (message, type = "info") => {
    const isMobile = route.path.includes("/mobile") || false;
    if (isMobile) {
      showToast(message, type);
    } else {
      ElMessage({
        message,
        type,
        duration: 3e3,
        showClose: true,
        grouping: true
      });
    }
  };
  return {
    notify,
    success: (msg) => notify(msg, "success"),
    error: (msg) => notify(msg, "error"),
    warning: (msg) => notify(msg, "warning"),
    info: (msg) => notify(msg, "info")
  };
};
export {
  useNotify as u
};
//# sourceMappingURL=useNotify-CME3DTm8.js.map
