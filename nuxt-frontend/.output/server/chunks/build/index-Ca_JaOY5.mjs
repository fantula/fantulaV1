import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { c as arrow_left_default, V as ticket_default, l as loading_default } from './index-CmsdIFY8.mjs';
import { c as couponApi } from './coupon-D1so52Ot.mjs';
import { u as useInfiniteScroll, B as BaseInfiniteList } from './BaseInfiniteList-C6mBVzQc.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
        balance: "\u4F59\u989D\u5238",
        product: "\u5546\u54C1\u5238",
        flat: "\u6EE1\u51CF\u5238"
      };
      return map[type] || "\u4F18\u60E0\u5238";
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
      _push(`</div><h1 class="page-title" data-v-adbd6083>\u5151\u6362\u4E2D\u5FC3</h1><div class="header-right" data-v-adbd6083></div></div><div class="content-body" data-v-adbd6083><div class="input-card" data-v-adbd6083><div class="card-icon" data-v-adbd6083>`);
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
      _push(`</div><div class="card-input-group" data-v-adbd6083><input type="text"${ssrRenderAttr("value", redeemCode.value)} placeholder="\u8BF7\u8F93\u5165\u5151\u6362\u7801" class="custom-input" data-v-adbd6083><button class="redeem-btn"${ssrIncludeBooleanAttr(!redeemCode.value || redeeming.value) ? " disabled" : ""} data-v-adbd6083>`);
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
        _push(`<span data-v-adbd6083>\u5151\u6362</span>`);
      }
      _push(`</button></div><p class="tips" data-v-adbd6083>\u5151\u6362\u7801\u901A\u5E38\u753116\u4F4D\u5B57\u6BCD\u548C\u6570\u5B57\u7EC4\u6210</p></div><div class="section-title" data-v-adbd6083>\u6211\u7684\u4F18\u60E0\u5238</div><div class="coupon-list" data-v-adbd6083>`);
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
              _push2(`<p data-v-adbd6083${_scopeId}>\u6682\u65E0\u4F18\u60E0\u5238\u8BB0\u5F55</p></div>`);
            } else {
              _push2(`<div class="list-items" data-v-adbd6083${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="${ssrRenderClass([{ "is-used": item.status !== "unused", "is-expired": isExpired(item) }, "coupon-item"])}" data-v-adbd6083${_scopeId}><div class="coupon-left" data-v-adbd6083${_scopeId}><div class="coupon-amount" data-v-adbd6083${_scopeId}>`);
                if (item.coupon.type === "balance") {
                  _push2(`<span class="symbol" data-v-adbd6083${_scopeId}>\xA5</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span class="value" data-v-adbd6083${_scopeId}>${ssrInterpolate(item.coupon.value)}</span></div><div class="coupon-type" data-v-adbd6083${_scopeId}>${ssrInterpolate(getTypeName(item.coupon.type))}</div></div><div class="coupon-right" data-v-adbd6083${_scopeId}><div class="coupon-name" data-v-adbd6083${_scopeId}>${ssrInterpolate(item.coupon.name)}</div>`);
                if (item.coupon.end_date) {
                  _push2(`<div class="coupon-time" data-v-adbd6083${_scopeId}>\u6709\u6548\u671F\u81F3 ${ssrInterpolate(formatDate(item.coupon.end_date))}</div>`);
                } else {
                  _push2(`<div class="coupon-time" data-v-adbd6083${_scopeId}>\u6C38\u4E45\u6709\u6548</div>`);
                }
                _push2(`<div class="coupon-status" data-v-adbd6083${_scopeId}>`);
                if (item.status === "used") {
                  _push2(`<span class="status-tag used" data-v-adbd6083${_scopeId}>\u5DF2\u4F7F\u7528</span>`);
                } else if (item.status === "expired" || isExpired(item)) {
                  _push2(`<span class="status-tag expired" data-v-adbd6083${_scopeId}>\u5DF2\u8FC7\u671F</span>`);
                } else {
                  _push2(`<span class="status-tag unused" data-v-adbd6083${_scopeId}>\u672A\u4F7F\u7528</span>`);
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
                createVNode("p", null, "\u6682\u65E0\u4F18\u60E0\u5238\u8BB0\u5F55")
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
                        }, "\xA5")) : createCommentVNode("", true),
                        createVNode("span", { class: "value" }, toDisplayString(item.coupon.value), 1)
                      ]),
                      createVNode("div", { class: "coupon-type" }, toDisplayString(getTypeName(item.coupon.type)), 1)
                    ]),
                    createVNode("div", { class: "coupon-right" }, [
                      createVNode("div", { class: "coupon-name" }, toDisplayString(item.coupon.name), 1),
                      item.coupon.end_date ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "coupon-time"
                      }, "\u6709\u6548\u671F\u81F3 " + toDisplayString(formatDate(item.coupon.end_date)), 1)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "coupon-time"
                      }, "\u6C38\u4E45\u6709\u6548")),
                      createVNode("div", { class: "coupon-status" }, [
                        item.status === "used" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "status-tag used"
                        }, "\u5DF2\u4F7F\u7528")) : item.status === "expired" || isExpired(item) ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "status-tag expired"
                        }, "\u5DF2\u8FC7\u671F")) : (openBlock(), createBlock("span", {
                          key: 2,
                          class: "status-tag unused"
                        }, "\u672A\u4F7F\u7528"))
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

export { index as default };
//# sourceMappingURL=index-Ca_JaOY5.mjs.map
