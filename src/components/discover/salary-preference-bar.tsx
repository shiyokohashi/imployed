"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import {
  formatSalaryCompact,
  formatSalaryFull,
  SALARY_PREFERENCE,
  salaryPreferencePercent,
} from "@/lib/constants/salary-preference";

type SalaryPreferenceBarProps = {
  value?: number;
};

export function SalaryPreferenceBar({ value }: SalaryPreferenceBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = value ?? SALARY_PREFERENCE.MIN;
  const isActive = value != null && value > SALARY_PREFERENCE.MIN;
  const fillPercent = salaryPreferencePercent(current);

  function handleChange(nextValue: number) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("page");

    if (nextValue <= SALARY_PREFERENCE.MIN) {
      next.delete("salaryMin");
    } else {
      next.set("salaryMin", String(nextValue));
    }

    const query = next.toString();
    router.replace(query ? `/discover?${query}` : "/discover", { scroll: false });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <Label htmlFor="salary-preference">Minimum salary</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            {isActive
              ? "Higher-paying roles rank higher — nothing is hidden."
              : "Slide to prioritize roles that pay more."}
          </p>
        </div>
        <p className="shrink-0 text-right text-sm font-medium tabular-nums">
          {isActive ? `${formatSalaryFull(current)}+` : "Any"}
          <span className="block text-xs font-normal text-muted-foreground">per year</span>
        </p>
      </div>

      <div className="relative pt-1">
        <div
          aria-hidden
          className="pointer-events-none h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <input
          id="salary-preference"
          type="range"
          min={SALARY_PREFERENCE.MIN}
          max={SALARY_PREFERENCE.MAX}
          step={SALARY_PREFERENCE.STEP}
          value={current}
          aria-valuemin={SALARY_PREFERENCE.MIN}
          aria-valuemax={SALARY_PREFERENCE.MAX}
          aria-valuenow={current}
          aria-valuetext={
            isActive ? `${formatSalaryFull(current)} or more per year` : "Any salary"
          }
          onChange={(event) => handleChange(Number(event.target.value))}
          className="absolute inset-x-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent accent-primary [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm"
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>{formatSalaryCompact(SALARY_PREFERENCE.MIN)}</span>
        <span>{formatSalaryCompact(SALARY_PREFERENCE.MAX)}</span>
      </div>
    </div>
  );
}
