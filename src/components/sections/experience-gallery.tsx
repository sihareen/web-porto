"use client";

import { useState } from "react";
import { FiX, FiCalendar, FiBriefcase, FiBookOpen } from "react-icons/fi";

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

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className="max-w-[1280px] mx-auto">
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {items.map((item, actualIndex) => {
            const milestoneNumber = String(actualIndex + 1).padStart(2, '0');
            const isLastInRow = (actualIndex + 1) % 4 === 0;
            const isHovered = hoveredIndex === actualIndex;

            return (
              <div key={actualIndex} className="relative">
                <article 
                  className="group relative border border-[var(--border)] bg-white p-7 h-[288px] transition-all duration-200 hover:border-[var(--accent)] hover:shadow-sm cursor-pointer flex flex-col overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(actualIndex)}
                >
                  <div className="flex-1 min-h-0 flex flex-col">
                    <div className="flex items-start justify-between mb-4 flex-shrink-0">
                      <span className="text-5xl font-black font-mono text-[var(--accent)] leading-none">
                        {milestoneNumber}
                      </span>
                      {item.category === "EDUCATION" ? (
                        <FiBookOpen className="h-7 w-7 text-[var(--accent)] flex-shrink-0" />
                      ) : (
                        <FiBriefcase className="h-7 w-7 text-[var(--accent)] flex-shrink-0" />
                      )}
                    </div>

                    <h3 className="text-base font-bold uppercase tracking-tight text-[var(--primary)] mb-2 leading-tight break-words overflow-wrap-anywhere">
                      {item.title}
                    </h3>

                    {item.company && (
                      <p className="text-sm text-[var(--accent)] break-words overflow-wrap-anywhere">
                        {item.company}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-[var(--border)] pt-3 mt-3 flex-shrink-0">
                    <p className="text-xs font-semibold text-[var(--accent)] flex items-center gap-2">
                      <FiCalendar className="h-3.5 w-3.5 flex-shrink-0" />
                      {item.period}
                    </p>
                  </div>
                </article>

                {!isLastInRow && (
                  <div className="absolute top-1/2 -right-3 z-10 flex items-center -translate-y-1/2 gap-0">
                    <div className="w-5 h-px border-t border-dashed border-[var(--accent)] opacity-50" />
                    <div className="w-2 h-2 border border-[var(--accent)] bg-white opacity-60" />
                    <div className="w-5 h-px border-t border-dashed border-[var(--accent)] opacity-50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="md:hidden space-y-4">
          {items.map((item, actualIndex) => {
            const milestoneNumber = String(actualIndex + 1).padStart(2, '0');

            return (
              <article 
                key={actualIndex}
                className="border border-[var(--border)] bg-white p-6 h-[240px] cursor-pointer hover:border-[var(--accent)] flex flex-col overflow-hidden"
                onClick={() => setSelectedIndex(actualIndex)}
              >
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex items-start justify-between mb-3 flex-shrink-0">
                    <span className="text-4xl font-black font-mono text-[var(--accent)] leading-none">
                      {milestoneNumber}
                    </span>
                    {item.category === "EDUCATION" ? (
                      <FiBookOpen className="h-6 w-6 text-[var(--accent)] flex-shrink-0" />
                    ) : (
                      <FiBriefcase className="h-6 w-6 text-[var(--accent)] flex-shrink-0" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-tight text-[var(--primary)] mb-2 leading-tight break-words overflow-wrap-anywhere">
                    {item.title}
                  </h3>

                  {item.company && (
                    <p className="text-xs text-[var(--accent)] break-words overflow-wrap-anywhere">
                      {item.company}
                    </p>
                  )}
                </div>

                <div className="border-t border-[var(--border)] pt-3 mt-2 flex-shrink-0">
                  <p className="text-xs font-semibold text-[var(--accent)] flex items-center gap-2">
                    <FiCalendar className="h-3 w-3 flex-shrink-0" />
                    {item.period}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div 
            className="bg-white border-2 border-[var(--accent)] max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[var(--border)] p-6 flex items-start justify-between">
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
