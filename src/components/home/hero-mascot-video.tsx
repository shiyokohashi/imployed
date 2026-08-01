"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type HeroMascotVideoProps = {
  isMoving: boolean;
  motionLevel: number;
  className?: string;
};

const BLACK_THRESHOLD = 48;

function keyOutBlack(imageData: ImageData) {
  const { data } = imageData;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index]!;
    const green = data[index + 1]!;
    const blue = data[index + 2]!;

    if (red <= BLACK_THRESHOLD && green <= BLACK_THRESHOLD && blue <= BLACK_THRESHOLD) {
      data[index + 3] = 0;
    }
  }
}

export function HeroMascotVideo({ isMoving, motionLevel, className }: HeroMascotVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const drawFrame = () => {
      if (video.readyState < 2 || canvas.offsetHeight === 0) return;

      const devicePixelRatio = window.devicePixelRatio || 1;
      const cssHeight = canvas.offsetHeight;
      const aspect = video.videoWidth / video.videoHeight || 180 / 265;
      const cssWidth = cssHeight * aspect;

      canvas.width = Math.max(1, Math.round(cssWidth * devicePixelRatio));
      canvas.height = Math.max(1, Math.round(cssHeight * devicePixelRatio));
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.drawImage(video, 0, 0, cssWidth, cssHeight);

      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      keyOutBlack(frame);
      context.putImageData(frame, 0, 0);
    };

    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      stopLoop();
      const tick = () => {
        drawFrame();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      if (isMoving) {
        video.playbackRate = 0.65 + motionLevel * 0.85;
        void video.play().catch(() => {
          /* autoplay may be blocked until user interaction */
        });
        startLoop();
        return;
      }

      video.pause();
      stopLoop();
      drawFrame();
    };

    const onReady = () => {
      drawFrame();
      syncPlayback();
    };

    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 2) onReady();

    const resizeObserver = new ResizeObserver(() => {
      drawFrame();
    });
    resizeObserver.observe(canvas);

    syncPlayback();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      video.removeEventListener("loadeddata", onReady);
    };
  }, [isMoving, motionLevel]);

  return (
    <>
      <video
        ref={videoRef}
        className="sr-only"
        src="/imployed-mascot-wiggle.mp4"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        width={180}
        height={265}
        className={cn("paper-letter-y", className)}
      />
    </>
  );
}
