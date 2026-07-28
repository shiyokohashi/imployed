import type { DiscoveryFilters } from "@/lib/types/discovery";

export function filtersToSearchParams(filters: DiscoveryFilters): URLSearchParams {
  const params = new URLSearchParams();

  for (const slug of filters.interests ?? []) {
    params.append("interests", slug);
  }
  for (const slug of filters.skillsHave ?? []) {
    params.append("skillsHave", slug);
  }
  for (const slug of filters.skillsLearn ?? []) {
    params.append("skillsLearn", slug);
  }
  for (const slug of filters.activities ?? []) {
    params.append("activities", slug);
  }

  return params;
}

export function searchParamsToFilters(
  params: Record<string, string | string[] | undefined>,
): DiscoveryFilters {
  return {
    interests: toArray(params.interests),
    skillsHave: toArray(params.skillsHave),
    skillsLearn: toArray(params.skillsLearn),
    activities: toArray(params.activities),
  };
}

export function toggleTagInParams(
  current: URLSearchParams,
  key: keyof DiscoveryFilters,
  slug: string,
  active: string[],
): URLSearchParams {
  const next = new URLSearchParams(current.toString());
  next.delete(key);

  const updated = active.includes(slug)
    ? active.filter((s) => s !== slug)
    : [...active, slug];

  for (const item of updated) {
    next.append(key, item);
  }

  return next;
}

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
}

export function hasDiscoverySignals(filters: DiscoveryFilters): boolean {
  return Boolean(
    filters.interests?.length ||
      filters.skillsHave?.length ||
      filters.skillsLearn?.length ||
      filters.activities?.length,
  );
}
