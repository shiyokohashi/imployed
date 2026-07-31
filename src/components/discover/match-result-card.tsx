import { CareerLink } from "@/components/careers/career-link";
import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { TagList } from "@/components/careers/tag-list";
import { LineItem } from "@/components/ui/line-list";
import type { DiscoveryResult } from "@/lib/types/discovery";

type MatchResultCardProps = {
  result: DiscoveryResult;
  rank: number;
  layout?: "list" | "grid";
};

export function MatchResultCard({ result, rank, layout = "list" }: MatchResultCardProps) {
  const { career, matchReasons, skillsYouHave, skillsToBuild } = result;

  const content = (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <p className="type-label">Match #{rank}</p>
          <CareerLink
            slug={career.slug}
            className="type-career-title-lg block transition-opacity hover:opacity-70"
          >
            {career.title}
          </CareerLink>
          {career.tagline && <p className="type-body-lg">{career.tagline}</p>}
        </div>
        <p className="type-meta shrink-0 pt-5 tabular-nums">{result.matchScore} pts</p>
      </div>

      {matchReasons.length > 0 && (
        <section className="space-y-1.5">
          <h4 className="type-label">Why it fits</h4>
          <ul className="space-y-1.5">
            {matchReasons.map((reason) => (
              <li key={reason} className="type-body">
                {reason}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(skillsYouHave.length > 0 || skillsToBuild.length > 0) && (
        <div className="space-y-4">
          {skillsYouHave.length > 0 && (
            <section className="space-y-1.5">
              <h4 className="type-label">Skills you have</h4>
              <TagList items={skillsYouHave} variant="ghost" />
            </section>
          )}
          {skillsToBuild.length > 0 && (
            <section className="space-y-1.5">
              <h4 className="type-label">Skills to build</h4>
              <TagList items={skillsToBuild} variant="ghost" />
            </section>
          )}
        </div>
      )}

      <section className="space-y-1.5">
        <h4 className="type-label">Salary potential</h4>
        <SalaryRangeDisplay
          className="text-sm font-normal text-foreground"
          salary={{
            min: career.salaryMin,
            max: career.salaryMax,
            currency: career.salaryCurrency,
            period: "ANNUAL",
          }}
        />
      </section>

      {career.dayToDay && (
        <section className="space-y-1.5">
          <h4 className="type-label">Day-to-day</h4>
          <p className="type-body">{career.dayToDay}</p>
        </section>
      )}

      {(career.industries.length > 0 || career.exampleCompanies.length > 0) && (
        <section className="space-y-3">
          {career.industries.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="type-label">Industries</h4>
              <TagList items={career.industries} variant="ghost" />
            </div>
          )}
          {career.exampleCompanies.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="type-label">Example companies</h4>
              <TagList items={career.exampleCompanies} variant="ghost" />
            </div>
          )}
        </section>
      )}

      <div>
        <CareerLink
          slug={career.slug}
          className="type-nav text-foreground transition-opacity hover:opacity-70"
        >
          Explore this career →
        </CareerLink>
      </div>
    </div>
  );

  if (layout === "grid") {
    return (
      <div className="border-r border-b border-foreground/12 p-5 sm:p-6">{content}</div>
    );
  }

  return <LineItem className="space-y-6">{content}</LineItem>;
}
