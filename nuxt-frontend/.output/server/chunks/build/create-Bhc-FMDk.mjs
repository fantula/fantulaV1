import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { E as ElSelect, a as ElOption } from './index-CHDWEhch.mjs';
import { E as ElInput } from './index-DfZ5KWBt.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { b as arrow_left_default } from './index-DlETah8a.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './index-BgvvVJ20.mjs';
import '@popperjs/core';
import './index-DqrhOzxH.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './constants-hAKFmBbq.mjs';
import './index-CmHlMPx0.mjs';
import './index-CAqDGa72.mjs';
import './index-K5TIzHX_.mjs';
import './use-form-item-Bhmdieo-.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-BuMAfCNC.mjs';
import './raf-CQRaPAjg.mjs';
import './icon-CK7WLSPl.mjs';
import './event-BZTOGHfp.mjs';
import './vnode-BKSxKQVt.mjs';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "refund-apply-page" }, _attrs))} data-v-acea4a22><div class="page-container" data-v-acea4a22><div class="page-header" data-v-acea4a22><button class="back-btn" data-v-acea4a22>`);
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
      _push(` \u8FD4\u56DE </button><h1 class="page-title" data-v-acea4a22>\u7533\u8BF7\u9000\u6B3E</h1></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-acea4a22><div class="spinner" data-v-acea4a22></div><p data-v-acea4a22>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-acea4a22><div class="error-icon" data-v-acea4a22>\u26A0\uFE0F</div><p data-v-acea4a22>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-acea4a22>\u91CD\u8BD5</button></div>`);
      } else if (hasPendingRequest.value) {
        _push(`<div class="pending-state" data-v-acea4a22><div class="pending-icon" data-v-acea4a22>\u{1F550}</div><h2 data-v-acea4a22>\u9000\u6B3E\u7533\u8BF7\u5904\u7406\u4E2D</h2><p data-v-acea4a22>\u60A8\u7684\u9000\u6B3E\u7533\u8BF7\u6B63\u5728\u5BA1\u6838\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u3002</p><button class="primary-btn" data-v-acea4a22>\u8FD4\u56DE\u8BA2\u5355\u8BE6\u60C5</button></div>`);
      } else {
        _push(`<div class="apply-form" data-v-acea4a22><div class="order-card" data-v-acea4a22><div class="order-header" data-v-acea4a22><span class="order-label" data-v-acea4a22>\u8BA2\u5355\u4FE1\u606F</span><span class="order-no" data-v-acea4a22>${ssrInterpolate((_a = order.value) == null ? void 0 : _a.order_no)}</span></div><div class="order-content" data-v-acea4a22><div class="product-info" data-v-acea4a22><img${ssrRenderAttr("src", ((_c = (_b = order.value) == null ? void 0 : _b.product_snapshot) == null ? void 0 : _c.image) || "/images/placeholder.png")} class="product-img" data-v-acea4a22><div class="product-detail" data-v-acea4a22><div class="product-name" data-v-acea4a22>${ssrInterpolate((_e = (_d = order.value) == null ? void 0 : _d.product_snapshot) == null ? void 0 : _e.product_name)}</div><div class="product-spec" data-v-acea4a22>${ssrInterpolate(getSpecText((_f = order.value) == null ? void 0 : _f.sku_snapshot))}</div></div></div><div class="order-amount" data-v-acea4a22>\xA5${ssrInterpolate((_g = order.value) == null ? void 0 : _g.total_amount)}</div></div></div><div class="form-section" data-v-acea4a22><div class="form-label" data-v-acea4a22>\u9000\u6B3E\u539F\u56E0 <span class="required" data-v-acea4a22>*</span></div>`);
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
        _push(`</div><div class="form-section" data-v-acea4a22><div class="form-label" data-v-acea4a22>\u8865\u5145\u8BF4\u660E</div>`);
        _push(ssrRenderComponent(_component_el_input, {
          modelValue: reasonDetail.value,
          "onUpdate:modelValue": ($event) => reasonDetail.value = $event,
          type: "textarea",
          rows: 3,
          placeholder: "\u8BF7\u8BE6\u7EC6\u63CF\u8FF0\u60A8\u7684\u95EE\u9898\uFF08\u9009\u586B\uFF09",
          maxlength: "500",
          "show-word-limit": ""
        }, null, _parent));
        _push(`</div><div class="notice-card" data-v-acea4a22><div class="notice-icon" data-v-acea4a22>\u2139\uFE0F</div><div class="notice-text" data-v-acea4a22> \u9000\u6B3E\u7533\u8BF7\u63D0\u4EA4\u540E\u5C06\u8FDB\u5165\u4EBA\u5DE5\u5BA1\u6838\u6D41\u7A0B\uFF0C\u6700\u7EC8\u9000\u6B3E\u91D1\u989D\u4EE5\u5BA1\u6838\u7ED3\u679C\u4E3A\u51C6\u3002 </div></div><button class="submit-btn"${ssrIncludeBooleanAttr(!reason.value || submitting.value) ? " disabled" : ""} data-v-acea4a22>${ssrInterpolate(submitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u9000\u6B3E\u7533\u8BF7")}</button></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/support/refund/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-acea4a22"]]);

export { create as default };
//# sourceMappingURL=create-Bhc-FMDk.mjs.map
