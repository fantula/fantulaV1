import { isNil, cloneDeep, isEqual, flatten } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import { D as throwError, b as useNamespace, d as debugWarn } from './server.mjs';
import { NOOP, isArray, isFunction, isString, isPlainObject } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { m as mutable } from './typescript-D6L75muK.mjs';
import { defineComponent, shallowRef, computed, provide, toRef, openBlock, createElementBlock, createBlock, unref, createSlots, withCtx, createVNode, mergeProps, renderSlot, createCommentVNode, watch, ref, TransitionGroup, normalizeClass, Fragment, renderList, withKeys, createElementVNode, withModifiers, toDisplayString, normalizeStyle, resolveDynamicComponent, inject, nextTick } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { E as ElIcon } from './index-C4aUwruK.mjs';
import { q as document_default, e as circle_check_default, R as check_default, b as close_default, m as zoom_in_default, Y as delete_default, w as warning_filled_default, d as circle_close_default } from './index-CbQ9NNm4.mjs';
import { b as useLocale } from './index-C1njJNPQ.mjs';
import { u as useFormDisabled } from './use-form-item-BJm4fR6K.mjs';
import { e as entriesOf } from './objects-Bz74KHmq.mjs';
import { useVModel } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';

const progressProps = buildProps({
  /**
   * @description type of progress bar
   */
  type: {
    type: String,
    default: "line",
    values: ["line", "circle", "dashboard"]
  },
  /**
   * @description percentage, required
   */
  percentage: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  /**
   * @description the current status of progress bar
   */
  status: {
    type: String,
    default: "",
    values: ["", "success", "exception", "warning"]
  },
  /**
   * @description set indeterminate progress
   */
  indeterminate: Boolean,
  /**
   * @description control the animation duration of indeterminate progress or striped flow progress
   */
  duration: {
    type: Number,
    default: 3
  },
  /**
   * @description the width of progress bar
   */
  strokeWidth: {
    type: Number,
    default: 6
  },
  /**
   * @description butt/circle/dashboard type shape at the end path
   */
  strokeLinecap: {
    type: definePropType(String),
    default: "round"
  },
  /**
   * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
   */
  textInside: Boolean,
  /**
   * @description the canvas width of circle progress bar
   */
  width: {
    type: Number,
    default: 126
  },
  /**
   * @description whether to show percentage
   */
  showText: {
    type: Boolean,
    default: true
  },
  /**
   * @description background color of progress bar. Overrides `status` prop
   */
  color: {
    type: definePropType([
      String,
      Array,
      Function
    ]),
    default: ""
  },
  /**
   * @description stripe over the progress bar's color
   */
  striped: Boolean,
  /**
   * @description get the stripes to flow
   */
  stripedFlow: Boolean,
  /**
   * @description custom text format
   */
  format: {
    type: definePropType(Function),
    default: (percentage) => `${percentage}%`
  }
});
const _hoisted_1$2 = ["aria-valuenow"];
const _hoisted_2$2 = { viewBox: "0 0 100 100" };
const _hoisted_3$1 = ["d", "stroke", "stroke-linecap", "stroke-width"];
const _hoisted_4$1 = ["d", "stroke", "opacity", "stroke-linecap", "stroke-width"];
const _hoisted_5$1 = { key: 0 };
var _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElProgress"
  },
  __name: "progress",
  props: progressProps,
  setup(__props) {
    const STATUS_COLOR_MAP = {
      success: "#13ce66",
      exception: "#ff4949",
      warning: "#e6a23c",
      default: "#20a0ff"
    };
    const props = __props;
    const ns = useNamespace("progress");
    const barStyle = computed(() => {
      const barStyle2 = {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`
      };
      const color = getCurrentColor(props.percentage);
      if (color.includes("gradient")) {
        barStyle2.background = color;
      } else {
        barStyle2.backgroundColor = color;
      }
      return barStyle2;
    });
    const relativeStrokeWidth = computed(
      () => (props.strokeWidth / props.width * 100).toFixed(1)
    );
    const radius = computed(() => {
      if (["circle", "dashboard"].includes(props.type)) {
        return Number.parseInt(
          `${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`,
          10
        );
      }
      return 0;
    });
    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = computed(() => 2 * Math.PI * radius.value);
    const rate = computed(() => props.type === "dashboard" ? 0.75 : 1);
    const strokeDashoffset = computed(() => {
      const offset = -1 * perimeter.value * (1 - rate.value) / 2;
      return `${offset}px`;
    });
    const trailPathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    }));
    const circlePathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
    }));
    const stroke = computed(() => {
      let ret;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
      }
      return ret;
    });
    const statusIcon = computed(() => {
      if (props.status === "warning") {
        return warning_filled_default;
      }
      if (props.type === "line") {
        return props.status === "success" ? circle_check_default : circle_close_default;
      } else {
        return props.status === "success" ? check_default : close_default;
      }
    });
    const progressTextSize = computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = computed(() => props.format(props.percentage));
    function getColors(color) {
      const span = 100 / color.length;
      const seriesColors = color.map((seriesColor, index) => {
        if (isString(seriesColor)) {
          return {
            color: seriesColor,
            percentage: (index + 1) * span
          };
        }
        return seriesColor;
      });
      return seriesColors.sort((a, b) => a.percentage - b.percentage);
    }
    const getCurrentColor = (percentage) => {
      var _a;
      const { color } = props;
      if (isFunction(color)) {
        return color(percentage);
      } else if (isString(color)) {
        return color;
      } else {
        const colors = getColors(color);
        for (const color2 of colors) {
          if (color2.percentage > percentage) return color2.color;
        }
        return (_a = colors[colors.length - 1]) == null ? void 0 : _a.color;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(__props.type),
          unref(ns).is(__props.status),
          {
            [unref(ns).m("without-text")]: !__props.showText,
            [unref(ns).m("text-inside")]: __props.textInside
          }
        ]),
        role: "progressbar",
        "aria-valuenow": __props.percentage,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        __props.type === "line" ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: normalizeClass(unref(ns).b("bar"))
          },
          [
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).be("bar", "outer")),
                style: normalizeStyle({ height: `${__props.strokeWidth}px` })
              },
              [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass([
                      unref(ns).be("bar", "inner"),
                      { [unref(ns).bem("bar", "inner", "indeterminate")]: __props.indeterminate },
                      { [unref(ns).bem("bar", "inner", "striped")]: __props.striped },
                      { [unref(ns).bem("bar", "inner", "striped-flow")]: __props.stripedFlow }
                    ]),
                    style: normalizeStyle(barStyle.value)
                  },
                  [
                    (__props.showText || _ctx.$slots.default) && __props.textInside ? (openBlock(), createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: normalizeClass(unref(ns).be("bar", "innerText"))
                      },
                      [
                        renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [
                          createElementVNode(
                            "span",
                            null,
                            toDisplayString(content.value),
                            1
                            /* TEXT */
                          )
                        ])
                      ],
                      2
                      /* CLASS */
                    )) : createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ],
              6
              /* CLASS, STYLE */
            )
          ],
          2
          /* CLASS */
        )) : (openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            class: normalizeClass(unref(ns).b("circle")),
            style: normalizeStyle({ height: `${__props.width}px`, width: `${__props.width}px` })
          },
          [
            (openBlock(), createElementBlock("svg", _hoisted_2$2, [
              createElementVNode("path", {
                class: normalizeClass(unref(ns).be("circle", "track")),
                d: trackPath.value,
                stroke: `var(${unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
                "stroke-linecap": __props.strokeLinecap,
                "stroke-width": relativeStrokeWidth.value,
                fill: "none",
                style: normalizeStyle(trailPathStyle.value)
              }, null, 14, _hoisted_3$1),
              createElementVNode("path", {
                class: normalizeClass(unref(ns).be("circle", "path")),
                d: trackPath.value,
                stroke: stroke.value,
                fill: "none",
                opacity: __props.percentage ? 1 : 0,
                "stroke-linecap": __props.strokeLinecap,
                "stroke-width": relativeStrokeWidth.value,
                style: normalizeStyle(circlePathStyle.value)
              }, null, 14, _hoisted_4$1)
            ]))
          ],
          6
          /* CLASS, STYLE */
        )),
        (__props.showText || _ctx.$slots.default) && !__props.textInside ? (openBlock(), createElementBlock(
          "div",
          {
            key: 2,
            class: normalizeClass(unref(ns).e("text")),
            style: normalizeStyle({ fontSize: `${progressTextSize.value}px` })
          },
          [
            renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [
              !__props.status ? (openBlock(), createElementBlock(
                "span",
                _hoisted_5$1,
                toDisplayString(content.value),
                1
                /* TEXT */
              )) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(statusIcon.value)))
                ]),
                _: 1
                /* STABLE */
              }))
            ])
          ],
          6
          /* CLASS, STYLE */
        )) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1$2);
    };
  }
});
const ElProgress = withInstall(_sfc_main$4);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const SCOPE$1 = "ElUpload";
class UploadAjaxError extends Error {
  constructor(message, status, method, url) {
    super(message);
    __publicField(this, "name", "UploadAjaxError");
    __publicField(this, "status");
    __publicField(this, "method");
    __publicField(this, "url");
    this.status = status;
    this.method = method;
    this.url = url;
  }
}
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to ${option.method} ${action} ${xhr.status}`;
  }
  return new UploadAjaxError(msg, xhr.status, option.method, action);
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
const ajaxUpload = (option) => {
  throwError(SCOPE$1, "XMLHttpRequest is undefined");
  const xhr = new (void 0)();
  const action = option.action;
  if (xhr.upload) {
    xhr.upload.addEventListener("progress", (evt) => {
      const progressEvt = evt;
      progressEvt.percent = evt.total > 0 ? evt.loaded / evt.total * 100 : 0;
      option.onProgress(progressEvt);
    });
  }
  const formData = new FormData();
  if (option.data) {
    for (const [key, value] of Object.entries(option.data)) {
      if (isArray(value) && value.length) formData.append(key, ...value);
      else formData.append(key, value);
    }
  }
  formData.append(option.filename, option.file, option.file.name);
  xhr.addEventListener("error", () => {
    option.onError(getError(action, option, xhr));
  });
  xhr.addEventListener("load", () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }
    option.onSuccess(getBody(xhr));
  });
  xhr.open(option.method, action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  if (headers instanceof Headers) {
    headers.forEach((value, key) => xhr.setRequestHeader(key, value));
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (isNil(value)) continue;
      xhr.setRequestHeader(key, String(value));
    }
  }
  xhr.send(formData);
  return xhr;
};
const uploadListTypes = ["text", "picture", "picture-card"];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
const uploadBaseProps = buildProps({
  /**
   * @description request URL
   */
  action: {
    type: String,
    default: "#"
  },
  /**
   * @description request headers
   */
  headers: {
    type: definePropType(Object)
  },
  /**
   * @description set upload request method
   */
  method: {
    type: String,
    default: "post"
  },
  /**
   * @description additions options of request
   */
  data: {
    type: definePropType([Object, Function, Promise]),
    default: () => mutable({})
  },
  /**
   * @description whether uploading multiple files is permitted
   */
  multiple: Boolean,
  /**
   * @description key name for uploaded file
   */
  name: {
    type: String,
    default: "file"
  },
  /**
   * @description whether to activate drag and drop mode
   */
  drag: Boolean,
  /**
   * @description whether cookies are sent
   */
  withCredentials: Boolean,
  /**
   * @description whether to show the uploaded file list
   */
  showFileList: {
    type: Boolean,
    default: true
  },
  /**
   * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
   */
  accept: {
    type: String,
    default: ""
  },
  /**
   * @description default uploaded files
   */
  fileList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  /**
   * @description whether to auto upload file
   */
  autoUpload: {
    type: Boolean,
    default: true
  },
  /**
   * @description type of file list
   */
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  /**
   * @description override default xhr behavior, allowing you to implement your own upload-file's request
   */
  httpRequest: {
    type: definePropType(Function),
    default: ajaxUpload
  },
  /**
   * @description whether to disable upload
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description maximum number of uploads allowed
   */
  limit: Number,
  /**
   * @description whether to support uploading directory
   */
  directory: Boolean
});
const uploadProps = buildProps({
  ...uploadBaseProps,
  /**
   * @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
   */
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
   */
  beforeRemove: {
    type: definePropType(Function)
  },
  /**
   * @description hook function when files are removed
   */
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function when select file or upload file success or upload file fail
   */
  onChange: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function when clicking the uploaded files
   */
  onPreview: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function when uploaded successfully
   */
  onSuccess: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function when some progress occurs
   */
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function when some errors occurs
   */
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description hook function when limit is exceeded
   */
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadBasePropsDefaults = {
  action: "#",
  method: "post",
  data: () => mutable({}),
  name: "file",
  showFileList: true,
  accept: "",
  fileList: () => mutable([]),
  autoUpload: true,
  listType: "text",
  httpRequest: ajaxUpload,
  disabled: void 0
};
const uploadPropsDefaults = {
  ...uploadBasePropsDefaults,
  beforeUpload: NOOP,
  onRemove: NOOP,
  onChange: NOOP,
  onPreview: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP
};
const uploadContextKey = /* @__PURE__ */ Symbol("uploadContextKey");
const uploadListProps = buildProps({
  files: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  handlePreview: {
    type: definePropType(Function),
    default: NOOP
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadListEmits = {
  remove: (file) => !!file
};
const _hoisted_1$1 = ["tabindex", "aria-disabled", "onKeydown"];
const _hoisted_2$1 = ["src", "crossorigin"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["title"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["onClick"];
var _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElUploadList"
  },
  __name: "upload-list",
  props: uploadListProps,
  emits: uploadListEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const nsUpload = useNamespace("upload");
    const nsIcon = useNamespace("icon");
    const nsList = useNamespace("list");
    const disabled = useFormDisabled();
    const focusing = ref(false);
    const containerKls = computed(() => [
      nsUpload.b("list"),
      nsUpload.bm("list", props.listType),
      nsUpload.is("disabled", disabled.value)
    ]);
    const handleRemove = (file) => {
      emit("remove", file);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        tag: "ul",
        class: normalizeClass(containerKls.value),
        name: unref(nsList).b()
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(__props.files, (file, index) => {
              return openBlock(), createElementBlock("li", {
                key: file.uid || file.name,
                class: normalizeClass([
                  unref(nsUpload).be("list", "item"),
                  unref(nsUpload).is(file.status),
                  { focusing: focusing.value }
                ]),
                tabindex: unref(disabled) ? void 0 : 0,
                "aria-disabled": unref(disabled),
                role: "button",
                onKeydown: withKeys(($event) => !unref(disabled) && handleRemove(file), ["delete"]),
                onFocus: _cache[0] || (_cache[0] = ($event) => focusing.value = true),
                onBlur: _cache[1] || (_cache[1] = ($event) => focusing.value = false),
                onClick: _cache[2] || (_cache[2] = ($event) => focusing.value = false)
              }, [
                renderSlot(_ctx.$slots, "default", {
                  file,
                  index
                }, () => [
                  __props.listType === "picture" || file.status !== "uploading" && __props.listType === "picture-card" ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    class: normalizeClass(unref(nsUpload).be("list", "item-thumbnail")),
                    src: file.url,
                    crossorigin: __props.crossorigin,
                    alt: ""
                  }, null, 10, _hoisted_2$1)) : createCommentVNode("v-if", true),
                  file.status === "uploading" || __props.listType !== "picture-card" ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass(unref(nsUpload).be("list", "item-info"))
                    },
                    [
                      createElementVNode("a", {
                        class: normalizeClass(unref(nsUpload).be("list", "item-name")),
                        onClick: withModifiers(($event) => __props.handlePreview(file), ["prevent"])
                      }, [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(nsIcon).m("document"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(document_default))
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["class"]),
                        createElementVNode("span", {
                          class: normalizeClass(unref(nsUpload).be("list", "item-file-name")),
                          title: file.name
                        }, toDisplayString(file.name), 11, _hoisted_4)
                      ], 10, _hoisted_3),
                      file.status === "uploading" ? (openBlock(), createBlock(unref(ElProgress), {
                        key: 0,
                        type: __props.listType === "picture-card" ? "circle" : "line",
                        "stroke-width": __props.listType === "picture-card" ? 6 : 2,
                        percentage: Number(file.percentage),
                        style: normalizeStyle(__props.listType === "picture-card" ? "" : "margin-top: 0.5rem")
                      }, null, 8, ["type", "stroke-width", "percentage", "style"])) : createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode(
                    "label",
                    {
                      class: normalizeClass(unref(nsUpload).be("list", "item-status-label"))
                    },
                    [
                      __props.listType === "text" ? (openBlock(), createBlock(unref(ElIcon), {
                        key: 0,
                        class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("circle-check")])
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(circle_check_default))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["class"])) : ["picture-card", "picture"].includes(__props.listType) ? (openBlock(), createBlock(unref(ElIcon), {
                        key: 1,
                        class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("check")])
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(check_default))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["class"])) : createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  !unref(disabled) ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 2,
                    class: normalizeClass(unref(nsIcon).m("close")),
                    onClick: ($event) => handleRemove(file)
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(close_default))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
                  createCommentVNode(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),
                  createCommentVNode(" This is a bug which needs to be fixed "),
                  createCommentVNode(" TODO: Fix the incorrect navigation interaction "),
                  !unref(disabled) ? (openBlock(), createElementBlock(
                    "i",
                    {
                      key: 3,
                      class: normalizeClass(unref(nsIcon).m("close-tip"))
                    },
                    toDisplayString(unref(t)("el.upload.deleteTip")),
                    3
                    /* TEXT, CLASS */
                  )) : createCommentVNode("v-if", true),
                  __props.listType === "picture-card" ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 4,
                      class: normalizeClass(unref(nsUpload).be("list", "item-actions"))
                    },
                    [
                      createElementVNode("span", {
                        class: normalizeClass(unref(nsUpload).be("list", "item-preview")),
                        onClick: ($event) => __props.handlePreview(file)
                      }, [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(nsIcon).m("zoom-in"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(zoom_in_default))
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["class"])
                      ], 10, _hoisted_5),
                      !unref(disabled) ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(unref(nsUpload).be("list", "item-delete")),
                        onClick: ($event) => handleRemove(file)
                      }, [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(nsIcon).m("delete"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["class"])
                      ], 10, _hoisted_6)) : createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true)
                ])
              ], 42, _hoisted_1$1);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          renderSlot(_ctx.$slots, "append")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "name"]);
    };
  }
});
const uploadContentProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onStart: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(
      Function
    ),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  }
});
const uploadContentPropsDefaults = {
  ...uploadBasePropsDefaults,
  beforeUpload: NOOP,
  onRemove: NOOP,
  onStart: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP
};
const uploadDraggerProps = buildProps({
  disabled: {
    type: Boolean,
    default: void 0
  },
  directory: Boolean
});
const uploadDraggerEmits = {
  file: (file) => isArray(file)
};
const COMPONENT_NAME = "ElUploadDrag";
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "upload-dragger",
  props: uploadDraggerProps,
  emits: uploadDraggerEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const uploaderContext = inject(uploadContextKey);
    if (!uploaderContext) {
      throwError(
        COMPONENT_NAME,
        "usage: <el-upload><el-upload-dragger /></el-upload>"
      );
    }
    const ns = useNamespace("upload");
    const dragover = ref(false);
    const disabled = useFormDisabled();
    const getFile = (entry) => {
      return new Promise((resolve, reject) => entry.file(resolve, reject));
    };
    const getAllFiles = async (entry) => {
      try {
        if (entry.isFile) {
          const file = await getFile(
            entry
          );
          file.isDirectory = false;
          return [file];
        }
        if (entry.isDirectory) {
          const dirReader = entry.createReader();
          const getEntries = () => {
            return new Promise(
              (resolve, reject) => dirReader.readEntries(resolve, reject)
            );
          };
          const entries = [];
          let readEntries = await getEntries();
          while (readEntries.length > 0) {
            entries.push(...readEntries);
            readEntries = await getEntries();
          }
          const filePromises = entries.map(
            (entry2) => getAllFiles(entry2).catch(() => [])
          );
          const files = await Promise.all(filePromises);
          return flatten(files);
        }
      } catch (e) {
        return [];
      }
      return [];
    };
    const onDrop = async (e) => {
      if (disabled.value) return;
      dragover.value = false;
      e.stopPropagation();
      const files = Array.from(e.dataTransfer.files);
      const items = e.dataTransfer.items || [];
      if (props.directory) {
        const entries = Array.from(items).map((item) => {
          var _a;
          return (_a = item == null ? void 0 : item.webkitGetAsEntry) == null ? void 0 : _a.call(item);
        }).filter((entry) => entry);
        const allFiles = await Promise.all(entries.map(getAllFiles));
        emit("file", flatten(allFiles));
        return;
      }
      files.forEach((file, index) => {
        var _a;
        const item = items[index];
        const entry = (_a = item == null ? void 0 : item.webkitGetAsEntry) == null ? void 0 : _a.call(item);
        if (entry) {
          file.isDirectory = entry.isDirectory;
        }
      });
      emit("file", files);
    };
    const onDragover = () => {
      if (!disabled.value) dragover.value = true;
    };
    const onDragleave = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget))
        dragover.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b("dragger"), unref(ns).is("dragover", dragover.value)]),
          onDrop: withModifiers(onDrop, ["prevent"]),
          onDragover: withModifiers(onDragover, ["prevent"]),
          onDragleave: withModifiers(onDragleave, ["prevent"])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});
const _hoisted_1 = ["tabindex", "aria-disabled", "onKeydown"];
const _hoisted_2 = ["name", "disabled", "multiple", "accept", "webkitdirectory"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElUploadContent",
    inheritAttrs: false
  },
  __name: "upload-content",
  props: uploadContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("upload");
    const disabled = useFormDisabled();
    const requests = shallowRef(
      {}
    );
    const inputRef = shallowRef();
    const uploadFiles = (files) => {
      if (files.length === 0) return;
      const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
      if (limit && fileList.length + files.length > limit) {
        onExceed(files, fileList);
        return;
      }
      if (!multiple) {
        files = files.slice(0, 1);
      }
      for (const file of files) {
        const rawFile = file;
        rawFile.uid = genFileId();
        onStart(rawFile);
        if (autoUpload) upload(rawFile);
      }
    };
    const upload = async (rawFile) => {
      inputRef.value.value = "";
      if (!props.beforeUpload) {
        return doUpload(rawFile);
      }
      let hookResult;
      let beforeData = {};
      try {
        const originData = props.data;
        const beforeUploadPromise = props.beforeUpload(rawFile);
        beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data;
        hookResult = await beforeUploadPromise;
        if (isPlainObject(props.data) && isEqual(originData, beforeData)) {
          beforeData = cloneDeep(props.data);
        }
      } catch (e) {
        hookResult = false;
      }
      if (hookResult === false) {
        props.onRemove(rawFile);
        return;
      }
      let file = rawFile;
      if (hookResult instanceof Blob) {
        if (hookResult instanceof File) {
          file = hookResult;
        } else {
          file = new File([hookResult], rawFile.name, {
            type: rawFile.type
          });
        }
      }
      doUpload(
        Object.assign(file, {
          uid: rawFile.uid
        }),
        beforeData
      );
    };
    const resolveData = async (data, rawFile) => {
      if (isFunction(data)) {
        return data(rawFile);
      }
      return data;
    };
    const doUpload = async (rawFile, beforeData) => {
      const {
        headers,
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest
      } = props;
      try {
        beforeData = await resolveData(beforeData != null ? beforeData : data, rawFile);
      } catch (e) {
        props.onRemove(rawFile);
        return;
      }
      const { uid } = rawFile;
      const options = {
        headers: headers || {},
        withCredentials,
        file: rawFile,
        data: beforeData,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress(evt, rawFile);
        },
        onSuccess: (res) => {
          onSuccess(res, rawFile);
          delete requests.value[uid];
        },
        onError: (err) => {
          onError(err, rawFile);
          delete requests.value[uid];
        }
      };
      const request = httpRequest(options);
      requests.value[uid] = request;
      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError);
      }
    };
    const handleChange = (e) => {
      const files = e.target.files;
      if (!files) return;
      uploadFiles(Array.from(files));
    };
    const handleClick = () => {
      if (!disabled.value) {
        inputRef.value.value = "";
        inputRef.value.click();
      }
    };
    const handleKeydown = () => {
      handleClick();
    };
    const abort = (file) => {
      const _reqs = entriesOf(requests.value).filter(
        file ? ([uid]) => String(file.uid) === uid : () => true
      );
      _reqs.forEach(([uid, req]) => {
        if (req instanceof void 0) req.abort();
        delete requests.value[uid];
      });
    };
    __expose({
      abort,
      upload
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(__props.listType),
          unref(ns).is("drag", __props.drag),
          unref(ns).is("disabled", unref(disabled))
        ]),
        tabindex: unref(disabled) ? void 0 : 0,
        "aria-disabled": unref(disabled),
        role: "button",
        onClick: handleClick,
        onKeydown: withKeys(withModifiers(handleKeydown, ["self"]), ["enter", "space"])
      }, [
        __props.drag ? (openBlock(), createBlock(_sfc_main$2, {
          key: 0,
          disabled: unref(disabled),
          directory: __props.directory,
          onFile: uploadFiles
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["disabled", "directory"])) : renderSlot(_ctx.$slots, "default", { key: 1 }),
        createElementVNode("input", {
          ref_key: "inputRef",
          ref: inputRef,
          class: normalizeClass(unref(ns).e("input")),
          name: __props.name,
          disabled: unref(disabled),
          multiple: __props.multiple,
          accept: __props.accept,
          webkitdirectory: __props.directory || void 0,
          type: "file",
          onChange: handleChange,
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, null, 42, _hoisted_2)
      ], 42, _hoisted_1);
    };
  }
});
const SCOPE = "ElUpload";
const revokeFileObjectURL = (file) => {
  var _a;
  if ((_a = file.url) == null ? void 0 : _a.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};
const useHandlers = (props, uploadRef) => {
  const uploadFiles = useVModel(
    props,
    "fileList",
    void 0,
    { passive: true }
  );
  const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
  function abort(file) {
    var _a;
    (_a = uploadRef.value) == null ? void 0 : _a.abort(file);
  }
  function clearFiles(states = ["ready", "uploading", "success", "fail"]) {
    uploadFiles.value = uploadFiles.value.filter(
      (row) => !states.includes(row.status)
    );
  }
  function removeFile(file) {
    uploadFiles.value = uploadFiles.value.filter(
      (uploadFile) => uploadFile.uid !== file.uid
    );
  }
  const emitChange = (file) => {
    nextTick(() => props.onChange(file, uploadFiles.value));
  };
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    if (!file) return;
    console.error(err);
    file.status = "fail";
    removeFile(file);
    props.onError(err, file, uploadFiles.value);
    emitChange(file);
  };
  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile);
    if (!file) return;
    props.onProgress(evt, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = Math.round(evt.percent);
  };
  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile);
    if (!file) return;
    file.status = "success";
    file.response = response;
    props.onSuccess(response, file, uploadFiles.value);
    emitChange(file);
  };
  const handleStart = (file) => {
    if (isNil(file.uid)) file.uid = genFileId();
    const uploadFile = {
      name: file.name,
      percentage: 0,
      status: "ready",
      size: file.size,
      raw: file,
      uid: file.uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") {
      try {
        uploadFile.url = URL.createObjectURL(file);
      } catch (err) {
        debugWarn(SCOPE, err.message);
        props.onError(err, uploadFile, uploadFiles.value);
      }
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile];
    emitChange(uploadFile);
  };
  const handleRemove = async (file) => {
    const uploadFile = file instanceof File ? getFile(file) : file;
    if (!uploadFile) throwError(SCOPE, "file to be removed not found");
    const doRemove = (file2) => {
      abort(file2);
      removeFile(file2);
      props.onRemove(file2, uploadFiles.value);
      revokeFileObjectURL(file2);
    };
    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value);
      if (before !== false) doRemove(uploadFile);
    } else {
      doRemove(uploadFile);
    }
  };
  function submit() {
    uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => {
      var _a;
      return raw && ((_a = uploadRef.value) == null ? void 0 : _a.upload(raw));
    });
  }
  watch(
    () => props.listType,
    (val) => {
      if (val !== "picture-card" && val !== "picture") {
        return;
      }
      uploadFiles.value = uploadFiles.value.map((file) => {
        const { raw, url } = file;
        if (!url && raw) {
          try {
            file.url = URL.createObjectURL(raw);
          } catch (err) {
            props.onError(err, file, uploadFiles.value);
          }
        }
        return file;
      });
    }
  );
  watch(
    uploadFiles,
    (files) => {
      for (const file of files) {
        file.uid || (file.uid = genFileId());
        file.status || (file.status = "success");
      }
    },
    { immediate: true, deep: true }
  );
  return {
    /** @description two-way binding ref from props `fileList` */
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    revokeFileObjectURL
  };
};
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElUpload"
  },
  __name: "upload",
  props: uploadProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const disabled = useFormDisabled();
    const uploadRef = shallowRef();
    const {
      abort,
      submit,
      clearFiles,
      uploadFiles,
      handleStart,
      handleError,
      handleRemove,
      handleSuccess,
      handleProgress
    } = useHandlers(props, uploadRef);
    const isPictureCard = computed(() => props.listType === "picture-card");
    const uploadContentProps2 = computed(() => ({
      ...props,
      fileList: uploadFiles.value,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove
    }));
    provide(uploadContextKey, {
      accept: toRef(props, "accept")
    });
    __expose({
      /** @description cancel upload request */
      abort,
      /** @description upload the file list manually */
      submit,
      /** @description clear the file list  */
      clearFiles,
      /** @description select the file manually */
      handleStart,
      /** @description remove the file manually */
      handleRemove
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(_sfc_main$3, {
          key: 0,
          disabled: unref(disabled),
          "list-type": __props.listType,
          files: unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          append: withCtx(() => [
            createVNode(
              _sfc_main$1,
              mergeProps({
                ref_key: "uploadRef",
                ref: uploadRef
              }, uploadContentProps2.value),
              {
                default: withCtx(() => [
                  _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
                  !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
                ]),
                _: 3
                /* FORWARDED */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true),
        !isPictureCard.value || isPictureCard.value && !__props.showFileList ? (openBlock(), createBlock(
          _sfc_main$1,
          mergeProps({
            key: 1,
            ref_key: "uploadRef",
            ref: uploadRef
          }, uploadContentProps2.value),
          {
            default: withCtx(() => [
              _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
              !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          },
          16
          /* FULL_PROPS */
        )) : createCommentVNode("v-if", true),
        _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "tip"),
        !isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(_sfc_main$3, {
          key: 3,
          disabled: unref(disabled),
          "list-type": __props.listType,
          files: unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
const ElUpload = withInstall(_sfc_main);

export { ElUpload as E, ElProgress as a, uploadBasePropsDefaults as b, uploadContentProps as c, uploadContentPropsDefaults as d, uploadContextKey as e, uploadDraggerEmits as f, genFileId as g, uploadDraggerProps as h, uploadListEmits as i, uploadListProps as j, uploadListTypes as k, uploadProps as l, uploadPropsDefaults as m, progressProps as p, uploadBaseProps as u };
//# sourceMappingURL=index-B-lUxOPb.mjs.map
