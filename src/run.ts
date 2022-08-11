import { runServer } from './server';

try {
  runServer().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
