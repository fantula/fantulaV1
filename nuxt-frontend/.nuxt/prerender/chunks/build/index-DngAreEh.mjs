import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, TransitionGroup, Fragment, renderList, withModifiers, createTextVNode, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { ae as box_default, e as picture_default, d as delete_default, a as arrow_right_default, M as warning_default } from './index-DlETah8a.mjs';
import { u as useOrderList } from './useOrderList-Ddg3MhcK.mjs';
import { u as useInfiniteScroll } from './useInfiniteScroll-Cg7MWwox.mjs';
import { B as BaseInfiniteList } from './BaseInfiniteList-64au3mej.mjs';
import { _ as __nuxt_component_0 } from './BaseModal-CiVpglQ1.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './order-YXZ2UWGv.mjs';
import './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
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
import './useBizConfig-tsYRZrF8.mjs';
import './BaseButton-BlqmccK6.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { formatDate: formatTime } = useBizFormat();
    const {
      // Rename because useInfiniteScroll has 'loading'
      filteredList,
      currentTab,
      tabs,
      // Keep for compatibility if needed, but we use deleteOrder now
      deleteOrder,
      getCurrentTabLabel,
      getOrderStatusLabel
    } = useOrderList();
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredList,
      pageSize: 10
    });
    const getStatusText = (status) => getOrderStatusLabel(status);
    const handleItemClick = (item) => {
      if (item.status === "pending" || item.isPending) {
        router.push(`/checkout/${item.id}`);
        return;
      }
      const invalidStatuses = ["expired", "refunded", "cancelled"];
      if (invalidStatuses.includes(item.status)) {
        openConfirmModal(item, false);
        return;
      }
      router.push(`/profile/order/${item.id}`);
    };
    const confirmModalVisible = ref(false);
    const confirmLoading = ref(false);
    const confirmModalType = ref("cleanup");
    const confirmTargetItem = ref(null);
    const confirmModalMessage = computed(() => {
      return confirmModalType.value === "pending" ? "\u786E\u5B9A\u8981\u53D6\u6D88\u8FD9\u4E2A\u8BA2\u5355\u5417\uFF1F\u53D6\u6D88\u540E\u5C06\u91CA\u653E\u9501\u5B9A\u5E93\u5B58\u3002" : "\u8BE5\u8BA2\u5355\u5DF2\u65E0\u6548(\u8FC7\u671F\u6216\u9000\u6B3E)\uFF0C\u786E\u8BA4\u8981\u4ECE\u5217\u8868\u4E2D\u79FB\u9664\u5417\uFF1F";
    });
    const openConfirmModal = (item, isPreOrder) => {
      confirmTargetItem.value = item;
      confirmModalType.value = isPreOrder ? "pending" : "cleanup";
      confirmModalVisible.value = true;
    };
    const handleConfirmDelete = async () => {
      if (!confirmTargetItem.value) return;
      confirmLoading.value = true;
      try {
        const isPreOrder = confirmModalType.value === "pending";
        const success = await deleteOrder(confirmTargetItem.value.id, isPreOrder);
        if (success) {
          ElMessage.success(isPreOrder ? "\u8BA2\u5355\u5DF2\u53D6\u6D88" : "\u8BB0\u5F55\u5DF2\u6E05\u7406");
          confirmModalVisible.value = false;
        } else {
          ElMessage.error("\u64CD\u4F5C\u5931\u8D25");
        }
      } catch (e) {
        console.error(e);
        ElMessage.error("\u64CD\u4F5C\u53D1\u751F\u9519\u8BEF");
      } finally {
        confirmLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "orders-page" }, _attrs))} data-v-f640a995><div class="section-header" data-v-f640a995><h2 class="section-title" data-v-f640a995>\u6211\u7684\u8BA2\u5355</h2><div class="section-subtitle" data-v-f640a995>Order History</div></div><div class="order-tabs" data-v-f640a995><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: unref(currentTab) === tab.value }])}" data-v-f640a995><span data-v-f640a995>${ssrInterpolate(tab.label)}</span>`);
        if (unref(currentTab) === tab.value) {
          _push(`<div class="active-glow" data-v-f640a995></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="orders-scroll-area" data-v-f640a995><div class="orders-container" data-v-f640a995>`);
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
              _push2(`<div class="loading-state" data-v-f640a995${_scopeId}><div class="glass-loader" data-v-f640a995${_scopeId}></div><p data-v-f640a995${_scopeId}>\u6B63\u5728\u52A0\u8F7D\u8BA2\u5355...</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(displayList).length === 0 && unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                createVNode("div", { class: "glass-loader" }),
                createVNode("p", null, "\u6B63\u5728\u52A0\u8F7D\u8BA2\u5355...")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-f640a995${_scopeId}><div class="empty-icon-wrapper" data-v-f640a995${_scopeId}>`);
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
              _push2(`</div><div class="empty-text" data-v-f640a995${_scopeId}>\u6682\u65E0${ssrInterpolate(unref(getCurrentTabLabel)())}\u8BB0\u5F55</div><button class="go-shopping-btn" data-v-f640a995${_scopeId}>\u524D\u5F80\u9009\u8D2D</button></div>`);
            } else {
              _push2(`<div class="order-list" data-v-f640a995${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (item) => {
                _push2(`<div class="${ssrRenderClass([["status-" + (item.isPending ? "pending" : item.status)], "order-card"])}" data-v-f640a995${_scopeId}><div class="status-line" data-v-f640a995${_scopeId}></div><div class="card-inner" data-v-f640a995${_scopeId}><div class="card-header" data-v-f640a995${_scopeId}><div class="order-no-group" data-v-f640a995${_scopeId}><span class="label" data-v-f640a995${_scopeId}>NO.</span><span class="value" data-v-f640a995${_scopeId}>${ssrInterpolate(item.order_no)}</span></div><div class="${ssrRenderClass([item.isPending ? "pending" : item.status, "status-pill"])}" data-v-f640a995${_scopeId}><div class="dot" data-v-f640a995${_scopeId}></div><span data-v-f640a995${_scopeId}>${ssrInterpolate(item.isPending ? "\u5F85\u652F\u4ED8" : getStatusText(item.status))}</span></div></div><div class="card-body" data-v-f640a995${_scopeId}><div class="product-thumb" data-v-f640a995${_scopeId}>`);
                if (item.product_image) {
                  _push2(`<img${ssrRenderAttr("src", item.product_image)} class="thumb-img" loading="lazy" data-v-f640a995${_scopeId}>`);
                } else {
                  _push2(`<div class="placeholder-img" data-v-f640a995${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(picture_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(picture_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><div class="product-info" data-v-f640a995${_scopeId}><div class="name-row" data-v-f640a995${_scopeId}><h3 class="product-name" data-v-f640a995${_scopeId}>${ssrInterpolate(item.product_name)}</h3><span class="spec-tag" data-v-f640a995${_scopeId}>${ssrInterpolate(item.spec_text || "\u6807\u51C6\u89C4\u683C")}</span></div><div class="price-row" data-v-f640a995${_scopeId}><div class="price" data-v-f640a995${_scopeId}><span class="amount" data-v-f640a995${_scopeId}>${ssrInterpolate(Number(item.total_amount).toFixed(2))}</span><span class="unit" data-v-f640a995${_scopeId}>\u70B9</span></div><div class="qty" data-v-f640a995${_scopeId}>x${ssrInterpolate(item.quantity)}</div></div></div></div><div class="card-footer" data-v-f640a995${_scopeId}><div class="order-time" data-v-f640a995${_scopeId}>${ssrInterpolate(unref(formatTime)(item.created_at))}</div><div class="card-actions" data-v-f640a995${_scopeId}>`);
                if (item.isPending || item.status === "pending") {
                  _push2(`<!--[--><button class="action-btn delete" data-v-f640a995${_scopeId}>`);
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
                  _push2(`</button><button class="action-btn pay" data-v-f640a995${_scopeId}>\u53BB\u652F\u4ED8</button><!--]-->`);
                } else if (["expired", "refunded", "cancelled"].includes(item.status)) {
                  _push2(`<button class="action-btn cleanup" data-v-f640a995${_scopeId}>`);
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
                  _push2(` \u6E05\u7406\u8BB0\u5F55 </button>`);
                } else {
                  _push2(`<button class="action-btn view" data-v-f640a995${_scopeId}>\u67E5\u770B\u8BE6\u60C5 `);
                  _push2(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(arrow_right_default), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(arrow_right_default))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</button>`);
                }
                _push2(`</div></div></div></div>`);
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
                createVNode("div", { class: "empty-text" }, "\u6682\u65E0" + toDisplayString(unref(getCurrentTabLabel)()) + "\u8BB0\u5F55", 1),
                createVNode("button", {
                  class: "go-shopping-btn",
                  onClick: ($event) => unref(router).push("/")
                }, "\u524D\u5F80\u9009\u8D2D", 8, ["onClick"])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "order-list"
              }, [
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: ["order-card", ["status-" + (item.isPending ? "pending" : item.status)]],
                        onClick: ($event) => handleItemClick(item)
                      }, [
                        createVNode("div", { class: "status-line" }),
                        createVNode("div", { class: "card-inner" }, [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("div", { class: "order-no-group" }, [
                              createVNode("span", { class: "label" }, "NO."),
                              createVNode("span", { class: "value" }, toDisplayString(item.order_no), 1)
                            ]),
                            createVNode("div", {
                              class: ["status-pill", item.isPending ? "pending" : item.status]
                            }, [
                              createVNode("div", { class: "dot" }),
                              createVNode("span", null, toDisplayString(item.isPending ? "\u5F85\u652F\u4ED8" : getStatusText(item.status)), 1)
                            ], 2)
                          ]),
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "product-thumb" }, [
                              item.product_image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: item.product_image,
                                class: "thumb-img",
                                loading: "lazy"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "placeholder-img"
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(picture_default))
                                  ]),
                                  _: 1
                                })
                              ]))
                            ]),
                            createVNode("div", { class: "product-info" }, [
                              createVNode("div", { class: "name-row" }, [
                                createVNode("h3", { class: "product-name" }, toDisplayString(item.product_name), 1),
                                createVNode("span", { class: "spec-tag" }, toDisplayString(item.spec_text || "\u6807\u51C6\u89C4\u683C"), 1)
                              ]),
                              createVNode("div", { class: "price-row" }, [
                                createVNode("div", { class: "price" }, [
                                  createVNode("span", { class: "amount" }, toDisplayString(Number(item.total_amount).toFixed(2)), 1),
                                  createVNode("span", { class: "unit" }, "\u70B9")
                                ]),
                                createVNode("div", { class: "qty" }, "x" + toDisplayString(item.quantity), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "card-footer" }, [
                            createVNode("div", { class: "order-time" }, toDisplayString(unref(formatTime)(item.created_at)), 1),
                            createVNode("div", { class: "card-actions" }, [
                              item.isPending || item.status === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode("button", {
                                  class: "action-btn delete",
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
                                  class: "action-btn pay",
                                  onClick: withModifiers(($event) => handleItemClick(item), ["stop"])
                                }, "\u53BB\u652F\u4ED8", 8, ["onClick"])
                              ], 64)) : ["expired", "refunded", "cancelled"].includes(item.status) ? (openBlock(), createBlock("button", {
                                key: 1,
                                class: "action-btn cleanup",
                                onClick: withModifiers(($event) => openConfirmModal(item, false), ["stop"])
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(delete_default))
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u6E05\u7406\u8BB0\u5F55 ")
                              ], 8, ["onClick"])) : (openBlock(), createBlock("button", {
                                key: 2,
                                class: "action-btn view"
                              }, [
                                createTextVNode("\u67E5\u770B\u8BE6\u60C5 "),
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(arrow_right_default))
                                  ]),
                                  _: 1
                                })
                              ]))
                            ])
                          ])
                        ])
                      ], 10, ["onClick"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(__nuxt_component_0, {
        visible: confirmModalVisible.value,
        "onUpdate:visible": ($event) => confirmModalVisible.value = $event,
        title: confirmModalType.value === "pending" ? "\u53D6\u6D88\u8BA2\u5355" : "\u6E05\u7406\u8BB0\u5F55",
        width: "400px",
        confirmText: "\u786E\u8BA4\u5220\u9664",
        "confirm-type": "danger",
        loading: confirmLoading.value,
        "show-mascot": "",
        onConfirm: handleConfirmDelete
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="confirm-content" data-v-f640a995${_scopeId}><div class="confirm-icon" data-v-f640a995${_scopeId}>`);
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
            _push2(`</div><p class="confirm-text" data-v-f640a995${_scopeId}>${ssrInterpolate(confirmModalMessage.value)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "confirm-content" }, [
                createVNode("div", { class: "confirm-icon" }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(warning_default))
                    ]),
                    _: 1
                  })
                ]),
                createVNode("p", { class: "confirm-text" }, toDisplayString(confirmModalMessage.value), 1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/order/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f640a995"]]);

export { index as default };
//# sourceMappingURL=index-DngAreEh.mjs.map
