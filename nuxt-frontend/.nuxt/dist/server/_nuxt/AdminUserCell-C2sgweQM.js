import { E as ElAvatar } from "./index-C3_NoBue.js";
import { E as ElTag } from "./index-2JZmBUf1.js";
import "./base-CEWXqFm3.js";
/* empty css                   */
/* empty css                */
/* empty css                    */
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useClipboard } from "@vueuse/core";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminUserCell",
  __ssrInlineRender: true,
  props: {
    user: {},
    uid: {},
    name: {},
    email: {},
    avatar: {},
    showUid: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: true },
    avatarSize: { default: 32 },
    tag: {}
  },
  setup(__props) {
    const props = __props;
    const avatarUrl = computed(() => props.avatar || props.user?.avatar || props.user?._profile?.avatar || "");
    const displayName = computed(() => props.name || props.user?.name || props.user?.nickname || "Unknown");
    const email = computed(() => props.email || props.user?.email || props.user?.profiles?.email || "No Email");
    const uid = computed(() => props.uid || props.user?.id || props.user?.user_id || props.user?._profile?.uid || "");
    const avatarText = computed(() => {
      if (avatarUrl.value) return "";
      return displayName.value.substring(0, 2).toUpperCase();
    });
    const displayUid = computed(() => {
      if (!uid.value) return "No UID";
      return uid.value.length > 10 ? uid.value.substring(0, 8).toUpperCase() : uid.value;
    });
    const { copy } = useClipboard();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_avatar = ElAvatar;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-cell" }, _attrs))} data-v-a3c088fb>`);
      _push(ssrRenderComponent(_component_el_avatar, {
        size: __props.avatarSize,
        src: avatarUrl.value,
        class: "user-avatar"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(avatarText.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(avatarText.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="user-info" data-v-a3c088fb><div class="user-name-row" data-v-a3c088fb><span class="user-name"${ssrRenderAttr("title", displayName.value)} data-v-a3c088fb>${ssrInterpolate(displayName.value)}</span>`);
      if (__props.tag) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "small",
          type: "info",
          effect: "plain",
          class: "ml-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.tag)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.tag), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showUid || __props.showEmail) {
        _push(`<div class="user-sub-row" data-v-a3c088fb>`);
        if (__props.showUid) {
          _push(`<span class="uid-text" title="Click to copy" data-v-a3c088fb>${ssrInterpolate(displayUid.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.showUid && __props.showEmail) {
          _push(`<span class="divider" data-v-a3c088fb>|</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.showEmail) {
          _push(`<span class="email-text"${ssrRenderAttr("title", email.value)} data-v-a3c088fb>${ssrInterpolate(email.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminUserCell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminUserCell = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3c088fb"]]);
export {
  AdminUserCell as A
};
//# sourceMappingURL=AdminUserCell-C2sgweQM.js.map
