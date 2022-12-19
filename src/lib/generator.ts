import * as crypto from 'crypto';

/**
 * Generates a random UUID
 * @returns UUID string
 */
export function generateUUID() {
  return crypto.randomUUID();
}
