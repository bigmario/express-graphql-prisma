import { PrismaServiceType } from 'api/src/core/types/prisma.type';

export async function createRoles(prismaClient: PrismaServiceType) {
  await prismaClient.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Admin',
      description: 'ADMIN'
    },
  });

  await prismaClient.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Seller',
      description: 'SELLER'
    },
  });

  await prismaClient.$queryRaw`ALTER SEQUENCE role_id_seq restart 3`;
}
