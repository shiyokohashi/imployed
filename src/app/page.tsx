import { ImployedWordmark } from "@/components/brand/imployed-wordmark";
import { TumblingCareerTitles } from "@/components/home/tumbling-career-titles";
import { SiteNavButtons } from "@/components/layout/site-nav-buttons";
import { careerRepository } from "@/lib/repositories/career.repository";

export const dynamic = "force-dynamic";

async function loadTumblingTitles() {
  try {
    return await careerRepository.findTumblingTitles();
  } catch (error) {
    console.error("Homepage: could not load tumbling titles", error);
    return [];
  }
}

export default async function HomePage() {
  const tumblingTitles = await loadTumblingTitles();

  return (
    <main className="relative h-svh min-h-[32rem] overflow-hidden">
      <TumblingCareerTitles titles={tumblingTitles} />

      <div className="pointer-events-none absolute inset-0 z-30 flex -translate-y-6 flex-col items-center justify-center gap-5 px-4 text-center sm:-translate-y-10 sm:gap-7">
        <div className="space-y-4 sm:space-y-5">
          <ImployedWordmark />
          <p className="type-page-lead mx-auto max-w-md">
            Discover careers you didn&apos;t know existed.
          </p>
        </div>

        <div className="pointer-events-auto">
          <SiteNavButtons size="lg" centered />
        </div>
      </div>
    </main>
  );
}
