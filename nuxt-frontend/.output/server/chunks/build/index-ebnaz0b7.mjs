import { isRef, computed, watch, onScopeDispose } from 'vue';
import { w as throwError, f as useNamespace } from './server.mjs';
import { h as hasClass, b as addClass, g as getStyle } from './index-Byc6LUYX.mjs';
import { a as getScrollBarWidth } from './scroll-Df9VGR5S.mjs';

const useLockscreen = (trigger, options = {}) => {
  if (!isRef(trigger)) {
    throwError(
      "[useLockscreen]",
      "You need to pass a ref param to this function"
    );
  }
  const ns = options.ns || useNamespace("popup");
  const hiddenCls = computed(() => ns.bm("parent", "hidden"));
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    setTimeout(() => {
      return;
    }, 200);
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    cleaned = false;
    withoutHiddenClass = !hasClass((void 0).body, hiddenCls.value);
    if (withoutHiddenClass) {
      (void 0).body.style.width;
      addClass((void 0).body, hiddenCls.value);
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = (void 0).documentElement.clientHeight < (void 0).body.scrollHeight;
    const bodyOverflowY = getStyle((void 0).body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      (void 0).body.style.width = `calc(100% - ${scrollBarWidth}px)`;
    }
  });
  onScopeDispose(() => cleanup());
};

export { useLockscreen as u };
//# sourceMappingURL=index-ebnaz0b7.mjs.map
