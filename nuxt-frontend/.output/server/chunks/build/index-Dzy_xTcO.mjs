import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './index-DrSf1xVr.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle, ssrRenderTeleport, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { T as ticket_default, S as list_default, d as delete_default, i as info_filled_default } from './index-DlETah8a.mjs';
import { c as couponApi } from './coupon-D1so52Ot.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-64au3mej.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-yXUwt-_q.mjs';
import { M as MobileCouponTicket } from './MobileCouponTicket-CKmGRj2b.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useToast } from './useToast-DsT-1f4c.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
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
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileConfirmModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: { default: "\u63D0\u793A" },
    content: { default: "" },
    confirmText: { default: "\u786E\u8BA4" },
    cancelText: { default: "\u53D6\u6D88" },
    type: { default: "info" },
    loading: { type: Boolean, default: false }
  },
  emits: ["update:visible", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-39ae6a61><div class="modal-content" data-v-39ae6a61><div class="modal-header" data-v-39ae6a61><div class="${ssrRenderClass([__props.type, "icon-circle"])}" data-v-39ae6a61>`);
          if (__props.type === "danger") {
            _push2(ssrRenderComponent(_component_el_icon, { class: "msg-icon" }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(delete_default))
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push2(ssrRenderComponent(_component_el_icon, { class: "msg-icon" }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(info_filled_default))
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push2(`</div><div class="modal-title" data-v-39ae6a61>${ssrInterpolate(__props.title)}</div></div><div class="modal-body" data-v-39ae6a61>${ssrInterpolate(__props.content)}</div><div class="modal-footer" data-v-39ae6a61><button class="btn-cancel" data-v-39ae6a61>${ssrInterpolate(__props.cancelText)}</button><button class="${ssrRenderClass([__props.type, "btn-confirm"])}"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-39ae6a61>`);
          if (__props.loading) {
            _push2(`<div class="spinner-sm" data-v-39ae6a61></div>`);
          } else {
            _push2(`<span data-v-39ae6a61>${ssrInterpolate(__props.confirmText)}</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/base/MobileConfirmModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileConfirmModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-39ae6a61"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const { showToast } = useToast();
    const redeemCode = ref("");
    const redeeming = ref(false);
    const showConfirm = ref(false);
    const confirmLoading = ref(false);
    const confirmType = ref("info");
    const confirmTitle = ref("");
    const confirmContent = ref("");
    const confirmBtnText = ref("\u786E\u8BA4");
    const currentItem = ref(null);
    const actionType = ref("use_balance");
    const fetchCoupons = async () => {
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
      }
    };
    const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll({
      fetchData: fetchCoupons,
      pageSize: 20
    });
    const handleCouponClick = (item) => {
      currentItem.value = item;
      if (item.status === "unused" && item.coupon.type === "balance") {
        actionType.value = "use_balance";
        confirmType.value = "info";
        confirmTitle.value = "\u4F7F\u7528\u4F59\u989D\u5238";
        confirmContent.value = `\u786E\u8BA4\u5C06 "${item.coupon.name}" \u5145\u503C\u5230\u4F59\u989D\uFF1F`;
        confirmBtnText.value = "\u7ACB\u5373\u5145\u503C";
        showConfirm.value = true;
        return;
      }
      if (item.status === "used" || item.status === "expired") {
        actionType.value = "delete";
        confirmType.value = "danger";
        confirmTitle.value = "\u5220\u9664\u8BB0\u5F55";
        confirmContent.value = "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u4F18\u60E0\u5238\u8BB0\u5F55\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002";
        confirmBtnText.value = "\u786E\u8BA4\u5220\u9664";
        showConfirm.value = true;
        return;
      }
      if (item.status === "unused") {
        router.push("/mobile");
      }
    };
    const handleConfirmAction = async () => {
      if (!currentItem.value) return;
      confirmLoading.value = true;
      try {
        if (actionType.value === "use_balance") {
          const res = await couponApi.useBalanceCoupon(currentItem.value.id);
          if (res.success) {
            showToast("\u5145\u503C\u6210\u529F", "success");
            await userStore.fetchUserInfo();
            reset();
          } else {
            showToast(res.msg || "\u4F7F\u7528\u5931\u8D25", "error");
          }
        } else if (actionType.value === "delete") {
          const res = await couponApi.deleteUserCoupon(currentItem.value.id);
          if (res.success) {
            showToast("\u5220\u9664\u6210\u529F", "success");
            reset();
          } else {
            showToast(res.msg || "\u5220\u9664\u5931\u8D25", "error");
          }
        }
        showConfirm.value = false;
      } catch (e) {
        showToast("\u64CD\u4F5C\u5931\u8D25", "error");
      } finally {
        confirmLoading.value = false;
      }
    };
    const getExpiryText = (dateStr) => {
      if (!dateStr) return "\u6C38\u4E45\u6709\u6548";
      return `\u6709\u6548\u671F\u81F3 ${dateStr.split("T")[0]}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-7305df0b><div class="mobile-bg-fixed" data-v-7305df0b></div>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u5151\u6362\u4E2D\u5FC3" }, null, _parent));
      _push(`<div class="content-body" data-v-7305df0b><div class="info-card-glass input-card" data-v-7305df0b><div class="card-glow-bg" data-v-7305df0b></div><div class="card-icon" data-v-7305df0b>`);
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
      _push(`</div><div class="card-input-group" data-v-7305df0b><div class="input-wrapper" data-v-7305df0b><input type="text"${ssrRenderAttr("value", redeemCode.value)} placeholder="\u8BF7\u8F93\u5165\u5151\u6362\u7801" class="input-glass"${ssrIncludeBooleanAttr(redeeming.value) ? " disabled" : ""} data-v-7305df0b></div><button class="redeem-btn"${ssrIncludeBooleanAttr(!redeemCode.value || redeeming.value) ? " disabled" : ""} data-v-7305df0b>`);
      if (redeeming.value) {
        _push(`<div class="spinner-sm" data-v-7305df0b></div>`);
      } else {
        _push(`<span data-v-7305df0b>\u5151\u6362</span>`);
      }
      _push(`</button></div><p class="tips" data-v-7305df0b>\u5151\u6362\u7801\u901A\u5E38\u753116\u4F4D\u5B57\u6BCD\u548C\u6570\u5B57\u7EC4\u6210</p></div><div class="section-header" data-v-7305df0b><div class="title-left" data-v-7305df0b><span class="icon-box" data-v-7305df0b>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(list_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(list_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span class="title-text" data-v-7305df0b>\u6211\u7684\u4F18\u60E0\u5238</span></div><span class="subtitle" data-v-7305df0b>\u70B9\u51FB\u5238\u9762\u53EF\u76F4\u63A5\u4F7F\u7528\u6216\u7BA1\u7406</span></div><div class="coupon-list" data-v-7305df0b>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(loading) && unref(displayList).length === 0) {
              _push2(`<div class="list-items" data-v-7305df0b${_scopeId}><!--[-->`);
              ssrRenderList(4, (i) => {
                _push2(`<div class="info-card-glass skeleton-card" style="${ssrRenderStyle({ "padding": "0", "min-height": "90px", "height": "90px", "border-radius": "12px", "display": "flex", "overflow": "hidden", "margin-bottom": "12px" })}" data-v-7305df0b${_scopeId}><div style="${ssrRenderStyle({ "width": "100%", "height": "100%", "background": "rgba(30,41,59,0.5)" })}" data-v-7305df0b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton, {
                  animated: "",
                  style: { "width": "100%", "height": "100%" }
                }, {
                  template: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div style="${ssrRenderStyle({ "display": "flex", "height": "100%" })}" data-v-7305df0b${_scopeId2}><div style="${ssrRenderStyle({ "width": "90px", "display": "flex", "align-items": "center", "justify-content": "center", "border-right": "1px dashed rgba(255,255,255,0.1)" })}" data-v-7305df0b${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "circle",
                        style: { "width": "40px", "height": "40px" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div style="${ssrRenderStyle({ "flex": "1", "padding": "12px 14px", "display": "flex", "flex-direction": "column", "justify-content": "space-between" })}" data-v-7305df0b${_scopeId2}><div style="${ssrRenderStyle({ "width": "100%" })}" data-v-7305df0b${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "50%", "margin-bottom": "8px" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "30%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "100%" })}" data-v-7305df0b${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "40%" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "button",
                        style: { "width": "48px", "height": "20px", "border-radius": "10px" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div></div>`);
                    } else {
                      return [
                        createVNode("div", { style: { "display": "flex", "height": "100%" } }, [
                          createVNode("div", { style: { "width": "90px", "display": "flex", "align-items": "center", "justify-content": "center", "border-right": "1px dashed rgba(255,255,255,0.1)" } }, [
                            createVNode(_component_el_skeleton_item, {
                              variant: "circle",
                              style: { "width": "40px", "height": "40px" }
                            })
                          ]),
                          createVNode("div", { style: { "flex": "1", "padding": "12px 14px", "display": "flex", "flex-direction": "column", "justify-content": "space-between" } }, [
                            createVNode("div", { style: { "width": "100%" } }, [
                              createVNode(_component_el_skeleton_item, {
                                variant: "h3",
                                style: { "width": "50%", "margin-bottom": "8px" }
                              }),
                              createVNode(_component_el_skeleton_item, {
                                variant: "text",
                                style: { "width": "30%" }
                              })
                            ]),
                            createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "100%" } }, [
                              createVNode(_component_el_skeleton_item, {
                                variant: "text",
                                style: { "width": "40%" }
                              }),
                              createVNode(_component_el_skeleton_item, {
                                variant: "button",
                                style: { "width": "48px", "height": "20px", "border-radius": "10px" }
                              })
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (unref(displayList).length === 0) {
              _push2(`<div class="empty-state" data-v-7305df0b${_scopeId}><div class="empty-icon-box" data-v-7305df0b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
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
              _push2(`</div><p data-v-7305df0b${_scopeId}>\u6682\u65E0\u4F18\u60E0\u5238\u8BB0\u5F55</p></div>`);
            } else {
              _push2(`<div class="list-items" data-v-7305df0b${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(ssrRenderComponent(MobileCouponTicket, {
                  key: item.id,
                  type: item.coupon.type,
                  value: item.coupon.value,
                  title: item.coupon.name,
                  expiryText: getExpiryText(item.coupon.end_date || void 0),
                  status: item.status,
                  onClick: ($event) => handleCouponClick(item)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(loading) && unref(displayList).length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "list-items"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                  return createVNode("div", {
                    key: i,
                    class: "info-card-glass skeleton-card",
                    style: { "padding": "0", "min-height": "90px", "height": "90px", "border-radius": "12px", "display": "flex", "overflow": "hidden", "margin-bottom": "12px" }
                  }, [
                    createVNode("div", { style: { "width": "100%", "height": "100%", "background": "rgba(30,41,59,0.5)" } }, [
                      createVNode(_component_el_skeleton, {
                        animated: "",
                        style: { "width": "100%", "height": "100%" }
                      }, {
                        template: withCtx(() => [
                          createVNode("div", { style: { "display": "flex", "height": "100%" } }, [
                            createVNode("div", { style: { "width": "90px", "display": "flex", "align-items": "center", "justify-content": "center", "border-right": "1px dashed rgba(255,255,255,0.1)" } }, [
                              createVNode(_component_el_skeleton_item, {
                                variant: "circle",
                                style: { "width": "40px", "height": "40px" }
                              })
                            ]),
                            createVNode("div", { style: { "flex": "1", "padding": "12px 14px", "display": "flex", "flex-direction": "column", "justify-content": "space-between" } }, [
                              createVNode("div", { style: { "width": "100%" } }, [
                                createVNode(_component_el_skeleton_item, {
                                  variant: "h3",
                                  style: { "width": "50%", "margin-bottom": "8px" }
                                }),
                                createVNode(_component_el_skeleton_item, {
                                  variant: "text",
                                  style: { "width": "30%" }
                                })
                              ]),
                              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "100%" } }, [
                                createVNode(_component_el_skeleton_item, {
                                  variant: "text",
                                  style: { "width": "40%" }
                                }),
                                createVNode(_component_el_skeleton_item, {
                                  variant: "button",
                                  style: { "width": "48px", "height": "20px", "border-radius": "10px" }
                                })
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]);
                }), 64))
              ])) : unref(displayList).length === 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "empty-state"
              }, [
                createVNode("div", { class: "empty-icon-box" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(ticket_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("p", null, "\u6682\u65E0\u4F18\u60E0\u5238\u8BB0\u5F55")
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "list-items"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                  return openBlock(), createBlock(MobileCouponTicket, {
                    key: item.id,
                    type: item.coupon.type,
                    value: item.coupon.value,
                    title: item.coupon.name,
                    expiryText: getExpiryText(item.coupon.end_date || void 0),
                    status: item.status,
                    onClick: ($event) => handleCouponClick(item)
                  }, null, 8, ["type", "value", "title", "expiryText", "status", "onClick"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(MobileConfirmModal, {
        visible: showConfirm.value,
        "onUpdate:visible": ($event) => showConfirm.value = $event,
        title: confirmTitle.value,
        content: confirmContent.value,
        confirmText: confirmBtnText.value,
        type: confirmType.value,
        loading: confirmLoading.value,
        onConfirm: handleConfirmAction
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/redemption/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7305df0b"]]);

export { index as default };
//# sourceMappingURL=index-Dzy_xTcO.mjs.map
