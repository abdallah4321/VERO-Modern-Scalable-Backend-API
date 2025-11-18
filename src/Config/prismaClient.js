import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectPrismaDB = async () => {
  try {
    await prisma.$connect();
    console.log(' Prisma connected successfully to PostgreSQL');
  } catch (error) {
    console.error(' Prisma connection failed:', error.message);
    process.exit(1);
  }
};

export { prisma, connectPrismaDB };
