import { GrowthOutlook } from "../../../src/generated/prisma/client";

import { c } from "../career-builder";
import type { CareerCategoryDefinition } from "../career-taxonomy.types";

/** Pre-expansion categories — Healthcare batch pending. */
export const LEGACY_CATEGORIES: CareerCategoryDefinition[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    profile: "health",
    primaryIndustry: "healthcare",
    careers: [
      c({ slug: "physician", title: "Physician", tagline: "Diagnose and treat patients", summary: "Provide medical care across specialties in hospitals, clinics, and private practice.", salaryMin: 180000, salaryMax: 350000, anchor: true, tier: "major", exampleCompanies: ["Mayo Clinic", "Kaiser Permanente"] }),
      c({ slug: "nurse", title: "Nurse", tagline: "Care for patients at the bedside and beyond", summary: "Deliver clinical care, coordinate treatment plans, and support patient recovery.", salaryMin: 60000, salaryMax: 95000, anchor: true, tier: "major" }),
      c({ slug: "healthcare-administrator", title: "Healthcare Administrator", tagline: "Keep healthcare organizations running", summary: "Manage operations, budgets, and staff in hospitals and clinics.", salaryMin: 70000, salaryMax: 130000, anchor: true, tier: "specialized" }),
      c({ slug: "medical-researcher", title: "Medical Researcher", tagline: "Advance treatments through rigorous study", summary: "Conduct clinical and translational research to improve patient outcomes.", salaryMin: 80000, salaryMax: 150000, anchor: true, tier: "major", exampleCompanies: ["Pfizer", "Johns Hopkins", "NIH"] }),
      c({ slug: "clinical-research-coordinator", title: "Clinical Research Coordinator", tagline: "Run the studies that advance medicine", summary: "Manage clinical trial logistics, patient enrollment, and regulatory compliance.", salaryMin: 50000, salaryMax: 85000, tier: "specialized" }),
    ],
  },
];
