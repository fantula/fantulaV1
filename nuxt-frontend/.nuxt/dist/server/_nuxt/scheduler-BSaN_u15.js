import { E as ElIcon } from "./index-D6MDXFfa.js";
import { E as ElButton } from "./index-CGHU_uKU.js";
import { E as ElTag } from "./index-RGUM47gz.js";
import { E as ElTableColumn } from "./index-DnlpAwTZ.js";
/* empty css              */
/* empty css                   */
/* empty css                */
/* empty css                  */
/* empty css                     */
import { ref, defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { l as loading_default, aI as video_pause_default, am as timer_default, aJ as sunny_default, az as calendar_default, aK as caret_right_default, N as document_default, A as refresh_default } from "./index-CRs4T-Jf.js";
import { A as AdminDataTable } from "./AdminDataTable-adUoqR6P.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
/* empty css                    */
import { a as adminSchedulerApi } from "./scheduler-B1rktNOU.js";
import { s as setInterval } from "./interval-BnEBQU8I.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./icon-DxnRhcjj.js";
import "./index-C8K_s-bH.js";
import "./use-global-config-C00m4e8W.js";
import "./use-form-item-n_L16njV.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-D4s2dalC.js";
import "./index-B6zOcltc.js";
import "./index-m3FMdVd3.js";
import "@popperjs/core";
import "./focus-trap.vue-DLhiv9tF.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-RDuG-1hQ.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-DT739kqT.js";
import "./index-CdIsMbUc.js";
import "./index-CIsKhoUN.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BYDsUCKj.js";
import "./index-ttyu327u.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./directive-Cp0y9Az7.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
      expire_active_orders: "过期订单处理",
      cleanup_unverified_users: "清理未验证用户",
      cleanup_expired_wechat_sessions: "清理过期微信会话",
      cleanup_expired_order_fulfillments: "清理过期订单回执",
      cleanup_old_expired_preorders: "清理老旧预订单"
    };
    const getTaskDisplayName = (key) => taskDisplayNames[key] || key;
    const currentPage = ref(1);
    const pageSize = ref(15);
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
      const start = (currentPage.value - 1) * pageSize.value;
      return logs.value.slice(start, start + pageSize.value);
    });
    const getTasksByGroup = (groupKey) => {
      return taskList.value.filter((t) => t.group === groupKey);
    };
    const getTaskGroup = (taskName) => {
      const task = taskList.value.find((t) => t.key === taskName);
      return task?.group || "";
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
      const _component_el_table_column = ElTableColumn;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "scheduler-page" }, _attrs))} data-v-a832358a><div class="status-grid" data-v-a832358a><div class="${ssrRenderClass([{ active: unref(status).isRunning }, "status-card"])}" data-v-a832358a><div class="icon-wrapper" data-v-a832358a>`);
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
      _push(`</div><div class="info" data-v-a832358a><div class="label" data-v-a832358a>服务状态</div><div class="value" data-v-a832358a>${ssrInterpolate(unref(status).isRunning ? "运行中" : "已停止")}</div></div><div class="actions" data-v-a832358a>`);
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
      _push(`</div></div><div class="status-card stats" data-v-a832358a><div class="stat-item" data-v-a832358a><div class="stat-value" data-v-a832358a>${ssrInterpolate(Object.keys(unref(taskGroups)).length)}</div><div class="stat-label" data-v-a832358a>任务组</div></div><div class="stat-divider" data-v-a832358a></div><div class="stat-item" data-v-a832358a><div class="stat-value" data-v-a832358a>${ssrInterpolate(unref(taskList).length)}</div><div class="stat-label" data-v-a832358a>任务数</div></div><div class="stat-divider" data-v-a832358a></div><div class="stat-item" data-v-a832358a><div class="stat-value" data-v-a832358a>${ssrInterpolate(unref(formatTime)(unref(status).lastRun))}</div><div class="stat-label" data-v-a832358a>上次执行</div></div></div></div><div class="task-groups" data-v-a832358a><!--[-->`);
      ssrRenderList(unref(taskGroups), (group, groupKey) => {
        _push(`<div class="${ssrRenderClass([`group-${groupKey}`, "group-card"])}" data-v-a832358a><div class="group-header" data-v-a832358a><div class="group-title" data-v-a832358a>`);
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
        _push(`<span data-v-a832358a>${ssrInterpolate(group.description)}</span></div>`);
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
        _push(`</div><div class="task-list" data-v-a832358a><!--[-->`);
        ssrRenderList(getTasksByGroup(groupKey), (task) => {
          _push(`<div class="task-item" data-v-a832358a><div class="task-info" data-v-a832358a><div class="task-name" data-v-a832358a>${ssrInterpolate(task.name)}</div><div class="task-desc" data-v-a832358a>${ssrInterpolate(task.description)}</div></div>`);
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
                _push2(`执行`);
              } else {
                return [
                  createTextVNode("执行")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="logs-section" data-v-a832358a><div class="section-header" data-v-a832358a><h3 data-v-a832358a>`);
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
      _push(` 执行日志 </h3>`);
      _push(ssrRenderComponent(_component_el_button, {
        icon: unref(refresh_default),
        circle: "",
        onClick: unref(fetchLogs),
        loading: unref(logsLoading)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminDataTable, {
        data: paginatedLogs.value,
        loading: unref(logsLoading),
        total: unref(logs).length,
        "current-page": currentPage.value,
        "onUpdate:currentPage": ($event) => currentPage.value = $event,
        "page-size": pageSize.value,
        "onUpdate:pageSize": ($event) => pageSize.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "执行时间",
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
              label: "任务",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="task-cell" data-v-a832358a${_scopeId2}><span class="task-key" data-v-a832358a${_scopeId2}>${ssrInterpolate(getTaskDisplayName(row.task_name))}</span>`);
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
              label: "状态",
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
                        _push4(`${ssrInterpolate(row.status === "success" ? "成功" : "失败")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "success" ? "成功" : "失败"), 1)
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
                        createTextVNode(toDisplayString(row.status === "success" ? "成功" : "失败"), 1)
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
              label: "处理数",
              width: "100",
              align: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="affected-count" data-v-a832358a${_scopeId2}>${ssrInterpolate(row.affected_count || 0)}</span>`);
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
              label: "错误信息",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "执行时间",
                width: "160"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.executed_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "task_name",
                label: "任务",
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
                label: "状态",
                width: "100",
                align: "center"
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
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "affected-count" }, toDisplayString(row.affected_count || 0), 1)
                ]),
                _: 1
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
      }, _parent));
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
const scheduler = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a832358a"]]);
export {
  scheduler as default
};
//# sourceMappingURL=scheduler-BSaN_u15.js.map
