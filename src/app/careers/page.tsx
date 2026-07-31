import { CareerGrid } from "@/components/careers/career-grid";
import { DatabaseUnavailable } from "@/components/careers/database-unavailable";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ListPagination } from "@/components/ui/list-pagination";
import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";
import { isDbConnectionError } from "@/lib/db-retry";
import {
  getPaginationMeta,
  paginateOffset,
  parsePage,
} from "@/lib/pagination";
import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

type CareersPageProps = {
  searchParams: Promise<{ q?: string; industry?: string; page?: string }>;
};

export default async function CareersPage({ searchParams }: CareersPageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const offset = paginateOffset(page, CAREERS_PER_PAGE);

  let careers: Awaited<ReturnType<typeof careerRepository.findPublished>> = [];
  let total = 0;
  let dbUnavailable = false;

  try {
    [careers, total] = await Promise.all([
      careerRepository.findPublished({
        query: params.q,
        industry: params.industry,
        limit: CAREERS_PER_PAGE,
        offset,
      }),
      careerRepository.countPublished({
        query: params.q,
        industry: params.industry,
      }),
    ]);
  } catch (error) {
    console.error("Careers page: failed to load careers", error);
    if (isDbConnectionError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  const pagination = getPaginationMeta(total, page, CAREERS_PER_PAGE);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-8 py-14 sm:px-12">
        <PageHeader
          title="Explore careers"
          lead="Browse our library of careers — each one a path you might not have considered."
          className="mb-8 max-w-2xl"
        />

        {dbUnavailable ? (
          <DatabaseUnavailable />
        ) : (
          <div className="space-y-10">
            <CareerGrid careers={careers} />
            <ListPagination
              meta={pagination}
              pathname="/careers"
              searchParams={params}
            />
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Explore Careers | Imployed",
  description: "Browse careers across industries, skills, and work styles.",
};
