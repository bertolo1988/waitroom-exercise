import path from 'path';
import { ServerConfig } from './config';
import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { createPool } from 'slonik';

import { resolvers } from './resolvers';

const schemaPath = path.resolve(__dirname, './schema.graphql');

const { POSTGRES_CONNECTION_STRING } = ServerConfig;
if (!POSTGRES_CONNECTION_STRING) {
  throw new Error('Must provide a connection string!');
}

export let graphQLServer: ApolloServer;

export async function runServer(port = ServerConfig.PORT) {
  const pool = createPool(POSTGRES_CONNECTION_STRING as string, {
    captureStackTrace: false,
    connectionTimeout: 60 * 1_000,
  });

  graphQLServer = new ApolloServer({
    context: ({ req }) => ({
      pool,
      req,
    }),
    resolvers,
    typeDefs: importSchema(schemaPath),
  });

  return graphQLServer.listen({ port });
}

export async function stopServer() {
  if (graphQLServer) await graphQLServer.stop();
}
