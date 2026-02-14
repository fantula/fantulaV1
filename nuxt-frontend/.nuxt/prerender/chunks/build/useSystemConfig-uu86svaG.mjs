import { H as useState } from './server.mjs';

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

export { useSystemConfig as u };
//# sourceMappingURL=useSystemConfig-uu86svaG.mjs.map
