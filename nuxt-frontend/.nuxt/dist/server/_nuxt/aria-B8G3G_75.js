const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;
const isHTMLElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isVisible = (element) => {
  if (process.env.NODE_ENV === "test")
    return true;
  const computed = getComputedStyle(element);
  return computed.position === "fixed" ? false : element.offsetParent !== null;
};
const obtainAllFocusableElements = (element) => {
  return Array.from(
    element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
  ).filter((item) => isFocusable(item) && isVisible(item));
};
const isFocusable = (element) => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.tabIndex < 0 || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") {
    return false;
  }
  switch (element.nodeName) {
    case "A": {
      return !!element.href && element.rel !== "ignore";
    }
    case "INPUT": {
      return !(element.type === "hidden" || element.type === "file");
    }
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA": {
      return true;
    }
    default: {
      return false;
    }
  }
};
const isLeaf = (el) => !el.getAttribute("aria-owns");
const getSibling = (el, distance, elClass) => {
  const { parentNode } = el;
  if (!parentNode)
    return null;
  const siblings = parentNode.querySelectorAll(elClass);
  const index = Array.prototype.indexOf.call(siblings, el);
  return siblings[index + distance] || null;
};
const focusElement = (el, options) => {
  if (!el || !el.focus)
    return;
  let cleanup = false;
  if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
    cleanup = true;
  }
  el.focus(options);
  if (isHTMLElement(el) && cleanup) {
    el.removeAttribute("tabindex");
  }
};
const focusNode = (el) => {
  if (!el)
    return;
  focusElement(el);
  !isLeaf(el) && el.click();
};
export {
  isLeaf as a,
  focusNode as b,
  focusElement as f,
  getSibling as g,
  isFocusable as i,
  obtainAllFocusableElements as o
};
//# sourceMappingURL=aria-B8G3G_75.js.map
