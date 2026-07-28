import Link from "next/link";

import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { Badge } from "@/components/ui/badge";
import type { DiscoveryResult } from "@/lib/types/discovery";
import { DISCOVERY_DETAIL_CUTOFF } from "@/lib/constants/discovery";
import { MatchResultCard } from "@/components/discover/match-result-card";

type RankedCareerListProps = {
  results: DiscoveryResult[];
  showScores?: boolean;
};

export function RankedCareerList({ results, showScores = true }: RankedCareerListProps) {
  if (results.length === 0) {
    return (
      <p className="text-muted-foreground">No careers available yet. Run the database seed.</p>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((result, index) => {
        const rank = index + 1;
        const isDetailed = rank <= DISCOVERY_DETAIL_CUTOFF;

        if (isDetailed) {
          return <MatchResultCard key={result.career.id} result={result} rank={rank} />;
        }

        return (
          <MatchResultRow
            key={result.career.id}
            result={result}
            rank={rank}
            showScore={showScores}
          />
        );
      })}
    </div>
  );
}

function MatchResultRow({
  result,
  rank,
  showScore,
}: {
  result: DiscoveryResult;
  rank: number;
  showScore: boolean;
}) {
  const { career, matchScore, matchReasons } = result;

  return (
    <Link
      href={`/careers/${career.slug}`}
      className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 shadow-xs transition-colors hover:border-border hover:bg-muted/30"
    >
      <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">#{rank}</span>
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-snug">{career.title}</p>
        {career.tagline && (
          <p className="truncate text-sm text-muted-foreground">{career.tagline}</p>
        )}
        {matchReasons[0] && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{matchReasons[0]}</p>
        )}
      </div>
      <div className="hidden shrink-0 text-right sm:block">
        <SalaryRangeDisplay
          className="text-xs text-muted-foreground"
          salary={{
            min: career.salaryMin,
            max: career.salaryMax,
            currency: career.salaryCurrency,
            period: "ANNUAL",
          }}
        />
      </div>
      {showScore && matchScore > 0 && (
        <Badge variant="outline" className="shrink-0 tabular-nums">
          {matchScore}
        </Badge>
      )}
    </Link>
  );
}
