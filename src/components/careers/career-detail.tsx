import { CareerGrid } from "@/components/careers/career-grid";
import { TagList } from "@/components/careers/tag-list";
import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {career.experienceLevel && (
            <Badge variant="secondary">{formatLabel(career.experienceLevel)}</Badge>
          )}
          {career.growthOutlook && (
            <Badge variant="outline">{formatLabel(career.growthOutlook)} growth</Badge>
          )}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {career.title}
        </h1>

        {career.tagline && (
          <p className="text-lg text-muted-foreground">{career.tagline}</p>
        )}

        <SalaryRangeDisplay
          className="text-base font-medium text-foreground"
          salary={{
            min: career.salaryMin,
            max: career.salaryMax,
            currency: career.salaryCurrency,
            period: career.salaryPeriod,
          }}
        />
      </header>

      {career.summary && (
        <section className="prose prose-neutral max-w-none">
          <p className="text-base leading-relaxed text-foreground">{career.summary}</p>
        </section>
      )}

      {career.description && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">About this career</h2>
          <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
            {career.description}
          </p>
        </section>
      )}

      {career.highlights.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {career.highlights.map((highlight) => (
              <Card key={highlight.id}>
                <CardHeader>
                  <CardTitle className="text-base">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {highlight.body}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 sm:grid-cols-2">
        {career.skills.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">Skills</h2>
            <TagList items={career.skills.map((s) => s.skill.name)} />
          </div>
        )}

        {career.interests.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">Interests</h2>
            <TagList
              items={career.interests.map((i) => i.interest.name)}
              variant="outline"
            />
          </div>
        )}

        {career.industries.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">Industries</h2>
            <TagList items={career.industries.map((i) => i.industry.name)} />
          </div>
        )}

        {career.workStyles.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">Work style</h2>
            <TagList
              items={career.workStyles.map((w) => w.workStyle.name)}
              variant="outline"
            />
          </div>
        )}
      </section>

      {similarCareers.length > 0 && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Similar careers</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Other paths that share skills, interests, and industries with {career.title}.
          </p>
          <CareerGrid
            careers={similarCareers}
            emptyMessage="No similar careers found."
          />
        </section>
      )}
    </article>
  );
}
