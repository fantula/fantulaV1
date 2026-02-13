import { P as PageTipHeader } from './PageTipHeader-Dofk1SFn.mjs';
import { A as AdminActionCard } from './AdminActionCard-CU3C31Qp.mjs';
import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { _ as __nuxt_component_3 } from './AdminPageSkeleton-CfSn-sLw.mjs';
import { A as AdminDataTable } from './AdminDataTable-CJO5xpdf.mjs';
import { E as ElTableColumn } from './index-ghXUvVLW.mjs';
import { E as ElTag } from './index-CzsgKIaa.mjs';
import { E as ElSwitch } from './index-Cdq-rMDq.mjs';
import { E as ElPopconfirm } from './index-BgZQaa6r.mjs';
import { A as AdminDataDialog } from './AdminDataDialog-DdPeAUNy.mjs';
import { E as ElForm, a as ElFormItem } from './index-Bd_1JmUc.mjs';
import { E as ElInput } from './index-DHiqjM1w.mjs';
import { E as ElSelect, a as ElOption } from './index-z3smHzuf.mjs';
import { E as ElRadioGroup, b as ElRadio } from './index-B0BxvWGE.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { r as refresh_default, p as plus_default } from './index-DuV_oMrC.mjs';
import { c as adminBackendUserApi, d as adminDepartmentApi } from './index-CUCx8vYk.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { u as useAdminDialog } from './useAdminDialog-DGlLxLb0.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';
import { _ as _export_sfc } from './server.mjs';
import './index-B4LZdJVK.mjs';
import './icon-CyvpkMdQ.mjs';
import './objects-Bz74KHmq.mjs';
import 'lodash-unified';
import './index-CsSUb8pm.mjs';
import '@vueuse/core';
import '@vue/shared';
import './vnode-BKSxKQVt.mjs';
import './index-BWwwK9Wh.mjs';
import './index-xMedQC9S.mjs';
import './use-global-config-Dt87SALX.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-CC2EaJo5.mjs';
import './index-BEa-tZoO.mjs';
import './typescript-D6L75muK.mjs';
import './index-B_8BWUnE.mjs';
import './index-BDljrZG0.mjs';
import './event-BZTOGHfp.mjs';
import './directive-DOWfgPYe.mjs';
import './index-CVMnQJck.mjs';
import './index-C88l1uRA.mjs';
import './index-B8mpCVSS.mjs';
import '@popperjs/core';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-7GSISQj3.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './validator-B2QmXMzy.mjs';
import './index-CcOBk9kW.mjs';
import './index-wSws2F9U.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-CC_9xuAU.mjs';
import './scroll-DHYrZ40v.mjs';
import 'async-validator';
import './index-Cy25Tved.mjs';
import './strings-D1uxkXhq.mjs';
import './index-BKas9GMw.mjs';
import './supabase-admin-Yv96kmWU.mjs';
import '@supabase/supabase-js';
import './cdk-BcOf0oEp.mjs';
import './coupon-DnjcrSN8.mjs';
import './media-DksayCA2.mjs';
import './order-BDjtswS6.mjs';
import './index-CJRqI9Bk.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "UserAccounts"
  },
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatDate } = useBizFormat();
    const initLoading = ref(true);
    const loading = ref(false);
    ref(false);
    const users = ref([]);
    const departments = ref([]);
    const selectedIds = ref([]);
    const userRules = reactive({
      name: [{ required: true, message: "\u8BF7\u8F93\u5165\u540D\u79F0", trigger: "blur" }],
      email: [
        { required: true, message: "\u8BF7\u8F93\u5165\u90AE\u7BB1", trigger: "blur" },
        { type: "email", message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E", trigger: "blur" }
      ],
      password: [{ required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" }],
      department_id: [{ required: true, message: "\u8BF7\u9009\u62E9\u90E8\u95E8", trigger: "change" }]
    });
    const dialog = useAdminDialog({
      id: "",
      name: "",
      email: "",
      password: "",
      department_id: "",
      status: "enabled"
    }, {
      onSubmit: async (form, isEdit) => {
        const payload = { ...form };
        if (isEdit) {
          if (!payload.password) delete payload.password;
          return await adminBackendUserApi.updateUser(form.id, payload);
        } else {
          return await adminBackendUserApi.createUser(payload);
        }
      },
      onSuccess: async () => {
        await loadUsers();
      }
    });
    const loadUsers = async () => {
      loading.value = true;
      try {
        const result = await adminBackendUserApi.getUsers();
        if (result.success) {
          users.value = result.users;
        }
      } catch (e) {
        ElMessage.error(e.message || "\u52A0\u8F7D\u7528\u6237\u5931\u8D25");
      } finally {
        loading.value = false;
        initLoading.value = false;
      }
    };
    const loadDepartments = async () => {
      try {
        const result = await adminDepartmentApi.getDepartments();
        if (result.success) {
          departments.value = result.departments;
        }
      } catch (e) {
        ElMessage.error(e.message || "\u52A0\u8F7D\u90E8\u95E8\u5931\u8D25");
      }
    };
    const handleSelectionChange = (rows) => {
      selectedIds.value = rows.map((r) => r.id);
    };
    const openAddUserDialog = async () => {
      userRules.password = [{ required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" }];
      dialog.openAdd();
      await loadDepartments();
    };
    const openEditUserDialog = (row) => {
      userRules.password = [];
      dialog.openEdit({
        ...row,
        password: "",
        // 清空密码字段
        department_id: row.department_id || ""
      });
    };
    const handleUserStatusChange = async (row) => {
      row.statusLoading = true;
      try {
        const result = await adminBackendUserApi.updateUser(row.id, { status: row.status });
        if (result.success) {
          ElMessage.success(row.status === "enabled" ? "\u7528\u6237\u5DF2\u542F\u7528" : "\u7528\u6237\u5DF2\u505C\u7528");
        } else {
          row.status = row.status === "enabled" ? "disabled" : "enabled";
          ElMessage.error(result.error || "\u64CD\u4F5C\u5931\u8D25");
        }
      } catch (e) {
        row.status = row.status === "enabled" ? "disabled" : "enabled";
        ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
      } finally {
        row.statusLoading = false;
      }
    };
    const handleDeleteUser = async (row) => {
      const result = await adminBackendUserApi.deleteUser(row.id);
      if (result.success) {
        ElMessage.success("\u5220\u9664\u6210\u529F");
        await loadUsers();
      } else {
        ElMessage.error(result.error || "\u5220\u9664\u5931\u8D25");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageTipHeader = PageTipHeader;
      const _component_AdminActionCard = AdminActionCard;
      const _component_el_button = ElButton;
      const _component_AdminPageSkeleton = __nuxt_component_3;
      const _component_AdminDataTable = AdminDataTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _component_el_popconfirm = ElPopconfirm;
      const _component_AdminDataDialog = AdminDataDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-bec01ca7>`);
      _push(ssrRenderComponent(_component_PageTipHeader, {
        title: "\u7528\u6237\u7BA1\u7406",
        description: "\u7BA1\u7406\u540E\u53F0\u7BA1\u7406\u5458\u8D26\u53F7\uFF0C\u5206\u914D\u90E8\u95E8\u4E0E\u6743\u9650"
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: loadUsers
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
              type: "primary",
              icon: unref(plus_default),
              onClick: openAddUserDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u65B0\u589E\u7528\u6237`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u7528\u6237")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: loadUsers
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddUserDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("\u65B0\u589E\u7528\u6237")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (initLoading.value) {
        _push(ssrRenderComponent(_component_AdminPageSkeleton, { type: "list" }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_AdminDataTable, {
          loading: loading.value,
          data: users.value,
          onSelectionChange: handleSelectionChange
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                type: "selection",
                width: "55"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                prop: "name",
                label: "\u7528\u6237\u540D\u79F0",
                "min-width": "150"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                prop: "email",
                label: "\u7ED1\u5B9A\u90AE\u7BB1",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "\u6240\u5C5E\u90E8\u95E8",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    if (row.department) {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        type: ((_a = row.department) == null ? void 0 : _a.name) === "\u8D85\u7EA7\u7BA1\u7406\u5458" ? "danger" : void 0
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          var _a2, _b2;
                          if (_push4) {
                            _push4(`${ssrInterpolate(((_a2 = row.department) == null ? void 0 : _a2.name) || "\u65E0\u90E8\u95E8")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(((_b2 = row.department) == null ? void 0 : _b2.name) || "\u65E0\u90E8\u95E8"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<span class="text-gray" data-v-bec01ca7${_scopeId2}>\u65E0\u90E8\u95E8</span>`);
                    }
                  } else {
                    return [
                      row.department ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: ((_b = row.department) == null ? void 0 : _b.name) === "\u8D85\u7EA7\u7BA1\u7406\u5458" ? "danger" : void 0
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString(((_a2 = row.department) == null ? void 0 : _a2.name) || "\u65E0\u90E8\u95E8"), 1)
                          ];
                        }),
                        _: 2
                      }, 1032, ["type"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-gray"
                      }, "\u65E0\u90E8\u95E8"))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "\u72B6\u6001",
                width: "120",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "active-value": "enabled",
                      "inactive-value": "disabled",
                      loading: row.statusLoading,
                      onChange: ($event) => handleUserStatusChange(row)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_switch, {
                        modelValue: row.status,
                        "onUpdate:modelValue": ($event) => row.status = $event,
                        "active-value": "enabled",
                        "inactive-value": "disabled",
                        loading: row.statusLoading,
                        onChange: ($event) => handleUserStatusChange(row)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
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
                    _push3(`${ssrInterpolate(unref(formatDate)(row.created_at))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "150",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => openEditUserDialog(row)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u7F16\u8F91`);
                        } else {
                          return [
                            createTextVNode("\u7F16\u8F91")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_popconfirm, {
                      title: `\u786E\u8BA4\u5220\u9664\u7528\u6237 '${row.name}' \u5417\uFF1F`,
                      onConfirm: ($event) => handleDeleteUser(row)
                    }, {
                      reference: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_button, {
                            link: "",
                            type: "danger"
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u5220\u9664`);
                              } else {
                                return [
                                  createTextVNode("\u5220\u9664")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_button, {
                              link: "",
                              type: "danger"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5220\u9664")
                              ]),
                              _: 1
                            })
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
                        onClick: ($event) => openEditUserDialog(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7F16\u8F91")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_popconfirm, {
                        title: `\u786E\u8BA4\u5220\u9664\u7528\u6237 '${row.name}' \u5417\uFF1F`,
                        onConfirm: ($event) => handleDeleteUser(row)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "danger"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u5220\u9664")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "onConfirm"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_table_column, {
                  type: "selection",
                  width: "55"
                }),
                createVNode(_component_el_table_column, {
                  prop: "name",
                  label: "\u7528\u6237\u540D\u79F0",
                  "min-width": "150"
                }),
                createVNode(_component_el_table_column, {
                  prop: "email",
                  label: "\u7ED1\u5B9A\u90AE\u7BB1",
                  "min-width": "200",
                  "show-overflow-tooltip": ""
                }),
                createVNode(_component_el_table_column, {
                  label: "\u6240\u5C5E\u90E8\u95E8",
                  width: "180",
                  align: "center"
                }, {
                  default: withCtx(({ row }) => {
                    var _a;
                    return [
                      row.department ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: ((_a = row.department) == null ? void 0 : _a.name) === "\u8D85\u7EA7\u7BA1\u7406\u5458" ? "danger" : void 0
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createTextVNode(toDisplayString(((_a2 = row.department) == null ? void 0 : _a2.name) || "\u65E0\u90E8\u95E8"), 1)
                          ];
                        }),
                        _: 2
                      }, 1032, ["type"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-gray"
                      }, "\u65E0\u90E8\u95E8"))
                    ];
                  }),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  label: "\u72B6\u6001",
                  width: "120",
                  align: "center"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_switch, {
                      modelValue: row.status,
                      "onUpdate:modelValue": ($event) => row.status = $event,
                      "active-value": "enabled",
                      "inactive-value": "disabled",
                      loading: row.statusLoading,
                      onChange: ($event) => handleUserStatusChange(row)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "loading", "onChange"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  label: "\u521B\u5EFA\u65F6\u95F4",
                  width: "180",
                  align: "center"
                }, {
                  default: withCtx(({ row }) => [
                    createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  label: "\u64CD\u4F5C",
                  width: "150",
                  fixed: "right",
                  align: "center"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      onClick: ($event) => openEditUserDialog(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u7F16\u8F91")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: `\u786E\u8BA4\u5220\u9664\u7528\u6237 '${row.name}' \u5417\uFF1F`,
                      onConfirm: ($event) => handleDeleteUser(row)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u5220\u9664")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "onConfirm"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(_component_AdminDataDialog, {
        modelValue: unref(dialog).visible.value,
        "onUpdate:modelValue": ($event) => unref(dialog).visible.value = $event,
        title: unref(dialog).isEdit.value ? "\u7F16\u8F91\u7528\u6237" : "\u65B0\u589E\u7528\u6237",
        loading: unref(dialog).loading.value,
        onConfirm: unref(dialog).submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: unref(dialog).form,
              rules: userRules,
              ref: unref(dialog).formRef,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u7528\u6237\u540D\u79F0",
                    prop: "name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.name,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u7ED1\u5B9A\u90AE\u7BB1",
                    prop: "email"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(dialog).form.email,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                          disabled: unref(dialog).isEdit.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(dialog).form.email,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.email = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                            disabled: unref(dialog).isEdit.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!unref(dialog).isEdit.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "\u5BC6\u7801",
                      prop: "password"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: unref(dialog).form.password,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.password = $event,
                            type: "password",
                            placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                            "show-password": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: unref(dialog).form.password,
                              "onUpdate:modelValue": ($event) => unref(dialog).form.password = $event,
                              type: "password",
                              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                              "show-password": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u6240\u5C5E\u90E8\u95E8",
                    prop: "department_id"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: unref(dialog).form.department_id,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.department_id = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u90E8\u95E8",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(departments.value, (dept) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: dept.id,
                                  label: dept.name,
                                  value: dept.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: dept.id,
                                    label: dept.name,
                                    value: dept.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: unref(dialog).form.department_id,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.department_id = $event,
                            placeholder: "\u8BF7\u9009\u62E9\u90E8\u95E8",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: dept.id,
                                  label: dept.name,
                                  value: dept.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u72B6\u6001",
                    prop: "status"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_radio_group, {
                          modelValue: unref(dialog).form.status,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_radio, { value: "enabled" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u542F\u7528`);
                                  } else {
                                    return [
                                      createTextVNode("\u542F\u7528")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_radio, { value: "disabled" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u7981\u7528`);
                                  } else {
                                    return [
                                      createTextVNode("\u7981\u7528")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_radio, { value: "enabled" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u542F\u7528")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { value: "disabled" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u7981\u7528")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_radio_group, {
                            modelValue: unref(dialog).form.status,
                            "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { value: "enabled" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u542F\u7528")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "disabled" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u7981\u7528")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u7528\u6237\u540D\u79F0",
                      prop: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.name,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u7ED1\u5B9A\u90AE\u7BB1",
                      prop: "email"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.email,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                          disabled: unref(dialog).isEdit.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    !unref(dialog).isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "\u5BC6\u7801",
                      prop: "password"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(dialog).form.password,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.password = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_form_item, {
                      label: "\u6240\u5C5E\u90E8\u95E8",
                      prop: "department_id"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: unref(dialog).form.department_id,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.department_id = $event,
                          placeholder: "\u8BF7\u9009\u62E9\u90E8\u95E8",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: dept.id,
                                label: dept.name,
                                value: dept.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u72B6\u6001",
                      prop: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_radio_group, {
                          modelValue: unref(dialog).form.status,
                          "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_radio, { value: "enabled" }, {
                              default: withCtx(() => [
                                createTextVNode("\u542F\u7528")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_radio, { value: "disabled" }, {
                              default: withCtx(() => [
                                createTextVNode("\u7981\u7528")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: unref(dialog).form,
                rules: userRules,
                ref: unref(dialog).formRef,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u7528\u6237\u540D\u79F0",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.name,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.name = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u7ED1\u5B9A\u90AE\u7BB1",
                    prop: "email"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.email,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.email = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                        disabled: unref(dialog).isEdit.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  !unref(dialog).isEdit.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "\u5BC6\u7801",
                    prop: "password"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(dialog).form.password,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, {
                    label: "\u6240\u5C5E\u90E8\u95E8",
                    prop: "department_id"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: unref(dialog).form.department_id,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.department_id = $event,
                        placeholder: "\u8BF7\u9009\u62E9\u90E8\u95E8",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: dept.id,
                              label: dept.name,
                              value: dept.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u72B6\u6001",
                    prop: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio_group, {
                        modelValue: unref(dialog).form.status,
                        "onUpdate:modelValue": ($event) => unref(dialog).form.status = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio, { value: "enabled" }, {
                            default: withCtx(() => [
                              createTextVNode("\u542F\u7528")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_radio, { value: "disabled" }, {
                            default: withCtx(() => [
                              createTextVNode("\u7981\u7528")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "rules"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/accounts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bec01ca7"]]);

export { index as default };
//# sourceMappingURL=index-CgPRnLzT.mjs.map
