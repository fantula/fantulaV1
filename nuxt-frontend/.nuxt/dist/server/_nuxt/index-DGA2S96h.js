import { E as ElButton } from "./index-DZvUdcyn.js";
import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElForm, a as ElFormItem } from "./index-DCJPe4PK.js";
import { E as ElSelect, a as ElOption } from "./index-uIKF9nns.js";
import { E as ElInput } from "./index-CcE-rjwX.js";
import { a as ElTable, E as ElTableColumn } from "./index-BDPO3Is8.js";
import { E as ElTag } from "./index-BZB4XnD2.js";
import { E as ElPopconfirm } from "./index--dns3OUf.js";
import { E as ElPagination } from "./index-dRoeuTok.js";
import { v as vLoading } from "./directive-D1M1s_ef.js";
/* empty css              */
/* empty css                   */
/* empty css                 */
/* empty css                      */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                    */
/* empty css                       */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, withKeys, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { p as plus_default, aq as goods_default } from "./index-CmsdIFY8.js";
import { b as adminFaqApi } from "./help-center-DNLjTRh2.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-eYVppfk3.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-eqoLCvNY.js";
import "./index-CO6H4Lsj.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-DBQY6eQ6.js";
import "./objects-Bz74KHmq.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "async-validator";
import "./index-D6r9Uwf3.js";
import "@popperjs/core";
import "./index-DqrhOzxH.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DGjXPDlO.js";
import "./strings-D1uxkXhq.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./event-BZTOGHfp.js";
import "./index-BDc7M6dy.js";
import "./vnode-C7bAOlXh.js";
import "./typescript-D6L75muK.js";
import "./index-D2CY7Ok3.js";
import "./index-DpI-EKEn.js";
import "normalize-wheel-es";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
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
          faqs.value = res.faqs;
          total.value = res.total;
        } else {
          ElMessage.error(res.error || "获取列表失败");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleDelete = async (id) => {
      const res = await adminFaqApi.deleteFaq(id);
      if (res.success) {
        ElMessage.success("删除成功");
        fetchFaqs();
      } else {
        ElMessage.error(res.error || "删除失败");
      }
    };
    const resetFilter = () => {
      keyword.value = "";
      filterCategory.value = "";
      fetchFaqs();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_popconfirm = ElPopconfirm;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-list-page" }, _attrs))} data-v-e30aa6d5><div class="page-actions" data-v-e30aa6d5>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: ($event) => _ctx.$router.push("/admin/help-center/faq/post")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(plus_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(plus_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` 添加问题 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              createTextVNode(" 添加问题 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="toolbar-card" data-v-e30aa6d5>`);
      _push(ssrRenderComponent(_component_el_form, {
        inline: true,
        class: "search-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: filterCategory.value,
                    "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                    placeholder: "全部分类",
                    clearable: "",
                    style: { "width": "150px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(categories.value, (cat) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: cat.id,
                            label: cat.name,
                            value: cat.id
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: filterCategory.value,
                      "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                      placeholder: "全部分类",
                      clearable: "",
                      style: { "width": "150px" }
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: keyword.value,
                    "onUpdate:modelValue": ($event) => keyword.value = $event,
                    placeholder: "搜索问题关键词...",
                    "prefix-icon": "Search",
                    clearable: "",
                    onKeyup: fetchFaqs
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    onClick: fetchFaqs
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`查询`);
                      } else {
                        return [
                          createTextVNode("查询")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, { onClick: resetFilter }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`重置`);
                      } else {
                        return [
                          createTextVNode("重置")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: filterCategory.value,
                    "onUpdate:modelValue": ($event) => filterCategory.value = $event,
                    placeholder: "全部分类",
                    clearable: "",
                    style: { "width": "150px" }
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
      }, _parent));
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "table-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-e30aa6d5>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: faqs.value,
        style: { "width": "100%" },
        stripe: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
                  _push3(`<span class="question-text" data-v-e30aa6d5${_scopeId2}>${ssrInterpolate(row.question)}</span>`);
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
                    _push3(`<span class="text-gray-400" data-v-e30aa6d5${_scopeId2}>未分类</span>`);
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
                    _push3(`<div class="bound-product" data-v-e30aa6d5${_scopeId2}>`);
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
                    _push3(`<span data-v-e30aa6d5${_scopeId2}>${ssrInterpolate(row.product.product_name)}</span></div>`);
                  } else {
                    _push3(`<span class="text-gray-400" data-v-e30aa6d5${_scopeId2}>-</span>`);
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
                    onClick: ($event) => _ctx.$router.push(`/admin/help-center/faq/post?id=${row.id}`)
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
                  _push3(ssrRenderComponent(_component_el_popconfirm, {
                    title: "确定要删除这个问题吗？",
                    onConfirm: ($event) => handleDelete(row.id)
                  }, {
                    reference: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "danger",
                          link: "",
                          size: "small"
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
                            type: "danger",
                            link: "",
                            size: "small"
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
                      type: "primary",
                      link: "",
                      size: "small",
                      onClick: ($event) => _ctx.$router.push(`/admin/help-center/faq/post?id=${row.id}`)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 编辑 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: "确定要删除这个问题吗？",
                      onConfirm: ($event) => handleDelete(row.id)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "danger",
                          link: "",
                          size: "small"
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
                    onClick: ($event) => _ctx.$router.push(`/admin/help-center/faq/post?id=${row.id}`)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 编辑 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_popconfirm, {
                    title: "确定要删除这个问题吗？",
                    onConfirm: ($event) => handleDelete(row.id)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "danger",
                        link: "",
                        size: "small"
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
      _push(`<div class="pagination-row" data-v-e30aa6d5>`);
      _push(ssrRenderComponent(_component_el_pagination, {
        "current-page": currentPage.value,
        "onUpdate:currentPage": ($event) => currentPage.value = $event,
        "page-size": pageSize.value,
        "onUpdate:pageSize": ($event) => pageSize.value = $event,
        total: total.value,
        layout: "total, prev, pager, next",
        onCurrentChange: fetchFaqs
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/help-center/faq/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e30aa6d5"]]);
export {
  index as default
};
//# sourceMappingURL=index-DGA2S96h.js.map
