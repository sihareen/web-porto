"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";

export type ProjectCategory = "IoT" | "AI" | "Data";

export type ProjectCardItem = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImages: string[];
  labels: ProjectCategory[];
};

type ProjectsGalleryProps = {
  projects: ProjectCardItem[];
};

type CapabilityDomain = "embedded" | "monitoring" | "ai";

function categorizeProject(project: ProjectCardItem): CapabilityDomain {
  const title = project.title.toLowerCase();
  const desc = project.description.toLowerCase();
  const tech = project.techStack.join(" ").toLowerCase();
  const combined = `${title} ${desc} ${tech}`;

  if (/voip|priscop|raspbot|sbc|vending|embedded/.test(combined)) {
    return "embedded";
  }
  
  if (/yolo|tensorflow|ai|classification|computer vision|machine learning/.test(combined)) {
    return "ai";
  }
  
  return "monitoring";
}

function isGitHubUrl(url: string) {
  return /github\.com/i.test(url);
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [activeProject, setActiveProject] = useState<ProjectCardItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categorizedProjects = useMemo(() => {
    const embedded: ProjectCardItem[] = [];
    const monitoring: ProjectCardItem[] = [];
    const ai: ProjectCardItem[] = [];

    projects.forEach((project) => {
      const category = categorizeProject(project);
      if (category === "embedded") embedded.push(project);
      else if (category === "ai") ai.push(project);
      else monitoring.push(project);
    });

    return { embedded, monitoring, ai };
  }, [projects]);

  const activeProjectImages = activeProject?.coverImages ?? [];
  const activeImage = activeProjectImages[activeImageIndex] ?? null;

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProject(null);
      }

      if (activeProjectImages.length <= 1) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % activeProjectImages.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeProject, activeProjectImages.length]);

  function openProject(project: ProjectCardItem) {
    setActiveProject(project);
    setActiveImageIndex(0);
  }

  function closeProject() {
    setActiveProject(null);
    setActiveImageIndex(0);
  }

  function nextImage() {
    if (activeProjectImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % activeProjectImages.length);
  }

  function prevImage() {
    if (activeProjectImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
  }

  const ProjectCard = ({ project, featured = false }: { project: ProjectCardItem; featured?: boolean }) => {
    const coverImage = project.coverImages[0] ?? null;
    const cardHeight = featured ? "h-[500px]" : "h-[380px]";

    return (
      <article
        role="button"
        tabIndex={0}
        onClick={() => openProject(project)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject(project);
          }
        }}
        className={`group cursor-pointer overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)] transition-all duration-[320ms] hover:border-[var(--accent)] hover:shadow-[0_16px_64px_rgba(29,29,29,0.15)] ${cardHeight}`}
      >
        <div className={`relative overflow-hidden border-b border-[var(--border)] bg-[var(--border-subtle)] ${featured ? "h-[60%]" : "h-[55%]"}`}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm tracking-wide text-[var(--text-secondary)]">
              {project.labels[0] ?? "Project"}
            </div>
          )}
        </div>

        <div className="flex h-[40%] flex-col justify-between p-6">
          <div>
            <h3 className={`font-semibold leading-tight text-[var(--text-primary)] ${featured ? "text-2xl" : "text-xl"}`}>
              {project.title}
            </h3>
            <p className={`mt-3 leading-[1.6] text-[var(--text-secondary)] line-clamp-2 ${featured ? "text-base" : "text-sm"}`}>
              {project.description}
            </p>
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            {project.techStack.slice(0, 4).join(" · ")}
          </p>
        </div>
      </article>
    );
  };

  return (
    <>
      <div className="space-y-20">
        {categorizedProjects.embedded.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Embedded Systems & Edge Devices
              </h3>
              <div className="section-divider" />
            </div>
            
            <div className="space-y-6">
              {categorizedProjects.embedded[0] && (
                <ProjectCard project={categorizedProjects.embedded[0]} featured />
              )}
              
              {categorizedProjects.embedded.length > 1 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {categorizedProjects.embedded.slice(1).map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {categorizedProjects.monitoring.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Intelligent Monitoring Systems
              </h3>
              <div className="section-divider" />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {categorizedProjects.monitoring.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {categorizedProjects.ai.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Artificial Intelligence
              </h3>
              <div className="section-divider" />
            </div>
            
            <div className="space-y-6">
              {categorizedProjects.ai[0] && (
                <ProjectCard project={categorizedProjects.ai[0]} featured />
              )}
              
              {categorizedProjects.ai.length > 1 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {categorizedProjects.ai.slice(1).map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/97 px-4 py-8 backdrop-blur-xl sm:px-6">
          <button type="button" className="absolute inset-0" aria-label="Close popup" onClick={closeProject} />

          <article className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-sm border border-[var(--border)] bg-white shadow-[0_24px_80px_rgba(29,29,29,0.25)] lg:grid-cols-[1.3fr_1fr]">
            <div className="relative min-h-[420px] border-b border-[var(--border)] bg-[var(--background)] lg:min-h-[640px] lg:border-b-0 lg:border-r">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border)] bg-white text-[var(--text-primary)] shadow-sm transition-all duration-280 hover:border-[var(--text-primary)]"
                aria-label="Close project popup"
              >
                <FiX />
              </button>

              {activeImage ? (
                <>
                  <Image
                    src={activeImage}
                    alt={`${activeProject.title} preview ${activeImageIndex + 1}`}
                    fill
                    className="object-contain p-12"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />

                  {activeProjectImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-[var(--border)] bg-white text-[var(--text-primary)] shadow-sm transition-all duration-280 hover:bg-[var(--text-primary)] hover:text-white"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-[var(--border)] bg-white text-[var(--text-primary)] shadow-sm transition-all duration-280 hover:bg-[var(--text-primary)] hover:text-white"
                        aria-label="Next image"
                      >
                        <FiChevronRight />
                      </button>
                      
                      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-sm border border-[var(--border)] bg-white px-4 py-2 shadow-sm">
                        {activeProjectImages.map((_, index) => (
                          <button
                            type="button"
                            key={`${activeProject.title}-dot-${index}`}
                            onClick={() => setActiveImageIndex(index)}
                            className={`h-2 w-2 rounded-full transition-all ${
                              activeImageIndex === index ? "w-6 bg-[var(--accent)]" : "bg-[var(--border)]"
                            }`}
                            aria-label={`Show image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm tracking-wide text-[var(--text-secondary)]">
                  No Image Preview
                </div>
              )}
            </div>

            <div className="p-12 sm:p-14">
              <h3 className="text-3xl font-semibold text-[var(--text-primary)]">{activeProject.title}</h3>
              <p className="mt-6 text-base leading-[1.8] text-[var(--text-secondary)]">{activeProject.description}</p>

              <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeProject.techStack.join(" · ")}
              </p>

              <a
                href={activeProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[var(--text-primary)] px-7 py-3.5 text-sm font-medium text-white transition-all duration-280 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(29,29,29,0.2)]"
              >
                {isGitHubUrl(activeProject.externalUrl) ? <FiGithub aria-hidden /> : <FiExternalLink aria-hidden />}
                View Project
              </a>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
