import path from 'path';
import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

import { resolvers } from './resolvers';

export const graphQLServer = new ApolloServer({
  resolvers,
  typeDefs: importSchema(path.resolve(__dirname, '../schema/schema.graphql')),
});