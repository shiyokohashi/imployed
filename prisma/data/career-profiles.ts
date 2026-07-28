import type { CareerProfile } from "./career-taxonomy.types";

/** Maps each career profile to personalize tags used during seeding. */
export const PROFILE_DEFAULTS: Record<
  CareerProfile,
  {
    interests: string[];
    skills: string[];
    workStyles: string[];
    industries: string[];
  }
> = {
  tech: {
    interests: ["technology", "building-products", "science"],
    skills: ["coding", "problem-solving", "systems-thinking", "data-analysis"],
    workStyles: ["analytical", "technical", "collaborative"],
    industries: ["tech"],
  },
  business: {
    interests: ["business-strategy", "entrepreneurship", "finance-investing"],
    skills: ["communication", "leadership", "strategic-thinking", "negotiation"],
    workStyles: ["collaborative", "people-focused", "analytical"],
    industries: ["tech", "finance"],
  },
  design: {
    interests: ["creating-designing", "building-products", "media-entertainment"],
    skills: ["visual-design", "creativity", "prototyping", "ideation"],
    workStyles: ["creative", "hands-on", "collaborative"],
    industries: ["tech", "media"],
  },
  finance: {
    interests: ["finance-investing", "business-strategy", "technology"],
    skills: ["data-analysis", "research", "financial-literacy", "critical-thinking"],
    workStyles: ["analytical", "independent", "collaborative"],
    industries: ["finance"],
  },
  media: {
    interests: ["media-entertainment", "communication", "creating-designing"],
    skills: ["writing", "storytelling", "creativity", "persuasion"],
    workStyles: ["creative", "collaborative", "people-focused"],
    industries: ["media", "tech"],
  },
  health: {
    interests: ["healthcare", "science", "psychology"],
    skills: ["research", "communication", "teaching", "problem-solving"],
    workStyles: ["people-focused", "collaborative", "hands-on"],
    industries: ["healthcare", "education"],
  },
  science: {
    interests: ["science", "environment", "technology"],
    skills: ["research", "data-analysis", "pattern-recognition", "critical-thinking"],
    workStyles: ["analytical", "independent", "hands-on"],
    industries: ["healthcare", "education", "sustainability"],
  },
  education: {
    interests: ["education", "psychology", "communication"],
    skills: ["teaching", "mentoring", "communication", "writing"],
    workStyles: ["people-focused", "collaborative", "creative"],
    industries: ["education", "government"],
  },
  government: {
    interests: ["law-policy", "social-impact", "business-strategy"],
    skills: ["research", "communication", "strategic-thinking", "decision-making"],
    workStyles: ["analytical", "collaborative", "people-focused"],
    industries: ["government", "education"],
  },
};
