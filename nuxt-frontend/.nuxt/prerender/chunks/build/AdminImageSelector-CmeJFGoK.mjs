import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElUpload } from './index-DhXCDWyG.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { _ as _export_sfc, bJ as search_default, af as upload_default, E as ElIcon, ag as check_default, ah as ElMessage } from './server.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, withDirectives, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { c as adminImageCategoryApi, a as adminImageApi } from './media-C2x210Ez.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-CUwf_G99.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminImageSelector",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    multiple: { type: Boolean },
    limit: {}
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const loading = ref(false);
    const uploading = ref(false);
    const categories = ref([]);
    const images = ref([]);
    const currentCategory = ref("");
    const keyword = ref("");
    const selectedImages = ref([]);
    const loadCategories = async () => {
      const res = await adminImageCategoryApi.getCategories();
      if (res.success) categories.value = res.categories;
    };
    const loadImages = async () => {
      loading.value = true;
      try {
        const res = await adminImageApi.getImages({
          category_id: currentCategory.value || void 0,
          keyword: keyword.value || void 0
        });
        if (res.success) images.value = res.images;
      } finally {
        loading.value = false;
      }
    };
    const handleCategoryChange = (id) => {
      currentCategory.value = id;
      loadImages();
    };
    const handleUpload = async (options) => {
      uploading.value = true;
      try {
        const file = options.file;
        const formData = new FormData();
        formData.append("file", file);
        ElMessage.info("Upload functionality requires specific R2 integration check.");
      } finally {
        uploading.value = false;
      }
    };
    const isSelected = (img) => selectedImages.value.some((i) => i.id === img.id);
    const toggleSelect = (img) => {
      if (props.multiple) {
        if (isSelected(img)) {
          selectedImages.value = selectedImages.value.filter((i) => i.id !== img.id);
        } else {
          if (props.limit && selectedImages.value.length >= props.limit) {
            ElMessage.warning(`\u6700\u591A\u9009\u62E9 ${props.limit} \u5F20\u56FE\u7247`);
            return;
          }
          selectedImages.value.push(img);
        }
      } else {
        selectedImages.value = [img];
      }
    };
    const handleConfirm = () => {
      if (selectedImages.value.length === 0) {
        ElMessage.warning("\u8BF7\u9009\u62E9\u56FE\u7247");
        return;
      }
      emit("select", selectedImages.value.map((i) => i.url));
      visible.value = false;
    };
    const handleClosed = () => {
      selectedImages.value = [];
      emit("update:modelValue", false);
    };
    watch(visible, (val) => {
      if (val && images.value.length === 0) {
        loadCategories();
        loadImages();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_upload = ElUpload;
      const _component_el_button = ElButton;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_el_empty = ElEmpty;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(AdminDataDialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "\u9009\u62E9\u56FE\u7247",
        width: "900px",
        class: "image-selector-dialog",
        "show-footer": true,
        "confirm-text": "\u786E\u5B9A\u9009\u62E9",
        onConfirm: handleConfirm,
        onClosed: handleClosed
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="selector-body" data-v-1eb78c59${_scopeId}><div class="category-sidebar" data-v-1eb78c59${_scopeId}><div class="${ssrRenderClass([{ active: !currentCategory.value }, "cat-item"])}" data-v-1eb78c59${_scopeId}> \u5168\u90E8\u56FE\u7247 </div><!--[-->`);
            ssrRenderList(categories.value, (cat) => {
              _push2(`<div class="${ssrRenderClass([{ active: currentCategory.value === cat.id }, "cat-item"])}" data-v-1eb78c59${_scopeId}>${ssrInterpolate(cat.name)}</div>`);
            });
            _push2(`<!--]--></div><div class="main-content" data-v-1eb78c59${_scopeId}><div class="toolbar" data-v-1eb78c59${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: keyword.value,
              "onUpdate:modelValue": ($event) => keyword.value = $event,
              placeholder: "\u641C\u7D22\u56FE\u7247\u540D\u79F0",
              "prefix-icon": unref(search_default),
              clearable: "",
              style: { "width": "200px" },
              onChange: loadImages
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_upload, {
              action: "#",
              "show-file-list": false,
              "http-request": handleUpload,
              disabled: uploading.value,
              multiple: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    loading: uploading.value,
                    icon: unref(upload_default)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u4E0A\u4F20\u56FE\u7247`);
                      } else {
                        return [
                          createTextVNode("\u4E0A\u4F20\u56FE\u7247")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      loading: uploading.value,
                      icon: unref(upload_default)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u4E0A\u4F20\u56FE\u7247")
                      ]),
                      _: 1
                    }, 8, ["loading", "icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${ssrRenderAttrs(mergeProps({ class: "image-grid" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-1eb78c59${_scopeId}><!--[-->`);
            ssrRenderList(images.value, (img) => {
              _push2(`<div class="${ssrRenderClass([{ selected: isSelected(img) }, "image-item"])}" data-v-1eb78c59${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover",
                class: "thumb",
                loading: "lazy"
              }, null, _parent2, _scopeId));
              _push2(`<div class="image-name" data-v-1eb78c59${_scopeId}>${ssrInterpolate(img.name)}</div>`);
              if (isSelected(img)) {
                _push2(`<div class="check-mark" data-v-1eb78c59${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(check_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(check_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (!loading.value && images.value.length === 0) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u56FE\u7247" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "selector-body" }, [
                createVNode("div", { class: "category-sidebar" }, [
                  createVNode("div", {
                    class: ["cat-item", { active: !currentCategory.value }],
                    onClick: ($event) => handleCategoryChange("")
                  }, " \u5168\u90E8\u56FE\u7247 ", 10, ["onClick"]),
                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                    return openBlock(), createBlock("div", {
                      key: cat.id,
                      class: ["cat-item", { active: currentCategory.value === cat.id }],
                      onClick: ($event) => handleCategoryChange(cat.id)
                    }, toDisplayString(cat.name), 11, ["onClick"]);
                  }), 128))
                ]),
                createVNode("div", { class: "main-content" }, [
                  createVNode("div", { class: "toolbar" }, [
                    createVNode(_component_el_input, {
                      modelValue: keyword.value,
                      "onUpdate:modelValue": ($event) => keyword.value = $event,
                      placeholder: "\u641C\u7D22\u56FE\u7247\u540D\u79F0",
                      "prefix-icon": unref(search_default),
                      clearable: "",
                      style: { "width": "200px" },
                      onChange: loadImages
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"]),
                    createVNode(_component_el_upload, {
                      action: "#",
                      "show-file-list": false,
                      "http-request": handleUpload,
                      disabled: uploading.value,
                      multiple: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          loading: uploading.value,
                          icon: unref(upload_default)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u4E0A\u4F20\u56FE\u7247")
                          ]),
                          _: 1
                        }, 8, ["loading", "icon"])
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ]),
                  withDirectives((openBlock(), createBlock("div", { class: "image-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(images.value, (img) => {
                      return openBlock(), createBlock("div", {
                        key: img.id,
                        class: ["image-item", { selected: isSelected(img) }],
                        onClick: ($event) => toggleSelect(img)
                      }, [
                        createVNode(_component_el_image, {
                          src: img.url,
                          fit: "cover",
                          class: "thumb",
                          loading: "lazy"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "image-name" }, toDisplayString(img.name), 1),
                        isSelected(img) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "check-mark"
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(check_default))
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 128)),
                    !loading.value && images.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                      key: 0,
                      description: "\u6682\u65E0\u56FE\u7247"
                    })) : createCommentVNode("", true)
                  ])), [
                    [_directive_loading, loading.value]
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminImageSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminImageSelector = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1eb78c59"]]);

export { AdminImageSelector as A };
//# sourceMappingURL=AdminImageSelector-CmeJFGoK.mjs.map
