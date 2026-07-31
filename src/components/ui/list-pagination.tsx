import Link from "next/link";

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
    <div className="flex flex-col items-center gap-5 pt-10 sm:flex-row sm:justify-between">
      <p className="type-meta">
        Showing {start}–{end} of {meta.total.toLocaleString()}
      </p>
      <div className="flex items-center gap-6">
        {prevHref ? (
          <Link href={prevHref} className="type-nav transition-opacity hover:opacity-70">
            Previous
          </Link>
        ) : (
          <span className="type-nav opacity-40">Previous</span>
        )}
        <span className="type-meta">
          Page {meta.page} of {meta.totalPages}
        </span>
        {nextHref ? (
          <Link href={nextHref} className="type-nav transition-opacity hover:opacity-70">
            Next
          </Link>
        ) : (
          <span className="type-nav opacity-40">Next</span>
        )}
      </div>
    </div>
  );
}
