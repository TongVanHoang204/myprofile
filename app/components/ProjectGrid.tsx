"use client";

import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/app/context/LanguageContext";

export type ProjectFilter = "all" | "website" | "backend" | "mobile";

type Project = {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: Exclude<ProjectFilter, "all">;
};

interface ProjectGridProps {
  filter: ProjectFilter;
}

export default function ProjectGrid({ filter }: ProjectGridProps) {
  const { dict, language } = useLanguage();
  const baseProjects = dict.projects.items as Project[];
  const [webProject, apiProject, mobileProject] = baseProjects;

  const dashboardProject: Project =
    language === "vi"
      ? {
          title: "Dashboard quản trị FeShenShop",
          description:
            "Giao diện dashboard theo dõi doanh thu, đơn hàng, sản phẩm và hoạt động khách hàng cho hệ thống bán hàng FeShenShop.",
          tags: ["Dashboard UI", "Admin Panel", "Analytics"],
          thumbnail: "/projects/feshenshop-dashboard.png",
          category: "website",
        }
      : {
          title: "FeShenShop Admin Dashboard",
          description:
            "An admin dashboard for tracking revenue, orders, products, and customer activity inside FeShenShop.",
          tags: ["Dashboard UI", "Admin Panel", "Analytics"],
          thumbnail: "/projects/feshenshop-dashboard.png",
          category: "website",
        };

  const projects = [
    webProject && {
      ...webProject,
      thumbnail: "/projects/feshenshop-web.png",
    },
    apiProject && {
      ...apiProject,
      thumbnail: "/projects/feshenshop-api.png",
    },
    dashboardProject,
    mobileProject && {
      ...mobileProject,
      thumbnail: "/projects/feshenshop-mobile.png",
    },
  ].filter(Boolean) as Project[];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
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
