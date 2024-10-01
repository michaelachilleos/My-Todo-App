import { PrismaClient } from "@prisma/client"; // Importing Prisma Client

// Singleton pattern for Prisma Client to avoid multiple instances
const prismaClientSingleton = () => {
  return new PrismaClient(); // Returns a new instance of Prisma Client
};

// Type declaration for global variables
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Use a global instance of Prisma Client in development mode to avoid exceeding connection limits
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Store the global instance in development mode
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
