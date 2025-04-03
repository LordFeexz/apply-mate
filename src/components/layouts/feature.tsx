import type { ChildrenProps, LangProps } from "@/interfaces/component";
import { memo } from "react";
import FeatureTab from "./feature-tab";
import type { FEATURE } from "@/enums/global";
import { getFeatureDictionary } from "./i18n";

export interface FeatureLayoutProps extends ChildrenProps, LangProps {
  feature: FEATURE | "";
}

function FeatureLayout({ children, lang, feature }: FeatureLayoutProps) {
  const { desc } = getFeatureDictionary(lang);
  return (
    <section className="container mx-auto max-w-7xl px-4 mt-8" id="app-feature">
      <hgroup className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Apply Mate</h2>
        <p className="text-xl text-muted-foreground">{desc}</p>
      </hgroup>

      <div className="relative">
        <div
          role="banner"
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl"
        />
        <div className="relative bg-background/80 backdrop-blur-sm rounded-3xl border shadow-lg p-6">
          <FeatureTab feature={feature} lang={lang}>
            {children}
          </FeatureTab>
        </div>
      </div>
    </section>
  );
}

export default memo(FeatureLayout);
