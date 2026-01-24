import { E as ElButton } from "./index-DR2tYDZ3.js";
import { E as ElForm, a as ElFormItem } from "./index-j17drbdQ.js";
import { E as ElInput } from "./index-Bf1ETwA6.js";
import { E as ElSelect, a as ElOption } from "./index-Cf_t59lc.js";
import { E as ElIcon, an as edit_default, p as plus_default, ah as ElMessage, _ as _export_sfc } from "../server.mjs";
import { E as ElSwitch } from "./index-CpWtG_dp.js";
/* empty css                   */
/* empty css                      */
/* empty css                  */
/* empty css                */
/* empty css                   */
/* empty css                      */
/* empty css                   */
/* empty css                   */
/* empty css                    */
import { defineComponent, ref, computed, reactive, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { a as adminCommunityApi } from "./community-DrIiPHjK.js";
import { A as AdminImagePicker } from "./AdminImagePicker-B9Ws9T0J.js";
import { v as vLoading } from "./directive-tOiqatq5.js";
import "./index-7IYgoTSU.js";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "lodash-unified";
import "@vue/shared";
import "async-validator";
import "@vueuse/core";
import "./index-Dxw_X3Hq.js";
import "./event-BZTOGHfp.js";
import "./index-ClPmkyX9.js";
import "./aria-B8G3G_75.js";
import "./index-B9I5bL_Z.js";
import "@popperjs/core";
import "./focus-trap-D_6Xxduc.js";
import "./index-D_b573Qt.js";
import "./index-BOQJCp53.js";
import "./strings-D1uxkXhq.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "./index-DCrMmn3b.js";
import "./vnode-D0IHQw_9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
import "./validator-T0bsmJHo.js";
import "./index-I18rzBgu.js";
import "./index-Dg8Z-nTr.js";
import "./refs-CxYYXu5Q.js";
import "./index-B-o0CD59.js";
import "./index-DhXCDWyG.js";
import "./index-Dr3RPaW4.js";
import "./index-DKY_z0U1.js";
/* empty css                   */
/* empty css                    */
/* empty css                     */
/* empty css                         */
/* empty css                  */
import "./admin-supabase-nszo-IoU.js";
import "./cdk-ObzrOMzo.js";
import "./media-C2x210Ez.js";
import "./order-kd-ypcFy.js";
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
      title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      category: [{ required: true, message: "请选择分类", trigger: "change" }]
    };
    const handleImageSelect = (url) => {
      form.cover_image = url;
      ElMessage.success("已选择图片");
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
      ElMessage.warning("未能识别视频链接格式，请检查");
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
              ElMessage.success("更新成功");
            } else {
              const { error } = await adminCommunityApi.createArticle(form);
              if (error) throw error;
              ElMessage.success("发布成功");
            }
            router.push("/_mgmt_9Xfa3/article");
          } catch (error) {
            ElMessage.error("提交失败: " + error.message);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page-post" }, _attrs))} data-v-f1edf8f1><div class="page-header" data-v-f1edf8f1><h2 class="page-title" data-v-f1edf8f1>${ssrInterpolate(isEdit.value ? "编辑文章" : "发布文章")}</h2>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => unref(router).back()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`返回列表`);
          } else {
            return [
              createTextVNode("返回列表")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="form-container" data-v-f1edf8f1>`);
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
              label: "文章标题",
              prop: "title"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.title,
                    "onUpdate:modelValue": ($event) => form.title = $event,
                    placeholder: "请输入文章标题"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.title,
                      "onUpdate:modelValue": ($event) => form.title = $event,
                      placeholder: "请输入文章标题"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "所属分类",
              prop: "category"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: form.category,
                    "onUpdate:modelValue": ($event) => form.category = $event,
                    placeholder: "请选择分类"
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
                                _push5(`<span style="${ssrRenderStyle({ "float": "left" })}" data-v-f1edf8f1${_scopeId4}>${ssrInterpolate(item.icon)} ${ssrInterpolate(item.name)}</span>`);
                                if (!item.is_active) {
                                  _push5(`<span style="${ssrRenderStyle({ "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" })}" data-v-f1edf8f1${_scopeId4}>已禁用</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode("span", { style: { "float": "left" } }, toDisplayString(item.icon) + " " + toDisplayString(item.name), 1),
                                  !item.is_active ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    style: { "float": "right", "color": "var(--el-text-color-placeholder)", "font-size": "13px" }
                                  }, "已禁用")) : createCommentVNode("", true)
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
                                }, "已禁用")) : createCommentVNode("", true)
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
                      placeholder: "请选择分类"
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
                              }, "已禁用")) : createCommentVNode("", true)
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
              label: "封面图片",
              prop: "cover_image"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="image-select-container" data-v-f1edf8f1${_scopeId2}>`);
                  if (form.cover_image) {
                    _push3(`<div class="cover-preview" data-v-f1edf8f1${_scopeId2}><img${ssrRenderAttr("src", form.cover_image)} class="cover-image" data-v-f1edf8f1${_scopeId2}><div class="cover-mask" data-v-f1edf8f1${_scopeId2}>`);
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
                    _push3(`<span data-v-f1edf8f1${_scopeId2}>更换图片</span></div></div>`);
                  } else {
                    _push3(`<div class="cover-uploader" data-v-f1edf8f1${_scopeId2}>`);
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
                    _push3(`<span data-v-f1edf8f1${_scopeId2}>选择封面</span></div>`);
                  }
                  _push3(`<div class="tip-text" data-v-f1edf8f1${_scopeId2}>建议尺寸 800x450 (16:9)，点击选择或上传</div></div>`);
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
                          createVNode("span", null, "更换图片")
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
                        createVNode("span", null, "选择封面")
                      ], 8, ["onClick"])),
                      createVNode("div", { class: "tip-text" }, "建议尺寸 800x450 (16:9)，点击选择或上传")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "视频链接",
              prop: "video_url"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.video_url,
                    "onUpdate:modelValue": ($event) => form.video_url = $event,
                    placeholder: "支持 Bilibili (BV号) 或 YouTube 链接"
                  }, {
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, { onClick: checkVideo }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`预览`);
                            } else {
                              return [
                                createTextVNode("预览")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, { onClick: checkVideo }, {
                            default: withCtx(() => [
                              createTextVNode("预览")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="tip-text" data-v-f1edf8f1${_scopeId2}>示例: https://www.bilibili.com/video/BVxxx 或 https://youtu.be/xxx</div>`);
                  if (videoPreviewUrl.value) {
                    _push3(`<div class="video-preview" data-v-f1edf8f1${_scopeId2}><iframe${ssrRenderAttr("src", videoPreviewUrl.value)} scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" data-v-f1edf8f1${_scopeId2}></iframe></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.video_url,
                      "onUpdate:modelValue": ($event) => form.video_url = $event,
                      placeholder: "支持 Bilibili (BV号) 或 YouTube 链接"
                    }, {
                      append: withCtx(() => [
                        createVNode(_component_el_button, { onClick: checkVideo }, {
                          default: withCtx(() => [
                            createTextVNode("预览")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "tip-text" }, "示例: https://www.bilibili.com/video/BVxxx 或 https://youtu.be/xxx"),
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
              label: "简短描述",
              prop: "description"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.description,
                    "onUpdate:modelValue": ($event) => form.description = $event,
                    type: "textarea",
                    rows: 3,
                    placeholder: "文章摘要，用于列表展示"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.description,
                      "onUpdate:modelValue": ($event) => form.description = $event,
                      type: "textarea",
                      rows: 3,
                      placeholder: "文章摘要，用于列表展示"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "详细内容",
              prop: "content"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: form.content,
                    "onUpdate:modelValue": ($event) => form.content = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "支持 Markdown 格式。如果填写了视频链接，视频将显示在内容上方。"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: form.content,
                      "onUpdate:modelValue": ($event) => form.content = $event,
                      type: "textarea",
                      rows: 15,
                      placeholder: "支持 Markdown 格式。如果填写了视频链接，视频将显示在内容上方。"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, { label: "发布状态" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_switch, {
                    modelValue: form.is_published,
                    "onUpdate:modelValue": ($event) => form.is_published = $event,
                    "active-text": "立即发布",
                    "inactive-text": "存为草稿"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_switch, {
                      modelValue: form.is_published,
                      "onUpdate:modelValue": ($event) => form.is_published = $event,
                      "active-text": "立即发布",
                      "inactive-text": "存为草稿"
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
                        _push4(`保存提交`);
                      } else {
                        return [
                          createTextVNode("保存提交")
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
                        _push4(`取消`);
                      } else {
                        return [
                          createTextVNode("取消")
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
                        createTextVNode("保存提交")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_button, {
                      onClick: ($event) => unref(router).back()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("取消")
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
                label: "文章标题",
                prop: "title"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.title,
                    "onUpdate:modelValue": ($event) => form.title = $event,
                    placeholder: "请输入文章标题"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "所属分类",
                prop: "category"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: form.category,
                    "onUpdate:modelValue": ($event) => form.category = $event,
                    placeholder: "请选择分类"
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
                            }, "已禁用")) : createCommentVNode("", true)
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
                label: "封面图片",
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
                        createVNode("span", null, "更换图片")
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
                      createVNode("span", null, "选择封面")
                    ], 8, ["onClick"])),
                    createVNode("div", { class: "tip-text" }, "建议尺寸 800x450 (16:9)，点击选择或上传")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "视频链接",
                prop: "video_url"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.video_url,
                    "onUpdate:modelValue": ($event) => form.video_url = $event,
                    placeholder: "支持 Bilibili (BV号) 或 YouTube 链接"
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_el_button, { onClick: checkVideo }, {
                        default: withCtx(() => [
                          createTextVNode("预览")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "tip-text" }, "示例: https://www.bilibili.com/video/BVxxx 或 https://youtu.be/xxx"),
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
                label: "简短描述",
                prop: "description"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.description,
                    "onUpdate:modelValue": ($event) => form.description = $event,
                    type: "textarea",
                    rows: 3,
                    placeholder: "文章摘要，用于列表展示"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "详细内容",
                prop: "content"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.content,
                    "onUpdate:modelValue": ($event) => form.content = $event,
                    type: "textarea",
                    rows: 15,
                    placeholder: "支持 Markdown 格式。如果填写了视频链接，视频将显示在内容上方。"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "发布状态" }, {
                default: withCtx(() => [
                  createVNode(_component_el_switch, {
                    modelValue: form.is_published,
                    "onUpdate:modelValue": ($event) => form.is_published = $event,
                    "active-text": "立即发布",
                    "inactive-text": "存为草稿"
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
                      createTextVNode("保存提交")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    onClick: ($event) => unref(router).back()
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_mgmt_9Xfa3/article/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f1edf8f1"]]);
export {
  post as default
};
//# sourceMappingURL=post-DIGtBYuJ.js.map
