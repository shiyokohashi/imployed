"use client";

import { useCallback, useEffect, useState } from "react";

function readSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/** Client-side discover URL updates without triggering a full App Router navigation. */
export function useDiscoverUrl() {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(readSearchParams);

  useEffect(() => {
    const syncFromUrl = () => setSearchParams(readSearchParams());
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const replaceParams = useCallback((next: URLSearchParams) => {
    const query = next.toString();
    const url = query ? `/discover?${query}` : "/discover";
    window.history.replaceState(window.history.state, "", url);
    setSearchParams(new URLSearchParams(next.toString()));
  }, []);

  return { searchParams, replaceParams };
}
