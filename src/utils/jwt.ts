import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secretKey = process.env.JWT_SECRET || 'your-default-secret';

export async function generateToken(payload: any): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secretKey));
}

export async function verifyToken(token: string) {
  try {
    return await jwtVerify(token, new TextEncoder().encode(secretKey));
  } catch (error) {
    return 'invalid token';
  }
}
