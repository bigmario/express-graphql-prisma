import { ResolverContext } from '../core/types/core.types';
import { AuthenticationError } from 'apollo-server-express';

export async function checkJWTGql(context: ResolverContext) {
  const jwtAuth = await context.build?.authenticate('jwt', {session: false})

  if (!jwtAuth?.user) {
    throw new AuthenticationError ('invalid credentials');
  } else {
    return jwtAuth.user;
  }
}
