import { E as ElDialog } from './index-BYF0U8gS.mjs';
import { E as ElTag } from './index-2JZmBUf1.mjs';
import { E as ElDivider } from './index-CD49T52w.mjs';
import { E as ElDescriptions, a as ElDescriptionsItem } from './index-BoB-s_a0.mjs';
import { E as ElAvatar } from './index-C3_NoBue.mjs';
import { E as ElTableColumn } from './index-D6Ug0Zge.mjs';
import { E as ElEmpty } from './index-BRSsuUkY.mjs';
import { E as ElButton } from './index-CXu9YNCC.mjs';
import { v as vLoading } from './directive-BHLqqXUb.mjs';
import { ref, defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, withDirectives, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { J as edit_default } from './index-DNnPa_Q9.mjs';
import { a as adminOrderApi } from './order-65zOcaiF.mjs';
import { _ as _export_sfc } from './server.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useBizFormat } from './useBizFormat-D_CzFEgD.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { T as TagInputGroup } from './TagInputGroup-B4JrW5qx.mjs';
import { A as AdminDataTable } from './AdminDataTable-B-yPQpXr.mjs';
import { E as ElImage } from './index-BSYGfCfY.mjs';
import { a as adminRoute } from './admin-routes-C0qcXhse.mjs';
import { E as ElMessage } from './index-BwQVtIp5.mjs';
import { D as DEFAULT_AVATAR$1 } from './constants-BRAeDQ6J.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderItemCell",
  __ssrInlineRender: true,
  props: {
    image: {},
    name: {},
    id: {},
    truncateId: { type: Boolean, default: true },
    errorText: { default: "\u65E0\u56FE" }
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
        "virtual": "\u865A\u62DF\u5145\u503C\u8BA2\u5355\u8BE6\u60C5",
        "shared": "\u8D26\u53F7\u5408\u79DF\u8BA2\u5355\u8BE6\u60C5",
        "cdk": "\u6FC0\u6D3B\u7801\u8BA2\u5355\u8BE6\u60C5"
      };
      return map[props.type] || "\u8BA2\u5355\u8BE6\u60C5";
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
          ElMessage.error((res == null ? void 0 : res.error) || "\u83B7\u53D6\u8BE6\u60C5\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error(e.message || "\u83B7\u53D6\u8BE6\u60C5\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const handleCopy = (text) => {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("\u5DF2\u590D\u5236");
    };
    const formatSpec = (spec) => {
      if (!spec) return "-";
      if (typeof spec === "string") return spec;
      return Object.values(spec).join(" / ");
    };
    const handleTagsChange = async (tags) => {
      try {
        await adminOrderApi.updateOrder(props.orderId, { tags });
        ElMessage.success("\u6807\u7B7E\u5DF2\u66F4\u65B0");
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
                  _push3(`\u5173\u95ED`);
                } else {
                  return [
                    createTextVNode("\u5173\u95ED")
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
                  _push3(`\u7F16\u8F91\u8BA2\u5355`);
                } else {
                  return [
                    createTextVNode("\u7F16\u8F91\u8BA2\u5355")
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
                    createTextVNode("\u5173\u95ED")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleEdit,
                  icon: unref(edit_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u7F16\u8F91\u8BA2\u5355")
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
              _push2(`<!--[--><div class="header-info" data-v-e52ba481${_scopeId}><div class="info-item" data-v-e52ba481${_scopeId}><span class="label" data-v-e52ba481${_scopeId}>\u8BA2\u5355\u53F7</span><span class="value mono copyable" data-v-e52ba481${_scopeId}>${ssrInterpolate(order.value.order_no)}</span></div><div class="info-item" data-v-e52ba481${_scopeId}><span class="label" data-v-e52ba481${_scopeId}>\u72B6\u6001</span>`);
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
              _push2(`</div><div class="info-item" data-v-e52ba481${_scopeId}><span class="label" data-v-e52ba481${_scopeId}>\u91D1\u989D</span><span class="amount" data-v-e52ba481${_scopeId}>\xA5${ssrInterpolate(order.value.amount)}</span></div></div>`);
              _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_descriptions, {
                column: 2,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u521B\u5EFA\u65F6\u95F4" }, {
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
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u652F\u4ED8\u65F6\u95F4" }, {
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
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7528\u6237" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (order.value._profile) {
                            _push4(`<div class="user-info" data-v-e52ba481${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_el_avatar, {
                              size: 24,
                              src: order.value._profile.avatar || DEFAULT_AVATAR
                            }, null, _parent4, _scopeId3));
                            _push4(`<span data-v-e52ba481${_scopeId3}>${ssrInterpolate(order.value._profile.nickname || "\u672A\u547D\u540D")}</span><span class="mono" data-v-e52ba481${_scopeId3}>(${ssrInterpolate(order.value._profile.uid)})</span></div>`);
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
                              createVNode("span", null, toDisplayString(order.value._profile.nickname || "\u672A\u547D\u540D"), 1),
                              createVNode("span", { class: "mono" }, "(" + toDisplayString(order.value._profile.uid) + ")", 1)
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u8D2D\u4E70\u6570\u91CF" }, {
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
                      createVNode(_component_el_descriptions_item, { label: "\u521B\u5EFA\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.created_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u652F\u4ED8\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.paid_at) || "-"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u7528\u6237" }, {
                        default: withCtx(() => [
                          order.value._profile ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "user-info"
                          }, [
                            createVNode(_component_el_avatar, {
                              size: 24,
                              src: order.value._profile.avatar || DEFAULT_AVATAR
                            }, null, 8, ["src"]),
                            createVNode("span", null, toDisplayString(order.value._profile.nickname || "\u672A\u547D\u540D"), 1),
                            createVNode("span", { class: "mono" }, "(" + toDisplayString(order.value._profile.uid) + ")", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u8D2D\u4E70\u6570\u91CF" }, {
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
              _push2(`<div class="section-block" data-v-e52ba481${_scopeId}><div class="section-title" data-v-e52ba481${_scopeId}>\u8BA2\u5355\u6807\u7B7E</div>`);
              _push2(ssrRenderComponent(TagInputGroup, {
                modelValue: order.value.tags,
                "onUpdate:modelValue": ($event) => order.value.tags = $event,
                "add-button-text": "+ \u6807\u7B7E",
                onChange: handleTagsChange
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="section-block" data-v-e52ba481${_scopeId}><div class="section-title" data-v-e52ba481${_scopeId}>\u5546\u54C1\u660E\u7EC6</div>`);
              _push2(ssrRenderComponent(AdminDataTable, {
                data: order.value.items || [],
                "show-header": true,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "\u5546\u54C1",
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
                      label: "\u89C4\u683C",
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
                      label: "\u5355\u4EF7",
                      width: "100"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\xA5${ssrInterpolate(row.price)}`);
                        } else {
                          return [
                            createTextVNode("\xA5" + toDisplayString(row.price), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_table_column, {
                        label: "\u5546\u54C1",
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
                        label: "\u89C4\u683C",
                        "min-width": "120"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.spec)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "\u5355\u4EF7",
                        width: "100"
                      }, {
                        default: withCtx(({ row }) => [
                          createTextVNode("\xA5" + toDisplayString(row.price), 1)
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
                _push2(`<div class="section-block" data-v-e52ba481${_scopeId}><div class="section-title" data-v-e52ba481${_scopeId}>\u6269\u5C55\u4FE1\u606F</div>`);
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
              _push2(ssrRenderComponent(_component_el_empty, { description: "\u672A\u627E\u5230\u8BA2\u5355\u4FE1\u606F" }, null, _parent2, _scopeId));
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
                      createVNode("span", { class: "label" }, "\u8BA2\u5355\u53F7"),
                      createVNode("span", {
                        class: "value mono copyable",
                        onClick: ($event) => handleCopy(order.value.order_no)
                      }, toDisplayString(order.value.order_no), 9, ["onClick"])
                    ]),
                    createVNode("div", { class: "info-item" }, [
                      createVNode("span", { class: "label" }, "\u72B6\u6001"),
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
                      createVNode("span", { class: "label" }, "\u91D1\u989D"),
                      createVNode("span", { class: "amount" }, "\xA5" + toDisplayString(order.value.amount), 1)
                    ])
                  ]),
                  createVNode(_component_el_divider),
                  createVNode(_component_el_descriptions, {
                    column: 2,
                    border: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_descriptions_item, { label: "\u521B\u5EFA\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.created_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u652F\u4ED8\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formatDate)(order.value.paid_at) || "-"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u7528\u6237" }, {
                        default: withCtx(() => [
                          order.value._profile ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "user-info"
                          }, [
                            createVNode(_component_el_avatar, {
                              size: 24,
                              src: order.value._profile.avatar || DEFAULT_AVATAR
                            }, null, 8, ["src"]),
                            createVNode("span", null, toDisplayString(order.value._profile.nickname || "\u672A\u547D\u540D"), 1),
                            createVNode("span", { class: "mono" }, "(" + toDisplayString(order.value._profile.uid) + ")", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u8D2D\u4E70\u6570\u91CF" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(order.value.quantity), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "section-block" }, [
                    createVNode("div", { class: "section-title" }, "\u8BA2\u5355\u6807\u7B7E"),
                    createVNode(TagInputGroup, {
                      modelValue: order.value.tags,
                      "onUpdate:modelValue": ($event) => order.value.tags = $event,
                      "add-button-text": "+ \u6807\u7B7E",
                      onChange: handleTagsChange
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "section-block" }, [
                    createVNode("div", { class: "section-title" }, "\u5546\u54C1\u660E\u7EC6"),
                    createVNode(AdminDataTable, {
                      data: order.value.items || [],
                      "show-header": true,
                      border: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          label: "\u5546\u54C1",
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
                          label: "\u89C4\u683C",
                          "min-width": "120"
                        }, {
                          default: withCtx(({ row }) => [
                            createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec(row.spec)), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u5355\u4EF7",
                          width: "100"
                        }, {
                          default: withCtx(({ row }) => [
                            createTextVNode("\xA5" + toDisplayString(row.price), 1)
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
                    createVNode("div", { class: "section-title" }, "\u6269\u5C55\u4FE1\u606F"),
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
                  description: "\u672A\u627E\u5230\u8BA2\u5355\u4FE1\u606F"
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
        ElMessage.error(error || "\u52A0\u8F7D\u5931\u8D25");
        return;
      }
      list.value = orders;
      total.value = totalCount;
    } catch (e) {
      console.error("\u52A0\u8F7D\u8BA2\u5355\u5931\u8D25:", e);
      ElMessage.error("\u7CFB\u7EDF\u5F02\u5E38");
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
    ElMessage.success("\u5DF2\u590D\u5236");
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

export { OrderDetailDialog as O, useAdminOrderList as u };
//# sourceMappingURL=useAdminOrderList-BF_sVftj.mjs.map
