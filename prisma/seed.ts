import "dotenv/config";

import { db as prisma } from "../src/lib/db";
import { CAREER_CATALOG, CAREER_SEEDS } from "./careers-data";
import {
  PERSONALIZATION_INTERESTS,
  PERSONALIZATION_SKILLS,
  PERSONALIZATION_WORK_STYLES,
} from "../src/lib/constants/personalization-taxonomy";
import {
  CareerRelationType,
  CareerStatus,
  SkillPickerGroup,
} from "../src/generated/prisma/client";

const INDUSTRIES = [
  { slug: "tech", name: "Tech" },
  { slug: "finance", name: "Finance" },
  { slug: "healthcare", name: "Healthcare" },
  { slug: "media", name: "Media" },
  { slug: "gaming", name: "Gaming" },
  { slug: "education", name: "Education" },
  { slug: "sustainability", name: "Sustainability" },
  { slug: "government", name: "Government" },
];

async function upsertTaxonomy() {
  for (const item of PERSONALIZATION_INTERESTS) {
    await prisma.interest.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  for (const item of PERSONALIZATION_SKILLS) {
    await prisma.skill.upsert({
      where: { slug: item.slug },
      update: { ...item, skillPickerGroup: SkillPickerGroup.HAVE },
      create: { ...item, skillPickerGroup: SkillPickerGroup.HAVE },
    });
  }
  for (const item of PERSONALIZATION_WORK_STYLES) {
    await prisma.workStyle.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  for (const item of INDUSTRIES) {
    await prisma.industry.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
}

async function seedCareers() {
  const skillMap = Object.fromEntries(
    (await prisma.skill.findMany({ select: { id: true, slug: true } })).map((s) => [s.slug, s.id]),
  );
  const interestMap = Object.fromEntries(
    (await prisma.interest.findMany({ select: { id: true, slug: true } })).map((i) => [i.slug, i.id]),
  );
  const workStyleMap = Object.fromEntries(
    (await prisma.workStyle.findMany({ select: { id: true, slug: true } })).map((w) => [w.slug, w.id]),
  );
  const industryMap = Object.fromEntries(
    (await prisma.industry.findMany({ select: { id: true, slug: true } })).map((i) => [i.slug, i.id]),
  );

  for (const seed of CAREER_SEEDS) {
    const career = await prisma.career.upsert({
      where: { slug: seed.slug },
      update: {
        title: seed.title,
        tagline: seed.tagline,
        summary: seed.summary,
        salaryMin: seed.salaryMin,
        salaryMax: seed.salaryMax,
        experienceLevel: seed.experienceLevel,
        growthOutlook: seed.growthOutlook,
        featured: seed.featured,
        exampleCompanies: seed.exampleCompanies,
        sourceMetadata: seed.sourceMetadata,
        status: CareerStatus.PUBLISHED,
        lastVerifiedAt: new Date(),
      },
      create: {
        slug: seed.slug,
        title: seed.title,
        tagline: seed.tagline,
        summary: seed.summary,
        salaryMin: seed.salaryMin,
        salaryMax: seed.salaryMax,
        experienceLevel: seed.experienceLevel,
        growthOutlook: seed.growthOutlook,
        featured: seed.featured,
        exampleCompanies: seed.exampleCompanies,
        sourceMetadata: seed.sourceMetadata,
        status: CareerStatus.PUBLISHED,
        lastVerifiedAt: new Date(),
      },
    });

    await prisma.careerHighlight.deleteMany({ where: { careerId: career.id } });
    await prisma.careerSkill.deleteMany({ where: { careerId: career.id } });
    await prisma.careerInterest.deleteMany({ where: { careerId: career.id } });
    await prisma.careerWorkStyle.deleteMany({ where: { careerId: career.id } });
    await prisma.careerIndustry.deleteMany({ where: { careerId: career.id } });

    await prisma.careerHighlight.createMany({
      data: seed.highlights.map((h) => ({ ...h, careerId: career.id })),
    });
    await prisma.careerSkill.createMany({
      data: seed.skills
        .filter((s) => skillMap[s.slug])
        .map((s) => ({ careerId: career.id, skillId: skillMap[s.slug], importance: s.importance })),
    });
    await prisma.careerInterest.createMany({
      data: seed.interests
        .filter((i) => interestMap[i.slug])
        .map((i) => ({ careerId: career.id, interestId: interestMap[i.slug], relevance: i.relevance })),
    });
    await prisma.careerWorkStyle.createMany({
      data: seed.workStyles
        .filter((w) => workStyleMap[w.slug])
        .map((w) => ({ careerId: career.id, workStyleId: workStyleMap[w.slug], fitScore: w.fitScore })),
    });
    await prisma.careerIndustry.createMany({
      data: seed.industries
        .filter((i) => industryMap[i.slug])
        .map((i) => ({ careerId: career.id, industryId: industryMap[i.slug], relevance: i.relevance })),
    });
  }
}

async function seedCareerRelations() {
  const careerMap = Object.fromEntries(
    (await prisma.career.findMany({ select: { id: true, slug: true } })).map((c) => [c.slug, c.id]),
  );

  await prisma.careerRelation.deleteMany({});

  const rows: Array<{
    fromCareerId: string;
    toCareerId: string;
    relationType: CareerRelationType;
  }> = [];

  for (const seed of CAREER_SEEDS) {
    const fromId = careerMap[seed.slug];
    if (!fromId) continue;

    for (const relatedSlug of seed.related ?? []) {
      const toId = careerMap[relatedSlug];
      if (!toId || fromId === toId) continue;
      rows.push({
        fromCareerId: fromId,
        toCareerId: toId,
        relationType: CareerRelationType.SIMILAR,
      });
    }
  }

  if (rows.length > 0) {
    await prisma.careerRelation.createMany({ data: rows, skipDuplicates: true });
  }

  return rows.length;
}

async function main() {
  await upsertTaxonomy();
  await seedCareers();
  const relationCount = await seedCareerRelations();

  const byCategory = CAREER_CATALOG.reduce<Record<string, number>>((acc, c) => {
    acc[c.categorySlug] = (acc[c.categorySlug] ?? 0) + 1;
    return acc;
  }, {});

  console.log(
    `Seeded ${CAREER_SEEDS.length} careers (${relationCount} relations), ` +
      `${PERSONALIZATION_INTERESTS.length} interests, ${PERSONALIZATION_SKILLS.length} skills, ` +
      `${PERSONALIZATION_WORK_STYLES.length} work styles.`,
  );
  console.log("By category:", byCategory);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
