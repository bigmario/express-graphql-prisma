import { PrismaClient } from "@prisma/client"
import { Context } from "graphql-passport/lib/buildContext"

export type ResolverContext = {
  prisma: PrismaClient,
  build: Context<Express.User> | undefined
}
