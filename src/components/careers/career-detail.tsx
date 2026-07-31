import { CareerGrid } from "@/components/careers/career-grid";
import { TagList } from "@/components/careers/tag-list";
import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { Badge } from "@/components/ui/badge";
import type { CareerDetail, CareerListItem } from "@/lib/types/career";

type CareerDetailViewProps = {
  career: CareerDetail;
  similarCareers?: CareerListItem[];
};

function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function CareerDetailView({
  career,
  similarCareers = [],
}: CareerDetailViewProps) {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {career.experienceLevel && (
            <Badge variant="ghost">{formatLabel(career.experienceLevel)}</Badge>
          )}
          {career.growthOutlook && (
            <Badge variant="ghost">{formatLabel(career.growthOutlook)} growth</Badge>
          )}
        </div>

        <h1 className="type-detail-title">{career.title}</h1>

        {career.tagline && <p className="type-body-lg">{career.tagline}</p>}

        <SalaryRangeDisplay
          className="text-sm font-normal text-foreground"
          salary={{
            min: career.salaryMin,
            max: career.salaryMax,
            currency: career.salaryCurrency,
            period: career.salaryPeriod,
          }}
        />
      </header>

      {career.summary && (
        <section>
          <p className="type-body-lg text-foreground">{career.summary}</p>
        </section>
      )}

      {career.description && (
        <section className="space-y-3">
          <h2 className="type-label">About this career</h2>
          <p className="type-body whitespace-pre-line">{career.description}</p>
        </section>
      )}

      {career.highlights.length > 0 && (
        <section className="space-y-5">
          <h2 className="type-label">Highlights</h2>
          <div className="space-y-5">
            {career.highlights.map((highlight) => (
              <div key={highlight.id} className="space-y-1.5">
                <h3 className="type-career-title">{highlight.title}</h3>
                <p className="type-body">{highlight.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-8 sm:grid-cols-2">
        {career.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="type-label">Skills</h2>
            <TagList items={career.skills.map((s) => s.skill.name)} variant="ghost" />
          </div>
        )}

        {career.interests.length > 0 && (
          <div className="space-y-3">
            <h2 className="type-label">Interests</h2>
            <TagList
              items={career.interests.map((i) => i.interest.name)}
              variant="ghost"
            />
          </div>
        )}

        {career.industries.length > 0 && (
          <div className="space-y-3">
            <h2 className="type-label">Industries</h2>
            <TagList items={career.industries.map((i) => i.industry.name)} variant="ghost" />
          </div>
        )}

        {career.workStyles.length > 0 && (
          <div className="space-y-3">
            <h2 className="type-label">Work style</h2>
            <TagList
              items={career.workStyles.map((w) => w.workStyle.name)}
              variant="ghost"
            />
          </div>
        )}
      </section>

      {similarCareers.length > 0 && (
        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="type-subhead">Similar careers</h2>
            <p className="type-body">
              Other paths that share skills, interests, and industries with {career.title}.
            </p>
          </div>
          <CareerGrid
            careers={similarCareers}
            emptyMessage="No similar careers found."
          />
        </section>
      )}
    </article>
  );
}
