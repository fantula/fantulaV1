import { _ as _export_sfc, d as useUserStore, E as ElIcon, a5 as wallet_default, a2 as warning_default, aC as lightning_default, $ as document_default, aD as top_default, aE as bottom_default, ad as BaseModal, az as present_default, aA as select_default, aB as _imports_1, f as arrow_right_default, as as lock_default, ac as authApi, ah as ElMessage } from './server.mjs';
import { E as ElTooltip } from './index-B9I5bL_Z.mjs';
import { E as ElSkeleton } from './index-BXD0oWDt.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, createTextVNode, withDirectives, vModelText, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'node:crypto';
import 'node:url';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './constants-hAKFmBbq.mjs';

const _imports_0 = publicAssetsURL("/images/client/pc/zhifu2.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/business/WalletRechargeModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WalletRechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-309fdb8b"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    useRoute();
    useRouter();
    const showRechargeModal = ref(false);
    const balance = ref(0);
    const transactions = ref([]);
    const loading = ref(true);
    const activeTab = ref("all");
    const balanceInteger = computed(() => Math.floor(balance.value).toLocaleString());
    const balanceDecimal = computed(() => (balance.value % 1).toFixed(2).split(".")[1]);
    const filteredTransactions = computed(() => {
      if (activeTab.value === "all") return transactions.value;
      if (activeTab.value === "income") return transactions.value.filter((t) => t.amount > 0);
      if (activeTab.value === "expense") return transactions.value.filter((t) => t.amount < 0);
      return transactions.value;
    });
    const fetchWallet = async () => {
      loading.value = true;
      try {
        const res = await authApi.getWalletData();
        if (res.success && res.data) {
          balance.value = res.data.balance || 0;
          transactions.value = res.data.transactions || [];
        }
      } finally {
        setTimeout(() => {
          loading.value = false;
        }, 300);
      }
    };
    const getTypeClass = (amount) => {
      return amount > 0 ? "income" : "expense";
    };
    const formatAmount = (val) => {
      return Math.abs(val).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const handleModalClose = () => {
      showRechargeModal.value = false;
      fetchWallet();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_tooltip = ElTooltip;
      const _component_el_skeleton = ElSkeleton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-page" }, _attrs))} data-v-6affe454><div class="asset-hero-card" data-v-6affe454><div class="hero-aurora-bg" data-v-6affe454></div><div class="hero-content" data-v-6affe454><div class="hero-header" data-v-6affe454><div class="header-main" data-v-6affe454><div class="card-icon-wrapper" data-v-6affe454>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(wallet_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(wallet_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-text" data-v-6affe454><span class="card-label" data-v-6affe454>\u6211\u7684\u989D\u5EA6</span><div class="card-tag" data-v-6affe454>My Quota</div></div></div>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "\u51E1\u56FE\u62C9\u989D\u5EA6\u4EC5\u7528\u4E8E\u5E73\u53F0\u5185\u670D\u52A1\u4F7F\u7528\uFF0C\u4E0D\u53EF\u63D0\u73B0\u6216\u8F6C\u8BA9",
        placement: "top",
        effect: "dark"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="info-btn" data-v-6affe454${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(warning_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(warning_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "info-btn" }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(warning_default))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="balance-display" data-v-6affe454><div class="balance-number" data-v-6affe454><span class="amount-integer" data-v-6affe454>${ssrInterpolate(balanceInteger.value)}</span><span class="amount-decimal" data-v-6affe454>.${ssrInterpolate(balanceDecimal.value)}</span></div><div class="balance-unit" data-v-6affe454>\u70B9</div></div><div class="hero-footer" data-v-6affe454><button class="neon-action-btn" data-v-6affe454>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(lightning_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(lightning_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-6affe454>\u7ACB\u5373\u5145\u503C</span><div class="btn-glow" data-v-6affe454></div></button></div></div>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "card-bg-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(wallet_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(wallet_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="ledger-section" data-v-6affe454><div class="ledger-header" data-v-6affe454><h3 class="section-title" data-v-6affe454>\u989D\u5EA6\u6D41\u6C34</h3><div class="glass-pill-tabs" data-v-6affe454><div class="${ssrRenderClass([{ active: activeTab.value === "all" }, "pill-tab"])}" data-v-6affe454>\u5168\u90E8</div><div class="${ssrRenderClass([{ active: activeTab.value === "income" }, "pill-tab income"])}" data-v-6affe454>\u83B7\u53D6</div><div class="${ssrRenderClass([{ active: activeTab.value === "expense" }, "pill-tab expense"])}" data-v-6affe454>\u6D88\u8017</div></div></div><div class="ledger-stream" data-v-6affe454>`);
      if (loading.value) {
        _push(`<div class="stream-loading" data-v-6affe454>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          animated: "",
          rows: 3
        }, null, _parent));
        _push(`</div>`);
      } else if (filteredTransactions.value.length === 0) {
        _push(`<div class="stream-empty" data-v-6affe454><div class="empty-bubble" data-v-6affe454>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(document_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><span data-v-6affe454>\u6682\u65E0${ssrInterpolate(activeTab.value === "all" ? "" : activeTab.value === "income" ? "\u83B7\u53D6" : "\u6D88\u8017")}\u8BB0\u5F55</span></div>`);
      } else {
        _push(`<div class="stream-list" data-v-6affe454><!--[-->`);
        ssrRenderList(filteredTransactions.value, (item, index) => {
          _push(`<div class="glass-stream-item" style="${ssrRenderStyle({ animationDelay: `${index * 0.05}s` })}" data-v-6affe454><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-icon-box"])}" data-v-6affe454>`);
          if (item.amount > 0) {
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(top_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(top_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(bottom_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(bottom_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`</div><div class="stream-content" data-v-6affe454><div class="stream-title" data-v-6affe454>${ssrInterpolate(item.description || item.type)}</div><div class="stream-date" data-v-6affe454>${ssrInterpolate(formatDate(item.created_at))}</div></div><div class="${ssrRenderClass([getTypeClass(item.amount), "stream-amount"])}" data-v-6affe454>${ssrInterpolate(item.amount > 0 ? "+" : "")}${ssrInterpolate(formatAmount(item.amount))} <span class="stream-unit" data-v-6affe454>\u70B9</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (showRechargeModal.value) {
        _push(ssrRenderComponent(WalletRechargeModal, {
          "initial-amount": Number(_ctx.$route.query.amount),
          onClose: handleModalClose
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/wallet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wallet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6affe454"]]);

export { wallet as default };
//# sourceMappingURL=wallet-B2ooliuK.mjs.map
