"use client";

import { useState } from "react";
import { FiBookOpen, FiBriefcase } from "react-icons/fi";

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

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Create rows of 4 items (all left-to-right)
  const rows: ExperienceCardItem[][] = [];
  for (let i = 0; i < items.length; i += 4) {
    const row = items.slice(i, i + 4);
    rows.push(row);
  }

  return (
    <div className="space-y-6">
      {rows.map((row, rowIndex) => {
        const startIndex = rowIndex * 4;

        return (
          <div key={rowIndex}>
            {/* Desktop: Horizontal Roadmap */}
            <div className="hidden md:block">
              <div className="relative grid grid-cols-4 gap-4">
                {row.map((item, colIndex) => {
                  const actualIndex = startIndex + colIndex;
                  const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
                  const isLastInRow = colIndex === row.length - 1;
                  const isHovered = hoveredIndex === actualIndex;

                  return (
                    <div key={actualIndex} className="relative">
                      {/* Compact Card */}
                      <article 
                        className="group relative border-2 border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-240 hover:border-[var(--accent)] hover:shadow-md cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(actualIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Milestone Number & Icon */}
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-3xl font-black font-mono text-[var(--accent)]">
                            {milestoneNumber}
                          </span>
                          {item.category === "EDUCATION" ? (
                            <FiBookOpen className="h-5 w-5 text-[var(--accent)]" />
                          ) : (
                            <FiBriefcase className="h-5 w-5 text-[var(--accent)]" />
                          )}
                        </div>

                        {/* Role */}
                        <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-2 line-clamp-1">
                          {item.title}
                        </h3>

                        {/* Organization */}
                        {item.company && (
                          <p className="text-xs font-medium text-[var(--secondary)] mb-2 line-clamp-1">
                            {item.company}
                          </p>
                        )}

                        {/* Year */}
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                          {item.period}
                        </p>

                        {/* Hover Overlay - Expanded Details */}
                        {isHovered && (
                          <div className="absolute top-0 left-0 right-0 bg-[var(--surface)] border-2 border-[var(--accent)] p-5 shadow-2xl z-20 min-w-[320px]">
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-2xl font-black font-mono text-[var(--accent)]">
                                {milestoneNumber}
                              </span>
                              {item.category === "EDUCATION" ? (
                                <FiBookOpen className="h-5 w-5 text-[var(--accent)]" />
                              ) : (
                                <FiBriefcase className="h-5 w-5 text-[var(--accent)]" />
                              )}
                            </div>

                            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                              {item.period}
                            </p>

                            <h3 className="text-base font-bold uppercase tracking-tight text-[var(--primary)] mb-2">
                              {item.title}
                            </h3>

                            {item.company && (
                              <p className="text-sm font-medium text-[var(--secondary)] mb-4">
                                {item.company}
                              </p>
                            )}

                            <p className="text-sm leading-[1.6] text-[var(--text-secondary)] mb-4">
                              {item.description}
                            </p>

                            <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                              {item.tags.join(" · ")}
                            </p>
                          </div>
                        )}
                      </article>

                      {/* Horizontal Dashed Connector (except last in row) */}
                      {!isLastInRow && (
                        <div className="absolute top-1/2 -right-2 z-10 flex items-center -translate-y-1/2">
                          <div className="w-8 h-px border-t border-dashed border-[var(--border)] opacity-60" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Vertical List */}
            <div className="md:hidden space-y-3">
              {row.map((item, colIndex) => {
                const actualIndex = startIndex + colIndex;
                const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
                const isHovered = hoveredIndex === actualIndex;

                return (
                  <article 
                    key={actualIndex}
                    className="border-2 border-[var(--border)] bg-[var(--surface)] p-4"
                    onClick={() => setHoveredIndex(isHovered ? null : actualIndex)}
                  >
                    {/* Milestone Number & Icon */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-3xl font-black font-mono text-[var(--accent)]">
                        {milestoneNumber}
                      </span>
                      {item.category === "EDUCATION" ? (
                        <FiBookOpen className="h-5 w-5 text-[var(--accent)]" />
                      ) : (
                        <FiBriefcase className="h-5 w-5 text-[var(--accent)]" />
                      )}
                    </div>

                    {/* Role */}
                    <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-2">
                      {item.title}
                    </h3>

                    {/* Organization */}
                    {item.company && (
                      <p className="text-xs font-medium text-[var(--secondary)] mb-2">
                        {item.company}
                      </p>
                    )}

                    {/* Year */}
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                      {item.period}
                    </p>

                    {/* Expanded Details on Mobile */}
                    {isHovered && (
                      <>
                        <div className="h-px w-full bg-[var(--border)] my-3" />
                        
                        <p className="text-sm leading-[1.6] text-[var(--text-secondary)] mb-3">
                          {item.description}
                        </p>

                        <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                          {item.tags.join(" · ")}
                        </p>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
