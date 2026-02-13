import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElTag } from './index-CzsgKIaa.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { r as refresh_default } from './index-DuV_oMrC.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-x0v8Ka9T.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
import './icon-CyvpkMdQ.mjs';
import './index-xMedQC9S.mjs';
import 'lodash-unified';
import '@vue/shared';
import './index-CsSUb8pm.mjs';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './use-global-config-Dt87SALX.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-CVMnQJck.mjs';
import './index-C88l1uRA.mjs';
import './index-B8mpCVSS.mjs';
import '@popperjs/core';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-7GSISQj3.mjs';
import './event-BZTOGHfp.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './validator-B2QmXMzy.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './index-z3smHzuf.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DHYrZ40v.mjs';
import './index-DHiqjM1w.mjs';
import './typescript-D6L75muK.mjs';
import './index-Cy25Tved.mjs';
import './index-BKas9GMw.mjs';
import './vnode-BKSxKQVt.mjs';
import './directive-DOWfgPYe.mjs';
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
import './asyncData-BY91Pj36.mjs';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter();
    const { data: res, pending, refresh, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/system/notifications/templates",
      "$VfNP824Zet"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const templates = computed(() => {
      var _a;
      return ((_a = res.value) == null ? void 0 : _a.data) || [];
    });
    const handleToggle = async (row) => {
      row.updating = true;
      try {
        const { error: error2 } = await useFetch(
          "/api/admin/system/notifications/templates",
          {
            method: "POST",
            body: {
              id: row.id,
              event_type: row.event_type,
              // Required by validation
              is_enabled: row.is_enabled
            }
          },
          "$t2m6miOm7P"
          /* nuxt-injected */
        );
        if (error2.value) {
          ElMessage.error(error2.value.statusMessage || "\u66F4\u65B0\u5931\u8D25");
          row.is_enabled = !row.is_enabled;
        } else {
          ElMessage.success("\u66F4\u65B0\u6210\u529F");
        }
      } catch (e) {
        ElMessage.error("\u66F4\u65B0\u5931\u8D25");
        row.is_enabled = !row.is_enabled;
      } finally {
        row.updating = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "notification-list-page" }, _attrs))} data-v-2ee9da4d><div class="page-header" data-v-2ee9da4d><h3 data-v-2ee9da4d>\u90AE\u4EF6\u901A\u77E5\u914D\u7F6E</h3>`);
      _push(ssrRenderComponent(_component_el_button, {
        icon: unref(refresh_default),
        circle: "",
        onClick: () => unref(refresh)(),
        loading: unref(pending)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminDataTable, {
        data: unref(templates),
        loading: unref(pending),
        total: unref(templates).length,
        "show-pagination": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "\u901A\u77E5\u540D\u79F0",
              "min-width": "150"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "event_type",
              label: "\u4E8B\u4EF6\u7C7B\u578B",
              "min-width": "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.event_type)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.event_type), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.event_type), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u542F\u7528\u72B6\u6001",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: row.is_enabled,
                    "onUpdate:modelValue": ($event) => row.is_enabled = $event,
                    loading: row.updating,
                    onChange: ($event) => handleToggle(row)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: row.is_enabled,
                      "onUpdate:modelValue": ($event) => row.is_enabled = $event,
                      loading: row.updating,
                      onChange: ($event) => handleToggle(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              width: "120",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    link: "",
                    onClick: ($event) => unref(router).push(`/admin/backend-settings/notification/template/${row.id}`)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u7F16\u8F91\u6A21\u677F `);
                      } else {
                        return [
                          createTextVNode(" \u7F16\u8F91\u6A21\u677F ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      link: "",
                      onClick: ($event) => unref(router).push(`/admin/backend-settings/notification/template/${row.id}`)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u7F16\u8F91\u6A21\u677F ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "\u901A\u77E5\u540D\u79F0",
                "min-width": "150"
              }),
              createVNode(_component_el_table_column, {
                prop: "event_type",
                label: "\u4E8B\u4EF6\u7C7B\u578B",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(row.event_type), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u542F\u7528\u72B6\u6001",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_switch, {
                    modelValue: row.is_enabled,
                    "onUpdate:modelValue": ($event) => row.is_enabled = $event,
                    loading: row.updating,
                    onChange: ($event) => handleToggle(row)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    link: "",
                    onClick: ($event) => unref(router).push(`/admin/backend-settings/notification/template/${row.id}`)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u7F16\u8F91\u6A21\u677F ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/backend-settings/notification/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ee9da4d"]]);

export { index as default };
//# sourceMappingURL=index-DyiAA-Pi.mjs.map
