import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElForm, a as ElFormItem } from "./index-BYu6jnca.js";
import { E as ElSelect, a as ElOption } from "./index-B_mQW-wd.js";
import { E as ElInput } from "./index-BeH2PDwZ.js";
import { E as ElDivider } from "./index-CD49T52w.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElDialog } from "./index-BYF0U8gS.js";
import { E as ElEmpty } from "./index-BRSsuUkY.js";
import { v as vLoading } from "./directive-BHLqqXUb.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                 */
/* empty css                      */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                    */
/* empty css                  */
/* empty css                     */
/* empty css                   */
/* empty css                    */
/* empty css                  */
/* empty css                    */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, withKeys, toDisplayString, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { p as plus_default, aB as sort_default, as as goods_default } from "./index-DNnPa_Q9.js";
import draggable from "vuedraggable";
import { a as adminFaqApi } from "./help-center-d-ts0aZv.js";
import { P as PageTipHeader } from "./PageTipHeader-DurXbUjx.js";
import { A as AdminActionCard } from "./AdminActionCard-C3u4R3C6.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { c as confirmDelete } from "./useAdminDialog-LVLqZ-7L.js";
import { a as adminRoute } from "./admin-routes-C0qcXhse.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { E as ElMessageBox } from "./index-VfPbkY7T.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-C5kRDPtv.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "async-validator";
import "@vueuse/core";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-Cxdfotkm.js";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-BAMVq552.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./event-BZTOGHfp.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-NROOS5rD.js";
import "normalize-wheel-es";
import "./index-IoXmILvB.js";
import "./refs-CxYYXu5Q.js";
import "./index-BrJcxSwt.js";
import "./supabase-F2pQZHm6.js";
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
import "./index-BC7fiCUI.js";
/* empty css                  */
import "./index-D9RjcsL2.js";
/* empty css                    */
/* empty css                       */
import "./validator-BZYOvvAA.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const faqs = ref([]);
    const categories = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const keyword = ref("");
    const filterCategory = ref("");
    const selectedIds = ref([]);
    const tableRef = ref();
    const fetchFaqs = async () => {
      loading.value = true;
      try {
        const res = await adminFaqApi.getFaqs({
          page: currentPage.value,
          page_size: pageSize.value,
          keyword: keyword.value,
          category_id: filterCategory.value || void 0
        });
        if (res.success) {
          faqs.value = res.faqs || [];
          total.value = res.total || 0;
        } else {
          ElMessage.error(res.error || "获取列表失败");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleSelectionChange = (selection) => {
      selectedIds.value = selection.map((item) => item.id);
    };
    const clearSelection = () => {
      if (tableRef.value) {
        selectedIds.value = [];
        fetchFaqs();
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "确定要删除这个问题吗？",
        async () => {
          const res = await adminFaqApi.deleteFaq(row.id);
          if (res.error) throw new Error(res.error.message || String(res.error));
          await fetchFaqs();
          return { success: true };
        }
      );
    };
    const handleBatchDelete = async () => {
      if (selectedIds.value.length === 0) return;
      try {
        await ElMessageBox.confirm(
          `确定要删除选中的 ${selectedIds.value.length} 个问题吗？`,
          "批量删除",
          { type: "warning", confirmButtonText: "确定删除", cancelButtonText: "取消" }
        );
        let successCount = 0;
        for (const id of selectedIds.value) {
          const res = await adminFaqApi.deleteFaq(id);
          if (res.success) successCount++;
        }
        ElMessage.success(`成功删除 ${successCount} 个问题`);
        clearSelection();
        await fetchFaqs();
      } catch (e) {
      }
    };
    const resetFilter = () => {
      keyword.value = "";
      filterCategory.value = "";
      fetchFaqs();
    };
    const sortDialogVisible = ref(false);
    const sortList = ref([]);
    const loadingSortList = ref(false);
    const savingSort = ref(false);
    const sortFilterCategory = ref("");
    const openSortDialog = () => {
      sortFilterCategory.value = filterCategory.value;
      sortDialogVisible.value = true;
      fetchSortList();
    };
    const fetchSortList = async () => {
      loadingSortList.value = true;
      const res = await adminFaqApi.getFaqs({
        page: 1,
        page_size: 100,
        // Limit 100 for drag sort performance
        category_id: sortFilterCategory.value || void 0
      });
      if (res.success) {
        sortList.value = res.faqs || [];
      }
      loadingSortList.value = false;
    };
    const saveSort = async () => {
      savingSort.value = true;
      try {
        const updates = sortList.value.map((item, index2) => {
          const newOrder = index2 * 10;
          if (item.sort_order !== newOrder) {
            return adminFaqApi.updateFaq(item.id, { sort_order: newOrder });
          }
          return null;
        }).filter((p) => p !== null);
        if (updates.length > 0) {
          await Promise.all(updates);
          ElMessage.success(`已更新 ${updates.length} 个问题的顺序`);
        } else {
          ElMessage.info("顺序未发生变化");
        }
        sortDialogVisible.value = false;
        fetchFaqs();
      } catch (e) {
        ElMessage.error("排序保存失败: " + e.message);
      } finally {
        savingSort.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_divider = ElDivider;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_icon = ElIcon;
      const _component_el_dialog = ElDialog;
      const _component_el_empty = ElEmpty;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-1366e937>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "常见问题",
        description: "管理系统常见问题列表。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => _ctx.$router.push(unref(adminRoute)("help-center/faq/post"))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加问题`);
                } else {
                  return [
                    createTextVNode("添加问题")
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
                  _push3(`调整排序`);
                } else {
                  return [
                    createTextVNode("调整排序")
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
                onClick: ($event) => _ctx.$router.push(unref(adminRoute)("help-center/faq/post"))
              }, {
                default: withCtx(() => [
                  createTextVNode("添加问题")
                ]),
                _: 1
              }, 8, ["icon", "onClick"]),
              createVNode(_component_el_button, {
                icon: unref(sort_default),
                onClick: openSortDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("调整排序")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminActionCard, { class: "mt-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="toolbar-content" data-v-1366e937${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form, {
              inline: true,
              class: "search-form"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: filterCategory.value,
                          "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                          placeholder: "全部分类",
                          clearable: "",
                          style: { "width": "150px" },
                          onChange: fetchFaqs
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(categories.value, (cat) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: cat.id,
                                  label: cat.name,
                                  value: cat.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
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
                            modelValue: filterCategory.value,
                            "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                            placeholder: "全部分类",
                            clearable: "",
                            style: { "width": "150px" },
                            onChange: fetchFaqs
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
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
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: keyword.value,
                          "onUpdate:modelValue": ($event) => keyword.value = $event,
                          placeholder: "搜索问题关键词...",
                          "prefix-icon": "Search",
                          clearable: "",
                          onKeyup: fetchFaqs
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: keyword.value,
                            "onUpdate:modelValue": ($event) => keyword.value = $event,
                            placeholder: "搜索问题关键词...",
                            "prefix-icon": "Search",
                            clearable: "",
                            onKeyup: withKeys(fetchFaqs, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          onClick: fetchFaqs
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`查询`);
                            } else {
                              return [
                                createTextVNode("查询")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, { onClick: resetFilter }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`重置`);
                            } else {
                              return [
                                createTextVNode("重置")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: fetchFaqs
                          }, {
                            default: withCtx(() => [
                              createTextVNode("查询")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, { onClick: resetFilter }, {
                            default: withCtx(() => [
                              createTextVNode("重置")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: filterCategory.value,
                          "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                          placeholder: "全部分类",
                          clearable: "",
                          style: { "width": "150px" },
                          onChange: fetchFaqs
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
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
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: keyword.value,
                          "onUpdate:modelValue": ($event) => keyword.value = $event,
                          placeholder: "搜索问题关键词...",
                          "prefix-icon": "Search",
                          clearable: "",
                          onKeyup: withKeys(fetchFaqs, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: fetchFaqs
                        }, {
                          default: withCtx(() => [
                            createTextVNode("查询")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, { onClick: resetFilter }, {
                          default: withCtx(() => [
                            createTextVNode("重置")
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
            }, _parent2, _scopeId));
            if (selectedIds.value.length > 0) {
              _push2(`<div class="batch-actions" data-v-1366e937${_scopeId}><span class="selection-info" data-v-1366e937${_scopeId}>已选 ${ssrInterpolate(selectedIds.value.length)} 项</span>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "danger",
                link: "",
                onClick: handleBatchDelete
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`批量删除`);
                  } else {
                    return [
                      createTextVNode("批量删除")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_divider, { direction: "vertical" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                link: "",
                onClick: clearSelection
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`取消选择`);
                  } else {
                    return [
                      createTextVNode("取消选择")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "toolbar-content" }, [
                createVNode(_component_el_form, {
                  inline: true,
                  class: "search-form"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: filterCategory.value,
                          "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                          placeholder: "全部分类",
                          clearable: "",
                          style: { "width": "150px" },
                          onChange: fetchFaqs
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
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
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: keyword.value,
                          "onUpdate:modelValue": ($event) => keyword.value = $event,
                          placeholder: "搜索问题关键词...",
                          "prefix-icon": "Search",
                          clearable: "",
                          onKeyup: withKeys(fetchFaqs, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: fetchFaqs
                        }, {
                          default: withCtx(() => [
                            createTextVNode("查询")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, { onClick: resetFilter }, {
                          default: withCtx(() => [
                            createTextVNode("重置")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                selectedIds.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "batch-actions"
                }, [
                  createVNode("span", { class: "selection-info" }, "已选 " + toDisplayString(selectedIds.value.length) + " 项", 1),
                  createVNode(_component_el_button, {
                    type: "danger",
                    link: "",
                    onClick: handleBatchDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode("批量删除")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_divider, { direction: "vertical" }),
                  createVNode(_component_el_button, {
                    link: "",
                    onClick: clearSelection
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消选择")
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        ref_key: "tableRef",
        ref: tableRef,
        data: faqs.value,
        loading: loading.value,
        total: total.value,
        "current-page": currentPage.value,
        "onUpdate:currentPage": [($event) => currentPage.value = $event, fetchFaqs],
        "page-size": pageSize.value,
        "onUpdate:pageSize": [($event) => pageSize.value = $event, fetchFaqs],
        onSelectionChange: handleSelectionChange,
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "sort_order",
              label: "排序",
              width: "80",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "问题",
              "min-width": "250"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="question-text" data-v-1366e937${_scopeId2}>${ssrInterpolate(row.question)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "question-text" }, toDisplayString(row.question), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "分类",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.category) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "info",
                      effect: "plain"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(row.category.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(row.category.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="text-gray-400" data-v-1366e937${_scopeId2}>未分类</span>`);
                  }
                } else {
                  return [
                    row.category ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: "info",
                      effect: "plain"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.category.name), 1)
                      ]),
                      _: 2
                    }, 1024)) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-gray-400"
                    }, "未分类"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "关联商品",
              width: "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.product) {
                    _push3(`<div class="bound-product" data-v-1366e937${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(goods_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(goods_default))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-1366e937${_scopeId2}>${ssrInterpolate(row.product.product_name)}</span></div>`);
                  } else {
                    _push3(`<span class="text-gray-400" data-v-1366e937${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.product ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bound-product"
                    }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(goods_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, toDisplayString(row.product.product_name), 1)
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-gray-400"
                    }, "-"))
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
                  if (row.is_active) {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "success",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`启用`);
                        } else {
                          return [
                            createTextVNode("启用")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "danger",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`禁用`);
                        } else {
                          return [
                            createTextVNode("禁用")
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
                        createTextVNode("启用")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "danger",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("禁用")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
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
                    onClick: ($event) => _ctx.$router.push(`${unref(adminRoute)("help-center/faq/post")}?id=${row.id}`)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 编辑 `);
                      } else {
                        return [
                          createTextVNode(" 编辑 ")
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
                      type: "primary",
                      link: "",
                      size: "small",
                      onClick: ($event) => _ctx.$router.push(`${unref(adminRoute)("help-center/faq/post")}?id=${row.id}`)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 编辑 ")
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
                type: "selection",
                width: "55"
              }),
              createVNode(_component_el_table_column, {
                prop: "sort_order",
                label: "排序",
                width: "80",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                label: "问题",
                "min-width": "250"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "question-text" }, toDisplayString(row.question), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "分类",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  row.category ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "info",
                    effect: "plain"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.category.name), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-gray-400"
                  }, "未分类"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "关联商品",
                width: "200"
              }, {
                default: withCtx(({ row }) => [
                  row.product ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bound-product"
                  }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(goods_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, toDisplayString(row.product.product_name), 1)
                  ])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-gray-400"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row.is_active ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: "success",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("启用")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "danger",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "180",
                align: "center",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    link: "",
                    size: "small",
                    onClick: ($event) => _ctx.$router.push(`${unref(adminRoute)("help-center/faq/post")}?id=${row.id}`)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 编辑 ")
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
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: sortDialogVisible.value,
        "onUpdate:modelValue": ($event) => sortDialogVisible.value = $event,
        title: "调整问题顺序",
        width: "600px",
        "append-to-body": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-1366e937${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => sortDialogVisible.value = false
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
              onClick: saveSort,
              loading: savingSort.value,
              disabled: sortList.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存排序`);
                } else {
                  return [
                    createTextVNode("保存排序")
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
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: saveSort,
                  loading: savingSort.value,
                  disabled: sortList.value.length === 0
                }, {
                  default: withCtx(() => [
                    createTextVNode("保存排序")
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sort-header mb-4" data-v-1366e937${_scopeId}><div class="sort-tip text-gray-400 text-sm" data-v-1366e937${_scopeId}> 提示：仅显示当前筛选分类下的问题。拖拽调整顺序。 </div>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: sortFilterCategory.value,
              "onUpdate:modelValue": ($event) => sortFilterCategory.value = $event,
              placeholder: "选择分类",
              size: "small",
              style: { "width": "150px" },
              onChange: fetchSortList
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "全部分类",
                    value: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(categories.value, (cat) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: cat.id,
                      label: cat.name,
                      value: cat.id
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "全部分类",
                      value: ""
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
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
            }, _parent2, _scopeId));
            _push2(`</div><div${ssrRenderAttrs(mergeProps({ class: "sort-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, loadingSortList.value)))} data-v-1366e937${_scopeId}>`);
            if (sortList.value.length === 0) {
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "暂无数据",
                "image-size": 60
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(draggable), {
                modelValue: sortList.value,
                "onUpdate:modelValue": ($event) => sortList.value = $event,
                "item-key": "id",
                animation: "200",
                handle: ".drag-handle",
                "ghost-class": "ghost-item"
              }, {
                item: withCtx(({ element, index: index2 }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="sort-item" data-v-1366e937${_scopeId2}><div class="drag-handle" data-v-1366e937${_scopeId2}>`);
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
                    _push3(`</div><div class="sort-content" data-v-1366e937${_scopeId2}><span class="sort-name text-truncate" data-v-1366e937${_scopeId2}>${ssrInterpolate(element.question)}</span><div class="sort-meta" data-v-1366e937${_scopeId2}>`);
                    if (element.category) {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        size: "small",
                        type: "info",
                        effect: "plain",
                        class: "mr-2"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(element.category.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(element.category.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      type: "primary",
                      effect: "light"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(index2 * 10)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(index2 * 10), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
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
                          createVNode("span", { class: "sort-name text-truncate" }, toDisplayString(element.question), 1),
                          createVNode("div", { class: "sort-meta" }, [
                            element.category ? (openBlock(), createBlock(_component_el_tag, {
                              key: 0,
                              size: "small",
                              type: "info",
                              effect: "plain",
                              class: "mr-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(element.category.name), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true),
                            createVNode(_component_el_tag, {
                              size: "small",
                              type: "primary",
                              effect: "light"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(index2 * 10), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "sort-header mb-4" }, [
                createVNode("div", { class: "sort-tip text-gray-400 text-sm" }, " 提示：仅显示当前筛选分类下的问题。拖拽调整顺序。 "),
                createVNode(_component_el_select, {
                  modelValue: sortFilterCategory.value,
                  "onUpdate:modelValue": ($event) => sortFilterCategory.value = $event,
                  placeholder: "选择分类",
                  size: "small",
                  style: { "width": "150px" },
                  onChange: fetchSortList
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "全部分类",
                      value: ""
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
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
              withDirectives((openBlock(), createBlock("div", { class: "sort-container" }, [
                sortList.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                  key: 0,
                  description: "暂无数据",
                  "image-size": 60
                })) : (openBlock(), createBlock(unref(draggable), {
                  key: 1,
                  modelValue: sortList.value,
                  "onUpdate:modelValue": ($event) => sortList.value = $event,
                  "item-key": "id",
                  animation: "200",
                  handle: ".drag-handle",
                  "ghost-class": "ghost-item"
                }, {
                  item: withCtx(({ element, index: index2 }) => [
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
                        createVNode("span", { class: "sort-name text-truncate" }, toDisplayString(element.question), 1),
                        createVNode("div", { class: "sort-meta" }, [
                          element.category ? (openBlock(), createBlock(_component_el_tag, {
                            key: 0,
                            size: "small",
                            type: "info",
                            effect: "plain",
                            class: "mr-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(element.category.name), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          createVNode(_component_el_tag, {
                            size: "small",
                            type: "primary",
                            effect: "light"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(index2 * 10), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]))
              ])), [
                [_directive_loading, loadingSortList.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/help-center/faq/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1366e937"]]);
export {
  index as default
};
//# sourceMappingURL=index-BI0nePb8.js.map
