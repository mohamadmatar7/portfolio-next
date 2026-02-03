"use client";

import Link from "next/link";
import PageSection from "@/components/PageSection";
import BackgroundAccents from "@/components/BackgroundAccents";
import ArchitectureSection from "@/components/ArchitectureSection";
import InfoCard from "@/components/InfoCard";
import Divider from "@/components/Divider";
import { useI18n } from "@/i18n/i18n";


const stackChips = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "Laravel",
  "Raspberry Pi",
  "Docker",
];

const socials = [
  { label: "GitHub", href: "https://github.com/mohamadmatar7" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohamadm/" },
  { label: "Email", href: "mailto:mohamadsamermatar@gmail.com" },
];

export default function HomePage() {
  const { t } = useI18n();

  return (
    <PageSection>
      {/* background accents */}
      <BackgroundAccents />

      {/* HERO */}
      <div className="px-1 py-2">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              {t.home.availability} • {t.home.locationLine}
            </div>

            <p className="mt-5 text-sm text-neutral-300">{t.home.role}</p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {t.home.title}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-neutral-300 leading-relaxed lg:hidden">
              {t.home.stack}
            </p>

            {/* CTAs + Social */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  {t.home.ctaProjects}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  {t.home.ctaContact}
                </Link>
              </div>

              <span className="text-xs text-neutral-400">{t.home.trustLine}</span>

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-2 max-w-full">
                <span className="text-xs text-neutral-400">{t.home.socialsLabel}:</span>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <InfoCard
              title={t.home.coreStack}
              chips={stackChips}
              rows={[
                { label: t.home.deliverTitle, value: t.home.deliverText },
                { label: t.home.focusTitle, value: t.home.focusText },
              ]}
              footerLeft={t.home.basedIn}
              footerRight={t.home.timezone}
            />
          </div>
        </div>
      </div>

      <Divider className="my-10" />

      {/* Architecture Section */}
      <ArchitectureSection />
    </PageSection>
  );
}
