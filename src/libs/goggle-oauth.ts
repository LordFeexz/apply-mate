import "server-only";
import {
  type LoginTicket,
  OAuth2Client,
  type TokenPayload,
} from "google-auth-library";

const oauth2Client: OAuth2Client = new OAuth2Client(
  process.env.GOOGLE_OAUTH_CLIENTID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET
);

export async function verifyIdToken(idToken: string) {
  return (await oauth2Client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_OAUTH_CLIENTID,
  })) as LoginTicket & { getPayload: () => TokenPayload };
}
