import { ForbiddenError } from "apollo-server-express";

export function checkRolesGql(user: any, ...roles: any) {
  if (!roles.includes(user.role)) {
    throw new ForbiddenError('Not allowed');
  }
}
