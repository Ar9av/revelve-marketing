// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// import dotenv from 'dotenv'
import ws from 'ws'

// dotenv.config()
neonConfig.webSocketConstructor = ws
// const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool()
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export { prisma };