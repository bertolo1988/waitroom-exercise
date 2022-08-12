import { describe, it, beforeAll, afterAll, jest } from '@jest/globals';
import request from 'supertest';

import { Utils } from '../../src/utils';
import { AiResponsePersistence } from '../../src/persistence/AiResponsePersistence';
import { completionResponse } from '../mocks/open-ai-mocks';
import * as OpenAi from '../../src/services/OpenAI';
import { runServer, stopServer } from '../../src/server';
import { expect } from 'expect';

describe('saveTextWithTitle', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer(3001);
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should get schema error if text is not passed as an argument', async () => {
    const mutationData = {
      query: `mutation SaveTextWithTitle($text: String!) {
        saveTextWithTitle(text: $text) {
          id
        }
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(mutationData);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(
      'Variable "$text" of required type "String!" was not provided.',
    );
  });

  describe(' - existing text - ', () => {
    it('should not create new ai_response record if text already existed in the database', async () => {
      const insertAiResponseSpy = jest.spyOn(AiResponsePersistence, 'create');

      const text =
        'Bruno B. Rollins was a member of the New York State Assembly for the 9th district of Manhattan from 1851 to 1853. He was the deputy Sheriff of New York County, New York from 1853 to 1859, and the Coroner of New York County, New York from 1867 to 1870.';

      const mutationData = {
        query: `mutation SaveTextWithTitle($text: String!) {
          saveTextWithTitle(text: $text) {
            id
          }
        }`,
        variables: { text },
      };

      const response = await request(testServer.server)
        .post('/graphql')
        .send(mutationData);

      expect(insertAiResponseSpy).not.toHaveBeenCalled();
      expect(response.body.data.saveTextWithTitle.id).toBe('1');

      insertAiResponseSpy.mockRestore();
    });

    it('should not send another request to openAiAPI if the text already exists in the database', async () => {
      const getCompletionForTextMock = jest
        .spyOn(OpenAi, 'getCompletionForText')
        .mockImplementation(async () => {
          return completionResponse;
        });

      const text =
        'Bruno B. Rollins was a member of the New York State Assembly for the 9th district of Manhattan from 1851 to 1853. He was the deputy Sheriff of New York County, New York from 1853 to 1859, and the Coroner of New York County, New York from 1867 to 1870.';

      const mutationData = {
        query: `mutation SaveTextWithTitle($text: String!) {
          saveTextWithTitle(text: $text) {
            id
          }
        }`,
        variables: { text },
      };

      const response = await request(testServer.server)
        .post('/graphql')
        .send(mutationData);

      expect(getCompletionForTextMock).not.toHaveBeenCalled();
      expect(response.body.data.saveTextWithTitle.id).toBe('1');

      getCompletionForTextMock.mockRestore();
    });
  });

  describe(' - new text - ', () => {
    it('should create a new ai_response record with an hash generated using Utils.createHash', async () => {
      const getCompletionForTextMock = jest
        .spyOn(OpenAi, 'getCompletionForText')
        .mockImplementation(async () => {
          return completionResponse;
        });

      const insertAiResponseSpy = jest.spyOn(AiResponsePersistence, 'create');

      const text = `Some brand new text!-${Date.now()}`;
      const expectedHash = Utils.createHash(text);

      const mutationData = {
        query: `mutation SaveTextWithTitle($text: String!) {
        saveTextWithTitle(text: $text) {
          id
        }
      }`,
        variables: { text },
      };
      const response = await request(testServer.server)
        .post('/graphql')
        .send(mutationData);

      expect(insertAiResponseSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expectedHash,
        expect.anything(),
        expect.anything(),
        text,
      );

      expect(response.body.data.saveTextWithTitle.id).toBeDefined();

      getCompletionForTextMock.mockRestore();
      insertAiResponseSpy.mockRestore();
    });

    it('should create a new ai_response record with a title created using openAi', async () => {
      const getCompletionForTextMock = jest
        .spyOn(OpenAi, 'getCompletionForText')
        .mockImplementation(async () => {
          return completionResponse;
        });

      const insertAiResponseSpy = jest.spyOn(AiResponsePersistence, 'create');

      const text = `Some brand new text!-${Date.now()}`;

      const mutationData = {
        query: `mutation SaveTextWithTitle($text: String!) {
        saveTextWithTitle(text: $text) {
          id
        }
      }`,
        variables: { text },
      };
      const response = await request(testServer.server)
        .post('/graphql')
        .send(mutationData);

      expect(insertAiResponseSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.anything(),
        completionResponse.data.id,
        completionResponse.data.choices[0].text,
        text,
      );

      expect(response.body.data.saveTextWithTitle.id).toBeDefined();

      getCompletionForTextMock.mockRestore();
      insertAiResponseSpy.mockRestore();
    });
  });
});
