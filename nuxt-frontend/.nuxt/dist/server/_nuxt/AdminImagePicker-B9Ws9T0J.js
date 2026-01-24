import { E as ElDialog } from "./index-I18rzBgu.js";
import { E as ElUpload } from "./index-DhXCDWyG.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElImage } from "./index-Dr3RPaW4.js";
import { E as ElEmpty } from "./index-DKY_z0U1.js";
import { _ as _export_sfc } from "../server.mjs";
/* empty css                   */
/* empty css                    */
/* empty css                     */
/* empty css                   */
/* empty css                         */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, createVNode, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps } from "vue/server-renderer";
import { b as adminApi } from "./admin-supabase-nszo-IoU.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminImagePicker",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = ref(props.modelValue);
    const loading = ref(false);
    const images = ref([]);
    const categories = ref([]);
    const activeCategoryId = ref("");
    watch(() => props.modelValue, (val) => {
      visible.value = val;
      if (val) {
        loadCategories();
        fetchImages();
      }
    });
    watch(visible, (val) => {
      emit("update:modelValue", val);
    });
    const loadCategories = async () => {
      if (categories.value.length > 0) return;
      const res = await adminApi.imageCategory.getCategories();
      if (res.success) categories.value = res.categories;
    };
    const fetchImages = async () => {
      loading.value = true;
      const res = await adminApi.image.getImages({
        category_id: activeCategoryId.value || void 0
      });
      if (res.success) images.value = res.images;
      loading.value = false;
    };
    const selectImage = (url) => {
      emit("select", url);
      visible.value = false;
    };
    const handleUpload = async (file) => {
      loading.value = true;
      try {
        const { uploadImageToStorage } = await import("./uploadImage-C-btIIZs.js");
        const upRes = await uploadImageToStorage(file.raw);
        if (upRes.success) {
          await adminApi.image.createImage({
            name: file.name,
            url: upRes.url,
            category_id: activeCategoryId.value || void 0
          });
          selectImage(upRes.url);
          fetchImages();
        }
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_upload = ElUpload;
      const _component_el_button = ElButton;
      const _component_el_image = ElImage;
      const _component_el_empty = ElEmpty;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: visible.value,
        "onUpdate:modelValue": ($event) => visible.value = $event,
        title: "图库选择",
        width: "800px",
        "append-to-body": "",
        "destroy-on-close": "",
        class: "picker-dialog"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="picker-container" data-v-dc628e2a${_scopeId}><div class="picker-sidebar" data-v-dc628e2a${_scopeId}><div class="${ssrRenderClass([{ active: activeCategoryId.value === "" }, "picker-cat-item"])}" data-v-dc628e2a${_scopeId}>全部图片</div><!--[-->`);
            ssrRenderList(categories.value, (cat) => {
              _push2(`<div class="${ssrRenderClass([{ active: activeCategoryId.value === cat.id }, "picker-cat-item"])}" data-v-dc628e2a${_scopeId}>${ssrInterpolate(cat.name)}</div>`);
            });
            _push2(`<!--]--></div><div${ssrRenderAttrs(mergeProps({ class: "picker-main" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-dc628e2a${_scopeId}><div class="picker-toolbar" data-v-dc628e2a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_upload, {
              action: "#",
              "auto-upload": false,
              "show-file-list": false,
              "on-change": handleUpload
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    size: "small"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`上传新图片`);
                      } else {
                        return [
                          createTextVNode("上传新图片")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("上传新图片")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="picker-grid" data-v-dc628e2a${_scopeId}><!--[-->`);
            ssrRenderList(images.value, (img) => {
              _push2(`<div class="picker-img-card" data-v-dc628e2a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_image, {
                src: img.url,
                fit: "cover"
              }, null, _parent2, _scopeId));
              _push2(`<div class="picker-img-name" data-v-dc628e2a${_scopeId}>${ssrInterpolate(img.name)}</div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (images.value.length === 0) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "暂无图片" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "picker-container" }, [
                createVNode("div", { class: "picker-sidebar" }, [
                  createVNode("div", {
                    class: ["picker-cat-item", { active: activeCategoryId.value === "" }],
                    onClick: ($event) => {
                      activeCategoryId.value = "";
                      fetchImages();
                    }
                  }, "全部图片", 10, ["onClick"]),
                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                    return openBlock(), createBlock("div", {
                      key: cat.id,
                      class: ["picker-cat-item", { active: activeCategoryId.value === cat.id }],
                      onClick: ($event) => {
                        activeCategoryId.value = cat.id;
                        fetchImages();
                      }
                    }, toDisplayString(cat.name), 11, ["onClick"]);
                  }), 128))
                ]),
                withDirectives((openBlock(), createBlock("div", { class: "picker-main" }, [
                  createVNode("div", { class: "picker-toolbar" }, [
                    createVNode(_component_el_upload, {
                      action: "#",
                      "auto-upload": false,
                      "show-file-list": false,
                      "on-change": handleUpload
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("上传新图片")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "picker-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(images.value, (img) => {
                      return openBlock(), createBlock("div", {
                        key: img.id,
                        class: "picker-img-card",
                        onClick: ($event) => selectImage(img.url)
                      }, [
                        createVNode(_component_el_image, {
                          src: img.url,
                          fit: "cover"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "picker-img-name" }, toDisplayString(img.name), 1)
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  images.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                    key: 0,
                    description: "暂无图片"
                  })) : createCommentVNode("", true)
                ])), [
                  [_directive_loading, loading.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminImagePicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminImagePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc628e2a"]]);
export {
  AdminImagePicker as A
};
//# sourceMappingURL=AdminImagePicker-B9Ws9T0J.js.map
