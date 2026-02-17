import { E as ElIcon } from "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
import { defineComponent, mergeProps, unref, useSSRContext, ref, computed, withCtx, openBlock, createBlock, Fragment, createVNode, withModifiers, renderList } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderTeleport, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-4aDAI7XP.js";
import { M as MobileInfiniteList } from "./MobileInfiniteList-D165vu5R.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import { _ as _export_sfc } from "../server.mjs";
import { u as useOrderList } from "./useOrderList-CORNA1wt.js";
import { u as useInfiniteScroll } from "./useInfiniteScroll-Cg7MWwox.js";
import "./useToast-DsT-1f4c.js";
import { a6 as box_default, w as warning_filled_default } from "./index-DNnPa_Q9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
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
import "./order---CTIOc2.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileOrderCard",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  emits: ["click"],
  setup(__props) {
    const { getOrderStatusLabel } = useBizConfig();
    const { formatDate } = useBizFormat();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["mobile-order-card", "status-" + (__props.order.isPending ? "pending" : __props.order.status)]
      }, _attrs))} data-v-71794e05><div class="card-header" data-v-71794e05><div class="order-no-group" data-v-71794e05><span class="label" data-v-71794e05>NO.</span><span class="value" data-v-71794e05>${ssrInterpolate(__props.order.order_no?.slice(-8) || "---")}</span></div><div class="${ssrRenderClass([__props.order.isPending ? "pending" : __props.order.status, "status-pill"])}" data-v-71794e05><div class="dot" data-v-71794e05></div><span data-v-71794e05>${ssrInterpolate(__props.order.isPending ? "待支付" : unref(getOrderStatusLabel)(__props.order.status))}</span></div></div><div class="card-body" data-v-71794e05><div class="thumb" data-v-71794e05><img${ssrRenderAttr("src", __props.order.product_image || "/images/placeholder.png")} class="product-img" loading="lazy" decoding="async" data-v-71794e05></div><div class="info" data-v-71794e05><div class="name-row" data-v-71794e05><span class="name-text" data-v-71794e05>${ssrInterpolate(__props.order.product_name)}</span><span class="spec-inline" data-v-71794e05>${ssrInterpolate(__props.order.spec_text || "标准规格")}</span></div><div class="price-row" data-v-71794e05><div class="price" data-v-71794e05><span class="unit" data-v-71794e05>¥</span><span class="amount" data-v-71794e05>${ssrInterpolate(Number(__props.order.total_amount).toFixed(2))}</span></div><div class="qty" data-v-71794e05>x${ssrInterpolate(__props.order.quantity)}</div></div></div></div><div class="card-footer" data-v-71794e05><div class="time" data-v-71794e05>${ssrInterpolate(unref(formatDate)(__props.order.created_at))}</div><div class="actions" data-v-71794e05>`);
      ssrRenderSlot(_ctx.$slots, "actions", { order: __props.order }, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/MobileOrderCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileOrderCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-71794e05"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    useRoute();
    const {
      filteredList,
      currentTab,
      tabs
    } = useOrderList();
    const { displayList, loading, finished, loadMore } = useInfiniteScroll({
      data: filteredList,
      pageSize: 10
    });
    const handleItemClick = (item) => {
      if (item.status === "pending" || item.isPending) {
        router.push(`/mobile/checkout/${item.id}`);
      } else {
        router.push(`/mobile/profile/order/${item.id}`);
      }
    };
    const confirmModalVisible = ref(false);
    const confirmLoading = ref(false);
    const confirmModalType = ref("cleanup");
    const confirmTargetItem = ref(null);
    const confirmModalMessage = computed(
      () => confirmModalType.value === "pending" ? "确定要取消这个订单吗？取消后将释放锁定库存。" : "该订单已无效(过期或退款)，确认要从列表中移除吗？"
    );
    const openConfirmModal = (item, isPreOrder) => {
      confirmTargetItem.value = item;
      confirmModalType.value = isPreOrder ? "pending" : "cleanup";
      confirmModalVisible.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-order-page" }, _attrs))} data-v-61fb262b>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "我的订单" }, null, _parent));
      _push(`<div class="tabs-wrapper" data-v-61fb262b><div class="tabs-scroll" data-v-61fb262b><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(currentTab) === tab.value }, "tab-pill"])}" data-v-61fb262b>${ssrInterpolate(tab.label)}</div>`);
      });
      _push(`<!--]--></div></div><div class="list-container" data-v-61fb262b>`);
      _push(ssrRenderComponent(MobileInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        list: unref(displayList),
        onLoad: unref(loadMore)
      }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="empty-state" data-v-61fb262b${_scopeId}><div class="empty-icon-wrapper" data-v-61fb262b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(box_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(box_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><p class="empty-text" data-v-61fb262b${_scopeId}>暂无相关订单</p><button class="go-shopping-btn" data-v-61fb262b${_scopeId}>前往选购</button></div>`);
          } else {
            return [
              createVNode("div", { class: "empty-state" }, [
                createVNode("div", { class: "empty-icon-wrapper" }, [
                  createVNode(_component_el_icon, { class: "empty-icon" }, {
                    default: withCtx(() => [
                      createVNode(unref(box_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("p", { class: "empty-text" }, "暂无相关订单"),
                createVNode("button", {
                  class: "go-shopping-btn",
                  onClick: ($event) => unref(router).push("/")
                }, "前往选购", 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="order-list" data-v-61fb262b${_scopeId}><!--[-->`);
            ssrRenderList(unref(displayList), (item) => {
              _push2(ssrRenderComponent(MobileOrderCard, {
                key: item.id,
                order: item,
                onClick: ($event) => handleItemClick(item)
              }, {
                actions: withCtx(({ order }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (order.isPending || order.status === "pending") {
                      _push3(`<!--[--><button class="action-btn delete" data-v-61fb262b${_scopeId2}> 取消 </button><button class="action-btn pay" data-v-61fb262b${_scopeId2}>去支付</button><!--]-->`);
                    } else if (["expired", "refunded", "cancelled"].includes(order.status)) {
                      _push3(`<button class="action-btn delete" data-v-61fb262b${_scopeId2}>删除</button>`);
                    } else {
                      _push3(`<button class="action-btn view" data-v-61fb262b${_scopeId2}>详情</button>`);
                    }
                  } else {
                    return [
                      order.isPending || order.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("button", {
                          class: "action-btn delete",
                          onClick: withModifiers(($event) => openConfirmModal(order, true), ["stop"])
                        }, " 取消 ", 8, ["onClick"]),
                        createVNode("button", {
                          class: "action-btn pay",
                          onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                        }, "去支付", 8, ["onClick"])
                      ], 64)) : ["expired", "refunded", "cancelled"].includes(order.status) ? (openBlock(), createBlock("button", {
                        key: 1,
                        class: "action-btn delete",
                        onClick: withModifiers(($event) => openConfirmModal(order, false), ["stop"])
                      }, "删除", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                        key: 2,
                        class: "action-btn view",
                        onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                      }, "详情", 8, ["onClick"]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "order-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                  return openBlock(), createBlock(MobileOrderCard, {
                    key: item.id,
                    order: item,
                    onClick: ($event) => handleItemClick(item)
                  }, {
                    actions: withCtx(({ order }) => [
                      order.isPending || order.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("button", {
                          class: "action-btn delete",
                          onClick: withModifiers(($event) => openConfirmModal(order, true), ["stop"])
                        }, " 取消 ", 8, ["onClick"]),
                        createVNode("button", {
                          class: "action-btn pay",
                          onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                        }, "去支付", 8, ["onClick"])
                      ], 64)) : ["expired", "refunded", "cancelled"].includes(order.status) ? (openBlock(), createBlock("button", {
                        key: 1,
                        class: "action-btn delete",
                        onClick: withModifiers(($event) => openConfirmModal(order, false), ["stop"])
                      }, "删除", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                        key: 2,
                        class: "action-btn view",
                        onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                      }, "详情", 8, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["order", "onClick"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (confirmModalVisible.value) {
          _push2(`<div class="modal-overlay" data-v-61fb262b><div class="modal-content" data-v-61fb262b><div class="modal-header" data-v-61fb262b>`);
          _push2(ssrRenderComponent(_component_el_icon, { class: "warning-icon" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-61fb262b>${ssrInterpolate(confirmModalType.value === "pending" ? "取消订单" : "删除记录")}</span></div><div class="modal-body" data-v-61fb262b>${ssrInterpolate(confirmModalMessage.value)}</div><div class="modal-footer" data-v-61fb262b><button class="modal-btn cancel" data-v-61fb262b>我不取消</button><button class="modal-btn confirm"${ssrIncludeBooleanAttr(confirmLoading.value) ? " disabled" : ""} data-v-61fb262b>${ssrInterpolate(confirmLoading.value ? "处理中..." : "确认取消")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/order/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-61fb262b"]]);
export {
  index as default
};
//# sourceMappingURL=index-CNRHXDMN.js.map
