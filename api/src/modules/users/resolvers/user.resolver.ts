import { notFound } from '@hapi/boom'

import  type { Prisma, PrismaClient, Role, Session, User } from '@prisma/client';


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
      role: true,
      session: true
    }
  });
  return users
};

export async function user(
  parent: unknown,
  {id}: {id: string},
  context: ResolverContext
): Promise<User> {
  const user = await context.prisma.user.findFirst(
    {
      where: {
        id: parseInt(id)
      },
      include: {
        session: true,
        role: true
      }
    }
  );

  return user as User

};

export async function addUser (
  parent: unknown,
  {
    dto,
  }:{
    dto: Prisma.UserCreateInput & Prisma.SessionCreateInput & Prisma.RoleCreateInput
  },
  context: ResolverContext
  ):Promise<any> {
    const newUser = await context.prisma.user.create({
      data: {
        name: dto.name,
        lastName: dto.lastName,
        session: {
          create: {
            email: dto.email,
            password: dto.password
          }
        },
        role: {
          create: {
            roleName: dto.roleName
          }
        }
      }
    });

    const resultUser = await context.prisma.user.findFirst({
      where: {
        id: newUser.id
      },
      include: {
        session: true,
        role: true
      }
    })

    return resultUser
};

// export const updateUser = () => {
//   return "UPDATE User"
// };

// export const deleteUser = () => {
//   return "DELETE User"
// };
