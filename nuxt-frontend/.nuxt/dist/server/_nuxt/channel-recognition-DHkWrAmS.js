import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElSelect, a as ElOption } from "./index-B_mQW-wd.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElPopconfirm } from "./index-CDARLNap.js";
import { E as ElDialog } from "./index-BYF0U8gS.js";
import { E as ElForm, a as ElFormItem } from "./index-BYu6jnca.js";
import { E as ElAlert } from "./index-BC7fiCUI.js";
import "./base-CEWXqFm3.js";
/* empty css                  */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                    */
/* empty css                 */
/* empty css                      */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, withKeys, isRef, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { p as plus_default, M as refresh_default, af as search_default } from "./index-DNnPa_Q9.js";
import getSupabaseClient from "./supabase-F2pQZHm6.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { u as useAdminList } from "./useAdminList-DUYkwmjS.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { _ as _export_sfc } from "../server.mjs";
import "./typescript-D6L75muK.js";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./event-BZTOGHfp.js";
import "./index-Cxdfotkm.js";
import "@vueuse/core";
import "./event-D3FEo2C5.js";
import "./index-DuyRWKSc.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "./aria-Rs9hkxop.js";
import "./objects-Bz74KHmq.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-BAMVq552.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./use-global-config-C5kRDPtv.js";
import "@ctrl/tinycolor";
import "./index-NROOS5rD.js";
import "normalize-wheel-es";
import "./index-IoXmILvB.js";
import "./refs-CxYYXu5Q.js";
import "./index-BrJcxSwt.js";
import "async-validator";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "./index-CD49T52w.js";
/* empty css                    */
import "./index-BRSsuUkY.js";
import "./index-D9RjcsL2.js";
import "./directive-BHLqqXUb.js";
/* empty css                    */
/* empty css                  */
/* empty css                       */
/* empty css                    */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "channel-recognition",
  __ssrInlineRender: true,
  setup(__props) {
    const client = getSupabaseClient();
    const { formatDate } = useBizFormat();
    const {
      loading,
      list,
      total,
      currentPage,
      pageSize,
      filters,
      refresh,
      handleFilterChange,
      removeRow
    } = useAdminList({
      defaultFilters: { status: "unbound", query: "" },
      fetchFn: async (params) => {
        let query = client.from("channel_recognitions").select("*, products(id, product_name)", { count: "exact" }).order("created_at", { ascending: false }).range((params.page - 1) * params.pageSize, params.page * params.pageSize - 1);
        if (params.filters.query) {
          query = query.ilike("channel_key", `%${params.filters.query}%`);
        }
        if (params.filters.status === "unbound") {
          query = query.is("product_id", null);
        } else if (params.filters.status === "bound") {
          query = query.not("product_id", "is", null);
        }
        const { data, count, error } = await query;
        if (error) throw new Error(error.message);
        return {
          success: true,
          data: data || [],
          total: count || 0
        };
      },
      deleteFn: async (id) => {
        const { error } = await client.from("channel_recognitions").delete().eq("id", id);
        if (error) throw new Error(error.message);
        return { success: true };
      }
    });
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
        ElMessage.success("绑定成功");
        bindModalVisible.value = false;
        refresh();
      } catch (err) {
        ElMessage.error("保存失败: " + err.message);
      } finally {
        saving.value = false;
      }
    };
    const handleBatchAdd = async () => {
      if (!batchInput.value.trim()) {
        ElMessage.warning("请输入内容");
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
          ElMessage.warning("没有有效的频道标识");
          return;
        }
        const payload = Array.from(uniqueKeys).map((key) => ({
          channel_key: key
          // product_id is null by default
        }));
        const { error } = await client.from("channel_recognitions").upsert(payload, { onConflict: "channel_key", ignoreDuplicates: true });
        if (error) throw error;
        ElMessage.success(`操作完成：处理 ${payload.length} 条记录`);
        batchModalVisible.value = false;
        batchInput.value = "";
        refresh();
      } catch (err) {
        ElMessage.error("批量生成失败: " + err.message);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "channel-recognition-page" }, _attrs))} data-v-422c8692>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-422c8692${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(filters).query,
              "onUpdate:modelValue": ($event) => unref(filters).query = $event,
              placeholder: "搜索频道标识...",
              style: { "width": "240px" },
              clearable: "",
              onClear: unref(handleFilterChange),
              onKeyup: unref(handleFilterChange)
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
              modelValue: unref(filters).status,
              "onUpdate:modelValue": ($event) => unref(filters).status = $event,
              placeholder: "状态筛选",
              style: { "width": "140px" },
              onChange: unref(handleFilterChange)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "全部",
                    value: "all"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "待处理 (未绑定)",
                    value: "unbound"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "已完成 (已绑定)",
                    value: "bound"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: "all"
                    }),
                    createVNode(_component_el_option, {
                      label: "待处理 (未绑定)",
                      value: "unbound"
                    }),
                    createVNode(_component_el_option, {
                      label: "已完成 (已绑定)",
                      value: "bound"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: unref(refresh)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`查询`);
                } else {
                  return [
                    createTextVNode("查询")
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
                  modelValue: unref(filters).query,
                  "onUpdate:modelValue": ($event) => unref(filters).query = $event,
                  placeholder: "搜索频道标识...",
                  style: { "width": "240px" },
                  clearable: "",
                  onClear: unref(handleFilterChange),
                  onKeyup: withKeys(unref(handleFilterChange), ["enter"])
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
                }, 8, ["modelValue", "onUpdate:modelValue", "onClear", "onKeyup"]),
                createVNode(_component_el_select, {
                  modelValue: unref(filters).status,
                  "onUpdate:modelValue": ($event) => unref(filters).status = $event,
                  placeholder: "状态筛选",
                  style: { "width": "140px" },
                  onChange: unref(handleFilterChange)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "全部",
                      value: "all"
                    }),
                    createVNode(_component_el_option, {
                      label: "待处理 (未绑定)",
                      value: "unbound"
                    }),
                    createVNode(_component_el_option, {
                      label: "已完成 (已绑定)",
                      value: "bound"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: unref(refresh)
                }, {
                  default: withCtx(() => [
                    createTextVNode("查询")
                  ]),
                  _: 1
                }, 8, ["onClick"])
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
                  _push3(` 批量添加 `);
                } else {
                  return [
                    createVNode(_component_el_icon, { class: "el-icon--left" }, {
                      default: withCtx(() => [
                        createVNode(unref(plus_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" 批量添加 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, { onClick: unref(refresh) }, {
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
                  createTextVNode(" 批量添加 ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, { onClick: unref(refresh) }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_default))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: unref(list),
        loading: unref(loading),
        total: unref(total),
        page: unref(currentPage),
        "onUpdate:page": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
        pageSize: unref(pageSize),
        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "channel_key",
              label: "频道标识",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="channel-key" data-v-422c8692${_scopeId2}>${ssrInterpolate(row.channel_key)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "channel-key" }, toDisplayString(row.channel_key), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "绑定商品",
              "min-width": "250"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.products) {
                    _push3(`<div class="bound-product" data-v-422c8692${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      type: "success"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`已绑定`);
                        } else {
                          return [
                            createTextVNode("已绑定")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<span class="product-name"${ssrRenderAttr("title", row.products.product_name)} data-v-422c8692${_scopeId2}>${ssrInterpolate(row.products.product_name)}</span></div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "warning",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`未绑定`);
                        } else {
                          return [
                            createTextVNode("未绑定")
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
                          createTextVNode("已绑定")
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
                        createTextVNode("未绑定")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
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
                        _push4(`${ssrInterpolate(row.product_id ? "已完成" : "待处理")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.product_id ? "已完成" : "待处理"), 1)
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
                        createTextVNode(toDisplayString(row.product_id ? "已完成" : "待处理"), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "180"
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
              label: "操作",
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
                        _push4(`${ssrInterpolate(row.product_id ? "修改商品" : "绑定商品")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.product_id ? "修改商品" : "绑定商品"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_popconfirm, {
                    title: "确定要彻底删除该记录吗？下次用户搜索将重新生成。",
                    "confirm-button-text": "删除",
                    "cancel-button-text": "取消",
                    onConfirm: ($event) => unref(removeRow)(row.id)
                  }, {
                    reference: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "danger"
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
                            type: "danger"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
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
                        createTextVNode(toDisplayString(row.product_id ? "修改商品" : "绑定商品"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: "确定要彻底删除该记录吗？下次用户搜索将重新生成。",
                      "confirm-button-text": "删除",
                      "cancel-button-text": "取消",
                      onConfirm: ($event) => unref(removeRow)(row.id)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
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
                label: "频道标识",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "channel-key" }, toDisplayString(row.channel_key), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "绑定商品",
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
                        createTextVNode("已绑定")
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
                      createTextVNode("未绑定")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "120"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: row.product_id ? "success" : "warning",
                    effect: "dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.product_id ? "已完成" : "待处理"), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "180"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
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
                      createTextVNode(toDisplayString(row.product_id ? "修改商品" : "绑定商品"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_el_popconfirm, {
                    title: "确定要彻底删除该记录吗？下次用户搜索将重新生成。",
                    "confirm-button-text": "删除",
                    "cancel-button-text": "取消",
                    onConfirm: ($event) => unref(removeRow)(row.id)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
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
        title: "绑定商品",
        width: "500px",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-422c8692${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => bindModalVisible.value = false
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
              onClick: handleSaveBind,
              loading: saving.value,
              disabled: !selectedProductId.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存`);
                } else {
                  return [
                    createTextVNode("保存")
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
                    createTextVNode("取消")
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
                    createTextVNode("保存")
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "当前频道" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          "model-value": currentRow.value?.channel_key,
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            "model-value": currentRow.value?.channel_key,
                            disabled: ""
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "选择分类" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: selectedCategoryId.value,
                          "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                          placeholder: "请选择商品分类",
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
                            placeholder: "请选择商品分类",
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "选择商品" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: selectedProductId.value,
                          "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                          placeholder: "请选择商品",
                          filterable: "",
                          disabled: !selectedCategoryId.value,
                          style: { "width": "100%" },
                          "no-data-text": "该分类下暂无商品"
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
                            placeholder: "请选择商品",
                            filterable: "",
                            disabled: !selectedCategoryId.value,
                            style: { "width": "100%" },
                            "no-data-text": "该分类下暂无商品"
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
                    createVNode(_component_el_form_item, { label: "当前频道" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          "model-value": currentRow.value?.channel_key,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "选择分类" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: selectedCategoryId.value,
                          "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                          placeholder: "请选择商品分类",
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
                    createVNode(_component_el_form_item, { label: "选择商品" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: selectedProductId.value,
                          "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                          placeholder: "请选择商品",
                          filterable: "",
                          disabled: !selectedCategoryId.value,
                          style: { "width": "100%" },
                          "no-data-text": "该分类下暂无商品"
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
                  createVNode(_component_el_form_item, { label: "当前频道" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        "model-value": currentRow.value?.channel_key,
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "选择分类" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: selectedCategoryId.value,
                        "onUpdate:modelValue": ($event) => selectedCategoryId.value = $event,
                        placeholder: "请选择商品分类",
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
                  createVNode(_component_el_form_item, { label: "选择商品" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: selectedProductId.value,
                        "onUpdate:modelValue": ($event) => selectedProductId.value = $event,
                        placeholder: "请选择商品",
                        filterable: "",
                        disabled: !selectedCategoryId.value,
                        style: { "width": "100%" },
                        "no-data-text": "该分类下暂无商品"
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
        title: "批量添加频道",
        width: "500px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-422c8692${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => batchModalVisible.value = false
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
              onClick: handleBatchAdd,
              loading: batchAdding.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`开始生成`);
                } else {
                  return [
                    createTextVNode("开始生成")
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
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleBatchAdd,
                  loading: batchAdding.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("开始生成")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="batch-content" data-v-422c8692${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_alert, {
              title: "每行输入一个频道标识 (@xxx)，系统会自动去重并生成未绑定记录。",
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
                  title: "每行输入一个频道标识 (@xxx)，系统会自动去重并生成未绑定记录。",
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
const channelRecognition = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-422c8692"]]);
export {
  channelRecognition as default
};
//# sourceMappingURL=channel-recognition-DHkWrAmS.js.map
