import { ExperienceLevel, GrowthOutlook } from "../src/generated/prisma/client";

import { mergeTags } from "./data/career-builder";
import { PROFILE_DEFAULTS } from "./data/career-profiles";
import { CAREER_TAXONOMY } from "./data/career-taxonomy";
import type { CareerCatalogEntry, CareerSeedData } from "./data/career-taxonomy.types";

export type { CareerProfile, CareerCategorySlug, CareerCatalogEntry } from "./data/career-taxonomy.types";
export { CAREER_TAXONOMY } from "./data/career-taxonomy";

type CatalogBuildResult = {
  careers: CareerSeedData[];
  skippedDuplicates: string[];
};

/** Flatten taxonomy into a deduplicated catalog. */
export function buildCareerCatalog(): CatalogBuildResult {
  const seen = new Set<string>();
  const skippedDuplicates: string[] = [];
  const careers: CareerSeedData[] = [];

  function add(
    entry: CareerCatalogEntry,
    profile: CareerSeedData["profile"],
    categorySlug: CareerSeedData["categorySlug"],
    primaryIndustry: string,
  ) {
    if (seen.has(entry.slug)) {
      skippedDuplicates.push(entry.slug);
      return;
    }
    seen.add(entry.slug);
    careers.push({
      ...entry,
      profile,
      categorySlug,
      industries: entry.industries ?? [primaryIndustry],
    });
  }

  for (const category of CAREER_TAXONOMY) {
    for (const entry of category.careers) {
      add(entry, category.profile, category.slug, category.primaryIndustry);
    }
  }

  return { careers, skippedDuplicates };
}

/** Fail fast on duplicate slugs or invalid mappings before seeding. */
export function validateCareerCatalog(catalog: CareerSeedData[]): void {
  const slugs = new Set<string>();
  for (const career of catalog) {
    if (slugs.has(career.slug)) {
      throw new Error(`Duplicate career slug in catalog: ${career.slug}`);
    }
    slugs.add(career.slug);

    if (!PROFILE_DEFAULTS[career.profile]) {
      throw new Error(`Unknown profile "${career.profile}" for career: ${career.slug}`);
    }
    if (career.salaryMin < 0 || career.salaryMax < 0 || career.salaryMax < career.salaryMin) {
      throw new Error(`Invalid salary range for career: ${career.slug}`);
    }

    for (const related of career.related ?? []) {
      if (related === career.slug) {
        throw new Error(`Career ${career.slug} cannot relate to itself`);
      }
    }
  }
}

function tagScore(index: number): number {
  return Math.max(1, 5 - index);
}

export function buildCareerSeed(career: CareerSeedData) {
  const defaults = PROFILE_DEFAULTS[career.profile];
  const interests = mergeTags(defaults.interests, career.interests);
  const skills = mergeTags(defaults.skills, career.skills);
  const workStyles = mergeTags(defaults.workStyles, career.workStyles);

  const commonTasks =
    career.commonTasks ??
    `Work on ${career.title.toLowerCase()} responsibilities — collaborating with teams, solving problems, and growing your craft.`;
  const downsides =
    career.downsides ??
    "Competitive hiring markets, skill requirements that evolve quickly, and project deadlines that can create pressure.";

  return {
    slug: career.slug,
    title: career.title,
    tagline: career.tagline,
    summary: career.summary,
    salaryMin: career.salaryMin,
    salaryMax: career.salaryMax,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: career.growthOutlook ?? GrowthOutlook.GROWING,
    featured: career.featured ?? Boolean(career.anchor),
    exampleCompanies: career.exampleCompanies ?? [],
    skills: skills.map((slug, i) => ({ slug, importance: tagScore(i) })),
    interests: interests.map((slug, i) => ({ slug, relevance: tagScore(i) })),
    workStyles: workStyles.map((slug, i) => ({ slug, fitScore: tagScore(i) })),
    industries: career.industries.map((slug, i) => ({ slug, relevance: tagScore(i) })),
    related: career.related ?? [],
    highlights: [
      { title: "Common tasks", body: commonTasks, sortOrder: 0 },
      { title: "Potential downsides", body: downsides, sortOrder: 1 },
    ],
    sourceMetadata: {
      categorySlug: career.categorySlug,
      anchor: career.anchor ?? false,
      tier: career.tier ?? null,
      aliases: career.aliases ?? [],
    },
  };
}

const catalogResult = buildCareerCatalog();
validateCareerCatalog(catalogResult.careers);

if (catalogResult.skippedDuplicates.length > 0) {
  console.warn(
    `Skipped ${catalogResult.skippedDuplicates.length} duplicate slugs:`,
    catalogResult.skippedDuplicates.join(", "),
  );
}

export const CAREER_CATALOG = catalogResult.careers;
export const CAREER_SEEDS = CAREER_CATALOG.map(buildCareerSeed);
