"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [activeProject, setActiveProject] = useState<ProjectCardItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const activeProjectImages = activeProject?.coverImages ?? [];
  const activeImage = activeProjectImages[activeImageIndex] ?? null;

  // Calculate visible projects (4 on desktop, 2 on tablet, 1 on mobile)
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);
  const canScrollLeft = carouselIndex > 0;
  const canScrollRight = carouselIndex < maxIndex;

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

  function scrollCarouselLeft() {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  }

  function scrollCarouselRight() {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  }

  const ProjectCard = ({ project }: { project: ProjectCardItem }) => {
    const coverImage = project.coverImages[0] ?? null;

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
        className="group flex-shrink-0 cursor-pointer overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition-all duration-240 hover:border-[var(--accent)] hover:shadow-lg"
        style={{ width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})` }}
      >
        <div className="relative h-[320px] overflow-hidden border-b border-[var(--border)] bg-[var(--border-subtle)]">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-320 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm tracking-wide text-[var(--text-secondary)]">
              {project.labels[0] ?? "Project"}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-6 h-[180px]">
          <div>
            <h3 className="text-lg font-bold leading-tight text-[var(--primary)] uppercase line-clamp-2">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.5] text-[var(--text-secondary)] line-clamp-2">
              {project.description}
            </p>
          </div>
          <p className="mt-4 text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
            {project.techStack.slice(0, 3).join(" · ")}
          </p>
        </div>
      </article>
    );
  };

  return (
    <>
      <div className="space-y-8">
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={scrollCarouselLeft}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 bg-[var(--primary)] p-3 text-white shadow-lg transition-all hover:bg-[var(--accent)]"
              aria-label="Previous projects"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={scrollCarouselRight}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 bg-[var(--primary)] p-3 text-white shadow-lg transition-all hover:bg-[var(--accent)]"
              aria-label="Next projects"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${carouselIndex * (100 / visibleCount + 2.4)}%)` }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-4">
          <a
            href="#projects-all"
            className="inline-flex items-center border-2 border-[var(--primary)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white"
          >
            View All Projects
          </a>
        </div>

        {/* Carousel Indicators */}
        {projects.length > visibleCount && (
          <div className="flex justify-center gap-2 pt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`h-1.5 transition-all ${
                  carouselIndex === index
                    ? "w-8 bg-[var(--accent)]"
                    : "w-1.5 bg-[var(--border)] hover:bg-[var(--secondary)]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/97 px-4 py-8 backdrop-blur-xl sm:px-6">
          <button type="button" className="absolute inset-0" aria-label="Close popup" onClick={closeProject} />

          <article className="relative z-10 grid w-full max-w-6xl overflow-hidden border border-[var(--border)] bg-white shadow-2xl lg:grid-cols-[1.3fr_1fr]">
            <div className="relative min-h-[420px] border-b border-[var(--border)] bg-[var(--background)] lg:min-h-[640px] lg:border-b-0 lg:border-r">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-white text-[var(--primary)] shadow-sm transition-all duration-240 hover:border-[var(--primary)]"
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
                        className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[var(--border)] bg-white text-[var(--primary)] shadow-sm transition-all duration-240 hover:bg-[var(--primary)] hover:text-white"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[var(--border)] bg-white text-[var(--primary)] shadow-sm transition-all duration-240 hover:bg-[var(--primary)] hover:text-white"
                        aria-label="Next image"
                      >
                        <FiChevronRight />
                      </button>
                      
                      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 border border-[var(--border)] bg-white px-4 py-2 shadow-sm">
                        {activeProjectImages.map((_, index) => (
                          <button
                            type="button"
                            key={`${activeProject.title}-dot-${index}`}
                            onClick={() => setActiveImageIndex(index)}
                            className={`h-2 w-2 transition-all ${
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
              <h3 className="text-3xl font-bold uppercase text-[var(--primary)]">{activeProject.title}</h3>
              <p className="mt-6 text-base leading-[1.8] text-[var(--text-secondary)]">{activeProject.description}</p>

              <p className="mt-6 text-sm font-mono leading-relaxed text-[var(--accent)]">
                {activeProject.techStack.join(" · ")}
              </p>

              <a
                href={activeProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-[var(--primary)] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-240 hover:bg-[var(--accent)]"
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
