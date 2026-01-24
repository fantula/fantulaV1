import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, p as plus_default, ah as ElMessage } from './server.mjs';
import { a as ElTable, E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElPagination } from './index-Da73tUO2.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { a as adminCommunityApi } from './community-DrIiPHjK.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
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
import './index-D_b573Qt.mjs';
import './index-Dxw_X3Hq.mjs';
import './index-CIoWkt90.mjs';
import '@popperjs/core';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-BlpH41lu.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-ClPmkyX9.mjs';
import './index-pXKVpQSb.mjs';
import './strings-D1uxkXhq.mjs';
import './index-Bf1ETwA6.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-Dg8Z-nTr.mjs';
import './validator-T0bsmJHo.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const loading = ref(false);
    const articles = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const categories = ref([]);
    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };
    const getCategoryLabel = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.name : id || "\u672A\u5206\u7C7B";
    };
    const getCategoryColor = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.color : "var(--el-text-color-secondary)";
    };
    const fetchArticles = async () => {
      loading.value = true;
      try {
        const { data, total: count, error } = await adminCommunityApi.getArticles(currentPage.value, pageSize.value);
        if (error) throw error;
        articles.value = data || [];
        total.value = count || 0;
      } catch (error) {
        ElMessage.error("\u83B7\u53D6\u5217\u8868\u5931\u8D25: " + error.message);
      } finally {
        loading.value = false;
      }
    };
    const handleEdit = (row) => {
      router.push({
        path: "/_mgmt_9Xfa3/article/post",
        query: { id: row.id }
      });
    };
    const handleTogglePublish = async (row) => {
      const newState = !row.is_published;
      try {
        const { error } = await adminCommunityApi.updateArticle(row.id, { is_published: newState });
        if (error) throw error;
        row.is_published = newState;
        ElMessage.success(newState ? "\u5DF2\u53D1\u5E03" : "\u5DF2\u4E0B\u67B6");
      } catch (error) {
        ElMessage.error("\u64CD\u4F5C\u5931\u8D25: " + error.message);
      }
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u7BC7\u6587\u7AE0\u5417\uFF1F\u6B64\u7C7B\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D", "\u8B66\u544A", {
        confirmButtonText: "\u786E\u5B9A\u5220\u9664",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(async () => {
        try {
          const { error } = await adminCommunityApi.deleteArticle(row.id);
          if (error) throw error;
          ElMessage.success("\u5220\u9664\u6210\u529F");
          fetchArticles();
        } catch (error) {
          ElMessage.error("\u5220\u9664\u5931\u8D25: " + error.message);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-52b33ed5><div class="page-header" data-v-52b33ed5><h2 class="page-title" data-v-52b33ed5>\u793E\u533A\u6587\u7AE0\u7BA1\u7406</h2>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: ($event) => unref(router).push("/_mgmt_9Xfa3/article/post")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "mr-1" }, {
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
            _push2(` \u53D1\u5E03\u6587\u7AE0 `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "mr-1" }, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              createTextVNode(" \u53D1\u5E03\u6587\u7AE0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="filter-section" data-v-52b33ed5></div><div${ssrRenderAttrs(mergeProps({ class: "table-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-52b33ed5>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: articles.value,
        border: "",
        style: { "width": "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "id",
              label: "ID",
              width: "180",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5C01\u9762",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_image, {
                    style: { "width": "60px", "height": "40px", "border-radius": "4px" },
                    src: row.cover_image,
                    "preview-src-list": [row.cover_image],
                    fit: "cover"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_image, {
                      style: { "width": "60px", "height": "40px", "border-radius": "4px" },
                      src: row.cover_image,
                      "preview-src-list": [row.cover_image],
                      fit: "cover"
                    }, null, 8, ["src", "preview-src-list"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "title",
              label: "\u6807\u9898",
              "min-width": "200",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "category",
              label: "\u5206\u7C7B",
              width: "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    style: { borderColor: getCategoryColor(row.category), color: getCategoryColor(row.category), backgroundColor: "transparent" },
                    effect: "plain"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getCategoryLabel(row.category))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getCategoryLabel(row.category)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      style: { borderColor: getCategoryColor(row.category), color: getCategoryColor(row.category), backgroundColor: "transparent" },
                      effect: "plain"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getCategoryLabel(row.category)), 1)
                      ]),
                      _: 2
                    }, 1032, ["style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "views",
              label: "\u9605\u8BFB\u91CF",
              width: "100"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u72B6\u6001",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: row.is_published ? "success" : "info"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.is_published ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.is_published ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: row.is_published ? "success" : "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.is_published ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "created_at",
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
                    onClick: ($event) => handleTogglePublish(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.is_published ? "\u4E0B\u67B6" : "\u53D1\u5E03")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.is_published ? "\u4E0B\u67B6" : "\u53D1\u5E03"), 1)
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
                      onClick: ($event) => handleTogglePublish(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.is_published ? "\u4E0B\u67B6" : "\u53D1\u5E03"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
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
                prop: "id",
                label: "ID",
                width: "180",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                label: "\u5C01\u9762",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_image, {
                    style: { "width": "60px", "height": "40px", "border-radius": "4px" },
                    src: row.cover_image,
                    "preview-src-list": [row.cover_image],
                    fit: "cover"
                  }, null, 8, ["src", "preview-src-list"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "title",
                label: "\u6807\u9898",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "category",
                label: "\u5206\u7C7B",
                width: "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    style: { borderColor: getCategoryColor(row.category), color: getCategoryColor(row.category), backgroundColor: "transparent" },
                    effect: "plain"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getCategoryLabel(row.category)), 1)
                    ]),
                    _: 2
                  }, 1032, ["style"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "views",
                label: "\u9605\u8BFB\u91CF",
                width: "100"
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: row.is_published ? "success" : "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.is_published ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "created_at",
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
                    onClick: ($event) => handleTogglePublish(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.is_published ? "\u4E0B\u67B6" : "\u53D1\u5E03"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
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
      _push(`<div class="pagination-container" data-v-52b33ed5>`);
      _push(ssrRenderComponent(_component_el_pagination, {
        "current-page": currentPage.value,
        "onUpdate:currentPage": ($event) => currentPage.value = $event,
        "page-size": pageSize.value,
        "onUpdate:pageSize": ($event) => pageSize.value = $event,
        total: total.value,
        "page-sizes": [10, 20, 50],
        layout: "total, sizes, prev, pager, next, jumper",
        onSizeChange: fetchArticles,
        onCurrentChange: fetchArticles
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/article/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52b33ed5"]]);

export { index as default };
//# sourceMappingURL=index-BxbV-7sZ.mjs.map
