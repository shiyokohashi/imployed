"use client";

import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function CareerError() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl flex-1 px-8 py-14 sm:px-12">
        <div className="space-y-4">
          <h1 className="type-subhead">Couldn&apos;t load this career</h1>
          <p className="type-body max-w-xl">
            The career page failed to load. If you&apos;re running locally, make sure the
            database is started with{" "}
            <code className="text-foreground">npm run dev:all</code>.
          </p>
          <Link href="/explore" className="type-nav inline-block transition-opacity hover:opacity-70">
            Back to explore
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
