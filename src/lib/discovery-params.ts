import { parseSalaryPreference } from "@/lib/constants/salary-preference";
import type { DiscoveryFilters, DiscoveryTagKey } from "@/lib/types/discovery";

export function searchParamsToRecord(
  params: URLSearchParams,
): Record<string, string | string[] | undefined> {
  const record: Record<string, string | string[] | undefined> = {};

  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    record[key] = values.length === 1 ? values[0] : values;
  }

  return record;
}

export function filtersToSearchParams(filters: DiscoveryFilters): URLSearchParams {
  const params = new URLSearchParams();

  for (const slug of filters.interests ?? []) {
    params.append("interests", slug);
  }
  for (const slug of filters.skills ?? []) {
    params.append("skills", slug);
  }
  for (const slug of filters.workStyles ?? []) {
    params.append("workStyles", slug);
  }
  if (filters.salaryMin != null) {
    params.set("salaryMin", String(filters.salaryMin));
  }

  return params;
}

export function searchParamsToFilters(
  params: Record<string, string | string[] | undefined>,
): DiscoveryFilters {
  const salaryMin = parseSalaryPreference(params.salaryMin);

  return {
    interests: toArray(params.interests),
    skills: mergeArrays(toArray(params.skills), toArray(params.skillsHave)),
    workStyles: mergeArrays(toArray(params.workStyles), toArray(params.activities)),
    ...(salaryMin != null ? { salaryMin } : {}),
  };
}

export function toggleTagInParams(
  current: URLSearchParams,
  key: DiscoveryTagKey,
  slug: string,
  active: string[],
): URLSearchParams {
  const next = new URLSearchParams(current.toString());
  next.delete(key);
  // Clear legacy param keys when toggling new ones
  if (key === "skills") {
    next.delete("skillsHave");
    next.delete("skillsLearn");
  }
  if (key === "workStyles") {
    next.delete("activities");
  }

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

function mergeArrays(primary?: string[], legacy?: string[]): string[] | undefined {
  const merged = [...new Set([...(primary ?? []), ...(legacy ?? [])])];
  return merged.length > 0 ? merged : undefined;
}

export function hasDiscoverySignals(filters: DiscoveryFilters): boolean {
  return Boolean(
    filters.interests?.length ||
      filters.skills?.length ||
      filters.workStyles?.length ||
      filters.salaryMin != null,
  );
}
