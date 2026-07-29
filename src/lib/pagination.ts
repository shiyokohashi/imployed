import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";

export { CAREERS_PER_PAGE };

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw ?? 1);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

export function paginateOffset(page: number, pageSize = CAREERS_PER_PAGE): number {
  return (page - 1) * pageSize;
}

export function getPaginationMeta(
  total: number,
  page: number,
  pageSize = CAREERS_PER_PAGE,
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}

export function buildPageHref(
  pathname: string,
  searchParams: Record<string, string | string[] | undefined>,
  page: number,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, item);
    } else {
      params.set(key, value);
    }
  }

  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function slicePage<T>(items: T[], page: number, pageSize = CAREERS_PER_PAGE): T[] {
  const meta = getPaginationMeta(items.length, page, pageSize);
  const offset = paginateOffset(meta.page, pageSize);
  return items.slice(offset, offset + pageSize);
}
