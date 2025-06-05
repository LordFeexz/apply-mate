import type { LangProps } from "@/interfaces/component";
import { Construction } from "lucide-react";
import { getUnderDevelopmentDictionary } from "./i18n";

export interface UnderDevelopmentProps extends LangProps {}

export default function UnderDevelopment({ lang }: UnderDevelopmentProps) {
  const { title, subTitle, desc } = getUnderDevelopmentDictionary(lang);
  return (
    <section className="min-h-[50svh] flex justify-center items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <hgroup className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
              <Construction className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              {subTitle}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{desc}</p>
          </hgroup>
        </div>
      </div>
    </section>
  );
}
