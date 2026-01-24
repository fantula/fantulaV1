import { E as ElIcon, l as loading_default, bO as video_pause_default, bP as caret_right_default, b9 as refresh_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElTag } from "./index-BOQJCp53.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { v as vLoading } from "./directive-tOiqatq5.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-D_b573Qt.js";
import "./index-Dxw_X3Hq.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-QnhSR2oe.js";
/* empty css                    */
const SCHEDULER_URL = "http://localhost:3001";
const adminSchedulerApi = {
  /**
   * Get scheduler status
   */
  async getStatus() {
    try {
      const res = await fetch(`${SCHEDULER_URL}/status`);
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
      const res = await fetch(`${SCHEDULER_URL}/logs?limit=${limit}`);
      return await res.json();
    } catch (e) {
      console.error("Failed to get scheduler logs:", e);
      return { success: false, logs: [] };
    }
  },
  /**
   * Start scheduler
   */
  async start() {
    try {
      const res = await fetch(`${SCHEDULER_URL}/start`, { method: "POST" });
      return await res.json();
    } catch (e) {
      return { success: false, message: e.message };
    }
  },
  /**
   * Stop scheduler
   */
  async stop() {
    try {
      const res = await fetch(`${SCHEDULER_URL}/stop`, { method: "POST" });
      return await res.json();
    } catch (e) {
      return { success: false, message: e.message };
    }
  },
  /**
   * Run specific task immediately
   */
  async runTask(taskName) {
    try {
      const res = await fetch(`${SCHEDULER_URL}/run/${taskName}`, { method: "POST" });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scheduler",
  __ssrInlineRender: true,
  setup(__props) {
    const status = ref({
      isRunning: false,
      lastRun: null,
      lastResult: null
    });
    const logs = ref([]);
    const actionLoading = ref(false);
    const logsLoading = ref(false);
    const runningTask = ref("");
    const fetchStatus = async () => {
      const data = await adminSchedulerApi.getStatus();
      status.value = data;
    };
    const fetchLogs = async () => {
      logsLoading.value = true;
      try {
        const res = await adminSchedulerApi.getLogs();
        if (res.success) {
          logs.value = res.logs;
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
          ElMessage.warning(res.message || "操作失败");
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
        if (res.success) {
          ElMessage.success(`执行完成，处理 ${res.expired_count || 0} 条数据`);
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "scheduler-page" }, _attrs))} data-v-fa174296><div class="status-grid" data-v-fa174296><div class="${ssrRenderClass([{ active: status.value.isRunning }, "status-card"])}" data-v-fa174296><div class="icon-wrapper" data-v-fa174296>`);
      if (status.value.isRunning) {
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
      _push(`</div><div class="info" data-v-fa174296><div class="label" data-v-fa174296>服务状态</div><div class="value" data-v-fa174296>${ssrInterpolate(status.value.isRunning ? "运行中" : "已停止")}</div></div><div class="actions" data-v-fa174296>`);
      if (!status.value.isRunning) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "success",
          size: "small",
          onClick: ($event) => toggleScheduler(true),
          loading: actionLoading.value
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
          onClick: ($event) => toggleScheduler(false),
          loading: actionLoading.value
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
      _push(`</div></div><div class="status-card info" data-v-fa174296><div class="info-item" data-v-fa174296><div class="label" data-v-fa174296>上次执行</div><div class="value" data-v-fa174296>${ssrInterpolate(formatTime(status.value.lastRun))}</div></div><div class="info-divider" data-v-fa174296></div><div class="info-item" data-v-fa174296><div class="label" data-v-fa174296>执行频率</div><div class="value" data-v-fa174296>每 5 分钟</div></div></div></div>`);
      _push(ssrRenderComponent(AdminActionCard, {
        title: "手动触发任务",
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tasks-grid" data-v-fa174296${_scopeId}><div class="task-item" data-v-fa174296${_scopeId}><div class="task-meta" data-v-fa174296${_scopeId}><span class="task-name" data-v-fa174296${_scopeId}>清理过期预订单</span><span class="task-desc" data-v-fa174296${_scopeId}>检测并释放超时的待支付订单库存</span></div>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              plain: "",
              icon: unref(caret_right_default),
              onClick: ($event) => runTask("cleanup_expired_preorders"),
              loading: runningTask.value === "cleanup_expired_preorders"
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
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "tasks-grid" }, [
                createVNode("div", { class: "task-item" }, [
                  createVNode("div", { class: "task-meta" }, [
                    createVNode("span", { class: "task-name" }, "清理过期预订单"),
                    createVNode("span", { class: "task-desc" }, "检测并释放超时的待支付订单库存")
                  ]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    plain: "",
                    icon: unref(caret_right_default),
                    onClick: ($event) => runTask("cleanup_expired_preorders"),
                    loading: runningTask.value === "cleanup_expired_preorders"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("执行")
                    ]),
                    _: 1
                  }, 8, ["icon", "onClick", "loading"])
                ])
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
              onClick: fetchLogs,
              loading: logsLoading.value
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                circle: "",
                onClick: fetchLogs,
                loading: logsLoading.value
              }, null, 8, ["icon", "loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: logs.value,
              style: { "width": "100%" },
              stripe: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, logsLoading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "执行时间",
                    width: "200"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatTime(row.executed_at))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatTime(row.executed_at)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "task_name",
                    label: "任务名称"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "100"
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
                    label: "处理数量",
                    width: "120",
                    align: "right"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "执行时间",
                      width: "200"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatTime(row.executed_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "task_name",
                      label: "任务名称"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "100"
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
                      label: "处理数量",
                      width: "120",
                      align: "right"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: logs.value,
                style: { "width": "100%" },
                stripe: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "执行时间",
                    width: "200"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatTime(row.executed_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "task_name",
                    label: "任务名称"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "100"
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
                    label: "处理数量",
                    width: "120",
                    align: "right"
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, logsLoading.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/backend-settings/scheduler.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scheduler = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa174296"]]);
export {
  scheduler as default
};
//# sourceMappingURL=scheduler-BuB-Aqri.js.map
