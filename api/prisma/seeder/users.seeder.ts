import { PrismaServiceType } from 'api/src/core/types/prisma.type';
import { hashSync } from 'bcrypt';

export async function createUsers(prismaClient: PrismaServiceType) {
  await prismaClient.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Admin',
      lastName: 'Admin',
      session: {
        create: {
          email: "admin@mail.com",
          password: hashSync(process.env.MASTER_PASS as string, 10),
          role: {
            connect: {
              id: 1
            }
          }
        }
      }
    },
  });

  await prismaClient.$queryRaw`ALTER SEQUENCE user_id_seq restart 2`;
}
