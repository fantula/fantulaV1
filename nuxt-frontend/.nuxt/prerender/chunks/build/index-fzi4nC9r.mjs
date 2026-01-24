import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTableColumn } from './index-KOxrtlML.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElSwitch } from './index-CpWtG_dp.mjs';
import { _ as _export_sfc, b9 as refresh_default, p as plus_default, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { b as adminApi } from './admin-supabase-nszo-IoU.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { B as BulkActionBar } from './BulkActionBar-DNKbMSDo.mjs';
import { A as AdminDataTable } from './AdminDataTable-CCOHgBz_.mjs';
import { C as CouponCodeGenerator, a as CouponCodeDrawer, _ as _sfc_main$1 } from './CouponCodeEditor-B1o5QLLB.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
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
import './validator-T0bsmJHo.mjs';
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
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';
import './index-DvOrIhmd.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-QnhSR2oe.mjs';
import './index-DKY_z0U1.mjs';
import './index-cR1ntQxK.mjs';
import './index-Cf_t59lc.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-Bf1ETwA6.mjs';
import './index-ClPmkyX9.mjs';
import './index-DCrMmn3b.mjs';
import './index-I18rzBgu.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './index-DghwLlHw.mjs';
import './index-BrFCEoKQ.mjs';
import './index-j17drbdQ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import './index-iY4Ojb3q.mjs';
import './index-DOE061f1.mjs';
import './index-4Qac4SKg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/dayjs.min.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatDate, formatPrice } = useBizFormat();
    const router = useRouter();
    const loading = ref(false);
    const list = ref([]);
    const total = ref(0);
    const selectedIds = ref([]);
    const showGenerator = ref(false);
    const currentCoupon = ref(null);
    const viewCodesDialog = reactive({
      visible: false,
      couponId: "",
      couponName: ""
    });
    const codeEditorDialog = reactive({
      visible: false,
      coupon: null
    });
    const loadList = async () => {
      loading.value = true;
      try {
        const res = await adminApi.coupon.getCoupons({ type: "product" });
        if (res.success) {
          list.value = res.coupons.map((item) => ({ ...item, statusLoading: false }));
          total.value = res.total || list.value.length;
        }
      } catch (e) {
        ElMessage.error("\u52A0\u8F7D\u5F02\u5E38");
      } finally {
        loading.value = false;
      }
    };
    const handleCreate = () => {
      router.push("/_mgmt_9Xfa3/coupons/product/post");
    };
    const handleEdit = (row) => {
      router.push(`/_mgmt_9Xfa3/coupons/product/post?id=${row.id}`);
    };
    const handleGenerate = (row) => {
      currentCoupon.value = row;
      showGenerator.value = true;
    };
    const handleViewCodes = (row) => {
      viewCodesDialog.couponId = row.id;
      viewCodesDialog.couponName = row.name;
      viewCodesDialog.visible = true;
    };
    const handleEditCode = (row) => {
      codeEditorDialog.coupon = row;
      codeEditorDialog.visible = true;
    };
    const handleSelectionChange = (selection) => {
      selectedIds.value = selection.map((item) => item.id);
    };
    const handleBulkDelete = () => {
      if (!selectedIds.value.length) return;
      ElMessageBox.confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9009\u4E2D\u7684 ${selectedIds.value.length} \u4E2A\u4F18\u60E0\u5238\u5417\uFF1F`, "\u6279\u91CF\u5220\u9664", {
        type: "warning"
      }).then(async () => {
        let successCount = 0;
        for (const id of selectedIds.value) {
          const res = await adminApi.coupon.deleteCoupon(id);
          if (res.success) successCount++;
        }
        ElMessage.success(`\u6210\u529F\u5220\u9664 ${successCount} \u4E2A\u4F18\u60E0\u5238`);
        loadList();
        selectedIds.value = [];
      });
    };
    const toggleStatus = async (row) => {
      row.statusLoading = true;
      try {
        const res = await adminApi.coupon.toggleStatus(row.id, row.status);
        if (res.success) {
          ElMessage.success(`\u5DF2${row.status ? "\u542F\u7528" : "\u505C\u7528"}`);
        } else {
          row.status = !row.status;
          ElMessage.error(res.error || "\u64CD\u4F5C\u5931\u8D25");
        }
      } catch (e) {
        row.status = !row.status;
      } finally {
        row.statusLoading = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-product-list" }, _attrs))} data-v-3436345f>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u6307\u5B9A\u5546\u54C1\u5238",
        description: "\u7BA1\u7406\u7279\u5B9A\u5546\u54C1\u4E13\u7528\u7684\u4F18\u60E0\u5238\uFF0C\u7528\u6237\u8D2D\u4E70\u6307\u5B9A\u5546\u54C1\u65F6\u53EF\u4EAB\u53D7\u4F18\u60E0\u3002"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: loadList
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
              onClick: handleCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u65B0\u589E\u6307\u5B9A\u5546\u54C1\u5238`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u6307\u5B9A\u5546\u54C1\u5238")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: loadList
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: handleCreate
              }, {
                default: withCtx(() => [
                  createTextVNode("\u65B0\u589E\u6307\u5B9A\u5546\u54C1\u5238")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (selectedIds.value.length > 0) {
        _push(ssrRenderComponent(BulkActionBar, {
          count: selectedIds.value.length,
          onDelete: handleBulkDelete
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataTable, mergeProps({
        data: list.value,
        onSelectionChange: handleSelectionChange
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "50",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u540D\u79F0",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="code-info" data-v-3436345f${_scopeId2}><div class="code-name" data-v-3436345f${_scopeId2}>${ssrInterpolate(row.name)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "code-info" }, [
                      createVNode("div", { class: "code-name" }, toDisplayString(row.name), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5173\u8054\u5546\u54C1",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.sku_ids && row.sku_ids.length) {
                    _push3(`<div class="product-tags" data-v-3436345f${_scopeId2}><!--[-->`);
                    ssrRenderList(row.sku_ids.slice(0, 3), (sid) => {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        key: sid,
                        size: "small",
                        effect: "plain",
                        class: "product-tag"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` SKU: ${ssrInterpolate(sid.slice(0, 6))}... `);
                          } else {
                            return [
                              createTextVNode(" SKU: " + toDisplayString(sid.slice(0, 6)) + "... ", 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (row.sku_ids.length > 3) {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`+${ssrInterpolate(row.sku_ids.length - 3)}`);
                          } else {
                            return [
                              createTextVNode("+" + toDisplayString(row.sku_ids.length - 3), 1)
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
                    _push3(`<span class="text-secondary" data-v-3436345f${_scopeId2}>\u65E0\u5173\u8054\u5546\u54C1</span>`);
                  }
                } else {
                  return [
                    row.sku_ids && row.sku_ids.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "product-tags"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.sku_ids.slice(0, 3), (sid) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: sid,
                          size: "small",
                          effect: "plain",
                          class: "product-tag"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" SKU: " + toDisplayString(sid.slice(0, 6)) + "... ", 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      row.sku_ids.length > 3 ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("+" + toDisplayString(row.sku_ids.length - 3), 1)
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-secondary"
                    }, "\u65E0\u5173\u8054\u5546\u54C1"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7ACB\u51CF\u91D1\u989D",
              width: "120",
              align: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-3436345f${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.value))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.value)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6709\u6548\u671F",
              width: "200",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row.end_date) {
                    _push3(`<div class="validity-tag" data-v-3436345f${_scopeId2}>\u6C38\u4E45\u6709\u6548</div>`);
                  } else {
                    _push3(`<div class="validity-range" data-v-3436345f${_scopeId2}><div data-v-3436345f${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.end_date))} \u5230\u671F</div></div>`);
                  }
                } else {
                  return [
                    !row.end_date ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "validity-tag"
                    }, "\u6C38\u4E45\u6709\u6548")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "validity-range"
                    }, [
                      createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)) + " \u5230\u671F", 1)
                    ]))
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
                    "inline-prompt": "",
                    "active-text": "\u542F\u7528",
                    "inactive-text": "\u505C\u7528",
                    loading: row.statusLoading,
                    onChange: ($event) => toggleStatus(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "inline-prompt": "",
                      "active-text": "\u542F\u7528",
                      "inactive-text": "\u505C\u7528",
                      loading: row.statusLoading,
                      onChange: ($event) => toggleStatus(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              width: "260",
              align: "center",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleEdit(row)
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
                    type: "success",
                    onClick: ($event) => handleGenerate(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u53D1\u5238`);
                      } else {
                        return [
                          createTextVNode("\u53D1\u5238")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleEditCode(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u8BF4\u660E`);
                      } else {
                        return [
                          createTextVNode("\u8BF4\u660E")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => handleViewCodes(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u8BE6\u60C5`);
                      } else {
                        return [
                          createTextVNode("\u8BE6\u60C5")
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
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "success",
                      onClick: ($event) => handleGenerate(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u53D1\u5238")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "warning",
                      onClick: ($event) => handleEditCode(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u8BF4\u660E")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "info",
                      onClick: ($event) => handleViewCodes(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u8BE6\u60C5")
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
                type: "selection",
                width: "50",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                label: "\u540D\u79F0",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "code-info" }, [
                    createVNode("div", { class: "code-name" }, toDisplayString(row.name), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5173\u8054\u5546\u54C1",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  row.sku_ids && row.sku_ids.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "product-tags"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.sku_ids.slice(0, 3), (sid) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: sid,
                        size: "small",
                        effect: "plain",
                        class: "product-tag"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" SKU: " + toDisplayString(sid.slice(0, 6)) + "... ", 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    row.sku_ids.length > 3 ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("+" + toDisplayString(row.sku_ids.length - 3), 1)
                      ]),
                      _: 2
                    }, 1024)) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-secondary"
                  }, "\u65E0\u5173\u8054\u5546\u54C1"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u7ACB\u51CF\u91D1\u989D",
                width: "120",
                align: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.value)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u6709\u6548\u671F",
                width: "200",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  !row.end_date ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "validity-tag"
                  }, "\u6C38\u4E45\u6709\u6548")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "validity-range"
                  }, [
                    createVNode("div", null, toDisplayString(unref(formatDate)(row.end_date)) + " \u5230\u671F", 1)
                  ]))
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
                    "inline-prompt": "",
                    "active-text": "\u542F\u7528",
                    "inactive-text": "\u505C\u7528",
                    loading: row.statusLoading,
                    onChange: ($event) => toggleStatus(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "260",
                align: "center",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "success",
                    onClick: ($event) => handleGenerate(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D1\u5238")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "warning",
                    onClick: ($event) => handleEditCode(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8BF4\u660E")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "info",
                    onClick: ($event) => handleViewCodes(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8BE6\u60C5")
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
      _push(ssrRenderComponent(CouponCodeGenerator, {
        modelValue: showGenerator.value,
        "onUpdate:modelValue": ($event) => showGenerator.value = $event,
        coupon: currentCoupon.value
      }, null, _parent));
      _push(ssrRenderComponent(CouponCodeDrawer, {
        modelValue: viewCodesDialog.visible,
        "onUpdate:modelValue": ($event) => viewCodesDialog.visible = $event,
        "coupon-id": viewCodesDialog.couponId,
        "coupon-name": viewCodesDialog.couponName
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: codeEditorDialog.visible,
        "onUpdate:modelValue": ($event) => codeEditorDialog.visible = $event,
        coupon: codeEditorDialog.coupon,
        onSaved: loadList
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/coupons/product/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3436345f"]]);

export { index as default };
//# sourceMappingURL=index-fzi4nC9r.mjs.map
