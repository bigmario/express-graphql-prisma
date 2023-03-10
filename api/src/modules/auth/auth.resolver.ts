import { UpdateUSerDto } from '../users/dto/updateUser.dto';
import { ResolverContext } from '../../core/types/core.types';
import { AuthService } from './auth.service';
import { ChangePasswordType, LoginType } from './types/auth.types';
import { Prisma } from '@prisma/client';

const service = new AuthService();

export async function login(
  parent: unknown,
  args: LoginType,
  context: ResolverContext
): Promise<any> {
  const { email, password } = args;
  const gqlLocalAuth = await context.build?.authenticate('graphql-local', {email , password});

  return service.signToken(gqlLocalAuth?.user)
}

export async function sendRecovery(
  parent: unknown,
  args: UpdateUSerDto,
  context: ResolverContext
) {
  const response = await service.sendRecovery(parent, args, context);
  return response;
}

export async function changePassword(
  parent: unknown,
  args: ChangePasswordType,
  context: ResolverContext
) {
  const { token, newPassword } = args;
  const response = await service.changePassword(parent, {token, newPassword}, context);
  return response
}
