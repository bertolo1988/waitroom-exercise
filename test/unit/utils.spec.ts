import { describe, expect, it } from '@jest/globals';
import { Utils } from '../../src/utils';

describe('Utils', () => {
  describe('createHash', () => {
    it('should create an hash for a string', async () => {
      const hash: string = Utils.createHash('some-input');
      expect(hash).toEqual(expect.any(String));
    });

    it('should create same hash twice for same input', async () => {
      const hash1: string = Utils.createHash('some-input');
      const hash2: string = Utils.createHash('some-input');
      expect(hash1).toEqual(hash2);
    });
  });
});
