"use client";

import { useState } from "react";
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiBookOpen, FiBriefcase } from "react-icons/fi";

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

  // Create rows of 4 items with alternating direction
  const rows: ExperienceCardItem[][] = [];
  for (let i = 0; i < items.length; i += 4) {
    const row = items.slice(i, i + 4);
    rows.push(row);
  }

  return (
    <div className="space-y-0">
      {rows.map((row, rowIndex) => {
        const isReverse = rowIndex % 2 === 1;
        const displayRow = isReverse ? [...row].reverse() : row;
        const startIndex = rowIndex * 4;

        return (
          <div key={rowIndex} className="relative">
            {/* Desktop: Blueprint Roadmap */}
            <div className="hidden md:block">
              <div className="relative grid grid-cols-4 gap-3">
                {displayRow.map((item, colIndex) => {
                  const actualIndex = isReverse ? startIndex + (3 - colIndex) : startIndex + colIndex;
                  const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
                  const isLastInRow = colIndex === displayRow.length - 1;
                  const isHovered = hoveredIndex === actualIndex;

                  return (
                    <div key={actualIndex} className="relative">
                      {/* Compact Card */}
                      <article 
                        className="group relative border border-[var(--accent)] bg-[var(--surface)] p-3 transition-all duration-240 hover:bg-[var(--accent)]/5 hover:shadow-md cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(actualIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Milestone Number - Large and Prominent */}
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-3xl font-black font-mono text-[var(--accent)]">
                            {milestoneNumber}
                          </span>
                          {item.category === "EDUCATION" ? (
                            <FiBookOpen className="h-4 w-4 text-[var(--accent)]" />
                          ) : (
                            <FiBriefcase className="h-4 w-4 text-[var(--accent)]" />
                          )}
                        </div>

                        {/* Year */}
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1.5">
                          {item.period}
                        </p>

                        {/* Role - Single line */}
                        <h3 className="text-xs font-bold uppercase tracking-tight text-[var(--primary)] mb-1 truncate">
                          {item.title}
                        </h3>

                        {/* Organization - Single line */}
                        {item.company && (
                          <p className="text-[10px] font-medium text-[var(--secondary)] truncate">
                            {item.company}
                          </p>
                        )}

                        {/* Hover Details - Expanded */}
                        {isHovered && (
                          <div className="absolute top-0 left-0 right-0 bg-[var(--surface)] border-2 border-[var(--accent)] p-4 shadow-xl z-20 min-w-[280px]">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-2xl font-black font-mono text-[var(--accent)]">
                                {milestoneNumber}
                              </span>
                              {item.category === "EDUCATION" ? (
                                <FiBookOpen className="h-5 w-5 text-[var(--accent)]" />
                              ) : (
                                <FiBriefcase className="h-5 w-5 text-[var(--accent)]" />
                              )}
                            </div>

                            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                              {item.period}
                            </p>

                            <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-2">
                              {item.title}
                            </h3>

                            {item.company && (
                              <p className="text-xs font-medium text-[var(--secondary)] mb-3">
                                {item.company}
                              </p>
                            )}

                            <p className="text-xs leading-[1.5] text-[var(--text-secondary)] mb-3">
                              {item.description}
                            </p>

                            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">
                              {item.tags.join(" · ")}
                            </p>
                          </div>
                        )}
                      </article>

                      {/* Horizontal Connector - Thick and Prominent */}
                      {!isLastInRow && (
                        <div className="absolute top-1/2 -right-1.5 z-10 flex items-center -translate-y-1/2">
                          <div className="w-6 h-1 bg-[var(--accent)]" />
                          {isReverse ? (
                            <FiArrowLeft className="h-6 w-6 text-[var(--accent)] -ml-1 stroke-[3]" />
                          ) : (
                            <FiArrowRight className="h-6 w-6 text-[var(--accent)] -ml-1 stroke-[3]" />
                          )}
                        </div>
                      )}

                      {/* Vertical Connector - At end going down */}
                      {isLastInRow && rowIndex < rows.length - 1 && !isReverse && (
                        <div className="absolute -bottom-1 right-1/2 z-10 flex flex-col items-center translate-x-1/2">
                          <div className="w-1 h-12 bg-[var(--accent)]" />
                          <FiArrowDown className="h-6 w-6 text-[var(--accent)] -mt-1 stroke-[3]" />
                        </div>
                      )}

                      {/* Vertical Connector - At start coming from above */}
                      {isReverse && colIndex === 0 && (
                        <div className="absolute -top-1 right-1/2 z-10 flex flex-col items-center translate-x-1/2">
                          <div className="w-1 h-12 bg-[var(--accent)]" />
                          <FiArrowDown className="h-6 w-6 text-[var(--accent)] -mb-1 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Vertical roadmap */}
            <div className="md:hidden space-y-2">
              {row.map((item, colIndex) => {
                const actualIndex = startIndex + colIndex;
                const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
                const isLast = rowIndex === rows.length - 1 && colIndex === row.length - 1;
                const isHovered = hoveredIndex === actualIndex;

                return (
                  <div key={actualIndex} className="relative">
                    {/* Compact Card */}
                    <article 
                      className="border border-[var(--accent)] bg-[var(--surface)] p-3"
                      onClick={() => setHoveredIndex(isHovered ? null : actualIndex)}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-3xl font-black font-mono text-[var(--accent)]">
                          {milestoneNumber}
                        </span>
                        {item.category === "EDUCATION" ? (
                          <FiBookOpen className="h-4 w-4 text-[var(--accent)]" />
                        ) : (
                          <FiBriefcase className="h-4 w-4 text-[var(--accent)]" />
                        )}
                      </div>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1.5">
                        {item.period}
                      </p>

                      <h3 className="text-xs font-bold uppercase tracking-tight text-[var(--primary)] mb-1">
                        {item.title}
                      </h3>

                      {item.company && (
                        <p className="text-[10px] font-medium text-[var(--secondary)] mb-2">
                          {item.company}
                        </p>
                      )}

                      {isHovered && (
                        <>
                          <p className="text-xs leading-[1.5] text-[var(--text-secondary)] mb-2 mt-3">
                            {item.description}
                          </p>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">
                            {item.tags.join(" · ")}
                          </p>
                        </>
                      )}
                    </article>

                    {/* Vertical Connector */}
                    {!isLast && (
                      <div className="flex justify-center my-1">
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-8 bg-[var(--accent)]" />
                          <FiArrowDown className="h-5 w-5 text-[var(--accent)] -mt-1 stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
