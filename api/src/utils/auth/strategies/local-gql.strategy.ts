import { PrismaClient } from '@prisma/client';
import { LoginType } from 'api/src/modules/auth/types/auth.types';
import { GraphQLLocalStrategy } from 'graphql-passport';

import  { AuthService } from '../../../modules/auth/auth.service';
import { ResolverContext } from '../../../modules/users/types/user.types';

const service = new AuthService();
const prisma = new PrismaClient()

export const GQLLocalStrategy = new GraphQLLocalStrategy(
  async (email: unknown, password: unknown, done) => {
    try {
      const parent = null
      const args: LoginType = {
        email: email as string,
        password: password as string
      }
      const context: ResolverContext = {
        prisma: prisma
      }
      const user = await service.getUser(parent, args, context);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
