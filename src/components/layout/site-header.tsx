import Link from "next/link";

import { ImployedWordmark } from "@/components/brand/imployed-wordmark";
import { SiteNavButtons } from "@/components/layout/site-nav-buttons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8 sm:h-24 sm:px-12">
        <Link href="/" className="transition-opacity hover:opacity-70">
          <ImployedWordmark as="span" size="header" />
        </Link>
        <SiteNavButtons size="default" />
      </div>
    </header>
  );
}
