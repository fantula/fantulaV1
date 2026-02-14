import { j as useRuntimeConfig } from './server.mjs';

const getBaseUrl = () => {
  const config = useRuntimeConfig();
  return config.public.schedulerUrl;
};
const adminSchedulerApi = {
  /**
   * Get scheduler status
   */
  async getStatus() {
    try {
      const res = await fetch(`${getBaseUrl()}/status`);
      return await res.json();
    } catch (e) {
      console.error("Failed to get scheduler status:", e);
      return { isRunning: false, lastRun: null, lastResult: null };
    }
  },
  /**
   * Get execution logs
   */
  async getLogs(limit = 20) {
    try {
      const res = await fetch(`${getBaseUrl()}/logs?limit=${limit}`);
      const data = await res.json();
      return {
        success: data.success,
        data: { logs: data.logs },
        error: data.error
      };
    } catch (e) {
      console.error("Failed to get scheduler logs:", e);
      return { success: false, error: e.message };
    }
  },
  /**
   * Start scheduler
   */
  async start() {
    try {
      const res = await fetch(`${getBaseUrl()}/start`, { method: "POST" });
      const data = await res.json();
      return { success: data.success, error: data.message };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },
  /**
   * Stop scheduler
   */
  async stop() {
    try {
      const res = await fetch(`${getBaseUrl()}/stop`, { method: "POST" });
      const data = await res.json();
      return { success: data.success, error: data.message };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },
  /**
   * Run specific task immediately
   */
  async runTask(taskName) {
    try {
      const res = await fetch(`${getBaseUrl()}/run/${taskName}`, { method: "POST" });
      const data = await res.json();
      return {
        success: data.success,
        data: { expired_count: data.expired_count },
        error: data.error
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },
  /**
   * Get task list
   */
  async getTasks() {
    try {
      const res = await fetch(`${getBaseUrl()}/tasks`);
      const data = await res.json();
      return {
        success: data.success,
        data: { tasks: data.tasks, groups: data.groups },
        error: data.error
      };
    } catch (e) {
      console.error("Failed to get tasks:", e);
      return { success: false, error: e.message };
    }
  }
};

export { adminSchedulerApi as a };
//# sourceMappingURL=scheduler-B1rktNOU.mjs.map
