import { E as ElButton } from "./index-CGHU_uKU.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-CgxFlUrg.js";
import { E as ElTag } from "./index-RGUM47gz.js";
import { E as ElTableColumn } from "./index-DnlpAwTZ.js";
/* empty css              */
/* empty css                   */
/* empty css                              */
/* empty css                */
/* empty css                  */
/* empty css                     */
import { defineComponent, ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { n as arrow_left_default, a5 as edit_default } from "./index-CRs4T-Jf.js";
import { P as PageTipHeader } from "./PageTipHeader-CYVW2ELG.js";
import { A as AdminActionCard } from "./AdminActionCard-Br1XkmCK.js";
import { T as TagInputGroup } from "./TagInputGroup-CZpRnLRo.js";
import { O as OrderItemCell } from "./OrderItemCell-DbRrc6gG.js";
import { A as AdminDataTable } from "./AdminDataTable-adUoqR6P.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { useRouter, useRoute } from "vue-router";
import "./icon-DxnRhcjj.js";
import "./index-C8K_s-bH.js";
import "lodash-unified";
import "@vue/shared";
import "./index-D6MDXFfa.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C00m4e8W.js";
import "./use-form-item-n_L16njV.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./vnode-uc6o_sOa.js";
import "./index-D4s2dalC.js";
import "./index-B6zOcltc.js";
import "./index-m3FMdVd3.js";
import "@popperjs/core";
import "./focus-trap.vue-DLhiv9tF.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-RDuG-1hQ.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-CDEPy-be.js";
/* empty css                  */
import "./index-DEoO_C5P.js";
/* empty css                    */
import "./index-ttyu327u.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
/* empty css                  */
import "./index-DMcY9pQb.js";
import "./index-D_dCF80h.js";
import "./scroll-BYDsUCKj.js";
/* empty css                         */
import "./index-DT739kqT.js";
import "./index-CdIsMbUc.js";
import "./index-CIsKhoUN.js";
import "./strings-D1uxkXhq.js";
import "./index-C8YaaWrc.js";
import "./directive-Cp0y9Az7.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                    */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "detail",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    useRoute();
    const order = ref({});
    function goBack() {
      router.back();
    }
    function openEdit() {
      router.push(`/admin/orders/share/post?id=${order.value.id}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_tag = ElTag;
      const _component_el_table_column = ElTableColumn;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "账号合租订单详情",
        type: "info"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: goBack,
              icon: unref(arrow_left_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`返回`);
                } else {
                  return [
                    createTextVNode("返回")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: openEdit,
              icon: unref(edit_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`编辑`);
                } else {
                  return [
                    createTextVNode("编辑")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: goBack,
                icon: unref(arrow_left_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("返回")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: openEdit,
                icon: unref(edit_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("编辑")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="detail-wrapper" data-v-9226597f>`);
      _push(ssrRenderComponent(_component_el_descriptions, {
        column: 2,
        border: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_descriptions_item, { label: "订单号" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(order.value.order_no)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(order.value.order_no), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_descriptions_item, { label: "状态" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: order.value.status === "paid" ? "success" : "warning"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(order.value.status)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(order.value.status), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: order.value.status === "paid" ? "success" : "warning"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(order.value.status), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_descriptions_item, { label: "创建时间" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(new Date(order.value.created_at).toLocaleString())}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(new Date(order.value.created_at).toLocaleString()), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_descriptions_item, { label: "金额" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`¥${ssrInterpolate(order.value.amount)}`);
                } else {
                  return [
                    createTextVNode("¥" + toDisplayString(order.value.amount), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_descriptions_item, { label: "订单号" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(order.value.order_no), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_descriptions_item, { label: "状态" }, {
                default: withCtx(() => [
                  createVNode(_component_el_tag, {
                    type: order.value.status === "paid" ? "success" : "warning"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(order.value.status), 1)
                    ]),
                    _: 1
                  }, 8, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_descriptions_item, { label: "创建时间" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(new Date(order.value.created_at).toLocaleString()), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_el_descriptions_item, { label: "金额" }, {
                default: withCtx(() => [
                  createTextVNode("¥" + toDisplayString(order.value.amount), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h3 class="mt-4" data-v-9226597f>标签</h3>`);
      _push(ssrRenderComponent(TagInputGroup, {
        modelValue: order.value.tags,
        "onUpdate:modelValue": ($event) => order.value.tags = $event,
        "add-button-text": "+ 新标签"
      }, null, _parent));
      _push(`<h3 class="mt-4" data-v-9226597f>订单商品</h3>`);
      _push(ssrRenderComponent(AdminDataTable, {
        data: order.value.items,
        "show-header": false,
        border: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "商品信息",
              "min-width": "260"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(OrderItemCell, {
                    image: row.image,
                    name: row.name,
                    id: row.id
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(OrderItemCell, {
                      image: row.image,
                      name: row.name,
                      id: row.id
                    }, null, 8, ["image", "name", "id"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "数量",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(row.quantity)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(row.quantity), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "单价",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`¥${ssrInterpolate(row.price)}`);
                } else {
                  return [
                    createTextVNode("¥" + toDisplayString(row.price), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "商品信息",
                "min-width": "260"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(OrderItemCell, {
                    image: row.image,
                    name: row.name,
                    id: row.id
                  }, null, 8, ["image", "name", "id"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "数量",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(row.quantity), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "单价",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode("¥" + toDisplayString(row.price), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/share/detail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9226597f"]]);
export {
  detail as default
};
//# sourceMappingURL=detail-BEYqd2co.js.map
