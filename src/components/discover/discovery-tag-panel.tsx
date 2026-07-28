"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { toggleTagInParams } from "@/lib/discovery-params";
import {
  DISCOVERY_TAG_SECTIONS,
  type DiscoveryFilters,
  type DiscoveryTaxonomy,
} from "@/lib/types/discovery";

type DiscoveryTagPanelProps = {
  taxonomy: DiscoveryTaxonomy;
  active: DiscoveryFilters;
};

export function DiscoveryTagPanel({ taxonomy, active }: DiscoveryTagPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sections = DISCOVERY_TAG_SECTIONS.map((section) => ({
    ...section,
    items: taxonomy[section.key === "skillsHave" ? "skillsHave" : section.key === "skillsLearn" ? "skillsLearn" : section.key],
  }));

  function handleToggle(key: keyof DiscoveryFilters, slug: string, selected: string[]) {
    const next = toggleTagInParams(searchParams, key, slug, selected);
    const query = next.toString();
    router.replace(query ? `/discover?${query}` : "/discover", { scroll: false });
  }

  return (
    <div className="space-y-8 rounded-xl border border-border/60 bg-muted/20 p-6">
      <div className="space-y-1">
        <h2 className="text-sm font-medium">Personalize (optional)</h2>
        <p className="text-sm text-muted-foreground">
          Add tags to get recommendations — or skip and browse freely below.
        </p>
      </div>

      {sections.map((section) => {
        const selected = active[section.key] ?? [];

        return (
          <div key={section.key}>
            <h3 className="mb-3 text-sm font-medium">{section.label}</h3>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item) => {
                const isActive = selected.includes(item.slug);
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => handleToggle(section.key, item.slug, selected)}
                  >
                    <Badge variant={isActive ? "default" : "outline"}>{item.name}</Badge>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
