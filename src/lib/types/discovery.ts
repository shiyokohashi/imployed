export type DiscoveryFilters = {
  interests?: string[];
  skills?: string[];
  workStyles?: string[];
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
  key: keyof DiscoveryFilters;
  label: string;
  hint?: string;
}> = [
  { key: "interests", label: "Interests" },
  { key: "skills", label: "Skills & abilities" },
  { key: "workStyles", label: "Work style" },
];
