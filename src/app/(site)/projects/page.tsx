"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import PageSection from "@/components/PageSection";
import PageHeader from "@/components/PageHeader";
import Divider from "@/components/Divider";
import BackgroundAccents from "@/components/BackgroundAccents";
import { useI18n } from "@/i18n/i18n";

const typeLabel = {
  en: { School: "School", Stage: "Internship", Personal: "Personal" },
  nl: { School: "School", Stage: "Stage", Personal: "Persoonlijk" },
} as const;

export default function ProjectsPage() {
  const { lang, t } = useI18n();

  return (
    <PageSection>
      {/* background accents */}
      <BackgroundAccents />

      {/* Header (clean + pro) */}
      <PageHeader
        title={t.projectsPage.heading}
        subtitle={t.projectsPage.subtitle}
        tags={[
          `${projects.length} ${t.projectsPage.countLabel}`,
          t.projectsPage.caseStudiesTag,
        ]}
      />

      <Divider className="my-12" />

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group block rounded-2xl border border-white/10 bg-white/5 p-6 transition
                       hover:bg-white/[0.07] hover:border-white/15
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                       focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white/90 transition group-hover:text-white">
                    {p.title[lang]}
                  </h3>

                  {/* type badge */}
                  <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-semibold text-neutral-200">
                    {typeLabel[lang][p.type]}
                  </span>
                </div>

                <p className="mt-2 text-sm text-neutral-300">
                  {p.summary[lang]}
                </p>

                {(p.links?.repo || p.links?.live) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.links?.repo && (
                      <a
                        href={p.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white"
                      >
                        {t.projectsPage.repo}
                        <span aria-hidden className="opacity-70">↗</span>
                      </a>
                    )}
                    {p.links?.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white"
                      >
                        {t.projectsPage.live}
                        <span aria-hidden className="opacity-70">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* arrow */}
              <span className="shrink-0 text-neutral-500 transition group-hover:translate-x-0.5 group-hover:text-neutral-300">
                →
              </span>
            </div>

            {/* Tech chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
