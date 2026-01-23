// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL missing");
}

const adapter = new PrismaPg({ connectionString });

const prisma = global.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  adapter,  // ← yeh line adapter daal deti hai
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };