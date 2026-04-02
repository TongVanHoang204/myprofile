"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SiteLoader from "@/app/components/SiteLoader";

const MIN_VISIBLE_MS = 850;

export default function RouteTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const beginLoading = () => {
    startTimeRef.current = Date.now();
    setVisible(true);
  };

  useEffect(() => {
    const handleStart = () => beginLoading();

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.origin);
      const currentUrl = new URL(window.location.href);

      const isSameRoute =
        nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search;
      if (isSameRoute) return;
      if (nextUrl.origin !== currentUrl.origin) return;

      beginLoading();
    };

    window.addEventListener("app:route-loading-start", handleStart);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("app:route-loading-start", handleStart);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    if (!visible || startTimeRef.current === null) return;

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
    const timer = window.setTimeout(() => {
      setVisible(false);
      startTimeRef.current = null;
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [pathname, searchParams, visible]);

  if (!visible) return null;

  return <SiteLoader mode="route" />;
}
