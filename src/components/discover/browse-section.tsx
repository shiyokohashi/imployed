import Link from "next/link";
import { Sparkles, Shuffle, TrendingUp, Building2, Compass } from "lucide-react";

import { LineItem, LineList } from "@/components/ui/line-list";

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
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="type-subhead">Or browse freely</h2>
        <p className="type-body">
          No tags needed — discovery works either way.
        </p>
      </div>
      <LineList>
        {browseLinks.map((link) => (
          <LineItem key={link.href}>
            <Link
              href={link.href}
              className="group block transition-opacity hover:opacity-70"
            >
              <div className="flex items-center gap-2">
                <link.icon className="size-3.5 text-muted-foreground" />
                <p className="type-career-title">{link.title}</p>
              </div>
              <p className="type-body mt-1.5">{link.description}</p>
            </Link>
          </LineItem>
        ))}
      </LineList>
    </section>
  );
}

export function PersonalizeHint() {
  return (
    <div className="type-body border-t border-foreground/12 pt-4">
      <div className="flex items-start gap-2">
        <Sparkles className="mt-0.5 size-3.5 shrink-0" />
        <p>
          Skills, salary, and interests are signals, not requirements — selecting design won&apos;t
          limit you to one role. We surface unexpected paths too.
        </p>
      </div>
    </div>
  );
}
