import Link from "next/link";

type DatabaseUnavailableProps = {
  backHref?: string;
  backLabel?: string;
};

export function DatabaseUnavailable({
  backHref = "/explore",
  backLabel = "Back to explore",
}: DatabaseUnavailableProps) {
  return (
    <div className="space-y-4 border-t border-foreground/12 py-12">
      <h2 className="type-subhead">Careers unavailable right now</h2>
      <p className="type-body max-w-xl">
        The app couldn&apos;t reach the database. Locally, start everything with{" "}
        <code className="text-foreground">npm run dev:all</code> (Postgres + Next.js).
      </p>
      <Link href={backHref} className="type-nav inline-block transition-opacity hover:opacity-70">
        {backLabel}
      </Link>
    </div>
  );
}
