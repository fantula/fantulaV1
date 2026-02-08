import { E as ElButton } from "./index-Cfk6gFRD.js";
import { E as ElRadioGroup, a as ElRadioButton } from "./index-DzpjRD-s.js";
import { E as ElAlert } from "./index-CHfwRf2j.js";
import { E as ElSelect, a as ElOption } from "./index-CHDWEhch.js";
import { v as vLoading } from "./directive-BBpaOxz2.js";
/* empty css              */
/* empty css                   */
/* empty css                        */
/* empty css                         */
/* empty css                  */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                    */
import { ref, computed, defineComponent, mergeProps, unref, withCtx, createTextVNode, isRef, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { g as arrow_left_default } from "./index-DlETah8a.js";
import { A as AdminSkuEditor } from "./SkuEditor-BWI1xgX8.js";
/* empty css                    */
import { a as adminProductApi } from "./product-CcE9wlh3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-DSo6N35Z.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-CK7WLSPl.js";
import "./index-K5TIzHX_.js";
import "./index-jl2vZbkg.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-79yNXOXL.js";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./event-BZTOGHfp.js";
import "./index-DqrhOzxH.js";
import "./vnode-BKSxKQVt.js";
import "./index-BgvvVJ20.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-CmHlMPx0.js";
import "./index-CAqDGa72.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BuMAfCNC.js";
import "./raf-CQRaPAjg.js";
import "./index-DfZ5KWBt.js";
import "./typescript-D6L75muK.js";
import "./index-Cy25Tved.js";
import "./index-sO8Yjc2X.js";
import "./index-CppwRAFr.js";
import "./index-D4pu9U8U.js";
import "normalize-wheel-es";
import "./index-DKzxlu5F.js";
import "./index-D3BlhKEk.js";
/* empty css                  */
/* empty css                    */
/* empty css                  */
/* empty css                     */
/* empty css                    */
/* empty css                         */
import "./AdminImageSelector-aB4rZmF_.js";
import "./index-5J0LyWSE.js";
import "./index-BmjXUoge.js";
import "./index-7KygWwCI.js";
import "./index-DHhizeNf.js";
/* empty css                     */
/* empty css                         */
/* empty css                  */
import "./media-DksayCA2.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./AdminDataDialog-D5vWIKYY.js";
import "./index-Dhc7L6Kv.js";
import "./index-CuQ4LNHg.js";
import "./refs-CxYYXu5Q.js";
/* empty css                   */
/* empty css                    */
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
function useAdminSkuEditor() {
  const route = useRoute();
  const router = useRouter();
  const productId = route.params.id;
  const loading = ref(true);
  const saving = ref(false);
  const product = ref(null);
  const specMode = ref("custom");
  const sharedSkuTag = ref(void 0);
  const sharedGroups = ref([]);
  const currentSpecs = ref([]);
  const currentSkus = ref([]);
  const editorKey = computed(() => `${specMode.value}-${sharedSkuTag.value || "custom"}`);
  const shouldShowEditor = computed(() => {
    if (specMode.value === "custom") return true;
    return specMode.value === "shared" && !!sharedSkuTag.value;
  });
  const handleSpecModeChange = (val) => {
    if (val === "custom") {
      sharedSkuTag.value = void 0;
      currentSpecs.value = [];
      currentSkus.value = [];
    } else {
      currentSpecs.value = [];
      currentSkus.value = [];
    }
  };
  const handleSharedGroupChange = (tag) => {
    const group = sharedGroups.value.find((g) => g.tag === tag);
    if (group) {
      const specMap = /* @__PURE__ */ new Map();
      const skus = group.skus.map((s) => {
        Object.entries(s.spec_combination).forEach(([k, v]) => {
          if (!specMap.has(k)) specMap.set(k, /* @__PURE__ */ new Set());
          specMap.get(k).add(v);
        });
        return {
          id: s.id,
          key: Object.values(s.spec_combination || {}).join("::"),
          specValues: s.spec_combination,
          product_type: s.product_type,
          price: s.price,
          duration: s.duration,
          intro: s.intro,
          image: s.image,
          tag: s.tag
        };
      });
      currentSpecs.value = Array.from(specMap.entries()).map(([name, values]) => ({
        name,
        values: Array.from(values),
        inputVisible: false,
        inputValue: ""
      }));
      currentSkus.value = skus;
    }
  };
  const saveSkus = async (editorInstance) => {
    let payload = [];
    if (specMode.value === "custom") {
      if (!editorInstance) return;
      const rawSkus = editorInstance.getSkus();
      if (rawSkus.length === 0) {
        ElMessage.warning("请至少配置一种规格");
        return;
      }
      payload = rawSkus.map((s, i) => ({
        id: s.id,
        spec_combination: s.specValues,
        product_type: s.product_type,
        price: s.price,
        duration: s.duration,
        image: s.image,
        intro: s.intro,
        sort_order: i
      }));
    }
    saving.value = true;
    try {
      const res = await adminProductApi.updateProductSkus(productId, {
        mode: specMode.value,
        sharedTag: sharedSkuTag.value || void 0,
        skus: payload
      });
      if (res.success) {
        ElMessage.success("配置已保存");
        router.push("/admin/products");
      } else {
        ElMessage.error(res.error);
      }
    } finally {
      saving.value = false;
    }
  };
  const goToSharedManager = () => (void 0).open("/admin/products/shared-sku");
  return {
    productId,
    loading,
    saving,
    product,
    specMode,
    sharedSkuTag,
    sharedGroups,
    currentSpecs,
    currentSkus,
    editorKey,
    shouldShowEditor,
    handleSpecModeChange,
    handleSharedGroupChange,
    goToSharedManager,
    saveSkus
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const skuEditorRef = ref(null);
    const {
      productId,
      loading,
      saving,
      product,
      specMode,
      sharedSkuTag,
      sharedGroups,
      currentSpecs,
      currentSkus,
      editorKey,
      shouldShowEditor,
      handleSpecModeChange,
      handleSharedGroupChange,
      goToSharedManager,
      saveSkus
    } = useAdminSkuEditor();
    const handleSave = () => saveSkus(skuEditorRef.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_el_alert = ElAlert;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sku-manager-page" }, _attrs))} data-v-cedc0ac4><div class="page-header" data-v-cedc0ac4><div class="header-left" data-v-cedc0ac4>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => unref(router).back(),
        icon: unref(arrow_left_default),
        circle: "",
        class: "back-btn"
      }, null, _parent));
      if (unref(product)) {
        _push(`<div class="product-info" data-v-cedc0ac4>`);
        if (unref(product).image) {
          _push(`<img${ssrRenderAttr("src", unref(product).image)} class="product-thumb" data-v-cedc0ac4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="product-details" data-v-cedc0ac4><h1 class="page-title" data-v-cedc0ac4>规格管理: ${ssrInterpolate(unref(product).product_name)}</h1><span class="product-id" data-v-cedc0ac4>ID: ${ssrInterpolate(unref(product).id)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="header-actions" data-v-cedc0ac4>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large",
        onClick: handleSave,
        loading: unref(saving)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`保存配置`);
          } else {
            return [
              createTextVNode("保存配置")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(mergeProps({ class: "main-content" }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))))} data-v-cedc0ac4><div class="content-card" data-v-cedc0ac4><div class="spec-editor-header" data-v-cedc0ac4><div class="panel-title" data-v-cedc0ac4>配置模式</div><div class="spec-mode-switch" data-v-cedc0ac4>`);
      _push(ssrRenderComponent(_component_el_radio_group, {
        modelValue: unref(specMode),
        "onUpdate:modelValue": ($event) => isRef(specMode) ? specMode.value = $event : null,
        onChange: unref(handleSpecModeChange)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_radio_button, { label: "custom" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`自定义规格`);
                } else {
                  return [
                    createTextVNode("自定义规格")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { label: "shared" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`引用共享规格`);
                } else {
                  return [
                    createTextVNode("引用共享规格")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_radio_button, { label: "custom" }, {
                default: withCtx(() => [
                  createTextVNode("自定义规格")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { label: "shared" }, {
                default: withCtx(() => [
                  createTextVNode("引用共享规格")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(specMode) === "shared") {
        _push(`<div class="shared-spec-selector" data-v-cedc0ac4>`);
        _push(ssrRenderComponent(_component_el_alert, {
          type: "info",
          "show-icon": "",
          closable: false,
          style: { "margin-bottom": "20px" }
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`引用共享规格组后，此商品的 SKU 将自动与该组保持同步。如需修改，请前往“共享规格库”。`);
            } else {
              return [
                createTextVNode("引用共享规格组后，此商品的 SKU 将自动与该组保持同步。如需修改，请前往“共享规格库”。")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="selector-row" data-v-cedc0ac4><span class="label" data-v-cedc0ac4>选择规格组:</span>`);
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: unref(sharedSkuTag),
          "onUpdate:modelValue": ($event) => isRef(sharedSkuTag) ? sharedSkuTag.value = $event : null,
          placeholder: "请选择共享规格组",
          style: { "width": "300px" },
          onChange: unref(handleSharedGroupChange)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(sharedGroups), (group) => {
                _push2(ssrRenderComponent(_component_el_option, {
                  key: group.tag,
                  label: `#${group.tag} (${group.skus.length} SKU)`,
                  value: group.tag
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(sharedGroups), (group) => {
                  return openBlock(), createBlock(_component_el_option, {
                    key: group.tag,
                    label: `#${group.tag} (${group.skus.length} SKU)`,
                    value: group.tag
                  }, null, 8, ["label", "value"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          link: "",
          onClick: unref(goToSharedManager),
          style: { "margin-left": "10px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`管理共享库`);
            } else {
              return [
                createTextVNode("管理共享库")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(shouldShowEditor)) {
        _push(ssrRenderComponent(AdminSkuEditor, {
          ref_key: "skuEditorRef",
          ref: skuEditorRef,
          key: unref(editorKey),
          mode: unref(specMode) === "shared" ? "linked" : "standalone",
          "read-only": unref(specMode) === "shared",
          "initial-specs": unref(currentSpecs),
          "initial-skus": unref(currentSkus),
          "product-id": unref(productId),
          tag: unref(specMode) === "shared" ? unref(sharedSkuTag) : void 0
        }, null, _parent));
      } else if (unref(specMode) === "shared" && !unref(sharedSkuTag)) {
        _push(`<div class="empty-tip" data-v-cedc0ac4> 请选择一个共享规格组预览 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/specs/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cedc0ac4"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-B2N1tvtQ.js.map
