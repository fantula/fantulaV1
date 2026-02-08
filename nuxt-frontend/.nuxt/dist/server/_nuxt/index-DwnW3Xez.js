import { E as ElCard } from "./index-DIUT_jMU.js";
import { E as ElSelect, a as ElOption } from "./index-CHDWEhch.js";
import { E as ElInput } from "./index-DfZ5KWBt.js";
import { E as ElIcon } from "./index-jl2vZbkg.js";
import { E as ElButton } from "./index-Cfk6gFRD.js";
import { E as ElTag } from "./index-CAqDGa72.js";
import { E as ElEmpty } from "./index-DHhizeNf.js";
import { a as ElCheckbox } from "./index-D4pu9U8U.js";
import { E as ElImage } from "./index-BmjXUoge.js";
import { E as ElPagination } from "./index-2hf2A4Op.js";
import { E as ElDialog } from "./index-Dhc7L6Kv.js";
import { E as ElDivider } from "./index-sO8Yjc2X.js";
import { E as ElForm, a as ElFormItem } from "./index-BHYewqHp.js";
import { E as ElUpload } from "./index-5J0LyWSE.js";
import { v as vLoading } from "./directive-BBpaOxz2.js";
/* empty css              */
/* empty css                 */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                         */
/* empty css                       */
/* empty css                   */
/* empty css                    */
/* empty css                    */
/* empty css                 */
/* empty css                      */
/* empty css                     */
/* empty css                    */
/* empty css                        */
/* empty css                    */
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, unref, createTextVNode, toDisplayString, withKeys, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { I as search_default, q as refresh_default, X as upload_default } from "./index-DlETah8a.js";
import { b as adminApi } from "./index-CUCx8vYk.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useSupabaseSession } from "./useSupabaseSession-D0X5WUcm.js";
import { E as ElMessageBox } from "./index-C_BEi-G8.js";
import { E as ElMessage } from "./index-DSo6N35Z.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./use-global-config-79yNXOXL.js";
import "./index-K5TIzHX_.js";
import "./objects-Bz74KHmq.js";
import "./index-BgvvVJ20.js";
import "@popperjs/core";
import "./index-DqrhOzxH.js";
import "@vueuse/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./constants-hAKFmBbq.js";
import "./index-CmHlMPx0.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BuMAfCNC.js";
import "./raf-CQRaPAjg.js";
import "./use-form-item-Bhmdieo-.js";
import "./icon-CK7WLSPl.js";
import "./event-BZTOGHfp.js";
import "./vnode-BKSxKQVt.js";
import "./typescript-D6L75muK.js";
import "./index-Cy25Tved.js";
import "@ctrl/tinycolor";
import "./index-7KygWwCI.js";
import "./index-CuQ4LNHg.js";
import "./refs-CxYYXu5Q.js";
import "async-validator";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./cdk-BcOf0oEp.js";
import "./coupon-DnjcrSN8.js";
import "./media-DksayCA2.js";
import "./order-BDjtswS6.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "./validator-BaQl3RdN.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
    const filterCategoryId = ref("");
    const searchKeyword = ref("");
    const catDialogVisible = ref(false);
    const uploadDialogVisible = ref(false);
    const editDialogVisible = ref(false);
    const session = useSupabaseSession();
    const categories = ref([]);
    const fetchCategories = async () => {
      const res = await adminApi.imageCategory.getCategories();
      if (res.success) {
        categories.value = res.categories;
      }
    };
    const images = ref([]);
    const selectedIds = ref([]);
    const toggleSelect = (id) => {
      const index2 = selectedIds.value.indexOf(id);
      if (index2 > -1) {
        selectedIds.value.splice(index2, 1);
      } else {
        selectedIds.value.push(id);
      }
    };
    const handleBatchDelete = () => {
      if (selectedIds.value.length === 0) return;
      ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.length} 张图片吗？此操作不可恢复。`, "批量删除", {
        type: "warning"
      }).then(async () => {
        loading.value = true;
        try {
          const token = session.value?.access_token;
          const res = await adminApi.image.deleteImages(selectedIds.value, token);
          if (res.success) {
            ElMessage.success("批量删除成功");
            selectedIds.value = [];
            await fetchData();
          } else {
            ElMessage.error("删除失败: " + res.error);
          }
        } finally {
          loading.value = false;
        }
      });
    };
    const fetchData = async () => {
      loading.value = true;
      try {
        const res = await adminApi.image.getImages({
          category_id: filterCategoryId.value,
          keyword: searchKeyword.value
        });
        if (res.success) {
          images.value = res.images;
        } else {
          ElMessage.error("加载图片失败: " + res.error);
        }
      } finally {
        loading.value = false;
      }
    };
    const syncing = ref(false);
    const syncFromR2 = async () => {
      syncing.value = true;
      try {
        const token = session.value?.access_token;
        if (!token) {
          ElMessage.error("无法获取登录凭证，请刷新页面或重新登录");
          return;
        }
        const { EDGE_FUNCTIONS_URL } = await import("./supabase-jxF0-7J3.js");
        const response = await fetch(`${EDGE_FUNCTIONS_URL}/list-r2`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prefix: "uploads/" })
          // Explicitly sync only uploads folder
        });
        const result = await response.json();
        if (!response.ok || result.error) {
          ElMessage.error("获取 R2 列表失败: " + (result.error || "未知错误"));
          return;
        }
        const r2Objects = result.objects || [];
        if (r2Objects.length === 0) {
          ElMessage.info("R2 uploads 文件夹中没有图片");
          return;
        }
        const existingUrls = new Set(images.value.map((img) => img.url));
        const missingObjects = r2Objects.filter(
          (obj) => obj.key.startsWith("uploads/") && !existingUrls.has(obj.url)
        );
        if (missingObjects.length === 0) {
          ElMessage.success("已同步，无新图片");
          return;
        }
        let uncategorizedId = "";
        const uncategorizedCat = categories.value.find((c) => c.name === "未分类");
        if (uncategorizedCat) {
          uncategorizedId = uncategorizedCat.id;
        } else {
          const createRes = await adminApi.imageCategory.createCategory("未分类");
          if (createRes.success && createRes.category) {
            uncategorizedId = createRes.category.id;
            await fetchCategories();
          }
        }
        let addedCount = 0;
        for (const obj of missingObjects) {
          const name = obj.key.split("/").pop() || obj.key;
          const res = await adminApi.image.createImage({
            name,
            url: obj.url,
            category_id: uncategorizedId || void 0
          });
          if (res.success) addedCount++;
        }
        ElMessage.success(`同步成功！新增 ${addedCount} 张图片`);
        await fetchData();
      } catch (error) {
        console.error("Sync error:", error);
        ElMessage.error("同步失败: " + (error.message || "未知错误"));
      } finally {
        syncing.value = false;
      }
    };
    const filteredImages = computed(() => images.value);
    const newCatName = ref("");
    const openCategoryManager = () => {
      catDialogVisible.value = true;
    };
    const addCategory = async () => {
      if (!newCatName.value.trim()) {
        ElMessage.warning("请输入分类名称");
        return;
      }
      const res = await adminApi.imageCategory.createCategory(newCatName.value);
      if (res.success) {
        ElMessage.success("分类添加成功");
        newCatName.value = "";
        fetchCategories();
      } else {
        ElMessage.error("添加失败: " + res.error);
      }
    };
    const deleteCategory = (cat) => {
      ElMessageBox.confirm(`确认删除分类 "${cat.name}" 吗？`, "删除分类", {
        type: "warning"
      }).then(async () => {
        const res = await adminApi.imageCategory.deleteCategory(cat.id);
        if (res.success) {
          ElMessage.success("分类删除成功");
          fetchCategories();
        } else {
          ElMessage.error("删除失败: " + res.error);
        }
      });
    };
    const uploadForm = reactive({
      categoryId: "",
      name: ""
    });
    const fileList = ref([]);
    const uploading = ref(false);
    const openUpload = () => {
      uploadDialogVisible.value = true;
    };
    const handleFileChange = (file, fileListRef) => {
      fileList.value = fileListRef;
      if (!uploadForm.name && file.name) {
        uploadForm.name = file.name;
      }
    };
    const submitUpload = async () => {
      if (!uploadForm.categoryId) {
        ElMessage.warning("请选择分类");
        return;
      }
      if (fileList.value.length === 0) {
        ElMessage.warning("请选择图片文件");
        return;
      }
      if (uploadForm.name && uploadForm.name.length > 50) {
        ElMessage.warning("图片名称过长，请精简");
        return;
      }
      uploading.value = true;
      try {
        const file = fileList.value[0].raw;
        const token = session.value?.access_token;
        if (!token) {
          ElMessage.error("请登录");
          uploading.value = false;
          return;
        }
        const { uploadImageToStorage } = await import("./uploadImage-DZo6xiHb.js");
        const uploadRes = await uploadImageToStorage(file, "uploads", void 0, token);
        if (!uploadRes.success) {
          ElMessage.error("文件上传失败: " + uploadRes.error);
          uploading.value = false;
          return;
        }
        const res = await adminApi.image.createImage({
          name: uploadForm.name || file.name,
          url: uploadRes.url,
          // 使用真实上传后的 URL
          category_id: uploadForm.categoryId
        });
        if (res.success) {
          ElMessage.success("上传成功");
          uploadDialogVisible.value = false;
          selectedIds.value = [];
          await fetchData();
        } else {
          ElMessage.error("保存图片记录失败: " + res.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        ElMessage.error("上传失败: " + (error.message || "未知错误"));
      } finally {
        uploading.value = false;
      }
    };
    const resetUploadForm = () => {
      uploadForm.categoryId = "";
      uploadForm.name = "";
      fileList.value = [];
    };
    const editForm = reactive({
      id: "",
      name: "",
      category_id: ""
    });
    const handleEdit = (img) => {
      editForm.id = img.id;
      editForm.name = img.name;
      editForm.category_id = img.category_id || "";
      editDialogVisible.value = true;
    };
    const confirmEdit = async () => {
      const res = await adminApi.image.updateImage(editForm.id, {
        name: editForm.name,
        category_id: editForm.category_id
      });
      if (res.success) {
        ElMessage.success("修改成功");
        editDialogVisible.value = false;
        await fetchData();
      } else {
        ElMessage.error("修改失败: " + res.error);
      }
    };
    const handleDelete = (img) => {
      ElMessageBox.confirm("确认删除该图片吗？此操作无法恢复。", "删除图片", {
        type: "warning"
      }).then(async () => {
        const token = session.value?.access_token;
        const res = await adminApi.image.deleteImage(img.id, token);
        if (res.success) {
          ElMessage.success("已删除");
          await fetchData();
        } else {
          ElMessage.error("删除失败: " + res.error);
        }
      });
    };
    const handleSearch = () => {
      fetchData();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_empty = ElEmpty;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_image = ElImage;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_divider = ElDivider;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_upload = ElUpload;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "image-page" }, _attrs))} data-v-6af513cf><div class="page-header" data-v-6af513cf><h2 data-v-6af513cf>图片管理</h2></div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "filter-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-container" data-v-6af513cf${_scopeId}><div class="filter-left" data-v-6af513cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filterCategoryId.value,
              "onUpdate:modelValue": ($event) => filterCategoryId.value = $event,
              placeholder: "选择分类",
              clearable: "",
              style: { "width": "150px", "margin-right": "15px" },
              onChange: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "全部图片",
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
                      label: "全部图片",
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
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: searchKeyword.value,
              "onUpdate:modelValue": ($event) => searchKeyword.value = $event,
              placeholder: "搜索图片名称",
              clearable: "",
              style: { "width": "200px", "margin-right": "15px" },
              onKeyup: handleSearch
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
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleSearch
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
            _push2(`</div><div class="filter-right" data-v-6af513cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, { onClick: openCategoryManager }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`管理分类`);
                } else {
                  return [
                    createTextVNode("管理分类")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "danger",
              disabled: selectedIds.value.length === 0,
              onClick: handleBatchDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 批量删除 ${ssrInterpolate(selectedIds.value.length ? `(${selectedIds.value.length})` : "")}`);
                } else {
                  return [
                    createTextVNode(" 批量删除 " + toDisplayString(selectedIds.value.length ? `(${selectedIds.value.length})` : ""), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "success",
              icon: unref(refresh_default),
              onClick: syncFromR2,
              loading: syncing.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`从 R2 同步`);
                } else {
                  return [
                    createTextVNode("从 R2 同步")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(upload_default),
              onClick: openUpload
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上传图片`);
                } else {
                  return [
                    createTextVNode("上传图片")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (categories.value.length > 0) {
              _push2(`<div class="category-display" data-v-6af513cf${_scopeId}><span class="cat-label" data-v-6af513cf${_scopeId}>已有分类：</span><div class="cat-tags" data-v-6af513cf${_scopeId}><!--[-->`);
              ssrRenderList(categories.value, (cat) => {
                _push2(ssrRenderComponent(_component_el_tag, {
                  key: cat.id,
                  type: "info",
                  class: "mr-2",
                  style: { "margin-right": "8px" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(cat.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(cat.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "filter-container" }, [
                createVNode("div", { class: "filter-left" }, [
                  createVNode(_component_el_select, {
                    modelValue: filterCategoryId.value,
                    "onUpdate:modelValue": ($event) => filterCategoryId.value = $event,
                    placeholder: "选择分类",
                    clearable: "",
                    style: { "width": "150px", "margin-right": "15px" },
                    onChange: handleSearch
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "全部图片",
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
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_input, {
                    modelValue: searchKeyword.value,
                    "onUpdate:modelValue": ($event) => searchKeyword.value = $event,
                    placeholder: "搜索图片名称",
                    clearable: "",
                    style: { "width": "200px", "margin-right": "15px" },
                    onKeyup: withKeys(handleSearch, ["enter"])
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
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: handleSearch
                  }, {
                    default: withCtx(() => [
                      createTextVNode("查询")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "filter-right" }, [
                  createVNode(_component_el_button, { onClick: openCategoryManager }, {
                    default: withCtx(() => [
                      createTextVNode("管理分类")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "danger",
                    disabled: selectedIds.value.length === 0,
                    onClick: handleBatchDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 批量删除 " + toDisplayString(selectedIds.value.length ? `(${selectedIds.value.length})` : ""), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_el_button, {
                    type: "success",
                    icon: unref(refresh_default),
                    onClick: syncFromR2,
                    loading: syncing.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode("从 R2 同步")
                    ]),
                    _: 1
                  }, 8, ["icon", "loading"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    icon: unref(upload_default),
                    onClick: openUpload
                  }, {
                    default: withCtx(() => [
                      createTextVNode("上传图片")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ])
              ]),
              categories.value.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "category-display"
              }, [
                createVNode("span", { class: "cat-label" }, "已有分类："),
                createVNode("div", { class: "cat-tags" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                    return openBlock(), createBlock(_component_el_tag, {
                      key: cat.id,
                      type: "info",
                      class: "mr-2",
                      style: { "margin-right": "8px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(cat.name), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, mergeProps({
        shadow: "never",
        class: "list-card"
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (filteredImages.value.length === 0) {
              _push2(`<div class="empty-state" data-v-6af513cf${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, { description: "暂无图片" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="image-grid" data-v-6af513cf${_scopeId}><!--[-->`);
              ssrRenderList(filteredImages.value, (img) => {
                _push2(`<div class="${ssrRenderClass([{ "is-selected": selectedIds.value.includes(img.id) }, "image-card"])}" data-v-6af513cf${_scopeId}><div class="card-selection" data-v-6af513cf${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_checkbox, {
                  "model-value": selectedIds.value.includes(img.id),
                  size: "large",
                  style: { "pointer-events": "none" }
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="image-wrapper" data-v-6af513cf${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_image, {
                  src: img.url,
                  fit: "cover",
                  class: "image-thumb",
                  "preview-src-list": [img.url],
                  "initial-index": 0,
                  "z-index": 3e3,
                  "preview-teleported": ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="image-info" data-v-6af513cf${_scopeId}><div class="image-header" data-v-6af513cf${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_tag, {
                  size: "small",
                  type: "info",
                  effect: "plain",
                  class: "cat-tag"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(img.category?.name || "未分类")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(img.category?.name || "未分类"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="image-name"${ssrRenderAttr("title", img.name)} data-v-6af513cf${_scopeId}>${ssrInterpolate(img.name)}</div><div class="image-actions" data-v-6af513cf${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  link: "",
                  type: "primary",
                  size: "small",
                  onClick: ($event) => handleEdit(img)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`编辑`);
                    } else {
                      return [
                        createTextVNode("编辑")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  link: "",
                  type: "danger",
                  size: "small",
                  onClick: ($event) => handleDelete(img)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`删除`);
                    } else {
                      return [
                        createTextVNode("删除")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`<div class="pagination-wrapper" style="${ssrRenderStyle({ "margin-top": "20px", "display": "flex", "justify-content": "flex-end" })}" data-v-6af513cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              background: "",
              layout: "prev, pager, next",
              total: filteredImages.value.length,
              "page-size": 20
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              filteredImages.value.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode(_component_el_empty, { description: "暂无图片" })
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "image-grid"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (img) => {
                  return openBlock(), createBlock("div", {
                    key: img.id,
                    class: ["image-card", { "is-selected": selectedIds.value.includes(img.id) }]
                  }, [
                    createVNode("div", {
                      class: "card-selection",
                      onClick: withModifiers(($event) => toggleSelect(img.id), ["stop"])
                    }, [
                      createVNode(_component_el_checkbox, {
                        "model-value": selectedIds.value.includes(img.id),
                        size: "large",
                        style: { "pointer-events": "none" }
                      }, null, 8, ["model-value"])
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "image-wrapper" }, [
                      createVNode(_component_el_image, {
                        src: img.url,
                        fit: "cover",
                        class: "image-thumb",
                        "preview-src-list": [img.url],
                        "initial-index": 0,
                        "z-index": 3e3,
                        "preview-teleported": ""
                      }, null, 8, ["src", "preview-src-list"])
                    ]),
                    createVNode("div", { class: "image-info" }, [
                      createVNode("div", { class: "image-header" }, [
                        createVNode(_component_el_tag, {
                          size: "small",
                          type: "info",
                          effect: "plain",
                          class: "cat-tag"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(img.category?.name || "未分类"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      createVNode("div", {
                        class: "image-name",
                        title: img.name
                      }, toDisplayString(img.name), 9, ["title"]),
                      createVNode("div", { class: "image-actions" }, [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: ($event) => handleEdit(img)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("编辑")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger",
                          size: "small",
                          onClick: ($event) => handleDelete(img)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ], 2);
                }), 128))
              ])),
              createVNode("div", {
                class: "pagination-wrapper",
                style: { "margin-top": "20px", "display": "flex", "justify-content": "flex-end" }
              }, [
                createVNode(_component_el_pagination, {
                  background: "",
                  layout: "prev, pager, next",
                  total: filteredImages.value.length,
                  "page-size": 20
                }, null, 8, ["total"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: catDialogVisible.value,
        "onUpdate:modelValue": ($event) => catDialogVisible.value = $event,
        title: "分类管理",
        width: "500px",
        "append-to-body": "",
        "z-index": 2e3
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cat-manager" data-v-6af513cf${_scopeId}><div class="add-cat-row" data-v-6af513cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: newCatName.value,
              "onUpdate:modelValue": ($event) => newCatName.value = $event,
              placeholder: "新分类名称",
              style: { "margin-right": "10px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: addCategory
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加分类`);
                } else {
                  return [
                    createTextVNode("添加分类")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
            _push2(`<div class="cat-list" data-v-6af513cf${_scopeId}><!--[-->`);
            ssrRenderList(categories.value, (cat) => {
              _push2(`<div class="cat-item" data-v-6af513cf${_scopeId}><span data-v-6af513cf${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
              _push2(ssrRenderComponent(_component_el_button, {
                link: "",
                type: "danger",
                size: "small",
                onClick: ($event) => deleteCategory(cat)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`删除`);
                  } else {
                    return [
                      createTextVNode("删除")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "cat-manager" }, [
                createVNode("div", { class: "add-cat-row" }, [
                  createVNode(_component_el_input, {
                    modelValue: newCatName.value,
                    "onUpdate:modelValue": ($event) => newCatName.value = $event,
                    placeholder: "新分类名称",
                    style: { "margin-right": "10px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: addCategory
                  }, {
                    default: withCtx(() => [
                      createTextVNode("添加分类")
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_el_divider),
                createVNode("div", { class: "cat-list" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                    return openBlock(), createBlock("div", {
                      key: cat.id,
                      class: "cat-item"
                    }, [
                      createVNode("span", null, toDisplayString(cat.name), 1),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger",
                        size: "small",
                        onClick: ($event) => deleteCategory(cat)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: uploadDialogVisible.value,
        "onUpdate:modelValue": ($event) => uploadDialogVisible.value = $event,
        title: "上传图片",
        width: "500px",
        onClosed: resetUploadForm,
        "append-to-body": "",
        "z-index": 2e3
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-6af513cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => uploadDialogVisible.value = false
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
              onClick: submitUpload,
              loading: uploading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`开始上传`);
                } else {
                  return [
                    createTextVNode("开始上传")
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
                  onClick: ($event) => uploadDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitUpload,
                  loading: uploading.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("开始上传")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: uploadForm,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "所属分类",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: uploadForm.categoryId,
                          "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                          placeholder: "请选择分类",
                          style: { "width": "100%" }
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
                            modelValue: uploadForm.categoryId,
                            "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                            placeholder: "请选择分类",
                            style: { "width": "100%" }
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "图片名称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: uploadForm.name,
                          "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                          placeholder: "默认使用文件名"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: uploadForm.name,
                            "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                            placeholder: "默认使用文件名"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "选择图片",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_upload, {
                          class: "upload-demo",
                          action: "#",
                          "auto-upload": false,
                          limit: 1,
                          "on-change": handleFileChange,
                          "file-list": fileList.value,
                          "list-type": "picture"
                        }, {
                          tip: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="el-upload__tip" data-v-6af513cf${_scopeId4}>只能上传 jpg/png 文件，且不超过 2MB</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "el-upload__tip" }, "只能上传 jpg/png 文件，且不超过 2MB")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_button, { type: "primary" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`点击选择文件`);
                                  } else {
                                    return [
                                      createTextVNode("点击选择文件")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_button, { type: "primary" }, {
                                  default: withCtx(() => [
                                    createTextVNode("点击选择文件")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_upload, {
                            class: "upload-demo",
                            action: "#",
                            "auto-upload": false,
                            limit: 1,
                            "on-change": handleFileChange,
                            "file-list": fileList.value,
                            "list-type": "picture"
                          }, {
                            tip: withCtx(() => [
                              createVNode("div", { class: "el-upload__tip" }, "只能上传 jpg/png 文件，且不超过 2MB")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_button, { type: "primary" }, {
                                default: withCtx(() => [
                                  createTextVNode("点击选择文件")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["file-list"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "所属分类",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: uploadForm.categoryId,
                          "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                          placeholder: "请选择分类",
                          style: { "width": "100%" }
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
                    createVNode(_component_el_form_item, { label: "图片名称" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: uploadForm.name,
                          "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                          placeholder: "默认使用文件名"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "选择图片",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_upload, {
                          class: "upload-demo",
                          action: "#",
                          "auto-upload": false,
                          limit: 1,
                          "on-change": handleFileChange,
                          "file-list": fileList.value,
                          "list-type": "picture"
                        }, {
                          tip: withCtx(() => [
                            createVNode("div", { class: "el-upload__tip" }, "只能上传 jpg/png 文件，且不超过 2MB")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_button, { type: "primary" }, {
                              default: withCtx(() => [
                                createTextVNode("点击选择文件")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["file-list"])
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
                model: uploadForm,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "所属分类",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: uploadForm.categoryId,
                        "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                        placeholder: "请选择分类",
                        style: { "width": "100%" }
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
                  createVNode(_component_el_form_item, { label: "图片名称" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: uploadForm.name,
                        "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                        placeholder: "默认使用文件名"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "选择图片",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_upload, {
                        class: "upload-demo",
                        action: "#",
                        "auto-upload": false,
                        limit: 1,
                        "on-change": handleFileChange,
                        "file-list": fileList.value,
                        "list-type": "picture"
                      }, {
                        tip: withCtx(() => [
                          createVNode("div", { class: "el-upload__tip" }, "只能上传 jpg/png 文件，且不超过 2MB")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_button, { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("点击选择文件")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["file-list"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: editDialogVisible.value,
        "onUpdate:modelValue": ($event) => editDialogVisible.value = $event,
        title: "编辑图片信息",
        width: "400px",
        "append-to-body": "",
        "z-index": 2e3
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-6af513cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => editDialogVisible.value = false
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
              onClick: confirmEdit
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
                  onClick: ($event) => editDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: confirmEdit
                }, {
                  default: withCtx(() => [
                    createTextVNode("保存")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: editForm,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "图片名称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: editForm.name,
                          "onUpdate:modelValue": ($event) => editForm.name = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: editForm.name,
                            "onUpdate:modelValue": ($event) => editForm.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "所属分类" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: editForm.category_id,
                          "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                          style: { "width": "100%" }
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
                            modelValue: editForm.category_id,
                            "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                            style: { "width": "100%" }
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
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "图片名称" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: editForm.name,
                          "onUpdate:modelValue": ($event) => editForm.name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "所属分类" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: editForm.category_id,
                          "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                          style: { "width": "100%" }
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: editForm,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "图片名称" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: editForm.name,
                        "onUpdate:modelValue": ($event) => editForm.name = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "所属分类" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: editForm.category_id,
                        "onUpdate:modelValue": ($event) => editForm.category_id = $event,
                        style: { "width": "100%" }
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
                  })
                ]),
                _: 1
              }, 8, ["model"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/images/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6af513cf"]]);
export {
  index as default
};
//# sourceMappingURL=index-DwnW3Xez.js.map
