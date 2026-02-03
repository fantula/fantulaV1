import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElImage } from "./index-BB-fMy6o.js";
/* empty css              */
/* empty css                         */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { h as arrow_left_default, ak as box_default, x as delete_default, w as warning_filled_default } from "./index-4qszPKX4.js";
import { u as useOrderList } from "./useOrderList-DYWqoKdl.js";
import { u as useInfiniteScroll, B as BaseInfiniteList } from "./BaseInfiniteList-pSsymcej.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./index-D2CY7Ok3.js";
import "./order-CRVwbgS6.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./useBizFormat-CLwhy_Ih.js";
import "./useBizConfig-tsYRZrF8.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    useRoute();
    const {
      filteredList,
      currentTab,
      tabs,
      getOrderStatusLabel,
      formatDate
    } = useOrderList();
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredList,
      pageSize: 10
    });
    const handleItemClick = (item) => {
      if (item.status === "pending" || item.isPending) {
        router.push(`/checkout/${item.id}`);
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
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-order-page" }, _attrs))} data-v-3820cda8><div class="page-header" data-v-3820cda8><div class="back-btn" data-v-3820cda8>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="title" data-v-3820cda8>我的订单</div><div class="placeholder" data-v-3820cda8></div></div><div class="tabs-wrapper" data-v-3820cda8><div class="tabs-scroll" data-v-3820cda8><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: unref(currentTab) === tab.value }, "tab-item"])}" data-v-3820cda8>${ssrInterpolate(tab.label)} `);
        if (unref(currentTab) === tab.value) {
          _push(`<div class="active-line" data-v-3820cda8></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="list-container" data-v-3820cda8>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        offset: 200
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && unref(loading)) {
              _push2(`<div class="loading-state" data-v-3820cda8${_scopeId}><div class="spinner" data-v-3820cda8${_scopeId}></div><span data-v-3820cda8${_scopeId}>正在加载订单...</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(displayList).length === 0 && unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                createVNode("div", { class: "spinner" }),
                createVNode("span", null, "正在加载订单...")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-3820cda8${_scopeId}><div class="empty-icon-wrapper" data-v-3820cda8${_scopeId}>`);
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
              _push2(`</div><p class="empty-text" data-v-3820cda8${_scopeId}>暂无相关订单</p><button class="go-shopping-btn" data-v-3820cda8${_scopeId}>前往选购</button></div>`);
            } else {
              _push2(`<div class="order-list" data-v-3820cda8${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="${ssrRenderClass(["status-" + (item.isPending ? "pending" : item.status), "mobile-order-card"])}" data-v-3820cda8${_scopeId}><div class="card-header" data-v-3820cda8${_scopeId}><div class="order-no-group" data-v-3820cda8${_scopeId}><span class="label" data-v-3820cda8${_scopeId}>NO.</span><span class="value" data-v-3820cda8${_scopeId}>${ssrInterpolate(item.order_no.slice(-8))}</span></div><div class="${ssrRenderClass([item.isPending ? "pending" : item.status, "status-pill"])}" data-v-3820cda8${_scopeId}><div class="dot" data-v-3820cda8${_scopeId}></div><span data-v-3820cda8${_scopeId}>${ssrInterpolate(item.isPending ? "待支付" : unref(getOrderStatusLabel)(item.status))}</span></div></div><div class="card-body" data-v-3820cda8${_scopeId}><div class="thumb" data-v-3820cda8${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_image, {
                  src: item.product_image || "/images/placeholder.png",
                  fit: "cover"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="info" data-v-3820cda8${_scopeId}><div class="name-row" data-v-3820cda8${_scopeId}><div class="name" data-v-3820cda8${_scopeId}>${ssrInterpolate(item.product_name)}</div><span class="spec-tag" data-v-3820cda8${_scopeId}>${ssrInterpolate(item.spec_text || "标准规格")}</span></div><div class="price-row" data-v-3820cda8${_scopeId}><div class="price" data-v-3820cda8${_scopeId}><span class="amount" data-v-3820cda8${_scopeId}>${ssrInterpolate(Number(item.total_amount).toFixed(2))}</span><span class="unit" data-v-3820cda8${_scopeId}>点</span></div><div class="qty" data-v-3820cda8${_scopeId}>x${ssrInterpolate(item.quantity)}</div></div></div></div><div class="card-footer" data-v-3820cda8${_scopeId}><div class="time" data-v-3820cda8${_scopeId}>${ssrInterpolate(unref(formatDate)(item.created_at))}</div><div class="actions" data-v-3820cda8${_scopeId}>`);
                if (item.isPending || item.status === "pending") {
                  _push2(`<!--[--><button class="btn delete" data-v-3820cda8${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(delete_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(delete_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</button><button class="btn pay" data-v-3820cda8${_scopeId}>去支付</button><!--]-->`);
                } else if (["expired", "refunded", "cancelled"].includes(item.status)) {
                  _push2(`<button class="btn delete" data-v-3820cda8${_scopeId}>清理记录</button>`);
                } else {
                  _push2(`<button class="btn view" data-v-3820cda8${_scopeId}>查看详情</button>`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
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
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "order-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                  return openBlock(), createBlock("div", {
                    key: item.id,
                    class: ["mobile-order-card", "status-" + (item.isPending ? "pending" : item.status)],
                    onClick: ($event) => handleItemClick(item)
                  }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("div", { class: "order-no-group" }, [
                        createVNode("span", { class: "label" }, "NO."),
                        createVNode("span", { class: "value" }, toDisplayString(item.order_no.slice(-8)), 1)
                      ]),
                      createVNode("div", {
                        class: ["status-pill", item.isPending ? "pending" : item.status]
                      }, [
                        createVNode("div", { class: "dot" }),
                        createVNode("span", null, toDisplayString(item.isPending ? "待支付" : unref(getOrderStatusLabel)(item.status)), 1)
                      ], 2)
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "thumb" }, [
                        createVNode(_component_el_image, {
                          src: item.product_image || "/images/placeholder.png",
                          fit: "cover"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "info" }, [
                        createVNode("div", { class: "name-row" }, [
                          createVNode("div", { class: "name" }, toDisplayString(item.product_name), 1),
                          createVNode("span", { class: "spec-tag" }, toDisplayString(item.spec_text || "标准规格"), 1)
                        ]),
                        createVNode("div", { class: "price-row" }, [
                          createVNode("div", { class: "price" }, [
                            createVNode("span", { class: "amount" }, toDisplayString(Number(item.total_amount).toFixed(2)), 1),
                            createVNode("span", { class: "unit" }, "点")
                          ]),
                          createVNode("div", { class: "qty" }, "x" + toDisplayString(item.quantity), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card-footer" }, [
                      createVNode("div", { class: "time" }, toDisplayString(unref(formatDate)(item.created_at)), 1),
                      createVNode("div", { class: "actions" }, [
                        item.isPending || item.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("button", {
                            class: "btn delete",
                            onClick: withModifiers(($event) => openConfirmModal(item, true), ["stop"])
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(delete_default))
                              ]),
                              _: 1
                            })
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            class: "btn pay",
                            onClick: withModifiers(($event) => handleItemClick(item), ["stop"])
                          }, "去支付", 8, ["onClick"])
                        ], 64)) : ["expired", "refunded", "cancelled"].includes(item.status) ? (openBlock(), createBlock("button", {
                          key: 1,
                          class: "btn delete",
                          onClick: withModifiers(($event) => openConfirmModal(item, false), ["stop"])
                        }, "清理记录", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                          key: 2,
                          class: "btn view",
                          onClick: withModifiers(($event) => handleItemClick(item), ["stop"])
                        }, "查看详情", 8, ["onClick"]))
                      ])
                    ])
                  ], 10, ["onClick"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (confirmModalVisible.value) {
        _push(`<div class="modal-mask" data-v-3820cda8><div class="modal-box" data-v-3820cda8><div class="m-icon-wrapper" data-v-3820cda8>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "m-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(warning_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="m-title" data-v-3820cda8>${ssrInterpolate(confirmModalType.value === "pending" ? "取消订单" : "清理记录")}</div><div class="m-content" data-v-3820cda8>${ssrInterpolate(confirmModalMessage.value)}</div><div class="m-actions" data-v-3820cda8><button class="m-btn cancel" data-v-3820cda8>取消</button><button class="m-btn confirm"${ssrIncludeBooleanAttr(confirmLoading.value) ? " disabled" : ""} data-v-3820cda8>${ssrInterpolate(confirmLoading.value ? "处理中..." : "确认删除")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/order/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3820cda8"]]);
export {
  index as default
};
//# sourceMappingURL=index-C-usSuhE.js.map
