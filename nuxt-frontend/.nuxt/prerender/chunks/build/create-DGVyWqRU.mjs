import { _ as _export_sfc, E as ElIcon, z as arrow_left_default } from './server.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './constants-hAKFmBbq.mjs';
import './index-D_b573Qt.mjs';
import './index-BOQJCp53.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './event-BZTOGHfp.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-ClPmkyX9.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    ref("");
    const order = ref(null);
    const loading = ref(true);
    const error = ref("");
    const submitting = ref(false);
    const hasPendingRequest = ref(false);
    const reason = ref("");
    const reasonDetail = ref("");
    const reasonOptions = [
      { value: "\u4E70\u9519\u5546\u54C1", label: "\u4E70\u9519\u5546\u54C1" },
      { value: "\u4E0D\u60F3\u8981\u4E86", label: "\u4E0D\u60F3\u8981\u4E86" },
      { value: "\u5546\u54C1\u65E0\u6CD5\u4F7F\u7528", label: "\u5546\u54C1\u65E0\u6CD5\u4F7F\u7528" },
      { value: "\u672A\u6536\u5230\u5546\u54C1", label: "\u672A\u6536\u5230\u5546\u54C1" },
      { value: "\u5176\u4ED6\u539F\u56E0", label: "\u5176\u4ED6\u539F\u56E0" }
    ];
    function getSpecText(skuSnapshot) {
      if (!(skuSnapshot == null ? void 0 : skuSnapshot.spec_combination)) return "";
      return Object.values(skuSnapshot.spec_combination).join(" / ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_el_icon = ElIcon;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_input = ElInput;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-apply-page" }, _attrs))} data-v-4bbee51e><div class="page-container" data-v-4bbee51e><div class="page-header" data-v-4bbee51e><button class="back-btn" data-v-4bbee51e>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u8FD4\u56DE </button><h1 class="page-title" data-v-4bbee51e>\u7533\u8BF7\u9000\u6B3E</h1></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-4bbee51e><div class="spinner" data-v-4bbee51e></div><p data-v-4bbee51e>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-4bbee51e><div class="error-icon" data-v-4bbee51e>\u26A0\uFE0F</div><p data-v-4bbee51e>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-4bbee51e>\u91CD\u8BD5</button></div>`);
      } else if (hasPendingRequest.value) {
        _push(`<div class="pending-state" data-v-4bbee51e><div class="pending-icon" data-v-4bbee51e>\u{1F550}</div><h2 data-v-4bbee51e>\u9000\u6B3E\u7533\u8BF7\u5904\u7406\u4E2D</h2><p data-v-4bbee51e>\u60A8\u7684\u9000\u6B3E\u7533\u8BF7\u6B63\u5728\u5BA1\u6838\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u3002</p><button class="primary-btn" data-v-4bbee51e>\u8FD4\u56DE\u8BA2\u5355\u8BE6\u60C5</button></div>`);
      } else {
        _push(`<div class="apply-form" data-v-4bbee51e><div class="order-card" data-v-4bbee51e><div class="order-header" data-v-4bbee51e><span class="order-label" data-v-4bbee51e>\u8BA2\u5355\u4FE1\u606F</span><span class="order-no" data-v-4bbee51e>${ssrInterpolate((_a = order.value) == null ? void 0 : _a.order_no)}</span></div><div class="order-content" data-v-4bbee51e><div class="product-info" data-v-4bbee51e><img${ssrRenderAttr("src", ((_c = (_b = order.value) == null ? void 0 : _b.product_snapshot) == null ? void 0 : _c.image) || "/images/placeholder.png")} class="product-img" data-v-4bbee51e><div class="product-detail" data-v-4bbee51e><div class="product-name" data-v-4bbee51e>${ssrInterpolate((_e = (_d = order.value) == null ? void 0 : _d.product_snapshot) == null ? void 0 : _e.product_name)}</div><div class="product-spec" data-v-4bbee51e>${ssrInterpolate(getSpecText((_f = order.value) == null ? void 0 : _f.sku_snapshot))}</div></div></div><div class="order-amount" data-v-4bbee51e>\xA5${ssrInterpolate((_g = order.value) == null ? void 0 : _g.total_amount)}</div></div></div><div class="form-section" data-v-4bbee51e><div class="form-label" data-v-4bbee51e>\u9000\u6B3E\u539F\u56E0 <span class="required" data-v-4bbee51e>*</span></div>`);
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: reason.value,
          "onUpdate:modelValue": ($event) => reason.value = $event,
          placeholder: "\u8BF7\u9009\u62E9\u9000\u6B3E\u539F\u56E0",
          class: "reason-select"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(reasonOptions, (opt) => {
                _push2(ssrRenderComponent(_component_el_option, {
                  key: opt.value,
                  label: opt.label,
                  value: opt.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(), createBlock(Fragment, null, renderList(reasonOptions, (opt) => {
                  return createVNode(_component_el_option, {
                    key: opt.value,
                    label: opt.label,
                    value: opt.value
                  }, null, 8, ["label", "value"]);
                }), 64))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="form-section" data-v-4bbee51e><div class="form-label" data-v-4bbee51e>\u8865\u5145\u8BF4\u660E</div>`);
        _push(ssrRenderComponent(_component_el_input, {
          modelValue: reasonDetail.value,
          "onUpdate:modelValue": ($event) => reasonDetail.value = $event,
          type: "textarea",
          rows: 3,
          placeholder: "\u8BF7\u8BE6\u7EC6\u63CF\u8FF0\u60A8\u7684\u95EE\u9898\uFF08\u9009\u586B\uFF09",
          maxlength: "500",
          "show-word-limit": ""
        }, null, _parent));
        _push(`</div><div class="notice-card" data-v-4bbee51e><div class="notice-icon" data-v-4bbee51e>\u2139\uFE0F</div><div class="notice-text" data-v-4bbee51e> \u9000\u6B3E\u7533\u8BF7\u63D0\u4EA4\u540E\u5C06\u8FDB\u5165\u4EBA\u5DE5\u5BA1\u6838\u6D41\u7A0B\uFF0C\u6700\u7EC8\u9000\u6B3E\u91D1\u989D\u4EE5\u5BA1\u6838\u7ED3\u679C\u4E3A\u51C6\u3002 </div></div><button class="submit-btn"${ssrIncludeBooleanAttr(!reason.value || submitting.value) ? " disabled" : ""} data-v-4bbee51e>${ssrInterpolate(submitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u9000\u6B3E\u7533\u8BF7")}</button></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support/refund/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4bbee51e"]]);

export { create as default };
//# sourceMappingURL=create-DGVyWqRU.mjs.map
