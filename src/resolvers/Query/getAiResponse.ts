import { QueryResolvers } from '../../generated/types';
import { AiResponsePersistence } from '../../persistence/AiResponsePersistence';

export const getAiResponse: QueryResolvers['getAiResponse'] = async (
  _parent,
  { id },
  { pool },
) => {
  const res = await AiResponsePersistence.getById(pool, id);
  return res;
};
