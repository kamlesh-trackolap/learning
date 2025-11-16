import { SignJWT, jwtVerify } from "jose";

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);

export async function generateAccessToken(payload: Record<string,unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(accessSecret);
}

export async function generateRefreshToken(payload: Record<string,unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string) {
  return await jwtVerify(token, accessSecret);
}

export async function verifyRefreshToken(token: string) {
  return await jwtVerify(token, refreshSecret);
}
