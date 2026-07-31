"use client";

import { useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  formatSalaryCompact,
  formatSalaryFull,
  parseSalaryPreference,
  SALARY_PREFERENCE,
  salaryPreferencePercent,
} from "@/lib/constants/salary-preference";

type SalaryPreferenceBarProps = {
  value?: number;
  searchParams: URLSearchParams;
  replaceParams: (next: URLSearchParams) => void;
};

export function SalaryPreferenceBar({
  value,
  searchParams,
  replaceParams,
}: SalaryPreferenceBarProps) {
  const isDraggingRef = useRef(false);
  const [dragValue, setDragValue] = useState<number | null>(null);

  const urlSalary = parseSalaryPreference(searchParams.get("salaryMin") ?? undefined);
  const committedValue = urlSalary ?? value ?? SALARY_PREFERENCE.MIN;

  const displayValue = dragValue ?? committedValue;
  const isDragging = dragValue != null;
  const isActive = displayValue > SALARY_PREFERENCE.MIN;
  const fillPercent = salaryPreferencePercent(displayValue);

  function applyValue(nextValue: number) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("page");

    if (nextValue <= SALARY_PREFERENCE.MIN) {
      next.delete("salaryMin");
    } else {
      next.set("salaryMin", String(nextValue));
    }

    replaceParams(next);
  }

  function handleChange(nextValue: number) {
    if (isDraggingRef.current) {
      setDragValue(nextValue);
      return;
    }

    applyValue(nextValue);
  }

  function finishDrag(nextValue: number) {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setDragValue(null);
    applyValue(nextValue);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <Label htmlFor="salary-preference" className="type-label">
            Minimum salary
          </Label>
          <p className="type-meta mt-1.5">
            {isActive
              ? "Higher-paying roles rank higher — nothing is hidden."
              : "Slide to prioritize roles that pay more."}
          </p>
        </div>
        <p className="type-meta shrink-0 text-right tabular-nums">
          {isActive ? `${formatSalaryFull(displayValue)}+` : "Any"}
        </p>
      </div>

      <div className="relative flex h-4 w-full items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-2 overflow-hidden rounded-full paper-track"
        >
          <div
            className={`h-full rounded-full bg-primary ${
              isDragging ? "transition-none" : "transition-[width] duration-200 ease-out"
            }`}
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <input
          id="salary-preference"
          type="range"
          min={SALARY_PREFERENCE.MIN}
          max={SALARY_PREFERENCE.MAX}
          step={SALARY_PREFERENCE.STEP}
          value={displayValue}
          aria-valuemin={SALARY_PREFERENCE.MIN}
          aria-valuemax={SALARY_PREFERENCE.MAX}
          aria-valuenow={displayValue}
          aria-valuetext={
            isActive ? `${formatSalaryFull(displayValue)} or more` : "Any salary"
          }
          onChange={(event) => handleChange(Number(event.target.value))}
          onPointerDown={() => {
            isDraggingRef.current = true;
            setDragValue(displayValue);
          }}
          onPointerUp={(event) => finishDrag(Number(event.currentTarget.value))}
          onPointerCancel={(event) => finishDrag(Number(event.currentTarget.value))}
          className="relative z-10 h-4 w-full cursor-pointer touch-none appearance-none bg-transparent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:[-webkit-appearance:none] [&::-webkit-slider-thumb]:[margin-top:-4px]"
        />
      </div>

      <div className="type-meta flex justify-between">
        <span>{formatSalaryCompact(SALARY_PREFERENCE.MIN)}</span>
        <span>{formatSalaryCompact(SALARY_PREFERENCE.MAX)}</span>
      </div>
    </div>
  );
}
