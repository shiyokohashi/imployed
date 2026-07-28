import "dotenv/config";

import {
  CareerStatus,
  CareerRelationType,
  ExperienceLevel,
  GrowthOutlook,
  SkillCategory,
  SkillPickerGroup,
} from "../src/generated/prisma/client";
import { createPrismaClient } from "../src/lib/db";

const prisma = createPrismaClient();

const INTERESTS = [
  { slug: "design", name: "Design" },
  { slug: "technology", name: "Technology" },
  { slug: "business", name: "Business" },
  { slug: "science", name: "Science" },
  { slug: "writing", name: "Writing" },
  { slug: "psychology", name: "Psychology" },
  { slug: "finance", name: "Finance" },
  { slug: "entrepreneurship", name: "Entrepreneurship" },
  { slug: "media", name: "Media" },
];

const ACTIVITIES = [
  { slug: "creating-visuals", name: "Creating visuals" },
  { slug: "solving-problems", name: "Solving problems" },
  { slug: "explaining-ideas", name: "Explaining ideas" },
  { slug: "building-systems", name: "Building systems" },
  { slug: "working-with-people", name: "Working with people" },
  { slug: "finding-patterns", name: "Finding patterns" },
];

const SKILLS_HAVE = [
  { slug: "coding", name: "Coding", category: SkillCategory.TECHNICAL },
  { slug: "design-tools", name: "Design tools", category: SkillCategory.TOOL },
  { slug: "research", name: "Research", category: SkillCategory.DOMAIN },
  { slug: "communication", name: "Communication", category: SkillCategory.SOFT },
  { slug: "leadership", name: "Leadership", category: SkillCategory.SOFT },
  { slug: "data-analysis", name: "Data analysis", category: SkillCategory.TECHNICAL },
  { slug: "writing", name: "Writing", category: SkillCategory.SOFT },
  { slug: "marketing", name: "Marketing", category: SkillCategory.DOMAIN },
];

const SKILLS_LEARN = [
  { slug: "ai", name: "AI", category: SkillCategory.TECHNICAL },
  { slug: "product-management", name: "Product management", category: SkillCategory.DOMAIN },
  { slug: "engineering", name: "Engineering", category: SkillCategory.TECHNICAL },
  { slug: "strategy", name: "Strategy", category: SkillCategory.DOMAIN },
  { slug: "creative-direction", name: "Creative direction", category: SkillCategory.DOMAIN },
  { slug: "investing", name: "Investing", category: SkillCategory.DOMAIN },
];

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

type CareerSeed = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: ExperienceLevel;
  growthOutlook: GrowthOutlook;
  featured: boolean;
  exampleCompanies: string[];
  skills: Array<{ slug: string; importance: number }>;
  interests: Array<{ slug: string; relevance: number }>;
  activities: Array<{ slug: string; relevance: number }>;
  industries: Array<{ slug: string; relevance: number }>;
  highlights: Array<{ title: string; body: string; sortOrder: number }>;
};

