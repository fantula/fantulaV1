import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElAvatar } from './index-C2DKVZ9g.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElDialog } from './index-CzosOSMt.mjs';
import { _ as _export_sfc, b9 as refresh_default, E as ElIcon, l as loading_default, ag as check_default, by as getAdminSupabaseClient, ah as ElMessage } from './server.mjs';
import { E as ElAlert } from './index-DvOrIhmd.mjs';
import { E as ElDescriptions, a as ElDescriptionsItem } from './index-J8thQwNJ.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { A as AdminDataTable } from './AdminDataTable-BzMTthVf.mjs';
import { D as DEFAULT_AVATAR } from './constants-Co_OOoHD.mjs';
import { u as useBizConfig } from './useBizConfig-DtWyKy4G.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { E as ElMessageBox } from './index-Bf6vTHIR.mjs';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './index-Dxw_X3Hq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './constants-hAKFmBbq.mjs';
import './index-D_b573Qt.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './event-BZTOGHfp.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
import './index-7IYgoTSU.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-BlpH41lu.mjs';
import './raf-CQRaPAjg.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/normalize-wheel-es/dist/index.js';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
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
import './index-DOE061f1.mjs';
import './index-ClPmkyX9.mjs';
import './index-QnhSR2oe.mjs';
import './index-Da73tUO2.mjs';
import './directive-tOiqatq5.mjs';
import './validator-T0bsmJHo.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatPrice, formatDate } = useBizFormat();
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
    const getStatusText = (status) => getOrderStatusLabel(status);
    const getStatusType = (status) => getOrderStatusType(status);
    const formatTime = (time) => formatDate(time);
    function formatSpec(spec) {
      if (!spec) return "-";
      if (typeof spec === "string") return spec;
      if (typeof spec === "object") {
        return Object.entries(spec).map(([k, v]) => `${k}: ${v}`).join(" / ");
      }
      return "-";
    }
    const loading = ref(false);
    const list = ref([]);
    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(20);
    const statusFilter = ref("");
    const refundDialogVisible = ref(false);
    const refundLoading = ref(false);
    const refundSubmitting = ref(false);
    const currentOrder = ref(null);
    const currentRequest = ref(null);
    const refundAmount = ref(0);
    const adminNote = ref("");
    async function loadList() {
      loading.value = true;
      try {
        const client = getAdminSupabaseClient();
        let query = client.from("orders").select(`
        *,
        _profile:profiles!orders_user_id_fkey(id, uid, avatar)
      `, { count: "exact" });
        if (statusFilter.value) {
          query = query.eq("status", statusFilter.value);
        } else {
          query = query.in("status", ["refunding", "refunded"]);
        }
        const { data, error, count } = await query.order("created_at", { ascending: false }).range((page.value - 1) * pageSize.value, page.value * pageSize.value - 1);
        if (!error && data) {
          list.value = data;
          total.value = count || 0;
        }
      } catch (e) {
        console.error("\u52A0\u8F7D\u8BA2\u5355\u5931\u8D25:", e);
      }
      loading.value = false;
    }
    watch([page, pageSize, statusFilter], () => loadList());
    function handleCopy(text) {
      if (!text) return;
      (void 0).clipboard.writeText(text);
      ElMessage.success("\u5DF2\u590D\u5236");
    }
    async function handleViewRefund(order) {
      currentOrder.value = order;
      refundDialogVisible.value = true;
      currentRequest.value = null;
      refundAmount.value = parseFloat(order.total_amount || 0);
      adminNote.value = "";
      refundLoading.value = true;
      try {
        const client = getAdminSupabaseClient();
        const { data, error } = await client.from("refund_requests").select("*").eq("order_id", order.id).order("created_at", { ascending: false }).limit(1).single();
        if (!error && data) {
          currentRequest.value = data;
        }
      } catch (e) {
        console.error("\u83B7\u53D6\u9000\u6B3E\u7533\u8BF7\u5931\u8D25:", e);
      } finally {
        refundLoading.value = false;
      }
    }
    const getRequestStatusName = (status) => {
      const map = {
        pending: "\u5F85\u5BA1\u6838",
        approved: "\u5DF2\u901A\u8FC7",
        rejected: "\u5DF2\u62D2\u7EDD"
      };
      return map[status] || status;
    };
    const getRequestStatusType = (status) => {
      const map = {
        pending: "warning",
        approved: "success",
        rejected: "danger"
      };
      return map[status] || "info";
    };
    async function handleReview(approved) {
      if (!currentRequest.value) return;
      if (approved && refundAmount.value <= 0) {
        ElMessage.warning("\u8BF7\u586B\u5199\u9000\u6B3E\u91D1\u989D");
        return;
      }
      const action = approved ? "\u540C\u610F\u9000\u6B3E" : "\u62D2\u7EDD\u9000\u6B3E";
      try {
        await ElMessageBox.confirm(
          approved ? `\u786E\u5B9A\u9000\u6B3E \xA5${refundAmount.value} \u7ED9\u7528\u6237\uFF1F` : "\u786E\u5B9A\u62D2\u7EDD\u6B64\u9000\u6B3E\u7533\u8BF7\uFF1F\u8BA2\u5355\u5C06\u6062\u590D\u539F\u72B6\u6001\u3002",
          action,
          { confirmButtonText: "\u786E\u5B9A", cancelButtonText: "\u53D6\u6D88" }
        );
      } catch {
        return;
      }
      refundSubmitting.value = true;
      try {
        const client = getAdminSupabaseClient();
        const { data, error } = await client.rpc("admin_review_refund", {
          p_request_id: currentRequest.value.id,
          p_approved: approved,
          p_refund_amount: approved ? refundAmount.value : null,
          p_admin_note: adminNote.value || null
        });
        if (error) throw error;
        if (!(data == null ? void 0 : data.success)) {
          ElMessage.error((data == null ? void 0 : data.error) || "\u64CD\u4F5C\u5931\u8D25");
          return;
        }
        ElMessage.success((data == null ? void 0 : data.message) || "\u64CD\u4F5C\u6210\u529F");
        refundDialogVisible.value = false;
        loadList();
      } catch (e) {
        ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
      } finally {
        refundSubmitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_avatar = ElAvatar;
      const _component_el_tag = ElTag;
      const _component_el_dialog = ElDialog;
      const _component_el_icon = ElIcon;
      const _component_el_alert = ElAlert;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _component_el_input_number = ElInputNumber;
      const _component_el_input = ElInput;
      const _component_el_empty = ElEmpty;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-ba2e4f28>`);
      _push(ssrRenderComponent(PageTipHeader, {
        title: "\u9000\u6B3E\u7BA1\u7406",
        description: "\u663E\u793A\u9000\u6B3E\u4E2D\u548C\u5DF2\u9000\u6B3E\u7684\u8BA2\u5355\uFF0C\u5BA1\u6838\u7528\u6237\u7684\u9000\u6B3E\u7533\u8BF7"
      }, null, _parent));
      _push(ssrRenderComponent(AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event,
              placeholder: "\u72B6\u6001\u7B5B\u9009",
              style: { "width": "120px", "margin-right": "12px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5168\u90E8",
                    value: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u9000\u6B3E\u4E2D",
                    value: "refunding"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5DF2\u9000\u6B3E",
                    value: "refunded"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "\u5168\u90E8",
                      value: ""
                    }),
                    createVNode(_component_el_option, {
                      label: "\u9000\u6B3E\u4E2D",
                      value: "refunding"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u9000\u6B3E",
                      value: "refunded"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadList,
              icon: unref(refresh_default)
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
              createVNode(_component_el_select, {
                modelValue: statusFilter.value,
                "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                placeholder: "\u72B6\u6001\u7B5B\u9009",
                style: { "width": "120px", "margin-right": "12px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_option, {
                    label: "\u5168\u90E8",
                    value: ""
                  }),
                  createVNode(_component_el_option, {
                    label: "\u9000\u6B3E\u4E2D",
                    value: "refunding"
                  }),
                  createVNode(_component_el_option, {
                    label: "\u5DF2\u9000\u6B3E",
                    value: "refunded"
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_el_button, {
                onClick: loadList,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        data: list.value,
        loading: loading.value,
        total: total.value,
        "current-page": page.value,
        "onUpdate:currentPage": ($event) => page.value = $event,
        "page-size": pageSize.value,
        "onUpdate:pageSize": ($event) => pageSize.value = $event,
        onPageChange: loadList
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u8BA2\u5355\u53F7",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="mono-text" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(row.order_no)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "mono-text",
                      onClick: ($event) => handleCopy(row.order_no)
                    }, toDisplayString(row.order_no), 9, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7528\u6237",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="user-cell" data-v-ba2e4f28${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 28,
                    src: ((_a = row._profile) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR)
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="uid-text" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(((_b = row._profile) == null ? void 0 : _b.uid) || "\u65E0UID")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 28,
                        src: ((_c = row._profile) == null ? void 0 : _c.avatar) || unref(DEFAULT_AVATAR)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "uid-text" }, toDisplayString(((_d = row._profile) == null ? void 0 : _d.uid) || "\u65E0UID"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5546\u54C1",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="product-cell" data-v-ba2e4f28${_scopeId2}>`);
                  if ((_a = row.product_snapshot) == null ? void 0 : _a.image) {
                    _push3(`<img${ssrRenderAttr("src", row.product_snapshot.image)} class="product-thumb" data-v-ba2e4f28${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(((_b = row.product_snapshot) == null ? void 0 : _b.product_name) || "\u672A\u77E5\u5546\u54C1")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      ((_c = row.product_snapshot) == null ? void 0 : _c.image) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.product_snapshot.image,
                        class: "product-thumb"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(((_d = row.product_snapshot) == null ? void 0 : _d.product_name) || "\u672A\u77E5\u5546\u54C1"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u89C4\u683C",
              "min-width": "140"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<span class="spec-text" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(formatSpec((_a = row.sku_snapshot) == null ? void 0 : _a.spec_combination))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec((_b = row.sku_snapshot) == null ? void 0 : _b.spec_combination)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u6570\u91CF",
              width: "60",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(row.quantity || 1)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u603B\u652F\u4ED8",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="amount" data-v-ba2e4f28${_scopeId2}>${ssrInterpolate(unref(formatPrice)(row.total_amount))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u4F18\u60E0\u5238",
              width: "80"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  if ((_a = row.coupon_snapshot) == null ? void 0 : _a.discount_amount) {
                    _push3(`<span class="discount" data-v-ba2e4f28${_scopeId2}> -${ssrInterpolate(unref(formatPrice)(row.coupon_snapshot.discount_amount))}</span>`);
                  } else {
                    _push3(`<span class="no-discount" data-v-ba2e4f28${_scopeId2}>-</span>`);
                  }
                } else {
                  return [
                    ((_b = row.coupon_snapshot) == null ? void 0 : _b.discount_amount) ? (openBlock(), createBlock("span", {
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
              label: "\u72B6\u6001",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: getStatusType(row.status) || "info",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getStatusText(row.status))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getStatusType(row.status) || "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "150"
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
              label: "\u5230\u671F\u65F6\u95F4",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatTime(row.end_time || row.expires_at))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatTime(row.end_time || row.expires_at)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              width: "120",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleViewRefund(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.status === "refunding" ? "\u5BA1\u6838" : "\u67E5\u770B")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.status === "refunding" ? "\u5BA1\u6838" : "\u67E5\u770B"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => handleViewRefund(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.status === "refunding" ? "\u5BA1\u6838" : "\u67E5\u770B"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                label: "\u8BA2\u5355\u53F7",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    class: "mono-text",
                    onClick: ($event) => handleCopy(row.order_no)
                  }, toDisplayString(row.order_no), 9, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u7528\u6237",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => {
                  var _a, _b;
                  return [
                    createVNode("div", { class: "user-cell" }, [
                      createVNode(_component_el_avatar, {
                        size: 28,
                        src: ((_a = row._profile) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR)
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "uid-text" }, toDisplayString(((_b = row._profile) == null ? void 0 : _b.uid) || "\u65E0UID"), 1)
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5546\u54C1",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => {
                  var _a, _b;
                  return [
                    createVNode("div", { class: "product-cell" }, [
                      ((_a = row.product_snapshot) == null ? void 0 : _a.image) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.product_snapshot.image,
                        class: "product-thumb"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(((_b = row.product_snapshot) == null ? void 0 : _b.product_name) || "\u672A\u77E5\u5546\u54C1"), 1)
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u89C4\u683C",
                "min-width": "140"
              }, {
                default: withCtx(({ row }) => {
                  var _a;
                  return [
                    createVNode("span", { class: "spec-text" }, toDisplayString(formatSpec((_a = row.sku_snapshot) == null ? void 0 : _a.spec_combination)), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u6570\u91CF",
                width: "60",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", null, toDisplayString(row.quantity || 1), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u603B\u652F\u4ED8",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "amount" }, toDisplayString(unref(formatPrice)(row.total_amount)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u4F18\u60E0\u5238",
                width: "80"
              }, {
                default: withCtx(({ row }) => {
                  var _a;
                  return [
                    ((_a = row.coupon_snapshot) == null ? void 0 : _a.discount_amount) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "discount"
                    }, " -" + toDisplayString(unref(formatPrice)(row.coupon_snapshot.discount_amount)), 1)) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "no-discount"
                    }, "-"))
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: getStatusType(row.status) || "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.created_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5230\u671F\u65F6\u95F4",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatTime(row.end_time || row.expires_at)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "120",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    onClick: ($event) => handleViewRefund(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.status === "refunding" ? "\u5BA1\u6838" : "\u67E5\u770B"), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: refundDialogVisible.value,
        "onUpdate:modelValue": ($event) => refundDialogVisible.value = $event,
        title: "\u9000\u6B3E\u7533\u8BF7\u5BA1\u6838",
        width: "600px",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (((_a = currentRequest.value) == null ? void 0 : _a.status) === "pending") {
              _push2(`<div class="dialog-footer-actions" data-v-ba2e4f28${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                onClick: ($event) => handleReview(false),
                loading: refundSubmitting.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u62D2\u7EDD\u9000\u6B3E `);
                  } else {
                    return [
                      createTextVNode(" \u62D2\u7EDD\u9000\u6B3E ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: ($event) => handleReview(true),
                loading: refundSubmitting.value,
                icon: unref(check_default)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u540C\u610F\u9000\u6B3E `);
                  } else {
                    return [
                      createTextVNode(" \u540C\u610F\u9000\u6B3E ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(ssrRenderComponent(_component_el_button, {
                onClick: ($event) => refundDialogVisible.value = false
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
            }
          } else {
            return [
              ((_b = currentRequest.value) == null ? void 0 : _b.status) === "pending" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "dialog-footer-actions"
              }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => handleReview(false),
                  loading: refundSubmitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u62D2\u7EDD\u9000\u6B3E ")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: ($event) => handleReview(true),
                  loading: refundSubmitting.value,
                  icon: unref(check_default)
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u540C\u610F\u9000\u6B3E ")
                  ]),
                  _: 1
                }, 8, ["onClick", "loading", "icon"])
              ])) : (openBlock(), createBlock(_component_el_button, {
                key: 1,
                onClick: ($event) => refundDialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5173\u95ED")
                ]),
                _: 1
              }, 8, ["onClick"]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            if (refundLoading.value) {
              _push2(`<div class="loading-state" data-v-ba2e4f28${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(loading_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(loading_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` \u6B63\u5728\u52A0\u8F7D\u9000\u6B3E\u7533\u8BF7... </div>`);
            } else if (currentRequest.value) {
              _push2(`<!--[-->`);
              if (currentRequest.value.status === "pending") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u8BE5\u8BA2\u5355\u7B49\u5F85\u9000\u6B3E\u5BA1\u6838",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "approved") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u8BE5\u8BA2\u5355\u5DF2\u5B8C\u6210\u9000\u6B3E",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "rejected") {
                _push2(ssrRenderComponent(_component_el_alert, {
                  title: "\u8BE5\u9000\u6B3E\u7533\u8BF7\u5DF2\u88AB\u62D2\u7EDD",
                  type: "danger",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "\u8BA2\u5355\u4FE1\u606F",
                column: 2,
                border: "",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          _push4(`${ssrInterpolate((_a2 = currentOrder.value) == null ? void 0 : _a2.order_no)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString((_b2 = currentOrder.value) == null ? void 0 : _b2.order_no), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u8BA2\u5355\u91D1\u989D" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          _push4(`<span class="amount" data-v-ba2e4f28${_scopeId3}>\xA5${ssrInterpolate((_a2 = currentOrder.value) == null ? void 0 : _a2.total_amount)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "amount" }, "\xA5" + toDisplayString((_b2 = currentOrder.value) == null ? void 0 : _b2.total_amount), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u5546\u54C1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2, _c2, _d2;
                        if (_push4) {
                          _push4(`${ssrInterpolate((_b2 = (_a2 = currentOrder.value) == null ? void 0 : _a2.product_snapshot) == null ? void 0 : _b2.product_name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString((_d2 = (_c2 = currentOrder.value) == null ? void 0 : _c2.product_snapshot) == null ? void 0 : _d2.product_name), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u539F\u72B6\u6001" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          _push4(`${ssrInterpolate((_a2 = currentRequest.value) == null ? void 0 : _a2.original_status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString((_b2 = currentRequest.value) == null ? void 0 : _b2.original_status), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString((_a2 = currentOrder.value) == null ? void 0 : _a2.order_no), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u91D1\u989D" }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createVNode("span", { class: "amount" }, "\xA5" + toDisplayString((_a2 = currentOrder.value) == null ? void 0 : _a2.total_amount), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u5546\u54C1" }, {
                        default: withCtx(() => {
                          var _a2, _b2;
                          return [
                            createTextVNode(toDisplayString((_b2 = (_a2 = currentOrder.value) == null ? void 0 : _a2.product_snapshot) == null ? void 0 : _b2.product_name), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u539F\u72B6\u6001" }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString((_a2 = currentRequest.value) == null ? void 0 : _a2.original_status), 1)
                          ];
                        }),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_descriptions, {
                title: "\u9000\u6B3E\u7533\u8BF7",
                column: 1,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u9000\u6B3E\u539F\u56E0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(currentRequest.value.reason)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(currentRequest.value.reason), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (currentRequest.value.reason_detail) {
                      _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u8865\u5145\u8BF4\u660E" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(currentRequest.value.reason_detail)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(currentRequest.value.reason_detail), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7533\u8BF7\u65F6\u95F4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(formatTime(currentRequest.value.created_at))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(formatTime(currentRequest.value.created_at)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7533\u8BF7\u72B6\u6001" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: getRequestStatusType(currentRequest.value.status)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(getRequestStatusName(currentRequest.value.status))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_tag, {
                              type: getRequestStatusType(currentRequest.value.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "\u9000\u6B3E\u539F\u56E0" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value.reason), 1)
                        ]),
                        _: 1
                      }),
                      currentRequest.value.reason_detail ? (openBlock(), createBlock(_component_el_descriptions_item, {
                        key: 0,
                        label: "\u8865\u5145\u8BF4\u660E"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentRequest.value.reason_detail), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_el_descriptions_item, { label: "\u7533\u8BF7\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(formatTime(currentRequest.value.created_at)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u7533\u8BF7\u72B6\u6001" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_tag, {
                            type: getRequestStatusType(currentRequest.value.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["type"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (currentRequest.value.status !== "pending") {
                _push2(ssrRenderComponent(_component_el_descriptions, {
                  title: "\u5BA1\u6838\u7ED3\u679C",
                  column: 1,
                  border: "",
                  class: "mt-4"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (currentRequest.value.refund_amount) {
                        _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u9000\u6B3E\u91D1\u989D" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="amount" data-v-ba2e4f28${_scopeId3}>\xA5${ssrInterpolate(currentRequest.value.refund_amount)}</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "amount" }, "\xA5" + toDisplayString(currentRequest.value.refund_amount), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (currentRequest.value.admin_note) {
                        _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7BA1\u7406\u5458\u5907\u6CE8" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(currentRequest.value.admin_note)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(currentRequest.value.admin_note), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u5BA1\u6838\u65F6\u95F4" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(formatTime(currentRequest.value.reviewed_at))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(formatTime(currentRequest.value.reviewed_at)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        currentRequest.value.refund_amount ? (openBlock(), createBlock(_component_el_descriptions_item, {
                          key: 0,
                          label: "\u9000\u6B3E\u91D1\u989D"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "amount" }, "\xA5" + toDisplayString(currentRequest.value.refund_amount), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        currentRequest.value.admin_note ? (openBlock(), createBlock(_component_el_descriptions_item, {
                          key: 1,
                          label: "\u7BA1\u7406\u5458\u5907\u6CE8"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentRequest.value.admin_note), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_el_descriptions_item, { label: "\u5BA1\u6838\u65F6\u95F4" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(formatTime(currentRequest.value.reviewed_at)), 1)
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (currentRequest.value.status === "pending") {
                _push2(`<div class="review-form mt-4" data-v-ba2e4f28${_scopeId}><div class="form-row" data-v-ba2e4f28${_scopeId}><label data-v-ba2e4f28${_scopeId}>\u9000\u6B3E\u91D1\u989D\uFF1A</label>`);
                _push2(ssrRenderComponent(_component_el_input_number, {
                  modelValue: refundAmount.value,
                  "onUpdate:modelValue": ($event) => refundAmount.value = $event,
                  min: 0,
                  max: parseFloat(((_a = currentOrder.value) == null ? void 0 : _a.total_amount) || 0),
                  precision: 2,
                  "controls-position": "right",
                  style: { "width": "150px" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="hint" data-v-ba2e4f28${_scopeId}>\uFF08\u8BA2\u5355\u91D1\u989D: \xA5${ssrInterpolate((_b = currentOrder.value) == null ? void 0 : _b.total_amount)}\uFF09</span></div><div class="form-row" data-v-ba2e4f28${_scopeId}><label data-v-ba2e4f28${_scopeId}>\u7BA1\u7406\u5458\u5907\u6CE8\uFF1A</label>`);
                _push2(ssrRenderComponent(_component_el_input, {
                  modelValue: adminNote.value,
                  "onUpdate:modelValue": ($event) => adminNote.value = $event,
                  type: "textarea",
                  rows: 2,
                  placeholder: "\u5BA1\u6838\u5907\u6CE8\uFF08\u9009\u586B\uFF09",
                  style: { "flex": "1" }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="empty-receipt" data-v-ba2e4f28${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "\u672A\u627E\u5230\u9000\u6B3E\u7533\u8BF7\u8BB0\u5F55",
                "image-size": 80
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              refundLoading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "loading-state"
              }, [
                createVNode(_component_el_icon, { class: "is-loading" }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" \u6B63\u5728\u52A0\u8F7D\u9000\u6B3E\u7533\u8BF7... ")
              ])) : currentRequest.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                currentRequest.value.status === "pending" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 0,
                  title: "\u8BE5\u8BA2\u5355\u7B49\u5F85\u9000\u6B3E\u5BA1\u6838",
                  type: "warning",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "approved" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 1,
                  title: "\u8BE5\u8BA2\u5355\u5DF2\u5B8C\u6210\u9000\u6B3E",
                  type: "success",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                currentRequest.value.status === "rejected" ? (openBlock(), createBlock(_component_el_alert, {
                  key: 2,
                  title: "\u8BE5\u9000\u6B3E\u7533\u8BF7\u5DF2\u88AB\u62D2\u7EDD",
                  type: "danger",
                  "show-icon": "",
                  closable: false,
                  class: "mb-4"
                })) : createCommentVNode("", true),
                createVNode(_component_el_descriptions, {
                  title: "\u8BA2\u5355\u4FE1\u606F",
                  column: 2,
                  border: "",
                  class: "mb-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString((_a2 = currentOrder.value) == null ? void 0 : _a2.order_no), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u91D1\u989D" }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode("span", { class: "amount" }, "\xA5" + toDisplayString((_a2 = currentOrder.value) == null ? void 0 : _a2.total_amount), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "\u5546\u54C1" }, {
                      default: withCtx(() => {
                        var _a2, _b2;
                        return [
                          createTextVNode(toDisplayString((_b2 = (_a2 = currentOrder.value) == null ? void 0 : _a2.product_snapshot) == null ? void 0 : _b2.product_name), 1)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "\u539F\u72B6\u6001" }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString((_a2 = currentRequest.value) == null ? void 0 : _a2.original_status), 1)
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_descriptions, {
                  title: "\u9000\u6B3E\u7533\u8BF7",
                  column: 1,
                  border: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "\u9000\u6B3E\u539F\u56E0" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.reason), 1)
                      ]),
                      _: 1
                    }),
                    currentRequest.value.reason_detail ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 0,
                      label: "\u8865\u5145\u8BF4\u660E"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.reason_detail), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_descriptions_item, { label: "\u7533\u8BF7\u65F6\u95F4" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(formatTime(currentRequest.value.created_at)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "\u7533\u8BF7\u72B6\u6001" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, {
                          type: getRequestStatusType(currentRequest.value.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getRequestStatusName(currentRequest.value.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["type"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                currentRequest.value.status !== "pending" ? (openBlock(), createBlock(_component_el_descriptions, {
                  key: 3,
                  title: "\u5BA1\u6838\u7ED3\u679C",
                  column: 1,
                  border: "",
                  class: "mt-4"
                }, {
                  default: withCtx(() => [
                    currentRequest.value.refund_amount ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 0,
                      label: "\u9000\u6B3E\u91D1\u989D"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "amount" }, "\xA5" + toDisplayString(currentRequest.value.refund_amount), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    currentRequest.value.admin_note ? (openBlock(), createBlock(_component_el_descriptions_item, {
                      key: 1,
                      label: "\u7BA1\u7406\u5458\u5907\u6CE8"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentRequest.value.admin_note), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_descriptions_item, { label: "\u5BA1\u6838\u65F6\u95F4" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(formatTime(currentRequest.value.reviewed_at)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                currentRequest.value.status === "pending" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "review-form mt-4"
                }, [
                  createVNode("div", { class: "form-row" }, [
                    createVNode("label", null, "\u9000\u6B3E\u91D1\u989D\uFF1A"),
                    createVNode(_component_el_input_number, {
                      modelValue: refundAmount.value,
                      "onUpdate:modelValue": ($event) => refundAmount.value = $event,
                      min: 0,
                      max: parseFloat(((_c = currentOrder.value) == null ? void 0 : _c.total_amount) || 0),
                      precision: 2,
                      "controls-position": "right",
                      style: { "width": "150px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                    createVNode("span", { class: "hint" }, "\uFF08\u8BA2\u5355\u91D1\u989D: \xA5" + toDisplayString((_d = currentOrder.value) == null ? void 0 : _d.total_amount) + "\uFF09", 1)
                  ]),
                  createVNode("div", { class: "form-row" }, [
                    createVNode("label", null, "\u7BA1\u7406\u5458\u5907\u6CE8\uFF1A"),
                    createVNode(_component_el_input, {
                      modelValue: adminNote.value,
                      "onUpdate:modelValue": ($event) => adminNote.value = $event,
                      type: "textarea",
                      rows: 2,
                      placeholder: "\u5BA1\u6838\u5907\u6CE8\uFF08\u9009\u586B\uFF09",
                      style: { "flex": "1" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createBlock("div", {
                key: 2,
                class: "empty-receipt"
              }, [
                createVNode(_component_el_empty, {
                  description: "\u672A\u627E\u5230\u9000\u6B3E\u7533\u8BF7\u8BB0\u5F55",
                  "image-size": 80
                })
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/orders/refund/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba2e4f28"]]);

export { index as default };
//# sourceMappingURL=index-BRVMzk_h.mjs.map
