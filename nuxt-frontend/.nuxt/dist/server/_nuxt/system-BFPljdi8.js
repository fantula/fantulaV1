import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
const adminSystemApi = {
  /**
   * 获取联系方式配置
   */
  async getContactConfig() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("system_configs").select("value").eq("key", "contact_info").single();
    if (error) {
      if (error.code === "PGRST116") {
        return {
          success: true,
          data: {
            wechat_id: "Spotify-cn",
            wechat_qr: "",
            telegram_id: "@Fantula_Support",
            telegram_qr: "",
            service_time: "10:00 - 23:00"
          }
        };
      }
      return { success: false, error: error.message };
    }
    return { success: true, data: data.value };
  },
  /**
   * 更新联系方式配置
   */
  async updateContactConfig(config) {
    const client = getSupabaseClient();
    const { error } = await client.from("system_configs").upsert({
      key: "contact_info",
      value: config,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};
export {
  adminSystemApi as a
};
//# sourceMappingURL=system-BFPljdi8.js.map
