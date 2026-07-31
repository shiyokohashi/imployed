"use client";

import { SalaryPreferenceBar } from "@/components/discover/salary-preference-bar";
import { cn } from "@/lib/utils";
import { toggleTagInParams } from "@/lib/discovery-params";
import {
  DISCOVERY_TAG_SECTIONS,
  type DiscoveryFilters,
  type DiscoveryTagKey,
  type DiscoveryTaxonomy,
} from "@/lib/types/discovery";

type DiscoveryTagPanelProps = {
  taxonomy: DiscoveryTaxonomy;
  active: DiscoveryFilters;
  searchParams: URLSearchParams;
  replaceParams: (next: URLSearchParams) => void;
};

export function DiscoveryTagPanel({
  taxonomy,
  active,
  searchParams,
  replaceParams,
}: DiscoveryTagPanelProps) {
  const sections = DISCOVERY_TAG_SECTIONS.map((section) => ({
    ...section,
    items: taxonomy[section.key],
  }));

  function handleToggle(key: DiscoveryTagKey, slug: string, selected: string[]) {
    const next = toggleTagInParams(searchParams, key, slug, selected);
    next.delete("page");
    replaceParams(next);
  }

  return (
    <div className="border-t border-foreground/12 pt-6">
      <div className="space-y-2">
        <h2 className="type-section-title normal-case tracking-[0.04em]">
          Personalize (optional)
        </h2>
        <p className="type-body">
          Add tags to get recommendations — or browse careers on the right.
        </p>
      </div>

      <div className="mt-6 border-t border-foreground/12 pt-6">
        <SalaryPreferenceBar
          value={active.salaryMin}
          searchParams={searchParams}
          replaceParams={replaceParams}
        />
      </div>

      {sections.map((section) => {
        const selected = active[section.key] ?? [];

        return (
          <div key={section.key} className="mt-6 border-t border-foreground/12 pt-6">
            <h3 className="type-label mb-3">{section.label}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {section.items.map((item) => {
                const isActive = selected.includes(item.slug);
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => handleToggle(section.key, item.slug, selected)}
                    className={cn(
                      "type-body transition-opacity hover:opacity-70",
                      isActive && "font-medium text-foreground"
                    )}
                  >
                    {item.name}
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
