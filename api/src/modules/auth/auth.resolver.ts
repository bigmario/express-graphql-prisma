import { User } from '@prisma/client';
import { UpdateUSerDto } from '../users/dto/updateUser.dto';
import { ResolverContext } from '../users/types/user.types';
import { AuthService } from './auth.service';
import { ChangePasswordType, LoginType, RecoveryType } from './types/auth.types';

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

export async function sendRecovery(
  parent: unknown,
  args: UpdateUSerDto,
  context: any
) {
  const response = await service.sendRecovery(parent, args, context);
  return response;
}

export async function changePassword(
  parent: unknown,
  args: ChangePasswordType,
  context: any
) {
  const { token, newPassword } = args;
  const response = await service.changePassword(parent, {token, newPassword}, context);
  return response
}
