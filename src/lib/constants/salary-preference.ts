/** Bounds for the discover salary preference slider (USD, annual). */
export const SALARY_PREFERENCE = {
  MIN: 30_000,
  MAX: 250_000,
  STEP: 5_000,
} as const;

export function formatSalaryCompact(amount: number): string {
  if (amount >= SALARY_PREFERENCE.MAX) {
    return `$${SALARY_PREFERENCE.MAX / 1_000}k+`;
  }

  if (amount >= 1_000) {
    return `$${Math.round(amount / 1_000)}k`;
  }

  return `$${amount.toLocaleString("en-US")}`;
}

export function formatSalaryFull(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseSalaryPreference(
  value: string | string[] | undefined,
): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= SALARY_PREFERENCE.MIN) {
    return undefined;
  }

  return Math.min(Math.max(parsed, SALARY_PREFERENCE.MIN), SALARY_PREFERENCE.MAX);
}

export function salaryPreferencePercent(value: number): number {
  const { MIN, MAX } = SALARY_PREFERENCE;
  return ((value - MIN) / (MAX - MIN)) * 100;
}
