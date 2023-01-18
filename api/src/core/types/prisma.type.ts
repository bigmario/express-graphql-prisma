import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaServiceType = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;
