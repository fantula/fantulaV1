import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { _ as _export_sfc, E as ElIcon, bJ as search_default, a4 as user_default, b9 as refresh_default, by as getAdminSupabaseClient, ah as ElMessage } from './server.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTableColumn } from './index-KOxrtlML.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElPagination } from './index-cR1ntQxK.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, openBlock, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import dayjs from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/dayjs/dayjs.min.js';
import { b as adminApi } from './admin-supabase-nszo-IoU.mjs';
import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { B as BulkActionBar } from './BulkActionBar-DNKbMSDo.mjs';
import { A as AdminDataTable } from './AdminDataTable-CCOHgBz_.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './index-ClPmkyX9.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import './aria-B8G3G_75.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';
import './index-7IYgoTSU.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-D_b573Qt.mjs';
import './index-B9I5bL_Z.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-DrPRyc7n.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './index-Cf_t59lc.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';
import './index-DvOrIhmd.mjs';
import './index-QnhSR2oe.mjs';
import './index-DKY_z0U1.mjs';
import './index-Dg8Z-nTr.mjs';
import './validator-T0bsmJHo.mjs';
import './index-B-o0CD59.mjs';

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
        "used": "\u5DF2\u4F7F\u7528",
        "expired": "\u5DF2\u8FC7\u671F"
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
          ElMessage.error(res.error || "\u52A0\u8F7D\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u7F51\u7EDC\u9519\u8BEF: " + e.message);
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
      ElMessageBox.confirm("\u786E\u5B9A\u5220\u9664\u8BE5\u6761\u8BB0\u5F55\u5417\uFF1F\u5220\u9664\u540E\u7528\u6237\u4FA7\u5C06\u4E0D\u518D\u663E\u793A\u6B64\u4F18\u60E0\u5238\u3002", "\u8B66\u544A", {
        confirmButtonText: "\u786E\u5B9A\u5220\u9664",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(async () => {
        await deleteItems([row.id]);
      });
    };
    const handleBatchDelete = () => {
      if (selectedIds.value.length === 0) return;
      ElMessageBox.confirm(`\u786E\u5B9A\u5220\u9664\u9009\u4E2D\u7684 ${selectedIds.value.length} \u6761\u8BB0\u5F55\u5417\uFF1F`, "\u6279\u91CF\u5220\u9664", {
        confirmButtonText: "\u786E\u5B9A\u5220\u9664",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(async () => {
        await deleteItems(selectedIds.value);
      });
    };
    const deleteItems = async (ids) => {
      try {
        const res = await adminApi.coupon.deleteCouponUsages(ids);
        if (res.success) {
          ElMessage.success(`\u6210\u529F\u5220\u9664 ${res.count || ids.length} \u6761\u8BB0\u5F55`);
          loadData();
          selectedIds.value = [];
        } else {
          ElMessage.error(res.error || "\u5220\u9664\u5931\u8D25");
        }
      } catch (e) {
        ElMessage.error("\u5220\u9664\u5F02\u5E38: " + e.message);
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
        title: "\u4F18\u60E0\u5238\u7EDF\u8BA1",
        description: "\u67E5\u770B\u4F18\u60E0\u5238\u9886\u53D6\u548C\u4F7F\u7528\u8BB0\u5F55\uFF0C\u652F\u6301\u6309\u5151\u6362\u7801\u6216\u7528\u6237\u67E5\u8BE2\u3002"
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
                  _push3(`\u5237\u65B0`);
                } else {
                  return [
                    createTextVNode("\u5237\u65B0")
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
                  createTextVNode("\u5237\u65B0")
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
              placeholder: "\u641C\u7D22\u5151\u6362\u7801",
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
              placeholder: "\u641C\u7D22\u7528\u6237UID (8\u4F4D)",
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
                  _push3(`\u67E5\u8BE2`);
                } else {
                  return [
                    createTextVNode("\u67E5\u8BE2")
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
                  placeholder: "\u641C\u7D22\u5151\u6362\u7801",
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
                  placeholder: "\u641C\u7D22\u7528\u6237UID (8\u4F4D)",
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
                    createTextVNode("\u67E5\u8BE2")
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
              label: "\u5151\u6362\u7801",
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
              label: "\u4F18\u60E0\u5238\u540D\u79F0",
              "min-width": "150"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6240\u5C5E\u7528\u6237",
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
              label: "\u5173\u8054\u8BA2\u5355",
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
              label: "\u72B6\u6001",
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
              label: "\u9886\u53D6\u65F6\u95F4",
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
              label: "\u4F7F\u7528\u65F6\u95F4",
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
              label: "\u64CD\u4F5C",
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
                          _push4(` \u5220\u9664 `);
                        } else {
                          return [
                            createTextVNode(" \u5220\u9664 ")
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
                        createTextVNode(" \u5220\u9664 ")
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
                label: "\u5151\u6362\u7801",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "code-text" }, toDisplayString(row.code), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "coupon_name",
                label: "\u4F18\u60E0\u5238\u540D\u79F0",
                "min-width": "150"
              }),
              createVNode(_component_el_table_column, {
                label: "\u6240\u5C5E\u7528\u6237",
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
                label: "\u5173\u8054\u8BA2\u5355",
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
                label: "\u72B6\u6001",
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
                label: "\u9886\u53D6\u65F6\u95F4",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u4F7F\u7528\u65F6\u95F4",
                width: "170",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.used_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
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
                      createTextVNode(" \u5220\u9664 ")
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

export { index as default };
//# sourceMappingURL=index-BOPc54D6.mjs.map
