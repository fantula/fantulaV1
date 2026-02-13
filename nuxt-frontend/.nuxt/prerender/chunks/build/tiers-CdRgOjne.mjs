import { E as ElAlert } from './index-B4LZdJVK.mjs';
import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElInputNumber } from './index-C8Zv6czV.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { E as ElForm, a as ElFormItem } from './index-Bd_1JmUc.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { p as plus_default } from './index-DuV_oMrC.mjs';
import { i as adminRechargeApi } from './index-CUCx8vYk.mjs';
import { A as AdminActionCard } from './AdminActionCard-CU3C31Qp.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-DdPeAUNy.mjs';
import { u as useAdminDialog, a as confirmDelete } from './useAdminDialog-DGlLxLb0.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
import { _ as _export_sfc } from './server.mjs';
import './icon-CyvpkMdQ.mjs';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './index-CsSUb8pm.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './vnode-BKSxKQVt.mjs';
import './index-xMedQC9S.mjs';
import './use-global-config-Dt87SALX.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-CVMnQJck.mjs';
import './index-C88l1uRA.mjs';
import './index-B8mpCVSS.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-7GSISQj3.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './index-DHiqjM1w.mjs';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
import './index-D3BlhKEk.mjs';
import './validator-B2QmXMzy.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './supabase-admin-Yv96kmWU.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import './cdk-BcOf0oEp.mjs';
import './coupon-DnjcrSN8.mjs';
import './media-DksayCA2.mjs';
import './order-BDjtswS6.mjs';
import './index-BWwwK9Wh.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './index-z3smHzuf.mjs';
import './index-CzsgKIaa.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DHYrZ40v.mjs';
import './index-BKas9GMw.mjs';
import './directive-DOWfgPYe.mjs';
import './index-CcOBk9kW.mjs';
import './index-wSws2F9U.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-CC_9xuAU.mjs';
import './index-CJRqI9Bk.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';

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
        { required: true, message: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D", trigger: "blur" },
        { type: "number", min: 0.01, message: "\u91D1\u989D\u5FC5\u987B\u5927\u4E8E0", trigger: "blur" }
      ],
      bonus: [
        { required: true, message: "\u8BF7\u8F93\u5165\u8D60\u9001\u91D1\u989D", trigger: "blur" }
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
          ElMessage.error(res.error || "\u52A0\u8F7D\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u52A0\u8F7D\u5145\u503C\u6863\u4F4D\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const handleSortChange = async () => {
      for (const tier of tiers2.value) {
        await adminRechargeApi.updateTier(tier.id, { sort_order: tier.sortOrder });
      }
      ElMessage.success("\u6392\u5E8F\u5DF2\u4FDD\u5B58");
    };
    const handleStatusChange = async (row) => {
      const res = await adminRechargeApi.updateTier(row.id, {
        status: row.status ? "on" : "off"
      });
      if (res.success) {
        ElMessage.success(row.status ? "\u5DF2\u542F\u7528" : "\u5DF2\u505C\u7528");
      } else {
        ElMessage.error(res.error || "\u72B6\u6001\u66F4\u65B0\u5931\u8D25");
        row.status = !row.status;
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        `\u786E\u8BA4\u5220\u9664\u5145\u503C\u6863\u4F4D "\xA5${row.amount}" \u5417\uFF1F`,
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
              title: "\u63D0\u793A\uFF1A\u6B64\u5904\u914D\u7F6E\u7684\u5145\u503C\u6863\u4F4D\u5C06\u5728\u5BA2\u6237\u7AEF\u5145\u503C\u9875\u9762\u5C55\u793A\uFF0C\u6392\u5E8F\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D\u3002",
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
                  _push3(`\u65B0\u589E\u5145\u503C\u6863\u4F4D`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u5145\u503C\u6863\u4F4D")
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
                  title: "\u63D0\u793A\uFF1A\u6B64\u5904\u914D\u7F6E\u7684\u5145\u503C\u6863\u4F4D\u5C06\u5728\u5BA2\u6237\u7AEF\u5145\u503C\u9875\u9762\u5C55\u793A\uFF0C\u6392\u5E8F\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D\u3002",
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
                    createTextVNode("\u65B0\u589E\u5145\u503C\u6863\u4F4D")
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
              label: "\u5145\u503C\u91D1\u989D (\u5143)",
              "min-width": "150",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span style="${ssrRenderStyle({ "font-weight": "bold", "font-size": "16px" })}" data-v-7e87a8ab${_scopeId2}>\xA5${ssrInterpolate(row.amount)}</span>`);
                } else {
                  return [
                    createVNode("span", { style: { "font-weight": "bold", "font-size": "16px" } }, "\xA5" + toDisplayString(row.amount), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "bonus",
              label: "\u8D60\u9001\u91D1\u989D (\u5143)",
              "min-width": "150",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.bonus > 0) {
                    _push3(`<span style="${ssrRenderStyle({ "color": "#67C23A" })}" data-v-7e87a8ab${_scopeId2}>+ \xA5${ssrInterpolate(row.bonus)}</span>`);
                  } else {
                    _push3(`<span style="${ssrRenderStyle({ "color": "#909399" })}" data-v-7e87a8ab${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.bonus > 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      style: { "color": "#67C23A" }
                    }, "+ \xA5" + toDisplayString(row.bonus), 1)) : (openBlock(), createBlock("span", {
                      key: 1,
                      style: { "color": "#909399" }
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6392\u5E8F\u503C",
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
              label: "\u72B6\u6001",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`\u7F16\u8F91`);
                      } else {
                        return [
                          createTextVNode("\u7F16\u8F91")
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
                        _push4(`\u5220\u9664`);
                      } else {
                        return [
                          createTextVNode("\u5220\u9664")
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
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5220\u9664")
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
                label: "\u5145\u503C\u91D1\u989D (\u5143)",
                "min-width": "150",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { style: { "font-weight": "bold", "font-size": "16px" } }, "\xA5" + toDisplayString(row.amount), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "bonus",
                label: "\u8D60\u9001\u91D1\u989D (\u5143)",
                "min-width": "150",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.bonus > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    style: { "color": "#67C23A" }
                  }, "+ \xA5" + toDisplayString(row.bonus), 1)) : (openBlock(), createBlock("span", {
                    key: 1,
                    style: { "color": "#909399" }
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u6392\u5E8F\u503C",
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
                label: "\u72B6\u6001",
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
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5220\u9664")
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
        title: unref(dialog).isEdit.value ? "\u7F16\u8F91\u5145\u503C\u6863\u4F4D" : "\u65B0\u589E\u5145\u503C\u6863\u4F4D",
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
                    label: "\u5145\u503C\u91D1\u989D",
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
                          placeholder: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D"
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
                            placeholder: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u8D60\u9001\u91D1\u989D",
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
                          placeholder: "\u8BF7\u8F93\u5165\u8D60\u9001\u91D1\u989D"
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
                            placeholder: "\u8BF7\u8F93\u5165\u8D60\u9001\u91D1\u989D"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u6392\u5E8F\u503C",
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
                        _push4(`<div class="form-tip" data-v-7e87a8ab${_scopeId3}>\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sortOrder,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sortOrder = $event,
                            min: 0,
                            max: 999,
                            "controls-position": "right"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u72B6\u6001",
                    prop: "status"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: unref(dialog).form.status,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
                          "active-text": "\u542F\u7528",
                          "inactive-text": "\u505C\u7528"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: unref(dialog).form.status,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
                            "active-text": "\u542F\u7528",
                            "inactive-text": "\u505C\u7528"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u5145\u503C\u91D1\u989D",
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
                          placeholder: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u8D60\u9001\u91D1\u989D",
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
                          placeholder: "\u8BF7\u8F93\u5165\u8D60\u9001\u91D1\u989D"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u6392\u5E8F\u503C",
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
                        createVNode("div", { class: "form-tip" }, "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u72B6\u6001",
                      prop: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: unref(dialog).form.status,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
                          "active-text": "\u542F\u7528",
                          "inactive-text": "\u505C\u7528"
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
                    label: "\u5145\u503C\u91D1\u989D",
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
                        placeholder: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u8D60\u9001\u91D1\u989D",
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
                        placeholder: "\u8BF7\u8F93\u5165\u8D60\u9001\u91D1\u989D"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u6392\u5E8F\u503C",
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
                      createVNode("div", { class: "form-tip" }, "\u6570\u503C\u8D8A\u5C0F\u8D8A\u9760\u524D")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u72B6\u6001",
                    prop: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: unref(dialog).form.status,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event,
                        "active-text": "\u542F\u7528",
                        "inactive-text": "\u505C\u7528"
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

export { tiers as default };
//# sourceMappingURL=tiers-CdRgOjne.mjs.map
