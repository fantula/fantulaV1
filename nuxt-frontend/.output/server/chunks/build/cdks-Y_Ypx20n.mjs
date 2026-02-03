import { E as ElAlert } from './index-CcRd7O_1.mjs';
import { E as ElRadioGroup, a as ElRadioButton } from './index-B98GwqyH.mjs';
import { E as ElButton } from './index-B9iQGHXi.mjs';
import { E as ElTableColumn } from './index-DxpgyeZB.mjs';
import { E as ElTag } from './index-BV0Habum.mjs';
import { E as ElImage } from './index-BB-fMy6o.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { r as refresh_default, d as delete_default } from './index-4qszPKX4.mjs';
import { a as adminCdkApi } from './cdk-CHAe6x4V.mjs';
import { _ as _export_sfc } from './server.mjs';
import { A as AdminActionCard } from './AdminActionCard-BOXSA_sB.mjs';
import { A as AdminDataTable } from './AdminDataTable-BqGgkP12.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { E as ElMessage } from './index-CJUZrfXE.mjs';
import { E as ElMessageBox } from './index-Daa9EAVW.mjs';
import './icon-BcxG_YvU.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './objects-Bz74KHmq.mjs';
import './index-Byc6LUYX.mjs';
import '@vueuse/core';
import './vnode-C7bAOlXh.mjs';
import './index-CO6H4Lsj.mjs';
import './event-BZTOGHfp.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import './index-DqrhOzxH.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import '@ctrl/tinycolor';
import './index-DGjXPDlO.mjs';
import './index-D6r9Uwf3.mjs';
import '@popperjs/core';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-DrAKMEUO.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './typescript-D6L75muK.mjs';
import './index-ebnaz0b7.mjs';
import './scroll-Df9VGR5S.mjs';
import './index-D2CY7Ok3.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
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
import 'vue-router';
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
import './index-DL7T-Mp9.mjs';
import './index-EXqkolUp.mjs';
import './index-BQEe6ds6.mjs';
import './index-Db83VWJP.mjs';
import './strings-D1uxkXhq.mjs';
import './index-6YP9MNcL.mjs';
import './index-BDc7M6dy.mjs';
import './directive-D1M1s_ef.mjs';
import './index-NMCQtDk_.mjs';
import './validator-CGHVIElq.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cdks",
  __ssrInlineRender: true,
  setup(__props) {
    const { getProductTypeLabel, getProductTypeTag, getCdkStatusLabel, getCdkStatusType } = useBizConfig();
    const { formatDate } = useBizFormat();
    const loading = ref(false);
    const filterMode = ref("all");
    const cdks2 = ref([]);
    const selectedIds = ref([]);
    const loadCdks = async () => {
      loading.value = true;
      try {
        const res = await adminCdkApi.getCdks({ limit: 500 });
        if (res.success) {
          let data = res.cdks || [];
          if (filterMode.value === "unlinked") {
            data = data.filter((cdk) => !cdk.sku_mappings || cdk.sku_mappings.length === 0);
          }
          cdks2.value = data;
        } else {
          ElMessage.error(res.error);
        }
      } catch (e) {
        ElMessage.error(e.message || "\u52A0\u8F7D\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    const handleFilterChange = () => {
      loadCdks();
    };
    const getCdkTypeLabel = (type) => getProductTypeLabel(type);
    const getCdkTypeTag = (type) => getProductTypeTag(type);
    const getStatusLabel = (s) => getCdkStatusLabel(s);
    const getStatusType = (s) => getCdkStatusType(s);
    const formatSkuSpec = (spec) => {
      if (!spec) return "\u9ED8\u8BA4";
      return Object.values(spec).join(" / ");
    };
    const canSelectRow = (row) => !row.sku_mappings || row.sku_mappings.length === 0;
    const handleSelectionChange = (val) => {
      selectedIds.value = val.map((v) => v.id);
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("\u786E\u8BA4\u5220\u9664\u6B64\u672A\u7ED1\u5B9A\u7684\u5B64\u513F CDK \u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u6062\u590D\u3002", "\u8B66\u544A", { type: "warning" }).then(async () => {
        const res = await adminCdkApi.deleteCdk(row.id);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
          loadCdks();
        } else ElMessage.error(res.error);
      });
    };
    const handleBulkDelete = () => {
      if (!selectedIds.value.length) return;
      ElMessageBox.confirm(`\u786E\u8BA4\u6279\u91CF\u5220\u9664 ${selectedIds.value.length} \u4E2A\u5B64\u513F CDK\uFF1F`, "\u9AD8\u98CE\u9669\u64CD\u4F5C", {
        type: "error",
        confirmButtonText: "\u786E\u5B9A\u5220\u9664",
        cancelButtonText: "\u53D6\u6D88"
      }).then(async () => {
        const res = await adminCdkApi.deleteCdks(selectedIds.value);
        if (res.success) {
          ElMessage.success("\u6279\u91CF\u5220\u9664\u6210\u529F");
          selectedIds.value = [];
          loadCdks();
        } else ElMessage.error(res.error);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cdks-page" }, _attrs))} data-v-530c0261><div class="page-tip-header" data-v-530c0261>`);
      _push(ssrRenderComponent(_component_el_alert, {
        title: "\u6B64\u5904\u663E\u793A\u6240\u6709 CDK \u7269\u7406\u6570\u636E\u3002\u5EFA\u8BAE\u5B9A\u671F\u6E05\u7406\u672A\u7ED1\u5B9A SKU \u7684\u5B64\u513F CDK\u3002",
        type: "warning",
        "show-icon": "",
        closable: false,
        center: ""
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminActionCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="filter-group" data-v-530c0261${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_radio_group, {
              modelValue: filterMode.value,
              "onUpdate:modelValue": ($event) => filterMode.value = $event,
              onChange: handleFilterChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "all" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u5168\u90E8`);
                      } else {
                        return [
                          createTextVNode("\u5168\u90E8")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "unlinked" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u672A\u8FDE\u63A5`);
                      } else {
                        return [
                          createTextVNode("\u672A\u8FDE\u63A5")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_radio_button, { label: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("\u5168\u90E8")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "unlinked" }, {
                      default: withCtx(() => [
                        createTextVNode("\u672A\u8FDE\u63A5")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "filter-group" }, [
                createVNode(_component_el_radio_group, {
                  modelValue: filterMode.value,
                  "onUpdate:modelValue": ($event) => filterMode.value = $event,
                  onChange: handleFilterChange
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_radio_button, { label: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("\u5168\u90E8")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "unlinked" }, {
                      default: withCtx(() => [
                        createTextVNode("\u672A\u8FDE\u63A5")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: loadCdks,
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
            _push2(ssrRenderComponent(_component_el_button, {
              type: "danger",
              icon: unref(delete_default),
              disabled: !selectedIds.value.length,
              onClick: handleBulkDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u6279\u91CF\u5220\u9664 `);
                } else {
                  return [
                    createTextVNode(" \u6279\u91CF\u5220\u9664 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: loadCdks,
                icon: unref(refresh_default)
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "danger",
                icon: unref(delete_default),
                disabled: !selectedIds.value.length,
                onClick: handleBulkDelete
              }, {
                default: withCtx(() => [
                  createTextVNode(" \u6279\u91CF\u5220\u9664 ")
                ]),
                _: 1
              }, 8, ["icon", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AdminDataTable, {
        ref: "adminTableRef",
        data: cdks2.value,
        loading: loading.value,
        onSelectionChange: handleSelectionChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "selection",
              width: "55",
              selectable: canSelectRow
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "CDK \u7C7B\u578B",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: getCdkTypeTag(row.cdk_type)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(getCdkTypeLabel(row.cdk_type))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(getCdkTypeLabel(row.cdk_type)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: getCdkTypeTag(row.cdk_type)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getCdkTypeLabel(row.cdk_type)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7ED1\u5B9A\u5546\u54C1",
              "min-width": "200"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div class="product-cell" style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}" data-v-530c0261${_scopeId2}>`);
                  if ((_a = row.product_snapshot) == null ? void 0 : _a.product_image) {
                    _push3(ssrRenderComponent(_component_el_image, {
                      src: row.product_snapshot.product_image,
                      fit: "cover",
                      style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span class="product-name" data-v-530c0261${_scopeId2}>${ssrInterpolate(((_b = row.product_snapshot) == null ? void 0 : _b.product_name) || "\u672A\u77E5\u5546\u54C1")}</span></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "product-cell",
                      style: { "display": "flex", "align-items": "center" }
                    }, [
                      ((_c = row.product_snapshot) == null ? void 0 : _c.product_image) ? (openBlock(), createBlock(_component_el_image, {
                        key: 0,
                        src: row.product_snapshot.product_image,
                        fit: "cover",
                        style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", { class: "product-name" }, toDisplayString(((_d = row.product_snapshot) == null ? void 0 : _d.product_name) || "\u672A\u77E5\u5546\u54C1"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7ED1\u5B9A SKU",
              "min-width": "160"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.sku_mappings && row.sku_mappings.length > 0) {
                    _push3(`<div class="linked-skus" data-v-530c0261${_scopeId2}><!--[-->`);
                    ssrRenderList(row.sku_mappings.slice(0, 2), (mapping) => {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        key: mapping.id,
                        size: "small",
                        effect: "plain",
                        style: { "margin-right": "4px" }
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          var _a, _b;
                          if (_push4) {
                            _push4(`${ssrInterpolate(formatSkuSpec((_a = mapping.sku) == null ? void 0 : _a.spec_combination))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(formatSkuSpec((_b = mapping.sku) == null ? void 0 : _b.spec_combination)), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (row.sku_mappings.length > 2) {
                      _push3(`<span class="more-tag" data-v-530c0261${_scopeId2}>+${ssrInterpolate(row.sku_mappings.length - 2)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_el_tag, {
                      type: "danger",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u672A\u7ED1\u5B9A`);
                        } else {
                          return [
                            createTextVNode("\u672A\u7ED1\u5B9A")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row.sku_mappings && row.sku_mappings.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "linked-skus"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.sku_mappings.slice(0, 2), (mapping) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: mapping.id,
                          size: "small",
                          effect: "plain",
                          style: { "margin-right": "4px" }
                        }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString(formatSkuSpec((_a = mapping.sku) == null ? void 0 : _a.spec_combination)), 1)
                            ];
                          }),
                          _: 2
                        }, 1024);
                      }), 128)),
                      row.sku_mappings.length > 2 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "more-tag"
                      }, "+" + toDisplayString(row.sku_mappings.length - 2), 1)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock(_component_el_tag, {
                      key: 1,
                      type: "danger",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u672A\u7ED1\u5B9A")
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5185\u5BB9",
              "min-width": "180"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="code-text" data-v-530c0261${_scopeId2}>${ssrInterpolate(row.code || "-")}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "code-text" }, toDisplayString(row.code || "-"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u5E93\u5B58",
              width: "80",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<span data-v-530c0261${_scopeId2}>${ssrInterpolate((_a = row.stock) != null ? _a : 1)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString((_b = row.stock) != null ? _b : 1), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
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
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "180",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="time-text" data-v-530c0261${_scopeId2}>${ssrInterpolate(unref(formatDate)(row.created_at))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "time-text" }, toDisplayString(unref(formatDate)(row.created_at)), 1)
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
                  if (!row.sku_mappings || row.sku_mappings.length === 0) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      type: "danger",
                      link: "",
                      size: "small",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5220\u9664`);
                        } else {
                          return [
                            createTextVNode("\u5220\u9664")
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
                    !row.sku_mappings || row.sku_mappings.length === 0 ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      type: "danger",
                      link: "",
                      size: "small",
                      onClick: ($event) => handleDelete(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5220\u9664")
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
                selectable: canSelectRow
              }),
              createVNode(_component_el_table_column, {
                label: "CDK \u7C7B\u578B",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: getCdkTypeTag(row.cdk_type)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(getCdkTypeLabel(row.cdk_type)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u7ED1\u5B9A\u5546\u54C1",
                "min-width": "200"
              }, {
                default: withCtx(({ row }) => {
                  var _a, _b;
                  return [
                    createVNode("div", {
                      class: "product-cell",
                      style: { "display": "flex", "align-items": "center" }
                    }, [
                      ((_a = row.product_snapshot) == null ? void 0 : _a.product_image) ? (openBlock(), createBlock(_component_el_image, {
                        key: 0,
                        src: row.product_snapshot.product_image,
                        fit: "cover",
                        style: { "width": "40px", "height": "40px", "border-radius": "4px", "margin-right": "8px", "flex-shrink": "0" }
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("span", { class: "product-name" }, toDisplayString(((_b = row.product_snapshot) == null ? void 0 : _b.product_name) || "\u672A\u77E5\u5546\u54C1"), 1)
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u7ED1\u5B9A SKU",
                "min-width": "160"
              }, {
                default: withCtx(({ row }) => [
                  row.sku_mappings && row.sku_mappings.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "linked-skus"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.sku_mappings.slice(0, 2), (mapping) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: mapping.id,
                        size: "small",
                        effect: "plain",
                        style: { "margin-right": "4px" }
                      }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString(formatSkuSpec((_a = mapping.sku) == null ? void 0 : _a.spec_combination)), 1)
                          ];
                        }),
                        _: 2
                      }, 1024);
                    }), 128)),
                    row.sku_mappings.length > 2 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "more-tag"
                    }, "+" + toDisplayString(row.sku_mappings.length - 2), 1)) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock(_component_el_tag, {
                    key: 1,
                    type: "danger",
                    effect: "plain",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u672A\u7ED1\u5B9A")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5185\u5BB9",
                "min-width": "180"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "code-text" }, toDisplayString(row.code || "-"), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u5E93\u5B58",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }) => {
                  var _a;
                  return [
                    createVNode("span", null, toDisplayString((_a = row.stock) != null ? _a : 1), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(_component_el_table_column, {
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
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", { class: "time-text" }, toDisplayString(unref(formatDate)(row.created_at)), 1)
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
                  !row.sku_mappings || row.sku_mappings.length === 0 ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "danger",
                    link: "",
                    size: "small",
                    onClick: ($event) => handleDelete(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5220\u9664")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/cdk/cdks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cdks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-530c0261"]]);

export { cdks as default };
//# sourceMappingURL=cdks-Y_Ypx20n.mjs.map
