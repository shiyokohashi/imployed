import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ImployedWordmarkProps = {
  className?: string;
  as?: "h1" | "span";
  size?: "hero" | "header";
  /** Hero-only: replace the Y PNG with a motion-synced video mascot. */
  mascot?: ReactNode;
};

export function ImployedWordmark({
  className,
  as: Tag = "h1",
  size = "hero",
  mascot,
}: ImployedWordmarkProps) {
  return (
    <Tag
      className={cn(
        "paper-letter-wordmark m-0",
        size === "header" && "paper-letter-wordmark-header",
        className
      )}
    >
      <span aria-hidden="true" className="paper-letter-wordmark-ink">
        <span className="paper-letter-wordmark-text">implo</span>
      </span>
      {mascot ?? (
        <img
          src="/imployed-y.png?v=3"
          alt=""
          width={180}
          height={265}
          className="paper-letter-y"
          decoding="async"
        />
      )}
      <span aria-hidden="true" className="paper-letter-wordmark-ink">
        <span className="paper-letter-wordmark-text">ed.</span>
      </span>
      <span className="sr-only">imployed.</span>
    </Tag>
  );
}
