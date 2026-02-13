import { E as ElAlert } from "./index-B4LZdJVK.js";
import { E as ElButton } from "./index-DV2Xa1Kj.js";
import { E as ElTableColumn } from "./index-ghXUvVLW.js";
import { E as ElInputNumber } from "./index-C8Zv6czV.js";
import { E as ElSwitch } from "./index-Cdq-rMDq.js";
import { E as ElForm, a as ElFormItem } from "./index-Bd_1JmUc.js";
/* empty css              */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                  */
/* empty css                         */
/* empty css                   */
/* empty css                 */
/* empty css                      */
/* empty css                    */
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { p as plus_default } from "./index-DuV_oMrC.js";
import { i as adminRechargeApi } from "./index-CUCx8vYk.js";
import { A as AdminActionCard } from "./AdminActionCard-CU3C31Qp.js";
import { A as AdminDataTable } from "./AdminDataTable-CJO5xpdf.js";
import { A as AdminDataDialog } from "./AdminDataDialog-DdPeAUNy.js";
import { u as useAdminDialog, c as confirmDelete } from "./useAdminDialog-DGlLxLb0.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-Ho-fELR6.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-CyvpkMdQ.js";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./index-CsSUb8pm.js";
import "@vueuse/core";
import "@vue/shared";
import "./vnode-BKSxKQVt.js";
import "./index-xMedQC9S.js";
import "./use-global-config-Dt87SALX.js";
import "./use-form-item-VP6j78iG.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CVMnQJck.js";
import "./index-C88l1uRA.js";
import "./index-B8mpCVSS.js";
import "@popperjs/core";
import "./focus-trap.vue-CG7JU5b_.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-7GSISQj3.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-DHiqjM1w.js";
import "./typescript-D6L75muK.js";
import "./index-Cy25Tved.js";
import "./index-D3BlhKEk.js";
import "./validator-B2QmXMzy.js";
import "async-validator";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./cdk-BcOf0oEp.js";
import "./coupon-DnjcrSN8.js";
import "./media-DksayCA2.js";
import "./order-BDjtswS6.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "./index-BWwwK9Wh.js";
/* empty css                    */
import "./index-B_8BWUnE.js";
import "./index-BDljrZG0.js";
import "./index-z3smHzuf.js";
import "./index-CzsgKIaa.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DHYrZ40v.js";
import "./index-BKas9GMw.js";
import "./directive-DOWfgPYe.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "./index-CcOBk9kW.js";
import "./index-wSws2F9U.js";
import "./refs-CxYYXu5Q.js";
import "./index-CC_9xuAU.js";
/* empty css                   */
/* empty css                    */
/* empty css                        */
import "./index-CJRqI9Bk.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tiers",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const tiers2 = ref([]);
    const sortedTiers = computed(() => {
      return [...tiers2.value].sort((a, b) => a.sortOrder - b.sortOrder);
    });
    const dialog = useAdminDialog({
      id: "",
      amount: 6,
      bonus: 0,
      sortOrder: 0,
      status: true
    }, {
      onSubmit: async (form, isEdit) => {
        const payload = {
          amount: form.amount,
          bonus: form.bonus,
          sort_order: form.sortOrder,
          status: form.status ? "on" : "off"
        };
        if (isEdit) {
          return await adminRechargeApi.updateTier(form.id, payload);
        } else {
          return await adminRechargeApi.createTier(payload);
        }
      },
      onSuccess: async () => {
        await loadTiers();
      }
    });
    const formRef = dialog.formRef;
    const rules = reactive({
      amount: [
        { required: true, message: "请输入充值金额", trigger: "blur" },
        { type: "number", min: 0.01, message: "金额必须大于0", trigger: "blur" }
      ],
      bonus: [
        { required: true, message: "请输入赠送金额", trigger: "blur" }
      ]
    });
    const transformRow = (row) => {
      return {
        id: row.id,
        amount: row.amount,
        bonus: row.bonus,
        sortOrder: row.sortOrder,
        status: row.status
      };
    };
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
    const handleDelete = async (row) => {
      await confirmDelete(
        `确认删除充值档位 "¥${row.amount}" 吗？`,
        async () => {
          const res = await adminRechargeApi.deleteTier(row.id);
          if (res.success) {
            await loadTiers();
          }
          return res;
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "recharge-tiers-page" }, _attrs))} data-v-7e87a8ab>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="action-container" data-v-7e87a8ab${_scopeId}>`);
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
              onClick: ($event) => unref(dialog).openAdd()
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
                  onClick: ($event) => unref(dialog).openAdd()
                }, {
                  default: withCtx(() => [
                    createTextVNode("新增充值档位")
                  ]),
                  _: 1
                }, 8, ["icon", "onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: sortedTiers.value,
        loading: loading.value,
        "show-pagination": false,
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "amount",
              label: "充值金额 (元)",
              "min-width": "150",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span style="${ssrRenderStyle({ "font-weight": "bold", "font-size": "16px" })}" data-v-7e87a8ab${_scopeId2}>¥${ssrInterpolate(row.amount)}</span>`);
                } else {
                  return [
                    createVNode("span", { style: { "font-weight": "bold", "font-size": "16px" } }, "¥" + toDisplayString(row.amount), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "bonus",
              label: "赠送金额 (元)",
              "min-width": "150",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.bonus > 0) {
                    _push3(`<span style="${ssrRenderStyle({ "color": "#67C23A" })}" data-v-7e87a8ab${_scopeId2}>+ ¥${ssrInterpolate(row.bonus)}</span>`);
                  } else {
                    _push3(`<span style="${ssrRenderStyle({ "color": "#909399" })}" data-v-7e87a8ab${_scopeId2}>-</span>`);
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "排序值",
              width: "150",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input_number, {
                    modelValue: row.sortOrder,
                    "onUpdate:modelValue": ($event) => row.sortOrder = $event,
                    min: 0,
                    max: 999,
                    size: "small",
                    "controls-position": "right",
                    onChange: handleSortChange
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: row.status,
                    "onUpdate:modelValue": ($event) => row.status = $event,
                    onChange: ($event) => handleStatusChange(row)
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "150",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => unref(dialog).openEdit(transformRow(row))
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`编辑`);
                      } else {
                        return [
                          createTextVNode("编辑")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`删除`);
                      } else {
                        return [
                          createTextVNode("删除")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => unref(dialog).openEdit(transformRow(row))
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
            }, _parent2, _scopeId));
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
                    onClick: ($event) => unref(dialog).openEdit(transformRow(row))
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
      }, _parent));
      _push(ssrRenderComponent(AdminDataDialog, {
        modelValue: unref(dialog).visible.value,
        "onUpdate:modelValue": ($event) => unref(dialog).visible.value = $event,
        title: unref(dialog).isEdit.value ? "编辑充值档位" : "新增充值档位",
        loading: unref(dialog).loading.value,
        onConfirm: unref(dialog).submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: unref(dialog).form,
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
                          modelValue: unref(dialog).form.amount,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.amount = $event,
                          min: 1,
                          precision: 2,
                          step: 1,
                          style: { "width": "100%" },
                          placeholder: "请输入充值金额"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.amount,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.amount = $event,
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
                          modelValue: unref(dialog).form.bonus,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.bonus = $event,
                          min: 0,
                          precision: 2,
                          step: 1,
                          style: { "width": "100%" },
                          placeholder: "请输入赠送金额"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.bonus,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.bonus = $event,
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
                          modelValue: unref(dialog).form.sortOrder,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sortOrder = $event,
                          min: 0,
                          max: 999,
                          "controls-position": "right"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip" data-v-7e87a8ab${_scopeId3}>数值越小越靠前</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sortOrder,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sortOrder = $event,
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
                          modelValue: unref(dialog).form.status,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
                          "active-text": "启用",
                          "inactive-text": "停用"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: unref(dialog).form.status,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
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
                          modelValue: unref(dialog).form.amount,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.amount = $event,
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
                          modelValue: unref(dialog).form.bonus,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.bonus = $event,
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
                          modelValue: unref(dialog).form.sortOrder,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sortOrder = $event,
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
                          modelValue: unref(dialog).form.status,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
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
                model: unref(dialog).form,
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
                        modelValue: unref(dialog).form.amount,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.amount = $event,
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
                        modelValue: unref(dialog).form.bonus,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.bonus = $event,
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
                        modelValue: unref(dialog).form.sortOrder,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sortOrder = $event,
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
                        modelValue: unref(dialog).form.status,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/recharge/tiers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tiers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e87a8ab"]]);
export {
  tiers as default
};
//# sourceMappingURL=tiers-CdRgOjne.js.map
