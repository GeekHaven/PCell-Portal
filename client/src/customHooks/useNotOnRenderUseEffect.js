import { useEffect, useRef } from "react";

export const useNotOnRenderUseEffect = (effect, dependencies) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      effect();
    }
  }, dependencies);
}

