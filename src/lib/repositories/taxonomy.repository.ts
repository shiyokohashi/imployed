import { SkillPickerGroup } from "@/generated/prisma/client";
import {
  INTEREST_SLUG_ORDER,
  orderTaxonomyBySlugs,
  SKILL_SLUG_ORDER,
  WORK_STYLE_SLUG_ORDER,
} from "@/lib/constants/personalization-taxonomy";
import { db } from "@/lib/db";
import type { DiscoveryTaxonomy } from "@/lib/types/discovery";
import type { TaxonomyItem } from "@/lib/types/career";

export const taxonomyRepository = {
  async getInterests(): Promise<TaxonomyItem[]> {
    const items = await db.interest.findMany({
      select: { slug: true, name: true, description: true },
    });
    return orderTaxonomyBySlugs(items, INTEREST_SLUG_ORDER);
  },

  async getSkills(): Promise<TaxonomyItem[]> {
    const items = await db.skill.findMany({
      where: { skillPickerGroup: SkillPickerGroup.HAVE },
      select: { slug: true, name: true, description: true },
    });
    return orderTaxonomyBySlugs(items, SKILL_SLUG_ORDER);
  },

  async getWorkStyles(): Promise<TaxonomyItem[]> {
    const items = await db.workStyle.findMany({
      select: { slug: true, name: true, description: true },
    });
    return orderTaxonomyBySlugs(items, WORK_STYLE_SLUG_ORDER);
  },

  async getIndustries(): Promise<TaxonomyItem[]> {
    return db.industry.findMany({
      select: { slug: true, name: true, description: true },
      orderBy: { name: "asc" },
    });
  },

  async getDiscoveryTaxonomy(): Promise<DiscoveryTaxonomy> {
    const [interests, skills, workStyles] = await Promise.all([
      this.getInterests(),
      this.getSkills(),
      this.getWorkStyles(),
    ]);

    return { interests, skills, workStyles };
  },
};
