import { GrowthOutlook } from "../../../src/generated/prisma/client";

import { c } from "../career-builder";
import type { CareerCategoryDefinition } from "../career-taxonomy.types";

/** Pre-expansion categories — to be replaced by full batch files (Science & Healthcare pending). */
export const LEGACY_CATEGORIES: CareerCategoryDefinition[] = [
  {
    slug: "science",
    name: "Science",
    profile: "science",
    primaryIndustry: "sustainability",
    careers: [
      c({ slug: "research-scientist", title: "Research Scientist", tagline: "Push the boundaries of human knowledge", summary: "Design experiments, analyze results, and publish findings in academic or industry labs.", salaryMin: 70000, salaryMax: 130000, anchor: true, tier: "major", exampleCompanies: ["NIH", "Genentech", "MIT"] }),
      c({ slug: "biologist", title: "Biologist", tagline: "Study living systems at every scale", summary: "Investigate organisms, ecosystems, and biological processes in lab or field settings.", salaryMin: 50000, salaryMax: 95000, anchor: true, tier: "major", industries: ["healthcare", "education"] }),
      c({ slug: "environmental-scientist", title: "Environmental Scientist", tagline: "Study and protect the natural world", summary: "Research ecosystems, pollution, and sustainability interventions.", salaryMin: 55000, salaryMax: 100000, anchor: true, tier: "major", industries: ["sustainability", "government"] }),
      c({ slug: "biostatistician", title: "Biostatistician", tagline: "Apply statistics to health and biology", summary: "Design studies and analyze data for pharmaceutical and public health research.", salaryMin: 75000, salaryMax: 140000, tier: "specialized", industries: ["healthcare"] }),
      c({ slug: "bioinformatics-scientist", title: "Bioinformatics Scientist", tagline: "Apply computing to biological data", summary: "Analyze genomic and clinical data to advance research and healthcare.", salaryMin: 90000, salaryMax: 155000, tier: "interdisciplinary", industries: ["healthcare", "tech"] }),
      c({ slug: "sustainability-analyst", title: "Sustainability Analyst", tagline: "Help organizations reduce their footprint", summary: "Measure emissions, recommend improvements, and report on ESG goals.", salaryMin: 60000, salaryMax: 110000, tier: "specialized", growthOutlook: GrowthOutlook.GROWING }),
      c({ slug: "policy-analyst", title: "Policy Analyst", tagline: "Shape the rules society lives by", summary: "Research issues and draft recommendations for government and nonprofits.", salaryMin: 55000, salaryMax: 105000, tier: "specialized", industries: ["government"] }),
    ],
  },
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
