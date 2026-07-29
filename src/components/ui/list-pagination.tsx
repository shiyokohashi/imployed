import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildPageHref, type PaginationMeta } from "@/lib/pagination";

type ListPaginationProps = {
  meta: PaginationMeta;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
};

export function ListPagination({ meta, pathname, searchParams }: ListPaginationProps) {
  if (meta.totalPages <= 1) return null;

  const start = (meta.page - 1) * meta.pageSize + 1;
  const end = Math.min(meta.page * meta.pageSize, meta.total);
  const prevHref = meta.hasPrev
    ? buildPageHref(pathname, searchParams, meta.page - 1)
    : null;
  const nextHref = meta.hasNext
    ? buildPageHref(pathname, searchParams, meta.page + 1)
    : null;

  return (
    <div className="flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {meta.total.toLocaleString()}
      </p>
      <div className="flex items-center gap-2">
        {prevHref ? (
          <Button variant="outline" render={<Link href={prevHref} />}>
            <ChevronLeft />
            Previous
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <ChevronLeft />
            Previous
          </Button>
        )}
        <span className="px-2 text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages}
        </span>
        {nextHref ? (
          <Button render={<Link href={nextHref} />}>
            Next
            <ChevronRight />
          </Button>
        ) : (
          <Button disabled>
            Next
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
