import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteNavButtons } from "@/components/layout/site-nav-buttons";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-8 py-14 sm:px-12">
        <div className="max-w-xl space-y-6">
          <div className="space-y-3">
            <h1 className="type-page-title">Page not found</h1>
            <p className="type-page-lead">
              That URL doesn&apos;t match anything here. Try one of the main sections below.
            </p>
          </div>
          <SiteNavButtons />
          <Link href="/" className="type-nav inline-block transition-opacity hover:opacity-70">
            Back home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
