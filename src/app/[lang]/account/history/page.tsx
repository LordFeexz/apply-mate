import type { PageProps } from "@/interfaces/global";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import type { Metadata } from "next";
import { cache } from "react";
import { Result } from "@/models";
import { HISTORY_PAGINATION_SCHEMA } from "@/modules/shared/schema";
import { redirect } from "next/navigation";
import { getServerSideSession } from "@/libs/session";
import HistoryPage from "@/modules/history";
import { Op, type WhereOptions } from "sequelize";
import type { ResultAttributes } from "@/models/result";

const fetcher = cache(
  async (
    user_id: string,
    data: {
      page: number;
      limit: number;
      type?: string;
      sort?: string;
      q?: string;
    }
  ) => {
    let where: WhereOptions<ResultAttributes> = { user_id };
    if (data.type) where = { ...where, feature: data.type };
    if (data?.q)
      where = {
        ...where,
        [Op.or]: [{ feature: { [Op.like]: `%${data.q}%` } }],
      }; //todo

    const { rows = [], count = 0 } = await Result.findAndCountAll({
      where: { user_id },
      offset: (data.page - 1) * data.limit,
      limit: data.limit,
      order: [["created_at", data?.sort ?? "DESC"]],
      raw: true,
      attributes: ["id", "user_id", "feature", "created_at", "updated_at"],
    });
    return { data: rows, totalPage: Math.ceil(count / data.limit), count };
  }
);

export default async function Page({
  params,
  searchParams: rawSearchParams,
}: PageProps) {
  const [{ lang }, searchParams] = await Promise.all([params, rawSearchParams]);
  const { success, data } =
    await HISTORY_PAGINATION_SCHEMA.safeParseAsync(searchParams);
  if (!success || !data.page || !data.limit)
    redirect(
      `/${lang}/account/history?${new URLSearchParams({
        page: "1",
        limit: "9",
      }).toString()}`
    );

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const histories = fetcher(session.user.id, data);

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.HISTORY}>
      <HistoryPage histories={histories} lang={lang} {...data} />
    </Account>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { DOMAIN } = process.env;

  const title = lang === LANG.ID ? "Riwayat Anda" : "Your History";
  const description =
    lang === LANG.ID
      ? "Riwayat penggunaan fitur di Apply Mate"
      : "Your usage history on Apply Mate";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/account/history`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
    },
    keywords: ["history", "apply mate history", "history list"],
    applicationName: "Apply Mate",
  };
}
