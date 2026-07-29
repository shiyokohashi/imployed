import type { CareerCategoryDefinition } from "./career-taxonomy.types";
import { BUSINESS_CAREERS } from "./categories/business";
import { DESIGN_CREATIVE_CAREERS } from "./categories/design-creative";
import { FINANCE_CAREERS } from "./categories/finance";
import { EDUCATION_CAREERS } from "./categories/education";
import { HEALTHCARE_CAREERS } from "./categories/healthcare";
import { LAW_POLICY_CAREERS } from "./categories/law-policy";
import { LEGACY_CATEGORIES } from "./categories/legacy-pending-expansion";
import { MEDIA_ENTERTAINMENT_CAREERS } from "./categories/media-entertainment";
import { SCIENCE_CAREERS } from "./categories/science";
import { TECHNOLOGY_CAREERS } from "./categories/technology";

/** Shorthand kept for non-batch category entries still defined inline below. */
export { c } from "./career-builder";

/**
 * Product taxonomy tree — category batches live in prisma/data/categories/.
 * Batches 1–9: Technology, Business, Finance, Design & Creative, Science, Healthcare, Education, Law & Policy, Media & Entertainment
 */
export const CAREER_TAXONOMY: CareerCategoryDefinition[] = [
  {
    slug: "technology",
    name: "Technology",
    profile: "tech",
    primaryIndustry: "tech",
    careers: TECHNOLOGY_CAREERS,
  },
  {
    slug: "business",
    name: "Business",
    profile: "business",
    primaryIndustry: "finance",
    careers: BUSINESS_CAREERS,
  },
  {
    slug: "finance",
    name: "Finance",
    profile: "finance",
    primaryIndustry: "finance",
    careers: FINANCE_CAREERS,
  },
  {
    slug: "design-creative",
    name: "Design & Creative",
    profile: "design",
    primaryIndustry: "media",
    careers: DESIGN_CREATIVE_CAREERS,
  },
  {
    slug: "science",
    name: "Science",
    profile: "science",
    primaryIndustry: "sustainability",
    careers: SCIENCE_CAREERS,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    profile: "health",
    primaryIndustry: "healthcare",
    careers: HEALTHCARE_CAREERS,
  },
  {
    slug: "education",
    name: "Education",
    profile: "education",
    primaryIndustry: "education",
    careers: EDUCATION_CAREERS,
  },
  {
    slug: "law-policy",
    name: "Law & Policy",
    profile: "government",
    primaryIndustry: "government",
    careers: LAW_POLICY_CAREERS,
  },
  {
    slug: "media-entertainment",
    name: "Media & Entertainment",
    profile: "media",
    primaryIndustry: "media",
    careers: MEDIA_ENTERTAINMENT_CAREERS,
  },
  ...LEGACY_CATEGORIES,
];
