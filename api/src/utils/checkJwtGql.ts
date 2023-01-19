import {unauthorized} from '@hapi/boom';
import { ResolverContext } from '../core/types/core.types';

export async function checkJWTGql(context: ResolverContext) {
  const jwtAuth = await context.build?.authenticate('jwt', {session: false})

  if (!jwtAuth?.user) {
    throw unauthorized('invalid credentials')
  } else {
    return jwtAuth.user;
  }
}
