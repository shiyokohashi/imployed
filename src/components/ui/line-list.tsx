import * as React from "react";

import { cn } from "@/lib/utils";

function LineList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-t border-foreground/12 divide-y divide-foreground/12",
        className
      )}
      {...props}
    />
  );
}

function LineItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("py-5 transition-opacity sm:py-6", className)}
      {...props}
    />
  );
}

export { LineList, LineItem };
