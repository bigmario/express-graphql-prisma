import { Prisma } from "@prisma/client";

export type CreateUserDto =
  Pick<Prisma.UserCreateInput, "name" | "lastName" | "image"> &
  Pick<Prisma.SessionCreateInput, "email" | "password"> &
  { roleId: string }
