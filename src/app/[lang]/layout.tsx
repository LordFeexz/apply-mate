import Root from "@/components/layouts/root";
import { LANG } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import type { Metadata } from "next";
import AppHeader from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import type { ChildrenProps } from "@/interfaces/component";

export interface RootLayoutProps
  extends ChildrenProps,
    Omit<PageProps, "searchParams"> {}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: {
      default: "Apply Mate",
      template:
        lang === LANG.ID
          ? `%s | Optimalkan Pencarian Pekerjaan mu dengan Apply Mate`
          : `%s | Optimize Your Job Search with Apply Mate`,
    },
    description:
      lang === LANG.ID
        ? "Optimalkan pencarian pekerjaan Anda dengan AI"
        : "Optimize your job applications with our AI-powered tool",
    authors: [
      {
        name: "Ananda Fiqri",
        url: "https://ananda-fiqri-personal-website.vercel.app",
      },
    ],
    applicationName: "Apply Mate",
    alternates: {
      canonical: `${process.env.DOMAIN}/${lang}`,
      languages: {
        "en-US": `${process.env.DOMAIN}/en`,
        "id-ID": `${process.env.DOMAIN}/id`,
      },
    },
    robots: {
      index: true,
    },
    publisher: "Apply Mate",
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  return (
    <Root lang={lang}>
      <div className="flex flex-col min-h-screen">
        <AppHeader lang={lang} />
        <main
          id="main-content"
          className="flex-1 py-12 px-4 relative overflow-hidden"
        >
          {children}
        </main>
        <Footer lang={lang} />
      </div>
    </Root>
  );
}
