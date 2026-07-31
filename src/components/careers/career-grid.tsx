import { CareerCard } from "@/components/careers/career-card";
import { LineList } from "@/components/ui/line-list";
import { cn } from "@/lib/utils";
import type { CareerListItem } from "@/lib/types/career";

type CareerGridProps = {
  careers: CareerListItem[];
  emptyMessage?: string;
  layout?: "list" | "grid";
  className?: string;
};

export function CareerGrid({
  careers,
  emptyMessage = "No careers found yet. Connect your database and run the seed script.",
  layout = "list",
  className,
}: CareerGridProps) {
  if (careers.length === 0) {
    return (
      <div className="border-t border-foreground/12 py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 border-l border-t border-foreground/12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className
        )}
      >
        {careers.map((career) => (
          <CareerCard key={career.id} career={career} layout="grid" />
        ))}
      </div>
    );
  }

  return (
    <LineList className={className}>
      {careers.map((career) => (
        <CareerCard key={career.id} career={career} />
      ))}
    </LineList>
  );
}
