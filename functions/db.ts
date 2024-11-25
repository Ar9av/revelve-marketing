import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();
  
function getPrismaClient(DATABASE_URL: string) {
  const connectionString = DATABASE_URL;
  const pool = new Pool({ connectionString });
  const prisma = new PrismaClient({
    adapter: new PrismaNeon(pool)
  });
  return prisma;
}

export { getPrismaClient };