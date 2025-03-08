export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN: string;
      GEMINI_API_KEY: string;
    }
  }
}
