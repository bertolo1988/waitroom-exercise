import { sql, DatabasePool, NotFoundError } from 'slonik';
import { AiResponse } from '../generated/types';

export class AiResponsePersistence {
  static async getByHash(
    pool: DatabasePool,
    textHash: string,
  ): Promise<AiResponse | null> {
    try {
      return (await pool.one(
        sql`SELECT id, text_hash as "textHash", openai_id as "openAiID", title FROM ai_response where text_hash = ${textHash}`,
      )) as AiResponse;
    } catch (err) {
      if (err instanceof NotFoundError) return null;
      console.error(err);
      throw err;
    }
  }

  static async create(
    pool: DatabasePool,
    textHash: string,
    openAiId: string,
    title: string,
    body: string
  ) {
    const insertData = sql`(${sql.join([textHash, openAiId, title, body], sql`,`)})`;
    return await pool.query(
      sql`INSERT INTO ai_response (text_hash, openai_id, title, body) VALUES ${insertData}`,
    );
  }
}
