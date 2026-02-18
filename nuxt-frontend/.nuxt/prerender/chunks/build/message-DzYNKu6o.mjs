import getSupabaseClient from './supabase-F2pQZHm6.mjs';

const adminMessageApi = {
  async getMessages(params) {
    const client = getSupabaseClient();
    let query = client.from("messages").select("*", { count: "exact" });
    if (params == null ? void 0 : params.user_uid) {
      query = query.eq("user_uid", params.user_uid);
    }
    query = query.order("created_at", { ascending: false });
    if (params == null ? void 0 : params.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      return { success: false, messages: [], total: 0, error: error.message };
    }
    return { success: true, messages: data || [], total: count || 0 };
  },
  async sendMessage(userUid, title, content, type = "system", link) {
    const client = getSupabaseClient();
    const { data: profile, error: profileError } = await client.from("profiles").select("id, uid").eq("uid", userUid).single();
    if (profileError || !profile) {
      return { success: false, error: "\u7528\u6237\u4E0D\u5B58\u5728\uFF0C\u7981\u6B62\u53D1\u9001\u6D88\u606F" };
    }
    const { data, error } = await client.from("messages").insert({
      user_id: profile.id,
      user_uid: userUid,
      title,
      content,
      type,
      link: link || null
    }).select("id").single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, message_id: data.id };
  },
  /**
   * 获取客户消息通知配置
   */
  async getNotificationSettings() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("system_settings").select("value").eq("key", "customer_notification_config").single();
    if (error) {
      if (error.code === "PGRST116") {
        return { success: true, settings: {} };
      }
      return { success: false, error: error.message };
    }
    let settings = data.value;
    if (typeof settings === "string") {
      try {
        settings = JSON.parse(settings);
      } catch (e) {
      }
    }
    return { success: true, settings };
  },
  /**
   * 更新客户消息通知配置
   */
  async updateNotificationSettings(settings) {
    const client = getSupabaseClient();
    const value = settings;
    const { error } = await client.from("system_settings").upsert({
      key: "customer_notification_config",
      value,
      description: "Customer notification trigger configuration"
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};

export { adminMessageApi as a };
//# sourceMappingURL=message-DzYNKu6o.mjs.map
