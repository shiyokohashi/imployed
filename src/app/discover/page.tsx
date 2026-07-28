import { Suspense } from "react";

import { BrowseSection, PersonalizeHint } from "@/components/discover/browse-section";
import { DiscoveryTagPanel } from "@/components/discover/discovery-tag-panel";
import { MatchResultCard } from "@/components/discover/match-result-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { hasDiscoverySignals, searchParamsToFilters } from "@/lib/discovery-params";
import { careerRepository } from "@/lib/repositories/career.repository";
import { taxonomyRepository } from "@/lib/repositories/taxonomy.repository";
import { discoveryService } from "@/lib/services/discovery.service";
import { CareerGrid } from "@/components/careers/career-grid";

export const dynamic = "force-dynamic";

type DiscoverPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const filters = searchParamsToFilters(params);
  const hasSignals = hasDiscoverySignals(filters);

  const [taxonomy, discovery, featured] = await Promise.all([
    taxonomyRepository.getDiscoveryTaxonomy(),
    discoveryService.discover(filters),
    careerRepository.findFeatured(6),
  ]);

  const topMatches = hasSignals
    ? discovery.results.filter((r) => r.matchScore > 0).slice(0, 8)
    : [];
  const exploreMore = hasSignals
    ? discovery.results.filter((r) => r.matchScore === 0).slice(0, 6)
    : [];
  const exploreMoreCareers = hasSignals
    ? await careerRepository.findBySlugs(exploreMore.map((r) => r.career.slug))
    : [];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-10 max-w-2xl space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Discover</h1>
          <p className="text-muted-foreground">
            Optional tags personalize your feed. Browse everything — no quiz, no gatekeeping.
          </p>
        </div>

        <div className="space-y-12">
          <Suspense fallback={null}>
            <DiscoveryTagPanel taxonomy={taxonomy} active={filters} />
          </Suspense>

          <PersonalizeHint />

          {hasSignals ? (
            <section className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">{discovery.headline}</h2>
                <p className="text-sm text-muted-foreground">
                  Ranked by fit — lower matches stay visible so you can explore surprises.
                </p>
              </div>

              {topMatches.length > 0 ? (
                <div className="space-y-4">
                  {topMatches.map((result, index) => (
                    <MatchResultCard key={result.career.id} result={result} rank={index + 1} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No strong matches yet — try more tags, or browse below.
                </p>
              )}

              {exploreMoreCareers.length > 0 && (
                <div className="space-y-4 border-t border-border/60 pt-8">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Unexpected paths worth exploring
                  </h3>
                  <CareerGrid careers={exploreMoreCareers} />
                </div>
              )}
            </section>
          ) : (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Featured careers</h2>
              <CareerGrid careers={featured} />
            </section>
          )}

          <BrowseSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Discover | Imployed",
  description: "Personalized career discovery — optional tags, no quiz required.",
};
