import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, createVNode, withModifiers, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-yXUwt-_q.mjs';
import { M as MobileInfiniteList } from './MobileInfiniteList-D165vu5R.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useOrderList } from './useOrderList-Ddg3MhcK.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { ae as box_default, w as warning_filled_default } from './index-DlETah8a.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';
import './order-YXZ2UWGv.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';

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
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["mobile-order-card", "status-" + (__props.order.isPending ? "pending" : __props.order.status)]
      }, _attrs))} data-v-e1ad5eac><div class="card-header" data-v-e1ad5eac><div class="order-no-group" data-v-e1ad5eac><span class="label" data-v-e1ad5eac>NO.</span><span class="value" data-v-e1ad5eac>${ssrInterpolate(((_a = __props.order.order_no) == null ? void 0 : _a.slice(-8)) || "---")}</span></div><div class="${ssrRenderClass([__props.order.isPending ? "pending" : __props.order.status, "status-pill"])}" data-v-e1ad5eac><div class="dot" data-v-e1ad5eac></div><span data-v-e1ad5eac>${ssrInterpolate(__props.order.isPending ? "\u5F85\u652F\u4ED8" : unref(getOrderStatusLabel)(__props.order.status))}</span></div></div><div class="card-body" data-v-e1ad5eac><div class="thumb" data-v-e1ad5eac><img${ssrRenderAttr("src", __props.order.product_image || "/images/placeholder.png")} class="product-img" loading="lazy" decoding="async" data-v-e1ad5eac></div><div class="info" data-v-e1ad5eac><div class="name-row" data-v-e1ad5eac><span class="name-text" data-v-e1ad5eac>${ssrInterpolate(__props.order.product_name)}</span><span class="spec-inline" data-v-e1ad5eac>${ssrInterpolate(__props.order.spec_text || "\u6807\u51C6\u89C4\u683C")}</span></div><div class="price-row" data-v-e1ad5eac><div class="price" data-v-e1ad5eac><span class="unit" data-v-e1ad5eac>\xA5</span><span class="amount" data-v-e1ad5eac>${ssrInterpolate(Number(__props.order.total_amount).toFixed(2))}</span></div><div class="qty" data-v-e1ad5eac>x${ssrInterpolate(__props.order.quantity)}</div></div></div></div><div class="card-footer" data-v-e1ad5eac><div class="time" data-v-e1ad5eac>${ssrInterpolate(unref(formatDate)(__props.order.created_at))}</div><div class="actions" data-v-e1ad5eac>`);
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
const MobileOrderCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e1ad5eac"]]);
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
      () => confirmModalType.value === "pending" ? "\u786E\u5B9A\u8981\u53D6\u6D88\u8FD9\u4E2A\u8BA2\u5355\u5417\uFF1F\u53D6\u6D88\u540E\u5C06\u91CA\u653E\u9501\u5B9A\u5E93\u5B58\u3002" : "\u8BE5\u8BA2\u5355\u5DF2\u65E0\u6548(\u8FC7\u671F\u6216\u9000\u6B3E)\uFF0C\u786E\u8BA4\u8981\u4ECE\u5217\u8868\u4E2D\u79FB\u9664\u5417\uFF1F"
    );
    const openConfirmModal = (item, isPreOrder) => {
      confirmTargetItem.value = item;
      confirmModalType.value = isPreOrder ? "pending" : "cleanup";
      confirmModalVisible.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-order-page" }, _attrs))} data-v-ba8dbcf9>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u6211\u7684\u8BA2\u5355" }, null, _parent));
      _push(`<div class="tabs-wrapper" data-v-ba8dbcf9><div class="tabs-scroll" data-v-ba8dbcf9><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(currentTab) === tab.value }, "tab-pill"])}" data-v-ba8dbcf9>${ssrInterpolate(tab.label)}</div>`);
      });
      _push(`<!--]--></div></div><div class="list-container" data-v-ba8dbcf9>`);
      _push(ssrRenderComponent(MobileInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        list: unref(displayList),
        onLoad: unref(loadMore)
      }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="empty-state" data-v-ba8dbcf9${_scopeId}><div class="empty-icon-wrapper" data-v-ba8dbcf9${_scopeId}>`);
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
            _push2(`</div><p class="empty-text" data-v-ba8dbcf9${_scopeId}>\u6682\u65E0\u76F8\u5173\u8BA2\u5355</p><button class="go-shopping-btn" data-v-ba8dbcf9${_scopeId}>\u524D\u5F80\u9009\u8D2D</button></div>`);
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
                createVNode("p", { class: "empty-text" }, "\u6682\u65E0\u76F8\u5173\u8BA2\u5355"),
                createVNode("button", {
                  class: "go-shopping-btn",
                  onClick: ($event) => unref(router).push("/")
                }, "\u524D\u5F80\u9009\u8D2D", 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="order-list" data-v-ba8dbcf9${_scopeId}><!--[-->`);
            ssrRenderList(unref(displayList), (item) => {
              _push2(ssrRenderComponent(MobileOrderCard, {
                key: item.id,
                order: item,
                onClick: ($event) => handleItemClick(item)
              }, {
                actions: withCtx(({ order }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (order.isPending || order.status === "pending") {
                      _push3(`<!--[--><button class="action-btn delete" data-v-ba8dbcf9${_scopeId2}> \u53D6\u6D88 </button><button class="action-btn pay" data-v-ba8dbcf9${_scopeId2}>\u53BB\u652F\u4ED8</button><!--]-->`);
                    } else if (["expired", "refunded", "cancelled"].includes(order.status)) {
                      _push3(`<button class="action-btn delete" data-v-ba8dbcf9${_scopeId2}>\u5220\u9664</button>`);
                    } else {
                      _push3(`<button class="action-btn view" data-v-ba8dbcf9${_scopeId2}>\u8BE6\u60C5</button>`);
                    }
                  } else {
                    return [
                      order.isPending || order.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("button", {
                          class: "action-btn delete",
                          onClick: withModifiers(($event) => openConfirmModal(order, true), ["stop"])
                        }, " \u53D6\u6D88 ", 8, ["onClick"]),
                        createVNode("button", {
                          class: "action-btn pay",
                          onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                        }, "\u53BB\u652F\u4ED8", 8, ["onClick"])
                      ], 64)) : ["expired", "refunded", "cancelled"].includes(order.status) ? (openBlock(), createBlock("button", {
                        key: 1,
                        class: "action-btn delete",
                        onClick: withModifiers(($event) => openConfirmModal(order, false), ["stop"])
                      }, "\u5220\u9664", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                        key: 2,
                        class: "action-btn view",
                        onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                      }, "\u8BE6\u60C5", 8, ["onClick"]))
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
                        }, " \u53D6\u6D88 ", 8, ["onClick"]),
                        createVNode("button", {
                          class: "action-btn pay",
                          onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                        }, "\u53BB\u652F\u4ED8", 8, ["onClick"])
                      ], 64)) : ["expired", "refunded", "cancelled"].includes(order.status) ? (openBlock(), createBlock("button", {
                        key: 1,
                        class: "action-btn delete",
                        onClick: withModifiers(($event) => openConfirmModal(order, false), ["stop"])
                      }, "\u5220\u9664", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                        key: 2,
                        class: "action-btn view",
                        onClick: withModifiers(($event) => handleItemClick(order), ["stop"])
                      }, "\u8BE6\u60C5", 8, ["onClick"]))
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
          _push2(`<div class="modal-overlay" data-v-ba8dbcf9><div class="modal-content" data-v-ba8dbcf9><div class="modal-header" data-v-ba8dbcf9>`);
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
          _push2(`<span data-v-ba8dbcf9>${ssrInterpolate(confirmModalType.value === "pending" ? "\u53D6\u6D88\u8BA2\u5355" : "\u5220\u9664\u8BB0\u5F55")}</span></div><div class="modal-body" data-v-ba8dbcf9>${ssrInterpolate(confirmModalMessage.value)}</div><div class="modal-footer" data-v-ba8dbcf9><button class="modal-btn cancel" data-v-ba8dbcf9>\u6211\u4E0D\u53D6\u6D88</button><button class="modal-btn confirm"${ssrIncludeBooleanAttr(confirmLoading.value) ? " disabled" : ""} data-v-ba8dbcf9>${ssrInterpolate(confirmLoading.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u53D6\u6D88")}</button></div></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba8dbcf9"]]);

export { index as default };
//# sourceMappingURL=index-tJqaWiP3.mjs.map
