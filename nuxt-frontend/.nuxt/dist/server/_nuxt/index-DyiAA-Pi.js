import { E as ElButton } from "./index-DV2Xa1Kj.js";
import { E as ElTableColumn } from "./index-ghXUvVLW.js";
import { E as ElTag } from "./index-CzsgKIaa.js";
import { E as ElSwitch } from "./index-Cdq-rMDq.js";
/* empty css              */
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                    */
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as refresh_default } from "./index-DuV_oMrC.js";
import { A as AdminDataTable } from "./AdminDataTable-CJO5xpdf.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useRouter, _ as _export_sfc } from "../server.mjs";
import { u as useFetch } from "./fetch-x0v8Ka9T.js";
import { E as ElMessage } from "./index-Ho-fELR6.js";
import "./icon-CyvpkMdQ.js";
import "./index-xMedQC9S.js";
import "lodash-unified";
import "@vue/shared";
import "./index-CsSUb8pm.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-Dt87SALX.js";
import "./use-form-item-VP6j78iG.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-CVMnQJck.js";
import "./index-C88l1uRA.js";
import "./index-B8mpCVSS.js";
import "@popperjs/core";
import "./focus-trap.vue-CG7JU5b_.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-7GSISQj3.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-B2QmXMzy.js";
import "./index-B_8BWUnE.js";
import "./index-BDljrZG0.js";
import "./index-z3smHzuf.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DHYrZ40v.js";
import "./index-DHiqjM1w.js";
import "./typescript-D6L75muK.js";
import "./index-Cy25Tved.js";
import "./index-BKas9GMw.js";
import "./vnode-BKSxKQVt.js";
import "./directive-DOWfgPYe.js";
/* empty css                    */
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                       */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
import "./asyncData-BY91Pj36.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
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
    const templates = computed(() => res.value?.data || []);
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
          ElMessage.error(error2.value.statusMessage || "更新失败");
          row.is_enabled = !row.is_enabled;
        } else {
          ElMessage.success("更新成功");
        }
      } catch (e) {
        ElMessage.error("更新失败");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "notification-list-page" }, _attrs))} data-v-2ee9da4d><div class="page-header" data-v-2ee9da4d><h3 data-v-2ee9da4d>邮件通知配置</h3>`);
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
              label: "通知名称",
              "min-width": "150"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "event_type",
              label: "事件类型",
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
              label: "启用状态",
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
              label: "操作",
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
                        _push4(` 编辑模板 `);
                      } else {
                        return [
                          createTextVNode(" 编辑模板 ")
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
                        createTextVNode(" 编辑模板 ")
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
                label: "通知名称",
                "min-width": "150"
              }),
              createVNode(_component_el_table_column, {
                prop: "event_type",
                label: "事件类型",
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
                label: "启用状态",
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
                label: "操作",
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
                      createTextVNode(" 编辑模板 ")
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
export {
  index as default
};
//# sourceMappingURL=index-DyiAA-Pi.js.map
