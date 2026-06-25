import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const entidades = await prisma.entidade.findMany();
  console.log("Entidades:", JSON.stringify(entidades, null, 2));

  const membros = await prisma.membro.findMany();
  console.log("Membros:", JSON.stringify(membros, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
