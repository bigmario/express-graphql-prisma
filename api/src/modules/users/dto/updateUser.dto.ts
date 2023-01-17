import { Prisma } from "@prisma/client";

export type UpdateUSerDto = {
  id: number | string,
  dto: Pick<Prisma.UserUpdateInput, "name" | "lastName" | "image"> &
  Pick<Prisma.SessionUpdateInput, "email" | "password"> &
  { roleId?: string } &
  {recoveryToken?: string | null}
}
