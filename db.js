import { PrismaClient } from "@prisma/client";

const global = { prisma: PrismaClient | undefined };

let prisma = global.prisma || new PrismaClient();

export default prisma;
