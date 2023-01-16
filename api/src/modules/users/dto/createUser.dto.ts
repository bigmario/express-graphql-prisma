import { Prisma } from "@prisma/client";

export type CreateUserDto =
  Pick<Prisma.UserCreateInput, "name" | "lastName"> &
  Pick<Prisma.SessionCreateInput, "email" | "password"> &
  { roleId: string }
