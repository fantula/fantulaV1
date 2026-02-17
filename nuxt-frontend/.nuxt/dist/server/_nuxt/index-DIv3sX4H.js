import { E as ElButton } from "./index-CXu9YNCC.js";
import { E as ElTableColumn } from "./index-D6Ug0Zge.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import { E as ElSwitch } from "./index-ByWmxDYy.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                    */
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { M as refresh_default } from "./index-DNnPa_Q9.js";
import { A as AdminDataTable } from "./AdminDataTable-B-yPQpXr.js";
import { a as adminRoute } from "./admin-routes-C0qcXhse.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { f as useRouter, _ as _export_sfc } from "../server.mjs";
import { u as useFetch } from "./fetch-Dk_hX_ae.js";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import "./icon-Ck0_dGQP.js";
import "./index-DbvZsXcZ.js";
import "lodash-unified";
import "@vue/shared";
import "./index-_zadwVDN.js";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C5kRDPtv.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-BAMVq552.js";
import "./index-Cxdfotkm.js";
import "./index-bphs7bB3.js";
import "@popperjs/core";
import "./index-ByGmkA5C.js";
import "./event-D3FEo2C5.js";
import "./aria-Rs9hkxop.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./index-NROOS5rD.js";
import "./event-BZTOGHfp.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-BZYOvvAA.js";
import "./index-BRSsuUkY.js";
import "./index-D9RjcsL2.js";
import "./index-B_mQW-wd.js";
import "./strings-D1uxkXhq.js";
import "./scroll-BEbqb1sm.js";
import "./index-BeH2PDwZ.js";
import "./typescript-D6L75muK.js";
import "./index-DuyRWKSc.js";
import "./index-C8YaaWrc.js";
import "./vnode-uc6o_sOa.js";
import "./directive-BHLqqXUb.js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter();
    const { data: res, pending, refresh, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/system/notifications/templates",
      "$HS1FYbMd1V"
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
          "$K2tvB-xEfL"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "notification-list-page" }, _attrs))} data-v-ec04fab7><div class="page-header" data-v-ec04fab7><h3 data-v-ec04fab7>邮件通知配置</h3>`);
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
                    onClick: ($event) => unref(router).push(unref(adminRoute)(`backend-settings/notification/template/${row.id}`))
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
                      onClick: ($event) => unref(router).push(unref(adminRoute)(`backend-settings/notification/template/${row.id}`))
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
                    onClick: ($event) => unref(router).push(unref(adminRoute)(`backend-settings/notification/template/${row.id}`))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manager_portal/backend-settings/notification/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ec04fab7"]]);
export {
  index as default
};
//# sourceMappingURL=index-DIv3sX4H.js.map
