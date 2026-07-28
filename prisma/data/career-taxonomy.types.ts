import type { GrowthOutlook } from "../../src/generated/prisma/client";

/** Discovery profile used for auto-tagging careers in the seed script. */
export type CareerProfile =
  | "tech"
  | "business"
  | "design"
  | "finance"
  | "media"
  | "health"
  | "science"
  | "education"
  | "government";

/** Career tier for taxonomy organization and discovery weighting. */
export type CareerTier =
  | "major"
  | "specialized"
  | "emerging"
  | "interdisciplinary"
  | "hidden";

/** Top-level buckets — 14 categories for the full 1,000+ career catalog. */
export type CareerCategorySlug =
  | "technology"
  | "business"
  | "finance"
  | "design-creative"
  | "science"
  | "healthcare"
  | "education"
  | "law-policy"
  | "media-entertainment"
  | "social-impact"
  | "environment"
  | "engineering"
  | "operations"
  | "trades-skilled-work";

/** One career row in the catalog — add or edit entries under a category file. */
export type CareerCatalogEntry = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  salaryMin: number;
  salaryMax: number;
  /** Alternative job titles — stored in sourceMetadata, not separate careers. */
  aliases?: string[];
  /** Core careers from the product taxonomy — seeded first, used for featured defaults. */
  anchor?: boolean;
  featured?: boolean;
  tier?: CareerTier;
  growthOutlook?: GrowthOutlook;
  exampleCompanies?: string[];
  /** Override default industries from the category profile. */
  industries?: string[];
  /** Per-career tag overrides (merged with profile defaults at seed time). */
  interests?: string[];
  skills?: string[];
  workStyles?: string[];
  /** Slugs of related careers — seeded as SIMILAR relations. */
  related?: string[];
  commonTasks?: string;
  downsides?: string;
};

export type CareerCategoryDefinition = {
  slug: CareerCategorySlug;
  name: string;
  profile: CareerProfile;
  /** Primary industry slug for careers in this category (must exist in seed INDUSTRIES). */
  primaryIndustry: string;
  careers: CareerCatalogEntry[];
};

export type CareerSeedData = CareerCatalogEntry & {
  profile: CareerProfile;
  categorySlug: CareerCategorySlug;
  industries: string[];
};
