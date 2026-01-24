import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElIcon, p as plus_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { a as ElTable, E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElPagination } from "./index-cR1ntQxK.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                */
/* empty css                         */
/* empty css                       */
/* empty css                   */
/* empty css                  */
/* empty css                        */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { a as adminCommunityApi } from "./community-DrIiPHjK.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-D_b573Qt.js";
import "./index-Dxw_X3Hq.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-DrPRyc7n.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./index-ClPmkyX9.js";
import "./index-Cf_t59lc.js";
import "./strings-D1uxkXhq.js";
import "./index-Bf1ETwA6.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-Dg8Z-nTr.js";
import "./validator-T0bsmJHo.js";
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
      return cat ? cat.name : id || "未分类";
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
        ElMessage.error("获取列表失败: " + error.message);
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
        ElMessage.success(newState ? "已发布" : "已下架");
      } catch (error) {
        ElMessage.error("操作失败: " + error.message);
      }
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("确定要删除这篇文章吗？此类操作不可恢复", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          const { error } = await adminCommunityApi.deleteArticle(row.id);
          if (error) throw error;
          ElMessage.success("删除成功");
          fetchArticles();
        } catch (error) {
          ElMessage.error("删除失败: " + error.message);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-52b33ed5><div class="page-header" data-v-52b33ed5><h2 class="page-title" data-v-52b33ed5>社区文章管理</h2>`);
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
            _push2(` 发布文章 `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "mr-1" }, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              createTextVNode(" 发布文章 ")
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
              label: "封面",
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
              label: "标题",
              "min-width": "200",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "category",
              label: "分类",
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
              label: "阅读量",
              width: "100"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: row.is_published ? "success" : "info"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.is_published ? "已发布" : "草稿")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.is_published ? "已发布" : "草稿"), 1)
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
                        createTextVNode(toDisplayString(row.is_published ? "已发布" : "草稿"), 1)
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
              label: "创建时间",
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
              label: "操作",
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
                        _push4(`编辑`);
                      } else {
                        return [
                          createTextVNode("编辑")
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
                        _push4(`${ssrInterpolate(row.is_published ? "下架" : "发布")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.is_published ? "下架" : "发布"), 1)
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
                      link: "",
                      type: "primary",
                      onClick: ($event) => handleEdit(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "success",
                      onClick: ($event) => handleTogglePublish(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.is_published ? "下架" : "发布"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "danger",
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
                prop: "id",
                label: "ID",
                width: "180",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                label: "封面",
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
                label: "标题",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "category",
                label: "分类",
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
                label: "阅读量",
                width: "100"
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: row.is_published ? "success" : "info"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.is_published ? "已发布" : "草稿"), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "created_at",
                label: "创建时间",
                width: "180"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
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
                    onClick: ($event) => handleEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "success",
                    onClick: ($event) => handleTogglePublish(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.is_published ? "下架" : "发布"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
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
export {
  index as default
};
//# sourceMappingURL=index-BQIj21bO.js.map
