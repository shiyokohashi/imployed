import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROFILE_TIER_TAGS = {
  tech: {
    major: { interests: ["technology", "building-products", "science"], skills: ["problem-solving", "systems-thinking", "data-analysis"], workStyles: ["technical", "analytical", "collaborative"] },
    specialized: { interests: ["technology", "science"], skills: ["problem-solving", "critical-thinking", "data-analysis"], workStyles: ["technical", "analytical", "independent"] },
    emerging: { interests: ["technology", "science", "environment"], skills: ["problem-solving", "creativity", "systems-thinking"], workStyles: ["technical", "collaborative", "analytical"] },
    interdisciplinary: { interests: ["technology", "healthcare", "environment"], skills: ["problem-solving", "systems-thinking", "communication"], workStyles: ["technical", "collaborative", "hands-on"] },
    hidden: { interests: ["technology", "science"], skills: ["problem-solving", "organization", "critical-thinking"], workStyles: ["hands-on", "independent", "technical"] },
  },
  business: {
    major: { interests: ["business-strategy", "entrepreneurship"], skills: ["communication", "leadership", "strategic-thinking"], workStyles: ["collaborative", "people-focused", "analytical"] },
    specialized: { interests: ["business-strategy", "finance-investing"], skills: ["communication", "negotiation", "decision-making"], workStyles: ["analytical", "collaborative", "people-focused"] },
    emerging: { interests: ["business-strategy", "entrepreneurship", "technology"], skills: ["strategic-thinking", "creativity", "communication"], workStyles: ["collaborative", "creative", "analytical"] },
    interdisciplinary: { interests: ["business-strategy", "psychology", "communication"], skills: ["research", "communication", "critical-thinking"], workStyles: ["analytical", "collaborative", "people-focused"] },
    hidden: { interests: ["business-strategy", "entrepreneurship"], skills: ["organization", "communication", "persuasion"], workStyles: ["independent", "people-focused", "hands-on"] },
  },
  design: {
    major: { interests: ["creating-designing", "building-products", "media-entertainment"], skills: ["visual-design", "creativity", "prototyping"], workStyles: ["creative", "hands-on", "collaborative"] },
    specialized: { interests: ["creating-designing", "media-entertainment"], skills: ["visual-design", "creativity", "ideation"], workStyles: ["creative", "collaborative", "hands-on"] },
    emerging: { interests: ["creating-designing", "technology", "media-entertainment"], skills: ["creativity", "prototyping", "visual-design"], workStyles: ["creative", "collaborative", "analytical"] },
    interdisciplinary: { interests: ["creating-designing", "technology", "psychology"], skills: ["creativity", "communication", "prototyping"], workStyles: ["creative", "collaborative", "people-focused"] },
    hidden: { interests: ["creating-designing", "media-entertainment"], skills: ["creativity", "organization", "visual-design"], workStyles: ["independent", "hands-on", "creative"] },
  },
  finance: {
    major: { interests: ["finance-investing", "business-strategy"], skills: ["data-analysis", "research", "financial-literacy"], workStyles: ["analytical", "independent", "collaborative"] },
    specialized: { interests: ["finance-investing", "technology"], skills: ["data-analysis", "critical-thinking", "financial-literacy"], workStyles: ["analytical", "independent", "collaborative"] },
    emerging: { interests: ["finance-investing", "technology", "entrepreneurship"], skills: ["data-analysis", "creativity", "financial-literacy"], workStyles: ["analytical", "collaborative", "independent"] },
    interdisciplinary: { interests: ["finance-investing", "business-strategy", "law-policy"], skills: ["research", "data-analysis", "communication"], workStyles: ["analytical", "collaborative", "independent"] },
    hidden: { interests: ["finance-investing", "business-strategy"], skills: ["organization", "data-analysis", "financial-literacy"], workStyles: ["independent", "analytical", "hands-on"] },
  },
  media: {
    major: { interests: ["media-entertainment", "communication", "creating-designing"], skills: ["writing", "storytelling", "creativity"], workStyles: ["creative", "collaborative", "people-focused"] },
    specialized: { interests: ["media-entertainment", "creating-designing"], skills: ["writing", "creativity", "persuasion"], workStyles: ["creative", "collaborative", "hands-on"] },
    emerging: { interests: ["media-entertainment", "technology", "communication"], skills: ["creativity", "storytelling", "writing"], workStyles: ["creative", "collaborative", "analytical"] },
    interdisciplinary: { interests: ["media-entertainment", "business-strategy", "technology"], skills: ["communication", "creativity", "persuasion"], workStyles: ["creative", "collaborative", "people-focused"] },
    hidden: { interests: ["media-entertainment", "communication"], skills: ["writing", "organization", "creativity"], workStyles: ["independent", "creative", "hands-on"] },
  },
  health: {
    major: { interests: ["healthcare", "science", "psychology"], skills: ["research", "communication", "problem-solving"], workStyles: ["people-focused", "collaborative", "hands-on"] },
    specialized: { interests: ["healthcare", "science"], skills: ["research", "communication", "teaching"], workStyles: ["people-focused", "collaborative", "hands-on"] },
    emerging: { interests: ["healthcare", "technology", "science"], skills: ["research", "problem-solving", "communication"], workStyles: ["people-focused", "collaborative", "analytical"] },
    interdisciplinary: { interests: ["healthcare", "psychology", "education"], skills: ["communication", "teaching", "research"], workStyles: ["people-focused", "collaborative", "hands-on"] },
    hidden: { interests: ["healthcare", "psychology"], skills: ["communication", "organization", "problem-solving"], workStyles: ["people-focused", "hands-on", "independent"] },
  },
  science: {
    major: { interests: ["science", "environment", "technology"], skills: ["research", "data-analysis", "critical-thinking"], workStyles: ["analytical", "independent", "hands-on"] },
    specialized: { interests: ["science", "technology"], skills: ["research", "data-analysis", "pattern-recognition"], workStyles: ["analytical", "independent", "hands-on"] },
    emerging: { interests: ["science", "technology", "environment"], skills: ["research", "creativity", "data-analysis"], workStyles: ["analytical", "collaborative", "hands-on"] },
    interdisciplinary: { interests: ["science", "healthcare", "environment"], skills: ["research", "communication", "data-analysis"], workStyles: ["analytical", "collaborative", "hands-on"] },
    hidden: { interests: ["science", "environment"], skills: ["research", "organization", "critical-thinking"], workStyles: ["independent", "hands-on", "analytical"] },
  },
  education: {
    major: { interests: ["education", "psychology", "communication"], skills: ["teaching", "communication", "mentoring"], workStyles: ["people-focused", "collaborative", "creative"] },
    specialized: { interests: ["education", "psychology"], skills: ["teaching", "communication", "writing"], workStyles: ["people-focused", "collaborative", "hands-on"] },
    emerging: { interests: ["education", "technology", "psychology"], skills: ["teaching", "creativity", "communication"], workStyles: ["people-focused", "collaborative", "analytical"] },
    interdisciplinary: { interests: ["education", "healthcare", "psychology"], skills: ["teaching", "communication", "research"], workStyles: ["people-focused", "collaborative", "hands-on"] },
    hidden: { interests: ["education", "communication"], skills: ["teaching", "organization", "mentoring"], workStyles: ["people-focused", "independent", "hands-on"] },
  },
  government: {
    major: { interests: ["law-policy", "social-impact", "business-strategy"], skills: ["research", "communication", "strategic-thinking"], workStyles: ["analytical", "collaborative", "people-focused"] },
    specialized: { interests: ["law-policy", "social-impact"], skills: ["research", "communication", "decision-making"], workStyles: ["analytical", "collaborative", "people-focused"] },
    emerging: { interests: ["law-policy", "technology", "social-impact"], skills: ["research", "strategic-thinking", "communication"], workStyles: ["analytical", "collaborative", "independent"] },
    interdisciplinary: { interests: ["law-policy", "psychology", "social-impact"], skills: ["research", "communication", "critical-thinking"], workStyles: ["analytical", "collaborative", "people-focused"] },
    hidden: { interests: ["law-policy", "social-impact"], skills: ["organization", "research", "communication"], workStyles: ["independent", "analytical", "people-focused"] },
  },
};

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function generateExpansionTs(categorySlug, exportName, profile, sections) {
  const tierTags = PROFILE_TIER_TAGS[profile];
  let out = `import { GrowthOutlook } from "../../../../src/generated/prisma/client";

import { c } from "../../career-builder";

/** Subcategory expansion — additional roles for ${categorySlug}. */
export const ${exportName} = [
`;

  for (const section of sections) {
    out += `\n  // === ${section.name} ===\n`;
    for (const row of section.careers) {
      const [slug, title, tagline, summary, min, max, opts = {}] = row;
      const tags = tierTags[opts.tier ?? "specialized"];
      out += `  c({\n`;
      out += `    slug: "${slug}",\n`;
      out += `    title: "${esc(title)}",\n`;
      out += `    tagline: "${esc(tagline)}",\n`;
      out += `    summary: "${esc(summary)}",\n`;
      out += `    salaryMin: ${min},\n`;
      out += `    salaryMax: ${max},\n`;
      if (opts.tier) out += `    tier: "${opts.tier}",\n`;
      if (opts.growth) out += `    growthOutlook: GrowthOutlook.${opts.growth},\n`;
      if (opts.companies) out += `    exampleCompanies: [${opts.companies.map((x) => `"${x}"`).join(", ")}],\n`;
      if (opts.aliases) out += `    aliases: [${opts.aliases.map((x) => `"${esc(x)}"`).join(", ")}],\n`;
      if (opts.related) out += `    related: [${opts.related.map((x) => `"${x}"`).join(", ")}],\n`;
      out += `    interests: [${tags.interests.map((x) => `"${x}"`).join(", ")}],\n`;
      out += `    skills: [${tags.skills.map((x) => `"${x}"`).join(", ")}],\n`;
      out += `    workStyles: [${tags.workStyles.map((x) => `"${x}"`).join(", ")}],\n`;
      out += `    commonTasks: "${esc(opts.tasks ?? "")}",\n`;
      out += `    downsides: "${esc(opts.downsides ?? "")}",\n`;
      out += `  }),\n`;
    }
  }

  out += `];\n`;
  return out;
}

export function writeExpansionFile(categorySlug, exportName, profile, sections) {
  const outDir = path.join(__dirname, "../../data/categories/expansions");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${categorySlug}.ts`);
  fs.writeFileSync(outPath, generateExpansionTs(categorySlug, exportName, profile, sections));
  const count = sections.reduce((n, s) => n + s.careers.length, 0);
  console.log(`  ${categorySlug}: ${count} expansion careers`);
  return count;
}
