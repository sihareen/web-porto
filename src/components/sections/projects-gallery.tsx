"use client";

import Image from "next/image";
import { useState } from "react";
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

function isGitHubUrl(url: string) {
  return /github\.com/i.test(url);
}

function fallbackImage(index: number) {
  const images = [
    "/project-covers/pumma-utews.jpg",
    "/project-covers/microclimate.jpg",
    "/project-covers/ews-indomaker.jpg",
    "/project-covers/ai-rtka.jpg",
  ];
  return images[index % images.length];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [activeProject, setActiveProject] = useState<ProjectCardItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeProjectImages = activeProject?.coverImages ?? [];
  const activeImage = activeProjectImages[activeImageIndex] ?? null;

  function openProject(project: ProjectCardItem) {
    setActiveProject(project);
    setActiveImageIndex(0);
  }

  function closeProject() {
    setActiveProject(null);
    setActiveImageIndex(0);
  }

  function nextImage() {
    if (activeProjectImages.length <= 1) {
      return;
    }

    setActiveImageIndex((prev) => (prev + 1) % activeProjectImages.length);
  }

  function prevImage() {
    if (activeProjectImages.length <= 1) {
      return;
    }

    setActiveImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
  }

  return (
    <>
      <div className="space-y-20">
        {projects.map((project, index) => {
          const coverImage = project.coverImages[0] ?? fallbackImage(index);
          const reversed = index % 2 === 1;

          return (
            <article
              key={`${project.title}-${project.labels.join("-")}`}
              className={`grid gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-12 lg:items-end ${
                reversed ? "" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => openProject(project)}
                className={`group relative block aspect-[16/10] overflow-hidden bg-[var(--image-wash)] text-left lg:col-span-7 ${
                  reversed ? "lg:order-2" : ""
                }`}
                aria-label={`Open ${project.title} case study`}
              >
                <Image
                  src={coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.015]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </button>

              <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")} / {project.labels.join(", ")}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-4xl leading-tight text-[var(--text)] sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">{project.description}</p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {project.techStack.map((stack) => (
                    <li key={`${project.title}-${stack}`} className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent-2)]">
                      {stack}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    className="editorial-link text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]"
                  >
                    Read case study
                  </button>
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:text-[var(--accent)]"
                  >
                    {isGitHubUrl(project.externalUrl) ? <FiGithub aria-hidden /> : <FiExternalLink aria-hidden />}
                    Source
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1d1d]/70 px-4 py-8 backdrop-blur-sm sm:px-6">
          <button type="button" className="absolute inset-0" aria-label="Close popup" onClick={closeProject} />

          <article className="relative z-10 grid w-full max-w-6xl overflow-hidden bg-[var(--surface)] shadow-[0_24px_80px_rgba(29,29,29,0.25)] lg:grid-cols-[1.18fr_0.82fr]">
            <div className="relative min-h-[330px] bg-[var(--image-wash)] lg:min-h-[620px]">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
                    className="object-contain p-5"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />

                  {activeProjectImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        aria-label="Next image"
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>

            <div className="p-7 sm:p-9">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
                {activeProject.labels.join(", ")}
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-4xl leading-tight text-[var(--text)]">
                {activeProject.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-[var(--muted)]">{activeProject.description}</p>

              <ul className="mt-7 grid gap-3 border-y border-[var(--line)] py-6">
                {activeProject.techStack.map((stack) => (
                  <li key={`${activeProject.title}-popup-${stack}`} className="text-xs uppercase tracking-[0.16em] text-[var(--accent-2)]">
                    {stack}
                  </li>
                ))}
              </ul>

              <a
                href={activeProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)] transition hover:text-[var(--accent)]"
              >
                {isGitHubUrl(activeProject.externalUrl) ? <FiGithub aria-hidden /> : <FiExternalLink aria-hidden />}
                Open reference
              </a>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
