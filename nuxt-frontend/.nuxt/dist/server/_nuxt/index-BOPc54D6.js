import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElIcon, bJ as search_default, a4 as user_default, b9 as refresh_default, by as getAdminSupabaseClient, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElTableColumn } from "./index-KOxrtlML.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElPagination } from "./index-cR1ntQxK.js";
/* empty css                  */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                       */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                        */
/* empty css                    */
/* empty css                    */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import dayjs from "dayjs";
import { b as adminApi } from "./admin-supabase-nszo-IoU.js";
import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { B as BulkActionBar } from "./BulkActionBar-DNKbMSDo.js";
import { A as AdminDataTable } from "./AdminDataTable-CCOHgBz_.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import { E as ElMessageBox } from "./index-Bf6vTHIR.js";
import "@vueuse/core";
import "lodash-unified";
import "./index-Dxw_X3Hq.js";
import "./event-BZTOGHfp.js";
import "@vue/shared";
import "./index-ClPmkyX9.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "./aria-B8G3G_75.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-D_b573Qt.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./index-DrPRyc7n.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./index-Cf_t59lc.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
import "./index-DvOrIhmd.js";
/* empty css                  */
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-DKY_z0U1.js";
/* empty css                    */
/* empty css                  */
import "./index-Dg8Z-nTr.js";
import "./validator-T0bsmJHo.js";
import "./index-B-o0CD59.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const dataList = ref([]);
    const selectedIds = ref([]);
    const pagination = reactive({
      page: 1,
      pageSize: 20,
      total: 0
    });
    const filters = reactive({
      code: "",
      userUid: ""
    });
    const getStatusType = (status) => {
      switch (status) {
        case "used":
          return "success";
        case "expired":
          return "info";
        default:
          return "warning";
      }
    };
    const getStatusLabel = (status) => {
      const map = {
        "used": "已使用",
        "expired": "已过期"
      };
      return map[status] || status;
    };
    const formatTime = (time) => {
      if (!time) return "-";
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    };
    const loadData = async () => {
      loading.value = true;
      try {
        const res = await adminApi.coupon.getCouponStats({
          page: pagination.page,
          pageSize: pagination.pageSize,
          code: filters.code,
          userUid: filters.userUid
        });
        if (res.success) {
          let list = res.data;
          const userIds = list.map((i) => i.user_uid).filter((id) => id && id.length > 20);
          if (userIds.length > 0) {
            const client = getAdminSupabaseClient();
            const { data: users } = await client.from("users").select("id, uid, nickname").in("id", userIds);
            if (users) {
              const userMap = users.reduce((acc, u) => {
                acc[u.id] = u;
                return acc;
              }, {});
              list = list.map((item) => {
                const u = userMap[item.user_uid];
                return {
                  ...item,
                  display_uid: u ? u.uid : item.user_uid,
                  // 有8位显示8位，没有显示UUID
                  user_nickname: u ? u.nickname : item.user_nickname
                };
              });
            }
          } else {
            list = list.map((item) => ({ ...item, display_uid: item.user_uid }));
          }
          dataList.value = list;
          pagination.total = res.total;
        } else {
          ElMessage.error(res.error || "加载失败");
        }
      } catch (e) {
        ElMessage.error("网络错误: " + e.message);
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      pagination.page = 1;
      loadData();
    };
    const handleSizeChange = (val) => {
      pagination.pageSize = val;
      loadData();
    };
    const handleCurrentChange = (val) => {
      pagination.page = val;
      loadData();
    };
    const handleSelectionChange = (rows) => {
      selectedIds.value = rows.map((r) => r.id);
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("确定删除该条记录吗？删除后用户侧将不再显示此优惠券。", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await deleteItems([row.id]);
      });
    };
    const handleBatchDelete = () => {
      if (selectedIds.value.length === 0) return;
      ElMessageBox.confirm(`确定删除选中的 ${selectedIds.value.length} 条记录吗？`, "批量删除", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await deleteItems(selectedIds.value);
      });
    };
    const deleteItems = async (ids) => {
      try {
        const res = await adminApi.coupon.deleteCouponUsages(ids);
        if (res.success) {
          ElMessage.success(`成功删除 ${res.count || ids.length} 条记录`);
          loadData();
          selectedIds.value = [];
        } else {
          ElMessage.error(res.error || "删除失败");
        }
      } catch (e) {
        ElMessage.error("删除异常: " + e.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "coupon-stats-page" }, _attrs))} data-v-77a9fdc1>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "优惠券统计",
        description: "查看优惠券领取和使用记录，支持按兑换码或用户查询。"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: loadData
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
                icon: unref(refresh_default),
                onClick: loadData
              }, {
                default: withCtx(() => [
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-77a9fdc1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: filters.code,
              "onUpdate:modelValue": ($event) => filters.code = $event,
              placeholder: "搜索兑换码",
              style: { "width": "200px" },
              clearable: "",
              onKeyup: handleSearch,
              onClear: handleSearch
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(search_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(search_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: filters.userUid,
              "onUpdate:modelValue": ($event) => filters.userUid = $event,
              placeholder: "搜索用户UID (8位)",
              style: { "width": "200px" },
              clearable: "",
              onKeyup: handleSearch,
              onClear: handleSearch
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(user_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(user_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(user_default))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleSearch
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`查询`);
                } else {
                  return [
                    createTextVNode("查询")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-group" }, [
                createVNode(_component_el_input, {
                  modelValue: filters.code,
                  "onUpdate:modelValue": ($event) => filters.code = $event,
                  placeholder: "搜索兑换码",
                  style: { "width": "200px" },
                  clearable: "",
                  onKeyup: withKeys(handleSearch, ["enter"]),
                  onClear: handleSearch
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(search_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_input, {
                  modelValue: filters.userUid,
                  "onUpdate:modelValue": ($event) => filters.userUid = $event,
                  placeholder: "搜索用户UID (8位)",
                  style: { "width": "200px" },
                  clearable: "",
                  onKeyup: withKeys(handleSearch, ["enter"]),
                  onClear: handleSearch
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(user_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: handleSearch
                }, {
                  default: withCtx(() => [
                    createTextVNode("查询")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (selectedIds.value.length > 0) {
        _push(ssrRenderComponent(BulkActionBar, {
          count: selectedIds.value.length,
          onDelete: handleBatchDelete
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataTable, mergeProps({
        data: dataList.value,
        onSelectionChange: handleSelectionChange
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55",
              align: "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "code",
              label: "兑换码",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="code-text" data-v-77a9fdc1${_scopeId2}>${ssrInterpolate(row.code)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "code-text" }, toDisplayString(row.code), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "coupon_name",
              label: "优惠券名称",
              "min-width": "150"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "所属用户",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.display_uid || row.user_uid) {
                    _push3(`<div class="user-cell" data-v-77a9fdc1${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(row.display_uid || row.user_uid)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(row.display_uid || row.user_uid), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (row.user_nickname) {
                      _push3(`<div class="user-nickname" data-v-77a9fdc1${_scopeId2}>${ssrInterpolate(row.user_nickname)}</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<span class="text-gray" data-v-77a9fdc1${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.display_uid || row.user_uid ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "user-cell"
                    }, [
                      createVNode(_component_el_tag, {
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.display_uid || row.user_uid), 1)
                        ]),
                        _: 2
                      }, 1024),
                      row.user_nickname ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "user-nickname"
                      }, toDisplayString(row.user_nickname), 1)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-gray"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "关联订单",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.order_no) {
                    _push3(`<span class="order-no" data-v-77a9fdc1${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
                  } else if (row.order_id) {
                    _push3(`<span class="order-uuid" data-v-77a9fdc1${_scopeId2}>${ssrInterpolate(row.order_id)}</span>`);
                  } else {
                    _push3(`<span class="text-gray" data-v-77a9fdc1${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    row.order_no ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "order-no"
                    }, toDisplayString(row.order_no), 1)) : row.order_id ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "order-uuid"
                    }, toDisplayString(row.order_id), 1)) : (openBlock(), createBlock("span", {
                      key: 2,
                      class: "text-gray"
                    }, "-"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "status",
              label: "状态",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: getStatusType(row.status),
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getStatusLabel(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getStatusType(row.status),
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "领取时间",
              width: "170",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatTime(row.created_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatTime(row.created_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "使用时间",
              width: "170",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatTime(row.used_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatTime(row.used_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作",
              width: "100",
              align: "center",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (["used", "expired"].includes(row.status)) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 删除 `);
                        } else {
                          return [
                            createTextVNode(" 删除 ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    ["used", "expired"].includes(row.status) ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 删除 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                type: "selection",
                width: "55",
                align: "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "code",
                label: "兑换码",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "code-text" }, toDisplayString(row.code), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "coupon_name",
                label: "优惠券名称",
                "min-width": "150"
              }),
              createVNode(_component_el_table_column, {
                label: "所属用户",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  row.display_uid || row.user_uid ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "user-cell"
                  }, [
                    createVNode(_component_el_tag, {
                      size: "small",
                      type: "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.display_uid || row.user_uid), 1)
                      ]),
                      _: 2
                    }, 1024),
                    row.user_nickname ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "user-nickname"
                    }, toDisplayString(row.user_nickname), 1)) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-gray"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "关联订单",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  row.order_no ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "order-no"
                  }, toDisplayString(row.order_no), 1)) : row.order_id ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: "order-uuid"
                  }, toDisplayString(row.order_id), 1)) : (openBlock(), createBlock("span", {
                    key: 2,
                    class: "text-gray"
                  }, "-"))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "status",
                label: "状态",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: getStatusType(row.status),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "领取时间",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "使用时间",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.used_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "100",
                align: "center",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  ["used", "expired"].includes(row.status) ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    link: "",
                    type: "danger",
                    size: "small",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 删除 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pagination-wrapper" data-v-77a9fdc1>`);
      _push(ssrRenderComponent(_component_el_pagination, {
        "current-page": pagination.page,
        "onUpdate:currentPage": ($event) => pagination.page = $event,
        "page-size": pagination.pageSize,
        "onUpdate:pageSize": ($event) => pagination.pageSize = $event,
        total: pagination.total,
        "page-sizes": [10, 20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper",
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/coupons/stats/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77a9fdc1"]]);
export {
  index as default
};
//# sourceMappingURL=index-BOPc54D6.js.map
