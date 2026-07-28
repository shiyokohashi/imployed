import Link from "next/link";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/careers", label: "Explore" },
  { href: "/discover", label: "Discover" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">Imployed</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button render={<Link href="/discover" />} size="sm">
          Find your path
        </Button>
      </div>
    </header>
  );
}
