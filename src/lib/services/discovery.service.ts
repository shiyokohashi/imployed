import { CareerStatus, GrowthOutlook } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import type { DiscoveryFilters, DiscoveryResponse, DiscoveryResult } from "@/lib/types/discovery";

type SignalMatch = { slug: string; label: string; kind: string };

/**
 * Scores all careers against optional user signals.
 * Signals boost relevance — they never exclude careers from results.
 */
export const discoveryService = {
  async discover(filters: DiscoveryFilters): Promise<DiscoveryResponse> {
    const careers = await db.career.findMany({
      where: { status: CareerStatus.PUBLISHED },
      include: {
        skills: { include: { skill: true }, orderBy: { importance: "desc" } },
        interests: { include: { interest: true } },
        activities: { include: { activity: true } },
        industries: { include: { industry: true }, orderBy: { relevance: "desc" } },
        highlights: { orderBy: { sortOrder: "asc" } },
      },
    });

    const signals = await resolveSignalLabels(filters);
    const haveSet = new Set(filters.skillsHave ?? []);
    const learnSet = new Set(filters.skillsLearn ?? []);

    const results: DiscoveryResult[] = careers.map((career) => {
      let score = 0;
      const reasons: string[] = [];
      const skillsYouHave: string[] = [];
      const skillsToBuild: string[] = [];

      for (const signal of signals) {
        if (signal.kind === "interest") {
          const match = career.interests.find((i) => i.interest.slug === signal.slug);
          if (match) {
            score += match.relevance * 4;
            reasons.push(`Connects to your interest in ${signal.label.toLowerCase()}`);
          }
        }

        if (signal.kind === "activity") {
          const match = career.activities.find((a) => a.activity.slug === signal.slug);
          if (match) {
            score += match.relevance * 4;
            reasons.push(`Involves ${signal.label.toLowerCase()}`);
          }
        }

        if (signal.kind === "skillHave") {
          const match = career.skills.find((s) => s.skill.slug === signal.slug);
          if (match) {
            score += match.importance * 3;
            skillsYouHave.push(match.skill.name);
            reasons.push(`Builds on your ${signal.label.toLowerCase()} skills`);
          }
        }

        if (signal.kind === "skillLearn") {
          const match = career.skills.find((s) => s.skill.slug === signal.slug);
          if (match) {
            score += match.importance * 2;
            if (!haveSet.has(signal.slug)) {
              skillsToBuild.push(match.skill.name);
              reasons.push(`Room to explore ${signal.label.toLowerCase()}`);
            }
          }
        }
      }

      for (const careerSkill of career.skills) {
        if (
          haveSet.has(careerSkill.skill.slug) &&
          !skillsYouHave.includes(careerSkill.skill.name)
        ) {
          skillsYouHave.push(careerSkill.skill.name);
        }
        if (
          !haveSet.has(careerSkill.skill.slug) &&
          careerSkill.importance >= 4 &&
          !skillsToBuild.includes(careerSkill.skill.name)
        ) {
          skillsToBuild.push(careerSkill.skill.name);
        }
      }

      const dayToDay =
        career.highlights.find((h) => h.title.toLowerCase().includes("day-to-day"))?.body ??
        career.highlights[0]?.body ??
        null;

      return {
        career: {
          id: career.id,
          slug: career.slug,
          title: career.title,
          tagline: career.tagline,
          summary: career.summary,
          salaryMin: career.salaryMin,
          salaryMax: career.salaryMax,
          salaryCurrency: career.salaryCurrency,
          experienceLevel: career.experienceLevel,
          dayToDay,
          exampleCompanies: parseCompanies(career.exampleCompanies),
          industries: career.industries.map((i) => i.industry.name),
        },
        matchScore: score,
        matchReasons: [...new Set(reasons)].slice(0, 4),
        skillsYouHave: [...new Set(skillsYouHave)],
        skillsToBuild: [...new Set(skillsToBuild)].slice(0, 5),
      };
    });

    const hasSignals = signals.length > 0;
    const signalLabels = signals.map((s) => s.label.toLowerCase());

    const sorted = results.sort((a, b) => b.matchScore - a.matchScore);

    return {
      results: sorted,
      total: sorted.length,
      filters,
      signalLabels,
      headline: buildHeadline(signalLabels, hasSignals),
    };
  },

  async getEmerging(limit = 12) {
    return db.career.findMany({
      where: {
        status: CareerStatus.PUBLISHED,
        growthOutlook: { in: [GrowthOutlook.HIGH_GROWTH, GrowthOutlook.GROWING] },
      },
      orderBy: [{ featured: "desc" }, { title: "asc" }],
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        tagline: true,
        summary: true,
        salaryMin: true,
        salaryMax: true,
        salaryCurrency: true,
        salaryPeriod: true,
        experienceLevel: true,
        growthOutlook: true,
        featured: true,
        industries: {
          include: { industry: { select: { slug: true, name: true } } },
          orderBy: { relevance: "desc" },
          take: 3,
        },
        skills: {
          include: { skill: { select: { slug: true, name: true, category: true } } },
          orderBy: { importance: "desc" },
          take: 5,
        },
      },
    });
  },

  async getRandom(limit = 6) {
    const careers = await db.career.findMany({
      where: { status: CareerStatus.PUBLISHED },
      select: {
        id: true,
        slug: true,
        title: true,
        tagline: true,
        summary: true,
        salaryMin: true,
        salaryMax: true,
        salaryCurrency: true,
        salaryPeriod: true,
        experienceLevel: true,
        growthOutlook: true,
        featured: true,
        industries: {
          include: { industry: { select: { slug: true, name: true } } },
          orderBy: { relevance: "desc" },
          take: 3,
        },
        skills: {
          include: { skill: { select: { slug: true, name: true, category: true } } },
          orderBy: { importance: "desc" },
          take: 5,
        },
      },
    });

    return shuffle(careers).slice(0, limit);
  },
};

