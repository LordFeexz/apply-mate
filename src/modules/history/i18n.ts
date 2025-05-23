import { LANG } from "@/enums/global";

export interface NoDataDictionary {
  title: string;
  searchedNoData: string;
  noData: string;
  btnText: string;
}

const NO_DATA_DICTIONARY: Record<LANG, NoDataDictionary> = {
  [LANG.EN]: {
    title: "No results found",
    searchedNoData:
      "Try adjusting your search or filters to find what you're looking for.",
    noData: "You haven't generated any documents yet.",
    btnText: "Generate Your First Document",
  },
  [LANG.ID]: {
    title: "Tidak ada hasil yang ditemukan",
    searchedNoData:
      "Coba menyesuaikan pencarian atau filter untuk menemukan apa yang Anda cari.",
    noData: "Anda belum membuat dokumen apapun.",
    btnText: "Buat Dokumen Pertama Anda",
  },
};

export const getNoDataDictionary = (lang: LANG) =>
  NO_DATA_DICTIONARY[lang] ?? NO_DATA_DICTIONARY[LANG.EN];
