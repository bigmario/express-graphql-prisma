import { PrismaClient } from '@prisma/client';
import { GraphQLLocalStrategy } from 'graphql-passport';

import  { AuthService } from '../../../modules/auth/auth.service';

const service = new AuthService();
const prisma = new PrismaClient()

export const GQLLocalStrategy = new GraphQLLocalStrategy(
  async (email, password, done) => {
    try {
      const user = await service.getUser(
        null,
        {
          email: email as string,
          password: password as string
        },
        {
          prisma: prisma,
          build: undefined
        });
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
