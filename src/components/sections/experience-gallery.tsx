"use client";

import { useState } from "react";
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

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rows: ExperienceCardItem[][] = [];
  for (let i = 0; i < items.length; i += 4) {
    const row = items.slice(i, i + 4);
    rows.push(row);
  }

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className="space-y-8">
        {rows.map((row, rowIndex) => {
          const startIndex = rowIndex * 4;

          return (
            <div key={rowIndex}>
              <div className="hidden md:block">
                <div className="relative grid grid-cols-4 gap-6">
                  {row.map((item, colIndex) => {
                    const actualIndex = startIndex + colIndex;
                    const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
                    const isLastInRow = colIndex === row.length - 1;
                    const isHovered = hoveredIndex === actualIndex;

                    return (
                      <div key={actualIndex} className="relative">
                        <article 
                          className="group relative border-2 border-[var(--border)] bg-[var(--surface)] p-6 h-[200px] transition-all duration-240 hover:border-[var(--accent)] hover:shadow-md cursor-pointer"
                          onMouseEnter={() => setHoveredIndex(actualIndex)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          onClick={() => setSelectedIndex(actualIndex)}
                        >
                          <span className="block text-4xl font-black font-mono text-[var(--accent)] mb-4">
                            {milestoneNumber}
                          </span>

                          <h3 className="text-base font-bold uppercase tracking-tight text-[var(--primary)] mb-3 leading-tight">
                            {item.title}
                          </h3>

                          {item.company && (
                            <p className="text-sm font-semibold text-[var(--secondary)] mb-3">
                              {item.company}
                            </p>
                          )}

                          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                            {item.period}
                          </p>
                        </article>

                        {!isLastInRow && (
                          <div className="absolute top-1/2 -right-3 z-10 flex items-center -translate-y-1/2">
                            <div className="w-12 h-px border-t border-dashed border-[var(--border)] opacity-60" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:hidden space-y-3">
                {row.map((item, colIndex) => {
                  const actualIndex = startIndex + colIndex;
                  const milestoneNumber = String(actualIndex + 1).padStart(2, '0');

                  return (
                    <article 
                      key={actualIndex}
                      className="border-2 border-[var(--border)] bg-[var(--surface)] p-4 h-[160px] cursor-pointer hover:border-[var(--accent)]"
                      onClick={() => setSelectedIndex(actualIndex)}
                    >
                      <span className="block text-3xl font-black font-mono text-[var(--accent)] mb-3">
                        {milestoneNumber}
                      </span>

                      <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-2">
                        {item.title}
                      </h3>

                      {item.company && (
                        <p className="text-xs font-medium text-[var(--secondary)] mb-2">
                          {item.company}
                        </p>
                      )}

                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                        {item.period}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div 
            className="bg-[var(--surface)] border-2 border-[var(--accent)] max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[var(--surface)] border-b-2 border-[var(--border)] p-6 flex items-start justify-between">
              <div className="flex-1">
                <span className="text-3xl font-black font-mono text-[var(--accent)] block mb-4">
                  {String(selectedIndex! + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-[var(--primary)] mb-2">
                  {selectedItem.title}
                </h2>
                {selectedItem.company && (
                  <p className="text-lg font-semibold text-[var(--secondary)] mb-2">
                    {selectedItem.company}
                  </p>
                )}
                <p className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
                  {selectedItem.period}
                </p>
              </div>
              <button 
                onClick={() => setSelectedIndex(null)}
                className="ml-4 p-2 hover:bg-[var(--border)] transition-colors"
                aria-label="Close modal"
              >
                <FiX className="h-6 w-6 text-[var(--primary)]" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                  Description
                </h3>
                <p className="text-base leading-[1.7] text-[var(--text-secondary)]">
                  {selectedItem.description}
                </p>
              </div>

              {selectedItem.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-[var(--border)] text-[var(--secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
