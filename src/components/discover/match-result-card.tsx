import Link from "next/link";

import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { TagList } from "@/components/careers/tag-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DiscoveryResult } from "@/lib/types/discovery";

type MatchResultCardProps = {
  result: DiscoveryResult;
  rank: number;
};

export function MatchResultCard({ result, rank }: MatchResultCardProps) {
  const { career, matchReasons, skillsYouHave, skillsToBuild } = result;

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Match #{rank}</p>
            <CardTitle className="text-xl">{career.title}</CardTitle>
            {career.tagline && <CardDescription>{career.tagline}</CardDescription>}
          </div>
          <Badge variant="secondary">{result.matchScore} pts</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {matchReasons.length > 0 && (
          <section>
            <h4 className="mb-2 text-sm font-medium">Why it fits</h4>
            <ul className="space-y-1">
              {matchReasons.map((reason) => (
                <li key={reason} className="text-sm text-muted-foreground">
                  · {reason}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {skillsYouHave.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-medium">Skills you have</h4>
              <TagList items={skillsYouHave} />
            </section>
          )}
          {skillsToBuild.length > 0 && (
            <section>
              <h4 className="mb-2 text-sm font-medium">Skills to build</h4>
              <TagList items={skillsToBuild} variant="outline" />
            </section>
          )}
        </div>

        <section>
          <h4 className="mb-1 text-sm font-medium">Salary potential</h4>
          <SalaryRangeDisplay
            className="text-sm font-medium text-foreground"
            salary={{
              min: career.salaryMin,
              max: career.salaryMax,
              currency: career.salaryCurrency,
              period: "ANNUAL",
            }}
          />
        </section>

        {career.dayToDay && (
          <section>
            <h4 className="mb-1 text-sm font-medium">Day-to-day</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{career.dayToDay}</p>
          </section>
        )}

        {(career.industries.length > 0 || career.exampleCompanies.length > 0) && (
          <section className="space-y-3">
            {career.industries.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium">Industries</h4>
                <TagList items={career.industries} variant="outline" />
              </div>
            )}
            {career.exampleCompanies.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium">Example companies</h4>
                <TagList items={career.exampleCompanies} variant="secondary" />
              </div>
            )}
          </section>
        )}

        <Button render={<Link href={`/careers/${career.slug}`} />} variant="outline">
          Explore this career
        </Button>
      </CardContent>
    </Card>
  );
}
