import { PrismaClient } from "@prisma/client"

export type ResolverContext = {
  prisma: PrismaClient,
}
