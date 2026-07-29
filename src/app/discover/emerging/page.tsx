import Link from "next/link";

import { CareerGrid } from "@/components/careers/career-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ListPagination } from "@/components/ui/list-pagination";
import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";
import {
  getPaginationMeta,
  paginateOffset,
  parsePage,
} from "@/lib/pagination";
import { discoveryService } from "@/lib/services/discovery.service";

export const dynamic = "force-dynamic";

type DiscoverEmergingPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function DiscoverEmergingPage({ searchParams }: DiscoverEmergingPageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const offset = paginateOffset(page, CAREERS_PER_PAGE);

  const [careers, total] = await Promise.all([
    discoveryService.getEmerging({ limit: CAREERS_PER_PAGE, offset }),
    discoveryService.countEmerging(),
  ]);

  const pagination = getPaginationMeta(total, page, CAREERS_PER_PAGE);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Link href="/discover" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to discover
        </Link>
        <div className="mb-8 mt-4 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Emerging careers</h1>
          <p className="text-muted-foreground">
            Roles with growing demand — discover what&apos;s rising.
          </p>
        </div>
        <div className="space-y-10">
          <CareerGrid careers={careers} />
          <ListPagination
            meta={pagination}
            pathname="/discover/emerging"
            searchParams={params}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Emerging Careers | Imployed",
};
