import { runServer } from './server';

runServer().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
