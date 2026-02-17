import { E as ElSkeleton, a as ElSkeletonItem } from "./index-BSkMD3ma.js";
import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
/* empty css                     */
/* empty css                          */
/* empty css                    */
import { defineComponent, computed, mergeProps, withCtx, createVNode, renderSlot, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext, defineAsyncComponent, ref, unref, resolveDynamicComponent, Fragment, renderList, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import { useRouter } from "vue-router";
import { c as couponApi } from "./coupon-CAcMEk5R.js";
import { u as useInfiniteScroll } from "./useInfiniteScroll-Cg7MWwox.js";
import { B as BaseInfiniteList } from "./BaseInfiniteList-BcO6J-HE.js";
import { E as ticket_default } from "./index-CCIZH4aC.js";
import { B as BaseConfirmModal } from "./BaseConfirmModal-DX5ElCqL.js";
import { _ as __nuxt_component_0 } from "./BaseModal-nbvk9VuE.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-CIurcsSv.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
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
import "./BaseButton-BnWAaIRO.js";
import "./typescript-D6L75muK.js";
import "./icon-CadSVx0p.js";
import "./use-global-config-CaR6i8cb.js";
import "./index-C1njJNPQ.js";
import "./event-D3FEo2C5.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseResultModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    type: { default: "success" },
    title: { default: "操作成功" },
    message: {},
    primaryText: { default: "确定" },
    secondaryText: { default: "返回" },
    showSecondary: { type: Boolean, default: false },
    showMascot: { type: Boolean, default: false },
    mascotPosition: { default: "bottom" }
  },
  emits: ["close", "primary", "secondary", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const iconClass = computed(() => `icon-${props.type}`);
    const primaryBtnClass = computed(() => ({
      "btn-success": props.type === "success",
      "btn-danger": props.type === "error",
      "btn-warning": props.type === "warning",
      "btn-primary": props.type === "info"
    }));
    const handleClose = () => {
      emit("close");
      emit("update:visible", false);
    };
    const handlePrimary = () => {
      emit("primary");
      handleClose();
    };
    const handleSecondary = () => {
      emit("secondary");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(__nuxt_component_0, mergeProps({
        visible: __props.visible,
        title: __props.title,
        width: "500px",
        "show-footer": false,
        "show-mascot": __props.showMascot,
        "mascot-position": __props.mascotPosition,
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="result-body" data-v-43a6f06d${_scopeId}><div class="${ssrRenderClass([iconClass.value, "result-icon"])}" data-v-43a6f06d${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
              if (__props.type === "success") {
                _push2(`<span data-v-43a6f06d${_scopeId}>✓</span>`);
              } else if (__props.type === "error") {
                _push2(`<span data-v-43a6f06d${_scopeId}>✕</span>`);
              } else if (__props.type === "warning") {
                _push2(`<span data-v-43a6f06d${_scopeId}>!</span>`);
              } else {
                _push2(`<span data-v-43a6f06d${_scopeId}>i</span>`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (__props.message) {
              _push2(`<div class="result-message" data-v-43a6f06d${_scopeId}>${ssrInterpolate(__props.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$slots.default) {
              _push2(`<div class="result-content" data-v-43a6f06d${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="result-actions" data-v-43a6f06d${_scopeId}>`);
            if (__props.showSecondary) {
              _push2(`<button class="btn btn-secondary" data-v-43a6f06d${_scopeId}>${ssrInterpolate(__props.secondaryText)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="${ssrRenderClass([primaryBtnClass.value, "btn"])}" data-v-43a6f06d${_scopeId}>${ssrInterpolate(__props.primaryText)}</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "result-body" }, [
                createVNode("div", {
                  class: ["result-icon", iconClass.value]
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    __props.type === "success" ? (openBlock(), createBlock("span", { key: 0 }, "✓")) : __props.type === "error" ? (openBlock(), createBlock("span", { key: 1 }, "✕")) : __props.type === "warning" ? (openBlock(), createBlock("span", { key: 2 }, "!")) : (openBlock(), createBlock("span", { key: 3 }, "i"))
                  ], true)
                ], 2),
                __props.message ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "result-message"
                }, toDisplayString(__props.message), 1)) : createCommentVNode("", true),
                _ctx.$slots.default ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "result-content"
                }, [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "result-actions" }, [
                  __props.showSecondary ? (openBlock(), createBlock("button", {
                    key: 0,
                    class: "btn btn-secondary",
                    onClick: handleSecondary
                  }, toDisplayString(__props.secondaryText), 1)) : createCommentVNode("", true),
                  createVNode("button", {
                    class: ["btn", primaryBtnClass.value],
                    onClick: handlePrimary
                  }, toDisplayString(__props.primaryText), 3)
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/base/BaseResultModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BaseResultModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-43a6f06d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "exchange",
  __ssrInlineRender: true,
  setup(__props) {
    const RedemptionCard = defineAsyncComponent(() => import("./RedemptionCard-B7aga8Tx.js"));
    const CouponBalance = defineAsyncComponent(() => import("./CouponBalance-DPUFrsbq.js"));
    const CouponFlat = defineAsyncComponent(() => import("./CouponFlat-DNm5An2g.js"));
    const CouponProduct = defineAsyncComponent(() => import("./CouponProduct-aX50aOkI.js"));
    const userStore = useUserStore();
    useRouter();
    const couponList = ref([]);
    const activeTab = ref("all");
    const tabs = [
      { key: "all", label: "全部" },
      { key: "unused", label: "未使用" },
      { key: "used", label: "已使用" },
      { key: "expired", label: "已过期" }
    ];
    const filteredSource = computed(() => {
      const now = /* @__PURE__ */ new Date();
      let list = couponList.value;
      if (activeTab.value === "used") {
        return list.filter((c) => c.status === "used");
      }
      if (activeTab.value === "expired") {
        return list.filter((c) => c.status === "expired" || c.coupon.end_date && new Date(c.coupon.end_date) < now);
      }
      if (activeTab.value === "unused") {
        return list.filter((c) => c.status === "unused" && (!c.coupon.end_date || new Date(c.coupon.end_date) >= now));
      }
      return list;
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredSource,
      pageSize: 10
    });
    const fetchCoupons = async () => {
      loading.value = true;
      try {
        const res = await couponApi.getUserCoupons();
        if (res.success && res.data) {
          couponList.value = res.data;
        }
      } finally {
        loading.value = false;
      }
    };
    const getCouponComponent = (type) => {
      switch (type) {
        case "balance":
          return CouponBalance;
        case "product":
          return CouponProduct;
        case "flat":
          return CouponFlat;
        default:
          return CouponFlat;
      }
    };
    const processing = ref(false);
    const currentCoupon = ref(null);
    const showSuccessModal = ref(false);
    const redeemedCouponRaw = ref(null);
    const successMessage = computed(() => {
      const c = redeemedCouponRaw.value;
      if (!c) return "恭喜您获得一张优惠券！";
      return `恭喜您获得 ${c.name}，包含 ${c.value}点 权益`;
    });
    const onCouponRedeemed = (data) => {
      redeemedCouponRaw.value = data;
      showSuccessModal.value = true;
      fetchCoupons();
    };
    const showBalanceModal = ref(false);
    const handleUseBalance = (coupon) => {
      currentCoupon.value = coupon;
      showBalanceModal.value = true;
    };
    const confirmUseBalance = async () => {
      if (!currentCoupon.value || processing.value) return;
      processing.value = true;
      try {
        const res = await couponApi.useBalanceCoupon(currentCoupon.value.id);
        if (res.success) {
          ElMessage.success("金额已成功存入您的钱包");
          showBalanceModal.value = false;
          fetchCoupons();
          userStore.fetchUserInfo();
        } else {
          ElMessage.error(res.msg || "操作失败");
        }
      } finally {
        processing.value = false;
      }
    };
    const showDeleteModal = ref(false);
    const handleCouponClick = (coupon) => {
      if (coupon.status === "used" || coupon.status === "expired" || isExpired(coupon)) {
        currentCoupon.value = coupon;
        showDeleteModal.value = true;
      }
    };
    const confirmDelete = async () => {
      if (!currentCoupon.value || processing.value) return;
      processing.value = true;
      try {
        const res = await couponApi.deleteUserCoupon(currentCoupon.value.id);
        if (res.success) {
          ElMessage.success("删除成功");
          showDeleteModal.value = false;
          couponList.value = couponList.value.filter((c) => c.id !== currentCoupon.value?.id);
        } else {
          ElMessage.error(res.msg || "删除失败");
        }
      } finally {
        processing.value = false;
      }
    };
    const isExpired = (coupon) => {
      if (!coupon.coupon.end_date) return false;
      return new Date(coupon.coupon.end_date) < /* @__PURE__ */ new Date();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exchange-section" }, _attrs))} data-v-709799dd><div class="section-header" data-v-709799dd><h2 class="section-title" data-v-709799dd>兑换中心</h2><div class="section-subtitle" data-v-709799dd>Digital Vault</div></div>`);
      _push(ssrRenderComponent(unref(RedemptionCard), { onRedeemed: onCouponRedeemed }, null, _parent));
      _push(`<div class="coupon-tabs" data-v-709799dd><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: activeTab.value === tab.key }])}" data-v-709799dd>${ssrInterpolate(tab.label)} `);
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-709799dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="coupon-list-container" data-v-709799dd>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        offset: 150
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(loading) && unref(displayList).length === 0) {
              _push2(`<div class="coupon-list" data-v-709799dd${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(`<div style="${ssrRenderStyle({ "padding": "24px", "background": "rgba(30,41,59,0.4)", "border": "1px solid rgba(255,255,255,0.05)", "border-radius": "16px", "display": "flex", "gap": "24px" })}" data-v-709799dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton, {
                  animated: "",
                  style: { "width": "100%" }
                }, {
                  template: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "24px", "align-items": "center" })}" data-v-709799dd${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "rect",
                        style: { "width": "140px", "height": "100px", "border-radius": "12px" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<div style="${ssrRenderStyle({ "flex": "1" })}" data-v-709799dd${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "40%", "margin-bottom": "16px" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "70%", "margin-bottom": "12px" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "30%" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div style="${ssrRenderStyle({ "width": "100px", "display": "flex", "justify-content": "flex-end" })}" data-v-709799dd${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_skeleton_item, {
                        variant: "button",
                        style: { "width": "88px", "height": "40px", "border-radius": "20px" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { style: { "display": "flex", "gap": "24px", "align-items": "center" } }, [
                          createVNode(_component_el_skeleton_item, {
                            variant: "rect",
                            style: { "width": "140px", "height": "100px", "border-radius": "12px" }
                          }),
                          createVNode("div", { style: { "flex": "1" } }, [
                            createVNode(_component_el_skeleton_item, {
                              variant: "h3",
                              style: { "width": "40%", "margin-bottom": "16px" }
                            }),
                            createVNode(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "70%", "margin-bottom": "12px" }
                            }),
                            createVNode(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "30%" }
                            })
                          ]),
                          createVNode("div", { style: { "width": "100px", "display": "flex", "justify-content": "flex-end" } }, [
                            createVNode(_component_el_skeleton_item, {
                              variant: "button",
                              style: { "width": "88px", "height": "40px", "border-radius": "20px" }
                            })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (unref(displayList).length === 0) {
              _push2(`<div class="empty-state" data-v-709799dd${_scopeId}>`);
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
              _push2(`<div class="empty-text" data-v-709799dd${_scopeId}>暂无优惠券</div><div class="empty-desc" data-v-709799dd${_scopeId}>快去兑换或参与活动获取吧~</div></div>`);
            } else {
              _push2(`<div class="coupon-list" data-v-709799dd${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (coupon) => {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getCouponComponent(coupon.coupon.type)), {
                  key: coupon.id,
                  "coupon-data": coupon,
                  "is-expired": isExpired(coupon) || coupon.status === "expired",
                  onClick: handleCouponClick,
                  onUse: handleUseBalance
                }, null), _parent2, _scopeId);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(loading) && unref(displayList).length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "coupon-list"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                  return createVNode("div", {
                    key: i,
                    style: { "padding": "24px", "background": "rgba(30,41,59,0.4)", "border": "1px solid rgba(255,255,255,0.05)", "border-radius": "16px", "display": "flex", "gap": "24px" }
                  }, [
                    createVNode(_component_el_skeleton, {
                      animated: "",
                      style: { "width": "100%" }
                    }, {
                      template: withCtx(() => [
                        createVNode("div", { style: { "display": "flex", "gap": "24px", "align-items": "center" } }, [
                          createVNode(_component_el_skeleton_item, {
                            variant: "rect",
                            style: { "width": "140px", "height": "100px", "border-radius": "12px" }
                          }),
                          createVNode("div", { style: { "flex": "1" } }, [
                            createVNode(_component_el_skeleton_item, {
                              variant: "h3",
                              style: { "width": "40%", "margin-bottom": "16px" }
                            }),
                            createVNode(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "70%", "margin-bottom": "12px" }
                            }),
                            createVNode(_component_el_skeleton_item, {
                              variant: "text",
                              style: { "width": "30%" }
                            })
                          ]),
                          createVNode("div", { style: { "width": "100px", "display": "flex", "justify-content": "flex-end" } }, [
                            createVNode(_component_el_skeleton_item, {
                              variant: "button",
                              style: { "width": "88px", "height": "40px", "border-radius": "20px" }
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]);
                }), 64))
              ])) : unref(displayList).length === 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "empty-state"
              }, [
                createVNode(_component_el_icon, { class: "empty-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(ticket_default))
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "empty-text" }, "暂无优惠券"),
                createVNode("div", { class: "empty-desc" }, "快去兑换或参与活动获取吧~")
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "coupon-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (coupon) => {
                  return openBlock(), createBlock(resolveDynamicComponent(getCouponComponent(coupon.coupon.type)), {
                    key: coupon.id,
                    "coupon-data": coupon,
                    "is-expired": isExpired(coupon) || coupon.status === "expired",
                    onClick: handleCouponClick,
                    onUse: handleUseBalance
                  }, null, 40, ["coupon-data", "is-expired"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showBalanceModal.value,
        "onUpdate:visible": ($event) => showBalanceModal.value = $event,
        title: "确认使用额度券",
        "confirm-text": "确定兑换",
        loading: processing.value,
        onConfirm: confirmUseBalance,
        "show-mascot": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentCoupon.value) {
              _push2(`<div class="modal-text" data-v-709799dd${_scopeId}> 确定要将这张面值为 <span class="highlight" data-v-709799dd${_scopeId}>${ssrInterpolate(currentCoupon.value.coupon.value)} 点</span> 的额度券兑换到您的账户余额中吗？ <br data-v-709799dd${_scopeId}><span class="warning" data-v-709799dd${_scopeId}>兑换后优惠券将自动失效。</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentCoupon.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "modal-text"
              }, [
                createTextVNode(" 确定要将这张面值为 "),
                createVNode("span", { class: "highlight" }, toDisplayString(currentCoupon.value.coupon.value) + " 点", 1),
                createTextVNode(" 的额度券兑换到您的账户余额中吗？ "),
                createVNode("br"),
                createVNode("span", { class: "warning" }, "兑换后优惠券将自动失效。")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showDeleteModal.value,
        "onUpdate:visible": ($event) => showDeleteModal.value = $event,
        title: "删除优惠券",
        "confirm-text": "确认删除",
        "confirm-type": "danger",
        loading: processing.value,
        onConfirm: confirmDelete,
        "show-mascot": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-text" data-v-709799dd${_scopeId}>确定要永久删除这张优惠券记录吗？此操作无法撤销。</div>`);
          } else {
            return [
              createVNode("div", { class: "modal-text" }, "确定要永久删除这张优惠券记录吗？此操作无法撤销。")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseResultModal, {
        visible: showSuccessModal.value,
        "onUpdate:visible": ($event) => showSuccessModal.value = $event,
        type: "success",
        title: "兑换成功",
        message: successMessage.value,
        "primary-text": "太棒了",
        onPrimary: ($event) => showSuccessModal.value = false,
        "show-mascot": "",
        "mascot-position": "bottom"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/exchange.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const exchange = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-709799dd"]]);
export {
  exchange as default
};
//# sourceMappingURL=exchange-oyD-iFHw.js.map
