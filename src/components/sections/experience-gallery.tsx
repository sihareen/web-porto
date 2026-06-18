"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

type ExperienceCardItem = {
  period: string;
  title: string;
  company: string | null;
  description: string;
  tags: string[];
  category: string;
};

type ExperienceGalleryProps = {
  items: ExperienceCardItem[];
};

type Phase = {
  label: string;
  color: string;
};

function determinePhase(period: string, category: string): Phase {
  if (period.includes("2025") || period.includes("2026")) {
    return { label: "DEPLOYMENT & INTEGRATION", color: "var(--accent)" };
  }
  if (period.includes("2023") || period.includes("2024")) {
    if (category === "EDUCATION") {
      return { label: "ARTIFICIAL INTELLIGENCE", color: "var(--accent)" };
    }
    return { label: "SYSTEMS DEVELOPMENT", color: "var(--accent)" };
  }
  if (category === "EDUCATION") {
    return { label: "FOUNDATION", color: "var(--accent)" };
  }
  return { label: "EARLY DEVELOPMENT", color: "var(--accent)" };
}

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  const [activeItem, setActiveItem] = useState<ExperienceCardItem | null>(null);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeItem]);

  return (
    <>
      <div className="space-y-16">
        {items.map((item, index) => {
          const phase = determinePhase(item.period, item.category);
          
          return (
            <article
              key={`${item.period}-${item.title}`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveItem(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveItem(item);
                }
              }}
              className="group cursor-pointer"
              style={{
                animation: `slide-up-stagger 420ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 80}ms backwards`
              }}
            >
              <div className="flex items-center gap-6 mb-6">
                <span className="text-sm font-semibold tabular-nums text-[var(--accent)]">
                  {item.period}
                </span>
                <div className="flex items-center gap-4">
                  <div className="h-2.5 w-2.5 bg-[var(--accent)]" />
                  <div className="h-px flex-1 w-32 bg-[var(--border)]" />
                </div>
              </div>
              
              <div className="pl-0 sm:pl-16">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent)] opacity-80">
                    {phase.label}
                  </p>
                </div>
                
                <div className="engineering-card p-8 transition-transform duration-240 hover:translate-x-1">
                  <h3 className="text-2xl font-bold text-[var(--primary)] uppercase tracking-tight">{item.title}</h3>
                  {item.company && (
                    <p className="mt-2 text-base font-medium text-[var(--secondary)]">{item.company}</p>
                  )}
                  <p className="mt-5 text-base leading-[1.6] text-[var(--text-secondary)]">{item.description}</p>
                  
                  <div className="mt-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                      {item.tags.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/97 px-4 py-8 backdrop-blur-xl sm:px-6">
          <button type="button" className="absolute inset-0" aria-label="Close popup" onClick={() => setActiveItem(null)} />

          <article className="relative z-10 w-full max-w-2xl rounded-sm border border-[var(--border)] bg-white p-10 shadow-[0_24px_80px_rgba(29,29,29,0.25)] sm:p-12">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border)] bg-white text-[var(--text-primary)] shadow-sm transition-all duration-280 hover:border-[var(--text-primary)]"
              aria-label="Close details"
            >
              <FiX />
            </button>

            <p className="text-sm font-semibold tabular-nums text-[var(--accent)]">{activeItem.period}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {determinePhase(activeItem.period, activeItem.category).label}
            </p>
            
            <h3 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">{activeItem.title}</h3>
            {activeItem.company && (
              <p className="mt-2 text-lg text-[var(--text-secondary)]">{activeItem.company}</p>
            )}
            <p className="mt-6 text-base leading-[1.8] text-[var(--text-secondary)]">{activeItem.description}</p>

            <div className="mt-6">
              <p className="text-sm text-[var(--text-secondary)]">
                {activeItem.tags.join(" · ")}
              </p>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
