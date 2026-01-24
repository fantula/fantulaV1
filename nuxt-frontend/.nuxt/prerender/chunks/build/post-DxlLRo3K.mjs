import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElForm, a as ElFormItem } from './index-B8nHr-W3.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { _ as _export_sfc, E as ElIcon, an as edit_default, p as plus_default, ah as ElMessage } from './server.mjs';
import { E as ElSwitch } from './index-_GccYHgs.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { a as adminCommunityApi } from './community-DrIiPHjK.mjs';
import { A as AdminImagePicker } from './AdminImagePicker-C_TRoGnC.mjs';
import { v as vLoading } from './directive-tOiqatq5.mjs';
import './index-7IYgoTSU.mjs';
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/async-validator/dist-node/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './index-Dxw_X3Hq.mjs';
import './event-BZTOGHfp.mjs';
import './index-ClPmkyX9.mjs';
import './aria-B8G3G_75.mjs';
import './index-CIoWkt90.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@popperjs/core/dist/index.mjs';
import './focus-trap-D_6Xxduc.mjs';
import './index-D_b573Qt.mjs';
import './index-BOQJCp53.mjs';
import './strings-D1uxkXhq.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-DCrMmn3b.mjs';
import './vnode-D0IHQw_9.mjs';
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
import './validator-T0bsmJHo.mjs';
import './index-CzosOSMt.mjs';
import './index-Dg8Z-nTr.mjs';
import './refs-CxYYXu5Q.mjs';
import './index-B-o0CD59.mjs';
import './index-DhXCDWyG.mjs';
import './index-Dr3RPaW4.mjs';
import './index-DKY_z0U1.mjs';
import './admin-supabase-nszo-IoU.mjs';
import './cdk-ObzrOMzo.mjs';
import './media-C2x210Ez.mjs';
import './order-kd-ypcFy.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const formRef = ref();
    const loading = ref(false);
    const categories = ref([]);
    const showImagePicker = ref(false);
    const isEdit = computed(() => !!route.query.id);
    const form = reactive({
      title: "",
      category: "",
      cover_image: "",
      video_url: "",
      description: "",
      content: "",
      is_published: false
    });
    const rules = {
      title: [{ required: true, message: "\u8BF7\u8F93\u5165\u6807\u9898", trigger: "blur" }],
      category: [{ required: true, message: "\u8BF7\u9009\u62E9\u5206\u7C7B", trigger: "change" }]
    };
    const handleImageSelect = (url) => {
      form.cover_image = url;
      ElMessage.success("\u5DF2\u9009\u62E9\u56FE\u7247");
    };
    const videoPreviewUrl = ref("");
    const checkVideo = () => {
      const url = form.video_url;
      if (!url) {
        videoPreviewUrl.value = "";
        return;
      }
      const b_match = url.match(/(BV[a-zA-Z0-9]+)/);
      if (b_match) {
        videoPreviewUrl.value = `//player.bilibili.com/player.html?bvid=${b_match[1]}&page=1&high_quality=1&danmaku=0`;
        return;
      }
      const y_match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
      if (y_match) {
        videoPreviewUrl.value = `https://www.youtube.com/embed/${y_match[1]}?rel=0&modestbranding=1`;
        return;
      }
      ElMessage.warning("\u672A\u80FD\u8BC6\u522B\u89C6\u9891\u94FE\u63A5\u683C\u5F0F\uFF0C\u8BF7\u68C0\u67E5");
      videoPreviewUrl.value = "";
    };
    const submitForm = async () => {
      if (!formRef.value) return;
      await formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            if (isEdit.value) {
              const { error } = await adminCommunityApi.updateArticle(route.query.id, form);
              if (error) throw error;
              ElMessage.success("\u66F4\u65B0\u6210\u529F");
            } else {
              const { error } = await adminCommunityApi.createArticle(form);
              if (error) throw error;
              ElMessage.success("\u53D1\u5E03\u6210\u529F");
            }
            router.push("/_mgmt_9Xfa3/article");
          } catch (error) {
            ElMessage.error("\u63D0\u4EA4\u5931\u8D25: " + error.message);
          } finally {
            loading.value = false;
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_icon = ElIcon;
      const _component_el_switch = ElSwitch;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page-post" }, _attrs))} data-v-705662d8><div class="page-header" data-v-705662d8><h2 class="page-title" data-v-705662d8>${ssrInterpolate(isEdit.value ? "\u7F16\u8F91\u6587\u7AE0" : "\u53D1\u5E03\u6587\u7AE0")}</h2>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => unref(router).back()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD4\u56DE\u5217\u8868`);
          } else {
            return [
              createTextVNode("\u8FD4\u56DE\u5217\u8868")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="form-container" data-v-705662d8>`);
      _push(ssrRenderComponent(_component_el_form, mergeProps({
        model: form,
        "label-width": "120px",
        ref_key: "formRef",
        ref: formRef,
        rules
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u6587\u7AE0\u6807\u9898",
              prop: "title"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.title,
                    "onUpdate:modelValue": ($event) => form.title = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u6587\u7AE0\u6807\u9898"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.title,
                      "onUpdate:modelValue": ($event) => form.title = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u6587\u7AE0\u6807\u9898"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u6240\u5C5E\u5206\u7C7B",
              prop: "category"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: form.category,
                    "onUpdate:modelValue": ($event) => form.category = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(categories.value, (item) => {
                          _push4(ssrRenderComponent(_component_el_option, {
                            key: item.id,
                            label: item.name,
                            value: item.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span style="${ssrRenderStyle({ "float": "left" })}" data-v-705662d8${_scopeId4}>${ssrInterpolate(item.icon)} ${ssrInterpolate(item.name)}</span>`);
                                if (!item.is_active) {
                                  _push5(`<span style="${ssrRenderStyle({ "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" })}" data-v-705662d8${_scopeId4}>\u5DF2\u7981\u7528</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode("span", { style: { "float": "left" } }, toDisplayString(item.icon) + " " + toDisplayString(item.name), 1),
                                  !item.is_active ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    style: { "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" }
                                  }, "\u5DF2\u7981\u7528")) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.id,
                              label: item.name,
                              value: item.id
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { style: { "float": "left" } }, toDisplayString(item.icon) + " " + toDisplayString(item.name), 1),
                                !item.is_active ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  style: { "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" }
                                }, "\u5DF2\u7981\u7528")) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: form.category,
                      "onUpdate:modelValue": ($event) => form.category = $event,
                      placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (item) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: item.id,
                            label: item.name,
                            value: item.id
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { style: { "float": "left" } }, toDisplayString(item.icon) + " " + toDisplayString(item.name), 1),
                              !item.is_active ? (openBlock(), createBlock("span", {
                                key: 0,
                                style: { "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" }
                              }, "\u5DF2\u7981\u7528")) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u5C01\u9762\u56FE\u7247",
              prop: "cover_image"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="image-select-container" data-v-705662d8${_scopeId2}>`);
                  if (form.cover_image) {
                    _push3(`<div class="cover-preview" data-v-705662d8${_scopeId2}><img${ssrRenderAttr("src", form.cover_image)} class="cover-image" data-v-705662d8${_scopeId2}><div class="cover-mask" data-v-705662d8${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(edit_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(edit_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-705662d8${_scopeId2}>\u66F4\u6362\u56FE\u7247</span></div></div>`);
                  } else {
                    _push3(`<div class="cover-uploader" data-v-705662d8${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_icon, { class: "cover-uploader-icon" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(plus_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(plus_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-705662d8${_scopeId2}>\u9009\u62E9\u5C01\u9762</span></div>`);
                  }
                  _push3(`<div class="tip-text" data-v-705662d8${_scopeId2}>\u5EFA\u8BAE\u5C3A\u5BF8 800x450 (16:9)\uFF0C\u70B9\u51FB\u9009\u62E9\u6216\u4E0A\u4F20</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "image-select-container" }, [
                      form.cover_image ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "cover-preview",
                        onClick: ($event) => showImagePicker.value = true
                      }, [
                        createVNode("img", {
                          src: form.cover_image,
                          class: "cover-image"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "cover-mask" }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(edit_default))
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "\u66F4\u6362\u56FE\u7247")
                        ])
                      ], 8, ["onClick"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "cover-uploader",
                        onClick: ($event) => showImagePicker.value = true
                      }, [
                        createVNode(_component_el_icon, { class: "cover-uploader-icon" }, {
                          default: withCtx(() => [
                            createVNode(unref(plus_default))
                          ]),
                          _: 1
                        }),
                        createVNode("span", null, "\u9009\u62E9\u5C01\u9762")
                      ], 8, ["onClick"])),
                      createVNode("div", { class: "tip-text" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x450 (16:9)\uFF0C\u70B9\u51FB\u9009\u62E9\u6216\u4E0A\u4F20")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u89C6\u9891\u94FE\u63A5",
              prop: "video_url"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.video_url,
                    "onUpdate:modelValue": ($event) => form.video_url = $event,
                    placeholder: "\u652F\u6301 Bilibili (BV\u53F7) \u6216 YouTube \u94FE\u63A5"
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, { onClick: checkVideo }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u9884\u89C8`);
                            } else {
                              return [
                                createTextVNode("\u9884\u89C8")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, { onClick: checkVideo }, {
                            default: withCtx(() => [
                              createTextVNode("\u9884\u89C8")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="tip-text" data-v-705662d8${_scopeId2}>\u793A\u4F8B: https://www.bilibili.com/video/BVxxx \u6216 https://youtu.be/xxx</div>`);
                  if (videoPreviewUrl.value) {
                    _push3(`<div class="video-preview" data-v-705662d8${_scopeId2}><iframe${ssrRenderAttr("src", videoPreviewUrl.value)} scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" data-v-705662d8${_scopeId2}></iframe></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.video_url,
                      "onUpdate:modelValue": ($event) => form.video_url = $event,
                      placeholder: "\u652F\u6301 Bilibili (BV\u53F7) \u6216 YouTube \u94FE\u63A5"
                    }, {
                      append: withCtx(() => [
                        createVNode(_component_el_button, { onClick: checkVideo }, {
                          default: withCtx(() => [
                            createTextVNode("\u9884\u89C8")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "tip-text" }, "\u793A\u4F8B: https://www.bilibili.com/video/BVxxx \u6216 https://youtu.be/xxx"),
                    videoPreviewUrl.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "video-preview"
                    }, [
                      createVNode("iframe", {
                        src: videoPreviewUrl.value,
                        scrolling: "no",
                        border: "0",
                        frameborder: "no",
                        framespacing: "0",
                        allowfullscreen: "true"
                      }, null, 8, ["src"])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u7B80\u77ED\u63CF\u8FF0",
              prop: "description"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.description,
                    "onUpdate:modelValue": ($event) => form.description = $event,
                    type: "textarea",
                    rows: 3,
                    placeholder: "\u6587\u7AE0\u6458\u8981\uFF0C\u7528\u4E8E\u5217\u8868\u5C55\u793A"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.description,
                      "onUpdate:modelValue": ($event) => form.description = $event,
                      type: "textarea",
                      rows: 3,
                      placeholder: "\u6587\u7AE0\u6458\u8981\uFF0C\u7528\u4E8E\u5217\u8868\u5C55\u793A"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u8BE6\u7EC6\u5185\u5BB9",
              prop: "content"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.content,
                    "onUpdate:modelValue": ($event) => form.content = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "\u652F\u6301 Markdown \u683C\u5F0F\u3002\u5982\u679C\u586B\u5199\u4E86\u89C6\u9891\u94FE\u63A5\uFF0C\u89C6\u9891\u5C06\u663E\u793A\u5728\u5185\u5BB9\u4E0A\u65B9\u3002"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.content,
                      "onUpdate:modelValue": ($event) => form.content = $event,
                      type: "textarea",
                      rows: 15,
                      placeholder: "\u652F\u6301 Markdown \u683C\u5F0F\u3002\u5982\u679C\u586B\u5199\u4E86\u89C6\u9891\u94FE\u63A5\uFF0C\u89C6\u9891\u5C06\u663E\u793A\u5728\u5185\u5BB9\u4E0A\u65B9\u3002"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "\u53D1\u5E03\u72B6\u6001" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: form.is_published,
                    "onUpdate:modelValue": ($event) => form.is_published = $event,
                    "active-text": "\u7ACB\u5373\u53D1\u5E03",
                    "inactive-text": "\u5B58\u4E3A\u8349\u7A3F"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: form.is_published,
                      "onUpdate:modelValue": ($event) => form.is_published = $event,
                      "active-text": "\u7ACB\u5373\u53D1\u5E03",
                      "inactive-text": "\u5B58\u4E3A\u8349\u7A3F"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    onClick: submitForm
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u4FDD\u5B58\u63D0\u4EA4`);
                      } else {
                        return [
                          createTextVNode("\u4FDD\u5B58\u63D0\u4EA4")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => unref(router).back()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u53D6\u6D88`);
                      } else {
                        return [
                          createTextVNode("\u53D6\u6D88")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: submitForm
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u4FDD\u5B58\u63D0\u4EA4")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_button, {
                      onClick: ($event) => unref(router).back()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u53D6\u6D88")
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
              createVNode(_component_el_form_item, {
                label: "\u6587\u7AE0\u6807\u9898",
                prop: "title"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.title,
                    "onUpdate:modelValue": ($event) => form.title = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u6587\u7AE0\u6807\u9898"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u6240\u5C5E\u5206\u7C7B",
                prop: "category"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: form.category,
                    "onUpdate:modelValue": ($event) => form.category = $event,
                    placeholder: "\u8BF7\u9009\u62E9\u5206\u7C7B"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (item) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: item.id,
                          label: item.name,
                          value: item.id
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { style: { "float": "left" } }, toDisplayString(item.icon) + " " + toDisplayString(item.name), 1),
                            !item.is_active ? (openBlock(), createBlock("span", {
                              key: 0,
                              style: { "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" }
                            }, "\u5DF2\u7981\u7528")) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u5C01\u9762\u56FE\u7247",
                prop: "cover_image"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "image-select-container" }, [
                    form.cover_image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "cover-preview",
                      onClick: ($event) => showImagePicker.value = true
                    }, [
                      createVNode("img", {
                        src: form.cover_image,
                        class: "cover-image"
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "cover-mask" }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(edit_default))
                          ]),
                          _: 1
                        }),
                        createVNode("span", null, "\u66F4\u6362\u56FE\u7247")
                      ])
                    ], 8, ["onClick"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "cover-uploader",
                      onClick: ($event) => showImagePicker.value = true
                    }, [
                      createVNode(_component_el_icon, { class: "cover-uploader-icon" }, {
                        default: withCtx(() => [
                          createVNode(unref(plus_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\u9009\u62E9\u5C01\u9762")
                    ], 8, ["onClick"])),
                    createVNode("div", { class: "tip-text" }, "\u5EFA\u8BAE\u5C3A\u5BF8 800x450 (16:9)\uFF0C\u70B9\u51FB\u9009\u62E9\u6216\u4E0A\u4F20")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u89C6\u9891\u94FE\u63A5",
                prop: "video_url"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.video_url,
                    "onUpdate:modelValue": ($event) => form.video_url = $event,
                    placeholder: "\u652F\u6301 Bilibili (BV\u53F7) \u6216 YouTube \u94FE\u63A5"
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_el_button, { onClick: checkVideo }, {
                        default: withCtx(() => [
                          createTextVNode("\u9884\u89C8")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "tip-text" }, "\u793A\u4F8B: https://www.bilibili.com/video/BVxxx \u6216 https://youtu.be/xxx"),
                  videoPreviewUrl.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "video-preview"
                  }, [
                    createVNode("iframe", {
                      src: videoPreviewUrl.value,
                      scrolling: "no",
                      border: "0",
                      frameborder: "no",
                      framespacing: "0",
                      allowfullscreen: "true"
                    }, null, 8, ["src"])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u7B80\u77ED\u63CF\u8FF0",
                prop: "description"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.description,
                    "onUpdate:modelValue": ($event) => form.description = $event,
                    type: "textarea",
                    rows: 3,
                    placeholder: "\u6587\u7AE0\u6458\u8981\uFF0C\u7528\u4E8E\u5217\u8868\u5C55\u793A"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u8BE6\u7EC6\u5185\u5BB9",
                prop: "content"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.content,
                    "onUpdate:modelValue": ($event) => form.content = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "\u652F\u6301 Markdown \u683C\u5F0F\u3002\u5982\u679C\u586B\u5199\u4E86\u89C6\u9891\u94FE\u63A5\uFF0C\u89C6\u9891\u5C06\u663E\u793A\u5728\u5185\u5BB9\u4E0A\u65B9\u3002"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "\u53D1\u5E03\u72B6\u6001" }, {
                default: withCtx(() => [
                  createVNode(_component_el_switch, {
                    modelValue: form.is_published,
                    "onUpdate:modelValue": ($event) => form.is_published = $event,
                    "active-text": "\u7ACB\u5373\u53D1\u5E03",
                    "inactive-text": "\u5B58\u4E3A\u8349\u7A3F"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: submitForm
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u4FDD\u5B58\u63D0\u4EA4")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    onClick: ($event) => unref(router).back()
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D6\u6D88")
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
      _push(ssrRenderComponent(AdminImagePicker, {
        modelValue: showImagePicker.value,
        "onUpdate:modelValue": ($event) => showImagePicker.value = $event,
        onSelect: handleImageSelect
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/help-center/articles/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-705662d8"]]);

export { post as default };
//# sourceMappingURL=post-DxlLRo3K.mjs.map
