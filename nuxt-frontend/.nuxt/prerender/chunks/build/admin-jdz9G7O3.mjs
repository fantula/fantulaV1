import { e as defineStore } from './server.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
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
      }).catch((err) => {
        var _a;
        return { success: false, error: ((_a = err.data) == null ? void 0 : _a.statusMessage) || err.message, session: null, adminInfo: null };
      });
      if (!result.success || !result.session) {
        return { success: false, error: result.error || "\u767B\u5F55\u5931\u8D25" };
      }
      const { error: setSessionError } = await authClient.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      if (setSessionError) {
        return { success: false, error: "Session\u8BBE\u7F6E\u5931\u8D25" };
      }
      adminUser.value = {
        id: result.session.user.id,
        email: result.session.user.email || "",
        role: result.adminInfo.role || "admin"
      };
      adminInfo.value = result.adminInfo;
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
    var _a;
    try {
      await $fetch("/api/admin/auth/send-otp", {
        method: "POST",
        body: { email }
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: ((_a = error.data) == null ? void 0 : _a.statusMessage) || error.message || "\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25" };
    }
  };
  const loginWithOtp = async (email, code) => {
    try {
      const authClient = getSupabaseClient();
      const result = await $fetch("/api/admin/auth/login", {
        method: "POST",
        body: { type: "otp", email, code }
      }).catch((err) => {
        var _a;
        return { success: false, error: ((_a = err.data) == null ? void 0 : _a.statusMessage) || err.message, session: null, adminInfo: null };
      });
      if (!result.success || !result.session) {
        return { success: false, error: result.error || "\u767B\u5F55\u5931\u8D25" };
      }
      const { error: setSessionError } = await authClient.auth.setSession({
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token
      });
      if (setSessionError) {
        return { success: false, error: "Session\u8BBE\u7F6E\u5931\u8D25" };
      }
      adminUser.value = {
        id: result.session.user.id,
        email: result.session.user.email || "",
        role: result.adminInfo.role || "admin"
      };
      adminInfo.value = result.adminInfo;
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

export { useAdminStore as u };
//# sourceMappingURL=admin-jdz9G7O3.mjs.map
