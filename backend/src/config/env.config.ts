import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "4000";
export const MONGO_URL = process.env.MONGO_URL!;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15m";
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "7d";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : undefined;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";
export const NODE_ENVIRONMENT = process.env.NODE_ENVIRONMENT;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];
