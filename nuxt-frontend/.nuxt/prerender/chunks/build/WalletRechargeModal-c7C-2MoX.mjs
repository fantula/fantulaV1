import { _ as __nuxt_component_0 } from './BaseModal-nbvk9VuE.mjs';
import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, toDisplayString, createTextVNode, renderList, createCommentVNode, withDirectives, vModelText, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0, a as _imports_1 } from './virtual_public-Dz2P0tZ2.mjs';
import { getAuthToken } from './supabase-Ds8OQlZJ.mjs';
import { B as BaseButton } from './BaseButton-BnWAaIRO.mjs';
import { aW as present_default, T as select_default, f as arrow_right_default, O as lock_default, e as circle_check_default } from './index-DNnPa_Q9.mjs';
import QRCode from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/qrcode/lib/index.js';
import { u as useUserStore } from './user-DLDq0pTF.mjs';
import { s as setInterval } from './interval-BnEBQU8I.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { _ as _export_sfc } from './server.mjs';
import './base-CEWXqFm3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './typescript-D6L75muK.mjs';
import './icon-Ck0_dGQP.mjs';
import './use-global-config-C5kRDPtv.mjs';
import './index-DbvZsXcZ.mjs';
import './event-D3FEo2C5.mjs';

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
    var _a;
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
      return { success: false, error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "\u652F\u4ED8\u53D1\u8D77\u5931\u8D25" };
    }
  },
  /**
   * 查询微信支付订单状态
   * @param outTradeNo 商户订单号
   */
  async queryOrder(outTradeNo) {
    var _a;
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
      return { success: false, error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "\u67E5\u8BE2\u5931\u8D25" };
    }
  },
  /**
   * 发起微信 JSAPI 支付（公众号内）
   * @param amount 充值金额（元）
   * @param openid 用户 OpenID
   * @param description 商品描述
   * @param bonus 赠送额度
   */
  async jsapiPayRecharge(amount, openid, description, bonus = 0) {
    var _a;
    try {
      const headers = await getAuthHeaders();
      const data = await $fetch("/api/wechat/jsapi-pay", {
        method: "POST",
        body: { amount, openid, description, bonus },
        headers
      });
      return data;
    } catch (error) {
      console.error("[WechatPay] jsapiPayRecharge error:", error);
      return { success: false, error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "\u652F\u4ED8\u53D1\u8D77\u5931\u8D25" };
    }
  },
  /**
   * 通过授权 code 获取 OpenID
   * @param code 微信授权回调的 code
   */
  async getOpenId(code) {
    var _a;
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
      return { success: false, error: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "\u83B7\u53D6OpenID\u5931\u8D25" };
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
          `\u51E1\u56FE\u62C9-\u5145\u503C${payAmount.value}\u70B9`
        );
        if (!res.success || !res.data) {
          ElMessage.error(res.error || "\u652F\u4ED8\u53D1\u8D77\u5931\u8D25");
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
        ElMessage.error(err.message || "\u7F51\u7EDC\u9519\u8BEF");
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
        title: "\u8D2D\u7F6E\u989D\u5EA6",
        width: "860px",
        "show-footer": false,
        "theme-id": "suit-002",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="recharge-content" data-v-3b6d4525${_scopeId}>`);
            if (!showQrCode.value) {
              _push2(`<!--[--><div class="modal-subtitle" data-v-3b6d4525${_scopeId}>Purchase Quota</div><div class="split-layout" data-v-3b6d4525${_scopeId}><div class="left-panel" data-v-3b6d4525${_scopeId}><div class="section-container" data-v-3b6d4525${_scopeId}><div class="section-label" data-v-3b6d4525${_scopeId}>\u9009\u62E9\u989D\u5EA6</div><div class="amount-grid" data-v-3b6d4525${_scopeId}><!--[-->`);
              ssrRenderList(options.value, (item, idx) => {
                _push2(`<div class="${ssrRenderClass(["amount-option", { active: selectedIdx.value === idx }])}" data-v-3b6d4525${_scopeId}><div class="option-content" data-v-3b6d4525${_scopeId}><div class="amount-row" data-v-3b6d4525${_scopeId}><span class="amount-main" data-v-3b6d4525${_scopeId}>${ssrInterpolate(item.value)}</span><span class="unit" data-v-3b6d4525${_scopeId}>\u70B9</span></div>`);
                if (item.bonus > 0) {
                  _push2(`<div class="bonus-tag" data-v-3b6d4525${_scopeId}>`);
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
              _push2(`<!--]--><div class="${ssrRenderClass(["amount-option", "custom-option", { active: selectedIdx.value === -1 }])}" data-v-3b6d4525${_scopeId}><span class="custom-label" data-v-3b6d4525${_scopeId}>\u81EA\u5B9A\u4E49</span></div></div><div class="${ssrRenderClass([{ visible: selectedIdx.value === -1 }, "custom-input-wrapper"])}" data-v-3b6d4525${_scopeId}><input${ssrRenderAttr("value", inputValue.value)} type="number" min="1" placeholder="\u8BF7\u8F93\u5165\u5145\u503C\u91D1\u989D"${ssrIncludeBooleanAttr(selectedIdx.value !== -1) ? " disabled" : ""} data-v-3b6d4525${_scopeId}><span class="input-suffix" data-v-3b6d4525${_scopeId}>\u70B9</span></div></div><div class="section-container" data-v-3b6d4525${_scopeId}><div class="section-label" data-v-3b6d4525${_scopeId}>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-3b6d4525${_scopeId}><div class="${ssrRenderClass(["pay-method", "disabled"])}" title="\u652F\u4ED8\u5B9D\u6682\u672A\u5F00\u901A" data-v-3b6d4525${_scopeId}><div class="icon-container alipay" data-v-3b6d4525${_scopeId}><img class="pay-icon"${ssrRenderAttr("src", _imports_0)} alt="\u652F\u4ED8\u5B9D" data-v-3b6d4525${_scopeId}></div><span data-v-3b6d4525${_scopeId}>\u652F\u4ED8\u5B9D</span><span class="coming-soon" data-v-3b6d4525${_scopeId}>\u5373\u5C06\u5F00\u901A</span></div><div class="${ssrRenderClass(["pay-method", payType.value === "wechat" ? "active" : ""])}" data-v-3b6d4525${_scopeId}><div class="icon-container wechat" data-v-3b6d4525${_scopeId}><img class="pay-icon"${ssrRenderAttr("src", _imports_1)} alt="\u5FAE\u4FE1" data-v-3b6d4525${_scopeId}></div><span data-v-3b6d4525${_scopeId}>\u5FAE\u4FE1</span>`);
              if (payType.value === "wechat") {
                _push2(`<div class="pay-check" data-v-3b6d4525${_scopeId}>`);
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
              _push2(`</div></div></div><div class="modal-footer" data-v-3b6d4525${_scopeId}>`);
              if (isValidAmount.value) {
                _push2(`<div class="actual-arrival-info" data-v-3b6d4525${_scopeId}><span class="label" data-v-3b6d4525${_scopeId}>\u5B9E\u9645\u5230\u8D26:</span><span class="value" data-v-3b6d4525${_scopeId}>${ssrInterpolate(totalPoints.value)} \u70B9</span>`);
                if (currentBonus.value > 0) {
                  _push2(`<span class="bonus-hint" data-v-3b6d4525${_scopeId}>(\u542B\u8D60\u9001 ${ssrInterpolate(currentBonus.value)} \u70B9)</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="action-row" data-v-3b6d4525${_scopeId}>`);
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
                      _push3(`<!--[--><span class="btn-text" data-v-3b6d4525${_scopeId2}>\u7ACB\u5373\u652F\u4ED8 \xA5${ssrInterpolate(payAmount.value.toFixed(2))}</span>`);
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
                      _push3(`<!--[-->\u6B63\u5728\u53D1\u8D77\u652F\u4ED8...<!--]-->`);
                    }
                  } else {
                    return [
                      !loading.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("span", { class: "btn-text" }, "\u7ACB\u5373\u652F\u4ED8 \xA5" + toDisplayString(payAmount.value.toFixed(2)), 1),
                        createVNode(_component_el_icon, { class: "btn-icon" }, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createTextVNode("\u6B63\u5728\u53D1\u8D77\u652F\u4ED8...")
                      ], 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="security-tip" data-v-3b6d4525${_scopeId}>`);
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
              _push2(` \u5B89\u5168\u52A0\u5BC6\u652F\u4ED8 </div></div></div><div class="right-spacer" data-v-3b6d4525${_scopeId}></div></div><!--]-->`);
            } else {
              _push2(`<div class="qrcode-container" data-v-3b6d4525${_scopeId}><div class="qrcode-header" data-v-3b6d4525${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="\u5FAE\u4FE1" class="wechat-icon" data-v-3b6d4525${_scopeId}><span data-v-3b6d4525${_scopeId}>\u5FAE\u4FE1\u626B\u7801\u652F\u4ED8</span></div><div class="qrcode-wrapper" data-v-3b6d4525${_scopeId}>`);
              if (qrcodeDataUrl.value) {
                _push2(`<img${ssrRenderAttr("src", qrcodeDataUrl.value)} alt="Payment QR Code" class="qrcode-img" data-v-3b6d4525${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (paymentStatus.value === "checking") {
                _push2(`<div class="qrcode-overlay" data-v-3b6d4525${_scopeId}><div class="checking-spinner" data-v-3b6d4525${_scopeId}></div><span data-v-3b6d4525${_scopeId}>\u6B63\u5728\u68C0\u67E5\u652F\u4ED8\u72B6\u6001...</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (paymentStatus.value === "success") {
                _push2(`<div class="qrcode-overlay success" data-v-3b6d4525${_scopeId}>`);
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
                _push2(`<span data-v-3b6d4525${_scopeId}>\u652F\u4ED8\u6210\u529F!</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="qrcode-info" data-v-3b6d4525${_scopeId}><div class="amount-display" data-v-3b6d4525${_scopeId}><span class="label" data-v-3b6d4525${_scopeId}>\u652F\u4ED8\u91D1\u989D</span><span class="amount" data-v-3b6d4525${_scopeId}>\xA5${ssrInterpolate(payAmount.value.toFixed(2))}</span></div><div class="order-no" data-v-3b6d4525${_scopeId}> \u8BA2\u5355\u53F7: ${ssrInterpolate(currentOrderNo.value)}</div></div><div class="qrcode-tips" data-v-3b6d4525${_scopeId}><p data-v-3b6d4525${_scopeId}>\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u4E00\u626B</p><p data-v-3b6d4525${_scopeId}>\u626B\u63CF\u4E8C\u7EF4\u7801\u5B8C\u6210\u652F\u4ED8</p></div><div class="qrcode-actions" data-v-3b6d4525${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "secondary",
                onClick: cancelPayment,
                disabled: paymentStatus.value === "checking"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u8FD4\u56DE\u91CD\u65B0\u9009\u62E9 `);
                  } else {
                    return [
                      createTextVNode(" \u8FD4\u56DE\u91CD\u65B0\u9009\u62E9 ")
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
                            class: ["pay-method", "disabled"],
                            title: "\u652F\u4ED8\u5B9D\u6682\u672A\u5F00\u901A"
                          }, [
                            createVNode("div", { class: "icon-container alipay" }, [
                              createVNode("img", {
                                class: "pay-icon",
                                src: _imports_0,
                                alt: "\u652F\u4ED8\u5B9D"
                              })
                            ]),
                            createVNode("span", null, "\u652F\u4ED8\u5B9D"),
                            createVNode("span", { class: "coming-soon" }, "\u5373\u5C06\u5F00\u901A")
                          ]),
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
                          createVNode(BaseButton, {
                            themeId: "primary-orange",
                            block: "",
                            disabled: !isValidAmount.value || loading.value,
                            loading: loading.value,
                            onClick: handleRecharge
                          }, {
                            default: withCtx(() => [
                              !loading.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode("span", { class: "btn-text" }, "\u7ACB\u5373\u652F\u4ED8 \xA5" + toDisplayString(payAmount.value.toFixed(2)), 1),
                                createVNode(_component_el_icon, { class: "btn-icon" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(arrow_right_default))
                                  ]),
                                  _: 1
                                })
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode("\u6B63\u5728\u53D1\u8D77\u652F\u4ED8...")
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
                          createTextVNode(" \u5B89\u5168\u52A0\u5BC6\u652F\u4ED8 ")
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
                      alt: "\u5FAE\u4FE1",
                      class: "wechat-icon"
                    }),
                    createVNode("span", null, "\u5FAE\u4FE1\u626B\u7801\u652F\u4ED8")
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
                      createVNode("span", null, "\u6B63\u5728\u68C0\u67E5\u652F\u4ED8\u72B6\u6001...")
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
                      createVNode("span", null, "\u652F\u4ED8\u6210\u529F!")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "qrcode-info" }, [
                    createVNode("div", { class: "amount-display" }, [
                      createVNode("span", { class: "label" }, "\u652F\u4ED8\u91D1\u989D"),
                      createVNode("span", { class: "amount" }, "\xA5" + toDisplayString(payAmount.value.toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "order-no" }, " \u8BA2\u5355\u53F7: " + toDisplayString(currentOrderNo.value), 1)
                  ]),
                  createVNode("div", { class: "qrcode-tips" }, [
                    createVNode("p", null, "\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u4E00\u626B"),
                    createVNode("p", null, "\u626B\u63CF\u4E8C\u7EF4\u7801\u5B8C\u6210\u652F\u4ED8")
                  ]),
                  createVNode("div", { class: "qrcode-actions" }, [
                    createVNode(BaseButton, {
                      themeId: "secondary",
                      onClick: cancelPayment,
                      disabled: paymentStatus.value === "checking"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u8FD4\u56DE\u91CD\u65B0\u9009\u62E9 ")
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
const WalletRechargeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b6d4525"]]);

export { WalletRechargeModal as default };
//# sourceMappingURL=WalletRechargeModal-c7C-2MoX.mjs.map
