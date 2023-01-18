import { checkJWTGql } from "../../checkJwtGql";
import { checkRolesGql } from "../../checkRolesGql";

export async function jwtGuard(context: any) {
  const user = await checkJWTGql(context);
  checkRolesGql(user, 'Admin')
}
