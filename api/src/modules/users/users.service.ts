import { notFound, internal } from '@hapi/boom'

import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUSerDto } from './dto/updateUser.dto';

import {buildFilters} from '../../libs/filterBuilders.lib'
import { FindOneType, FindOptions, ResolverContext } from './types/user.types';

export class UserService {
  constructor() {
  }

  async findAll(parent: unknown, args: FindOptions, context: ResolverContext) {
    try {
      const users = await context.prisma.user.findMany({
        where: {
          ...(args?.search && {
            OR: buildFilters(args.search, [
              'name', 'lastName'
            ]),
          }),
        },
        include: {
          session: {
            include: {
              role: true
            }
          }
        },
        skip: args?.skip || 0,
        take: args?.take || 100
      });
      return users
    } catch (error) {
      throw internal("Unknown Error")
    }
  }

  async findOne(parent: unknown, args: FindOneType, context: ResolverContext) {
    try {
      const user = await context.prisma.user.findFirst(
        {
          where: {
            id: typeof args.id === 'string' ? parseInt(args.id) : args.id
          },
          include: {
            session: {
              include: {
                role: true
              }
            },
          }
        }
      );
      if (!user) {
        return notFound("User not found")
      } else {
        return user
      }
    } catch (error) {
      throw internal("Unknown Error")
    }

  }

  async create (parent: unknown, args: CreateUserDto, context: ResolverContext) {
    try {
      const newUserData: Prisma.UserCreateArgs['data'] = {
        name: args.dto.name,
        lastName: args.dto.lastName,
        image: args.dto.image,
        session: {
          create: {
            email: args.dto.email,
            password: args.dto.password,
            role: {
              connect: {
                id: parseInt(args.dto.roleId),
              }
            }
          }
        }
      }
      const newUser = await context.prisma.user.create({
        data: newUserData,
        include: {
          session: {
            include: {
              role: true
            }
          }
        }
      });

      return newUser
    } catch (error) {
      throw internal("Unknown Error", error)
    }
  }

  async update(parent: unknown, args: UpdateUSerDto, context: ResolverContext) {
    try {
      const updateUserData: Prisma.UserUpdateArgs["data"] = {
        name: args.dto?.name,
        lastName: args.dto?.lastName,
        image: args.dto?.image,
        session: {
          update: {
            email: args.dto?.email,
            password: args.dto?.password,
            roleId: parseInt(args.dto?.roleId)
          },
        }
      }

      const updateUser = await context.prisma.user.update({
        where: {
          id: typeof args.id === 'string' ? parseInt(args.id) : args.id
        },
        data: updateUserData,
        include: {
          session: {
            include: {
              role: true
            }
          }
        }
      });
      return updateUser
    } catch (error) {
      throw internal("Unknown Error", error)
    }
  }

  async delete (parent: unknown, args: FindOneType, context: ResolverContext) {
    try {
      const userFound = await context.prisma.user.findFirstOrThrow(
        {
          where: {
            id: typeof args.id === 'string' ? parseInt(args.id) : args.id
          }
        }
      );
      await context.prisma.user.delete({
        where: {
          id: typeof args.id === 'string' ? parseInt(args.id) : args.id
        }
      });

      return userFound.id
    } catch (error) {
      throw internal("Unknown Error", error)
    }

  }
}
