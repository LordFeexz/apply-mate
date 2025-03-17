import { LANG } from "@/enums/global";

export interface LoginPageDictionary {
  title: string;
  desc: string;
  agree: string;
  term: string;
  and: string;
  privacy: string;
}

export interface GoogleLoginBtnDictionary {
  somethingWentWrong: string;
  loginFailed: string;
  loginSuccess: string;
}

const LOGIN_PAGE_DICTIONARY: Record<LANG, LoginPageDictionary> = {
  [LANG.EN]: {
    title: "Sign In",
    desc: "Sign in to your account to continue",
    agree: "By signing in, you agree to our",
    term: "Terms of Service",
    and: "and",
    privacy: "Privacy Policy",
  },
  [LANG.ID]: {
    title: "Masuk",
    desc: "Masuk ke akun Anda untuk melanjutkan",
    agree: "Dengan masuk, Anda menyetujui",
    term: "Syarat dan Ketentuan",
    and: "dan",
    privacy: "Kebijakan Privasi",
  },
};

const GOOGLE_LOGIN_BTN_DICTIONARY: Record<LANG, GoogleLoginBtnDictionary> = {
  [LANG.EN]: {
    somethingWentWrong: "Something went wrong",
    loginFailed: "failed to login",
    loginSuccess: "Signed in successfully",
  },
  [LANG.ID]: {
    somethingWentWrong: "Terjadi kesalahan",
    loginFailed: "Gagal login",
    loginSuccess: "Berhasil login",
  },
};

export const getLoginPageDictionary = (lang: LANG): LoginPageDictionary =>
  LOGIN_PAGE_DICTIONARY[lang] ?? LOGIN_PAGE_DICTIONARY[LANG.EN];

export const getGoogleLoginBtnDictionary = (
  lang: LANG
): GoogleLoginBtnDictionary =>
  GOOGLE_LOGIN_BTN_DICTIONARY[lang] ?? GOOGLE_LOGIN_BTN_DICTIONARY[LANG.EN];
