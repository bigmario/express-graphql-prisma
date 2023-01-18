import { Prisma } from "@prisma/client";

export type CreateUserDto = {
  dto: Pick<Prisma.userCreateInput, "name" | "lastName" | "image"> &
       Pick<Prisma.sessionCreateInput, "email" | "password"> &
       { roleId: string }
}

