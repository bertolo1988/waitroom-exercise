import path from 'path';
import { ServerConfig } from './config';
import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

import { resolvers } from './resolvers';

const schemaPath = path.resolve(__dirname, './schema.graphql');

export let graphQLServer: ApolloServer;

export async function runServer() {
  graphQLServer = new ApolloServer({
    resolvers,
    typeDefs: importSchema(schemaPath),
  });

  return graphQLServer.listen({ port: ServerConfig.PORT });
}

export async function stopServer() {
  if (graphQLServer) await graphQLServer.stop();
}
