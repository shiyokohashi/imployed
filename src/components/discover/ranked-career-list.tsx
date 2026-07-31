import { CareerLink } from "@/components/careers/career-link";
import { SalaryRangeDisplay } from "@/components/careers/salary-range";
import { LineItem } from "@/components/ui/line-list";
import { cn } from "@/lib/utils";
import type { DiscoveryResult } from "@/lib/types/discovery";
import { DISCOVERY_DETAIL_CUTOFF } from "@/lib/constants/discovery";
import { MatchResultCard } from "@/components/discover/match-result-card";

type RankedCareerListProps = {
  results: DiscoveryResult[];
  showScores?: boolean;
  /** Global rank offset when viewing a paginated slice (page 2 → 50). */
  detailOffset?: number;
};

export function RankedCareerList({
  results,
  showScores = true,
  detailOffset = 0,
}: RankedCareerListProps) {
  if (results.length === 0) {
    return (
      <p className="text-muted-foreground">No careers available yet. Run the database seed.</p>
    );
  }

  const detailedResults: Array<{ result: DiscoveryResult; rank: number }> = [];
  const compactResults: Array<{ result: DiscoveryResult; rank: number }> = [];

  results.forEach((result, index) => {
    const rank = detailOffset + index + 1;
    const entry = { result, rank };
    if (rank <= DISCOVERY_DETAIL_CUTOFF) {
      detailedResults.push(entry);
    } else {
      compactResults.push(entry);
    }
  });

  return (
    <div className="space-y-8">
      {detailedResults.length > 0 && (
        <div className="grid grid-cols-1 border-l border-t border-foreground/12 lg:grid-cols-2">
          {detailedResults.map(({ result, rank }) => (
            <MatchResultCard key={result.career.id} result={result} rank={rank} layout="grid" />
          ))}
        </div>
      )}

      {compactResults.length > 0 && (
        <div className="grid grid-cols-1 border-l border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-3">
          {compactResults.map(({ result, rank }) => (
            <MatchResultRow
              key={result.career.id}
              result={result}
              rank={rank}
              showScore={showScores}
              layout="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MatchResultRow({
  result,
  rank,
  showScore,
  layout = "list",
}: {
  result: DiscoveryResult;
  rank: number;
  showScore: boolean;
  layout?: "list" | "grid";
}) {
  const { career, matchScore, matchReasons } = result;

  const content = (
    <CareerLink
      slug={career.slug}
      className={cn(
        "block h-full transition-opacity hover:opacity-70",
        layout === "grid" && "flex min-h-full flex-col gap-3"
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="type-career-title">{career.title}</p>
        <span className="type-meta shrink-0 tabular-nums">#{rank}</span>
      </div>
      {career.tagline && (
        <p className={cn("type-body", layout === "grid" ? "line-clamp-3" : "truncate")}>
          {career.tagline}
        </p>
      )}
      {matchReasons[0] && (
        <p className={cn("type-meta", layout === "grid" ? "line-clamp-2" : "truncate")}>
          {matchReasons[0]}
        </p>
      )}
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          layout === "grid" && "mt-auto"
        )}
      >
        <SalaryRangeDisplay
          className="type-meta"
          salary={{
            min: career.salaryMin,
            max: career.salaryMax,
            currency: career.salaryCurrency,
            period: "ANNUAL",
          }}
        />
        {showScore && matchScore > 0 && (
          <span className="type-meta shrink-0 tabular-nums">{matchScore} pts</span>
        )}
      </div>
    </CareerLink>
  );

  if (layout === "grid") {
    return (
      <div className="border-r border-b border-foreground/12 p-5 sm:p-6">{content}</div>
    );
  }

  return (
    <LineItem>
      <CareerLink
        slug={career.slug}
        className="flex items-center gap-4 transition-opacity hover:opacity-70"
      >
        <span className="type-meta w-8 shrink-0">#{rank}</span>
        <div className="min-w-0 flex-1">
          <p className="type-career-title">{career.title}</p>
          {career.tagline && (
            <p className="type-body mt-1 truncate">{career.tagline}</p>
          )}
          {matchReasons[0] && (
            <p className="type-meta mt-1 truncate">{matchReasons[0]}</p>
          )}
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <SalaryRangeDisplay
            className="type-meta"
            salary={{
              min: career.salaryMin,
              max: career.salaryMax,
              currency: career.salaryCurrency,
              period: "ANNUAL",
            }}
          />
        </div>
        {showScore && matchScore > 0 && (
          <span className="type-meta shrink-0 tabular-nums">{matchScore}</span>
        )}
      </CareerLink>
    </LineItem>
  );
}
