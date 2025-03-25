import "server-only";
import CSRF from "csrf";

const tokens = new CSRF();
const secret = tokens.secretSync();

export function getCsrfToken() {
  return tokens.create(secret);
}

export function verifyCsrfToken(token: string) {
  return tokens.verify(secret, token);
}
