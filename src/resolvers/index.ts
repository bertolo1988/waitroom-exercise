import { QueryResolvers } from '../generated/types';
import { Mutation } from './Mutation';

const helloResolver: QueryResolvers['hello'] = async () => {
  return 'hello!';
};

export const resolvers = {
  Query: {
    hello: helloResolver,
  },
  Mutation,
};
