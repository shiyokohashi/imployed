import { CareerLink } from "@/components/careers/career-link";
import { TagList } from "@/components/careers/tag-list";
import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { LineItem } from "@/components/ui/line-list";
import { cn } from "@/lib/utils";
import type { CareerListItem } from "@/lib/types/career";

type CareerCardProps = {
  career: CareerListItem;
  layout?: "list" | "grid";
};

export function CareerCard({ career, layout = "list" }: CareerCardProps) {
  const industryNames = career.industries.map((i) => i.industry.name);
  const skillNames = career.skills.map((s) => s.skill.name);

  const content = (
    <CareerLink
      slug={career.slug}
      className={cn(
        "group block h-full transition-opacity hover:opacity-70",
        layout === "grid" && "flex min-h-full flex-col"
      )}
    >
      <div
        className={cn(
          layout === "list" && "flex items-start justify-between gap-4",
          layout === "grid" && "flex flex-1 flex-col gap-3"
        )}
      >
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="type-career-title">{career.title}</h3>
            {career.featured && layout === "list" && (
                <span className="type-label">Featured</span>
            )}
          </div>
          {career.tagline && (
            <p className={cn("type-body", layout === "grid" ? "line-clamp-3" : "line-clamp-2")}>
              {career.tagline}
            </p>
          )}
        </div>
        <SalaryRangeDisplay
          className={cn(
            "type-meta shrink-0",
            layout === "list" && "hidden text-right sm:block",
            layout === "grid" && "mt-auto"
          )}
          salary={{
            min: career.salaryMin,
            max: career.salaryMax,
            currency: career.salaryCurrency,
            period: career.salaryPeriod,
          }}
        />
      </div>
      {(industryNames.length > 0 || skillNames.length > 0) && (
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-4 gap-y-2",
            layout === "list" ? "mt-3" : "mt-4"
          )}
        >
          {layout === "list" && (
            <SalaryRangeDisplay
              className="type-meta sm:hidden"
              salary={{
                min: career.salaryMin,
                max: career.salaryMax,
                currency: career.salaryCurrency,
                period: career.salaryPeriod,
              }}
            />
          )}
          {layout === "list" && industryNames.length > 0 && (
            <TagList items={industryNames} limit={2} variant="ghost" />
          )}
          {skillNames.length > 0 && (
            <TagList items={skillNames} variant="ghost" limit={layout === "grid" ? 2 : 3} />
          )}
        </div>
      )}
    </CareerLink>
  );

  if (layout === "grid") {
    return (
      <div className="border-r border-b border-foreground/12 p-5 sm:p-6">{content}</div>
    );
  }

  return <LineItem>{content}</LineItem>;
}
