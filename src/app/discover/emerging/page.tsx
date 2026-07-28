import Link from "next/link";

import { CareerGrid } from "@/components/careers/career-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { discoveryService } from "@/lib/services/discovery.service";

export const dynamic = "force-dynamic";

export default async function DiscoverEmergingPage() {
  const careers = await discoveryService.getEmerging();

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
        <CareerGrid careers={careers} />
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Emerging Careers | Imployed",
};
