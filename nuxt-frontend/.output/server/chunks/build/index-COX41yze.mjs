import { shallowRef, defineComponent, h, triggerRef, isVNode } from 'vue';
import { f as flattedChildren } from './vnode-BKSxKQVt.mjs';

const getOrderedChildren = (vm, childComponentName, children) => {
  const nodes = flattedChildren(vm.subTree).filter(
    (n) => {
      var _a;
      return isVNode(n) && ((_a = n.type) == null ? void 0 : _a.name) === childComponentName && !!n.component;
    }
  );
  const uids = nodes.map((n) => n.component.uid);
  return uids.map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
  const children = shallowRef({});
  const orderedChildren = shallowRef([]);
  const nodesMap = /* @__PURE__ */ new WeakMap();
  const addChild = (child) => {
    children.value[child.uid] = child;
    triggerRef(children);
  };
  const removeChild = (child) => {
    delete children.value[child.uid];
    triggerRef(children);
    const childNode = child.getVnode().el;
    const parentNode = childNode.parentNode;
    const childNodes = nodesMap.get(parentNode);
    const index = childNodes.indexOf(childNode);
    childNodes.splice(index, 1);
  };
  const sortChildren = () => {
    orderedChildren.value = getOrderedChildren(
      vm,
      childComponentName,
      children.value
    );
  };
  const IsolatedRenderer = (props) => {
    return props.render();
  };
  const ChildrenSorter = defineComponent({
    setup(_, { slots }) {
      return () => {
        sortChildren();
        return slots.default ? (
          // Create a new `ReactiveEffect` to ensure `ChildrenSorter` doesn't track any extra dependencies
          // @ts-ignore TODO: Remove this after Vue is upgraded
          h(IsolatedRenderer, {
            render: slots.default
          })
        ) : null;
      };
    }
  });
  return {
    children: orderedChildren,
    addChild,
    removeChild,
    ChildrenSorter
  };
};

export { useOrderedChildren as u };
//# sourceMappingURL=index-COX41yze.mjs.map
