import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function CareerNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl flex-1 px-8 py-14 sm:px-12">
        <div className="max-w-xl space-y-6">
          <div className="space-y-3">
            <h1 className="type-subhead">Career not found</h1>
            <p className="type-body">
              We couldn&apos;t find a career at this address. It may have been renamed, or the
              link may be outdated.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/discover" className="type-nav transition-opacity hover:opacity-70">
              Personalize my search
            </Link>
            <Link href="/careers" className="type-nav transition-opacity hover:opacity-70">
              Browse all careers
            </Link>
            <Link href="/explore" className="type-nav transition-opacity hover:opacity-70">
              Explore featured
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
