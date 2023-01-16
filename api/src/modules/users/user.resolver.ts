import type { Boom } from '@hapi/boom'

import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUSerDto } from './dto/updateUser.dto';

import { FindOneType, FindOptions, ResolverContext } from './types/user.types';
import { UserService } from './users.service';

const userService = new UserService();

export async function allUsers(
  parent: unknown,
  args: FindOptions,
  context: ResolverContext
): Promise<User[] | Boom> {
  const users = await userService.findAll(parent, args, context);
  return users;
};

export async function user(
  parent: unknown,
  args: FindOneType,
  context: ResolverContext
): Promise<User | Boom> {
  const user = await userService.findOne(parent, args, context);
  return user;
};

export async function addUser(
  parent: unknown,
  args: CreateUserDto,
  context: ResolverContext
): Promise<User | Boom> {
  const newUser = await userService.create(parent, args, context);
  return newUser;
};

export async function updateUser(
  parent: unknown,
  args: UpdateUSerDto,
  context: ResolverContext
): Promise<User | Boom> {
  const updateUser = await userService.update(parent, args, context);
  return updateUser;
};

export async function deleteUser(
  parent: unknown,
  args: FindOneType,
  context: ResolverContext
): Promise<number | Boom> {
  const deleteUser = userService.delete(parent, args, context);
  return deleteUser;
};
