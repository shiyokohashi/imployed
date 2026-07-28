# AI Ingestion Agents (Future)

This directory is reserved for AI agents that **write** career data to the database.

## Architecture principle

```
┌─────────────┐     reads      ┌──────────────┐
│   Frontend  │ ──────────────▶│   Postgres   │
│  (Next.js)  │                │  (Supabase)  │
└─────────────┘                └──────┬───────┘
                                      ▲
                                      │ writes
                               ┌──────┴───────┐
                               │  AI Agents   │
                               │  (future)    │
                               └──────────────┘
```

The frontend **never** scrapes the internet or calls external APIs for career data.
Agents populate the same Prisma schema that the frontend reads.

## Planned agent responsibilities

1. **Career Research Agent** — Gather and synthesize career descriptions, salary data, and day-in-the-life content from authoritative sources.
2. **Taxonomy Agent** — Maintain skills, interests, industries, and personality trait mappings.
3. **Verification Agent** — Update `lastVerifiedAt` and flag stale records for review.
4. **Relation Agent** — Discover and maintain career pathway relationships.

## Ingestion tracking

All agent runs should create an `IngestionRun` record in the database for observability:

```typescript
import { db } from "@/lib/db";

const run = await db.ingestionRun.create({
  data: {
    agentName: "career-research-agent",
    status: "RUNNING",
  },
});

// ... perform ingestion ...

await db.ingestionRun.update({
  where: { id: run.id },
  data: {
    status: "COMPLETED",
    completedAt: new Date(),
    recordsProcessed: 42,
  },
});
```

## Getting started (when ready)

Agents should:

- Use the same `@/lib/db` Prisma client (or a dedicated script entry point)
- Write to existing models in `prisma/schema.prisma`
- Store provenance in `Career.sourceMetadata`
- Set `Career.lastVerifiedAt` on updates
- Never import from `src/components/` or frontend code

Run agents as standalone scripts or scheduled jobs — not as part of the Next.js request lifecycle.
