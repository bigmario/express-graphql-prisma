import { notFound, internal, Boom } from '@hapi/boom'

import { Prisma, PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUSerDto } from './dto/updateUser.dto';

import {buildFilters} from '../../libs/filterBuilders.lib'


type ResolverContext = {
  prisma: PrismaClient
}

export async function getAllUsers(
  parent: unknown,
  args: {skip?: number, take?:number, search?: string},
  context: ResolverContext
): Promise<User[]> {
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
};

export async function getOneuser(
  parent: unknown,
  { id }: { id: string | number },
  context: ResolverContext
): Promise<User | Boom> {
  try {
    const user = await context.prisma.user.findFirst(
      {
        where: {
          id: typeof id === 'string' ? parseInt(id) : id
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
};

export async function addUser(
  parent: unknown,
  { dto }: { dto: CreateUserDto },
  context: ResolverContext
): Promise<User | Boom> {
  try {
    const newUserData: Prisma.UserCreateArgs['data'] = {
      name: dto.name,
      lastName: dto.lastName,
      session: {
        create: {
          email: dto.email,
          password: dto.password,
          role: {
            connect: {
              id: parseInt(dto.roleId),
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

};

export async function updateUser(
  parent: unknown,
  { id, dto }: { id: number | string, dto: UpdateUSerDto },
  context: ResolverContext
): Promise<User | Boom> {
  try {
    const updateUserData: Prisma.UserUpdateArgs["data"] = {
      name: dto?.name,
      lastName: dto?.lastName,
      session: {
        update: {
          email: dto?.email,
          password: dto?.password,
          roleId: parseInt(dto?.roleId)
        },
      }
    }

    const updateUser = await context.prisma.user.update({
      where: {
        id: typeof id === 'string' ? parseInt(id) : id
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
};

export async function deleteUser(
  parent: unknown,
  { id }: { id: string | number },
  context: ResolverContext
): Promise<number> {
  const userFound = await context.prisma.user.findFirstOrThrow(
    {
      where: {
        id: typeof id === 'string' ? parseInt(id) : id
      }
    }
  );
  await context.prisma.user.delete({
    where: {
      id: typeof id === 'string' ? parseInt(id) : id
    }
  });

  return userFound.id
};
