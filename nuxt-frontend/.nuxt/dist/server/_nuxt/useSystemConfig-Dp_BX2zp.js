import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { G as useState } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
const useSystemConfig = () => {
  const contactConfig = useState("contact-config", () => null);
  const fetchContactConfig = async () => {
    if (contactConfig.value) return contactConfig.value;
    try {
      const { data, success } = await $fetch("/api/client/config/contact");
      if (success) {
        contactConfig.value = data;
      }
    } catch (e) {
      console.error("Failed to fetch contact config", e);
    }
    return contactConfig.value;
  };
  return {
    contactConfig,
    fetchContactConfig
  };
};
export {
  useSystemConfig as u
};
//# sourceMappingURL=useSystemConfig-Dp_BX2zp.js.map
