require('dotenv').config();
import request from 'supertest';

import { runServer, stopServer } from '../../src/server';

describe('Hello', () => {
  let testServer: any;

  beforeAll(async () => {
    testServer = await runServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should receive hello!', async () => {
    const queryData = {
      query: `query Query {
        hello
      }`,
    };
    const response = await request(testServer.server)
      .post('/graphql')
      .send(queryData);
    expect(response.body.data?.hello).toBe('hello!');
  });
});
