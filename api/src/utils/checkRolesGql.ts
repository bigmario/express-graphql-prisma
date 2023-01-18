import { unauthorized } from "@hapi/boom";

export function checkRolesGql(user: any, ...roles: any) {
  if (!roles.includes(user.role)) {
    throw(unauthorized('Not allowed'));
  }
}
