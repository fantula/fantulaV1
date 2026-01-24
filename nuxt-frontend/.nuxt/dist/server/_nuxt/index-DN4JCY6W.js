import { P as PageTipHeader } from "./PageTipHeader-DaP_gh5N.js";
import { A as AdminActionCard } from "./AdminActionCard-Dlb_VPyP.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElSkeleton } from "./index-BXD0oWDt.js";
import { A as AdminDataTable } from "./AdminDataTable-BzMTthVf.js";
import { E as ElTableColumn } from "./index-BB44-vTK.js";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElSwitch } from "./index-_GccYHgs.js";
import { E as ElPopconfirm } from "./index-C6eLVC7y.js";
import { E as ElDialog } from "./index-CzosOSMt.js";
import { E as ElForm, a as ElFormItem } from "./index-B8nHr-W3.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElSelect, a as ElOption } from "./index-pXKVpQSb.js";
import { E as ElRadioGroup, b as ElRadio } from "./index-5s1BkUoL.js";
import { by as getAdminSupabaseClient, b9 as refresh_default, p as plus_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
/* empty css                   */
/* empty css                          */
/* empty css                  */
/* empty css                     */
/* empty css                */
/* empty css                   */
/* empty css                    */
/* empty css                   */
/* empty css                   */
/* empty css                    */
/* empty css                      */
/* empty css                  */
/* empty css                   */
/* empty css                      */
/* empty css                        */
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { a as adminDepartmentApi } from "./department-BOjp2i2p.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "./index-DvOrIhmd.js";
import "./vnode-D0IHQw_9.js";
import "@vue/shared";
/* empty css                  */
import "./index-QnhSR2oe.js";
/* empty css                    */
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-DKY_z0U1.js";
import "./index-Da73tUO2.js";
import "lodash-unified";
import "./event-BZTOGHfp.js";
/* empty css                    */
/* empty css                  */
/* empty css                       */
/* empty css                    */
import "./directive-tOiqatq5.js";
import "@vueuse/core";
import "./index-D_b573Qt.js";
import "./index-Dxw_X3Hq.js";
import "./index-CIoWkt90.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-BlpH41lu.js";
import "./raf-CQRaPAjg.js";
import "normalize-wheel-es";
import "./validator-T0bsmJHo.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "async-validator";
import "./index-ClPmkyX9.js";
import "./strings-D1uxkXhq.js";
import "./index-DCrMmn3b.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
        return { success: false, error: "该邮箱已被注册" };
      }
      return { success: false, error: `创建认证用户失败: ${authError.message}` };
    }
    if (!authData.user) {
      return { success: false, error: "创建认证用户失败：未返回用户信息" };
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
      department_id: data.department_id ?? null,
      status: data.status ?? "enabled"
    }).select().single();
    if (error) {
      await client.auth.admin.deleteUser(authData.user.id);
      return { success: false, error: `创建管理员记录失败: ${error.message}` };
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
      return { success: false, error: `获取用户信息失败: ${fetchError.message}` };
    }
    const authUserId = adminUser?.auth_user_id;
    const { error } = await client.from("admin_users").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    if (authUserId) {
      const { error: authDeleteError } = await client.auth.admin.deleteUser(authUserId);
      if (authDeleteError) {
        console.warn(`删除 Auth 用户失败 (${authUserId}):`, authDeleteError.message);
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
      name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "邮箱格式不正确", trigger: "blur" }
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      department_id: [{ required: true, message: "请选择部门", trigger: "change" }]
    });
    const loadUsers = async () => {
      loading.value = true;
      try {
        const result = await adminBackendUserApi.getUsers();
        if (result.success) {
          users.value = result.users;
        }
      } catch (e) {
        ElMessage.error(e.message || "加载用户失败");
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
        ElMessage.error(e.message || "加载部门失败");
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
        userRules.password = [{ required: true, message: "请输入密码", trigger: "blur" }];
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
            ElMessage.success("更新成功");
            userDialogVisible.value = false;
            await loadUsers();
          } else {
            ElMessage.error(result.error || "更新失败");
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
            ElMessage.success("添加成功");
            userDialogVisible.value = false;
            await loadUsers();
          } else {
            ElMessage.error(result.error || "添加失败");
          }
        }
      } catch (e) {
        ElMessage.error(e.message || "操作失败");
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
          ElMessage.success(row.status === "enabled" ? "用户已启用" : "用户已停用");
        } else {
          row.status = row.status === "enabled" ? "disabled" : "enabled";
          ElMessage.error(result.error || "操作失败");
        }
      } catch (e) {
        row.status = row.status === "enabled" ? "disabled" : "enabled";
        ElMessage.error(e.message || "操作失败");
      } finally {
        row.statusLoading = false;
      }
    };
    const handleDeleteUser = async (row) => {
      const result = await adminBackendUserApi.deleteUser(row.id);
      if (result.success) {
        ElMessage.success("删除成功");
        await loadUsers();
      } else {
        ElMessage.error(result.error || "删除失败");
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
        title: "用户管理",
        description: "管理后台管理员账号，分配部门与权限"
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
                  _push3(`刷新`);
                } else {
                  return [
                    createTextVNode("刷新")
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
                  _push3(`新增用户`);
                } else {
                  return [
                    createTextVNode("新增用户")
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
                  createTextVNode("刷新")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddUserDialog
              }, {
                default: withCtx(() => [
                  createTextVNode("新增用户")
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
                label: "用户名称",
                "min-width": "150"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                prop: "email",
                label: "绑定邮箱",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "所属部门",
                width: "180",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (row.department) {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        type: row.department?.name === "超级管理员" ? "danger" : ""
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(row.department?.name || "无部门")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(row.department?.name || "无部门"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<span class="text-gray" data-v-3b71ea4f${_scopeId2}>无部门</span>`);
                    }
                  } else {
                    return [
                      row.department ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: row.department?.name === "超级管理员" ? "danger" : ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.department?.name || "无部门"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-gray"
                      }, "无部门"))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "状态",
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
                label: "创建时间",
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
                label: "操作",
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
                          _push4(`编辑`);
                        } else {
                          return [
                            createTextVNode("编辑")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_popconfirm, {
                      title: `确认删除用户 '${row.name}' 吗？`,
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
                                _push5(`删除`);
                              } else {
                                return [
                                  createTextVNode("删除")
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
                                createTextVNode("删除")
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
                          createTextVNode("编辑")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_popconfirm, {
                        title: `确认删除用户 '${row.name}' 吗？`,
                        onConfirm: ($event) => handleDeleteUser(row)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "danger"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
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
                  label: "用户名称",
                  "min-width": "150"
                }),
                createVNode(_component_el_table_column, {
                  prop: "email",
                  label: "绑定邮箱",
                  "min-width": "200",
                  "show-overflow-tooltip": ""
                }),
                createVNode(_component_el_table_column, {
                  label: "所属部门",
                  width: "180",
                  align: "center"
                }, {
                  default: withCtx(({ row }) => [
                    row.department ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: row.department?.name === "超级管理员" ? "danger" : ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(row.department?.name || "无部门"), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-gray"
                    }, "无部门"))
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  label: "状态",
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
                  label: "创建时间",
                  width: "180",
                  align: "center"
                }, {
                  default: withCtx(({ row }) => [
                    createTextVNode(toDisplayString(unref(formatDate)(row.created_at)), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  label: "操作",
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
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_popconfirm, {
                      title: `确认删除用户 '${row.name}' 吗？`,
                      onConfirm: ($event) => handleDeleteUser(row)
                    }, {
                      reference: withCtx(() => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
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
        title: isEditUser.value ? "编辑用户" : "新增用户",
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
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
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
                  _push3(`确认`);
                } else {
                  return [
                    createTextVNode("确认")
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
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: submitUserForm,
                  loading: submitting.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("确认")
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
                    label: "用户名称",
                    prop: "name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: userForm.name,
                          "onUpdate:modelValue": ($event) => userForm.name = $event,
                          placeholder: "请输入用户名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: userForm.name,
                            "onUpdate:modelValue": ($event) => userForm.name = $event,
                            placeholder: "请输入用户名称"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "绑定邮箱",
                    prop: "email"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: userForm.email,
                          "onUpdate:modelValue": ($event) => userForm.email = $event,
                          placeholder: "请输入邮箱地址",
                          disabled: isEditUser.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: userForm.email,
                            "onUpdate:modelValue": ($event) => userForm.email = $event,
                            placeholder: "请输入邮箱地址",
                            disabled: isEditUser.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!isEditUser.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "密码",
                      prop: "password"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: userForm.password,
                            "onUpdate:modelValue": ($event) => userForm.password = $event,
                            type: "password",
                            placeholder: "请输入密码",
                            "show-password": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: userForm.password,
                              "onUpdate:modelValue": ($event) => userForm.password = $event,
                              type: "password",
                              placeholder: "请输入密码",
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
                    label: "所属部门",
                    prop: "department_id"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: userForm.department_id,
                          "onUpdate:modelValue": ($event) => userForm.department_id = $event,
                          placeholder: "请选择部门",
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
                            placeholder: "请选择部门",
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
                    label: "状态",
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
                                    _push6(`启用`);
                                  } else {
                                    return [
                                      createTextVNode("启用")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_radio, { value: "disabled" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`禁用`);
                                  } else {
                                    return [
                                      createTextVNode("禁用")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_radio, { value: "enabled" }, {
                                  default: withCtx(() => [
                                    createTextVNode("启用")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { value: "disabled" }, {
                                  default: withCtx(() => [
                                    createTextVNode("禁用")
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
                                  createTextVNode("启用")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { value: "disabled" }, {
                                default: withCtx(() => [
                                  createTextVNode("禁用")
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
                      label: "用户名称",
                      prop: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: userForm.name,
                          "onUpdate:modelValue": ($event) => userForm.name = $event,
                          placeholder: "请输入用户名称"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "绑定邮箱",
                      prop: "email"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: userForm.email,
                          "onUpdate:modelValue": ($event) => userForm.email = $event,
                          placeholder: "请输入邮箱地址",
                          disabled: isEditUser.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    !isEditUser.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "密码",
                      prop: "password"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: userForm.password,
                          "onUpdate:modelValue": ($event) => userForm.password = $event,
                          type: "password",
                          placeholder: "请输入密码",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_form_item, {
                      label: "所属部门",
                      prop: "department_id"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: userForm.department_id,
                          "onUpdate:modelValue": ($event) => userForm.department_id = $event,
                          placeholder: "请选择部门",
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
                      label: "状态",
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
                                createTextVNode("启用")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_radio, { value: "disabled" }, {
                              default: withCtx(() => [
                                createTextVNode("禁用")
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
                    label: "用户名称",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.name,
                        "onUpdate:modelValue": ($event) => userForm.name = $event,
                        placeholder: "请输入用户名称"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "绑定邮箱",
                    prop: "email"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.email,
                        "onUpdate:modelValue": ($event) => userForm.email = $event,
                        placeholder: "请输入邮箱地址",
                        disabled: isEditUser.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  !isEditUser.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "密码",
                    prop: "password"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.password,
                        "onUpdate:modelValue": ($event) => userForm.password = $event,
                        type: "password",
                        placeholder: "请输入密码",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, {
                    label: "所属部门",
                    prop: "department_id"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: userForm.department_id,
                        "onUpdate:modelValue": ($event) => userForm.department_id = $event,
                        placeholder: "请选择部门",
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
                    label: "状态",
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
                              createTextVNode("启用")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_radio, { value: "disabled" }, {
                            default: withCtx(() => [
                              createTextVNode("禁用")
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
export {
  index as default
};
//# sourceMappingURL=index-DN4JCY6W.js.map
