import type {
  Career,
  CareerHighlight,
  CareerRelation,
  CareerSkill,
  CareerInterest,
  CareerIndustry,
  CareerWorkStyle,
  CareerPersonalityTrait,
  Skill,
  Interest,
  Industry,
  WorkStyle,
  PersonalityTrait,
} from "@/generated/prisma/client";

/** Standard include shape for career list views */
export type CareerListItem = Pick<
  Career,
  | "id"
  | "slug"
  | "title"
  | "tagline"
  | "summary"
  | "salaryMin"
  | "salaryMax"
  | "salaryCurrency"
  | "salaryPeriod"
  | "experienceLevel"
  | "growthOutlook"
  | "featured"
> & {
  industries: Array<{ industry: Pick<Industry, "slug" | "name"> }>;
  skills: Array<{ skill: Pick<Skill, "slug" | "name" | "category"> }>;
};

/** Full career detail with all related taxonomy */
export type CareerDetail = Career & {
  highlights: CareerHighlight[];
  skills: Array<
    CareerSkill & { skill: Skill }
  >;
  interests: Array<
    CareerInterest & { interest: Interest }
  >;
  industries: Array<
    CareerIndustry & { industry: Industry }
  >;
  workStyles: Array<
    CareerWorkStyle & { workStyle: WorkStyle }
  >;
  personalityTraits: Array<
    CareerPersonalityTrait & { personalityTrait: PersonalityTrait }
  >;
  relatedFrom: Array<
    CareerRelation & {
      toCareer: Pick<Career, "slug" | "title" | "tagline">;
    }
  >;
};

export type SalaryRange = {
  min: number | null;
  max: number | null;
  currency: string;
  period: Career["salaryPeriod"];
};

export type TaxonomyItem = {
  slug: string;
  name: string;
  description: string | null;
};

export type IndustryFeaturedSection = {
  industry: TaxonomyItem;
  careers: CareerListItem[];
};

export type { DiscoveryTaxonomy } from "@/lib/types/discovery";
