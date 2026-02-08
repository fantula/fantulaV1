import { _ as __nuxt_component_0 } from "./BaseModal-CiVpglQ1.js";
import { E as ElIcon } from "./index-jl2vZbkg.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, toDisplayString, createTextVNode, renderList, createCommentVNode, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-CTq2VprR.js";
import { _ as _imports_1 } from "./virtual_public-FTeKDcap.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { getAuthToken } from "./supabase-jxF0-7J3.js";
import { B as BaseButton } from "./BaseButton-BlqmccK6.js";
import { aT as present_default, _ as select_default, f as arrow_right_default, a5 as lock_default, a as circle_check_default } from "./index-DlETah8a.js";
import QRCode from "qrcode";
import { u as useUserStore } from "./user-Cnuc6I82.js";
import { s as setInterval } from "./interval-BHZX8LlC.js";
import { E as ElMessage } from "./index-DSo6N35Z.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "#internal/nuxt/paths";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-C8TGo9ts.js";
import "./typescript-D6L75muK.js";
import "./icon-CK7WLSPl.js";
import "./use-global-config-79yNXOXL.js";
import "./index-K5TIzHX_.js";
import "./event-D3FEo2C5.js";
async function getAuthHeaders() {
  const token = await getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
const wechatPayApi = {
  /**
   * 发起微信 Native 支付（PC扫码）
   * @param amount 充值金额（元）
   * @param bonus 赠送金额
   * @param description 商品描述
   */
  async nativePayRecharge(amount, bonus = 0, description) {
    try {
      const headers = await getAuthHeaders();
      const data = await $fetch("/api/wechat/native-pay", {
        method: "POST",
        body: { amount, bonus, description },
        headers
      });
      return data;
    } catch (error) {
      console.error("[WechatPay] nativePayRecharge error:", error);
      return { success: false, error: error.data?.message || error.message || "支付发起失败" };
    }
  },
  /**
   * 查询微信支付订单状态
   * @param outTradeNo 商户订单号
   */
  async queryOrder(outTradeNo) {
    try {
      const headers = await getAuthHeaders();
      const data = await $fetch("/api/wechat/query-order", {
        method: "POST",
        body: { out_trade_no: outTradeNo },
        headers
      });
      return data;
    } catch (error) {
      console.error("[WechatPay] queryOrder error:", error);
      return { success: false, error: error.data?.message || error.message || "查询失败" };
    }
  },
  /**
   * 发起微信 JSAPI 支付（公众号内）
   * @param amount 充值金额（元）
   * @param openid 用户 OpenID
   * @param description 商品描述
   */
  async jsapiPayRecharge(amount, openid, description) {
    try {
      const headers = await getAuthHeaders();
      const data = await $fetch("/api/wechat/jsapi-pay", {
        method: "POST",
        body: { amount, openid, description },
        headers
      });
      return data;
    } catch (error) {
      console.error("[WechatPay] jsapiPayRecharge error:", error);
      return { success: false, error: error.data?.message || error.message || "支付发起失败" };
    }
  },
  /**
   * 通过授权 code 获取 OpenID
   * @param code 微信授权回调的 code
   */
  async getOpenId(code) {
    try {
      const headers = await getAuthHeaders();
      const data = await $fetch("/api/wechat/get-openid", {
        method: "POST",
        body: { code },
        headers
      });
      return data;
    } catch (error) {
      console.error("[WechatPay] getOpenId error:", error);
      return { success: false, error: error.data?.message || error.message || "获取OpenID失败" };
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletRechargeModal",
  __ssrInlineRender: true,
  props: {
    initialAmount: {
      type: Number,
      default: 0
    }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    useUserStore();
    const options = ref([]);
    const loading = ref(false);
    const selectedIdx = ref(0);
    const inputValue = ref(null);
    const payType = ref("wechat");
    const showQrCode = ref(false);
    const qrcodeDataUrl = ref("");
    const currentOrderNo = ref("");
    const paymentStatus = ref("pending");
    let pollTimer = null;
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
    async function handleRecharge() {
      if (!isValidAmount.value || loading.value) return;
      loading.value = true;
      try {
        const res = await wechatPayApi.nativePayRecharge(
          payAmount.value,
          currentBonus.value,
          `凡图拉-充值${payAmount.value}点`
        );
        if (!res.success || !res.data) {
          ElMessage.error(res.error || "支付发起失败");
          return;
        }
        currentOrderNo.value = res.data.out_trade_no;
        showQrCode.value = true;
        try {
          const url = await QRCode.toDataURL(res.data.code_url, {
            width: 200,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff"
            }
          });
          qrcodeDataUrl.value = url;
        } catch (qrErr) {
          console.error("QR Code generation failed:", qrErr);
        }
        startPolling();
      } catch (err) {
        ElMessage.error(err.message || "网络错误");
      } finally {
        loading.value = false;
      }
    }
    function startPolling() {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = setInterval();
    }
    function stopPolling() {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    }
    function cancelPayment() {
      stopPolling();
      showQrCode.value = false;
      currentOrderNo.value = "";
      qrcodeDataUrl.value = "";
      paymentStatus.value = "pending";
    }
    function handleClose() {
      stopPolling();
      emits("close");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        visible: true,
        title: "购置额度",
        width: "860px",
        "show-footer": false,
        "theme-id": "suit-002",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="recharge-content" data-v-e36e7571${_scopeId}>`);
            if (!showQrCode.value) {
              _push2(`<!--[--><div class="modal-subtitle" data-v-e36e7571${_scopeId}>Purchase Quota</div><div class="split-layout" data-v-e36e7571${_scopeId}><div class="left-panel" data-v-e36e7571${_scopeId}><div class="section-container" data-v-e36e7571${_scopeId}><div class="section-label" data-v-e36e7571${_scopeId}>选择额度</div><div class="amount-grid" data-v-e36e7571${_scopeId}><!--[-->`);
              ssrRenderList(options.value, (item, idx) => {
                _push2(`<div class="${ssrRenderClass(["amount-option", { active: selectedIdx.value === idx }])}" data-v-e36e7571${_scopeId}><div class="option-content" data-v-e36e7571${_scopeId}><div class="amount-row" data-v-e36e7571${_scopeId}><span class="amount-main" data-v-e36e7571${_scopeId}>${ssrInterpolate(item.value)}</span><span class="unit" data-v-e36e7571${_scopeId}>点</span></div>`);
                if (item.bonus > 0) {
                  _push2(`<div class="bonus-tag" data-v-e36e7571${_scopeId}>`);
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
                  _push2(` 送 ${ssrInterpolate(item.bonus)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--><div class="${ssrRenderClass(["amount-option", "custom-option", { active: selectedIdx.value === -1 }])}" data-v-e36e7571${_scopeId}><span class="custom-label" data-v-e36e7571${_scopeId}>自定义</span></div></div><div class="${ssrRenderClass([{ visible: selectedIdx.value === -1 }, "custom-input-wrapper"])}" data-v-e36e7571${_scopeId}><input${ssrRenderAttr("value", inputValue.value)} type="number" min="1" placeholder="请输入充值金额"${ssrIncludeBooleanAttr(selectedIdx.value !== -1) ? " disabled" : ""} data-v-e36e7571${_scopeId}><span class="input-suffix" data-v-e36e7571${_scopeId}>点</span></div></div><div class="section-container" data-v-e36e7571${_scopeId}><div class="section-label" data-v-e36e7571${_scopeId}>支付方式</div><div class="pay-methods" data-v-e36e7571${_scopeId}><div class="${ssrRenderClass(["pay-method", "disabled"])}" title="支付宝暂未开通" data-v-e36e7571${_scopeId}><div class="icon-container alipay" data-v-e36e7571${_scopeId}><img class="pay-icon"${ssrRenderAttr("src", _imports_0)} alt="支付宝" data-v-e36e7571${_scopeId}></div><span data-v-e36e7571${_scopeId}>支付宝</span><span class="coming-soon" data-v-e36e7571${_scopeId}>即将开通</span></div><div class="${ssrRenderClass(["pay-method", payType.value === "wechat" ? "active" : ""])}" data-v-e36e7571${_scopeId}><div class="icon-container wechat" data-v-e36e7571${_scopeId}><img class="pay-icon"${ssrRenderAttr("src", _imports_1)} alt="微信" data-v-e36e7571${_scopeId}></div><span data-v-e36e7571${_scopeId}>微信</span>`);
              if (payType.value === "wechat") {
                _push2(`<div class="pay-check" data-v-e36e7571${_scopeId}>`);
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
              _push2(`</div></div></div><div class="modal-footer" data-v-e36e7571${_scopeId}>`);
              if (isValidAmount.value) {
                _push2(`<div class="actual-arrival-info" data-v-e36e7571${_scopeId}><span class="label" data-v-e36e7571${_scopeId}>实际到账:</span><span class="value" data-v-e36e7571${_scopeId}>${ssrInterpolate(totalPoints.value)} 点</span>`);
                if (currentBonus.value > 0) {
                  _push2(`<span class="bonus-hint" data-v-e36e7571${_scopeId}>(含赠送 ${ssrInterpolate(currentBonus.value)} 点)</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="action-row" data-v-e36e7571${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary-orange",
                block: "",
                disabled: !isValidAmount.value || loading.value,
                loading: loading.value,
                onClick: handleRecharge
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!loading.value) {
                      _push3(`<!--[--><span class="btn-text" data-v-e36e7571${_scopeId2}>立即支付 ¥${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
                      _push3(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(arrow_right_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(arrow_right_default))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!--[-->正在发起支付...<!--]-->`);
                    }
                  } else {
                    return [
                      !loading.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("span", { class: "btn-text" }, "立即支付 ¥" + toDisplayString(payAmount.value.toFixed(2)), 1),
                        createVNode(_component_el_icon, { class: "btn-icon" }, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createTextVNode("正在发起支付...")
                      ], 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="security-tip" data-v-e36e7571${_scopeId}>`);
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
              _push2(` 安全加密支付 </div></div></div><div class="right-spacer" data-v-e36e7571${_scopeId}></div></div><!--]-->`);
            } else {
              _push2(`<div class="qrcode-container" data-v-e36e7571${_scopeId}><div class="qrcode-header" data-v-e36e7571${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="微信" class="wechat-icon" data-v-e36e7571${_scopeId}><span data-v-e36e7571${_scopeId}>微信扫码支付</span></div><div class="qrcode-wrapper" data-v-e36e7571${_scopeId}>`);
              if (qrcodeDataUrl.value) {
                _push2(`<img${ssrRenderAttr("src", qrcodeDataUrl.value)} alt="Payment QR Code" class="qrcode-img" data-v-e36e7571${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (paymentStatus.value === "checking") {
                _push2(`<div class="qrcode-overlay" data-v-e36e7571${_scopeId}><div class="checking-spinner" data-v-e36e7571${_scopeId}></div><span data-v-e36e7571${_scopeId}>正在检查支付状态...</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (paymentStatus.value === "success") {
                _push2(`<div class="qrcode-overlay success" data-v-e36e7571${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_icon, { class: "success-icon" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(circle_check_default), null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(circle_check_default))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<span data-v-e36e7571${_scopeId}>支付成功!</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="qrcode-info" data-v-e36e7571${_scopeId}><div class="amount-display" data-v-e36e7571${_scopeId}><span class="label" data-v-e36e7571${_scopeId}>支付金额</span><span class="amount" data-v-e36e7571${_scopeId}>¥${ssrInterpolate(payAmount.value.toFixed(2))}</span></div><div class="order-no" data-v-e36e7571${_scopeId}> 订单号: ${ssrInterpolate(currentOrderNo.value)}</div></div><div class="qrcode-tips" data-v-e36e7571${_scopeId}><p data-v-e36e7571${_scopeId}>请使用微信扫一扫</p><p data-v-e36e7571${_scopeId}>扫描二维码完成支付</p></div><div class="qrcode-actions" data-v-e36e7571${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "secondary",
                onClick: cancelPayment,
                disabled: paymentStatus.value === "checking"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 返回重新选择 `);
                  } else {
                    return [
                      createTextVNode(" 返回重新选择 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "recharge-content" }, [
                !showQrCode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", { class: "modal-subtitle" }, "Purchase Quota"),
                  createVNode("div", { class: "split-layout" }, [
                    createVNode("div", { class: "left-panel" }, [
                      createVNode("div", { class: "section-container" }, [
                        createVNode("div", { class: "section-label" }, "选择额度"),
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
                                  createVNode("span", { class: "unit" }, "点")
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
                                  createTextVNode(" 送 " + toDisplayString(item.bonus), 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ], 10, ["onClick"]);
                          }), 128)),
                          createVNode("div", {
                            class: ["amount-option", "custom-option", { active: selectedIdx.value === -1 }],
                            onClick: ($event) => selectOption(-1)
                          }, [
                            createVNode("span", { class: "custom-label" }, "自定义")
                          ], 10, ["onClick"])
                        ]),
                        createVNode("div", {
                          class: ["custom-input-wrapper", { visible: selectedIdx.value === -1 }]
                        }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => inputValue.value = $event,
                            type: "number",
                            min: "1",
                            placeholder: "请输入充值金额",
                            disabled: selectedIdx.value !== -1
                          }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                            [
                              vModelText,
                              inputValue.value,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          createVNode("span", { class: "input-suffix" }, "点")
                        ], 2)
                      ]),
                      createVNode("div", { class: "section-container" }, [
                        createVNode("div", { class: "section-label" }, "支付方式"),
                        createVNode("div", { class: "pay-methods" }, [
                          createVNode("div", {
                            class: ["pay-method", "disabled"],
                            title: "支付宝暂未开通"
                          }, [
                            createVNode("div", { class: "icon-container alipay" }, [
                              createVNode("img", {
                                class: "pay-icon",
                                src: _imports_0,
                                alt: "支付宝"
                              })
                            ]),
                            createVNode("span", null, "支付宝"),
                            createVNode("span", { class: "coming-soon" }, "即将开通")
                          ]),
                          createVNode("div", {
                            class: ["pay-method", payType.value === "wechat" ? "active" : ""],
                            onClick: ($event) => payType.value = "wechat"
                          }, [
                            createVNode("div", { class: "icon-container wechat" }, [
                              createVNode("img", {
                                class: "pay-icon",
                                src: _imports_1,
                                alt: "微信"
                              })
                            ]),
                            createVNode("span", null, "微信"),
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
                          createVNode("span", { class: "label" }, "实际到账:"),
                          createVNode("span", { class: "value" }, toDisplayString(totalPoints.value) + " 点", 1),
                          currentBonus.value > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "bonus-hint"
                          }, "(含赠送 " + toDisplayString(currentBonus.value) + " 点)", 1)) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "action-row" }, [
                          createVNode(BaseButton, {
                            themeId: "primary-orange",
                            block: "",
                            disabled: !isValidAmount.value || loading.value,
                            loading: loading.value,
                            onClick: handleRecharge
                          }, {
                            default: withCtx(() => [
                              !loading.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode("span", { class: "btn-text" }, "立即支付 ¥" + toDisplayString(payAmount.value.toFixed(2)), 1),
                                createVNode(_component_el_icon, { class: "btn-icon" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(arrow_right_default))
                                  ]),
                                  _: 1
                                })
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode("正在发起支付...")
                              ], 64))
                            ]),
                            _: 1
                          }, 8, ["disabled", "loading"])
                        ]),
                        createVNode("div", { class: "security-tip" }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(lock_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 安全加密支付 ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "right-spacer" })
                  ])
                ], 64)) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "qrcode-container"
                }, [
                  createVNode("div", { class: "qrcode-header" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "微信",
                      class: "wechat-icon"
                    }),
                    createVNode("span", null, "微信扫码支付")
                  ]),
                  createVNode("div", { class: "qrcode-wrapper" }, [
                    qrcodeDataUrl.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: qrcodeDataUrl.value,
                      alt: "Payment QR Code",
                      class: "qrcode-img"
                    }, null, 8, ["src"])) : createCommentVNode("", true),
                    paymentStatus.value === "checking" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "qrcode-overlay"
                    }, [
                      createVNode("div", { class: "checking-spinner" }),
                      createVNode("span", null, "正在检查支付状态...")
                    ])) : createCommentVNode("", true),
                    paymentStatus.value === "success" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "qrcode-overlay success"
                    }, [
                      createVNode(_component_el_icon, { class: "success-icon" }, {
                        default: withCtx(() => [
                          createVNode(unref(circle_check_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "支付成功!")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "qrcode-info" }, [
                    createVNode("div", { class: "amount-display" }, [
                      createVNode("span", { class: "label" }, "支付金额"),
                      createVNode("span", { class: "amount" }, "¥" + toDisplayString(payAmount.value.toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "order-no" }, " 订单号: " + toDisplayString(currentOrderNo.value), 1)
                  ]),
                  createVNode("div", { class: "qrcode-tips" }, [
                    createVNode("p", null, "请使用微信扫一扫"),
                    createVNode("p", null, "扫描二维码完成支付")
                  ]),
                  createVNode("div", { class: "qrcode-actions" }, [
                    createVNode(BaseButton, {
                      themeId: "secondary",
                      onClick: cancelPayment,
                      disabled: paymentStatus.value === "checking"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 返回重新选择 ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/business/WalletRechargeModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WalletRechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e36e7571"]]);
export {
  WalletRechargeModal as default
};
//# sourceMappingURL=WalletRechargeModal-Dofqnuyg.js.map
