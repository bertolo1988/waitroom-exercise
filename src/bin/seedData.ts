import { ServerConfig } from '../config';
import { createPool, sql, DatabasePool } from 'slonik';

const { POSTGRES_CONNECTION_STRING } = ServerConfig;
if (!POSTGRES_CONNECTION_STRING) {
  throw new Error('Must provide a connection string!');
}

let pool: DatabasePool;

async function seedData() {
  pool = await createPool(POSTGRES_CONNECTION_STRING as string);

  pool.connect(async (connection) => {
    await connection.query(sql`SELECT 1`);
  });

  await pool.query(sql`
  INSERT INTO public.ai_response
(text_hash, openai_id, title, body, created_at, updated_at)
VALUES('b3ea53f92dabc9cb3cd07d0f35f25c6c', 'cmpl-5eCFVG7WedRopAFQr0rpz5D9mKT18', 'He was born on January 1, 1810, in New York', 'Bruno B. Rollins was a member of the New York State Assembly for the 9th district of Manhattan from 1851 to 1853. He was the deputy Sheriff of New York County, New York from 1853 to 1859, and the Coroner of New York County, New York from 1867 to 1870.', '2022-08-12 00:51:33.099', '2022-08-12 00:51:33.099');
`);

  await pool.end();
}

seedData();
