#!/usr/bin/env sh
set -eu

if [ ! -f .env ]; then
  echo "Missing .env — copy .env.example and add your Supabase URLs first."
  exit 1
fi

# shellcheck disable=SC1091
. ./.env

DB_URL="${DIRECT_URL:-$DATABASE_URL}"

if [ -z "$DB_URL" ]; then
  echo "Set DATABASE_URL (pooled) and DIRECT_URL (direct) in .env"
  exit 1
fi

if echo "$DB_URL" | grep -q localhost; then
  echo "DATABASE_URL still points at localhost. Add your Supabase URLs to .env first."
  exit 1
fi

echo "→ Pushing schema to Supabase..."
DATABASE_URL="$DB_URL" npx prisma db push

echo "→ Seeding careers (this takes several minutes)..."
DATABASE_URL="$DB_URL" npm run db:seed

echo "Done. Add the pooled DATABASE_URL to Vercel environment variables, then redeploy."
