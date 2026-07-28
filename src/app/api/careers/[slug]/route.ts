import { NextResponse } from "next/server";

import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const career = await careerRepository.findBySlug(slug);

  if (!career) {
    return NextResponse.json({ error: "Career not found" }, { status: 404 });
  }

  return NextResponse.json({ career });
}
