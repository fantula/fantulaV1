import { _ as _export_sfc, ad as BaseModal, E as ElIcon, aH as present_default, aI as select_default, aJ as _imports_1, f as arrow_right_default, as as lock_default, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, createTextVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

const _imports_0 = publicAssetsURL("/images/client/pc/zhifu2.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletRechargeModal",
  __ssrInlineRender: true,
  props: {
    initialAmount: {
      type: Number,
      default: 0
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const options = ref([]);
    const loading = ref(false);
    const selectedIdx = ref(0);
    const inputValue = ref(null);
    const payType = ref("alipay");
    const payAmount = computed(() => {
      if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
        return options.value[selectedIdx.value].value;
      }
      return inputValue.value || 0;
    });
    const currentBonus = computed(() => {
      if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
        return options.value[selectedIdx.value].bonus;
      }
      return 0;
    });
    const totalPoints = computed(() => {
      return payAmount.value + currentBonus.value;
    });
    const isValidAmount = computed(() => {
      return payAmount.value > 0;
    });
    function selectOption(idx) {
      selectedIdx.value = idx;
      if (idx !== -1) inputValue.value = null;
    }
    function handleRecharge() {
      loading.value = true;
      setTimeout(() => {
        ElMessage.success(`\u5DF2\u53D1\u8D77\u5145\u503C \xA5${payAmount.value.toFixed(2)} (${payType.value === "alipay" ? "\u652F\u4ED8\u5B9D" : "\u5FAE\u4FE1"})`);
        loading.value = false;
        emits("close");
      }, 800);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = BaseModal;
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: true,
        title: "\u8D2D\u7F6E\u989D\u5EA6",
        width: "860px",
        "show-footer": false,
        "theme-id": "suit-002",
        onClose: ($event) => _ctx.$emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="recharge-content" data-v-309fdb8b${_scopeId}><div class="modal-subtitle" data-v-309fdb8b${_scopeId}>Purchase Quota</div><div class="split-layout" data-v-309fdb8b${_scopeId}><div class="left-panel" data-v-309fdb8b${_scopeId}><div class="section-container" data-v-309fdb8b${_scopeId}><div class="section-label" data-v-309fdb8b${_scopeId}>\u9009\u62E9\u989D\u5EA6</div><div class="amount-grid" data-v-309fdb8b${_scopeId}><!--[-->`);
            ssrRenderList(options.value, (item, idx) => {
              _push2(`<div class="${ssrRenderClass(["amount-option", { active: selectedIdx.value === idx }])}" data-v-309fdb8b${_scopeId}><div class="option-content" data-v-309fdb8b${_scopeId}><div class="amount-row" data-v-309fdb8b${_scopeId}><span class="amount-main" data-v-309fdb8b${_scopeId}>${ssrInterpolate(item.value)}</span><span class="unit" data-v-309fdb8b${_scopeId}>\u70B9</span></div>`);
              if (item.bonus > 0) {
                _push2(`<div class="bonus-tag" data-v-309fdb8b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(present_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(present_default))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(` \u9001 ${ssrInterpolate(item.bonus)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--><div class="${ssrRenderClass(["amount-option", "custom-option", { active: selectedIdx.value === -1 }])}" data-v-309fdb8b${_scopeId}><span class="custom-label" data-v-309fdb8b${_scopeId}>\u81EA\u5B9A\u4E49</span></div></div><div class="${ssrRenderClass([{ visible: selectedIdx.value === -1 }, "custom-input-wrapper"])}" data-v-309fdb8b${_scopeId}><input${ssrRenderAttr("value", inputValue.value)} type="number" min="1" placeholder="\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D"${ssrIncludeBooleanAttr(selectedIdx.value !== -1) ? " disabled" : ""} data-v-309fdb8b${_scopeId}><span class="input-suffix" data-v-309fdb8b${_scopeId}>\u70B9</span></div></div><div class="section-container" data-v-309fdb8b${_scopeId}><div class="section-label" data-v-309fdb8b${_scopeId}>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-309fdb8b${_scopeId}><div class="${ssrRenderClass(["pay-method", payType.value === "alipay" ? "active" : ""])}" data-v-309fdb8b${_scopeId}><div class="icon-container alipay" data-v-309fdb8b${_scopeId}><img class="pay-icon"${ssrRenderAttr("src", _imports_0)} alt="\u652F\u4ED8\u5B9D" data-v-309fdb8b${_scopeId}></div><span data-v-309fdb8b${_scopeId}>\u652F\u4ED8\u5B9D</span>`);
            if (payType.value === "alipay") {
              _push2(`<div class="pay-check" data-v-309fdb8b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(select_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(select_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass(["pay-method", payType.value === "wechat" ? "active" : ""])}" data-v-309fdb8b${_scopeId}><div class="icon-container wechat" data-v-309fdb8b${_scopeId}><img class="pay-icon"${ssrRenderAttr("src", _imports_1)} alt="\u5FAE\u4FE1" data-v-309fdb8b${_scopeId}></div><span data-v-309fdb8b${_scopeId}>\u5FAE\u4FE1</span>`);
            if (payType.value === "wechat") {
              _push2(`<div class="pay-check" data-v-309fdb8b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(select_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(select_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="modal-footer" data-v-309fdb8b${_scopeId}>`);
            if (isValidAmount.value) {
              _push2(`<div class="actual-arrival-info" data-v-309fdb8b${_scopeId}><span class="label" data-v-309fdb8b${_scopeId}>\u5B9E\u9645\u5230\u8D26:</span><span class="value" data-v-309fdb8b${_scopeId}>${ssrInterpolate(totalPoints.value)} \u70B9</span>`);
              if (currentBonus.value > 0) {
                _push2(`<span class="bonus-hint" data-v-309fdb8b${_scopeId}>(\u542B\u8D60\u9001 ${ssrInterpolate(currentBonus.value)} \u70B9)</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="action-row" data-v-309fdb8b${_scopeId}><button class="btn-confirm"${ssrIncludeBooleanAttr(!isValidAmount.value) ? " disabled" : ""} data-v-309fdb8b${_scopeId}><span class="btn-text" data-v-309fdb8b${_scopeId}>\u7ACB\u5373\u652F\u4ED8 \xA5${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
            _push2(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(arrow_right_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(arrow_right_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</button></div><div class="security-tip" data-v-309fdb8b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(lock_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(lock_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u5B89\u5168\u52A0\u5BC6\u652F\u4ED8 </div></div></div><div class="right-spacer" data-v-309fdb8b${_scopeId}></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "recharge-content" }, [
                createVNode("div", { class: "modal-subtitle" }, "Purchase Quota"),
                createVNode("div", { class: "split-layout" }, [
                  createVNode("div", { class: "left-panel" }, [
                    createVNode("div", { class: "section-container" }, [
                      createVNode("div", { class: "section-label" }, "\u9009\u62E9\u989D\u5EA6"),
                      createVNode("div", { class: "amount-grid" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(options.value, (item, idx) => {
                          return openBlock(), createBlock("div", {
                            key: item.value,
                            class: ["amount-option", { active: selectedIdx.value === idx }],
                            onClick: ($event) => selectOption(idx)
                          }, [
                            createVNode("div", { class: "option-content" }, [
                              createVNode("div", { class: "amount-row" }, [
                                createVNode("span", { class: "amount-main" }, toDisplayString(item.value), 1),
                                createVNode("span", { class: "unit" }, "\u70B9")
                              ]),
                              item.bonus > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "bonus-tag"
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(present_default))
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u9001 " + toDisplayString(item.bonus), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ], 10, ["onClick"]);
                        }), 128)),
                        createVNode("div", {
                          class: ["amount-option", "custom-option", { active: selectedIdx.value === -1 }],
                          onClick: ($event) => selectOption(-1)
                        }, [
                          createVNode("span", { class: "custom-label" }, "\u81EA\u5B9A\u4E49")
                        ], 10, ["onClick"])
                      ]),
                      createVNode("div", {
                        class: ["custom-input-wrapper", { visible: selectedIdx.value === -1 }]
                      }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => inputValue.value = $event,
                          type: "number",
                          min: "1",
                          placeholder: "\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D",
                          disabled: selectedIdx.value !== -1
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [
                            vModelText,
                            inputValue.value,
                            void 0,
                            { number: true }
                          ]
                        ]),
                        createVNode("span", { class: "input-suffix" }, "\u70B9")
                      ], 2)
                    ]),
                    createVNode("div", { class: "section-container" }, [
                      createVNode("div", { class: "section-label" }, "\u652F\u4ED8\u65B9\u5F0F"),
                      createVNode("div", { class: "pay-methods" }, [
                        createVNode("div", {
                          class: ["pay-method", payType.value === "alipay" ? "active" : ""],
                          onClick: ($event) => payType.value = "alipay"
                        }, [
                          createVNode("div", { class: "icon-container alipay" }, [
                            createVNode("img", {
                              class: "pay-icon",
                              src: _imports_0,
                              alt: "\u652F\u4ED8\u5B9D"
                            })
                          ]),
                          createVNode("span", null, "\u652F\u4ED8\u5B9D"),
                          payType.value === "alipay" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "pay-check"
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(select_default))
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ], 10, ["onClick"]),
                        createVNode("div", {
                          class: ["pay-method", payType.value === "wechat" ? "active" : ""],
                          onClick: ($event) => payType.value = "wechat"
                        }, [
                          createVNode("div", { class: "icon-container wechat" }, [
                            createVNode("img", {
                              class: "pay-icon",
                              src: _imports_1,
                              alt: "\u5FAE\u4FE1"
                            })
                          ]),
                          createVNode("span", null, "\u5FAE\u4FE1"),
                          payType.value === "wechat" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "pay-check"
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(select_default))
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ], 10, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "modal-footer" }, [
                      isValidAmount.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "actual-arrival-info"
                      }, [
                        createVNode("span", { class: "label" }, "\u5B9E\u9645\u5230\u8D26:"),
                        createVNode("span", { class: "value" }, toDisplayString(totalPoints.value) + " \u70B9", 1),
                        currentBonus.value > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "bonus-hint"
                        }, "(\u542B\u8D60\u9001 " + toDisplayString(currentBonus.value) + " \u70B9)", 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "action-row" }, [
                        createVNode("button", {
                          class: "btn-confirm",
                          disabled: !isValidAmount.value,
                          onClick: handleRecharge
                        }, [
                          createVNode("span", { class: "btn-text" }, "\u7ACB\u5373\u652F\u4ED8 \xA5" + toDisplayString(payAmount.value.toFixed(2)), 1),
                          createVNode(_component_el_icon, { class: "btn-icon" }, {
                            default: withCtx(() => [
                              createVNode(unref(arrow_right_default))
                            ]),
                            _: 1
                          })
                        ], 8, ["disabled"])
                      ]),
                      createVNode("div", { class: "security-tip" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(lock_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u5B89\u5168\u52A0\u5BC6\u652F\u4ED8 ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "right-spacer" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/business/WalletRechargeModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WalletRechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-309fdb8b"]]);

export { WalletRechargeModal as W };
//# sourceMappingURL=WalletRechargeModal-BlA6TVen.mjs.map
