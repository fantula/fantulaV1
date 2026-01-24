import { P as PageTipHeader } from './PageTipHeader-DaP_gh5N.mjs';
import { A as AdminActionCard } from './AdminActionCard-Dlb_VPyP.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElCard } from './index-9Hs_9io2.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { E as ElForm, a as ElFormItem } from './index-j17drbdQ.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { a as ElCheckboxGroup, E as ElCheckbox } from './index-DrPRyc7n.mjs';
import { _ as _export_sfc, b9 as refresh_default, p as plus_default, ah as ElMessage } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { a as adminDepartmentApi } from './department-BOjp2i2p.mjs';
import { g as getPermissionMenuItems } from './admin-menu-DXx4fNJV.mjs';
import './index-DvOrIhmd.mjs';
import './vnode-D0IHQw_9.mjs';
import '@vue/shared';
import './index-QnhSR2oe.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import 'lodash-unified';
import 'async-validator';
import '@vueuse/core';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "UserDepartments"
  },
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const menuList = getPermissionMenuItems();
    const departments = ref([]);
    const currentEditDeptId = ref("");
    const currentEditDeptObj = ref(null);
    const deptFormRef = ref();
    const deptSaving = ref(false);
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
    const selectDeptToEdit = (dept) => {
      currentEditDeptId.value = dept.id;
      currentEditDeptObj.value = JSON.parse(JSON.stringify(dept));
    };
    const openAddDept = async () => {
      const result = await adminDepartmentApi.createDepartment({ name: "\u65B0\u90E8\u95E8", permissions: [] });
      if (result.success && result.department) {
        await loadDepartments();
        selectDeptToEdit(result.department);
        ElMessage.success("\u90E8\u95E8\u5DF2\u521B\u5EFA");
      } else {
        ElMessage.error(result.error || "\u521B\u5EFA\u5931\u8D25");
      }
    };
    const handleDeleteDept = async () => {
      if (!currentEditDeptObj.value) return;
      const result = await adminDepartmentApi.deleteDepartment(currentEditDeptObj.value.id);
      if (result.success) {
        ElMessage.success("\u90E8\u95E8\u5DF2\u5220\u9664");
        currentEditDeptId.value = "";
        currentEditDeptObj.value = null;
        await loadDepartments();
      } else {
        ElMessage.error(result.error || "\u5220\u9664\u5931\u8D25");
      }
    };
    const saveDeptConfig = async () => {
      if (!currentEditDeptObj.value) return;
      deptSaving.value = true;
      try {
        const result = await adminDepartmentApi.updateDepartment(currentEditDeptObj.value.id, {
          name: currentEditDeptObj.value.name,
          permissions: currentEditDeptObj.value.permissions
        });
        if (result.success) {
          ElMessage.success("\u90E8\u95E8\u914D\u7F6E\u5DF2\u4FDD\u5B58");
          await loadDepartments();
        } else {
          ElMessage.error(result.error || "\u4FDD\u5B58\u5931\u8D25");
        }
      } finally {
        deptSaving.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageTipHeader = PageTipHeader;
      const _component_AdminActionCard = AdminActionCard;
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_tag = ElTag;
      const _component_el_empty = ElEmpty;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_checkbox_group = ElCheckboxGroup;
      const _component_el_checkbox = ElCheckbox;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-271de961>`);
      _push(ssrRenderComponent(_component_PageTipHeader, {
        title: "\u90E8\u95E8\u7BA1\u7406",
        description: "\u521B\u5EFA\u548C\u7BA1\u7406\u540E\u53F0\u90E8\u95E8\uFF0C\u914D\u7F6E\u53EF\u8BBF\u95EE\u7684\u9875\u9762\u6743\u9650"
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminActionCard, null, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              icon: unref(refresh_default),
              onClick: loadDepartments
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
              onClick: openAddDept
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u65B0\u589E\u90E8\u95E8`);
                } else {
                  return [
                    createTextVNode("\u65B0\u589E\u90E8\u95E8")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                icon: unref(refresh_default),
                onClick: loadDepartments
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5237\u65B0")
                ]),
                _: 1
              }, 8, ["icon"]),
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                onClick: openAddDept
              }, {
                default: withCtx(() => [
                  createTextVNode("\u65B0\u589E\u90E8\u95E8")
                ]),
                _: 1
              }, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        class: "dept-manager-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="dept-manager" data-v-271de961${_scopeId}><div class="dept-list-pane" data-v-271de961${_scopeId}><div class="pane-header" data-v-271de961${_scopeId}><span data-v-271de961${_scopeId}>\u90E8\u95E8\u5217\u8868</span></div><div class="dept-list" data-v-271de961${_scopeId}><!--[-->`);
            ssrRenderList(departments.value, (dept) => {
              _push2(`<div class="${ssrRenderClass([{ active: currentEditDeptId.value === dept.id }, "dept-item"])}" data-v-271de961${_scopeId}><span class="dept-name" data-v-271de961${_scopeId}>${ssrInterpolate(dept.name)}</span>`);
              _push2(ssrRenderComponent(_component_el_tag, {
                size: "small",
                effect: "plain"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(dept.user_count || 0)} \u4EBA`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(dept.user_count || 0) + " \u4EBA", 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (departments.value.length === 0) {
              _push2(`<div class="empty-list" data-v-271de961${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "\u6682\u65E0\u90E8\u95E8",
                "image-size": 60
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="dept-config-pane" data-v-271de961${_scopeId}>`);
            if (currentEditDeptObj.value) {
              _push2(`<div class="config-form" data-v-271de961${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form, {
                "label-position": "top",
                model: currentEditDeptObj.value,
                ref_key: "deptFormRef",
                ref: deptFormRef
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "\u90E8\u95E8\u540D\u79F0",
                      prop: "name",
                      rules: [{ required: true, message: "\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0", trigger: "blur" }]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: currentEditDeptObj.value.name,
                            "onUpdate:modelValue": ($event) => currentEditDeptObj.value.name = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: currentEditDeptObj.value.name,
                              "onUpdate:modelValue": ($event) => currentEditDeptObj.value.name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6743\u9650\u914D\u7F6E (\u52FE\u9009\u5141\u8BB8\u8BBF\u95EE\u7684\u540E\u53F0\u9875\u9762)" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_checkbox_group, {
                            modelValue: currentEditDeptObj.value.permissions,
                            "onUpdate:modelValue": ($event) => currentEditDeptObj.value.permissions = $event,
                            class: "perm-list"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(menuList), (menu) => {
                                  _push5(ssrRenderComponent(_component_el_checkbox, {
                                    key: menu.path,
                                    value: menu.path
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(menu.title)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(menu.title), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(menuList), (menu) => {
                                    return openBlock(), createBlock(_component_el_checkbox, {
                                      key: menu.path,
                                      value: menu.path
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(menu.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_checkbox_group, {
                              modelValue: currentEditDeptObj.value.permissions,
                              "onUpdate:modelValue": ($event) => currentEditDeptObj.value.permissions = $event,
                              class: "perm-list"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(menuList), (menu) => {
                                  return openBlock(), createBlock(_component_el_checkbox, {
                                    key: menu.path,
                                    value: menu.path
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(menu.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_form_item, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_button, {
                            type: "primary",
                            onClick: saveDeptConfig,
                            loading: deptSaving.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u4FDD\u5B58\u914D\u7F6E`);
                              } else {
                                return [
                                  createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_button, {
                            type: "danger",
                            plain: "",
                            onClick: handleDeleteDept,
                            disabled: (currentEditDeptObj.value.user_count || 0) > 0
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` \u5220\u9664\u90E8\u95E8 `);
                              } else {
                                return [
                                  createTextVNode(" \u5220\u9664\u90E8\u95E8 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_button, {
                              type: "primary",
                              onClick: saveDeptConfig,
                              loading: deptSaving.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
                              ]),
                              _: 1
                            }, 8, ["loading"]),
                            createVNode(_component_el_button, {
                              type: "danger",
                              plain: "",
                              onClick: handleDeleteDept,
                              disabled: (currentEditDeptObj.value.user_count || 0) > 0
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u5220\u9664\u90E8\u95E8 ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_form_item, {
                        label: "\u90E8\u95E8\u540D\u79F0",
                        prop: "name",
                        rules: [{ required: true, message: "\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0", trigger: "blur" }]
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: currentEditDeptObj.value.name,
                            "onUpdate:modelValue": ($event) => currentEditDeptObj.value.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u6743\u9650\u914D\u7F6E (\u52FE\u9009\u5141\u8BB8\u8BBF\u95EE\u7684\u540E\u53F0\u9875\u9762)" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_checkbox_group, {
                            modelValue: currentEditDeptObj.value.permissions,
                            "onUpdate:modelValue": ($event) => currentEditDeptObj.value.permissions = $event,
                            class: "perm-list"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(menuList), (menu) => {
                                return openBlock(), createBlock(_component_el_checkbox, {
                                  key: menu.path,
                                  value: menu.path
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(menu.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: saveDeptConfig,
                            loading: deptSaving.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
                            ]),
                            _: 1
                          }, 8, ["loading"]),
                          createVNode(_component_el_button, {
                            type: "danger",
                            plain: "",
                            onClick: handleDeleteDept,
                            disabled: (currentEditDeptObj.value.user_count || 0) > 0
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u5220\u9664\u90E8\u95E8 ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
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
              _push2(`<div class="empty-selection" data-v-271de961${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_empty, {
                description: "\u8BF7\u9009\u62E9\u5DE6\u4FA7\u90E8\u95E8\u8FDB\u884C\u914D\u7F6E",
                "image-size": 80
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "dept-manager" }, [
                createVNode("div", { class: "dept-list-pane" }, [
                  createVNode("div", { class: "pane-header" }, [
                    createVNode("span", null, "\u90E8\u95E8\u5217\u8868")
                  ]),
                  createVNode("div", { class: "dept-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept) => {
                      return openBlock(), createBlock("div", {
                        key: dept.id,
                        class: ["dept-item", { active: currentEditDeptId.value === dept.id }],
                        onClick: ($event) => selectDeptToEdit(dept)
                      }, [
                        createVNode("span", { class: "dept-name" }, toDisplayString(dept.name), 1),
                        createVNode(_component_el_tag, {
                          size: "small",
                          effect: "plain"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(dept.user_count || 0) + " \u4EBA", 1)
                          ]),
                          _: 2
                        }, 1024)
                      ], 10, ["onClick"]);
                    }), 128)),
                    departments.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-list"
                    }, [
                      createVNode(_component_el_empty, {
                        description: "\u6682\u65E0\u90E8\u95E8",
                        "image-size": 60
                      })
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "dept-config-pane" }, [
                  currentEditDeptObj.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "config-form"
                  }, [
                    createVNode(_component_el_form, {
                      "label-position": "top",
                      model: currentEditDeptObj.value,
                      ref_key: "deptFormRef",
                      ref: deptFormRef
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, {
                          label: "\u90E8\u95E8\u540D\u79F0",
                          prop: "name",
                          rules: [{ required: true, message: "\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0", trigger: "blur" }]
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: currentEditDeptObj.value.name,
                              "onUpdate:modelValue": ($event) => currentEditDeptObj.value.name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "\u6743\u9650\u914D\u7F6E (\u52FE\u9009\u5141\u8BB8\u8BBF\u95EE\u7684\u540E\u53F0\u9875\u9762)" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_checkbox_group, {
                              modelValue: currentEditDeptObj.value.permissions,
                              "onUpdate:modelValue": ($event) => currentEditDeptObj.value.permissions = $event,
                              class: "perm-list"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(menuList), (menu) => {
                                  return openBlock(), createBlock(_component_el_checkbox, {
                                    key: menu.path,
                                    value: menu.path
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(menu.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "primary",
                              onClick: saveDeptConfig,
                              loading: deptSaving.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u4FDD\u5B58\u914D\u7F6E")
                              ]),
                              _: 1
                            }, 8, ["loading"]),
                            createVNode(_component_el_button, {
                              type: "danger",
                              plain: "",
                              onClick: handleDeleteDept,
                              disabled: (currentEditDeptObj.value.user_count || 0) > 0
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u5220\u9664\u90E8\u95E8 ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "empty-selection"
                  }, [
                    createVNode(_component_el_empty, {
                      description: "\u8BF7\u9009\u62E9\u5DE6\u4FA7\u90E8\u95E8\u8FDB\u884C\u914D\u7F6E",
                      "image-size": 80
                    })
                  ]))
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/users/departments/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-271de961"]]);

export { index as default };
//# sourceMappingURL=index-UBUsDtHS.mjs.map
