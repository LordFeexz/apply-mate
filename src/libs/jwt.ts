import "server-only";
import { type JwtPayload, verify, sign } from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";

export interface TokenValue extends JwtPayload {
  id: string;
}

export const verifyToken = (token: string | any): TokenValue =>
  verify(token, process.env.JWT_SECRET) as TokenValue;

export const createToken = (id: string) => sign({ id }, process.env.JWT_SECRET);

export const customVerify = (
  token: string | undefined,
  secret: string | Buffer
): JwtPayload | string | JWT =>
  verify(token as string, secret, { algorithms: ["HS256"] });

export const customToken = (
  token: string | JWT,
  secret: string | Buffer
): string => sign(token as string, secret, { algorithm: "HS256" });
