export type DiscoveryTagKey = "interests" | "skills" | "workStyles";

export type DiscoveryTagFilters = {
  interests?: string[];
  skills?: string[];
  workStyles?: string[];
};

export type DiscoveryFilters = DiscoveryTagFilters & {
  /** Minimum desired annual salary (USD) — boosts higher-paying roles. */
  salaryMin?: number;
};

export type DiscoveryResult = {
  career: {
    id: string;
    slug: string;
    title: string;
    tagline: string | null;
    summary: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string;
    experienceLevel: string | null;
    featured: boolean;
    dayToDay: string | null;
    exampleCompanies: string[];
    industries: string[];
  };
  matchScore: number;
  matchReasons: string[];
  skillsYouHave: string[];
  skillsToBuild: string[];
};

export type DiscoveryResponse = {
  results: DiscoveryResult[];
  total: number;
  filters: DiscoveryFilters;
  headline: string;
  signalLabels: string[];
};

export type DiscoveryTaxonomy = {
  interests: Array<{ slug: string; name: string }>;
  skills: Array<{ slug: string; name: string }>;
  workStyles: Array<{ slug: string; name: string }>;
};

export const DISCOVERY_TAG_SECTIONS: Array<{
  key: DiscoveryTagKey;
  label: string;
  hint?: string;
}> = [
  { key: "interests", label: "Interests" },
  { key: "skills", label: "Skills & abilities" },
  { key: "workStyles", label: "Work style" },
];
