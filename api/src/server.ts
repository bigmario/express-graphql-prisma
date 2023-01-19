import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express'
import { resolvers } from './resolvers/resolvers'
import { loadFiles } from '@graphql-tools/load-files'
import { buildContext } from 'graphql-passport';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';

export const serveGraphql = async (app: Express) => {

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
      prisma: new PrismaClient(),
      build: buildContext({req, res})
    }),
    typeDefs,
    resolvers: allResolvers
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql'
  });
}
