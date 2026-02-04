import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { E as ElButton } from './index-DZvUdcyn.mjs';
import { E as ElTag } from './index-BZB4XnD2.mjs';
import { a as ElTable, E as ElTableColumn } from './index-BDPO3Is8.mjs';
import { E as ElPagination } from './index-dRoeuTok.mjs';
import { v as vLoading } from './directive-D1M1s_ef.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps } from 'vue/server-renderer';
import { l as loading_default, aE as video_pause_default, aj as timer_default, aF as sunny_default, aw as calendar_default, aG as caret_right_default, K as document_default, r as refresh_default } from './index-CmsdIFY8.mjs';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './icon-eqoLCvNY.mjs';
import './index-CO6H4Lsj.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-DGjXPDlO.mjs';
import './index-DqrhOzxH.mjs';
import './index-D6r9Uwf3.mjs';
import '@popperjs/core';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-DpI-EKEn.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './index-uIKF9nns.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-Df9VGR5S.mjs';
import './index-CcE-rjwX.mjs';
import './typescript-D6L75muK.mjs';
import './index-D2CY7Ok3.mjs';
import './index-BDc7M6dy.mjs';
import './vnode-C7bAOlXh.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

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
      const res = await adminSchedulerApi.getLogs(50);
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
        ElMessage.success(start ? "\u670D\u52A1\u5DF2\u542F\u52A8" : "\u670D\u52A1\u5DF2\u505C\u6B62");
        await fetchStatus();
      } else {
        ElMessage.warning(res.error || "\u64CD\u4F5C\u5931\u8D25");
      }
    } catch (e) {
      ElMessage.error("\u64CD\u4F5C\u5F02\u5E38: " + e.message);
    } finally {
      actionLoading.value = false;
    }
  };
  const runTask = async (taskName) => {
    runningTask.value = taskName;
    try {
      const res = await adminSchedulerApi.runTask(taskName);
      if (res.success && res.data) {
        ElMessage.success(`\u6267\u884C\u5B8C\u6210\uFF0C\u5904\u7406 ${res.data.expired_count || 0} \u6761\u6570\u636E`);
        await fetchLogs();
      } else {
        ElMessage.error(res.error || "\u6267\u884C\u5931\u8D25");
      }
    } catch (e) {
      ElMessage.error("\u6267\u884C\u5F02\u5E38: " + e.message);
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
const pageSize = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scheduler",
  __ssrInlineRender: true,
  setup(__props) {
    const taskDisplayNames = {
      cleanup_expired_preorders: "\u6E05\u7406\u8FC7\u671F\u9884\u8BA2\u5355",
      expire_active_orders: "\u8FC7\u671F\u8BA2\u5355\u5904\u7406",
      cleanup_unverified_users: "\u6E05\u7406\u672A\u9A8C\u8BC1\u7528\u6237",
      cleanup_expired_wechat_sessions: "\u6E05\u7406\u8FC7\u671F\u5FAE\u4FE1\u4F1A\u8BDD",
      cleanup_expired_order_fulfillments: "\u6E05\u7406\u8FC7\u671F\u8BA2\u5355\u56DE\u6267",
      cleanup_old_expired_preorders: "\u6E05\u7406\u8001\u65E7\u9884\u8BA2\u5355"
    };
    const getTaskDisplayName = (key) => taskDisplayNames[key] || key;
    const currentPage = ref(1);
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
    const paginatedLogs = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      return logs.value.slice(start, start + pageSize);
    });
    const getTasksByGroup = (groupKey) => {
      return taskList.value.filter((t) => t.group === groupKey);
    };
    const getTaskGroup = (taskName) => {
      const task = taskList.value.find((t) => t.key === taskName);
      return (task == null ? void 0 : task.group) || "";
    };
    const getGroupTagType = (groupKey) => {
      const types = {
        frequent: "warning",
        daily: "info",
        weekly: "primary"
      };
      return types[groupKey] || "info";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "scheduler-page" }, _attrs))} data-v-49f3f7f8><div class="status-grid" data-v-49f3f7f8><div class="${ssrRenderClass([{ active: unref(status).isRunning }, "status-card"])}" data-v-49f3f7f8><div class="icon-wrapper" data-v-49f3f7f8>`);
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
      _push(`</div><div class="info" data-v-49f3f7f8><div class="label" data-v-49f3f7f8>\u670D\u52A1\u72B6\u6001</div><div class="value" data-v-49f3f7f8>${ssrInterpolate(unref(status).isRunning ? "\u8FD0\u884C\u4E2D" : "\u5DF2\u505C\u6B62")}</div></div><div class="actions" data-v-49f3f7f8>`);
      if (!unref(status).isRunning) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "success",
          size: "small",
          onClick: ($event) => unref(toggleScheduler)(true),
          loading: unref(actionLoading)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u542F\u52A8\u670D\u52A1`);
            } else {
              return [
                createTextVNode("\u542F\u52A8\u670D\u52A1")
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
              _push2(`\u505C\u6B62\u670D\u52A1`);
            } else {
              return [
                createTextVNode("\u505C\u6B62\u670D\u52A1")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div><div class="status-card stats" data-v-49f3f7f8><div class="stat-item" data-v-49f3f7f8><div class="stat-value" data-v-49f3f7f8>${ssrInterpolate(Object.keys(unref(taskGroups)).length)}</div><div class="stat-label" data-v-49f3f7f8>\u4EFB\u52A1\u7EC4</div></div><div class="stat-divider" data-v-49f3f7f8></div><div class="stat-item" data-v-49f3f7f8><div class="stat-value" data-v-49f3f7f8>${ssrInterpolate(unref(taskList).length)}</div><div class="stat-label" data-v-49f3f7f8>\u4EFB\u52A1\u6570</div></div><div class="stat-divider" data-v-49f3f7f8></div><div class="stat-item" data-v-49f3f7f8><div class="stat-value" data-v-49f3f7f8>${ssrInterpolate(unref(formatTime)(unref(status).lastRun))}</div><div class="stat-label" data-v-49f3f7f8>\u4E0A\u6B21\u6267\u884C</div></div></div></div><div class="task-groups" data-v-49f3f7f8><!--[-->`);
      ssrRenderList(unref(taskGroups), (group, groupKey) => {
        _push(`<div class="${ssrRenderClass([`group-${groupKey}`, "group-card"])}" data-v-49f3f7f8><div class="group-header" data-v-49f3f7f8><div class="group-title" data-v-49f3f7f8>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "group-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (groupKey === "frequent") {
                _push2(ssrRenderComponent(unref(timer_default), null, null, _parent2, _scopeId));
              } else if (groupKey === "daily") {
                _push2(ssrRenderComponent(unref(sunny_default), null, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(calendar_default), null, null, _parent2, _scopeId));
              }
            } else {
              return [
                groupKey === "frequent" ? (openBlock(), createBlock(unref(timer_default), { key: 0 })) : groupKey === "daily" ? (openBlock(), createBlock(unref(sunny_default), { key: 1 })) : (openBlock(), createBlock(unref(calendar_default), { key: 2 }))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span data-v-49f3f7f8>${ssrInterpolate(group.description)}</span></div>`);
        _push(ssrRenderComponent(_component_el_tag, {
          type: getGroupTagType(groupKey),
          size: "small",
          effect: "plain"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(group.cron)}`);
            } else {
              return [
                createTextVNode(toDisplayString(group.cron), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="task-list" data-v-49f3f7f8><!--[-->`);
        ssrRenderList(getTasksByGroup(groupKey), (task) => {
          _push(`<div class="task-item" data-v-49f3f7f8><div class="task-info" data-v-49f3f7f8><div class="task-name" data-v-49f3f7f8>${ssrInterpolate(task.name)}</div><div class="task-desc" data-v-49f3f7f8>${ssrInterpolate(task.description)}</div></div>`);
          _push(ssrRenderComponent(_component_el_button, {
            type: "primary",
            plain: "",
            size: "small",
            icon: unref(caret_right_default),
            onClick: ($event) => unref(runTask)(task.key),
            loading: unref(runningTask) === task.key
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u6267\u884C`);
              } else {
                return [
                  createTextVNode("\u6267\u884C")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="logs-section" data-v-49f3f7f8><div class="section-header" data-v-49f3f7f8><h3 data-v-49f3f7f8>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(document_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(document_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u6267\u884C\u65E5\u5FD7 </h3>`);
      _push(ssrRenderComponent(_component_el_button, {
        icon: unref(refresh_default),
        circle: "",
        onClick: unref(fetchLogs),
        loading: unref(logsLoading)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        data: paginatedLogs.value,
        style: { "width": "100%" },
        stripe: ""
      }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(logsLoading))), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6267\u884C\u65F6\u95F4",
              width: "160"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatTime)(row.executed_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatTime)(row.executed_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "task_name",
              label: "\u4EFB\u52A1",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="task-cell" data-v-49f3f7f8${_scopeId2}><span class="task-key" data-v-49f3f7f8${_scopeId2}>${ssrInterpolate(getTaskDisplayName(row.task_name))}</span>`);
                  if (getTaskGroup(row.task_name)) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: getGroupTagType(getTaskGroup(row.task_name)),
                      size: "small",
                      effect: "light"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(getTaskGroup(row.task_name))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(getTaskGroup(row.task_name)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "task-cell" }, [
                      createVNode("span", { class: "task-key" }, toDisplayString(getTaskDisplayName(row.task_name)), 1),
                      getTaskGroup(row.task_name) ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: getGroupTagType(getTaskGroup(row.task_name)),
                        size: "small",
                        effect: "light"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getTaskGroup(row.task_name)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: row.status === "success" ? "success" : "danger",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: row.status === "success" ? "success" : "danger",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25"), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "affected_count",
              label: "\u5904\u7406\u6570",
              width: "100",
              align: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="affected-count" data-v-49f3f7f8${_scopeId2}>${ssrInterpolate(row.affected_count || 0)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "affected-count" }, toDisplayString(row.affected_count || 0), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "error",
              label: "\u9519\u8BEF\u4FE1\u606F",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "\u6267\u884C\u65F6\u95F4",
                width: "160"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.executed_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "task_name",
                label: "\u4EFB\u52A1",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "task-cell" }, [
                    createVNode("span", { class: "task-key" }, toDisplayString(getTaskDisplayName(row.task_name)), 1),
                    getTaskGroup(row.task_name) ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: getGroupTagType(getTaskGroup(row.task_name)),
                      size: "small",
                      effect: "light"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getTaskGroup(row.task_name)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: row.status === "success" ? "success" : "danger",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25"), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "affected_count",
                label: "\u5904\u7406\u6570",
                width: "100",
                align: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "affected-count" }, toDisplayString(row.affected_count || 0), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "error",
                label: "\u9519\u8BEF\u4FE1\u606F",
                "show-overflow-tooltip": ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(logs).length > pageSize) {
        _push(`<div class="logs-pagination" data-v-49f3f7f8>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          "current-page": currentPage.value,
          "onUpdate:currentPage": ($event) => currentPage.value = $event,
          "page-size": pageSize,
          total: unref(logs).length,
          layout: "prev, pager, next",
          background: "",
          small: ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/scheduler.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scheduler = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-49f3f7f8"]]);

export { scheduler as default };
//# sourceMappingURL=scheduler-CE09Nxf4.mjs.map
