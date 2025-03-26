import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import PointSection from "../shared/point-section";
import { LANG } from "@/enums/global";
import { PRICING_CARD_EN, PRICING_CARD_ID } from "../landing/constant";
import PricingCard from "../landing/components/pricing-card";

export interface BillingPageProps extends LangProps {}

function BillingPage({ lang }: BillingPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription & Billing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-16">
        <PointSection lang={lang} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-7xl">
          {(lang === LANG.ID ? PRICING_CARD_ID : PRICING_CARD_EN).map((el) => (
            <PricingCard key={el.title} {...el} lang={lang} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(BillingPage);
