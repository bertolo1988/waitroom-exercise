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
    const queryData = {
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
      .send(queryData);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(
      'Variable "$getAiResponseId" of required type "Int!" was not provided.',
    );
  });

  it('should id, textHash, openAiID, title and body should be defined if requested on a successfull response', async () => {
    const queryData = {
      query: `query GetAiResponse($getAiResponseId: Int!) {
        getAiResponse(id: $getAiResponseId) {
          id
          textHash
          openAiID
          title
          body
        }
      }`,
      variables: { getAiResponseId: 1 },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(response.body.data.getAiResponse).toEqual({
      id: '1',
      textHash: 'b3ea53f92dabc9cb3cd07d0f35f25c6c',
      openAiID: 'cmpl-5eCFVG7WedRopAFQr0rpz5D9mKT18',
      title: 'He was born on January 1, 1810, in New York',
      body: 'Bruno B. Rollins was a member of the New York State Assembly for the 9th district of Manhattan from 1851 to 1853. He was the deputy Sheriff of New York County, New York from 1853 to 1859, and the Coroner of New York County, New York from 1867 to 1870.',
    });
  });

  it('should return null if record with given id does not exist', async () => {
    const queryData = {
      query: `query GetAiResponse($getAiResponseId: Int!) {
        getAiResponse(id: $getAiResponseId) {
          id
          textHash
          openAiID
          title
          body
        }
      }`,
      variables: { getAiResponseId: 99999 },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(response.body.data.getAiResponse).toBeNull();
  });

  it('should return null if record with given id is negative number', async () => {
    const queryData = {
      query: `query GetAiResponse($getAiResponseId: Int!) {
        getAiResponse(id: $getAiResponseId) {
          id
          textHash
          openAiID
          title
          body
        }
      }`,
      variables: { getAiResponseId: -1 },
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);

    expect(response.body.data.getAiResponse).toBeNull();
  });
});
