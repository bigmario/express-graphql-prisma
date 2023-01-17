import {unauthorized} from '@hapi/boom';

export async function checkJWTGql(context: any) {
  const { user } = await context.authenticate('jwt', {session: false})

  if (!user) {
    throw unauthorized('invalid credentials')
  }
  return user;
}
