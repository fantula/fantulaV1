import { _ as _export_sfc, E as ElIcon, a3 as info_filled_default, b9 as refresh_default, a_ as circle_close_default } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { c as couponApi, B as BaseCouponTicket } from './BaseCouponTicket-DeNYuNt9.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseBusinessModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: { default: "\u4E1A\u52A1\u5F39\u7A97" },
    subtitle: {},
    width: { default: "600px" },
    showHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showConfirm: { type: Boolean, default: true },
    cancelText: { default: "\u53D6\u6D88" },
    confirmText: { default: "\u786E\u5B9A" },
    loading: { type: Boolean, default: false },
    confirmDisabled: { type: Boolean, default: false }
  },
  emits: ["close", "cancel", "confirm"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-79bcbf9a><div class="modal-business" style="${ssrRenderStyle({ width: __props.width })}" data-v-79bcbf9a>`);
        if (__props.showHeader) {
          _push(`<div class="modal-header" data-v-79bcbf9a><div class="header-content" data-v-79bcbf9a><div class="modal-title" data-v-79bcbf9a>${ssrInterpolate(__props.title)}</div>`);
          if (__props.subtitle) {
            _push(`<div class="modal-subtitle" data-v-79bcbf9a>${ssrInterpolate(__props.subtitle)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="modal-close" data-v-79bcbf9a>\xD7</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([{ "no-header": !__props.showHeader }, "modal-body"])}" data-v-79bcbf9a>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
        if (__props.showFooter) {
          _push(`<div class="modal-footer" data-v-79bcbf9a><div class="footer-left" data-v-79bcbf9a>`);
          ssrRenderSlot(_ctx.$slots, "footer-left", {}, null, _push, _parent);
          _push(`</div><div class="footer-right" data-v-79bcbf9a>`);
          ssrRenderSlot(_ctx.$slots, "footer-right", {}, () => {
            if (__props.showCancel) {
              _push(`<button class="btn btn-secondary"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-79bcbf9a>${ssrInterpolate(__props.cancelText)}</button>`);
            } else {
              _push(`<!---->`);
            }
            if (__props.showConfirm) {
              _push(`<button class="btn btn-primary"${ssrIncludeBooleanAttr(__props.loading || __props.confirmDisabled) ? " disabled" : ""} data-v-79bcbf9a>`);
              if (__props.loading) {
                _push(`<span class="btn-loading" data-v-79bcbf9a></span>`);
              } else {
                _push(`<!---->`);
              }
              _push(` ${ssrInterpolate(__props.confirmText)}</button>`);
            } else {
              _push(`<!---->`);
            }
          }, _push, _parent);
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/base/BaseBusinessModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BaseBusinessModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-79bcbf9a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CouponSelectorModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderAmount: {},
    skuIds: {},
    productIds: {},
    currentCouponId: {}
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visible = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const listLoading = ref(false);
    const loading = ref(false);
    const coupons = ref([]);
    const tempSelected = ref(null);
    watch(() => props.modelValue, (val) => {
      if (val) {
        loadCoupons();
      }
    });
    const sortedCoupons = computed(() => {
      return [...coupons.value].sort((a, b) => {
        const aValid = isApplicable(a);
        const bValid = isApplicable(b);
        if (aValid && !bValid) return -1;
        if (!aValid && bValid) return 1;
        return b.coupon.value - a.coupon.value;
      });
    });
    const loadCoupons = async () => {
      listLoading.value = true;
      try {
        const res = await couponApi.getUserCoupons();
        if (res.success && res.data) {
          const now = /* @__PURE__ */ new Date();
          coupons.value = res.data.filter(
            (c) => c.status === "unused" && c.coupon.type !== "balance" && (!c.coupon.end_date || new Date(c.coupon.end_date) >= now)
          );
          if (props.currentCouponId) {
            tempSelected.value = coupons.value.find((c) => c.id === props.currentCouponId) || null;
          } else {
            tempSelected.value = null;
          }
        }
      } catch (e) {
        console.error("Failed to load coupons", e);
      } finally {
        listLoading.value = false;
      }
    };
    const isApplicable = (coupon) => {
      const c = coupon.coupon;
      if (props.orderAmount < c.min_usage) return false;
      if (c.type === "product") {
        c.extra || {};
        const cAny = c;
        if (cAny.sku_ids && cAny.sku_ids.length > 0) {
          const hasCommonSku = props.skuIds.some(
            (sid) => cAny.sku_ids.includes(sid)
          );
          if (!hasCommonSku) return false;
        } else if (cAny.product_ids && cAny.product_ids.length > 0) {
          const hasCommonProduct = props.productIds.some(
            (pid) => {
              var _a;
              return (_a = cAny.product_ids) == null ? void 0 : _a.includes(pid);
            }
          );
          if (!hasCommonProduct) return false;
        }
      }
      return true;
    };
    const getInapplicableReason = (coupon) => {
      if (props.orderAmount < coupon.coupon.min_usage) {
        return `\u8FD8\u5DEE \xA5${(coupon.coupon.min_usage - props.orderAmount).toFixed(2)}`;
      }
      if (coupon.coupon.type === "product") {
        return "\u8BE5\u5546\u54C1\u4E0D\u53EF\u7528";
      }
      return "\u4E0D\u53EF\u7528";
    };
    const handleItemClick = (coupon) => {
      if (!isApplicable(coupon)) return;
      tempSelected.value = coupon;
    };
    const handleClose = () => {
      visible.value = false;
    };
    const handleConfirm = () => {
      emit("select", tempSelected.value);
      visible.value = false;
    };
    const getTicketColor = (c) => {
      if (c.type === "flat") return "purple";
      if (c.type === "product") return "cyan";
      if (c.type === "balance") return "gold";
      return "default";
    };
    const getTicketDesc = (c) => {
      if (c.type === "product") {
        const extra = c.extra;
        if (extra && extra.product_name) {
          return `${extra.product_name} \u4E13\u7528`;
        }
        return "\u6307\u5B9A\u5546\u54C1\u4E13\u7528\u4F18\u60E0";
      }
      if (c.min_usage > 0) return `\u6EE1 ${c.min_usage} \u53EF\u7528`;
      return "\u65E0\u95E8\u69DB\u4F7F\u7528";
    };
    const getTicketValue = (c) => {
      if (c.type === "product" && (!c.value || c.value === 0)) {
        return "\u5151\u6362";
      }
      return c.value;
    };
    const getTicketUnit = (c) => {
      if (c.type === "product" && (!c.value || c.value === 0)) {
        return "";
      }
      return "\u70B9";
    };
    const getCouponTypeLabel = (type) => {
      const map = { flat: "\u7ACB\u51CF\u5238", product: "\u5546\u54C1\u5238", balance: "\u989D\u5EA6\u5238" };
      return map[type] || "\u901A\u7528\u5238";
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(dateStr);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_empty = ElEmpty;
      _push(ssrRenderComponent(BaseBusinessModal, mergeProps({
        visible: visible.value,
        title: "\u9009\u62E9\u4F18\u60E0\u5238",
        width: "600px",
        confirmText: "\u786E\u8BA4\u4F7F\u7528",
        loading: loading.value,
        confirmDisabled: false,
        onClose: handleClose,
        onCancel: handleClose,
        onConfirm: handleConfirm
      }, _attrs), {
        "footer-left": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (tempSelected.value) {
              _push2(`<div class="selected-info" data-v-36f7881c${_scopeId}> \u5DF2\u9009\u62E9: <span class="highlight" data-v-36f7881c${_scopeId}>${ssrInterpolate(tempSelected.value.coupon.name)}</span><span class="discount-preview" data-v-36f7881c${_scopeId}>-\xA5${ssrInterpolate(tempSelected.value.coupon.value)}</span></div>`);
            } else {
              _push2(`<div class="selected-info" data-v-36f7881c${_scopeId}> \u672A\u9009\u62E9\u4F18\u60E0\u5238 </div>`);
            }
          } else {
            return [
              tempSelected.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "selected-info"
              }, [
                createTextVNode(" \u5DF2\u9009\u62E9: "),
                createVNode("span", { class: "highlight" }, toDisplayString(tempSelected.value.coupon.name), 1),
                createVNode("span", { class: "discount-preview" }, "-\xA5" + toDisplayString(tempSelected.value.coupon.value), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "selected-info"
              }, " \u672A\u9009\u62E9\u4F18\u60E0\u5238 "))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="coupon-selector-content" data-v-36f7881c${_scopeId}><div class="action-header" data-v-36f7881c${_scopeId}><div class="header-tip" data-v-36f7881c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(info_filled_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(info_filled_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u4EC5\u663E\u793A\u5F53\u524D\u8BA2\u5355\u53EF\u7528\u7684\u4F18\u60E0\u5238 </div>`);
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              circle: "",
              size: "small",
              class: "refresh-btn",
              onClick: loadCoupons,
              loading: listLoading.value
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="coupon-list-container" data-v-36f7881c${_scopeId}>`);
            if (listLoading.value) {
              _push2(`<div class="loading-state" data-v-36f7881c${_scopeId}><div class="spinner" data-v-36f7881c${_scopeId}></div> \u6B63\u5728\u83B7\u53D6\u4F18\u60E0\u5238... </div>`);
            } else if (coupons.value.length === 0) {
              _push2(`<div class="empty-state" data-v-36f7881c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "\u6682\u65E0\u53EF\u7528\u4F18\u60E0\u5238",
                "image-size": 80
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="coupon-list" data-v-36f7881c${_scopeId}><div class="${ssrRenderClass([{ active: tempSelected.value === null }, "coupon-item no-coupon glass-card"])}" data-v-36f7881c${_scopeId}><div class="coupon-left" data-v-36f7881c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(circle_close_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(circle_close_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="coupon-center" data-v-36f7881c${_scopeId}><div class="coupon-title" data-v-36f7881c${_scopeId}>\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238</div><div class="coupon-desc" data-v-36f7881c${_scopeId}>\u653E\u5F03\u5F53\u524D\u4F18\u60E0</div></div><div class="coupon-right" data-v-36f7881c${_scopeId}><div class="radio-check" data-v-36f7881c${_scopeId}></div></div></div><!--[-->`);
              ssrRenderList(sortedCoupons.value, (coupon) => {
                var _a;
                _push2(`<div class="${ssrRenderClass([{
                  selected: ((_a = tempSelected.value) == null ? void 0 : _a.id) === coupon.id,
                  disabled: !isApplicable(coupon)
                }, "ticket-wrapper"])}" data-v-36f7881c${_scopeId}>`);
                _push2(ssrRenderComponent(BaseCouponTicket, {
                  color: getTicketColor(coupon.coupon),
                  value: getTicketValue(coupon.coupon),
                  unit: getTicketUnit(coupon.coupon),
                  title: coupon.coupon.name,
                  desc: getTicketDesc(coupon.coupon),
                  "type-label": getCouponTypeLabel(coupon.coupon.type),
                  "expiry-text": formatDate(coupon.coupon.end_date),
                  status: "unused",
                  disabled: !isApplicable(coupon),
                  size: "compact",
                  class: "selector-ticket"
                }, {
                  action: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b;
                    if (_push3) {
                      _push3(`<div class="${ssrRenderClass([{ checked: ((_a2 = tempSelected.value) == null ? void 0 : _a2.id) === coupon.id }, "radio-check"])}" data-v-36f7881c${_scopeId2}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: ["radio-check", { checked: ((_b = tempSelected.value) == null ? void 0 : _b.id) === coupon.id }]
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (!isApplicable(coupon)) {
                  _push2(`<div class="inapplicable-reason" data-v-36f7881c${_scopeId}>${ssrInterpolate(getInapplicableReason(coupon))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "coupon-selector-content" }, [
                createVNode("div", { class: "action-header" }, [
                  createVNode("div", { class: "header-tip" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(info_filled_default))
                      ]),
                      _: 1
                    }),
                    createTextVNode(" \u4EC5\u663E\u793A\u5F53\u524D\u8BA2\u5355\u53EF\u7528\u7684\u4F18\u60E0\u5238 ")
                  ]),
                  createVNode(_component_el_button, {
                    icon: unref(refresh_default),
                    circle: "",
                    size: "small",
                    class: "refresh-btn",
                    onClick: loadCoupons,
                    loading: listLoading.value
                  }, null, 8, ["icon", "loading"])
                ]),
                createVNode("div", { class: "coupon-list-container" }, [
                  listLoading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "loading-state"
                  }, [
                    createVNode("div", { class: "spinner" }),
                    createTextVNode(" \u6B63\u5728\u83B7\u53D6\u4F18\u60E0\u5238... ")
                  ])) : coupons.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "empty-state"
                  }, [
                    createVNode(_component_el_empty, {
                      description: "\u6682\u65E0\u53EF\u7528\u4F18\u60E0\u5238",
                      "image-size": 80
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "coupon-list"
                  }, [
                    createVNode("div", {
                      class: ["coupon-item no-coupon glass-card", { active: tempSelected.value === null }],
                      onClick: ($event) => tempSelected.value = null
                    }, [
                      createVNode("div", { class: "coupon-left" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(circle_close_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "coupon-center" }, [
                        createVNode("div", { class: "coupon-title" }, "\u4E0D\u4F7F\u7528\u4F18\u60E0\u5238"),
                        createVNode("div", { class: "coupon-desc" }, "\u653E\u5F03\u5F53\u524D\u4F18\u60E0")
                      ]),
                      createVNode("div", { class: "coupon-right" }, [
                        createVNode("div", { class: "radio-check" })
                      ])
                    ], 10, ["onClick"]),
                    (openBlock(true), createBlock(Fragment, null, renderList(sortedCoupons.value, (coupon) => {
                      var _a;
                      return openBlock(), createBlock("div", {
                        key: coupon.id,
                        class: ["ticket-wrapper", {
                          selected: ((_a = tempSelected.value) == null ? void 0 : _a.id) === coupon.id,
                          disabled: !isApplicable(coupon)
                        }],
                        onClick: ($event) => handleItemClick(coupon)
                      }, [
                        createVNode(BaseCouponTicket, {
                          color: getTicketColor(coupon.coupon),
                          value: getTicketValue(coupon.coupon),
                          unit: getTicketUnit(coupon.coupon),
                          title: coupon.coupon.name,
                          desc: getTicketDesc(coupon.coupon),
                          "type-label": getCouponTypeLabel(coupon.coupon.type),
                          "expiry-text": formatDate(coupon.coupon.end_date),
                          status: "unused",
                          disabled: !isApplicable(coupon),
                          size: "compact",
                          class: "selector-ticket"
                        }, {
                          action: withCtx(() => {
                            var _a2;
                            return [
                              createVNode("div", {
                                class: ["radio-check", { checked: ((_a2 = tempSelected.value) == null ? void 0 : _a2.id) === coupon.id }]
                              }, null, 2)
                            ];
                          }),
                          _: 2
                        }, 1032, ["color", "value", "unit", "title", "desc", "type-label", "expiry-text", "disabled"]),
                        !isApplicable(coupon) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "inapplicable-reason"
                        }, toDisplayString(getInapplicableReason(coupon)), 1)) : createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/business/CouponSelectorModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CouponSelectorModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36f7881c"]]);

export { CouponSelectorModal as C };
//# sourceMappingURL=CouponSelectorModal-RmImYc2L.mjs.map
