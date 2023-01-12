import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers'
import { loadFiles } from '@graphql-tools/load-files'
import { PrismaClient } from '@prisma/client';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';

(async ()=>{
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

  return server.listen().then(({url})=> console.log(`Server is running in ${url}`));
})();
