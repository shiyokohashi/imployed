import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { taxonomyRepository } from "@/lib/repositories/taxonomy.repository";

export const dynamic = "force-dynamic";

export default async function DiscoverIndustriesPage() {
  const industries = await taxonomyRepository.getIndustries();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Link href="/discover" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to discover
        </Link>
        <div className="mb-8 mt-4 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Browse by industry</h1>
          <p className="text-muted-foreground">
            Pick an industry to explore careers — no personalization required.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/careers?industry=${industry.slug}`}>
              <Card className="h-full transition-colors hover:border-foreground/20">
                <CardHeader>
                  <CardTitle className="text-base">{industry.name}</CardTitle>
                  {industry.description && (
                    <CardDescription>{industry.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Industries | Imployed",
};
