import { notFound } from "next/navigation";
import ProjectCaseStudyPage from "@/app/components/projects/ProjectCaseStudyPage";
import { projectCopy } from "@/app/data/projects";

type ProjectCaseStudyRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectCopy.en.items.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudyRoute({
  params,
}: ProjectCaseStudyRouteProps) {
  const { slug } = await params;
  const exists = projectCopy.en.items.some((item) => item.slug === slug);

  if (!exists) {
    notFound();
  }

  return <ProjectCaseStudyPage slug={slug} />;
}
