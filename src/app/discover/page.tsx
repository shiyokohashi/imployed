import { BrowseSection } from "@/components/discover/browse-section";
import { DiscoverExperience } from "@/components/discover/discover-experience";
import { DatabaseUnavailable } from "@/components/careers/database-unavailable";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";
import { hasDiscoverySignals, searchParamsToFilters } from "@/lib/discovery-params";
import { isDbConnectionError } from "@/lib/db-retry";
import {
  getPaginationMeta,
  paginateOffset,
  parsePage,
} from "@/lib/pagination";
import { taxonomyRepository } from "@/lib/repositories/taxonomy.repository";
import { discoveryService } from "@/lib/services/discovery.service";
import type { DiscoveryResponse, DiscoveryTaxonomy } from "@/lib/types/discovery";

export const dynamic = "force-dynamic";

type DiscoverPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const emptyTaxonomy: DiscoveryTaxonomy = {
  interests: [],
  skills: [],
  workStyles: [],
};

const emptyDiscovery: DiscoveryResponse = {
  results: [],
  total: 0,
  filters: {},
  signalLabels: [],
  headline: "Explore careers",
};

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const filters = searchParamsToFilters(params);
  const hasSignals = hasDiscoverySignals(filters);
  const page = parsePage(params.page);

  let taxonomy = emptyTaxonomy;
  let discovery = emptyDiscovery;
  let dbUnavailable = false;

  try {
    [taxonomy, discovery] = await Promise.all([
      taxonomyRepository.getDiscoveryTaxonomy(),
      discoveryService.discover(filters),
    ]);
  } catch (error) {
    console.error("Discover page: failed to load careers", error);
    if (isDbConnectionError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  const pagination = getPaginationMeta(discovery.total, page, CAREERS_PER_PAGE);
  const offset = paginateOffset(pagination.page, CAREERS_PER_PAGE);
  const pageResults = discovery.results.slice(offset, offset + CAREERS_PER_PAGE);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-8 py-14 sm:px-12 md:px-16 lg:px-20">
        <PageHeader
          title="Discover"
          lead={
            dbUnavailable
              ? "Personalized career discovery — optional tags, no quiz required."
              : `${discovery.total.toLocaleString()} careers ranked by fit — up to ${CAREERS_PER_PAGE} per page.`
          }
        />

        {dbUnavailable ? (
          <DatabaseUnavailable />
        ) : (
          <>
            <DiscoverExperience
              taxonomy={taxonomy}
              initialDiscovery={{
                ...discovery,
                results: pageResults,
              }}
              initialHasSignals={hasSignals}
              initialPagination={pagination}
              initialDetailOffset={offset}
            />

            <div className="mt-14">
              <BrowseSection />
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Discover | Imployed",
  description: "Personalized career discovery — optional tags, no quiz required.",
};
