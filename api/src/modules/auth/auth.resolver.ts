import { User } from '@prisma/client';
import { ResolverContext } from '../users/types/user.types';
import { AuthService } from './auth.service';
import { LoginType } from './types/auth.types';

const service = new AuthService();

export async function login(
  parent: unknown,
  args: LoginType,
  context: any
): Promise<any> {
  const { email, password } = args;
  const { user } = await context.build.authenticate('graphql-local', {email , password});

  return service.signToken(user)
}
