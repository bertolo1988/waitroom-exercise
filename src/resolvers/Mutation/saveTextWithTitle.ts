import {
  generateTitleForPrompt,
  OPEN_AI_TOKEN_LIMIT,
} from '../../services/OpenAI';
import { MutationResolvers } from '../../generated/types';

export const saveTextWithTitle: MutationResolvers['saveTextWithTitle'] = async (
  _parent,
  { text },
) => {
  const title = await generateTitleForPrompt(
    text.slice(0, OPEN_AI_TOKEN_LIMIT),
  );

  console.log('title!', title);
  // save in persistent storage

  return { id: '1' };
};
