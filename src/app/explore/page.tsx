import { DatabaseUnavailable } from "@/components/careers/database-unavailable";
import { ExploreByIndustry } from "@/components/explore/explore-by-industry";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isDbConnectionError } from "@/lib/db-retry";
import { careerRepository } from "@/lib/repositories/career.repository";
import type { IndustryFeaturedSection } from "@/lib/types/career";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  let sections: IndustryFeaturedSection[] = [];
  let dbUnavailable = false;

  try {
    sections = await careerRepository.findFeaturedGroupedByIndustry();
  } catch (error) {
    console.error("Explore page: failed to load careers", error);
    if (isDbConnectionError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-14 sm:px-12 md:px-16 lg:px-20">
        <PageHeader
          title="Explore careers"
          lead="Featured roles across industries — pick a category below or browse each list."
          className="mb-12 max-w-3xl"
        />

        {dbUnavailable ? <DatabaseUnavailable backHref="/" backLabel="Back home" /> : <ExploreByIndustry sections={sections} />}
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Explore Careers | Imployed",
  description: "Browse featured careers by industry — a curated starting point for discovery.",
};
