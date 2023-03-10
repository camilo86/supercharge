/**
 * Encodes a string to base64
 * @param str String to encode
 * @returns Base64 encoded string
 */
export function encodeBase64(str: string) {
  return Buffer.from(str).toString('base64');
}

/**
 * Decodes a base64 string
 * @param base64Str Base64 string to decode
 * @returns Decoded string in utf-8
 */
export function decodeBase64(base64Str: string) {
  return Buffer.from(base64Str, 'base64').toString('utf-8');
}

export function decodeJWT(jwt: string) {
  const jwtParts = jwt.split('.');

  if (jwtParts.length !== 3) {
    throw new Error('JWT is not valid.');
  }

  return {
    header: decodeBase64(jwtParts[0]),
    payload: decodeBase64(jwtParts[1]),
    signature: jwtParts[2],
  };
}
