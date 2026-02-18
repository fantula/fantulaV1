import getSupabaseClient from './supabase-F2pQZHm6.mjs';

const adminUserApi = {
  async getUsers(params) {
    const client = getSupabaseClient();
    let query = client.from("profiles").select("*", { count: "exact" });
    if (params == null ? void 0 : params.status) {
      query = query.eq("status", params.status);
    }
    query = query.order("created_at", { ascending: false });
    if (params == null ? void 0 : params.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) {
      return { success: false, users: [], total: 0, error: error.message };
    }
    return { success: true, users: data || [], total: count || 0 };
  },
  async getUserByUid(uid) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("profiles").select("*").eq("uid", uid).single();
    if (error) {
      return { success: false, error: `\u7528\u6237\u4E0D\u5B58\u5728 (${error.code}: ${error.message})` };
    }
    return { success: true, user: data };
  },
  async toggleStatus(id, status) {
    const client = getSupabaseClient();
    const { error } = await client.from("profiles").update({ status }).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};

export { adminUserApi as a };
//# sourceMappingURL=user-CGUVoAET.mjs.map
