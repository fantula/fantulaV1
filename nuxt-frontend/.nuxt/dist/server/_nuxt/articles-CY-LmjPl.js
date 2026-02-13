import { E as ElButton } from "./index-DV2Xa1Kj.js";
import { E as ElTableColumn } from "./index-ghXUvVLW.js";
import { E as ElImage } from "./index-ALppOkb6.js";
import { E as ElTag } from "./index-CzsgKIaa.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                         */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { a as adminArticleApi } from "./help-center-DNLjTRh2.js";
import { p as plus_default } from "./index-DuV_oMrC.js";
import { P as PageTipHeader } from "./PageTipHeader-Dofk1SFn.js";
import { A as AdminActionCard } from "./AdminActionCard-CU3C31Qp.js";
import { A as AdminDataTable } from "./AdminDataTable-CJO5xpdf.js";
import { c as confirmDelete } from "./useAdminDialog-DGlLxLb0.js";
import { u as useBizFormat } from "./useBizFormat-DFfhmR3x.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-Ho-fELR6.js";
import { _ as _export_sfc } from "../server.mjs";
import "./icon-CyvpkMdQ.js";
import "./index-xMedQC9S.js";
import "lodash-unified";
import "@vue/shared";
import "./index-CsSUb8pm.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-Dt87SALX.js";
import "./use-form-item-VP6j78iG.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CVMnQJck.js";
import "./index-C88l1uRA.js";
import "./index-B8mpCVSS.js";
import "@popperjs/core";
import "./focus-trap.vue-CG7JU5b_.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-7GSISQj3.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./typescript-D6L75muK.js";
import "./index-CC_9xuAU.js";
import "./scroll-DHYrZ40v.js";
import "./index-Cy25Tved.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./index-B4LZdJVK.js";
import "./vnode-BKSxKQVt.js";
/* empty css                  */
import "./index-BWwwK9Wh.js";
/* empty css                    */
import "./index-B_8BWUnE.js";
import "./index-BDljrZG0.js";
import "./index-z3smHzuf.js";
import "./strings-D1uxkXhq.js";
import "./index-DHiqjM1w.js";
import "./index-BKas9GMw.js";
import "./directive-DOWfgPYe.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                  */
/* empty css                    */
/* empty css                        */
/* empty css                    */
import "./index-CJRqI9Bk.js";
import "./index-wSws2F9U.js";
import "./validator-B2QmXMzy.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
  __name: "articles",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const loading = ref(false);
    const articles2 = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const categories = ref([]);
    const { formatDate } = useBizFormat();
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
        const { data, total: count, error } = await adminArticleApi.getArticles(currentPage.value, pageSize.value);
        if (error) throw error;
        articles2.value = data || [];
        total.value = count || 0;
      } catch (error) {
        ElMessage.error("获取列表失败: " + (error.message || String(error)));
      } finally {
        loading.value = false;
      }
    };
    const handleEdit = (row) => {
      router.push({
        path: "/admin/help-center/articles/post",
        query: { id: row.id }
      });
    };
    const handleTogglePublish = async (row) => {
      const newState = !row.is_published;
      try {
        const { error } = await adminArticleApi.updateArticle(row.id, { is_published: newState });
        if (error) throw error;
        row.is_published = newState;
        ElMessage.success(newState ? "已发布" : "已下架");
      } catch (error) {
        ElMessage.error("操作失败: " + (error.message || String(error)));
      }
    };
    const handleDelete = async (row) => {
      await confirmDelete(
        "确定要删除这篇文章吗？此类操作不可恢复",
        async () => {
          const { error } = await adminArticleApi.deleteArticle(row.id);
          if (error) throw new Error(error.message || String(error));
          await fetchArticles();
          return { success: true };
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-60c24ce6>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "文章管理",
        description: "发布和管理帮助中心的内容文章。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              onClick: ($event) => unref(router).push("/admin/help-center/articles/post")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`发布文章`);
                } else {
                  return [
                    createTextVNode("发布文章")
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
                onClick: ($event) => unref(router).push("/admin/help-center/articles/post")
              }, {
                default: withCtx(() => [
                  createTextVNode("发布文章")
                ]),
                _: 1
              }, 8, ["icon", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: articles2.value,
        loading: loading.value,
        total: total.value,
        "current-page": currentPage.value,
        "onUpdate:currentPage": [($event) => currentPage.value = $event, fetchArticles],
        "page-size": pageSize.value,
        "onUpdate:pageSize": [($event) => pageSize.value = $event, fetchArticles],
        class: "mt-4"
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
                    fit: "cover",
                    "preview-teleported": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_image, {
                      style: { "width": "60px", "height": "40px", "border-radius": "4px" },
                      src: row.cover_image,
                      "preview-src-list": [row.cover_image],
                      fit: "cover",
                      "preview-teleported": ""
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
              fixed: "right",
              align: "right"
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
                    fit: "cover",
                    "preview-teleported": ""
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
                  createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "200",
                fixed: "right",
                align: "right"
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/help-center/articles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const articles = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-60c24ce6"]]);
export {
  articles as default
};
//# sourceMappingURL=articles-CY-LmjPl.js.map
