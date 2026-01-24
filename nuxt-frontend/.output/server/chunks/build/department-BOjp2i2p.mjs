import { by as getAdminSupabaseClient } from './server.mjs';

const adminDepartmentApi = {
  /**
   * 获取部门列表（含用户数统计）
   */
  async getDepartments() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("admin_departments").select("*").order("created_at", { ascending: true });
    if (error) {
      return { success: false, departments: [], error: error.message };
    }
    const departmentsWithCount = await Promise.all(
      (data || []).map(async (dept) => {
        const { count } = await client.from("admin_users").select("*", { count: "exact", head: true }).eq("department_id", dept.id);
        return { ...dept, user_count: count || 0 };
      })
    );
    return { success: true, departments: departmentsWithCount };
  },
  /**
   * 创建部门
   */
  async createDepartment(data) {
    var _a;
    const client = getAdminSupabaseClient();
    const { data: department, error } = await client.from("admin_departments").insert({
      name: data.name,
      permissions: (_a = data.permissions) != null ? _a : []
    }).select().single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, department };
  },
  /**
   * 更新部门
   */
  async updateDepartment(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("admin_departments").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除部门（有用户时禁止删除）
   */
  async deleteDepartment(id) {
    const client = getAdminSupabaseClient();
    const { count } = await client.from("admin_users").select("*", { count: "exact", head: true }).eq("department_id", id);
    if (count && count > 0) {
      return { success: false, error: `\u8BE5\u90E8\u95E8\u4E0B\u6709 ${count} \u4E2A\u7528\u6237\uFF0C\u8BF7\u5148\u79FB\u9664\u6216\u91CD\u65B0\u5206\u914D` };
    }
    const { error } = await client.from("admin_departments").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};

export { adminDepartmentApi as a };
//# sourceMappingURL=department-BOjp2i2p.mjs.map
