"use client";

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
  // Create rows of 4 items with alternating direction
  const rows: ExperienceCardItem[][] = [];
  for (let i = 0; i < items.length; i += 4) {
    const row = items.slice(i, i + 4);
    rows.push(row);
  }

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => {
        const isReverse = rowIndex % 2 === 1;
        const displayRow = isReverse ? [...row].reverse() : row;
        const startIndex = rowIndex * 4;

        return (
          <div key={rowIndex}>
            {/* Desktop: Snake pattern */}
            <div className="hidden md:block">
              <div className="grid grid-cols-4 gap-6">
                {displayRow.map((item, colIndex) => {
                  const actualIndex = isReverse ? startIndex + (3 - colIndex) : startIndex + colIndex;
                  const milestoneNumber = String(actualIndex + 1).padStart(2, '0');

                  return (
                    <div key={actualIndex} className="relative">
                      {/* Card */}
                      <article className="group h-full border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-240 hover:border-[var(--accent)] hover:shadow-sm">
                        {/* Milestone Number */}
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xl font-bold font-mono text-[var(--accent)]">
                            {milestoneNumber}
                          </span>
                          {item.category === "EDUCATION" ? (
                            <FiBookOpen className="h-4 w-4 text-[var(--secondary)]" />
                          ) : (
                            <FiBriefcase className="h-4 w-4 text-[var(--secondary)]" />
                          )}
                        </div>

                        {/* Period */}
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                          {item.period}
                        </p>

                        {/* Title */}
                        <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-1 line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Company */}
                        {item.company && (
                          <p className="text-xs font-medium text-[var(--secondary)] mb-2 line-clamp-1">
                            {item.company}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-xs leading-[1.5] text-[var(--text-secondary)] line-clamp-2 mb-3">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] line-clamp-1">
                          {item.tags.slice(0, 2).join(" · ")}
                        </p>
                      </article>

                      {/* Connector Line (except last in row) */}
                      {colIndex < displayRow.length - 1 && (
                        <div className="absolute top-1/2 -right-3 w-6 h-px bg-[var(--accent)] opacity-40" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Vertical Connector between rows */}
              {rowIndex < rows.length - 1 && (
                <div className="flex justify-end my-4">
                  <div className={`w-px h-8 bg-[var(--accent)] opacity-40 ${isReverse ? 'mr-auto' : 'ml-auto'}`} />
                </div>
              )}
            </div>

            {/* Mobile: Vertical roadmap */}
            <div className="md:hidden space-y-4">
              {row.map((item, colIndex) => {
                const actualIndex = startIndex + colIndex;
                const milestoneNumber = String(actualIndex + 1).padStart(2, '0');

                return (
                  <div key={actualIndex} className="relative">
                    {/* Card */}
                    <article className="border border-[var(--border)] bg-[var(--surface)] p-5">
                      {/* Milestone Number */}
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xl font-bold font-mono text-[var(--accent)]">
                          {milestoneNumber}
                        </span>
                        {item.category === "EDUCATION" ? (
                          <FiBookOpen className="h-4 w-4 text-[var(--secondary)]" />
                        ) : (
                          <FiBriefcase className="h-4 w-4 text-[var(--secondary)]" />
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
                      <p className="text-xs leading-[1.5] text-[var(--text-secondary)] mb-3">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">
                        {item.tags.slice(0, 2).join(" · ")}
                      </p>
                    </article>

                    {/* Vertical Connector (except last item) */}
                    {!(rowIndex === rows.length - 1 && colIndex === row.length - 1) && (
                      <div className="flex justify-center my-2">
                        <div className="w-px h-4 bg-[var(--accent)] opacity-40" />
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
