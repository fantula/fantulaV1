import { e as defineStore } from "../server.mjs";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
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
      const { data: { session } } = await authClient.auth.getSession();
      if (session) {
        const response = await $fetch("/api/admin/auth/me", {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }).catch(() => ({ success: false, adminInfo: null }));
        const info = response.adminInfo;
        if (response.success && info) {
          adminUser.value = {
            id: session.user.id,
            email: session.user.email || "",
            role: info.role || "admin"
          };
          adminInfo.value = info;
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
      const result = await $fetch("/api/admin/auth/login", {
        method: "POST",
        body: { type: "password", email, password }
      }).catch((err) => ({ success: false, error: err.data?.statusMessage || err.message, session: null, adminInfo: null }));
      if (!result.success || !result.session) {
        return { success: false, error: result.error || "登录失败" };
      }
      const { error: setSessionError } = await authClient.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      if (setSessionError) {
        return { success: false, error: "Session设置失败" };
      }
      adminUser.value = {
        id: result.session.user.id,
        email: result.session.user.email || "",
        role: result.adminInfo.role || "admin"
      };
      adminInfo.value = result.adminInfo;
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
      await $fetch("/api/admin/auth/send-otp", {
        method: "POST",
        body: { email }
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.data?.statusMessage || error.message || "发送验证码失败" };
    }
  };
  const loginWithOtp = async (email, code) => {
    try {
      const authClient = getSupabaseClient();
      const result = await $fetch("/api/admin/auth/login", {
        method: "POST",
        body: { type: "otp", email, code }
      }).catch((err) => ({ success: false, error: err.data?.statusMessage || err.message, session: null, adminInfo: null }));
      if (!result.success || !result.session) {
        return { success: false, error: result.error || "登录失败" };
      }
      const { error: setSessionError } = await authClient.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      if (setSessionError) {
        return { success: false, error: "Session设置失败" };
      }
      adminUser.value = {
        id: result.session.user.id,
        email: result.session.user.email || "",
        role: result.adminInfo.role || "admin"
      };
      adminInfo.value = result.adminInfo;
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
    if (path === "/manager_portal") return true;
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
//# sourceMappingURL=admin-jdz9G7O3.js.map
