import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  return new Pool({
    connectionString,
    max: 10,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
  });
}

function createPrismaClient(pool: Pool) {
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function getPool(): Pool {
  if (!globalForPrisma.pool) {
    const pool = createPool();
    pool.on("error", (error) => {
      console.error("Postgres pool error:", error);
    });
    globalForPrisma.pool = pool;
  }
  return globalForPrisma.pool;
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient(getPool());
  }
  return globalForPrisma.prisma;
}

export const db = getPrismaClient();

export { createPrismaClient };
