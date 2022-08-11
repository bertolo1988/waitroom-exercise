import path from 'path';
import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

import { resolvers } from './resolvers';

const schemaPath = path.resolve(__dirname, './schema.graphql');

export const graphQLServer = new ApolloServer({
  resolvers,
  typeDefs: importSchema(schemaPath),
});
