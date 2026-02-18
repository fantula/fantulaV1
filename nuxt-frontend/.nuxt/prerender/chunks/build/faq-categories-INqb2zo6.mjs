import { E as ElButton } from './index-CXu9YNCC.mjs';
import { E as ElTableColumn } from './index-D6Ug0Zge.mjs';
import { E as ElTag } from './index-2JZmBUf1.mjs';
import { E as ElForm, a as ElFormItem } from './index-BYu6jnca.mjs';
import { E as ElInput } from './index-BeH2PDwZ.mjs';
import { E as ElInputNumber } from './index-BN7OybSS.mjs';
import { E as ElSwitch } from './index-ByWmxDYy.mjs';
import { E as ElDialog } from './index-BYF0U8gS.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { p as plus_default, aB as sort_default } from './index-DNnPa_Q9.mjs';
import draggable from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vuedraggable/dist/vuedraggable.umd.min.js';
import { a as adminFaqApi } from './help-center-d-ts0aZv.mjs';
import { P as PageTipHeader } from './PageTipHeader-DurXbUjx.mjs';
import { A as AdminActionCard } from './AdminActionCard-C3u4R3C6.mjs';
import { A as AdminDataTable } from './AdminDataTable-B-yPQpXr.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-C7G4EUwl.mjs';
import { u as useAdminDialog, a as confirmDelete } from './useAdminDialog-LVLqZ-7L.mjs';
import { u as useBizFormat } from './useBizFormat-DFfhmR3x.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './icon-Ck0_dGQP.mjs';
import './index-DbvZsXcZ.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './objects-Bz74KHmq.mjs';
import './use-form-item-D2hCqQW8.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-BAMVq552.mjs';
import './index-Cxdfotkm.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-bphs7bB3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-ByGmkA5C.mjs';
import './event-D3FEo2C5.mjs';
import './aria-Rs9hkxop.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './index-NROOS5rD.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './typescript-D6L75muK.mjs';
import './index-DuyRWKSc.mjs';
import './index-D3BlhKEk.mjs';
import './validator-BZYOvvAA.mjs';
import './index-IoXmILvB.mjs';
import './vnode-uc6o_sOa.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-BrJcxSwt.mjs';
import './scroll-BEbqb1sm.mjs';
import './supabase-F2pQZHm6.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
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
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './index-BC7fiCUI.mjs';
import './index-CD49T52w.mjs';
import './index-BRSsuUkY.mjs';
import './index-D9RjcsL2.mjs';
import './index-B_mQW-wd.mjs';
import './strings-D1uxkXhq.mjs';
import './index-C8YaaWrc.mjs';
import './directive-BHLqqXUb.mjs';
import './index-VfPbkY7T.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq-categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const categories = ref([]);
    const { formatDate } = useBizFormat();
    const sortDialogVisible = ref(false);
    const sortList = ref([]);
    const savingSort = ref(false);
    const fetchCategories = async () => {
      loading.value = true;
      const res = await adminFaqApi.getCategories();
      if (res.success) {
        categories.value = res.categories || [];
      }
      loading.value = false;
    };
    const dialog = useAdminDialog({
      id: "",
      name: "",
      sort_order: 0,
      is_active: true,
      is_checkout_visible: false
    }, {
      onSubmit: async (form, isEdit) => {
        if (!form.name) {
          ElMessage.warning("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0");
          return { success: false };
        }
        let res;
        if (isEdit) {
          res = await adminFaqApi.updateCategory(form.id, {
            name: form.name,
            sort_order: form.sort_order,
            is_active: form.is_active,
            is_checkout_visible: form.is_checkout_visible
          });
        } else {
          res = await adminFaqApi.createCategory({
            name: form.name,
            sort_order: form.sort_order,
            is_checkout_visible: form.is_checkout_visible
          });
        }
        if (res.error) {
          return { success: false, error: res.error.message || String(res.error) };
        }
        return { success: true };
      },
      onSuccess: async () => {
        await fetchCategories();
        ElMessage.success(dialog.isEdit.value ? "\u66F4\u65B0\u6210\u529F" : "\u521B\u5EFA\u6210\u529F");
      }
    });
    const formRef = dialog.formRef;
    const handleDelete = async (row) => {
      await confirmDelete(
        "\u786E\u5B9A\u8981\u5220\u9664\u6B64\u5206\u7C7B\u5417\uFF1F",
        async () => {
          const res = await adminFaqApi.deleteCategory(row.id);
          if (res.error) {
            throw new Error(res.error.message || String(res.error));
          }
          await fetchCategories();
          return { success: true };
        }
      );
    };
    const openSortDialog = () => {
      sortList.value = JSON.parse(JSON.stringify(categories.value));
      sortDialogVisible.value = true;
    };
    const saveSort = async () => {
      savingSort.value = true;
      try {
        const updates = sortList.value.map((item, index) => {
          const newOrder = index * 10;
          if (item.sort_order !== newOrder) {
            return adminFaqApi.updateCategory(item.id, { sort_order: newOrder });
          }
          return null;
        }).filter((p) => p !== null);
        if (updates.length > 0) {
          await Promise.all(updates);
          ElMessage.success(`\u5DF2\u66F4\u65B0 ${updates.length} \u4E2A\u5206\u7C7B\u7684\u987A\u5E8F`);
        } else {
          ElMessage.info("\u987A\u5E8F\u672A\u53D1\u751F\u53D8\u5316");
        }
        sortDialogVisible.value = false;
        fetchCategories();
      } catch (e) {
        ElMessage.error("\u6392\u5E8F\u4FDD\u5B58\u5931\u8D25: " + e.message);
      } finally {
        savingSort.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_input_number = ElInputNumber;
      const _component_el_switch = ElSwitch;
      const _component_el_dialog = ElDialog;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-b87a47c0>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u95EE\u9898\u5206\u7C7B",
        description: "\u7BA1\u7406\u5E38\u89C1\u95EE\u9898\uFF08FAQ\uFF09\u7684\u5206\u7C7B\u7ED3\u6784\u3002"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => unref(dialog).openAdd()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u65B0\u589E\u5206\u7C7B`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u5206\u7C7B")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(sort_default),
              onClick: openSortDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u8C03\u6574\u6392\u5E8F`);
                } else {
                  return [
                    createTextVNode("\u8C03\u6574\u6392\u5E8F")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: ($event) => unref(dialog).openAdd()
              }, {
                default: withCtx(() => [
                  createTextVNode("\u65B0\u589E\u5206\u7C7B")
                ]),
                _: 1
              }, 8, ["icon", "onClick"]),
              createVNode(_component_el_button, {
                icon: unref(sort_default),
                onClick: openSortDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("\u8C03\u6574\u6392\u5E8F")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: categories.value,
        loading: loading.value,
        "show-pagination": false,
        class: "mt-4",
        "row-key": "id"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "sort_order",
              label: "\u6392\u5E8F",
              width: "100",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "\u5206\u7C7B\u540D\u79F0"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.is_active) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "success",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u542F\u7528`);
                        } else {
                          return [
                            createTextVNode("\u542F\u7528")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "info",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u7981\u7528`);
                        } else {
                          return [
                            createTextVNode("\u7981\u7528")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.is_active ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: "success",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u542F\u7528")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7981\u7528")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7ED3\u7B97\u9875\u663E\u793A",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.is_checkout_visible) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u663E\u793A`);
                        } else {
                          return [
                            createTextVNode("\u663E\u793A")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "info",
                      size: "small",
                      effect: "plain"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u9690\u85CF`);
                        } else {
                          return [
                            createTextVNode("\u9690\u85CF")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.is_checkout_visible ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u663E\u793A")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "info",
                      size: "small",
                      effect: "plain"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u9690\u85CF")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "created_at",
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatDate)(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              width: "180",
              align: "center",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    link: "",
                    size: "small",
                    onClick: ($event) => unref(dialog).openEdit(row)
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
                    type: "danger",
                    link: "",
                    size: "small",
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
                      type: "primary",
                      link: "",
                      size: "small",
                      onClick: ($event) => unref(dialog).openEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "danger",
                      link: "",
                      size: "small",
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
                prop: "sort_order",
                label: "\u6392\u5E8F",
                width: "100",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "\u5206\u7C7B\u540D\u79F0"
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.is_active ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "success",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u542F\u7528")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7981\u7528")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u7ED3\u7B97\u9875\u663E\u793A",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.is_checkout_visible ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "warning",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u663E\u793A")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "info",
                    size: "small",
                    effect: "plain"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u9690\u85CF")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "created_at",
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "200"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "180",
                align: "center",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    link: "",
                    size: "small",
                    onClick: ($event) => unref(dialog).openEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "danger",
                    link: "",
                    size: "small",
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
        title: unref(dialog).isEdit.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u65B0\u589E\u5206\u7C7B",
        loading: unref(dialog).loading.value,
        onConfirm: unref(dialog).submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              ref_key: "formRef",
              ref: formRef,
              model: unref(dialog).form,
              "label-width": "110px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u5206\u7C7B\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.name,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input_number, {
                            modelValue: unref(dialog).form.sort_order,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                            min: 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(dialog).isEdit.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u542F\u7528\u72B6\u6001" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_switch, {
                            modelValue: unref(dialog).form.is_active,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_switch, {
                              modelValue: unref(dialog).form.is_active,
                              "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u7ED3\u7B97\u9875\u663E\u793A" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: unref(dialog).form.is_checkout_visible,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip text-gray-400 text-xs mt-1" data-v-b87a47c0${_scopeId3}>\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002</div>`);
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: unref(dialog).form.is_checkout_visible,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip text-gray-400 text-xs mt-1" }, "\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u5206\u7C7B\u540D\u79F0",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input_number, {
                          modelValue: unref(dialog).form.sort_order,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                          min: 0
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    unref(dialog).isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "\u542F\u7528\u72B6\u6001"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: unref(dialog).form.is_active,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_form_item, { label: "\u7ED3\u7B97\u9875\u663E\u793A" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_switch, {
                          modelValue: unref(dialog).form.is_checkout_visible,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip text-gray-400 text-xs mt-1" }, "\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002")
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
                ref_key: "formRef",
                ref: formRef,
                model: unref(dialog).form,
                "label-width": "110px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u5206\u7C7B\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.name,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input_number, {
                        modelValue: unref(dialog).form.sort_order,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.sort_order = $event,
                        min: 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  unref(dialog).isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "\u542F\u7528\u72B6\u6001"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: unref(dialog).form.is_active,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.is_active = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, { label: "\u7ED3\u7B97\u9875\u663E\u793A" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_switch, {
                        modelValue: unref(dialog).form.is_checkout_visible,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.is_checkout_visible = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip text-gray-400 text-xs mt-1" }, "\u5F00\u542F\u540E\uFF0C\u8BE5\u5206\u7C7B\u4E0B\u7684\u95EE\u9898\u5C06\u663E\u793A\u5728\u7ED3\u7B97\u754C\u9762\u3002")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: sortDialogVisible.value,
        "onUpdate:modelValue": ($event) => sortDialogVisible.value = $event,
        title: "\u8C03\u6574\u5206\u7C7B\u987A\u5E8F",
        width: "500px",
        "append-to-body": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-b87a47c0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => sortDialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u53D6\u6D88`);
                } else {
                  return [
                    createTextVNode("\u53D6\u6D88")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: saveSort,
              loading: savingSort.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u4FDD\u5B58\u6392\u5E8F`);
                } else {
                  return [
                    createTextVNode("\u4FDD\u5B58\u6392\u5E8F")
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
                  onClick: ($event) => sortDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: saveSort,
                  loading: savingSort.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u4FDD\u5B58\u6392\u5E8F")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sort-tip text-gray-400 text-sm mb-2" data-v-b87a47c0${_scopeId}> \u63D0\u793A\uFF1A\u62D6\u62FD\u5217\u8868\u9879\u8FDB\u884C\u6392\u5E8F\uFF0C\u70B9\u51FB\u4FDD\u5B58\u540E\u751F\u6548\u3002 </div><div class="sort-container" data-v-b87a47c0${_scopeId}>`);
            _push2(ssrRenderComponent(unref(draggable), {
              modelValue: sortList.value,
              "onUpdate:modelValue": ($event) => sortList.value = $event,
              "item-key": "id",
              animation: "200",
              handle: ".drag-handle",
              "ghost-class": "ghost-item"
            }, {
              item: withCtx(({ element, index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="sort-item" data-v-b87a47c0${_scopeId2}><div class="drag-handle" data-v-b87a47c0${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(sort_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(sort_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="sort-content" data-v-b87a47c0${_scopeId2}><span class="sort-name" data-v-b87a47c0${_scopeId2}>${ssrInterpolate(element.name)}</span>`);
                  _push3(ssrRenderComponent(_component_el_tag, {
                    size: "small",
                    type: "info"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(index * 10)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(index * 10), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "sort-item" }, [
                      createVNode("div", { class: "drag-handle" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(sort_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "sort-content" }, [
                        createVNode("span", { class: "sort-name" }, toDisplayString(element.name), 1),
                        createVNode(_component_el_tag, {
                          size: "small",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(index * 10), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "sort-tip text-gray-400 text-sm mb-2" }, " \u63D0\u793A\uFF1A\u62D6\u62FD\u5217\u8868\u9879\u8FDB\u884C\u6392\u5E8F\uFF0C\u70B9\u51FB\u4FDD\u5B58\u540E\u751F\u6548\u3002 "),
              createVNode("div", { class: "sort-container" }, [
                createVNode(unref(draggable), {
                  modelValue: sortList.value,
                  "onUpdate:modelValue": ($event) => sortList.value = $event,
                  "item-key": "id",
                  animation: "200",
                  handle: ".drag-handle",
                  "ghost-class": "ghost-item"
                }, {
                  item: withCtx(({ element, index }) => [
                    createVNode("div", { class: "sort-item" }, [
                      createVNode("div", { class: "drag-handle" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(sort_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "sort-content" }, [
                        createVNode("span", { class: "sort-name" }, toDisplayString(element.name), 1),
                        createVNode(_component_el_tag, {
                          size: "small",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(index * 10), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/help-center/faq-categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faqCategories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b87a47c0"]]);

export { faqCategories as default };
//# sourceMappingURL=faq-categories-INqb2zo6.mjs.map
