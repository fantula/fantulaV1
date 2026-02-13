import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElForm, a as ElFormItem } from './index-Bd_1JmUc.mjs';
import { E as ElSelect, a as ElOption } from './index-z3smHzuf.mjs';
import { E as ElInput } from './index-DHiqjM1w.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElTag } from './index-CzsgKIaa.mjs';
import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, withKeys, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as plus_default, at as goods_default } from './index-DuV_oMrC.mjs';
import { b as adminFaqApi } from './help-center-DNLjTRh2.mjs';
import { P as PageTipHeader } from './PageTipHeader-Dofk1SFn.mjs';
import { A as AdminActionCard } from './AdminActionCard-CU3C31Qp.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { a as confirmDelete } from './useAdminDialog-DGlLxLb0.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
import { _ as _export_sfc } from './server.mjs';
import './icon-CyvpkMdQ.mjs';
import './index-xMedQC9S.mjs';
import 'lodash-unified';
import '@vue/shared';
import './use-global-config-Dt87SALX.mjs';
import './objects-Bz74KHmq.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import 'async-validator';
import '@vueuse/core';
import './index-B8mpCVSS.mjs';
import '@popperjs/core';
import './index-C88l1uRA.mjs';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-CVMnQJck.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DHYrZ40v.mjs';
import './raf-CQRaPAjg.mjs';
import './event-BZTOGHfp.mjs';
import './index-BKas9GMw.mjs';
import './vnode-BKSxKQVt.mjs';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
import './index-7GSISQj3.mjs';
import 'normalize-wheel-es';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './index-B4LZdJVK.mjs';
import './index-BWwwK9Wh.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './directive-DOWfgPYe.mjs';
import './index-CJRqI9Bk.mjs';
import './index-wSws2F9U.mjs';
import './validator-B2QmXMzy.mjs';
import './index-CC_9xuAU.mjs';
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
          faqs.value = res.faqs || [];
          total.value = res.total || 0;
        } else {
          ElMessage.error(res.error || "\u83B7\u53D6\u5217\u8868\u5931\u8D25");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u95EE\u9898\u5417\uFF1F",
        async () => {
          const res = await adminFaqApi.deleteFaq(row.id);
          if (res.error) throw new Error(res.error.message || String(res.error));
          await fetchFaqs();
          return { success: true };
        }
      );
    };
    const resetFilter = () => {
      keyword.value = "";
      filterCategory.value = "";
      fetchFaqs();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-d77ba283>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u5E38\u89C1\u95EE\u9898",
        description: "\u7BA1\u7406\u7CFB\u7EDF\u5E38\u89C1\u95EE\u9898\u5217\u8868\u3002"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => _ctx.$router.push("/admin/help-center/faq/post")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6DFB\u52A0\u95EE\u9898`);
                } else {
                  return [
                    createTextVNode("\u6DFB\u52A0\u95EE\u9898")
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
                onClick: ($event) => _ctx.$router.push("/admin/help-center/faq/post")
              }, {
                default: withCtx(() => [
                  createTextVNode("\u6DFB\u52A0\u95EE\u9898")
                ]),
                _: 1
              }, 8, ["icon", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminActionCard, { class: "mt-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
                          placeholder: "\u5168\u90E8\u5206\u7C7B",
                          clearable: "",
                          style: { "width": "150px" }
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: keyword.value,
                          "onUpdate:modelValue": ($event) => keyword.value = $event,
                          placeholder: "\u641C\u7D22\u95EE\u9898\u5173\u952E\u8BCD...",
                          "prefix-icon": "Search",
                          clearable: "",
                          onKeyup: fetchFaqs
                        }, null, _parent4, _scopeId3));
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
                              _push5(`\u67E5\u8BE2`);
                            } else {
                              return [
                                createTextVNode("\u67E5\u8BE2")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, { onClick: resetFilter }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u91CD\u7F6E`);
                            } else {
                              return [
                                createTextVNode("\u91CD\u7F6E")
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
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
          } else {
            return [
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
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: faqs.value,
        loading: loading.value,
        total: total.value,
        "current-page": currentPage.value,
        "onUpdate:currentPage": [($event) => currentPage.value = $event, fetchFaqs],
        "page-size": pageSize.value,
        "onUpdate:pageSize": [($event) => pageSize.value = $event, fetchFaqs],
        class: "mt-4"
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
                  _push3(`<span class="question-text" data-v-d77ba283${_scopeId2}>${ssrInterpolate(row.question)}</span>`);
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
                    _push3(`<span class="text-gray-400" data-v-d77ba283${_scopeId2}>\u672A\u5206\u7C7B</span>`);
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
                    _push3(`<div class="bound-product" data-v-d77ba283${_scopeId2}>`);
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
                    _push3(`<span data-v-d77ba283${_scopeId2}>${ssrInterpolate(row.product.product_name)}</span></div>`);
                  } else {
                    _push3(`<span class="text-gray-400" data-v-d77ba283${_scopeId2}>-</span>`);
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
                    onClick: ($event) => _ctx.$router.push(`/admin/help-center/faq/post?id=${row.id}`)
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
                      onClick: ($event) => _ctx.$router.push(`/admin/help-center/faq/post?id=${row.id}`)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u7F16\u8F91 ")
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
                    onClick: ($event) => _ctx.$router.push(`/admin/help-center/faq/post?id=${row.id}`)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u7F16\u8F91 ")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/help-center/faq/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d77ba283"]]);

export { index as default };
//# sourceMappingURL=index-DWNCzOML.mjs.map
