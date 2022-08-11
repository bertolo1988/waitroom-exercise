import { QueryResolvers } from '../generated/types';

const helloResolver: QueryResolvers['hello'] = async () => {
  return 'hello!';
};

export const resolvers = {
  Query: {
    hello: helloResolver,
  },
};
