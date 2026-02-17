import { E as ElInput } from './index-Q1HnLtiN.mjs';
import { E as ElIcon } from './index-C4aUwruK.mjs';
import { E as ElSelect, a as ElOption } from './index-lNg7AKkv.mjs';
import { E as ElButton } from './index-BmUjCntg.mjs';
import { E as ElTableColumn } from './index-Bx8hctOV.mjs';
import { E as ElTag } from './index-BwbEmU3g.mjs';
import { E as ElPopconfirm } from './index-Bkf5Hji0.mjs';
import { E as ElDialog } from './index-Bc7gqtRm.mjs';
import { E as ElForm, a as ElFormItem } from './index-C-iEkQSR.mjs';
import { E as ElAlert } from './index-BkMjcDuB.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, withKeys, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { p as plus_default, U as refresh_default, af as search_default } from './index-CCIZH4aC.mjs';
import dayjs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/dayjs.min.js';
import { g as getAdminSupabaseClient } from './supabase-admin-C2P8hOJs.mjs';
import { A as AdminActionCard } from './AdminActionCard-l7l1Gr-n.mjs';
import { A as AdminDataTable } from './AdminDataTable-D1_qu9TL.mjs';
import { E as ElMessage } from './index-CIurcsSv.mjs';
import { _ as _export_sfc } from './server.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CadSVx0p.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './index-C1njJNPQ.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './event-D3FEo2C5.mjs';
import './index-DuyRWKSc.mjs';
import './use-form-item-BJm4fR6K.mjs';
import './constants-hAKFmBbq.mjs';
import './aria-Rs9hkxop.mjs';
import './objects-Bz74KHmq.mjs';
import './index-CLY1HctY.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-DHEUW9kI.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './index-CKAw5W0O.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-ozMyDWSO.mjs';
import './raf-CQRaPAjg.mjs';
import './index-C8YaaWrc.mjs';
import './vnode-uc6o_sOa.mjs';
import './use-global-config-CaR6i8cb.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-7dcjom-z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './index-BxcbCFKt.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-COtmEGfB.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import './index-CMbz_fag.mjs';
import './index-bbvp9z3V.mjs';
import './index-_mZ_Kpkf.mjs';
import './directive-DYMvUrfr.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "channel-recognition",
  __ssrInlineRender: true,
  setup(__props) {
    const client = getAdminSupabaseClient();
    const loading = ref(false);
    const tableData = ref([]);
    const searchQuery = ref("");
    const filterStatus = ref("unbound");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const bindModalVisible = ref(false);
    const currentRow = ref(null);
    const selectedCategoryId = ref(null);
    const selectedProductId = ref(null);
    const categoryList = ref([]);
    const productList = ref([]);
    const saving = ref(false);
    const batchModalVisible = ref(false);
    const batchInput = ref("");
    const batchAdding = ref(false);
    const fetchData = async () => {
      loading.value = true;
      try {
        let query = client.from("channel_recognitions").select("*, products(id, product_name)", { count: "exact" }).order("created_at", { ascending: false }).range((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value - 1);
        if (searchQuery.value) {
          query = query.ilike("channel_key", `%${searchQuery.value}%`);
        }
        if (filterStatus.value === "unbound") {
          query = query.is("product_id", null);
        } else if (filterStatus.value === "bound") {
          query = query.not("product_id", "is", null);
        }
        const { data, count, error } = await query;
        if (error) throw error;
        tableData.value = data || [];
        total.value = count || 0;
      } catch (err) {
        ElMessage.error("\u52A0\u8F7D\u5931\u8D25: " + err.message);
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (date) => {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    };
    const handleDelete = async (row) => {
      try {
        const { error } = await client.from("channel_recognitions").delete().eq("id", row.id);
        if (error) throw error;
        ElMessage.success("\u5220\u9664\u6210\u529F");
        fetchData();
      } catch (err) {
        ElMessage.error("\u5220\u9664\u5931\u8D25: " + err.message);
      }
    };
    const openBindModal = (row) => {
      currentRow.value = row;
      selectedCategoryId.value = null;
      selectedProductId.value = null;
      productList.value = [];
      if (row.product_id && row.products) {
        fetchProductDetails(row.product_id);
      }
      bindModalVisible.value = true;
    };
    const fetchProductDetails = async (productId) => {
      const { data } = await client.from("products").select("category_id").eq("id", productId).single();
      if (data) {
        selectedCategoryId.value = data.category_id;
        await handleCategoryChange(data.category_id);
        selectedProductId.value = productId;
      }
    };
    const handleCategoryChange = async (catId) => {
      selectedCategoryId.value = catId;
      selectedProductId.value = null;
      if (!catId) {
        productList.value = [];
        return;
      }
      const { data } = await client.from("products").select("id, product_name").eq("category_id", catId).eq("status", "on").order("sort_order", { ascending: true });
      productList.value = data || [];
    };
    const handleSaveBind = async () => {
      if (!selectedProductId.value) return;
      saving.value = true;
      try {
        const { error } = await client.from("channel_recognitions").update({
          product_id: selectedProductId.value,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", currentRow.value.id);
        if (error) throw error;
        ElMessage.success("\u7ED1\u5B9A\u6210\u529F");
        bindModalVisible.value = false;
        fetchData();
      } catch (err) {
        ElMessage.error("\u4FDD\u5B58\u5931\u8D25: " + err.message);
      } finally {
        saving.value = false;
      }
    };
    const handleBatchAdd = async () => {
      if (!batchInput.value.trim()) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u5185\u5BB9");
        return;
      }
      batchAdding.value = true;
      try {
        const rawLines = batchInput.value.split("\n");
        const uniqueKeys = /* @__PURE__ */ new Set();
        rawLines.forEach((line) => {
          let key = line.trim().toLowerCase();
          if (!key) return;
          if (!key.startsWith("@")) key = "@" + key;
          uniqueKeys.add(key);
        });
        if (uniqueKeys.size === 0) {
          ElMessage.warning("\u6CA1\u6709\u6709\u6548\u7684\u9891\u9053\u6807\u8BC6");
          return;
        }
        const payload = Array.from(uniqueKeys).map((key) => ({
          channel_key: key
          // product_id is null by default
        }));
        const { error } = await client.from("channel_recognitions").upsert(payload, { onConflict: "channel_key", ignoreDuplicates: true });
        if (error) throw error;
        ElMessage.success(`\u64CD\u4F5C\u5B8C\u6210\uFF1A\u5904\u7406 ${payload.length} \u6761\u8BB0\u5F55`);
        batchModalVisible.value = false;
        batchInput.value = "";
        fetchData();
      } catch (err) {
        ElMessage.error("\u6279\u91CF\u751F\u6210\u5931\u8D25: " + err.message);
      } finally {
        batchAdding.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_popconfirm = ElPopconfirm;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "channel-recognition-page" }, _attrs))} data-v-b938ede0>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-b938ede0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              placeholder: "\u641C\u7D22\u9891\u9053\u6807\u8BC6...",
              style: { "width": "240px" },
              clearable: "",
              onClear: fetchData,
              onKeyup: fetchData
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(search_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(search_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filterStatus.value,
              "onUpdate:modelValue": ($event) => filterStatus.value = $event,
              placeholder: "\u72B6\u6001\u7B5B\u9009",
              style: { "width": "140px" },
              onChange: fetchData
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5168\u90E8",
                    value: "all"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5F85\u5904\u7406 (\u672A\u7ED1\u5B9A)",
                    value: "unbound"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5DF2\u5B8C\u6210 (\u5DF2\u7ED1\u5B9A)",
                    value: "bound"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "\u5168\u90E8",
                      value: "all"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5F85\u5904\u7406 (\u672A\u7ED1\u5B9A)",
                      value: "unbound"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u5B8C\u6210 (\u5DF2\u7ED1\u5B9A)",
                      value: "bound"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: fetchData
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u67E5\u8BE2`);
                } else {
                  return [
                    createTextVNode("\u67E5\u8BE2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-group" }, [
                createVNode(_component_el_input, {
                  modelValue: searchQuery.value,
                  "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                  placeholder: "\u641C\u7D22\u9891\u9053\u6807\u8BC6...",
                  style: { "width": "240px" },
                  clearable: "",
                  onClear: fetchData,
                  onKeyup: withKeys(fetchData, ["enter"])
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_select, {
                  modelValue: filterStatus.value,
                  "onUpdate:modelValue": ($event) => filterStatus.value = $event,
                  placeholder: "\u72B6\u6001\u7B5B\u9009",
                  style: { "width": "140px" },
                  onChange: fetchData
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "\u5168\u90E8",
                      value: "all"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5F85\u5904\u7406 (\u672A\u7ED1\u5B9A)",
                      value: "unbound"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u5B8C\u6210 (\u5DF2\u7ED1\u5B9A)",
                      value: "bound"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: fetchData
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u67E5\u8BE2")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "success",
              onClick: ($event) => batchModalVisible.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, { class: "el-icon--left" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(plus_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(plus_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` \u6279\u91CF\u6DFB\u52A0 `);
                } else {
                  return [
                    createVNode(_component_el_icon, { class: "el-icon--left" }, {
                      default: withCtx(() => [
                        createVNode(unref(plus_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" \u6279\u91CF\u6DFB\u52A0 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, { onClick: fetchData }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(refresh_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(refresh_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(refresh_default))
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
              createVNode(_component_el_button, {
                type: "success",
                onClick: ($event) => batchModalVisible.value = true
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, { class: "el-icon--left" }, {
                    default: withCtx(() => [
                      createVNode(unref(plus_default))
                    ]),
                    _: 1
                  }),
                  createTextVNode(" \u6279\u91CF\u6DFB\u52A0 ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, { onClick: fetchData }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_default))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: tableData.value,
        loading: loading.value,
        total: total.value,
        "current-page": currentPage.value,
        "onUpdate:currentPage": [($event) => currentPage.value = $event, fetchData],
        "page-size": pageSize.value,
        "onUpdate:pageSize": [($event) => pageSize.value = $event, fetchData]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "channel_key",
              label: "\u9891\u9053\u6807\u8BC6",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="channel-key" data-v-b938ede0${_scopeId2}>${ssrInterpolate(row.channel_key)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "channel-key" }, toDisplayString(row.channel_key), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7ED1\u5B9A\u5546\u54C1",
              "min-width": "250"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.products) {
                    _push3(`<div class="bound-product" data-v-b938ede0${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      type: "success"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5DF2\u7ED1\u5B9A`);
                        } else {
                          return [
                            createTextVNode("\u5DF2\u7ED1\u5B9A")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<span class="product-name"${ssrRenderAttr("title", row.products.product_name)} data-v-b938ede0${_scopeId2}>${ssrInterpolate(row.products.product_name)}</span></div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u672A\u7ED1\u5B9A`);
                        } else {
                          return [
                            createTextVNode("\u672A\u7ED1\u5B9A")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.products ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bound-product"
                    }, [
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "success"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5DF2\u7ED1\u5B9A")
                        ]),
                        _: 1
                      }),
                      createVNode("span", {
                        class: "product-name",
                        title: row.products.product_name
                      }, toDisplayString(row.products.product_name), 9, ["title"])
                    ])) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u672A\u7ED1\u5B9A")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
              width: "120"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: row.product_id ? "success" : "warning",
                    effect: "dark"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.product_id ? "\u5DF2\u5B8C\u6210" : "\u5F85\u5904\u7406")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.product_id ? "\u5DF2\u5B8C\u6210" : "\u5F85\u5904\u7406"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: row.product_id ? "success" : "warning",
                      effect: "dark"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.product_id ? "\u5DF2\u5B8C\u6210" : "\u5F85\u5904\u7406"), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatDate(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              width: "200",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openBindModal(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.product_id ? "\u4FEE\u6539\u5546\u54C1" : "\u7ED1\u5B9A\u5546\u54C1")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.product_id ? "\u4FEE\u6539\u5546\u54C1" : "\u7ED1\u5B9A\u5546\u54C1"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_popconfirm, {
                    title: "\u786E\u5B9A\u8981\u5F7B\u5E95\u5220\u9664\u8BE5\u8BB0\u5F55\u5417\uFF1F\u4E0B\u6B21\u7528\u6237\u641C\u7D22\u5C06\u91CD\u65B0\u751F\u6210\u3002",
                    "confirm-button-text": "\u5220\u9664",
                    "cancel-button-text": "\u53D6\u6D88",
                    onConfirm: ($event) => handleDelete(row)
                  }, {
                    reference: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "danger"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u5220\u9664`);
                            } else {
                              return [
                                createTextVNode("\u5220\u9664")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "danger"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u5220\u9664")
                            ]),
                            _: 1
                          })
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
                      onClick: ($event) => openBindModal(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.product_id ? "\u4FEE\u6539\u5546\u54C1" : "\u7ED1\u5B9A\u5546\u54C1"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: "\u786E\u5B9A\u8981\u5F7B\u5E95\u5220\u9664\u8BE5\u8BB0\u5F55\u5417\uFF1F\u4E0B\u6B21\u7528\u6237\u641C\u7D22\u5C06\u91CD\u65B0\u751F\u6210\u3002",
                      "confirm-button-text": "\u5220\u9664",
                      "cancel-button-text": "\u53D6\u6D88",
                      onConfirm: ($event) => handleDelete(row)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u5220\u9664")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onConfirm"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                prop: "channel_key",
                label: "\u9891\u9053\u6807\u8BC6",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "channel-key" }, toDisplayString(row.channel_key), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u7ED1\u5B9A\u5546\u54C1",
                "min-width": "250"
              }, {
                default: withCtx(({ row }) => [
                  row.products ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bound-product"
                  }, [
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "success"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5DF2\u7ED1\u5B9A")
                      ]),
                      _: 1
                    }),
                    createVNode("span", {
                      class: "product-name",
                      title: row.products.product_name
                    }, toDisplayString(row.products.product_name), 9, ["title"])
                  ])) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "warning",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u672A\u7ED1\u5B9A")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "120"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: row.product_id ? "success" : "warning",
                    effect: "dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.product_id ? "\u5DF2\u5B8C\u6210" : "\u5F85\u5904\u7406"), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "180"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "200",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => openBindModal(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.product_id ? "\u4FEE\u6539\u5546\u54C1" : "\u7ED1\u5B9A\u5546\u54C1"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_el_popconfirm, {
                    title: "\u786E\u5B9A\u8981\u5F7B\u5E95\u5220\u9664\u8BE5\u8BB0\u5F55\u5417\uFF1F\u4E0B\u6B21\u7528\u6237\u641C\u7D22\u5C06\u91CD\u65B0\u751F\u6210\u3002",
                    "confirm-button-text": "\u5220\u9664",
                    "cancel-button-text": "\u53D6\u6D88",
                    onConfirm: ($event) => handleDelete(row)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5220\u9664")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onConfirm"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: bindModalVisible.value,
        "onUpdate:modelValue": ($event) => bindModalVisible.value = $event,
        title: "\u7ED1\u5B9A\u5546\u54C1",
        width: "500px",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-b938ede0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => bindModalVisible.value = false
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
              onClick: handleSaveBind,
              loading: saving.value,
              disabled: !selectedProductId.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u4FDD\u5B58`);
                } else {
                  return [
                    createTextVNode("\u4FDD\u5B58")
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
                  onClick: ($event) => bindModalVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleSaveBind,
                  loading: saving.value,
                  disabled: !selectedProductId.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u4FDD\u5B58")
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, { "label-position": "top" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u5F53\u524D\u9891\u9053" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          "model-value": (_a = currentRow.value) == null ? void 0 : _a.channel_key,
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            "model-value": (_b = currentRow.value) == null ? void 0 : _b.channel_key,
                            disabled: ""
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u9009\u62E9\u5206\u7C7B" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: selectedCategoryId.value,
                          "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u5206\u7C7B",
                          style: { "width": "100%" },
                          onChange: handleCategoryChange
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(categoryList.value, (cat) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (cat) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: cat.id,
                                    label: cat.name,
                                    value: cat.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: selectedCategoryId.value,
                            "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                            placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u5206\u7C7B",
                            style: { "width": "100%" },
                            onChange: handleCategoryChange
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (cat) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: selectedProductId.value,
                          "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                          filterable: "",
                          disabled: !selectedCategoryId.value,
                          style: { "width": "100%" },
                          "no-data-text": "\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u5546\u54C1"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(productList.value, (item) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: item.id,
                                  label: item.product_name,
                                  value: item.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(productList.value, (item) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: item.id,
                                    label: item.product_name,
                                    value: item.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: selectedProductId.value,
                            "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                            placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                            filterable: "",
                            disabled: !selectedCategoryId.value,
                            style: { "width": "100%" },
                            "no-data-text": "\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u5546\u54C1"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(productList.value, (item) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: item.id,
                                  label: item.product_name,
                                  value: item.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "\u5F53\u524D\u9891\u9053" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(_component_el_input, {
                            "model-value": (_a = currentRow.value) == null ? void 0 : _a.channel_key,
                            disabled: ""
                          }, null, 8, ["model-value"])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5206\u7C7B" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: selectedCategoryId.value,
                          "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u5206\u7C7B",
                          style: { "width": "100%" },
                          onChange: handleCategoryChange
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (cat) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: cat.id,
                                label: cat.name,
                                value: cat.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: selectedProductId.value,
                          "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                          filterable: "",
                          disabled: !selectedCategoryId.value,
                          style: { "width": "100%" },
                          "no-data-text": "\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u5546\u54C1"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(productList.value, (item) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: item.id,
                                label: item.product_name,
                                value: item.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
              createVNode(_component_el_form, { "label-position": "top" }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "\u5F53\u524D\u9891\u9053" }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(_component_el_input, {
                          "model-value": (_a = currentRow.value) == null ? void 0 : _a.channel_key,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5206\u7C7B" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: selectedCategoryId.value,
                        "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                        placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u5206\u7C7B",
                        style: { "width": "100%" },
                        onChange: handleCategoryChange
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(categoryList.value, (cat) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: cat.id,
                              label: cat.name,
                              value: cat.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u9009\u62E9\u5546\u54C1" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: selectedProductId.value,
                        "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                        placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1",
                        filterable: "",
                        disabled: !selectedCategoryId.value,
                        style: { "width": "100%" },
                        "no-data-text": "\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u5546\u54C1"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(productList.value, (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.id,
                              label: item.product_name,
                              value: item.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: batchModalVisible.value,
        "onUpdate:modelValue": ($event) => batchModalVisible.value = $event,
        title: "\u6279\u91CF\u6DFB\u52A0\u9891\u9053",
        width: "500px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-b938ede0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => batchModalVisible.value = false
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
              onClick: handleBatchAdd,
              loading: batchAdding.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5F00\u59CB\u751F\u6210`);
                } else {
                  return [
                    createTextVNode("\u5F00\u59CB\u751F\u6210")
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
                  onClick: ($event) => batchModalVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleBatchAdd,
                  loading: batchAdding.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u5F00\u59CB\u751F\u6210")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="batch-content" data-v-b938ede0${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "\u6BCF\u884C\u8F93\u5165\u4E00\u4E2A\u9891\u9053\u6807\u8BC6 (@xxx)\uFF0C\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u53BB\u91CD\u5E76\u751F\u6210\u672A\u7ED1\u5B9A\u8BB0\u5F55\u3002",
              type: "info",
              closable: false,
              "show-icon": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: batchInput.value,
              "onUpdate:modelValue": ($event) => batchInput.value = $event,
              type: "textarea",
              rows: 10,
              placeholder: "@channel1\\n@channel2\\n...",
              style: { "margin-top": "15px" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "batch-content" }, [
                createVNode(_component_el_alert, {
                  title: "\u6BCF\u884C\u8F93\u5165\u4E00\u4E2A\u9891\u9053\u6807\u8BC6 (@xxx)\uFF0C\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u53BB\u91CD\u5E76\u751F\u6210\u672A\u7ED1\u5B9A\u8BB0\u5F55\u3002",
                  type: "info",
                  closable: false,
                  "show-icon": ""
                }),
                createVNode(_component_el_input, {
                  modelValue: batchInput.value,
                  "onUpdate:modelValue": ($event) => batchInput.value = $event,
                  type: "textarea",
                  rows: 10,
                  placeholder: "@channel1\\n@channel2\\n...",
                  style: { "margin-top": "15px" }
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/cdk/channel-recognition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const channelRecognition = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b938ede0"]]);

export { channelRecognition as default };
//# sourceMappingURL=channel-recognition-DdilNDtX.mjs.map
