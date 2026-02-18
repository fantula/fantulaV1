import getSupabaseClient, { getAuthToken } from './supabase-F2pQZHm6.mjs';

const adminBackendUserApi = {
  /**
   * 获取后台用户列表
   */
  async getUsers() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("admin_users").select(`
                *,
                department:admin_departments(id, name, permissions)
            `).order("created_at", { ascending: false });
    if (error) {
      return { success: false, users: [], error: error.message };
    }
    return { success: true, users: data || [] };
  },
  /**
   * 创建后台用户
   * 1. 创建 Supabase Auth 用户（支持密码登录）
   * 2. 创建 admin_users 记录并关联 auth_user_id
   */
  async createUser(data) {
    try {
      const token = await getAuthToken();
      if (!token) return { success: false, error: "\u672A\u767B\u5F55" };
      const response = await $fetch("/api/admin/users/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      return response;
    } catch (err) {
      return { success: false, error: err.message || "\u8BF7\u6C42\u5931\u8D25" };
    }
  },
  /**
   * 更新后台用户
   */
  async updateUser(id, data) {
    const client = getSupabaseClient();
    const { error } = await client.from("admin_users").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除后台用户
   * 1. 获取 auth_user_id
   * 2. 删除 admin_users 记录
   * 3. 删除 Supabase Auth 用户
   */
  async deleteUser(id) {
    try {
      const token = await getAuthToken();
      if (!token) return { success: false, error: "\u672A\u767B\u5F55" };
      const response = await $fetch("/api/admin/users/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: { id }
      });
      return response;
    } catch (err) {
      return { success: false, error: err.message || "\u8BF7\u6C42\u5931\u8D25" };
    }
  }
};

export { adminBackendUserApi as a };
//# sourceMappingURL=backend-user-n3FOJYG8.mjs.map
