export interface Navigation {
  label: string;
  href: string;
}

export const FEATURE_NAVIGATION_EN: (Navigation & { desc: string })[] = [
  {
    label: "CV Generator",
    href: "/en/feature/generate-optimize-cv",
    desc: "Generate personalized CV for specific job applications",
  },
  {
    label: "Cover Letter Generator",
    href: "/en/feature/generate-cover-letter",
    desc: "Generate better cover letters with AI",
  },
  {
    label: "CV Scoring",
    href: "/en/feature/scoring-cv",
    desc: "Check the compatibility of your CV with the job applications",
  },
];

export const FEATURE_NAVIGATION_ID: (Navigation & { desc: string })[] = [
  {
    label: "Buat CV",
    href: "/id/feature/generate-optimize-cv",
    desc: "Buat CV yang di personalisasikan untuk lowongan pekerjaan yang spesifik",
  },
  {
    label: "Buat Cover Letter",
    href: "/id/feature/generate-cover-letter",
    desc: "Buat cover letter yang lebih baik dengan AI",
  },
  {
    label: "Skoring CV",
    href: "/id/feature/scoring-cv",
    desc: "Cek kecocokan CV mu dengan pekerjaan yang dilamar",
  },
];

export const ORGANIZATION_NAVIGATION_EN: Navigation[] = [
  {
    label: "About Us",
    href: "/en/about-us",
  },
  {
    label: "Blog",
    href: "/en/blog",
  },
  {
    label: "Our Organization",
    href: "/en/our-organization",
  },
];

export const ORGANIZATION_NAVIGATION_ID: Navigation[] = [
  {
    label: "Tentang Kami",
    href: "/id/about-us",
  },
  {
    label: "Blog",
    href: "/id/blog",
  },
  {
    label: "Organisasi Kami",
    href: "/id/our-organization",
  },
];

export const ACCOUNT_NAVIGATION_EN: Navigation[] = [
  {
    label: "Sign In",
    href: "/en/sign-in",
  },
  {
    label: "Account",
    href: "/en/account",
  },
];

export const ACCOUNT_NAVIGATION_ID: Navigation[] = [
  {
    label: "Masuk",
    href: "/id/sign-in",
  },
  {
    label: "Akun",
    href: "/id/account",
  },
];

export const ACCOUNT_HEADER_NAVIGATION_EN: (Navigation & { desc: string })[] = [
  {
    label: "Account",
    href: "/en/account",
    desc: "Manage your account and preferences",
  },
  {
    label: "Billing",
    href: "/en/account/billing",
    desc: "Manage your billing information",
  },
  {
    label: "Transaction",
    href: "/en/account/transaction",
    desc: "View your transaction history",
  },
];

export const ACCOUNT_HEADER_NAVIGATION_ID: (Navigation & { desc: string })[] = [
  {
    label: "Akun",
    href: "/id/account",
    desc: "Kelola akun dan preferensi Anda",
  },
  {
    label: "Pembayaran",
    href: "/id/account/billing",
    desc: "Kelola informasi pembayaran Anda",
  },
  {
    label: "Transaksi",
    href: "/id/account/transaction",
    desc: "Lihat transaksi lalu Anda",
  },
];
