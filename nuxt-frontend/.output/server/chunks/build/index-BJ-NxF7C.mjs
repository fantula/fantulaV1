import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElSelect, a as ElOption } from './index-Cf_t59lc.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { _ as _export_sfc, E as ElIcon, bJ as search_default, b9 as refresh_default, af as upload_default, ah as ElMessage } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { E as ElCheckbox } from './index-DrPRyc7n.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { E as ElPagination } from './index-cR1ntQxK.mjs';
import { E as ElDialog } from './index-I18rzBgu.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElUpload } from './index-DhXCDWyG.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, unref, createTextVNode, toDisplayString, createCommentVNode, withKeys, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { b as adminApi } from './admin-supabase-nszo-IoU.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
import './index-B9I5bL_Z.mjs';
import '@vueuse/core';
import '@popperjs/core';
import './index-Dxw_X3Hq.mjs';
import 'lodash-unified';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import '@vue/shared';
import './constants-hAKFmBbq.mjs';
import './index-D_b573Qt.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './event-BZTOGHfp.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-ClPmkyX9.mjs';
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
import './index-7IYgoTSU.mjs';
import '@ctrl/tinycolor';
import './index-B-o0CD59.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import 'async-validator';
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';
import './validator-T0bsmJHo.mjs';

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
      ElMessageBox.confirm(`\u786E\u8BA4\u5220\u9664\u9009\u4E2D\u7684 ${selectedIds.value.length} \u5F20\u56FE\u7247\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002`, "\u6279\u91CF\u5220\u9664", {
        type: "warning"
      }).then(async () => {
        loading.value = true;
        try {
          const res = await adminApi.image.deleteImages(selectedIds.value);
          if (res.success) {
            ElMessage.success("\u6279\u91CF\u5220\u9664\u6210\u529F");
            selectedIds.value = [];
            await fetchData();
          } else {
            ElMessage.error("\u5220\u9664\u5931\u8D25: " + res.error);
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
          ElMessage.error("\u52A0\u8F7D\u56FE\u7247\u5931\u8D25: " + res.error);
        }
      } finally {
        loading.value = false;
      }
    };
    const syncing = ref(false);
    const syncFromR2 = async () => {
      syncing.value = true;
      try {
        const { getAdminAuthToken } = await import('./server.mjs').then((n) => n.cm);
        const token = await getAdminAuthToken();
        if (!token) {
          ElMessage.error("\u8BF7\u5148\u767B\u5F55\u540E\u53F0\u7BA1\u7406\u5458\u8D26\u53F7");
          return;
        }
        const { EDGE_FUNCTIONS_URL } = await import('./server.mjs').then((n) => n.cn);
        const response = await fetch(`${EDGE_FUNCTIONS_URL}/list-r2`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prefix: "uploads" })
        });
        const result = await response.json();
        if (!response.ok || result.error) {
          ElMessage.error("\u83B7\u53D6 R2 \u5217\u8868\u5931\u8D25: " + (result.error || "\u672A\u77E5\u9519\u8BEF"));
          return;
        }
        const r2Objects = result.objects || [];
        if (r2Objects.length === 0) {
          ElMessage.info("R2 \u5B58\u50A8\u6876\u4E2D\u6CA1\u6709\u56FE\u7247");
          return;
        }
        const existingUrls = new Set(images.value.map((img) => img.url));
        const missingObjects = r2Objects.filter((obj) => !existingUrls.has(obj.url));
        if (missingObjects.length === 0) {
          ElMessage.success("\u5DF2\u540C\u6B65\uFF0C\u65E0\u65B0\u56FE\u7247");
          return;
        }
        let uncategorizedId = "";
        const uncategorizedCat = categories.value.find((c) => c.name === "\u672A\u5206\u7C7B");
        if (uncategorizedCat) {
          uncategorizedId = uncategorizedCat.id;
        } else {
          const createRes = await adminApi.imageCategory.createCategory("\u672A\u5206\u7C7B");
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
        ElMessage.success(`\u540C\u6B65\u6210\u529F\uFF01\u65B0\u589E ${addedCount} \u5F20\u56FE\u7247`);
        await fetchData();
      } catch (error) {
        console.error("Sync error:", error);
        ElMessage.error("\u540C\u6B65\u5931\u8D25: " + (error.message || "\u672A\u77E5\u9519\u8BEF"));
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
        ElMessage.warning("\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0");
        return;
      }
      const res = await adminApi.imageCategory.createCategory(newCatName.value);
      if (res.success) {
        ElMessage.success("\u5206\u7C7B\u6DFB\u52A0\u6210\u529F");
        newCatName.value = "";
        fetchCategories();
      } else {
        ElMessage.error("\u6DFB\u52A0\u5931\u8D25: " + res.error);
      }
    };
    const deleteCategory = (cat) => {
      ElMessageBox.confirm(`\u786E\u8BA4\u5220\u9664\u5206\u7C7B "${cat.name}" \u5417\uFF1F`, "\u5220\u9664\u5206\u7C7B", {
        type: "warning"
      }).then(async () => {
        const res = await adminApi.imageCategory.deleteCategory(cat.id);
        if (res.success) {
          ElMessage.success("\u5206\u7C7B\u5220\u9664\u6210\u529F");
          fetchCategories();
        } else {
          ElMessage.error("\u5220\u9664\u5931\u8D25: " + res.error);
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
        ElMessage.warning("\u8BF7\u9009\u62E9\u5206\u7C7B");
        return;
      }
      if (fileList.value.length === 0) {
        ElMessage.warning("\u8BF7\u9009\u62E9\u56FE\u7247\u6587\u4EF6");
        return;
      }
      if (uploadForm.name && uploadForm.name.length > 50) {
        ElMessage.warning("\u56FE\u7247\u540D\u79F0\u8FC7\u957F\uFF0C\u8BF7\u7CBE\u7B80");
        return;
      }
      uploading.value = true;
      try {
        const file = fileList.value[0].raw;
        const { uploadImageToStorage } = await import('./uploadImage-C-btIIZs.mjs');
        const uploadRes = await uploadImageToStorage(file);
        if (!uploadRes.success) {
          ElMessage.error("\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25: " + uploadRes.error);
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
          ElMessage.success("\u4E0A\u4F20\u6210\u529F");
          uploadDialogVisible.value = false;
          selectedIds.value = [];
          await fetchData();
        } else {
          ElMessage.error("\u4FDD\u5B58\u56FE\u7247\u8BB0\u5F55\u5931\u8D25: " + res.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        ElMessage.error("\u4E0A\u4F20\u5931\u8D25: " + (error.message || "\u672A\u77E5\u9519\u8BEF"));
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
        ElMessage.success("\u4FEE\u6539\u6210\u529F");
        editDialogVisible.value = false;
        await fetchData();
      } else {
        ElMessage.error("\u4FEE\u6539\u5931\u8D25: " + res.error);
      }
    };
    const handleDelete = (img) => {
      ElMessageBox.confirm("\u786E\u8BA4\u5220\u9664\u8BE5\u56FE\u7247\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u6062\u590D\u3002", "\u5220\u9664\u56FE\u7247", {
        type: "warning"
      }).then(async () => {
        const res = await adminApi.image.deleteImage(img.id);
        if (res.success) {
          ElMessage.success("\u5DF2\u5220\u9664");
          await fetchData();
        } else {
          ElMessage.error("\u5220\u9664\u5931\u8D25: " + res.error);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "image-page" }, _attrs))} data-v-f44a103a><div class="page-header" data-v-f44a103a><h2 data-v-f44a103a>\u56FE\u7247\u7BA1\u7406</h2></div>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "filter-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-container" data-v-f44a103a${_scopeId}><div class="filter-left" data-v-f44a103a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: filterCategoryId.value,
              "onUpdate:modelValue": ($event) => filterCategoryId.value = $event,
              placeholder: "\u9009\u62E9\u5206\u7C7B",
              clearable: "",
              style: { "width": "150px", "margin-right": "15px" },
              onChange: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5168\u90E8\u56FE\u7247",
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
                      label: "\u5168\u90E8\u56FE\u7247",
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
              placeholder: "\u641C\u7D22\u56FE\u7247\u540D\u79F0",
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
                  _push3(`\u67E5\u8BE2`);
                } else {
                  return [
                    createTextVNode("\u67E5\u8BE2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="filter-right" data-v-f44a103a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, { onClick: openCategoryManager }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u7BA1\u7406\u5206\u7C7B`);
                } else {
                  return [
                    createTextVNode("\u7BA1\u7406\u5206\u7C7B")
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
                  _push3(` \u6279\u91CF\u5220\u9664 ${ssrInterpolate(selectedIds.value.length ? `(${selectedIds.value.length})` : "")}`);
                } else {
                  return [
                    createTextVNode(" \u6279\u91CF\u5220\u9664 " + toDisplayString(selectedIds.value.length ? `(${selectedIds.value.length})` : ""), 1)
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
                  _push3(`\u4ECE R2 \u540C\u6B65`);
                } else {
                  return [
                    createTextVNode("\u4ECE R2 \u540C\u6B65")
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
                  _push3(`\u4E0A\u4F20\u56FE\u7247`);
                } else {
                  return [
                    createTextVNode("\u4E0A\u4F20\u56FE\u7247")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (categories.value.length > 0) {
              _push2(`<div class="category-display" data-v-f44a103a${_scopeId}><span class="cat-label" data-v-f44a103a${_scopeId}>\u5DF2\u6709\u5206\u7C7B\uFF1A</span><div class="cat-tags" data-v-f44a103a${_scopeId}><!--[-->`);
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
                    placeholder: "\u9009\u62E9\u5206\u7C7B",
                    clearable: "",
                    style: { "width": "150px", "margin-right": "15px" },
                    onChange: handleSearch
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "\u5168\u90E8\u56FE\u7247",
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
                    placeholder: "\u641C\u7D22\u56FE\u7247\u540D\u79F0",
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
                      createTextVNode("\u67E5\u8BE2")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "filter-right" }, [
                  createVNode(_component_el_button, { onClick: openCategoryManager }, {
                    default: withCtx(() => [
                      createTextVNode("\u7BA1\u7406\u5206\u7C7B")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "danger",
                    disabled: selectedIds.value.length === 0,
                    onClick: handleBatchDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u6279\u91CF\u5220\u9664 " + toDisplayString(selectedIds.value.length ? `(${selectedIds.value.length})` : ""), 1)
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
                      createTextVNode("\u4ECE R2 \u540C\u6B65")
                    ]),
                    _: 1
                  }, 8, ["icon", "loading"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    icon: unref(upload_default),
                    onClick: openUpload
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u4E0A\u4F20\u56FE\u7247")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ])
              ]),
              categories.value.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "category-display"
              }, [
                createVNode("span", { class: "cat-label" }, "\u5DF2\u6709\u5206\u7C7B\uFF1A"),
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
              _push2(`<div class="empty-state" data-v-f44a103a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u56FE\u7247" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="image-grid" data-v-f44a103a${_scopeId}><!--[-->`);
              ssrRenderList(filteredImages.value, (img) => {
                _push2(`<div class="${ssrRenderClass([{ "is-selected": selectedIds.value.includes(img.id) }, "image-card"])}" data-v-f44a103a${_scopeId}><div class="card-selection" data-v-f44a103a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_checkbox, {
                  "model-value": selectedIds.value.includes(img.id),
                  size: "large",
                  style: { "pointer-events": "none" }
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="image-wrapper" data-v-f44a103a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_image, {
                  src: img.url,
                  fit: "cover",
                  class: "image-thumb",
                  "preview-src-list": [img.url],
                  "initial-index": 0,
                  "z-index": 3e3,
                  "preview-teleported": ""
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="image-info" data-v-f44a103a${_scopeId}><div class="image-header" data-v-f44a103a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_tag, {
                  size: "small",
                  type: "info",
                  effect: "plain",
                  class: "cat-tag"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a, _b;
                    if (_push3) {
                      _push3(`${ssrInterpolate(((_a = img.category) == null ? void 0 : _a.name) || "\u672A\u5206\u7C7B")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(((_b = img.category) == null ? void 0 : _b.name) || "\u672A\u5206\u7C7B"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="image-name"${ssrRenderAttr("title", img.name)} data-v-f44a103a${_scopeId}>${ssrInterpolate(img.name)}</div><div class="image-actions" data-v-f44a103a${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  link: "",
                  type: "primary",
                  size: "small",
                  onClick: ($event) => handleEdit(img)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`\u7F16\u8F91`);
                    } else {
                      return [
                        createTextVNode("\u7F16\u8F91")
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
                      _push3(`\u5220\u9664`);
                    } else {
                      return [
                        createTextVNode("\u5220\u9664")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`<div class="pagination-wrapper" style="${ssrRenderStyle({ "margin-top": "20px", "display": "flex", "justify-content": "flex-end" })}" data-v-f44a103a${_scopeId}>`);
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
                createVNode(_component_el_empty, { description: "\u6682\u65E0\u56FE\u7247" })
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
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString(((_a = img.category) == null ? void 0 : _a.name) || "\u672A\u5206\u7C7B"), 1)
                            ];
                          }),
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
                            createTextVNode("\u7F16\u8F91")
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
                            createTextVNode("\u5220\u9664")
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
        title: "\u5206\u7C7B\u7BA1\u7406",
        width: "500px",
        "append-to-body": "",
        "z-index": 2e3
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cat-manager" data-v-f44a103a${_scopeId}><div class="add-cat-row" data-v-f44a103a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: newCatName.value,
              "onUpdate:modelValue": ($event) => newCatName.value = $event,
              placeholder: "\u65B0\u5206\u7C7B\u540D\u79F0",
              style: { "margin-right": "10px" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: addCategory
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6DFB\u52A0\u5206\u7C7B`);
                } else {
                  return [
                    createTextVNode("\u6DFB\u52A0\u5206\u7C7B")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
            _push2(`<div class="cat-list" data-v-f44a103a${_scopeId}><!--[-->`);
            ssrRenderList(categories.value, (cat) => {
              _push2(`<div class="cat-item" data-v-f44a103a${_scopeId}><span data-v-f44a103a${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
              _push2(ssrRenderComponent(_component_el_button, {
                link: "",
                type: "danger",
                size: "small",
                onClick: ($event) => deleteCategory(cat)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u5220\u9664`);
                  } else {
                    return [
                      createTextVNode("\u5220\u9664")
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
                    placeholder: "\u65B0\u5206\u7C7B\u540D\u79F0",
                    style: { "margin-right": "10px" }
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: addCategory
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u6DFB\u52A0\u5206\u7C7B")
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
                          createTextVNode("\u5220\u9664")
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
        title: "\u4E0A\u4F20\u56FE\u7247",
        width: "500px",
        onClosed: resetUploadForm,
        "append-to-body": "",
        "z-index": 2e3
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-f44a103a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => uploadDialogVisible.value = false
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
              onClick: submitUpload,
              loading: uploading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5F00\u59CB\u4E0A\u4F20`);
                } else {
                  return [
                    createTextVNode("\u5F00\u59CB\u4E0A\u4F20")
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
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitUpload,
                  loading: uploading.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u5F00\u59CB\u4E0A\u4F20")
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
                    label: "\u6240\u5C5E\u5206\u7C7B",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: uploadForm.categoryId,
                          "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
                            placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: uploadForm.name,
                          "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                          placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: uploadForm.name,
                            "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                            placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u9009\u62E9\u56FE\u7247",
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
                              _push5(`<div class="el-upload__tip" data-v-f44a103a${_scopeId4}>\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_button, { type: "primary" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u70B9\u51FB\u9009\u62E9\u6587\u4EF6`);
                                  } else {
                                    return [
                                      createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_button, { type: "primary" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
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
                              createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_button, { type: "primary" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
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
                      label: "\u6240\u5C5E\u5206\u7C7B",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: uploadForm.categoryId,
                          "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
                    createVNode(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: uploadForm.name,
                          "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                          placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u9009\u62E9\u56FE\u7247",
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
                            createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_button, { type: "primary" }, {
                              default: withCtx(() => [
                                createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
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
                    label: "\u6240\u5C5E\u5206\u7C7B",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: uploadForm.categoryId,
                        "onUpdate:modelValue": ($event) => uploadForm.categoryId = $event,
                        placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B",
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
                  createVNode(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: uploadForm.name,
                        "onUpdate:modelValue": ($event) => uploadForm.name = $event,
                        placeholder: "\u9ED8\u8BA4\u4F7F\u7528\u6587\u4EF6\u540D"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u9009\u62E9\u56FE\u7247",
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
                          createVNode("div", { class: "el-upload__tip" }, "\u53EA\u80FD\u4E0A\u4F20 jpg/png \u6587\u4EF6\uFF0C\u4E14\u4E0D\u8D85\u8FC7 2MB")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_button, { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("\u70B9\u51FB\u9009\u62E9\u6587\u4EF6")
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
        title: "\u7F16\u8F91\u56FE\u7247\u4FE1\u606F",
        width: "400px",
        "append-to-body": "",
        "z-index": 2e3
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-f44a103a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => editDialogVisible.value = false
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
              onClick: confirmEdit
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
                  onClick: ($event) => editDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: confirmEdit
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u4FDD\u5B58")
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6240\u5C5E\u5206\u7C7B" }, {
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
                    createVNode(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: editForm.name,
                          "onUpdate:modelValue": ($event) => editForm.name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u6240\u5C5E\u5206\u7C7B" }, {
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
                  createVNode(_component_el_form_item, { label: "\u56FE\u7247\u540D\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: editForm.name,
                        "onUpdate:modelValue": ($event) => editForm.name = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u6240\u5C5E\u5206\u7C7B" }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/images/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f44a103a"]]);

export { index as default };
//# sourceMappingURL=index-BJ-NxF7C.mjs.map
