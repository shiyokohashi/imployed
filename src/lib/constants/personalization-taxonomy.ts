import { SkillCategory, WorkStyleCategory } from "@/generated/prisma/client";

export type PersonalizationInterest = { slug: string; name: string };
export type PersonalizationSkill = { slug: string; name: string; category: SkillCategory };
export type PersonalizationWorkStyle = {
  slug: string;
  name: string;
  category: WorkStyleCategory;
};

/** Edit personalize tags here — order is preserved in the discover panel. */
export const PERSONALIZATION_INTERESTS: PersonalizationInterest[] = [
  { slug: "building-products", name: "Building products" },
  { slug: "creating-designing", name: "Creating & designing" },
  { slug: "business-strategy", name: "Business & strategy" },
  { slug: "finance-investing", name: "Finance & investing" },
  { slug: "technology", name: "Technology" },
  { slug: "science", name: "Science" },
  { slug: "healthcare", name: "Healthcare" },
  { slug: "psychology", name: "Psychology" },
  { slug: "education", name: "Education" },
  { slug: "law-policy", name: "Law & policy" },
  { slug: "media-entertainment", name: "Media & entertainment" },
  { slug: "communication", name: "Communication" },
  { slug: "entrepreneurship", name: "Entrepreneurship" },
  { slug: "social-impact", name: "Social impact" },
  { slug: "environment", name: "Environment" },
];

export const PERSONALIZATION_SKILLS: PersonalizationSkill[] = [
  { slug: "visual-design", name: "Visual design", category: SkillCategory.TOOL },
  { slug: "coding", name: "Coding", category: SkillCategory.TECHNICAL },
  { slug: "writing", name: "Writing", category: SkillCategory.SOFT },
  { slug: "storytelling", name: "Storytelling", category: SkillCategory.SOFT },
  { slug: "communication", name: "Communication", category: SkillCategory.SOFT },
  { slug: "public-speaking", name: "Public speaking", category: SkillCategory.SOFT },
  { slug: "research", name: "Research", category: SkillCategory.DOMAIN },
  { slug: "data-analysis", name: "Data analysis", category: SkillCategory.TECHNICAL },
  { slug: "problem-solving", name: "Problem solving", category: SkillCategory.SOFT },
  { slug: "critical-thinking", name: "Critical thinking", category: SkillCategory.SOFT },
  { slug: "creativity", name: "Creativity", category: SkillCategory.SOFT },
  { slug: "ideation", name: "Ideation", category: SkillCategory.SOFT },
  { slug: "prototyping", name: "Prototyping", category: SkillCategory.TOOL },
  { slug: "organization", name: "Organization", category: SkillCategory.SOFT },
  { slug: "project-management", name: "Project management", category: SkillCategory.DOMAIN },
  { slug: "leadership", name: "Leadership", category: SkillCategory.SOFT },
  { slug: "teaching", name: "Teaching", category: SkillCategory.SOFT },
  { slug: "mentoring", name: "Mentoring", category: SkillCategory.SOFT },
  { slug: "negotiation", name: "Negotiation", category: SkillCategory.SOFT },
  { slug: "persuasion", name: "Persuasion", category: SkillCategory.SOFT },
  { slug: "decision-making", name: "Decision making", category: SkillCategory.SOFT },
  { slug: "strategic-thinking", name: "Strategic thinking", category: SkillCategory.DOMAIN },
  { slug: "systems-thinking", name: "Systems thinking", category: SkillCategory.DOMAIN },
  { slug: "pattern-recognition", name: "Pattern recognition", category: SkillCategory.DOMAIN },
  { slug: "financial-literacy", name: "Financial literacy", category: SkillCategory.DOMAIN },
];

export const PERSONALIZATION_WORK_STYLES: PersonalizationWorkStyle[] = [
  { slug: "creative", name: "Creative", category: WorkStyleCategory.APPROACH },
  { slug: "analytical", name: "Analytical", category: WorkStyleCategory.APPROACH },
  { slug: "technical", name: "Technical", category: WorkStyleCategory.APPROACH },
  { slug: "people-focused", name: "People-focused", category: WorkStyleCategory.ENVIRONMENT },
  { slug: "independent", name: "Independent", category: WorkStyleCategory.ENVIRONMENT },
  { slug: "collaborative", name: "Collaborative", category: WorkStyleCategory.ENVIRONMENT },
  { slug: "hands-on", name: "Hands-on", category: WorkStyleCategory.APPROACH },
];

export const INTEREST_SLUG_ORDER = PERSONALIZATION_INTERESTS.map((item) => item.slug);
export const SKILL_SLUG_ORDER = PERSONALIZATION_SKILLS.map((item) => item.slug);
export const WORK_STYLE_SLUG_ORDER = PERSONALIZATION_WORK_STYLES.map((item) => item.slug);

export function orderTaxonomyBySlugs<T extends { slug: string }>(items: T[], order: string[]): T[] {
  const lookup = new Map(items.map((item) => [item.slug, item]));
  return order.map((slug) => lookup.get(slug)).filter((item): item is T => Boolean(item));
}
