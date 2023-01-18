import { PrismaServiceType } from 'api/src/core/types/prisma.type';
import { PrismaClient } from '@prisma/client';
import { createUsers } from './users.seeder';
import { createRoles } from './roles.seeder';

const prismaClient = new PrismaClient();

async function main(prismaClient: PrismaServiceType) {
  await createRoles(prismaClient);
  await createUsers(prismaClient);

  console.log('Database seeded');
}

prismaClient
  .$transaction(main, {
    maxWait: 15000 * 3,
    timeout: 60000 * 3,
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
