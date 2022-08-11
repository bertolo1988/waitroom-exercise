import crypto from 'crypto';

export class Utils {
  static createHash(input: string) {
    return crypto.createHash('md5').update(input).digest('hex');
  }
}
