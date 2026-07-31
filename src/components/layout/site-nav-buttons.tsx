import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteNavButtonsProps = {
  size?: "default" | "sm" | "lg";
  centered?: boolean;
};

const navLinks = [
  { href: "/explore", label: "Explore careers" },
  { href: "/discover", label: "Personalize my search" },
] as const;

export function SiteNavButtons({ size = "sm", centered = false }: SiteNavButtonsProps) {
  return (
    <nav
      className={cn(
        "flex flex-wrap items-center gap-6 sm:gap-8",
        centered && "justify-center"
      )}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "type-nav transition-opacity hover:opacity-70",
            size === "lg" && "type-nav-lg",
            size === "default" && "text-sm sm:text-[0.9375rem]",
            size === "sm" && "text-sm"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
