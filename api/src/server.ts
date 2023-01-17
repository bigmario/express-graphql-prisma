import { ApolloServer } from 'apollo-server-express';
import type { Express } from 'express'
import { resolvers } from './resolvers/resolvers'
import { loadFiles } from '@graphql-tools/load-files'
import { PrismaClient } from '@prisma/client';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';

export const serveGraphql = async (app: Express) => {
  const prisma = new PrismaClient()

  const typeDefs = [
    ...await loadFiles('./src/**/*.graphql'),
    scalarsTypeDefs
  ]
  const allResolvers = [
    resolvers,
    scalarsResolvers
  ]

  const server = new ApolloServer({
    context: {
      prisma
    },
    typeDefs,
    resolvers: allResolvers
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql'
  });
}
