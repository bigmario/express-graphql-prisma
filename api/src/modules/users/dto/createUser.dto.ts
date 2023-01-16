import { Prisma } from "@prisma/client";

export type CreateUserDto = {
  dto: Pick<Prisma.UserCreateInput, "name" | "lastName" | "image"> &
       Pick<Prisma.SessionCreateInput, "email" | "password"> &
       { roleId: string }
}

