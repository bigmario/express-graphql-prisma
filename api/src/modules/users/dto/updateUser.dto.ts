import { Prisma } from "@prisma/client";

export type UpdateUSerDto =
  Pick<Prisma.UserUpdateInput, "name" | "lastName" | "image"> &
  Pick<Prisma.SessionUpdateInput, "email" | "password"> &
  { roleId: string }
