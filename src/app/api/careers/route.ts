import { NextResponse } from "next/server";

import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

/**
 * Read-only API for careers.
 * Frontend components should prefer server components + repositories,
 * but this route exists for client-side fetching if needed later.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const careers = await careerRepository.findPublished({
    query: searchParams.get("q") ?? undefined,
    industry: searchParams.get("industry") ?? undefined,
    skill: searchParams.get("skill") ?? undefined,
    interest: searchParams.get("interest") ?? undefined,
    featured: searchParams.get("featured") === "true" ? true : undefined,
    limit: Number(searchParams.get("limit") ?? 24),
    offset: Number(searchParams.get("offset") ?? 0),
  });

  const total = await careerRepository.countPublished({
    query: searchParams.get("q") ?? undefined,
    industry: searchParams.get("industry") ?? undefined,
    skill: searchParams.get("skill") ?? undefined,
    interest: searchParams.get("interest") ?? undefined,
    featured: searchParams.get("featured") === "true" ? true : undefined,
  });

  return NextResponse.json({ careers, total });
}
