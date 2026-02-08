import { E as ElButton } from "./index-Cfk6gFRD.js";
import { E as ElTableColumn } from "./index-CppwRAFr.js";
import { E as ElAvatar } from "./index-DcKx3ntK.js";
import { E as ElTag } from "./index-CAqDGa72.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
import { defineComponent, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { q as refresh_default } from "./index-DlETah8a.js";
import { P as PageTipHeader } from "./PageTipHeader-DqGE4r9z.js";
import { A as AdminActionCard } from "./AdminActionCard-BmEdBcE0.js";
import { A as AdminDataTable } from "./AdminDataTable-C0ckSjEK.js";
import { u as useAdminOrderList } from "./useAdminOrderList-CUCkl3Wp.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./icon-CK7WLSPl.js";
import "./index-K5TIzHX_.js";
import "./index-jl2vZbkg.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-79yNXOXL.js";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CmHlMPx0.js";
import "./index-DqrhOzxH.js";
import "./index-BgvvVJ20.js";
import "@popperjs/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-D4pu9U8U.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./vnode-BKSxKQVt.js";
import "./index-CHfwRf2j.js";
/* empty css                  */
import "./index-sO8Yjc2X.js";
/* empty css                    */
import "./index-DHhizeNf.js";
import "./index-2hf2A4Op.js";
import "./index-CHDWEhch.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BuMAfCNC.js";
import "./index-DfZ5KWBt.js";
import "./typescript-D6L75muK.js";
import "./index-Cy25Tved.js";
import "./directive-BBpaOxz2.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                  */
/* empty css                    */
/* empty css                    */
import "./order-BDjtswS6.js";
import "./supabase-admin-Yv96kmWU.js";
import "@supabase/supabase-js";
import "./constants-Co_OOoHD.js";
import "./useBizConfig-tsYRZrF8.js";
import "./useBizFormat-CLwhy_Ih.js";
import "./index-DSo6N35Z.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      list,
      total,
      page,
      pageSize,
      DEFAULT_AVATAR,
      loadList,
      handleCopy,
      formatSpec,
      getStatusText,
      getStatusType,
      formatTime,
      formatPrice
    } = useAdminOrderList("one_time_cdk");
    watch([page, pageSize], () => loadList(), { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_avatar = ElAvatar;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-6cb251f6>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "激活码订单",
        description: "显示所有一次性激活码类型的订单"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: unref(loadList),
              icon: unref(refresh_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`刷新`);
                } else {
                  return [
                    createTextVNode("刷新")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: unref(loadList),
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["onClick", "icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: unref(list),
        loading: unref(loading),
        total: unref(total),
        "current-page": unref(page),
        "onUpdate:currentPage": ($event) => isRef(page) ? page.value = $event : null,
        "page-size": unref(pageSize),
        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
        onPageChange: unref(loadList)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "订单号",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-6cb251f6${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "mono-text",
                      onClick: ($event) => unref(handleCopy)(row.order_no)
                    }, toDisplayString(row.order_no), 9, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "用户",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="user-cell" data-v-6cb251f6${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 28,
                    src: row._profile?.avatar || unref(DEFAULT_AVATAR)
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="uid-text" data-v-6cb251f6${_scopeId2}>${ssrInterpolate(row._profile?.uid || "无UID")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 28,
                        src: row._profile?.avatar || unref(DEFAULT_AVATAR)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "uid-text" }, toDisplayString(row._profile?.uid || "无UID"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="product-cell" data-v-6cb251f6${_scopeId2}>`);
                  if (row.product_snapshot?.image) {
                    _push3(`<img${ssrRenderAttr("src", row.product_snapshot.image)} class="product-thumb" data-v-6cb251f6${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span data-v-6cb251f6${_scopeId2}>${ssrInterpolate(row.product_snapshot?.product_name || "未知商品")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      row.product_snapshot?.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.product_snapshot.image,
                        class: "product-thumb"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "规格",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="spec-text" data-v-6cb251f6${_scopeId2}>${ssrInterpolate(unref(formatSpec)(row.sku_snapshot?.spec_combination))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(unref(formatSpec)(row.sku_snapshot?.spec_combination)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "数量",
              width: "60",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-6cb251f6${_scopeId2}>${ssrInterpolate(row.quantity || 1)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "总支付",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-6cb251f6${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.total_amount))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "优惠券",
              width: "80"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.coupon_snapshot?.discount_amount) {
                    _push3(`<span class="discount" data-v-6cb251f6${_scopeId2}> -${ssrInterpolate(unref(formatPrice)(row.coupon_snapshot.discount_amount))}</span>`);
                  } else {
                    _push3(`<span class="no-discount" data-v-6cb251f6${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.coupon_snapshot?.discount_amount ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "discount"
                    }, " -" + toDisplayString(unref(formatPrice)(row.coupon_snapshot.discount_amount)), 1)) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "no-discount"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: unref(getStatusType)(row.status),
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(getStatusText)(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(getStatusText)(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: unref(getStatusType)(row.status),
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(getStatusText)(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatTime)(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "到期时间",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formatTime)(row.end_time || row.expires_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formatTime)(row.end_time || row.expires_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "订单号",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    class: "mono-text",
                    onClick: ($event) => unref(handleCopy)(row.order_no)
                  }, toDisplayString(row.order_no), 9, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "用户",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "user-cell" }, [
                    createVNode(_component_el_avatar, {
                      size: 28,
                      src: row._profile?.avatar || unref(DEFAULT_AVATAR)
                    }, null, 8, ["src"]),
                    createVNode("span", { class: "uid-text" }, toDisplayString(row._profile?.uid || "无UID"), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "商品",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", { class: "product-cell" }, [
                    row.product_snapshot?.image ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: row.product_snapshot.image,
                      class: "product-thumb"
                    }, null, 8, ["src"])) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(row.product_snapshot?.product_name || "未知商品"), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "规格",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "spec-text" }, toDisplayString(unref(formatSpec)(row.sku_snapshot?.spec_combination)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "数量",
                width: "60",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "总支付",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "优惠券",
                width: "80"
              }, {
                default: withCtx(({ row }) => [
                  row.coupon_snapshot?.discount_amount ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "discount"
                  }, " -" + toDisplayString(unref(formatPrice)(row.coupon_snapshot.discount_amount)), 1)) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "no-discount"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: unref(getStatusType)(row.status),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(getStatusText)(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "到期时间",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(unref(formatTime)(row.end_time || row.expires_at)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/cdkey/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6cb251f6"]]);
export {
  index as default
};
//# sourceMappingURL=index-FXDa7rFT.js.map
