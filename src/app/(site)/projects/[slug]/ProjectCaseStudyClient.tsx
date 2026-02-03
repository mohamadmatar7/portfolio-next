"use client";

import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { architectures } from "@/data/architectures";
import PageSection from "@/components/PageSection";
import Architecture3D from "@/components/Architecture3D";
import PageHeader from "@/components/PageHeader";
import InfoCard from "@/components/InfoCard";
import Divider from "@/components/Divider";
import BackgroundAccents from "@/components/BackgroundAccents";
import { useI18n } from "@/i18n/i18n";

export default function ProjectCaseStudyClient({ slug }: { slug: string }) {
  const { lang } = useI18n();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const architecture =
    slug === "roomie-backend"
      ? architectures.roomie
      : slug === "sweetcontrol"
      ? architectures.sweetcontrol
      : slug === "nexted"
      ? architectures.nexted
      : null;

  return (
    <PageSection>
      {/* background accents */}
      <BackgroundAccents />

      {/* Header (consistent with other pages) */}
      <PageHeader
        as="h1"
        title={project.title[lang]}
        subtitle={project.summary[lang]}
        subtitleClassName="mt-3 max-w-2xl"
        right={
          (project.links?.repo || project.links?.live) ? (
            <div className="flex flex-wrap gap-2">
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  GitHub <span aria-hidden className="opacity-70">↗</span>
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  Live <span aria-hidden className="opacity-70">↗</span>
                </a>
              )}
            </div>
          ) : null
        }
      />

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200"
          >
            {t}
          </span>
        ))}
      </div>

      <Divider />

      {/* Architecture */}
      {architecture && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {lang === "en" ? "System Architecture" : "Systeemarchitectuur"}
          </h2>

            <Architecture3D arch={architecture} />
        </div>
      )}

      {/* My Role */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {lang === "en" ? "My Role" : "Mijn rol"}
        </h2>

        <InfoCard>
          <ul className="max-w-3xl space-y-2 list-disc list-inside text-neutral-300">
            {slug === "roomie-backend" && (
              <>
                <li>
                  {lang === "en"
                    ? "Designed and implemented the full backend architecture"
                    : "Ontwierp en implementeerde de volledige backendarchitectuur"}
                </li>
                <li>
                  {lang === "en"
                    ? "Integrated hardware, sensors and audio pipelines"
                    : "Integreerde hardware, sensoren en audiopipelines"}
                </li>
                <li>
                  {lang === "en"
                    ? "Focused on privacy-first, local-first system design"
                    : "Focus op privacy-first en local-first systeemontwerp"}
                </li>
              </>
            )}

            {slug === "sweetcontrol" && (
              <>
                <li>
                  {lang === "en"
                    ? "Built the realtime control flow (queue + game state)"
                    : "Bouwde de realtime control flow (wachtrij + game state)"}
                </li>
                <li>
                  {lang === "en"
                    ? "Integrated payments and hardware control"
                    : "Integreerde betalingen en hardware-aansturing"}
                </li>
                <li>
                  {lang === "en"
                    ? "Connected vision detections with gameplay logic"
                    : "Verbond vision-detecties met de gameplay-logica"}
                </li>
              </>
            )}

            {slug === "nexted" && (
              <>
                <li>
                  {lang === "en"
                    ? "Developed both the frontend and backend of the school management platform"
                    : "Ontwikkelde zowel de frontend als de backend van het schoolmanagementplatform"}
                </li>
                <li>
                  {lang === "en"
                    ? "Implemented role-based authentication and authorization (Admin, Principal, Instructor, Teacher, Student)"
                    : "Implementeerde rolgebaseerde authenticatie en autorisatie (Admin, Principal, Instructor, Teacher, Student)"}
                </li>
                <li>
                  {lang === "en"
                    ? "Designed and built core modules such as students, teachers, courses and lessons"
                    : "Ontwierp en bouwde kernmodules zoals studenten, leerkrachten, vakken en lessen"}
                </li>
                <li>
                  {lang === "en"
                    ? "Handled database design, validation logic and REST-style controllers"
                    : "Beheerde databasedesign, validatielogica en REST-achtige controllers"}
                </li>
              </>
            )}
          </ul>
        </InfoCard>
      </div>

      {/* Learnings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {lang === "en" ? "Key Learnings" : "Belangrijkste inzichten"}
        </h2>

        <InfoCard>
          <p className="max-w-3xl text-neutral-300 leading-relaxed">
            {lang === "en"
              ? "This project strengthened my understanding of system architecture, realtime communication and combining software with physical hardware."
              : "Dit project versterkte mijn inzicht in systeemarchitectuur, realtime communicatie en het combineren van software met fysieke hardware."}
          </p>
        </InfoCard>
      </div>

    </PageSection>
  );
}
