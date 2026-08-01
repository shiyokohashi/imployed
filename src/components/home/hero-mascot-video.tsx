"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type HeroMascotVideoProps = {
  isMoving: boolean;
  motionLevel: number;
  className?: string;
};

export function HeroMascotVideo({ isMoving, motionLevel, className }: HeroMascotVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMoving) {
      video.playbackRate = 0.65 + motionLevel * 0.85;
      void video.play().catch(() => {
        /* autoplay may be blocked until user interaction */
      });
      return;
    }

    video.pause();
  }, [isMoving, motionLevel]);

  return (
    <span className={cn("hero-mascot-video-wrap inline-block", className)} aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-mascot-video paper-letter-y"
        src="/imployed-mascot-wiggle.mp4"
        muted
        loop
        playsInline
        poster="/imployed-mascot.png"
        preload="auto"
        disablePictureInPicture
      />
    </span>
  );
}
