import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express'
import { resolvers } from './resolvers/resolvers'
import { loadFiles } from '@graphql-tools/load-files'
import { buildContext } from 'graphql-passport';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';

export const serveGraphql = async (app: Express) => {

  const prismaClient = new PrismaClient();

  const typeDefs = [
    ...await loadFiles('./src/**/*.graphql'),
    scalarsTypeDefs
  ]
  const allResolvers = [
    resolvers,
    scalarsResolvers
  ]

  const server = new ApolloServer({
    context: ({ req, res }: {req: Request , res: Response}) => ({
      prisma: prismaClient,
      build: buildContext({req, res}),
    }),
    persistedQueries: false,
    cache: 'bounded',
    typeDefs,
    resolvers: allResolvers,
    //csrfPrevention: true,
    //introspection: true
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql'
  });
}
