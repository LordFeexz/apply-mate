import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import Link from "next/link";
import { memo } from "react";
import {
  FEATURE_CARD_EN,
  FEATURE_CARD_ID,
  PRICING_CARD_EN,
  PRICING_CARD_ID,
  STEP_CARD_EN,
  STEP_CARD_ID,
  TESTIMONIAL_CARDS,
} from "./constant";
import FeatureCard from "./components/feature-card";
import StepCard from "./components/step-card";
import PricingCard from "./components/pricing-card";
import TestimonialCard from "./components/testimonial-card";
import Faq from "./components/faq";
import { getDictionary } from "./i18n";

export interface LandingPageProps extends LangProps {}

function LandingPage({ lang }: LandingPageProps) {
  const {
    badge,
    title,
    description,
    getStarted,
    learnMore,
    keyFeatures,
    keyTitle,
    keyDesc,
    howItWorks,
    howItWorksTitle,
    howItWorksDesc,
    successStory,
    successStoryTitle,
    successStoryDesc,
    pricing,
    pricingTitle,
    pricingDesc,
    ctaTitle,
    ctaDesc,
    docs,
  } = getDictionary(lang);
  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        id="app-landing"
      >
        <div className="absolute rounded-t-lg inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                {badge}
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href={`/${lang}/sign-up`}>{getStarted}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href={`/${lang}/about-us`}>{learnMore}</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur-lg opacity-30" />
            </div>
          </div>
        </div>
      </section>

      <section id="key-features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              {keyFeatures}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{keyTitle}</h2>
            <p className="text-lg text-muted-foreground">{keyDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(lang === LANG.ID ? FEATURE_CARD_ID : FEATURE_CARD_EN).map(
              (el) => (
                <FeatureCard key={el.title} {...el} />
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              {howItWorks}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {howItWorksTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{howItWorksDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(lang === LANG.ID ? STEP_CARD_ID : STEP_CARD_EN)
              .sort((a, b) => a.number - b.number)
              .map((el) => (
                <StepCard key={el.title} {...el} />
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <hgroup className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              {successStory}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {successStoryTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{successStoryDesc}</p>
          </hgroup>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIAL_CARDS.map((el) => (
              <TestimonialCard key={el.author} {...el} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              {pricing}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {pricingTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{pricingTitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(lang === LANG.ID ? PRICING_CARD_ID : PRICING_CARD_EN).map(
              (el) => (
                <PricingCard key={el.title} {...el} lang={lang} />
              )
            )}
          </div>
        </div>
      </section>

      <section className="max-w-5xl w-full mx-auto">
        <Faq lang={lang} />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-50"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {ctaTitle}
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/80">
                {ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full"
                >
                  <Link href={`/${lang}/sign-in`}>{getStarted}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href={`/${lang}/docs`}>{docs}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(LandingPage);
