import type { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type CareerLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  slug: string;
};

export function CareerLink({ slug, className, children, ...props }: CareerLinkProps) {
  return (
    <Link
      href={`/careers/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
