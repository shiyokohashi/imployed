import { CareerCard } from "@/components/careers/career-card";
import type { CareerListItem } from "@/lib/types/career";

type CareerGridProps = {
  careers: CareerListItem[];
  emptyMessage?: string;
};

export function CareerGrid({
  careers,
  emptyMessage = "No careers found yet. Connect your database and run the seed script.",
}: CareerGridProps) {
  if (careers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {careers.map((career) => (
        <CareerCard key={career.id} career={career} />
      ))}
    </div>
  );
}
