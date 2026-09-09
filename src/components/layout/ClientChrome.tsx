"use client";

import dynamic from "next/dynamic";

export const PageLoader = dynamic(
  () => import("@/components/layout/PageLoader").then((m) => m.PageLoader),
  { ssr: false }
);

export const CustomCursor = dynamic(
  () =>
    import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);
