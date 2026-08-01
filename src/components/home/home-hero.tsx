"use client";

import { useCallback, useEffect, useState } from "react";

import { ImployedWordmark } from "@/components/brand/imployed-wordmark";
import { HeroMascotVideo } from "@/components/home/hero-mascot-video";
import { TumblingCareerTitles } from "@/components/home/tumbling-career-titles";
import { SiteNavButtons } from "@/components/layout/site-nav-buttons";

type HomeHeroProps = {
  titles: Array<{ slug: string; title: string }>;
};

type HeroMotionState = {
  isMoving: boolean;
  motionLevel: number;
};

export function HomeHero({ titles }: HomeHeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [motion, setMotion] = useState<HeroMotionState>({
    isMoving: titles.length > 0,
    motionLevel: 0.35,
  });

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const onMotionChange = useCallback((next: HeroMotionState) => {
    setMotion((prev) => {
      if (prev.isMoving === next.isMoving && Math.abs(prev.motionLevel - next.motionLevel) < 0.04) {
        return prev;
      }
      return next;
    });
  }, []);

  const mascot =
    prefersReducedMotion ? undefined : (
      <HeroMascotVideo isMoving={motion.isMoving} motionLevel={motion.motionLevel} />
    );

  return (
    <main className="relative h-svh min-h-[32rem] overflow-hidden">
      <TumblingCareerTitles titles={titles} onMotionChange={onMotionChange} />

      <div className="pointer-events-none absolute inset-0 z-30 flex -translate-y-6 flex-col items-center justify-center gap-5 px-4 text-center sm:-translate-y-10 sm:gap-7">
        <div className="space-y-4 sm:space-y-5">
          <ImployedWordmark mascot={mascot} />
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
