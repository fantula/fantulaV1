import { _ as _export_sfc, E as ElIcon, l as loading_default, bO as video_pause_default, bP as caret_right_default, b9 as refresh_default, ah as ElMessage } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { a as ElTable, E as ElTableColumn } from './index-KOxrtlML.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, createBlock, openBlock, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-D_b573Qt.mjs';
import './index-Dxw_X3Hq.mjs';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-DrPRyc7n.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './index-QnhSR2oe.mjs';

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
          ElMessage.success(start ? "\u670D\u52A1\u5DF2\u542F\u52A8" : "\u670D\u52A1\u5DF2\u505C\u6B62");
          await fetchStatus();
        } else {
          ElMessage.warning(res.message || "\u64CD\u4F5C\u5931\u8D25");
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
        if (res.success) {
          ElMessage.success(`\u6267\u884C\u5B8C\u6210\uFF0C\u5904\u7406 ${res.expired_count || 0} \u6761\u6570\u636E`);
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
      _push(`</div><div class="info" data-v-fa174296><div class="label" data-v-fa174296>\u670D\u52A1\u72B6\u6001</div><div class="value" data-v-fa174296>${ssrInterpolate(status.value.isRunning ? "\u8FD0\u884C\u4E2D" : "\u5DF2\u505C\u6B62")}</div></div><div class="actions" data-v-fa174296>`);
      if (!status.value.isRunning) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "success",
          size: "small",
          onClick: ($event) => toggleScheduler(true),
          loading: actionLoading.value
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
          onClick: ($event) => toggleScheduler(false),
          loading: actionLoading.value
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
      _push(`</div></div><div class="status-card info" data-v-fa174296><div class="info-item" data-v-fa174296><div class="label" data-v-fa174296>\u4E0A\u6B21\u6267\u884C</div><div class="value" data-v-fa174296>${ssrInterpolate(formatTime(status.value.lastRun))}</div></div><div class="info-divider" data-v-fa174296></div><div class="info-item" data-v-fa174296><div class="label" data-v-fa174296>\u6267\u884C\u9891\u7387</div><div class="value" data-v-fa174296>\u6BCF 5 \u5206\u949F</div></div></div></div>`);
      _push(ssrRenderComponent(AdminActionCard, {
        title: "\u624B\u52A8\u89E6\u53D1\u4EFB\u52A1",
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tasks-grid" data-v-fa174296${_scopeId}><div class="task-item" data-v-fa174296${_scopeId}><div class="task-meta" data-v-fa174296${_scopeId}><span class="task-name" data-v-fa174296${_scopeId}>\u6E05\u7406\u8FC7\u671F\u9884\u8BA2\u5355</span><span class="task-desc" data-v-fa174296${_scopeId}>\u68C0\u6D4B\u5E76\u91CA\u653E\u8D85\u65F6\u7684\u5F85\u652F\u4ED8\u8BA2\u5355\u5E93\u5B58</span></div>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              plain: "",
              icon: unref(caret_right_default),
              onClick: ($event) => runTask("cleanup_expired_preorders"),
              loading: runningTask.value === "cleanup_expired_preorders"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6267\u884C`);
                } else {
                  return [
                    createTextVNode("\u6267\u884C")
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
                    createVNode("span", { class: "task-name" }, "\u6E05\u7406\u8FC7\u671F\u9884\u8BA2\u5355"),
                    createVNode("span", { class: "task-desc" }, "\u68C0\u6D4B\u5E76\u91CA\u653E\u8D85\u65F6\u7684\u5F85\u652F\u4ED8\u8BA2\u5355\u5E93\u5B58")
                  ]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    plain: "",
                    icon: unref(caret_right_default),
                    onClick: ($event) => runTask("cleanup_expired_preorders"),
                    loading: runningTask.value === "cleanup_expired_preorders"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u6267\u884C")
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
        title: "\u6267\u884C\u65E5\u5FD7",
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
                    label: "\u6267\u884C\u65F6\u95F4",
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
                    label: "\u4EFB\u52A1\u540D\u79F0"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u72B6\u6001",
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
                              _push5(`${ssrInterpolate(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25"), 1)
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
                              createTextVNode(toDisplayString(row.status === "success" ? "\u6210\u529F" : "\u5931\u8D25"), 1)
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
                    label: "\u5904\u7406\u6570\u91CF",
                    width: "120",
                    align: "right"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "\u6267\u884C\u65F6\u95F4",
                      width: "200"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatTime(row.executed_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "task_name",
                      label: "\u4EFB\u52A1\u540D\u79F0"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u72B6\u6001",
                      width: "100"
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
                      label: "\u5904\u7406\u6570\u91CF",
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
                    label: "\u6267\u884C\u65F6\u95F4",
                    width: "200"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatTime(row.executed_at)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "task_name",
                    label: "\u4EFB\u52A1\u540D\u79F0"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "100"
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
                    label: "\u5904\u7406\u6570\u91CF",
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

export { scheduler as default };
//# sourceMappingURL=scheduler-BuB-Aqri.mjs.map
