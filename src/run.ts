import { ServerConfig } from './config';
import { graphQLServer } from './server';

graphQLServer.listen({ port: ServerConfig.PORT }).then(({ url }) => {
  console.log(`🚀  Server  ready at ${url}`);
});
