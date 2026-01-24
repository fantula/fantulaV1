import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElSkeleton } from './index-BXD0oWDt.mjs';
import { A as AdminDataTable } from './AdminDataTable-BzMTthVf.mjs';
import { E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElSwitch } from './index-_GccYHgs.mjs';
import { E as ElPopconfirm } from './index-C6eLVC7y.mjs';
import { E as ElDialog } from './index-CzosOSMt.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { E as ElRadioGroup, b as ElRadio } from './index-5s1BkUoL.mjs';
import { _ as _export_sfc, b9 as refresh_default, p as plus_default, ah as ElMessage, by as getAdminSupabaseClient } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { a as adminDepartmentApi } from './department-BOjp2i2p.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import './index-DvOrIhmd.mjs';
import './vnode-D0IHQw_9.mjs';
import '@vue/shared';
import './index-QnhSR2oe.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-DKY_z0U1.mjs';
import './index-Da73tUO2.mjs';
import 'lodash-unified';
import './event-BZTOGHfp.mjs';
import './directive-tOiqatq5.mjs';
import '@vueuse/core';
import './index-D_b573Qt.mjs';
import './index-Dxw_X3Hq.mjs';
import './index-CIoWkt90.mjs';
import '@popperjs/core';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-BlpH41lu.mjs';
import './raf-CQRaPAjg.mjs';
import 'normalize-wheel-es';
import './validator-T0bsmJHo.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
import 'async-validator';
import './index-ClPmkyX9.mjs';
import './strings-D1uxkXhq.mjs';
import './index-DCrMmn3b.mjs';
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
import '@supabase/supabase-js';
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

