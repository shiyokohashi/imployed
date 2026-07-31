import Link from "next/link";

import { CareerGrid } from "@/components/careers/career-grid";
import type { IndustryFeaturedSection } from "@/lib/types/career";

type ExploreByIndustryProps = {
  sections: IndustryFeaturedSection[];
};

export function ExploreByIndustry({ sections }: ExploreByIndustryProps) {
  if (sections.length === 0) {
    return (
      <div className="border-t border-foreground/12 py-12 text-center">
        <p className="text-muted-foreground">
          No featured careers yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <nav className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10">
        {sections.map((section) => (
          <Link
            key={section.industry.slug}
            href={`#${section.industry.slug}`}
            className="type-career-title transition-opacity hover:opacity-70"
          >
            {section.industry.name}
          </Link>
        ))}
      </nav>

      {sections.map((section) => (
        <section
          key={section.industry.slug}
          id={section.industry.slug}
          className="scroll-mt-10 space-y-6"
        >
          <div className="max-w-3xl space-y-1.5">
            <h2 className="type-subhead">{section.industry.name}</h2>
            {section.industry.description && (
              <p className="type-body">{section.industry.description}</p>
            )}
          </div>
          <CareerGrid
            careers={section.careers}
            layout="grid"
            emptyMessage="No featured careers in this industry yet."
          />
        </section>
      ))}
    </div>
  );
}
