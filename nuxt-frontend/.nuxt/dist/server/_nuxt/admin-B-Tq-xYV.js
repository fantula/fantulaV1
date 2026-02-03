import { h as defineStore } from "../server.mjs";
import { g as getAdminSupabaseClient } from "./supabase-admin-Yv96kmWU.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import { ref, computed, readonly } from "vue";
const useAdminStore = defineStore("admin", () => {
  const adminUser = ref(null);
  const adminInfo = ref(null);
  const loading = ref(true);
  const isInitialized = ref(false);
  const isLoggedIn = computed(() => !!adminUser.value);
  const permissions = computed(() => adminInfo.value?.department?.permissions || []);
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
        return { success: false, error: "登录失败，无法获取 Session" };
      }
      const { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `).eq("auth_user_id", data.session.user.id).single();
      if (adminError || !adminData) {
        await authClient.auth.signOut();
        return { success: false, error: "该账号不是管理员" };
      }
      adminUser.value = {
        id: data.session.user.id,
        email: data.session.user.email || "",
        role: adminData.role || "admin"
      };
      adminInfo.value = adminData;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "登录失败" };
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
      const { data: adminData } = await adminClient.from("admin_users").select("id, status").eq("email", email).single();
      if (!adminData) {
        return { success: false, error: "该邮箱未注册为管理员" };
      }
      if (adminData.status !== "enabled") {
        return { success: false, error: "该账号已被禁用" };
      }
      const { error } = await authClient.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
          // 不自动创建用户
        }
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "发送验证码失败" };
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
          return { success: false, error: "验证码已过期或无效" };
        }
        return { success: false, error: error.message };
      }
      if (!data.session) {
        return { success: false, error: "登录失败，无法获取 Session" };
      }
      const { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `).eq("auth_user_id", data.session.user.id).single();
      if (adminError || !adminData) {
        await authClient.auth.signOut();
        return { success: false, error: "该账号不是管理员" };
      }
      if (adminData.status !== "enabled") {
        await authClient.auth.signOut();
        return { success: false, error: "该账号已被禁用" };
      }
      adminUser.value = {
        id: data.session.user.id,
        email: data.session.user.email || "",
        role: adminData.role || "admin"
      };
      adminInfo.value = adminData;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "登录失败" };
    }
  };
  const hasPermission = (path) => {
    if (!adminUser.value) return false;
    const deptName = adminInfo.value?.department?.name || "";
    const perms = adminInfo.value?.department?.permissions || [];
    if (deptName.includes("超级") || perms.includes("*")) return true;
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
export {
  useAdminStore as u
};
//# sourceMappingURL=admin-B-Tq-xYV.js.map
