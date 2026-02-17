import { E as ElDialog } from "./index-BYF0U8gS.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElDivider } from "./index-CD49T52w.js";
import { E as ElDescriptions, a as ElDescriptionsItem } from "./index-BoB-s_a0.js";
import { E as ElAvatar } from "./index-C3_NoBue.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElEmpty } from "./index-BRSsuUkY.js";
import { E as ElButton } from "./index-CXu9YNCC.js";
import { v as vLoading } from "./directive-BHLqqXUb.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                    */
/* empty css                */
/* empty css                    */
/* empty css                              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                  */
/* empty css                   */
/* empty css                    */
/* empty css                    */
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, ref, computed, unref, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withDirectives } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot, ssrGetDirectiveProps, ssrRenderList } from "vue/server-renderer";
import { O as edit_default } from "./index-DNnPa_Q9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { a as adminOrderApi } from "./order-Ic3SkFUp.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { useRouter } from "vue-router";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { T as TagInputGroup } from "./TagInputGroup-B4JrW5qx.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { E as ElImage } from "./index-BSYGfCfY.js";
/* empty css                         */
import { a as adminRoute } from "./admin-routes-C0qcXhse.js";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import { D as DEFAULT_AVATAR$1 } from "./constants-BRAeDQ6J.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderItemCell",
  __ssrInlineRender: true,
  props: {
    image: {},
    name: {},
    id: {},
    truncateId: { type: Boolean, default: true },
    errorText: { default: "无图" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "order-item-cell" }, _attrs))} data-v-49df2195>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: __props.image,
        class: "thumb",
        fit: "cover"
      }, {
        error: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="no-img" data-v-49df2195${_scopeId}>${ssrInterpolate(__props.errorText)}</div>`);
          } else {
            return [
              createVNode("div", { class: "no-img" }, toDisplayString(__props.errorText), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="info" data-v-49df2195><div class="name"${ssrRenderAttr("title", __props.name)} data-v-49df2195>${ssrInterpolate(__props.name)}</div>`);
      if (__props.id) {
        _push(`<div class="id" data-v-49df2195>ID: ${ssrInterpolate(__props.truncateId ? __props.id.slice(0, 8) + "..." : __props.id)}</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/OrderItemCell.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const OrderItemCell = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-49df2195"]]);
const DEFAULT_AVATAR = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OrderDetailDialog",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    orderId: {},
    type: {}
  },
  emits: ["update:modelValue", "refresh"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const router = useRouter();
    const { formatDate } = useBizFormat();
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
    const loading = ref(false);
    const order = ref(null);
    const title = computed(() => {
      const map = {
        "virtual": "虚拟充值订单详情",
        "shared": "账号合租订单详情",
        "cdk": "激活码订单详情"
      };
      return map[props.type] || "订单详情";
    });
    const fetchDetail = async () => {
      if (!props.orderId) return;
      loading.value = true;
      try {
        let res;
        if (props.type === "virtual") {
          res = await adminOrderApi.getVirtualRechargeDetail(props.orderId);
        } else if (props.type === "shared") {
          res = await adminOrderApi.getShareOrderDetail(props.orderId);
        } else if (props.type === "cdk") {
          res = await adminOrderApi.getCdkeyOrderDetail(props.orderId);
        }
        if (res && res.success) {
          order.value = res.data;
        } else {
          ElMessage.error(res?.error || "获取详情失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "获取详情失败");
      } finally {
        loading.value = false;
      }
    };
    const handleCopy = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("已复制");
    };
    const formatSpec = (spec) => {
      if (!spec) return "-";
      if (typeof spec === "string") return spec;
      return Object.values(spec).join(" / ");
    };
    const handleTagsChange = async (tags) => {
      try {
        await adminOrderApi.updateOrder(props.orderId, { tags });
        ElMessage.success("标签已更新");
      } catch (e) {
      }
    };
    const handleEdit = () => {
      const routeMap = {
        "virtual": adminRoute("orders/recharge/post"),
        "shared": adminRoute("orders/share/post"),
        "cdk": adminRoute("orders/cdkey/post")
      };
      const path = routeMap[props.type];
      if (path) {
        router.push(`${path}?id=${props.orderId}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_tag = ElTag;
      const _component_el_divider = ElDivider;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_avatar = ElAvatar;
      const _component_el_table_column = ElTableColumn;
      const _component_el_empty = ElEmpty;
      const _component_el_button = ElButton;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        "model-value": __props.modelValue,
        title: title.value,
        width: "800px",
        "destroy-on-close": "",
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:modelValue", $event),
        onOpen: fetchDetail
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="dialog-footer" data-v-e52ba481${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => _ctx.$emit("update:modelValue", false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`关闭`);
                } else {
                  return [
                    createTextVNode("关闭")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleEdit,
              icon: unref(edit_default)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`编辑订单`);
                } else {
                  return [
                    createTextVNode("编辑订单")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => _ctx.$emit("update:modelValue", false)
                }, {
                  default: withCtx(() => [
                    createTextVNode("关闭")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleEdit,
                  icon: unref(edit_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("编辑订单")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "detail-container" }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-e52ba481${_scopeId}>`);
            if (order.value) {
              _push2(`<!--[--><div class="header-info" data-v-e52ba481${_scopeId}><div class="info-item" data-v-e52ba481${_scopeId}><span class="label" data-v-e52ba481${_scopeId}>订单号</span><span class="value mono copyable" data-v-e52ba481${_scopeId}>${ssrInterpolate(order.value.order_no)}</span></div><div class="info-item" data-v-e52ba481${_scopeId}><span class="label" data-v-e52ba481${_scopeId}>状态</span>`);
              _push2(ssrRenderComponent(_component_el_tag, {
                type: unref(getOrderStatusType)(order.value.status),
                effect: "dark"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(getOrderStatusLabel)(order.value.status))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(getOrderStatusLabel)(order.value.status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="info-item" data-v-e52ba481${_scopeId}><span class="label" data-v-e52ba481${_scopeId}>金额</span><span class="amount" data-v-e52ba481${_scopeId}>¥${ssrInterpolate(order.value.amount)}</span></div></div>`);
              _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_descriptions, {
                column: 2,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "创建时间" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatDate)(order.value.created_at))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatDate)(order.value.created_at)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "支付时间" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatDate)(order.value.paid_at) || "-")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatDate)(order.value.paid_at) || "-"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "用户" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (order.value._profile) {
                            _push4(`<div class="user-info" data-v-e52ba481${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_el_avatar, {
                              size: 24,
                              src: order.value._profile.avatar || DEFAULT_AVATAR
                            }, null, _parent4, _scopeId3));
                            _push4(`<span data-v-e52ba481${_scopeId3}>${ssrInterpolate(order.value._profile.nickname || "未命名")}</span><span class="mono" data-v-e52ba481${_scopeId3}>(${ssrInterpolate(order.value._profile.uid)})</span></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            order.value._profile ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "user-info"
                            }, [
                              createVNode(_component_el_avatar, {
                                size: 24,
                                src: order.value._profile.avatar || DEFAULT_AVATAR
                              }, null, 8, ["src"]),
                              createVNode("span", null, toDisplayString(order.value._profile.nickname || "未命名"), 1),
                              createVNode("span", { class: "mono" }, "(" + toDisplayString(order.value._profile.uid) + ")", 1)
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "购买数量" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(order.value.quantity)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(order.value.quantity), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "创建时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.created_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "支付时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.paid_at) || "-"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "用户" }, {
                        default: withCtx(() => [
                          order.value._profile ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "user-info"
                          }, [
                            createVNode(_component_el_avatar, {
                              size: 24,
                              src: order.value._profile.avatar || DEFAULT_AVATAR
                            }, null, 8, ["src"]),
                            createVNode("span", null, toDisplayString(order.value._profile.nickname || "未命名"), 1),
                            createVNode("span", { class: "mono" }, "(" + toDisplayString(order.value._profile.uid) + ")", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "购买数量" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(order.value.quantity), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="section-block" data-v-e52ba481${_scopeId}><div class="section-title" data-v-e52ba481${_scopeId}>订单标签</div>`);
              _push2(ssrRenderComponent(TagInputGroup, {
                modelValue: order.value.tags,
                "onUpdate:modelValue": ($event) => order.value.tags = $event,
                "add-button-text": "+ 标签",
                onChange: handleTagsChange
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="section-block" data-v-e52ba481${_scopeId}><div class="section-title" data-v-e52ba481${_scopeId}>商品明细</div>`);
              _push2(ssrRenderComponent(AdminDataTable, {
                data: order.value.items || [],
                "show-header": true,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "商品",
                      "min-width": "200"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(OrderItemCell, {
                            image: row.image,
                            name: row.name,
                            id: row.id
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "规格",
                      "min-width": "120"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="spec-text" data-v-e52ba481${_scopeId3}>${ssrInterpolate(formatSpec(row.spec))}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.spec)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "单价",
                      width: "100"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`¥${ssrInterpolate(row.price)}`);
                        } else {
                          return [
                            createTextVNode("¥" + toDisplayString(row.price), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_table_column, {
                        label: "商品",
                        "min-width": "200"
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
                        label: "规格",
                        "min-width": "120"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.spec)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "单价",
                        width: "100"
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
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (order.value.ext_info && Object.keys(order.value.ext_info).length > 0) {
                _push2(`<div class="section-block" data-v-e52ba481${_scopeId}><div class="section-title" data-v-e52ba481${_scopeId}>扩展信息</div>`);
                _push2(ssrRenderComponent(_component_el_descriptions, {
                  column: 1,
                  border: "",
                  class: "ext-descriptions"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(order.value.ext_info, (val, key) => {
                        _push3(ssrRenderComponent(_component_el_descriptions_item, {
                          key,
                          label: key
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(String(val))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(String(val)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(order.value.ext_info, (val, key) => {
                          return openBlock(), createBlock(_component_el_descriptions_item, {
                            key,
                            label: key
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(String(val)), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else if (!loading.value) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "未找到订单信息" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "detail-container" }, [
                order.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", { class: "header-info" }, [
                    createVNode("div", { class: "info-item" }, [
                      createVNode("span", { class: "label" }, "订单号"),
                      createVNode("span", {
                        class: "value mono copyable",
                        onClick: ($event) => handleCopy(order.value.order_no)
                      }, toDisplayString(order.value.order_no), 9, ["onClick"])
                    ]),
                    createVNode("div", { class: "info-item" }, [
                      createVNode("span", { class: "label" }, "状态"),
                      createVNode(_component_el_tag, {
                        type: unref(getOrderStatusType)(order.value.status),
                        effect: "dark"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(getOrderStatusLabel)(order.value.status)), 1)
                        ]),
                        _: 1
                      }, 8, ["type"])
                    ]),
                    createVNode("div", { class: "info-item" }, [
                      createVNode("span", { class: "label" }, "金额"),
                      createVNode("span", { class: "amount" }, "¥" + toDisplayString(order.value.amount), 1)
                    ])
                  ]),
                  createVNode(_component_el_divider),
                  createVNode(_component_el_descriptions, {
                    column: 2,
                    border: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_descriptions_item, { label: "创建时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.created_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "支付时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.paid_at) || "-"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "用户" }, {
                        default: withCtx(() => [
                          order.value._profile ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "user-info"
                          }, [
                            createVNode(_component_el_avatar, {
                              size: 24,
                              src: order.value._profile.avatar || DEFAULT_AVATAR
                            }, null, 8, ["src"]),
                            createVNode("span", null, toDisplayString(order.value._profile.nickname || "未命名"), 1),
                            createVNode("span", { class: "mono" }, "(" + toDisplayString(order.value._profile.uid) + ")", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "购买数量" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(order.value.quantity), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "section-block" }, [
                    createVNode("div", { class: "section-title" }, "订单标签"),
                    createVNode(TagInputGroup, {
                      modelValue: order.value.tags,
                      "onUpdate:modelValue": ($event) => order.value.tags = $event,
                      "add-button-text": "+ 标签",
                      onChange: handleTagsChange
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "section-block" }, [
                    createVNode("div", { class: "section-title" }, "商品明细"),
                    createVNode(AdminDataTable, {
                      data: order.value.items || [],
                      "show-header": true,
                      border: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          label: "商品",
                          "min-width": "200"
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
                          label: "规格",
                          "min-width": "120"
                        }, {
                          default: withCtx(({ row }) => [
                            createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.spec)), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "单价",
                          width: "100"
                        }, {
                          default: withCtx(({ row }) => [
                            createTextVNode("¥" + toDisplayString(row.price), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data"])
                  ]),
                  order.value.ext_info && Object.keys(order.value.ext_info).length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "section-block"
                  }, [
                    createVNode("div", { class: "section-title" }, "扩展信息"),
                    createVNode(_component_el_descriptions, {
                      column: 1,
                      border: "",
                      class: "ext-descriptions"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(order.value.ext_info, (val, key) => {
                          return openBlock(), createBlock(_component_el_descriptions_item, {
                            key,
                            label: key
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(String(val)), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
                ], 64)) : !loading.value ? (openBlock(), createBlock(_component_el_empty, {
                  key: 1,
                  description: "未找到订单信息"
                })) : createCommentVNode("", true)
              ])), [
                [_directive_loading, loading.value]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/order/OrderDetailDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OrderDetailDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e52ba481"]]);
function useAdminOrderList(orderType) {
  const loading = ref(false);
  const list = ref([]);
  const total = ref(0);
  const page = ref(1);
  const pageSize = ref(20);
  const selectedIds = ref([]);
  async function loadList() {
    loading.value = true;
    try {
      const { success, orders, total: totalCount, error } = await adminOrderApi.getOrders({
        page: page.value,
        pageSize: pageSize.value,
        order_type: orderType,
        exclude_status: ["refunding", "refunded"]
        // 排除退款中和已退款的订单
      });
      if (!success) {
        ElMessage.error(error || "加载失败");
        return;
      }
      list.value = orders;
      total.value = totalCount;
    } catch (e) {
      console.error("加载订单失败:", e);
      ElMessage.error("系统异常");
    } finally {
      loading.value = false;
    }
  }
  function handlePageChange(val) {
    page.value = val;
    loadList();
  }
  function handleSizeChange(val) {
    pageSize.value = val;
    page.value = 1;
    loadList();
  }
  function handleSelectionChange(selection) {
    selectedIds.value = selection.map((item) => item.id);
  }
  function handleCopy(text) {
    if (!text) return;
    (void 0).clipboard.writeText(text);
    ElMessage.success("已复制");
  }
  function formatSpec(spec) {
    if (!spec) return "-";
    if (typeof spec === "string") return spec;
    if (typeof spec === "object") {
      return Object.entries(spec).map(([k, v]) => `${k}: ${v}`).join(" / ");
    }
    return "-";
  }
  const { formatPrice, formatDate } = useBizFormat();
  const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
  const getStatusText = (status) => getOrderStatusLabel(status);
  const getStatusType = (status) => getOrderStatusType(status);
  const formatTime = (time) => formatDate(time);
  return {
    // State
    loading,
    list,
    total,
    page,
    pageSize,
    selectedIds,
    DEFAULT_AVATAR: DEFAULT_AVATAR$1,
    // Actions
    loadList,
    handlePageChange,
    handleSizeChange,
    handleSelectionChange,
    handleCopy,
    // Helpers
    formatSpec,
    getStatusText,
    getStatusType,
    formatTime,
    formatPrice
  };
}
export {
  OrderDetailDialog as O,
  useAdminOrderList as u
};
//# sourceMappingURL=useAdminOrderList-CUJTHnsB.js.map
