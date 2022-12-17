/**
 * Encodes a string to base64
 * @param str String to encode
 * @returns Base64 encoded string
 */
export function base64Encode(str: string) {
  return Buffer.from(str).toString('base64');
}

/**
 * Decodes a base64 string
 * @param base64Str Base64 string to decode
 * @returns Decoded string in utf-8
 */
export function base64Decode(base64Str: string) {
  return Buffer.from(base64Str, 'base64').toString('utf-8');
}
