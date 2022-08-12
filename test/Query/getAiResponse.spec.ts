import { describe, it, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

import { runServer, stopServer } from '../../src/server';
import { expect } from 'expect';

describe('getAiResponse', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer(3002);
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should get schema error if id is not passed as an argument', async () => {
    const mutationData = {
      query: `query GetAiResponse($getAiResponseId: Int!) {
        getAiResponse(id: $getAiResponseId) {
          id
          textHash
          openAiID
          title
          body
        }
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(mutationData);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(
      'Variable "$getAiResponseId" of required type "Int!" was not provided.',
    );
  });

  it('should id, textHash, openAiID, title and body should be defined if requested on a successfull response', async () => {
    const mutationData = {
      query: `query GetAiResponse($getAiResponseId: Int!) {
        getAiResponse(id: $getAiResponseId) {
          id
          textHash
          openAiID
          title
          body
        }
      }`,
      variables: { getAiResponseId: '1' },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(mutationData);

    expect(response.body.data.getAiResponse).toBe(
      expect.objectContaining({
        id: expect.any(Number),
        textHash: expect.any(String),
        openAiID: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  });
});