async function resolveSignalLabels(filters: DiscoveryFilters): Promise<SignalMatch[]> {
  const [interests, skills, activities] = await Promise.all([
    db.interest.findMany({ select: { slug: true, name: true } }),
    db.skill.findMany({ select: { slug: true, name: true } }),
    db.activity.findMany({ select: { slug: true, name: true } }),
  ]);

  const interestMap = new Map(interests.map((i) => [i.slug, i.name]));
  const skillMap = new Map(skills.map((s) => [s.slug, s.name]));
  const activityMap = new Map(activities.map((a) => [a.slug, a.name]));

  const signals: SignalMatch[] = [];

  for (const slug of filters.interests ?? []) {
    const label = interestMap.get(slug);
    if (label) signals.push({ slug, label, kind: "interest" });
  }
  for (const slug of filters.skillsHave ?? []) {
    const label = skillMap.get(slug);
    if (label) signals.push({ slug, label, kind: "skillHave" });
  }
  for (const slug of filters.skillsLearn ?? []) {
    const label = skillMap.get(slug);
    if (label) signals.push({ slug, label, kind: "skillLearn" });
  }
  for (const slug of filters.activities ?? []) {
    const label = activityMap.get(slug);
    if (label) signals.push({ slug, label, kind: "activity" });
  }

  return signals;
}

function buildHeadline(labels: string[], hasSignals: boolean): string {
  if (!hasSignals) {
    return "Explore careers — add tags anytime to personalize.";
  }

  if (labels.length === 1) {
    return `Because you like ${labels[0]}, explore these career paths.`;
  }

  if (labels.length === 2) {
    return `Because you like ${labels[0]} + ${labels[1]}, explore these career paths.`;
  }

  const shown = labels.slice(0, 3).join(" + ");
  const extra = labels.length > 3 ? ` + ${labels.length - 3} more` : "";
  return `Because you like ${shown}${extra}, explore these career paths.`;
}

function parseCompanies(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
