import { _ as _export_sfc, bg as useAdminStore, ab as __nuxt_component_0, E as ElIcon, ae as user_filled_default, m as monitor_default, b6 as timer_default, bh as setting_default, aq as message_default, bi as collection_default, $ as document_default, bj as question_filled_default, R as picture_filled_default, ba as picture_default, a0 as money_default, s as service_default, a4 as user_default, a7 as ticket_default, at as key_default, b3 as files_default, bk as goods_default, M as refresh_left_default, a6 as list_default, bl as odometer_default, bm as expand_default, bn as fold_default, bo as sunny_default, bp as moon_default, aZ as arrow_down_default, aa as switch_button_default, ah as ElMessage } from './server.mjs';
import { E as ElContainer, a as ElAside, b as ElMenu, c as ElSubMenu, d as ElMenuItem, e as ElHeader, f as ElDropdown, g as ElDropdownMenu, h as ElDropdownItem, i as ElMain } from './index-CRZxBAEr.mjs';
import { E as ElScrollbar } from './index-D_b573Qt.mjs';
import { E as ElAvatar } from './index-C2DKVZ9g.mjs';
import { defineComponent, computed, ref, withCtx, unref, createVNode, resolveDynamicComponent, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, withDirectives, vShow, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import draggable from 'vuedraggable';
import { A as ADMIN_MENU_ITEMS } from './admin-menu-DXx4fNJV.mjs';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
import './index-DR2tYDZ3.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-CIoWkt90.mjs';
import '@popperjs/core';
import './index-Dxw_X3Hq.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "_mgmt_9Xfa3",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const activeMenu = computed(() => {
      const path = route.path;
      const validPaths = menuList.value.map((item) => item.index).sort((a, b) => b.length - a.length);
      for (const menuPath of validPaths) {
        if (path === menuPath) return menuPath;
        if (path.startsWith(menuPath + "/")) {
          return menuPath;
        }
      }
      return path;
    });
    const isCollapse = ref(false);
    const isLoading = ref(true);
    const isDark = ref(false);
    const isLoginPage = computed(() => route.path === "/_mgmt_9Xfa3/login");
    const currentUser = computed(() => adminStore.adminInfo);
    const iconMap = {
      Odometer: odometer_default,
      List: list_default,
      RefreshLeft: refresh_left_default,
      Goods: goods_default,
      Files: files_default,
      Key: key_default,
      Ticket: ticket_default,
      User: user_default,
      Service: service_default,
      Money: money_default,
      Picture: picture_default,
      PictureFilled: picture_filled_default,
      QuestionFilled: question_filled_default,
      Document: document_default,
      Collection: collection_default,
      Message: message_default,
      Setting: setting_default,
      Timer: timer_default,
      Monitor: monitor_default,
      UserFilled: user_filled_default
    };
    const menuList = ref([...ADMIN_MENU_ITEMS]);
    const filteredMenuList = computed(() => {
      var _a, _b;
      const deptName = ((_b = (_a = adminStore.adminInfo) == null ? void 0 : _a.department) == null ? void 0 : _b.name) || "";
      const perms = adminStore.permissions || [];
      if (deptName.includes("\u8D85\u7EA7") || perms.includes("*")) {
        return menuList.value;
      }
      const permissions = adminStore.permissions || [];
      if (permissions.length === 0) {
        return menuList.value;
      }
      return menuList.value.filter((item) => {
        if (item.index === "/_mgmt_9Xfa3") return true;
        return permissions.includes(item.index);
      });
    });
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };
    const toggleDark = () => {
      isDark.value = !isDark.value;
      applyTheme();
    };
    const applyTheme = () => {
      const htmlEl = (void 0).documentElement;
      if (isDark.value) {
        htmlEl.classList.add("dark");
        localStorage.setItem("admin-theme", "dark");
      } else {
        htmlEl.classList.remove("dark");
        localStorage.setItem("admin-theme", "light");
      }
    };
    const saveMenuOrder = () => {
      try {
        localStorage.setItem("admin-menu-order", JSON.stringify(menuList.value));
      } catch (e) {
        console.error("Failed to save menu order", e);
      }
    };
    const handleLogout = async () => {
      await adminStore.logout();
      ElMessage.success("\u5DF2\u9000\u51FA\u767B\u5F55");
      await router.push("/_mgmt_9Xfa3/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      const _component_el_container = ElContainer;
      const _component_el_aside = ElAside;
      const _component_el_scrollbar = ElScrollbar;
      const _component_el_menu = ElMenu;
      const _component_el_sub_menu = ElSubMenu;
      const _component_el_icon = ElIcon;
      const _component_el_menu_item = ElMenuItem;
      const _component_el_header = ElHeader;
      const _component_el_dropdown = ElDropdown;
      const _component_el_avatar = ElAvatar;
      const _component_el_dropdown_menu = ElDropdownMenu;
      const _component_el_dropdown_item = ElDropdownItem;
      const _component_el_main = ElMain;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-827bbca9>`);
      if (isLoginPage.value) {
        _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      } else if (isLoading.value) {
        _push(`<div class="admin-loading-screen" data-v-827bbca9><div class="loading-content" data-v-827bbca9><div class="loading-logo" data-v-827bbca9>F</div><p class="loading-text" data-v-827bbca9>\u6B63\u5728\u9A8C\u8BC1\u8EAB\u4EFD...</p></div></div>`);
      } else if (currentUser.value) {
        _push(ssrRenderComponent(_component_el_container, {
          class: ["admin-layout", { "dark-mode": isDark.value }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_aside, {
                width: isCollapse.value ? "64px" : "250px",
                class: "admin-aside"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass([{ "collapsed": isCollapse.value }, "logo"])}" data-v-827bbca9${_scopeId2}><div class="logo-icon" data-v-827bbca9${_scopeId2}>F</div><div class="logo-text" style="${ssrRenderStyle(!isCollapse.value ? null : { display: "none" })}" data-v-827bbca9${_scopeId2}><h2 data-v-827bbca9${_scopeId2}>FANTULA</h2><span class="logo-sub" data-v-827bbca9${_scopeId2}>ADMINISTRATOR</span></div></div>`);
                    _push3(ssrRenderComponent(_component_el_scrollbar, { class: "menu-scrollbar" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_menu, {
                            "default-active": activeMenu.value,
                            class: "el-menu-vertical",
                            collapse: isCollapse.value,
                            "collapse-transition": false,
                            router: "",
                            "unique-opened": "",
                            "background-color": "transparent",
                            "text-color": "var(--el-text-color-regular)",
                            "active-text-color": "var(--el-color-primary)"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(draggable), {
                                  list: filteredMenuList.value,
                                  "item-key": "index",
                                  animation: 200,
                                  "ghost-class": "ghost-menu-item",
                                  onEnd: saveMenuOrder,
                                  handle: ".drag-handle"
                                }, {
                                  item: withCtx(({ element }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="menu-wrapper" data-v-827bbca9${_scopeId5}>`);
                                      if (element.children && element.children.length > 0) {
                                        _push6(ssrRenderComponent(_component_el_sub_menu, {
                                          index: element.index
                                        }, {
                                          title: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_el_icon, { class: "drag-handle" }, {
                                                default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    ssrRenderVNode(_push8, createVNode(resolveDynamicComponent(iconMap[element.icon]), null, null), _parent8, _scopeId7);
                                                  } else {
                                                    return [
                                                      (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(`<span data-v-827bbca9${_scopeId6}>${ssrInterpolate(element.title)}</span>`);
                                            } else {
                                              return [
                                                createVNode(_component_el_icon, { class: "drag-handle" }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode("span", null, toDisplayString(element.title), 1)
                                              ];
                                            }
                                          }),
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(element.children, (child) => {
                                                _push7(ssrRenderComponent(_component_el_menu_item, {
                                                  key: child.index,
                                                  index: child.index
                                                }, {
                                                  title: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`<span data-v-827bbca9${_scopeId7}>${ssrInterpolate(child.title)}</span>`);
                                                    } else {
                                                      return [
                                                        createVNode("span", null, toDisplayString(child.title), 1)
                                                      ];
                                                    }
                                                  }),
                                                  default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      if (child.icon) {
                                                        _push8(ssrRenderComponent(_component_el_icon, null, {
                                                          default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              ssrRenderVNode(_push9, createVNode(resolveDynamicComponent(iconMap[child.icon]), null, null), _parent9, _scopeId8);
                                                            } else {
                                                              return [
                                                                (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                      } else {
                                                        _push8(`<!---->`);
                                                      }
                                                    } else {
                                                      return [
                                                        child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                                          default: withCtx(() => [
                                                            (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                          ]),
                                                          _: 2
                                                        }, 1024)) : createCommentVNode("", true)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(element.children, (child) => {
                                                  return openBlock(), createBlock(_component_el_menu_item, {
                                                    key: child.index,
                                                    index: child.index
                                                  }, {
                                                    title: withCtx(() => [
                                                      createVNode("span", null, toDisplayString(child.title), 1)
                                                    ]),
                                                    default: withCtx(() => [
                                                      child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                                        default: withCtx(() => [
                                                          (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                        ]),
                                                        _: 2
                                                      }, 1024)) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["index"]);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(ssrRenderComponent(_component_el_menu_item, {
                                          index: element.index,
                                          class: { "menu-item-spacing": element.spacing }
                                        }, {
                                          title: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<span data-v-827bbca9${_scopeId6}>${ssrInterpolate(element.title)}</span>`);
                                            } else {
                                              return [
                                                createVNode("span", null, toDisplayString(element.title), 1)
                                              ];
                                            }
                                          }),
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_el_icon, { class: "drag-handle" }, {
                                                default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    ssrRenderVNode(_push8, createVNode(resolveDynamicComponent(iconMap[element.icon]), null, null), _parent8, _scopeId7);
                                                  } else {
                                                    return [
                                                      (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_el_icon, { class: "drag-handle" }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      }
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "menu-wrapper" }, [
                                          element.children && element.children.length > 0 ? (openBlock(), createBlock(_component_el_sub_menu, {
                                            key: 0,
                                            index: element.index
                                          }, {
                                            title: withCtx(() => [
                                              createVNode(_component_el_icon, { class: "drag-handle" }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("span", null, toDisplayString(element.title), 1)
                                            ]),
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(element.children, (child) => {
                                                return openBlock(), createBlock(_component_el_menu_item, {
                                                  key: child.index,
                                                  index: child.index
                                                }, {
                                                  title: withCtx(() => [
                                                    createVNode("span", null, toDisplayString(child.title), 1)
                                                  ]),
                                                  default: withCtx(() => [
                                                    child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                                      default: withCtx(() => [
                                                        (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["index"]);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1032, ["index"])) : (openBlock(), createBlock(_component_el_menu_item, {
                                            key: 1,
                                            index: element.index,
                                            class: { "menu-item-spacing": element.spacing }
                                          }, {
                                            title: withCtx(() => [
                                              createVNode("span", null, toDisplayString(element.title), 1)
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, { class: "drag-handle" }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["index", "class"]))
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(draggable), {
                                    list: filteredMenuList.value,
                                    "item-key": "index",
                                    animation: 200,
                                    "ghost-class": "ghost-menu-item",
                                    onEnd: saveMenuOrder,
                                    handle: ".drag-handle"
                                  }, {
                                    item: withCtx(({ element }) => [
                                      createVNode("div", { class: "menu-wrapper" }, [
                                        element.children && element.children.length > 0 ? (openBlock(), createBlock(_component_el_sub_menu, {
                                          key: 0,
                                          index: element.index
                                        }, {
                                          title: withCtx(() => [
                                            createVNode(_component_el_icon, { class: "drag-handle" }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode("span", null, toDisplayString(element.title), 1)
                                          ]),
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(element.children, (child) => {
                                              return openBlock(), createBlock(_component_el_menu_item, {
                                                key: child.index,
                                                index: child.index
                                              }, {
                                                title: withCtx(() => [
                                                  createVNode("span", null, toDisplayString(child.title), 1)
                                                ]),
                                                default: withCtx(() => [
                                                  child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                                    default: withCtx(() => [
                                                      (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1032, ["index"]);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1032, ["index"])) : (openBlock(), createBlock(_component_el_menu_item, {
                                          key: 1,
                                          index: element.index,
                                          class: { "menu-item-spacing": element.spacing }
                                        }, {
                                          title: withCtx(() => [
                                            createVNode("span", null, toDisplayString(element.title), 1)
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, { class: "drag-handle" }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["index", "class"]))
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["list"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_menu, {
                              "default-active": activeMenu.value,
                              class: "el-menu-vertical",
                              collapse: isCollapse.value,
                              "collapse-transition": false,
                              router: "",
                              "unique-opened": "",
                              "background-color": "transparent",
                              "text-color": "var(--el-text-color-regular)",
                              "active-text-color": "var(--el-color-primary)"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(draggable), {
                                  list: filteredMenuList.value,
                                  "item-key": "index",
                                  animation: 200,
                                  "ghost-class": "ghost-menu-item",
                                  onEnd: saveMenuOrder,
                                  handle: ".drag-handle"
                                }, {
                                  item: withCtx(({ element }) => [
                                    createVNode("div", { class: "menu-wrapper" }, [
                                      element.children && element.children.length > 0 ? (openBlock(), createBlock(_component_el_sub_menu, {
                                        key: 0,
                                        index: element.index
                                      }, {
                                        title: withCtx(() => [
                                          createVNode(_component_el_icon, { class: "drag-handle" }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("span", null, toDisplayString(element.title), 1)
                                        ]),
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(element.children, (child) => {
                                            return openBlock(), createBlock(_component_el_menu_item, {
                                              key: child.index,
                                              index: child.index
                                            }, {
                                              title: withCtx(() => [
                                                createVNode("span", null, toDisplayString(child.title), 1)
                                              ]),
                                              default: withCtx(() => [
                                                child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1032, ["index"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["index"])) : (openBlock(), createBlock(_component_el_menu_item, {
                                        key: 1,
                                        index: element.index,
                                        class: { "menu-item-spacing": element.spacing }
                                      }, {
                                        title: withCtx(() => [
                                          createVNode("span", null, toDisplayString(element.title), 1)
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_el_icon, { class: "drag-handle" }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["index", "class"]))
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["list"])
                              ]),
                              _: 1
                            }, 8, ["default-active", "collapse"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="sidebar-toggle" data-v-827bbca9${_scopeId2}>`);
                    if (isCollapse.value) {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(expand_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(expand_default))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(fold_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(fold_default))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["logo", { "collapsed": isCollapse.value }]
                      }, [
                        createVNode("div", { class: "logo-icon" }, "F"),
                        withDirectives(createVNode("div", { class: "logo-text" }, [
                          createVNode("h2", null, "FANTULA"),
                          createVNode("span", { class: "logo-sub" }, "ADMINISTRATOR")
                        ], 512), [
                          [vShow, !isCollapse.value]
                        ])
                      ], 2),
                      createVNode(_component_el_scrollbar, { class: "menu-scrollbar" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu, {
                            "default-active": activeMenu.value,
                            class: "el-menu-vertical",
                            collapse: isCollapse.value,
                            "collapse-transition": false,
                            router: "",
                            "unique-opened": "",
                            "background-color": "transparent",
                            "text-color": "var(--el-text-color-regular)",
                            "active-text-color": "var(--el-color-primary)"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(draggable), {
                                list: filteredMenuList.value,
                                "item-key": "index",
                                animation: 200,
                                "ghost-class": "ghost-menu-item",
                                onEnd: saveMenuOrder,
                                handle: ".drag-handle"
                              }, {
                                item: withCtx(({ element }) => [
                                  createVNode("div", { class: "menu-wrapper" }, [
                                    element.children && element.children.length > 0 ? (openBlock(), createBlock(_component_el_sub_menu, {
                                      key: 0,
                                      index: element.index
                                    }, {
                                      title: withCtx(() => [
                                        createVNode(_component_el_icon, { class: "drag-handle" }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("span", null, toDisplayString(element.title), 1)
                                      ]),
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(element.children, (child) => {
                                          return openBlock(), createBlock(_component_el_menu_item, {
                                            key: child.index,
                                            index: child.index
                                          }, {
                                            title: withCtx(() => [
                                              createVNode("span", null, toDisplayString(child.title), 1)
                                            ]),
                                            default: withCtx(() => [
                                              child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1032, ["index"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["index"])) : (openBlock(), createBlock(_component_el_menu_item, {
                                      key: 1,
                                      index: element.index,
                                      class: { "menu-item-spacing": element.spacing }
                                    }, {
                                      title: withCtx(() => [
                                        createVNode("span", null, toDisplayString(element.title), 1)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_el_icon, { class: "drag-handle" }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["index", "class"]))
                                  ])
                                ]),
                                _: 1
                              }, 8, ["list"])
                            ]),
                            _: 1
                          }, 8, ["default-active", "collapse"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", {
                        class: "sidebar-toggle",
                        onClick: toggleCollapse
                      }, [
                        isCollapse.value ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(expand_default))
                          ]),
                          _: 1
                        })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(fold_default))
                          ]),
                          _: 1
                        }))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_container, { class: "main-container" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_header, { class: "admin-header" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="header-content" data-v-827bbca9${_scopeId3}><div id="header-portal" class="header-portal" data-v-827bbca9${_scopeId3}></div><div class="header-right-actions" data-v-827bbca9${_scopeId3}><button class="theme-toggle"${ssrRenderAttr("title", isDark.value ? "Switch to Light" : "Switch to Dark")} data-v-827bbca9${_scopeId3}>`);
                          if (isDark.value) {
                            _push4(ssrRenderComponent(_component_el_icon, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(sunny_default), null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(sunny_default))
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(_component_el_icon, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(moon_default), null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(moon_default))
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          }
                          _push4(`</button>`);
                          if (currentUser.value) {
                            _push4(`<div class="user-info" data-v-827bbca9${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_el_dropdown, { trigger: "click" }, {
                              dropdown: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_el_dropdown_menu, { class: "user-dropdown" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_el_dropdown_item, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_el_icon, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(user_default), null, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(user_default))
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(` \u4E2A\u4EBA\u4E2D\u5FC3 `);
                                            } else {
                                              return [
                                                createVNode(_component_el_icon, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(user_default))
                                                  ]),
                                                  _: 1
                                                }),
                                                createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_el_dropdown_item, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_el_icon, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(setting_default), null, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(setting_default))
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(` \u7CFB\u7EDF\u8BBE\u7F6E `);
                                            } else {
                                              return [
                                                createVNode(_component_el_icon, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(setting_default))
                                                  ]),
                                                  _: 1
                                                }),
                                                createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_el_dropdown_item, {
                                          divided: "",
                                          onClick: handleLogout
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_el_icon, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(switch_button_default), null, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(switch_button_default))
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(` \u9000\u51FA\u767B\u5F55 `);
                                            } else {
                                              return [
                                                createVNode(_component_el_icon, null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(switch_button_default))
                                                  ]),
                                                  _: 1
                                                }),
                                                createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_el_dropdown_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(user_default))
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_el_dropdown_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(setting_default))
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_el_dropdown_item, {
                                            divided: "",
                                            onClick: handleLogout
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(switch_button_default))
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_el_dropdown_menu, { class: "user-dropdown" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_dropdown_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(user_default))
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_el_dropdown_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(setting_default))
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_el_dropdown_item, {
                                          divided: "",
                                          onClick: handleLogout
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(switch_button_default))
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ];
                                }
                              }),
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="el-dropdown-link" data-v-827bbca9${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_el_avatar, {
                                    size: 36,
                                    src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                                    class: "user-avatar"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<div class="user-details" data-v-827bbca9${_scopeId4}><span class="username" data-v-827bbca9${_scopeId4}>${ssrInterpolate(currentUser.value.name)}</span><span class="user-role" data-v-827bbca9${_scopeId4}>${ssrInterpolate(currentUser.value.email)}</span></div>`);
                                  _push5(ssrRenderComponent(_component_el_icon, { class: "el-icon--right" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(arrow_down_default), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(arrow_down_default))
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "el-dropdown-link" }, [
                                      createVNode(_component_el_avatar, {
                                        size: 36,
                                        src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                                        class: "user-avatar"
                                      }),
                                      createVNode("div", { class: "user-details" }, [
                                        createVNode("span", { class: "username" }, toDisplayString(currentUser.value.name), 1),
                                        createVNode("span", { class: "user-role" }, toDisplayString(currentUser.value.email), 1)
                                      ]),
                                      createVNode(_component_el_icon, { class: "el-icon--right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(arrow_down_default))
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "header-content" }, [
                              createVNode("div", {
                                id: "header-portal",
                                class: "header-portal"
                              }),
                              createVNode("div", { class: "header-right-actions" }, [
                                createVNode("button", {
                                  class: "theme-toggle",
                                  onClick: toggleDark,
                                  title: isDark.value ? "Switch to Light" : "Switch to Dark"
                                }, [
                                  isDark.value ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(sunny_default))
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(moon_default))
                                    ]),
                                    _: 1
                                  }))
                                ], 8, ["title"]),
                                currentUser.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "user-info"
                                }, [
                                  createVNode(_component_el_dropdown, { trigger: "click" }, {
                                    dropdown: withCtx(() => [
                                      createVNode(_component_el_dropdown_menu, { class: "user-dropdown" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_dropdown_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(user_default))
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_el_dropdown_item, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(setting_default))
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_el_dropdown_item, {
                                            divided: "",
                                            onClick: handleLogout
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_el_icon, null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(switch_button_default))
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "el-dropdown-link" }, [
                                        createVNode(_component_el_avatar, {
                                          size: 36,
                                          src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                                          class: "user-avatar"
                                        }),
                                        createVNode("div", { class: "user-details" }, [
                                          createVNode("span", { class: "username" }, toDisplayString(currentUser.value.name), 1),
                                          createVNode("span", { class: "user-role" }, toDisplayString(currentUser.value.email), 1)
                                        ]),
                                        createVNode(_component_el_icon, { class: "el-icon--right" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(arrow_down_default))
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_main, { class: "admin-main" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="main-content-wrapper" data-v-827bbca9${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_NuxtPage, null, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "main-content-wrapper" }, [
                              createVNode(_component_NuxtPage)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_header, { class: "admin-header" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "header-content" }, [
                            createVNode("div", {
                              id: "header-portal",
                              class: "header-portal"
                            }),
                            createVNode("div", { class: "header-right-actions" }, [
                              createVNode("button", {
                                class: "theme-toggle",
                                onClick: toggleDark,
                                title: isDark.value ? "Switch to Light" : "Switch to Dark"
                              }, [
                                isDark.value ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(sunny_default))
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(moon_default))
                                  ]),
                                  _: 1
                                }))
                              ], 8, ["title"]),
                              currentUser.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "user-info"
                              }, [
                                createVNode(_component_el_dropdown, { trigger: "click" }, {
                                  dropdown: withCtx(() => [
                                    createVNode(_component_el_dropdown_menu, { class: "user-dropdown" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_dropdown_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(user_default))
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_el_dropdown_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(setting_default))
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_el_dropdown_item, {
                                          divided: "",
                                          onClick: handleLogout
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_el_icon, null, {
                                              default: withCtx(() => [
                                                createVNode(unref(switch_button_default))
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", { class: "el-dropdown-link" }, [
                                      createVNode(_component_el_avatar, {
                                        size: 36,
                                        src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                                        class: "user-avatar"
                                      }),
                                      createVNode("div", { class: "user-details" }, [
                                        createVNode("span", { class: "username" }, toDisplayString(currentUser.value.name), 1),
                                        createVNode("span", { class: "user-role" }, toDisplayString(currentUser.value.email), 1)
                                      ]),
                                      createVNode(_component_el_icon, { class: "el-icon--right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(arrow_down_default))
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  _: 1
                                })
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_main, { class: "admin-main" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "main-content-wrapper" }, [
                            createVNode(_component_NuxtPage)
                          ])
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
                createVNode(_component_el_aside, {
                  width: isCollapse.value ? "64px" : "250px",
                  class: "admin-aside"
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: ["logo", { "collapsed": isCollapse.value }]
                    }, [
                      createVNode("div", { class: "logo-icon" }, "F"),
                      withDirectives(createVNode("div", { class: "logo-text" }, [
                        createVNode("h2", null, "FANTULA"),
                        createVNode("span", { class: "logo-sub" }, "ADMINISTRATOR")
                      ], 512), [
                        [vShow, !isCollapse.value]
                      ])
                    ], 2),
                    createVNode(_component_el_scrollbar, { class: "menu-scrollbar" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu, {
                          "default-active": activeMenu.value,
                          class: "el-menu-vertical",
                          collapse: isCollapse.value,
                          "collapse-transition": false,
                          router: "",
                          "unique-opened": "",
                          "background-color": "transparent",
                          "text-color": "var(--el-text-color-regular)",
                          "active-text-color": "var(--el-color-primary)"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(draggable), {
                              list: filteredMenuList.value,
                              "item-key": "index",
                              animation: 200,
                              "ghost-class": "ghost-menu-item",
                              onEnd: saveMenuOrder,
                              handle: ".drag-handle"
                            }, {
                              item: withCtx(({ element }) => [
                                createVNode("div", { class: "menu-wrapper" }, [
                                  element.children && element.children.length > 0 ? (openBlock(), createBlock(_component_el_sub_menu, {
                                    key: 0,
                                    index: element.index
                                  }, {
                                    title: withCtx(() => [
                                      createVNode(_component_el_icon, { class: "drag-handle" }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("span", null, toDisplayString(element.title), 1)
                                    ]),
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(element.children, (child) => {
                                        return openBlock(), createBlock(_component_el_menu_item, {
                                          key: child.index,
                                          index: child.index
                                        }, {
                                          title: withCtx(() => [
                                            createVNode("span", null, toDisplayString(child.title), 1)
                                          ]),
                                          default: withCtx(() => [
                                            child.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(iconMap[child.icon])))
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["index"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["index"])) : (openBlock(), createBlock(_component_el_menu_item, {
                                    key: 1,
                                    index: element.index,
                                    class: { "menu-item-spacing": element.spacing }
                                  }, {
                                    title: withCtx(() => [
                                      createVNode("span", null, toDisplayString(element.title), 1)
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_component_el_icon, { class: "drag-handle" }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(resolveDynamicComponent(iconMap[element.icon])))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["index", "class"]))
                                ])
                              ]),
                              _: 1
                            }, 8, ["list"])
                          ]),
                          _: 1
                        }, 8, ["default-active", "collapse"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      class: "sidebar-toggle",
                      onClick: toggleCollapse
                    }, [
                      isCollapse.value ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(unref(expand_default))
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(unref(fold_default))
                        ]),
                        _: 1
                      }))
                    ])
                  ]),
                  _: 1
                }, 8, ["width"]),
                createVNode(_component_el_container, { class: "main-container" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_header, { class: "admin-header" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "header-content" }, [
                          createVNode("div", {
                            id: "header-portal",
                            class: "header-portal"
                          }),
                          createVNode("div", { class: "header-right-actions" }, [
                            createVNode("button", {
                              class: "theme-toggle",
                              onClick: toggleDark,
                              title: isDark.value ? "Switch to Light" : "Switch to Dark"
                            }, [
                              isDark.value ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(unref(sunny_default))
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(unref(moon_default))
                                ]),
                                _: 1
                              }))
                            ], 8, ["title"]),
                            currentUser.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "user-info"
                            }, [
                              createVNode(_component_el_dropdown, { trigger: "click" }, {
                                dropdown: withCtx(() => [
                                  createVNode(_component_el_dropdown_menu, { class: "user-dropdown" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_dropdown_item, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_icon, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(user_default))
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_el_dropdown_item, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_icon, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(setting_default))
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_el_dropdown_item, {
                                        divided: "",
                                        onClick: handleLogout
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_icon, null, {
                                            default: withCtx(() => [
                                              createVNode(unref(switch_button_default))
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                default: withCtx(() => [
                                  createVNode("div", { class: "el-dropdown-link" }, [
                                    createVNode(_component_el_avatar, {
                                      size: 36,
                                      src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                                      class: "user-avatar"
                                    }),
                                    createVNode("div", { class: "user-details" }, [
                                      createVNode("span", { class: "username" }, toDisplayString(currentUser.value.name), 1),
                                      createVNode("span", { class: "user-role" }, toDisplayString(currentUser.value.email), 1)
                                    ]),
                                    createVNode(_component_el_icon, { class: "el-icon--right" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(arrow_down_default))
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_main, { class: "admin-main" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "main-content-wrapper" }, [
                          createVNode(_component_NuxtPage)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _mgmt_9Xfa3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-827bbca9"]]);

export { _mgmt_9Xfa3 as default };
//# sourceMappingURL=_mgmt_9Xfa3-DNG8n7bM.mjs.map
