import { SkillPickerGroup } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import type { DiscoveryTaxonomy, TaxonomyItem } from "@/lib/types/career";

export const taxonomyRepository = {
  async getSkillsByPickerGroup(group: SkillPickerGroup): Promise<TaxonomyItem[]> {
    return db.skill.findMany({
      where: { skillPickerGroup: group },
      select: { slug: true, name: true, description: true },
      orderBy: { name: "asc" },
    });
  },

  async getInterests(): Promise<TaxonomyItem[]> {
    return db.interest.findMany({
      select: { slug: true, name: true, description: true },
      orderBy: { name: "asc" },
    });
  },

  async getActivities(): Promise<TaxonomyItem[]> {
    return db.activity.findMany({
      select: { slug: true, name: true, description: true },
      orderBy: { name: "asc" },
    });
  },

  async getIndustries(): Promise<TaxonomyItem[]> {
    return db.industry.findMany({
      select: { slug: true, name: true, description: true },
      orderBy: { name: "asc" },
    });
  },

  async getDiscoveryTaxonomy(): Promise<DiscoveryTaxonomy> {
    const [interests, skillsHave, skillsLearn, activities] = await Promise.all([
      this.getInterests(),
      this.getSkillsByPickerGroup(SkillPickerGroup.HAVE),
      this.getSkillsByPickerGroup(SkillPickerGroup.LEARN),
      this.getActivities(),
    ]);

    return { interests, skillsHave, skillsLearn, activities };
  },
};
