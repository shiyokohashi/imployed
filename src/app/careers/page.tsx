import Link from "next/link";

import { CareerGrid } from "@/components/careers/career-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

type CareersPageProps = {
  searchParams: Promise<{ q?: string; industry?: string }>;
};

export default async function CareersPage({ searchParams }: CareersPageProps) {
  const params = await searchParams;
  const careers = await careerRepository.findPublished({
    query: params.q,
    industry: params.industry,
  });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Explore careers</h1>
          <p className="text-muted-foreground">
            Browse our library of careers — each one a path you might not have
            considered.
          </p>
        </div>

        <CareerGrid careers={careers} />
      </main>
      <SiteFooter />
    </>
  );
}

export const metadata = {
  title: "Explore Careers | Imployed",
  description: "Browse careers across industries, skills, and work styles.",
};
