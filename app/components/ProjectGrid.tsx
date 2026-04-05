"use client";

import ProjectCard from "@/app/components/ProjectCard";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  projectCopy,
  type ProjectCaseStudy,
  type ProjectFilter,
} from "@/app/data/projects";

interface ProjectGridProps {
  filter: ProjectFilter;
}

export default function ProjectGrid({ filter }: ProjectGridProps) {
  const { dict, language } = useLanguage();
  const projects = projectCopy[language].items as ProjectCaseStudy[];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400 sm:py-16">
          <svg
            className="mb-4 h-14 w-14 text-slate-400 dark:text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293L6.586 13H4"
            />
          </svg>
          <p className="text-lg font-semibold">{dict.projects.empty_title}</p>
          <p className="mt-1 text-sm">{dict.projects.empty_description}</p>
        </div>
      )}
    </div>
  );
}

export type { ProjectFilter };
