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
import { SOCIAL_IMPACT_CAREERS } from "./categories/social-impact";
import { ENVIRONMENT_CAREERS } from "./categories/environment";
import { ENGINEERING_CAREERS } from "./categories/engineering";
import { OPERATIONS_CAREERS } from "./categories/operations";
import { TRADES_SKILLED_WORK_CAREERS } from "./categories/trades-skilled-work";
import { TECHNOLOGY_CAREERS } from "./categories/technology";
import {
  BUSINESS_EXPANSION_CAREERS,
  DESIGN_CREATIVE_EXPANSION_CAREERS,
  EDUCATION_EXPANSION_CAREERS,
  ENGINEERING_EXPANSION_CAREERS,
  ENVIRONMENT_EXPANSION_CAREERS,
  FINANCE_EXPANSION_CAREERS,
  HEALTHCARE_EXPANSION_CAREERS,
  LAW_POLICY_EXPANSION_CAREERS,
  MEDIA_ENTERTAINMENT_EXPANSION_CAREERS,
  OPERATIONS_EXPANSION_CAREERS,
  SCIENCE_EXPANSION_CAREERS,
  SOCIAL_IMPACT_EXPANSION_CAREERS,
  TECHNOLOGY_EXPANSION_CAREERS,
  TRADES_SKILLED_WORK_EXPANSION_CAREERS,
} from "./categories/expansions";

/** Shorthand kept for non-batch category entries still defined inline below. */
export { c } from "./career-builder";

/**
 * Product taxonomy tree — category batches live in prisma/data/categories/.
 * Batches 1–14 plus subcategory expansions (6 roles per section).
 */
export const CAREER_TAXONOMY: CareerCategoryDefinition[] = [
  {
    slug: "technology",
    name: "Technology",
    profile: "tech",
    primaryIndustry: "tech",
    careers: [...TECHNOLOGY_CAREERS, ...TECHNOLOGY_EXPANSION_CAREERS],
  },
  {
    slug: "business",
    name: "Business",
    profile: "business",
    primaryIndustry: "finance",
    careers: [...BUSINESS_CAREERS, ...BUSINESS_EXPANSION_CAREERS],
  },
  {
    slug: "finance",
    name: "Finance",
    profile: "finance",
    primaryIndustry: "finance",
    careers: [...FINANCE_CAREERS, ...FINANCE_EXPANSION_CAREERS],
  },
  {
    slug: "design-creative",
    name: "Design & Creative",
    profile: "design",
    primaryIndustry: "media",
    careers: [...DESIGN_CREATIVE_CAREERS, ...DESIGN_CREATIVE_EXPANSION_CAREERS],
  },
  {
    slug: "science",
    name: "Science",
    profile: "science",
    primaryIndustry: "sustainability",
    careers: [...SCIENCE_CAREERS, ...SCIENCE_EXPANSION_CAREERS],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    profile: "health",
    primaryIndustry: "healthcare",
    careers: [...HEALTHCARE_CAREERS, ...HEALTHCARE_EXPANSION_CAREERS],
  },
  {
    slug: "education",
    name: "Education",
    profile: "education",
    primaryIndustry: "education",
    careers: [...EDUCATION_CAREERS, ...EDUCATION_EXPANSION_CAREERS],
  },
  {
    slug: "law-policy",
    name: "Law & Policy",
    profile: "government",
    primaryIndustry: "government",
    careers: [...LAW_POLICY_CAREERS, ...LAW_POLICY_EXPANSION_CAREERS],
  },
  {
    slug: "media-entertainment",
    name: "Media & Entertainment",
    profile: "media",
    primaryIndustry: "media",
    careers: [...MEDIA_ENTERTAINMENT_CAREERS, ...MEDIA_ENTERTAINMENT_EXPANSION_CAREERS],
  },
  {
    slug: "social-impact",
    name: "Social Impact",
    profile: "government",
    primaryIndustry: "government",
    careers: [...SOCIAL_IMPACT_CAREERS, ...SOCIAL_IMPACT_EXPANSION_CAREERS],
  },
  {
    slug: "environment",
    name: "Environment",
    profile: "science",
    primaryIndustry: "sustainability",
    careers: [...ENVIRONMENT_CAREERS, ...ENVIRONMENT_EXPANSION_CAREERS],
  },
  {
    slug: "engineering",
    name: "Engineering",
    profile: "tech",
    primaryIndustry: "tech",
    careers: [...ENGINEERING_CAREERS, ...ENGINEERING_EXPANSION_CAREERS],
  },
  {
    slug: "operations",
    name: "Operations",
    profile: "business",
    primaryIndustry: "finance",
    careers: [...OPERATIONS_CAREERS, ...OPERATIONS_EXPANSION_CAREERS],
  },
  {
    slug: "trades-skilled-work",
    name: "Trades & Skilled Work",
    profile: "business",
    primaryIndustry: "finance",
    careers: [...TRADES_SKILLED_WORK_CAREERS, ...TRADES_SKILLED_WORK_EXPANSION_CAREERS],
  },
  ...LEGACY_CATEGORIES,
];
