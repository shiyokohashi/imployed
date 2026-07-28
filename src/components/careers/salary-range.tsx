import type { SalaryRange } from "@/lib/types/career";

type SalaryRangeDisplayProps = {
  salary: SalaryRange;
  className?: string;
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SalaryRangeDisplay({ salary, className }: SalaryRangeDisplayProps) {
  const { min, max, currency, period } = salary;

  if (!min && !max) {
    return (
      <span className={className ?? "text-sm text-muted-foreground"}>
        Salary varies
      </span>
    );
  }

  const periodLabel = period === "HOURLY" ? "/hr" : "/yr";
  const range =
    min && max
      ? `${formatCurrency(min, currency)} – ${formatCurrency(max, currency)}`
      : min
        ? `From ${formatCurrency(min, currency)}`
        : `Up to ${formatCurrency(max!, currency)}`;

  return (
    <span className={className ?? "text-sm text-muted-foreground"}>
      {range}
      {periodLabel}
    </span>
  );
}
