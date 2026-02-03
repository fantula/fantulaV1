import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElButton } from "./index-B9iQGHXi.js";
import { E as ElTag } from "./index-BV0Habum.js";
import { a as ElTable, E as ElTableColumn } from "./index-DxpgyeZB.js";
import { v as vLoading } from "./directive-D1M1s_ef.js";
/* empty css              */
/* empty css                   */
/* empty css                */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                    */
import { ref, defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps } from "vue/server-renderer";
import { l as loading_default, aE as video_pause_default, aF as caret_right_default, v as refresh_default } from "./index-4qszPKX4.js";
import { A as AdminActionCard } from "./AdminActionCard-BOXSA_sB.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
/* empty css                    */
import { b as useRuntimeConfig, _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { s as setInterval } from "./interval-BHZX8LlC.js";
import { E as ElMessage } from "./index-CJUZrfXE.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./icon-BcxG_YvU.js";
import "./index-CO6H4Lsj.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-DGjXPDlO.js";
import "./index-DqrhOzxH.js";
import "./index-D6r9Uwf3.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DrAKMEUO.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-DL7T-Mp9.js";
/* empty css                    */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./typescript-D6L75muK.js";
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
const useAdminScheduler = () => {
  const status = ref({
    isRunning: false,
    lastRun: null,
    lastResult: null
  });
  const logs = ref([]);
  const taskList = ref([]);
  const taskGroups = ref({});
  const actionLoading = ref(false);
  const logsLoading = ref(false);
  const runningTask = ref("");
  let interval = null;
  const fetchStatus = async () => {
    const data = await adminSchedulerApi.getStatus();
    status.value = data;
  };
  const fetchTasks = async () => {
    try {
      const res = await adminSchedulerApi.getTasks();
      if (res.success && res.data) {
        taskList.value = res.data.tasks;
        taskGroups.value = res.data.groups;
      }
    } catch (e) {
      console.error("Failed to get tasks:", e);
    }
  };
  const fetchLogs = async () => {
    logsLoading.value = true;
    try {
      const res = await adminSchedulerApi.getLogs();
      if (res.success && res.data) {
        logs.value = res.data.logs;
      }
    } finally {
      logsLoading.value = false;
    }
  };
  const toggleScheduler = async (start) => {
    actionLoading.value = true;
    try {
      const res = start ? await adminSchedulerApi.start() : await adminSchedulerApi.stop();
      if (res.success) {
        ElMessage.success(start ? "服务已启动" : "服务已停止");
        await fetchStatus();
      } else {
        ElMessage.warning(res.error || "操作失败");
      }
    } catch (e) {
      ElMessage.error("操作异常: " + e.message);
    } finally {
      actionLoading.value = false;
    }
  };
  const runTask = async (taskName) => {
    runningTask.value = taskName;
    try {
      const res = await adminSchedulerApi.runTask(taskName);
      if (res.success && res.data) {
        ElMessage.success(`执行完成，处理 ${res.data.expired_count || 0} 条数据`);
        await fetchLogs();
      } else {
        ElMessage.error(res.error || "执行失败");
      }
    } catch (e) {
      ElMessage.error("执行异常: " + e.message);
    } finally {
      runningTask.value = "";
    }
  };
  const startAutoRefresh = (intervalMs = 3e4) => {
    fetchStatus();
    fetchTasks();
    fetchLogs();
    if (interval) clearInterval(interval);
    interval = setInterval();
  };
  const formatTime = (time) => {
    if (!time) return "-";
    return new Date(time).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  return {
    status,
    logs,
    taskList,
    taskGroups,
    actionLoading,
    logsLoading,
    runningTask,
    fetchStatus,
    fetchTasks,
    fetchLogs,
    toggleScheduler,
    runTask,
    startAutoRefresh,
    formatTime
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scheduler",
  __ssrInlineRender: true,
  setup(__props) {
    const taskDisplayNames = {
      cleanup_expired_preorders: "清理过期预订单",
      cleanup_unverified_users: "清理未验证用户",
      cleanup_expired_wechat_sessions: "清理过期微信会话"
    };
    const getTaskDisplayName = (key) => taskDisplayNames[key] || key;
    const {
      status,
      logs,
      taskList,
      taskGroups,
      actionLoading,
      logsLoading,
      runningTask,
      fetchLogs,
      toggleScheduler,
      runTask,
      formatTime
    } = useAdminScheduler();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "scheduler-page" }, _attrs))} data-v-2b024aa9><div class="status-grid" data-v-2b024aa9><div class="${ssrRenderClass([{ active: unref(status).isRunning }, "status-card"])}" data-v-2b024aa9><div class="icon-wrapper" data-v-2b024aa9>`);
      if (unref(status).isRunning) {
        _push(ssrRenderComponent(_component_el_icon, { class: "rotating" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(loading_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(video_pause_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(video_pause_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div><div class="info" data-v-2b024aa9><div class="label" data-v-2b024aa9>服务状态</div><div class="value" data-v-2b024aa9>${ssrInterpolate(unref(status).isRunning ? "运行中" : "已停止")}</div></div><div class="actions" data-v-2b024aa9>`);
      if (!unref(status).isRunning) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "success",
          size: "small",
          onClick: ($event) => unref(toggleScheduler)(true),
          loading: unref(actionLoading)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`启动服务`);
            } else {
              return [
                createTextVNode("启动服务")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_el_button, {
          type: "danger",
          size: "small",
          onClick: ($event) => unref(toggleScheduler)(false),
          loading: unref(actionLoading)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`停止服务`);
            } else {
              return [
                createTextVNode("停止服务")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div><div class="status-card info" data-v-2b024aa9><div class="info-item" data-v-2b024aa9><div class="label" data-v-2b024aa9>上次执行</div><div class="value" data-v-2b024aa9>${ssrInterpolate(unref(formatTime)(unref(status).lastRun))}</div></div><div class="info-divider" data-v-2b024aa9></div><div class="info-item" data-v-2b024aa9><div class="label" data-v-2b024aa9>任务组数</div><div class="value" data-v-2b024aa9>${ssrInterpolate(Object.keys(unref(taskGroups)).length)} 组</div></div></div></div>`);
      _push(ssrRenderComponent(AdminActionCard, {
        title: "定时任务列表",
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tasks-list" data-v-2b024aa9${_scopeId}><!--[-->`);
            ssrRenderList(unref(taskList), (task) => {
              _push2(`<div class="task-item" data-v-2b024aa9${_scopeId}><div class="task-meta" data-v-2b024aa9${_scopeId}><span class="task-name" data-v-2b024aa9${_scopeId}>${ssrInterpolate(task.name)}</span><span class="task-desc" data-v-2b024aa9${_scopeId}>${ssrInterpolate(task.description)}</span>`);
              _push2(ssrRenderComponent(_component_el_tag, {
                size: "small",
                type: task.group === "frequent" ? "warning" : "info",
                class: "mt-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(task.group === "frequent" ? "每5分钟" : "每日 03:00")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(task.group === "frequent" ? "每5分钟" : "每日 03:00"), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                plain: "",
                icon: unref(caret_right_default),
                onClick: ($event) => unref(runTask)(task.key),
                loading: unref(runningTask) === task.key
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`执行`);
                  } else {
                    return [
                      createTextVNode("执行")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "tasks-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(taskList), (task) => {
                  return openBlock(), createBlock("div", {
                    key: task.key,
                    class: "task-item"
                  }, [
                    createVNode("div", { class: "task-meta" }, [
                      createVNode("span", { class: "task-name" }, toDisplayString(task.name), 1),
                      createVNode("span", { class: "task-desc" }, toDisplayString(task.description), 1),
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: task.group === "frequent" ? "warning" : "info",
                        class: "mt-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(task.group === "frequent" ? "每5分钟" : "每日 03:00"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    createVNode(_component_el_button, {
                      type: "primary",
                      plain: "",
                      icon: unref(caret_right_default),
                      onClick: ($event) => unref(runTask)(task.key),
                      loading: unref(runningTask) === task.key
                    }, {
                      default: withCtx(() => [
                        createTextVNode("执行")
                      ]),
                      _: 1
                    }, 8, ["icon", "onClick", "loading"])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminActionCard, {
        title: "执行日志",
        class: "mt-4"
      }, {
        "header-actions": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              circle: "",
              onClick: unref(fetchLogs),
              loading: unref(logsLoading)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                circle: "",
                onClick: unref(fetchLogs),
                loading: unref(logsLoading)
              }, null, 8, ["icon", "onClick", "loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: unref(logs),
              style: { "width": "100%" },
              stripe: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(logsLoading))), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "执行时间",
                    width: "180"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(formatTime)(row.executed_at))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(formatTime)(row.executed_at)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "task_name",
                    label: "任务名称"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getTaskDisplayName(row.task_name))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getTaskDisplayName(row.task_name)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "90"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: row.status === "success" ? "success" : "danger",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.status === "success" ? "成功" : "失败")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status === "success" ? "成功" : "失败"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: row.status === "success" ? "success" : "danger",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.status === "success" ? "成功" : "失败"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "affected_count",
                    label: "处理数",
                    width: "100",
                    align: "right"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "error",
                    label: "错误信息",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "执行时间",
                      width: "180"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(unref(formatTime)(row.executed_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "task_name",
                      label: "任务名称"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(getTaskDisplayName(row.task_name)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "90"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status === "success" ? "success" : "danger",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status === "success" ? "成功" : "失败"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "affected_count",
                      label: "处理数",
                      width: "100",
                      align: "right"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "error",
                      label: "错误信息",
                      "show-overflow-tooltip": ""
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: unref(logs),
                style: { "width": "100%" },
                stripe: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "执行时间",
                    width: "180"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(unref(formatTime)(row.executed_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "task_name",
                    label: "任务名称"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(getTaskDisplayName(row.task_name)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "90"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.status === "success" ? "success" : "danger",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.status === "success" ? "成功" : "失败"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "affected_count",
                    label: "处理数",
                    width: "100",
                    align: "right"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "error",
                    label: "错误信息",
                    "show-overflow-tooltip": ""
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, unref(logsLoading)]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/scheduler.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scheduler = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b024aa9"]]);
export {
  scheduler as default
};
//# sourceMappingURL=scheduler-z84MOH7A.js.map
