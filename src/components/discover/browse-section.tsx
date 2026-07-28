import Link from "next/link";
import { Sparkles, Shuffle, TrendingUp, Building2, Compass } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const browseLinks = [
  {
    href: "/careers",
    title: "All careers",
    description: "Browse the full library — no filters required.",
    icon: Compass,
  },
  {
    href: "/discover/industries",
    title: "Industries",
    description: "Explore careers by industry vertical.",
    icon: Building2,
  },
  {
    href: "/discover/emerging",
    title: "Emerging careers",
    description: "Roles with growing demand and momentum.",
    icon: TrendingUp,
  },
  {
    href: "/discover/random",
    title: "Random discovery",
    description: "Surprise yourself with something unexpected.",
    icon: Shuffle,
  },
];

export function BrowseSection() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Or browse freely</h2>
        <p className="text-sm text-muted-foreground">
          No tags needed — discovery works either way.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {browseLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group block">
            <Card className="h-full transition-colors group-hover:border-foreground/20">
              <CardHeader className="gap-2">
                <div className="flex items-center gap-2">
                  <link.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">{link.title}</CardTitle>
                </div>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PersonalizeHint() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
      <Sparkles className="mt-0.5 size-4 shrink-0" />
      <p>
        Skills and interests are signals, not requirements — selecting design won&apos;t limit
        you to one role. We surface unexpected paths too.
      </p>
    </div>
  );
}