const CAREERS: CareerSeed[] = [
  {
    slug: "product-designer",
    title: "Product Designer",
    tagline: "Shape how products look, feel, and flow",
    summary: "Product Designers craft intuitive interfaces and experiences — turning user needs into elegant, functional design.",
    salaryMin: 90000,
    salaryMax: 165000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: true,
    exampleCompanies: ["Figma", "Airbnb", "Spotify", "Linear"],
    skills: [
      { slug: "design-tools", importance: 5 },
      { slug: "research", importance: 4 },
      { slug: "communication", importance: 4 },
      { slug: "product-management", importance: 3 },
    ],
    interests: [
      { slug: "design", relevance: 5 },
      { slug: "technology", relevance: 4 },
      { slug: "psychology", relevance: 3 },
    ],
    activities: [
      { slug: "creating-visuals", relevance: 5 },
      { slug: "solving-problems", relevance: 4 },
      { slug: "working-with-people", relevance: 3 },
    ],
    industries: [{ slug: "tech", relevance: 5 }, { slug: "media", relevance: 3 }],
    highlights: [{ title: "Day-to-day", body: "Sketch flows, run design critiques, prototype in Figma, and partner with engineers to ship polished experiences.", sortOrder: 0 }],
  },
  {
    slug: "design-technologist",
    title: "Design Technologist",
    tagline: "Where design meets code",
    summary: "Design Technologists prototype interactive experiences at the intersection of design and engineering.",
    salaryMin: 95000,
    salaryMax: 160000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: true,
    exampleCompanies: ["Apple", "Google Creative Lab", "R/GA", "IDEO"],
    skills: [
      { slug: "design-tools", importance: 5 },
      { slug: "coding", importance: 4 },
      { slug: "engineering", importance: 3 },
      { slug: "ai", importance: 3 },
    ],
    interests: [
      { slug: "design", relevance: 5 },
      { slug: "technology", relevance: 5 },
    ],
    activities: [
      { slug: "creating-visuals", relevance: 5 },
      { slug: "building-systems", relevance: 4 },
      { slug: "solving-problems", relevance: 4 },
    ],
    industries: [{ slug: "tech", relevance: 5 }, { slug: "gaming", relevance: 3 }],
    highlights: [{ title: "Day-to-day", body: "Build interactive prototypes, experiment with new tools, and bridge design and engineering teams.", sortOrder: 0 }],
  },
  {
    slug: "brand-strategist",
    title: "Brand Strategist",
    tagline: "Define what brands stand for",
    summary: "Brand Strategists shape identity, positioning, and narrative — connecting business goals with how audiences perceive a company.",
    salaryMin: 85000,
    salaryMax: 155000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: true,
    exampleCompanies: ["Nike", "Pentagram", "Wieden+Kennedy", "Collins"],
    skills: [
      { slug: "writing", importance: 5 },
      { slug: "marketing", importance: 4 },
      { slug: "strategy", importance: 5 },
      { slug: "creative-direction", importance: 4 },
    ],
    interests: [
      { slug: "design", relevance: 4 },
      { slug: "business", relevance: 5 },
      { slug: "media", relevance: 4 },
    ],
    activities: [
      { slug: "creating-visuals", relevance: 4 },
      { slug: "explaining-ideas", relevance: 5 },
      { slug: "finding-patterns", relevance: 4 },
    ],
    industries: [{ slug: "media", relevance: 5 }, { slug: "tech", relevance: 3 }],
    highlights: [{ title: "Day-to-day", body: "Develop brand platforms, lead workshops, write creative briefs, and guide campaigns across channels.", sortOrder: 0 }],
  },
  {
    slug: "ux-researcher",
    title: "UX Researcher",
    tagline: "Uncover what users really need",
    summary: "UX Researchers study behavior and motivations to inform product decisions with evidence.",
    salaryMin: 85000,
    salaryMax: 150000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: true,
    exampleCompanies: ["Apple", "Meta", "Adobe", "Microsoft"],
    skills: [
      { slug: "research", importance: 5 },
      { slug: "communication", importance: 4 },
      { slug: "data-analysis", importance: 4 },
    ],
    interests: [
      { slug: "psychology", relevance: 5 },
      { slug: "science", relevance: 4 },
      { slug: "design", relevance: 3 },
    ],
    activities: [
      { slug: "finding-patterns", relevance: 5 },
      { slug: "working-with-people", relevance: 4 },
      { slug: "explaining-ideas", relevance: 4 },
    ],
    industries: [{ slug: "tech", relevance: 5 }, { slug: "healthcare", relevance: 3 }],
    highlights: [{ title: "Day-to-day", body: "Plan studies, conduct interviews, synthesize insights, and present findings to product teams.", sortOrder: 0 }],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    tagline: "Define what to build and why",
    summary: "Product Managers own the vision, strategy, and roadmap — balancing user needs, business goals, and technical constraints.",
    salaryMin: 100000,
    salaryMax: 180000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: true,
    exampleCompanies: ["Google", "Stripe", "Notion", "Slack"],
    skills: [
      { slug: "product-management", importance: 5 },
      { slug: "strategy", importance: 4 },
      { slug: "data-analysis", importance: 4 },
      { slug: "leadership", importance: 4 },
    ],
    interests: [
      { slug: "technology", relevance: 5 },
      { slug: "business", relevance: 4 },
    ],
    activities: [
      { slug: "solving-problems", relevance: 5 },
      { slug: "building-systems", relevance: 4 },
      { slug: "working-with-people", relevance: 4 },
    ],
    industries: [{ slug: "tech", relevance: 5 }],
    highlights: [{ title: "Day-to-day", body: "Prioritize features, run user interviews, align teams, and ship products users love.", sortOrder: 0 }],
  },
  {
    slug: "product-marketing-manager",
    title: "Product Marketing Manager",
    tagline: "Bridge product and market",
    summary: "PMMs translate product capabilities into compelling narratives that drive adoption.",
    salaryMin: 90000,
    salaryMax: 160000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: true,
    exampleCompanies: ["Salesforce", "HubSpot", "Notion", "Canva"],
    skills: [
      { slug: "marketing", importance: 5 },
      { slug: "writing", importance: 5 },
      { slug: "strategy", importance: 4 },
    ],
    interests: [
      { slug: "business", relevance: 5 },
      { slug: "writing", relevance: 4 },
    ],
    activities: [
      { slug: "explaining-ideas", relevance: 5 },
      { slug: "working-with-people", relevance: 4 },
    ],
    industries: [{ slug: "tech", relevance: 5 }],
    highlights: [{ title: "Day-to-day", body: "Craft messaging, run launches, analyze competitors, and enable sales teams.", sortOrder: 0 }],
  },
  {
    slug: "solutions-engineer",
    title: "Solutions Engineer",
    tagline: "Technical expertise meets customer success",
    summary: "Solutions Engineers help customers understand how technical products solve their problems.",
    salaryMin: 95000,
    salaryMax: 170000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.HIGH_GROWTH,
    featured: true,
    exampleCompanies: ["Databricks", "Snowflake", "Twilio", "MongoDB"],
    skills: [
      { slug: "coding", importance: 4 },
      { slug: "engineering", importance: 4 },
      { slug: "communication", importance: 5 },
    ],
    interests: [
      { slug: "technology", relevance: 5 },
      { slug: "business", relevance: 3 },
    ],
    activities: [
      { slug: "explaining-ideas", relevance: 5 },
      { slug: "solving-problems", relevance: 5 },
      { slug: "working-with-people", relevance: 4 },
    ],
    industries: [{ slug: "tech", relevance: 5 }],
    highlights: [{ title: "Day-to-day", body: "Run demos, build proof-of-concepts, and translate customer needs into product feedback.", sortOrder: 0 }],
  },
  {
    slug: "developer-relations",
    title: "Developer Relations",
    tagline: "Build bridges between developers and products",
    summary: "DevRel professionals grow developer communities around tools, APIs, and platforms.",
    salaryMin: 90000,
    salaryMax: 165000,
    experienceLevel: ExperienceLevel.MID,
    growthOutlook: GrowthOutlook.GROWING,
    featured: false,
    exampleCompanies: ["Vercel", "Supabase", "GitHub", "Cloudflare"],
    skills: [
      { slug: "coding", importance: 4 },
      { slug: "writing", importance: 5 },
      { slug: "communication", importance: 5 },
    ],
    interests: [
      { slug: "technology", relevance: 5 },
      { slug: "media", relevance: 3 },
    ],
    activities: [
      { slug: "explaining-ideas", relevance: 5 },
      { slug: "working-with-people", relevance: 4 },
    ],
    industries: [{ slug: "tech", relevance: 5 }],
    highlights: [{ title: "Day-to-day", body: "Write tutorials, speak at meetups, and advocate for developers internally.", sortOrder: 0 }],
  },
];

