import { notFound, internal, Boom } from '@hapi/boom'

import { Prisma, PrismaClient, User } from '@prisma/client';


type ResolverContext = {
  prisma: PrismaClient
}

export async function allUsers(
  parent: unknown,
  args: unknown,
  context: ResolverContext
): Promise<User[]> {
  const users = await context.prisma.user.findMany({
    include: {
      session: {
        include: {
          role: true
        }
      }
    }
  });
  return users
};

export async function user(
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
  {
    dto,
  }: {
    dto:
    Pick<Prisma.UserCreateInput, "name" | "lastName"> &
    Pick<Prisma.SessionCreateInput, "email" | "password"> &
    { roleId: string }
  },
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
  {
    id,
    dto
  }:
    {
      id: number | string,
      dto:
      Pick<Prisma.UserUpdateInput, "name" | "lastName"> &
      Pick<Prisma.SessionUpdateInput, "email" | "password"> &
      { roleId: string }
    },
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
