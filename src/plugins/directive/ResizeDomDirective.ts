import type { Directive, DirectiveBinding } from "vue";

const RESIZE_OBSERVE = "RESIZE_OBSERVE";

interface CustomResizeObserverCallback {
  (entry: ResizeObserverEntry): void;
}

type ResizeElement = HTMLElement & {
  [RESIZE_OBSERVE]: any;
};

const resizeDOM = (el: ResizeElement, binding: DirectiveBinding) => {
  const resizeHandler: CustomResizeObserverCallback = binding.value;
  const resizeObserver = new ResizeObserver(
    (entries: ResizeObserverEntry[]) => {
      entries.length > 0 && resizeHandler(entries[0]);
    }
  );
  resizeObserver.observe(el);
  return resizeObserver;
};

const ResizeDomDirective: Directive = {
  mounted(el: ResizeElement, binding) {
    el[RESIZE_OBSERVE] = resizeDOM(el, binding);
  },

  unmounted(el: ResizeElement) {
    if (el && el[RESIZE_OBSERVE]) {
      const resizeObserver: ResizeObserver = el[RESIZE_OBSERVE];
      resizeObserver.unobserve(el);
      resizeObserver.disconnect();
      delete el[RESIZE_OBSERVE];
    }
  },
};

export default ResizeDomDirective;
