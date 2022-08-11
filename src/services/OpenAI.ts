import _ from 'lodash';
import { ServerConfig } from '../config';
import OpenAI, { CompletionOpts, Completion } from 'openai-api';

// https://github.com/Njerschow/openai-api#get-number-of-tokens-for-stringS
export const OPEN_AI_TOKEN_LIMIT = 2048;

if (!ServerConfig.OPEN_AI_KEY) throw Error('Missing OPEN_AI_KEY!');
const { OPEN_AI_KEY } = ServerConfig;

export const openAIClient = new OpenAI(OPEN_AI_KEY);

export const getCompletionForText = async (
  prompt: string,
): Promise<Completion> => {
  const result = await openAIClient.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 15,
    temperature: 0.2,
  } as CompletionOpts);
  result.data.choices[0].text = result.data.choices[0].text.replace(/\n/g, '');
  return result;
};
