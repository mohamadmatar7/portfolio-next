"use client";

import PageSection from "@/components/PageSection";
import PageHeader from "@/components/PageHeader";
import InfoCard from "@/components/InfoCard";
import Divider from "@/components/Divider";
import BackgroundAccents from "@/components/BackgroundAccents";
import { useI18n } from "@/i18n/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  const cards = [
    { title: t.about.cards.frontend.title, items: t.about.cards.frontend.items },
    { title: t.about.cards.backend.title, items: t.about.cards.backend.items },
    { title: t.about.cards.hardware.title, items: t.about.cards.hardware.items },
  ];

  return (
    <PageSection>
      {/* background accents */}
      <BackgroundAccents />

      {/* Header */}
      <PageHeader
        title={t.about.heading}
        subtitle={t.about.intro}
        tags={[t.about.tagFullstack, t.about.tagInteractive, t.about.tagHardware]}
      />

      {/* Divider */}
      <Divider className="my-12" />

      {/* Skills Snapshot */}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            titleSize="md"
            items={card.items}
          />
        ))}
      </div>
    </PageSection>
  );
}
