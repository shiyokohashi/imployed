import { NextResponse } from "next/server";

import { CAREERS_PER_PAGE } from "@/lib/constants/discovery";
import {
  hasDiscoverySignals,
  searchParamsToFilters,
  searchParamsToRecord,
} from "@/lib/discovery-params";
import {
  getPaginationMeta,
  paginateOffset,
  parsePage,
} from "@/lib/pagination";
import { discoveryService } from "@/lib/services/discovery.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = searchParamsToRecord(searchParams);
  const filters = searchParamsToFilters(params);
  const page = parsePage(params.page);

  const discovery = await discoveryService.discover(filters);
  const pagination = getPaginationMeta(discovery.total, page, CAREERS_PER_PAGE);
  const offset = paginateOffset(pagination.page, CAREERS_PER_PAGE);

  return NextResponse.json({
    results: discovery.results.slice(offset, offset + CAREERS_PER_PAGE),
    total: discovery.total,
    headline: discovery.headline,
    hasSignals: hasDiscoverySignals(filters),
    pagination,
    detailOffset: offset,
  });
}
