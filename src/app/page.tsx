import { HomeHero } from "@/components/home/home-hero";
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

  return <HomeHero titles={tumblingTitles} />;
}
