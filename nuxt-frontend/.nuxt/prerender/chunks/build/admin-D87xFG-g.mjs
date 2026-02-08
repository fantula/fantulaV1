import { j as defineStore } from './server.mjs';
import { g as getAdminSupabaseClient } from './supabase-admin-Yv96kmWU.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { ref, computed, readonly } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';

const useAdminStore = defineStore("admin", () => {
  const adminUser = ref(null);
  const adminInfo = ref(null);
  const loading = ref(true);
  const isInitialized = ref(false);
  const isLoggedIn = computed(() => !!adminUser.value);
  const permissions = computed(() => {
    var _a, _b;
    return ((_b = (_a = adminInfo.value) == null ? void 0 : _a.department) == null ? void 0 : _b.permissions) || [];
  });
  const init = async () => {
    if (isInitialized.value) return;
    loading.value = true;
    try {
      const authClient = getSupabaseClient();
      const adminClient = getAdminSupabaseClient();
      const { data: { session } } = await authClient.auth.getSession();
      if (session) {
        const { data: adminData } = await adminClient.from("admin_users").select(`
                        *,
                        department:admin_departments(id, name, permissions)
                    `).eq("auth_user_id", session.user.id).single();
        if (adminData) {
          adminUser.value = {
            id: session.user.id,
            email: session.user.email || "",
            role: adminData.role || "admin"
          };
          adminInfo.value = adminData;
        } else {
          await logout();
        }
      } else {
        adminUser.value = null;
        adminInfo.value = null;
      }
    } catch (error) {
      console.error("Admin init error:", error);
      adminUser.value = null;
      adminInfo.value = null;
    } finally {
      loading.value = false;
      isInitialized.value = true;
    }
  };
  const login = async (email, password) => {
    try {
      const authClient = getSupabaseClient();
      const adminClient = getAdminSupabaseClient();
      const { data, error } = await authClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (!data.session) {
        return { success: false, error: "\u767B\u5F55\u5931\u8D25\uFF0C\u65E0\u6CD5\u83B7\u53D6 Session" };
      }
      const { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `).eq("auth_user_id", data.session.user.id).single();
      if (adminError || !adminData) {
        await authClient.auth.signOut();
        return { success: false, error: "\u8BE5\u8D26\u53F7\u4E0D\u662F\u7BA1\u7406\u5458" };
      }
      adminUser.value = {
        id: data.session.user.id,
        email: data.session.user.email || "",
        role: adminData.role || "admin"
      };
      adminInfo.value = adminData;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "\u767B\u5F55\u5931\u8D25" };
    }
  };
  const logout = async () => {
    try {
      const authClient = getSupabaseClient();
      await authClient.auth.signOut();
    } catch (error) {
      console.error("Admin logout error:", error);
    } finally {
      adminUser.value = null;
      adminInfo.value = null;
    }
  };
  const sendOtp = async (email) => {
    try {
      const authClient = getSupabaseClient();
      const adminClient = getAdminSupabaseClient();
      const { data: adminData } = await adminClient.from("admin_users").select("id, status, auth_user_id").eq("email", email).single();
      if (!adminData) {
        return { success: false, error: "\u8BE5\u90AE\u7BB1\u672A\u6CE8\u518C\u4E3A\u7BA1\u7406\u5458" };
      }
      if (adminData.status !== "enabled") {
        return { success: false, error: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u7528" };
      }
      const shouldCreateUser = !adminData.auth_user_id;
      const { error } = await authClient.auth.signInWithOtp({
        email,
        options: {
          // 只有管理员表中没有 auth_user_id 时才允许创建用户
          shouldCreateUser
        }
      });
      if (error) {
        if (error.message.includes("Signups not allowed")) {
          return { success: false, error: "\u8D26\u53F7\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u8054\u7CFB\u8D85\u7EA7\u7BA1\u7406\u5458" };
        }
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25" };
    }
  };
  const loginWithOtp = async (email, code) => {
    try {
      const authClient = getSupabaseClient();
      const adminClient = getAdminSupabaseClient();
      const { data, error } = await authClient.auth.verifyOtp({
        email,
        token: code,
        type: "email"
      });
      if (error) {
        if (error.message.includes("Token has expired") || error.message.includes("invalid")) {
          return { success: false, error: "\u9A8C\u8BC1\u7801\u5DF2\u8FC7\u671F\u6216\u65E0\u6548" };
        }
        return { success: false, error: error.message };
      }
      if (!data.session) {
        return { success: false, error: "\u767B\u5F55\u5931\u8D25\uFF0C\u65E0\u6CD5\u83B7\u53D6 Session" };
      }
      const authUserId = data.session.user.id;
      let { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `).eq("auth_user_id", authUserId).single();
      if (adminError || !adminData) {
        const { data: adminByEmail, error: emailError } = await adminClient.from("admin_users").select(`
                        *,
                        department:admin_departments(id, name, permissions)
                    `).eq("email", email).single();
        if (emailError || !adminByEmail) {
          await authClient.auth.signOut();
          return { success: false, error: "\u8BE5\u8D26\u53F7\u4E0D\u662F\u7BA1\u7406\u5458" };
        }
        const { error: updateError } = await adminClient.from("admin_users").update({ auth_user_id: authUserId }).eq("id", adminByEmail.id);
        if (updateError) {
          console.error("\u66F4\u65B0 auth_user_id \u5931\u8D25:", updateError);
        }
        adminData = adminByEmail;
      }
      if (adminData.status !== "enabled") {
        await authClient.auth.signOut();
        return { success: false, error: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u7528" };
      }
      adminUser.value = {
        id: authUserId,
        email: data.session.user.email || "",
        role: adminData.role || "admin"
      };
      adminInfo.value = adminData;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "\u767B\u5F55\u5931\u8D25" };
    }
  };
  const hasPermission = (path) => {
    var _a, _b, _c, _d;
    if (!adminUser.value) return false;
    const deptName = ((_b = (_a = adminInfo.value) == null ? void 0 : _a.department) == null ? void 0 : _b.name) || "";
    const perms = ((_d = (_c = adminInfo.value) == null ? void 0 : _c.department) == null ? void 0 : _d.permissions) || [];
    if (deptName.includes("\u8D85\u7EA7") || perms.includes("*")) return true;
    if (path === "/admin") return true;
    if (permissions.value.length === 0) return true;
    if (permissions.value.includes(path)) return true;
    for (const perm of permissions.value) {
      if (path.startsWith(perm + "/")) return true;
    }
    return false;
  };
  return {
    // 状态
    user: readonly(adminUser),
    // 兼容旧代码
    adminUser: readonly(adminUser),
    adminInfo: readonly(adminInfo),
    isLoggedIn,
    isInitialized: readonly(isInitialized),
    loading: readonly(loading),
    permissions,
    // 方法
    init,
    login,
    logout,
    sendOtp,
    loginWithOtp,
    hasPermission
  };
});

export { useAdminStore as u };
//# sourceMappingURL=admin-D87xFG-g.mjs.map
