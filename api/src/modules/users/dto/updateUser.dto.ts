import { Prisma } from "@prisma/client";

export type UpdateUSerDto =
  Pick<Prisma.UserUpdateInput, "name" | "lastName"> &
  Pick<Prisma.SessionUpdateInput, "email" | "password"> &
  { roleId: string }
