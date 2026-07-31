import Link from "next/link";

import { CareerGrid } from "@/components/careers/career-grid";
import { DatabaseUnavailable } from "@/components/careers/database-unavailable";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { isDbConnectionError } from "@/lib/db-retry";
import { discoveryService } from "@/lib/services/discovery.service";
import type { CareerListItem } from "@/lib/types/career";

export const dynamic = "force-dynamic";

export default async function DiscoverRandomPage() {
  let careers: CareerListItem[] = [];
  let dbUnavailable = false;

  try {
    careers = await discoveryService.getRandom(6);
  } catch (error) {
    console.error("Discover random: failed to load careers", error);
    if (isDbConnectionError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Link href="/discover" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to discover
        </Link>
        <div className="mb-8 mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Random discovery</h1>
            <p className="text-muted-foreground">
              Six careers picked at random — refresh for a new set.
            </p>
          </div>
          {!dbUnavailable && (
            <Button render={<Link href="/discover/random" />}>Shuffle again</Button>
          )}
        </div>
        {dbUnavailable ? (
          <DatabaseUnavailable backHref="/discover" backLabel="Back to discover" />
        ) : (
          <CareerGrid careers={careers} />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Random Discovery | Imployed",
};
