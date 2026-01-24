import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElDivider } from './index-QnhSR2oe.mjs';
import { a as ElTable, E as ElTableColumn } from './index-BB44-vTK.mjs';
import { E as ElSelect, a as ElOption } from './index-pXKVpQSb.mjs';
import { _ as _export_sfc, bb as delete_default, p as plus_default, E as ElIcon, ba as picture_default } from './server.mjs';
import { E as ElInputNumber } from './index-iY4Ojb3q.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, createCommentVNode, Fragment, renderList, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { A as AdminImageSelector } from './AdminImageSelector-Qku4uUI9.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SkuEditor",
  __ssrInlineRender: true,
  props: {
    mode: {},
    productId: {},
    tag: {},
    initialSpecs: {},
    initialSkus: {},
    readOnly: { type: Boolean }
  },
  emits: ["update:specs", "update:skus"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const specs = ref([]);
    const skus = ref([]);
    watch(() => props.initialSpecs, (newSpecs) => {
      console.log("[SkuEditor] initialSpecs changed:", newSpecs);
      if (newSpecs && newSpecs.length > 0) {
        specs.value = JSON.parse(JSON.stringify(newSpecs));
      }
    }, { immediate: true, deep: true });
    watch(() => props.initialSkus, (newSkus) => {
      console.log("[SkuEditor] initialSkus changed:", newSkus);
      if (newSkus && newSkus.length > 0) {
        skus.value = JSON.parse(JSON.stringify(newSkus));
      }
    }, { immediate: true, deep: true });
    const removeSpec = (index) => {
      specs.value.splice(index, 1);
      generateSKUs();
    };
    const removeSpecValue = (specIndex, valueIndex) => {
      specs.value[specIndex].values.splice(valueIndex, 1);
      generateSKUs();
    };
    const saveTagInput = ref([]);
    const showInput = (index) => {
      specs.value[index].inputVisible = true;
      nextTick(() => {
        var _a, _b;
        const inputRefs = saveTagInput.value;
        if (inputRefs && inputRefs[index]) {
          (_b = (_a = inputRefs[index]) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
        }
      });
    };
    const handleInputConfirm = (index) => {
      const inputVal = specs.value[index].inputValue.trim();
      if (inputVal && !specs.value[index].values.includes(inputVal)) {
        specs.value[index].values.push(inputVal);
        generateSKUs();
      }
      specs.value[index].inputVisible = false;
      specs.value[index].inputValue = "";
    };
    const generateSKUs = () => {
      const validSpecs = specs.value.filter((s) => s.name && s.values.length > 0);
      if (validSpecs.length === 0) {
        skus.value = [];
        emitUpdates();
        return;
      }
      const cartesian = (arrays) => {
        if (arrays.length === 0) return [[]];
        const [first, ...rest] = arrays;
        const restCartesian = cartesian(rest);
        return first.flatMap((item) => restCartesian.map((r) => [item, ...r]));
      };
      const specArrays = validSpecs.map((s) => s.values);
      const combinations = cartesian(specArrays);
      const existingMap = /* @__PURE__ */ new Map();
      skus.value.forEach((sku) => {
        existingMap.set(sku.key, sku);
      });
      skus.value = combinations.map((combo) => {
        const specValues = {};
        validSpecs.forEach((spec, idx) => {
          specValues[spec.name] = combo[idx];
        });
        const key = combo.join("::");
        const existing = existingMap.get(key);
        if (existing) {
          return { ...existing, specValues };
        }
        return {
          key,
          specValues,
          product_type: "virtual",
          price: 0,
          duration: null,
          intro: "",
          image: "",
          tag: props.tag
        };
      });
      emitUpdates();
    };
    const emitUpdates = () => {
      emit("update:specs", specs.value);
      emit("update:skus", skus.value);
    };
    watch(() => specs.value, () => {
    }, { deep: true });
    const imagePickerVisible = ref(false);
    const currentSkuRow = ref(null);
    const openSkuImagePicker = (row) => {
      currentSkuRow.value = row;
      imagePickerVisible.value = true;
    };
    const handleImageSelected = (urls) => {
      if (urls.length > 0 && currentSkuRow.value) {
        currentSkuRow.value.image = urls[0];
        emitUpdates();
      }
    };
    __expose({
      getSpecs: () => specs.value,
      getSkus: () => skus.value,
      setSpecs: (newSpecs) => {
        specs.value = JSON.parse(JSON.stringify(newSpecs));
      },
      setSkus: (newSkus) => {
        skus.value = JSON.parse(JSON.stringify(newSkus));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_divider = ElDivider;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_icon = ElIcon;
      const _component_el_input_number = ElInputNumber;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sku-editor" }, _attrs))} data-v-cfe7291a><div class="spec-editor" data-v-cfe7291a><div class="spec-editor-header" data-v-cfe7291a><div class="panel-title" data-v-cfe7291a>\u89C4\u683C\u914D\u7F6E</div></div><div class="spec-list-grid" data-v-cfe7291a><!--[-->`);
      ssrRenderList(specs.value, (spec, index) => {
        _push(`<div class="spec-group" data-v-cfe7291a><div class="spec-header" data-v-cfe7291a>`);
        _push(ssrRenderComponent(_component_el_input, {
          modelValue: spec.name,
          "onUpdate:modelValue": ($event) => spec.name = $event,
          placeholder: "\u89C4\u683C\u540D (\u5982: \u989C\u8272)",
          style: { "width": "150px" },
          disabled: __props.readOnly
        }, null, _parent));
        if (!__props.readOnly) {
          _push(ssrRenderComponent(_component_el_button, {
            type: "danger",
            link: "",
            onClick: ($event) => removeSpec(index),
            icon: unref(delete_default),
            circle: ""
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="spec-values" data-v-cfe7291a><!--[-->`);
        ssrRenderList(spec.values, (val, vIndex) => {
          _push(ssrRenderComponent(_component_el_tag, {
            key: vIndex,
            closable: !__props.readOnly,
            onClose: ($event) => removeSpecValue(index, vIndex),
            class: "spec-tag"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(val)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(val), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (spec.inputVisible) {
          _push(ssrRenderComponent(_component_el_input, {
            ref_for: true,
            ref_key: "saveTagInput",
            ref: saveTagInput,
            modelValue: spec.inputValue,
            "onUpdate:modelValue": ($event) => spec.inputValue = $event,
            class: "input-new-tag",
            size: "small",
            onKeyup: ($event) => handleInputConfirm(index),
            onBlur: ($event) => handleInputConfirm(index)
          }, null, _parent));
        } else if (!__props.readOnly) {
          _push(ssrRenderComponent(_component_el_button, {
            class: "button-new-tag",
            size: "small",
            onClick: ($event) => showInput(index)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`+ \u6DFB\u52A0\u503C`);
              } else {
                return [
                  createTextVNode("+ \u6DFB\u52A0\u503C")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
      if (!__props.readOnly) {
        _push(`<div class="add-spec-btn-container" data-v-cfe7291a><div class="premium-add-btn" data-v-cfe7291a><div class="btn-icon" data-v-cfe7291a>`);
        _push(ssrRenderComponent(unref(plus_default), null, null, _parent));
        _push(`</div><div class="btn-text" data-v-cfe7291a><span class="t1" data-v-cfe7291a>\u6DFB\u52A0\u89C4\u683C\u9879\u76EE</span><span class="t2" data-v-cfe7291a>\u652F\u6301\u81EA\u5B9A\u4E49\u89C4\u683C\u540D\u4E0E\u5C5E\u6027\u503C</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
      _push(`<div class="sku-table-container" data-v-cfe7291a><div class="panel-title" data-v-cfe7291a>SKU \u914D\u7F6E</div>`);
      _push(ssrRenderComponent(_component_el_table, {
        data: skus.value,
        border: "",
        style: { "width": "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(specs.value, (spec, index) => {
              _push2(ssrRenderComponent(_component_el_table_column, {
                key: index,
                label: spec.name || "\u89C4\u683C",
                "min-width": "100"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(row.specValues[spec.name])}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(row.specValues[spec.name]), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u7C7B\u578B",
              width: "140",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_select, {
                    modelValue: row.product_type,
                    "onUpdate:modelValue": ($event) => row.product_type = $event,
                    size: "small",
                    placeholder: "\u9009\u62E9\u7C7B\u578B",
                    style: { "width": "100%" },
                    disabled: __props.readOnly
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_option, {
                          label: "\u865A\u62DF\u5145\u503C",
                          value: "virtual"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_option, {
                          label: "\u8D26\u53F7\u5408\u79DF",
                          value: "shared_account"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_option, {
                          label: "\u5151\u6362\u7801",
                          value: "one_time_cdk"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_option, {
                            label: "\u865A\u62DF\u5145\u503C",
                            value: "virtual"
                          }),
                          createVNode(_component_el_option, {
                            label: "\u8D26\u53F7\u5408\u79DF",
                            value: "shared_account"
                          }),
                          createVNode(_component_el_option, {
                            label: "\u5151\u6362\u7801",
                            value: "one_time_cdk"
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_select, {
                      modelValue: row.product_type,
                      "onUpdate:modelValue": ($event) => row.product_type = $event,
                      size: "small",
                      placeholder: "\u9009\u62E9\u7C7B\u578B",
                      style: { "width": "100%" },
                      disabled: __props.readOnly
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_option, {
                          label: "\u865A\u62DF\u5145\u503C",
                          value: "virtual"
                        }),
                        createVNode(_component_el_option, {
                          label: "\u8D26\u53F7\u5408\u79DF",
                          value: "shared_account"
                        }),
                        createVNode(_component_el_option, {
                          label: "\u5151\u6362\u7801",
                          value: "one_time_cdk"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "SKU\u56FE\u7247",
              width: "100",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([{ disabled: __props.readOnly }, "sku-img-uploader small-box"])}" data-v-cfe7291a${_scopeId2}>`);
                  if (row.image) {
                    _push3(`<img${ssrRenderAttr("src", row.image)} class="sku-img" data-v-cfe7291a${_scopeId2}>`);
                  } else {
                    _push3(`<div class="sku-upload-placeholder" data-v-cfe7291a${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(picture_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(picture_default))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: ["sku-img-uploader small-box", { disabled: __props.readOnly }],
                      onClick: ($event) => !__props.readOnly && openSkuImagePicker(row)
                    }, [
                      row.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: row.image,
                        class: "sku-img"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "sku-upload-placeholder"
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(picture_default))
                          ]),
                          _: 1
                        })
                      ]))
                    ], 10, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!__props.readOnly) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "\u7B80\u4ECB",
                "min-width": "150"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: row.intro,
                      "onUpdate:modelValue": ($event) => row.intro = $event,
                      size: "small",
                      placeholder: "\u7B80\u77ED\u63CF\u8FF0"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: row.intro,
                        "onUpdate:modelValue": ($event) => row.intro = $event,
                        size: "small",
                        placeholder: "\u7B80\u77ED\u63CF\u8FF0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u65F6\u957F(\u5929)",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input_number, {
                    modelValue: row.duration,
                    "onUpdate:modelValue": ($event) => row.duration = $event,
                    size: "small",
                    min: 0,
                    controls: false,
                    style: { "width": "100%" },
                    disabled: __props.readOnly
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input_number, {
                      modelValue: row.duration,
                      "onUpdate:modelValue": ($event) => row.duration = $event,
                      size: "small",
                      min: 0,
                      controls: false,
                      style: { "width": "100%" },
                      disabled: __props.readOnly
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u552E\u4EF7 (\u5143)",
              width: "140",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input_number, {
                    modelValue: row.price,
                    "onUpdate:modelValue": ($event) => row.price = $event,
                    min: 0,
                    precision: 2,
                    step: 1,
                    size: "small",
                    style: { "width": "100%" },
                    controls: false,
                    disabled: __props.readOnly
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input_number, {
                      modelValue: row.price,
                      "onUpdate:modelValue": ($event) => row.price = $event,
                      min: 0,
                      precision: 2,
                      step: 1,
                      size: "small",
                      style: { "width": "100%" },
                      controls: false,
                      disabled: __props.readOnly
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(specs.value, (spec, index) => {
                return openBlock(), createBlock(_component_el_table_column, {
                  key: index,
                  label: spec.name || "\u89C4\u683C",
                  "min-width": "100"
                }, {
                  default: withCtx(({ row }) => [
                    createTextVNode(toDisplayString(row.specValues[spec.name]), 1)
                  ]),
                  _: 2
                }, 1032, ["label"]);
              }), 128)),
              createVNode(_component_el_table_column, {
                label: "\u7C7B\u578B",
                width: "140",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_select, {
                    modelValue: row.product_type,
                    "onUpdate:modelValue": ($event) => row.product_type = $event,
                    size: "small",
                    placeholder: "\u9009\u62E9\u7C7B\u578B",
                    style: { "width": "100%" },
                    disabled: __props.readOnly
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "\u865A\u62DF\u5145\u503C",
                        value: "virtual"
                      }),
                      createVNode(_component_el_option, {
                        label: "\u8D26\u53F7\u5408\u79DF",
                        value: "shared_account"
                      }),
                      createVNode(_component_el_option, {
                        label: "\u5151\u6362\u7801",
                        value: "one_time_cdk"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "SKU\u56FE\u7247",
                width: "100",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("div", {
                    class: ["sku-img-uploader small-box", { disabled: __props.readOnly }],
                    onClick: ($event) => !__props.readOnly && openSkuImagePicker(row)
                  }, [
                    row.image ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: row.image,
                      class: "sku-img"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "sku-upload-placeholder"
                    }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(picture_default))
                        ]),
                        _: 1
                      })
                    ]))
                  ], 10, ["onClick"])
                ]),
                _: 1
              }),
              !__props.readOnly ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                label: "\u7B80\u4ECB",
                "min-width": "150"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_input, {
                    modelValue: row.intro,
                    "onUpdate:modelValue": ($event) => row.intro = $event,
                    size: "small",
                    placeholder: "\u7B80\u77ED\u63CF\u8FF0"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_el_table_column, {
                label: "\u65F6\u957F(\u5929)",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_input_number, {
                    modelValue: row.duration,
                    "onUpdate:modelValue": ($event) => row.duration = $event,
                    size: "small",
                    min: 0,
                    controls: false,
                    style: { "width": "100%" },
                    disabled: __props.readOnly
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u552E\u4EF7 (\u5143)",
                width: "140",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_input_number, {
                    modelValue: row.price,
                    "onUpdate:modelValue": ($event) => row.price = $event,
                    min: 0,
                    precision: 2,
                    step: 1,
                    size: "small",
                    style: { "width": "100%" },
                    controls: false,
                    disabled: __props.readOnly
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminImageSelector, {
        modelValue: imagePickerVisible.value,
        "onUpdate:modelValue": ($event) => imagePickerVisible.value = $event,
        multiple: false,
        onSelect: handleImageSelected
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/SkuEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SkuEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfe7291a"]]);

export { SkuEditor as S };
//# sourceMappingURL=SkuEditor-H0DykQLU.mjs.map
