import { E as ElIcon } from './index-_zadwVDN.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0 } from './virtual_public-B81IdLpj.mjs';
import { aa as aim_default, S as chat_dot_round_default, L as copy_document_default, ab as position_default, a4 as timer_default } from './index-DNnPa_Q9.mjs';
import { u as useSystemConfig } from './useSystemConfig-uu86svaG.mjs';
import { _ as __nuxt_component_0 } from './BaseModal-nbvk9VuE.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceModal",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props) {
    const { contactConfig } = useSystemConfig();
    const config = computed(() => {
      return contactConfig.value || {
        wechat_id: "Spotify-cn",
        wechat_qr: "/images/contact/wechat_qr.jpg",
        telegram_id: "@FANTULA_SUPPORT",
        telegram_qr: "/images/contact/telegram_qr.jpg",
        service_time: "10:00 - 23:00"
      };
    });
    const copyText = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text).then(() => {
        ElMessage.success("\u590D\u5236\u6210\u529F");
      }).catch(() => {
        ElMessage.error("\u590D\u5236\u5931\u8D25");
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(ssrRenderComponent(__nuxt_component_0, mergeProps({
        visible: true,
        title: "\u8054\u7CFB\u56FE\u62C9",
        width: "680px",
        "show-close": true,
        "show-footer": false,
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="service-modal-content" data-v-010e9fb6${_scopeId}><div class="brand-header" data-v-010e9fb6${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="brand-logo" data-v-010e9fb6${_scopeId}><p class="brand-subtitle" data-v-010e9fb6${_scopeId}>7x24\u5C0F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u4E13\u4E1A\u670D\u52A1</p></div><div class="qr-grid" data-v-010e9fb6${_scopeId}><div class="qr-card wechat" data-v-010e9fb6${_scopeId}><div class="qr-box" data-v-010e9fb6${_scopeId}><img${ssrRenderAttr("src", config.value.wechat_qr)} class="qr-img" data-v-010e9fb6${_scopeId}><div class="scan-tip" data-v-010e9fb6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(aim_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(aim_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u626B\u7801\u6DFB\u52A0 </div></div><div class="info-box" data-v-010e9fb6${_scopeId}><div class="icon-label" data-v-010e9fb6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, { color: "#07C160" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(chat_dot_round_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="label" data-v-010e9fb6${_scopeId}>\u5FAE\u4FE1\u5BA2\u670D</span></div><div class="value copyable" data-v-010e9fb6${_scopeId}>${ssrInterpolate(config.value.wechat_id)} `);
            _push2(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(copy_document_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(copy_document_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="qr-card telegram" data-v-010e9fb6${_scopeId}><div class="qr-box" data-v-010e9fb6${_scopeId}><img${ssrRenderAttr("src", config.value.telegram_qr)} class="qr-img" data-v-010e9fb6${_scopeId}><div class="scan-tip" data-v-010e9fb6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(aim_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(aim_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u626B\u7801\u6DFB\u52A0 </div></div><div class="info-box" data-v-010e9fb6${_scopeId}><div class="icon-label" data-v-010e9fb6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, { color: "#2AABEE" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(position_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(position_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="label" data-v-010e9fb6${_scopeId}>Telegram</span></div><div class="value copyable" data-v-010e9fb6${_scopeId}>${ssrInterpolate(config.value.telegram_id)} `);
            _push2(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(copy_document_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(copy_document_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="service-footer" data-v-010e9fb6${_scopeId}><div class="service-tag" data-v-010e9fb6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(timer_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(timer_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span data-v-010e9fb6${_scopeId}>\u5728\u7EBF\u65F6\u95F4: ${ssrInterpolate(config.value.service_time)}</span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "service-modal-content" }, [
                createVNode("div", { class: "brand-header" }, [
                  createVNode("img", {
                    src: _imports_0,
                    alt: "Logo",
                    class: "brand-logo"
                  }),
                  createVNode("p", { class: "brand-subtitle" }, "7x24\u5C0F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u4E13\u4E1A\u670D\u52A1")
                ]),
                createVNode("div", { class: "qr-grid" }, [
                  createVNode("div", { class: "qr-card wechat" }, [
                    createVNode("div", { class: "qr-box" }, [
                      createVNode("img", {
                        src: config.value.wechat_qr,
                        class: "qr-img"
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "scan-tip" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(aim_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u626B\u7801\u6DFB\u52A0 ")
                      ])
                    ]),
                    createVNode("div", { class: "info-box" }, [
                      createVNode("div", { class: "icon-label" }, [
                        createVNode(_component_el_icon, { color: "#07C160" }, {
                          default: withCtx(() => [
                            createVNode(unref(chat_dot_round_default))
                          ]),
                          _: 1
                        }),
                        createVNode("span", { class: "label" }, "\u5FAE\u4FE1\u5BA2\u670D")
                      ]),
                      createVNode("div", {
                        class: "value copyable",
                        onClick: ($event) => copyText(config.value.wechat_id)
                      }, [
                        createTextVNode(toDisplayString(config.value.wechat_id) + " ", 1),
                        createVNode(_component_el_icon, { class: "copy-icon" }, {
                          default: withCtx(() => [
                            createVNode(unref(copy_document_default))
                          ]),
                          _: 1
                        })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "qr-card telegram" }, [
                    createVNode("div", { class: "qr-box" }, [
                      createVNode("img", {
                        src: config.value.telegram_qr,
                        class: "qr-img"
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "scan-tip" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(aim_default))
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u626B\u7801\u6DFB\u52A0 ")
                      ])
                    ]),
                    createVNode("div", { class: "info-box" }, [
                      createVNode("div", { class: "icon-label" }, [
                        createVNode(_component_el_icon, { color: "#2AABEE" }, {
                          default: withCtx(() => [
                            createVNode(unref(position_default))
                          ]),
                          _: 1
                        }),
                        createVNode("span", { class: "label" }, "Telegram")
                      ]),
                      createVNode("div", {
                        class: "value copyable",
                        onClick: ($event) => copyText(config.value.telegram_id)
                      }, [
                        createTextVNode(toDisplayString(config.value.telegram_id) + " ", 1),
                        createVNode(_component_el_icon, { class: "copy-icon" }, {
                          default: withCtx(() => [
                            createVNode(unref(copy_document_default))
                          ]),
                          _: 1
                        })
                      ], 8, ["onClick"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "service-footer" }, [
                  createVNode("div", { class: "service-tag" }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(timer_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u5728\u7EBF\u65F6\u95F4: " + toDisplayString(config.value.service_time), 1)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/ServiceModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ServiceModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-010e9fb6"]]);

export { ServiceModal as S };
//# sourceMappingURL=ServiceModal-B93nNyX-.mjs.map
