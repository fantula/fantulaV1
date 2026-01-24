import { E as ElAlert } from "./index-DvOrIhmd.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElCard } from "./index-9Hs_9io2.js";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElInputNumber } from "./index-iY4Ojb3q.js";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
import { E as ElDialog } from "./index-I18rzBgu.js";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
import { p as plus_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
/* empty css                  */
/* empty css                   */
/* empty css                 */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                  */
/* empty css                         */
/* empty css                   */
/* empty css                   */
/* empty css                    */
/* empty css                      */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { f as adminRechargeApi } from "./admin-supabase-nszo-IoU.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./vnode-D0IHQw_9.js";
import "@vue/shared";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "lodash-unified";
import "./index-D_b573Qt.js";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-Bf1ETwA6.js";
import "./index-ClPmkyX9.js";
import "./index-DOE061f1.js";
import "./validator-T0bsmJHo.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "async-validator";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
import "./index-QnhSR2oe.js";
/* empty css                    */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tiers",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const submitting = ref(false);
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const formRef = ref();
    const tiers2 = ref([]);
    const sortedTiers = computed(() => {
      return [...tiers2.value].sort((a, b) => a.sortOrder - b.sortOrder);
    });
    const form = reactive({
      id: "",
      amount: 6,
      bonus: 0,
      sortOrder: 0,
      status: true
    });
    const rules = reactive({
      amount: [
        { required: true, message: "请输入充值金额", trigger: "blur" },
        { type: "number", min: 0.01, message: "金额必须大于0", trigger: "blur" }
      ],
      bonus: [
        { required: true, message: "请输入赠送金额", trigger: "blur" }
      ]
    });
    const loadTiers = async () => {
      loading.value = true;
      try {
        const res = await adminRechargeApi.getTiers();
        if (res.success) {
          tiers2.value = res.data.map((item) => ({
            id: item.id,
            amount: Number(item.amount),
            bonus: Number(item.bonus),
            sortOrder: item.sort_order,
            status: item.status === "on",
            createTime: item.created_at
          }));
        } else {
          ElMessage.error(res.error || "加载失败");
        }
      } catch (e) {
        ElMessage.error("加载充值档位失败");
      } finally {
        loading.value = false;
      }
    };
    const openAddDialog = () => {
      isEdit.value = false;
      form.id = "";
      form.amount = 6;
      form.bonus = 0;
      form.sortOrder = tiers2.value.length + 1;
      form.status = true;
      dialogVisible.value = true;
    };
    const openEditDialog = (row) => {
      isEdit.value = true;
      form.id = row.id;
      form.amount = row.amount;
      form.bonus = row.bonus;
      form.sortOrder = row.sortOrder;
      form.status = row.status;
      dialogVisible.value = true;
    };
    const submitForm = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (valid) {
          submitting.value = true;
          try {
            const tierData = {
              amount: form.amount,
              bonus: form.bonus,
              sort_order: form.sortOrder,
              status: form.status ? "on" : "off"
            };
            if (isEdit.value) {
              const res = await adminRechargeApi.updateTier(form.id, tierData);
              if (res.success) {
                ElMessage.success("更新成功");
                dialogVisible.value = false;
                await loadTiers();
              } else {
                ElMessage.error(res.error || "更新失败");
              }
            } else {
              const res = await adminRechargeApi.createTier(tierData);
              if (res.success) {
                ElMessage.success("添加成功");
                dialogVisible.value = false;
                await loadTiers();
              } else {
                ElMessage.error(res.error || "添加失败");
              }
            }
          } finally {
            submitting.value = false;
          }
        }
      });
    };
    const resetForm = () => {
      if (formRef.value) {
        formRef.value.resetFields();
      }
    };
    const handleSortChange = async () => {
      for (const tier of tiers2.value) {
        await adminRechargeApi.updateTier(tier.id, { sort_order: tier.sortOrder });
      }
      ElMessage.success("排序已保存");
    };
    const handleStatusChange = async (row) => {
      const res = await adminRechargeApi.updateTier(row.id, {
        status: row.status ? "on" : "off"
      });
      if (res.success) {
        ElMessage.success(row.status ? "已启用" : "已停用");
      } else {
        ElMessage.error(res.error || "状态更新失败");
        row.status = !row.status;
      }
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm(`确认删除充值档位 "¥${row.amount}" 吗？`, "删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await adminRechargeApi.deleteTier(row.id);
        if (res.success) {
          ElMessage.success("删除成功");
          await loadTiers();
        } else {
          ElMessage.error(res.error || "删除失败");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "recharge-tiers-page" }, _attrs))} data-v-84952097>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="action-container" data-v-84952097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "提示：此处配置的充值档位将在客户端充值页面展示，排序值越小越靠前。",
              type: "info",
              "show-icon": "",
              closable: false,
              style: { "margin-right": "20px", "flex": "1" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: openAddDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`新增充值档位`);
                } else {
                  return [
                    createTextVNode("新增充值档位")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "action-container" }, [
                createVNode(_component_el_alert, {
                  title: "提示：此处配置的充值档位将在客户端充值页面展示，排序值越小越靠前。",
                  type: "info",
                  "show-icon": "",
                  closable: false,
                  style: { "margin-right": "20px", "flex": "1" }
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  icon: unref(plus_default),
                  onClick: openAddDialog
                }, {
                  default: withCtx(() => [
                    createTextVNode("新增充值档位")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "list-card mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: sortedTiers.value,
              style: { "width": "100%" },
              border: "",
              stripe: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "amount",
                    label: "充值金额 (元)",
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-weight": "bold", "font-size": "16px" })}" data-v-84952097${_scopeId3}>¥${ssrInterpolate(row.amount)}</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-weight": "bold", "font-size": "16px" } }, "¥" + toDisplayString(row.amount), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "bonus",
                    label: "赠送金额 (元)",
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (row.bonus > 0) {
                          _push4(`<span style="${ssrRenderStyle({ "color": "#67C23A" })}" data-v-84952097${_scopeId3}>+ ¥${ssrInterpolate(row.bonus)}</span>`);
                        } else {
                          _push4(`<span style="${ssrRenderStyle({ "color": "#909399" })}" data-v-84952097${_scopeId3}>-</span>`);
                        }
                      } else {
                        return [
                          row.bonus > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            style: { "color": "#67C23A" }
                          }, "+ ¥" + toDisplayString(row.bonus), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            style: { "color": "#909399" }
                          }, "-"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "排序值",
                    width: "150",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: row.sortOrder,
                          "onUpdate:modelValue": ($event) => row.sortOrder = $event,
                          min: 0,
                          max: 999,
                          size: "small",
                          "controls-position": "right",
                          onChange: handleSortChange
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: row.sortOrder,
                            "onUpdate:modelValue": ($event) => row.sortOrder = $event,
                            min: 0,
                            max: 999,
                            size: "small",
                            "controls-position": "right",
                            onChange: handleSortChange
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: row.status,
                          "onUpdate:modelValue": ($event) => row.status = $event,
                          onChange: ($event) => handleStatusChange(row)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: row.status,
                            "onUpdate:modelValue": ($event) => row.status = $event,
                            onChange: ($event) => handleStatusChange(row)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "150",
                    fixed: "right",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "primary",
                          onClick: ($event) => openEditDialog(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`编辑`);
                            } else {
                              return [
                                createTextVNode("编辑")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "danger",
                          onClick: ($event) => handleDelete(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`删除`);
                            } else {
                              return [
                                createTextVNode("删除")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            onClick: ($event) => openEditDialog(row)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("编辑")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_el_button, {
                            link: "",
                            type: "danger",
                            onClick: ($event) => handleDelete(row)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "amount",
                      label: "充值金额 (元)",
                      "min-width": "150",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { style: { "font-weight": "bold", "font-size": "16px" } }, "¥" + toDisplayString(row.amount), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "bonus",
                      label: "赠送金额 (元)",
                      "min-width": "150",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        row.bonus > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          style: { "color": "#67C23A" }
                        }, "+ ¥" + toDisplayString(row.bonus), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          style: { "color": "#909399" }
                        }, "-"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "排序值",
                      width: "150",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_input_number, {
                          modelValue: row.sortOrder,
                          "onUpdate:modelValue": ($event) => row.sortOrder = $event,
                          min: 0,
                          max: 999,
                          size: "small",
                          "controls-position": "right",
                          onChange: handleSortChange
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_switch, {
                          modelValue: row.status,
                          "onUpdate:modelValue": ($event) => row.status = $event,
                          onChange: ($event) => handleStatusChange(row)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "150",
                      fixed: "right",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          onClick: ($event) => openEditDialog(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("编辑")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger",
                          onClick: ($event) => handleDelete(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: sortedTiers.value,
                style: { "width": "100%" },
                border: "",
                stripe: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "amount",
                    label: "充值金额 (元)",
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", { style: { "font-weight": "bold", "font-size": "16px" } }, "¥" + toDisplayString(row.amount), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "bonus",
                    label: "赠送金额 (元)",
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      row.bonus > 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        style: { "color": "#67C23A" }
                      }, "+ ¥" + toDisplayString(row.bonus), 1)) : (openBlock(), createBlock("span", {
                        key: 1,
                        style: { "color": "#909399" }
                      }, "-"))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "排序值",
                    width: "150",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_input_number, {
                        modelValue: row.sortOrder,
                        "onUpdate:modelValue": ($event) => row.sortOrder = $event,
                        min: 0,
                        max: 999,
                        size: "small",
                        "controls-position": "right",
                        onChange: handleSortChange
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_switch, {
                        modelValue: row.status,
                        "onUpdate:modelValue": ($event) => row.status = $event,
                        onChange: ($event) => handleStatusChange(row)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "150",
                    fixed: "right",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        onClick: ($event) => openEditDialog(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("编辑")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger",
                        onClick: ($event) => handleDelete(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, loading.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? "编辑充值档位" : "新增充值档位",
        width: "500px",
        onClosed: resetForm,
        "append-to-body": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-84952097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: submitForm,
              loading: submitting.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认`);
                } else {
                  return [
                    createTextVNode("确认")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => dialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitForm,
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("确认")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef,
              "label-width": "100px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "充值金额",
                    prop: "amount"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: form.amount,
                          "onUpdate:modelValue": ($event) => form.amount = $event,
                          min: 1,
                          precision: 2,
                          step: 1,
                          style: { "width": "100%" },
                          placeholder: "请输入充值金额"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: form.amount,
                            "onUpdate:modelValue": ($event) => form.amount = $event,
                            min: 1,
                            precision: 2,
                            step: 1,
                            style: { "width": "100%" },
                            placeholder: "请输入充值金额"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "赠送金额",
                    prop: "bonus"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: form.bonus,
                          "onUpdate:modelValue": ($event) => form.bonus = $event,
                          min: 0,
                          precision: 2,
                          step: 1,
                          style: { "width": "100%" },
                          placeholder: "请输入赠送金额"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: form.bonus,
                            "onUpdate:modelValue": ($event) => form.bonus = $event,
                            min: 0,
                            precision: 2,
                            step: 1,
                            style: { "width": "100%" },
                            placeholder: "请输入赠送金额"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "排序值",
                    prop: "sortOrder"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: form.sortOrder,
                          "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                          min: 0,
                          max: 999,
                          "controls-position": "right"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip" data-v-84952097${_scopeId3}>数值越小越靠前</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: form.sortOrder,
                            "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                            min: 0,
                            max: 999,
                            "controls-position": "right"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "数值越小越靠前")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "状态",
                    prop: "status"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event,
                          "active-text": "启用",
                          "inactive-text": "停用"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: form.status,
                            "onUpdate:modelValue": ($event) => form.status = $event,
                            "active-text": "启用",
                            "inactive-text": "停用"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "充值金额",
                      prop: "amount"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: form.amount,
                          "onUpdate:modelValue": ($event) => form.amount = $event,
                          min: 1,
                          precision: 2,
                          step: 1,
                          style: { "width": "100%" },
                          placeholder: "请输入充值金额"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "赠送金额",
                      prop: "bonus"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: form.bonus,
                          "onUpdate:modelValue": ($event) => form.bonus = $event,
                          min: 0,
                          precision: 2,
                          step: 1,
                          style: { "width": "100%" },
                          placeholder: "请输入赠送金额"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "排序值",
                      prop: "sortOrder"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: form.sortOrder,
                          "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                          min: 0,
                          max: 999,
                          "controls-position": "right"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "数值越小越靠前")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "状态",
                      prop: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event,
                          "active-text": "启用",
                          "inactive-text": "停用"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: form,
                rules,
                ref_key: "formRef",
                ref: formRef,
                "label-width": "100px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "充值金额",
                    prop: "amount"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: form.amount,
                        "onUpdate:modelValue": ($event) => form.amount = $event,
                        min: 1,
                        precision: 2,
                        step: 1,
                        style: { "width": "100%" },
                        placeholder: "请输入充值金额"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "赠送金额",
                    prop: "bonus"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: form.bonus,
                        "onUpdate:modelValue": ($event) => form.bonus = $event,
                        min: 0,
                        precision: 2,
                        step: 1,
                        style: { "width": "100%" },
                        placeholder: "请输入赠送金额"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "排序值",
                    prop: "sortOrder"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: form.sortOrder,
                        "onUpdate:modelValue": ($event) => form.sortOrder = $event,
                        min: 0,
                        max: 999,
                        "controls-position": "right"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "数值越小越靠前")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "状态",
                    prop: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: form.status,
                        "onUpdate:modelValue": ($event) => form.status = $event,
                        "active-text": "启用",
                        "inactive-text": "停用"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "rules"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/recharge/tiers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tiers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84952097"]]);
export {
  tiers as default
};
//# sourceMappingURL=tiers-DTyqpu_x.js.map
