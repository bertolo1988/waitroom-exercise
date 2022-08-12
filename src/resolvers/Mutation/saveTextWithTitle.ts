import {
  getCompletionForText,
  OPEN_AI_TOKEN_LIMIT,
} from '../../services/OpenAI';
import { Utils } from '../../utils';
import { MutationResolvers } from '../../generated/types';
import { AiResponsePersistence } from '../../persistence/AiResponsePersistence';

export const saveTextWithTitle: MutationResolvers['saveTextWithTitle'] = async (
  _parent,
  { text },
  { pool },
) => {
  const hash = Utils.createHash(text);

  let aiResponse = await AiResponsePersistence.getByHash(pool, hash);
  if (!aiResponse) {
    const completion = await getCompletionForText(
      text.slice(0, OPEN_AI_TOKEN_LIMIT),
    );

    const createResponse = await AiResponsePersistence.create(
      pool,
      hash,
      completion.data.id,
      completion.data.choices[0].text,
      text,
    );

    if (createResponse.rowCount < 1)
      throw Error('Failed to insert save text with title!');

    aiResponse = await AiResponsePersistence.getByHash(pool, hash);
  }

  return { id: aiResponse?.id as string };
};
