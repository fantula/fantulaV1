import { E as ElAvatar } from './index-C3_NoBue.mjs';
import { E as ElTag } from './index-2JZmBUf1.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useClipboard } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { _ as _export_sfc } from './server.mjs';

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
    const avatarUrl = computed(() => {
      var _a, _b, _c;
      return props.avatar || ((_a = props.user) == null ? void 0 : _a.avatar) || ((_c = (_b = props.user) == null ? void 0 : _b._profile) == null ? void 0 : _c.avatar) || "";
    });
    const displayName = computed(() => {
      var _a, _b;
      return props.name || ((_a = props.user) == null ? void 0 : _a.name) || ((_b = props.user) == null ? void 0 : _b.nickname) || "Unknown";
    });
    const email = computed(() => {
      var _a, _b, _c;
      return props.email || ((_a = props.user) == null ? void 0 : _a.email) || ((_c = (_b = props.user) == null ? void 0 : _b.profiles) == null ? void 0 : _c.email) || "No Email";
    });
    const uid = computed(() => {
      var _a, _b, _c, _d;
      return props.uid || ((_a = props.user) == null ? void 0 : _a.id) || ((_b = props.user) == null ? void 0 : _b.user_id) || ((_d = (_c = props.user) == null ? void 0 : _c._profile) == null ? void 0 : _d.uid) || "";
    });
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

export { AdminUserCell as A };
//# sourceMappingURL=AdminUserCell-C2sgweQM.mjs.map