const adminBackendUserApi = {
  /**
   * 获取后台用户列表
   */
  async getUsers() {
    const client = getAdminSupabaseClient();
    const { data, error } = await client.from("admin_users").select(`
                *,
                department:admin_departments(id, name, permissions)
            `).order("created_at", { ascending: false });
    if (error) {
      return { success: false, users: [], error: error.message };
    }
    return { success: true, users: data || [] };
  },
  /**
   * 创建后台用户
   * 1. 创建 Supabase Auth 用户（支持密码登录）
   * 2. 创建 admin_users 记录并关联 auth_user_id
   */
  async createUser(data) {
    var _a, _b;
    const client = getAdminSupabaseClient();
    const { data: authData, error: authError } = await client.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      // 跳过邮箱验证，直接确认
      user_metadata: {
        name: data.name,
        role: "admin"
      }
    });
    if (authError) {
      if (authError.message.includes("already been registered")) {
        return { success: false, error: "\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u6CE8\u518C" };
      }
      return { success: false, error: `\u521B\u5EFA\u8BA4\u8BC1\u7528\u6237\u5931\u8D25: ${authError.message}` };
    }
    if (!authData.user) {
      return { success: false, error: "\u521B\u5EFA\u8BA4\u8BC1\u7528\u6237\u5931\u8D25\uFF1A\u672A\u8FD4\u56DE\u7528\u6237\u4FE1\u606F" };
    }
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(data.password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const password_hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const { data: user, error } = await client.from("admin_users").insert({
      name: data.name,
      email: data.email,
      password_hash,
      // 保留以兼容数据库约束
      auth_user_id: authData.user.id,
      // 关键：关联 Auth 用户
      department_id: (_a = data.department_id) != null ? _a : null,
      status: (_b = data.status) != null ? _b : "enabled"
    }).select().single();
    if (error) {
      await client.auth.admin.deleteUser(authData.user.id);
      return { success: false, error: `\u521B\u5EFA\u7BA1\u7406\u5458\u8BB0\u5F55\u5931\u8D25: ${error.message}` };
    }
    return { success: true, user };
  },
  /**
   * 更新后台用户
   */
  async updateUser(id, data) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("admin_users").update(data).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除后台用户
   * 1. 获取 auth_user_id
   * 2. 删除 admin_users 记录
   * 3. 删除 Supabase Auth 用户
   */
  async deleteUser(id) {
    const client = getAdminSupabaseClient();
    const { data: adminUser, error: fetchError } = await client.from("admin_users").select("auth_user_id").eq("id", id).single();
    if (fetchError) {
      return { success: false, error: `\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25: ${fetchError.message}` };
    }
    const authUserId = adminUser == null ? void 0 : adminUser.auth_user_id;
    const { error } = await client.from("admin_users").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    if (authUserId) {
      const { error: authDeleteError } = await client.auth.admin.deleteUser(authUserId);
      if (authDeleteError) {
        console.warn(`\u5220\u9664 Auth \u7528\u6237\u5931\u8D25 (${authUserId}):`, authDeleteError.message);
      }
    }
    return { success: true };
  }
};
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
    const submitting = ref(false);
    const users = ref([]);
    const departments = ref([]);
    const selectedIds = ref([]);
    const userDialogVisible = ref(false);
    const isEditUser = ref(false);
    const userFormRef = ref();
    const userForm = reactive({
      id: "",
      name: "",
      email: "",
      password: "",
      department_id: "",
      status: "enabled"
    });
    const userRules = reactive({
      name: [{ required: true, message: "\u8BF7\u8F93\u5165\u540D\u79F0", trigger: "blur" }],
      email: [
        { required: true, message: "\u8BF7\u8F93\u5165\u90AE\u7BB1", trigger: "blur" },
        { type: "email", message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E", trigger: "blur" }
      ],
      password: [{ required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" }],
      department_id: [{ required: true, message: "\u8BF7\u9009\u62E9\u90E8\u95E8", trigger: "change" }]
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
      isEditUser.value = false;
      userForm.id = "";
      userForm.name = "";
      userForm.email = "";
      userForm.password = "";
      userForm.department_id = "";
      userForm.status = "enabled";
      userDialogVisible.value = true;
      await loadDepartments();
    };
    const openEditUserDialog = (row) => {
      isEditUser.value = true;
      userForm.id = row.id;
      userForm.name = row.name;
      userForm.email = row.email;
      userForm.password = "";
      userForm.department_id = row.department_id || "";
      userForm.status = row.status;
      userDialogVisible.value = true;
    };
    const submitUserForm = async () => {
      if (!userFormRef.value) return;
      if (isEditUser.value) {
        userRules.password = [];
      } else {
        userRules.password = [{ required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" }];
      }
      const valid = await userFormRef.value.validate().catch(() => false);
      if (!valid) return;
      submitting.value = true;
      try {
        if (isEditUser.value) {
          const result = await adminBackendUserApi.updateUser(userForm.id, {
            name: userForm.name,
            department_id: userForm.department_id,
            status: userForm.status
          });
          if (result.success) {
            ElMessage.success("\u66F4\u65B0\u6210\u529F");
            userDialogVisible.value = false;
            await loadUsers();
          } else {
            ElMessage.error(result.error || "\u66F4\u65B0\u5931\u8D25");
          }
        } else {
          const result = await adminBackendUserApi.createUser({
            name: userForm.name,
            email: userForm.email,
            password: userForm.password,
            department_id: userForm.department_id,
            status: userForm.status
          });
          if (result.success) {
            ElMessage.success("\u6DFB\u52A0\u6210\u529F");
            userDialogVisible.value = false;
            await loadUsers();
          } else {
            ElMessage.error(result.error || "\u6DFB\u52A0\u5931\u8D25");
          }
        }
      } catch (e) {
        ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
      } finally {
        submitting.value = false;
      }
    };
    const resetUserForm = () => {
      if (userFormRef.value) userFormRef.value.resetFields();
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
      const _component_el_skeleton = ElSkeleton;
      const _component_AdminDataTable = AdminDataTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _component_el_popconfirm = ElPopconfirm;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-3b71ea4f>`);
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
        _push(`<div class="skeleton-container" data-v-3b71ea4f>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          animated: "",
          rows: 10
        }, null, _parent));
        _push(`</div>`);
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
                        type: ((_a = row.department) == null ? void 0 : _a.name) === "\u8D85\u7EA7\u7BA1\u7406\u5458" ? "danger" : ""
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
                      _push3(`<span class="text-gray" data-v-3b71ea4f${_scopeId2}>\u65E0\u90E8\u95E8</span>`);
                    }
                  } else {
                    return [
                      row.department ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: ((_b = row.department) == null ? void 0 : _b.name) === "\u8D85\u7EA7\u7BA1\u7406\u5458" ? "danger" : ""
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
                        type: ((_a = row.department) == null ? void 0 : _a.name) === "\u8D85\u7EA7\u7BA1\u7406\u5458" ? "danger" : ""
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
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: userDialogVisible.value,
        "onUpdate:modelValue": ($event) => userDialogVisible.value = $event,
        title: isEditUser.value ? "\u7F16\u8F91\u7528\u6237" : "\u65B0\u589E\u7528\u6237",
        width: "500px",
        onClosed: resetUserForm
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="dialog-footer" data-v-3b71ea4f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => userDialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u53D6\u6D88`);
                } else {
                  return [
                    createTextVNode("\u53D6\u6D88")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: submitUserForm,
              loading: submitting.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u786E\u8BA4`);
                } else {
                  return [
                    createTextVNode("\u786E\u8BA4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "dialog-footer" }, [
                createVNode(_component_el_button, {
                  onClick: ($event) => userDialogVisible.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53D6\u6D88")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitUserForm,
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u786E\u8BA4")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: userForm,
              rules: userRules,
              ref_key: "userFormRef",
              ref: userFormRef,
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
                          modelValue: userForm.name,
                          "onUpdate:modelValue": ($event) => userForm.name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: userForm.name,
                            "onUpdate:modelValue": ($event) => userForm.name = $event,
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
                          modelValue: userForm.email,
                          "onUpdate:modelValue": ($event) => userForm.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                          disabled: isEditUser.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: userForm.email,
                            "onUpdate:modelValue": ($event) => userForm.email = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                            disabled: isEditUser.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!isEditUser.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "\u5BC6\u7801",
                      prop: "password"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: userForm.password,
                            "onUpdate:modelValue": ($event) => userForm.password = $event,
                            type: "password",
                            placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                            "show-password": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: userForm.password,
                              "onUpdate:modelValue": ($event) => userForm.password = $event,
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
                          modelValue: userForm.department_id,
                          "onUpdate:modelValue": ($event) => userForm.department_id = $event,
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
                            modelValue: userForm.department_id,
                            "onUpdate:modelValue": ($event) => userForm.department_id = $event,
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
                          modelValue: userForm.status,
                          "onUpdate:modelValue": ($event) => userForm.status = $event
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
                            modelValue: userForm.status,
                            "onUpdate:modelValue": ($event) => userForm.status = $event
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
                          modelValue: userForm.name,
                          "onUpdate:modelValue": ($event) => userForm.name = $event,
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
                          modelValue: userForm.email,
                          "onUpdate:modelValue": ($event) => userForm.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                          disabled: isEditUser.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    !isEditUser.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "\u5BC6\u7801",
                      prop: "password"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: userForm.password,
                          "onUpdate:modelValue": ($event) => userForm.password = $event,
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
                          modelValue: userForm.department_id,
                          "onUpdate:modelValue": ($event) => userForm.department_id = $event,
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
                          modelValue: userForm.status,
                          "onUpdate:modelValue": ($event) => userForm.status = $event
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
                model: userForm,
                rules: userRules,
                ref_key: "userFormRef",
                ref: userFormRef,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u7528\u6237\u540D\u79F0",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.name,
                        "onUpdate:modelValue": ($event) => userForm.name = $event,
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
                        modelValue: userForm.email,
                        "onUpdate:modelValue": ($event) => userForm.email = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
                        disabled: isEditUser.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  !isEditUser.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "\u5BC6\u7801",
                    prop: "password"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.password,
                        "onUpdate:modelValue": ($event) => userForm.password = $event,
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
                        modelValue: userForm.department_id,
                        "onUpdate:modelValue": ($event) => userForm.department_id = $event,
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
                        modelValue: userForm.status,
                        "onUpdate:modelValue": ($event) => userForm.status = $event
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/users/accounts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b71ea4f"]]);

export { index as default };
//# sourceMappingURL=index-DN4JCY6W.mjs.map
