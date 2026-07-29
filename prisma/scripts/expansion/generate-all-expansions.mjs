import businessFinance from "./data/business-finance.mjs";
import healthEducationLaw from "./data/health-education-law.mjs";
import remainingCategories from "./data/remaining-categories.mjs";
import techEngineeringScience from "./data/tech-engineering-science.mjs";
import { writeExpansionFile } from "./generate-expansion-ts.mjs";

const ALL_EXPANSIONS = {
  ...businessFinance,
  ...techEngineeringScience,
  ...healthEducationLaw,
  ...remainingCategories,
};

console.log("Generating subcategory expansion files...\n");

let total = 0;
for (const [categorySlug, config] of Object.entries(ALL_EXPANSIONS)) {
  total += writeExpansionFile(
    categorySlug,
    config.exportName,
    config.profile,
    config.sections,
  );
}

console.log(`\nTotal expansion careers: ${total}`);
