import { Completion } from 'openai-api';

export const completionResponse: Completion = {
  data: {
    id: 'cmpl-5eAFSHwO3NohUKx9zGzSNVuR2vukU',
    object: 'text_completion',
    created: 1660254198,
    model: 'davinci',
    choices: [
      {
        text: 'He was born on November 2, 1820 in New York City',
        index: 0,
        logprobs: null,
        finish_reason: 'length',
      },
    ],
  },
};
