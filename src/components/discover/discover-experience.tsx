"use client";

import { useEffect, useRef, useState } from "react";

import { PersonalizeHint } from "@/components/discover/browse-section";
import { DiscoveryTagPanel } from "@/components/discover/discovery-tag-panel";
import { RankedCareerList } from "@/components/discover/ranked-career-list";
import {
  searchParamsToFilters,
  searchParamsToRecord,
} from "@/lib/discovery-params";
import { useDiscoverUrl } from "@/lib/hooks/use-discover-url";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/lib/pagination";
import type { DiscoveryResponse, DiscoveryTaxonomy } from "@/lib/types/discovery";

type DiscoverExperienceProps = {
  taxonomy: DiscoveryTaxonomy;
  initialDiscovery: DiscoveryResponse;
  initialHasSignals: boolean;
  initialPagination: PaginationMeta;
  initialDetailOffset: number;
};

type DiscoverPayload = {
  results: DiscoveryResponse["results"];
  total: number;
  headline: string;
  hasSignals: boolean;
  pagination: PaginationMeta;
  detailOffset: number;
};

export function DiscoverExperience({
  taxonomy,
  initialDiscovery,
  initialHasSignals,
  initialPagination,
  initialDetailOffset,
}: DiscoverExperienceProps) {
  const { searchParams, replaceParams } = useDiscoverUrl();
  const query = searchParams.toString();
  const skipInitialFetch = useRef(true);

  const [payload, setPayload] = useState<DiscoverPayload>({
    results: initialDiscovery.results,
    total: initialDiscovery.total,
    headline: initialDiscovery.headline,
    hasSignals: initialHasSignals,
    pagination: initialPagination,
    detailOffset: initialDetailOffset,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = searchParamsToFilters(searchParamsToRecord(searchParams));

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const controller = new AbortController();

    async function refreshResults() {
      setIsRefreshing(true);
      try {
        const response = await fetch(`/api/discover?${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const data: DiscoverPayload = await response.json();
        setPayload(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      } finally {
        if (!controller.signal.aborted) {
          setIsRefreshing(false);
        }
      }
    }

    void refreshResults();
    return () => controller.abort();
  }, [query]);

  function goToPage(page: number) {
    const next = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      next.delete("page");
    } else {
      next.set("page", String(page));
    }
    replaceParams(next);
  }

  const { pagination, total, headline, hasSignals, results, detailOffset } = payload;
  const start = (pagination.page - 1) * pagination.pageSize + 1;
  const end = Math.min(pagination.page * pagination.pageSize, total);

  return (
    <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:items-start">
      <aside className="space-y-8 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-2">
        <DiscoveryTagPanel
          taxonomy={taxonomy}
          active={filters}
          searchParams={searchParams}
          replaceParams={replaceParams}
        />
        <PersonalizeHint />
      </aside>

      <div className="min-w-0 space-y-8">
        <div className="space-y-3">
          <h2 className="type-subhead">{headline}</h2>
          <p className="type-body">
            {hasSignals
              ? `${total.toLocaleString()} careers ranked — best matches on this page, use Next for more.`
              : `${total.toLocaleString()} careers to explore — add tags on the left to re-rank by fit.`}
          </p>
        </div>

        <div
          className={`transition-opacity duration-150 ${isRefreshing ? "opacity-60" : "opacity-100"}`}
        >
          <RankedCareerList
            results={results}
            showScores={hasSignals}
            detailOffset={detailOffset}
          />
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex flex-col items-center gap-5 pt-10 sm:flex-row sm:justify-between">
            <p className="type-meta">
              Showing {start}–{end} of {total.toLocaleString()}
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                disabled={!pagination.hasPrev || isRefreshing}
                onClick={() => goToPage(pagination.page - 1)}
                className={cn(
                  "type-nav transition-opacity hover:opacity-70",
                  "disabled:pointer-events-none disabled:opacity-40"
                )}
              >
                Previous
              </button>
              <span className="type-meta">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                type="button"
                disabled={!pagination.hasNext || isRefreshing}
                onClick={() => goToPage(pagination.page + 1)}
                className={cn(
                  "type-nav transition-opacity hover:opacity-70",
                  "disabled:pointer-events-none disabled:opacity-40"
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
