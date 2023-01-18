import {unauthorized} from '@hapi/boom';
import { ResolverContext } from '../core/types/core.types';

export async function checkJWTGql(context: ResolverContext) {
  const { user } = await context.build.authenticate('jwt', {session: false})

  if (!user) {
    throw unauthorized('invalid credentials')
  }
  return user;
}