async function upsertTaxonomy() {
  for (const item of INTERESTS) {
    await prisma.interest.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  for (const item of ACTIVITIES) {
    await prisma.activity.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  for (const item of SKILLS_HAVE) {
    await prisma.skill.upsert({
      where: { slug: item.slug },
      update: { ...item, skillPickerGroup: SkillPickerGroup.HAVE },
      create: { ...item, skillPickerGroup: SkillPickerGroup.HAVE },
    });
  }
  for (const item of SKILLS_LEARN) {
    await prisma.skill.upsert({
      where: { slug: item.slug },
      update: { ...item, skillPickerGroup: SkillPickerGroup.LEARN },
      create: { ...item, skillPickerGroup: SkillPickerGroup.LEARN },
    });
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
  const activityMap = Object.fromEntries(
    (await prisma.activity.findMany({ select: { id: true, slug: true } })).map((a) => [a.slug, a.id]),
  );
  const industryMap = Object.fromEntries(
    (await prisma.industry.findMany({ select: { id: true, slug: true } })).map((i) => [i.slug, i.id]),
  );

  for (const seed of CAREERS) {
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
        status: CareerStatus.PUBLISHED,
        lastVerifiedAt: new Date(),
      },
    });

    await prisma.careerHighlight.deleteMany({ where: { careerId: career.id } });
    await prisma.careerSkill.deleteMany({ where: { careerId: career.id } });
    await prisma.careerInterest.deleteMany({ where: { careerId: career.id } });
    await prisma.careerActivity.deleteMany({ where: { careerId: career.id } });
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
      data: seed.interests.map((i) => ({
        careerId: career.id,
        interestId: interestMap[i.slug],
        relevance: i.relevance,
      })),
    });
    await prisma.careerActivity.createMany({
      data: seed.activities.map((a) => ({
        careerId: career.id,
        activityId: activityMap[a.slug],
        relevance: a.relevance,
      })),
    });
    await prisma.careerIndustry.createMany({
      data: seed.industries.map((i) => ({
        careerId: career.id,
        industryId: industryMap[i.slug],
        relevance: i.relevance,
      })),
    });
  }
}

async function main() {
  await upsertTaxonomy();
  await seedCareers();
  console.log(`Seeded ${CAREERS.length} careers with discovery taxonomy.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
