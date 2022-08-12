import { QueryResolvers } from '../../generated/types';
import { getAiResponse } from './getAiResponse';

const helloResolver: QueryResolvers['hello'] = async () => {
  return 'hello!';
};

export const Query = {
  hello: helloResolver,
  getAiResponse,
};
