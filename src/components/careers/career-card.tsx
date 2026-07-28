import Link from "next/link";

import { TagList } from "@/components/careers/tag-list";
import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CareerListItem } from "@/lib/types/career";

type CareerCardProps = {
  career: CareerListItem;
};

export function CareerCard({ career }: CareerCardProps) {
  const industryNames = career.industries.map((i) => i.industry.name);
  const skillNames = career.skills.map((s) => s.skill.name);

  return (
    <Link href={`/careers/${career.slug}`} className="group block h-full">
      <Card className="h-full transition-colors group-hover:border-foreground/20">
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{career.title}</CardTitle>
            {career.featured && (
              <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                Featured
              </span>
            )}
          </div>
          {career.tagline && (
            <CardDescription className="line-clamp-2">{career.tagline}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <SalaryRangeDisplay
            salary={{
              min: career.salaryMin,
              max: career.salaryMax,
              currency: career.salaryCurrency,
              period: career.salaryPeriod,
            }}
          />
          {industryNames.length > 0 && (
            <TagList items={industryNames} limit={2} />
          )}
          {skillNames.length > 0 && (
            <TagList items={skillNames} variant="outline" limit={3} />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
