import { describe, it, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';

import { runServer, stopServer } from '../../src/server';

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
      mutation: `mutation SaveTextWithTitle($text: String!) {
        saveTextWithTitle(text: $text) {
          id
        }
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(mutationData);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBeDefined();
    expect(response.body.errors[0].extensions).toBeDefined();
  });
});
