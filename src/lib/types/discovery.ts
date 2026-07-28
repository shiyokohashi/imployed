export type DiscoveryFilters = {
  interests?: string[];
  skillsHave?: string[];
  skillsLearn?: string[];
  activities?: string[];
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
  skillsHave: Array<{ slug: string; name: string }>;
  skillsLearn: Array<{ slug: string; name: string }>;
  activities: Array<{ slug: string; name: string }>;
};

export type TagSection = {
  key: keyof DiscoveryFilters;
  label: string;
  hint?: string;
  items: Array<{ slug: string; name: string }>;
};

export const DISCOVERY_TAG_SECTIONS: Array<{
  key: keyof DiscoveryFilters;
  label: string;
  hint?: string;
}> = [
  { key: "interests", label: "My interests" },
  { key: "skillsHave", label: "Skills I have" },
  { key: "skillsLearn", label: "Skills I want to explore" },
  { key: "activities", label: "Things I enjoy doing" },
];
