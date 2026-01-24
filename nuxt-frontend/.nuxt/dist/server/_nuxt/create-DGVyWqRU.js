import { E as ElIcon, z as arrow_left_default, _ as _export_sfc } from "../server.mjs";
import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                  */
/* empty css                        */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./index-Dxw_X3Hq.js";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./constants-hAKFmBbq.js";
import "./index-D_b573Qt.js";
import "./index-BOQJCp53.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./event-BZTOGHfp.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./index-ClPmkyX9.js";
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
      { value: "买错商品", label: "买错商品" },
      { value: "不想要了", label: "不想要了" },
      { value: "商品无法使用", label: "商品无法使用" },
      { value: "未收到商品", label: "未收到商品" },
      { value: "其他原因", label: "其他原因" }
    ];
    function getSpecText(skuSnapshot) {
      if (!skuSnapshot?.spec_combination) return "";
      return Object.values(skuSnapshot.spec_combination).join(" / ");
    }
    return (_ctx, _push, _parent, _attrs) => {
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
      _push(` 返回 </button><h1 class="page-title" data-v-4bbee51e>申请退款</h1></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-4bbee51e><div class="spinner" data-v-4bbee51e></div><p data-v-4bbee51e>加载中...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-4bbee51e><div class="error-icon" data-v-4bbee51e>⚠️</div><p data-v-4bbee51e>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-4bbee51e>重试</button></div>`);
      } else if (hasPendingRequest.value) {
        _push(`<div class="pending-state" data-v-4bbee51e><div class="pending-icon" data-v-4bbee51e>🕐</div><h2 data-v-4bbee51e>退款申请处理中</h2><p data-v-4bbee51e>您的退款申请正在审核中，请耐心等待。</p><button class="primary-btn" data-v-4bbee51e>返回订单详情</button></div>`);
      } else {
        _push(`<div class="apply-form" data-v-4bbee51e><div class="order-card" data-v-4bbee51e><div class="order-header" data-v-4bbee51e><span class="order-label" data-v-4bbee51e>订单信息</span><span class="order-no" data-v-4bbee51e>${ssrInterpolate(order.value?.order_no)}</span></div><div class="order-content" data-v-4bbee51e><div class="product-info" data-v-4bbee51e><img${ssrRenderAttr("src", order.value?.product_snapshot?.image || "/images/placeholder.png")} class="product-img" data-v-4bbee51e><div class="product-detail" data-v-4bbee51e><div class="product-name" data-v-4bbee51e>${ssrInterpolate(order.value?.product_snapshot?.product_name)}</div><div class="product-spec" data-v-4bbee51e>${ssrInterpolate(getSpecText(order.value?.sku_snapshot))}</div></div></div><div class="order-amount" data-v-4bbee51e>¥${ssrInterpolate(order.value?.total_amount)}</div></div></div><div class="form-section" data-v-4bbee51e><div class="form-label" data-v-4bbee51e>退款原因 <span class="required" data-v-4bbee51e>*</span></div>`);
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: reason.value,
          "onUpdate:modelValue": ($event) => reason.value = $event,
          placeholder: "请选择退款原因",
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
        _push(`</div><div class="form-section" data-v-4bbee51e><div class="form-label" data-v-4bbee51e>补充说明</div>`);
        _push(ssrRenderComponent(_component_el_input, {
          modelValue: reasonDetail.value,
          "onUpdate:modelValue": ($event) => reasonDetail.value = $event,
          type: "textarea",
          rows: 3,
          placeholder: "请详细描述您的问题（选填）",
          maxlength: "500",
          "show-word-limit": ""
        }, null, _parent));
        _push(`</div><div class="notice-card" data-v-4bbee51e><div class="notice-icon" data-v-4bbee51e>ℹ️</div><div class="notice-text" data-v-4bbee51e> 退款申请提交后将进入人工审核流程，最终退款金额以审核结果为准。 </div></div><button class="submit-btn"${ssrIncludeBooleanAttr(!reason.value || submitting.value) ? " disabled" : ""} data-v-4bbee51e>${ssrInterpolate(submitting.value ? "提交中..." : "提交退款申请")}</button></div>`);
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
export {
  create as default
};
//# sourceMappingURL=create-DGVyWqRU.js.map
