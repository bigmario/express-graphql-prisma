import type { Boom } from '@hapi/boom'

import { user } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUSerDto } from './dto/updateUser.dto';
import { ResolverContext } from '../../core/types/core.types';

import { FindOneType, FindOptions } from './types/user.types';
import { UserService } from './users.service';
import { jwtGuard } from '../../utils/auth/guards/jwtGuard.guard';

const userService = new UserService();

export async function allUsers(
  parent: unknown,
  args: FindOptions,
  context: ResolverContext
): Promise<user[] | Boom> {
  const users = await userService.findAll(parent, args, context);
  return users;
};

export async function user(
  parent: unknown,
  args: FindOneType,
  context: ResolverContext
): Promise<user | Boom> {
  const user = await userService.findOne(parent, args, context);
  return user;
};

export async function addUser(
  parent: unknown,
  args: CreateUserDto,
  context: ResolverContext
): Promise<user | Boom> {
  await jwtGuard(context)
  const newUser = await userService.create(parent, args, context);
  return newUser;
};

export async function updateUser(
  parent: unknown,
  args: UpdateUSerDto,
  context: ResolverContext
): Promise<user | Boom> {
  await jwtGuard(context)
  const updateUser = await userService.update(parent, args, context);
  return updateUser;
};

export async function deleteUser(
  parent: unknown,
  args: FindOneType,
  context: ResolverContext
): Promise<number | Boom> {
  await jwtGuard(context)
  const deleteUser = userService.delete(parent, args, context);
  return deleteUser;
};
