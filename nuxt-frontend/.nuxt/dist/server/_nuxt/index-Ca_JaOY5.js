import { E as ElIcon } from "./index-Byc6LUYX.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { h as arrow_left_default, V as ticket_default, l as loading_default } from "./index-CmsdIFY8.js";
import { c as couponApi } from "./coupon-D1so52Ot.js";
import { u as useInfiniteScroll, B as BaseInfiniteList } from "./BaseInfiniteList-C6mBVzQc.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const redeemCode = ref("");
    const redeeming = ref(false);
    const fetchCoupons = async () => {
      loading.value = true;
      try {
        const res = await couponApi.getUserCoupons();
        if (res.success && res.data) {
          return {
            list: res.data,
            hasMore: false,
            total: res.data.length
          };
        }
        return { list: [], hasMore: false };
      } catch (e) {
        return { list: [], hasMore: false };
      } finally {
        loading.value = false;
      }
    };
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      fetchData: fetchCoupons,
      // Type adaptation
      pageSize: 20
    });
    const isExpired = (item) => {
      if (!item.coupon.end_date) return false;
      return new Date(item.coupon.end_date) < /* @__PURE__ */ new Date();
    };
    const getTypeName = (type) => {
      const map = {
        balance: "余额券",
        product: "商品券",
        flat: "满减券"
      };
      return map[type] || "优惠券";
    };
    const formatDate = (dateStr) => {
      return dateStr.split("T")[0];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-adbd6083><div class="page-header" data-v-adbd6083><div class="back-btn" data-v-adbd6083>`);
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
      _push(`</div><h1 class="page-title" data-v-adbd6083>兑换中心</h1><div class="header-right" data-v-adbd6083></div></div><div class="content-body" data-v-adbd6083><div class="input-card" data-v-adbd6083><div class="card-icon" data-v-adbd6083>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ticket_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ticket_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-input-group" data-v-adbd6083><input type="text"${ssrRenderAttr("value", redeemCode.value)} placeholder="请输入兑换码" class="custom-input" data-v-adbd6083><button class="redeem-btn"${ssrIncludeBooleanAttr(!redeemCode.value || redeeming.value) ? " disabled" : ""} data-v-adbd6083>`);
      if (redeeming.value) {
        _push(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(loading_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span data-v-adbd6083>兑换</span>`);
      }
      _push(`</button></div><p class="tips" data-v-adbd6083>兑换码通常由16位字母和数字组成</p></div><div class="section-title" data-v-adbd6083>我的优惠券</div><div class="coupon-list" data-v-adbd6083>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-adbd6083${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ticket_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ticket_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p data-v-adbd6083${_scopeId}>暂无优惠券记录</p></div>`);
            } else {
              _push2(`<div class="list-items" data-v-adbd6083${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="${ssrRenderClass([{ "is-used": item.status !== "unused", "is-expired": isExpired(item) }, "coupon-item"])}" data-v-adbd6083${_scopeId}><div class="coupon-left" data-v-adbd6083${_scopeId}><div class="coupon-amount" data-v-adbd6083${_scopeId}>`);
                if (item.coupon.type === "balance") {
                  _push2(`<span class="symbol" data-v-adbd6083${_scopeId}>¥</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span class="value" data-v-adbd6083${_scopeId}>${ssrInterpolate(item.coupon.value)}</span></div><div class="coupon-type" data-v-adbd6083${_scopeId}>${ssrInterpolate(getTypeName(item.coupon.type))}</div></div><div class="coupon-right" data-v-adbd6083${_scopeId}><div class="coupon-name" data-v-adbd6083${_scopeId}>${ssrInterpolate(item.coupon.name)}</div>`);
                if (item.coupon.end_date) {
                  _push2(`<div class="coupon-time" data-v-adbd6083${_scopeId}>有效期至 ${ssrInterpolate(formatDate(item.coupon.end_date))}</div>`);
                } else {
                  _push2(`<div class="coupon-time" data-v-adbd6083${_scopeId}>永久有效</div>`);
                }
                _push2(`<div class="coupon-status" data-v-adbd6083${_scopeId}>`);
                if (item.status === "used") {
                  _push2(`<span class="status-tag used" data-v-adbd6083${_scopeId}>已使用</span>`);
                } else if (item.status === "expired" || isExpired(item)) {
                  _push2(`<span class="status-tag expired" data-v-adbd6083${_scopeId}>已过期</span>`);
                } else {
                  _push2(`<span class="status-tag unused" data-v-adbd6083${_scopeId}>未使用</span>`);
                }
                _push2(`</div></div><div class="circle top" data-v-adbd6083${_scopeId}></div><div class="circle bottom" data-v-adbd6083${_scopeId}></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode(_component_el_icon, { class: "empty-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(ticket_default))
                  ]),
                  _: 1
                }),
                createVNode("p", null, "暂无优惠券记录")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "list-items"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.id,
                    class: ["coupon-item", { "is-used": item.status !== "unused", "is-expired": isExpired(item) }]
                  }, [
                    createVNode("div", { class: "coupon-left" }, [
                      createVNode("div", { class: "coupon-amount" }, [
                        item.coupon.type === "balance" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "symbol"
                        }, "¥")) : createCommentVNode("", true),
                        createVNode("span", { class: "value" }, toDisplayString(item.coupon.value), 1)
                      ]),
                      createVNode("div", { class: "coupon-type" }, toDisplayString(getTypeName(item.coupon.type)), 1)
                    ]),
                    createVNode("div", { class: "coupon-right" }, [
                      createVNode("div", { class: "coupon-name" }, toDisplayString(item.coupon.name), 1),
                      item.coupon.end_date ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "coupon-time"
                      }, "有效期至 " + toDisplayString(formatDate(item.coupon.end_date)), 1)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "coupon-time"
                      }, "永久有效")),
                      createVNode("div", { class: "coupon-status" }, [
                        item.status === "used" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "status-tag used"
                        }, "已使用")) : item.status === "expired" || isExpired(item) ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "status-tag expired"
                        }, "已过期")) : (openBlock(), createBlock("span", {
                          key: 2,
                          class: "status-tag unused"
                        }, "未使用"))
                      ])
                    ]),
                    createVNode("div", { class: "circle top" }),
                    createVNode("div", { class: "circle bottom" })
                  ], 2);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/redemption/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-adbd6083"]]);
export {
  index as default
};
//# sourceMappingURL=index-Ca_JaOY5.js.map
