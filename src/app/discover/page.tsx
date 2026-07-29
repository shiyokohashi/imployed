import { Suspense } from "react";

import { BrowseSection, PersonalizeHint } from "@/components/discover/browse-section";
import { DiscoveryTagPanel } from "@/components/discover/discovery-tag-panel";
import { RankedCareerList } from "@/components/discover/ranked-career-list";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ListPagination } from "@/components/ui/list-pagination";
import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";
import { hasDiscoverySignals, searchParamsToFilters } from "@/lib/discovery-params";
import {
  getPaginationMeta,
  paginateOffset,
  parsePage,
} from "@/lib/pagination";
import { taxonomyRepository } from "@/lib/repositories/taxonomy.repository";
import { discoveryService } from "@/lib/services/discovery.service";

export const dynamic = "force-dynamic";

type DiscoverPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const filters = searchParamsToFilters(params);
  const hasSignals = hasDiscoverySignals(filters);
  const page = parsePage(params.page);

  const [taxonomy, discovery] = await Promise.all([
    taxonomyRepository.getDiscoveryTaxonomy(),
    discoveryService.discover(filters),
  ]);

  const pagination = getPaginationMeta(discovery.total, page, CAREERS_PER_PAGE);
  const offset = paginateOffset(pagination.page, CAREERS_PER_PAGE);
  const pageResults = discovery.results.slice(offset, offset + CAREERS_PER_PAGE);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-10 max-w-2xl space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Discover</h1>
          <p className="text-muted-foreground">
            {discovery.total.toLocaleString()} careers ranked by fit — up to {CAREERS_PER_PAGE} per
            page.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
            <Suspense fallback={null}>
              <DiscoveryTagPanel taxonomy={taxonomy} active={filters} />
            </Suspense>
            <PersonalizeHint />
          </aside>

          <div className="min-w-0 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">{discovery.headline}</h2>
              <p className="text-sm text-muted-foreground">
                {hasSignals
                  ? `${discovery.total.toLocaleString()} careers ranked — best matches on this page, use Next for more.`
                  : `${discovery.total.toLocaleString()} careers to explore — add tags on the left to re-rank by fit.`}
              </p>
            </div>

            <RankedCareerList
              results={pageResults}
              showScores={hasSignals}
              detailOffset={offset}
            />

            <ListPagination
              meta={pagination}
              pathname="/discover"
              searchParams={params}
            />
          </div>
        </div>

        <div className="mt-12">
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
