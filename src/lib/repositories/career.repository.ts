import { CareerStatus, Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import type { CareerDetail, CareerListItem } from "@/lib/types/career";

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
    const { featured, industry, skill, interest, query, limit = 24, offset = 0 } =
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

    return db.career.findMany({
      where,
      include: careerListInclude,
      orderBy: [{ featured: "desc" }, { title: "asc" }],
      take: limit,
      skip: offset,
    });
  },

  async countPublished(options: Omit<CareerQueryOptions, "limit" | "offset"> = {}) {
    const { featured, industry, skill, interest, query } = options;

    return db.career.count({
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
    });
  },

  async findBySlug(slug: string): Promise<CareerDetail | null> {
    return db.career.findFirst({
      where: { slug, status: CareerStatus.PUBLISHED },
      include: careerDetailInclude,
    });
  },

  async findFeatured(limit = 6): Promise<CareerListItem[]> {
    return this.findPublished({ featured: true, limit });
  },

  async findBySlugs(slugs: string[]): Promise<CareerListItem[]> {
    if (slugs.length === 0) return [];

    const careers = await db.career.findMany({
      where: { slug: { in: slugs }, status: CareerStatus.PUBLISHED },
      include: careerListInclude,
    });

    const order = new Map(slugs.map((slug, index) => [slug, index]));
    return careers.sort(
      (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0),
    );
  },
};
