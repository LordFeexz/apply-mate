export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN: string;
      GEMINI_API_KEY: string;
      JWT_SECRET: string;
      NEXTAUTH_SECRET: string;
      GOOGLE_OAUTH_CLIENTID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
      MIDTRANS_SERVER_KEY: string;
      MIDTRANS_CLIENT_KEY: string;
      MIDTRANS_CORE_API: string;
      CRON_SECRET: string;
    }
  }
}
