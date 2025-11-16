import { useEffect, useState,type RefObject } from "react";

export type LayoutHeights = {
  navbarHeight: number;
  footerHeight: number;
  contentHeight: string; // px string for style
  mainHeight: number
};

/**
 * Custom hook to calculate the remaining height for content
 * based on optional navbar and footer refs.
 */
export function useLayoutHeights(
  navbarRef?: RefObject<HTMLElement> | null,
  footerRef?: RefObject<HTMLElement> | null
): LayoutHeights {
  const [heights, setHeights] = useState<LayoutHeights>({
    navbarHeight: 0,
    footerHeight: 0,
    contentHeight: "auto",
    mainHeight:0
  });

  useEffect(() => {
    const updateHeights = () => {
      const navbarHeight = navbarRef?.current?.offsetHeight || 0;
      const footerHeight = footerRef?.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;

      const contentHeight = windowHeight - navbarHeight - footerHeight;

      setHeights({
        navbarHeight,
        footerHeight,
        contentHeight: contentHeight + "px",
        mainHeight:contentHeight
      });
    };

    updateHeights(); // initial

    window.addEventListener("resize", updateHeights);

    const resizeObserver = new ResizeObserver(updateHeights);
    if (navbarRef?.current) resizeObserver.observe(navbarRef.current);
    if (footerRef?.current) resizeObserver.observe(footerRef.current);

    return () => {
      window.removeEventListener("resize", updateHeights);
      resizeObserver.disconnect();
    };
  }, [navbarRef, footerRef]);

  return heights;
}
