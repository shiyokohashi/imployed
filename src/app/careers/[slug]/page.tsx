import Link from "next/link";
import { notFound } from "next/navigation";

import { CareerDetailView } from "@/components/careers/career-detail";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

type CareerPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const [career, similarCareers] = await Promise.all([
    careerRepository.findBySlug(slug),
    careerRepository.findSimilarBySlug(slug, 6),
  ]);

  if (!career) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl flex-1 px-8 py-14 sm:px-12">
        <Link
          href="/careers"
          className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to careers
        </Link>
        <CareerDetailView career={career} similarCareers={similarCareers} />
      </main>
      <SiteFooter />
    </>
  );
}

export async function generateMetadata({ params }: CareerPageProps) {
  const { slug } = await params;
  const career = await careerRepository.findBySlug(slug);

  if (!career) {
    return { title: "Career not found | Imployed" };
  }

  return {
    title: `${career.title} | Imployed`,
    description: career.tagline ?? career.summary,
  };
}
