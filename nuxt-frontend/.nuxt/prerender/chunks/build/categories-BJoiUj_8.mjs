import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTableColumn } from './index-KOxrtlML.mjs';
import { _ as _export_sfc, b9 as refresh_default, p as plus_default, E as ElIcon, bN as rank_default, ah as ElMessage } from './server.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElSwitch } from './index-CpWtG_dp.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElRadioGroup, b as ElRadio } from './index-f9lru7bI.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, nextTick, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { d as adminCategoryApi } from './admin-supabase-nszo-IoU.mjs';
import Sortable from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/sortablejs/Sortable.min.js';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { A as AdminDataTable } from './AdminDataTable-CCOHgBz_.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-CUwf_G99.mjs';
import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './index-D_b573Qt.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-Dxw_X3Hq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-DrPRyc7n.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
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
import './validator-T0bsmJHo.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './index-ClPmkyX9.mjs';
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';
import './index-QnhSR2oe.mjs';
import './index-DKY_z0U1.mjs';
import './index-cR1ntQxK.mjs';
import './index-Cf_t59lc.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './directive-tOiqatq5.mjs';
import './index-I18rzBgu.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './index-DvOrIhmd.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const submitting = ref(false);
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const formRef = ref();
    const adminTableRef = ref();
    const categories2 = ref([]);
    const form = reactive({ id: "", name: "", status: "on" });
    const rules = reactive({ name: [{ required: true, message: "\u8BF7\u8F93\u5165\u540D\u79F0", trigger: "blur" }] });
    const loadCategories = async () => {
      loading.value = true;
      try {
        const res = await adminCategoryApi.getCategories();
        if (res.success) {
          categories2.value = res.categories;
          nextTick(initSortable);
        }
      } finally {
        loading.value = false;
      }
    };
    const initSortable = () => {
      var _a;
      const el = (_a = adminTableRef.value) == null ? void 0 : _a.$el;
      if (!el) return;
      const tbody = el.querySelector(".el-table__body-wrapper tbody");
      if (tbody) {
        Sortable.create(tbody, {
          handle: ".drag-handle",
          animation: 200,
          ghostClass: "sortable-ghost",
          onEnd: async (evt) => {
            const { oldIndex, newIndex } = evt;
            if (oldIndex === newIndex) return;
            const moved = categories2.value.splice(oldIndex, 1)[0];
            categories2.value.splice(newIndex, 0, moved);
            await saveSortOrder();
          }
        });
      }
    };
    const saveSortOrder = async () => {
      const items = categories2.value.map((c, i) => ({ id: c.id, sort_order: i }));
      const res = await adminCategoryApi.batchUpdateSort(items);
      if (res.success) ElMessage.success("\u6392\u5E8F\u5DF2\u66F4\u65B0");
      else {
        ElMessage.error("\u6392\u5E8F\u66F4\u65B0\u5931\u8D25");
        loadCategories();
      }
    };
    const openAddDialog = () => {
      isEdit.value = false;
      form.name = "";
      form.status = "on";
      dialogVisible.value = true;
    };
    const openEditDialog = (row) => {
      isEdit.value = true;
      form.id = row.id;
      form.name = row.name;
      form.status = row.status;
      dialogVisible.value = true;
    };
    const submitForm = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (!valid) return;
        submitting.value = true;
        try {
          const api = isEdit.value ? adminCategoryApi.updateCategory : adminCategoryApi.createCategory;
          const payload = { name: form.name, status: form.status };
          if (!isEdit.value) payload.sort_order = categories2.value.length;
          const arg = isEdit.value ? form.id : payload;
          const res = await (isEdit.value ? api(form.id, payload) : api(payload));
          if (res.success) {
            ElMessage.success(isEdit.value ? "\u66F4\u65B0\u6210\u529F" : "\u6DFB\u52A0\u6210\u529F");
            dialogVisible.value = false;
            loadCategories();
          } else ElMessage.error(res.error);
        } finally {
          submitting.value = false;
        }
      });
    };
    const resetForm = () => {
      var _a;
      return (_a = formRef.value) == null ? void 0 : _a.resetFields();
    };
    const handleStatusChange = async (row) => {
      row.statusLoading = true;
      try {
        const res = await adminCategoryApi.updateCategory(row.id, { status: row.status });
        if (res.success) ElMessage.success(row.status === "on" ? "\u542F\u7528\u6210\u529F" : "\u505C\u7528\u6210\u529F");
        else {
          row.status = row.status === "on" ? "off" : "on";
          ElMessage.error(res.error);
        }
      } catch {
        row.status = row.status === "on" ? "off" : "on";
      } finally {
        row.statusLoading = false;
      }
    };
    const confirmDelete = (row) => {
      if (row.product_count > 0) return ElMessageBox.alert(`\u5206\u7C7B\u4E0B\u6709 ${row.product_count} \u5546\u54C1\uFF0C\u65E0\u6CD5\u5220\u9664`, "\u63D0\u793A");
      ElMessageBox.confirm(`\u786E\u8BA4\u5220\u9664\u5206\u7C7B "${row.name}"?`, "\u8B66\u544A", { type: "warning" }).then(async () => {
        const res = await adminCategoryApi.deleteCategory(row.id);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
          loadCategories();
        } else ElMessage.error(res.error);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_icon = ElIcon;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-page" }, _attrs))} data-v-8b4cde00>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u62D6\u62FD\u8868\u683C\u884C\u53EF\u8C03\u6574\u5206\u7C7B\u6392\u5E8F",
        type: "info"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadCategories,
              icon: unref(refresh_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: openAddDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6DFB\u52A0\u5546\u54C1\u5206\u7C7B`);
                } else {
                  return [
                    createTextVNode("\u6DFB\u52A0\u5546\u54C1\u5206\u7C7B")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: loadCategories,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("\u6DFB\u52A0\u5546\u54C1\u5206\u7C7B")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        ref_key: "adminTableRef",
        ref: adminTableRef,
        data: categories2.value,
        loading: loading.value,
        "row-key": "id"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              width: "60",
              align: "center"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(rank_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(rank_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(rank_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="drag-handle" data-v-8b4cde00${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(rank_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(rank_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "drag-handle" }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(rank_default))
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "\u5206\u7C7B\u540D\u79F0",
              "min-width": "200"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6392\u5E8F",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ $index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: "info",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate($index + 1)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString($index + 1), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: "info",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($index + 1), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5546\u54C1\u6570",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, { effect: "plain" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.product_count || 0)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.product_count || 0), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, { effect: "plain" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.product_count || 0), 1)
                      ]),
                      _: 2
                    }, 1024)
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
                    "active-value": "on",
                    "inactive-value": "off",
                    loading: row.statusLoading,
                    onChange: ($event) => handleStatusChange(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "active-value": "on",
                      "inactive-value": "off",
                      loading: row.statusLoading,
                      onChange: ($event) => handleStatusChange(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "170",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(new Date(row.created_at).toLocaleString("zh-CN"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString("zh-CN")), 1)
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
                    onClick: ($event) => openEditDialog(row)
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
                    onClick: ($event) => confirmDelete(row)
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
                      onClick: ($event) => openEditDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
                      onClick: ($event) => confirmDelete(row)
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
                width: "60",
                align: "center"
              }, {
                header: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(rank_default))
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "drag-handle" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(rank_default))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "\u5206\u7C7B\u540D\u79F0",
                "min-width": "200"
              }),
              createVNode(_component_el_table_column, {
                label: "\u6392\u5E8F",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ $index }) => [
                  createVNode(_component_el_tag, {
                    type: "info",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($index + 1), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5546\u54C1\u6570",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, { effect: "plain" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.product_count || 0), 1)
                    ]),
                    _: 2
                  }, 1024)
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
                    "active-value": "on",
                    "inactive-value": "off",
                    loading: row.statusLoading,
                    onChange: ($event) => handleStatusChange(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(new Date(row.created_at).toLocaleString("zh-CN")), 1)
                ]),
                _: 2
              }, 1024),
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
                    onClick: ($event) => openEditDialog(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    onClick: ($event) => confirmDelete(row)
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
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: isEdit.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u6DFB\u52A0\u5206\u7C7B",
        loading: submitting.value,
        onConfirm: submitForm,
        onClosed: resetForm
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u540D\u79F0",
                    prop: "name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.name,
                            "onUpdate:modelValue": ($event) => form.name = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(ssrRenderComponent(_component_el_radio_group, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_radio, { value: "on" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u542F\u7528`);
                                  } else {
                                    return [
                                      createTextVNode("\u542F\u7528")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_radio, { value: "off" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u505C\u7528`);
                                  } else {
                                    return [
                                      createTextVNode("\u505C\u7528")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_radio, { value: "on" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u542F\u7528")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { value: "off" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u505C\u7528")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_radio_group, {
                            modelValue: form.status,
                            "onUpdate:modelValue": ($event) => form.status = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "on" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u542F\u7528")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "off" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u505C\u7528")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u540D\u79F0",
                      prop: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.name,
                          "onUpdate:modelValue": ($event) => form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u72B6\u6001",
                      prop: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_radio_group, {
                          modelValue: form.status,
                          "onUpdate:modelValue": ($event) => form.status = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_radio, { value: "on" }, {
                              default: withCtx(() => [
                                createTextVNode("\u542F\u7528")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_radio, { value: "off" }, {
                              default: withCtx(() => [
                                createTextVNode("\u505C\u7528")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u540D\u79F0",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.name,
                        "onUpdate:modelValue": ($event) => form.name = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u72B6\u6001",
                    prop: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio_group, {
                        modelValue: form.status,
                        "onUpdate:modelValue": ($event) => form.status = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio, { value: "on" }, {
                            default: withCtx(() => [
                              createTextVNode("\u542F\u7528")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_radio, { value: "off" }, {
                            default: withCtx(() => [
                              createTextVNode("\u505C\u7528")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b4cde00"]]);

export { categories as default };
//# sourceMappingURL=categories-BJoiUj_8.mjs.map
