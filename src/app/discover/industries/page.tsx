import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LineItem, LineList } from "@/components/ui/line-list";
import { taxonomyRepository } from "@/lib/repositories/taxonomy.repository";

export const dynamic = "force-dynamic";

export default async function DiscoverIndustriesPage() {
  const industries = await taxonomyRepository.getIndustries();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Link href="/discover" className="type-nav transition-opacity hover:opacity-70">
          ← Back to discover
        </Link>
        <PageHeader
          title="Browse by industry"
          lead="Pick an industry to explore careers — no personalization required."
          className="mb-8 mt-4 max-w-2xl"
        />
        <LineList>
          {industries.map((industry) => (
            <LineItem key={industry.slug}>
              <Link
                href={`/careers?industry=${industry.slug}`}
                className="block transition-opacity hover:opacity-70"
              >
                <p className="type-career-title">{industry.name}</p>
                {industry.description && (
                  <p className="type-body mt-1.5">{industry.description}</p>
                )}
              </Link>
            </LineItem>
          ))}
        </LineList>
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Industries | Imployed",
};
