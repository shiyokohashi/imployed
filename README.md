# Imployed

A career discovery platform — not a job board.

Imployed helps people discover careers they never knew existed, matched to their interests, skills, work style, personality, salary goals, and industries.

## Tech stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Prisma ORM** + **Supabase** (Postgres)

## Architecture

```
src/
├── app/                    # Next.js routes (read-only, server components)
│   ├── api/careers/        # Read-only REST API
│   ├── careers/            # Career browse + detail pages
│   └── discover/           # Filter-based career discovery
├── components/
│   ├── careers/            # Reusable career UI (no hardcoded data)
│   ├── layout/             # Site header, footer
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── db.ts               # Prisma client singleton
│   ├── repositories/       # All database queries
│   ├── services/           # Business logic (discovery matching)
│   └── types/              # Shared TypeScript types
agents/                     # Future AI ingestion agents (write to DB)
prisma/
├── schema.prisma           # Single source of truth for data models
└── seed.ts                 # Development seed data
```

### Core rules

1. **Frontend reads, agents write.** React components and pages never scrape the web or call external career APIs. All data comes from Postgres via repositories.
2. **No hardcoded careers.** Career information lives in the database, seeded or ingested — never embedded in components.
3. **Loose coupling.** Components receive typed props. Repositories handle queries. Services handle matching logic.
4. **Agent-ready.** The `IngestionRun` model and `sourceMetadata` fields are designed for future AI agents to plug in without frontend changes.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Copy the example env file and add your Supabase connection strings:

```bash
cp .env.example .env
```

Get your URLs from **Supabase Dashboard → Project Settings → Database**.

### 3. Run migrations and seed

```bash
npm run db:migrate
npm run db:seed
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Prisma Studio |

## Data model overview

| Model | Purpose |
|-------|---------|
| `Career` | Core career entity with salary, experience, growth outlook |
| `Skill` | Technical, soft, domain, and tool skills |
| `Interest` | User interest areas for discovery matching |
| `Industry` | Industry verticals |
| `WorkStyle` | Collaborative, independent, remote-friendly, etc. |
| `PersonalityTrait` | Personality fit dimensions |
| `CareerRelation` | Similar careers and career pathways |
| `IngestionRun` | Agent run tracking (future) |

Join tables (`CareerSkill`, `CareerInterest`, etc.) include relevance scores used by the discovery engine.

## License

Private — Imployed startup project.
