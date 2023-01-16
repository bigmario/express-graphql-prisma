import { PrismaClient } from "@prisma/client"

export type ResolverContext = {
  prisma: PrismaClient
}

export type FindOneType = {
  id: string | number
}

export type FindOptions = {
  skip?: number,
  take?:number,
  search?: string
}
