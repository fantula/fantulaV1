import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, p as plus_default, bk as goods_default, ah as ElMessage } from './server.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElSelect, a as ElOption } from './index-Cf_t59lc.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { a as ElTable, E as ElTableColumn } from './index-KOxrtlML.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElPopconfirm } from './index-C5lE8Bsy.mjs';
import { E as ElPagination } from './index-cR1ntQxK.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, withKeys, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { a as adminFaqApi } from './help-center-CbrlDHXl.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';
import 'async-validator';
import './index-B9I5bL_Z.mjs';
import '@popperjs/core';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-D_b573Qt.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './event-BZTOGHfp.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-ClPmkyX9.mjs';
import './index-DrPRyc7n.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
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
          ElMessage.error(res.error || "\u83B7\u53D6\u5217\u8868\u5931\u8D25");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleDelete = async (id) => {
      const res = await adminFaqApi.deleteFaq(id);
      if (res.success) {
        ElMessage.success("\u5220\u9664\u6210\u529F");
        fetchFaqs();
      } else {
        ElMessage.error(res.error || "\u5220\u9664\u5931\u8D25");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-list-page" }, _attrs))} data-v-1c3d4b06><div class="page-actions" data-v-1c3d4b06>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: ($event) => _ctx.$router.push("/_mgmt_9Xfa3/help-center/faq/post")
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
            _push2(` \u6DFB\u52A0\u95EE\u9898 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              createTextVNode(" \u6DFB\u52A0\u95EE\u9898 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="toolbar-card" data-v-1c3d4b06>`);
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
                    placeholder: "\u5168\u90E8\u5206\u7C7B",
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
                      placeholder: "\u5168\u90E8\u5206\u7C7B",
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
                    placeholder: "\u641C\u7D22\u95EE\u9898\u5173\u952E\u8BCD...",
                    "prefix-icon": "Search",
                    clearable: "",
                    onKeyup: fetchFaqs
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: keyword.value,
                      "onUpdate:modelValue": ($event) => keyword.value = $event,
                      placeholder: "\u641C\u7D22\u95EE\u9898\u5173\u952E\u8BCD...",
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
                        _push4(`\u67E5\u8BE2`);
                      } else {
                        return [
                          createTextVNode("\u67E5\u8BE2")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, { onClick: resetFilter }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u91CD\u7F6E`);
                      } else {
                        return [
                          createTextVNode("\u91CD\u7F6E")
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
                        createTextVNode("\u67E5\u8BE2")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_button, { onClick: resetFilter }, {
                      default: withCtx(() => [
                        createTextVNode("\u91CD\u7F6E")
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
                    placeholder: "\u5168\u90E8\u5206\u7C7B",
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
                    placeholder: "\u641C\u7D22\u95EE\u9898\u5173\u952E\u8BCD...",
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
                      createTextVNode("\u67E5\u8BE2")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, { onClick: resetFilter }, {
                    default: withCtx(() => [
                      createTextVNode("\u91CD\u7F6E")
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
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "table-card" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-1c3d4b06>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: faqs.value,
        style: { "width": "100%" },
        stripe: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "sort_order",
              label: "\u6392\u5E8F",
              width: "80",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u95EE\u9898",
              "min-width": "250"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="question-text" data-v-1c3d4b06${_scopeId2}>${ssrInterpolate(row.question)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "question-text" }, toDisplayString(row.question), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5206\u7C7B",
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
                    _push3(`<span class="text-gray-400" data-v-1c3d4b06${_scopeId2}>\u672A\u5206\u7C7B</span>`);
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
                    }, "\u672A\u5206\u7C7B"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5173\u8054\u5546\u54C1",
              width: "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.product) {
                    _push3(`<div class="bound-product" data-v-1c3d4b06${_scopeId2}>`);
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
                    _push3(`<span data-v-1c3d4b06${_scopeId2}>${ssrInterpolate(row.product.product_name)}</span></div>`);
                  } else {
                    _push3(`<span class="text-gray-400" data-v-1c3d4b06${_scopeId2}>-</span>`);
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
              label: "\u72B6\u6001",
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
                      type: "danger",
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
                      type: "danger",
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
                    onClick: ($event) => _ctx.$router.push(`/_mgmt_9Xfa3/help-center/faq/post?id=${row.id}`)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u7F16\u8F91 `);
                      } else {
                        return [
                          createTextVNode(" \u7F16\u8F91 ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_popconfirm, {
                    title: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u95EE\u9898\u5417\uFF1F",
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
                            type: "danger",
                            link: "",
                            size: "small"
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
                      type: "primary",
                      link: "",
                      size: "small",
                      onClick: ($event) => _ctx.$router.push(`/_mgmt_9Xfa3/help-center/faq/post?id=${row.id}`)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u7F16\u8F91 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u95EE\u9898\u5417\uFF1F",
                      onConfirm: ($event) => handleDelete(row.id)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "danger",
                          link: "",
                          size: "small"
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
                prop: "sort_order",
                label: "\u6392\u5E8F",
                width: "80",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                label: "\u95EE\u9898",
                "min-width": "250"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "question-text" }, toDisplayString(row.question), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5206\u7C7B",
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
                  }, "\u672A\u5206\u7C7B"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5173\u8054\u5546\u54C1",
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
                label: "\u72B6\u6001",
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
                      createTextVNode("\u542F\u7528")
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "danger",
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
                    onClick: ($event) => _ctx.$router.push(`/_mgmt_9Xfa3/help-center/faq/post?id=${row.id}`)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u7F16\u8F91 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_popconfirm, {
                    title: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u95EE\u9898\u5417\uFF1F",
                    onConfirm: ($event) => handleDelete(row.id)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "danger",
                        link: "",
                        size: "small"
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
      _push(`<div class="pagination-row" data-v-1c3d4b06>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/help-center/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c3d4b06"]]);

export { faq as default };
//# sourceMappingURL=faq-BJ7RB-iQ.mjs.map
