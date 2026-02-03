import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectCaseStudyClient from "./ProjectCaseStudyClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectCaseStudyClient slug={slug} />;
}
