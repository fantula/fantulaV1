import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElRadioGroup, a as ElRadioButton } from './index-5s1BkUoL.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { _ as _export_sfc, z as arrow_left_default, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, isRef, createVNode, createBlock, openBlock, Fragment, renderList, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { S as SkuEditor } from './SkuEditor-H0DykQLU.mjs';
import { a as adminProductApi } from './product-B3IUpyB3.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './event-BZTOGHfp.mjs';
import '@vue/shared';
import './index-Dxw_X3Hq.mjs';
import 'lodash-unified';
import './vnode-D0IHQw_9.mjs';
import './index-CIoWkt90.mjs';
import '@vueuse/core';
import '@popperjs/core';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-D_b573Qt.mjs';
import './index-BOQJCp53.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-Bf1ETwA6.mjs';
import './index-ClPmkyX9.mjs';
import './index-DCrMmn3b.mjs';
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
import './index-QnhSR2oe.mjs';
import './index-BB44-vTK.mjs';
import './index-BlpH41lu.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './index-iY4Ojb3q.mjs';
import './index-DOE061f1.mjs';
import './AdminImageSelector-Qku4uUI9.mjs';
import './index-DhXCDWyG.mjs';
import './index-Dr3RPaW4.mjs';
import './index-B-o0CD59.mjs';
import './index-DKY_z0U1.mjs';
import './media-C2x210Ez.mjs';
import './AdminDataDialog-9iEmWGfo.mjs';
import './index-CzosOSMt.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';

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
        ElMessage.warning("\u8BF7\u81F3\u5C11\u914D\u7F6E\u4E00\u79CD\u89C4\u683C");
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
        ElMessage.success("\u914D\u7F6E\u5DF2\u4FDD\u5B58");
        router.push("/_mgmt_9Xfa3/products");
      } else {
        ElMessage.error(res.error);
      }
    } finally {
      saving.value = false;
    }
  };
  const goToSharedManager = () => (void 0).open("/_mgmt_9Xfa3/products/shared-sku");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sku-manager-page" }, _attrs))} data-v-d96cd549><div class="page-header" data-v-d96cd549><div class="header-left" data-v-d96cd549>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => unref(router).back(),
        icon: unref(arrow_left_default),
        circle: "",
        class: "back-btn"
      }, null, _parent));
      if (unref(product)) {
        _push(`<div class="product-info" data-v-d96cd549>`);
        if (unref(product).image) {
          _push(`<img${ssrRenderAttr("src", unref(product).image)} class="product-thumb" data-v-d96cd549>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="product-details" data-v-d96cd549><h1 class="page-title" data-v-d96cd549>\u89C4\u683C\u7BA1\u7406: ${ssrInterpolate(unref(product).product_name)}</h1><span class="product-id" data-v-d96cd549>ID: ${ssrInterpolate(unref(product).id)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="header-actions" data-v-d96cd549>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large",
        onClick: handleSave,
        loading: unref(saving)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u4FDD\u5B58\u914D\u7F6E`);
          } else {
            return [
              createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(mergeProps({ class: "main-content" }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))))} data-v-d96cd549><div class="content-card" data-v-d96cd549><div class="spec-editor-header" data-v-d96cd549><div class="panel-title" data-v-d96cd549>\u914D\u7F6E\u6A21\u5F0F</div><div class="spec-mode-switch" data-v-d96cd549>`);
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
                  _push3(`\u81EA\u5B9A\u4E49\u89C4\u683C`);
                } else {
                  return [
                    createTextVNode("\u81EA\u5B9A\u4E49\u89C4\u683C")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { label: "shared" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5F15\u7528\u5171\u4EAB\u89C4\u683C`);
                } else {
                  return [
                    createTextVNode("\u5F15\u7528\u5171\u4EAB\u89C4\u683C")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_radio_button, { label: "custom" }, {
                default: withCtx(() => [
                  createTextVNode("\u81EA\u5B9A\u4E49\u89C4\u683C")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { label: "shared" }, {
                default: withCtx(() => [
                  createTextVNode("\u5F15\u7528\u5171\u4EAB\u89C4\u683C")
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
        _push(`<div class="shared-spec-selector" data-v-d96cd549>`);
        _push(ssrRenderComponent(_component_el_alert, {
          type: "info",
          "show-icon": "",
          closable: false,
          style: { "margin-bottom": "20px" }
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u5F15\u7528\u5171\u4EAB\u89C4\u683C\u7EC4\u540E\uFF0C\u6B64\u5546\u54C1\u7684 SKU \u5C06\u81EA\u52A8\u4E0E\u8BE5\u7EC4\u4FDD\u6301\u540C\u6B65\u3002\u5982\u9700\u4FEE\u6539\uFF0C\u8BF7\u524D\u5F80\u201C\u5171\u4EAB\u89C4\u683C\u5E93\u201D\u3002`);
            } else {
              return [
                createTextVNode("\u5F15\u7528\u5171\u4EAB\u89C4\u683C\u7EC4\u540E\uFF0C\u6B64\u5546\u54C1\u7684 SKU \u5C06\u81EA\u52A8\u4E0E\u8BE5\u7EC4\u4FDD\u6301\u540C\u6B65\u3002\u5982\u9700\u4FEE\u6539\uFF0C\u8BF7\u524D\u5F80\u201C\u5171\u4EAB\u89C4\u683C\u5E93\u201D\u3002")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="selector-row" data-v-d96cd549><span class="label" data-v-d96cd549>\u9009\u62E9\u89C4\u683C\u7EC4:</span>`);
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: unref(sharedSkuTag),
          "onUpdate:modelValue": ($event) => isRef(sharedSkuTag) ? sharedSkuTag.value = $event : null,
          placeholder: "\u8BF7\u9009\u62E9\u5171\u4EAB\u89C4\u683C\u7EC4",
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
              _push2(`\u7BA1\u7406\u5171\u4EAB\u5E93`);
            } else {
              return [
                createTextVNode("\u7BA1\u7406\u5171\u4EAB\u5E93")
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
        _push(ssrRenderComponent(SkuEditor, {
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
        _push(`<div class="empty-tip" data-v-d96cd549> \u8BF7\u9009\u62E9\u4E00\u4E2A\u5171\u4EAB\u89C4\u683C\u7EC4\u9884\u89C8 </div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/products/sku/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d96cd549"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CYx45PvK.mjs.map
