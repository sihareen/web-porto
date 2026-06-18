"use client";

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
  // Create rows of 4 items with alternating direction
  const rows: ExperienceCardItem[][] = [];
  for (let i = 0; i < items.length; i += 4) {
    const row = items.slice(i, i + 4);
    rows.push(row);
  }

  return (
    <div className="space-y-1">
      {rows.map((row, rowIndex) => {
        const isReverse = rowIndex % 2 === 1;
        const displayRow = isReverse ? [...row].reverse() : row;
        const startIndex = rowIndex * 4;

        return (
          <div key={rowIndex}>
            {/* Desktop: Blueprint Roadmap */}
            <div className="hidden md:block">
              <div className="relative grid grid-cols-4 gap-4">
                {displayRow.map((item, colIndex) => {
                  const actualIndex = isReverse ? startIndex + (3 - colIndex) : startIndex + colIndex;
                  const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
                  const isLastInRow = colIndex === displayRow.length - 1;
                  const isFirstInRow = colIndex === 0;

                  return (
                    <div key={actualIndex} className="relative">
                      {/* Card */}
                      <article className="group border-2 border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-240 hover:border-[var(--accent)]">
                        {/* Milestone Number & Icon */}
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-2xl font-bold font-mono text-[var(--accent)]">
                            {milestoneNumber}
                          </span>
                          {item.category === "EDUCATION" ? (
                            <FiBookOpen className="h-5 w-5 text-[var(--accent)]" />
                          ) : (
                            <FiBriefcase className="h-5 w-5 text-[var(--accent)]" />
                          )}
                        </div>

                        {/* Period */}
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                          {item.period}
                        </p>

                        {/* Title */}
                        <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-1">
                          {item.title}
                        </h3>

                        {/* Company */}
                        {item.company && (
                          <p className="text-xs font-medium text-[var(--secondary)] mb-2">
                            {item.company}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-xs leading-[1.4] text-[var(--text-secondary)] mb-2 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">
                          {item.tags.slice(0, 2).join(" · ")}
                        </p>
                      </article>

                      {/* Horizontal Connector Arrow (except last in row) */}
                      {!isLastInRow && (
                        <div className="absolute top-1/2 -right-2 z-10 flex items-center -translate-y-1/2">
                          <div className="w-8 h-0.5 bg-[var(--accent)]" />
                          {isReverse ? (
                            <FiArrowLeft className="h-5 w-5 text-[var(--accent)] -ml-1" />
                          ) : (
                            <FiArrowRight className="h-5 w-5 text-[var(--accent)] -ml-1" />
                          )}
                        </div>
                      )}

                      {/* Vertical Connector Arrow (at end of row, going to next row) */}
                      {isLastInRow && rowIndex < rows.length - 1 && (
                        <div className="absolute -bottom-2 left-1/2 z-10 flex flex-col items-center -translate-x-1/2">
                          <div className="w-0.5 h-8 bg-[var(--accent)]" />
                          <FiArrowDown className="h-5 w-5 text-[var(--accent)] -mt-1" />
                        </div>
                      )}

                      {/* Vertical Connector Arrow (at start of reverse row, coming from previous) */}
                      {isReverse && isFirstInRow && rowIndex > 0 && (
                        <div className="absolute -top-2 left-1/2 z-10 flex flex-col items-center -translate-x-1/2">
                          <FiArrowDown className="h-5 w-5 text-[var(--accent)] mb-1" />
                          <div className="w-0.5 h-8 bg-[var(--accent)]" />
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

                return (
                  <div key={actualIndex} className="relative">
                    {/* Card */}
                    <article className="border-2 border-[var(--border)] bg-[var(--surface)] p-4">
                      {/* Milestone Number & Icon */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-2xl font-bold font-mono text-[var(--accent)]">
                          {milestoneNumber}
                        </span>
                        {item.category === "EDUCATION" ? (
                          <FiBookOpen className="h-5 w-5 text-[var(--accent)]" />
                        ) : (
                          <FiBriefcase className="h-5 w-5 text-[var(--accent)]" />
                        )}
                      </div>

                      {/* Period */}
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                        {item.period}
                      </p>

                      {/* Title */}
                      <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-1">
                        {item.title}
                      </h3>

                      {/* Company */}
                      {item.company && (
                        <p className="text-xs font-medium text-[var(--secondary)] mb-2">
                          {item.company}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs leading-[1.4] text-[var(--text-secondary)] mb-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">
                        {item.tags.slice(0, 2).join(" · ")}
                      </p>
                    </article>

                    {/* Vertical Connector Arrow (except last item) */}
                    {!isLast && (
                      <div className="flex justify-center my-2">
                        <div className="flex flex-col items-center">
                          <div className="w-0.5 h-6 bg-[var(--accent)]" />
                          <FiArrowDown className="h-4 w-4 text-[var(--accent)] -mt-1" />
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
