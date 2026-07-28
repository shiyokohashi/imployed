import Link from "next/link";

import { CareerGrid } from "@/components/careers/career-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredCareers = await careerRepository.findFeatured();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-medium text-muted-foreground">
              Career discovery, not job hunting
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Discover careers you never knew existed
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Imployed helps you explore roles like Product Marketing Manager,
              Solutions Engineer, and Design Technologist — matched to your
              interests, skills, and work style.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button render={<Link href="/discover" />} size="lg">
                Start exploring
              </Button>
              <Button render={<Link href="/careers" />} variant="outline" size="lg">
                Browse all careers
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Featured careers
                </h2>
                <p className="mt-1 text-muted-foreground">
                  A taste of what&apos;s waiting to be discovered
                </p>
              </div>
              <Link
                href="/careers"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                View all →
              </Link>
            </div>
            <CareerGrid careers={featuredCareers} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
