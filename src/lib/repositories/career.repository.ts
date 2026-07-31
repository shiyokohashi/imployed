import { CareerRelationType, CareerStatus, Prisma } from "@/generated/prisma/client";
import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";
import { db } from "@/lib/db";
import { withDbRetry } from "@/lib/db-retry";
import type { CareerDetail, CareerListItem, IndustryFeaturedSection } from "@/lib/types/career";

const careerListInclude = {
  industries: {
    include: { industry: { select: { slug: true, name: true } } },
    orderBy: { relevance: "desc" as const },
    take: 3,
  },
  skills: {
    include: {
      skill: { select: { slug: true, name: true, category: true } },
    },
    orderBy: { importance: "desc" as const },
    take: 5,
  },
} satisfies Prisma.CareerInclude;

const careerDetailInclude = {
  highlights: { orderBy: { sortOrder: "asc" as const } },
  skills: { include: { skill: true }, orderBy: { importance: "desc" as const } },
  interests: { include: { interest: true }, orderBy: { relevance: "desc" as const } },
  industries: { include: { industry: true }, orderBy: { relevance: "desc" as const } },
  workStyles: { include: { workStyle: true }, orderBy: { fitScore: "desc" as const } },
  personalityTraits: {
    include: { personalityTrait: true },
    orderBy: { relevance: "desc" as const },
  },
  relatedFrom: {
    include: {
      toCareer: { select: { slug: true, title: true, tagline: true } },
    },
  },
} satisfies Prisma.CareerInclude;

export type CareerQueryOptions = {
  featured?: boolean;
  industry?: string;
  skill?: string;
  interest?: string;
  query?: string;
  limit?: number;
  offset?: number;
};

