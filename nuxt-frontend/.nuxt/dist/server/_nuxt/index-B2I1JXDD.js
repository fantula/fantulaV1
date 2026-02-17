import { E as ElIcon } from "./index-_zadwVDN.js";
import { E as ElSkeleton, a as ElSkeletonItem } from "./index-Buprbscf.js";
import "./base-CEWXqFm3.js";
/* empty css                     */
/* empty css                          */
import { defineComponent, withCtx, unref, createVNode, useSSRContext, ref, mergeProps, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderTeleport, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as delete_default, i as info_filled_default, E as ticket_default, D as list_default } from "./index-DNnPa_Q9.js";
import { c as couponApi } from "./coupon-CAcMEk5R.js";
import { u as useInfiniteScroll } from "./useInfiniteScroll-Cg7MWwox.js";
import { B as BaseInfiniteList } from "./BaseInfiniteList-Dt0cDKAc.js";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-4aDAI7XP.js";
import { M as MobileCouponTicket } from "./MobileCouponTicket-CKmGRj2b.js";
import { _ as _export_sfc } from "../server.mjs";
import { u as useToast } from "./useToast-DsT-1f4c.js";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileConfirmModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: { default: "提示" },
    content: { default: "" },
    confirmText: { default: "确认" },
    cancelText: { default: "取消" },
    type: { default: "info" },
    loading: { type: Boolean, default: false }
  },
  emits: ["update:visible", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-d83bcbab><div class="modal-content aurora-dialog-box" data-v-d83bcbab><div class="modal-header" data-v-d83bcbab><div class="${ssrRenderClass([__props.type, "icon-circle"])}" data-v-d83bcbab>`);
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
          _push2(`</div><div class="modal-title" data-v-d83bcbab>${ssrInterpolate(__props.title)}</div></div><div class="modal-body" data-v-d83bcbab>${ssrInterpolate(__props.content)}</div><div class="modal-footer" data-v-d83bcbab><button class="btn-cancel" data-v-d83bcbab>${ssrInterpolate(__props.cancelText)}</button><button class="${ssrRenderClass([__props.type, "btn-confirm"])}"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-d83bcbab>`);
          if (__props.loading) {
            _push2(`<div class="spinner-sm" data-v-d83bcbab></div>`);
          } else {
            _push2(`<span data-v-d83bcbab>${ssrInterpolate(__props.confirmText)}</span>`);
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
const MobileConfirmModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d83bcbab"]]);
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
    const confirmBtnText = ref("确认");
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
        confirmTitle.value = "使用余额券";
        confirmContent.value = `确认将 "${item.coupon.name}" 充值到余额？`;
        confirmBtnText.value = "立即充值";
        showConfirm.value = true;
        return;
      }
      if (item.status === "used" || item.status === "expired") {
        actionType.value = "delete";
        confirmType.value = "danger";
        confirmTitle.value = "删除记录";
        confirmContent.value = "确定要删除这条优惠券记录吗？此操作不可恢复。";
        confirmBtnText.value = "确认删除";
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
            showToast("充值成功", "success");
            await userStore.fetchUserInfo();
            reset();
          } else {
            showToast(res.msg || "使用失败", "error");
          }
        } else if (actionType.value === "delete") {
          const res = await couponApi.deleteUserCoupon(currentItem.value.id);
          if (res.success) {
            showToast("删除成功", "success");
            reset();
          } else {
            showToast(res.msg || "删除失败", "error");
          }
        }
        showConfirm.value = false;
      } catch (e) {
        showToast("操作失败", "error");
      } finally {
        confirmLoading.value = false;
      }
    };
    const getExpiryText = (dateStr) => {
      if (!dateStr) return "永久有效";
      return `有效期至 ${dateStr.split("T")[0]}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-27dc95dc><div class="mobile-bg-fixed" data-v-27dc95dc></div>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "兑换中心" }, null, _parent));
      _push(`<div class="content-body" data-v-27dc95dc><div class="info-card-glass input-card" data-v-27dc95dc><div class="card-glow-bg" data-v-27dc95dc></div><div class="card-icon" data-v-27dc95dc>`);
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
      _push(`</div><div class="card-input-group" data-v-27dc95dc><div class="input-wrapper" data-v-27dc95dc><input type="text"${ssrRenderAttr("value", redeemCode.value)} placeholder="请输入兑换码" class="input-glass"${ssrIncludeBooleanAttr(redeeming.value) ? " disabled" : ""} data-v-27dc95dc></div><button class="redeem-btn"${ssrIncludeBooleanAttr(!redeemCode.value || redeeming.value) ? " disabled" : ""} data-v-27dc95dc>`);
      if (redeeming.value) {
        _push(`<div class="spinner-sm" data-v-27dc95dc></div>`);
      } else {
        _push(`<span data-v-27dc95dc>兑换</span>`);
      }
      _push(`</button></div><p class="tips" data-v-27dc95dc>兑换码通常由16位字母和数字组成</p></div><div class="section-header" data-v-27dc95dc><div class="title-left" data-v-27dc95dc><span class="icon-box" data-v-27dc95dc>`);
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
      _push(`</span><span class="title-text" data-v-27dc95dc>我的优惠券</span></div><span class="subtitle" data-v-27dc95dc>点击券面可直接使用或管理</span></div><div class="coupon-list" data-v-27dc95dc>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(loading) && unref(displayList).length === 0) {
              _push2(`<div class="list-items" data-v-27dc95dc${_scopeId}><!--[-->`);
              ssrRenderList(4, (i) => {
                _push2(`<div class="info-card-glass skeleton-card" style="${ssrRenderStyle({ "padding": "0", "min-height": "90px", "height": "90px", "border-radius": "12px", "display": "flex", "overflow": "hidden", "margin-bottom": "12px" })}" data-v-27dc95dc${_scopeId}><div style="${ssrRenderStyle({ "width": "100%", "height": "100%", "background": "rgba(30,41,59,0.5)" })}" data-v-27dc95dc${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton, {
                  animated: "",
                  style: { "width": "100%", "height": "100%" }
                }, {
                  template: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div style="${ssrRenderStyle({ "display": "flex", "height": "100%" })}" data-v-27dc95dc${_scopeId2}><div style="${ssrRenderStyle({ "width": "90px", "display": "flex", "align-items": "center", "justify-content": "center", "border-right": "1px dashed rgba(255,255,255,0.1)" })}" data-v-27dc95dc${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "circle",
                        style: { "width": "40px", "height": "40px" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div style="${ssrRenderStyle({ "flex": "1", "padding": "12px 14px", "display": "flex", "flex-direction": "column", "justify-content": "space-between" })}" data-v-27dc95dc${_scopeId2}><div style="${ssrRenderStyle({ "width": "100%" })}" data-v-27dc95dc${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "50%", "margin-bottom": "8px" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "30%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "100%" })}" data-v-27dc95dc${_scopeId2}>`);
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
              _push2(`<div class="empty-state" data-v-27dc95dc${_scopeId}><div class="empty-icon-box" data-v-27dc95dc${_scopeId}>`);
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
              _push2(`</div><p data-v-27dc95dc${_scopeId}>暂无优惠券记录</p></div>`);
            } else {
              _push2(`<div class="list-items" data-v-27dc95dc${_scopeId}><!--[-->`);
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
                createVNode("p", null, "暂无优惠券记录")
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-27dc95dc"]]);
export {
  index as default
};
//# sourceMappingURL=index-B2I1JXDD.js.map
