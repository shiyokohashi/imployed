import { GrowthOutlook } from "../../src/generated/prisma/client";

import type { CareerCatalogEntry, CareerTier } from "./career-taxonomy.types";

type CareerInput = Omit<CareerCatalogEntry, "slug" | "title"> & {
  slug: string;
  title: string;
};

/** Shorthand for defining rich catalog rows — keeps category files readable at scale. */
export function c(input: CareerInput): CareerCatalogEntry {
  const {
    slug,
    title,
    tagline,
    summary,
    salaryMin,
    salaryMax,
    ...rest
  } = input;

  return {
    slug,
    title,
    tagline,
    summary,
    salaryMin,
    salaryMax,
    growthOutlook: rest.growthOutlook ?? GrowthOutlook.GROWING,
    ...rest,
  };
}

/** Merge profile defaults with career-specific tag overrides (deduped, career tags first). */
export function mergeTags(defaults: string[], overrides?: string[]): string[] {
  if (!overrides?.length) return defaults;
  return [...new Set([...overrides, ...defaults])];
}

export function tierLabel(tier?: CareerTier): string {
  switch (tier) {
    case "major":
      return "Major";
    case "specialized":
      return "Specialized";
    case "emerging":
      return "Emerging";
    case "interdisciplinary":
      return "Interdisciplinary";
    case "hidden":
      return "Lesser-known";
    default:
      return "Career";
  }
}
