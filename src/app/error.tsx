"use client";

import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl flex-1 px-8 py-14 sm:px-12">
        <div className="max-w-xl space-y-6">
          <div className="space-y-3">
            <h1 className="type-subhead">Something went wrong</h1>
            <p className="type-body">
              This page failed to load. If you&apos;re running locally, make sure the database is
              started with <code className="text-foreground">npm run dev:all</code>.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <button
              type="button"
              onClick={reset}
              className="type-nav transition-opacity hover:opacity-70"
            >
              Try again
            </button>
            <Link href="/" className="type-nav transition-opacity hover:opacity-70">
              Back home
            </Link>
            <Link href="/explore" className="type-nav transition-opacity hover:opacity-70">
              Explore careers
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
