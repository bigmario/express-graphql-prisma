import { Prisma } from "@prisma/client";

export type UpdateUSerDto = {
  id: number | string,
  dto: Pick<Prisma.userUpdateInput, "name" | "lastName" | "image"> &
  Pick<Prisma.sessionUpdateInput, "email" | "password" | "recoveryToken"> &
  { roleId?: string }
}
