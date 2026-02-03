import { E as ElButton } from './index-B9iQGHXi.mjs';
import { E as ElRadioGroup, a as ElRadioButton } from './index-B98GwqyH.mjs';
import { E as ElAlert } from './index-CcRd7O_1.mjs';
import { E as ElSelect, a as ElOption } from './index-Db83VWJP.mjs';
import { v as vLoading } from './directive-D1M1s_ef.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, isRef, createVNode, openBlock, createBlock, Fragment, renderList, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { c as arrow_left_default } from './index-4qszPKX4.mjs';
import { A as AdminSkuEditor } from './SkuEditor-rDAs1URN.mjs';
import { a as adminProductApi } from './product-CcE9wlh3.mjs';
import { E as ElMessage } from './index-CJUZrfXE.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './icon-BcxG_YvU.mjs';
import './index-CO6H4Lsj.mjs';
import './index-Byc6LUYX.mjs';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './vnode-C7bAOlXh.mjs';
import './index-D6r9Uwf3.mjs';
import '@popperjs/core';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-DGjXPDlO.mjs';
import './index-BV0Habum.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-Df9VGR5S.mjs';
import './raf-CQRaPAjg.mjs';
import './index-6YP9MNcL.mjs';
import './typescript-D6L75muK.mjs';
import './index-D2CY7Ok3.mjs';
import './index-BDc7M6dy.mjs';
import './index-DL7T-Mp9.mjs';
import './index-DxpgyeZB.mjs';
import './index-DrAKMEUO.mjs';
import 'normalize-wheel-es';
import './index-h3-jEqCc.mjs';
import './index-D3BlhKEk.mjs';
import './AdminImageSelector-c3KQnX97.mjs';
import './index-B4eu1nPw.mjs';
import './index-BB-fMy6o.mjs';
import './index-ebnaz0b7.mjs';
import './index-EXqkolUp.mjs';
import './media-DksayCA2.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './AdminDataDialog-BL5UPebs.mjs';
import './index-CWqyLnWY.mjs';
import './index-NMCQtDk_.mjs';
import './refs-CxYYXu5Q.mjs';
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
        _push(`<div class="product-details" data-v-cedc0ac4><h1 class="page-title" data-v-cedc0ac4>\u89C4\u683C\u7BA1\u7406: ${ssrInterpolate(unref(product).product_name)}</h1><span class="product-id" data-v-cedc0ac4>ID: ${ssrInterpolate(unref(product).id)}</span></div></div>`);
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
            _push2(`\u4FDD\u5B58\u914D\u7F6E`);
          } else {
            return [
              createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(mergeProps({ class: "main-content" }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))))} data-v-cedc0ac4><div class="content-card" data-v-cedc0ac4><div class="spec-editor-header" data-v-cedc0ac4><div class="panel-title" data-v-cedc0ac4>\u914D\u7F6E\u6A21\u5F0F</div><div class="spec-mode-switch" data-v-cedc0ac4>`);
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
        _push(`<div class="shared-spec-selector" data-v-cedc0ac4>`);
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
        _push(`<div class="selector-row" data-v-cedc0ac4><span class="label" data-v-cedc0ac4>\u9009\u62E9\u89C4\u683C\u7EC4:</span>`);
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
        _push(`<div class="empty-tip" data-v-cedc0ac4> \u8BF7\u9009\u62E9\u4E00\u4E2A\u5171\u4EAB\u89C4\u683C\u7EC4\u9884\u89C8 </div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-DVIy3yBw.mjs.map