export const careerRepository = {
  async findPublished(options: CareerQueryOptions = {}): Promise<CareerListItem[]> {
    const { featured, industry, skill, interest, query, limit = CAREERS_PER_PAGE, offset = 0 } =
      options;

    const where: Prisma.CareerWhereInput = {
      status: CareerStatus.PUBLISHED,
      ...(featured !== undefined && { featured }),
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { tagline: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
        ],
      }),
      ...(industry && {
        industries: { some: { industry: { slug: industry } } },
      }),
      ...(skill && {
        skills: { some: { skill: { slug: skill } } },
      }),
      ...(interest && {
        interests: { some: { interest: { slug: interest } } },
      }),
    };

    return withDbRetry(() =>
      db.career.findMany({
        where,
        include: careerListInclude,
        orderBy: [{ featured: "desc" }, { title: "asc" }],
        take: limit,
        skip: offset,
      }),
    );
  },

  async countPublished(options: Omit<CareerQueryOptions, "limit" | "offset"> = {}) {
    const { featured, industry, skill, interest, query } = options;

    return withDbRetry(() =>
      db.career.count({
        where: {
          status: CareerStatus.PUBLISHED,
          ...(featured !== undefined && { featured }),
          ...(query && {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { tagline: { contains: query, mode: "insensitive" } },
              { summary: { contains: query, mode: "insensitive" } },
            ],
          }),
          ...(industry && {
            industries: { some: { industry: { slug: industry } } },
          }),
          ...(skill && {
            skills: { some: { skill: { slug: skill } } },
          }),
          ...(interest && {
            interests: { some: { interest: { slug: interest } } },
          }),
        },
      }),
    );
  },

  async findBySlug(slug: string): Promise<CareerDetail | null> {
    return withDbRetry(() =>
      db.career.findFirst({
        where: { slug, status: CareerStatus.PUBLISHED },
        include: careerDetailInclude,
      }),
    );
  },

  async findFeatured(limit = 6): Promise<CareerListItem[]> {
    return this.findPublished({ featured: true, limit });
  },

  async findFeaturedGroupedByIndustry(): Promise<IndustryFeaturedSection[]> {
    return withDbRetry(async () => {
      const featuredCareers = await db.career.findMany({
        where: { status: CareerStatus.PUBLISHED, featured: true },
        include: careerListInclude,
        orderBy: [{ title: "asc" }],
      });

      const sectionMap = new Map<string, IndustryFeaturedSection>();

      for (const career of featuredCareers) {
        const primaryIndustry = career.industries[0]?.industry;
        if (!primaryIndustry) continue;

        const existing = sectionMap.get(primaryIndustry.slug);
        if (existing) {
          existing.careers.push(career);
          continue;
        }

        sectionMap.set(primaryIndustry.slug, {
          industry: {
            slug: primaryIndustry.slug,
            name: primaryIndustry.name,
            description: null,
          },
          careers: [career],
        });
      }

      if (sectionMap.size === 0) return [];

      const industries = await db.industry.findMany({
        where: { slug: { in: [...sectionMap.keys()] } },
        select: { slug: true, name: true, description: true },
      });

      for (const industry of industries) {
        const section = sectionMap.get(industry.slug);
        if (section) {
          section.industry.description = industry.description;
        }
      }

      return [...sectionMap.values()].sort((a, b) =>
        a.industry.name.localeCompare(b.industry.name),
      );
    });
  },

  /** Random published titles for the home hero physics tumbling treatment. */
  async findTumblingTitles(limit = 55): Promise<Array<{ slug: string; title: string }>> {
    return withDbRetry(async () => {
      const all = await db.career.findMany({
        where: { status: CareerStatus.PUBLISHED },
        select: { slug: true, title: true },
      });

      if (all.length <= limit) return all;

      const picked = [...all];
      for (let i = picked.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [picked[i], picked[j]] = [picked[j]!, picked[i]!];
      }

      return picked.slice(0, limit);
    });
  },

  async findBySlugs(slugs: string[]): Promise<CareerListItem[]> {
    if (slugs.length === 0) return [];

    return withDbRetry(async () => {
      const careers = await db.career.findMany({
        where: { slug: { in: slugs }, status: CareerStatus.PUBLISHED },
        include: careerListInclude,
      });

      const order = new Map(slugs.map((slug, index) => [slug, index]));
      return careers.sort(
        (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0),
      );
    });
  },

  async findSimilarBySlug(slug: string, limit = 6): Promise<CareerListItem[]> {
    return withDbRetry(async () => {
      const source = await db.career.findFirst({
        where: { slug, status: CareerStatus.PUBLISHED },
        select: {
          id: true,
          interests: { select: { interestId: true } },
          workStyles: { select: { workStyleId: true } },
          skills: { select: { skillId: true } },
          industries: { select: { industryId: true } },
          relatedFrom: {
            where: { relationType: CareerRelationType.SIMILAR },
            select: { toCareer: { select: { slug: true } } },
          },
          relatedTo: {
            where: { relationType: CareerRelationType.SIMILAR },
            select: { fromCareer: { select: { slug: true } } },
          },
        },
      });

      if (!source) return [];

      const explicitSlugs = [
        ...source.relatedFrom.map((relation) => relation.toCareer.slug),
        ...source.relatedTo.map((relation) => relation.fromCareer.slug),
      ];

      const sourceInterestIds = [...source.interests.map((item) => item.interestId)];
      const sourceWorkStyleIds = [...source.workStyles.map((item) => item.workStyleId)];
      const sourceSkillIds = [...source.skills.map((item) => item.skillId)];
      const sourceIndustryIds = [...source.industries.map((item) => item.industryId)];

      const overlapFilters: Prisma.CareerWhereInput[] = [];

      if (sourceInterestIds.length > 0) {
        overlapFilters.push({
          interests: { some: { interestId: { in: sourceInterestIds } } },
        });
      }
      if (sourceIndustryIds.length > 0) {
        overlapFilters.push({
          industries: { some: { industryId: { in: sourceIndustryIds } } },
        });
      }
      if (sourceSkillIds.length > 0) {
        overlapFilters.push({
          skills: { some: { skillId: { in: sourceSkillIds } } },
        });
      }
      if (sourceWorkStyleIds.length > 0) {
        overlapFilters.push({
          workStyles: { some: { workStyleId: { in: sourceWorkStyleIds } } },
        });
      }

      const sourceInterestIdSet = new Set(sourceInterestIds);
      const sourceWorkStyleIdSet = new Set(sourceWorkStyleIds);
      const sourceSkillIdSet = new Set(sourceSkillIds);
      const sourceIndustryIdSet = new Set(sourceIndustryIds);

      const candidates =
        overlapFilters.length > 0
          ? await db.career.findMany({
              where: {
                status: CareerStatus.PUBLISHED,
                id: { not: source.id },
                OR: overlapFilters,
              },
              take: 120,
              select: {
                slug: true,
                interests: { select: { interestId: true } },
                workStyles: { select: { workStyleId: true } },
                skills: { select: { skillId: true } },
                industries: { select: { industryId: true } },
              },
            })
          : [];

      const scored = candidates
        .map((candidate) => {
          let score = 0;

          for (const item of candidate.interests) {
            if (sourceInterestIdSet.has(item.interestId)) score += 3;
          }
          for (const item of candidate.workStyles) {
            if (sourceWorkStyleIdSet.has(item.workStyleId)) score += 2;
          }
          for (const item of candidate.skills) {
            if (sourceSkillIdSet.has(item.skillId)) score += 2;
          }
          for (const item of candidate.industries) {
            if (sourceIndustryIdSet.has(item.industryId)) score += 1;
          }

          return { slug: candidate.slug, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      const rankedSlugs: string[] = [];
      const seen = new Set<string>();

      for (const explicitSlug of explicitSlugs) {
        if (seen.has(explicitSlug)) continue;
        seen.add(explicitSlug);
        rankedSlugs.push(explicitSlug);
      }

      for (const item of scored) {
        if (seen.has(item.slug)) continue;
        seen.add(item.slug);
        rankedSlugs.push(item.slug);
        if (rankedSlugs.length >= limit) break;
      }

      return this.findBySlugs(rankedSlugs.slice(0, limit));
    });
  },
};
